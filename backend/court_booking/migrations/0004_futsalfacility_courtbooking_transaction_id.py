# Generated by Django 5.0.3 on 2025-02-16 09:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('court_booking', '0003_alter_courtbooking_schedule'),
    ]

    operations = [
        migrations.CreateModel(
            name='FutsalFacility',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='courtbooking',
            name='transaction_id',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
