import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import * as AzureStorage from '@azure/storage-blob';
import { BlobServiceClient } from '@azure/storage-blob';
import {environment} from '../../environments/environment';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-image-browser',
  templateUrl: './image-browser.component.html',
  styleUrls: ['./image-browser.component.scss']
})
export class ImageBrowserComponent implements OnInit {
images = [];
imageBlobUrl;
// https://docs.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser

  constructor( private dataService: DataService, private sanitizer: DomSanitizer) { }

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
      this.images.push(blob);
    }

    for (const entry of this.images) {

      // get blob and create url
      const blobClient = containerClient.getBlobClient(entry.name);

      // Get blob content from position 0 to the end
      // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
      const downloadBlockBlobResponse = await blobClient.download();
      entry.imageurl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(await downloadBlockBlobResponse.blobBody));
    }


  }

photourl(url) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

  createImageFromBlob(image) {

  }

  // [Browsers only] A helper method used to convert a browser Blob into string.
  async blobToString(blob) {
    const fileReader = new FileReader();
    return new Promise((resolve, reject) => {
      fileReader.onloadend = (ev) => {
        resolve(ev.target.result);
      };
      fileReader.onerror = reject;
      fileReader.readAsText(blob);
    });
  }

  async downloadFile(filename) {


  }


}
