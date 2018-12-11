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

'use strict';
/**
 * Write your transction processor functions here
 */

/**
 * transferSchool transaction 转学
 * @param {org.example.studoc.transferSchool} tx
 * @transaction
 */
async function transferSchool(tx){
    const oldSchool=tx.stu.lastSchool;
    tx.stu.lastSchool=tx.newSchool;

    //每次转学都会生成一份新档案
    const factory=getFactory();
    const namespace = 'org.example.studoc';
    //随机生成12位的档案号
    const stuNewDocument= factory.newResource(namespace,'stuDocument',randomString(12))
    stuNewDocument.stuName=tx.stu.stuName
    stuNewDocument.identityCD=tx.stu.identityCD
    stuNewDocument.stuID=randomString(8);   //生成随机的8位学号
    stuNewDocument.level=tx.stu.optimalLevel;
    stuNewDocument.entranceTime=new Date();
    stuNewDocument.school=tx.newSchool;
    stuNewDocument.statu= 'educating';
  	stuNewDocument.updateTime=new Date();

    // 保存新的档案
    const stuNewDocRegistry = await getAssetRegistry(stuNewDocument.getFullyQualifiedType());
    await stuNewDocRegistry.add(stuNewDocument);

    //更新该学生的档案信息，在最后一个档案里面更新离校时间和该档案状态，再添加新档案上去
    var stuDocLen=tx.stu.stuAllDocument.length;
    if(stuDocLen>0){
        const oldDocument=tx.stu.stuAllDocument[tx.stu.stuAllDocument.length-1];
        oldDocument.updateTime=new Date();
        oldDocument.statu='transfered';
        const stuOldDocRegistry=await getAssetRegistry('org.example.studoc.stuDocument');
        await stuOldDocRegistry.update(oldDocument);
    }
    
    tx.stu.stuAllDocument.push(stuNewDocument);

    const stuUpdateRegistry = await getAssetRegistry('org.example.studoc.student');
    await stuUpdateRegistry.update(tx.stu);

    //记录这次转学事件
    let event = getFactory().newEvent('org.example.studoc', 'transferEvent');
    event.stu = tx.stu;
    event.oldSchool = tx.oldSchool;
    event.newSchool = tx.newSchool;
    emit(event);
}

/**
 * graduate 学生毕业
 * @param {org.example.studoc.graduate} stuDoc
 * @transaction
 */
async function graduate(stuDoc){

}

function randomString(len) {
    　　len = len || 12;
    　　var $chars = '0123456789';    
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
}


async function cert(tx){
    
}