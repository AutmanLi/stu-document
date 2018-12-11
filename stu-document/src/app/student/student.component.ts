/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { studentService } from './student.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
  providers: [studentService]
})
export class studentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  identityCD = new FormControl('', Validators.required);
  stuName = new FormControl('', Validators.required);
  stuSex = new FormControl('', Validators.required);
  imgUrl = new FormControl('', Validators.required);
  stuStatu = new FormControl('', Validators.required);
  optimalLevel = new FormControl('', Validators.required);
  lastSchool = new FormControl('', Validators.required);
  stuAllDocument = new FormControl('', Validators.required);
  familyMessage = new FormControl('', Validators.required);

  constructor(public servicestudent: studentService, fb: FormBuilder) {
    this.myForm = fb.group({
      identityCD: this.identityCD,
      stuName: this.stuName,
      stuSex: this.stuSex,
      imgUrl: this.imgUrl,
      stuStatu: this.stuStatu,
      optimalLevel: this.optimalLevel,
      lastSchool: this.lastSchool,
      stuAllDocument: this.stuAllDocument,
      familyMessage: this.familyMessage
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicestudent.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.studoc.student',
      'identityCD': this.identityCD.value,
      'stuName': this.stuName.value,
      'stuSex': this.stuSex.value,
      'imgUrl': this.imgUrl.value,
      'stuStatu': this.stuStatu.value,
      'optimalLevel': this.optimalLevel.value,
      'lastSchool': this.lastSchool.value,
      'stuAllDocument': this.stuAllDocument.value,
      'familyMessage': this.familyMessage.value
    };

    this.myForm.setValue({
      'identityCD': null,
      'stuName': null,
      'stuSex': null,
      'imgUrl': null,
      'stuStatu': null,
      'optimalLevel': null,
      'lastSchool': null,
      'stuAllDocument': null,
      'familyMessage': null
    });

    return this.servicestudent.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'identityCD': null,
        'stuName': null,
        'stuSex': null,
        'imgUrl': null,
        'stuStatu': null,
        'optimalLevel': null,
        'lastSchool': null,
        'stuAllDocument': null,
        'familyMessage': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.example.studoc.student',
      'stuName': this.stuName.value,
      'stuSex': this.stuSex.value,
      'imgUrl': this.imgUrl.value,
      'stuStatu': this.stuStatu.value,
      'optimalLevel': this.optimalLevel.value,
      'lastSchool': this.lastSchool.value,
      'stuAllDocument': this.stuAllDocument.value,
      'familyMessage': this.familyMessage.value
    };

    return this.servicestudent.updateAsset(form.get('identityCD').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.servicestudent.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.servicestudent.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'identityCD': null,
        'stuName': null,
        'stuSex': null,
        'imgUrl': null,
        'stuStatu': null,
        'optimalLevel': null,
        'lastSchool': null,
        'stuAllDocument': null,
        'familyMessage': null
      };

      if (result.identityCD) {
        formObject.identityCD = result.identityCD;
      } else {
        formObject.identityCD = null;
      }

      if (result.stuName) {
        formObject.stuName = result.stuName;
      } else {
        formObject.stuName = null;
      }

      if (result.stuSex) {
        formObject.stuSex = result.stuSex;
      } else {
        formObject.stuSex = null;
      }

      if (result.imgUrl) {
        formObject.imgUrl = result.imgUrl;
      } else {
        formObject.imgUrl = null;
      }

      if (result.stuStatu) {
        formObject.stuStatu = result.stuStatu;
      } else {
        formObject.stuStatu = null;
      }

      if (result.optimalLevel) {
        formObject.optimalLevel = result.optimalLevel;
      } else {
        formObject.optimalLevel = null;
      }

      if (result.lastSchool) {
        formObject.lastSchool = result.lastSchool;
      } else {
        formObject.lastSchool = null;
      }

      if (result.stuAllDocument) {
        formObject.stuAllDocument = result.stuAllDocument;
      } else {
        formObject.stuAllDocument = null;
      }

      if (result.familyMessage) {
        formObject.familyMessage = result.familyMessage;
      } else {
        formObject.familyMessage = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'identityCD': null,
      'stuName': null,
      'stuSex': null,
      'imgUrl': null,
      'stuStatu': null,
      'optimalLevel': null,
      'lastSchool': null,
      'stuAllDocument': null,
      'familyMessage': null
      });
  }

}
