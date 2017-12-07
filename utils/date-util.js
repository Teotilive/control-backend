const moment = require('moment');
const FORMAT = 'YYYY-MM-DD HH:mm:ss';
function currentDateBD() {
	return moment().format(FORMAT);
}

module.exports = {currentDateBD};