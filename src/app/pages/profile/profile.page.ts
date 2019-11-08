import { Component, OnInit } from '@angular/core';
import { ILection } from 'src/app/models/Lection';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit {
  public lections: ILection[];

  constructor() {}

  ngOnInit() {}
}
