import express from "express";
import { Login, Person } from "../interface/user.interface";
import { SignUp, emailVerification, login } from "../Models/User.Model";
import dotEnv from "dotenv";
import bcrypt from "bcrypt";
import { SignUpValidation } from "../Utility/User.utility";
import { User, sessionData } from "../interface/session.interface";
import { sendMail } from "../NodeMailer/Nodemailer";
const AuthRouter = express.Router();
dotEnv.config();
const Salt = Number(process.env.SALT);
declare module "express-session" {
    export interface SessionData {
      isAuth:boolean;
      user: { [key: string]: any };
    }
  }

AuthRouter.post("/SignUp", async (req, res) => {
  const {
    userName,
    email,
    firstName,
    lastName,
    contactNumber,
    password,
  }: Person = req.body;
  try {
    await SignUpValidation({
      userName,
      email,
      firstName,
      lastName,
      contactNumber,
      password,
    });
    const hashedPassword = await bcrypt.hash(password, Salt);
    const UserDetails: Person = {
      userName,
      email,
      firstName,
      lastName,
      contactNumber,
      password: hashedPassword,
    };
    const data = await SignUp(UserDetails);
    res.send({
      status: 200,
      message: "Signup Successful",
      data: data,
    });
  } catch (error: any) {
    res.send({
      status: error.status || 500,
      message: error.message,
    });
  }
});

AuthRouter.post("/Login", async (req, res) => {
  const { userId, password } = req.body;
  const userCred: Login = { userId, password };
  try {
    const data: any = await login(userCred);
    const addSession: sessionData = req.session as sessionData;
    const mailSent: any = await sendMail(data.loginData.email);
    addSession.isAuth = mailSent || false;
    addSession.user = data.loginData;
    res.send({
      status: 200,
      message: "Login Successful",
    });
  } catch (error: any) {
    res.send({
      status: error.status,
      message: error.message,
    });
  }
});

AuthRouter.delete("/Logout", (req, res) => {
  try {
    req.session.destroy((error: any) => {
      if (error) {
        res.send({
          status: error.status,
          message: error.message,
        });
      }
      res.send({
        status: 200,
        message: "Logout Successful",
      });
    });
  } catch (error: any) {
    res.send({
      status: error.status,
      message: error.message,
    });
  }
});

AuthRouter.get("/EmailAuth", async (req, res) => {
  try {
    const sessionData = req.session.user;
    const userEmail  = sessionData ? sessionData.email:"";
    const data = await emailVerification(userEmail)
    res.send({
      status: 200,
      message: "Email verified",
      data: data
    });
  } catch (error: any) {
    res.status(500).send({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
});

export default AuthRouter;
