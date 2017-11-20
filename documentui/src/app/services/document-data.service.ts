import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';

import {DocumentData} from '../data/document-data';
import {ApiResponseData} from '../data/api-response-data';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

export interface MessageListener {
  onMessage(msg: string);
}

/**
 * service to access the backend API server.
 */
@Injectable()
export class DocumentDataService {

  private messageListeners: MessageListener[];

  constructor(private http: HttpClient) {
    this.messageListeners = [];
  }

  addMessageListener(listener: MessageListener) {
    this.messageListeners.push(listener);
  }

  /**
   * get all documents from the API server.
   * @returns {Observable<DocumentData[]>}
   */
  all(): Observable<DocumentData> {
    return this.getForUrl('/api/documents?trim=true');
  }

  /**
   * add a document to the API server.
   * @param documentData
   */
  add(documentData: DocumentData) {
    console.log('adding');
    console.log(documentData);
    // noinspection JSIgnoredPromiseFromCall
    this.http.post<ApiResponseData>('/api/document', documentData)
      .forEach((apiResponseData: ApiResponseData) =>
        this.sendMessage(apiResponseData.message));
  }

  /**
   * get a DocumentData with a given id
   * @param {string} id
   * @returns {Observable<DocumentData>}
   */
  get(id: string): Observable<DocumentData> {
    return this.getForUrl('/api/document/find/' + id).first();
  }

  /**
   * returns all the documents that match a given filter
   * @param filter
   * @returns {Observable<DocumentData>}
   */
  filter(filter: string): Observable<DocumentData> {
    return this.getForUrl('/api/document/search?trim=true&q=' + encodeURI(filter));
  }

  private getForUrl(url: string): Observable<DocumentData> {
    return this.http.get<ApiResponseData>(url)
      .switchMap((apiResponseData: ApiResponseData) => {
        this.sendMessage(apiResponseData.message);
        return Observable.from(apiResponseData.documents)
          // explicitly create an object so it has the isValid() method
          .map(doc =>
            new DocumentData(doc.title, doc.content, doc.id)
      )
        ;
      });
  }

  private sendMessage(msg: string) {
    this.messageListeners.forEach(listener => listener.onMessage(msg));
  }
}
