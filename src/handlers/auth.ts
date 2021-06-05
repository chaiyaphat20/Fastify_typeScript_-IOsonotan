import { FastifyRequest } from 'fastify';
import {
  AuthLoginBodyRequest,
  AuthRegisterBodyRequest,
  AuthLoginBodyResponse,
  AuthRefreshTokenResponse
} from "../types/handlers/auth";
import { createNewUser ,userLogin} from "../models/Users";
import { UserSchemaWithDocument } from "../models/Users/schema";
import { generateAccessToken } from '../models/Users/Users';
import { customError } from '../utils/custom-error';
import { AuthJWTError } from '../errors/auth';

export const handleLogin = async (request: AuthLoginBodyRequest):Promise<AuthLoginBodyResponse> => {
  const { password, username } = request.body;
  const user = await userLogin(username,password)
  return user
};

export const handleRegister = async (request: AuthRegisterBodyRequest):Promise<UserSchemaWithDocument> => {
  const { password, username, email, name, surname } = request.body;
  const user = await createNewUser({
    username,
    password,
    email,
    name,
    surname,
  });
  return user
};

export const handleRefreshToken = async (request:FastifyRequest):Promise<AuthRefreshTokenResponse> =>{
  const { userId } = request
  if (!userId) {
    return customError(AuthJWTError)
  }
   // @ts-ignore: Unreachable code error
  const accessToken = generateAccessToken(userId)
  const response:AuthRefreshTokenResponse = {
    accessToken
  }
  return response
}

export default {
  handleLogin,
  handleRegister,
  handleRefreshToken
};
