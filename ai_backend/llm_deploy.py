from openai import OpenAI
import json
import re


system_instructions = """
    - You will receive a series of data chunks, each labeled as "RFP Data Chunk #X", where X is the chunk's number.
    - Generate a brief version of the chunk's content without saying it is a chunk.
"""
summary_prompt = """
    Using all your obtained knowledge from the RFP data, 
    make a summary with the key information on a project described in the RFP.
"""
brief_chunks = []


def extract_categories_and_scores(text):
    pattern = r'(\w+)=([\d\.]+)'
    matches = re.findall(pattern, text)
    extracted_data = {category: float(score) for category, score in matches}
    return extracted_data

def get_client():
    with open("api-key.txt", "r") as f:
        client = OpenAI(api_key=f.read().strip())
    return client

def send_rfp_data(client):
    with open("data/output.json", "r", encoding="utf-8") as f:
        rfp_data = json.load(f)

    for i, chunk in enumerate(rfp_data[:5]):
        brief_chunk = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": system_instructions}]+\
                     [{"role": "user", "content": f"RFP Data Chunk #{i}\n{chunk}"}],
        )
        brief_chunks.append(
            {"role": "user", "content": brief_chunk.choices[0].message.content}
        )
        print(f'Gotten response from RFP Data Chunk #{i}...')

def get_summary(client):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": summary_prompt}] +\
                 brief_chunks
    )
    print('Gotten response from the summary forming:')
    print(response.choices[0].message.content)
    summary = response.choices[0].message.content
    
    return summary

def get_scores(client):
    with open("data/t_systems_data.json", "r", encoding="utf-8") as f:
        company_data = str(json.load(f))

    compare_instructions = """
    - Compare the memorized RFP data with the provided company's data.
    - Evaluate the similarity between RFP and the company's data in the following categories: Technology, Functional, Compliance, Domain.
    - Assign a similarity score for each category.
    - Scores can be in a simple numeric format (e.g., 1-10, where 10 is the highest similarity).
    - Present the results strictly in the following format: CATEGORY_NAME=SCORE.
    """

    scores = {}
    while not scores:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": compare_instructions},
                {"role": "user", "content": "RFP Data:\n"+'\n'.join([chunk["content"] for chunk in brief_chunks])},
                {"role": "user", "content": f"Company Data:\n{company_data}"}
            ],
        )
        print('Gotten response from the scores evaluation:')
        print(response.choices[0].message.content)
        scores = extract_categories_and_scores(response.choices[0].message.content)

    return scores

def run_llm():
    client = get_client()
    send_rfp_data(client)
    summary = get_summary(client)
    scores = get_scores(client)
    return scores, summary