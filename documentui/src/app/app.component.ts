import {Component} from '@angular/core';
import {DocumentDataService, MessageListener} from './services/document-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DocumentDataService]
})

export class AppComponent implements MessageListener {
  constructor(private documentDataService: DocumentDataService) {
    documentDataService.addMessageListener(this);
  }

  private _footerMessage: string;

  get footerMessage(): string {
    return this._footerMessage;
  }

  set footerMessage(value: string) {
    this._footerMessage = value;
  }

  onMessage(msg: string) {
    this.footerMessage = msg;
  }

}
