import express, { Router } from 'express';
import cors from 'cors'

interface Options {
  port: number;
  routes: Router
}

export class Server {
  
  private app = express()
  private readonly port: number;
  private readonly routes: Router;
  private whiteList = ['http://localhost:4200']
  private options = {
    origin: (origin:string,callback:any) => {
      if(this.whiteList.includes(origin)){
        callback(null,true)
      } else {
        callback(new Error('No permitido'))
      }
    }
  }

  constructor(options: Options){
    const { port, routes } = options;   
    this.port = port 
    this.routes = routes
  }

  async start(){

    this.app.use(express.json())
    this.app.use(express.urlencoded({extended:true}))
    this.app.use(cors())

    this.app.listen(this.port, () => {
      console.log(`Server running at http://localhost:${this.port}`)
    })
    this.app.use('/api/v1',this.routes)  

  }
}