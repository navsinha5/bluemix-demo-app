const Cloudant = require('@cloudant/cloudant');
const dbName = require('../config/cloudant');
const cfenv = require('cfenv');
let vcapLocal, cloudant, db;

// load local VCAP configuration  and service credentials
try {
  vcapLocal = require('../config/vcap-local.json');
  console.log("Loaded local VCAP", vcapLocal);
} catch (e) { 
  console.log(e);
}

const appEnvOpts = vcapLocal ? { vcap: vcapLocal} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

// Load the Cloudant library.
if (appEnv.services['cloudantNoSQLDB'] || appEnv.getService(/cloudant/)) {

  // Initialize database with credentials
  if (appEnv.services['cloudantNoSQLDB']) {
    // CF service named 'cloudantNoSQLDB'
    cloudant = Cloudant(appEnv.services['cloudantNoSQLDB'][0].credentials);
  } else {
     // user-provided service with 'cloudant' in its name
     cloudant = Cloudant(appEnv.getService(/cloudant/).credentials);
  }
} else if (process.env.CLOUDANT_URL){
  cloudant = Cloudant(process.env.CLOUDANT_URL);
}
if(cloudant) {
  // Create a new "mydb" database.
  cloudant.db.create(dbName, function(err, data) {
    if(!err) //err if database doesn't already exists
      console.log("Created database: " + dbName);
  });

  // Specify the database we are going to use (mydb)...
  db = cloudant.db.use(dbName);
}

module.exports = db;