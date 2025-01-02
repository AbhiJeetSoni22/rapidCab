
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
async function registerUser(req,res){
   try{
     const errors =validationResult(req)
     if(!errors.isEmpty()){
       return res.status(400).json({ errors: errors.array() });
     }
     const { fullName, email, password} = req.body;
     const user = await createUser({ firstName:fullName.firstName, lastName:fullName.lastName, email, password });
     const token = await user.generateAuthToken();
     res.status(201).json({ user, token });
   }catch(error){
    console.log(`Error during registration: ${error}`);
   }
}

export { registerUser }
