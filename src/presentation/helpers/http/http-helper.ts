import { ServerError, UnauthorizedError } from "../../errors";
import { HttpResponse } from "../../protocols/http";

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const serverError = (error: Error) => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});

export const ok = (data: any) => ({
  statusCode: 200,
  body: data,
});

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error,
});

export const noContent = () => ({
  statusCode: 204,
  body: null
});

