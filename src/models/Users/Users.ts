import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthInvalidPassword, AuthInvalidUsername } from '../../errors/auth';
import { AuthLoginBodyResponse } from '../../types/handlers/auth';
import { UserSchema } from "../../types/models/user";
import { customError } from '../../utils/custom-error';
import Users, { UserSchemaWithDocument } from "./schema";

const generateHashPassword =async (password:string):Promise<string> =>{
  const salt = bcrypt.genSaltSync(10)
  const hashPassword = await bcrypt.hash(password,salt)
  return hashPassword

}

const comparePassword =async (password:string,existPassword:string):Promise<boolean> =>{
  const isPasswordCorrect = bcrypt.compareSync(password,existPassword)
  if(!isPasswordCorrect){
    customError(AuthInvalidPassword,{errorAt:"passwordผิด"})
  }
  return isPasswordCorrect
}


const generateAccessToken = (userId:object):string =>{
  // userId ที่รับมาจาก data เป็น objectID ของ moogo
  // เรา expected ค่าที่ออกมาจาก database หรือ จาก body ของ user ไม่ได้ควรกำหนดค่าที่ได้รับมาจริงๆ
  const token = jwt.sign({},"art123",{expiresIn:60,audience:String(userId)})
  return token
}

const mapUserResponseObject = (userId:string, user:UserSchemaWithDocument , accessToken?:string):AuthLoginBodyResponse =>{
  const response:AuthLoginBodyResponse = {  //การ map ค่า
    id:userId,
    email:user.email,
    name:user.name || '',
    username:user.username || '',
    surname:user.surname || '',
    accessToken
  }
  return response
}


const createNewUser = async (doc: UserSchema): Promise<UserSchemaWithDocument> => {
  doc.password = await generateHashPassword(doc.password)
  const user = new Users(doc);
  return user.save();
};

const userLogin = async (username:string,password:string):Promise<AuthLoginBodyResponse> => {
  const user = await Users.findOne({username})
  if(!user){
    // throw new Error("Username Not found!")
    customError(AuthInvalidUsername,{errorAt:"ไม่พบชื่อผู้ใช้งาน"})
  }
  await comparePassword(password,user.password)
  const accessToken = generateAccessToken(user._id)
  const response:AuthLoginBodyResponse = mapUserResponseObject(user._id,user,accessToken)
  return response
};

export const getUserById =async (userId:string):Promise<AuthLoginBodyResponse> =>{
  const user  = await Users.findById(userId)
  const response:AuthLoginBodyResponse = mapUserResponseObject(userId,user)
  return response
}

export { createNewUser, userLogin, generateAccessToken };

