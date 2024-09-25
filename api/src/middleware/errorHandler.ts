import { NextFunction, Request, Response } from "express";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log("err", err);
  res.status(500).send("Something went wrong");
};

export default errorHandler;
