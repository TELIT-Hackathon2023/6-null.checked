import requests
import fitz
import json
import io
import re


# get the PDF file from the URL
def download_pdf(url):
    response = requests.get(url)
    response.raise_for_status()
    return io.BytesIO(response.content)

# extract the text from the PDF file
def extract_text_from_pdf(file_stream):
    try:
        doc = fitz.open(stream=file_stream, filetype="pdf")
    except fitz.fitz.FileDataError:
        raise ValueError("Unable to open the PDF file. It may be corrupted or not a valid PDF.")

    text = ''
    for page in doc:
        text += page.get_text()
    return text

# split the text into chunks
def chunk_text(text, chunk_size=3500):
    return [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

# save the chunks as a JSON file
def save_chunks_as_json(chunks, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(chunks, file, ensure_ascii=False, indent=4)

# filter the chunks
def clean_text(chunks):
    cleaned_chunks = []

    for chunk in chunks:
        # Remove unnecessary whitespace
        chunk = re.sub(r'\s+', ' ', chunk)
        # Remove digits (like page numbers)
        chunk = re.sub(r'\b\d+\b', '', chunk)
        # Remove URLs
        chunk = re.sub(r'http[s]?://\S+', '', chunk)
        # Remove or replace special characters (example: replacing & with 'and')
        chunk = chunk.replace('&', 'and')
        # Correct common OCR errors (example: replacing '0' with 'O')
        chunk = chunk.replace('0', 'O')
        # Filter out email addresses
        chunk = re.sub(r'\S+@\S+', '', chunk)
        # Remove repeated characters (more than 2)
        chunk = re.sub(r'(.)\1{2,}', r'\1', chunk)

        cleaned_chunks.append(chunk.strip())

    return cleaned_chunks

# process the PDF file
def process_pdf(url, output_filename):
    try:
        pdf_stream = download_pdf(url)
        text = extract_text_from_pdf(pdf_stream)
        chunks = chunk_text(text)
        chunks = clean_text(chunks)
        save_chunks_as_json(chunks, output_filename)
    except Exception as e:
        print(f"An error occurred: {e}")


# testing
if __name__ == '__main__':
    url = 'https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/2015_RFPWebsiteRedesignRepost.pdf'
    output_filename = 'data/output.json'
    process_pdf(url+'?raw=true', output_filename)