import { Server, Model, belongsTo, hasMany, Response } from "miragejs"


export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

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
    },

    seeds(server) {
      server.create("quote")
    },

    routes() {
      this.urlPrefix = process.env.REACT_APP_API_BASE_URL;
      this.namespace = 'api'

      this.post("/quotes", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let zipCode = attrs.zip_code

        if (zipCode.match(/606/)) {
          let quote = schema.quotes.create(attrs)
          return quote.id
        } else {
          return new Response(
            400,
            { some: "header" },
            { errors: [`${zipCode} is not covered`] }
          )
        }
      })

      this.post("/quotes/:id", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let id = request.params.id
        const quote = schema.quotes.find(id)
        quote.update(attrs)

        return { quote: quote }
      })

      this.post("/quotes/:id/vehicles", (schema, request) => {
        const { id } = request.params
        const quote = schema.quotes.first()
        let attrs = JSON.parse(request.requestBody)
        attrs.quoteId = quote.id

        return schema.vehicles.create(attrs)
      })
    }
  })

  return server
}
