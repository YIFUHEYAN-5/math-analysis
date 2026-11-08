/* prepare.js —— 内容预处理：抽取数学公式、KaTeX 宏定义（浏览器与 Node 校验脚本共用） */
(function (root) {
  'use strict';
  var MA = root.MA = root.MA || {};

  MA.MATH_OPEN = '\uE000';
  MA.MATH_CLOSE = '\uE001';

  // 全站通用的 KaTeX 宏
  MA.katexMacros = {
    '\\R': '\\mathbb{R}',
    '\\N': '\\mathbb{N}',
    '\\Np': '\\mathbb{N}^{+}',
    '\\Z': '\\mathbb{Z}',
    '\\Q': '\\mathbb{Q}',
    '\\C': '\\mathbb{C}',
    '\\eps': '\\varepsilon',
    '\\sgn': '\\operatorname{sgn}',
    '\\arccot': '\\operatorname{arccot}',
    '\\arsinh': '\\operatorname{arsinh}',
    '\\arcosh': '\\operatorname{arcosh}',
    '\\artanh': '\\operatorname{artanh}',
    '\\sh': '\\operatorname{sh}',
    '\\ch': '\\operatorname{ch}',
    '\\card': '\\operatorname{card}',
    '\\abs': '\\left|#1\\right|',
    '\\dd': '\\mathrm{d}'
  };

  /**
   * 把源串中的 $...$（行内）与 $$...$$（行间）替换为占位符，返回 { html, maths }。
   * 公式在 HTML 解析之前被取出，因此公式里可以放心写 < 、> 、& 等字符。
   * 写 \$ 表示字面量美元符号。
   */
  MA.extractMath = function (src) {
    var maths = [];
    var out = '';
    var i = 0, n = src.length;
    while (i < n) {
      var c = src.charAt(i);
      if (c === '\\' && src.charAt(i + 1) === '$') { out += '\uE002'; i += 2; continue; }
      if (c === '$') {
        var display = src.charAt(i + 1) === '$';
        var start = i + (display ? 2 : 1);
        var j = start;
        while (j < n) {
          var d = src.charAt(j);
          if (d === '\\') { j += 2; continue; }
          if (d === '$') {
            if (!display) break;
            if (src.charAt(j + 1) === '$') break;
          }
          j++;
        }
        if (j >= n) {
          throw new Error('公式未闭合：' + src.slice(Math.max(0, i - 30), i + 50));
        }
        maths.push({ tex: src.slice(start, j), display: display });
        out += '\uE000' + (maths.length - 1) + '\uE001';
        i = j + (display ? 2 : 1);
        continue;
      }
      out += c;
      i++;
    }
    return { html: out.replace(/\uE002/g, '$'), maths: maths };
  };

  // 把 TeX 粗略转成可读文本（用于搜索索引与摘要）
  var TEXT_MAP = [
    [/\\varepsilon|\\eps\b|\\epsilon/g, 'ε'], [/\\delta/g, 'δ'], [/\\alpha/g, 'α'], [/\\beta/g, 'β'],
    [/\\gamma/g, 'γ'], [/\\lambda/g, 'λ'], [/\\xi/g, 'ξ'], [/\\eta/g, 'η'], [/\\theta/g, 'θ'],
    [/\\varphi|\\phi/g, 'φ'], [/\\psi/g, 'ψ'], [/\\pi/g, 'π'], [/\\mu/g, 'μ'], [/\\sigma/g, 'σ'],
    [/\\omega/g, 'ω'], [/\\Omega/g, 'Ω'], [/\\Delta/g, 'Δ'], [/\\triangle/g, '△'],
    [/\\infty/g, '∞'], [/\\in\b/g, '∈'], [/\\notin/g, '∉'], [/\\subseteq|\\subset/g, '⊂'],
    [/\\supseteq|\\supset/g, '⊃'], [/\\cup|\\bigcup/g, '∪'], [/\\cap|\\bigcap/g, '∩'],
    [/\\emptyset|\\varnothing/g, '∅'], [/\\forall/g, '∀'], [/\\exists/g, '∃'],
    [/\\Rightarrow|\\implies/g, '⇒'], [/\\Leftrightarrow|\\iff/g, '⇔'], [/\\to\b|\\rightarrow/g, '→'],
    [/\\leqslant|\\leq|\\le\b/g, '≤'], [/\\geqslant|\\geq|\\ge\b/g, '≥'], [/\\neq|\\ne\b/g, '≠'],
    [/\\approx/g, '≈'], [/\\cdots|\\ldots|\\dots/g, '…'], [/\\cdot/g, '·'], [/\\times/g, '×'],
    [/\\sqrt/g, '√'], [/\\pm/g, '±'], [/\\lt\b/g, '<'], [/\\gt\b/g, '>'],
    [/\\mathbb\{R\}|\\R\b/g, 'R'], [/\\mathbb\{N\}\^\{?\+\}?|\\Np\b/g, 'N+'], [/\\mathbb\{N\}|\\N\b/g, 'N'],
    [/\\mathbb\{Z\}|\\Z\b/g, 'Z'], [/\\mathbb\{Q\}|\\Q\b/g, 'Q'],
    [/\\left|\\right|\\big|\\Big|\\bigg|\\displaystyle|\\limits|\\quad|\\qquad/g, ' '],
    [/\\(lim|sup|inf|max|min|sin|cos|tan|cot|ln|log|exp|arcsin|arccos|arctan|sinh|cosh|tanh|sgn)\b/g, '$1'],
    [/\\[{}]/g, ''], [/\\[a-zA-Z]+/g, ' '], [/[{}]/g, ''], [/\\\\/g, ' '], [/[_^]/g, ''], [/~/g, ' ']
  ];
  MA.texToText = function (tex) {
    var s = tex;
    for (var k = 0; k < TEXT_MAP.length; k++) s = s.replace(TEXT_MAP[k][0], TEXT_MAP[k][1]);
    return s.replace(/\s+/g, ' ').trim();
  };

  // 把含占位符的字符串还原为可读文本
  MA.untoken = function (str, maths) {
    return String(str).replace(/\uE000(\d+)\uE001/g, function (_, k) {
      var m = maths[+k];
      return m ? ' ' + MA.texToText(m.tex) + ' ' : '';
    });
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = MA;
})(typeof window !== 'undefined' ? window : globalThis);
