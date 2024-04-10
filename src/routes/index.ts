import{ Router } from "express";
import { ItemsRoutes } from "./items.route";

export class AppRoutes {

  static get routes(): Router {
    const router = Router()
    router.use('/items', ItemsRoutes.routes)

    return router;
  }
}