import { Server, Model, belongsTo, hasMany, Response, ActiveModelSerializer } from "miragejs"


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

      this.post("/quotes", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        let zipCode = attrs.zip_code

        if (zipCode.match(/606/)) {
          let quote = schema.quotes.create(attrs)
          return { id: quote.id }
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
        const quote = schema.quotes.first()
        let attrs = JSON.parse(request.requestBody)
        attrs.quoteId = quote.id

        return schema.vehicles.create(attrs)
      })

      this.get("/vehicles/:year/make", (schema, request) => {
        return schema.makes.all()
      })

      this.get("/vehicles/:year/makes/:make/models", (schema, request) => {
        const { make } = request.params

        return [{
          id: "tlx",
          make: "Acura",
          make_id: "acura",
          logo: "https://cdn.insureonline.com/vehicles/images/acura.svg",
          name: `${make} TLX`,
          default_vin: "19UDE2F3KA"
        },
        {
          id: "rdx",
          make: "Acura",
          make_id: "acura",
          logo: "https://cdn.insureonline.com/vehicles/images/acura.svg",
          name: `${make} RDX`,
          default_vin: "5J8TC1H3KL"
        }]
      })

      this.get("/vehicles/:year/makes/:make/models/:model/trims", (schema, request) => {
        return [{
          id: "veh_12345",
          year: 2017,
          make_id: "acura",
          make: "Acura",
          model_id: "tlx",
          model: "TLX",
          trim: "Advance Package 4dr Sedan (3.5L 6cyl 9A)",
          vin: "5J8YD3H3KL",
          logo: "https://cdn.insureonline.com/vehicles/images/acura.svg"
        },{
          id: "veh_54321",
          year: 2017,
          make_id: "acura",
          make: "Acura",
          model_id: "tlx",
          model: "TLX",
          trim: "Basic Package 4dr Sedan (3L 4cyl 3A)",
          vin: "5J8YD3H3KL",
          logo: "https://cdn.insureonline.com/vehicles/images/acura.svg"
        }]
      })
    }
  })

  return server
}
