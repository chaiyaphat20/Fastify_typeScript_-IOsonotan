import { FastifyInstance } from "fastify";
import { handleUserMe } from "../handlers/user";
import { verifyAccessToken } from "../hooks/auth";
const userRouter = async (app: FastifyInstance) => {
  app.get("/me",{
    preHandler:[verifyAccessToken],
  }, handleUserMe);
};

export default userRouter;
