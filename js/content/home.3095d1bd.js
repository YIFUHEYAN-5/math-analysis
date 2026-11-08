/* home.js —— 首页内容 */
MA.add("home", String.raw`
<div class="hero">
<h1>数学分析 · 学习站</h1>
<p>本站配合陈纪修、於崇华、金路《数学分析》（第三版，上册，高等教育出版社）自学使用。每一节都包含：<em>知识点的详细讲解</em>、定理的完整证明、带“思路分析—解答—评注”的例题、常见误区、互动演示、概念自测，以及分为<em>基础 / 提高 / 挑战 / 应用</em>四档的练习题（均附提示与参考解答）。</p>
<p class="small muted">说明：讲解、例题与习题均为本站自编，定理与例题的编号与教材不一一对应；每节标题下的“教材 P×”是该节在教材中的起始页码，方便对照阅读。</p>
<x-continue></x-continue>
</div>

<x-stats></x-stats>

<h2 id="chapters">章节</h2>
<x-chapters></x-chapters>

<h2 id="howto">怎样使用本站</h2>
<ul>
<li><b>阅读模式与自测模式</b>：顶栏的“自测”按钮可以切换。自测模式下，例题的解答和定理的证明默认折叠——先自己动手，再展开对照。</li>
<li><b>习题</b>：每道题都有提示和参考解答（默认折叠）。带“核对答案”输入框的题目可以直接输入结果检验，支持 <code>3/2</code>、<code>sqrt(2)</code> 或 <code>√2</code>、<code>e^2</code>、<code>pi/4</code>、<code>ln 2</code>、<code>inf</code>（无穷大）等写法。</li>
<li><b>自评与错题本</b>：做完一道题后点“✓ 已掌握”或“✗ 需复习”。标记为需复习的题目会汇总到“错题本 · 笔记”页面，便于考前回顾。</li>
<li><b>笔记</b>：每节末尾有笔记框，输入后自动保存。</li>
<li><b>搜索</b>：按 <code>/</code> 键或点击顶栏搜索框，可搜索定理、例题、概念名称和正文内容。</li>
<li><b>互动演示</b>：标有“互动演示”的方框可以拖动滑块、修改参数，用来建立直观；但请记住，<em>数值实验不能代替证明</em>。</li>
<li><b>数据保存</b>：学习进度、自评和笔记只保存在本机浏览器（localStorage）中。清理浏览器数据会丢失记录，建议在“错题本 · 笔记”页定期点“导出学习记录”备份，换电脑或换浏览器后用“导入学习记录”恢复。</li>
</ul>

<h2 id="advice">学习数学分析的几点建议</h2>
<ol>
<li><b>定义要会“默写”，更要会“否定”</b>。数学分析的定义大量使用“对任意……存在……”的量词结构。能把一个定义准确写出来，再把它的否定也写出来，才算真正掌握了它。</li>
<li><b>定理要问三个问题</b>：条件是什么？结论是什么？去掉某个条件结论还成立吗（能举出反例吗）？</li>
<li><b>证明要先找思路再写细节</b>。先在草稿纸上用直观（画图、取特殊值）搞清楚“为什么对”，再把直观翻译成严格的语言。</li>
<li><b>例题先遮住解答</b>。自己做 5～10 分钟，做不出来再看提示，最后再看完整解答，并对照“评注”总结方法。</li>
<li><b>每节都要动笔做题</b>。基础题保证概念过关，提高题训练常用技巧，挑战题拓展视野，应用题帮助理解“数学分析有什么用”。</li>
</ol>

<h2 id="symbols">常用符号速查</h2>
<table class="sym-tbl">
<tr><th>符号</th><th>读法 / 含义</th><th>符号</th><th>读法 / 含义</th></tr>
<tr><td>$\forall$</td><td>对任意的（for all）</td><td>$\exists$</td><td>存在（exists）</td></tr>
<tr><td>$\Rightarrow$</td><td>推出，“若……则……”</td><td>$\Leftrightarrow$</td><td>等价，当且仅当</td></tr>
<tr><td>$x\in A$</td><td>$x$ 属于 $A$</td><td>$x\notin A$</td><td>$x$ 不属于 $A$</td></tr>
<tr><td>$A\subset B$</td><td>$A$ 是 $B$ 的子集</td><td>$A\subsetneqq B$</td><td>$A$ 是 $B$ 的真子集</td></tr>
<tr><td>$A\cup B$</td><td>并集</td><td>$A\cap B$</td><td>交集</td></tr>
<tr><td>$A\setminus B$</td><td>差集（属于 $A$ 不属于 $B$）</td><td>$A^c$</td><td>补集（相对于全集）</td></tr>
<tr><td>$\varnothing$</td><td>空集</td><td>$A\times B$</td><td>Descartes 乘积</td></tr>
<tr><td>$\N,\ \N^+$</td><td>自然数集（含 0）、正整数集</td><td>$\Z,\ \Q,\ \R$</td><td>整数集、有理数集、实数集</td></tr>
<tr><td>$\sup A$</td><td>上确界（最小上界）</td><td>$\inf A$</td><td>下确界（最大下界）</td></tr>
<tr><td>$\max A,\ \min A$</td><td>最大数、最小数</td><td>$[x]$</td><td>不超过 $x$ 的最大整数</td></tr>
<tr><td>$\lim\limits_{n\to\infty}x_n$</td><td>数列极限</td><td>$O(a,\delta)$</td><td>$a$ 的 $\delta$ 邻域 $(a-\delta,a+\delta)$</td></tr>
<tr><td>$f\colon X\to Y$</td><td>$X$ 到 $Y$ 的映射</td><td>$x\mapsto f(x)$</td><td>$x$ 对应到 $f(x)$</td></tr>
<tr><td>$g\circ f$</td><td>复合映射 $g(f(x))$</td><td>$f^{-1}$</td><td>逆映射</td></tr>
<tr><td>$\displaystyle\sum_{k=1}^n a_k$</td><td>求和 $a_1+\cdots+a_n$</td><td>$\displaystyle\prod_{k=1}^n a_k$</td><td>连乘 $a_1a_2\cdots a_n$</td></tr>
<tr><td>$n!$</td><td>阶乘 $1\cdot2\cdots n$</td><td>$(2n-1)!!$</td><td>双阶乘 $1\cdot3\cdots(2n-1)$</td></tr>
</table>

<h2 id="greek">希腊字母</h2>
<table class="sym-tbl">
<tr><th>字母</th><th>名称</th><th>常见用途</th><th>字母</th><th>名称</th><th>常见用途</th></tr>
<tr><td>$\alpha$</td><td>alpha</td><td>角、指数、参数</td><td>$\beta$</td><td>beta</td><td>角、参数</td></tr>
<tr><td>$\gamma,\ \Gamma$</td><td>gamma</td><td>Euler 常数 $\gamma$、Gamma 函数</td><td>$\delta,\ \Delta$</td><td>delta</td><td>小正数、增量 $\Delta x$</td></tr>
<tr><td>$\varepsilon$</td><td>epsilon</td><td>任意给定的小正数</td><td>$\zeta$</td><td>zeta</td><td>中间点、Riemann ζ 函数</td></tr>
<tr><td>$\eta$</td><td>eta</td><td>中间点、小正数</td><td>$\theta$</td><td>theta</td><td>角、$0<\theta<1$ 的系数</td></tr>
<tr><td>$\lambda$</td><td>lambda</td><td>参数、比例系数</td><td>$\mu$</td><td>mu</td><td>参数、测度</td></tr>
<tr><td>$\xi$</td><td>xi</td><td>中值定理中的中间点</td><td>$\pi$</td><td>pi</td><td>圆周率</td></tr>
<tr><td>$\rho$</td><td>rho</td><td>极径、密度</td><td>$\sigma,\ \Sigma$</td><td>sigma</td><td>求和号 $\Sigma$</td></tr>
<tr><td>$\tau$</td><td>tau</td><td>参数、时间</td><td>$\varphi,\ \Phi$</td><td>phi</td><td>函数、角、黄金比 $\varphi$</td></tr>
<tr><td>$\chi$</td><td>chi</td><td>特征函数</td><td>$\psi$</td><td>psi</td><td>函数</td></tr>
<tr><td>$\omega,\ \Omega$</td><td>omega</td><td>振幅、角速度</td><td>$\nu$</td><td>nu</td><td>参数、频率</td></tr>
</table>

<h2 id="about">关于本站</h2>
<ul>
<li><b>这是什么</b>：一份个人自编的数学分析学习笔记，按陈纪修、於崇华、金路《数学分析》（第三版，上册，高等教育出版社）的章节顺序编排，供配合教材自学使用。</li>
<li><b>与教材的关系</b>：本站的讲解、例题、习题和互动演示都是自行编写的，不是教材原文，定理与例题的编号也与教材不一一对应。本站与教材作者、高等教育出版社没有任何关联。系统学习请以教材为准。</li>
<li><b>隐私</b>：本站没有账号系统、统计脚本和广告，不收集个人信息。学习进度、自评和笔记只保存在你自己的浏览器里。</li>
<li class="online-only"><b>离线版</b>：<a href="download/math-analysis-offline.zip" download="数学分析学习站-离线版.zip">下载离线版压缩包</a>。解压后双击其中的 html 文件即可使用，不需要联网，也可以拷到手机上打开。离线版和网站的学习记录分开保存，需要时可以在“错题本 · 笔记”页用“导出学习记录”和“导入学习记录”互相迁移。</li>
<li><b>第三方组件</b>：数学公式由 <a href="https://katex.org/" target="_blank" rel="noopener">KaTeX</a> 渲染，KaTeX 以 MIT 许可证发布。</li>
</ul>
`);
