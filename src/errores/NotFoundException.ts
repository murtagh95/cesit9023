import { BaseException } from './BaseException';

export class NotFoundExcepiont extends BaseException {
  constructor(message: string) {
    super(404, message);
  }
}
