from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from django.http import HttpResponse
from . summarymaker import *
from . webscraping import *
import html
import random
import datetime
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
# Create your views here.
class JSONResponse(HttpResponse):
    def __init__(self,data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse,self).__init__(content,**kwargs)
# class ReactView(APIView):
#     serializer_class = ReactSerializer

#     def get(self,request):
#         category = request.query_params.get('category')
#         print(category)
#         all_articles = getNews(category=category)
#         response_news = []
#         for article in all_articles:
#             summary = getSummary(article["content"])
#             response = {"headline":html.unescape(article["headline"]),"summary":summary,"contentURL":article["contentURL"],"imageURL":article["imageURL"]}
#             response_news.append(response)
#         # news = [{"headline":article.headline,"summary":article.summary,"contentURL":article.contentURL,"imageURL":article.imageURL} for article in React.objects.all()]
#         return Response(response_news)
#     def post(self, request):
  
#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return  Response(serializer.data)
def homepage(request):
    return HttpResponse("Homepage")
def trial(request):
    print("JH")
    return HttpResponse("h")
def updateDB(request):
    News.objects.all().delete()
    category = ["Business","Entertainment","India","LifeStyle","Politics","ScienceAndTechnology","Sports","World"]
    for c in category:
        print(c)
        all_articles = getNews(category=c)
        for article in all_articles:
            news = News()
            summary = getSummary(article["content"])
            news.headline = html.unescape(article["headline"])
            news.summary = summary
            news.category = c
            news.created = datetime.datetime.now()
            news.contentURL = article["contentURL"]
            news.imageURL = article["imageURL"]
            news.save()
    return HttpResponse("Hello World")
@api_view(['GET','POST'])
def news_list(request):
    if request.method == 'GET':
        c = request.query_params.get("category")
        data = News.objects.filter(category=c).order_by('-created').values()
        serializer = ReactSerializer(data,context={'request':request},many=True)
        return JSONResponse(serializer.data)
@api_view(['GET','POST'])
def home_page_news(request):
    if request.method == 'GET':
        ids = [n.id for n in News.objects.all()]
        req_ids = random.sample(ids,15)
        data = News.objects.filter(id=req_ids[0])
        for i in range(1,len(req_ids)):
            data|= News.objects.filter(id=req_ids[i])
        serializer = ReactSerializer(data,context={'request':request},many=True)
        return JSONResponse(serializer.data)

