class Response {
  public statusCode: number;
  public data: any;
  public pagination: any;
  public message: any;
  constructor(
    statusCode: number,
    _message: string,
    data: any,
    pagination: any
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = _message;
    this.pagination = pagination;
  }
}

export default Response;
