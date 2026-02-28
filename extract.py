import glob
import os
from pypdf import PdfReader

def extract_pdf(pdf_path, out_path):
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            t = page.extract_text()
            if t:
                text += t + "\n"
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(text)
        print(f"Extracted {len(text)} chars from {pdf_path}")
    except Exception as e:
        print(f"Failed to process {pdf_path}: {e}")

extract_pdf("profeti_italiano.pdf", "profeti.txt")
extract_pdf("it-gli-atti-di-sunnah-e-le-invocazioni-quotidiane-del-profeta.pdf", "sunnah.txt")
