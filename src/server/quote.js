export default  {
  "id": "quote_123456789",
  "object": "quote",
  "carrier": ["first_chicago"],
  "status": "rated",
  "created_at": 1594718279,
  "updated_at": 1594718279,
  "rated": true,
  "rated_at": 1594718279,
  "signed_at": 1594718279,
  "paid_at": 1594718279,
  "bound_at": 1594718279,
  "submitted_at": 1594718279,
  "term": {
    "effective": 1596240000,
    "expiration": 1612137599,
    "duration": 6,
  },
  "zip_code": "60622",
  "address": {
    "line1": "123 Main St.",
    "line2": "",
    "city": "Chicago",
    "state": "IL",
    "zip_code": "60622"
  },
  "email_address": "john.doe@example.com",
  "phone_number": "+13128881234",
  "mobile_number": "+13128884321",
  "sms_notifications": true,
  "homeowner": true,
  "currently_insured": true,
  "pay_in_full": true,
  "prior_policy": {
    "insurer_name": "Elephant",
    "term_expiration": 1596153600,
    "duration": 6,
    "continuous": false
  },
  "drivers": [
  {
    "id": "qd_12345",
    "object": "quote_driver",
    "quote": "quote_123456789",
    "created_at": 1594718279,
    "updated_at": 1594718279,
    "policyholder": true,
    "first_name": "John",
    "last_name": "Test",
    "other_name": null,
    "address": {
      "line1": "123 Main St.",
      "line2": null,
      "city": "Chicago",
      "state": "IL",
      "zip_code": "60622"
    },
    "email": "john.test@example.com",
    "phone": null,
    "mobile": "3128831882",
    "gender": "male",
    "birthday": "1990-09-13",
    "marital_status": "married",
    "license_type": "driver",
    "license_status": "active",
    "license_issued_at": 301830403,
    "license_state": "IL",
    "good_driver": true,
    "good_student": false,
    "defensive_driver": false,
    "requires_sr22": false,
    "occupation": null,
    "international_license": false
  },
  {
    "id": "qd_12346",
    "object": "quote_driver",
    "quote": "quote_123456789",
    "created_at": 1594718280,
    "updated_at": 1594718280,
    "policyholder": false,
    "first_name": "Jane",
    "last_name": "Test",
    "other_name": null,
    "address": {
      "line1": "123 Main St.",
      "line2": null,
      "city": "Chicago",
      "state": "IL",
      "zip_code": "60622"
    },
    "email": "jane.test@example.com",
    "phone": null,
    "mobile": "3128831882",
    "gender": "female",
    "birthday": "1990-09-13",
    "marital_status": "married",
    "license_type": "driver",
    "license_status": "active",
    "license_issued_at": 301830403,
    "license_state": "IL",
    "good_driver": true,
    "good_student": false,
    "defensive_driver": false,
    "requires_sr22": false,
    "occupation": null,
    "international_license": false
  }
  ],
  "vehicles": [
  {
    "id":"b3dd4266-e480-4f12-b289-6e9fa82f47c8",
    "manufacturer": "Acura",
    "coverage_package_name": "GOOD",
    "model": "MDX",
    "year": 2017,
    "trim": "XL",
    "estimated_annual_distance": null,
    "days_driven_per_week": null,
    "registered_state": "IL",
    "use_code": "commuting",
    "liability_only": false,
    "logo_url": "https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png",
    "lienholder": {
      "instituation_name": "Acura Financial",
      "lienholder_type": "lienholder",
      "address": {
        "line1": "123 Main St.",
        "line2": "",
        "city": "Chicago",
        "state": "IL",
        "zip_code": "60622"
      },
    },
    "vehicle_premium": 29800,
    "coverages": [
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
      }
    ]
  }
  ]
}
