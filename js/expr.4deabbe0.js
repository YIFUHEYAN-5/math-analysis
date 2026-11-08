/* expr.js —— 安全的数学表达式解析器（不使用 eval）
 * 用途：答案核对（如 "3/2"、"sqrt(2)/2"、"e^2"、"√3"）、函数作图（如 "x^2 sin(1/x)"、"[x]"、"|x|"）。
 * 支持：+ - * / ^ !、隐式乘法(2x, 2(x+1), x sin x)、|x|、[x]（取整）、√、函数与常数 pi π e ∞
 */
(function (root) {
  'use strict';
  var MA = root.MA = root.MA || {};

  function factorial(x) {
    if (x < 0) return NaN;
    if (Math.floor(x) === x) {
      if (x > 170) return Infinity;
      var r = 1;
      for (var i = 2; i <= x; i++) r *= i;
      return r;
    }
    return gamma(x + 1);
  }
  // Lanczos 近似
  function gamma(z) {
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    var g = 7;
    var c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313,
      -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    z -= 1;
    var x = c[0];
    for (var i = 1; i < g + 2; i++) x += c[i] / (z + i);
    var t = z + g + 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
  }

  var FUNCS = {
    sin: Math.sin, cos: Math.cos, tan: Math.tan,
    cot: function (x) { return 1 / Math.tan(x); },
    sec: function (x) { return 1 / Math.cos(x); },
    csc: function (x) { return 1 / Math.sin(x); },
    arcsin: Math.asin, arccos: Math.acos, arctan: Math.atan,
    asin: Math.asin, acos: Math.acos, atan: Math.atan,
    arccot: function (x) { return Math.PI / 2 - Math.atan(x); },
    sinh: Math.sinh, cosh: Math.cosh, tanh: Math.tanh,
    sh: Math.sinh, ch: Math.cosh, th: Math.tanh,
    arsinh: Math.asinh, arcosh: Math.acosh, artanh: Math.atanh,
    asinh: Math.asinh, acosh: Math.acosh, atanh: Math.atanh,
    exp: Math.exp, ln: Math.log, log: Math.log, lg: Math.log10, log2: Math.log2,
    sqrt: Math.sqrt, cbrt: Math.cbrt, abs: Math.abs,
    floor: Math.floor, ceil: Math.ceil, round: Math.round,
    sgn: function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; },
    sign: function (x) { return x > 0 ? 1 : x < 0 ? -1 : 0; },
    frac: function (x) { return x - Math.floor(x); },
    fact: factorial, gamma: gamma
  };
  var CONSTS = { pi: Math.PI, 'π': Math.PI, e: Math.E, inf: Infinity, '∞': Infinity, oo: Infinity };

  function normalize(src) {
    return String(src)
      .replace(/[−–—]/g, '-').replace(/[×·∙]/g, '*').replace(/÷/g, '/')
      .replace(/（/g, '(').replace(/）/g, ')').replace(/［/g, '[').replace(/］/g, ']')
      .replace(/，/g, ',').replace(/＋/g, '+').replace(/＝/g, '=')
      .replace(/\*\*/g, '^').replace(/θ/g, 'theta').replace(/²/g, '^2').replace(/³/g, '^3');
  }

  function tokenize(src, vars) {
    var names = Object.keys(FUNCS).concat(Object.keys(CONSTS)).concat(vars);
    names.sort(function (a, b) { return b.length - a.length; });
    var toks = [];
    var i = 0;
    while (i < src.length) {
      var c = src.charAt(i);
      if (/\s/.test(c)) { i++; continue; }
      if (/[0-9.]/.test(c)) {
        var m = /^(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?/.exec(src.slice(i));
        if (!m) throw new Error('无法识别的数字');
        toks.push({ t: 'num', v: parseFloat(m[0]) });
        i += m[0].length;
        continue;
      }
      if (/[A-Za-zπ∞]/.test(c)) {
        var m2 = /^[A-Za-zπ∞][A-Za-z0-9]*/.exec(src.slice(i));
        var word = m2[0];
        // 拆分连写的名字，如 xsinx -> x sin x
        var pos = 0;
        while (pos < word.length) {
          var rest = word.slice(pos);
          var hit = null;
          for (var k = 0; k < names.length; k++) {
            if (rest.indexOf(names[k]) === 0) { hit = names[k]; break; }
          }
          if (!hit) {
            if (/^[0-9]/.test(rest)) {
              var dm = /^\d+/.exec(rest)[0];
              toks.push({ t: 'num', v: parseFloat(dm) });
              pos += dm.length;
              continue;
            }
            throw new Error('未知名称：' + rest);
          }
          if (FUNCS[hit]) toks.push({ t: 'fn', v: hit });
          else if (vars.indexOf(hit) !== -1) toks.push({ t: 'var', v: hit });
          else toks.push({ t: 'const', v: hit });
          pos += hit.length;
        }
        i += word.length;
        continue;
      }
      if ('+-*/^()!|[],√'.indexOf(c) !== -1) { toks.push({ t: c }); i++; continue; }
      throw new Error('无法识别的字符：' + c);
    }
    return toks;
  }

  // 递归下降解析，生成 AST
  function parse(toks) {
    var p = 0;
    var absDepth = 0;
    function peek() { return toks[p]; }
    function eat(t) {
      var k = toks[p];
      if (!k || k.t !== t) throw new Error('缺少 "' + t + '"');
      p++;
      return k;
    }
    function startsPrimary(k) {
      if (!k) return false;
      if (k.t === '|') return absDepth === 0;
      return k.t === 'num' || k.t === 'var' || k.t === 'const' || k.t === 'fn' || k.t === '(' || k.t === '[' || k.t === '√';
    }
    function expr() {
      var node = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) {
        var op = toks[p++].t;
        node = { op: op, a: node, b: term() };
      }
      return node;
    }
    function term() {
      var node = unary();
      for (;;) {
        var k = peek();
        if (k && (k.t === '*' || k.t === '/')) { p++; node = { op: k.t, a: node, b: unary() }; }
        else if (startsPrimary(k)) { node = { op: '*', a: node, b: power() }; }
        else break;
      }
      return node;
    }
    function unary() {
      var k = peek();
      if (k && k.t === '-') { p++; return { op: 'neg', a: unary() }; }
      if (k && k.t === '+') { p++; return unary(); }
      return power();
    }
    function power() {
      var base = postfix();
      if (peek() && peek().t === '^') { p++; return { op: '^', a: base, b: unary() }; }
      return base;
    }
    function postfix() {
      var node = primary();
      while (peek() && peek().t === '!') { p++; node = { op: 'fn', f: 'fact', a: node }; }
      return node;
    }
    function fnArg() {
      // 函数参数：带括号则取括号内；否则取一串隐式乘积（如 sin 2x）
      if (peek() && peek().t === '(') {
        p++;
        var inner = expr();
        eat(')');
        return inner;
      }
      var node = power();
      while (peek() && (peek().t === 'num' || peek().t === 'var' || peek().t === 'const')) {
        node = { op: '*', a: node, b: power() };
      }
      return node;
    }
    function primary() {
      var k = toks[p++];
      if (!k) throw new Error('表达式不完整');
      switch (k.t) {
        case 'num': return { op: 'num', v: k.v };
        case 'const': return { op: 'num', v: CONSTS[k.v] };
        case 'var': return { op: 'var', v: k.v };
        case '(': { var e = expr(); eat(')'); return e; }
        case '[': { var e2 = expr(); eat(']'); return { op: 'fn', f: 'floor', a: e2 }; }
        case '|': { absDepth++; var e3 = expr(); absDepth--; eat('|'); return { op: 'fn', f: 'abs', a: e3 }; }
        case '√': return { op: 'fn', f: 'sqrt', a: postfix() };
        case 'fn': {
          // sin^2 x 表示 (sin x)^2
          if (peek() && peek().t === '^') {
            p++;
            var ex = postfix();
            var arg = fnArg();
            return { op: '^', a: { op: 'fn', f: k.v, a: arg }, b: ex };
          }
          return { op: 'fn', f: k.v, a: fnArg() };
        }
        default: throw new Error('意外的符号 "' + k.t + '"');
      }
    }
    var tree = expr();
    if (p < toks.length) throw new Error('多余的符号 "' + toks[p].t + '"');
    return tree;
  }

  function evaluate(node, env) {
    switch (node.op) {
      case 'num': return node.v;
      case 'var': return env[node.v];
      case 'neg': return -evaluate(node.a, env);
      case '+': return evaluate(node.a, env) + evaluate(node.b, env);
      case '-': return evaluate(node.a, env) - evaluate(node.b, env);
      case '*': return evaluate(node.a, env) * evaluate(node.b, env);
      case '/': return evaluate(node.a, env) / evaluate(node.b, env);
      case '^': {
        var a = evaluate(node.a, env), b = evaluate(node.b, env);
        if (a < 0 && Math.floor(b) !== b) {
          // 负数的奇次方根，如 (-8)^(1/3)
          var inv = 1 / b;
          if (Math.abs(inv - Math.round(inv)) < 1e-9 && Math.round(inv) % 2 !== 0) return -Math.pow(-a, b);
        }
        return Math.pow(a, b);
      }
      case 'fn': return FUNCS[node.f](evaluate(node.a, env));
    }
    return NaN;
  }

  /** 编译表达式；vars 为变量名数组。返回 function(值...) */
  function compile(src, vars) {
    vars = vars || [];
    var norm = normalize(src);
    var tree = parse(tokenize(norm, vars));
    return function () {
      var env = {};
      for (var k = 0; k < vars.length; k++) env[vars[k]] = arguments[k];
      return evaluate(tree, env);
    };
  }

  /** 计算无变量表达式的数值，出错时抛出异常 */
  function value(src) { return compile(src, [])(); }

  /** 判断两个数值是否"相等"（用于答案核对） */
  function close(u, v, tol) {
    if (!isFinite(v) || !isFinite(u)) return u === v;
    if (tol != null && tol !== '') return Math.abs(u - v) <= +tol;
    return Math.abs(u - v) <= 1e-6 * Math.max(1, Math.abs(v));
  }

  MA.expr = { compile: compile, value: value, close: close, factorial: factorial, gamma: gamma, FUNCS: FUNCS };
  if (typeof module !== 'undefined' && module.exports) module.exports = MA;
})(typeof window !== 'undefined' ? window : globalThis);
