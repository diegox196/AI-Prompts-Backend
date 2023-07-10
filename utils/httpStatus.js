const httpStatus = {
  //2xx Success
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  //4xx Client Error
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPRPOCESSABLE_ENTRY: 442,
  //5xx Server Error
  INTERNAL_SERVER_ERROR: 500
};

module.exports = httpStatus;