import User from "../Schemas/User/User.schema";
import { Login, Person } from "../interface/user.interface";
import bcrypt from 'bcrypt'
async function SignUp(UserDetails: Person) {
  return new Promise(async (resolve, reject) => {
    try {
      const uniqueUser = await User.findOne({
        $or: [
          {
            userName: UserDetails.userName,
          },
          { email: UserDetails.email },
          { contactNumber: UserDetails.contactNumber },
        ],
      });
      if (uniqueUser) {
        reject({ message: "User already exist" });
      }
      const data = await User.create(UserDetails);
      resolve(data);
    } catch (error: any) {
      reject({ message: error.message });
    }
  });
}

async function login(userCred:Login){
  return new Promise(async(resolve,reject)=>{
    try {
      const loginData = await User.findOne({$or:[
        {email:userCred.userId},
        {userName: userCred.userId},
        {contactNumber: userCred.userId}
      ]});
      console.log(loginData)
      if(loginData)
      {
        const matchPassword = await bcrypt.compare(userCred.password,loginData.password)
        resolve({matchPassword,loginData})
      }
    } catch (error: any) {
      reject({message:error.message})
    }
  })
}

async function emailVerification(email:string){
return new Promise(async(resolve,reject)=>{
  try {
    const data = await User.findOneAndUpdate({email:email},{isVerified:true},{new:true})
    if(data){
      resolve(data)
    }
   } catch (error:any) {
     reject ({
      message:error.message
     })
   }
})
}

export { SignUp, login, emailVerification };
