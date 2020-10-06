const coverages = [
  {
    "state": "IL",
    "coverage": "BI",
    "type": "LIABILITY",
    "name": "BI (Bodily Injury)",
    "required": "true",
    "values": [{"per_person":"2500000","per_accident":"5000000"}]
  },
  {
    "state": "IL",
    "coverage": "PD",
    "type": "LIABILITY",
    "name": "PD (Property Damage)",
    "required": "true",
    "values": [{"per_accident":"2000000"}]
  },
  {
    "state": "IL",
    "coverage": "UM",
    "type": "LIABILITY",
    "name": "UMBI (Uninsured Motorist BI)",
    "required": "true",
    "values": [{"per_person":"2500000","per_accident":"5000000"}]
  },
  {
    "state": "IL",
    "coverage": "BI",
    "type": "GOOD",
    "name": "BI (Bodily Injury)",
    "required": "true",
    "values": [{"per_person":"2500000","per_accident":"5000000"}]
  },
  {
    "state": "IL",
    "coverage": "COLL",
    "type": "GOOD",
    "name": "COL (Collision)",
    "required": "true",
    "values": [{"deductibles":"100000"}]
  },
  {
    "state": "IL",
    "coverage": "COMP",
    "type": "GOOD",
    "name": "OTC (Other than Collision/Comprehensive)",
    "required": "true",
    "values": [{"deductibles":"100000"}]
  },
  {
    "state": "IL",
    "coverage": "MEDPM",
    "type": "GOOD",
    "name": "Med Pay (Medical Payments)",
    "required": "true",
    "values": [{"deductibles":"100000"}]
  },
  {
    "state": "IL",
    "coverage": "PD",
    "type": "GOOD",
    "name": "PD (Property Damage)",
    "required": "true",
    "values": [{"per_accident":"2500000"}]
  },
  {
    "state": "IL",
    "coverage": "RREIM",
    "type": "GOOD",
    "name": "Rental",
    "required": "true",
    "values": [{"per_day":"2000","maximum":"42000"}]
  },
  {
    "state": "IL",
    "coverage": "TL",
    "type": "GOOD",
    "name": "Towing",
    "required": "true",
    "values": [{"per_disablement":"5000"}]
  },
  {
    "state": "IL",
    "coverage": "UM",
    "type": "GOOD",
    "name": "UMBI (Uninsured Motorist BI)",
    "required": "true",
    "values": [{"per_person":"2500000","per_accident":"5000000"}]
  },
  {
    "state": "IL",
    "coverage": "BI",
    "type": "BETTER",
    "name": "BI (Bodily Injury)",
    "required": "true",
    "values": [{"per_person":"5000000","per_accident":"10000000"}]
  },
  {
    "state": "IL",
    "coverage": "COLL",
    "type": "BETTER",
    "name": "COL (Collision)",
    "required": "true",
    "values": [{"deductibles":"50000"}]
  },
  {
    "state": "IL",
    "coverage": "COMP",
    "type": "BETTER",
    "name": "OTC (Other than Collision/Comprehensive)",
    "required": "true",
    "values": [{"deductibles":"50000"}]
  },
  {
    "state": "IL",
    "coverage": "MEDPM",
    "type": "BETTER",
    "name": "Med Pay (Medical Payments)",
    "required": "true",
    "values": [{"deductibles":"200000"}]
  },
  {
    "state": "IL",
    "coverage": "PD",
    "type": "BETTER",
    "name": "PD (Property Damage)",
    "required": "true",
    "values": [{"per_accident":"5000000"}]
  },
  {
    "state": "IL",
    "coverage": "RREIM",
    "type": "BETTER",
    "name": "Rental",
    "required": "true",
    "values": [{"per_day":"2000","maximum":"42000"}]
  },
  {
    "state": "IL",
    "coverage": "TL",
    "type": "BETTER",
    "name": "Towing",
    "required": "true",
    "values": [{"per_disablement":"5000"}]
  },
  {
    "state": "IL",
    "coverage": "UM",
    "type": "BETTER",
    "name": "UMBI (Uninsured Motorist BI)",
    "required": "true",
    "values": [{"per_person":"5000000","per_accident":"10000000"}]
  }
]

export default coverages
