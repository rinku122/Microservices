export default (req: any, res: any) => {
  const { pagination, data, statusCode } = res.response;
  const obj: any = {
    success: true,
  };
  if (pagination) {
    obj.pagination = pagination;
  }
  if (data) {
    if (Array.isArray(data)) {
      obj.count = data.length;
    }
    obj.data = data;
  }

  res.status(statusCode).json(obj);
};
