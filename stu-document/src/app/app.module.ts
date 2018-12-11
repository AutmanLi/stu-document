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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { studentComponent } from './student/student.component';
import { stuDocumentComponent } from './stuDocument/stuDocument.component';
import { rewardComponent } from './reward/reward.component';
import { punishmentComponent } from './punishment/punishment.component';
import { stuCertComponent } from './stuCert/stuCert.component';

import { schoolComponent } from './school/school.component';

import { transferSchoolComponent } from './transferSchool/transferSchool.component';
import { graduateComponent } from './graduate/graduate.component';
import { entranceSchoolComponent } from './entranceSchool/entranceSchool.component';
import { leaveSchoolComponent } from './leaveSchool/leaveSchool.component';
import { pauseStudyComponent } from './pauseStudy/pauseStudy.component';
import { createDocComponent } from './createDoc/createDoc.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    studentComponent,
    stuDocumentComponent,
    rewardComponent,
    punishmentComponent,
    stuCertComponent,
    schoolComponent,
    transferSchoolComponent,
    graduateComponent,
    entranceSchoolComponent,
    leaveSchoolComponent,
    pauseStudyComponent,
    createDocComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
