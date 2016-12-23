var os = require("os");
var path = require("path");
var fs = require("fs");
var exec = require("child_process").exec;
var async = require("async");
var iconv = require('iconv-lite');

var platform = os.platform();
var syshost = {
  path: '',
  cmd: ''
};

if (platform.match(/^win/i)) {
  syshost.path = path.join((process.env.SystemRoot || "C:"), "System32", "drivers", "etc", "hosts");
  syshost.cmd = "ipconfig /flushdns";
}
else if (platform.match(/darwin/i)) {
  syshost.path = "/etc/hosts";
  var version = parseInt(os.release());
  if (version >= 11) {
    var filename = "mDNSResponder";

    if (version >= 14) {
      filename = "discoveryd";
    }

    syshost.cmd = [
      "sudo launchctl unload -w /System/Library/LaunchDaemons/com.apple." + filename + ".plist",
      "sudo launchctl load -w /System/Library/LaunchDaemons/com.apple." + filename + ".plist"
    ];
  }
  else {
    syshost.cmd = "sudo dscacheutil -flushcache";
  }
}
else {
  syshost.path = "/etc/hosts";

  var nscd0 = "/etc/rc.d/init.d/nscd";
  var nscd1 = "/etc/init.d/nscd";
  if (fs.existsSync(nscd1)) {
    syshost.cmd = "sudo " + nscd1 + " restart";
  }
  else if (fs.existsSync(nscd0)) {
    syshost.cmd = "sudo " + nscd0 + " restart";
  }
  else {
    syshost.cmd = "sudo service nscd restart";
  }
}

const d = stdstr =>  iconv.decode(stdstr, "CP936")

//iconv.decode encoding的对象一定需要是buffer, binary新版本不适用
const execCmd = function (cb) {
  const cmd = syshost.cmd, cfg = { encoding: 'buffer' }
  const extendscb = (error, stdout, stderr) => {
    if (error) {
      error = d(error)
      alert(`exec error: ${error}`);
      return;
    }
    [stdout, stderr] = [d(stdout), d(stderr)]
    cb && cb(stdout, stderr);
    console.log(error, stdout, stderr, 'exec console')
    // process.exit();
  }
  if (typeof cmd == "string") {
    exec(cmd, cfg, extendscb);
  }
  else if (util.isArray(cmd) && cmd.length == 2) {
    exec(cmd[0], cfg, function () {
      exec(cmd[1], cfg, extendscb);
    });
  }
  else {
    console.log("Unknown Command!");
  }
}
export default execCmd;
