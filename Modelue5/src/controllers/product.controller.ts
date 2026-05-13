import type { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";


export const productController = (req: IncomingMessage, res: ServerResponse) => {

      const url = req.url;
      const method = req.method;

      const urlParts = url;
      console.log(urlParts);


      if (url === "/products" && method === "GET") {

            const products = readProduct()

            res.writeHead(200, { "content-type": "application/json" })
            res.end(
                  JSON.stringify({
                        message: "this is products retrieved",
                        success: true,
                        data: products
                  })
            );
      } else if (method === "GET") {

      }

}