import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.example.studoc{
   export enum sex {
      female,
      male,
   }
   export enum schoolLevel {
      primarySch,
      middleSch,
      highSch,
      university,
      master,
      phd,
   }
   export enum docStatus {
      educating,
      graduate,
      dropOut,
      pause,
      graduateButHaveNotCert,
      transfered,
   }
   export class school extends Participant {
      schoolID: string;
      schoolName: string;
      schoolAddress: string;
      schoolDescription: string;
   }
   export class student extends Asset {
      identityCD: string;
      stuName: string;
      stuSex: sex;
      imgUrl: string;
      stuStatu: docStatus;
      optimalLevel: schoolLevel;
      lastSchool: school;
      stuAllDocument: stuDocument[];
      familyMessage: string;
   }
   export class stuDocument extends Asset {
      docID: string;
      stuName: string;
      identityCD: string;
      stuID: string;
      level: schoolLevel;
      entranceTime: Date;
      updateTime: Date;
      school: school;
      statu: docStatus;
   }
   export class reward extends Asset {
      rewardID: string;
      rewardName: string;
      rewardMessage: string;
      rewardDate: Date;
   }
   export class punishment extends Asset {
      punishmentID: string;
      punishmentName: string;
      punishmentMessage: string;
      punishmentDate: Date;
   }
   export class stuCert extends Asset {
      certID: string;
      certName: string;
      certMessage: string;
      certDate: Date;
   }
   export class transferSchool extends Transaction {
      stu: student;
      newSchool: school;
      oldSchool: school;
   }
   export class transferEvent extends Event {
      stuD: stuDocument;
      oldSchool: school;
      newSchool: school;
   }
   export class graduate extends Transaction {
      detail: string;
   }
   export class entranceSchool extends Transaction {
      detail: string;
   }
   export class leaveSchool extends Transaction {
      detail: string;
   }
   export class pauseStudy extends Transaction {
      detail: string;
   }
   export class createDoc extends Transaction {
      detail: string;
   }
   export class graduateFromSch extends Event {
      detail: string;
   }
   export class admissionFrom extends Event {
      detail: string;
   }
// }
