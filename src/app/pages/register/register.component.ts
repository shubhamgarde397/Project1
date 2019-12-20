import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ApiCallsService]
})

export class RegisterComponent implements OnInit {
  public myFormGroup: FormGroup;
  public submitted = false;
  public response: any;
  public confirm_register = false;
  public new_value;
  public name: string;
  public dbName;
  constructor(public router: Router, public apiCallservice: ApiCallsService, public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  confirmNewUser({ value, valid }: { value: { username: '', password: '', confirm_password: '', role: '' }, valid: boolean }) {
    if (value.password === value.confirm_password) {

      this.submitted = true;
      this.apiCallservice.handleData_New('test', 'addUser', 1, 0, value)
        .subscribe((res: any) => {
          alert(res.Status)
        });
      this.router.navigate(['']);
    } else {
      alert('Check your passwoord');
    }
  }

  storeNewUser(adminUname, adminPassword) {
    if (adminUname === 'shubham' && adminPassword === 'shubham') {
      this.apiCallservice.handleData_New('test', 'addUser', 1, 0, this.new_value)
        .subscribe(res => {
          console.log(res);

        });
      this.router.navigate(['']);
    } else {
      alert('You are not authorized to enter the application...');
      this.router.navigate(['']);
    }
  }

  back() {
    this.submitted = !this.submitted;
  }
}
