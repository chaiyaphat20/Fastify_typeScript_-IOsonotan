import {FastifyServerOptions} from 'fastify'
import buildApp from "./src/app";
import config from './src/config'
import mongoose from 'mongoose'

const options:FastifyServerOptions = {
  logger:true
}
const app = buildApp(options)
mongoose.connect(config.mongodb.uri,{
  ignoreUndefined:true,
  useNewUrlParser:true,
  useCreateIndex:true,
  useUnifiedTopology:false
})
mongoose.connection.on('error',(error)=>app.log.error(error))  //case error connect
mongoose.connection.once('open',()=>app.log.info("mongoDb has been Connected"))  //case success connect


app.listen(config.port)