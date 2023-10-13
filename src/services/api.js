import { Request, Response } from '../types';

export class API {
  constructor(apiFetch) {
    /**
     * @type {(request: Request) => Promise<Response>}
     */
    this.apiFetch = apiFetch;
    this.requestId = 0;
  }
  /**
   * @type {(request: Request) => Promise<Response>}
   */
  fetch(request) {
    this.requestId = this.requestId + 1;

    return this.apiFetch({
      id: this.requestId,
      ...request,
    })
  }
}