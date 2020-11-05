import { Server, Model, belongsTo, hasMany, Response, ActiveModelSerializer } from "miragejs"
const quote = require('./quote.json')
const carriers = require('./carriers.json')
const rate = require('./rate.json')


export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,
    serializers : {
      application: ActiveModelSerializer,
      quote: ActiveModelSerializer.extend({
        embed: true,
        include: ['vehicles', 'drivers']
      })
    },
    models: {
      quote: Model.extend({
        vehicles: hasMany(),
        drivers: hasMany()
      }),
      rate: Model,
      vehicle: Model.extend({
        quote: belongsTo(),
      }),
      address: Model.extend({
        quote: belongsTo(),
      }),
      driver: Model.extend({
        quote: belongsTo(),
      }),
      makes: Model
    },

    seeds(server) {
      server.create("quote")
      server.db.loadData({
        makes: [
          {
            name: "Acura",
            logo: "https://cdn.insureonline.com/vehicles/images/acura.svg"
          },
          {
            name: "BMW",
            logo: "https://cdn.insureonline.com/vehicles/images/bmw.svg"
          }
        ],
        vehicles: rate.best_match.vehicles
      })
      server.db.loadData()
    },

    routes() {
      this.urlPrefix = process.env.REACT_APP_API_BASE_URL;
      this.namespace = process.env.REACT_APP_API_NAMESPACE;

      // zip code lookup
      this.get("/locations/lookup", function(schema, request) {
        let zipCode = request.queryParams.zip_code
        if (zipCode === '28030') {
          return new Response(
            400, { some: "header" }, { errors: [`${zipCode} is not covered`] }
          )
        } else if (zipCode === '60638') {
          return {
            "zip": "60638", "state": "IL",
            "counties": [
              { "name": "COOK", "cities": ["BEDFORD PARK", "CHICAGO"] },
              { "name": "OTHER County", "cities": ["CITY C", "CITY D"] }
            ]
          }
        } else {
          return {
            "zip": "60647", "state": "IL",
            "counties": [{ "name": "COOK", "cities": ["CHICAGO"] }]
          }
        }
      }, { timing: 1500 })

      // get quote
      this.get("/quotes/:quoteId", function(schema, request) {
        const quoteId = request.params.quoteId
        let respQuote = schema.quotes.find(quoteId)

        if (respQuote) {
          const json = this.serialize(quote)
          return json.quote
        } else {
          return quote
        }
      })

      // create quote
      this.post("/quotes", function(schema, request) {
        let attrs = JSON.parse(request.requestBody)
        let zipCode = attrs.zip_code

        if (zipCode.match(/606/)) {
          const quote = schema.quotes.create(attrs)
          const json = this.serialize(quote)
          return json.quote
        } else {
          return new Response(
            400,
            { some: "header" },
            { errors: [`${zipCode} is not covered`] }
          )
        }
      }, {timing: 2000})

      // update quote
      this.patch("/quotes/:id", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const id = request.params.id
        const quote = schema.quotes.find(id)
        quote.update(attrs)

        return quote.attrs
      })

      // add driver to quote
      this.post("/quotes/:id/drivers", (schema, request) => {
        const { id } = request.params
        const quote = schema.quotes.find(id)
        const attrs = JSON.parse(request.requestBody)
        const driver = quote.createDriver(attrs)
        quote.save()

        return driver.attrs
      })

      // update driver
      this.patch("/quotes/:id/drivers/:driverId", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        let id = request.params.driverId
        const driver = schema.drivers.find(id)
        driver.update(attrs)

        return driver.attrs
      })

      // delete driver
      this.delete("/quotes/:id/drivers/:driverId", (schema, request) => {
        const driverId = request.params.driverId
        const driver = schema.drivers.find(driverId)
        return driver.destroy
      })

      // add vehicle to quote
      this.post("/quotes/:id/vehicles", (schema, request) => {
        const { id } = request.params
        let myQuote = schema.quotes.find(id)

        if (!myQuote) {
          return quote.vehicles[0]
        }

        const attrs = {
          ...JSON.parse(request.requestBody),
          logo_url: "https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png",
          object:"quote_vehicle",
          vehicle_premium: 60800
        }
        const vehicle = myQuote.createVehicle(attrs)
        vehicle.save()
        myQuote.save()

        return vehicle.attrs
      })

      // update vehicle
      this.patch("/quotes/:id/vehicles/:vehicleId", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const id = request.params.vehicleId
        const vehicle = schema.vehicles.find(id)
        const { vehicle_premium } = vehicle
        attrs.vehicle_premium = vehicle_premium + 100
        vehicle.update(attrs)
        vehicle.save()
        return vehicle.attrs
      })

      // delete vehicle
      this.delete('/quotes/:id/vehicles/:vehicleId', (schema, request) => {
        const vehicleId = request.params.vehicleId
        const vehicle = schema.vehicles.find(vehicleId)
        return vehicle.destroy
      })

      // rate quote. WARNING: use function instead of fat arrow to make sure the serializer works.
      this.get('/quotes/:quoteId/rates', function(schema, request) {
        const id = request.params.quoteId
        let myQuote = schema.quotes.find(id)
        if (!myQuote) {
          const dbVehicles = schema.vehicles.first().attrs
          rate.best_match.vehicles = [dbVehicles]
          return rate
        }

        const vehicles = myQuote.vehicles.models
        rate.best_match.vehicles = vehicles
        return rate

        // return new Response(
        //   400,
        //   { some: "header" },
        //   { errors: ['error rating quote'] }
      }, { timing: 1000 })

      // get carriers
      this.get('/carriers/getallcarriers', function(schema, request) {
        return carriers
      })

      // vehicle search
      this.get("/vehicles", (schema, request) => {
        return [
          {
            "id": "veh_12345",
            "make": {
              id: "de84396a-9678-4b7c-aeba-e3f25eb5f68d",
              name: "Acura",
              logo: "https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png",
            },
            "model": {
              id: "28229ee1-349e-4bd4-8993-a69d432d6c03",
              year: "2012",
              name: "Awesome-acura-model"
            },
            "trim": {
              id: "05d72783-1c8e-4d83-b754-0c9bbf41a0d9",
              name: "Work Truck 4dr Crew Cab SB (6.0L 8cyl 6A)"
            },
            "vin": "5J8YD3H3KL",
            "logo": "https://cdn.insureonline.com/vehicles/images/acura.svg"
          },
          {
            "id": "veh_54321",

            "make": {
              id: "de84396a-9678-4b7c-aeba-e3f25eb5f68F",
              name: "Mercedez Benz",
              logo: "https://wi-sirius-production.nyc3.cdn.digitaloceanspaces.com/assets/auto/manufacturers/small/nissan.png"
            },
            "model": {
              id: "28229ee1-349e-4bd4-8993-a69d432d6c02",
              year: "2017",
              name: "C Class"
            },
            "trim": {
              id: "05d72783-1c8e-4d83-b754-0c9bbf41a0d9",
              name: "C250 2dr Coupe (1.8L 4cyl Turbo 7A)"
            },
            "vin": "5J8YD3H3KL",
            "logo": "https://cdn.insureonline.com/vehicles/images/acura.svg"
          }
        ]
      })

      this.get("/vehicles/:year/makes", (schema, request) => {
        return [{
          id: "de84396a-9678-4b7c-aeba-e3f25eb5f68d",
          name: "Acura",
          logo: "TODO"
        },{
          id: "de84396a-9678-4b7c-aeba-e3f25eb5f68F",
          name: "Mercedez Benz",
          logo: "TODO"
        }]
      })

      this.get("/vehicles/:year/makes/:make/models", (schema, request) => {
        return [{
          id: "28229ee1-349e-4bd4-8993-a69d432d6c03",
          year: "2017",
          name: "Awesome-acura-model"
        },
        {
          id: "28229ee1-349e-4bd4-8993-a69d432d6c02",
          year: "2017",
          name: "C Class"
        }]
      })

      this.get("/vehicles/:year/makes/:make/models/:model/trims", (schema, request) => {
        return [{
          id: "05d72783-1c8e-4d83-b754-0c9bbf41a0d9",
          name: "Work Truck 4dr Crew Cab SB (6.0L 8cyl 6A)"
        },{
          id: "05d72783-1c8e-4d83-b754-0c9bbf41a0d9",
          name: "C250 2dr Coupe (1.8L 4cyl Turbo 7A)"
        }]
      })
    }
  })

  return server
}
