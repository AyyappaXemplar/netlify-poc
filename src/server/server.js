import { Server, Model, belongsTo, hasMany, Response, ActiveModelSerializer } from "miragejs"
import ratedQuote from './ratedQuote'


export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,
    serializers : {
      application: ActiveModelSerializer
    },
    models: {
      quote: Model.extend({
        vehicle: hasMany(),
        driver: hasMany()
      }),
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

    // factories: {
    //   carModel: Factory.extend({
    //     name(make) {
    //       return `Movie ${i}`
    //     },
    //   }),
    // },

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

      })
    },

    routes() {
      this.urlPrefix = process.env.REACT_APP_API_BASE_URL;
      this.namespace = process.env.REACT_APP_API_NAMESPACE;

      // get quote
      this.get("/quotes/:quoteId", (schema, request) => {
        return ratedQuote
      })

      // create a quote
      this.post("/quotes", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let zipCode = attrs.zip_code

        if (zipCode.match(/606/)) {
          let quote = schema.quotes.create(attrs)
          return quote.attrs
        } else {
          return new Response(
            400,
            { some: "header" },
            { errors: [`${zipCode} is not covered`] }
          )
        }
      })

      // update a quote
      this.post("/quotes/:id", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let id = request.params.id
        const quote = schema.quotes.find(id)
        quote.update(attrs)

        return quote.attrs
      })

      // add driver to quote
      this.post("/quotes/:id/drivers", (schema, request) => {
        const quote = schema.quotes.first()
        let attrs = JSON.parse(request.requestBody)
        attrs.quoteId = quote.id
        const payload = schema.drivers.create(attrs)
        return payload.attrs
      })

      // update driver
      this.post("/quotes/:id/drivers/:driverId", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let id = request.params.driverId
        const driver = schema.drivers.find(id)
        driver.update(attrs)

        return driver.attrs
      })

      // delete driver
      this.delete("/quotes/:id/drivers/:driverId", (schema, request) => {
        let driverId = request.params.driverId
        const driver = schema.drivers.find(driverId)
        return driver.destroy
      })

      // add vehicle to quote
      this.post("/quotes/:id/vehicles", (schema, request) => {
        const quote = schema.quotes.first()
        let attrs = JSON.parse(request.requestBody)
        attrs.quoteId = quote.id
        const payload = schema.vehicles.create(attrs)
        return payload.attrs
      })

      // update vehicle
      this.post("/quotes/:id/vehicles/:vehicleId", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let id = request.params.vehicleId
        const vehicle = schema.vehicles.find(id)
        vehicle.update(attrs)

        return vehicle.attrs
      })

      // delete vehicle
      this.delete('/quotes/:id/vehicles/:vehicleId', (schema, request) => {
        let vehicleId = request.params.vehicleId
        const vehicle = schema.vehicles.find(vehicleId)
        return vehicle.destroy
      })

      // rate quote
      this.post('/quotes/:quoteId/rate', (schema, request) => {
        return ratedQuote
      }, { timing: 4000 })

      // vehicle search
      this.get("/vehicles", (schema, request) => {
        return [
          {
            "id": "veh_12345",
            "make": {
              id: "de84396a-9678-4b7c-aeba-e3f25eb5f68d",
              name: "Acura",
              logo: "TODO"
            },
            "model": {
              id: "28229ee1-349e-4bd4-8993-a69d432d6c03",
              year: "2017",
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
              logo: "TODO"
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
