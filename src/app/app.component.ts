import { SwiftyConfig } from './models/swifty.config';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor() {
    console.log()
  }


  pdfConfig: SwiftyConfig = {
    autoResize: false,
    src: '../assets/ecg-sample.pdf',
    fitToPage: false,
    stickToPage: false,
    showAll: true,
    showBorders: true,
    originalSize: true,
    fileName: 'Hartis.pdf'
  };
}
