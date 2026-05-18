import type {Request,Response}  from 'express';
import { profileService } from './profile.service';

const createProfile = async(req:Request, res:Response)=>{
   try {
      const result = await profileService.createProfileIntoDB(req.body);
      res.status(201).json({
         succuss:true,
         message:"Profile created successfully",
         data:result.rows[0]
      })
   } catch (error : any) {
      res.status(500).json({
         success:false,
         message:error.message,
         error:error
      })
   }
}

const getProfile = async(req:Request, res:Response)=>{
   try {
      
   } catch (error : any) {
      res.status(500).json({
         success:false,
         message:error.message,
         error:error
      })
   }
}

export const profileController = {
   createProfile
}