var segmenter = new TinySegmenter();  // インスタンス生成

var tokenizer = function (obj) {
    if (!arguments.length || obj == null || obj == undefined) return []
    if (Array.isArray(obj)) return obj.map(function (t) { return t.toLowerCase() })

    var str = obj.toString().replace(/^\s+/, '')

    for (var i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
            str = str.substring(0, i + 1)
            break
        }
    }
                 
    var segs = segmenter.segment(str);  // 単語の配列が返る
    return segs.filter(function (token) {
        return !!token
      })
      .map(function (token) {
        return token
      })
};

