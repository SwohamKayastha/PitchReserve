# Generated by Django 5.0.3 on 2025-01-16 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('facilities', '0004_remove_futsalfacility_image_url_facilityimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='futsalfacility',
            name='event_capacity',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
