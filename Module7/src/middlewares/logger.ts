import type { NextFunction, Request, Response } from "express";
import fs from 'fs';

const logger = ((req:Request,res:Response,next:NextFunction)=>{
   
   console.log("Time -Url -Method :",req.method, req.url, Date.now());
   const log = `\nMethod -> ${req.method} Time ->${req.url} URL -> ${Date.now()}\n`;
   fs.appendFile('logger.test', log,(error:any)=>{
      console.log(error);
   })
   next();
   
});

export default logger;