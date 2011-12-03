define("ace/mode/python",["require","exports","module","ace/lib/oop","ace/mode/text","ace/tokenizer","ace/mode/python_highlight_rules","ace/mode/folding/python","ace/range"],function(a,b,c){var d=a("../lib/oop"),e=a("./text").Mode,f=a("../tokenizer").Tokenizer,g=a("./python_highlight_rules").PythonHighlightRules,h=a("./folding/python").FoldMode,i=a("../range").Range,j=function(){this.$tokenizer=new f((new g).getRules()),this.foldingRules=new h};d.inherits(j,e),function(){this.toggleCommentLines=function(a,b,c,d){var e=!0,f=/^(\s*)#/;for(var g=c;g<=d;g++)if(!f.test(b.getLine(g))){e=!1;break}if(e){var h=new i(0,0,0,0);for(var g=c;g<=d;g++){var j=b.getLine(g),k=j.match(f);h.start.row=g,h.end.row=g,h.end.column=k[0].length,b.replace(h,k[1])}}else b.indentRows(c,d,"#")},this.getNextLineIndent=function(a,b,c){var d=this.$getIndent(b),e=this.$tokenizer.getLineTokens(b,a),f=e.tokens;if(f.length&&f[f.length-1].type=="comment")return d;if(a=="start"){var g=b.match(/^.*[\{\(\[\:]\s*$/);g&&(d+=c)}return d};var a={pass:1,"return":1,raise:1,"break":1,"continue":1};this.checkOutdent=function(b,c,d){if(d!=="\r\n"&&d!=="\r"&&d!=="\n")return!1;var e=this.$tokenizer.getLineTokens(c.trim(),b).tokens;if(!e)return!1;do var f=e.pop();while(f&&(f.type=="comment"||f.type=="text"&&f.value.match(/^\s+$/)));return f?f.type=="keyword"&&a[f.value]:!1},this.autoOutdent=function(a,b,c){c+=1;var d=this.$getIndent(b.getLine(c)),e=b.getTabString();d.slice(-e.length)==e&&b.remove(new i(c,d.length-e.length,c,d.length))}}.call(j.prototype),b.Mode=j}),define("ace/mode/python_highlight_rules",["require","exports","module","ace/lib/oop","ace/lib/lang","ace/mode/text_highlight_rules"],function(a,b,c){var d=a("../lib/oop"),e=a("../lib/lang"),f=a("./text_highlight_rules").TextHighlightRules,g=function(){var a=e.arrayToMap("and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield".split("|")),b=e.arrayToMap("True|False|None|NotImplemented|Ellipsis|__debug__".split("|")),c=e.arrayToMap("abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern".split("|")),d=e.arrayToMap("".split("|")),f="(?:r|u|ur|R|U|UR|Ur|uR)?",g="(?:(?:[1-9]\\d*)|(?:0))",h="(?:0[oO]?[0-7]+)",i="(?:0[xX][\\dA-Fa-f]+)",j="(?:0[bB][01]+)",k="(?:"+g+"|"+h+"|"+i+"|"+j+")",l="(?:[eE][+-]?\\d+)",m="(?:\\.\\d+)",n="(?:\\d+)",o="(?:(?:"+n+"?"+m+")|(?:"+n+"\\.))",p="(?:(?:"+o+"|"+n+")"+l+")",q="(?:"+p+"|"+o+")";this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:f+'"{3}(?:[^\\\\]|\\\\.)*?"{3}'},{token:"string",merge:!0,regex:f+'"{3}.*$',next:"qqstring"},{token:"string",regex:f+'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:f+"'{3}(?:[^\\\\]|\\\\.)*?'{3}"},{token:"string",merge:!0,regex:f+"'{3}.*$",next:"qstring"},{token:"string",regex:f+"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:"(?:"+q+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:q},{token:"constant.numeric",regex:k+"[lL]\\b"},{token:"constant.numeric",regex:k+"\\b"},{token:function(e){return a.hasOwnProperty(e)?"keyword":b.hasOwnProperty(e)?"constant.language":d.hasOwnProperty(e)?"invalid.illegal":c.hasOwnProperty(e)?"support.function":e=="debugger"?"invalid.deprecated":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"lparen.paren",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:[^\\\\]|\\\\.)*?"{3}',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?'{3}",next:"start"},{token:"string",merge:!0,regex:".+"}]}};d.inherits(g,f),b.PythonHighlightRules=g}),define("ace/mode/folding/python",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode"],function(a,b,c){var d=a("../../lib/oop"),e=a("./fold_mode").FoldMode,f=b.FoldMode=function(){};d.inherits(f,e),function(){this.foldingStartMarker=/\:(:?\s*)?(:?#.*)?$/,this.getFoldWidgetRange=e.prototype.indentationBlock}.call(f.prototype)}),define("ace/mode/folding/fold_mode",["require","exports","module","ace/range"],function(a,b,c){var d=a("../../range").Range,e=b.FoldMode=function(){};((function(){this.FOO=12,this.foldingStartMarker=null,this.foldingStopMarker=null,this.getFoldWidget=function(a,b){return this.foldingStartMarker?this.foldingStopMarker?(e.prototype.getFoldWidget=this.$testBoth,this.$testBoth(a,b)):(e.prototype.getFoldWidget=this.$testStart,this.$testStart(a,b)):""},this.getFoldWidgetRange=function(a,b){return null},this.indentationBlock=function(a,b){var c=/^\s*/,e=b,f=b,g=a.getLine(b),h=g.length-1,i=g.match(c)[0].length;while(g=a.getLine(++b)){var j=g.match(c)[0].length;if(j==g.length)continue;if(j<=i)break;f=b}if(f>e){var k=a.getLine(f).length;return new d(e,h,f,k)}},this.$testStart=function(a,b){return this.foldingStartMarker.test(a.getLine(b))?"start":""},this.$testBoth=function(a,b){var c=a.getLine(b);return this.foldingStartMarker.test(c)?"start":this.foldingStopMarker.test(c)?"end":""}})).call(e.prototype)})