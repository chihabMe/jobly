# Generated by Django 4.1.1 on 2022-12-25 17:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("locations", "0002_location_user"),
        ("accounts", "0010_alter_companyprofile_location"),
    ]

    operations = [
        migrations.AlterField(
            model_name="employeeprofile",
            name="location",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="employees",
                to="locations.location",
            ),
        ),
    ]