# Generated by Django 2.0.2 on 2018-04-08 17:36

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0003_auto_20180408_1439'),
    ]

    operations = [
        migrations.AddField(
            model_name='businessimportancechoice',
            name='weight',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='resourceschoice',
            name='weight',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stagechoice',
            name='weight',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='statuschoice',
            name='weight',
            field=models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(0)]),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='discipline',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='project', to='dashboard.Project'),
        ),
        migrations.AlterUniqueTogether(
            name='businessimportancechoice',
            unique_together={('choice', 'weight')},
        ),
        migrations.AlterUniqueTogether(
            name='resourceschoice',
            unique_together={('choice', 'weight')},
        ),
        migrations.AlterUniqueTogether(
            name='stagechoice',
            unique_together={('choice', 'weight')},
        ),
        migrations.AlterUniqueTogether(
            name='statuschoice',
            unique_together={('choice', 'weight')},
        ),
    ]
