import {DocumentData} from './document-data';

export class ApiResponseData {
  private _documents: DocumentData[];

  get documents(): DocumentData[] {
    return this._documents;
  }

  set documents(value: DocumentData[]) {
    this._documents = value;
  }

  private _message: string;

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
