import express from 'express';
import { Person } from '../interface/user.interface';
import { SignUp } from '../Models/User.Model';
import dotEnv from 'dotenv';
import bcrypt from 'bcrypt';
import { SignUpValidation } from '../Utility/User.utility';
const AuthRouter = express.Router();
dotEnv.config();
const Salt = Number(process.env.SALT)

AuthRouter.post("/SignUp",async(req,res)=>{
const {userName,email,firstName,lastName,contactNumber,password}:Person = req.body;
try {
    await SignUpValidation({userName,email,firstName,lastName,contactNumber,password})
    const hashedPassword  = await bcrypt.hash(password,Salt);
    const UserDetails:Person = {userName,email,firstName,lastName,contactNumber,password:hashedPassword};
    const data =await SignUp(UserDetails);
    res.send({
        status: 200,
        message: "Signup Successful",
        data: data
    })
} catch (error:any) {
    res.send({
        status: error.status || 500,
        message: error.message
    })
}

})
export default AuthRouter