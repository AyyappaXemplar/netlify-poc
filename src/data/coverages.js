const coverages = [
  {
    "state": "IL",
    "type": "bodily_injury", // it was "coverage"
    "package": "LIABILITY",
    "description": "Bodily Injury (BI)",
    "required": "true",
    "limits": [ // it was "values"
      {
        "applies_to": "per_person",
        "amount": 2500000
      }, {
        "applies_to": "per_accident",
        "amount": 5000000
      }
    ]
  },
  {
    "state": "IL",
    "type": "property_damage",
    "package": "LIABILITY",
    "description": "Property Damage (PD)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_accident",
        "amount": 2000000
      }
    ]
  },
  {
    "state": "IL",
    "type": "uninsured_motorist_bodily_injury",
    "package": "LIABILITY",
    "description": "Uninsured Motorist BI (UMBI)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_person",
        "amount": 2500000
      }, {
        "applies_to": "per_accident",
        "amount": 5000000
      }
    ]
  },
  {
    "state": "IL",
    "type": "bodily_injury",
    "package": "GOOD",
    "description": "Bodily Injury (BI)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_person",
        "amount": 2500000
      }, {
        "applies_to": "per_accident",
        "amount": 5000000
      }
    ]
  },
  {
    "state": "IL",
    "type": "collision",
    "package": "GOOD",
    "description": "Collision (COLL)",
    "required": "true",
    "limits": [
      {
        "applies_to": "deductible",
        "amount": 100000
      }
    ]
  },
  {
    "state": "IL",
    "type": "otc",
    "package": "GOOD",
    "description": "Comprehensive (COMP)",
    "required": "true",
    "limits": [
      {
        "applies_to": "deductible",
        "amount": 100000
      }
    ]
  },
  {
    "state": "IL",
    "type": "medical_payments",
    "package": "GOOD",
    "description": "Medical Payments (MP)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_person",
        "amount": 100000
      }
    ]
  },
  {
    "state": "IL",
    "type": "property_damage",
    "package": "GOOD",
    "description": "Property Damage (PD)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_accident",
        "amount": 2500000
      }
    ]
  },
  {
    "state": "IL",
    "type": "rental",
    "package": "GOOD",
    "description": "Rental",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_day",
        "amount": 2000
      }, {
        "applies_to": "maximum",
        "amount": 42000
      }
    ]
  },
  // {
  //   "state": "IL",
  //   "type": "towing",
  //   "package": "GOOD",
  //   "description": "Towing",
  //   "required": "true",
  //   "limits": [
  //     {
  //       "applies_to": "per_disablement",
  //       "amount": 5000
  //     }
  //   ]
  // },
  {
    "state": "IL",
    "type": "uninsured_motorist_bodily_injury",
    "package": "GOOD",
    "description": "Uninsured Motorist BI (UMBI)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_person",
        "amount": 2500000
      }, {
        "applies_to": "per_accident",
        "amount":5000000
      }]
  },
  {
    "state": "IL",
    "type": "bodily_injury",
    "package": "BETTER",
    "description": "Bodily Injury (BI)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_person",
        "amount": 5000000
      }, {
        "applies_to": "per_accident",
        "amount": 10000000
      }
    ]
  },
  {
    "state": "IL",
    "type": "collision",
    "package": "BETTER",
    "description": "Collision",
    "required": "true",
    "limits": [
      {
        "applies_to": "deductible",
        "amount": 50000
      }
    ]
  },
  {
    "state": "IL",
    "type": "otc",
    "package": "BETTER",
    "description": "Comprehensive",
    "required": "true",
    "limits": [
      {
        "applies_to": "deductible",
        "amount": 50000
      }
    ]
  },
  {
    "state": "IL",
    "type": "medical_payments",
    "package": "BETTER",
    "description": "Medical Payments",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_person",
        "amount": 200000
      }
    ]
  },
  {
    "state": "IL",
    "type": "property_damage",
    "package": "BETTER",
    "description": "Property Damage (PD)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_accident",
        "amount": 5000000
      }
    ]
  },
  {
    "state": "IL",
    "type": "rental",
    "package": "BETTER",
    "description": "Rental",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_day",
        "amount": 2000
      }, {
        "applies_to": "maximum",
        "amount": 42000
      }
    ]
  },
  // {
  //   "state": "IL",
  //   "type": "towing",
  //   "package": "BETTER",
  //   "description": "Towing",
  //   "required": "true",
  //   "limits": [
  //     {
  //       "applies_to": "per_disablement",
  //       "amount": 5000
  //     }
  //   ]
  // },
  {
    "state": "IL",
    "type": "uninsured_motorist_bodily_injury",
    "package": "BETTER",
    "description": "Uninsured Motorist BI (UMBI)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_person",
        "amount": 5000000
      }, {
        "applies_to": "per_accident",
        "amount": 10000000
      }
    ]
  }
]

export default coverages
