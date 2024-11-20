import { NextFunction, Request, Response } from "express";

export const cors = (request: Request, response: Response, next: NextFunction): void => {
  response.set('acess-control-allow-origin', '*')
  response.set('acess-control-allow-headers', '*')
  response.set('acess-control-allow-methods', '*')
  next()
}