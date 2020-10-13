const coverages = [
  {
    "state": "IL",
    "type": "bodily_injury", // it was "coverage"
    "package": "LIABILITY",
    "description": "BI (Bodily Injury)",
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
    "description": "PD (Property Damage)",
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
    "description": "UMBI (Uninsured Motorist BI)",
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
    "description": "BI (Bodily Injury)",
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
    "description": "COL (Collision)",
    "required": "true",
    "limits": [
      {
        "applies_to": "deductible",
        "amount": 100000
      }
    ]
  },
  // {
  //   "state": "IL",
  //   "type": "COMP",
  //   "package": "GOOD",
  //   "description": "OTC (Other than Collision/Comprehensive)",
  //   "required": "true",
  //   "limits": [
  //     {
  //       "applies_to": "deductible",
  //       "amount": 100000
  //     }
  //   ]
  // },
  {
    "state": "IL",
    "type": "medical_payments",
    "package": "GOOD",
    "description": "Med Pay (Medical Payments)",
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
    "type": "property_damage",
    "package": "GOOD",
    "description": "PD (Property Damage)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_accident",
        "amount": 2500000
      }
    ]
  },
  // {
  //   "state": "IL",
  //   "type": "RREIM",
  //   "package": "GOOD",
  //   "description": "Rental",
  //   "required": "true",
  //   "limits": [
  //     {
  //       "applies_to": "per_day",
  //       "amount": 2000
  //     }, {
  //       "applies_to": "maximum",
  //       "amount": 42000
  //     }
  //   ]
  // },
  // {
  //   "state": "IL",
  //   "type": "TL",
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
    "description": "UMBI (Uninsured Motorist BI)",
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
    "description": "BI (Bodily Injury)",
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
    "description": "COL (Collision)",
    "required": "true",
    "limits": [
      {
        "applies_to": "deductible",
        "amount": 50000
      }
    ]
  },
  // {
  //   "state": "IL",
  //   "type": "COMP",
  //   "package": "BETTER",
  //   "description": "OTC (Other than Collision/Comprehensive)",
  //   "required": "true",
  //   "limits": [
  //     {
  //       "applies_to": "deductible",
  //       "amount": 50000
  //     }
  //   ]
  // },
  {
    "state": "IL",
    "type": "medical_payments",
    "package": "BETTER",
    "description": "Med Pay (Medical Payments)",
    "required": "true",
    "limits": [
      {
        "applies_to": "deductible",
        "amount": 200000
      }
    ]
  },
  {
    "state": "IL",
    "type": "property_damage",
    "package": "BETTER",
    "description": "PD (Property Damage)",
    "required": "true",
    "limits": [
      {
        "applies_to": "per_accident",
        "amount": 5000000
      }
    ]
  },
  // {
  //   "state": "IL",
  //   "type": "RREIM",
  //   "package": "BETTER",
  //   "description": "Rental",
  //   "required": "true",
  //   "limits": [
  //     {
  //       "applies_to": "per_day",
  //       "amount": 2000
  //     }, {
  //       "applies_to": "maximum",
  //       "amount": 42000
  //     }
  //   ]
  // },
  // {
  //   "state": "IL",
  //   "type": "TL",
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
    "description": "UMBI (Uninsured Motorist BI)",
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
