import { Person } from "../interface/user.interface";
import validator from 'validator'

function SignUpValidation({
    userName,
    email,
    firstName,
    lastName,
    contactNumber,
    password,
  }: Person) {
    return new Promise<void>((resolve, reject) => {
      if (!userName) {
        reject({
          status: 400,
          message: "Username is required",
        });
      } else if (!email) {
        reject({
          status: 400,
          message: "Email is required",
        });
      } else if (!validator.isEmail(email)) {
        reject({ status: 400, message: "Enter a valid email id" });
      } else if (!password) {
        reject({
          status: 400,
          message: "Password is required",
        });
      } else if (!validator.isStrongPassword(password)) {
        reject({
          status: 400,
          message: "Please enter a strong password",
        });
      } else if (!firstName) {
        reject({
          status: 400,
          message: "First name is required",
        });
      } else if (!lastName) {
        reject({
          status: 400,
          message: "Last name is required",
        });
      } else if (!contactNumber) {
        reject({
          status: 400,
          message: "Contact number is required",
        });
      } else if (!validator.isMobilePhone(contactNumber)) {
        reject({
          status: 400,
          message: "Please enter a valid phone number",
        });
      } else {
        resolve();
      }
    });
  }

  export {SignUpValidation}