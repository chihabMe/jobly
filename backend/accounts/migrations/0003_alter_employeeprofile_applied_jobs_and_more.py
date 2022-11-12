# Generated by Django 4.1.1 on 2022-11-04 17:50

import accounts.models
import accounts.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("jobs", "0003_job_created_job_update"),
        ("accounts", "0002_employeeprofile_applied_jobs_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="employeeprofile",
            name="applied_jobs",
            field=models.ManyToManyField(
                blank=True, null=True, related_name="applied_by", to="jobs.job"
            ),
        ),
        migrations.AlterField(
            model_name="employeeprofile",
            name="book_marked_jobs",
            field=models.ManyToManyField(
                blank=True, null=True, related_name="book_marked_by", to="jobs.job"
            ),
        ),
        migrations.AlterField(
            model_name="employeeprofile",
            name="cv",
            field=models.FileField(
                blank=True,
                null=True,
                upload_to=accounts.models.cvFileNamer,
                validators=[accounts.validators.validate_file_extension],
            ),
        ),
        migrations.AlterField(
            model_name="employeeprofile",
            name="image",
            field=models.ImageField(
                blank=True, null=True, upload_to=accounts.models.imageFileNamer
            ),
        ),
    ]
