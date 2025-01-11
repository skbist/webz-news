import { AxiosError } from 'axios';
import { IError } from '../dto/response.dto';
import { HttpStatus } from '@nestjs/common/enums';

/**
 * Prepares appropriate error from axios error
 * @param {AxiosError} error - axios error
 * @returns {IError} - appropriate error
 */
export function getError(
  error: AxiosError<{ error: { status: number; message: string } }, number>,
): IError {
  const dataError = error.response?.data?.error;
  return {
    status: error.response?.status as HttpStatus,
    message: error.response?.statusText || '',
    description: dataError?.message,
  };
}
