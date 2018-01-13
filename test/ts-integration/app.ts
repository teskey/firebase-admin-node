import * as admin from '../../lib/index'
import {expect} from 'chai';

import {
  defaultApp, nullApp, nonNullApp, databaseUrl, projectId, storageBucket
} from './setup';

describe('SDK Initialization', () => {
  it('populates required parameters', () => {
    expect(databaseUrl).to.be.not.empty;
    expect(projectId).to.be.not.empty;
    expect(storageBucket).to.be.not.empty;
  });

  it('does not load Firestore by default', () => {
    var gcloud = require.cache[require.resolve('@google-cloud/firestore')];
    expect(gcloud).to.be.undefined;
  });

  it('calling admin.firestore loads Firestore', () => {
    const firestoreNamespace = admin.firestore;
    expect(firestoreNamespace).to.not.be.null;
    var gcloud = require.cache[require.resolve('@google-cloud/firestore')];
    expect(gcloud).to.not.be.undefined;
  });
});

describe('admin.app()', () => {
  it('returns the default App', () => {
    let app = admin.app();
    expect(app).to.deep.equal(defaultApp);
    expect(app.name).to.equal('[DEFAULT]');
    expect(admin.auth(app).app).to.deep.equal(app);
    expect(app.options.databaseURL).to.equal(databaseUrl);
    expect(app.options.storageBucket).to.equal(storageBucket);
  });

  it('returns the App named "null"', () => {
    let app = admin.app('null');
    expect(app).to.deep.equal(nullApp);
    expect(app.name).to.equal('null');
    expect(admin.database(app).app).to.deep.equal(app);
    expect(app.options.databaseAuthVariableOverride).to.be.null;
  });

  it('returns the App named "nonNull"', () => {
    let app = admin.app('nonNull');
    expect(app).to.deep.equal(nonNullApp);
    expect(app.name).to.equal('nonNull');
    expect(admin.messaging(app).app).to.deep.equal(app);
    expect(admin.storage(app).app).to.deep.equal(app);
  });
});
