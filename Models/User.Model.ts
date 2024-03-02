import User from "../Schemas/User/User.schema";
import { Person } from "../interface/user.interface";
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

export { SignUp };
