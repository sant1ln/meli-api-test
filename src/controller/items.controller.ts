import { Request, Response } from "express";
import { MELI_API, SIGNATURE } from "../constants";
import { buildProductResponse, buildSearchResponse } from "../utils/utils";

export class ItemsController {

  private notFoundResponse = { Error: 'No data found' }

  public getSearch = async (req: Request, res: Response) => {
    const { q } = req.query;
    if (!q) res.status(401).json({ Error: 'Query is required' })
    const searchEndPoint = `${MELI_API}/sites/MLA/search?q=${q}`;

    try {
      const meliResponse = await fetch(searchEndPoint)
      const result = await meliResponse.json();
      const categoryID = result.results[0].category_id;
      const categories = await fetch(`${MELI_API}categories/${categoryID}`)
      const categoriesResult = await categories.json();      
      const response = buildSearchResponse(result,categoriesResult);
      res.status(200).json(response)
    } catch (error) {
      res.status(500).json({ Error: 'Something wend wrong'})
    }

  }

  public getDetailt = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) res.status(401).json({ Error: 'ID is required' });
    const productEndpoint = `${MELI_API}/items/${id}`
    const productEndpointDesc = `${MELI_API}/items/${id}/description`

    try {
      const product = await fetch(productEndpoint);
      const productResponse = await product.json()
      const productDesc = await fetch(productEndpointDesc);
      const productDescResponse = await productDesc.json();

      if (productResponse) {
        const response = buildProductResponse(productResponse, productDescResponse)
        res.status(200).json(response);
      }else{
        res.status(404).json({Error: 'Product not found'})
      }

    } catch (error) {
      res.status(500).json({ Error: 'Something went wrong' })
    }

  }


}