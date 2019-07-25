import { Component, OnInit } from '@angular/core';
import { TestinggService } from "./testingg.service";
import * as firebase from 'firebase'
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  phoneNumberAuthInfo: FormGroup;
  windowRef: any;

  //phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;
  constructor(private win: TestinggService,
    private formBuilder: FormBuilder) {
    var config = {
      apiKey: "AIzaSyB-VIWCvr-xgrYLrfVzPyO90gcf2rYkJUU",
      authDomain: "phonenumberauth-52a2b.firebaseapp.com",
      databaseURL: "https://phonenumberauth-52a2b.firebaseio.com",
      projectId: "phonenumberauth-52a2b",
      storageBucket: "phonenumberauth-52a2b.appspot.com",
      messagingSenderId: "572332169854"
    };
    firebase.initializeApp(config);
  }
  ngOnInit() {
    this.createForm();
    this.windowRef = this.win.windowRef
    // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    // this.windowRef.recaptchaVerifier.render()
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        //onSignInSubmit();
      }
    });
  }
  createForm() {
    this.phoneNumberAuthInfo = this.formBuilder.group({
      pNumber: ['', Validators.required],
    })
  }
  e164() {
    const num = this.phoneNumberAuthInfo.value.pNumber
    return `+${num}`
  }
  sendLoginCode() {
    console.log(this.phoneNumberAuthInfo.value.pNumber);
    const appVerifier = this.windowRef.recaptchaVerifier;
    //console.log(appVerifier);

    //console.log(this.phoneNumberAuthInfo.value.pNumber.e164);
    // const num1 = this.phoneNumberAuthInfo.value.pNumber.e164;
    // console.log(num1);
    const num = this.e164();
    console.log(num);

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {
        this.windowRef.confirmationResult = result;
      })
      .catch(error => console.log(error));
  }
  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        this.user = result.user;
      })
      .catch(error => console.log(error, "Incorrect code entered?"));
  }
}
