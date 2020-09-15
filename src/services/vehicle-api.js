import Axios from 'axios';

export default class VehicleOptionsApi {
  static apiUrl = `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_API_NAMESPACE}`

  static manufacturer(year) {
    const url = `${this.apiUrl}/vehicles/${year}/makes/`
    return Axios.get(url)
  }

  static model(year, manufacturer) {
    const url = `${this.apiUrl}/vehicles/${year}` +
                  `/makes/${manufacturer}/models`
    return Axios.get(url)
  }

  static trim(year, manufacturer, model) {
    const url = `${this.apiUrl}/vehicles/${year}/makes/${manufacturer}/models/${model}/trims`
    return Axios.get(url)
  }

  static search(queryStr, searchParamName='query', ) {
    const url = `${this.apiUrl}/vehicles?${searchParamName}=${queryStr}`

    return Axios.get(url)
      .then(response => {
        return response.data.map(vehicle => ({
          year: vehicle.model.year,
          manufacturer: vehicle.make.name,
          model: vehicle.model.name,
          trim: vehicle.trim.name
        }))
      })
  }
}
