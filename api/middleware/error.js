export const errorHandler = (code, message = null) => {
  const error = new Error();
  message ? (error.message = message) : null;
  error.statusCode = code;
  return error;
};
