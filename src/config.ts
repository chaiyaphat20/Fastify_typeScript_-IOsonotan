import dotenv from 'dotenv'
dotenv.config()
const config = {
  env:process.env.NODE_ENV || 'development',
  port:process.env.PORT || 4000,
  mongodb:{
    uri:process.env.MONGO_URI || 'mongodb://localhost/ultimate'
  },
  jwtSecret:process.env.JWT_SECRET
}

export default config