import {Component, Input, OnChanges, OnInit} from '@angular/core';
import { BfUILibTransService } from '../abstract-translate.service';

@Component({
  selector: 'bf-page-placeholder',
  templateUrl: './bf-page-placeholder.component.html',
  styleUrls: []
})
export class BfPagePlaceholderComponent implements OnInit, OnChanges {
  @Input() bfType: 'details' | 'profile' = 'details';
  @Input() bfTabs = false;
  @Input() bfSections: Array<'avatar' | 'data' | 'info' | 'info-center'>;
  @Input() bfAriaLabel = 'view.common.loading_wait';

  public structureProfile = ['avatar', 'data', 'info'];
  public fakeProfile = [];
  public fakeDetails = {
    title: true,
    description: true,
    columns: []
  };
  public ariaLoadingMessage: string;

  constructor(
    private translate: BfUILibTransService,
  ) { }


  ngOnInit() {
    this.ariaLoadingMessage = this.translate.doTranslate(this.bfAriaLabel);
    if (this.bfType === 'profile') {
      this.bfProfile();
    }
    if (this.bfType === 'details') {
      this.bfDetails();
    }
  }

  ngOnChanges(changes) {
    if (this.bfType === 'profile') {
      this.bfProfile();
    }
    if (this.bfType === 'details') {
      this.bfDetails();
    }
  }

  bfProfile() {
    this.structureProfile = (!!this.bfSections && this.bfSections.length > 0) ? this.bfSections : this.structureProfile;
    this.fakeProfile = [];
    for (let det = 0; det < this.structureProfile.length; det++) {
      this.fakeProfile.push(this.profileBuild(this.structureProfile[det]));
      if (det + 1 !== this.structureProfile.length ) {
        this.fakeProfile.push({ row: 'space' });
      }
    }
  }

  bfDetails() {
    const columns = 2;
    const rows = 6;
    this.fakeDetails.columns = [];
    for (let col = 0; col < columns; col++) {
      this.fakeDetails.columns.push(this.columnBuild(columns, rows));
    }
  }

  profileBuild(type) {
    const obj = {
      row: type,
      classRow: '',
      list: [],
      dataList: []
    };

    if (type === 'avatar') {
      obj.classRow = 'placeholder-profile_avatar';
      obj.list = [
        'profile_avatar marB20',
        'profile_title marB5',
        'profile_subtitle marB30',
        'profile_text1 marB10',
        'profile_text2 marB10'
      ];
    } else if (type === 'info' || type === 'info-center') {
      obj.classRow = (type === 'info-center') ? 'placeholder-profile_info-center' : 'placeholder-profile_info';
      obj.list = [];
      for (let index = 0; index < 4; index++) {
        const num = Math.round((Math.random() * 3) + 1);
        obj.list.push(`info-text${num} marB10`);
      }
    } else if (type === 'data') {
      obj.classRow = 'placeholder-profile_data';
      const columns = Math.round((Math.random() * 2) + 1);
      const dataList = [];
      for (let col = 0; col < columns; col++) {
        dataList.push({
          colClass: 'data-col',
          columnList: [
            'data-col_num marB10',
            'data-col_text'
          ]
        });
      }
      obj.dataList = dataList;
    }
    return obj;
  }

  columnBuild(columns: number, rows: number = 6) {
    const obj = {
      subtitle: true,
      col: '',
      colList: []
    };
    const input = Math.round(Math.random() * rows );

    for (let field = 0; field < rows; field++) {
      const label = Math.round((Math.random() * 3) + 1);
      obj.colList.push(
        {
          label: `details_label_${label}`,
          input: (input === field) ? 'details_input_2' : 'details_input_1'
        }
      );
    }

    obj.col = `col-${12 / columns}`;
    return obj;
  }
}
