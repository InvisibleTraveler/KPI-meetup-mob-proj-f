import { Component, OnInit, Input } from '@angular/core';

// models
import { ILection } from 'src/app/models/Lection';

@Component({
  selector: 'app-meeting-short-info',
  templateUrl: './meeting-short-info.component.html',
  styleUrls: ['./meeting-short-info.component.scss']
})
export class MeetingShortInfoComponent implements OnInit {
  @Input() public lection: ILection;

  constructor() {}

  ngOnInit() {}
}
