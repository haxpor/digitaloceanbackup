/**
 * Provide synchronize looping of task that is based on Promise call.
 * It will wait for each asynchronized task to be complete before another one will
 * execute, thus gives a feelilng of sycnrhonized for overall tasks to be complete.
 */

/**
 * Main execution for synchronized looping of Promise-tasks.
 * @param  {Number}    n    Number of loop
 * @param  {Function}  fn   Function to be executed. Its signature is fn(index, ...args) in which index is current index in looping, and ...args is arbitrary as per function needs for its parameters
 * @param  {...Any} args Arguments to be supplied to fn
 * @return {Object}         Promise object
 */
var main = function(n, fn, ...args) {
	var index = 0;

	return new Promise((resolve, reject) => {
		function next() {
			if (index < n) {
				fn(index++, ...args)
					.then(() => {
						next();
					})
					.catch((err) => {
						reject(err);
					});
			}
			else {
				resolve();
			}
		}

		next();
	});
};

module.exports = main;