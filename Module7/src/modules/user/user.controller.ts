import type { Request, Response } from "express";
import { pool } from "../../db";
import { userService } from "./user.service";

const createUser =async(req : Request, res : Response)=>{
   //console.log(req.body);
   //const {name,email,password,age} =req.body;

   try {
      const result= await userService.createUserIntoDB(req.body);
   //console.log(result);
   

   res.status(201).json({
      message : "User created successfully",
      data: result.rows[0],
   })
   } catch (error : any) {
      res.status(500).json({
      message : error.message,
      error:error,
   })
   }
}

const getAllUsers =async(req : Request,res: Response)=>{
   try {
     
      const result =await userService.getAllUsersFromDB();
      res.status(200).json({
         success:true,
         message:"Users retrieved",
         data:result.rows,
      });

   } catch (error : any) {
      res.status(500).json({
         success:false,
         message:error.message,
         error:error.message
      })
   }
}

const getSingleUser=async(req :Request , res : Response)=>{
   try {

       const {id}  =  req.params;
      //console.log(id);

      try {
            const result =await userService.getSingleUserFromDB(id as string)
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
}

const updateUser = async(req: Request, res: Response)=>{
   try {

      const {id} = req.params;

      //console.log("id", id);
      //console.log(name,password,age,is_Active);

      //console.log(result);
      const result =await userService.updateUserIntoDB(req.body,id as string,)
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
}

const userDelete=async(req: Request, res: Response)=>{
   try {

      const {id} = req.params;
      
      const result =await userService.userDeleteIntoDB(id as string);
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
}

export const userController = {
   createUser,
   getAllUsers,
   getSingleUser,
   updateUser,
   userDelete
}