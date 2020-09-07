import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../mustMatch.validators';
import { HttpClient } from '@angular/common/http';

// import custom validator to validate that password and confirm 
@Component({
  selector: 'app-zopper-sample-form',
  templateUrl: './zopper-sample-form.component.html',
  styleUrls: ['./zopper-sample-form.component.css']
})
export class ZopperSampleFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  contactMethod = [
    {id:1, name: 'Email'},
    {id:2, name: 'Phone'}
  ]
  constructor(private formBuilder: FormBuilder,
    private http: HttpClient) { 
  
  }
  

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      user_notification: ['email'],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.required,  Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
    }, {
        validator: MustMatch('password', 'confirmPassword')
    });
    this.registerForm.get('user_notification').valueChanges.subscribe(
      x => this.setNotificationValidation(x));

  }
  onCreatePost(postData: { name: string; email: string; phone: number; user_notification: string; password: string; confirmPassword: string }) {
    console.log(postData);
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

 
 
  setNotificationValidation(value: string) {
    const phoneControl = this.registerForm.get('phone');
    const emailControl = this.registerForm.get('email');
    if (value == 'phone') {
      phoneControl.setValidators(Validators.required);
      emailControl.clearValidators();
      emailControl.setValidators(Validators.email);
    }
    else {
      phoneControl.clearValidators(); emailControl.setValidators([Validators.email, Validators.required]);
      // emailControl.setAsyncValidators(DuplicateEmailCheck.checkEmail(this._userServiceObj));
    }
    phoneControl.updateValueAndValidity();
    emailControl.updateValueAndValidity();
  } 

  

  onSubmit(postData) {
    this.http
      .post(
        'https://zopper-4c15a.firebaseio.com/posts.json',
        postData
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
 
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // display form values on success
     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
  

}
