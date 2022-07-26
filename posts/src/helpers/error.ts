class ErrorResponse extends Error {
  public statusCode: Number;
  constructor(message: any, _statuscode: Number) {
    super(message);
    this.statusCode = _statuscode;
  }
}
export default ErrorResponse;
