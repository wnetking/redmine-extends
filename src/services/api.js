import { Request, Response } from '../types';

export class API {
  constructor(apiFetch) {
    /**
     * @type {(request: Request) => Promise<Response>}
     */
    this.fetch = apiFetch;
  }
}