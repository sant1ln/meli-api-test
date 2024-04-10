import { SIGNATURE } from "../constants";
import { Item, SearchResponse } from "../interfaces/interfaces";

const separateDecimals = (number: number): number => {
  let numberToString = number.toString();
  let decimalPosition = numberToString.indexOf('.');
  if(decimalPosition === -1){
    return 0
  }
  let decimalValue = numberToString.slice(decimalPosition + 1);

  return Number(decimalValue)

}

export const buildRequest = (meliResponse: any): SearchResponse => {

  const {
    results,
    available_filters: values
  } = meliResponse;

  const categories = values.map((value: any) => value.name)

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
    categories,
    items
  }

  return response
}