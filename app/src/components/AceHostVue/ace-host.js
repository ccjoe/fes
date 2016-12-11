ace.define('ace/mode/host_highlight_rules',
  ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text_highlight_rules'],
  function (acequire, exports, module) {
    var oop = acequire('../lib/oop')
    var TextHighlightRules = acequire('./text_highlight_rules').TextHighlightRules

    var HostHighlightRules = function () {
      this.$rules = {
        'start': [ {
          token: 'comment.number-sign',
          regex: '#.*$'
        }, {
          token: 'entity.name',
          regex: '#==== (.*)'
        }, {
          token: 'string',           // string
          regex: '".*?"'
        }, {
          token: 'keyword.control',  // ip
          regex: /(([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(\.([01]?[0-9]{1,2}|2[0-4][0-9]|25[0-5])){3}|([0-9a-fA-F]{1,4}:)+:?([0-9a-fA-F]{1,4}:)*[0-9a-fA-F]{1,4})(\s)+/
        }, {
          token: 'invalid.illegal',  // 必须要有空格
          regex: /.*^[^\s]+/
        }, {
          token: 'invalid.illegal',  // 必须要有空格
          regex: /^[^\s]/},
          {
            token: 'constant.other',     // host
            regex: /[\w+\.]+/
          }, {
            token: 'constant.numeric', // float
            regex: /[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b/
          } ]
      }
    }

    oop.inherits(HostHighlightRules, TextHighlightRules)
    exports.HostHighlightRules = HostHighlightRules
  })

ace.define('ace/mode/folding/cstyle',
  ['require', 'exports', 'module', 'ace/lib/oop', 'ace/range', 'ace/mode/folding/fold_mode'],
  function (acequire, exports, module) {
    var oop = acequire('../../lib/oop')
    var Range = acequire('../../range').Range
    var BaseFoldMode = acequire('./fold_mode').FoldMode

    var FoldMode = exports.FoldMode = function (commentRegex) {
      if (commentRegex) {
        this.foldingStartMarker = new RegExp(
                this.foldingStartMarker.source.replace(/\|[^|]*?$/, '|' + commentRegex.start)
            )
        this.foldingStopMarker = new RegExp(
                this.foldingStopMarker.source.replace(/\|[^|]*?$/, '|' + commentRegex.end)
            )
      }
    }
    oop.inherits(FoldMode, BaseFoldMode);

    (function () {
      this.foldingStartMarker = /^#====\s.+[\s\S]*/
      this.foldingStopMarker = /#====$/

      this.getFoldWidgetRange = function (session, foldStyle, row) {
        var line = session.getLine(row)
        var match = line.match(this.foldingStartMarker)
        if (match) {
          var i = match.index
          if (match[1])
            return this.openingBracketBlock(session, match[1], row, i)
          return session.getCommentFoldRange(row, i + match[0].length, 1)
        }

        var match = line.match(this.foldingStopMarker)
        if (match) {
          var i = match.index + match[0].length
          if (match[1])
            return this.closingBracketBlock(session, match[1], row, i)
          return session.getCommentFoldRange(row, i, -1)
        }
      }
    }).call(FoldMode.prototype)
  })

ace.define('ace/mode/host',
  ['require', 'exports', 'module', 'ace/lib/oop', 'ace/mode/text', 'ace/tokenizer', 'ace/mode/host_highlight_rules', 'ace/mode/folding/cstyle'],
  function (acequire, exports, module) {
    'use strict'
    var oop = acequire('../lib/oop')
    var TextMode = acequire('./text').Mode
    var Tokenizer = acequire('../tokenizer').Tokenizer
    var HostHighlightRules = acequire('./host_highlight_rules').HostHighlightRules
    var FoldMode = acequire('./folding/cstyle').FoldMode

    var Mode = function () {
      var highlighter = new HostHighlightRules()
      this.foldingRules = new FoldMode()
      this.$tokenizer = new Tokenizer(highlighter.getRules())
      this.$keywordList = highlighter.$keywordList
    }
    oop.inherits(Mode, TextMode);

    (function () {
      this.lineCommentStart = '#'
    }).call(Mode.prototype)

    exports.Mode = Mode
  })
