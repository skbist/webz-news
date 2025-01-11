import { HttpStatus } from '@nestjs/common';

export interface ResponseDto<T> {
  count?: number;
  data: Array<T>;
}

export interface IError {
  /** status code of the error **/
  status: HttpStatus;
  /** short title of the error **/
  message: string;
  /** cause of error **/
  description?: string;
  /** for debug purpose only **/
  stack?: any;
}
