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

import { AngularTestPage } from './app.po';
import { ExpectedConditions, browser, element, by } from 'protractor';
import {} from 'jasmine';


describe('Starting tests for stu-document', function() {
  let page: AngularTestPage;

  beforeEach(() => {
    page = new AngularTestPage();
  });

  it('website title should be stu-document', () => {
    page.navigateTo('/');
    return browser.getTitle().then((result)=>{
      expect(result).toBe('stu-document');
    })
  });

  it('network-name should be stu-document-network@0.0.1',() => {
    element(by.css('.network-name')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('stu-document-network@0.0.1.bna');
    });
  });

  it('navbar-brand should be stu-document',() => {
    element(by.css('.navbar-brand')).getWebElement()
    .then((webElement) => {
      return webElement.getText();
    })
    .then((txt) => {
      expect(txt).toBe('stu-document');
    });
  });

  
    it('student component should be loadable',() => {
      page.navigateTo('/student');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('student');
      });
    });

    it('student table should have 10 columns',() => {
      page.navigateTo('/student');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('stuDocument component should be loadable',() => {
      page.navigateTo('/stuDocument');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('stuDocument');
      });
    });

    it('stuDocument table should have 10 columns',() => {
      page.navigateTo('/stuDocument');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(10); // Addition of 1 for 'Action' column
      });
    });
  
    it('reward component should be loadable',() => {
      page.navigateTo('/reward');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('reward');
      });
    });

    it('reward table should have 5 columns',() => {
      page.navigateTo('/reward');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('punishment component should be loadable',() => {
      page.navigateTo('/punishment');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('punishment');
      });
    });

    it('punishment table should have 5 columns',() => {
      page.navigateTo('/punishment');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  
    it('stuCert component should be loadable',() => {
      page.navigateTo('/stuCert');
      browser.findElement(by.id('assetName'))
      .then((assetName) => {
        return assetName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('stuCert');
      });
    });

    it('stuCert table should have 5 columns',() => {
      page.navigateTo('/stuCert');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('school component should be loadable',() => {
      page.navigateTo('/school');
      browser.findElement(by.id('participantName'))
      .then((participantName) => {
        return participantName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('school');
      });
    });

    it('school table should have 5 columns',() => {
      page.navigateTo('/school');
      element.all(by.css('.thead-cols th')).then(function(arr) {
        expect(arr.length).toEqual(5); // Addition of 1 for 'Action' column
      });
    });
  

  
    it('transferSchool component should be loadable',() => {
      page.navigateTo('/transferSchool');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('transferSchool');
      });
    });
  
    it('graduate component should be loadable',() => {
      page.navigateTo('/graduate');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('graduate');
      });
    });
  
    it('entranceSchool component should be loadable',() => {
      page.navigateTo('/entranceSchool');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('entranceSchool');
      });
    });
  
    it('leaveSchool component should be loadable',() => {
      page.navigateTo('/leaveSchool');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('leaveSchool');
      });
    });
  
    it('pauseStudy component should be loadable',() => {
      page.navigateTo('/pauseStudy');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('pauseStudy');
      });
    });
  
    it('createDoc component should be loadable',() => {
      page.navigateTo('/createDoc');
      browser.findElement(by.id('transactionName'))
      .then((transactionName) => {
        return transactionName.getText();
      })
      .then((txt) => {
        expect(txt).toBe('createDoc');
      });
    });
  

});