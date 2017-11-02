/* global describe beforeEach it afterEach */

const { expect } = require("chai");
const sinon = require("sinon");

const mockAxios = require('../../mockAdapter');
const Peapod = require('../../../peapod/api');
const utils = require('../../../peapod/utilityFuncs');
const mapToPeapod = require('../../../peapod/mapToPeapod').mapToPeapod;

const { PeapodIngredient } = require('../../../server/db/models');

const sampleProductOne = require('./utils/samplePeapodProduct');

describe('mapToPeapod', async () => {
  const ingObj = {
    id: 1,
    name: 'butter',
    size: null,
    aisle: 'Milk, Eggs, Other Dairy',
    unitMeasure: 'tablespoon',
    peapodIngredientId: null,
  };
  const conversionResponse = {
    sourceAmount: 1,
    sourceUnit: "lb",
    targetAmount: 32.4,
    targetUnit: "tablespoon",
    answer: "1 lb butter translates to 32.4 tablespoon.",
    type: "CONVERSION",
  };
  let stub;
  let adjustStub;

  beforeEach('stub peapod.search', () => {
    const peapodSearchResults = {
      products: [
        sampleProductOne,
        require('./utils/samplePeapodProductTwo'),
      ],
    };
    stub = sinon.stub(Peapod.prototype, 'search')
      .callsFake((ingName, cb) => {
        cb(null, peapodSearchResults);
      });
  });

  beforeEach('stub adjustSizeAndUnit', () => {
    adjustStub = sinon.stub(utils, 'adjustSizeAndUnit')
      .returns([1, 'LB']);
  });

  beforeEach('mock conversion API', () => {
    mockAxios.onAny().reply(200, conversionResponse);
  });

  afterEach('restore and reset stubs and mocks', () => {
    mockAxios.reset();
    stub.restore();
    adjustStub.restore();
  });

  it('returns a promise that resolves to [instance, isCreated]',
    async () => {
      const peapodIng = await mapToPeapod(ingObj);
      expect(peapodIng).to.be.an('array');
      expect(peapodIng[0] instanceof PeapodIngredient).to.equal(true);
      const result = peapodIng[0].dataValues;
      expect(result).to.be.an('object');
      expect(result.prodId).to.equal(sampleProductOne.prodId);
      expect(result.size).to.equal(conversionResponse.targetAmount);
    });

  it('returns a promise that resolves to [undefined, false] if the api cannot convert the units',
    async () => {
      mockAxios.reset();
      mockAxios.onAny().reply(200, {
        status: "failure",
      });

      const peapodIng = await mapToPeapod(ingObj);
      expect(peapodIng).to.be.an('array');
      expect(peapodIng[0]).to.be.an('undefined');
    });

  it('returns an error if converstion api fails',
    async () => {
      mockAxios.reset();
      mockAxios.onAny().networkError();

      const peapodIng = await mapToPeapod(ingObj);
      expect(peapodIng instanceof Error).to.equal(true);
      expect(peapodIng.message).to.equal('Network Error');
    },
  );

  it('returns an error if peapod api fails',
    async () => {
      const errorMsg = 'Peapod API failed';
      stub.restore();
      stub = sinon.stub(Peapod.prototype, 'search')
      .callsFake((ingName, cb) => {
        cb(new Error(errorMsg), null);
      });
      const peapodIng = await mapToPeapod(ingObj);
      expect(peapodIng instanceof Error).to.equal(true);
      expect(peapodIng.message).to.equal(errorMsg);
    },
  );
});
