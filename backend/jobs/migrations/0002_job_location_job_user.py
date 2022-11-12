# Generated by Django 4.1.1 on 2022-11-04 17:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("locations", "0002_location_user"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("jobs", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="job",
            name="location",
            field=models.ForeignKey(
                default=16,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="jobs",
                to="locations.location",
            ),
        ),
        migrations.AddField(
            model_name="job",
            name="user",
            field=models.ForeignKey(
                default=15,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="posted_jobs",
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
    ]
