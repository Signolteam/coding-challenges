# Generated by Django 4.1.5 on 2023-02-02 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tasks', '0006_alter_task_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='completed_by',
            field=models.DateField(blank=True),
        ),
    ]
