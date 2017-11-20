import {Component, OnInit} from '@angular/core';

import {DocumentData} from '../../data/document-data';
import {DocumentDataService} from '../../services/document-data.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-list-component',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})

export class ListComponent implements OnInit {
  /** the data to filter as a form control. Using a control, we can easily debounce */
  filter: FormControl = new FormControl();


  constructor(private documentDataService: DocumentDataService) {
    this.filter
      .valueChanges
      .debounceTime(350)
      .distinctUntilChanged()
      .switchMap(filter => {
        this._documentDatas = [];
        return this.documentDataService.filter(filter);
      })
      .subscribe(doc => this._documentDatas.push(doc));
  }

  private _documentDatas: DocumentData[] = [];

  get documentDatas(): DocumentData[] {
    return this._documentDatas;
  }

  ngOnInit(): void {
    this.documentDataService.all()
      .subscribe(doc => {
        if (doc.isValid()) {
          this._documentDatas.push(doc);
        }
      });
  }
}
