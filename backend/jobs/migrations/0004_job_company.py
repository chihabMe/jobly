# Generated by Django 4.1.1 on 2022-11-05 08:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("accounts", "0003_alter_employeeprofile_applied_jobs_and_more"),
        ("jobs", "0003_job_created_job_update"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="company",
            field=models.ForeignKey(
                default=2,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="job",
                to="accounts.companyprofile",
            ),
        ),
    ]