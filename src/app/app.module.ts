import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormPageComponent } from './form-page/form-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';




import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { GeoapifyGeocoderAutocompleteModule } from '@geoapify/angular-geocoder-autocomplete';
import { NgxGeoautocompleteModule } from 'ngx-geoautocomplete-v2';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';




@NgModule({
  declarations: [
    AppComponent,
    FormPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxIntlTelInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    GeoapifyGeocoderAutocompleteModule.withConfig('81c8198343a94be2a17dfa1f1495e9ad'),
    NgxGeoautocompleteModule.forRoot(),
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    NgxMatIntlTelInputModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
