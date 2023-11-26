from llm_deploy import run_llm
from process_pdf import process_pdf
from scrap import scrape_t_systems
import json
import re


def extract_categories_and_scores(text):
    pattern = r'(\w+)=([\d\.]+)'
    matches = re.findall(pattern, text)
    extracted_data = {category: float(score) for category, score in matches}
    return extracted_data

def get_recommendations(company_url, pdf_url, company_data=None, pdf_data=None):
    if company_data is None:
        company_data, _ = scrape_t_systems(company_url)
        json.dump(company_data, open("data/t_systems_data.json", "w"), indent=4)
    if pdf_data is None:
        pdf_url += "?raw=true"
        pdf_data = process_pdf(pdf_url, "data/output.json")
    scores, summary = run_llm()
    scores = extract_categories_and_scores(scores)
    scores = [{"score": scores[key], "section": key} for key in scores]
    scores += [{"score": sum([s["score"] for s in scores]), "section": "Overall Score"}]
    result = {"summary": summary, "matching_scores": scores}
    return result


if __name__ == "__main__":
    company_url = "https://www.t-systems.com/de/en"
    pdf_url = "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/170609_student.pdf"
    print(get_recommendations(company_url, pdf_url))