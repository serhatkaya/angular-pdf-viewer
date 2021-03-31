import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InlineSVGModule } from 'ng-inline-svg';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PdfViewerModule } from './pdf-viewer/pdf-viewer.module';
import { SwiftyViewerComponent } from './swifty-viewer/swifty-viewer/swifty-viewer.component';
@NgModule({
  declarations: [
    AppComponent,
    SwiftyViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InlineSVGModule.forRoot(),
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
