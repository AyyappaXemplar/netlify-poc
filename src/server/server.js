import { Server, Model, belongsTo, hasMany, Response, ActiveModelSerializer } from "miragejs"
import ratedQuote from './ratedQuote'


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
        vehicles: ratedQuote.vehicles
      })
    },

    routes() {
      this.urlPrefix = process.env.REACT_APP_API_BASE_URL;
      this.namespace = process.env.REACT_APP_API_NAMESPACE;

      // get quote
      this.get("/quotes/:quoteId", function(schema, request) {
        const quoteId = request.params.quoteId
        const quote = schema.quotes.find(quoteId)

        if (quote) {
          const json = this.serialize(quote)
          return json.quote
        } else {
          return ratedQuote
        }
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
      this.post("/quotes/:id/drivers/:driverId", (schema, request) => {
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
        const quote = schema.quotes.find(id)
        const attrs = JSON.parse(request.requestBody)
        const vehicle = quote.createVehicle(attrs)
        vehicle.save()
        quote.save()

        return vehicle.attrs
      })

      // update vehicle
      this.patch("/quotes/:id/vehicles/:vehicleId", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        const id = request.params.vehicleId
        const vehicle = schema.vehicles.find(id)
        const { vehicle_premium } = vehicle
        attrs.vehicle_premium = vehicle_premium + 20
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

      // rate quote. WARNING: user function instean of fat arrow to make sure the serializer works.
      this.post('/quotes/:quoteId/rate', function(schema, request) {
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
