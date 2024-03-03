import json

from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI

from app.config import config

prompt = PromptTemplate.from_template("""
Analyze the following text and extract the information specified based on the parameters provided.
The parameters will be provided with key and description pairs.
                                      
{parameters}
                                      
output: return the key and the value in json format. strictly use the key name provided in the parameters.
                        
Document:
{document}
""")

llm = OpenAI(api_key=config["OPENAI_API_KEY"])

def extract_information(document, parameters):
    input = prompt.format(document=document, parameters=format_parameters(parameters))
    output = llm.invoke(input)

    try:
        data = json.loads(output)
        print(data)
    except:
        data = {}
    information = {key: data.get(key, "") for key in parameters.keys()}
    return information

def format_parameters(parameters):
    return "\n".join([f"{key}: {description}" for key, description in parameters.items()])