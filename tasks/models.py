import datetime
from django.db import models

class Task(models.Model):
    STATUS_CHOICES = [
        ('Approved','Approved'),
        ('Rejected','Rejected'),
        ('Review','Review'),
    ]
    description = models.CharField(max_length=1000)
    created_by = models.CharField(max_length=255)
    email = models.EmailField(max_length=255)
    completed_by = models.DateTimeField(blank=True)
    company = models.CharField(max_length=255)
    status = models.CharField(max_length=255, default='Review', choices=STATUS_CHOICES)
    timestamp = models.DateField(default=datetime.datetime.now, blank=True)
    
    def __str__(self):
        return self.description
