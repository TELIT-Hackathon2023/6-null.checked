from transformers import BertTokenizer, BertForQuestionAnswering
import torch
import warnings
warnings.simplefilter("ignore")


tokenizer = BertTokenizer.from_pretrained('bert-large-uncased')
model = BertForQuestionAnswering.from_pretrained('bert-large-uncased')


def main():
    with open('context.txt', 'r', encoding='utf-8') as f:
        context = f.read()
    question = """
    What is 1+1?
    """
    inputs = tokenizer.encode_plus(question, context, return_tensors='pt')

    with torch.no_grad():
        outputs = model(**inputs)
        answer_start_scores, answer_end_scores = outputs.start_logits, outputs.end_logits

        # Get the most likely beginning and end of answer
        answer_start = torch.argmax(answer_start_scores)
        answer_end = torch.argmax(answer_end_scores) + 1
    
    answer = tokenizer.convert_tokens_to_string(
        tokenizer.convert_ids_to_tokens(
            inputs['input_ids'][0][answer_start:answer_end]
        )
    )
    print(f"Answer: {answer}")


if __name__ == '__main__':
    main()