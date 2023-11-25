import requests
import fitz
import json
import io


def download_pdf(url):
    response = requests.get(url)
    response.raise_for_status()
    return io.BytesIO(response.content)

def extract_text_from_pdf(file_stream):
    try:
        doc = fitz.open(stream=file_stream, filetype="pdf")
    except fitz.fitz.FileDataError:
        raise ValueError("Unable to open the PDF file. It may be corrupted or not a valid PDF.")

    text = ''
    for page in doc:
        text += page.get_text()
    return text

def chunk_text(text, chunk_size=2000):
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def save_chunks_as_json(chunks, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(chunks, file, ensure_ascii=False, indent=4)

def process_pdf(url, output_filename):
    try:
        pdf_stream = download_pdf(url)
        text = extract_text_from_pdf(pdf_stream)
        chunks = chunk_text(text)
        save_chunks_as_json(chunks, output_filename)
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == '__main__':
    url = 'https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/2015_RFPWebsiteRedesignRepost.pdf?raw=true'
    output_filename = 'data/output.json'
    process_pdf(url, output_filename)