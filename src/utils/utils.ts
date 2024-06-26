import { SIGNATURE } from "../constants";
import { Item, SearchResponse } from "../interfaces/interfaces";
import { getCategories, getUser } from "./services";

const separateDecimals = (number: number): number => {
  let numberToString = number.toString();
  let decimalPosition = numberToString.indexOf('.');
  if(decimalPosition === -1){
    return 0
  }
  let decimalValue = numberToString.slice(decimalPosition + 1);

  return Number(decimalValue)

}

export const buildSearchResponse = (meliResponse: any, categoriesResponse: any): SearchResponse => {

  const { results } = meliResponse;

  const { path_from_root} = categoriesResponse;

  //const categories = path_from_root.map((value: any) => value.name)

  const items: Item[] = results.slice(0, 4).map((value: any) => {
      return {
        id: value.id,
        title: value.title,
        price: {
          currency: value.currency_id,
          amount: parseInt(value.price),
          decimals: separateDecimals(value.price)
        },
        picture: value.thumbnail,
        condition: value.condition,
        free_shipping: value.shipping.free_shipping
      }    
  })

  const response = {
    ...SIGNATURE,
    categories: path_from_root,
    items
  }

  return response;
}

export const buildProductResponse = (product: any, productDesc:any, categoriesResponse:any)=> {

  const {
    id,
    title,
    price,
    currency_id,
    thumbnail,
    condition,
    shipping,
    initial_quantity
  } = product;

  const {
    plain_text
  } = productDesc;

  const { path_from_root} = categoriesResponse;

  const response = {
    ...SIGNATURE,
    categories: path_from_root,
    item: {
      id,
      title,
      price: {
        currency_id,
        amount: parseInt(price),
        decimals: separateDecimals(price),
      },
      picture: thumbnail,
      condition,
      free_shipping: shipping.free_shipping,
      sold_quantity: initial_quantity,
      description: plain_text
      }      
  }

  return response;
}