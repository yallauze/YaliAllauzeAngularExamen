import { browser, element, logging, by, ActionSequence } from 'protractor';
import { ComputerPage } from './computer.po';


describe('test des computers', () => {
    let page: ComputerPage;
    let nbComputer: number;
    
    beforeEach(() => {
        page = new ComputerPage();
        browser.get('/computers');
    });

    it('Test le formulaire ADD', () => {
        element.all(by.css('.myTr')).then((totalRows) => {
            this.nbComputer = totalRows.length;
            element(by.id('addComputerLink')).click();
            page.sleep();
        });
        browser.get('/add');
        page.completeForm();
        page.sleep();
        let submitBtn = element.all(by.id('submitBtn'));
        page.sleep();
        submitBtn.click().then(() => {
            page.sleep();
            page.sleep();
            browser.get('/computers');
            element.all(by.css('.myTr')).then(totalRows => {
                this.nbComputer += 1;
                const compare = this.nbComputer;
                expect(totalRows.length).toEqual(compare);
                page.sleep();
            });
        });
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
