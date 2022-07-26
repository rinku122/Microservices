import { Response, Request } from "express";
import express from "express";

export default (
    fn: (
      req: Request,
      res: Response,
      next: express.NextFunction
    ) => Promise<any>
  ) =>
  (req: Request, res: Response, next: express.NextFunction): Promise<any> =>
    Promise.resolve(fn(req, res, next).catch(next));
