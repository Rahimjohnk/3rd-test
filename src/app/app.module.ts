import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FirebaseModule, FirebaseProvider } from 'angular-firebase'
import { AppComponent } from './app.component';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    FirebaseModule,
    BrowserModule
  ],
  providers: [
    FormBuilder,
    FirebaseProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
