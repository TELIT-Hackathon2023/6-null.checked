from openai import OpenAI
import json


with open("api-key.txt", "r") as f:
    client = OpenAI(api_key=f.read().strip())

system_instructions = """
- You will receive a series of data chunks, each labeled as "RFP Data Chunk #X", where X is the chunk's number.
- Memorize the details in each chunk sequentially as they are provided.
- Don't stop memorizing until a key word "STOPPY" appears!
- After that, ask for the next instructions.
"""
response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "system", "content": system_instructions}],
)
print('Gotten response from system instructions:')
print(response.choices[0].message.content)

with open("data/output.json", "r", encoding="utf-8") as f:
    rfp_data = json.load(f)

for i, chunk in enumerate(rfp_data):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": f"RFP Data Chunk #{i}\n{chunk}"}],
    )
    print(f'Gotten response from RFP Data Chunk #{i}...')

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": "STOPPY"},
        {"role": "user", "content": "Ask for a company's data which contains descriptions of the company's operational fields and activities. After getting, the data wait for the next instructions."},
    ],
)

with open("data/t_systems_data.json", "r", encoding="utf-8") as f:
    company_data = str(json.load(f))

compare_instructions = """
- Compare the memorized RFP data with the provided company's data.
- For the RFP data, identify and note down the key fields and themes.
- For the RFP data, evaluate the similarity between its key fields and the company's fields.
- Assign a similarity score for each RFB cluster's field relative to the company's fields. The score should reflect the level of relevance and alignment between the RFP data and the company's operational areas.
- Scores can be in a simple numeric format (e.g., 1-10, where 10 is the highest similarity).
- Present the results in a tabulated format.
- For the company's fields, list its key fields alongside the corresponding similarity scores.
"""

response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "user", "content": company_data},
        {"role": "user", "content": compare_instructions},
    ],
)

print('Gotten response from compare instructions:')
print(response.choices[0].message.content)