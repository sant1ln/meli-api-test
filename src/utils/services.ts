import { CATEGORY_API, MELI_API } from "../constants"

export const getCategories = async (id:string) => {
  console.log(`${MELI_API}categories/${id}`)
  const response = await fetch(`${MELI_API}categories/${id}`);
  const categories = response.json();
  return categories
}

export const getUser = async (id: string) => {
  const response = await fetch(`${MELI_API}/users/${id}`);
  const user = response.json()
  return user;
}