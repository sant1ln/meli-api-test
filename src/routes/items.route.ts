import { Router } from "express";
import { ItemsController } from "../controller/items.controller";

export class ItemsRoutes{

  static get routes(): Router{

    const router = Router();
    const items: ItemsController = new ItemsController();

    router.get('/', items.getSearch)
    router.get('/:id', items.getDetailt)

    return router;
  }
}