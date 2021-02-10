const violationsDesc = [
{
  "label": "At-Fault Accident",
  "value": "AFA",
  "data": "10",
  "type": "at_fault"
},
{
  "label": "Child Seat Belt Violation",
  "value": "CBLT",
  "data": "22",
  "type": "child_seat_belt"
},
{
  "label": "Consumed alcohol while driving",
  "value": "CALC",
  "data": "14",
  "type": "consuming_alcohol"
},
{
  "label": "Displaying altered drivers license, or unlawful use of drivers license",
  "value": "ALIC",
  "data": "13",
  "type": "altered_license"
},
{
  "label": "Disregarding any stop sign, red light, or any official traffic control device",
  "value": "CTLD",
  "data": "24",
  "type": "red_light"
},
{
  "label": "Driving on wrong side of road, driving wrong way, or driving on the sidewalk",
  "value": "WRSD",
  "data": "21",
  "type": "wrongway_sidewalk"
},
{
  "label": "Driving too fast for conditions, excessive acceleration, and failure to control speed or vehicle",
  "value": "FAST",
  "data": "19",
  "type": "too_fast"
},
{
  "label": "Driving while unlicensed or while license is suspended or revoked",
  "value": "ULIC",
  "data": "12",
  "type": "unlicensed"
},
{
  "label": "DWI or DUI conviction in conjunction with an at-fault accident",
  "value": "DWIA",
  "data": "10",
  "type": "dwi_with_accident"
},
{
  "label": "DWI, DUI, Education program required, or failure to undergo testing under implied consent law",
  "value": "DWI",
  "data": "14",
  "type": "dwi"
},
{
  "label": "Exceeding the speed limit in a construction zone",
  "value": "CSPD",
  "data": "19",
  "type": "construction_speeding"
},
{
  "label": "Expired license or failure to display license",
  "value": "ELIC",
  "data": "11",
  "type": "expired_license"
},
{
  "label": "Failure to stop or remain stopped for a school bus",
  "value": "SBUS",
  "data": "21",
  "type": "school_bus"
},
{
  "label": "Failure to use turn signal",
  "value": "TSIG",
  "data": "21",
  "type": "turn_signal"
},
{
  "label": "Failure to yield right of way",
  "value": "AYLD",
  "data": "21",
  "type": "yield_row"
},
{
  "label": "Failure to yield to an emergency vehicle",
  "value": "EYLD",
  "data": "21",
  "type": "yield_emergency"
},
{
  "label": "Fleeing from or attempting to elude a police officer",
  "value": "FLEE",
  "data": "18",
  "type": "fleeing_police"
},
{
  "label": "Following too close",
  "value": "TOOC",
  "data": "29",
  "type": "tailgating"
},
{
  "label": "Illegal or improper turn or backing",
  "value": "TURN",
  "data": "24",
  "type": "illegal_turn"
},
{
  "label": "Illegal Posession of Alcohol, Drugs or Firearms",
  "value": "POSS",
  "data": "14",
  "type": "illegal_possession"
},
{
  "label": "Improper Lane Use",
  "value": "ILAN",
  "data": "24",
  "type": "improper_lane_use"
},
{
  "label": "Leaving scene of accident, hit and run, or failure to stop and give information",
  "value": "LEAV",
  "data": "10",
  "type": "fleeing_scene"
},
{
  "label": "Major Speeding Violation",
  "value": "MSPD",
  "data": "19",
  "type": "major_speeding"
},
{
  "label": "Misc Minor Moving Violation",
  "value": "MMIN",
  "data": "24",
  "type": "minor_moving"
},
{
  "label": "Misc Non-moving Violation",
  "value": "MNON",
  "data": "25",
  "type": "non_moving"
},
{
  "label": "Negligent homicide or any felony conviction arising out of the operation of a motor vehicle",
  "value": "NEGH",
  "data": "16",
  "type": "negligent_homicide"
},
{
  "label": "No Proof of Insurance",
  "value": "NPRF",
  "data": "25",
  "type": "no_proof_insurance"
},
{
  "label": "No seat belt",
  "value": "BELT",
  "data": "22",
  "type": "no_seat_belt"
},
{
  "label": "Non-Chargable Suspension",
  "value": "NSUS",
  "data": "13",
  "type": "non_chargable_suspension"
},
{
  "label": "Not At-Fault Accident",
  "value": "NAFA",
  "data": "10",
  "type": "not_at_fault"
},
{
  "label": "Operating a cellular device while driving in a school or construction zone",
  "value": "CELL",
  "data": "12",
  "type": "texting"
},
{
  "label": "Other-Than-Collision Claim",
  "value": "OTCC",
  "data": "25",
  "type": "otc_claim"
},
{
  "label": "Reckless driving, or similar charge",
  "value": "RECK",
  "data": "16",
  "type": "reckless"
},
{
  "label": "Speed contest or racing",
  "value": "SPDC",
  "data": "19",
  "type": "racing"
},
{
  "label": "Speeding",
  "value": "SPD",
  "data": "19",
  "type": "speeding"
},
{
  "label": "Speeding over 25 MPH",
  "value": "SP25",
  "data": "19",
  "type": "speeding_over_25mph"
},
{
  "label": "Suspended License",
  "value": "SUSP",
  "data": "12",
  "type": "suspended_license"
},
{
  "label": "Labeling or unlawful use of a cellular device while driving",
  "value": "label",
  "data": "18",
  "type": "cellphone"
},
{
  "label": "Unmapped Accident or Violation",
  "value": "XXX",
  "data": "25",
  "type": "unmapped"
},
{
  "label": "Unsafe lane change",
  "value": "ULAN",
  "data": "24",
  "type": "lane_change"
},
{
  "label": "Unverifiable MVR/record",
  "value": "UMVR",
  "data": "16",
  "type": "unverifiable_mvr"
},
{
  "label": "Violated DL restriction",
  "value": "DRES",
  "data": "13",
  "type": "violated_restriction"
}
]

export default violationsDesc;
