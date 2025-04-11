class ApiResponse {
  constructor(statusCode, message = "Success", data = null, error = null) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    this.error = error;
  }
}

export { ApiResponse };
