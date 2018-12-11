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
import { stuDocumentService } from './stuDocument.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-studocument',
  templateUrl: './stuDocument.component.html',
  styleUrls: ['./stuDocument.component.css'],
  providers: [stuDocumentService]
})
export class stuDocumentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  docID = new FormControl('', Validators.required);
  stuName = new FormControl('', Validators.required);
  identityCD = new FormControl('', Validators.required);
  stuID = new FormControl('', Validators.required);
  level = new FormControl('', Validators.required);
  entranceTime = new FormControl('', Validators.required);
  updateTime = new FormControl('', Validators.required);
  school = new FormControl('', Validators.required);
  statu = new FormControl('', Validators.required);

  constructor(public servicestuDocument: stuDocumentService, fb: FormBuilder) {
    this.myForm = fb.group({
      docID: this.docID,
      stuName: this.stuName,
      identityCD: this.identityCD,
      stuID: this.stuID,
      level: this.level,
      entranceTime: this.entranceTime,
      updateTime: this.updateTime,
      school: this.school,
      statu: this.statu
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicestuDocument.getAll()
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
      $class: 'org.example.studoc.stuDocument',
      'docID': this.docID.value,
      'stuName': this.stuName.value,
      'identityCD': this.identityCD.value,
      'stuID': this.stuID.value,
      'level': this.level.value,
      'entranceTime': this.entranceTime.value,
      'updateTime': this.updateTime.value,
      'school': this.school.value,
      'statu': this.statu.value
    };

    this.myForm.setValue({
      'docID': null,
      'stuName': null,
      'identityCD': null,
      'stuID': null,
      'level': null,
      'entranceTime': null,
      'updateTime': null,
      'school': null,
      'statu': null
    });

    return this.servicestuDocument.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'docID': null,
        'stuName': null,
        'identityCD': null,
        'stuID': null,
        'level': null,
        'entranceTime': null,
        'updateTime': null,
        'school': null,
        'statu': null
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
      $class: 'org.example.studoc.stuDocument',
      'stuName': this.stuName.value,
      'identityCD': this.identityCD.value,
      'stuID': this.stuID.value,
      'level': this.level.value,
      'entranceTime': this.entranceTime.value,
      'updateTime': this.updateTime.value,
      'school': this.school.value,
      'statu': this.statu.value
    };

    return this.servicestuDocument.updateAsset(form.get('docID').value, this.asset)
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

    return this.servicestuDocument.deleteAsset(this.currentId)
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

    return this.servicestuDocument.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'docID': null,
        'stuName': null,
        'identityCD': null,
        'stuID': null,
        'level': null,
        'entranceTime': null,
        'updateTime': null,
        'school': null,
        'statu': null
      };

      if (result.docID) {
        formObject.docID = result.docID;
      } else {
        formObject.docID = null;
      }

      if (result.stuName) {
        formObject.stuName = result.stuName;
      } else {
        formObject.stuName = null;
      }

      if (result.identityCD) {
        formObject.identityCD = result.identityCD;
      } else {
        formObject.identityCD = null;
      }

      if (result.stuID) {
        formObject.stuID = result.stuID;
      } else {
        formObject.stuID = null;
      }

      if (result.level) {
        formObject.level = result.level;
      } else {
        formObject.level = null;
      }

      if (result.entranceTime) {
        formObject.entranceTime = result.entranceTime;
      } else {
        formObject.entranceTime = null;
      }

      if (result.updateTime) {
        formObject.updateTime = result.updateTime;
      } else {
        formObject.updateTime = null;
      }

      if (result.school) {
        formObject.school = result.school;
      } else {
        formObject.school = null;
      }

      if (result.statu) {
        formObject.statu = result.statu;
      } else {
        formObject.statu = null;
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
      'docID': null,
      'stuName': null,
      'identityCD': null,
      'stuID': null,
      'level': null,
      'entranceTime': null,
      'updateTime': null,
      'school': null,
      'statu': null
      });
  }

}
