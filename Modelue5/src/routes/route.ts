import type { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controllers/product.controller";

export const routeHandler = (req : IncomingMessage ,res : ServerResponse)=>{
   const url =req.url;
   const method=req.method;

   if(url==="/" && method==='GET'){
      console.log("this is root route");

      res.writeHead(200,{"content-type":"application/json"})
      res.end(JSON.stringify({message:"this is root router"}));

   }else if(url==='/products' && method==='GET'){

      productController(req ,res);

   }else {
      
      res.writeHead(404,{"content-type":"application/json"});
      res.end("route not found")
   }

}