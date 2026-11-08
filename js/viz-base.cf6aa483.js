/* viz-base.js —— 互动演示组件（一）：公共绘图工具 + 第一章组件
 * 组件约定：MA.viz.名称 = function (body, opts)，opts 为 <x-viz> 标签上的全部属性（字符串）。
 * 本文件提供：plot（函数作图）、curve（参数方程/极坐标曲线）、venn（集合运算与恒等式检验）、
 *            enumq（有理数的列举）、diagonal（Cantor 对角线法）、means（平均值不等式）
 */
(function () {
  'use strict';
  var MA = window.MA = window.MA || {};
  var V = MA.viz = MA.viz || {};
  function h() { return MA.h.apply(null, arguments); }

  /* ================= 小工具 ================= */
  var SUB = '₀₁₂₃₄₅₆₇₈₉', SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹';
  function sub(n) { return String(n).replace(/\d/g, function (d) { return SUB.charAt(+d); }); }
  function sup(n) { return String(n).replace(/\d/g, function (d) { return SUP.charAt(+d); }).replace('-', '⁻'); }
  function num(v, d) { var x = parseFloat(v); return isFinite(x) ? x : d; }
  function fmt(x, d) {
    if (x === Infinity) return '+∞';
    if (x === -Infinity) return '−∞';
    if (typeof x !== 'number' || isNaN(x)) return '—';
    if (d == null) d = 6;
    var a = Math.abs(x), s;
    if (a !== 0 && (a >= 1e9 || a < 1e-6 || (d >= 2 && a < 0.5 * Math.pow(10, -d)))) {
      var e = Math.floor(Math.log10(a)), m = x / Math.pow(10, e);
      if (Math.abs(m) >= 9.9995) { m /= 10; e += 1; }
      s = m.toFixed(Math.max(1, Math.min(d, 4))).replace(/\.?0+$/, '') + '×10' + sup(e);
    } else {
      s = x.toFixed(d);
      if (s.indexOf('.') !== -1) s = s.replace(/0+$/, '').replace(/\.$/, '');
    }
    if (/^-0(\.0*)?$/.test(s)) s = '0';
    return s.replace(/^-/, '−');
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function nice(raw) {
    if (!(raw > 0) || !isFinite(raw)) return 1;
    var p = Math.pow(10, Math.floor(Math.log10(raw))), f = raw / p;
    return (f < 1.5 ? 1 : f < 3.5 ? 2 : f < 7.5 ? 5 : 10) * p;
  }
  /* sci 为真时用 m×10ⁿ 的形式（坐标数值很大或很小时，普通写法会超出边距） */
  function tickLabel(v, step, sci) {
    if (sci && v !== 0) {
      var e = Math.floor(Math.log10(Math.abs(v)) + 1e-9), m = v / Math.pow(10, e);
      var ms = m.toFixed(Math.max(0, Math.min(3, e - Math.floor(Math.log10(step) + 1e-9))));
      if (ms.indexOf('.') !== -1) ms = ms.replace(/0+$/, '').replace(/\.$/, '');
      return (ms + '×10' + sup(e)).replace(/^-/, '−');
    }
    var dec = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
    var s = v.toFixed(Math.min(dec, 8));
    if (/^-0(\.0*)?$/.test(s)) s = '0';
    return s.replace(/^-/, '−');
  }
  function sciAxis(a, b) {
    var m = Math.max(Math.abs(a), Math.abs(b));
    return m >= 1e5 || (m > 0 && m < 1e-3);
  }
  function colors() {
    var c = {};
    [['bg', 'viz-bg'], ['grid', 'viz-grid'], ['axis', 'viz-axis'], ['text', 'viz-text'], ['c1'], ['c2'], ['c3'], ['c4'],
      ['c5'], ['c6'], ['c7'], ['band'], ['band2'], ['fg'], ['muted'], ['ok'], ['bad']].forEach(function (p) {
      c[p[0]] = MA.color(p[1] || p[0]);
    });
    return c;
  }
  var FONT = '12px system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif';
  var FONT_B = 'bold 14px system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", sans-serif';
  /** 编译表达式，失败时抛出带中文说明的错误 */
  function compileF(src, vars) {
    if (!String(src).trim()) throw new Error('表达式为空');
    return MA.expr.compile(src, vars);
  }
  /** 解析 presets 属性："名称::表达式::附加;;名称::表达式" */
  function presets(str) {
    if (!str) return [];
    return String(str).split(';;').map(function (s) { return s.split('::').map(function (t) { return t.trim(); }); })
      .filter(function (p) { return p[0]; });
  }

  /* ================= 画板 ================= */
  function board(parent, opt) {
    opt = opt || {};
    var cv = h('canvas', { role: 'img', 'aria-label': opt.label || '演示图像' });
    parent.appendChild(cv);
    var ctx = cv.getContext('2d');
    var B = { cv: cv, ctx: ctx, w: 600, h: 340, x0: 0, x1: 1, y0: 0, y1: 1, C: colors(),
      pad: Object.assign({ l: 46, r: 14, t: 14, b: 28 }, opt.pad || {}) };
    B.size = function () {
      var W = Math.round(cv.getBoundingClientRect().width) || parent.clientWidth || 600;
      W = Math.max(220, W);
      var H = opt.height ? Math.round(opt.height(W)) :
        Math.round(Math.max(opt.min || 220, Math.min(opt.max || 430, W * (opt.ratio || 0.56))));
      var d = window.devicePixelRatio || 1;
      cv.style.height = H + 'px';
      if (cv.width !== Math.round(W * d)) cv.width = Math.round(W * d);
      if (cv.height !== Math.round(H * d)) cv.height = Math.round(H * d);
      ctx.setTransform(d, 0, 0, d, 0, 0);
      B.w = W; B.h = H;
    };
    B.view = function (x0, x1, y0, y1) { B.x0 = x0; B.x1 = x1; B.y0 = y0; B.y1 = y1; };
    /** 等比例视图：保证 x、y 方向单位长度相同 */
    B.viewEq = function (x0, x1, y0, y1) {
      var pw = B.w - B.pad.l - B.pad.r, ph = B.h - B.pad.t - B.pad.b;
      var s = Math.max((x1 - x0) / pw, (y1 - y0) / ph) || 1;
      var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      B.view(cx - s * pw / 2, cx + s * pw / 2, cy - s * ph / 2, cy + s * ph / 2);
    };
    B.X = function (x) { return B.pad.l + (x - B.x0) / (B.x1 - B.x0) * (B.w - B.pad.l - B.pad.r); };
    B.Y = function (y) { return B.h - B.pad.b - (y - B.y0) / (B.y1 - B.y0) * (B.h - B.pad.t - B.pad.b); };
    B.ix = function (px) { return B.x0 + (px - B.pad.l) / (B.w - B.pad.l - B.pad.r) * (B.x1 - B.x0); };
    B.iy = function (py) { return B.y0 + (B.h - B.pad.b - py) / (B.h - B.pad.t - B.pad.b) * (B.y1 - B.y0); };
    B.clip = function () {
      ctx.save();
      ctx.beginPath();
      ctx.rect(B.pad.l, B.pad.t, B.w - B.pad.l - B.pad.r, B.h - B.pad.t - B.pad.b);
      ctx.clip();
    };
    B.unclip = function () { ctx.restore(); };
    /** 网格、坐标轴与刻度。o: {intX, sx, sy, fx, fy, xl, yl, noY} */
    B.grid = function (o) {
      o = o || {};
      var C = B.C, pl = B.pad.l, pr = B.w - B.pad.r, pt = B.pad.t, pb = B.h - B.pad.b;
      var sx = o.sx || nice((B.x1 - B.x0) / Math.max(2, (pr - pl) / 72));
      var sy = o.sy || nice((B.y1 - B.y0) / Math.max(2, (pb - pt) / 44));
      if (o.intX) sx = Math.max(1, Math.round(sx));
      var sciX = sciAxis(B.x0, B.x1), sciY = sciAxis(B.y0, B.y1);
      var k, v, p;
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = C.grid;
      ctx.beginPath();
      for (k = Math.ceil(B.x0 / sx - 1e-9); k * sx <= B.x1 + 1e-9 * sx; k++) { p = Math.round(B.X(k * sx)) + 0.5; ctx.moveTo(p, pt); ctx.lineTo(p, pb); }
      for (k = Math.ceil(B.y0 / sy - 1e-9); k * sy <= B.y1 + 1e-9 * sy; k++) { p = Math.round(B.Y(k * sy)) + 0.5; ctx.moveTo(pl, p); ctx.lineTo(pr, p); }
      ctx.stroke();
      ctx.strokeStyle = C.axis;
      ctx.beginPath();
      var ax = (B.y0 <= 0 && B.y1 >= 0) ? Math.round(B.Y(0)) + 0.5 : pb + 0.5;
      var ay = (B.x0 <= 0 && B.x1 >= 0 && !o.noY) ? Math.round(B.X(0)) + 0.5 : pl + 0.5;
      ctx.moveTo(pl, ax); ctx.lineTo(pr, ax);
      ctx.moveTo(ay, pt); ctx.lineTo(ay, pb);
      ctx.stroke();
      ctx.font = FONT;
      ctx.fillStyle = C.text;
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      for (k = Math.ceil(B.x0 / sx - 1e-9); k * sx <= B.x1 + 1e-9 * sx; k++) {
        v = k * sx; p = B.X(v);
        ctx.fillText(o.fx ? o.fx(v) : tickLabel(v, sx, sciX), Math.min(pr - 8, Math.max(pl + 8, p)), pb + 6);
      }
      ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
      var yls = [], wmax = 0;
      for (k = Math.ceil(B.y0 / sy - 1e-9); k * sy <= B.y1 + 1e-9 * sy; k++) {
        v = k * sy;
        var ys = o.fy ? o.fy(v) : tickLabel(v, sy, sciY);
        yls.push([ys, B.Y(v)]);
        wmax = Math.max(wmax, ctx.measureText(ys).width);
      }
      /* 标签比左边距宽时缩小字号，避免被画布边缘截掉 */
      if (wmax > pl - 7 && pl > 20) ctx.font = Math.max(8, Math.floor(12 * (pl - 7) / wmax)) + FONT.slice(FONT.indexOf('px'));
      yls.forEach(function (q) { ctx.fillText(q[0], pl - 5, Math.min(pb - 5, Math.max(pt + 5, q[1]))); });
      ctx.font = FONT;
      if (o.xl) { ctx.textAlign = 'right'; ctx.textBaseline = 'bottom'; ctx.fillText(o.xl, pr - 2, ax - 3); }
      if (o.yl) { ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillText(o.yl, ay + 5, pt + 1); }
      ctx.restore();
    };
    function jumps(f, xa, ya, xb, yb) {
      for (var k = 0; k < 44; k++) {
        var xm = (xa + xb) / 2, ym;
        try { ym = f(xm); } catch (e) { return true; }
        if (typeof ym !== 'number' || !isFinite(ym)) return true;
        if (Math.abs(ym - ya) > Math.abs(yb - ym)) { xb = xm; yb = ym; } else { xa = xm; ya = ym; }
        if (Math.abs(B.Y(yb) - B.Y(ya)) < 1) return false;
      }
      return true;
    }
    /** 画 y=f(x) 的图像，自动在间断处断开 */
    B.fn = function (f, color, width, dash, xa0, xb0) {
      var lo0 = xa0 != null ? Math.max(B.x0, xa0) : B.x0, hi0 = xb0 != null ? Math.min(B.x1, xb0) : B.x1;
      if (!(hi0 > lo0)) return;
      var n = Math.max(240, Math.round((B.X(hi0) - B.X(lo0)) * 1.5));
      var span = B.y1 - B.y0, hi = B.y1 + 3 * span, lo = B.y0 - 3 * span;
      B.clip();
      ctx.strokeStyle = color; ctx.lineWidth = width || 2; ctx.lineJoin = 'round';
      if (dash) ctx.setLineDash(dash);
      ctx.beginPath();
      var pen = false, xa = 0, ya = 0;
      for (var i = 0; i <= n; i++) {
        var x = lo0 + (hi0 - lo0) * i / n, y;
        try { y = f(x); } catch (e) { y = NaN; }
        if (typeof y !== 'number' || !isFinite(y)) { pen = false; continue; }
        if (pen && Math.abs(B.Y(y) - B.Y(ya)) > 2 && jumps(f, xa, ya, x, y)) pen = false;
        var yy = Math.max(lo, Math.min(hi, y));
        if (pen) ctx.lineTo(B.X(x), B.Y(yy)); else ctx.moveTo(B.X(x), B.Y(yy));
        pen = true; xa = x; ya = y;
      }
      ctx.stroke();
      B.unclip();
    };
    B.line = function (x1, y1, x2, y2, color, width, dash) {
      ctx.save();
      ctx.strokeStyle = color || B.C.axis; ctx.lineWidth = width || 1.5;
      if (dash) ctx.setLineDash(dash);
      ctx.beginPath(); ctx.moveTo(B.X(x1), B.Y(y1)); ctx.lineTo(B.X(x2), B.Y(y2)); ctx.stroke();
      ctx.restore();
    };
    /** 折线/多边形，pts=[[x,y],...] */
    B.poly = function (pts, color, width, close, fill, dash) {
      if (!pts.length) return;
      ctx.save();
      ctx.beginPath();
      var pen = false;
      pts.forEach(function (p) {
        if (!p || !isFinite(p[0]) || !isFinite(p[1])) { pen = false; return; }
        if (pen) ctx.lineTo(B.X(p[0]), B.Y(p[1])); else ctx.moveTo(B.X(p[0]), B.Y(p[1]));
        pen = true;
      });
      if (close) ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (color) { ctx.strokeStyle = color; ctx.lineWidth = width || 1.5; ctx.lineJoin = 'round'; if (dash) ctx.setLineDash(dash); ctx.stroke(); }
      ctx.restore();
    };
    B.dot = function (x, y, color, r, hollow) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(B.X(x), B.Y(y), r || 3.5, 0, 2 * Math.PI);
      if (hollow) { ctx.fillStyle = B.C.bg; ctx.fill(); ctx.strokeStyle = color; ctx.lineWidth = 1.6; ctx.stroke(); }
      else { ctx.fillStyle = color; ctx.fill(); }
      ctx.restore();
    };
    B.ptext = function (s, px, py, color, align, base, font) {
      ctx.save();
      ctx.font = font || FONT;
      ctx.fillStyle = color || B.C.text;
      ctx.textAlign = align || 'left';
      ctx.textBaseline = base || 'alphabetic';
      ctx.fillText(s, px, py);
      ctx.restore();
    };
    B.text = function (s, x, y, color, align, base, font) { B.ptext(s, B.X(x), B.Y(y), color, align, base, font); };
    B.hband = function (ya, yb, color) {
      var p1 = B.Y(Math.max(ya, yb)), p2 = B.Y(Math.min(ya, yb));
      B.clip();
      ctx.fillStyle = color;
      ctx.fillRect(B.pad.l, p1, B.w - B.pad.l - B.pad.r, p2 - p1);
      B.unclip();
    };
    B.vband = function (xa, xb, color) {
      var p1 = B.X(Math.min(xa, xb)), p2 = B.X(Math.max(xa, xb));
      B.clip();
      ctx.fillStyle = color;
      ctx.fillRect(p1, B.pad.t, p2 - p1, B.h - B.pad.t - B.pad.b);
      B.unclip();
    };
    function pos(e) { var r = cv.getBoundingClientRect(); return { px: e.clientX - r.left, py: e.clientY - r.top }; }
    /** 拖动：fn(x, y, 类型, 像素位置) */
    B.drag = function (fn) {
      var down = false;
      cv.style.cursor = 'crosshair';
      cv.addEventListener('pointerdown', function (e) {
        down = true;
        try { cv.setPointerCapture(e.pointerId); } catch (err) { /* 忽略 */ }
        var p = pos(e); fn(B.ix(p.px), B.iy(p.py), 'down', p);
      });
      cv.addEventListener('pointermove', function (e) { if (!down) return; var p = pos(e); fn(B.ix(p.px), B.iy(p.py), 'move', p); });
      cv.addEventListener('pointerup', function () { down = false; });
      cv.addEventListener('pointercancel', function () { down = false; });
    };
    /** 悬停读数：fn(x, y)；移出时 fn(null, null) */
    B.hover = function (fn) {
      cv.addEventListener('pointermove', function (e) { var p = pos(e); fn(B.ix(p.px), B.iy(p.py), p); });
      cv.addEventListener('pointerleave', function () { fn(null, null); });
    };
    B.draw = function () {
      if (!cv.isConnected) return;
      B.size();
      B.C = colors();
      ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.restore();
      ctx.fillStyle = B.C.bg;
      ctx.fillRect(0, 0, B.w, B.h);
      try { opt.draw(B); } catch (e) {
        console.error(e);
        B.ptext('绘图出错：' + e.message, 12, 22, B.C.bad);
      }
    };
    var raf = 0;
    function later() {
      if (!cv.isConnected) {
        window.removeEventListener('resize', later);
        window.removeEventListener('ma-theme', later);
        return;
      }
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(B.draw);
    }
    B.later = later;
    window.addEventListener('resize', later);
    window.addEventListener('ma-theme', later);
    return B;
  }

  /* ================= 表单控件 ================= */
  function ctl(parent) { var d = h('div', { class: 'viz-ctl' }); parent.appendChild(d); return d; }
  function field(lab, input, extra) {
    return h('label', null, lab ? h('span', { html: MA.mathify(lab) }) : null, input, extra || null);
  }
  function plain(lab) { return String(lab || '').replace(/\$/g, '').replace(/\\/g, ''); }
  function slider(lab, min, max, step, val, onInput, show) {
    var inp = h('input', { type: 'range', min: String(min), max: String(max), step: String(step), 'aria-label': plain(lab) });
    inp.value = String(val);
    var v = h('span', { class: 'val' });
    function upd() { v.textContent = show ? show(+inp.value) : fmt(+inp.value, 4); }
    inp.addEventListener('input', function () { upd(); onInput(+inp.value); });
    upd();
    return { el: field(lab, inp, v), input: inp, get: function () { return +inp.value; },
      set: function (x) { inp.value = String(x); upd(); } };
  }
  function textIn(lab, val, onEnter, width) {
    var inp = h('input', { type: 'text', spellcheck: 'false', autocomplete: 'off', 'aria-label': plain(lab) || '输入', style: width ? 'width:' + width : null });
    inp.value = val == null ? '' : String(val);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); onEnter(); } });
    return { el: field(lab, inp), input: inp };
  }
  function numIn(lab, val, onChange, step) {
    var inp = h('input', { type: 'number', step: step || 'any', 'aria-label': plain(lab) });
    inp.value = String(val);
    inp.addEventListener('change', onChange);
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') onChange(); });
    return { el: field(lab, inp), input: inp, get: function (d) { return num(inp.value, d); },
      set: function (x) { inp.value = String(+(+x).toPrecision(6)); } };
  }
  function selectIn(lab, items, onChange) {
    var s = h('select', { 'aria-label': plain(lab) || '选择' }, items.map(function (it) { return h('option', { value: String(it[0]) }, it[1]); }));
    s.addEventListener('change', function () { onChange(s.value, s.selectedIndex); });
    return { el: field(lab, s), input: s };
  }
  function btn(text, onClick, primary) {
    return h('button', { type: 'button', class: 'viz-btn' + (primary ? ' primary' : ''), onclick: onClick }, text);
  }
  function outBox(parent) { var d = h('div', { class: 'viz-out', 'aria-live': 'polite' }); parent.appendChild(d); return d; }
  /** 简单的逐帧动画：step() 返回 false 时停止 */
  function animator(step, onStop) {
    var id = 0, on = false;
    function tick() {
      if (!on) return;
      if (step() === false) { stop(); return; }
      id = requestAnimationFrame(tick);
    }
    function start() { if (on) return; on = true; id = requestAnimationFrame(tick); }
    function stop() { if (!on) return; on = false; cancelAnimationFrame(id); if (onStop) onStop(); }
    return { start: start, stop: stop, running: function () { return on; } };
  }

  MA.vizUtil = { board: board, fmt: fmt, num: num, nice: nice, sub: sub, sup: sup, gcd: gcd, colors: colors,
    ctl: ctl, field: field, slider: slider, textIn: textIn, numIn: numIn, selectIn: selectIn, btn: btn,
    outBox: outBox, animator: animator, compileF: compileF, presets: presets, FONT: FONT, FONT_B: FONT_B };

  var CL = ['c1', 'c2', 'c3', 'c5', 'c4', 'c6', 'c7'];

  /* ================= plot：函数作图 =================
   * 属性：f（可用 ; 分隔多个函数）、xmin xmax ymin ymax、presets="名称::表达式::x0,x1,y0,y1;;..."、
   *       a（出现时显示参数 a 的滑块）amin amax astep、autoy（拖动滑块时自动调整 y 范围）、ratio
   * 特殊预设表达式：@riemann（Riemann 函数）、@dirichlet（Dirichlet 函数）
   */
  V.plot = function (body, o) {
    var P = presets(o.presets);
    var hasA = o.a != null;
    var autoA = o.autoy != null && o.autoy !== '0';
    var S = { fs: [], srcs: [], special: null, a: num(o.a, 1),
      x0: num(o.xmin, -5), x1: num(o.xmax, 5), y0: num(o.ymin, -3), y1: num(o.ymax, 3) };
    var hov = null;
    var c1 = ctl(body);
    var sel = null;
    if (P.length) {
      sel = selectIn('预设', P.map(function (p, i) { return [i, p[0]]; }), function (v) { applyPreset(+v); });
      c1.appendChild(sel.el);
    }
    var fin = textIn('$y=$', o.f || (P[0] ? P[0][1] : 'x^2'), setF, '15em');
    c1.appendChild(fin.el);
    c1.appendChild(btn('作图', setF, true));
    var c2 = ctl(body);
    var nx0 = numIn('$x$ 从', S.x0, rng), nx1 = numIn('到', S.x1, rng), ny0 = numIn('$y$ 从', S.y0, rng), ny1 = numIn('到', S.y1, rng);
    [nx0, nx1, ny0, ny1].forEach(function (n) { c2.appendChild(n.el); });
    c2.appendChild(btn('自动调整 y 范围', autoY));
    if (hasA) {
      var c3 = ctl(body);
      c3.appendChild(slider('参数 $a=$', num(o.amin, -3), num(o.amax, 3), num(o.astep, 0.1), S.a, function (v) { S.a = v; if (autoA) autoY(); B.draw(); legend(); }).el);
    }
    var B = board(body, { ratio: num(o.ratio, 0.58), draw: draw, label: '函数图像' });
    var out = outBox(body);
    var read = h('div', { class: 'small muted' });
    body.appendChild(read);
    B.hover(function (x) {
      hov = (x == null || x < B.x0 || x > B.x1) ? null : x;
      B.later();
      readout();
    });
    function rng() {
      var a = nx0.get(S.x0), b = nx1.get(S.x1), c = ny0.get(S.y0), d = ny1.get(S.y1);
      if (b > a) { S.x0 = a; S.x1 = b; }
      if (d > c) { S.y0 = c; S.y1 = d; }
      B.draw();
    }
    function setRange(r) {
      S.x0 = r[0]; S.x1 = r[1]; S.y0 = r[2]; S.y1 = r[3];
      nx0.set(S.x0); nx1.set(S.x1); ny0.set(S.y0); ny1.set(S.y1);
    }
    function applyPreset(i) {
      var p = P[i];
      if (!p) return;
      fin.input.value = p[1];
      if (p[2]) {
        var r = p[2].split(',').map(function (t) { return MA.expr.value(t); });
        if (r.length === 4 && r.every(isFinite)) setRange(r);
      }
      setF();
    }
    function setF() {
      var src = fin.input.value.trim();
      S.special = null; S.fs = []; S.srcs = [];
      out.innerHTML = '';
      if (src === '@riemann' || src === '@dirichlet') { S.special = src.slice(1); B.draw(); legend(); return; }
      var parts = src.split(/[;；]/).map(function (t) { return t.trim(); }).filter(Boolean);
      try {
        parts.forEach(function (t) { S.fs.push(compileF(t, ['x', 'a'])); S.srcs.push(t); });
      } catch (e) {
        S.fs = []; S.srcs = [];
        out.innerHTML = '<span class="bad">无法解析：' + MA.esc(e.message) + '</span>（写法示例：x^2 sin(1/x)、[x]、|x|、sh x、e^(-x^2)）';
      }
      B.draw();
      legend();
    }
    function autoY() {
      if (S.special || !S.fs.length) return;
      var vals = [];
      S.fs.forEach(function (f) {
        for (var i = 0; i <= 400; i++) {
          var x = S.x0 + (S.x1 - S.x0) * i / 400, y;
          try { y = f(x, S.a); } catch (e) { y = NaN; }
          if (isFinite(y)) vals.push(y);
        }
      });
      if (!vals.length) return;
      vals.sort(function (a, b) { return a - b; });
      var lo = vals[Math.floor(vals.length * 0.02)], hi = vals[Math.ceil(vals.length * 0.98) - 1];
      if (!(hi > lo)) { lo -= 1; hi += 1; }
      var m = (hi - lo) * 0.12;
      setRange([S.x0, S.x1, +(lo - m).toPrecision(3), +(hi + m).toPrecision(3)]);
      B.draw();
    }
    function legend() {
      if (S.special === 'riemann') {
        out.innerHTML = MA.mathify('Riemann 函数：$x=\\frac pq$（既约，$q\\ge 1$）时 $R(x)=\\frac1q$，$R(0)=1$；$x$ 为无理数时 $R(x)=0$。图中只画出了分母 $q$ 不太大的有理点（越小的点分母越大）。观察：任给 $\\varepsilon>0$，满足 $R(x)\\ge\\varepsilon$ 的点只有有限个。');
        return;
      }
      if (S.special === 'dirichlet') {
        out.innerHTML = MA.mathify('Dirichlet 函数：$x$ 为有理数时 $D(x)=1$，为无理数时 $D(x)=0$。有理数与无理数都处处稠密，所以它的图像“画不出来”——两条虚线只是示意：任何一小段区间里都同时有函数值 1 和 0。');
        return;
      }
      if (!S.fs.length) return;
      out.innerHTML = '';
      S.srcs.forEach(function (s, i) {
        out.appendChild(h('span', { style: 'display:inline-block;margin-right:1.4em' },
          h('b', { style: 'color:' + B.C[CL[i % CL.length]] }, '━ '), 'y' + (S.srcs.length > 1 ? sub(i + 1) : '') + ' = ' + s));
      });
      if (hasA) out.appendChild(h('span', { class: 'muted' }, '（a = ' + fmt(S.a, 3) + '）'));
    }
    function readout() {
      if (hov == null || S.special || !S.fs.length) { read.textContent = S.special ? '' : '提示：把鼠标移到图上可以读出函数值。'; return; }
      var s = 'x = ' + fmt(hov, 4);
      S.fs.forEach(function (f, i) {
        var y; try { y = f(hov, S.a); } catch (e) { y = NaN; }
        s += '，  y' + (S.fs.length > 1 ? sub(i + 1) : '') + ' = ' + fmt(y, 5);
      });
      read.textContent = s;
    }
    function drawRiemann(B) {
      var Q = Math.min(90, Math.max(14, Math.round(B.w / 8)));
      B.clip();
      for (var q = Q; q >= 1; q--) {
        var r = Math.max(1.1, 4.4 - Math.log(q) * 0.85);
        for (var p = Math.ceil(B.x0 * q); p <= Math.floor(B.x1 * q); p++) {
          if (gcd(p, q) !== 1) continue;
          B.dot(p / q, 1 / q, B.C.c1, r);
        }
      }
      B.unclip();
      B.line(B.x0, 0, B.x1, 0, B.C.c2, 2.5);
      var below = B.Y(0) + 20 < B.h - B.pad.b;
      B.ptext('无理点处函数值为 0（红线）', B.X(B.x1) - 6, below ? B.Y(0) + 5 : B.Y(0) - 8, B.C.c2, 'right', below ? 'top' : 'alphabetic');
    }
    function drawDirichlet(B) {
      B.line(B.x0, 1, B.x1, 1, B.C.c1, 2.5, [2, 3]);
      B.line(B.x0, 0, B.x1, 0, B.C.c2, 2.5, [2, 3]);
      B.ptext('有理点：D(x) = 1', B.X(B.x0) + 8, B.Y(1) - 8, B.C.c1);
      B.ptext('无理点：D(x) = 0', B.X(B.x0) + 8, B.Y(0) - 8, B.C.c2);
    }
    function draw(B) {
      B.view(S.x0, S.x1, S.y0, S.y1);
      B.grid({ xl: 'x', yl: 'y' });
      if (S.special === 'riemann') { drawRiemann(B); return; }
      if (S.special === 'dirichlet') { drawDirichlet(B); return; }
      S.fs.forEach(function (f, i) { B.fn(function (x) { return f(x, S.a); }, B.C[CL[i % CL.length]], 2.2); });
      if (hov != null) {
        B.line(hov, B.y0, hov, B.y1, B.C.axis, 1, [4, 4]);
        S.fs.forEach(function (f, i) {
          var y; try { y = f(hov, S.a); } catch (e) { y = NaN; }
          if (isFinite(y) && y >= B.y0 && y <= B.y1) B.dot(hov, y, B.C[CL[i % CL.length]], 4);
        });
      }
    }
    if (P.length && !o.f) applyPreset(0); else setF();
    if (autoA) autoY();
    readout();
  };

  /* ================= curve：参数方程与极坐标曲线 ================= */
  var CURVES = [
    { n: '摆线（旋轮线）', m: 'param', x: 't - sin t', y: '1 - cos t', t0: '0', t1: '4pi', roll: true },
    { n: '星形线', m: 'param', x: 'cos^3 t', y: 'sin^3 t', t0: '0', t1: '2pi' },
    { n: '椭圆', m: 'param', x: '2cos t', y: 'sin t', t0: '0', t1: '2pi' },
    { n: '斜抛运动轨迹（单位：m, s）', m: 'param', x: '20t', y: '20t - 4.9t^2', t0: '0', t1: '40/9.8' },
    { n: '心形线', m: 'polar', r: '1 + cos θ', t0: '0', t1: '2pi' },
    { n: '双纽线', m: 'polar', r: 'sqrt(2cos(2θ))', t0: '0', t1: '2pi' },
    { n: 'Archimedes 螺线', m: 'polar', r: 'θ/(2pi)', t0: '0', t1: '6pi' },
    { n: '三叶玫瑰线', m: 'polar', r: 'sin(3θ)', t0: '0', t1: 'pi' },
    { n: '对数螺线', m: 'polar', r: 'e^(0.15θ)', t0: '-4pi', t1: '2pi' }
  ];
  V.curve = function (body, o) {
    var S = { k: 0, m: 'param', fx: null, fy: null, fr: null, t0: 0, t1: 1, u: 1, pts: [], roll: false };
    var c1 = ctl(body);
    var sel = selectIn('曲线', CURVES.map(function (c, i) { return [i, c.n]; }), function (v) { load(+v); });
    c1.appendChild(sel.el);
    var c2 = ctl(body);
    var ix = textIn('$x(t)=$', '', build, '10em'), iy = textIn('$y(t)=$', '', build, '10em'), ir = textIn('$r(\\theta)=$', '', build, '12em');
    var it0 = textIn('参数从', '', build, '5em'), it1 = textIn('到', '', build, '5em');
    [ix, iy, ir, it0, it1].forEach(function (x) { c2.appendChild(x.el); });
    c2.appendChild(btn('作图', build, true));
    var c3 = ctl(body);
    var su = slider('描点进度', 0, 1, 0.002, 1, function (v) { S.u = v; B.draw(); info(); }, function (v) { return Math.round(v * 100) + '%'; });
    c3.appendChild(su.el);
    var play = btn('▶ 播放', function () { if (anim.running()) anim.stop(); else { if (S.u >= 1) S.u = 0; play.textContent = '⏸ 暂停'; anim.start(); } });
    c3.appendChild(play);
    var anim = animator(function () {
      S.u = Math.min(1, S.u + 0.004);
      su.set(S.u); B.draw(); info();
      if (!B.cv.isConnected) return false;
      return S.u < 1;
    }, function () { play.textContent = '▶ 播放'; });
    var B = board(body, { ratio: 0.62, max: 460, draw: draw, label: '曲线图像' });
    var out = outBox(body);
    function load(i) {
      var c = CURVES[i];
      S.k = i; S.roll = !!c.roll;
      if (c.m === 'param') { ix.input.value = c.x; iy.input.value = c.y; } else ir.input.value = c.r;
      it0.input.value = c.t0; it1.input.value = c.t1;
      setMode(c.m);
      build();
    }
    function setMode(m) {
      S.m = m;
      ix.el.hidden = iy.el.hidden = m !== 'param';
      ir.el.hidden = m !== 'polar';
    }
    function build() {
      out.innerHTML = '';
      try {
        S.t0 = MA.expr.value(it0.input.value); S.t1 = MA.expr.value(it1.input.value);
        if (!(S.t1 > S.t0)) throw new Error('参数范围的终点必须大于起点');
        if (S.m === 'param') { S.fx = compileF(ix.input.value, ['t']); S.fy = compileF(iy.input.value, ['t']); }
        else S.fr = compileF(ir.input.value, ['theta', 't']);
      } catch (e) {
        S.pts = [];
        out.innerHTML = '<span class="bad">无法作图：' + MA.esc(e.message) + '</span>';
        B.draw();
        return;
      }
      var N = 1600;
      S.pts = [];
      for (var i = 0; i <= N; i++) S.pts.push(at(S.t0 + (S.t1 - S.t0) * i / N));
      B.draw();
      info();
    }
    function at(t) {
      var x, y;
      try {
        if (S.m === 'param') { x = S.fx(t); y = S.fy(t); }
        else { var r = S.fr(t, t); x = r * Math.cos(t); y = r * Math.sin(t); }
      } catch (e) { x = y = NaN; }
      return isFinite(x) && isFinite(y) ? [x, y] : null;
    }
    function draw(B) {
      var good = S.pts.filter(Boolean);
      if (!good.length) { B.view(-1, 1, -1, 1); B.grid(); return; }
      var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      good.forEach(function (p) { x0 = Math.min(x0, p[0]); x1 = Math.max(x1, p[0]); y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); });
      if (S.roll) { y0 = Math.min(y0, 0); y1 = Math.max(y1, 2); }
      if (S.m === 'polar') { x0 = Math.min(x0, 0); x1 = Math.max(x1, 0); y0 = Math.min(y0, 0); y1 = Math.max(y1, 0); }
      var mx = (x1 - x0) * 0.08 || 1, my = (y1 - y0) * 0.08 || 1;
      B.viewEq(x0 - mx, x1 + mx, y0 - my, y1 + my);
      B.grid({ xl: 'x', yl: 'y' });
      var cut = Math.round(S.u * (S.pts.length - 1));
      B.clip();
      B.poly(S.pts, B.C.c1, 1.2, false, null, [3, 4]);
      B.poly(S.pts.slice(0, cut + 1), B.C.c1, 2.6);
      var t = S.t0 + (S.t1 - S.t0) * S.u, p = at(t);
      if (p) {
        if (S.m === 'polar') B.line(0, 0, p[0], p[1], B.C.c4, 1.5, [5, 4]);
        if (S.roll) {
          B.ctx.save();
          B.ctx.strokeStyle = B.C.c3; B.ctx.lineWidth = 1.6;
          B.ctx.beginPath();
          B.ctx.arc(B.X(t), B.Y(1), Math.abs(B.X(1) - B.X(0)), 0, 2 * Math.PI);
          B.ctx.stroke();
          B.ctx.restore();
          B.line(t, 1, p[0], p[1], B.C.c3, 1.6);
          B.dot(t, 1, B.C.c3, 3);
        }
        B.dot(p[0], p[1], B.C.c2, 5);
      }
      B.unclip();
    }
    function info() {
      var t = S.t0 + (S.t1 - S.t0) * S.u, p = at(t);
      var tt = (S.m === 'polar' ? 'θ' : 't') + ' = ' + fmt(t, 3) + '（≈ ' + fmt(t / Math.PI, 3) + 'π）';
      var s = tt + (p ? '，点 (x, y) = (' + fmt(p[0], 3) + ', ' + fmt(p[1], 3) + ')' : '，此处曲线无定义');
      if (S.m === 'polar' && p) s += '，r = ' + fmt(S.fr(t, t), 3);
      out.textContent = s;
    }
    var k0 = Math.min(CURVES.length - 1, Math.max(0, Math.round(num(o.start, 0))));
    sel.input.value = String(k0);
    load(k0);
  };

  /* ================= venn：集合运算与恒等式检验 ================= */
  var VENN_PRE = [
    ['De Morgan 律（一）', '(A∪B)ᶜ', 'Aᶜ∩Bᶜ'],
    ['De Morgan 律（二）', '(A∩B)ᶜ', 'Aᶜ∪Bᶜ'],
    ['交对并的分配律', 'A∩(B∪C)', '(A∩B)∪(A∩C)'],
    ['并对交的分配律', 'A∪(B∩C)', '(A∪B)∩(A∪C)'],
    ['差集的 De Morgan 律（一）', 'A\\(B∪C)', '(A\\B)∩(A\\C)'],
    ['差集的 De Morgan 律（二）', 'A\\(B∩C)', '(A\\B)∪(A\\C)'],
    ['差集与补集', 'A\\B', 'A∩Bᶜ'],
    ['对称差', 'A△B', '(A\\B)∪(B\\A)'],
    ['吸收律', 'A∪(A∩B)', 'A'],
    ['差运算满足结合律吗？', 'A\\(B\\C)', '(A\\B)\\C'],
    ['先并后差能还原吗？', '(A∪B)\\B', 'A']
  ];
  var MASK = [170, 204, 240];
  function setParse(src) {
    var s = String(src).replace(/\s+/g, '')
      .replace(/\^c/g, 'ᶜ').replace(/['’′]/g, 'ᶜ')
      .replace(/a/g, 'A').replace(/b/g, 'B');
    /* 小写 c 紧跟在集合、右括号或补集号之后时表示补集（如 Ac、(A∪B)c），否则表示集合 C */
    while (/[ABCUΩ∅)ᶜc]c/.test(s)) s = s.replace(/([ABCUΩ∅)ᶜc])c/g, '$1ᶜ');
    s = s.replace(/c/g, 'C')
      .replace(/[+|]/g, '∪').replace(/[*&]/g, '∩').replace(/[-－−]/g, '\\').replace(/[Δ∆⊕]/g, '△')
      .replace(/（/g, '(').replace(/）/g, ')').replace(/[ØΦφ]/g, '∅');
    var i = 0, used = {};
    function peek() { return s.charAt(i); }
    function expr() {
      var v = inter();
      for (;;) {
        var c = peek();
        if (c === '∪') { i++; v = v | inter(); }
        else if (c === '\\') { i++; v = v & ~inter() & 255; }
        else if (c === '△') { i++; v = v ^ inter(); }
        else return v;
      }
    }
    function inter() { var v = post(); while (peek() === '∩') { i++; v = v & post(); } return v; }
    function post() { var v = prim(); while (peek() === 'ᶜ') { i++; v = ~v & 255; } return v; }
    function prim() {
      var c = s.charAt(i++);
      if (c === '(') {
        var v = expr();
        if (s.charAt(i++) !== ')') throw new Error('括号不匹配');
        return v;
      }
      var k = 'ABC'.indexOf(c);
      if (c && k !== -1) { used[c] = 1; return MASK[k]; }
      if (c === 'U' || c === 'Ω') return 255;
      if (c === '∅') return 0;
      if (!c) throw new Error('表达式不完整');
      throw new Error('无法识别的符号“' + c + '”');
    }
    if (!s) throw new Error('表达式为空');
    var v = expr();
    if (i < s.length) throw new Error('多余的符号“' + s.charAt(i) + '”');
    return { mask: v, used: used };
  }
  function regionText(r, n) {
    var names = 'ABC'.slice(0, n).split('');
    var inn = names.filter(function (x, k) { return r >> k & 1; }), outn = names.filter(function (x, k) { return !(r >> k & 1); });
    var s = [];
    if (inn.length) s.push('属于 ' + inn.join('、'));
    if (outn.length) s.push('不属于 ' + outn.join('、'));
    return s.join('，');
  }
  V.venn = function (body, o) {
    var S = { L: null, R: null, n: 2, err: '' };
    var c1 = ctl(body);
    c1.appendChild(selectIn('例子', VENN_PRE.map(function (p, i) { return [i, p[0]]; }), function (v) {
      var p = VENN_PRE[+v]; inL.input.value = p[1]; inR.input.value = p[2]; run();
    }).el);
    var c2 = ctl(body);
    var inL = textIn('左边', o.left || VENN_PRE[0][1], run, '11em'), inR = textIn('右边', o.right || VENN_PRE[0][2], run, '11em');
    c2.appendChild(inL.el); c2.appendChild(inR.el);
    var last = inL.input;
    [inL.input, inR.input].forEach(function (x) {
      x.addEventListener('focus', function () { last = x; });
      var tm = 0;
      x.addEventListener('input', function () { clearTimeout(tm); tm = setTimeout(run, 250); });
    });
    var syms = h('span', { class: 'viz-sym', 'aria-label': '插入符号' }, ['∪', '∩', '\\', 'ᶜ', '△', '(', ')', '∅'].map(function (sy) {
      return h('button', { type: 'button', title: '插入 ' + sy, onmousedown: function (e) { e.preventDefault(); }, onclick: function () {
        var a = last.selectionStart == null ? last.value.length : last.selectionStart, b = last.selectionEnd == null ? a : last.selectionEnd;
        last.value = last.value.slice(0, a) + sy + last.value.slice(b);
        last.focus();
        last.setSelectionRange(a + sy.length, a + sy.length);
        run();
      } }, sy);
    }));
    c2.appendChild(syms);
    var B = board(body, { height: function (W) { return W >= 520 ? Math.max(220, W * 0.36) : W * 1.15; }, draw: draw, label: '两幅 Venn 图' });
    var out = outBox(body);
    function run() {
      S.err = '';
      try {
        var a = setParse(inL.input.value), b = setParse(inR.input.value);
        S.L = a.mask; S.R = b.mask;
        S.n = (a.used.C || b.used.C) ? 3 : 2;
      } catch (e) { S.L = S.R = null; S.err = e.message; }
      B.draw();
      report();
    }
    function frames(B) {
      var two = B.w >= 520;
      var fw = two ? B.w / 2 : B.w, fh = two ? B.h : B.h / 2;
      return [0, 1].map(function (k) { return { x: two ? k * fw : 0, y: two ? 0 : k * fh, w: fw, h: fh }; });
    }
    function diagram(B, F, mask, title) {
      var ctx = B.ctx, C = B.C, n = S.n;
      var m = 12, top = 30;
      var rx = F.x + m, ry = F.y + top, rw = F.w - 2 * m, rh = F.h - top - m;
      var R = n === 3 ? Math.min(rw / 4.3, rh / 3.9) : Math.min(rw / 3.7, rh / 2.5);
      var cx = rx + rw / 2, cy = ry + rh / 2 + (n === 3 ? -R * 0.08 : 0);
      var cs = n === 3 ? [[cx - R * 0.6, cy - R * 0.36], [cx + R * 0.6, cy - R * 0.36], [cx, cy + R * 0.66]] : [[cx - R * 0.62, cy], [cx + R * 0.62, cy]];
      B.ptext(title, F.x + F.w / 2, F.y + 20, C.fg, 'center', 'alphabetic', FONT_B);
      if (mask != null) {
        for (var r = 0; r < (1 << n); r++) {
          if (!(mask >> r & 1)) continue;
          ctx.save();
          ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip();
          for (var k = 0; k < n; k++) {
            ctx.beginPath();
            if (r >> k & 1) { ctx.arc(cs[k][0], cs[k][1], R, 0, 2 * Math.PI); ctx.clip(); }
            else {
              ctx.rect(rx, ry, rw, rh);
              ctx.moveTo(cs[k][0] + R, cs[k][1]);
              ctx.arc(cs[k][0], cs[k][1], R, 0, 2 * Math.PI);
              ctx.clip('evenodd');
            }
          }
          ctx.globalAlpha = 0.42;
          ctx.fillStyle = C.c1;
          ctx.fillRect(rx, ry, rw, rh);
          ctx.restore();
        }
      }
      ctx.save();
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.2;
      ctx.strokeRect(rx + 0.5, ry + 0.5, rw - 1, rh - 1);
      ctx.strokeStyle = C.fg; ctx.lineWidth = 1.6;
      for (var j = 0; j < n; j++) { ctx.beginPath(); ctx.arc(cs[j][0], cs[j][1], R, 0, 2 * Math.PI); ctx.stroke(); }
      ctx.restore();
      var lab = [[-0.78, -0.78], [0.78, -0.78], [0.78, 0.86]];
      for (var q = 0; q < n; q++) {
        var L = n === 2 ? [q === 0 ? -0.8 : 0.8, -0.82] : lab[q];
        B.ptext('ABC'.charAt(q), cs[q][0] + L[0] * R, cs[q][1] + L[1] * R, C.fg, 'center', 'middle', FONT_B);
      }
      B.ptext('U', rx + 8, ry + 16, C.muted, 'left', 'alphabetic', FONT_B);
    }
    function draw(B) {
      var F = frames(B);
      diagram(B, F[0], S.L, '左边：' + inL.input.value.trim());
      diagram(B, F[1], S.R, '右边：' + inR.input.value.trim());
      if (B.w >= 520) {
        B.ctx.save(); B.ctx.strokeStyle = B.C.grid; B.ctx.lineWidth = 1;
        B.ctx.beginPath(); B.ctx.moveTo(Math.round(B.w / 2) + 0.5, 8); B.ctx.lineTo(Math.round(B.w / 2) + 0.5, B.h - 8); B.ctx.stroke();
        B.ctx.restore();
      }
    }
    function report() {
      if (S.err) { out.innerHTML = '<span class="bad">无法解析：' + MA.esc(S.err) + '</span>。可用符号：∪ ∩ \\ ᶜ（补集，也可写 ^c）△（对称差）以及括号；集合名用 A、B、C，全集 U，空集 ∅。'; return; }
      var n = S.n, diff = [];
      for (var r = 0; r < (1 << n); r++) if ((S.L >> r & 1) !== (S.R >> r & 1)) diff.push(r);
      if (!diff.length) {
        out.innerHTML = '<span class="good">✓ 两边的阴影完全相同，这个集合等式恒成立。</span>' +
          '<br><span class="muted">为什么 Venn 图可以“证明”集合等式？因为一个元素与 ' + 'ABC'.slice(0, n).split('').join('、') +
          ' 的关系只有 ' + (1 << n) + ' 种可能（图中的 ' + (1 << n) + ' 个区域），两边在每个区域上都一致，就相当于把“元素法”的所有情形都验证了一遍。</span>';
        return;
      }
      var r0 = diff[0];
      var sets = 'ABC'.slice(0, n).split('').map(function (x, k) { return x + ' = ' + (r0 >> k & 1 ? '{1}' : '∅'); });
      var leftHas = (S.L >> r0 & 1) === 1;
      out.innerHTML = '<span class="bad">✗ 两边的阴影不同，这个等式不恒成立。</span><br>差别出现在“' +
        diff.map(function (r) { return regionText(r, n); }).join('”、“') + '”的区域。<br>反例：取全集 U = {1}，' + sets.join('，') +
        '，则左边 = ' + (leftHas ? '{1}' : '∅') + '，右边 = ' + (leftHas ? '∅' : '{1}') + '。';
    }
    run();
  };

  /* ================= enumq：把正有理数排成一列 ================= */
  V.enumq = function (body, o) {
    var N = Math.max(4, Math.min(10, num(o.n, 8)));
    var cells = [];
    for (var s = 2; s <= N + 1; s++) for (var p = 1; p < s; p++) cells.push({ p: p, q: s - p });
    var k = 0;
    var tds = {};
    var wrap = h('div', { style: 'overflow-x:auto' });
    var table = h('table', { class: 'grid-q', 'aria-label': '分数表：第 q 行第 p 列为 p/q' });
    var hr = h('tr', null, h('td', { style: 'font-weight:700;color:var(--muted)' }, 'q＼p'));
    for (var c = 1; c <= N; c++) hr.appendChild(h('td', { style: 'font-weight:700;color:var(--muted)' }, String(c)));
    table.appendChild(hr);
    for (var q = 1; q <= N; q++) {
      var tr = h('tr', null, h('td', { style: 'font-weight:700;color:var(--muted)' }, String(q)));
      for (var pp = 1; pp <= N; pp++) {
        var td = h('td');
        tds[pp + '/' + q] = td;
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    wrap.appendChild(table);
    var c1 = ctl(body);
    var timer = 0;
    var bNext = btn('下一步', function () { stopAuto(); go(k + 1); }, true);
    var bAuto = btn('▶ 自动', function () {
      if (timer) { stopAuto(); return; }
      if (k >= cells.length) go(0);
      bAuto.textContent = '⏸ 暂停';
      timer = setInterval(function () {
        if (!body.isConnected || k >= cells.length) { stopAuto(); return; }
        go(k + 1);
      }, 650);
    });
    c1.appendChild(bNext); c1.appendChild(bAuto);
    c1.appendChild(btn('全部', function () { stopAuto(); go(cells.length); }));
    c1.appendChild(btn('重置', function () { stopAuto(); go(0); }));
    body.appendChild(wrap);
    var out = outBox(body);
    var c2 = ctl(body);
    var qi = textIn('查询分数 $p/q$ 的编号', '3/5', query, '6em');
    c2.appendChild(qi.el);
    c2.appendChild(btn('查询', query));
    var out2 = outBox(body);
    function stopAuto() { if (timer) { clearInterval(timer); timer = 0; } bAuto.textContent = '▶ 自动'; }
    function lab(p, q) { return q === 1 ? String(p) : p + '/' + q; }
    function go(n) {
      k = Math.max(0, Math.min(cells.length, n));
      Object.keys(tds).forEach(function (key) {
        var a = key.split('/');
        var td = tds[key];
        td.className = '';
        td.textContent = lab(+a[0], +a[1]);
      });
      var cnt = 0, seq = [], msg = '';
      for (var i = 0; i < k; i++) {
        var ce = cells[i], td = tds[ce.p + '/' + ce.q];
        var g = gcd(ce.p, ce.q);
        if (g > 1) {
          td.classList.add('dup');
          if (i === k - 1) msg = '第 ' + k + ' 步走到 ' + lab(ce.p, ce.q) + '，它等于 ' + lab(ce.p / g, ce.q / g) + '，前面已经数过了，跳过。';
        } else {
          cnt++;
          td.classList.add('vis');
          td.appendChild(h('sup', null, String(cnt)));
          seq.push('r' + sub(cnt) + ' = ' + lab(ce.p, ce.q));
          if (i === k - 1) msg = '第 ' + k + ' 步走到 ' + lab(ce.p, ce.q) + '（既约），给它编号：r' + sub(cnt) + ' = ' + lab(ce.p, ce.q) + '。';
        }
        if (i === k - 1) td.classList.add('cur');
      }
      if (!k) msg = '沿着“p + q = 2, 3, 4, …”的斜线依次走过表格：既约分数编上号，非既约分数（与前面某个数相等）跳过。点“下一步”开始。';
      else if (k === cells.length) msg += ' 表中 p + q ≤ ' + (N + 1) + ' 的格子已全部走完。表格无限延伸时，每个正有理数都会在有限步内被走到——这就把 Q⁺ 排成了一列。';
      out.innerHTML = '';
      out.appendChild(h('div', null, msg));
      if (seq.length) out.appendChild(h('div', { class: 'small muted' }, '已编号：' + seq.slice(-14).join('，') + (seq.length > 14 ? '（只显示最近 14 个）' : '')));
      bNext.disabled = k >= cells.length;
    }
    function query() {
      var m = /^\s*(\d+)\s*(?:\/\s*(\d+))?\s*$/.exec(qi.input.value);
      if (!m || +m[1] === 0 || (m[2] != null && +m[2] === 0)) { out2.innerHTML = '<span class="bad">请输入正分数，如 3/5 或 7</span>'; return; }
      var p = +m[1], q = m[2] != null ? +m[2] : 1, g = gcd(p, q);
      var P = p / g, Q = q / g, s = P + Q;
      if (s > 2000000) { out2.innerHTML = '<span class="bad">数太大了，换个小一点的试试</span>'; return; }
      var phi = new Int32Array(s + 1);
      for (var i = 0; i <= s; i++) phi[i] = i;
      for (var d = 2; d <= s; d++) if (phi[d] === d) for (var j = d; j <= s; j += d) phi[j] -= phi[j] / d;
      var idx = 0;
      for (var t = 2; t < s; t++) idx += phi[t];
      for (var a = 1; a < P; a++) if (gcd(a, s) === 1) idx++;
      idx += 1;
      out2.innerHTML = '';
      out2.appendChild(h('span', null, (g > 1 ? p + '/' + q + ' 化成既约分数是 ' + lab(P, Q) + '，' : lab(P, Q) + ' ') +
        '在这个排列中是第 ' + idx + ' 个，即 r' + sub(idx) + ' = ' + lab(P, Q) + '。（它位于 p + q = ' + s + ' 的斜线上，此前各条斜线上的既约分数共 ' + (idx - 1 - countBefore(P, s)) + ' 个。）'));
    }
    function countBefore(P, s) { var c0 = 0; for (var a = 1; a < P; a++) if (gcd(a, s) === 1) c0++; return c0; }
    go(0);
  };

  /* ================= diagonal：Cantor 对角线法 ================= */
  V.diagonal = function (body, o) {
    var N = Math.max(4, Math.min(12, num(o.rows, 8)));
    var rows = [], shown = 0;
    var c1 = ctl(body);
    var bNext = btn('构造下一位', function () { if (shown < N) { shown++; render(); } }, true);
    c1.appendChild(bNext);
    c1.appendChild(btn('一次构造完', function () { shown = N; render(); }));
    c1.appendChild(btn('换一张表', function () { rand(); }));
    var box = h('div', { class: 'digits', style: 'overflow-x:auto' });
    body.appendChild(box);
    var out = outBox(body);
    function rand() {
      rows = [];
      for (var i = 0; i < N; i++) {
        var d = [];
        for (var j = 0; j < N + 3; j++) d.push(Math.floor(Math.random() * 10));
        rows.push(d);
      }
      var r1 = Math.floor(Math.random() * N);
      rows[r1][r1] = 1;
      shown = 0;
      render();
    }
    function bd(i) { return rows[i][i] === 1 ? 2 : 1; }
    function render() {
      box.innerHTML = '';
      rows.forEach(function (d, i) {
        var line = h('div', null, h('span', { style: 'display:inline-block;width:3.2em' }, 'a' + sub(i + 1) + ' ='), ' 0.');
        d.forEach(function (x, j) {
          var cls = 'dg' + (i === j ? ' diag' : '');
          line.appendChild(h('span', { class: cls }, String(x)));
        });
        line.appendChild(h('span', { class: 'muted' }, ' …'));
        box.appendChild(line);
      });
      box.appendChild(h('div', { class: 'muted' }, h('span', { style: 'display:inline-block;width:3.2em' }, ''), ' ⋮'));
      var bl = h('div', { style: 'margin-top:.3em;border-top:1px dashed var(--line);padding-top:.3em' },
        h('span', { style: 'display:inline-block;width:3.2em;font-weight:700' }, 'b ='), ' 0.');
      for (var j = 0; j < N; j++) bl.appendChild(h('span', { class: 'dg' + (j < shown ? ' new' : '') }, j < shown ? String(bd(j)) : '?'));
      bl.appendChild(h('span', { class: 'muted' }, ' …'));
      box.appendChild(bl);
      var msg;
      if (!shown) msg = '黄色格子是“对角线”上的数字：第 n 个数的第 n 位。规则：若对角线数字不是 1，b 的这一位取 1；若是 1，取 2。';
      else if (shown < N) {
        var i0 = shown - 1;
        msg = 'b 的第 ' + shown + ' 位取 ' + bd(i0) + '，因为 a' + sub(shown) + ' 的第 ' + shown + ' 位是 ' + rows[i0][i0] +
          '。所以 b 与 a' + sub(shown) + ' 在第 ' + shown + ' 位不同，b ≠ a' + sub(shown) + '。';
      } else {
        msg = '完成：b 与表中第 n 个数至少在第 n 位不同，所以 b 不等于表中任何一个数。无论这张（无限的）表怎样排列，总能这样造出一个漏掉的数 ⇒ (0, 1) 中的实数不能排成一列，即 (0, 1) 不可列。（b 只用数字 1 和 2，避免了 0.0999… = 0.1000… 这类“一数两种写法”的麻烦。）';
      }
      out.textContent = msg;
      bNext.disabled = shown >= N;
    }
    rand();
  };

  /* ================= means：平均值不等式 ================= */
  V.means = function (body, o) {
    var a = num(o.a, 2), b = num(o.b, 8);
    var c1 = ctl(body);
    c1.appendChild(slider('$a=$', 0.1, 10, 0.1, a, function (v) { a = v; B.draw(); info(); }).el);
    c1.appendChild(slider('$b=$', 0.1, 10, 0.1, b, function (v) { b = v; B.draw(); info(); }).el);
    var B = board(body, { ratio: 0.5, max: 380, min: 200, pad: { l: 12, r: 12, t: 12, b: 12 }, draw: draw, label: '平均值不等式的几何图示' });
    var out = outBox(body);
    var c2 = ctl(body);
    var li = textIn('$n$ 个正数（逗号分隔）', o.list || '1, 2, 4, 8', listCalc, '13em');
    c2.appendChild(li.el);
    c2.appendChild(btn('计算四种平均', listCalc));
    var out2 = outBox(body);
    function draw(B) {
      var S = a + b, R = S / 2, C = B.C;
      B.viewEq(-0.04 * S, 1.04 * S, -0.16 * R, 1.08 * R);
      var gm = Math.sqrt(a * b), hm = 2 * a * b / S;
      var O = [R, 0], D = [a, 0], P = [a, gm], T = [R, R];
      var H = [P[0] + (O[0] - P[0]) * hm / R, P[1] + (O[1] - P[1]) * hm / R];
      var ctx = B.ctx;
      ctx.save();
      ctx.strokeStyle = C.axis; ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(B.X(R), B.Y(0), B.X(R) - B.X(0), Math.PI, 2 * Math.PI);
      ctx.stroke();
      ctx.restore();
      B.line(0, 0, S, 0, C.axis, 1.5);
      B.line(O[0], O[1], P[0], P[1], C.axis, 1, [4, 3]);
      B.line(D[0], D[1], H[0], H[1], C.axis, 1, [4, 3]);
      B.line(O[0], O[1], T[0], T[1], C.c1, 3);
      B.line(D[0], D[1], P[0], P[1], C.c3, 3);
      B.line(P[0], P[1], H[0], H[1], C.c2, 3);
      B.line(D[0], D[1], T[0], T[1], C.c5, 2, [6, 4]);
      [O, D, P, T, H].forEach(function (p) { B.dot(p[0], p[1], C.fg, 2.6); });
      B.text('a', a / 2, 0, C.text, 'center', 'top', FONT_B);
      B.text('b', a + b / 2, 0, C.text, 'center', 'top', FONT_B);
      B.text('AM', R, R * 0.55, C.c1, R > a ? 'left' : 'right', 'middle', FONT_B);
      B.ptext('GM', B.X(a) + (R > a ? -6 : 6), B.Y(gm / 2), C.c3, R > a ? 'right' : 'left', 'middle', FONT_B);
      B.ptext('HM', B.X((P[0] + H[0]) / 2) + 6, B.Y((P[1] + H[1]) / 2) - 8, C.c2, 'left', 'bottom', FONT_B);
      B.ptext('QM', B.X((D[0] + T[0]) / 2) + (R > a ? 6 : -6), B.Y((D[1] + T[1]) / 2), C.c5, R > a ? 'left' : 'right', 'top', FONT_B);
    }
    function info() {
      var S = a + b, am = S / 2, gm = Math.sqrt(a * b), hm = 2 * a * b / S, qm = Math.sqrt((a * a + b * b) / 2);
      out.innerHTML = MA.mathify('<span style="color:var(--c2)">调和平均</span> $\\dfrac{2ab}{a+b}=' + fmt(hm, 4) +
        '$ $\\le$ <span style="color:var(--c3)">几何平均</span> $\\sqrt{ab}=' + fmt(gm, 4) +
        '$ $\\le$ <span style="color:var(--c1)">算术平均</span> $\\dfrac{a+b}2=' + fmt(am, 4) +
        '$ $\\le$ <span style="color:var(--c5)">平方平均</span> $\\sqrt{\\dfrac{a^2+b^2}2}=' + fmt(qm, 4) + '$') +
        (Math.abs(a - b) < 1e-9 ? '<br><span class="good">a = b 时四者相等——几条线段重合了。</span>' :
          '<br><span class="muted">图中：AM 是半圆的半径，GM 是垂直于直径的半弦，HM 是 GM 在半径上的投影，QM 是 D 到半圆最高点的距离。</span>');
    }
    function listCalc() {
      var xs = li.input.value.split(/[,，;；\s]+/).filter(Boolean).map(Number);
      if (!xs.length || xs.some(function (x) { return !(x > 0) || !isFinite(x); })) { out2.innerHTML = '<span class="bad">请输入若干个正数，用逗号分隔</span>'; return; }
      var n = xs.length, s = 0, sl = 0, si = 0, sq = 0;
      xs.forEach(function (x) { s += x; sl += Math.log(x); si += 1 / x; sq += x * x; });
      var am = s / n, gm = Math.exp(sl / n), hm = n / si, qm = Math.sqrt(sq / n);
      out2.innerHTML = MA.mathify('$n=' + n + '$：$H_n=' + fmt(hm, 5) + '\\le G_n=' + fmt(gm, 5) + '\\le A_n=' + fmt(am, 5) + '\\le Q_n=' + fmt(qm, 5) + '$' +
        (xs.every(function (x) { return x === xs[0]; }) ? '（全部相等，四者相同）' : ''));
    }
    B.draw();
    info();
    listCalc();
  };
})();
