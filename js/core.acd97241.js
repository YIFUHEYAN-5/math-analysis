/* core.js —— 数学分析学习站：内容渲染、组件、路由、学习进度、搜索
 * 内容文件通过 MA.add(id, html) 注册，html 中可直接写 $...$ / $$...$$ 公式与自定义标签：
 *   <x-def t="标题">        定义（自动编号）      <x-thm> 定理   <x-lem> 引理  <x-prop> 命题  <x-cor> 推论
 *   <x-ex t="">            例题，内含 <x-analysis> 思路分析、<x-sol> 解答、<x-remark> 评注
 *   <x-proof>              证明（阅读模式展开 / 自测模式折叠）
 *   <x-note> <x-warn> <x-tip> <x-hist> <x-app> <x-goal> <x-sum> <x-think> <x-intuit>  说明类方框
 *   <x-prob level="基础|提高|挑战|应用">  习题，内含 <x-hint> 提示、<x-ans> 解答、<x-check answer=""> 数值核对
 *   <x-quiz><x-q type="choice|multi|tf|fill" answer="">  自测题，内含 <x-stem> <x-opt> <x-exp>
 *   <x-ref to="id"> 交叉引用     <x-viz type="名称"> 互动演示（见 viz.js）
 */
(function () {
  'use strict';
  var MA = window.MA = window.MA || {};
  MA.sections = MA.sections || {};
  MA.viz = MA.viz || {};
  MA.refs = {};
  MA.index = [];
  MA.add = function (id, html) {
    (MA.sections[id] = MA.sections[id] || { raw: [] }).raw.push(html);
  };

  /* ================= DOM 小工具 ================= */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function append(el, kid) {
    if (kid == null || kid === false) return;
    if (Array.isArray(kid)) { kid.forEach(function (k) { append(el, k); }); return; }
    el.appendChild(typeof kid === 'string' || typeof kid === 'number' ? document.createTextNode(String(kid)) : kid);
  }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) {
      for (var k in attrs) {
        var v = attrs[k];
        if (v == null || v === false) continue;
        if (k === 'class') el.className = v;
        else if (k === 'text') el.textContent = v;
        else if (k === 'html') el.innerHTML = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') el.addEventListener(k.slice(2), v);
        else if (k === 'checked' || k === 'disabled' || k === 'hidden' || k === 'open' || k === 'selected' || k === 'value') el[k] = v;
        else el.setAttribute(k, v === true ? '' : String(v));
      }
    }
    for (var i = 2; i < arguments.length; i++) append(el, arguments[i]);
    return el;
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
  MA.h = h; MA.esc = esc; MA.$ = $; MA.$$ = $$;

  /* ================= 公式渲染 ================= */
  var texCache = new Map();
  function tex(src, display) {
    var key = (display ? 'D:' : 'I:') + src;
    if (texCache.has(key)) return texCache.get(key);
    var out;
    if (window.katex) {
      try {
        out = window.katex.renderToString(src, {
          displayMode: !!display, throwOnError: false, strict: 'ignore',
          macros: Object.assign({}, MA.katexMacros)
        });
      } catch (e) { out = '<code class="tex-err">' + esc(src) + '</code>'; }
    } else {
      out = '<code class="tex-raw">' + esc(src) + '</code>';
    }
    texCache.set(key, out);
    return out;
  }
  MA.tex = tex;
  /** 把含 $...$ 的可信字符串转成 HTML（演示组件使用） */
  MA.mathify = function (str) {
    var r = MA.extractMath(String(str));
    return r.html.replace(/\uE000(\d+)\uE001/g, function (_, k) {
      var m = r.maths[+k];
      return tex(m.tex, m.display);
    });
  };
  var curMaths = [];
  function tokHTML(str) {
    return esc(str).replace(/\uE000(\d+)\uE001/g, function (_, k) {
      var m = curMaths[+k];
      return m ? tex(m.tex, m.display) : '';
    });
  }
  /* 行内公式与紧贴的标点之间不断行（避免“，”“。”落到行首、“（”留在行尾）。
     浏览器在行内块（KaTeX 的 .katex-base）前后总允许断行，因此：
     · 公式后紧跟标点：把最后一段 .katex-base 包进 white-space:nowrap 的 span.m-glue，
       并在公式与标点之间放一个 U+2060 WORD JOINER；
     · 公式前紧挨开括号/引号：把这个字符和公式一起放进 span.m-nb（nowrap），
       其中 .katex-html 恢复 normal，公式内部原有的自动换行位置不受影响。 */
  var PUNCT_AFTER = /^[，。；：、？！）」』”’》〉】…,.;:!?)\]]/;
  var PUNCT_BEFORE = /[（「『“‘《〈【(\[]$/;
  function glueTail(span) {
    var bases = span.querySelectorAll('.katex-html > .katex-base');
    if (!bases.length) return;
    var b = bases[bases.length - 1];
    var w = document.createElement('span');
    w.className = 'm-glue';
    b.parentNode.insertBefore(w, b);
    w.appendChild(b);
  }
  function renderMath(root, maths) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var list = [];
    for (var n = walker.nextNode(); n; n = walker.nextNode()) {
      if (n.nodeValue.indexOf('\uE000') !== -1) list.push(n);
    }
    list.forEach(function (node) {
      var parts = node.nodeValue.split(/\uE000(\d+)\uE001/);
      var frag = document.createDocumentFragment();
      var prevText = null;
      for (var k = 0; k < parts.length; k++) {
        if (k % 2 === 0) {
          prevText = parts[k] ? frag.appendChild(document.createTextNode(parts[k])) : null;
          continue;
        }
        var m = maths[+parts[k]];
        if (!m) continue;
        var span = document.createElement('span');
        span.className = m.display ? 'm md' : 'm';
        span.innerHTML = tex(m.tex, m.display);
        if (!m.display) {
          if (k + 1 < parts.length && PUNCT_AFTER.test(parts[k + 1])) {
            parts[k + 1] = '\u2060' + parts[k + 1];
            glueTail(span);
          }
          if (prevText && PUNCT_BEFORE.test(prevText.nodeValue)) {
            var pv = prevText.nodeValue, nb = document.createElement('span');
            nb.className = 'm-nb';
            if (pv.length > 1) prevText.nodeValue = pv.slice(0, -1); else frag.removeChild(prevText);
            nb.appendChild(document.createTextNode(pv.slice(-1)));
            nb.appendChild(span);
            frag.appendChild(nb);
            continue;
          }
        }
        frag.appendChild(span);
      }
      node.parentNode.replaceChild(frag, node);
    });
  }
  MA.renderMath = renderMath;

  /* ================= 学习记录（localStorage） ================= */
  var STORE = 'ma-study-v1';
  function defaults() {
    return {
      done: {}, prob: {}, quiz: {}, notes: {},
      settings: { theme: '', selfTest: false, font: 1, serif: false },
      last: null
    };
  }
  function loadState() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE) || 'null');
      if (!s || typeof s !== 'object') return defaults();
      var d = defaults();
      for (var k in d) if (s[k] == null) s[k] = d[k];
      s.settings = Object.assign(d.settings, s.settings || {});
      return s;
    } catch (e) { return defaults(); }
  }
  var state = loadState();
  var saveTimer = 0;
  function saveNow() {
    try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { console.warn('学习记录保存失败', e); }
  }
  function save() { clearTimeout(saveTimer); saveTimer = setTimeout(saveNow, 200); }
  window.addEventListener('pagehide', saveNow);
  MA.getState = function () { return state; };

  function applySettings() {
    var root = document.documentElement;
    var st = state.settings;
    var dark = st.theme ? st.theme === 'dark' : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    root.setAttribute('data-font', String(st.font));
    root.classList.toggle('serif', !!st.serif);
    document.body.classList.toggle('selftest', !!st.selfTest);
    var b = $('#btn-selftest');
    if (b) { b.classList.toggle('on', !!st.selfTest); b.setAttribute('aria-pressed', st.selfTest ? 'true' : 'false'); }
  }
  /** 读取主题颜色（演示组件使用） */
  MA.color = function (name) {
    return getComputedStyle(document.documentElement).getPropertyValue('--' + name).trim() || '#888';
  };

  /* ================= 目录信息 ================= */
  function allSecs() {
    var out = [];
    (MA.toc || []).forEach(function (ch) {
      ch.sections.forEach(function (s) { out.push(Object.assign({ chap: ch }, s)); });
    });
    return out;
  }
  function secInfo(id) {
    var list = allSecs();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i];
    return null;
  }
  function hasSec(id) { return !!MA.sections[id] && id !== 'home'; }
  function secNum(id) { return id.replace('-', '.'); }

  /* ================= 内容预处理与编号 ================= */
  var NUMBERED = {
    'x-def': ['定义', 'def', 'def'],
    'x-thm': ['定理', 'thm', 'thm'],
    'x-lem': ['引理', 'thm', 'thm lem'],
    'x-prop': ['命题', 'thm', 'thm prop'],
    'x-cor': ['推论', 'cor', 'thm cor'],
    'x-ex': ['例', 'ex', 'ex'],
    'x-prob': ['习题', 'prob', 'prob']
  };
  var PLAIN = {
    'x-note': ['注', 'note'], 'x-warn': ['常见误区', 'warn'], 'x-tip': ['方法提炼', 'tip'],
    'x-hist': ['历史与拓展', 'hist'], 'x-app': ['实际应用', 'app'], 'x-goal': ['学习目标', 'goal'],
    'x-sum': ['本节要点', 'sum'], 'x-think': ['想一想', 'think'], 'x-intuit': ['直观理解', 'intuit']
  };
  var prepared = {};
  function textOf(el, maths) { return MA.untoken(el.textContent, maths).replace(/\s+/g, ' ').trim(); }

  function prepareSection(id) {
    if (prepared[id]) return prepared[id];
    var sec = MA.sections[id];
    if (!sec) return null;
    var r = MA.extractMath(sec.raw.join('\n'));
    var tpl = document.createElement('template');
    tpl.innerHTML = r.html;
    var frag = tpl.content;
    var P = { id: id, frag: frag, maths: r.maths, heads: [], probs: [], qs: [] };
    var ctr = {};
    var auto = 0, qn = 0;
    $$('*', frag).forEach(function (el) {
      var tag = el.localName;
      if (tag === 'h2' || tag === 'h3') {
        if (!el.id) el.id = 'h' + (++auto);
        if (tag === 'h2') P.heads.push({ id: el.id, title: textOf(el, r.maths) });
      } else if (NUMBERED[tag]) {
        var info = NUMBERED[tag];
        ctr[info[1]] = (ctr[info[1]] || 0) + 1;
        var k = ctr[info[1]];
        var num = info[1] === 'prob' ? String(k) : secNum(id) + '.' + k;
        if (!el.id) el.id = info[1] + k;
        el.setAttribute('data-num', num);
        var t = el.getAttribute('t') || '';
        MA.refs[id + '/' + el.id] = { sec: id, id: el.id, label: info[0], num: num, title: MA.untoken(t, r.maths).trim() };
        if (tag === 'x-prob') P.probs.push({ id: el.id, num: num, level: el.getAttribute('level') || '' });
      } else if (tag === 'x-q') {
        if (!el.id) el.id = 'q' + (++qn);
        P.qs.push({ id: el.id });
      }
    });
    if (id !== 'home') {
      var head = '';
      Array.prototype.slice.call(frag.children).forEach(function (blk) {
        if (!blk.id) blk.id = 'b' + (++auto);
        var tag = blk.localName;
        if (tag === 'h2') head = textOf(blk, r.maths);
        var ref = MA.refs[id + '/' + blk.id];
        var label = ref ? (ref.label + ' ' + ref.num + (ref.title ? ' ' + ref.title : '')) :
          (tag === 'h2' || tag === 'h3' ? textOf(blk, r.maths) : '');
        var text = textOf(blk, r.maths);
        if (!text && !label) return;
        MA.index.push({ sec: id, anchor: blk.id, head: head, label: label, text: text, low: (label + ' ' + text).toLowerCase() });
      });
    }
    prepared[id] = P;
    return P;
  }

  function secStats(id) {
    var P = prepared[id];
    var s = { total: 0, ok: 0, review: 0, quizDone: 0, quizOk: 0, quizTotal: 0 };
    if (!P) return s;
    s.total = P.probs.length;
    P.probs.forEach(function (p) {
      var v = state.prob[id + '/' + p.id];
      if (v === 'ok') s.ok++; else if (v === 'review') s.review++;
    });
    s.quizTotal = P.qs.length;
    P.qs.forEach(function (q) {
      var v = state.quiz[id + '/' + q.id];
      if (v) { s.quizDone++; if (v.ok) s.quizOk++; }
    });
    return s;
  }

  /* ================= 组件增强 ================= */
  function fold(el, cls, label, open, modeDep) {
    var d = h('details', { class: 'fold ' + cls });
    if (modeDep) d.setAttribute('data-mode', '1');
    d.open = !!open;
    d.appendChild(h('summary', null, h('span', { class: 'fold-l' }, label)));
    var b = h('div', { class: 'fold-b' });
    while (el.firstChild) b.appendChild(el.firstChild);
    d.appendChild(b);
    if (el.id) d.id = el.id;
    el.parentNode.replaceChild(d, el);
    return d;
  }
  function numberedBox(el, secId) {
    var info = NUMBERED[el.localName];
    el.classList.add('bx');
    info[2].split(' ').forEach(function (c) { el.classList.add(c); });
    var t = el.getAttribute('t');
    var head = h('div', { class: 'bx-h' },
      h('span', { class: 'bx-l' }, info[0] + ' ' + el.getAttribute('data-num')),
      t ? h('span', { class: 'bx-t' }, t) : null,
      h('a', { class: 'bx-a', href: '#' + secId + '/' + el.id, title: '定位到此（可复制链接）', 'aria-label': '链接到此处' }, '#'));
    el.insertBefore(head, el.firstChild);
  }
  function plainBox(el) {
    var info = PLAIN[el.localName];
    el.classList.add('bx', info[1]);
    var t = el.getAttribute('t');
    el.insertBefore(h('div', { class: 'bx-h' },
      h('span', { class: 'bx-l' }, el.getAttribute('l') || info[0]),
      t ? h('span', { class: 'bx-t' }, t) : null), el.firstChild);
  }
  var LV = { '基础': 'basic', '提高': 'mid', '挑战': 'hard', '应用': 'app' };
  function probBox(el, secId) {
    el.classList.add('bx', 'prob');
    var key = secId + '/' + el.id;
    var lv = el.getAttribute('level') || '';
    var t = el.getAttribute('t');
    el.insertBefore(h('div', { class: 'bx-h' },
      h('span', { class: 'bx-l' }, '习题 ' + el.getAttribute('data-num')),
      lv ? h('span', { class: 'lv lv-' + (LV[lv] || 'basic') }, lv) : null,
      t ? h('span', { class: 'bx-t' }, t) : null,
      h('a', { class: 'bx-a', href: '#' + key, 'aria-label': '链接到此处' }, '#')), el.firstChild);
    var hints = $$(':scope > x-hint', el);
    hints.forEach(function (x, i) { fold(x, 'hint', hints.length > 1 ? '提示 ' + (i + 1) : '提示', false, false); });
    $$(':scope > x-ans', el).forEach(function (x) { fold(x, 'ans', x.getAttribute('l') || '参考解答', false, false); });
    $$('x-check', el).forEach(checker);
    var bar = h('div', { class: 'ps' }, h('span', { class: 'ps-l' }, '自评'));
    var btns = {};
    [['ok', '✓ 已掌握'], ['review', '✗ 需复习'], ['', '清除']].forEach(function (p) {
      var b = h('button', { type: 'button', class: 'ps-b ps-' + (p[0] || 'clear') }, p[1]);
      b.addEventListener('click', function () {
        if (p[0]) state.prob[key] = p[0]; else delete state.prob[key];
        save(); paint(); refreshSidebar();
        if (p[0] === 'review') toast('已加入错题本');
      });
      btns[p[0]] = b;
      bar.appendChild(b);
    });
    function paint() {
      var v = state.prob[key] || '';
      el.setAttribute('data-status', v);
      btns.ok.setAttribute('aria-pressed', String(v === 'ok'));
      btns.review.setAttribute('aria-pressed', String(v === 'review'));
    }
    paint();
    el.appendChild(bar);
  }
  function matchAnswer(s, ans, tol) {
    if (ans.indexOf('text:') === 0) {
      var norm = function (v) { return String(v).replace(/\s+/g, '').toLowerCase(); };
      return ans.slice(5).split('|').some(function (a) { return norm(a) === norm(s); });
    }
    var u;
    try { u = MA.expr.value(s); } catch (e) { return null; }
    if (typeof u !== 'number' || isNaN(u)) return null;
    var noTol = tol == null || tol === '';
    return ans.split('|').some(function (a) {
      try {
        var v = MA.expr.value(a);
        return MA.expr.close(u, v, tol) || (noTol && decimalOK(s, v));
      } catch (e) { return false; }
    });
  }
  /* 输入是普通小数且至少 3 位有效数字时，只要它是正确值四舍五入或截断到同样位数的结果，也判为正确 */
  function decimalOK(s, v) {
    var m = /^([+-]?)(\d*)\.(\d+)$/.exec(String(s).replace(/\s+/g, ''));
    if (!m || !isFinite(v)) return false;
    if ((m[2] + m[3]).replace(/^0+/, '').length < 3) return false;
    var p = Math.pow(10, m[3].length), y = v * p;
    var k = Math.round(parseFloat(m[0]) * p);
    var rnd = Math.sign(y) * Math.round(Math.abs(y));
    var trc = Math.trunc(y + (y > 0 ? 1e-7 : -1e-7));
    return k === rnd || k === trc;
  }
  var uid = 0;
  function checker(x) {
    var ans = x.getAttribute('answer') || '';
    var tol = x.getAttribute('tol');
    var id = 'ck' + (++uid);
    var input = h('input', { type: 'text', class: 'ck-in', id: id, spellcheck: 'false', autocomplete: 'off',
      placeholder: x.getAttribute('ph') || '数值或表达式，如 3/2、sqrt(2)、e^2' });
    var out = h('span', { class: 'ck-out', role: 'status', 'aria-live': 'polite' });
    function check() {
      var s = input.value.trim();
      if (!s) { out.className = 'ck-out'; out.textContent = ''; return; }
      var ok = matchAnswer(s, ans, tol);
      if (ok === null) { out.className = 'ck-out err'; out.textContent = '无法识别这个表达式'; return; }
      out.className = 'ck-out ' + (ok ? 'ok' : 'no');
      out.textContent = ok ? '✓ 正确' : '✗ 不对，再检查一下';
    }
    input.addEventListener('keydown', function (e) { if (e.key === 'Enter') check(); });
    var labelEl = h('label', { class: 'ck-l', for: id });
    while (x.firstChild) labelEl.appendChild(x.firstChild);
    if (!labelEl.firstChild) labelEl.textContent = x.getAttribute('label') || '核对答案：';
    var box = h('div', { class: 'ck' }, labelEl, input,
      x.getAttribute('unit') ? h('span', { class: 'ck-u' }, x.getAttribute('unit')) : null,
      h('button', { type: 'button', class: 'btn-s', onclick: check }, '核对'), out);
    x.parentNode.replaceChild(box, x);
  }

  var QT = { choice: '单选', multi: '多选', tf: '判断', fill: '填空' };
  function quiz(qz, secId) {
    qz.classList.add('quiz');
    var items = $$(':scope > x-q', qz);
    var score = h('span', { class: 'quiz-score', role: 'status', 'aria-live': 'polite' });
    var ctl = [];
    function upd() {
      var done = 0, ok = 0;
      ctl.forEach(function (c) { var r = c.result(); if (r != null) { done++; if (r) ok++; } });
      score.textContent = '已答 ' + done + '/' + ctl.length + '，答对 ' + ok;
      refreshSidebar();
    }
    var head = h('div', { class: 'quiz-h' },
      h('span', { class: 'quiz-t' }, qz.getAttribute('t') || '概念自测'), score,
      h('button', { type: 'button', class: 'btn-s', onclick: function () { ctl.forEach(function (c) { c.reset(); }); upd(); } }, '全部重做'));
    qz.insertBefore(head, qz.firstChild);
    items.forEach(function (q, i) { ctl.push(question(q, i + 1, secId, upd)); });
    var r0 = 0, d0 = 0;
    ctl.forEach(function (c) { var r = c.result(); if (r != null) { d0++; if (r) r0++; } });
    score.textContent = '已答 ' + d0 + '/' + ctl.length + '，答对 ' + r0;
  }
  function question(q, no, secId, onChange) {
    var type = q.getAttribute('type') || 'choice';
    var ans = (q.getAttribute('answer') || '').trim();
    var key = secId + '/' + q.id;
    var isMulti = type === 'multi';
    var stemSrc = $(':scope > x-stem', q);
    var optSrc = $$(':scope > x-opt', q);
    var expSrc = $(':scope > x-exp', q);
    var stem = h('div', { class: 'q-stem' }, h('span', { class: 'q-no' }, no + '.'), h('span', { class: 'q-type' }, QT[type] || '题'));
    var stemBody = h('div', { class: 'q-text' });
    if (stemSrc) while (stemSrc.firstChild) stemBody.appendChild(stemSrc.firstChild);
    stem.appendChild(stemBody);
    var opts = h('div', { class: 'q-opts' + (type === 'tf' ? ' tf' : '') });
    var fb = h('div', { class: 'q-fb', role: 'status', 'aria-live': 'polite' });
    var exp = h('div', { class: 'q-exp' });
    exp.hidden = true;
    if (expSrc) {
      exp.appendChild(h('span', { class: 'q-exp-l' }, '解析'));
      while (expSrc.firstChild) exp.appendChild(expSrc.firstChild);
    }
    var buttons = [], input = null, submitBtn = null, chosen = {};
    var letters = 'ABCDEFGH';
    if (type === 'choice' || type === 'multi') {
      optSrc.forEach(function (o, i) {
        var L = letters.charAt(i);
        var body = h('span', { class: 'q-o' });
        while (o.firstChild) body.appendChild(o.firstChild);
        var b = h('button', { type: 'button', class: 'q-opt', 'data-v': L, 'aria-pressed': 'false' }, h('span', { class: 'q-L' }, L), body);
        b.addEventListener('click', function () {
          if (q.classList.contains('answered')) return;
          if (isMulti) {
            chosen[L] = !chosen[L];
            b.setAttribute('aria-pressed', String(!!chosen[L]));
          } else submit(L);
        });
        buttons.push(b);
        opts.appendChild(b);
      });
      if (isMulti) {
        submitBtn = h('button', { type: 'button', class: 'btn-s q-sub', onclick: function () {
          submit(Object.keys(chosen).filter(function (k) { return chosen[k]; }).sort().join(''));
        } }, '提交');
        opts.appendChild(submitBtn);
      }
    } else if (type === 'tf') {
      [['T', '✓ 正确'], ['F', '✗ 错误']].forEach(function (p) {
        var b = h('button', { type: 'button', class: 'q-opt', 'data-v': p[0] }, p[1]);
        b.addEventListener('click', function () { if (!q.classList.contains('answered')) submit(p[0]); });
        buttons.push(b);
        opts.appendChild(b);
      });
    } else {
      input = h('input', { type: 'text', class: 'ck-in', spellcheck: 'false', autocomplete: 'off',
        'aria-label': '第 ' + no + ' 题答案', placeholder: q.getAttribute('ph') || '如 3/2、sqrt(3)、e^2、inf' });
      submitBtn = h('button', { type: 'button', class: 'btn-s', onclick: function () { submit(input.value); } }, '提交');
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') submit(input.value); });
      opts.appendChild(input);
      opts.appendChild(submitBtn);
    }
    function judge(v) {
      if (type === 'fill') return matchAnswer(String(v), ans, q.getAttribute('tol'));
      if (isMulti) return v === ans.split('').sort().join('');
      return v === ans;
    }
    function show(v, ok) {
      q.classList.add('answered');
      q.classList.toggle('right', !!ok);
      q.classList.toggle('wrong', !ok);
      buttons.forEach(function (b) {
        var bv = b.getAttribute('data-v');
        var isAns = ans.indexOf(bv) !== -1;
        var picked = isMulti ? String(v).indexOf(bv) !== -1 : bv === v;
        b.classList.toggle('is-ans', isAns);
        b.classList.toggle('picked', picked);
        b.disabled = true;
      });
      if (input) { input.value = v; input.disabled = true; }
      if (submitBtn) submitBtn.disabled = true;
      fb.className = 'q-fb ' + (ok ? 'ok' : 'no');
      var msg;
      if (ok) msg = '✓ 回答正确';
      else if (type === 'fill') msg = '✗ 回答错误，参考答案：' + (q.getAttribute('show') || ans.replace(/^text:/, '').split('|')[0]);
      else if (type === 'tf') msg = '✗ 回答错误，本题应判为“' + (ans === 'T' ? '正确' : '错误') + '”';
      else msg = '✗ 回答错误，正确答案：' + ans;
      fb.innerHTML = tokHTML(msg);
      exp.hidden = false;
    }
    function submit(v) {
      if (type === 'fill' && !String(v).trim()) return;
      if (isMulti && !v) { fb.className = 'q-fb err'; fb.textContent = '请至少选择一项'; return; }
      var ok = judge(v);
      if (ok === null) { fb.className = 'q-fb err'; fb.textContent = '无法识别这个表达式，请检查输入'; return; }
      state.quiz[key] = { v: v, ok: !!ok, t: Date.now() };
      save();
      show(v, ok);
      onChange();
    }
    function reset() {
      delete state.quiz[key];
      save();
      q.classList.remove('answered', 'right', 'wrong');
      buttons.forEach(function (b) { b.disabled = false; b.classList.remove('is-ans', 'picked'); b.setAttribute('aria-pressed', 'false'); });
      chosen = {};
      if (input) { input.disabled = false; input.value = ''; }
      if (submitBtn) submitBtn.disabled = false;
      fb.className = 'q-fb';
      fb.textContent = '';
      exp.hidden = true;
    }
    while (q.firstChild) q.removeChild(q.firstChild);
    q.appendChild(stem); q.appendChild(opts); q.appendChild(fb); q.appendChild(exp);
    q.classList.add('q');
    var prev = state.quiz[key];
    if (prev) show(prev.v, prev.ok);
    return { reset: reset, result: function () { return state.quiz[key] ? state.quiz[key].ok : null; } };
  }
  function xref(el, secId) {
    var to = el.getAttribute('to') || '';
    var key = to.indexOf('/') !== -1 ? to : secId + '/' + to;
    var r = MA.refs[key];
    var a = h('a', { class: 'xref', href: '#' + key });
    if (el.firstChild) { while (el.firstChild) a.appendChild(el.firstChild); }
    else a.textContent = r ? r.label + ' ' + r.num : '〔' + to + '〕';
    if (r && r.title) a.title = r.label + ' ' + r.num + '（' + r.title + '）';
    el.parentNode.replaceChild(a, el);
  }
  function enhance(root, secId) {
    var self = !!state.settings.selfTest;
    $$('x-def, x-thm, x-lem, x-prop, x-cor, x-ex', root).forEach(function (el) { numberedBox(el, secId); });
    $$(Object.keys(PLAIN).join(','), root).forEach(plainBox);
    $$('x-analysis', root).forEach(function (el) { fold(el, 'ana', el.getAttribute('l') || '思路分析', !self, true); });
    $$('x-sol', root).forEach(function (el) { fold(el, 'sol', el.getAttribute('l') || '解答', !self, true); });
    $$('x-proof', root).forEach(function (el) { fold(el, 'proof', el.getAttribute('l') || '证明', !self, true); });
    $$('x-remark', root).forEach(function (el) {
      el.classList.add('remark');
      el.insertBefore(h('span', { class: 'remark-l' }, el.getAttribute('l') || '评注'), el.firstChild);
    });
    $$('x-prob', root).forEach(function (el) { probBox(el, secId); });
    $$('x-quiz', root).forEach(function (el) { quiz(el, secId); });
    $$('x-ref', root).forEach(function (el) { xref(el, secId); });
    $$('table', root).forEach(function (t) {
      if (t.parentElement && t.parentElement.classList.contains('tbl-wrap')) return;
      var w = h('div', { class: 'tbl-wrap' });
      t.parentNode.replaceChild(w, t);
      w.appendChild(t);
      t.classList.add('tbl');
    });
    $$('h2, h3', root).forEach(function (hd) {
      if (!hd.id) return;
      hd.appendChild(h('a', { class: 'h-a', href: '#' + secId + '/' + hd.id, 'aria-label': '标题链接' }, '#'));
    });
  }
  function mountWidgets(root) {
    $$('x-viz', root).forEach(function (el) {
      var type = el.getAttribute('type');
      var t = el.getAttribute('t');
      var fig = h('figure', { class: 'viz', id: el.id || null });
      fig.appendChild(h('figcaption', { class: 'viz-h' }, h('span', { class: 'viz-l' }, '互动演示'),
        t ? h('span', { class: 'viz-t', html: tokHTML(t) }) : null));
      var body = h('div', { class: 'viz-b' });
      fig.appendChild(body);
      if (el.firstChild) {
        var cap = h('div', { class: 'viz-cap' });
        while (el.firstChild) cap.appendChild(el.firstChild);
        fig.appendChild(cap);
      }
      var opts = {};
      Array.prototype.slice.call(el.attributes).forEach(function (a) { opts[a.name] = a.value; });
      el.parentNode.replaceChild(fig, el);
      var fn = MA.viz[type];
      if (!fn) { body.appendChild(h('p', { class: 'viz-err' }, '演示组件“' + type + '”不存在')); return; }
      try { fn(body, opts); } catch (e) {
        console.error(e);
        body.appendChild(h('p', { class: 'viz-err' }, '演示加载出错：' + e.message));
      }
    });
  }

  /* ================= 页面：小节 ================= */
  var current = null;
  function sectionHeader(info, P) {
    var st = secStats(info.id);
    return h('header', { class: 'sec-h' },
      h('nav', { class: 'crumb', 'aria-label': '当前位置' }, h('a', { href: '#home' }, '首页'), ' › ', info.chap.no + ' ' + info.chap.title),
      h('h1', null, h('span', { class: 'sec-no' }, info.no), ' ', info.title),
      h('div', { class: 'sec-meta' },
        info.page ? h('span', null, '教材 P' + info.page + ' 起') : null,
        info.time ? h('span', null, '建议用时 ' + info.time) : null,
        h('span', null, '习题 ' + st.total + ' 道 · 已掌握 ' + st.ok + (st.review ? ' · 待复习 ' + st.review : '')),
        state.done[info.id] ? h('span', { class: 'done-tag' }, '✓ 已学完') : null),
      P.heads.length ? h('ol', { class: 'outline', 'aria-label': '本节结构' }, P.heads.map(function (hd) {
        return h('li', null, h('a', { href: '#' + info.id + '/' + hd.id }, hd.title));
      })) : null);
  }
  function sectionFooter(info) {
    var id = info.id;
    var secs = allSecs().filter(function (s) { return hasSec(s.id); });
    var i = -1;
    secs.forEach(function (s, k) { if (s.id === id) i = k; });
    var prev = secs[i - 1], next = secs[i + 1];
    var cb = h('input', { type: 'checkbox', checked: !!state.done[id] });
    cb.addEventListener('change', function () {
      if (cb.checked) state.done[id] = Date.now(); else delete state.done[id];
      save(); refreshSidebar();
      if (cb.checked) toast('已标记为学完，继续加油');
    });
    var ta = h('textarea', { class: 'notes', id: 'notes-' + id, rows: '6',
      placeholder: '记下本节的心得、疑问与易错点……（只保存在本机浏览器里，可在“错题本 · 笔记”页统一查看与导出）' });
    ta.value = state.notes[id] || '';
    var saved = h('span', { class: 'saved', 'aria-live': 'polite' });
    var tm = 0;
    ta.addEventListener('input', function () {
      clearTimeout(tm);
      tm = setTimeout(function () {
        if (ta.value.trim()) state.notes[id] = ta.value; else delete state.notes[id];
        save();
        saved.textContent = '已自动保存 ' + new Date().toLocaleTimeString();
      }, 400);
    });
    return h('footer', { class: 'sec-f' },
      h('div', { class: 'f-row' }, h('label', { class: 'done-l' }, cb, ' 我已学完本节')),
      h('div', { class: 'f-notes' }, h('label', { class: 'f-lab', for: 'notes-' + id }, '我的笔记'), saved),
      ta,
      h('nav', { class: 'pn', 'aria-label': '翻页' },
        prev ? h('a', { class: 'pn-a prev', href: '#' + prev.id }, h('small', null, '← 上一节'), h('span', null, prev.no + ' ' + prev.title)) : h('span'),
        next ? h('a', { class: 'pn-a next', href: '#' + next.id }, h('small', null, '下一节 →'), h('span', null, next.no + ' ' + next.title)) : h('span')));
  }
  function renderSection(id) {
    var P = prepareSection(id);
    var info = secInfo(id) || { id: id, no: '', title: id, chap: { no: '', title: '' } };
    curMaths = P.maths;
    var art = h('article', { class: 'sec', 'data-sec': id });
    art.appendChild(sectionHeader(info, P));
    var body = h('div', { class: 'sec-body' });
    body.appendChild(P.frag.cloneNode(true));
    art.appendChild(body);
    enhance(body, id);
    art.appendChild(sectionFooter(info));
    renderMath(art, P.maths);
    var main = $('#main');
    main.innerHTML = '';
    main.appendChild(art);
    mountWidgets(art);
    document.title = info.no + ' ' + info.title + ' · 数学分析学习站';
    current = id;
    renderSidebar(id);
  }

  /* ================= 页面：首页 ================= */
  function progressBar(p) {
    var pct = Math.round(Math.max(0, Math.min(1, p || 0)) * 100);
    return h('div', { class: 'pbar', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100' }, h('div', { class: 'pbar-i', style: 'width:' + pct + '%' }));
  }
  function statsBox() {
    var secs = allSecs().filter(function (s) { return hasSec(s.id); });
    var done = 0, total = 0, ok = 0, review = 0, qd = 0, qo = 0, qt = 0;
    secs.forEach(function (s) {
      if (state.done[s.id]) done++;
      var st = secStats(s.id);
      total += st.total; ok += st.ok; review += st.review; qd += st.quizDone; qo += st.quizOk; qt += st.quizTotal;
    });
    function card(num, lab, sub) {
      return h('div', { class: 'stat' }, h('div', { class: 'stat-n' }, num), h('div', { class: 'stat-l' }, lab), sub ? h('div', { class: 'stat-s' }, sub) : null);
    }
    return h('div', { class: 'stats' },
      card(done + ' / ' + secs.length, '已学完小节', progressBar(secs.length ? done / secs.length : 0)),
      card(ok + ' / ' + total, '已掌握习题', progressBar(total ? ok / total : 0)),
      card(String(review), '待复习习题', review ? h('a', { href: '#review' }, '去错题本 →') : '暂无'),
      card(qd ? Math.round(qo / qd * 100) + '%' : '—', '自测正确率', '已答 ' + qd + ' / ' + qt));
  }
  function continueBox() {
    var last = state.last;
    var box = h('div', { class: 'cont' });
    if (last && hasSec(last.id)) {
      var info = secInfo(last.id);
      var a = h('a', { class: 'btn primary', href: '#' + last.id }, '继续学习：' + (info ? info.no + ' ' + info.title : last.id));
      a.addEventListener('click', function () { pendingY = last.y || 0; if (current === last.id) current = null; });
      box.appendChild(a);
    } else {
      box.appendChild(h('a', { class: 'btn primary', href: '#1-1' }, '从第一章开始学习 →'));
    }
    box.appendChild(h('a', { class: 'btn', href: '#review' }, '错题本 · 笔记'));
    return box;
  }
  function chapterCards() {
    var wrap = h('div', { class: 'chaps' });
    (MA.toc || []).forEach(function (ch) {
      if (!ch.sections.some(function (s) { return hasSec(s.id); })) return;
      var card = h('section', { class: 'chap' }, h('h3', null, ch.no + ' ' + ch.title), ch.desc ? h('p', { class: 'chap-d' }, ch.desc) : null);
      var ul = h('ul', { class: 'chap-secs' });
      ch.sections.forEach(function (s) {
        var st = secStats(s.id);
        ul.appendChild(h('li', { class: state.done[s.id] ? 'done' : '' },
          h('a', { href: '#' + s.id }, h('span', { class: 'cs-t' }, s.no + ' ' + s.title), s.desc ? h('span', { class: 'cs-d' }, s.desc) : null),
          h('div', { class: 'cs-m' }, h('span', null, state.done[s.id] ? '✓ 已学完' : '未学完'), h('span', null, '习题 ' + st.ok + '/' + st.total),
            progressBar(st.total ? st.ok / st.total : 0))));
      });
      card.appendChild(ul);
      wrap.appendChild(card);
    });
    var soon = (MA.toc || []).filter(function (ch) { return !ch.sections.some(function (s) { return hasSec(s.id); }); });
    if (soon.length) {
      wrap.appendChild(h('section', { class: 'chap soon' }, h('h3', null, '后续章节（待编写）'),
        h('ul', { class: 'soon-l' }, soon.map(function (ch) {
          return h('li', null, h('b', null, ch.no + ' ' + ch.title), '：' + ch.sections.map(function (s) { return s.title; }).join('、'));
        }))));
    }
    return wrap;
  }
  function renderHome() {
    var P = prepareSection('home');
    var art = h('article', { class: 'home' });
    if (P) {
      curMaths = P.maths;
      var body = h('div', { class: 'home-b' });
      body.appendChild(P.frag.cloneNode(true));
      art.appendChild(body);
      enhance(body, 'home');
    }
    $$('x-continue', art).forEach(function (el) { el.parentNode.replaceChild(continueBox(), el); });
    $$('x-stats', art).forEach(function (el) { el.parentNode.replaceChild(statsBox(), el); });
    $$('x-chapters', art).forEach(function (el) { el.parentNode.replaceChild(chapterCards(), el); });
    if (P) renderMath(art, P.maths);
    var main = $('#main');
    main.innerHTML = '';
    main.appendChild(art);
    mountWidgets(art);
    document.title = '数学分析学习站';
    current = 'home';
    renderSidebar('home');
  }

  /* ================= 页面：错题本与笔记 ================= */
  function cloneStatement(secId, elId, pick) {
    var P = prepared[secId];
    if (!P) return null;
    var src = P.frag.getElementById ? P.frag.getElementById(elId) : P.frag.querySelector('#' + elId);
    if (!src) return null;
    var node = pick(src);
    if (!node) return null;
    var c = node.cloneNode(true);
    var holder = h('div', { class: 'rv-st' });
    holder.appendChild(c);
    $$('x-hint, x-ans, x-check, x-sol', holder).forEach(function (x) { x.parentNode.removeChild(x); });
    renderMath(holder, P.maths);
    return holder;
  }
  function renderReview() {
    var art = h('article', { class: 'review' }, h('h1', null, '错题本 · 笔记'),
      h('p', { class: 'muted' }, '这里汇总你在各节中标记为“需复习”的习题、答错的自测题和你写下的笔记。所有记录只保存在本机浏览器中。'));
    var items = [];
    allSecs().forEach(function (s) {
      var P = prepared[s.id];
      if (!P) return;
      P.probs.forEach(function (p) { if (state.prob[s.id + '/' + p.id] === 'review') items.push({ s: s, p: p }); });
    });
    art.appendChild(h('h2', null, '需复习的习题（' + items.length + '）'));
    if (!items.length) art.appendChild(h('p', { class: 'muted' }, '暂无。做习题时点击“✗ 需复习”即可把题目收进这里。'));
    else art.appendChild(h('ul', { class: 'rv-l' }, items.map(function (it) {
      var st = cloneStatement(it.s.id, it.p.id, function (src) {
        var kids = Array.prototype.slice.call(src.children);
        for (var i = 0; i < kids.length; i++) {
          var t = kids[i].localName;
          if (t !== 'x-hint' && t !== 'x-ans' && t !== 'x-check') return kids[i];
        }
        return null;
      });
      return h('li', null, h('a', { href: '#' + it.s.id + '/' + it.p.id }, it.s.chap.no + ' ' + it.s.no + ' ' + it.s.title + ' · 习题 ' + it.p.num + (it.p.level ? '［' + it.p.level + '］' : '') + ' →'), st);
    })));
    var wrong = [];
    allSecs().forEach(function (s) {
      var P = prepared[s.id];
      if (!P) return;
      P.qs.forEach(function (q, i) { var v = state.quiz[s.id + '/' + q.id]; if (v && !v.ok) wrong.push({ s: s, q: q, i: i }); });
    });
    art.appendChild(h('h2', null, '答错的自测题（' + wrong.length + '）'));
    if (!wrong.length) art.appendChild(h('p', { class: 'muted' }, '暂无。'));
    else art.appendChild(h('ul', { class: 'rv-l' }, wrong.map(function (it) {
      var st = cloneStatement(it.s.id, it.q.id, function (src) { return src.querySelector('x-stem'); });
      return h('li', null, h('a', { href: '#' + it.s.id + '/' + it.q.id }, it.s.chap.no + ' ' + it.s.no + ' ' + it.s.title + ' · 自测第 ' + (it.i + 1) + ' 题 →'), st);
    })));
    var notes = Object.keys(state.notes).filter(function (k) { return state.notes[k] && state.notes[k].trim(); });
    art.appendChild(h('h2', null, '我的笔记（' + notes.length + '）'));
    if (!notes.length) art.appendChild(h('p', { class: 'muted' }, '暂无。每一节末尾都有笔记框。'));
    else notes.forEach(function (k) {
      var info = secInfo(k);
      art.appendChild(h('div', { class: 'rv-note' }, h('a', { href: '#' + k }, info ? info.chap.no + ' ' + info.no + ' ' + info.title : k), h('pre', { class: 'rv-pre' }, state.notes[k])));
    });
    art.appendChild(h('h2', null, '数据管理'));
    var file = h('input', { type: 'file', accept: '.json,application/json', id: 'imp-file', class: 'vh' });
    file.addEventListener('change', importData);
    art.appendChild(h('p', { class: 'muted' }, '学习记录保存在浏览器的 localStorage 中。清理浏览器数据或换电脑前，建议先导出备份。'));
    art.appendChild(h('div', { class: 'btn-row' },
      h('button', { type: 'button', class: 'btn', onclick: exportData }, '导出学习记录'),
      h('label', { class: 'btn', for: 'imp-file' }, '导入学习记录'), file,
      h('button', { type: 'button', class: 'btn danger', onclick: clearData }, '清空全部记录')));
    var main = $('#main');
    main.innerHTML = '';
    main.appendChild(art);
    document.title = '错题本 · 数学分析学习站';
    current = 'review';
    renderSidebar('review');
  }
  function exportData() {
    saveNow();
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    var a = h('a', { href: URL.createObjectURL(blob), download: '数学分析学习记录-' + new Date().toISOString().slice(0, 10) + '.json' });
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.parentNode.removeChild(a); }, 1000);
  }
  function importData(e) {
    var f = e.target.files && e.target.files[0];
    if (!f) return;
    var rd = new FileReader();
    rd.onload = function () {
      try {
        var s = JSON.parse(rd.result);
        if (!s || typeof s !== 'object' || !s.settings) throw new Error('文件格式不正确');
        var d = defaults();
        for (var k in d) if (s[k] == null) s[k] = d[k];
        state = s;
        saveNow();
        applySettings();
        toast('导入成功');
        current = null;
        route();
      } catch (err) { alert('导入失败：' + err.message); }
    };
    rd.readAsText(f);
  }
  function clearData() {
    if (!confirm('确定清空全部学习记录（学完标记、习题自评、自测答案、笔记）吗？此操作不可撤销，建议先导出备份。')) return;
    var st = state.settings;
    state = defaults();
    state.settings = st;
    saveNow();
    current = null;
    route();
    toast('已清空');
  }

  /* ================= 搜索 ================= */
  function doSearch(q, limit) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    var out = [];
    MA.index.forEach(function (e) {
      for (var i = 0; i < terms.length; i++) if (e.low.indexOf(terms[i]) === -1) return;
      var score = 0;
      var lab = e.label.toLowerCase(), hd = e.head.toLowerCase();
      terms.forEach(function (t) { if (lab.indexOf(t) !== -1) score += 10; if (hd.indexOf(t) !== -1) score += 2; });
      score -= Math.min(5, e.text.length / 1500);
      out.push({ e: e, score: score });
    });
    out.sort(function (a, b) { return b.score - a.score; });
    return limit ? out.slice(0, limit) : out;
  }
  function snippet(text, terms, len) {
    len = len || 120;
    var low = text.toLowerCase();
    var pos = -1;
    for (var i = 0; i < terms.length && pos === -1; i++) pos = low.indexOf(terms[i]);
    var start = Math.max(0, pos - 30);
    var s = (start > 0 ? '…' : '') + text.slice(start, start + len) + (start + len < text.length ? '…' : '');
    var html = esc(s);
    terms.forEach(function (t) {
      if (!t) return;
      html = html.replace(new RegExp(escRe(esc(t)), 'gi'), function (m) { return '<mark>' + m + '</mark>'; });
    });
    return html;
  }
  function resultItem(r, terms) {
    var e = r.e;
    var info = secInfo(e.sec);
    var title = e.label || e.head || (info ? info.title : e.sec);
    return h('a', { class: 'sr', href: '#' + e.sec + '/' + e.anchor },
      h('span', { class: 'sr-t', html: snippet(title, terms, 60) }),
      h('span', { class: 'sr-s' }, (info ? info.chap.no + ' ' + info.no + ' ' + info.title : '') + (e.head && e.head !== title ? ' › ' + e.head : '')),
      h('span', { class: 'sr-x', html: snippet(e.text, terms) }));
  }
  var popSel = -1;
  function showPop(q) {
    var pop = $('#search-pop');
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) { hidePop(); return; }
    var res = doSearch(q, 8);
    pop.innerHTML = '';
    if (!res.length) pop.appendChild(h('div', { class: 'sp-empty' }, '没有找到“' + q + '”'));
    res.forEach(function (r) { pop.appendChild(resultItem(r, terms)); });
    if (res.length) pop.appendChild(h('a', { class: 'sp-all', href: '#search/' + encodeURIComponent(q) }, '查看全部结果 →'));
    pop.hidden = false;
    popSel = -1;
  }
  function hidePop() { var pop = $('#search-pop'); if (pop) pop.hidden = true; popSel = -1; }
  function renderSearch(q) {
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    var res = doSearch(q);
    var art = h('article', { class: 'search-page' }, h('h1', null, '搜索：“' + q + '”'),
      h('p', { class: 'muted' }, '共 ' + res.length + ' 条结果' + (res.length > 150 ? '（显示前 150 条）' : '')));
    var list = h('div', { class: 'sr-list' });
    res.slice(0, 150).forEach(function (r) { list.appendChild(resultItem(r, terms)); });
    art.appendChild(list);
    var main = $('#main');
    main.innerHTML = '';
    main.appendChild(art);
    $('#search').value = q;
    document.title = '搜索 · 数学分析学习站';
    current = 'search';
    renderSidebar('search');
  }

  /* ================= 侧边栏 ================= */
  function renderSidebar(active) {
    var nav = $('#sidebar');
    if (!nav) return;
    var keep = nav.scrollTop;
    var kids = [];
    kids.push(h('div', { class: 'sb-top' },
      h('a', { href: '#home', class: 'sb-link' + (active === 'home' ? ' active' : '') }, '⌂ 首页 · 学习进度'),
      h('a', { href: '#review', class: 'sb-link' + (active === 'review' ? ' active' : '') }, '✎ 错题本 · 笔记')));
    (MA.toc || []).forEach(function (ch) {
      var avail = ch.sections.some(function (s) { return hasSec(s.id); });
      if (avail) {
        var box = h('div', { class: 'sb-ch' }, h('div', { class: 'sb-ch-t' }, h('span', { class: 'sb-no' }, ch.no), ' ', ch.title));
        var ul = h('ul', { class: 'sb-ul' });
        ch.sections.forEach(function (s) {
          var li = h('li', { class: 'sb-li' + (s.id === active ? ' active' : '') + (state.done[s.id] ? ' done' : '') });
          if (hasSec(s.id)) {
            var st = secStats(s.id);
            li.appendChild(h('a', { href: '#' + s.id, class: 'sb-a' },
              h('span', { class: 'sb-m', 'aria-hidden': 'true' }, state.done[s.id] ? '✓' : ''),
              h('span', { class: 'sb-t' }, s.no + ' ' + s.title),
              st.total ? h('span', { class: 'sb-p', title: '已掌握习题 / 习题总数' }, st.ok + '/' + st.total) : null));
            if (s.id === active && prepared[s.id]) {
              li.appendChild(h('ul', { class: 'sb-sub' }, prepared[s.id].heads.map(function (hd) {
                return h('li', null, h('a', { href: '#' + s.id + '/' + hd.id, 'data-h': hd.id }, hd.title));
              })));
            }
          } else li.appendChild(h('span', { class: 'sb-a dis' }, s.no + ' ' + s.title));
          ul.appendChild(li);
        });
        box.appendChild(ul);
        kids.push(box);
      } else {
        kids.push(h('details', { class: 'sb-ch locked' },
          h('summary', null, h('span', { class: 'sb-no' }, ch.no), ' ', ch.title, h('span', { class: 'soon' }, '待编写')),
          h('ul', { class: 'sb-ul' }, ch.sections.map(function (s) { return h('li', { class: 'sb-li' }, h('span', { class: 'sb-a dis' }, s.no + ' ' + s.title)); }))));
      }
    });
    nav.innerHTML = '';
    kids.forEach(function (k) { nav.appendChild(k); });
    nav.scrollTop = keep;
    spyNow();
  }
  var sbTimer = 0;
  function refreshSidebar() { clearTimeout(sbTimer); sbTimer = setTimeout(function () { renderSidebar(current); }, 50); }
  function spyNow() {
    if (!current || !hasSec(current)) return;
    var heads = $$('.sec-body > h2');
    if (!heads.length) return;
    var cur = heads[0].id;
    heads.forEach(function (hd) { if (hd.getBoundingClientRect().top < 140) cur = hd.id; });
    $$('#sidebar .sb-sub a').forEach(function (a) { a.classList.toggle('cur', a.getAttribute('data-h') === cur); });
  }

  /* ================= 路由 ================= */
  var pendingY = null;
  function parseHash() {
    var raw = location.hash.replace(/^#/, '');
    try { raw = decodeURIComponent(raw); } catch (e) { /* 保持原样 */ }
    if (!raw || raw === 'home') return { page: 'home' };
    if (raw.indexOf('home/') === 0) return { page: 'home', anchor: raw.slice(5) };
    if (raw === 'review') return { page: 'review' };
    if (raw.indexOf('search/') === 0) return { page: 'search', q: raw.slice(7) };
    var m = /^(\d+-\d+)(?:\/(.+))?$/.exec(raw);
    if (m && hasSec(m[1])) return { page: 'sec', id: m[1], anchor: m[2] || '' };
    return { page: 'home' };
  }
  function goAnchor(id) {
    var el = document.getElementById(id);
    if (!el) return;
    for (var p = el.parentElement; p; p = p.parentElement) if (p.localName === 'details') p.open = true;
    if (el.localName === 'details') el.open = true;
    requestAnimationFrame(function () {
      el.scrollIntoView({ block: 'start' });
      el.classList.remove('flash');
      void el.offsetWidth;
      el.classList.add('flash');
    });
  }
  function route() {
    var r = parseHash();
    closeMenu();
    hidePop();
    if (r.page === 'sec') {
      var fresh = current !== r.id;
      if (fresh) renderSection(r.id);
      if (r.anchor) goAnchor(r.anchor);
      else if (pendingY != null) { var y = pendingY; pendingY = null; requestAnimationFrame(function () { window.scrollTo(0, y); }); }
      else window.scrollTo(0, 0);
    } else if (r.page === 'review') { renderReview(); window.scrollTo(0, 0); }
    else if (r.page === 'search') { renderSearch(r.q); window.scrollTo(0, 0); }
    else {
      renderHome();
      if (r.anchor) goAnchor(r.anchor); else window.scrollTo(0, 0);
    }
  }
  MA.go = function (hash) { if (location.hash === hash) route(); else location.hash = hash; };

  /* ================= 杂项 UI ================= */
  var toastTimer = 0;
  function toast(msg) {
    var t = $('#toast');
    if (!t) { t = h('div', { id: 'toast', class: 'toast', role: 'status', 'aria-live': 'polite' }); document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove('show'); }, 2200);
  }
  MA.toast = toast;
  function closeMenu() { document.body.classList.remove('menu-open'); }
  function showErr(msg) {
    var b = $('#err-banner');
    if (!b) { b = h('div', { id: 'err-banner', class: 'err-banner', role: 'alert' }); document.body.appendChild(b); }
    b.textContent = '页面脚本出错：' + msg;
  }
  MA.showErr = showErr;
  window.addEventListener('error', function (e) {
    showErr((e.message || '未知错误') + (e.filename ? '（' + e.filename.split('/').pop() + ':' + e.lineno + '）' : ''));
  });

  function bind() {
    $('#btn-menu').addEventListener('click', function () { document.body.classList.toggle('menu-open'); });
    $('#scrim').addEventListener('click', closeMenu);
    $('#btn-theme').addEventListener('click', function () {
      state.settings.theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      save(); applySettings();
      window.dispatchEvent(new Event('ma-theme'));
    });
    $('#btn-font').addEventListener('click', function () {
      state.settings.font = (state.settings.font + 1) % 3;
      save(); applySettings();
      toast(['字号：小', '字号：中', '字号：大'][state.settings.font]);
      window.dispatchEvent(new Event('resize'));
    });
    $('#btn-serif').addEventListener('click', function () {
      state.settings.serif = !state.settings.serif;
      save(); applySettings();
      toast(state.settings.serif ? '正文字体：宋体' : '正文字体：黑体');
    });
    $('#btn-selftest').addEventListener('click', function () {
      state.settings.selfTest = !state.settings.selfTest;
      save(); applySettings();
      $$('details[data-mode]').forEach(function (d) { d.open = !state.settings.selfTest; });
      toast(state.settings.selfTest ? '自测模式：例题解答与定理证明已折叠，先自己想一想' : '阅读模式：解答与证明已展开');
    });
    var input = $('#search');
    var st = 0;
    input.addEventListener('input', function () { clearTimeout(st); st = setTimeout(function () { showPop(input.value.trim()); }, 120); });
    input.addEventListener('focus', function () { if (input.value.trim()) showPop(input.value.trim()); });
    input.addEventListener('keydown', function (e) {
      var items = $$('#search-pop a');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!items.length) return;
        e.preventDefault();
        popSel = (popSel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach(function (a, i) { a.classList.toggle('sel', i === popSel); });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (popSel >= 0 && items[popSel]) { location.hash = items[popSel].getAttribute('href'); }
        else if (input.value.trim()) MA.go('#search/' + encodeURIComponent(input.value.trim()));
        hidePop();
        input.blur();
      } else if (e.key === 'Escape') { hidePop(); input.blur(); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.search-wrap')) hidePop();
    });
    $('#search-pop').addEventListener('click', function (e) { if (e.target.closest('a')) hidePop(); });
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') { e.preventDefault(); input.focus(); input.select(); }
      if (e.key === 'Escape') closeMenu();
    });
    var tt = $('#to-top');
    tt.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        ticking = false;
        tt.hidden = window.scrollY < 900;
        spyNow();
        if (current && hasSec(current)) { state.last = { id: current, y: Math.round(window.scrollY) }; save(); }
      });
    }, { passive: true });
    var printOpened = [];
    window.addEventListener('beforeprint', function () {
      printOpened = $$('details:not([open])');
      printOpened.forEach(function (d) { d.open = true; });
    });
    window.addEventListener('afterprint', function () { printOpened.forEach(function (d) { d.open = false; }); printOpened = []; });
    window.addEventListener('hashchange', route);
    if (window.matchMedia) {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      if (mq.addEventListener) mq.addEventListener('change', function () { if (!state.settings.theme) { applySettings(); window.dispatchEvent(new Event('ma-theme')); } });
    }
  }

  function start() {
    applySettings();
    Object.keys(MA.sections).forEach(function (id) {
      try { prepareSection(id); } catch (e) { console.error(e); showErr('内容 ' + id + ' 解析失败：' + e.message); }
    });
    bind();
    route();
  }
  MA._debug = { prepared: prepared, doSearch: doSearch, secStats: secStats };
  document.addEventListener('DOMContentLoaded', start);
})();
