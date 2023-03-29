import { ResponseVO } from "../model/vo/responseVo";

class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, code: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString() {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object, code = 200): ResponseVO {
    console.debug(`Returning success (HTTP ${code})`);
    const result = new Result(code, code, "success", data);
    return result.bodyToString();
  }

  static error(code: number, message: string) {
    console.debug(`Returning error (HTTP ${code})`);
    const result = new Result(code, code, message);

    console.log(result.bodyToString());
    return result.bodyToString();
  }
}
