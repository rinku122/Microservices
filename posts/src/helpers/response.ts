class Response {
  public statusCode: number;
  public data: any;
  public pagination: any;
  constructor(statusCode: number, data: any, pagination: any) {
    this.statusCode = statusCode;
    this.data = data;
    this.pagination = pagination;
  }
}

export default Response;
