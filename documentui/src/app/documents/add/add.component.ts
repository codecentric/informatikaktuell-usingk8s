import {Component} from '@angular/core';

import {DocumentData} from '../../data/document-data';
import {DocumentDataService} from '../../services/document-data.service';

@Component({
  selector: 'app-add-component',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent {
  constructor(private documentDataService: DocumentDataService) {
  }

  /** for databinding to the form */
  private _documentData: DocumentData = new DocumentData();

  get documentData(): DocumentData {
    return this._documentData;
  }

  /**
   * adds the document with the form data to the service if the data is valid.
   */
  onAddDocument() {
    if (this._documentData.isValid()) {
      console.log('should add ' + this._documentData);
      this.documentDataService.add(this._documentData);
      this._documentData = new DocumentData();
    } else {
      console.log('no valid input data to add');
    }
  }
}
