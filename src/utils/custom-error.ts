export class CustomError extends Error{
  data?:object
  message:string
  code?:string
  statusCode?:number

  constructor (message:string,code?:string,statusCode:number=500,data?:object){
    super(message)
    this.name = "CustomError"
    this.message = message
    this.code = code
    this.statusCode = statusCode
    this.data = data
  }

}

export type CustomErrorParams = {
  message:string,
  code?:string,
  statusCode?:number,
}

const customError = ({message,code,statusCode}:CustomErrorParams,data?:object) =>{
  throw new CustomError(message,code,statusCode,data)
}

export  {customError}