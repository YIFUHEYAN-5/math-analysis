/* viz-diff.js —— 互动演示组件（四）：第四章（微分）
 * square（正方形面积的增量）、incr（函数的增量 Δy 与微分 dy）、zoom（局部放大：可微的函数在小范围内像一条直线）、dquot（差商与导数）
 * 各组件都接受可选属性 p（初始预设的序号，从 0 开始）。
 * 导数的存在性用 h = ±10⁻²、…、±10⁻⁶ 处的差商作数值判断，只用来帮助理解，不能代替证明。
 */
(function () {
  'use strict';
  var MA = window.MA, V = MA.viz, U = MA.vizUtil;
  function h() { return MA.h.apply(null, arguments); }
  var fmt = U.fmt, sup = U.sup;
  function p3(x) { return String(+x.toPrecision(3)); }
  function ev(f, x) { var y; try { y = f(x); } catch (e) { return NaN; } return typeof y === 'number' ? y : NaN; }
  function pick(o, n) { var i = parseInt(o && o.p, 10); return i >= 0 && i < n ? i : 0; }
  function show(v) { return v === Infinity ? '+∞' : v === -Infinity ? '−∞' : isNaN(v) ? '—' : fmt(Math.abs(v) < 1e-9 ? 0 : +v.toPrecision(6), 6); }
  function badBox(out, msg) { out.innerHTML = '<span class="bad">无法计算：' + MA.esc(msg) + '</span>'; }
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
  /** 用采样值的分位数确定纵坐标范围，extra 中的有限值一定包含在内 */
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
  /** 预设可以用 fix 补充定义 f(x₀)（例如 x sin(1/x) 在 0 处补充定义为 0） */
  function withFix(f, x0, fix) {
    if (fix == null) return f;
    return function (x) { return x === x0 ? fix : f(x); };
  }

  /* ---------- 数值判断导数是否存在 ---------- */
  var HS = [1e-2, 1e-3, 1e-4, 1e-5, 1e-6];
  /** 一侧差商序列的极限：{k:'v', v} 收敛；{k:'inf', v:±∞} 发散到无穷；{k:'osc'} 振荡；{k:'nan'} 无定义 */
  function side(a) {
    if (!a.every(isFinite)) return { k: 'nan' };
    var z = a[4], y = a[3], x = a[2], tol = 2e-3 * Math.max(1, Math.abs(z));
    if (Math.abs(z - y) <= tol && Math.abs(y - x) <= 20 * tol) return { k: 'v', v: z };
    if (Math.abs(z) > 100 && Math.abs(z) > 3 * Math.abs(x) && Math.abs(y) > Math.abs(x) && z * x > 0) return { k: 'inf', v: z > 0 ? Infinity : -Infinity };
    return { k: 'osc' };
  }
  /** 返回 {k, d, l, r, y0}。k：'d' 可导，'c' 左右差商趋于不同的数，'inf' 趋于无穷，'osc' 振荡，'disc' 不连续，'one' 只有一侧有定义，'undef' 无定义 */
  function analyse(f, x0) {
    var y0 = ev(f, x0), A = { y0: y0 };
    if (!isFinite(y0)) { A.k = 'undef'; return A; }
    var R = HS.map(function (t) { return (ev(f, x0 + t) - y0) / t; });
    var L = HS.map(function (t) { return (ev(f, x0 - t) - y0) / (-t); });
    var r = side(R), l = side(L);
    A.r = r; A.l = l;
    function jump(s) {
      var a = Math.abs(ev(f, x0 + s * 1e-4) - y0), b = Math.abs(ev(f, x0 + s * 1e-8) - y0);
      return isFinite(b) && b > 1e-3 * Math.max(1, Math.abs(y0)) && b > 0.5 * a;
    }
    if (jump(1) || jump(-1)) { A.k = 'disc'; return A; }
    if (r.k === 'nan' && l.k === 'nan') { A.k = 'undef2'; return A; }
    if (r.k === 'nan' || l.k === 'nan') { A.k = 'one'; return A; }
    if (r.k === 'v' && l.k === 'v') {
      if (Math.abs(r.v - l.v) <= 4e-3 * Math.max(1, Math.abs(r.v))) {
        A.k = 'd';
        var c = (ev(f, x0 + 1e-5) - ev(f, x0 - 1e-5)) / 2e-5;
        A.d = isFinite(c) && Math.abs(c - r.v) <= 4e-3 * Math.max(1, Math.abs(r.v)) ? c : (r.v + l.v) / 2;
        if (Math.abs(A.d) < 1e-7) A.d = 0;
      } else A.k = 'c';
      return A;
    }
    if (r.k === 'inf' || l.k === 'inf') { A.k = 'inf'; return A; }
    A.k = 'osc';
    return A;
  }
  function sideText(s) { return s.k === 'v' ? '趋于 ' + show(s.v) : s.k === 'inf' ? '趋于 ' + show(s.v) : s.k === 'osc' ? '振荡、没有极限' : '没有定义'; }
  /** 结论文字（HTML） */
  function verdict(A) {
    switch (A.k) {
      case 'd': return '<span class="good">左右两侧的差商都趋于同一个数，f 在 x₀ 处可导，f′(x₀) ≈ ' + show(A.d) + '。</span>';
      case 'c': return '<span class="bad">h → 0⁺ 时差商' + sideText(A.r) + '，h → 0⁻ 时差商' + sideText(A.l) + '：两侧不一致，差商没有极限，f 在 x₀ 处不可导（图像有尖角）。</span>';
      case 'inf':
        var same = A.r.k === 'inf' && A.l.k === 'inf' && A.r.v === A.l.v;
        return '<span class="bad">h → 0⁺ 时差商' + sideText(A.r) + '，h → 0⁻ 时差商' + sideText(A.l) + '：差商无界，f 在 x₀ 处不可导' +
          (same ? '（导数“等于 ' + show(A.r.v) + '”只是一种说法，切线是竖直的）' : '') + '。</span>';
      case 'osc': return '<span class="bad">h → 0⁺ 时差商' + sideText(A.r) + '，h → 0⁻ 时差商' + sideText(A.l) + '：差商没有极限，f 在 x₀ 处不可导。</span>';
      case 'disc': return '<span class="bad">f 在 x₀ 处不连续，因此不可导（可微必连续）。</span>';
      case 'one': return '<span class="bad">f 只在 x₀ 的一侧有定义：h → 0⁺ 时差商' + sideText(A.r) + '，h → 0⁻ 时差商' + sideText(A.l) + '。导数要求 f 在 x₀ 的一个邻域内有定义，这里 f 在 x₀ 处不可导（只能讨论单侧导数，见 §4.2）。</span>';
      case 'undef2': return '<span class="bad">f 在 x₀ 附近没有定义。</span>';
      default: return '<span class="bad">f 在 x₀ 处没有定义（可以选用带补充定义的预设）。</span>';
    }
  }
  function setLabel(sl, text) { var v = sl.el.querySelector('.val'); if (v) v.textContent = text; }

  /* ================= incr：增量 Δy 与微分 dy ================= */
  var IN = [
    { n: 'y = x²，x₀ = 1', f: 'x^2', d: '2x', x0: 1, xr: [-1.5, 2], dm: 1, dx: 0.8, v: [-0.6, 2.4, -0.6, 4.2] },
    { n: 'y = x³ − 2x，x₀ = 1.2', f: 'x^3-2x', d: '3x^2-2', x0: 1.2, xr: [-1.5, 1.6], dm: 0.8, dx: 0.5, v: [-0.4, 2.2, -1.8, 4] },
    { n: 'y = √x，x₀ = 1', f: 'sqrt(x)', d: '1/(2sqrt(x))', x0: 1, xr: [0.1, 3], dm: 1.6, dx: 1.5, v: [-0.2, 3.4, -0.3, 2.3] },
    { n: 'y = 1/x，x₀ = 1', f: '1/x', d: '-1/x^2', x0: 1, xr: [0.3, 2], dm: 0.9, dx: 0.8, v: [0, 2.4, -0.4, 2.2] },
    { n: 'y = sin x，x₀ = π/6', f: 'sin(x)', d: 'cos(x)', x0: Math.PI / 6, xr: [-1.5, 2], dm: 1.2, dx: 1, v: [-0.4, 2.4, -0.5, 1.6] },
    { n: 'y = eˣ，x₀ = 0', f: 'e^x', d: 'e^x', x0: 0, xr: [-1, 0.8], dm: 1, dx: 0.9, v: [-1.2, 1.6, -0.3, 4.4] }
  ];
  V.incr = function (body, o) {
    var i0 = pick(o, IN.length);
    var S = { f: null, df: null, A: NaN, an: null, x0: 1, dx: 0.5, dm: 1, follow: false, err: '', v: null };
    var c1 = U.ctl(body);
    var sel = U.selectIn('函数', IN.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(IN[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var fin = U.textIn('$f(x)=$', '', custom, '9em');
    c1.appendChild(fin.el);
    c1.appendChild(U.btn('确定', custom, true));
    var c2 = U.ctl(body);
    var sx = U.slider('$x_0$', -1, 1, 0.01, 0, function (v) { S.x0 = v; derive(); refresh(); });
    var sd = U.slider('$\\Delta x$', -1, 1, 0.001, 0.5, function (v) { stopAnim(); S.dx = v; refresh(); }, function (v) { return fmt(v, 4); });
    c2.appendChild(sx.el); c2.appendChild(sd.el);
    var c3 = U.ctl(body);
    var bAnim = U.btn('▶ 让 Δx → 0', function () { if (an.running()) stopAnim(); else { if (Math.abs(S.dx) < 2e-3 * S.dm) setDx(S.dm * 0.8); bAnim.textContent = '■ 停止'; an.start(); } });
    c3.appendChild(U.btn('Δx 减半', function () { stopAnim(); setDx(S.dx / 2); }));
    c3.appendChild(bAnim);
    c3.appendChild(check('跟随放大（视窗随 Δx 缩小）', false, function (on) { S.follow = on; B.draw(); }).el);
    var B = U.board(body, { ratio: 0.6, draw: draw, label: '函数的增量与微分' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    var an = U.animator(function () {
      var nd = S.dx * 0.97;
      if (Math.abs(nd) < 1e-4 * S.dm) return false;
      setDx(nd);
    }, function () { bAnim.textContent = '▶ 让 Δx → 0'; });
    function stopAnim() { an.stop(); }
    B.drag(function (x, y, type, p) {
      stopAnim();
      if (type === 'down') {
        var y0 = ev(S.f, S.x0), dP = Math.hypot(p.px - B.X(S.x0), p.py - B.Y(y0));
        S.dragP = isFinite(dP) && dP < 14;
      }
      if (S.dragP) {
        var lo = +sx.input.min, hi = +sx.input.max;
        S.x0 = Math.max(lo, Math.min(hi, x)); sx.set(S.x0); derive();
      } else setDx(Math.max(-S.dm, Math.min(S.dm, x - S.x0)));
      refresh();
    });
    function setDx(v) { S.dx = v; sd.set(v); setLabel(sd, fmt(v, 6)); refresh(); }
    function load(p) {
      S.err = '';
      fin.input.value = p.f;
      try { S.f = U.compileF(p.f, ['x']); S.df = p.d ? U.compileF(p.d, ['x']) : null; } catch (e) { S.f = null; S.err = e.message; }
      S.v = p.v; S.dm = p.dm;
      sx.input.min = String(p.xr[0]); sx.input.max = String(p.xr[1]); sx.input.step = String((p.xr[1] - p.xr[0]) / 400);
      S.x0 = p.x0; sx.set(p.x0); setLabel(sx, fmt(p.x0, 4));
      sd.input.min = String(-p.dm); sd.input.max = String(p.dm); sd.input.step = String(p.dm / 1000);
      S.dx = p.dx; sd.set(p.dx);
      derive(); refresh();
    }
    function custom() {
      sel.input.value = 'c';
      S.err = '';
      try { S.f = U.compileF(fin.input.value, ['x']); S.df = null; } catch (e) { S.f = null; S.err = e.message; refresh(); return; }
      var x0 = S.x0;
      sx.input.min = String(x0 - 2); sx.input.max = String(x0 + 2); sx.input.step = '0.01'; sx.set(x0);
      S.dm = 1; sd.input.min = '-1'; sd.input.max = '1'; sd.input.step = '0.001';
      if (!(Math.abs(S.dx) <= 1)) S.dx = 0.5;
      sd.set(S.dx);
      var r = yRange(S.f, x0 - 2, x0 + 2, [ev(S.f, x0)]);
      S.v = [x0 - 2, x0 + 2, r[0], r[1]];
      derive(); refresh();
    }
    /** 计算 x₀ 处的导数：预设用解析式，自定义函数用数值判断 */
    function derive() {
      S.an = S.f ? analyse(S.f, S.x0) : null;
      if (S.df) { var a = ev(S.df, S.x0); S.A = isFinite(a) ? a : NaN; }
      else S.A = S.an && S.an.k === 'd' ? S.an.d : NaN;
    }
    function refresh() { B.draw(); info(); }
    function draw(B) {
      if (!S.f || S.err) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var x0 = S.x0, dx = S.dx, y0 = ev(S.f, x0), x1 = x0 + dx, y1 = ev(S.f, x1), A = S.A;
      var dy = isFinite(A) ? A * dx : NaN, C = B.C;
      if (S.follow && isFinite(y0) && isFinite(y1) && Math.abs(dx) > 0) {
        var ys = [y0, y1], xa = Math.min(x0, x1), xb = Math.max(x0, x1);
        if (isFinite(dy)) ys.push(y0 + dy);
        var ya = Math.min.apply(null, ys), yb = Math.max.apply(null, ys), w = xb - xa, m = Math.max(w, yb - ya) * 0.35;
        B.viewEq(xa - m, xb + m, ya - m, yb + m);
      } else B.view(S.v[0], S.v[1], S.v[2], S.v[3]);
      B.grid({ xl: 'x', yl: 'y' });
      if (isFinite(A) && isFinite(y0)) B.fn(function (x) { return y0 + A * (x - x0); }, C.c3, 1.5, [7, 5]);
      B.fn(S.f, C.c1, 2.4);
      if (!isFinite(y0)) return;
      var X0 = B.X(x0), X1 = B.X(x1), Y0 = B.Y(y0), FB = U.FONT_B;
      B.line(x0, y0, x1, y0, C.muted, 1.4, [4, 3]);
      if (Math.abs(X1 - X0) > 16) B.ptext('Δx', (X0 + X1) / 2, Y0 + (dy < 0 ? -6 : 16), C.muted, 'center', 'alphabetic', FB);
      var dir = dx >= 0 ? 1 : -1;
      if (isFinite(y1)) {
        var ctx = B.ctx;
        if (isFinite(dy)) {
          var Yt = B.Y(y0 + dy), Y1 = B.Y(y1);
          ctx.save(); ctx.lineCap = 'round';
          ctx.strokeStyle = C.c3; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(X1, Y0); ctx.lineTo(X1, Yt); ctx.stroke();
          ctx.strokeStyle = C.bad; ctx.lineWidth = 4;
          ctx.beginPath(); ctx.moveTo(X1, Yt); ctx.lineTo(X1, Y1); ctx.stroke();
          ctx.restore();
          if (Math.abs(Yt - Y0) > 14) B.ptext('dy', X1 + dir * 8, (Y0 + Yt) / 2 + 5, C.c3, dir > 0 ? 'left' : 'right', 'alphabetic', FB);
          if (Math.abs(Y1 - Yt) > 14) B.ptext('Δy − dy', X1 + dir * 8, (Yt + Y1) / 2 + 5, C.bad, dir > 0 ? 'left' : 'right', 'alphabetic', FB);
          B.dot(x1, y0 + dy, C.c3, 4, true);
        }
        /* Δy 用起点与终点之间的括线表示，放在 Q 的另一侧 */
        var bx = X1 - dir * 10, Y1b = B.Y(y1);
        ctx = B.ctx;
        ctx.save(); ctx.strokeStyle = C.c1; ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.moveTo(bx + dir * 4, Y0); ctx.lineTo(bx, Y0); ctx.lineTo(bx, Y1b); ctx.lineTo(bx + dir * 4, Y1b); ctx.stroke();
        ctx.restore();
        if (Math.abs(Y1b - Y0) > 14) B.ptext('Δy', bx - dir * 5, (Y0 + Y1b) / 2 + 5, C.c1, dir > 0 ? 'right' : 'left', 'alphabetic', FB);
        B.dot(x1, y1, C.c1, 4.5);
        B.ptext('Q', X1 + dir * 7, Y1b - 7, C.c1, dir > 0 ? 'left' : 'right', 'alphabetic', FB);
      }
      B.dot(x0, y0, C.c1, 4.5);
      B.ptext('P', X0 - dir * 7, Y0 - 7, C.c1, dir > 0 ? 'right' : 'left', 'alphabetic', FB);
    }
    function info() {
      if (S.err) { badBox(out, S.err); tb.innerHTML = ''; return; }
      if (!S.f) return;
      var x0 = S.x0, dx = S.dx, y0 = ev(S.f, x0), A = S.A;
      if (!isFinite(y0)) { out.innerHTML = '<span class="bad">f 在 x₀ = ' + fmt(x0, 4) + ' 处没有定义。</span>'; tb.innerHTML = ''; return; }
      if (Math.abs(dx) < 1e-12) { out.innerHTML = '请让 Δx ≠ 0。'; tb.innerHTML = ''; return; }
      var y1 = ev(S.f, x0 + dx), Dy = y1 - y0;
      var t = 'x₀ = ' + fmt(x0, 4) + '，Δx = ' + fmt(dx, 6) + '：Δy = f(x₀ + Δx) − f(x₀) = ' + show(Dy);
      if (isFinite(A)) {
        var dy = A * dx;
        t += '，dy = f′(x₀)Δx = ' + show(dy) + '（f′(x₀) ' + (S.df ? '= ' : '≈ ') + show(A) + '）。' +
          '<br>Δy − dy = ' + show(Dy - dy) + '，<b>(Δy − dy)/Δx = ' + show((Dy - dy) / dx) + '</b>；差商 Δy/Δx = ' + show(Dy / dx) + '。' +
          '<br><span class="muted">绿色线段是微分 dy（沿切线走的高度），红色线段是误差 Δy − dy。让 Δx 变小：误差不仅趋于 0，而且与 Δx 之比也趋于 0，这正是 Δy = dy + o(Δx)。勾选“跟随放大”后，Δx 与 dy 在画面上的长度保持不变，红色线段却越来越短。</span>';
      } else {
        t += '。<br>' + verdict(S.an) + '<br><span class="muted">此时不存在与 Δx 成正比、误差为 o(Δx) 的线性主部，也就没有微分 dy。</span>';
      }
      out.innerHTML = t;
      tb.innerHTML = '';
      if (!isFinite(A)) return;
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'Δx'), h('th', null, 'Δy'), h('th', null, 'dy = f′(x₀)Δx'), h('th', null, 'Δy − dy'), h('th', null, '(Δy − dy)/Δx')));
      for (var k = 0; k <= 4; k++) {
        var d = dx / Math.pow(10, k), q = ev(S.f, x0 + d) - y0;
        tab.appendChild(h('tr', null, h('td', null, fmt(d, 8)), h('td', null, show(q)), h('td', null, show(A * d)), h('td', null, show(q - A * d)), h('td', null, show((q - A * d) / d))));
      }
      tb.appendChild(tab);
    }
    load(IN[i0]);
  };

  /* ================= zoom：局部放大 ================= */
  var ZM = [
    { n: 'y = x²，x₀ = 1（可导）', f: 'x^2', x0: 1 },
    { n: 'y = sin x，x₀ = 0（可导）', f: 'sin(x)', x0: 0 },
    { n: 'y = |x|，x₀ = 0（尖角）', f: 'abs(x)', x0: 0 },
    { n: 'y = ∛x，x₀ = 0（竖直切线）', f: 'cbrt(x)', x0: 0 },
    { n: 'y = √|x|，x₀ = 0（尖点）', f: 'sqrt(abs(x))', x0: 0 },
    { n: 'y = x sin(1/x)，补充 f(0) = 0（振荡）', f: 'x*sin(1/x)', x0: 0, fix: 0 },
    { n: 'y = x² sin(1/x)，补充 f(0) = 0（可导）', f: 'x^2*sin(1/x)', x0: 0, fix: 0 },
    { n: 'y = |x² − 1|，x₀ = 1（尖角）', f: 'abs(x^2-1)', x0: 1 }
  ];
  V.zoom = function (body, o) {
    var i0 = pick(o, ZM.length);
    var S = { F: null, x0: 0, y0: NaN, w: 1, an: null, err: '' };
    var c1 = U.ctl(body);
    var sel = U.selectIn('函数', ZM.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(ZM[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', '', custom, '9em'), xin = U.textIn('$x_0=$', '', custom, '4em');
    c2.appendChild(fin.el); c2.appendChild(xin.el);
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    var sw = logSlider('窗口半宽 $w$', -5, 0.3, 1, function (w) { an.stop(); S.w = w; refresh(); });
    c3.appendChild(sw.el);
    var bAnim = U.btn('▶ 连续放大', function () {
      if (an.running()) { an.stop(); return; }
      if (S.w < 2e-5) setW(1);
      bAnim.textContent = '■ 停止'; an.start();
    });
    c3.appendChild(bAnim);
    c3.appendChild(U.btn('复位', function () { an.stop(); setW(1); }));
    var B = U.board(body, { ratio: 0.58, draw: draw, label: '局部放大' });
    var out = U.outBox(body);
    var an = U.animator(function () { var w = S.w * 0.975; if (w < 1e-5) { setW(1e-5); return false; } setW(w); },
      function () { bAnim.textContent = '▶ 连续放大'; });
    function setW(w) { S.w = w; sw.set(Math.log10(w)); refresh(); }
    function load(p) {
      fin.input.value = p.f; xin.input.value = String(p.x0);
      compute(p.fix);
    }
    function custom() { sel.input.value = 'c'; compute(null); }
    function compute(fix) {
      S.err = '';
      try {
        var f = U.compileF(fin.input.value, ['x']);
        var x0 = MA.expr.value(xin.input.value || '0');
        if (!isFinite(x0)) throw new Error('x₀ 不是有限数');
        S.x0 = x0; S.F = withFix(f, x0, fix); S.y0 = ev(S.F, x0); S.an = analyse(S.F, x0);
      } catch (e) { S.F = null; S.err = e.message; }
      refresh();
    }
    function g(u) { return ev(S.F, S.x0 + u) - S.y0; }
    function refresh() { B.draw(); info(); }
    function draw(B) {
      var w = S.w;
      B.viewEq(-w, w, -w * 0.55, w * 0.55);
      B.grid({ xl: 'Δx', yl: 'Δy' });
      if (!S.F || !isFinite(S.y0)) return;
      if (S.an && S.an.k === 'd') { var d = S.an.d; B.fn(function (u) { return d * u; }, B.C.c3, 1.6, [7, 5]); }
      B.fn(g, B.C.c1, 2.4);
      B.dot(0, 0, B.C.c1, 4.5);
    }
    /** 窗口内曲线与切线的最大偏离和窗口半宽之比 */
    function devRatio(w, d) {
      var m = 0;
      for (var i = 0; i <= 400; i++) { var u = -w + 2 * w * i / 400, e = Math.abs(g(u) - d * u); if (isFinite(e) && e > m) m = e; }
      return m / w;
    }
    function info() {
      if (S.err) { badBox(out, S.err); return; }
      if (!S.F) return;
      if (!isFinite(S.y0)) { out.innerHTML = verdict(S.an); return; }
      var A = S.an, t = '以 P(x₀, f(x₀)) 为原点、横纵坐标等比例放大，窗口半宽 w = ' + p3(S.w) + '（放大约 ' + p3(1 / S.w) + ' 倍）。<br>' + verdict(A);
      if (A.k === 'd') {
        var rs = [1, 0.1, 0.01, 1e-3, 1e-4].map(function (w) { return 'w = ' + p3(w) + '：' + fmt(devRatio(w, A.d) * 100, 3) + '%'; });
        t += '<br>窗口内曲线与切线（虚线）的最大偏离 ÷ w = <b>' + fmt(devRatio(S.w, A.d) * 100, 3) + '%</b>；不同的 w：' + rs.join('，') + '。偏离与 w 之比趋于 0，所以越放大越像一条直线。';
      } else if (A.k === 'c') t += '<br>无论放大多少倍，图像始终是同样的尖角：找不到一条直线在 P 附近贴住曲线。';
      else if (A.k === 'inf') t += '<br>越放大，图像在 P 附近越陡，最后几乎贴着纵轴：唯一“贴住”曲线的直线是竖直线，它不是函数 y = f(x₀) + A(x − x₀) 的图像。';
      else if (A.k === 'osc') t += '<br>无论放大多少倍，图像都在两条斜线之间来回振荡，不会变成一条直线。';
      t += '<br><span class="muted">横纵坐标用同样的比例放大。可导的函数，放大后越来越像它在 P 点的切线；不可导的点，放大后仍然“不直”。判断基于数值计算，只帮助理解，不能代替证明。</span>';
      out.innerHTML = t;
    }
    load(ZM[i0]);
  };

  /* ================= dquot：差商与导数 ================= */
  var DQ = [
    { n: 'y = x²，x₀ = 1', f: 'x^2', x0: 1 },
    { n: 'y = sin x，x₀ = 0', f: 'sin(x)', x0: 0 },
    { n: 'y = eˣ，x₀ = 0', f: 'e^x', x0: 0 },
    { n: 'y = |x|，x₀ = 0', f: 'abs(x)', x0: 0 },
    { n: 'y = x|x|，x₀ = 0', f: 'x*abs(x)', x0: 0 },
    { n: 'y = ∛x，x₀ = 0', f: 'cbrt(x)', x0: 0 },
    { n: 'y = x sin(1/x)，补充 f(0) = 0', f: 'x*sin(1/x)', x0: 0, fix: 0 },
    { n: 'y = x² sin(1/x)，补充 f(0) = 0', f: 'x^2*sin(1/x)', x0: 0, fix: 0 },
    { n: 'y = [x]，x₀ = 0', f: 'floor(x)', x0: 0 }
  ];
  V.dquot = function (body, o) {
    var i0 = pick(o, DQ.length);
    var S = { F: null, x0: 0, y0: NaN, H: 1, an: null, err: '', hov: null };
    var c1 = U.ctl(body);
    var sel = U.selectIn('函数', DQ.map(function (p, i) { return [i, p.n]; }).concat([['c', '自定义']]), function (v) {
      if (v === 'c') { fin.input.focus(); return; }
      load(DQ[+v]);
    });
    sel.input.value = String(i0);
    c1.appendChild(sel.el);
    var c2 = U.ctl(body);
    var fin = U.textIn('$f(x)=$', '', custom, '9em'), xin = U.textIn('$x_0=$', '', custom, '4em');
    c2.appendChild(fin.el); c2.appendChild(xin.el);
    c2.appendChild(U.btn('确定', custom, true));
    var c3 = U.ctl(body);
    c3.appendChild(logSlider('显示范围 $|h|\\le$', -3, 0.3, 1, function (v) { S.H = v; refresh(); }).el);
    var B = U.board(body, { ratio: 0.5, draw: draw, label: '差商的图像' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    B.hover(function (x) { S.hov = x; B.draw(); });
    function load(p) { fin.input.value = p.f; xin.input.value = String(p.x0); compute(p.fix); }
    function custom() { sel.input.value = 'c'; compute(null); }
    function compute(fix) {
      S.err = '';
      try {
        var f = U.compileF(fin.input.value, ['x']);
        var x0 = MA.expr.value(xin.input.value || '0');
        if (!isFinite(x0)) throw new Error('x₀ 不是有限数');
        S.x0 = x0; S.F = withFix(f, x0, fix); S.y0 = ev(S.F, x0); S.an = analyse(S.F, x0);
      } catch (e) { S.F = null; S.err = e.message; }
      refresh();
    }
    function q(t) { return t === 0 ? NaN : (ev(S.F, S.x0 + t) - S.y0) / t; }
    function refresh() { B.draw(); info(); }
    function draw(B) {
      var H = S.H;
      if (!S.F || !isFinite(S.y0)) { B.view(-H, H, -1, 1); B.grid({ xl: 'h', yl: 'q(h)' }); return; }
      var A = S.an, ex = [];
      if (A.k === 'd') ex.push(A.d);
      if (A.k === 'c') { ex.push(A.l.v); ex.push(A.r.v); }
      var r = yRange(q, -H, H, ex);
      B.view(-H, H, r[0], r[1]);
      B.grid({ xl: 'h', yl: 'q(h)' });
      if (A.k === 'd') {
        B.line(-H, A.d, H, A.d, B.C.c3, 1.4, [6, 4]);
        B.text('f′(x₀) ≈ ' + show(A.d), H, A.d, B.C.c3, 'right', 'bottom');
      }
      B.fn(q, B.C.c1, 2.2);
      if (A.k === 'd') B.dot(0, A.d, B.C.c3, 5, true);
      if (A.k === 'c') { B.dot(0, A.l.v, B.C.c4, 5, true); B.dot(0, A.r.v, B.C.c4, 5, true); }
      if (S.hov != null && Math.abs(S.hov) > 0) {
        var v = q(S.hov);
        if (isFinite(v)) {
          B.line(S.hov, r[0], S.hov, r[1], B.C.muted, 1, [3, 3]);
          B.dot(S.hov, v, B.C.c5, 4);
          B.ptext('h = ' + p3(S.hov) + '，q(h) = ' + show(v), B.pad.l + 6, B.pad.t + 14, B.C.text, 'left');
        }
      }
    }
    function info() {
      if (S.err) { badBox(out, S.err); tb.innerHTML = ''; return; }
      if (!S.F) return;
      out.innerHTML = '差商 q(h) = [f(x₀ + h) − f(x₀)] / h（h ≠ 0）。' + verdict(S.an) +
        '<br><span class="muted">导数 f′(x₀) 就是 h → 0 时 q(h) 的极限。q(h) 在 h = 0 处没有定义，图中的空心点表示极限值（如果存在）。把鼠标移到图上可以读出 q(h)。数值判断只能帮助理解，不能代替证明。</span>';
      tb.innerHTML = '';
      if (!isFinite(S.y0)) return;
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'h'), h('th', null, 'q(h)'), h('th', null, 'q(−h)')));
      for (var j = 1; j <= 6; j++) {
        var t = Math.pow(10, -j);
        tab.appendChild(h('tr', null, h('td', null, '10' + sup(-j)), h('td', null, show(q(t))), h('td', null, show(q(-t)))));
      }
      tb.appendChild(tab);
    }
    load(DQ[i0]);
  };

  /* ---------- square：正方形面积的增量（微分概念的导出背景） ---------- */
  V.square = function (body, o) {
    var a0 = parseFloat(o && o.a);
    var S = { a: a0 >= 1 && a0 <= 3 ? a0 : 2, d: 0.6 };
    var c1 = U.ctl(body);
    var sa = U.slider('边长 $x_0$', 1, 3, 0.01, S.a, function (v) { S.a = v; refresh(); });
    var sd = U.slider('增量 $\\Delta x$', 0, 1, 0.001, S.d, function (v) { an.stop(); S.d = v; refresh(); }, function (v) { return fmt(v, 4); });
    c1.appendChild(sa.el); c1.appendChild(sd.el);
    var c2 = U.ctl(body);
    var bAnim = U.btn('▶ 让 Δx → 0', function () {
      if (an.running()) { an.stop(); return; }
      if (S.d < 0.01) setD(0.8);
      bAnim.textContent = '■ 停止'; an.start();
    });
    c2.appendChild(U.btn('Δx 减半', function () { an.stop(); setD(S.d / 2); }));
    c2.appendChild(bAnim);
    var B = U.board(body, { ratio: 0.7, draw: draw, label: '正方形面积的增量' });
    var out = U.outBox(body);
    var tb = h('div', { class: 'viz-scroll' });
    body.appendChild(tb);
    var an = U.animator(function () {
      var nd = S.d * 0.97;
      if (nd < 0.002) return false;
      setD(nd);
    }, function () { bAnim.textContent = '▶ 让 Δx → 0'; });
    B.drag(function (x, y) {
      an.stop();
      setD(Math.max(0, Math.min(1, Math.max(x, y) - S.a)));
    });
    function setD(v) { S.d = v; sd.set(v); setLabel(sd, fmt(v, 5)); refresh(); }
    function rect(x1, y1, x2, y2, fill, alpha, stroke) {
      var pts = [[x1, y1], [x2, y1], [x2, y2], [x1, y2]];
      B.ctx.save(); B.ctx.globalAlpha = alpha;
      B.poly(pts, null, 0, true, fill);
      B.ctx.restore();
      if (stroke) B.poly(pts, stroke, 1.4, true);
    }
    function draw(B) {
      var a = S.a, d = S.d, b = a + d, C = B.C;
      B.viewEq(-0.5, 4.5, -0.75, 4.4);
      rect(0, 0, a, a, C.band, 1, C.fg);
      if (d > 0) {
        rect(a, 0, b, a, C.c3, 0.35, C.c3);
        rect(0, a, a, b, C.c3, 0.35, C.c3);
        rect(a, a, b, b, C.bad, 0.55, C.bad);
      }
      B.text('x₀² = ' + p3(a * a), a / 2, a / 2, C.text, 'center', 'middle', U.FONT_B);
      var px = B.X(b) - B.X(a);
      if (px > 40) {
        B.text('x₀Δx', a + d / 2, a / 2, C.c3, 'center', 'middle', U.FONT_B);
        B.text('x₀Δx', a / 2, a + d / 2, C.c3, 'center', 'middle', U.FONT_B);
      }
      if (px > 36) B.text('(Δx)²', a + d / 2, a + d / 2, C.bad, 'center', 'middle');
      var yl = -0.32;
      B.line(0, yl, a, yl, C.muted, 1);
      B.line(0, yl - 0.08, 0, yl + 0.08, C.muted, 1);
      B.line(a, yl - 0.08, a, yl + 0.08, C.muted, 1);
      B.text('x₀ = ' + p3(a), a / 2, yl - 0.12, C.muted, 'center', 'top');
      if (d > 0) {
        B.line(a, yl, b, yl, C.c1, 2);
        B.line(b, yl - 0.08, b, yl + 0.08, C.c1, 1);
        if (px > 30) B.text('Δx', a + d / 2, yl - 0.12, C.c1, 'center', 'top');
      }
      B.dot(b, b, C.bad, 5);
    }
    function refresh() { B.draw(); info(); }
    function info() {
      var a = S.a, d = S.d, lin = 2 * a * d, q = d * d, tot = lin + q;
      var s = 'ΔS = (x₀ + Δx)² − x₀² = <b>2x₀Δx</b> + (Δx)² = ' + show(lin) + ' + ' + show(q) + ' = ' + show(tot) + '。';
      if (d > 0) s += '<br>角上的小正方形 (Δx)² 只占 ΔS 的 <b>' + p3(100 * q / tot) + '%</b>；(Δx)² / Δx = Δx = ' + show(d) + '。';
      s += '<br><span class="muted">Δx → 0 时 (Δx)² 是比 Δx 高阶的无穷小，2x₀Δx 是 ΔS 的线性主部，也就是面积的微分 dS = 2x₀ dx。可以拖动图中右上角的红点改变 Δx。</span>';
      out.innerHTML = s;
      tb.innerHTML = '';
      var tab = h('table', { class: 'viz-tbl' }, h('tr', null, h('th', null, 'Δx'), h('th', null, 'ΔS'), h('th', null, '2x₀Δx'), h('th', null, '(Δx)²'), h('th', null, '(Δx)² 占 ΔS 的比例')));
      [1, 0.1, 0.01, 0.001, 0.0001].forEach(function (t) {
        var l = 2 * a * t, r = t * t;
        tab.appendChild(h('tr', null, h('td', null, String(t)), h('td', null, show(l + r)), h('td', null, show(l)), h('td', null, show(r)), h('td', null, p3(100 * r / (l + r)) + '%')));
      });
      tb.appendChild(tab);
    }
    refresh();
  };
})();
