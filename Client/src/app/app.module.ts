import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { InfoServiceService } from './info-service.service';
import { AddSellerDialogComponent } from './add-seller-dialog/add-seller-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    DetailsPageComponent,
    AddSellerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ToastrModule.forRoot({enableHtml: true}),
    RouterModule.forRoot([
       { path: '', redirectTo: 'main', pathMatch:'full'},
       { path: 'main', component: MainPageComponent},
       { path: 'details/:id', component:DetailsPageComponent}
     ]),
    NgbModule.forRoot()
  ],
  providers: [InfoServiceService],
  bootstrap: [AppComponent],
    entryComponents: [AddSellerDialogComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})  
export class AppModule { }
