export class AppError extends Error {
  public readonly statusCode: number;
  public readonly errors?: string[];

  constructor(statusCode: number, message: string, errors?: string[]) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  // 4xx Client Errors
  static BadRequest(message = "Bad Request", errors?: string[]) {
    return new AppError(400, message, errors);
  }

  static Unauthorized(message = "Unauthorized", errors?: string[]) {
    return new AppError(401, message, errors);
  }

  static Forbidden(message = "Forbidden", errors?: string[]) {
    return new AppError(403, message, errors);
  }

  static NotFound(message = "Not Found", errors?: string[]) {
    return new AppError(404, message, errors);
  }

  static Conflict(message = "Conflict", errors?: string[]) {
    return new AppError(409, message, errors);
  }

  static UnprocessableEntity(
    message = "Unprocessable Entity",
    errors?: string[]
  ) {
    return new AppError(422, message, errors);
  }

  // 5xx Server Errors
  static InternalServerError(
    message = "Internal Server Error",
    errors?: string[]
  ) {
    return new AppError(500, message, errors);
  }

  static ServiceUnavailable(
    message = "Service Unavailable",
    errors?: string[]
  ) {
    return new AppError(503, message, errors);
  }

  static GatewayTimeout(message = "Gateway Timeout", errors?: string[]) {
    return new AppError(504, message, errors);
  }
}
