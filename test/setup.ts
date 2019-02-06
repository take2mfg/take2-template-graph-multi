var _Chai = require('chai');
var Sinon = require('sinon');
var ChaiAsPromised = require('chai-as-promised');
var sinonChai = require('sinon-chai');
var Nock = require('nock');

_Chai.should();
_Chai.use(ChaiAsPromised);
_Chai.use(sinonChai);
_Chai.use(require('chai-uuid'));

_Chai.use(function(_chai, _) {
  _chai.Assertion.addMethod('withMessage', function(msg) {
    _.flag(this, 'message', msg);
  });
});

global.chai = _Chai;
global.chaiAsPromised = ChaiAsPromised;
global.expect = _Chai.expect;
global.assert = _Chai.assert;
global.request = require('supertest');
global.sinon = Sinon;
global.nock = Nock;
global.sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
