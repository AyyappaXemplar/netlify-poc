import Axios from 'axios';

export default class VehicleOptionsApi {
  static apiUrl = `${process.env.REACT_APP_API_BASE_URL}/${process.env.REACT_APP_API_NAMESPACE}`

  static getIds(state) {
    const { year, manufacturer, model } = state.vehicle
    let { manufacturer: manufacturerOptions , model: modelOptions } = state.options
    let manufacturerId, modelId

    if (manufacturerOptions.length) {
      const option = manufacturerOptions.find(item => item.name === manufacturer)
      manufacturerId = option ? option.id : null
    }

    if (modelOptions.length) {
      const modelOption = modelOptions.find(item => item.name === model)
      modelId = modelOption ? modelOption.id : null
    }

    return {
      manufacturerId,
      modelId,
      year
    }
  }

  static manufacturer(state) {
    const { year } = this.getIds(state)
    const url = `${this.apiUrl}/vehicles/${year}/makes/`

    return Axios.get(url)
  }

  static model(state) {
    const { year, manufacturerId } = this.getIds(state)
    const url = `${this.apiUrl}/vehicles/${year}/makes/${manufacturerId}/models`
    return Axios.get(url)
  }

  static trim(state) {
    const { year, manufacturerId, modelId } = this.getIds(state)
    const url = `${this.apiUrl}/vehicles/${year}/makes/${manufacturerId}/models/${modelId}/trims`
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
          trim: vehicle.trim.name,
          vin: vehicle.trim.vin
        }))
      })
  }
}
