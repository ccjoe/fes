/**
 * @author icareu.joe@gmail.com
 * host comments
 * # row comments
 * #==== Host Group comments [mutil-row] ====# group host block
 * #=HIDE-ALL-OF-BELOW [mutil-row] ====#  host block do not manage
 */
const fs = require('fs')
const once = require('once')
const split = require('split')
const through = require('through')
const _ = require('lodash')

const WINDOWS = process.platform === 'win32'
const EOL = WINDOWS ? '\r\n' : '\n'
const HOSTS = '/Users/shaofengliu/Desktop/hosts' || (WINDOWS ? 'C:/Windows/System32/drivers/etc/hosts' : '/etc/hosts')

/**
 * get hostfile|path text sync
 * @param  {string}   path
 */
const loadHost = function (path) {
  return fs.readFileSync(path ? path : HOSTS, { encoding: 'utf8' })
}


/**
 * Write out an array of lines to the host file. Assumes that they're in the
 * format that `get` returns.
 *
 * @param  {Array.<string|Array.<string>>} lines
 * @param  {function(Error)=} cb
 */
const saveHost = function (lines, cb) {
  const isstr = typeof lines === 'string'
  if(!isstr){
    lines = lines.map(function (line, lineNum) {
      return line + (lineNum === lines.length - 1 ? '' : EOL)
    })
  }
  if (typeof cb !== 'function') {
    var stat = fs.statSync(HOSTS)
    fs.writeFileSync(HOSTS, isstr?lines:lines.join(''), { mode: stat.mode })
    return true
  }

  cb = once(cb)
  fs.stat(HOSTS, function (err, stat) {
    if (err) {
      return cb(err)
    }
    var s = fs.createWriteStream(HOSTS, { mode: stat.mode })
    s.on('close', cb)
    s.on('error', cb)

    lines.forEach(function (data) {
      s.write(data)
    })
    s.end()
  })
}

/**
 * Get a list of the lines that make up the path. If the
 * `comments` parameter is true, then include comments, blank lines
 * and other non-host entries in the result.
 *
 * @param  {String}   path
 * @param  {boolean}   commentsHost => lines include commented host
 * @param  {boolean}   commentsText => lines include commented
 * @param  {function(err, lines)=} cb async
 * @return {lines, texts} sync
 * @example return: {
    lines: ['text', {ip:x, host:x, index:0, switcher:true}, .....],
    texts: 'file content',
    originLines:'origin Line text Content'
 } */
