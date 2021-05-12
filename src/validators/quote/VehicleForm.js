import * as dayjs                     from 'dayjs';
import * as validate                  from 'validate.js';

const vehicleFormValidator = {
  year: (value, attributes) => {
    const now = dayjs()
    const formatNow = dayjs(now, 'YYYY')
    return {
      datetime: {
        earliest: formatNow.subtract(30, 'year'),
        message: "Unfortunately, we are unable to provide a quote for a vehicle that is 30 years or older."
      }
    }
  }
}

export default function validateVehicle(vehicle, options = true) {
  return validate(vehicle, vehicleFormValidator, options)
};
