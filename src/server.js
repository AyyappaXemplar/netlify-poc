import { Server, Model } from "miragejs"


export function makeServer({ environment = "test" } = {}) {
  let server = new Server({
    environment,

    models: {
      user: Model,
      quote: Model,
    },

    seeds(server) {
      server.create("user", { name: "Bob" })
      server.create("user", { name: "Alice" })
    },

    routes() {
      this.urlPrefix = process.env.REACT_APP_API_BASE_URL;
      this.namespace = 'api'

      this.get("/users", (schema) => {
        return schema.users.all()
      })

      this.post("/quotes", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        return 'my-id'
      })
    }
  })

  return server
}
