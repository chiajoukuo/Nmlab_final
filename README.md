# Nmlab_final

### How to use
```
$ cd Nmlab_final
$ npm install
Replace line 44 in ./node_modules/react-dev-utils/ModuleScopePlugin.js with "return true" to enable js file access to outside of /src
open ganache GUI
$ ganache-cli -p 8545
open another terminal and run 
$ truffle compile
$ truffle migrate
$ npm start (you can modify /src/index.js line 11 to run simple test)
```

Then go to http://localhost:3001

