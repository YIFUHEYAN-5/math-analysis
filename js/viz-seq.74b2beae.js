/* viz-seq.js —— 互动演示组件（二）：第二章（数列极限）
 * supinf（上下确界的 ε 刻画）、epsn（ε-N 定义）、growth（增长速度比较）、bookstack（书本叠放）、
 * cobweb（迭代蛛网图）、pi（割圆术）、compound（复利与 e）、bisect（二分法与闭区间套）、
 * bw（Bolzano-Weierstrass 二分取子列）、cauchy（Cauchy 收敛原理）
 */
(function () {
  'use strict';
  var MA = window.MA, V = MA.viz, U = MA.vizUtil;
  function h() { return MA.h.apply(null, arguments); }
  var fmt = U.fmt, num = U.num, sub = U.sub, sup = U.sup;
  function p3(x) { return String(+x.toPrecision(3)); }

  /** 计算数列 a[1..M]。kind: 'seq' 通项 a(n)；'sum' 部分和 Σ t(k)；'rec' 递推 x_{n+1}=f(x_n)，x_1=x1 */
  function seqArray(src, M, kind, x1) {
    var a = new Float64Array(M + 1);
    a[0] = NaN;
    var k;
    if (kind === 'sum') {
      var t = U.compileF(src, ['k']), s = 0;
      for (k = 1; k <= M; k++) { s += t(k); a[k] = s; }
    } else if (kind === 'rec') {
      var f = U.compileF(src, ['x']), x = x1;
      for (k = 1; k <= M; k++) { a[k] = x; x = f(x); }
    } else {
      var g = U.compileF(src, ['n']);
      for (k = 1; k <= M; k++) a[k] = g(k);
    }
    return a;
  }
  /** 在 [n0, n1] 中至多取 maxPts 个下标（用于画点） */
  function idxList(n0, n1, maxPts) {
    var out = [], step = Math.max(1, Math.ceil((n1 - n0 + 1) / maxPts));
    for (var n = n0; n <= n1; n += step) out.push(n);
    return out;
  }
  function rangeOf(a, n0, n1, extra) {
    var lo = Infinity, hi = -Infinity;
    for (var n = n0; n <= n1; n++) { var v = a[n]; if (isFinite(v)) { if (v < lo) lo = v; if (v > hi) hi = v; } }
    (extra || []).forEach(function (v) { if (isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } });
    if (!isFinite(lo)) { lo = -1; hi = 1; }
    if (hi - lo < 1e-12) { lo -= 0.5; hi += 0.5; }
    var m = (hi - lo) * 0.1;
    return [lo - m, hi + m];
  }
  function epsSlider(init, onInput, minExp) {
    return U.slider('$\\varepsilon=$', minExp == null ? -4 : minExp, 0, 0.01, Math.log10(init), function (v) { onInput(Math.pow(10, v)); },
      function (v) { return p3(Math.pow(10, v)); });
  }

  /* ================= supinf：上确界与下确界 ================= */
  var SI = [
    { n: '{1 − 1/n}', f: '1 - 1/n', sup: '1', inf: '0',
      note: '上确界 1 不属于集合（没有最大数）；下确界 0 = a₁ 属于集合，是最小数。' },
    { n: '{(−1)ⁿ + 1/n}', f: '(-1)^n + 1/n', sup: '3/2', inf: '-1',
      note: '上确界 3/2 = a₂ 是最大数；下确界 −1 取不到——奇数项 −1 + 1/n 从上方无限接近 −1。' },
    { n: '{n/(n+1)}', f: 'n/(n+1)', sup: '1', inf: '1/2',
      note: '数列单调增加：下确界 1/2 = a₁ 是最小数，上确界 1 取不到。' },
    { n: '{(1 + 1/n)ⁿ}', f: '(1+1/n)^n', sup: 'e', inf: '2',
      note: '数列单调增加且有上界，上确界是 e（2.4 节会证明），它不属于集合，并且是无理数。' },
    { n: '√2 的不足近似值 {1, 1.4, 1.41, 1.414, …}', f: 'floor(sqrt(2)*10^(n-1))/10^(n-1)', sup: 'sqrt(2)', inf: '1',
      note: '集合中每个数都是有理数，上确界 √2 却是无理数——若只在 Q 中考虑，这个集合就没有上确界。这正是“有理数有空隙”。' },
    { n: '{sin n}', f: 'sin n', sup: '1', inf: '-1',
      note: 'sin n = ±1 要求 n = π/2 + kπ，对正整数 n 不可能，所以上下确界都取不到；但 sin n 可以任意接近 ±1（证明要用到 π 是无理数）。' }
  ];
  V.supinf = function (body, o) {
    var M = 100000;
    var S = { a: null, sup: 1, inf: 0, est: false, eps: 0.1, N: 40, note: '', err: '', iS: 0, iI: 0 };
    var c1 = U.ctl(body);
    var sel = U.selectIn('集合', SI.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义数列']]), function (v) {
      if (v === 'c') { fin.input.focus(); } else load(+v);
    });
    c1.appendChild(sel.el);
    var fin = U.textIn('$a_n=$', '', function () { compute(null); }, '12em');
    c1.appendChild(fin.el);
    c1.appendChild(U.btn('确定', function () { sel.input.value = 'c'; compute(null); }, true));
    var c2 = U.ctl(body);
    c2.appendChild(epsSlider(0.1, function (e) { S.eps = e; locate(); B.draw(); info(); }, -3).el);
    c2.appendChild(U.slider('显示项数', 10, 200, 1, 40, function (v) { S.N = v; B.draw(); info(); }, String).el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: '数列各项与上下确界' });
    var out = U.outBox(body);
    function load(i) { fin.input.value = SI[i].f; compute(SI[i]); }
    function compute(p) {
      S.err = '';
      try { S.a = seqArray(fin.input.value, M, 'seq'); } catch (e) { S.a = null; S.err = e.message; B.draw(); info(); return; }
      if (p) { S.sup = MA.expr.value(p.sup); S.inf = MA.expr.value(p.inf); S.est = false; S.note = p.note; }
      else {
        var lo = Infinity, hi = -Infinity;
        for (var n = 1; n <= M; n++) { var v = S.a[n]; if (isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } }
        S.sup = hi; S.inf = lo; S.est = true;
        S.note = '自定义数列：上下确界是用前 100000 项的最大值、最小值估计的，只作参考（例如单调增加的数列，真正的上确界可能比估计值略大）。';
      }
      locate(); B.draw(); info();
    }
    function locate() {
      S.iS = S.iI = 0;
      if (!S.a) return;
      for (var n = 1; n <= M && (!S.iS || !S.iI); n++) {
        if (!S.iS && S.a[n] > S.sup - S.eps) S.iS = n;
        if (!S.iI && S.a[n] < S.inf + S.eps) S.iI = n;
      }
    }
    function draw(B) {
      if (!S.a) { B.view(0, 10, -1, 1); B.grid(); return; }
      var N = S.N, r = rangeOf(S.a, 1, N, [S.sup, S.inf]);
      B.view(0, N + 1, r[0], r[1]);
      B.grid({ intX: true, xl: 'n' });
      B.hband(S.sup - S.eps, S.sup, B.C.band);
      B.hband(S.inf, S.inf + S.eps, B.C.band2);
      B.line(0, S.sup, N + 1, S.sup, B.C.c3, 2);
      B.line(0, S.inf, N + 1, S.inf, B.C.c2, 2);
      B.text('sup = ' + fmt(S.sup, 4), N + 1, S.sup, B.C.c3, 'right', 'bottom');
      B.text('inf = ' + fmt(S.inf, 4), N + 1, S.inf, B.C.c2, 'right', 'top');
      var rad = N > 100 ? 2 : 3.2;
      for (var n = 1; n <= N; n++) if (isFinite(S.a[n])) B.dot(n, S.a[n], B.C.c1, rad);
      if (S.iS && S.iS <= N) { B.dot(S.iS, S.a[S.iS], B.C.c3, 6, true); B.dot(S.iS, S.a[S.iS], B.C.c3, 3); }
      if (S.iI && S.iI <= N) { B.dot(S.iI, S.a[S.iI], B.C.c2, 6, true); B.dot(S.iI, S.a[S.iI], B.C.c2, 3); }
    }
    function info() {
      if (S.err) { out.innerHTML = '<span class="bad">无法解析：' + MA.esc(S.err) + '</span>'; return; }
      if (!S.a) return;
      var e = S.eps, t = '';
      var cap = function (i) { return i > S.N ? '（在图的显示范围之外，可调大“显示项数”）' : ''; };
      t += '<b style="color:var(--c3)">上确界 ' + fmt(S.sup, 6) + (S.est ? '（估计）' : '') + '</b>：① 每一项都 ≤ ' + fmt(S.sup, 6) + '；② 对 ε = ' + p3(e) + '，';
      t += S.iS ? '第一个大于 sup − ε = ' + fmt(S.sup - e, 6) + ' 的项是 a' + sub(S.iS) + ' = ' + fmt(S.a[S.iS], 6) + '，所以比 sup 小的数都不是上界' + cap(S.iS) + '。' : '在前 ' + M + ' 项中没有找到大于 sup − ε 的项。';
      t += '<br><b style="color:var(--c2)">下确界 ' + fmt(S.inf, 6) + (S.est ? '（估计）' : '') + '</b>：① 每一项都 ≥ ' + fmt(S.inf, 6) + '；② 对 ε = ' + p3(e) + '，';
      t += S.iI ? '第一个小于 inf + ε = ' + fmt(S.inf + e, 6) + ' 的项是 a' + sub(S.iI) + ' = ' + fmt(S.a[S.iI], 6) + cap(S.iI) + '。' : '在前 ' + M + ' 项中没有找到小于 inf + ε 的项。';
      t += '<br><span class="muted">' + MA.esc(S.note) + '</span>';
      out.innerHTML = t;
    }
    load(0);
  };

  /* ================= epsn：数列极限的 ε-N 定义 ================= */
  var EN = [
    { n: '1/n → 0', f: '1/n', L: '0', th: 'floor(1/eps)', ths: 'N = [1/ε]' },
    { n: '(3n² + n)/(2n² − 1) → 3/2', f: '(3n^2+n)/(2n^2-1)', L: '3/2', th: 'floor(2/eps)', ths: 'N = max{2, [2/ε]}' },
    { n: '(−1)ⁿ/n → 0', f: '(-1)^n/n', L: '0', th: 'floor(1/eps)', ths: 'N = [1/ε]' },
    { n: '0.9ⁿ → 0', f: '0.9^n', L: '0', th: 'floor(ln(eps)/ln(0.9))', ths: 'N = [ln ε / ln 0.9]' },
    { n: 'ⁿ√n → 1', f: 'n^(1/n)', L: '1', th: 'floor(2/eps^2) + 1', ths: 'N = [2/ε²] + 1' },
    { n: 'sin n / n → 0', f: 'sin(n)/n', L: '0', th: 'floor(1/eps)', ths: 'N = [1/ε]' },
    { n: '(1 + 1/n)ⁿ → e', f: '(1+1/n)^n', L: 'e', th: '', ths: '' },
    { n: '(−1)ⁿ（发散）', f: '(-1)^n', L: '1', th: '', ths: '' }
  ];
  V.epsn = function (body, o) {
    var M = 100000;
    var S = { a: null, L: 0, eps: 0.1, sm: null, N: -1, th: null, ths: '', err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('数列', EN.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      var p = EN[+v];
      fin.input.value = p.f; lin.input.value = p.L;
      S.th = p.th ? U.compileF(p.th, ['eps']) : null; S.ths = p.ths;
      compute();
    });
    c1.appendChild(sel.el);
    var fin = U.textIn('$a_n=$', EN[0].f, function () { custom(); }, '11em');
    var lin = U.textIn('猜测的极限 $L=$', EN[0].L, function () { custom(true); }, '5em');
    c1.appendChild(fin.el); c1.appendChild(lin.el);
    c1.appendChild(U.btn('确定', function () { custom(); }, true));
    var c2 = U.ctl(body);
    c2.appendChild(epsSlider(0.1, function (e) { S.eps = e; findN(); B.draw(); info(); }).el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: 'ε-N 定义演示' });
    var out = U.outBox(body);
    function custom(keepTh) {
      if (!keepTh) { sel.input.value = 'c'; S.th = null; S.ths = ''; }
      compute();
    }
    function compute() {
      S.err = '';
      try {
        S.a = seqArray(fin.input.value, M, 'seq');
        S.L = MA.expr.value(lin.input.value);
        if (!isFinite(S.L)) throw new Error('L 必须是一个有限的数');
      } catch (e) { S.a = null; S.err = e.message; B.draw(); info(); return; }
      S.sm = new Float64Array(M + 2);
      S.sm[M + 1] = 0;
      for (var n = M; n >= 1; n--) {
        var d = Math.abs(S.a[n] - S.L);
        if (!isFinite(d)) d = Infinity;
        S.sm[n] = Math.max(d, S.sm[n + 1]);
      }
      findN(); B.draw(); info();
    }
    function findN() {
      if (!S.a) return;
      if (S.sm[M] >= S.eps) { S.N = -1; return; }
      var lo = 0, hi = M - 1;
      while (lo < hi) { var mid = (lo + hi) >> 1; if (S.sm[mid + 1] < S.eps) hi = mid; else lo = mid + 1; }
      S.N = lo > M / 2 ? -1 : lo;
    }
    function draw(B) {
      if (!S.a) { B.view(0, 10, -1, 1); B.grid(); return; }
      var Nv = S.N < 0 ? 60 : Math.max(30, Math.min(M, Math.ceil(S.N * 1.6) + 10));
      var r = rangeOf(S.a, Math.max(1, Math.floor(Nv * 0.02)), Nv, [S.L - S.eps, S.L + S.eps]);
      var spanL = Math.max(Math.abs(r[1] - S.L), Math.abs(S.L - r[0]));
      if (spanL > 40 * S.eps && S.N >= 0) spanL = Math.max(spanL * 0.5, 4 * S.eps);
      B.view(0, Nv + 1, S.L - spanL, S.L + spanL);
      B.grid({ intX: true, xl: 'n' });
      B.hband(S.L - S.eps, S.L + S.eps, B.C.band);
      B.line(0, S.L, Nv + 1, S.L, B.C.c3, 1.5, [6, 4]);
      B.text('L = ' + fmt(S.L, 5), Nv + 1, S.L + S.eps, B.C.c3, 'right', 'bottom');
      if (S.N >= 0) {
        B.line(S.N + 0.5, B.y0, S.N + 0.5, B.y1, B.C.c4, 1.5);
        B.text('N = ' + S.N, S.N + 0.5, B.y1, B.C.c4, 'left', 'top');
      }
      var idx = idxList(1, Nv, 2400), rad = idx.length > 150 ? 1.6 : 3;
      B.clip();
      idx.forEach(function (n) {
        var v = S.a[n];
        if (!isFinite(v)) return;
        B.dot(n, v, Math.abs(v - S.L) < S.eps ? B.C.c1 : B.C.c2, rad);
      });
      B.unclip();
    }
    function info() {
      if (S.err) { out.innerHTML = '<span class="bad">无法计算：' + MA.esc(S.err) + '</span>'; return; }
      if (!S.a) return;
      var e = p3(S.eps), t;
      if (S.N >= 0) {
        t = '<span class="good">取 ε = ' + e + '，找到 N = ' + S.N + '</span>：当 n > ' + S.N + ' 时，|aₙ − L| < ε（蓝点都落在带子里，红点是带子外的项，全都在竖线左边）。';
        if (S.th) {
          var tn; try { tn = S.th(S.eps); } catch (er) { tn = NaN; }
          if (isFinite(tn)) t += '<br>按例题中放缩得到的公式 ' + S.ths + ' 算出 N = ' + Math.max(0, Math.round(tn)) + (Math.round(tn) > S.N ? '，比最小的 N 大——放缩会“浪费”一些，但定义只要求 N 存在，不要求最小。' : '。');
        }
      } else {
        t = '<span class="bad">取 ε = ' + e + '，在 n ≤ ' + M + ' 的范围内找不到这样的 N</span>：总有越来越靠后的项落在带子外面。如果 ε 再大一点也不行，说明 L 很可能不是这个数列的极限。';
      }
      t += '<br><span class="muted">注意：计算机只检验了前 ' + M + ' 项，数值实验只能帮助理解，不能代替对“一切 n > N”的证明。</span>';
      out.innerHTML = t;
    }
    S.th = U.compileF(EN[0].th, ['eps']); S.ths = EN[0].ths;
    compute();
  };

  /* ================= growth：增长速度的比较 ================= */
  function lgam(x) {
    if (x < 10) return Math.log(MA.expr.gamma(x));
    var x2 = x * x;
    return (x - 0.5) * Math.log(x) - x + 0.5 * Math.log(2 * Math.PI) + 1 / (12 * x) - 1 / (360 * x * x2) + 1 / (1260 * x2 * x2 * x);
  }
  var LN10 = Math.LN10;
  var GROW = [
    { k: 'ln', t: 'ln n', on: true, l: function (n) { return Math.log10(Math.log(n)); } },
    { k: 'sqrt', t: '√n', on: true, l: function (n) { return 0.5 * Math.log10(n); } },
    { k: 'n', t: 'n', on: true, l: function (n) { return Math.log10(n); } },
    { k: 'nln', t: 'n ln n', on: false, l: function (n) { return Math.log10(n) + Math.log10(Math.log(n)); } },
    { k: 'n2', t: 'n²', on: true, l: function (n) { return 2 * Math.log10(n); } },
    { k: 'n3', t: 'n³', on: false, l: function (n) { return 3 * Math.log10(n); } },
    { k: '2n', t: '2ⁿ', on: true, l: function (n) { return n * Math.log10(2); } },
    { k: 'fac', t: 'n!', on: true, l: function (n) { return lgam(n + 1) / LN10; } },
    { k: 'nn', t: 'nⁿ', on: false, l: function (n) { return n * Math.log10(n); } }
  ];
  var GCL = ['c6', 'c3', 'c1', 'c7', 'c5', 'c4', 'c2', 'fg', 'muted'];
  function timeStr(l10) {
    if (l10 < -6) return p3(Math.pow(10, l10 + 9)) + ' 纳秒';
    if (l10 < -3) return p3(Math.pow(10, l10 + 6)) + ' 微秒';
    if (l10 < 0) return p3(Math.pow(10, l10 + 3)) + ' 毫秒';
    var s = Math.pow(10, l10);
    if (s < 60) return p3(s) + ' 秒';
    if (s < 3600) return p3(s / 60) + ' 分钟';
    if (s < 86400) return p3(s / 3600) + ' 小时';
    if (s < 31557600) return p3(s / 86400) + ' 天';
    var ly = l10 - Math.log10(31557600);
    if (ly < 6) return p3(Math.pow(10, ly)) + ' 年';
    /* 写成 a×10^k，避免“约 10^47 年”这种把 9.6×10^47 低估近 10 倍的写法 */
    var e = Math.floor(ly), m = Math.pow(10, ly - e);
    if (m >= 9.95) { m = 1; e += 1; }
    return '约 ' + m.toFixed(1) + '×10' + sup(e) + ' 年';
  }
  V.growth = function (body, o) {
    var S = { N: num(o.n, 30), log: true };
    var c1 = U.ctl(body);
    GROW.forEach(function (g, i) {
      var cb = h('input', { type: 'checkbox', checked: g.on });
      cb.addEventListener('change', function () { g.on = cb.checked; B.draw(); });
      c1.appendChild(h('label', null, cb, h('b', { style: 'color:var(--' + GCL[i] + ')' }, g.t)));
    });
    var c2 = U.ctl(body);
    c2.appendChild(U.slider('$n$ 的范围到', 5, 100, 1, S.N, function (v) { S.N = v; B.draw(); }, String).el);
    var sc = U.selectIn('纵轴', [['log', '对数刻度（lg y）'], ['lin', '普通刻度']], function (v) { S.log = v === 'log'; B.draw(); });
    c2.appendChild(sc.el);
    var B = U.board(body, { ratio: 0.55, draw: draw, label: '增长速度比较' });
    var note = U.outBox(body);
    note.innerHTML = '<span class="muted">对数刻度下，纵坐标 k 表示数值 10<sup>k</sup>。可以看到：对数 ≪ 幂 ≪ 指数 ≪ 阶乘 ≪ nⁿ，越往右差距越悬殊。</span>';
    var c3 = U.ctl(body);
    var kin = U.numIn('求最小的 $n_0$，使 $n\\ge n_0$ 时 $2^n>n^k$，其中 $k=$', 10, cross, 1);
    c3.appendChild(kin.el);
    c3.appendChild(U.btn('计算', cross, true));
    var out = U.outBox(body);
    var tb = h('div', { style: 'overflow-x:auto' });
    body.appendChild(h('div', { class: 'small', style: 'margin-top:.8em;font-weight:700' }, '假设计算机每秒执行 10⁹ 次基本运算，不同复杂度的算法所需时间：'));
    body.appendChild(tb);
    function draw(B) {
      var N = S.N, ymax = -Infinity, ymin = Infinity;
      GROW.forEach(function (g) {
        if (!g.on) return;
        for (var i = 0; i <= 50; i++) {
          var n = 1 + (N - 1) * i / 50, v = S.log ? g.l(n) : Math.pow(10, g.l(n));
          if (isFinite(v)) { ymax = Math.max(ymax, v); ymin = Math.min(ymin, v); }
        }
      });
      if (!isFinite(ymax)) { ymax = 1; ymin = 0; }
      if (S.log) { ymin = Math.min(-0.5, ymin); B.view(0, N, ymin, ymax * 1.05 + 0.2); }
      else { ymax = Math.min(ymax, 1e6); B.view(0, N, 0, ymax * 1.05); }
      B.grid({ xl: 'n', fy: S.log ? function (v) { return Number.isInteger(+v.toFixed(6)) ? '10' + sup(Math.round(v)) : ''; } : null });
      GROW.forEach(function (g, i) {
        if (!g.on) return;
        var col = B.C[GCL[i]];
        B.fn(function (x) { if (x < 1) return NaN; var l = g.l(x); return S.log ? l : Math.pow(10, l); }, col, 2.2);
        var ye = S.log ? g.l(N) : Math.pow(10, g.l(N));
        if (isFinite(ye) && ye <= B.y1 && ye >= B.y0) B.text(g.t, N, ye, col, 'right', 'bottom', U.FONT_B);
      });
    }
    function cross() {
      var k = Math.round(kin.get(10));
      if (!(k >= 1 && k <= 1000)) { out.innerHTML = '<span class="bad">请输入 1 到 1000 之间的整数 k</span>'; return; }
      var g = function (n) { return n * Math.LN2 - k * Math.log(n); };
      var start = Math.ceil(k / Math.LN2) + 1, n = start;
      while (g(n) <= 0) n++;
      var last = 0;
      for (var m = 1; m < n; m++) if (g(m) <= 0) last = m;
      var n0 = last + 1;
      var t = 'k = ' + k + ' 时：当 n ≥ ' + n0 + ' 时 2ⁿ > n' + sup(k) + ' 恒成立。';
      if (last >= 2) t += ' 而 n = ' + last + ' 时 2' + sup(last) + ' ≈ ' + fmt(Math.pow(2, last), 3) + '，' + last + sup(k) + ' ≈ ' + fmt(Math.pow(last, k), 3) + '，前者还不比后者大。';
      t += '<br><span class="muted">指数函数最终一定超过幂函数，只是 k 越大，“最终”来得越晚。</span>';
      out.innerHTML = t;
    }
    function table() {
      var ns = [10, 20, 30, 50, 100, 1000, 1000000];
      var cols = [['n', function (n) { return Math.log10(n); }], ['n²', function (n) { return 2 * Math.log10(n); }],
        ['n³', function (n) { return 3 * Math.log10(n); }], ['2ⁿ', function (n) { return n * Math.log10(2); }],
        ['n!', function (n) { return lgam(n + 1) / LN10; }]];
      var t = h('table', { class: 'viz-tbl' });
      t.appendChild(h('tr', null, h('th', null, 'n'), cols.map(function (c) { return h('th', null, c[0]); })));
      ns.forEach(function (n) {
        t.appendChild(h('tr', null, h('td', null, n >= 1e6 ? '10⁶' : String(n)), cols.map(function (c) { return h('td', null, timeStr(c[1](n) - 9)); })));
      });
      tb.appendChild(t);
    }
    B.draw(); cross(); table();
  };

  /* ================= bookstack：书本叠放与调和级数 ================= */
  V.bookstack = function (body, o) {
    var S = { n: num(o.n, 6) };
    var c1 = U.ctl(body);
    c1.appendChild(U.slider('书的本数 $n=$', 1, 40, 1, S.n, function (v) { S.n = v; B.draw(); info(); }, String).el);
    var B = U.board(body, { ratio: 0.5, max: 420, draw: draw, label: '书本叠放示意图' });
    var out = U.outBox(body);
    var need = [], Hn = 0, kk = 1;
    for (var n = 1; kk <= 6 && n < 1e7; n++) { Hn += 1 / n; while (kk <= 6 && Hn >= 2 * kk) { need.push(n); kk++; } }
    function draw(B) {
      var n = S.n, R = [], r = 0, k;
      for (k = n; k >= 1; k--) { r += 1 / (2 * k); R[k] = r; }
      var th = Math.min(0.16, 2.6 / n), top = n * th;
      var xr = Math.max(R[1], 0.5) + 0.25;
      B.viewEq(-1.6, xr, -0.45, top + 0.15);
      var C = B.C, ctx = B.ctx;
      ctx.fillStyle = C.grid;
      ctx.fillRect(B.X(-3), B.Y(0), B.X(0) - B.X(-3), B.Y(-0.45) - B.Y(0));
      B.line(-3, 0, 0, 0, C.axis, 2);
      B.line(0, -0.45, 0, top + 0.15, C.axis, 1, [5, 4]);
      B.ptext('桌子边缘', B.X(0) - 4, B.Y(-0.3), C.text, 'right', 'middle');
      for (k = n; k >= 1; k--) {
        var y = (n - k) * th;
        ctx.fillStyle = k === 1 ? C.c2 : C.c1;
        ctx.globalAlpha = k === 1 ? 0.85 : 0.35 + 0.5 * (k % 2);
        ctx.fillRect(B.X(R[k] - 1), B.Y(y + th * 0.92), B.X(R[k]) - B.X(R[k] - 1), B.Y(y) - B.Y(y + th * 0.92));
        ctx.globalAlpha = 1;
      }
      B.line(R[1], top, R[1], -0.1, C.c2, 1.5, [4, 3]);
      B.text('伸出 ' + fmt(R[1], 4) + ' 本书长', R[1], -0.12, C.c2, 'center', 'top', U.FONT_B);
    }
    function info() {
      var n = S.n, H = 0;
      for (var k = 1; k <= n; k++) H += 1 / k;
      out.innerHTML = MA.mathify('从上往下数，第 $k$ 本书比它下面那本多伸出 $\\frac{1}{2k}$ 个书长（这样上面 $k$ 本书的重心恰好落在第 $k+1$ 本书的边缘上）。$n=' + n + '$ 本书最多伸出 $\\frac12 H_n=\\frac12\\left(1+\\frac12+\\cdots+\\frac1n\\right)\\approx' + fmt(H / 2, 4) + '$ 个书长。') +
        '<br>因为 H<sub>n</sub> → +∞，只要书足够多，最上面的书可以伸出任意远！要伸出 k 个书长至少需要：' +
        need.map(function (m, i) { return 'k = ' + (i + 1) + '：' + m + ' 本'; }).join('；') + '。<span class="muted">（增长得极慢——这正是调和级数发散得“很慢”的体现。）</span>';
    }
    B.draw(); info();
  };

  /* ================= cobweb：迭代 x_{n+1}=f(x_n) 的蛛网图 ================= */
  var CW = [
    { n: 'xₙ₊₁ = √(2 + xₙ)', f: 'sqrt(2+x)', x0: 0, r: [-0.3, 2.7, -0.3, 2.7] },
    { n: 'Heron 法求 √2：xₙ₊₁ = (xₙ + 2/xₙ)/2', f: '(x + 2/x)/2', x0: 3, r: [0, 3.4, 0, 3.4] },
    { n: 'xₙ₊₁ = cos xₙ', f: 'cos x', x0: 0, r: [-0.15, 1.25, -0.15, 1.25] },
    { n: 'xₙ₊₁ = 1 + 1/xₙ（→ 黄金比）', f: '1 + 1/x', x0: 1, r: [0.6, 2.4, 0.6, 2.4] },
    { n: '药物浓度：xₙ₊₁ = 0.3xₙ + 100', f: '0.3x + 100', x0: 0, r: [-10, 175, -10, 175] },
    { n: 'xₙ₊₁ = xₙ(1 − xₙ)（缓慢趋于 0）', f: 'x(1-x)', x0: 0.8, r: [-0.05, 0.9, -0.05, 0.9] },
    { n: 'Logistic：xₙ₊₁ = 3.2xₙ(1 − xₙ)（振荡）', f: '3.2x(1-x)', x0: 0.2, r: [0, 1, 0, 1] },
    { n: 'Logistic：xₙ₊₁ = 3.9xₙ(1 − xₙ)（混沌）', f: '3.9x(1-x)', x0: 0.2, r: [0, 1, 0, 1] }
  ];
  V.cobweb = function (body, o) {
    var S = { f: null, x0: 0, steps: 12, r: [0, 1, 0, 1], xs: [], err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('迭代', CW.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(+v);
    });
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', '', function () { custom(); }, '10em');
    var xin = U.numIn('初值 $x_0=$', 0, function () { S.x0 = xin.get(S.x0); run(); });
    c2.appendChild(fin.el); c2.appendChild(xin.el);
    c2.appendChild(U.btn('确定', custom, true));
    c2.appendChild(U.slider('迭代次数', 1, 60, 1, S.steps, function (v) { S.steps = v; run(); }, String).el);
    var B = U.board(body, { ratio: 0.62, max: 460, draw: draw, label: '迭代蛛网图' });
    B.drag(function (x) { S.x0 = +x.toPrecision(4); xin.set(S.x0); run(); });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    function load(i) {
      var p = CW[i];
      fin.input.value = p.f; S.x0 = p.x0; xin.set(p.x0); S.r = p.r.slice();
      compile();
    }
    function custom() {
      sel.input.value = 'c';
      compile(true);
    }
    function compile(auto) {
      S.err = '';
      try { S.f = U.compileF(fin.input.value, ['x']); } catch (e) { S.f = null; S.err = e.message; }
      run(auto);
    }
    function run(auto) {
      S.xs = [S.x0];
      if (S.f) {
        for (var i = 0; i < 400; i++) {
          var v; try { v = S.f(S.xs[i]); } catch (e) { v = NaN; }
          S.xs.push(v);
          if (!isFinite(v)) break;
        }
      }
      if (auto && S.f) {
        var lo = S.x0, hi = S.x0;
        S.xs.slice(0, S.steps + 1).forEach(function (v) { if (isFinite(v) && Math.abs(v) < 1e6) { lo = Math.min(lo, v); hi = Math.max(hi, v); } });
        if (hi - lo < 1e-9) { lo -= 1; hi += 1; }
        var m = (hi - lo) * 0.2;
        S.r = [lo - m, hi + m, lo - m, hi + m];
      }
      B.draw(); info();
    }
    function draw(B) {
      B.view(S.r[0], S.r[1], S.r[2], S.r[3]);
      B.grid({ xl: 'x', yl: 'y' });
      B.fn(function (x) { return x; }, B.C.c4, 1.5, [6, 4]);
      if (!S.f) return;
      B.fn(S.f, B.C.c1, 2.4);
      var pts = [[S.xs[0], 0]];
      for (var i = 0; i < S.steps && i + 1 < S.xs.length; i++) {
        var x = S.xs[i], y = S.xs[i + 1];
        if (!isFinite(y)) break;
        pts.push([x, y]); pts.push([y, y]);
      }
      B.clip();
      B.poly(pts, B.C.c2, 1.6);
      B.unclip();
      B.dot(S.xs[0], 0, B.C.c2, 5);
      B.text('x₀', S.xs[0], 0, B.C.c2, 'center', 'top', U.FONT_B);
    }
    function info() {
      if (S.err) { out.innerHTML = '<span class="bad">无法解析：' + MA.esc(S.err) + '</span>'; tb.innerHTML = ''; return; }
      var n = Math.min(S.steps, S.xs.length - 1), xs = S.xs;
      var xn = xs[n], d = Math.abs(xs[n] - xs[n - 1]);
      var t = 'x' + sub(n) + ' = ' + fmt(xn, 10) + '，|x' + sub(n) + ' − x' + sub(n - 1) + '| = ' + fmt(d, 3) + '。';
      var tail = xs.slice(-20).filter(isFinite);
      if (xs.length > 300 && tail.length === 20 && Math.abs(xs[xs.length - 1] - xs[xs.length - 2]) < 1e-10) t += '<br><span class="good">迭代收敛</span>：极限 ξ ≈ ' + fmt(xs[xs.length - 1], 10) + ' 满足 ξ = f(ξ)，即曲线 y = f(x) 与直线 y = x 的交点（不动点）。';
      else if (!isFinite(xs[xs.length - 1])) t += '<br><span class="bad">迭代跑出了定义域或发散到无穷。</span>';
      else t += '<br><span class="muted">迭代 400 次后仍未稳定：可能收敛很慢、在几个值之间振荡，或者根本不收敛。</span>';
      t += '<br><span class="muted">提示：在图上点击或拖动可以改变初值 x₀。</span>';
      out.innerHTML = t;
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'n'), h('th', null, 'xₙ'), h('th', null, 'xₙ − xₙ₋₁')));
      for (var i = 0; i <= n; i++) tab.appendChild(h('tr', null, h('td', null, String(i)), h('td', null, fmt(xs[i], 10)), h('td', null, i ? fmt(xs[i] - xs[i - 1], 3) : '')));
      tb.innerHTML = '';
      tb.appendChild(tab);
    }
    var k0 = Math.max(0, Math.min(CW.length - 1, parseInt(o.start, 10) || 0));
    sel.input.value = String(k0);
    load(k0);
  };

  /* ================= pi：割圆术 ================= */
  V.pi = function (body, o) {
    var K = 20, rows = [], a = 1, au = 1;
    for (var k = 0; k <= K; k++) {
      var n = 6 * Math.pow(2, k);
      var b = a / Math.sqrt(1 - a * a / 4);
      rows.push({ k: k, n: n, p: n * a / 2, q: n * b / 2, u: n * au / 2 });
      a = a / Math.sqrt(2 + Math.sqrt(4 - a * a));
      au = Math.sqrt(2 - Math.sqrt(4 - au * au));
    }
    var S = { k: 0 };
    var c1 = U.ctl(body);
    c1.appendChild(U.slider('倍增次数 $k=$', 0, 6, 1, 0, function (v) { S.k = v; B.draw(); info(); }, function (v) { return v + '（正 ' + 6 * Math.pow(2, v) + ' 边形）'; }).el);
    var B = U.board(body, { ratio: 0.5, max: 380, min: 240, pad: { l: 10, r: 10, t: 10, b: 10 }, draw: draw, label: '圆的内接与外切正多边形' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    function draw(B) {
      B.viewEq(-1.3, 1.3, -1.25, 1.25);
      var n = 6 * Math.pow(2, S.k), C = B.C, ctx = B.ctx;
      var inner = [], outer = [], rr = 1 / Math.cos(Math.PI / n);
      for (var i = 0; i <= n; i++) {
        var t = Math.PI / 2 + 2 * Math.PI * i / n;
        inner.push([Math.cos(t), Math.sin(t)]);
        outer.push([rr * Math.cos(t + Math.PI / n), rr * Math.sin(t + Math.PI / n)]);
      }
      B.poly(outer, C.c2, 1.6, true, C.band2);
      ctx.save(); ctx.strokeStyle = C.fg; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(B.X(0), B.Y(0), B.X(1) - B.X(0), 0, 2 * Math.PI); ctx.stroke(); ctx.restore();
      B.poly(inner, C.c1, 1.6, true, C.band);
      B.ptext('内接：周长 < 2π', 14, 22, C.c1, 'left', 'alphabetic', U.FONT_B);
      B.ptext('外切：周长 > 2π', 14, 42, C.c2, 'left', 'alphabetic', U.FONT_B);
    }
    function info() {
      var r = rows[S.k];
      out.innerHTML = MA.mathify('正 $' + r.n + '$ 边形：$' + r.p.toFixed(10) + '<\\pi<' + r.q.toFixed(10) + '$') + '，两者相差约 ' + fmt(r.q - r.p, 3) + '。';
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'k'), h('th', null, '边数 n'), h('th', null, '内接半周长 pₙ'),
        h('th', null, '外切半周长 qₙ'), h('th', null, 'qₙ − pₙ'), h('th', null, '用“不稳定”公式算的 pₙ')));
      rows.forEach(function (x) {
        tab.appendChild(h('tr', { class: x.k === S.k ? 'hl' : '' }, h('td', null, String(x.k)), h('td', null, String(x.n)),
          h('td', null, x.p.toFixed(12)), h('td', null, x.q.toFixed(12)), h('td', null, fmt(x.q - x.p, 3)),
          h('td', { style: Math.abs(x.u - x.p) > 1e-12 ? 'color:var(--bad)' : '' }, x.u.toFixed(12))));
      });
      tb.innerHTML = '';
      tb.appendChild(tab);
    }
    B.draw(); info();
  };

  /* ================= compound：复利与 e ================= */
  V.compound = function (body, o) {
    var S = { r: num(o.r, 1) };
    var c1 = U.ctl(body);
    c1.appendChild(U.slider('年利率 $r=$', 0.01, 1, 0.01, S.r, function (v) { S.r = v; B.draw(); info(); }, function (v) { return Math.round(v * 100) + '%'; }).el);
    var B = U.board(body, { ratio: 0.45, draw: draw, label: '复利次数与本利和' });
    var out = U.outBox(body);
    var tb = h('div', { style: 'overflow-x:auto' });
    body.appendChild(tb);
    function A(m) { return Math.pow(1 + S.r / m, m); }
    function draw(B) {
      var er = Math.exp(S.r);
      B.view(0, 6, 1 + S.r * 0.85, er + (er - 1 - S.r) * 0.25 + 0.01);
      B.grid({ sx: 1, fx: function (v) { return v === 0 ? '1' : '10' + sup(Math.round(v)); }, xl: '每年复利次数 m（对数刻度）' });
      B.line(0, er, 6, er, B.C.c2, 1.5, [6, 4]);
      B.text('e^r = ' + fmt(er, 6), 6, er, B.C.c2, 'right', 'bottom');
      B.fn(function (x) { return A(Math.pow(10, x)); }, B.C.c1, 2.4);
      [1, 2, 4, 12, 365].forEach(function (m) { var x = Math.log10(m); B.dot(x, A(m), B.C.c1, 3.5); });
    }
    function info() {
      var ms = [[1, '每年 1 次'], [2, '每半年'], [4, '每季度'], [12, '每月'], [52, '每周'], [365, '每天'], [8760, '每小时'], [525600, '每分钟']];
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, '结息方式'), h('th', null, 'm'), h('th', null, '1 元一年后的本利和 (1 + r/m)ᵐ')));
      ms.forEach(function (x) { tab.appendChild(h('tr', null, h('td', { class: 'l' }, x[1]), h('td', null, String(x[0])), h('td', null, A(x[0]).toFixed(8)))); });
      tab.appendChild(h('tr', { class: 'hl' }, h('td', { class: 'l' }, '连续复利（m → ∞）'), h('td', null, '∞'), h('td', null, Math.exp(S.r).toFixed(8))));
      tb.innerHTML = '';
      tb.appendChild(tab);
      var r = S.r, exact = Math.log(2) / Math.log(1 + r), rule = 72 / (100 * r);
      out.innerHTML = '本金翻倍所需年数（按年复利）：精确值 ln 2 / ln(1 + r) = ' + fmt(exact, 3) + ' 年；“72 法则”估计 72 / (100r) = ' + fmt(rule, 3) +
        ' 年' + (r <= 0.12 ? '，误差很小。' : '。利率很高时 72 法则就不准了。') + '<br><span class="muted">无论一年结息多少次，本利和都不会超过 e<sup>r</sup>——这就是 (1 + 1/n)ⁿ 单调有界、收敛于 e 的“金融版本”。</span>';
    }
    B.draw(); info();
  };

  /* ================= bisect：二分法与闭区间套 ================= */
  var BI = [
    { n: 'x² − 2 = 0，[1, 2]', f: 'x^2 - 2', a: '1', b: '2' },
    { n: 'x³ − x − 1 = 0，[1, 2]', f: 'x^3 - x - 1', a: '1', b: '2' },
    { n: 'cos x − x = 0，[0, 1]', f: 'cos x - x', a: '0', b: '1' },
    { n: 'eˣ − 3 = 0，[0, 2]', f: 'e^x - 3', a: '0', b: '2' }
  ];
  V.bisect = function (body, o) {
    var S = { f: null, a: 1, b: 2, k: 0, iv: [], err: '', zoom: false };
    var c1 = U.ctl(body);
    c1.appendChild(U.selectIn('方程', BI.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      var p = BI[+v]; fin.input.value = p.f; ain.input.value = p.a; bin.input.value = p.b; build();
    }).el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', BI[0].f, build, '9em'), ain = U.textIn('$a=$', BI[0].a, build, '4em'), bin = U.textIn('$b=$', BI[0].b, build, '4em');
    [fin, ain, bin].forEach(function (x) { c2.appendChild(x.el); });
    c2.appendChild(U.btn('确定', build, true));
    var c3 = U.ctl(body);
    var sk = U.slider('二分次数 $k=$', 0, 30, 1, 0, function (v) { S.k = v; B.draw(); info(); }, String);
    c3.appendChild(sk.el);
    var zc = h('input', { type: 'checkbox' });
    zc.addEventListener('change', function () { S.zoom = zc.checked; B.draw(); });
    c3.appendChild(h('label', null, zc, '跟随放大当前区间'));
    var B = U.board(body, { ratio: 0.5, draw: draw, label: '二分法示意图' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    function build() {
      S.err = '';
      try {
        S.f = U.compileF(fin.input.value, ['x']);
        S.a = MA.expr.value(ain.input.value); S.b = MA.expr.value(bin.input.value);
        if (!(S.b > S.a)) throw new Error('需要 a < b');
        var fa = S.f(S.a), fb = S.f(S.b);
        if (!isFinite(fa) || !isFinite(fb)) throw new Error('f 在端点处没有定义');
        if (fa * fb > 0) throw new Error('f(a) 与 f(b) 同号，不能保证区间内有根');
      } catch (e) { S.err = e.message; S.iv = []; B.draw(); info(); return; }
      S.iv = [[S.a, S.b]];
      var lo = S.a, hi = S.b, flo = S.f(lo);
      for (var k = 1; k <= 30; k++) {
        var c = (lo + hi) / 2, fc = S.f(c);
        if (fc === 0) { lo = hi = c; }
        else if (flo * fc < 0) hi = c; else { lo = c; flo = fc; }
        S.iv.push([lo, hi]);
      }
      B.draw(); info();
    }
    function draw(B) {
      if (!S.iv.length) { B.view(0, 1, -1, 1); B.grid(); return; }
      var cur = S.iv[S.k], len = S.b - S.a;
      var x0, x1;
      if (S.zoom && S.k > 0) { var w = Math.max(cur[1] - cur[0], 1e-14); x0 = cur[0] - w * 0.8; x1 = cur[1] + w * 0.8; }
      else { x0 = S.a - len * 0.15; x1 = S.b + len * 0.15; }
      var lo = Infinity, hi = -Infinity;
      for (var i = 0; i <= 100; i++) { var v = S.f(x0 + (x1 - x0) * i / 100); if (isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } }
      var span = (hi - lo) || 1;
      B.view(x0, x1, lo - span * 0.55, hi + span * 0.1);
      B.grid({ xl: 'x' });
      B.vband(cur[0], cur[1], B.C.band);
      B.fn(S.f, B.C.c1, 2.4);
      var base = lo - span * 0.12, step = span * 0.4 / 12;
      for (var j = 0; j <= Math.min(S.k, 11); j++) {
        var I = S.iv[j + Math.max(0, S.k - 11)], y = base - step * j;
        B.line(I[0], y, I[1], y, j === Math.min(S.k, 11) ? B.C.c2 : B.C.c4, 3);
      }
      B.dot(cur[0], 0, B.C.c2, 3.5); B.dot(cur[1], 0, B.C.c2, 3.5);
    }
    function info() {
      if (S.err) { out.innerHTML = '<span class="bad">' + MA.esc(S.err) + '</span>'; tb.innerHTML = ''; return; }
      var cur = S.iv[S.k], len = S.b - S.a;
      var need = Math.ceil(Math.log2(len / 1e-6));
      out.innerHTML = '第 ' + S.k + ' 步后的区间：[' + cur[0].toPrecision(12) + ', ' + cur[1].toPrecision(12) + ']，长度 (b − a)/2' + sup(S.k) + ' = ' + fmt(cur[1] - cur[0], 3) +
        '。根 ξ 一直被“套”在区间里。<br><span class="muted">要使误差小于 10⁻⁶，需要 (b − a)/2ᵏ < 10⁻⁶，即 k > log₂((b − a)·10⁶) ≈ ' + fmt(Math.log2(len * 1e6), 2) + '，所以 ' + need + ' 步就够了。</span>';
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'k'), h('th', null, 'aₖ'), h('th', null, 'bₖ'), h('th', null, '区间长度')));
      for (var i = 0; i <= S.k; i++) tab.appendChild(h('tr', { class: i === S.k ? 'hl' : '' }, h('td', null, String(i)), h('td', null, S.iv[i][0].toPrecision(12)), h('td', null, S.iv[i][1].toPrecision(12)), h('td', null, fmt(S.iv[i][1] - S.iv[i][0], 3))));
      tb.innerHTML = '';
      tb.appendChild(tab);
      tb.scrollTop = tb.scrollHeight;
    }
    build();
  };

  /* ================= bw：Bolzano-Weierstrass 定理的二分取子列 ================= */
  var BWS = [
    { n: 'sin n', f: 'sin n' },
    { n: '(−1)ⁿ + 1/n', f: '(-1)^n + 1/n' },
    { n: 'n√2 的小数部分', f: 'frac(n sqrt(2))' },
    { n: '(−1)ⁿ n/(n + 1)', f: '(-1)^n n/(n+1)' },
    { n: 'cos(n²)', f: 'cos(n^2)' }
  ];
  V.bw = function (body, o) {
    var M = 20000;
    var S = { a: null, steps: [], k: 4, err: '' };
    var c1 = U.ctl(body);
    var fin = U.textIn('$x_n=$', BWS[0].f, function () { run(); }, '10em');
    c1.appendChild(U.selectIn('有界数列', BWS.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      fin.input.value = BWS[+v].f; run();
    }).el);
    c1.appendChild(fin.el);
    c1.appendChild(U.btn('确定', run, true));
    var c2 = U.ctl(body);
    var sk = U.slider('二分次数', 0, 12, 1, S.k, function (v) { S.k = v; B.draw(); info(); }, String);
    c2.appendChild(sk.el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: '二分法选取收敛子列' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    function run() {
      S.err = '';
      try { S.a = seqArray(fin.input.value, M, 'seq'); } catch (e) { S.a = null; S.err = e.message; B.draw(); info(); return; }
      var lo = Infinity, hi = -Infinity;
      for (var n = 1; n <= M; n++) { var v = S.a[n]; if (!isFinite(v)) { S.err = '数列在 n = ' + n + ' 处没有定义'; S.a = null; B.draw(); info(); return; } lo = Math.min(lo, v); hi = Math.max(hi, v); }
      if (hi - lo < 1e-12) { lo -= 0.5; hi += 0.5; }
      var I = [lo, hi], last = 0, first = 1;
      S.steps = [{ I: I.slice(), n: first }];
      last = first;
      for (var k = 1; k <= 12; k++) {
        var mid = (I[0] + I[1]) / 2, cl = 0, cr = 0;
        for (var m = last + 1; m <= M; m++) { var x = S.a[m]; if (x >= I[0] && x <= mid) cl++; if (x >= mid && x <= I[1]) cr++; }
        if (!cl && !cr) break;
        I = cl >= cr ? [I[0], mid] : [mid, I[1]];
        var nk = 0;
        for (var q = last + 1; q <= M; q++) { var y = S.a[q]; if (y >= I[0] && y <= I[1]) { nk = q; break; } }
        if (!nk) break;
        S.steps.push({ I: I.slice(), n: nk, cl: cl, cr: cr });
        last = nk;
      }
      B.draw(); info();
    }
    function draw(B) {
      if (!S.a) { B.view(0, 10, -1, 1); B.grid(); return; }
      var K = Math.min(S.k, S.steps.length - 1);
      var nmax = Math.max(60, Math.ceil(S.steps[K].n * 1.15) + 5);
      var I0 = S.steps[0].I, span = I0[1] - I0[0];
      B.view(0, nmax, I0[0] - span * 0.06, I0[1] + span * 0.06);
      B.grid({ intX: true, xl: 'n' });
      for (var j = 1; j <= K; j++) {
        var I = S.steps[j].I;
        B.hband(I[0], I[1], j === K ? B.C.band2 : B.C.band);
      }
      var idx = idxList(1, nmax, 3000), rad = idx.length > 300 ? 1.3 : 2.4;
      B.clip();
      idx.forEach(function (n) { B.dot(n, S.a[n], B.C.c1, rad); });
      B.unclip();
      var pts = [];
      for (var i = 0; i <= K; i++) { var n = S.steps[i].n; pts.push([n, S.a[n]]); }
      B.poly(pts, B.C.c2, 1.2, false, null, [4, 3]);
      pts.forEach(function (p) { B.dot(p[0], p[1], B.C.c2, 4.5); });
    }
    function info() {
      if (S.err) { out.innerHTML = '<span class="bad">' + MA.esc(S.err) + '</span>'; tb.innerHTML = ''; return; }
      if (!S.a) return;
      var K = Math.min(S.k, S.steps.length - 1), I = S.steps[K].I;
      var t = '经过 ' + K + ' 次二分，区间缩小为 [' + fmt(I[0], 6) + ', ' + fmt(I[1], 6) + ']，长度 ' + fmt(I[1] - I[0], 3) + '；选出的子列 x<sub>n₁</sub>, x<sub>n₂</sub>, … 的下标严格增加，值被套在越来越小的区间里（红色大点）。';
      if (S.k > S.steps.length - 1) t += '<br><span class="bad">在前 ' + M + ' 项中已找不到更多的项，只能做到第 ' + K + ' 步。</span>';
      t += '<br><span class="muted">证明中每次选“含有无穷多项”的那一半；计算机只能看有限项，这里用“剩余项中较多的那一半”来模拟。</span>';
      out.innerHTML = t;
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'k'), h('th', null, '区间 Iₖ'), h('th', null, '下标 nₖ'), h('th', null, 'x(nₖ)')));
      for (var i = 0; i <= K; i++) {
        var s = S.steps[i];
        tab.appendChild(h('tr', { class: i === K ? 'hl' : '' }, h('td', null, String(i)), h('td', null, '[' + fmt(s.I[0], 6) + ', ' + fmt(s.I[1], 6) + ']'), h('td', null, String(s.n)), h('td', null, fmt(S.a[s.n], 8))));
      }
      tb.innerHTML = '';
      tb.appendChild(tab);
    }
    run();
  };

  /* ================= cauchy：Cauchy 收敛原理 ================= */
  var CA = [
    { n: 'Σ 1/k²（收敛）', kind: 'sum', f: '1/k^2' },
    { n: 'Σ (−1)ᵏ⁺¹/k（收敛）', kind: 'sum', f: '(-1)^(k+1)/k' },
    { n: 'Σ 1/k!（收敛到 e − 1）', kind: 'sum', f: '1/k!' },
    { n: 'Fibonacci 比 xₙ₊₁ = 1 + 1/xₙ（收敛）', kind: 'rec', f: '1 + 1/x', x1: 1 },
    { n: 'Hₙ = Σ 1/k（发散）', kind: 'sum', f: '1/k' },
    { n: '√n（相邻项之差 → 0，但发散）', kind: 'seq', f: 'sqrt(n)' },
    { n: 'sin n（有界，但发散）', kind: 'seq', f: 'sin n' }
  ];
  V.cauchy = function (body, o) {
    var M = 200000;
    var S = { a: null, mx: null, mn: null, eps: 0.01, N: -1, err: '', p: CA[0] };
    var c1 = U.ctl(body);
    c1.appendChild(U.selectIn('数列', CA.map(function (p, i) { return [i, p.n]; }), function (v) { S.p = CA[+v]; compute(); }).el);
    var c2 = U.ctl(body);
    c2.appendChild(epsSlider(0.01, function (e) { S.eps = e; findN(); B.draw(); info(); }).el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: 'Cauchy 收敛原理演示' });
    var out = U.outBox(body);
    function compute() {
      S.err = '';
      try { S.a = seqArray(S.p.f, M, S.p.kind, S.p.x1); } catch (e) { S.a = null; S.err = e.message; B.draw(); info(); return; }
      S.mx = new Float64Array(M + 2); S.mn = new Float64Array(M + 2);
      S.mx[M + 1] = -Infinity; S.mn[M + 1] = Infinity;
      for (var n = M; n >= 1; n--) { S.mx[n] = Math.max(S.a[n], S.mx[n + 1]); S.mn[n] = Math.min(S.a[n], S.mn[n + 1]); }
      findN(); B.draw(); info();
    }
    function osc(N) { return S.mx[N + 1] - S.mn[N + 1]; }
    function findN() {
      if (!S.a) return;
      var lo = 1, hi = M - 1;
      if (osc(hi) >= S.eps) { S.N = -1; return; }
      while (lo < hi) { var mid = (lo + hi) >> 1; if (osc(mid) < S.eps) hi = mid; else lo = mid + 1; }
      S.N = lo > M / 4 ? -1 : lo;
    }
    function draw(B) {
      if (!S.a) { B.view(0, 10, -1, 1); B.grid(); return; }
      var Nv = S.N < 0 ? 200 : Math.max(40, Math.min(M, S.N * 3));
      var r = rangeOf(S.a, 1, Nv);
      B.view(0, Nv + 1, r[0], r[1]);
      B.grid({ intX: true, xl: 'n' });
      if (S.N >= 0) {
        var tl = S.mn[S.N + 1], th = S.mx[S.N + 1];
        var ctx = B.ctx;
        B.clip();
        ctx.fillStyle = B.C.band;
        ctx.fillRect(B.X(S.N + 0.5), B.Y(th), B.X(Nv + 1) - B.X(S.N + 0.5), Math.max(2, B.Y(tl) - B.Y(th)));
        B.unclip();
        B.line(S.N + 0.5, B.y0, S.N + 0.5, B.y1, B.C.c4, 1.5);
        B.text('N = ' + S.N, S.N + 0.5, B.y1, B.C.c4, 'left', 'top');
      }
      var idx = idxList(1, Nv, 2400), rad = idx.length > 150 ? 1.5 : 2.8;
      B.clip();
      idx.forEach(function (n) { B.dot(n, S.a[n], S.N >= 0 && n > S.N ? B.C.c1 : B.C.c2, rad); });
      B.unclip();
    }
    function sig(v) { var a = Math.abs(v); return a === 0 ? '0' : fmt(v, Math.max(3, Math.ceil(-Math.log10(a)) + 3)); }
    function info() {
      if (S.err) { out.innerHTML = '<span class="bad">' + MA.esc(S.err) + '</span>'; return; }
      if (!S.a) return;
      var e = p3(S.eps), t;
      if (S.N >= 0) {
        t = '<span class="good">ε = ' + e + '：取 N = ' + S.N + '</span>，则 n > N 以后所有项的最大值与最小值之差 ' + sig(osc(S.N)) + ' < ε，于是对任意 m, n > N 都有 |xₘ − xₙ| < ε（后面的项都挤在宽度小于 ε 的带子里）。';
      } else {
        t = '<span class="bad">ε = ' + e + '：在检验范围内找不到这样的 N</span>。例如取 N = 1000，n > N 后各项的最大值与最小值之差仍为 ' + sig(osc(1000)) + '（只算到第 ' + M + ' 项）。';
        if (S.p.f === '1/k') t += ' 事实上 H₂ₙ − Hₙ ≥ 1/2 对一切 n 成立，ε ≤ 1/2 时永远找不到 N。';
        if (S.p.f === 'sqrt(n)') t += ' 虽然 √(n+1) − √n → 0，但 √(4n) − √n = √n → +∞：Cauchy 条件要求的是“任意两项”而不只是“相邻两项”。';
      }
      t += '<br><span class="muted">Cauchy 收敛原理的好处：不需要事先知道极限是多少，只看数列自身的项。</span>';
      out.innerHTML = t;
    }
    compute();
  };
})();
