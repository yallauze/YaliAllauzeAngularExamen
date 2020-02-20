import { browser, by, element, protractor } from 'protractor';

export class ComputerPage {

  sleep() {
    browser.driver.sleep(2000);
  }

  completeForm() {
    element.all(by.id('modele')).sendKeys('testModele');
    element.all(by.css('.my-radio-marque')).get(0).click();
    element.all(by.id('type')).sendKeys('Portable');
    element.all(by.css('.my-radio-category')).get(0).click();
    element.all(by.id('achat')).sendKeys('199.99');
    element.all(by.id('vente')).sendKeys('475.99');
  }
}
