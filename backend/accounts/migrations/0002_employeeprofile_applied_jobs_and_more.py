# Generated by Django 4.1.1 on 2022-11-04 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0002_job_location_job_user'),
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='employeeprofile',
            name='applied_jobs',
            field=models.ManyToManyField(related_name='applied_by', to='jobs.job'),
        ),
        migrations.AddField(
            model_name='employeeprofile',
            name='book_marked_jobs',
            field=models.ManyToManyField(related_name='book_marked_by', to='jobs.job'),
        ),
    ]