const fileByLine = function (path, commentsHost, commentsText, cb) {
  var lines = [], originLines=[], texts = ''
  if (typeof cb !== 'function') {
    texts = loadHost(path)
    texts.split(/\r?\n/).forEach(online)
    return {lines, texts, originLines}
  }
  cb = once(cb)
  fs.createReadStream(path, { encoding: 'utf8' })
    .pipe(split())
    .pipe(through(online))
    .on('close', function () {
      cb(null, lines)
    })
    .on('error', cb)

  function getHostObject(index, ip,  host, switcher){
    return {index, ip,  host, switcher}
  }

  function online (line, index) {
    originLines.push(line);

    var pline = {}, matches, ip, host, switcher
    var lineSansComments = line.replace(/#.*/, '')
    matches = /^\s*?(.+?)\s+(.+?)$/.exec(lineSansComments)
    if (matches && matches.length === 3) {   // Found a hosts entry
      pline = getHostObject(index, matches[1], matches[2], true)
    } else {
      if (commentsHost) {
        var cipsexp = /(([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(\.([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){3}|([0-9a-fA-F]{1,4}:)+:?([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4})\s+([\S+\.]+)/
        matches = cipsexp.exec(line)
        if (matches) {                      // Found a hosts entry with comments
          pline = getHostObject(index, matches[1], matches[7], false)
        } else if (commentsText) {
          pline = line
        } else {
          pline = null
        }
      }
    }
    if (pline !== null) {
      lines.push(pline)
    }
  }
}

const get = function (commentsHost, commentsText, cb) {
  return fileByLine(HOSTS, commentsHost, commentsText, cb)
}

/**
 * 查找markA - markB间的内容
 */
const lineByMark = function (lines, markA, markB) {
  var indexes = [], status;
  if(!markB)  markB = markA;
  var cma = markA, cmb = markB;
  lines.forEach((line, index) => {
    if (_.startsWith(_.trim(line), markA)) {
      indexes.push(index)
      status = !status
      markA = status ? cmb : cma;
    }
  })
  return indexes;
}

/**
 * 获取不受管理的模块
 */
const hostBanMng = function (lines) {
  return lineByMark(lines, '#==== HIDE_ALL_OF_INNER', '#====');
}

/**
 * Get Host By Domain
 * @param  {Object}   lines
 * @return {Object}  {domain: [hostArray]}
 */
const hostByDomain = function (lines) {
  var banIndexes = hostBanMng(lines)
  var group = _.groupBy(lines, line => {
    if(!(banIndexes && banIndexes.length && line.index<=banIndexes[1] && line.index >= banIndexes[0])){
      return line.host
    }
  })
  for(var k in group){
    let selected = _.findLast(group[k], item => item.switcher)
    group[k]['selected'] = selected && selected.ip;
  }
  delete group.undefined
  return group
}

/**
 * Get Host By Group
 * @param  {Object}   lines
 * @return {Object} {name:groupName, list:hostArray, section:[group index section]}
 * @example how to group host
 * #==== groupName
 * 1.1.1.1 host.com
 * 1.1.1.2 host2.com
 * #====
 */
const hostByGroup = function (lines) {
  var groups = [], list, name, switcher, startLine, mark = '#===='
  var groupsIndex = lineByMark(lines, mark);
  var departGroup = _.chunk(groupsIndex, 2).forEach((section, index) => {
    startLine = lines[section[0]]; section[0]++;
    name = _.trim(startLine.replace(mark, ''))
    list = _.slice(lines, section[0], section[1])
    
    switcher = true; _.find(list, function (item) {
      if (item.host && item.ip && !item.switcher) switcher = false
    })
    //remove group host list is not object item{ip:,host:,index:}, is comments or blank
    _.remove(list, function(item) {
      return typeof item === 'string';
    });
    if(!_.startsWith(_.trimStart(name), 'HIDE_ALL_OF_INNER')){
      groups.push({name, list, section, switcher})
    }
  })
  return groups
}


/**
 * toggle host by host
 */
const toggleHost = function (host, originLines, cb) {
  var originText = _.trimStart(originLines[host.index]),
      hasComment = _.startsWith(originText, '#')
  if((hasComment && !host.switcher) || !hasComment && host.switcher) return;

  originLines[host.index] = originText.replace(/(^#)?([\S+\.]+)/, function(str, match, word){
   return match==='#' ? word : '#'+str
  })
  saveHost(originLines, cb)
}

/**
 * toggle Host By Hosts/Group
 */
const toggleHosts = function (hosts, originLines, cb) {
  hosts.forEach((host) => toggleHost(host, originLines))
  saveHost(originLines, cb)
}


const getGroup = function () {

}

const getDomain = function () {

}

/**
 * Add a rule to /etc/hosts. If the rule already exists, then this does nothing.
 * @param  {string}   ip
 * @param  {string}   host
 * @param  {function(Error)=} cb
 */
const set = function (ip, host, cb) {
  var didUpdate = false
  if (typeof cb !== 'function') {
    return _set(get(true))
  }

  get(true, function (err, lines) {
    if (err) return cb(err)
    _set(lines)
  })

  function _set (lines) {
    // Try to update entry, if host already exists in file
    lines = lines.map(mapFunc)

    // If entry did not exist, let's add it
    if (!didUpdate) {
      // If the last line is empty, or just whitespace, then insert the new entry
      // right before it
      var lastLine = lines[lines.length - 1]
      if (typeof lastLine === 'string' && /\s*/.test(lastLine)) {
        lines.splice(lines.length - 1, 0, [ip, host])
      } else {
        lines.push([ip, host])
      }
    }

    writeFile(lines, cb)
  }

  function mapFunc (line) {
    if (Array.isArray(line) && line[1] === host) {
      line[0] = ip
      didUpdate = true
    }
    return line
  }
}

/**
 * Remove a rule from /etc/hosts. If the rule does not exist, then this does
 * nothing.
 *
 * @param  {string}   ip
 * @param  {string}   host
 * @param  {function(Error)=} cb
 */
const remove = function (ip, host, cb) {
  if (typeof cb !== 'function') {
    return _remove(get(true))
  }

  get(true, function (err, lines) {
    if (err) return cb(err)
    _remove(lines)
  })

  function _remove (lines) {
    // Try to remove entry, if it exists
    lines = lines.filter(filterFunc)
    return writeFile(lines, cb)
  }

  function filterFunc (line) {
    return !(Array.isArray(line) && line[0] === ip && line[1] === host)
  }
}

export default {
  HOSTS,
  loadHost,
  saveHost,
  toggleHost,
  toggleHosts,
  get,
  set,
  hostByGroup,
  hostByDomain,
  fileByLine
}
