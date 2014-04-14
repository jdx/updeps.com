var nock = require('nock');

exports.nockAllRequests = function() {
  nock('https://fullfatdb.npmjs.com:443:443')
  .get('/registry/nonexistantpackage')
  .reply(404, "{\"error\":\"not_found\",\"reason\":\"missing\"}\n", {
    server: 'CouchDB/1.5.0 (Erlang OTP/R16B)',
    date: 'Sun, 13 Apr 2014 20:53:31 GMT',
    'content-type': 'application/json',
    'content-length': '41',
    'cache-control': 'must-revalidate'
  });

  nock('https://fullfatdb.npmjs.com:443:443')
  .get('/registry/foo')
  .reply(200, "{\"_id\":\"foo\",\"_rev\":\"6-35a7d18975a7cb12511689a0e0484dd1\",\"name\":\"foo\",\"description\":\"A test module with no `main`, `lib`, or `dependencies` specified\",\"dist-tags\":{\"latest\":\"1.0.0\"},\"versions\":{\"1.0.0\":{\"author\":{\"name\":\"AJ ONeal\",\"email\":\"coolaj86@gmail.com\",\"url\":\"http://coolaj86.info\"},\"name\":\"foo\",\"description\":\"A test module with no `main`, `lib`, or `dependencies` specified\",\"version\":\"1.0.0\",\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/coolaj86/node-pakman.git\"},\"engines\":{\"node\":\">= v0.2\"},\"_npmUser\":{\"name\":\"coolaj86\",\"email\":\"coolaj86@gmail.com\"},\"_id\":\"foo@1.0.0\",\"dependencies\":{},\"devDependencies\":{},\"_engineSupported\":true,\"_npmVersion\":\"1.0.101\",\"_nodeVersion\":\"v0.4.8\",\"_defaultsLoaded\":true,\"dist\":{\"shasum\":\"943e0ec03df00ebeb6273a5b94b916ba54b47581\",\"tarball\":\"https://fullfatdb.npmjs.com/registry/foo/foo-1.0.0.tgz\"},\"maintainers\":[{\"name\":\"coolaj86\",\"email\":\"coolaj86@gmail.com\"}]}},\"maintainers\":[{\"name\":\"coolaj86\",\"email\":\"coolaj86@gmail.com\"}],\"time\":{\"modified\":\"2011-10-21T23:45:45.878Z\",\"created\":\"2011-10-21T23:45:45.286Z\",\"1.0.0\":\"2011-10-21T23:45:45.878Z\"},\"author\":{\"name\":\"AJ ONeal\",\"email\":\"coolaj86@gmail.com\",\"url\":\"http://coolaj86.info\"},\"repository\":{\"type\":\"git\",\"url\":\"git://github.com/coolaj86/node-pakman.git\"},\"readme\":\"\",\"readmeFilename\":\"\",\"_attachments\":{\"foo-1.0.0.tgz\":{\"content_type\":\"application/octet-stream\",\"revpos\":0,\"digest\":\"md5-rCIIP5gNDQfPo8zX593pgQ==\",\"length\":10240,\"stub\":true}}}\n", { server: 'CouchDB/1.5.0 (Erlang OTP/R16B)',
         etag: '"6-35a7d18975a7cb12511689a0e0484dd1"',
         date: 'Sun, 13 Apr 2014 21:52:19 GMT',
         'content-type': 'application/json',
         'content-length': '1453',
         'cache-control': 'must-revalidate' });
};
