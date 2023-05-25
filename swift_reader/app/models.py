from django.db import models

# Create your models here.
class React(models.Model):
    headline =  models.TextField()
    summary = models.TextField()
    contentURL = models.URLField()
    imageURL = models.URLField()

class News(models.Model):
    headline =  models.TextField()
    summary = models.TextField()
    contentURL = models.URLField()
    imageURL = models.URLField()
    category = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return str(self.id)