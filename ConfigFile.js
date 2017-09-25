/**
 * Provide processed config content as read from config.json (configuration) file.
 */

const fs = require('fs');

function ConfigFile (configFilePath) {
	this.configFilePath = configFilePath;
	this.dropletIds = null;
	this.holdSnapshots = null;
}

ConfigFile.prototype.read = function() {
	// read config file for droplet's ids
	try {
		var data = fs.readFileSync(this.configFilePath);
		var configObj = JSON.parse(data.toString());

		// check droplet ids
		if(configObj.droplet_ids && configObj.droplet_ids.length > 0) {
			// save droplet ids
			this.dropletIds = configObj.droplet_ids;
		}
		// check hold snapshots
		if (configObj.hold_snapshots) {
			this.holdSnapshots = configObj.hold_snapshots;
		}
		else {
			this.holdSnapshots = 3;	// if not, default to 3
		}
	} catch(e) {
		throw e;
	}
};

module.exports = ConfigFile;