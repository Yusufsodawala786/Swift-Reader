import summarymaker
import webscraping 

category = "ScienceAndTechnology"
news = webscraping.getNews(category)
summary = summarymaker.getSummary(news[5]["content"])
print(news[5]["content"])
print(summary)