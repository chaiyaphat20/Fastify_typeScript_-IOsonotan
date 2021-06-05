import {Schema,Document,model} from 'mongoose'
import {UserSchema} from '../../types/models/user'
const collection = "Users"
export interface UserSchemaWithDocument extends UserSchema, Document{
  //add more filed
}
const userSchema = new Schema<UserSchemaWithDocument>({
  username:{
    type:"string",
    unique:true,
    required:true
  },
  password:{
    type:"string",
    required:true
  },
  email:{
    type:"string",
    unique:true,
    required:true
  },
  name:{
    type:"string"
  },
  surname:{
    type:"string"
  },
  
},{
  collection,
  versionKey:false,
  timestamps:true
})

export default model(collection,userSchema)