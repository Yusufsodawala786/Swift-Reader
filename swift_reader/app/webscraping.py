import os
from dotenv import load_dotenv
import requests
import json
from bs4 import BeautifulSoup

load_dotenv()
subscription_key = os.getenv('API_KEY')
search_url = os.getenv('ENDPOINT')

def getNews(category):

    headers = {"Ocp-Apim-Subscription-Key" : subscription_key}
    params  = {"cc":"IN","category":category,"textDecorations": True, "textFormat": "HTML"}

    response = requests.get(search_url, headers=headers, params=params)
    response.raise_for_status()

    all_search_results = response.json().get("value")
    news = []
    for newsarticle in all_search_results[:10]:
        content = requests.get(newsarticle.get("url")).content
        soup = BeautifulSoup(content,"html.parser")
        richtext = soup.find("div",{"class":"richtext"})
        p = richtext.findChildren("p",recursive=False)
        entire_text = ''
        for el in p:
            entire_text+=el.text.strip()
        imageUrl = newsarticle.get('provider',{})[0].get('image',{}).get('thumbnail',{}).get('contentUrl',"")
        article = {"contentURL":newsarticle.get("url",""),"content":entire_text,"headline":newsarticle.get("name"),"imageURL":imageUrl}
        news.append(article)
    return news
