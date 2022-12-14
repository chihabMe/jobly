# Generated by Django 4.1.1 on 2022-11-04 17:30

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("locations", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="location",
            name="user",
            field=models.ForeignKey(
                default=1,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="added_locations",
                to=settings.AUTH_USER_MODEL,
            ),
            preserve_default=False,
        ),
    ]
