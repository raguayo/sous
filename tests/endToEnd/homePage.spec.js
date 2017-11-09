/* global describe it beforeEach after xit */

import { expect } from 'chai';
import webdriver from 'selenium-webdriver';

const User = require('../../server/db/models').User;

const By = webdriver.By;
const until = webdriver.until;

const driver = new webdriver.Builder()
  .forBrowser('firefox')
  .build();

describe('End to end tests', () => {
  const user = {
    email: 'test@test.com',
    password: 'test'
  };

  beforeEach('load webpage', function () {
    this.timeout(5000);
    return driver.get('http://drsous.herokuapp.com/');
    // todo: move to a container
  });

  after('close driver', () => driver.quit());

  describe('Splash page', () => {
    it('loads successfully', async () => {
      const greeting = await driver.findElement(By.id('greeting')).getText();
      expect(greeting).to.equal('meet sous,');
    }).timeout(6000);
  });

  describe('Auth', () => {
    beforeEach('navigate to login page', () => {
      driver.findElement(By.css('a[href="/login"]')).click();
    });

    it('login button leads to login ', async () => {
      driver.wait(until.elementLocated(By.name('login')), 1000);
      const emailInput = await driver.findElement(By.name('email'))
        .getTagName();
      const passwordInput = await driver.findElement(By.name('password'))
        .getTagName();
      expect(emailInput).to.equal('input');
      expect(passwordInput).to.equal('input');
    }).timeout(3000);
    // todo: set up docker container
    // it('login button leads to login ', async () => {
    //   driver.findElement(By.css('a[href="/login"]')).click();
    //   driver.wait(until.elementLocated(By.name('login')), 1000);
    //   await driver.findElement(By.name('email')).sendKeys(user.email);
    //   await driver.findElement(By.name('password')).sendKeys(user.password);
    //   await driver.findElement(By.css('form > button')).click();
    //   return driver.wait(until.elementLocated(By.name('recipeUrl')), 1000);
    // }).timeout(3000);
  });
});
