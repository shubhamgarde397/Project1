import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { CommonServisesService } from 'src/app/common/services/common-servises.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiCallsService]
})
export class LoginComponent implements OnInit {
  public username: any;
  public password: any;
  public show = true;
  public myFormGroup: FormGroup;
  public response: any;
  public logindetailslist;
  public financialYear;
  public dbName = 'test';
  public dataFromDB = [];
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public cData: CommonServisesService
  ) {

  }

  ngOnInit() {
    this.myFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login({ value, valid }: { value: { username: '', password: '' }, valid: boolean }) {
    this.apiCallservice.handleData_New(this.dbName, 'login', 1, 0, { "username": value.username, "password": value.password })
      .subscribe((res: any) => {
        if (res.Error) {
          alert(res.Error)
        } else {
          this.cData.saveData(res[0]);
          this.router.navigate(['Profile']);
        }
      });
  }


  register() {
    this.show = !this.show;
    this.router.navigate(['register']);
  }
}
