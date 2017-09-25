/*
	Process execution of DigitalOcean API.
 */

const request = require('request-promise-native');

function DGApi (accessToken) {
	this.baseOptions = {
		headers: {
			'Authorization': 'Bearer ' + accessToken
		}
	};
}

/**
 * Make a request to get list of all droplets.
 * @return {Object} Promise object
 */
DGApi.prototype.getListOfAllDroplets = function() {
	var options = util.reqOptions('https://api.digitalocean.com/v2/droplets', this.baseOptions);
	return util.promiseObjectWithOptions(options);
};

/**
 * Make a request to get list of snapshots for specified droplet id.
 * @param  {String} droletId Droplet id
 * @return {Object}          Promise object
 */
DGApi.prototype.getListOfSnapshotsForDropletId = function(dropletId) {
	var options = util.reqOptions('https://api.digitalocean.com/v2/droplets/' + dropletId + '/snapshots', this.baseOptions);
	return util.promiseObjectWithOptions(options);
};

/**
 * Make a request to delete a snapshot from specified snapshotId.
 * @return {String} Snapshot Id to delete
 * @return {Object} Promise object
 */
DGApi.prototype.deleteSnapshotById = function(snapshotId) {
	var options = util.reqOptions('https://api.digitalocean.com/v2/snapshots/' + snapshotId, 
		this.baseOptions,
		'DELETE'
		);
	return util.promiseObjectWithOptions(options);
};

/**
 * Make a request to snapshot a droplet by specified droplet id.
 * With options { name: ... }; name is to-be-created droplet name.
 * @param  {String} dropletId Droplet Id
 * @param  {Object} options   Options to snapshot a droplet
 * @return {Object}           Promise object
 */
DGApi.prototype.snapshotDroplet = function(dropletId, options=null) {
	var reqOpts = util.reqOptions(
		'https://api.digitalocean.com/v2/droplets/' + dropletId + '/actions', 
		this.baseOptions,
		'POST',
		{ 
			type: 'snapshot',
		}
		);
	return util.promiseObjectWithOptions(reqOpts);
}

var util = {
	/**
	 * Inject url into options object then return it.
	 * Options object is suitable to be working with 'request' npm package.
	 * @param  {String} url     URL to be injected into options object
	 * @param  {Object} baseOptions Base-Options object of request
	 * @return {Object}         Ready to use options object
	 */
	reqOptions: function(url, baseOptions, method='GET', dataObj=null) {
		var retOptions = {
			url: url,
			method: method,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': baseOptions.headers.Authorization
			}
		};

		// copy data
		if (dataObj) {
			// stringify
			retOptions['body'] = JSON.stringify(dataObj);
		}

		return retOptions;
	},

	/**
	 * Return a Promise object from specified url and options.
	 * A returned Promise object is frequent used for DGApi.
	 * @param  {Object} options Options object used in making a request
	 * @return {Object}         Promise object
	 */
	promiseObjectWithOptions: function(options) {
		return new Promise((resolve, reject) => {
			request(options)
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
		});
	}
}

module.exports = DGApi;