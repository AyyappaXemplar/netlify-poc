import * as dayjs                     from 'dayjs';
import * as validate                  from 'validate.js';

const vehicleFormValidator = {
  year: (value, attributes) => {
    const now = dayjs()
    const formatNow = dayjs(now, 'YYYY')
    return {
      datetime: {
        earliest: formatNow.subtract(30, 'year'),
        message: "^Vehicle cannot be older than 30 years"
      }
    }
  }
}

export default function validateVehicle(vehicle, options = true) {
  return validate(vehicle, vehicleFormValidator, options)
};
