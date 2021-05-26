import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
@Input() public image;

  constructor() { }

  ngOnInit(): void {

  }

}
