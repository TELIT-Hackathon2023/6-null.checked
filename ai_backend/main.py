from llm_deploy import run_llm
from process_pdf import process_pdf
from scrap import scrape_t_systems
import json




def get_recommendations(company_url, pdf_url, company_data=None, pdf_data=None):
    if company_data is None:
        company_data, _ = scrape_t_systems(company_url)
        json.dump(company_data, open("data/t_systems_data.json", "w"), indent=4)
    if pdf_data is None:
        pdf_data = process_pdf(pdf_url, "data/output.json")
    return run_llm()


if __name__ == "__main__":
    company_url = "https://www.t-systems.com/de/en"
    pdf_url = "https://github.com/TELIT-Hackathon2023/6-null.checked/blob/main/ai_backend/data/rfps/170609_student.pdf"
    get_recommendations(company_url, pdf_url)