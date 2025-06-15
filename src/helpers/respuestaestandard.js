// utils/response.js
exports.sendResponse = (res, {
  status = 'success',
  code = 200,
  message = '',
  data = [],
  metadata = {}
}) => {
  res.status(code).json({
    status,
    code,
    message,
    data,
    metadata
  });
};
