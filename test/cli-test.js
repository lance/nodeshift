'use strict';

const test = require('tape');
const proxyquire = require('proxyquire');

test('export test', (t) => {
  const cli = require('../bin/cli');

  t.equal(typeof cli, 'function', 'cli should be a function');
  t.end();
});

test('default goal', (t) => {
  const cli = proxyquire('../bin/cli', {
    '../lib/nodeshift-config': () => {
      return Promise.resolve({});
    },
    '../lib/goals/resource.js': (config) => {
      t.pass('should be here for the default goal');
      return Promise.resolve();
    },
    '../lib/goals/build.js': (config) => {
      t.pass('should be here for the default goal');
      return Promise.resolve();
    },
    '../lib/apply-resources': (config) => {
      t.pass('should be here for the default goal');
      return Promise.resolve();
    }
  });

  cli({cmd: 'deploy'}).then(() => {
    t.end();
  });
});

test('resource goal', (t) => {
  const cli = proxyquire('../bin/cli', {
    '../lib/nodeshift-config': () => {
      return Promise.resolve({});
    },
    '../lib/goals/resource.js': (config) => {
      t.pass('should be here for the resource goal');
      return Promise.resolve();
    },
    '../lib/goals/build.js': (config) => {
      t.fail('should not be here for the resource goal');
      return Promise.resolve();
    },
    '../lib/apply-resources': (config) => {
      t.fail('should not be here for the resource goal');
      return Promise.resolve();
    }
  });

  cli({cmd: 'resource'}).then(() => {
    t.end();
  });
});

test('apply-resource goal', (t) => {
  const cli = proxyquire('../bin/cli', {
    '../lib/nodeshift-config': () => {
      return Promise.resolve({});
    },
    '../lib/goals/resource.js': (config) => {
      t.pass('should be here for the apply-resource goal');
      return Promise.resolve();
    },
    '../lib/goals/build.js': (config) => {
      t.fail('should not be here for the apply-resource goal');
      return Promise.resolve();
    },
    '../lib/apply-resources': (config) => {
      t.pass('should be here for the apply-resource goal');
      return Promise.resolve();
    }
  });

  cli({cmd: 'apply-resource'}).then(() => {
    t.end();
  });
});

test('no goal', (t) => {
  const cli = proxyquire('../bin/cli', {
    '../lib/nodeshift-config': () => {
      return Promise.resolve({});
    },
    '../lib/goals/resource.js': (config) => {
      t.fail('should not be here for the no goal');
      return Promise.resolve();
    },
    '../lib/goals/build.js': (config) => {
      t.fail('should not be here for the no goal');
      return Promise.resolve();
    },
    '../lib/apply-resources': (config) => {
      t.fail('should not be here for the no goal');
      return Promise.resolve();
    }
  });

  cli({}).then(() => {
    t.end();
  });
});