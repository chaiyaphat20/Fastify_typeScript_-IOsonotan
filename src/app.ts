import fastify, { FastifyServerOptions } from "fastify";
import authRouter from './routers/auth';
import useRouter from './routers/user';
import {CustomError} from './utils/custom-error'

declare module 'fastify'{
  export interface FastifyRequest{
    userId?:string
  }
} //ให้แนบ request.userId ได้

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options);
  app.get('/',async()=>"OK")
  app.register(authRouter,{prefix:'/auth'})
  app.register(useRouter,{prefix:'/users'})
  app.setErrorHandler((error,request,reply)=>{
    const customError:CustomError = error
    // console.log(error)
    reply
    .status(customError.statusCode || 500)
    .send({
      error:{
        message2:customError.message,
        code:customError.code,
        data:customError.data
      }
    })
  })

  return app;
};

export default buildApp;
