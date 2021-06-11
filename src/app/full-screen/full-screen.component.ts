import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BlobServiceClient} from '@azure/storage-blob';
import {DataService} from '../data.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styleUrls: ['./full-screen.component.scss']
})
export class FullScreenComponent implements OnInit {
imageUrl;
blob;
loading;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private router: Router, private dataService: DataService) {
  }

  ngOnInit(): void {
    // delete any filename saved in local storage as no longer needed
    localStorage.removeItem('filename');

    this.route.queryParams
      .subscribe(params => {
          console.log(params);
          // if there is a url, use it
          if (params.url) {
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(params.url);
          } else if (params.file) {
            console.log('load from filename ' + params.file);
            const filename = params.file;
            if (!this.dataService.getValue() && !localStorage.getItem('connection')) {
              // no connection string so log in again
              // save route in local storage and log in again
              console.log('log in again before returning filename');
              localStorage.setItem('filename', filename);
              this.router.navigate(['signin']);
            } else {
              this.openFromFilename(filename);


            }
          } else {
            console.log('no details provided');
          }
        }
      );

  }

  displayImageFromUrl(url) {
    console.log('show image from url');
  }

  async openFromFilename(filename) {
    let url = '';

    if (this.dataService.getValue()) {
      url = this.dataService.getValue();
    } else if (localStorage.getItem('connection')) {
      url = localStorage.getItem('connection');
    }
    console.log(url);
    this.loading = true;

    try {
      const blobServiceClient = new BlobServiceClient(url);

// Get a reference to a container
      const containerClient = blobServiceClient.getContainerClient('input');

// get blob and create url
      const blobClient = containerClient.getBlobClient(filename);

// Get blob content from position 0 to the end
// In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
      const downloadBlockBlobResponse = await blobClient.download();
      const urlRetreived = URL.createObjectURL(await downloadBlockBlobResponse.blobBody);
      this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(urlRetreived);
      console.log(this.imageUrl + 'imageUrl');
      this.loading = false;

      // const blob = await fetch(urlRetreived).then(r => r.blob()).then(blobFile => {
      //   new File([blobFile],
      //     filename, {type: 'image/jpeg'});
      //   this.blob = blobFile;
      //
      // });
    } catch {
      console.log('problem downloading');
    }
  }


}


