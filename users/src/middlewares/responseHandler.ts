export default (req: any, res: any) => {
  const { pagination, data, statusCode, message } = res.response;
  const obj: any = {
    success: true,
  };
  if (pagination) {
    obj.pagination = pagination;
  }

  if (Array.isArray(data)) {
    obj.count = data.length;
  }
  obj.data = data;

  if (message) {
    obj.message = message;
  }

  res.status(statusCode).json(obj);
};
