import time

from transformers import pipeline
import os
import bs4 as bs
import urllib.request
import re

## Setting to use the 0th GPU
os.environ["CUDA_VISIBLE_DEVICES"] = "0"

## Setting to use the bart-large-cnn model for summarization
# summarizer = pipeline("summarization")
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    tokenizer="sshleifer/distilbart-cnn-12-6",
    framework="pt",
    num_beams=2,
)
## To use the t5-base model for summarization:
# summarizer = pipeline("summarization", model="t5-base", tokenizer="t5-base", framework="tf")
# !!!!! ABOVE CODE GIVES ERROR I COULD NOT RESEOLVE BETTER TO USE SSH MODEL

def getSummary(text):
    summary_text = summarizer(text, do_sample=True, truncation=True)[0]["summary_text"]
    return summary_text.strip()
