/* global describe it */

import { expect } from 'chai';
import webdriver from 'selenium-webdriver';

const By = webdriver.By;
// const until = webdriver.until;

const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

describe('End to end tests', () => {
  describe('Splash page', () => {
    it('loads successfully', async () => {
      await driver.get('https://drsous.herokuapp.com/');
      const greeting = await driver.findElement(By.id('greeting')).getText();
      expect(greeting).to.equal('meet sous,');
      return driver.quit();
    }).timeout(6000);
  });
});
