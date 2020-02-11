import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bf-page-placeholder',
  templateUrl: './bf-page-placeholder.component.html',
  styleUrls: []
})
export class BfPagePlaceholderComponent implements OnInit {
  @Input() bfType: 'details' | 'profile' = 'details';
  @Input() bfTabs: number;
  @Input() bfSections: Array<'avatar' | 'data' | 'info' | 'info-center'>;

  public structureProfile = ['avatar', 'data', 'info'];
  public fakeProfile = [];

  constructor() { }

  ngOnInit() {
    if (this.bfType === 'profile') {
      this.structureProfile = (!!this.bfSections && this.bfSections.length > 0) ? this.bfSections : this.structureProfile;
      this.fakeProfile = [];
      for (let det = 0; det < this.structureProfile.length; det++) {
        this.fakeProfile.push(this.profileBuild(this.structureProfile[det]));
        if (det + 1 !== this.structureProfile.length ) {
          this.fakeProfile.push({ row: 'space' });
        }
      }
    }
    if (this.bfType === 'details') {
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
      obj.list = [
        'info-title marB10',
        'info-text1 marB10',
        'info-text2'
      ];
    } else if (type === 'data') {
      obj.classRow = 'placeholder-profile_data';
      const columns = Math.floor((Math.random() * 2) + 1);
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
}
