/* viz-func.js —— 互动演示组件（三）：第三章（函数极限与连续函数）
 * epsdelta（ε-δ 定义）、heine（用数列检验函数极限）、disc（不连续点的类型）、order（无穷小量的阶）、
 * ivt（中间值定理与最值定理）、unif（一致连续：δ 能否与 x₀ 无关）
 * 各组件都接受可选属性 p（初始预设的序号，从 0 开始）。
 */
(function () {
  'use strict';
  var MA = window.MA, V = MA.viz, U = MA.vizUtil;
  function h() { return MA.h.apply(null, arguments); }
  var fmt = U.fmt, sup = U.sup;
  function p3(x) { return String(+x.toPrecision(3)); }
  /** 安全求值：出错或得到非数值时返回 NaN */
  function ev(f, x) { var y; try { y = f(x); } catch (e) { return NaN; } return typeof y === 'number' ? y : NaN; }
  function pick(o, n) { var i = parseInt(o && o.p, 10); return i >= 0 && i < n ? i : 0; }
  function logSlider(lab, lo, hi, init, onInput) {
    return U.slider(lab, lo, hi, 0.01, Math.log10(init), function (v) { onInput(Math.pow(10, v)); },
      function (v) { return p3(Math.pow(10, v)); });
  }
  function check(lab, on, onChange) {
    var cb = h('input', { type: 'checkbox' });
    cb.checked = !!on;
    cb.addEventListener('change', function () { onChange(cb.checked); });
    return { el: h('label', null, cb, lab), input: cb };
  }
  function rgba(c, a) {
    var m = /^#([0-9a-f]{6})$/i.exec(String(c).trim());
    if (!m) return c;
    var n = parseInt(m[1], 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }
  /** 用采样值的分位数确定纵坐标范围（避免被极大的值压扁），extra 中的有限值一定包含在内 */
  function yRange(f, xa, xb, extra, qlo, qhi) {
    var v = [], n = 400;
    for (var i = 0; i <= n; i++) { var y = ev(f, xa + (xb - xa) * i / n); if (isFinite(y)) v.push(y); }
    var lo, hi;
    if (v.length) {
      v.sort(function (p, q) { return p - q; });
      lo = v[Math.floor((v.length - 1) * (qlo == null ? 0.03 : qlo))];
      hi = v[Math.ceil((v.length - 1) * (qhi == null ? 0.97 : qhi))];
    } else { lo = -1; hi = 1; }
    (extra || []).forEach(function (y) { if (isFinite(y)) { lo = Math.min(lo, y); hi = Math.max(hi, y); } });
    if (!(hi - lo > 1e-12)) { lo -= 0.5; hi += 0.5; }
    var m = (hi - lo) * 0.12;
    return [lo - m, hi + m];
  }
  function lgTick(v) { return Math.abs(v - Math.round(v)) < 1e-9 ? '10' + sup(Math.round(v)) : ''; }
  function sameV(u, v) {
    if (!isFinite(u) || !isFinite(v)) return u === v;
    return Math.abs(u - v) <= 1e-4 * Math.max(1, Math.abs(u));
  }
  function show(v) { return v === Infinity ? '+∞' : v === -Infinity ? '−∞' : isNaN(v) ? '不存在' : fmt(Math.abs(v) < 1e-7 ? 0 : +v.toPrecision(6), 6); }
  function badBox(out, msg) { out.innerHTML = '<span class="bad">无法计算：' + MA.esc(msg) + '</span>'; }

  /* ================= epsdelta：函数极限的 ε-δ 定义 ================= */
  var ED = [
    { n: 'x² → 9（x → 3）', f: 'x^2', x0: '3', L: '9', R: 2, th: function (e) { return Math.min(1, e / 7); }, ths: 'δ = min{1, ε/7}' },
    { n: '(x² − 1)/(x − 1) → 2（x → 1）', f: '(x^2-1)/(x-1)', x0: '1', L: '2', R: 1, th: function (e) { return e; }, ths: 'δ = ε' },
    { n: '(x² − 1)/(2x² − x − 1) → 2/3（x → 1）', f: '(x^2-1)/(2x^2-x-1)', x0: '1', L: '2/3', R: 1.2, th: function (e) { return Math.min(0.5, 6 * e); }, ths: 'δ = min{1/2, 6ε}' },
    { n: '√x → 2（x → 4）', f: 'sqrt(x)', x0: '4', L: '2', R: 3, th: function (e) { return Math.min(4, 2 * e); }, ths: 'δ = min{4, 2ε}' },
    { n: 'sin x / x → 1（x → 0）', f: 'sin(x)/x', x0: '0', L: '1', R: 4, th: function (e) { return Math.min(Math.PI / 2, Math.sqrt(2 * e)); }, ths: 'δ = min{π/2, √(2ε)}' },
    { n: 'x sin(1/x) → 0（x → 0）', f: 'x*sin(1/x)', x0: '0', L: '0', R: 0.5, th: function (e) { return e; }, ths: 'δ = ε' },
    { n: 'sgn x，猜 A = 1（x → 0）', f: 'sgn(x)', x0: '0', L: '1', R: 1 },
    { n: 'sin(1/x)，猜 A = 0（x → 0）', f: 'sin(1/x)', x0: '0', L: '0', R: 0.5 }
  ];
  V.epsdelta = function (body, o) {
    var i0 = pick(o, ED.length), P0 = ED[i0];
    var S = { f: null, x0: 0, L: 0, R: 1, eps: 0.5, del: 0.1, dmax: 0, none: false, bad: [], nb: 0, th: null, ths: '', mode: 'max', zoom: true, err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('例子', ED.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(ED[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', P0.f, custom, '10em'), xin = U.textIn('$x_0=$', P0.x0, custom, '4em'), lin = U.textIn('$A=$', P0.L, custom, '4em');
    [fin, xin, lin].forEach(function (x) { c2.appendChild(x.el); });
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    c3.appendChild(logSlider('$\\varepsilon=$', -3, 0, S.eps, function (e) { S.eps = e; follow(); }).el);
    var sd = logSlider('$\\delta=$', -6, 0, 0.1, function (d) { S.mode = 'manual'; S.del = d; testDel(); B.draw(); info(); });
    c3.appendChild(sd.el);
    var c4 = U.ctl(body);
    c4.appendChild(U.btn('取最大的 δ', function () { S.mode = 'max'; follow(); }));
    var bth = U.btn('用例题中的 δ', function () { S.mode = 'th'; follow(); });
    c4.appendChild(bth);
    c4.appendChild(check('放大到 x₀ 附近', true, function (on) { S.zoom = on; B.draw(); }).el);
    var B = U.board(body, { ratio: 0.56, draw: draw, label: 'ε-δ 定义演示' });
    var out = U.outBox(body);
    function load(p) {
      fin.input.value = p.f; xin.input.value = p.x0; lin.input.value = p.L;
      S.th = p.th || null; S.ths = p.ths || ''; S.R = p.R || 1; S.mode = S.th ? 'th' : 'max';
      compute();
    }
    function custom() { sel.input.value = 'c'; S.th = null; S.ths = ''; S.R = 1; S.mode = 'max'; compute(); }
    function compute() {
      S.err = '';
      try {
        S.f = U.compileF(fin.input.value, ['x']);
        S.x0 = MA.expr.value(xin.input.value); S.L = MA.expr.value(lin.input.value);
        if (!isFinite(S.x0) || !isFinite(S.L)) throw new Error('x₀ 与 A 必须是有限的数');
      } catch (e) { S.f = null; S.err = e.message; B.draw(); info(); return; }
      bth.style.display = S.th ? '' : 'none';
      var lg = Math.log10(S.R);
      sd.input.min = String(+(lg - 6).toFixed(2)); sd.input.max = String(+lg.toFixed(2));
      follow();
    }
    function bad(x) { return !(Math.abs(ev(S.f, x) - S.L) < S.eps); }
    /** 在 x₀ 的一侧（s = ±1）找离 x₀ 最近的“坏点”的距离；在搜索范围 R 内没有坏点时返回 R */
    function side(s) {
      var K = 6400, prev = 0;
      for (var k = 0; k <= K; k++) {
        var t = S.R * Math.pow(10, -8 + 8 * k / K);
        if (bad(S.x0 + s * t)) {
          var lo = prev, hi = t;
          for (var j = 0; j < 40; j++) { var m = (lo + hi) / 2; if (bad(S.x0 + s * m)) hi = m; else lo = m; }
          return lo;
        }
        prev = t;
      }
      return S.R;
    }
    function follow() {
      if (!S.f) return;
      S.dmax = Math.min(side(-1), side(1));
      S.none = S.dmax < S.R * 1e-6;
      if (S.mode === 'th' && S.th) S.del = S.th(S.eps);
      else if (S.mode === 'max' && !S.none) S.del = S.dmax * 0.98;
      S.del = Math.max(S.R * 1e-6, Math.min(S.R, S.del || S.R / 10));
      sd.set(Math.log10(S.del));
      testDel(); B.draw(); info();
    }
    /** 检验当前的 δ：在 0 < |x − x₀| < δ 中均匀取点和按几何级数取点 */
    function testDel() {
      S.bad = []; S.nb = 0;
      if (!S.f) return;
      var N = 1500;
      for (var s = -1; s <= 1; s += 2) {
        for (var k = 1; k <= N; k++) {
          var ts = [S.del * k / N, S.del * Math.pow(10, -8 * k / N)];
          for (var j = 0; j < 2; j++) {
            var x = S.x0 + s * ts[j] * (1 - 1e-6);
            if (bad(x)) { S.nb++; if (S.bad.length < 600) S.bad.push(x); }
          }
        }
      }
    }
    function draw(B) {
      if (!S.f) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var x0 = S.x0, L = S.L, e = S.eps, d = S.del, xa, xb;
      if (S.zoom) { xa = x0 - 2.5 * d; xb = x0 + 2.5 * d; } else { xa = x0 - S.R; xb = x0 + S.R; }
      var r = yRange(S.f, xa, xb, [L - e, L + e]);
      if (S.zoom) r = [Math.max(r[0], L - 5 * e), Math.min(r[1], L + 5 * e)];
      B.view(xa, xb, r[0], r[1]);
      B.grid({ xl: 'x' });
      B.hband(L - e, L + e, B.C.band);
      B.vband(x0 - d, x0 + d, rgba(B.C.c3, 0.08));
      B.poly([[x0 - d, L - e], [x0 + d, L - e], [x0 + d, L + e], [x0 - d, L + e]], B.C.c3, 1.6, true);
      B.line(xa, L, xb, L, B.C.c3, 1.2, [6, 4]);
      B.line(x0, r[0], x0, r[1], B.C.muted, 1, [4, 4]);
      B.fn(S.f, B.C.c1, 2.2);
      B.clip();
      S.bad.forEach(function (x) { var y = ev(S.f, x); if (isFinite(y)) B.dot(x, y, B.C.c2, 2.4); });
      B.unclip();
      var fx0 = ev(S.f, x0);
      if (isFinite(fx0) && Math.abs(fx0 - L) > 1e-12 && fx0 > r[0] && fx0 < r[1]) { B.dot(x0, fx0, B.C.c4, 4); B.text(' f(x₀)', x0, fx0, B.C.c4, 'left', 'bottom'); }
      B.dot(x0, L, B.C.c3, 5, true);
      B.text('A + ε', xa, L + e, B.C.c3, 'left', 'bottom');
      B.text('A − ε', xa, L - e, B.C.c3, 'left', 'top');
      B.text('x₀ − δ ', x0 - d, r[0], B.C.c3, 'right', 'bottom');
      B.text(' x₀ + δ', x0 + d, r[0], B.C.c3, 'left', 'bottom');
    }
    function info() {
      if (S.err) { badBox(out, S.err); return; }
      if (!S.f) return;
      var e = p3(S.eps), d = p3(S.del), t;
      if (S.none) {
        t = '<span class="bad">取 ε = ' + e + '，找不到 δ</span>：无论 δ 多小，去心邻域 0 &lt; |x − x₀| &lt; δ 里总有 |f(x) − A| ≥ ε 的点（红点）。所以 A 不是 f 在 x₀ 处的极限。';
      } else {
        t = '取 ε = ' + e + '，能用的 δ 最大约为 ' + p3(S.dmax) + (S.dmax >= S.R * 0.999 ? '（已到演示的搜索范围）' : '') + '。';
        if (S.nb === 0) t += '<br><span class="good">δ = ' + d + ' 可以</span>：只要 0 &lt; |x − x₀| &lt; δ，图像就落在绿色矩形里，即 |f(x) − A| &lt; ε。';
        else t += '<br><span class="bad">δ = ' + d + ' 太大</span>：在 0 &lt; |x − x₀| &lt; δ 中有 ' + S.nb + ' 个样本点跑出了 ε 带（红点）。';
        if (S.th) {
          var td = S.th(S.eps);
          t += '<br>例题中的取法 ' + S.ths + ' 给出 δ = ' + p3(td) + (td < S.dmax * 0.97 ? '，比最大的 δ 小：放缩会“浪费”一些，但定义只要求 δ 存在。' : '。');
        }
      }
      t += '<br><span class="muted">空心圆圈是 (x₀, A)；x₀ 处的函数值（有定义时画成实心点）与极限无关。计算机只检验了有限个点，数值实验只能帮助理解，不能代替证明。</span>';
      out.innerHTML = t;
    }
    load(P0);
  };

  /* ================= heine：用数列检验函数极限 ================= */
  var HE = [
    { n: 'sin(1/x)（x → 0）', f: 'sin(1/x)', x0: '0', s1: '1/(n*pi)', s2: '1/(2*n*pi + pi/2)' },
    { n: 'sgn x（x → 0）', f: 'sgn(x)', x0: '0', s1: '1/n', s2: '-1/n' },
    { n: '[x]（x → 1）', f: 'floor(x)', x0: '1', s1: '1 + 1/n', s2: '1 - 1/(n+1)' },
    { n: 'e^(1/x)（x → 0）', f: 'e^(1/x)', x0: '0', s1: '-1/n', s2: '1/n' },
    { n: 'x sin(1/x)（x → 0）', f: 'x*sin(1/x)', x0: '0', s1: '2/((2*n+1)*pi)', s2: '(-1)^n/n' },
    { n: 'sin x / x（x → 0）', f: 'sin(x)/x', x0: '0', s1: '1/n', s2: '(-1)^n/sqrt(n)' }
  ];
  V.heine = function (body, o) {
    var i0 = pick(o, HE.length), P0 = HE[i0];
    var S = { f: null, x0: 0, a: null, b: null, N: 30, err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('例子', HE.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(HE[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', '', custom, '8em'), xin = U.textIn('$x_0=$', '', custom, '3.5em');
    var ain = U.textIn('$x_n=$', '', custom, '9em'), bin = U.textIn('$y_n=$', '', custom, '9em');
    [fin, xin, ain, bin].forEach(function (x) { c2.appendChild(x.el); });
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    c3.appendChild(U.slider('显示前 $N$ 项', 5, 200, 1, S.N, function (v) { S.N = v; B1.draw(); B2.draw(); }, String).el);
    var B1 = U.board(body, { ratio: 0.5, draw: draw1, label: '函数图像与两个数列' });
    var B2 = U.board(body, { ratio: 0.34, draw: draw2, label: '函数值数列 f(xₙ) 与 f(yₙ)' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    function load(p) { fin.input.value = p.f; xin.input.value = p.x0; ain.input.value = p.s1; bin.input.value = p.s2; compute(); }
    function custom() { sel.input.value = 'c'; compute(); }
    function compute() {
      S.err = '';
      try {
        S.f = U.compileF(fin.input.value, ['x']);
        S.x0 = MA.expr.value(xin.input.value);
        if (!isFinite(S.x0)) throw new Error('x₀ 必须是有限的数');
        S.a = U.compileF(ain.input.value, ['n']); S.b = U.compileF(bin.input.value, ['n']);
      } catch (e) { S.f = null; S.err = e.message; }
      B1.draw(); B2.draw(); info();
    }
    function X(s, n) { return ev(s === 1 ? S.a : S.b, n); }
    /** 舍去浮点舍入误差：sin(nπ) 之类的值算出来是 10⁻¹⁶ 量级，表中直接显示 0 */
    function tiny(v) { return Math.abs(v) < 1e-9 ? 0 : v; }
    function F(x) { return ev(S.f, x); }
    /** 用 n = 10⁵、10⁵+1、10⁶、10⁶+1 处的值估计 f(xₙ) 的极限 */
    function est(s) {
      var ns = [1e5, 1e5 + 1, 1e6, 1e6 + 1];
      var xs = ns.map(function (n) { return X(s, n); }), v = xs.map(F);
      var ok = xs.every(function (x) { return isFinite(x) && x !== S.x0; }) &&
        Math.abs(xs[3] - S.x0) < 0.02 * Math.max(1, Math.abs(S.x0)) && Math.abs(xs[3] - S.x0) <= Math.abs(X(s, 10) - S.x0) + 1e-12;
      if (v.every(function (y) { return y > 1e8; })) return { ok: ok, v: Infinity, inf: true };
      if (v.every(function (y) { return y < -1e8; })) return { ok: ok, v: -Infinity, inf: true };
      if (v.every(isFinite)) {
        var mx = Math.max.apply(null, v), mn = Math.min.apply(null, v);
        if (mx - mn < 1e-3 * Math.max(1, Math.abs(v[3]))) return { ok: ok, v: Math.abs(v[3]) < 1e-7 ? 0 : +v[3].toPrecision(6) };
      }
      return { ok: ok, v: NaN };
    }
    function vals(s, N) { var r = []; for (var n = 1; n <= N; n++) r.push([X(s, n), F(X(s, n))]); return r; }
    function draw1(B) {
      if (!S.f) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var N = S.N, A = vals(1, N), Bv = vals(2, N), E = [est(1), est(2)], R = 0, ext = [];
      A.concat(Bv).forEach(function (p) { var d = Math.abs(p[0] - S.x0); if (isFinite(d) && d > R) R = d; });
      if (!(R > 0)) R = 1;
      [A, Bv].forEach(function (L, j) { if (!E[j].inf) L.forEach(function (p) { ext.push(p[1]); }); });
      var xa = S.x0 - 1.15 * R, xb = S.x0 + 1.15 * R, r = yRange(S.f, xa, xb, ext, 0.05, 0.85);
      B.view(xa, xb, r[0], r[1]);
      B.grid({ xl: 'x' });
      B.line(S.x0, r[0], S.x0, r[1], B.C.muted, 1, [4, 4]);
      B.fn(S.f, B.C.c1, 1.6);
      B.clip();
      [[A, B.C.c2], [Bv, B.C.c3]].forEach(function (q) {
        q[0].forEach(function (p) { if (isFinite(p[0]) && isFinite(p[1])) B.dot(p[0], p[1], q[1], 3.2); });
      });
      B.unclip();
    }
    function draw2(B) {
      if (!S.f) { B.view(0, 1, -1, 1); B.grid(); return; }
      var N = S.N, E = [est(1), est(2)], all = [], cols = [B.C.c2, B.C.c3];
      [1, 2].forEach(function (s, j) {
        if (E[j].inf) return;
        vals(s, N).forEach(function (p) { if (isFinite(p[1])) all.push(p[1]); });
        if (isFinite(E[j].v)) all.push(E[j].v);
      });
      var lo = -1, hi = 1;
      if (all.length) {
        all.sort(function (p, q) { return p - q; });
        lo = all[Math.floor((all.length - 1) * 0.02)]; hi = all[Math.ceil((all.length - 1) * 0.98)];
      }
      if (!(hi - lo > 1e-9)) { lo -= 0.5; hi += 0.5; }
      var m = (hi - lo) * 0.15;
      B.view(0, N + 1, lo - m, hi + m);
      B.grid({ intX: true, xl: 'n' });
      E.forEach(function (e, j) { if (isFinite(e.v)) B.line(0, e.v, N + 1, e.v, cols[j], 1.2, [6, 4]); });
      [1, 2].forEach(function (s, j) {
        vals(s, N).forEach(function (p, k) {
          var y = p[1], n = k + 1;
          if (y > B.y1) B.dot(n, B.y1 - (B.y1 - B.y0) * 0.03, cols[j], 3, true);
          else if (y < B.y0) B.dot(n, B.y0 + (B.y1 - B.y0) * 0.03, cols[j], 3, true);
          else if (isFinite(y)) B.dot(n, y, cols[j], 3);
        });
      });
    }
    function info() {
      if (S.err) { badBox(out, S.err); tb.innerHTML = ''; return; }
      var A = est(1), Bv = est(2), t;
      t = '<span style="color:var(--c2)">● 数列 xₙ</span>：f(xₙ) → ' + show(A.v) + '；<span style="color:var(--c3)">● 数列 yₙ</span>：f(yₙ) → ' + show(Bv.v) + '。<br>';
      if (!A.ok || !Bv.ok) t += '<span class="bad">注意：Heine 定理要求数列趋于 x₀ 且各项都不等于 x₀，这里的数列看来不满足。</span>';
      else if (isNaN(A.v) || isNaN(Bv.v)) t += '<span class="bad">沿某个数列，函数值数列没有极限</span>：由 Heine 定理，lim f(x) 不存在。';
      else if (!sameV(A.v, Bv.v)) t += '<span class="bad">两个数列给出不同的结果</span>：由 Heine 定理，lim f(x) 不存在（既没有有限极限，也不是确定符号的 ∞）。';
      else t += '<span class="good">两个数列给出相同的结果 ' + show(A.v) + '</span>。这与极限存在相容；但只检验两个（甚至无穷多个特殊的）数列不能证明极限存在——Heine 定理要求对<b>一切</b>这样的数列成立，证明时通常直接用 ε-δ 定义。';
      t += '<br><span class="muted">极限是用 n = 10⁵、10⁶ 附近的值估计的，数值实验只能帮助理解，不能代替证明。</span>';
      out.innerHTML = t;
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'n'), h('th', null, 'xₙ'), h('th', null, 'f(xₙ)'), h('th', null, 'yₙ'), h('th', null, 'f(yₙ)')));
      [1, 2, 5, 10, 100, 1000, 1e4, 1e5, 1e6].forEach(function (n) {
        var x = X(1, n), y = X(2, n);
        tab.appendChild(h('tr', null, h('td', null, String(n)), h('td', null, fmt(x, 8)), h('td', null, fmt(tiny(F(x)), 8)), h('td', null, fmt(y, 8)), h('td', null, fmt(tiny(F(y)), 8))));
      });
      tb.innerHTML = '';
      tb.appendChild(tab);
    }
    load(P0);
  };

  /* ================= disc：不连续点的类型（按陈纪修教材的分类） ================= */
  var DI = [
    { n: 'sgn x（x₀ = 0）', f: 'sgn(x)', x0: '0', v: '0', R: 1, note: '左极限 −1，右极限 1，跃度为 2。' },
    { n: '[x]（x₀ = 1）', f: 'floor(x)', x0: '1', v: '1', R: 1, note: '左极限 0，右极限 1 = f(1)：右连续而不左连续。取整函数在每个整数处都是跳跃点。' },
    { n: 'arctan(1/x)（x₀ = 0）', f: 'arctan(1/x)', x0: '0', v: '无定义', R: 2, note: '左极限 −π/2，右极限 π/2。' },
    { n: '(x² − 1)/|x − 1|（x₀ = 1）', f: '(x^2-1)/abs(x-1)', x0: '1', v: '无定义', R: 1, note: '化简得 x < 1 时为 −(x + 1)，x > 1 时为 x + 1，左右极限 −2 与 2。' },
    { n: 'sin x / x（x₀ = 0）', f: 'sin(x)/x', x0: '0', v: '无定义', R: 3, note: '极限存在（等于 1）而函数在 0 处无定义：补充定义 f(0) = 1 就连续了。' },
    { n: 'x²，但 f(1) = 2（x₀ = 1）', f: 'x^2', x0: '1', v: '2', R: 1, note: '极限 1 存在，但不等于函数值 2：把 f(1) 改成 1 就连续了。' },
    { n: 'x sin(1/x)，f(0) = 0（x₀ = 0）', f: 'x*sin(1/x)', x0: '0', v: '0', R: 0.4, note: '|x sin(1/x)| ≤ |x|，极限为 0 = f(0)，所以连续——尽管图像在 0 附近振荡无穷多次。' },
    { n: '1/x（x₀ = 0）', f: '1/x', x0: '0', v: '无定义', R: 1, note: '左、右极限分别是 −∞ 与 +∞，都不是有限数：第二类不连续点（无穷型）。' },
    { n: 'e^(1/x)（x₀ = 0）', f: 'e^(1/x)', x0: '0', v: '无定义', R: 1, note: '左极限 0 存在，右极限为 +∞：只要有一侧极限不存在，就是第二类不连续点。' },
    { n: 'sin(1/x)（x₀ = 0）', f: 'sin(1/x)', x0: '0', v: '无定义', R: 0.4, note: '在 −1 与 1 之间无限次振荡，左右极限都不存在：第二类不连续点（振荡型）。' }
  ];
  var KIND = ['连续', '跳跃不连续点（陈纪修教材称为第一类不连续点）', '第二类不连续点', '可去不连续点（陈纪修教材称为第三类不连续点）'];
  V.disc = function (body, o) {
    var i0 = pick(o, DI.length), P0 = DI[i0];
    var S = { f: null, x0: 0, fv: NaN, R: 1, z: 0, note: '', err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('例子', DI.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(DI[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', '', custom, '10em'), xin = U.textIn('$x_0=$', '', custom, '3.5em'), vin = U.textIn('$f(x_0)=$', '', custom, '5em');
    [fin, xin, vin].forEach(function (x) { c2.appendChild(x.el); });
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    var sz = U.slider('放大倍数', 0, 3, 0.01, 0, function (v) { S.z = v; B.draw(); }, function (v) { return p3(Math.pow(10, v)) + '×'; });
    c3.appendChild(sz.el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: '不连续点附近的图像' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    function load(p) { fin.input.value = p.f; xin.input.value = p.x0; vin.input.value = p.v; S.R = p.R; S.note = p.note; sz.set(0); S.z = 0; compute(); }
    function custom() { sel.input.value = 'c'; S.R = 1; S.note = ''; compute(); }
    function compute() {
      S.err = '';
      try {
        S.f = U.compileF(fin.input.value, ['x']);
        S.x0 = MA.expr.value(xin.input.value);
        if (!isFinite(S.x0)) throw new Error('x₀ 必须是有限的数');
        var vs = vin.input.value.trim();
        if (!vs) S.fv = ev(S.f, S.x0);
        else if (/无定义|^[—-]$/.test(vs)) S.fv = NaN;
        else S.fv = MA.expr.value(vs);
        if (!isFinite(S.fv)) S.fv = NaN;
      } catch (e) { S.f = null; S.err = e.message; }
      B.draw(); info();
    }
    function F(x) { return ev(S.f, x); }
    /** 用 h = 10⁻⁵～10⁻⁹ 处的函数值估计单侧极限（s = −1 左侧，s = 1 右侧） */
    function oneSide(s) {
      var v = [];
      for (var k = 0; k <= 12; k++) v.push(F(S.x0 + s * Math.pow(10, -5 - k / 3)));
      if (v.every(function (y) { return y > 1e4; }) && v[12] >= v[0] * 50) return Infinity;
      if (v.every(function (y) { return y < -1e4; }) && v[12] <= v[0] * 50) return -Infinity;
      if (v.every(isFinite)) {
        var tail = v.slice(3), mx = Math.max.apply(null, tail), mn = Math.min.apply(null, tail);
        if (mx - mn < 1e-4 * Math.max(1, Math.abs(v[12]))) return Math.abs(v[12]) < 1e-7 ? 0 : +v[12].toPrecision(6);
      }
      return NaN;
    }
    function kind(Lm, Lp, fv) {
      if (isFinite(Lm) && isFinite(Lp)) {
        if (!sameV(Lm, Lp)) return 1;
        return isFinite(fv) && sameV(fv, Lm) ? 0 : 3;
      }
      return 2;
    }
    function draw(B) {
      if (!S.f) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var w = S.R / Math.pow(10, S.z), x0 = S.x0, Lm = oneSide(-1), Lp = oneSide(1);
      var r = yRange(S.f, x0 - w, x0 + w, [Lm, Lp, S.fv]);
      B.view(x0 - w, x0 + w, r[0], r[1]);
      B.grid({ xl: 'x' });
      B.line(x0, r[0], x0, r[1], B.C.muted, 1, [4, 4]);
      B.fn(S.f, B.C.c1, 2.2, null, x0 - w, x0 - w * 1e-7);
      B.fn(S.f, B.C.c1, 2.2, null, x0 + w * 1e-7, x0 + w);
      if (isFinite(Lm)) { B.dot(x0, Lm, B.C.c5, 5, true); B.text('f(x₀−) ', x0, Lm, B.C.c5, 'right', 'bottom'); }
      if (isFinite(Lp)) { B.dot(x0, Lp, B.C.c6, 5, true); B.text(' f(x₀+)', x0, Lp, B.C.c6, 'left', 'top'); }
      if (isFinite(S.fv)) { B.dot(x0, S.fv, B.C.c4, 4.5); B.text(' f(x₀)', x0, S.fv, B.C.c4, 'left', 'bottom'); }
    }
    function info() {
      if (S.err) { badBox(out, S.err); tb.innerHTML = ''; return; }
      var Lm = oneSide(-1), Lp = oneSide(1), k = kind(Lm, Lp, S.fv), t;
      t = '左极限 f(x₀−) ≈ ' + show(Lm) + '；右极限 f(x₀+) ≈ ' + show(Lp) + '；f(x₀) ' + (isFinite(S.fv) ? '= ' + show(S.fv) : '无定义') + '。<br>';
      t += k === 0 ? '<span class="good">结论：f 在 x₀ 处连续</span>（左右极限相等，且等于函数值）。' : '<span class="bad">结论：x₀ 是' + KIND[k] + '</span>';
      if (k === 1) t += '，跃度 f(x₀+) − f(x₀−) ≈ ' + show(Lp - Lm) + '。';
      else if (k === 2) t += '：至少有一侧的极限不存在（趋于 ∞ 也算不存在有限极限）。';
      else if (k === 3) t += '：极限存在，但' + (isFinite(S.fv) ? '不等于函数值' : '函数在 x₀ 处没有定义') + '；令 f(x₀) = ' + show(Lm) + ' 就连续了。';
      if (S.note) t += '<br>' + MA.esc(S.note);
      t += '<br><span class="muted">陈纪修教材把跳跃点称为第一类、至少一侧极限不存在的称为第二类、可去的称为第三类不连续点；不少教材则把跳跃与可去统称为“第一类间断点”。左右极限是用 h = 10⁻⁵～10⁻⁹ 处的函数值估计的，只能帮助理解，不能代替证明。</span>';
      out.innerHTML = t;
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'h'), h('th', null, 'f(x₀ − h)'), h('th', null, 'f(x₀ + h)')));
      for (var j = 1; j <= 6; j++) {
        var hh = Math.pow(10, -j);
        tab.appendChild(h('tr', null, h('td', null, '10' + sup(-j)), h('td', null, fmt(F(S.x0 - hh), 8)), h('td', null, fmt(F(S.x0 + hh), 8))));
      }
      tb.innerHTML = '';
      tb.appendChild(tab);
    }
    load(P0);
  };

  /* ================= order：无穷小量的阶（x → 0） ================= */
  var OR = [
    { n: 'sin x 与 x', a: 'sin(x)', b: 'x' },
    { n: '1 − cos x 与 x²/2', a: '1-cos(x)', b: 'x^2/2' },
    { n: 'tan x − sin x 与 x³/2', a: 'tan(x)-sin(x)', b: 'x^3/2' },
    { n: 'x − sin x 与 x³/6', a: 'x-sin(x)', b: 'x^3/6' },
    { n: 'ln(1 + x) 与 x', a: 'ln(1+x)', b: 'x' },
    { n: 'eˣ − 1 与 x', a: 'e^x-1', b: 'x' },
    { n: '√(1 + x) − 1 与 x/2', a: 'sqrt(1+x)-1', b: 'x/2' },
    { n: 'sin 2x + x² 与 x（同阶）', a: 'sin(2x)+x^2', b: 'x' },
    { n: 'x² 与 sin x（高阶）', a: 'x^2', b: 'sin(x)' },
    { n: 'x sin(1/x) 与 x（只有 O）', a: 'x*sin(1/x)', b: 'x' }
  ];
  V.order = function (body, o) {
    var i0 = pick(o, OR.length), P0 = OR[i0];
    var S = { a: null, b: null, R: 0.5, mode: 'r', err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('例子', OR.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { ain.input.focus(); return; }
      load(OR[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var ain = U.textIn('$\\alpha(x)=$', '', custom, '9em'), bin = U.textIn('$\\beta(x)=$', '', custom, '9em');
    c2.appendChild(ain.el); c2.appendChild(bin.el);
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    c3.appendChild(U.selectIn('画法', [['r', '比值 α(x)/β(x)'], ['l', '双对数坐标：lg|α|、lg|β| 对 lg x']], function (v) { S.mode = v; B.draw(); }).el);
    c3.appendChild(logSlider('显示范围 $|x|\\le$', -3, 0, S.R, function (r) { S.R = r; B.draw(); }).el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: '无穷小量的比较' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    function load(p) { ain.input.value = p.a; bin.input.value = p.b; compute(); }
    function custom() { sel.input.value = 'c'; compute(); }
    function compute() {
      S.err = '';
      try { S.a = U.compileF(ain.input.value, ['x']); S.b = U.compileF(bin.input.value, ['x']); } catch (e) { S.a = null; S.err = e.message; }
      B.draw(); info();
    }
    function A(x) { return ev(S.a, x); }
    function Bf(x) { return ev(S.b, x); }
    function ratio(x) { return A(x) / Bf(x); }
    /** 根据 x = ±10⁻², ±10⁻³, ±10⁻⁴ 处的比值判断两个无穷小量的关系 */
    function analyse() {
      var r1 = ratio(1e-2), r2 = ratio(1e-3), r3 = ratio(1e-4), s2 = ratio(-1e-3), s3 = ratio(-1e-4), ab = Math.abs;
      if (![r1, r2, r3].every(isFinite)) return { k: 'x', s: '在 x → 0⁺ 时无法计算比值（检查 β 是否为 0 或函数是否有定义）。' };
      var neg = isFinite(s2) && isFinite(s3), one = neg ? '' : '（左侧无定义，只考虑 x → 0⁺）';
      if (ab(r3) < 0.02 * ab(r1) && ab(r3) < 0.01 && (!neg || ab(s3) < 0.01))
        return { k: 'o', s: 'α/β → 0：α 是比 β <b>高阶</b>的无穷小量，记作 α = o(β)' + one + '。' };
      if (ab(r3) > 50 * ab(r1) && ab(r3) > 100)
        return { k: 'O', s: 'α/β → ∞：α 是比 β <b>低阶</b>的无穷小量，即 β = o(α)' + one + '。' };
      if (ab(r3 - r2) <= 0.01 * ab(r3) && (!neg || ab(s3 - r3) <= 0.01 * ab(r3)) && r3 !== 0) {
        var c = +r3.toPrecision(4);
        if (ab(r3 - 1) < 2e-3) return { k: '~', c: 1, s: 'α/β → 1：α 与 β 是<b>等价</b>无穷小量，α ~ β' + one + '。' };
        return { k: 'c', c: r3, s: 'α/β → c ≈ ' + fmt(c, 4) + ' ≠ 0：α 与 β 是<b>同阶</b>无穷小量' + one + '。' };
      }
      var mx = 0;
      for (var i = 0; i <= 300; i++) { var x = Math.pow(10, -4 + 3 * i / 300), q = ab(ratio(x)); if (neg) q = Math.max(q, ab(ratio(-x))); if (q > mx) mx = q; }
      return { k: 'n', s: 'α/β 在 0 附近没有极限' + (isFinite(mx) && mx < 1e3 ? '；但 |α/β| 有界（不超过约 ' + fmt(mx, 3) + '），所以 α = O(β)。比值能任意接近 0 时，按定义二者不是同阶无穷小量。' : '。') };
    }
    function draw(B) {
      if (!S.a) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var R = S.R, an = analyse();
      if (S.mode === 'r') {
        var r = yRange(ratio, -R, R, [an.c]);
        B.view(-R, R, r[0], r[1]);
        B.grid({ xl: 'x', yl: 'α/β' });
        if (an.c != null) { B.line(-R, an.c, R, an.c, B.C.c3, 1.4, [6, 4]); B.text('c = ' + fmt(an.c, 4), R, an.c, B.C.c3, 'right', 'bottom'); }
        B.fn(ratio, B.C.c1, 2.2);
      } else {
        var u1 = Math.log10(R), u0 = Math.max(-5.5, u1 - 4), lo = Infinity, hi = -Infinity;
        var la = function (u) { return Math.log10(Math.abs(A(Math.pow(10, u)))); }, lb = function (u) { return Math.log10(Math.abs(Bf(Math.pow(10, u)))); };
        for (var i = 0; i <= 200; i++) {
          var u = u0 + (u1 - u0) * i / 200;
          [la(u), lb(u)].forEach(function (v) { if (isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } });
        }
        if (!isFinite(lo)) { lo = -1; hi = 1; }
        if (hi - lo < 1) { lo -= 0.5; hi += 0.5; }
        var span = hi - lo, m = span * 0.08;
        B.view(u0, u1, lo - m, hi + m);
        B.grid({ sx: 1, sy: span > 24 ? 5 : span > 12 ? 2 : 1, fx: lgTick, fy: lgTick, xl: 'x', yl: '|α|、|β|' });
        B.fn(la, B.C.c1, 2.2);
        B.fn(lb, B.C.c2, 2, [7, 4]);
        B.text('— |α(x)|', u0 + (u1 - u0) * 0.02, hi + m, B.C.c1, 'left', 'top');
        B.text('- - |β(x)|', u0 + (u1 - u0) * 0.02, hi + m - span * 0.08, B.C.c2, 'left', 'top');
      }
    }
    function info() {
      if (S.err) { badBox(out, S.err); tb.innerHTML = ''; return; }
      var an = analyse();
      out.innerHTML = '当 x → 0 时：' + (an.k === 'x' || an.k === 'n' ? '<span class="bad">' : '<span class="good">') + an.s + '</span>' +
        '<br><span class="muted">比值是用 x = ±10⁻²、±10⁻³、±10⁻⁴ 处的值估计的。表中“阶”的估计 k ≈ lg|α(x)/α(x/10)|：若 α ~ c·xᵏ，这个比值接近 10ᵏ。在双对数坐标里，k 阶无穷小量的图像近似是斜率为 k 的直线。数值实验只能帮助理解，不能代替证明。</span>';
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'x'), h('th', null, 'α(x)'), h('th', null, 'β(x)'), h('th', null, 'α/β'), h('th', null, 'α 的阶 ≈'), h('th', null, 'β 的阶 ≈')));
      for (var j = 1; j <= 4; j++) {
        var x = Math.pow(10, -j), ka = Math.log10(Math.abs(A(x) / A(x / 10))), kb = Math.log10(Math.abs(Bf(x) / Bf(x / 10)));
        tab.appendChild(h('tr', null, h('td', null, '10' + sup(-j)), h('td', null, fmt(A(x), 6)), h('td', null, fmt(Bf(x), 6)), h('td', null, fmt(ratio(x), 6)), h('td', null, fmt(ka, 3)), h('td', null, fmt(kb, 3))));
      }
      tb.innerHTML = '';
      tb.appendChild(tab);
    }
    load(P0);
  };

  /* ================= ivt：最值定理与中间值定理 ================= */
  var IV = [
    { n: 'x³ − 3x，[−2, 2.5]', f: 'x^3-3x', a: '-2', b: '2.5', note: '连续函数：最大值、最小值都能取到，介于两者之间的每个 c 都至少被取到一次。' },
    { n: 'sin x + x/3，[0, 3π]', f: 'sin(x)+x/3', a: '0', b: '3pi', note: '连续函数：拖动横线，交点个数会变化，但只要 m ≤ c ≤ M 就至少有一个交点。' },
    { n: 'x + sgn x，[−1, 1]（有跳跃）', f: 'x+sgn(x)', a: '-1', b: '1', note: 'x = 0 处跳跃：(−1, 0) 与 (0, 1) 中的值都被“跳过”了，中间值定理的结论不成立。' },
    { n: 'x − [x]，[0, 1.5]（有跳跃）', f: 'x-floor(x)', a: '0', b: '1.5', note: '上确界 1 取不到（x → 1⁻ 时函数值趋于 1，但 f(1) = 0）：函数在 x = 1 处不连续，最值定理的结论不成立。' },
    { n: '1/x，[−1, 1]（0 处无定义）', f: '1/x', a: '-1', b: '1', note: 'f(−1) = −1 < 0 < 1 = f(1)，却没有零点；函数在 [−1, 1] 上也无界。原因是它在 0 处不连续（甚至无定义）。' },
    { n: 'sin(1/x)，补充 f(0) = 0，[−0.3, 0.3]', f: 'sin(1/x)', a: '-0.3', b: '0.3', note: '在 0 处是第二类不连续点，却仍然取遍 −1 与 1 之间的一切值：中间值性质不能推出连续。' }
  ];
  V.ivt = function (body, o) {
    var i0 = pick(o, IV.length), P0 = IV[i0], N = 4000;
    var S = { f: null, a: 0, b: 1, xs: null, ys: null, lo: 0, hi: 1, M: 0, m: 0, xM: 0, xm: 0, c: 0, roots: [], jumps: [], note: '', err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('例子', IV.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(IV[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', '', custom, '9em'), ain = U.textIn('$a=$', '', custom, '4em'), bin = U.textIn('$b=$', '', custom, '4em');
    [fin, ain, bin].forEach(function (x) { c2.appendChild(x.el); });
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    var sc = U.slider('横线 $y=c$', 0, 1000, 1, 500, function (v) { setC(S.lo + (S.hi - S.lo) * v / 1000, true); }, function () { return fmt(S.c, 4); });
    c3.appendChild(sc.el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: '中间值定理演示（可拖动横线）' });
    var out = U.outBox(body);
    B.drag(function (x, y) { if (S.f) setC(Math.max(S.lo, Math.min(S.hi, y))); });
    function load(p) { fin.input.value = p.f; ain.input.value = p.a; bin.input.value = p.b; S.note = p.note; compute(); }
    function custom() { sel.input.value = 'c'; S.note = ''; compute(); }
    function F(x) { return ev(S.f, x); }
    function compute() {
      S.err = '';
      try {
        S.f = U.compileF(fin.input.value, ['x']);
        S.a = MA.expr.value(ain.input.value); S.b = MA.expr.value(bin.input.value);
        if (!(isFinite(S.a) && isFinite(S.b) && S.b > S.a)) throw new Error('需要有限的 a < b');
      } catch (e) { S.f = null; S.err = e.message; B.draw(); info(); return; }
      S.xs = new Float64Array(N + 1); S.ys = new Float64Array(N + 1);
      S.M = -Infinity; S.m = Infinity;
      for (var i = 0; i <= N; i++) {
        var x = S.a + (S.b - S.a) * i / N, y = F(x);
        S.xs[i] = x; S.ys[i] = y;
        if (isFinite(y)) { if (y > S.M) { S.M = y; S.xM = x; } if (y < S.m) { S.m = y; S.xm = x; } }
      }
      var r = yRange(S.f, S.a, S.b, [F(S.a), F(S.b)], 0.01, 0.99);
      S.lo = r[0]; S.hi = r[1];
      setC(isFinite(S.M) ? S.m + (Math.min(S.M, S.hi) - Math.max(S.m, S.lo)) * 0.42 + Math.max(0, S.lo - S.m) : 0);
    }
    function setC(c, fromSlider) {
      S.c = c;
      if (!fromSlider) sc.set(Math.round((c - S.lo) / (S.hi - S.lo) * 1000));
      solve(); B.draw(); info();
    }
    /** 找 f(x) = c 的点：相邻两个有定义的采样点处 f − c 变号时用二分法细化，细化后仍不相等的是“跳跃” */
    function solve() {
      S.roots = []; S.jumps = [];
      if (!S.f) return;
      var c = S.c, tol = 1e-6 * Math.max(1e-9, S.hi - S.lo), px = NaN, py = NaN;
      for (var i = 0; i <= N; i++) {
        var x = S.xs[i], y = S.ys[i];
        if (!isFinite(y)) continue;
        if (y === c) { S.roots.push(x); px = x; py = y; continue; }
        if (isFinite(py) && py !== c && (py - c) * (y - c) < 0) {
          var lo = px, hi = x, glo = py - c, und = false;
          for (var j = 0; j < 60; j++) {
            var mid = (lo + hi) / 2, gm = F(mid) - c;
            if (!isFinite(gm)) { und = true; break; }
            if (gm === 0) { lo = hi = mid; break; }
            if (glo * gm < 0) hi = mid; else { lo = mid; glo = gm; }
          }
          var xi = (lo + hi) / 2;
          if (!und && Math.abs(F(xi) - c) <= tol) S.roots.push(xi); else S.jumps.push(xi);
        }
        px = x; py = y;
      }
    }
    function draw(B) {
      if (!S.f) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var L = S.b - S.a;
      B.view(S.a - 0.04 * L, S.b + 0.04 * L, S.lo, S.hi);
      B.grid({ xl: 'x' });
      B.vband(S.a - 0.04 * L, S.a, rgba(B.C.muted, 0.12));
      B.vband(S.b, S.b + 0.04 * L, rgba(B.C.muted, 0.12));
      if (S.M <= S.hi) B.line(S.a, S.M, S.b, S.M, B.C.c5, 1, [3, 4]);
      if (S.m >= S.lo) B.line(S.a, S.m, S.b, S.m, B.C.c5, 1, [3, 4]);
      B.fn(S.f, B.C.c1, 2.2, null, S.a, S.b);
      B.line(S.a - 0.04 * L, S.c, S.b + 0.04 * L, S.c, B.C.c4, 2);
      B.text('y = c', S.b + 0.04 * L, S.c, B.C.c4, 'right', 'bottom');
      if (S.M <= S.hi) { B.dot(S.xM, S.M, B.C.c5, 4); B.text(' M', S.xM, S.M, B.C.c5, 'left', 'bottom'); }
      if (S.m >= S.lo) { B.dot(S.xm, S.m, B.C.c5, 4); B.text(' m', S.xm, S.m, B.C.c5, 'left', 'top'); }
      S.roots.slice(0, 400).forEach(function (x) { B.dot(x, S.c, B.C.c3, 4.5); });
      B.ctx.save();
      B.ctx.strokeStyle = B.C.c2; B.ctx.lineWidth = 2.4;
      S.jumps.forEach(function (x) {
        var X = B.X(x), Y = B.Y(S.c);
        B.ctx.beginPath(); B.ctx.moveTo(X - 6, Y - 6); B.ctx.lineTo(X + 6, Y + 6); B.ctx.moveTo(X + 6, Y - 6); B.ctx.lineTo(X - 6, Y + 6); B.ctx.stroke();
      });
      B.ctx.restore();
    }
    function info() {
      if (S.err) { badBox(out, S.err); return; }
      if (!S.f) return;
      var eps0 = Math.abs(S.b - S.a) * 1e-9;
      function fx(x, d) { return fmt(Math.abs(x) < eps0 ? 0 : x, d); }
      var t = '在所取的 ' + (N + 1) + ' 个点中，最大值 M ≈ ' + fmt(S.M, 5) + '（x ≈ ' + fx(S.xM, 4) + '），最小值 m ≈ ' + fmt(S.m, 5) + '（x ≈ ' + fx(S.xm, 4) + '）。<br>';
      var k = S.roots.length, c = fmt(S.c, 4);
      if (k) {
        t += '<span class="good">c = ' + c + '：找到 ' + k + ' 个 ξ 使 f(ξ) = c</span>，ξ ≈ ' + S.roots.slice(0, 6).map(function (x) { return fx(x, 5); }).join('，') + (k > 6 ? ' 等' : '') + '。';
      } else {
        t += '<span class="bad">c = ' + c + '：在 [a, b] 中找不到 f(ξ) = c 的点</span>' + (S.c > S.M || S.c < S.m ? '，c 不在 [m, M] 中。' : '。');
      }
      if (S.jumps.length) t += '<br><span class="bad">在 x ≈ ' + S.jumps.slice(0, 4).map(function (x) { return fx(x, 5); }).join('，') + ' 处 f − c 变号却没有零点（红叉）</span>：函数在那里不连续，“跳过”了 c。';
      if (S.note) t += '<br>' + MA.esc(S.note);
      t += '<br><span class="muted">闭区间上的连续函数取得最大值 M 与最小值 m，并取遍 [m, M] 中的每一个值。拖动图中的横线或滑块来改变 c；最值是用采样点估计的，数值实验只能帮助理解，不能代替证明。</span>';
      out.innerHTML = t;
    }
    load(P0);
  };

  /* ================= unif：一致连续 —— 最大可用的 δ(x₀) ================= */
  var UN = [
    { n: 'x²，[0, 2]', f: 'x^2', a: '0', b: '2', open: false, note: 'δ(x₀) 随 x₀ 增大而变小（图像越来越陡），但在 x₀ = 2 处仍是正数。闭区间上的连续函数一致连续（Cantor 定理）。' },
    { n: 'x²，[0, 8]', f: 'x^2', a: '0', b: '8', open: false, note: '区间越长，δ(x₀) 的最小值越小。在 [0, +∞) 上它会趋于 0：x² 在 [0, +∞) 上不一致连续。' },
    { n: '√x，[0, 4]', f: 'sqrt(x)', a: '0', b: '4', open: false, note: '最小的 δ(x₀) 出现在 x₀ = 0 附近，约为 ε²，仍是正数：√x 在 0 附近很“陡”，却一致连续。' },
    { n: 'sin x，[0, 4π]', f: 'sin(x)', a: '0', b: '4pi', open: false, note: '|sin x − sin y| ≤ |x − y|，所以处处 δ(x₀) ≥ ε：满足 Lipschitz 条件的函数一致连续。' },
    { n: '1/x，(0, 1]', f: '1/x', a: '0', b: '1', open: true, note: '可以算出 δ(x₀) = εx₀²/(1 + εx₀) → 0（x₀ → 0⁺）：没有一个 δ 对所有 x₀ 都管用，不一致连续。' },
    { n: 'ln x，(0, 1]', f: 'ln(x)', a: '0', b: '1', open: true, note: '可以算出 δ(x₀) = x₀(1 − e^(−ε)) → 0（x₀ → 0⁺）：不一致连续。' },
    { n: 'sin(1/x)，(0, 1]', f: 'sin(1/x)', a: '0', b: '1', open: true, note: '越靠近 0 振荡越快，δ(x₀) 迅速趋于 0：有界的连续函数也可以不一致连续。' },
    { n: 'x sin(1/x)，(0, 1]', f: 'x*sin(1/x)', a: '0', b: '1', open: true, note: '同样在振荡，但振幅趋于 0；补充定义 f(0) = 0 后在 [0, 1] 上连续，所以一致连续：δ(x₀) 的最小值是正数。' }
  ];
  V.unif = function (body, o) {
    var i0 = pick(o, UN.length), P0 = UN[i0], M = 120;
    var S = { f: null, a: 0, b: 1, open: false, eps: 0.2, x: [], d: [], sel: 0, imin: 0, note: '', err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('例子', UN.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(UN[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', '', custom, '8em'), ain = U.textIn('$a=$', '', custom, '3.5em'), bin = U.textIn('$b=$', '', custom, '3.5em');
    [fin, ain, bin].forEach(function (x) { c2.appendChild(x.el); });
    var oc = check('左端点 a 不属于区间', false, function () { custom(); });
    c2.appendChild(oc.el);
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    c3.appendChild(logSlider('$\\varepsilon=$', -2, 0, S.eps, function (e) { S.eps = e; compute(true); }).el);
    var sx = U.slider('选定的 $x_0$', 0, M, 1, M, function (v) { S.sel = v; B1.draw(); B2.draw(); info(); }, function (v) { return S.x.length ? fmt(S.x[v], 4) : ''; });
    c3.appendChild(sx.el);
    var B1 = U.board(body, { ratio: 0.46, draw: draw1, label: '函数图像与 x₀ 处的 ε-δ 窗口' });
    var B2 = U.board(body, { ratio: 0.32, draw: draw2, label: '最大可用的 δ(x₀)（对数坐标）' });
    var out = U.outBox(body);
    function pickX(x) { if (!S.x.length) return; var best = 0; for (var i = 1; i <= M; i++) if (Math.abs(S.x[i] - x) < Math.abs(S.x[best] - x)) best = i; S.sel = best; sx.set(best); B1.draw(); B2.draw(); info(); }
    B1.drag(function (x) { pickX(x); });
    B2.drag(function (x) { pickX(x); });
    function load(p) { fin.input.value = p.f; ain.input.value = p.a; bin.input.value = p.b; oc.input.checked = p.open; S.note = p.note; compute(); }
    function custom() { sel.input.value = 'c'; S.note = ''; compute(); }
    function F(x) { return ev(S.f, x); }
    /** x₀ 一侧（s = ±1）最大可用的 δ：从很小的 t 开始按 1.04 倍增大，遇到 |f(x₀ ± t) − f(x₀)| ≥ ε 时二分细化 */
    function dside(x0, y0, s) {
      var lim = s > 0 ? S.b - x0 : x0 - S.a;
      if (lim <= 0) return Infinity;
      var badf = function (t) { return !(Math.abs(F(x0 + s * t) - y0) < S.eps); };
      var t = (S.b - S.a) * 1e-9, prev = 0;
      while (true) {
        var last = t >= lim;
        if (last) { t = lim; if (s < 0 && S.open) return Infinity; }
        if (badf(t)) {
          var lo = prev, hi = t;
          for (var j = 0; j < 30; j++) { var m = (lo + hi) / 2; if (badf(m)) hi = m; else lo = m; }
          return lo;
        }
        if (last) return Infinity;
        prev = t; t *= 1.04;
      }
    }
    function compute(keepSel) {
      S.err = '';
      try {
        S.f = U.compileF(fin.input.value, ['x']);
        S.a = MA.expr.value(ain.input.value); S.b = MA.expr.value(bin.input.value);
        if (!(isFinite(S.a) && isFinite(S.b) && S.b > S.a)) throw new Error('需要有限的 a < b');
      } catch (e) { S.f = null; S.err = e.message; B1.draw(); B2.draw(); info(); return; }
      S.open = oc.input.checked;
      var L = S.b - S.a;
      S.x = []; S.d = [];
      for (var i = 0; i <= M; i++) {
        var x0 = S.open ? S.a + L * Math.pow(10, -3 + 3 * i / M) : S.a + L * i / M, y0 = F(x0);
        var d = isFinite(y0) ? Math.min(dside(x0, y0, -1), dside(x0, y0, 1), L) : NaN;
        S.x.push(x0); S.d.push(d);
      }
      S.imin = 0;
      for (var k = 1; k <= M; k++) if (!(S.d[k] >= S.d[S.imin])) S.imin = k;
      if (!keepSel) { S.sel = S.imin; sx.set(S.sel); }
      B1.draw(); B2.draw(); info();
    }
    function draw1(B) {
      if (!S.f) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var L = S.b - S.a, x0 = S.x[S.sel], y0 = F(x0), d = S.d[S.sel], e = S.eps;
      var r = yRange(S.f, S.open ? S.a + L * 1e-3 : S.a, S.b, [y0 - e, y0 + e]);
      B.view(S.a - 0.03 * L, S.b + 0.03 * L, r[0], r[1]);
      B.grid({ xl: 'x' });
      B.hband(y0 - e, y0 + e, B.C.band);
      if (isFinite(d)) {
        B.vband(x0 - d, x0 + d, rgba(B.C.c3, 0.08));
        B.poly([[x0 - d, y0 - e], [x0 + d, y0 - e], [x0 + d, y0 + e], [x0 - d, y0 + e]], B.C.c3, 1.6, true);
      }
      B.fn(S.f, B.C.c1, 2.2, null, S.open ? S.a + L * 1e-9 : S.a, S.b);
      if (S.open) B.dot(S.a, r[0] + (r[1] - r[0]) * 0.02, B.C.muted, 3.5, true);
      if (isFinite(y0)) B.dot(x0, y0, B.C.c4, 4.5);
    }
    function draw2(B) {
      if (!S.f) { B.view(0, 1, -1, 1); B.grid(); return; }
      var L = S.b - S.a, lo = Infinity, hi = -Infinity, pts = [];
      for (var i = 0; i <= M; i++) { var v = Math.log10(S.d[i]); if (isFinite(v)) { lo = Math.min(lo, v); hi = Math.max(hi, v); } pts.push([S.x[i], v]); }
      if (!isFinite(lo)) { lo = -1; hi = 0; }
      if (hi - lo < 1) { var c = (hi + lo) / 2; lo = c - 0.5; hi = c + 0.5; }
      var span = hi - lo;
      B.view(S.a - 0.03 * L, S.b + 0.03 * L, lo - span * 0.12, hi + span * 0.12);
      B.grid({ sy: span > 8 ? 2 : 1, fy: lgTick, xl: 'x₀', yl: 'δ(x₀)' });
      var mn = Math.log10(S.d[S.imin]);
      if (isFinite(mn)) { B.line(S.a, mn, S.b, mn, B.C.c2, 1.2, [6, 4]); B.text('最小 ≈ ' + fmt(S.d[S.imin], 3), S.b, mn, B.C.c2, 'right', 'bottom'); }
      B.poly(pts, B.C.c5, 2);
      var ys = Math.log10(S.d[S.sel]);
      if (isFinite(ys)) B.dot(S.x[S.sel], ys, B.C.c4, 4.5);
    }
    function info() {
      if (S.err) { badBox(out, S.err); return; }
      if (!S.f) return;
      var e = p3(S.eps), dm = S.d[S.imin], t = '';
      t += 'ε = ' + e + '：在所取的 ' + (M + 1) + ' 个 x₀ 中，δ(x₀) 最小约为 ' + fmt(dm, 3) + '（在 x₀ ≈ ' + fmt(S.x[S.imin], 4) + ' 处）。';
      var tend = S.open && S.d[0] < 0.05 * S.d[Math.round(M * 2 / 3)];
      if (tend) t += '<br><span class="bad">越靠近左端点，δ(x₀) 越小，并且看起来趋于 0</span>：找不到一个对所有 x₀ 都适用的正数 δ——这是不一致连续的表现。';
      else if (dm > 0) t += '<br><span class="good">取 δ = ' + fmt(dm, 3) + '，它对区间上所有（所取的）x₀ 都管用</span>：δ 只依赖于 ε，不依赖于 x₀——这正是一致连续。';
      t += '<br>选定的 x₀ ≈ ' + fmt(S.x[S.sel], 5) + '：δ(x₀) ≈ ' + fmt(S.d[S.sel], 4) + '（绿色矩形的半宽）。';
      if (S.note) t += '<br>' + MA.esc(S.note);
      t += '<br><span class="muted">δ(x₀) 指在 x₀ 处最大可用的 δ：|x − x₀| &lt; δ 且 x 属于区间时 |f(x) − f(x₀)| &lt; ε。一致连续 ⇔ 对每个 ε > 0，δ(x₀) 的下确界都是正数。在图中拖动可以改变选定的 x₀。数值实验只能帮助理解，不能代替证明。</span>';
      out.innerHTML = t;
    }
    load(P0);
  };
})();
