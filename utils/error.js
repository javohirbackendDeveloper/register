class BaseError extends Error{
  status
  error
  constructor(message , status , error){
    super(message)
    this.status = status,
    this.error = error
  }

  static BadRequest(message = "bad Request" , error = this.error){
    return new BaseError(message , 404 , error)
  }
}

module.exports = BaseError