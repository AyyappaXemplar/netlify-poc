const coverages = [
  {
    "code": "BI",
    "description": "Bodily Injury Liability",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 2500000,
        "applies_to": "per_person"
      },
      {
        "amount": 5000000,
        "applies_to": "per_accident"
      }
    ]
  },
  {
    "code": "PD",
    "description": "Property Damage",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 5000000,
        "applies_to": "per_accident"
      }
    ]
  },
  {
    "code": "IM",
    "description": "Uninsured Motorist (BI)",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 25000000,
        "applies_to": "per_accident"
      }
    ]
  },
  {
    "code": "UNM",
    "description": "Underinsured Motorist (BI)",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 25000000,
        "applies_to": "per_accident"
      }
    ]
  },
  {
    "code": "CO",
    "description": "Collision",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 5000000,
        "applies_to": "per_accident"
      }
    ]
  },
  {
    "code": "COMP",
    "description": "Comprehensive",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 100000,
        "applies_to": "deductible"
      }
    ]
  },
  {
    "code": "RI",
    "description": "Rental Reimbursement",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 5000000,
        "applies_to": "per_accident"
      }
    ]
  },
  {
    "code": "TL",
    "description": "Towing & Labor",
    "coverage_premium": 26000,
    "limits": [
      {
        "amount": 5000000,
        "applies_to": "per_accident"
      }
    ]
  }
]

export default coverages
