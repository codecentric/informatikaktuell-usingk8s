import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DocumentDataService} from '../../services/document-data.service';

import {DocumentData} from '../../data/document-data';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-detail-component',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit {
  constructor(private _documentDataService: DocumentDataService,
              private route: ActivatedRoute) {

  }

  private _documentData: DocumentData;

  get documentData(): DocumentData {
    return this._documentData;
  }

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this._documentDataService.get(params.get('id')))
      .subscribe(documentData => this._documentData = documentData);
  }
}
