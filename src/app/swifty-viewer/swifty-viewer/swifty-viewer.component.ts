import { SwiftyConfig } from './../../models/swifty.config';
import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { PDFDocumentProxy, PDFProgressData, PDFSource } from 'src/app/pdf-viewer/pdf-viewer.module';
import { PdfViewerComponent } from 'src/app/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'swifty-viewer',
  templateUrl: './swifty-viewer.component.html',
  styleUrls: ['./swifty-viewer.component.scss']
})


export class SwiftyViewerComponent implements OnInit {
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.NUM_PLUS) {
      this.incrementZoom(0.1)
    }

    if (event.keyCode === KEY_CODE.NUM_MINUS) {
      this.incrementZoom(-0.1)
    }
  }

  @Input() config: SwiftyConfig;
  constructor() { }

  ngOnInit(): void {
  }

  error: any;
  page = 1;
  rotation = 0;
  zoom = 0.9;
  pdf: any;
  progressData: PDFProgressData;
  isLoaded = false;
  outline: any[];
  pdfQuery = '';
  pos = { top: 0, left: 0, x: 0, y: 0 };
  @ViewChild(PdfViewerComponent) private pdfComponent: PdfViewerComponent;
  element: HTMLElement;

  @HostListener('mousedown', ['$event'])
  mouseDownHandler = (e) => {
    const element = document.getElementById('pdf-viewer');
    element.style.cursor = 'grabbing';
    element.style.userSelect = 'none';

    this.pos = {
      left: element.scrollLeft,
      top: element.scrollTop,
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener('mousemove', this.mouseMoveHandler);
    document.addEventListener('mouseup', this.mouseUpHandler);
  };

  mouseUpHandler = (e) => {
    const element = document.getElementById('pdf-viewer');
    element.style.cursor = 'grab'
    element.style.removeProperty('user-select');
    document.removeEventListener('mousemove', this.mouseMoveHandler);
    document.removeEventListener('mouseup', this.mouseUpHandler);
  };

  mouseMoveHandler = (e) => {
    const element = document.getElementById('pdf-viewer');
    const dx = e.clientX - this.pos.x;
    const dy = e.clientY - this.pos.y;
    element.scrollTop = this.pos.top - dy;
    element.scrollLeft = this.pos.left - dx;
  };

  downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = this.config.fileName;
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  src = this._base64ToArrayBuffer('JVBERi0xLjcKCjEgMCBvYmogICUgZW50cnkgcG9pbnQKPDwKICAvVHlwZSAvQ2F0YWxvZwog' +
    'IC9QYWdlcyAyIDAgUgo+PgplbmRvYmoKCjIgMCBvYmoKPDwKICAvVHlwZSAvUGFnZXMKICAv' +
    'TWVkaWFCb3ggWyAwIDAgMjAwIDIwMCBdCiAgL0NvdW50IDEKICAvS2lkcyBbIDMgMCBSIF0K' +
    'Pj4KZW5kb2JqCgozIDAgb2JqCjw8CiAgL1R5cGUgL1BhZ2UKICAvUGFyZW50IDIgMCBSCiAg' +
    'L1Jlc291cmNlcyA8PAogICAgL0ZvbnQgPDwKICAgICAgL0YxIDQgMCBSIAogICAgPj4KICA+' +
    'PgogIC9Db250ZW50cyA1IDAgUgo+PgplbmRvYmoKCjQgMCBvYmoKPDwKICAvVHlwZSAvRm9u' +
    'dAogIC9TdWJ0eXBlIC9UeXBlMQogIC9CYXNlRm9udCAvVGltZXMtUm9tYW4KPj4KZW5kb2Jq' +
    'Cgo1IDAgb2JqICAlIHBhZ2UgY29udGVudAo8PAogIC9MZW5ndGggNDQKPj4Kc3RyZWFtCkJU' +
    'CjcwIDUwIFRECi9GMSAxMiBUZgooSGVsbG8sIHdvcmxkISkgVGoKRVQKZW5kc3RyZWFtCmVu' +
    'ZG9iagoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMDEwIDAwMDAwIG4g' +
    'CjAwMDAwMDAwNzkgMDAwMDAgbiAKMDAwMDAwMDE3MyAwMDAwMCBuIAowMDAwMDAwMzAxIDAw' +
    'MDAwIG4gCjAwMDAwMDAzODAgMDAwMDAgbiAKdHJhaWxlcgo8PAogIC9TaXplIDYKICAvUm9v' +
    'dCAxIDAgUgo+PgpzdGFydHhyZWYKNDkyCiUlRU9G');

  _base64ToArrayBuffer(base64) {
    var binary_string = base64.replace(/\\n/g, '');
    binary_string = window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
  }


  toggleOutline() {
    this.config.isOutlineShown = !this.config.isOutlineShown;
  }

  incrementPage(amount: number) {
    this.page += amount;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }

  rotate(angle: number) {
    this.rotation += angle;
  }
  /**
   * Get pdf information after it's loaded
   * @param pdf
   */
  afterLoadComplete(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isLoaded = true;
    this.loadOutline();
  }

  loadOutline() {
    this.pdf.getOutline().then((outline: any[]) => {
      this.outline = outline;
    });
  }

  /**
   * Handle error callback
   *
   * @param error
   */
  onError(error: any) {
    this.error = error; // set error

    if (error.name === 'PasswordException') {
      const password = prompt(
        'This document is password protected. Enter the password:'
      );

      if (password) {
        this.error = null;
        this.setPassword(password);
      }
    }
  }

  setPassword(password: string) {
    let newSrc;
    if (this.config.src instanceof ArrayBuffer) {
      newSrc = { data: this.config.src };
    } else if (typeof this.config.src === 'string') {
      newSrc = { url: this.config.src };
    } else {
      newSrc = { ...this.config.src };
    }
    newSrc.password = password;
    this.config.src = newSrc;
  }

  /**
   * Pdf loading progress callback
   * @param {PDFProgressData} progressData
   */
  onProgress(progressData: PDFProgressData) {
    console.log(progressData);
    this.progressData = progressData;
    this.isLoaded = false;
    this.error = null; // clear error
  }

  getInt(value: number): number {
    return Math.round(value);
  }

  /**
   * Navigate to destination
   * @param destination
   */
  navigateTo(destination: any) {
    this.pdfComponent.pdfLinkService.navigateTo(destination);
  }

  /**
   * Scroll view
   */
  scrollToPage() {
    this.pdfComponent.pdfViewer.scrollPageIntoView({
      pageNumber: 3,
    });
  }

  /**
   * Page rendered callback, which is called when a page is rendered (called multiple times)
   *
   * @param {CustomEvent} e
   */
  pageRendered(e: CustomEvent) {
    console.log('(page-rendered)', e);
  }

  searchQueryChanged(newQuery: string) {
    if (newQuery !== this.pdfQuery) {
      this.pdfQuery = newQuery;
      this.pdfComponent.pdfFindController.executeCommand('find', {
        query: this.pdfQuery,
        highlightAll: true,
      });
    } else {
      this.pdfComponent.pdfFindController.executeCommand('findagain', {
        query: this.pdfQuery,
        highlightAll: true,
      });
    }
  }
}

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
  NUM_PLUS = 107,
  NUM_MINUS = 109
}