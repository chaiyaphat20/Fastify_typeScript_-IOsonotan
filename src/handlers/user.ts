import { FastifyRequest } from "fastify";
import { AuthJWTError } from "../errors/auth";
import { getUserById } from "../models/Users/Users";
import { customError } from "../utils/custom-error";
const handleUserMe = async (request: FastifyRequest) => {
  const { userId } = request
  //find in mongoDB
  if(!userId){
    return customError(AuthJWTError)
  }
  const user = await getUserById(userId);
  return user;
};

export { handleUserMe };
