/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TResponseBase } from "@core/api/types";
import { HttpResponse } from "msw";

export default class ResponseData {
  status: number;
  message?: string;
  data?: any;

  constructor({ status = 200, message, data }: TResponseBase<any>) {
    this.status = status;
    this.message = message;
    this.data = data;
  }

  static success(message?: string) {
    return HttpResponse.json(new ResponseData({ message }));
  }

  static json(data: any) {
    return HttpResponse.json(new ResponseData({ data }));
  }

  static error(message: string, status = 400) {
    return new HttpResponse(
      JSON.stringify(new ResponseData({ message, status })),
      {
        status,
        headers: {
          "Content-Type": "text/plain",
        },
      }
    );
  }
}
