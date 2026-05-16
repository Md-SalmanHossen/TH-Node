import express, { type Application ,type Request,type Response } from 'express';
import { pool } from './db';
import { userRoute } from './modules/user/user.route';

const app : Application = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended:true}));




app.use('/api/users',userRoute);



app.get("/api/users",async(req : Request,res: Response)=>{
   try {
      const result =  await pool.query(`
         SELECT * FROM users`);

      res.status(200).json({
         success:true,
         message:"Users retrieved",
         data:result.rows
      });

   } catch (error : any) {
      res.status(500).json({
         success:false,
         message:error.message,
         error:error.message
      })
   }
})

app.get('/api/users/:id',async(req :Request , res : Response)=>{
   try {

      const {id}  =  req.params;
      //console.log(id);

      try {
         const result =await pool.query(`
            SELECT * FROM users WHERE id=$1`,[id]);
            //console.log(result);
            
            if(result.rows.length ===0){
               return res.status(404).json({
               success:false,
               message:"User data not find",
               data:result.rows[0]
            });
            }

            res.status(200).json({
               success:true,
               message:"User data retrieved successfully",
               data:result.rows[0]
            });

      } catch (error : any) {
         res.status(500).json({
            success:false,
            message:error.message,
            error:error.message
         })
      }
      

   } catch (error :any) {
      res.status(500).json({
         success:false,
         message:error.message,
         error:error.message
      })
   }
});

app.put("/api/users/:id",async(req: Request, res: Response)=>{
   try {

      const {id} = req.params;
      const {name,password,age,is_Active}=req.body;

      //console.log("id", id);
      //console.log(name,password,age,is_Active)

      const result = await pool.query(`
         UPDATE users 
         SET name=COALESCE($1,name),
         password=COALESCE($2,password)
         ,age=COALESCE($3,age),
         is_Active=COALESCE($4,is_Active)
         WHERE id=$5 RETURNING *`,
         [name,password,age,is_Active,id]
      );

      console.log(result);

      if(result.rows.length===0){
         return res.status(404).json({
            success:false,
            message:"User not found",
         });
      }

      res.status(200).json({
         success:true,
         message:"User updated successfully",
         data:result.rows[0]
      })

   } catch (error : any) {
      res.status(500).json({
         success:false,
         message:error.message,
         error:error.message
      })
   }
});

app.delete("/api/users/:id",async(req: Request, res: Response)=>{
   try {

      const {id} = req.params;
      
      const result= await pool.query(`
         DELETE FROM users WHERE id=$1`,[id])
      console.log(result);

      if(result.rowCount===0 ){
         return res.status(404).json({
            success:false,
            message:"User not found",
         });
      }

      res.status(200).json({
         success:true,
         message:"User deleted successfully",
         data:null
      })

   } catch (error : any) {
      res.status(500).json({
         success:false,
         message:error.message,
         error:error.message
      })
   }
});


export default app;