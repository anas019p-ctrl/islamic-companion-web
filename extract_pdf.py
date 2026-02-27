
import PyPDF2
import sys
import json

def extract_text(pdf_path):
    try:
        with open(pdf_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = ""
            # Extract first 20 pages or so to avoid huge output, but enough for contents
            for i in range(min(len(reader.pages), 30)):
                text += reader.pages[i].extract_text() + "\n"
            return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    files = [
        (r"c:\Users\BITAWFEKI LAH\Downloads\islamic-companion-web-master\profeti_italiano.pdf", "profeti.txt"),
        (r"c:\Users\BITAWFEKI LAH\Downloads\islamic-companion-web-master\it-gli-atti-di-sunnah-e-le-invocazioni-quotidiane-del-profeta.pdf", "sunnah.txt")
    ]
    for pdf, txt in files:
        content = extract_text(pdf)
        with open(txt, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Saved {pdf} to {txt}")
