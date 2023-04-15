from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from . summarymaker import *
from . webscraping import *
# Create your views here.

class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self,request):
        category = request.query_params.get('category')
        print(category)
        all_articles = getNews(category=category)
        response_news = []
        for article in all_articles:
            summary = getSummary(article["content"])
            response = {"headline":article["headline"],"summary":summary,"contentURL":article["contentURL"],"imageURL":article["imageURL"]}
            response_news.append(response)
        # news = [{"headline":article.headline,"summary":article.summary,"contentURL":article.contentURL,"imageURL":article.imageURL} for article in React.objects.all()]
        return Response(response_news)
    def post(self, request):
  
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)