import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";

// interface Product{
//    id:number;
//    name:string;
//    description?:string;
// }


export const productController =(req : IncomingMessage, res  : ServerResponse)=>{

      // const products: Product[]=[
      //    {
      //       id:1,
      //       name:"Product -1"
      //    },
      //    {
      //       id:2,
      //       name:"Product -2"
      //    }
      // ]
      const products = readProduct()

      res.writeHead(200,{"content-type":"application/json"})
      res.end(JSON.stringify({
         message:"this is products retrieved",
         success:true,
         data:products
      }));
}