/* global describe it before beforeEach after xit */

import { expect } from 'chai';
import webdriver from 'selenium-webdriver';

const User = require('../../server/db/models').User;

const By = webdriver.By;
const until = webdriver.until;

describe('End to end tests', () => {
  let driver;
  const user = {
    name: 'Mr. Testerson',
    email: 'test@test.com',
    password: 'test'
  };

  before('create selenium webdriver', function (done) {
    this.timeout(10000);
    driver = new webdriver.Builder()
      .forBrowser('firefox')
      .usingServer('http://selenium-hub:4444/wd/hub')
      .build();
    driver
      .then(() => done())
      .catch((err) => {
        console.error('Driver initialization failed: ', err);
        done(err);
      });
  });

  beforeEach('load webpage', function () {
    this.timeout(5000);
    return driver.get('http://test:8080/');
  });

  after('close driver', () => driver.quit());

  describe('Splash page', () => {
    it('loads successfully', async () => {
      const greeting = await driver.findElement(By.id('greeting')).getText();
      expect(greeting).to.equal('meet sous,');
    }).timeout(6000);
  });

  describe('Auth', () => {
    beforeEach('adds user to db', (done) => {
      User.create(user)
        .then(() => done())
        .catch(done);
    });

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

    it('login button leads to login ', async () => {
      driver.wait(until.elementLocated(By.name('login')), 1000);
      await driver.findElement(By.name('email')).sendKeys(user.email);
      await driver.findElement(By.name('password')).sendKeys(user.password);
      await driver.findElement(By.css('form > button')).click();
      await driver.wait(until.elementLocated(By.tagName('h1')), 5000);
      const welcomeMessage = await driver.findElement(By.tagName('h1'));
      const welcomeText = await welcomeMessage.getText();
      expect(welcomeText).to.include(user.name);
    }).timeout(15000);
  });
});
