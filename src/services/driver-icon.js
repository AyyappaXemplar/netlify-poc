import { ReactComponent as AdultFemale } from '../images/adult-female.svg';
import { ReactComponent as AdultMale } from '../images/adult-male.svg';
import { ReactComponent as YoungFemale } from '../images/young-female.svg';
import { ReactComponent as YoungMale } from '../images/young-male.svg';

const DriverIcons = {
  AdultFemale: AdultFemale,
  AdultMale: AdultMale,
  YoungFemale: YoungFemale,
  YoungMale: YoungMale
}


export default function getDriverIcon(driver) {
  const age = driver.birthday > 21 ? 'Adult' : 'Young'
  const gender = driver.gender === 'male' ? 'Male' : 'Female'
  return DriverIcons[`${age}${gender}`]
}
