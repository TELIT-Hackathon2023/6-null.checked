from openai import OpenAI
import json


def get_client():
    with open("api-key.txt", "r") as f:
        client = OpenAI(api_key=f.read().strip())
    return client

def send_sys_instructions(client):
    system_instructions = """
    - You will receive a series of data chunks, each labeled as "RFP Data Chunk #X", where X is the chunk's number.
    - Memorize the details in each chunk sequentially as they are provided.
    - Don't stop memorizing until I send a word "STOPPY" to you.
    - After that, ask for the next instructions.
    """
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "system", "content": system_instructions}],
    )
    print('Gotten response from system instructions:')
    print(response.choices[0].message.content)

def send_rfp_data(client):
    with open("data/output.json", "r", encoding="utf-8") as f:
        rfp_data = json.load(f)

    for i, chunk in enumerate(rfp_data[:8]):
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": f"RFP Data Chunk #{i}\n{chunk}"}],
        )
        print(f'Gotten response from RFP Data Chunk #{i}...')

def send_stoppy(client):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "STOPPY"},
            {"role": "user", "content": "Ask for a company's data which contains descriptions of the company's operational fields and activities. After getting, the data wait for the next instructions."},
        ],
    )

def get_information(client):
    with open("data/t_systems_data.json", "r", encoding="utf-8") as f:
        company_data = str(json.load(f))

    compare_instructions = """
    Next instructions:
    - Compare the memorized RFP data with the provided company's data.
    - Evaluate the similarity between RFP and the company's data in the following categories: Technology, Functional, Compliance, Domain.
    - Assign a similarity score for each category.
    - Scores can be in a simple numeric format (e.g., 1-10, where 10 is the highest similarity).
    - Present the results in the following format: Category_Name=Score.
    """

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": company_data},
        ],
    )

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": compare_instructions},
        ],
    )

    print('Gotten response from the scores evaluation:')
    print(response.choices[0].message.content)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "user", "content": "Using all your obtained knowledge about RFP, make a summar with the key information, presented in a condensed form"},
        ],
    )

    print('Gotten response from the summary forming:')
    print(response.choices[0].message.content)

def run_llm():
    client = get_client()
    send_sys_instructions(client)
    send_rfp_data(client)
    send_stoppy(client)
    return get_information(client)