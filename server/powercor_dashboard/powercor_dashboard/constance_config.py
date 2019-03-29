from decimal import Decimal


CONSTANCE_BACKEND = 'constance.backends.database.DatabaseBackend'

CONSTANCE_CONFIG = {
    'STAGING_WEIGHT': (10, 'Weight of stage field for priority formula'),
    'DUE_DATE_WEIGHT': (20, 'Weight of date field for priority formula'),
    'RESOURCING_WEIGHT': (20, 'Weight of resource field for priority formula'),
    'STATUS_WEIGHT': (15, 'Weight of status field for priority formula'),
    'BUSINESS_IMPORTANCE_WEIGHT': (25, 'Weight of business importance field for priority formula'),
    'BUDGET_WEIGHT': (10, 'Weight of budget field for priority formula'),
    'CLIENT_WEIGHT': (1, 'Weight of cleint field for priority formula'),
    'BUDGET_LOWER_EDGE': (Decimal(30000.00), 'Lower edge for budget which uses "Less than"', Decimal),
    'BUDGET_UPPER_EDGE': (Decimal(100000.00), 'Upper edge for budget which uses "More than"', Decimal),
    'DATE_LOWER_EDGE': (7, 'Amount of days for due date which uses "Less than"'),
    'DATE_UPPER_EDGE': (21, 'Amount of days for due date which uses "More than"'),
    'BUDGET_LOWER_POINTS': (
        1,
        'Amount of points added to priority formula if disciplines budget is lower than lower budget edge'
    ),
    'BUDGET_MIDDLE_POINTS': (
        2,
        'Amount of points added to priority formula if disciplines budget is between upper and lower budget edges'
    ),
    'BUDGET_UPPER_POINTS': (
        3,
        'Amount of points added to priority formula if disciplines budget is higher than upper budget edge'
    ),
    'DUE_DATE_LOWER_POINTS': (
        3,
        'Amount of points added to priority formula if amount of days left for discipline is less than lower date edge'
    ),
    'DUE_DATE_MIDDLE_POINTS': (
        2,
        'Amount of points added to priority formula if amount of days left for discipline is between upper and lower date edges'
    ),
    'DUE_DATE_UPPER_POINTS': (
        1,
        'Amount of points added to priority formula if amount of days left for discipline is bigger than upper date edge'
    ),
}

CONSTANCE_CONFIG_FIELDSETS = {
    'Weights': (
        'STAGING_WEIGHT',
        'DUE_DATE_WEIGHT',
        'RESOURCING_WEIGHT',
        'STATUS_WEIGHT',
        'BUSINESS_IMPORTANCE_WEIGHT',
        'BUDGET_WEIGHT',
        'CLIENT_WEIGHT',
    ),
    'Edge points': (
        'BUDGET_LOWER_EDGE',
        'BUDGET_UPPER_EDGE',
        'DATE_LOWER_EDGE',
        'DATE_UPPER_EDGE',
    ),
    'Budget points': (
        'BUDGET_LOWER_POINTS',
        'BUDGET_MIDDLE_POINTS',
        'BUDGET_UPPER_POINTS',
    ),
    'Due date points': (
        'DUE_DATE_LOWER_POINTS',
        'DUE_DATE_MIDDLE_POINTS',
        'DUE_DATE_UPPER_POINTS',
    )
}
