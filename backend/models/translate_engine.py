import torch
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Translation cache for performance
translation_cache = {}
CACHE_SIZE = 1000

MODEL_NAME = "facebook/nllb-200-distilled-600M"

# 22 Indian languages
LANG_CODES = {
    "English": "eng_Latn",
    "Hindi": "hin_Deva",
    "Bengali": "ben_Beng",
    "Telugu": "tel_Telu",
    "Marathi": "mar_Deva",
    "Tamil": "tam_Taml",
    "Gujarati": "guj_Gujr",
    "Kannada": "kan_Knda",
    "Malayalam": "mal_Mlym",
    "Punjabi": "pan_Guru",
    "Odia": "ori_Orya",
    "Assamese": "asm_Beng",
    "Maithili": "mai_Deva",
    "Santali": "sat_Olck",
    "Kashmiri": "kas_Arab",
    "Nepali": "nep_Deva",
    "Sindhi": "snd_Arab",
    "Konkani": "kok_Deva",
    "Dogri": "doi_Deva",
    "Bodo": "brx_Beng",
    "Sanskrit": "san_Deva",
    "Urdu": "urd_Arab"
}

# Load model
logger.info("Loading NLLB-200 model...")
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
logger.info(f"Model loaded on: {device}")

def _get_forced_bos_token_id(lang_code_token: str):
    try:
        token_id = tokenizer.convert_tokens_to_ids(lang_code_token)
        if token_id and token_id != tokenizer.unk_token_id:
            return token_id
    except:
        pass
    return None

def translate_text(text: str, target_lang_friendly: str):
    # Cache check for performance
    cache_key = f"{text}_{target_lang_friendly}"
    if cache_key in translation_cache:
        return translation_cache[cache_key], None
    
    if not text or not target_lang_friendly:
        return "", "No text or language provided"
    
    if target_lang_friendly not in LANG_CODES:
        return None, f"Unsupported language: {target_lang_friendly}"
    
    if target_lang_friendly == "English":
        return text, None

    try:
        lang_code = LANG_CODES[target_lang_friendly]
        forced_bos_id = _get_forced_bos_token_id(lang_code)

        # Optimized tokenization
        inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=256).to(device)
        
        # Optimized generation parameters
        gen_kwargs = {
            "max_length": 128,
            "num_beams": 2,
            "early_stopping": True
        }
        if forced_bos_id is not None:
            gen_kwargs["forced_bos_token_id"] = forced_bos_id

        # Generate translation
        with torch.no_grad():
            translated_tokens = model.generate(**inputs, **gen_kwargs)
        translated_text = tokenizer.decode(translated_tokens[0], skip_special_tokens=True)
        
        # Cache management
        if translated_text:
            if len(translation_cache) >= CACHE_SIZE:
                translation_cache.pop(next(iter(translation_cache)))
            translation_cache[cache_key] = translated_text
        
        return translated_text, None
        
    except Exception as e:
        logger.error(f"Translation error: {e}")
        return None, str(e)