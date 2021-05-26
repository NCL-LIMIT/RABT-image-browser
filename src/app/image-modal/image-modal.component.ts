import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
@Input() public image;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {

  }

  public close() {
    this.activeModal.close();
  }

}
