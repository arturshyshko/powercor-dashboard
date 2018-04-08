# Generated by Django 2.0.2 on 2018-04-08 14:39

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_auto_20180408_1411'),
    ]

    operations = [
        migrations.AlterField(
            model_name='discipline',
            name='budget',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=14, null=True),
        ),
        migrations.AlterField(
            model_name='discipline',
            name='due_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='discipline',
            name='resources',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.ResourcesChoice'),
        ),
        migrations.AlterField(
            model_name='discipline',
            name='stage',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.StageChoice'),
        ),
        migrations.AlterField(
            model_name='discipline',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.StatusChoice'),
        ),
        migrations.AlterField(
            model_name='project',
            name='business_importance',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.BusinessImportanceChoice'),
        ),
        migrations.AlterField(
            model_name='project',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
    ]