# Generated by Django 2.0.3 on 2018-08-12 14:20

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BusinessImportanceChoice',
            fields=[
                ('choice', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('weight', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Client',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200, unique=True)),
                ('weight', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
        ),
        migrations.CreateModel(
            name='Discipline',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('PD', 'Primary Design'), ('CD', 'Civil Design'), ('SD', 'Secondary Design'), ('OD', 'Overhead Design'), ('UD', 'Underground Design')], max_length=200)),
                ('budget', models.DecimalField(blank=True, decimal_places=2, max_digits=14, null=True)),
                ('due_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Manager',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=400, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('network', models.IntegerField(primary_key=True, serialize=False, validators=[django.core.validators.MinValueValidator(1000000), django.core.validators.MaxValueValidator(9999999)])),
                ('name', models.CharField(max_length=200)),
                ('comment', models.TextField(blank=True, null=True)),
                ('priority', models.IntegerField(blank=True, null=True)),
                ('business_importance', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.BusinessImportanceChoice')),
                ('client', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.Client')),
                ('manager', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.Manager')),
            ],
        ),
        migrations.CreateModel(
            name='ResourcesChoice',
            fields=[
                ('choice', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('weight', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StageChoice',
            fields=[
                ('choice', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('weight', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='StatusChoice',
            fields=[
                ('choice', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('weight', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AlterUniqueTogether(
            name='statuschoice',
            unique_together={('choice', 'weight')},
        ),
        migrations.AlterUniqueTogether(
            name='stagechoice',
            unique_together={('choice', 'weight')},
        ),
        migrations.AlterUniqueTogether(
            name='resourceschoice',
            unique_together={('choice', 'weight')},
        ),
        migrations.AddField(
            model_name='discipline',
            name='project',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='disciplines', to='dashboard.Project'),
        ),
        migrations.AddField(
            model_name='discipline',
            name='resources',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.ResourcesChoice'),
        ),
        migrations.AddField(
            model_name='discipline',
            name='stage',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.StageChoice'),
        ),
        migrations.AddField(
            model_name='discipline',
            name='status',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='dashboard.StatusChoice'),
        ),
        migrations.AlterUniqueTogether(
            name='businessimportancechoice',
            unique_together={('choice', 'weight')},
        ),
        migrations.AlterUniqueTogether(
            name='discipline',
            unique_together={('name', 'project')},
        ),
    ]
