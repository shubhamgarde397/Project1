import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiCallsService } from '../../common/services/ApiCalls/ApiCalls.service';
import { CommonServisesService } from 'src/app/common/services/common-servises.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ApiCallsService]
})
export class ProfileComponent implements OnInit {
  public username: any;
  public password: any;
  public show = true;
  public myFormGroup: FormGroup;
  public response: any;
  public logindetailslist;
  public financialYear;
  public dbName = 'test';
  public fullData = [];
  public selectedFile: File = null;

  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public cData: CommonServisesService
  ) {

  }

  ngOnInit() {
    this.cData.data.subscribe((msg) => {
      this.fullData = msg
    });

    this.myFormGroup = this.formBuilder.group({
      myImage: ['', Validators.required],
      username: [this.fullData['username'], Validators.required],
      password: [this.fullData['password'], Validators.required],
      role: [this.fullData['role'], Validators.required]
    });
  }

  setSelectedFile(event) {
    this.selectedFile = event.target.files[0];
  }

  upload({ value, valid }: { value: { myImage: '', username: '', password: '', role: '' }, valid: boolean }) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name)
    value['id'] = this.fullData['_id'];
    value['createdAt'] = this.fullData['createdAt'];
    value['image'] = fd;
    this.apiCallservice.handleData_New(this.dbName, 'upload', 1, 0, value)
      .subscribe((res: any) => {
        this.cData.saveData(res[0]);
      });
  }
}
