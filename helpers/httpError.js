const messageList = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  405: 'Method Not Allowed',
  429: 'Too Many Requests',
  451: 'Unavailable For Legal Reasons',
  500: 'Server error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
};

const httpError = (status, message = messageList[status]) => {
  const error = new Error(message);

  error.status = status;

  return error;
};

export default httpError;
