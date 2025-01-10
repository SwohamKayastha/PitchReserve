# Generated by Django 5.0.3 on 2025-01-10 05:45

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Owner', '0002_owner_image_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='FutsalFacility',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('location', models.CharField(max_length=255)),
                ('coordinates', models.CharField(blank=True, max_length=100, null=True)),
                ('number_of_pitches', models.IntegerField()),
                ('pitch_dimensions', models.CharField(blank=True, max_length=100, null=True)),
                ('availability_start_time', models.TimeField()),
                ('availability_end_time', models.TimeField()),
                ('price_per_hour', models.DecimalField(decimal_places=2, max_digits=10)),
                ('has_changing_room', models.BooleanField(default=False)),
                ('parking_facilities', models.CharField(blank=True, max_length=100, null=True)),
                ('water_availability', models.BooleanField(default=False)),
                ('event_capacity', models.IntegerField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('owner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='facilities', to='Owner.owner')),
            ],
        ),
    ]