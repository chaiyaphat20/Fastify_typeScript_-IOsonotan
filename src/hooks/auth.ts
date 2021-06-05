import { TokenDecoded } from "./../types/hooks/auth";
import { FastifyRequest } from "fastify";
import { AuthJWTError, AuthMissingHeader } from "../errors/auth";
import { customError } from "../utils/custom-error";
import jwt from "jsonwebtoken";
import config from "../config";
const validateHeaderAuth = (request: FastifyRequest): string => {
  const authToken = request.headers["authorization"];
  if (!authToken) {
    customError(AuthMissingHeader);
    return "notFound";
  } else {
    const accessToken = authToken.split(" ")[1];
    if (!accessToken) {
      customError(AuthMissingHeader);
    }
    return accessToken;
  }
};
export const verifyAccessToken = async (request: FastifyRequest) => {
  try {
    const accessToken = validateHeaderAuth(request);
    if (accessToken !== "notFound") {
      const decoded: TokenDecoded = Object(jwt.verify(accessToken, "art123"))
      request.userId = decoded.aud
      console.log("typeof(decoded.aud)",typeof(decoded.aud))
    }
  } catch (error) {
    customError(AuthJWTError);
  }
};
