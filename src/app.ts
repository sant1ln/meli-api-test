import { AppRoutes } from "./routes"
import { Server } from "./server"

(async()=>{
  main()
})()

function main(){
  
  const server = new Server({
    port: 3030,
    routes: AppRoutes.routes
  })

  server.start()
}
