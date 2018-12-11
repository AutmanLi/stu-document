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
import { punishmentService } from './punishment.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-punishment',
  templateUrl: './punishment.component.html',
  styleUrls: ['./punishment.component.css'],
  providers: [punishmentService]
})
export class punishmentComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  punishmentID = new FormControl('', Validators.required);
  punishmentName = new FormControl('', Validators.required);
  punishmentMessage = new FormControl('', Validators.required);
  punishmentDate = new FormControl('', Validators.required);

  constructor(public servicepunishment: punishmentService, fb: FormBuilder) {
    this.myForm = fb.group({
      punishmentID: this.punishmentID,
      punishmentName: this.punishmentName,
      punishmentMessage: this.punishmentMessage,
      punishmentDate: this.punishmentDate
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.servicepunishment.getAll()
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
      $class: 'org.example.studoc.punishment',
      'punishmentID': this.punishmentID.value,
      'punishmentName': this.punishmentName.value,
      'punishmentMessage': this.punishmentMessage.value,
      'punishmentDate': this.punishmentDate.value
    };

    this.myForm.setValue({
      'punishmentID': null,
      'punishmentName': null,
      'punishmentMessage': null,
      'punishmentDate': null
    });

    return this.servicepunishment.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'punishmentID': null,
        'punishmentName': null,
        'punishmentMessage': null,
        'punishmentDate': null
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
      $class: 'org.example.studoc.punishment',
      'punishmentName': this.punishmentName.value,
      'punishmentMessage': this.punishmentMessage.value,
      'punishmentDate': this.punishmentDate.value
    };

    return this.servicepunishment.updateAsset(form.get('punishmentID').value, this.asset)
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

    return this.servicepunishment.deleteAsset(this.currentId)
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

    return this.servicepunishment.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'punishmentID': null,
        'punishmentName': null,
        'punishmentMessage': null,
        'punishmentDate': null
      };

      if (result.punishmentID) {
        formObject.punishmentID = result.punishmentID;
      } else {
        formObject.punishmentID = null;
      }

      if (result.punishmentName) {
        formObject.punishmentName = result.punishmentName;
      } else {
        formObject.punishmentName = null;
      }

      if (result.punishmentMessage) {
        formObject.punishmentMessage = result.punishmentMessage;
      } else {
        formObject.punishmentMessage = null;
      }

      if (result.punishmentDate) {
        formObject.punishmentDate = result.punishmentDate;
      } else {
        formObject.punishmentDate = null;
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
      'punishmentID': null,
      'punishmentName': null,
      'punishmentMessage': null,
      'punishmentDate': null
      });
  }

}
