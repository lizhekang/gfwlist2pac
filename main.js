/**
 * Created by lkk on 15-10-18.
 */
var schedule = require('node-schedule'),
    logHelper = require('./logHelper'),
    cmd_python_version = 'python -V';

require('shelljs/global');

function jobHandler() {
    var version = exec(cmd_python_version, {silent: true}).output,
        reg = /Python 2.\w+/;

    //检查python版本
    if(reg.test(version)) {
        //进入目录
        cd('function_module');
        //执行命令
        exec('python gfwlist2pac.py',
            {silent: true},
            function(code, output) {
                logHelper.logH('Exitcode:', code);
                logHelper.logH('\n' + output);
        });
    }else {
        logHelper.logH('Error: not support python version %s', version);
    }
}

(function main() {
    var rule = new schedule.RecurrenceRule();

    //每小时30分时执行
    rule.minute = 30;

    var job = schedule.scheduleJob(rule, jobHandler());

    process.on('SIGINT', function() {
        logHelper.logH("Caught interrupt signal");
        job.cancel();
        process.exit();
    });
})();
