/**
 * Created by lkk on 15-10-18.
 */
/**
 * Created by Sam on 2015/10/5 0005.
 */
var moment = require('moment');

module.exports = {
    log: console.log,
    error: console.error,
    logH: logH,
    errorH: errorH
};

function logBase(tag, msg) {
    console.log('[%s %s] : %s', tag, getServerTime(), msg);
}

function logH(msg) {
    logBase('LOG', msg);
}

function errorH(msg) {
    logBase('ERROR', msg);
}

function getServerTime() {
    var serverTime = moment().format("YYYY-MM-DD hh:mm:ss");
    return serverTime;
}