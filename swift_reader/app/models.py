from django.db import models

# Create your models here.
class React(models.Model):
    headline =  models.TextField()
    summary = models.TextField()
    contentURL = models.URLField()
    imageURL = models.URLField()