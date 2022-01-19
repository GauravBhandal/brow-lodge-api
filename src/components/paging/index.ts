export const DEFAULT_PAGE_SIZE = 500; // TODO: Sending 500 records by default may cause issues
export const DEFAULT_PAGE_NUMBER = 0;

export const getPagingParams = (page: number, pageSize: number) => {
  const limit = pageSize || DEFAULT_PAGE_SIZE;
  const offset = page ? (page - 1) * limit : DEFAULT_PAGE_NUMBER;

  return { limit, offset };
};

export const getPagingData = (
  response: any,
  pageNumber: number,
  pageSize: number
) => {
  const { count: total, rows: data } = response;
  const page = pageNumber ? pageNumber : DEFAULT_PAGE_NUMBER;
  const pageCount = Math.ceil(total / pageSize);

  return { total, data, pageCount, page };
};
