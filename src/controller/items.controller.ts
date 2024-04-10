import { Request, Response } from "express";

export class ItemsController {

  private notFoundResponse = { Error: 'No data found' }

  public getAll = async (req: Request, res: Response) => {
    res.status(200).json({message:'Hello word'})
  }


}