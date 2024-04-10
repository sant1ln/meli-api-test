import { Request, Response } from "express";
import { MELI_API, SIGNATURE } from "../constants";
import { buildRequest } from "../utils/utils";

export class ItemsController {

  private notFoundResponse = { Error: 'No data found' }

  public getSearch = async (req: Request, res: Response) => {
    const {q} = req.query;
    if(!q) res.status(401).json({Error: 'Query is required'})
    
    try{
      const searchEndPoint = `${MELI_API}/search?q=${q}`;
      const meliResponse = await fetch(searchEndPoint)
      const result = await meliResponse.json();

      const response = buildRequest(result);

      res.status(200).json(response)

    }catch(error){
      res.status(500).json({Error: 'Ups, something went wrong'})
    }
    
  }

  public getDetailt = async (req: Request, res: Response) =>{
    res.status(200).json({message: 'product detail'})
  }


}