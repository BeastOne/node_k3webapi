Kingdee K3 Cloud Web API
===========================

The Kingdee K3 web api library exported as Node.js modules.

Installation
===========================

###Using npm:

```Bash
$ npm i -g kingdee-k3-webapi
$ npm i --save kingdee-k3-webapi
```

###In Node.js:

```Javascript
var K3CloudApiClient = require('kingdee-k3-webapi');

var client = new K3CloudApiClient('http://your.k3.site');

client.getDataCenter()
  .then((data) => {
    console.log(data);
  });

// Log on to Kingdee K3 Cloud using a 3rd party app account.
client.login('dbId', 'user', 'appId', 'appSecret', lang)
  .then((data) => {
    console.log('Log on to K3 Cloud success.');
      
    if (data.LoginResultType == 1) {
      client.view('BD_MATERIAL', {
        // CreateOrgId: 1,
        Number: '01.01.01.001'
        // Id: ''
      })
        .then((data) => {
          console.log(data);

          client.view('ORG_Organizations', {
            Id: data.Result.Result.CreateOrgId_Id
          })
            .then((data) => {
              console.log(data);
            })
            .catch((err) => {
              console.log('view material error:' + err.message);
            });
        })
        .catch((err) => {
          console.log('view material error:' + err.message);
        });
    }
  })
  .catch((err) => {
    console.log('Log on to K3 Cloud failed.');
    console.log(err.message);
  });
```

See the [package source](https://github.com/BeastOne/node_k3webapi)  for more details.