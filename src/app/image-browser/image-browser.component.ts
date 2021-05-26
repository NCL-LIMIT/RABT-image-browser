import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import * as AzureStorage from '@azure/storage-blob';
import { BlobServiceClient } from '@azure/storage-blob';
import {environment} from '../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ImageModalComponent} from '../image-modal/image-modal.component';
import {type} from 'os';


@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.scss']
})
export class ImageBrowserComponent implements OnInit {
images = [];
imageBlobUrl;
imagesReady = false; // wait until images are loaded to display list

// https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser
  closeModal: string;
  constructor( private dataService: DataService, private sanitizer: DomSanitizer, private modalService: NgbModal) { }

  async ngOnInit(){
   // const blobSasUrl = await this.dataService.getURL();
    // todo use kubeless function

    const blobSasUrl = ''

    // Create the BlobServiceClient object which will be used to create a container client
    // Create a new BlobServiceClient
    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    // Get a reference to a container
    const containerClient = blobServiceClient.getContainerClient('input');

    // List the blob(s) in the container. For each, download blob.
    for await (const blob of containerClient.listBlobsFlat()) {
      // format date
      const date = blob.properties.createdOn.toString();
      // @ts-ignore
      blob.properties.createdOn = date.replace(' (Greenwich Mean Time)', '');

      // add imageurl
      // get blob and create url
      const blobClient = containerClient.getBlobClient(blob.name);

      // // Get blob content from position 0 to the end
      // // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
      // const downloadBlockBlobResponse = await blobClient.download();
      // // @ts-ignore
      // blob.imageurl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await downloadBlockBlobResponse.blobBody));
      //
      this.images.push(blob);
    }
// get images after so that the list can load rather than waiting for images
    for (const entry of this.images) {

      // get blob and create url
      const blobClient = containerClient.getBlobClient(entry.name);

      // Get blob content from position 0 to the end
      // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
      const downloadBlockBlobResponse = await blobClient.download();
      entry.imageurl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await downloadBlockBlobResponse.blobBody));

    }


  }

  viewLargerImage( image) {
    const modalRef = this.modalService.open(ImageModalComponent);
    modalRef.componentInstance.image = image;

  }


}
