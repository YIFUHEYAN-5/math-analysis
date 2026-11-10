/* §4.1 微分和导数 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("4-1", String.raw`
<x-goal>
<ul>
<li>从正方形面积、自由落体、球体积等例子中体会“增量的线性主部”，理解微分的定义 $\Delta y=A\Delta x+o(\Delta x)$。</li>
<li>掌握导数的定义（差商的极限）、它的几种等价写法和常用记号。</li>
<li>理解并会证明“可微 $\iff$ 可导”，且 $\dd y=f'(x_0)\,\dd x$；知道导数为什么又叫“微商”。</li>
<li>知道可导一定连续、连续不一定可导，能举出 $|x|$、$\sqrt[3]x$、$x\sin\frac1x$ 等反例。</li>
<li>会用定义求简单函数的导数，会用微分作近似计算和误差估计。</li>
</ul>
</x-goal>

<p>第三章研究了连续性：$f$ 在 $x_0$ 连续，就是自变量的增量 $\Delta x\to0$ 时函数的增量 $\Delta y=f(x_0+\Delta x)-f(x_0)\to0$。但连续性只回答了“$\Delta y$ 会不会趋于 $0$”，没有回答“$\Delta y$ 以多快的速度趋于 $0$、和 $\Delta x$ 大致成什么比例”。把无穷小量 $\Delta y$ 与 $\Delta x$ 作比较（参看 <x-ref to="3-3/def-ord"></x-ref>），就得到本章的两个核心概念：<b>微分</b>与<b>导数</b>。本节先从实际问题引出微分，再定义导数，并证明二者对一元函数来说本质上是一回事。</p>

<h2 id="bg">微分概念的导出背景</h2>

<p><b>例子 1：正方形金属薄片受热膨胀。</b>边长为 $x_0$ 的正方形薄片受热后，边长增加了 $\Delta x$，面积的增量是</p>
$$\Delta S=(x_0+\Delta x)^2-x_0^2=2x_0\Delta x+(\Delta x)^2 .$$
<p>它由两部分组成：第一部分 $2x_0\Delta x$ 是 $\Delta x$ 的<b>线性函数</b>（下图中贴着原正方形的两条长条），第二部分 $(\Delta x)^2$ 是右上角的小正方形。当 $\Delta x\to0$ 时，$(\Delta x)^2$ 是比 $\Delta x$ 高阶的无穷小，即 $(\Delta x)^2=o(\Delta x)$。例如 $x_0=10\ \text{cm}$、$\Delta x=0.01\ \text{cm}$ 时，$2x_0\Delta x=0.2\ \text{cm}^2$，而 $(\Delta x)^2=0.0001\ \text{cm}^2$，只占 $\Delta S=0.2001\ \text{cm}^2$ 的约 $0.05\%$。所以 $\Delta x$ 很小时，可以用 $2x_0\Delta x$ 代替 $\Delta S$，误差微不足道。</p>

<x-viz type="square" t="正方形面积的增量：线性主部与高阶无穷小">
<p>拖动滑块或图中右上角的圆点改变 $\Delta x$，再点击“让 Δx → 0”：两条长条的面积 $2x_0\Delta x$ 与 $\Delta x$ 成正比，角上小正方形 $(\Delta x)^2$ 所占的比例越来越小，最终可以忽略。</p>
</x-viz>

<p><b>例子 2：自由落体。</b>物体自由下落，$t$ 时刻下落的距离为 $s=\frac12gt^2$。从 $t_0$ 到 $t_0+\Delta t$ 这段时间内下落的距离是</p>
$$\Delta s=\frac12g(t_0+\Delta t)^2-\frac12gt_0^2=gt_0\,\Delta t+\frac12g(\Delta t)^2 .$$
<p>同样，$\Delta s$ 分成与 $\Delta t$ 成正比的部分 $gt_0\Delta t$ 和高阶无穷小 $\frac12g(\Delta t)^2$。前一部分的系数 $gt_0$ 正是物体在 $t_0$ 时刻的（瞬时）速度：在很短的时间内，可以把运动近似看成速度为 $gt_0$ 的匀速运动。</p>

<p><b>例子 3：球的体积。</b>半径为 $r$ 的球，半径增加 $\Delta r$ 时体积的增量为</p>
$$\Delta V=\frac43\pi(r+\Delta r)^3-\frac43\pi r^3=4\pi r^2\Delta r+4\pi r(\Delta r)^2+\frac43\pi(\Delta r)^3 ,$$
<p>其中 $4\pi r^2\Delta r$（球面面积乘以厚度，也就是“薄球壳”的近似体积）是线性部分，其余两项之和是 $o(\Delta r)$。</p>

<p>这三个例子有共同的结构：函数的增量可以写成</p>
$$\Delta y=A\,\Delta x+o(\Delta x)\qquad(\Delta x\to0),$$
<p>其中 $A$ 与 $\Delta x$ 无关。$A\Delta x$ 叫做 $\Delta y$ 的<b>线性主部</b>。线性函数最容易计算，用它近似代替增量，就是微分学的基本思想。</p>

<x-intuit t="以直代曲">
<p>在一点附近很小的范围内，用线性函数（直线）代替一般的函数（曲线），所产生的误差比自变量的改变量还要小一个数量级，曲线“弯曲”的影响全部藏在高阶无穷小 $o(\Delta x)$ 里。这个想法叫做“以直代曲”。本节最后会看到，它可以直接用于近似计算和误差估计。</p>
</x-intuit>

<h2 id="def">微分的定义</h2>

<x-def t="可微与微分" id="def-diff">
<p>设函数 $y=f(x)$ 在点 $x_0$ 的某个邻域内有定义。如果存在只与 $x_0$ 有关、而与 $\Delta x$ 无关的常数 $A$，使得当 $\Delta x\to0$ 时</p>
$$\Delta y=f(x_0+\Delta x)-f(x_0)=A\,\Delta x+o(\Delta x),$$
<p>就称 $f$ 在点 $x_0$ <b>可微</b>，并称线性主部 $A\Delta x$ 为 $f$ 在点 $x_0$ 的<b>微分</b>，记作</p>
$$\dd y\big|_{x=x_0}=A\,\Delta x\qquad\text{或}\qquad\dd f(x_0)=A\,\Delta x .$$
<p>如果 $f$ 在区间 $(a,b)$ 内每一点都可微，就称 $f$ 在 $(a,b)$ 内可微。</p>
</x-def>

<x-note>
<ul>
<li>$o(\Delta x)$ 表示比 $\Delta x$ 高阶的无穷小，即 $\lim\limits_{\Delta x\to0}\frac{o(\Delta x)}{\Delta x}=0$。所以定义也可以写成 $\lim\limits_{\Delta x\to0}\frac{\Delta y-A\Delta x}{\Delta x}=0$。</li>
<li>满足定义的 $A$ 是唯一的：若 $\Delta y=A\Delta x+o(\Delta x)=B\Delta x+o(\Delta x)$，则 $(A-B)\Delta x=o(\Delta x)$，两边除以 $\Delta x$ 再令 $\Delta x\to0$，得 $A=B$。因此“微分”是确定的。</li>
<li>微分 $\dd y=A\Delta x$ 是 $\Delta x$ 的线性函数（正比例函数），而 $\Delta y$ 一般不是。两者之差 $\Delta y-\dd y=o(\Delta x)$；当 $A\ne0$ 时还有 $\Delta y-\dd y=o(\dd y)$，即 $\Delta y\sim\dd y$（参看 <x-ref to="3-3/prop-equiv"></x-ref>）。</li>
<li>“在邻域内有定义”保证了 $\Delta x$ 可正可负。函数在区间端点处只能从一侧考察，这种单侧的情形留到 §4.2 讨论。</li>
</ul>
</x-note>

<p><b>自变量的微分。</b>对函数 $y=x$ 来说 $\Delta y=\Delta x$，按定义 $A=1$，所以 $\dd x=\Delta x$：自变量的微分就等于它的增量。于是可微函数的微分可以写成</p>
$$\dd y=A\,\dd x .$$
<p>注意，对一般的函数，$\dd y$ 与 $\Delta y$ 并不相等；“微分等于增量”只对自变量本身（以及线性函数）成立。</p>

<x-ex t="按定义求微分" id="ex-diff">
<p>按定义证明下列函数在点 $x_0$ 可微，并求出微分：(1) $y=x^3$；(2) $y=\sqrt x\ (x_0>0)$；(3) $y=\frac1x\ (x_0\ne0)$。</p>
<x-analysis>
<p>目标是把 $\Delta y$ 写成“$A\Delta x$ + 高阶无穷小”的形式。多项式直接展开即可；带根号或分式的函数，可以先猜出 $A$（例如计算 $\frac{\Delta y}{\Delta x}$ 在 $\Delta x\to0$ 时的极限），再验证 $\Delta y-A\Delta x=o(\Delta x)$。</p>
</x-analysis>
<x-sol l="解">
<p>(1) $\Delta y=(x_0+\Delta x)^3-x_0^3=3x_0^2\Delta x+\big[3x_0(\Delta x)^2+(\Delta x)^3\big]$。方括号里的部分除以 $\Delta x$ 后等于 $3x_0\Delta x+(\Delta x)^2\to0$，是 $o(\Delta x)$。所以 $y=x^3$ 在 $x_0$ 可微，$\dd y=3x_0^2\,\dd x$。</p>
<p>(2) 分子有理化：</p>
$$\Delta y=\sqrt{x_0+\Delta x}-\sqrt{x_0}=\frac{\Delta x}{\sqrt{x_0+\Delta x}+\sqrt{x_0}} .$$
<p>$\Delta x\to0$ 时 $\frac{\Delta y}{\Delta x}\to\frac1{2\sqrt{x_0}}$，于是取 $A=\frac1{2\sqrt{x_0}}$，则</p>
$$\Delta y-A\Delta x=\Delta x\left(\frac1{\sqrt{x_0+\Delta x}+\sqrt{x_0}}-\frac1{2\sqrt{x_0}}\right)=-\frac{(\Delta x)^2}{2\sqrt{x_0}\,\big(\sqrt{x_0+\Delta x}+\sqrt{x_0}\big)^2}=o(\Delta x).$$
<p>所以 $\dd\sqrt x\,\big|_{x=x_0}=\frac{\dd x}{2\sqrt{x_0}}$。</p>
<p>(3) $\Delta y=\frac1{x_0+\Delta x}-\frac1{x_0}=-\frac{\Delta x}{x_0(x_0+\Delta x)}$。取 $A=-\frac1{x_0^2}$：</p>
$$\Delta y-A\Delta x=\Delta x\left(\frac1{x_0^2}-\frac1{x_0(x_0+\Delta x)}\right)=\frac{(\Delta x)^2}{x_0^2(x_0+\Delta x)}=o(\Delta x),$$
<p>所以 $\dd\left(\frac1x\right)\Big|_{x=x_0}=-\frac{\dd x}{x_0^2}$。</p>
</x-sol>
<x-remark>
<p>以 $y=x^3$、$x_0=1$ 为例看看数值（$\dd y=3\Delta x$）：</p>
<table>
<tr><th>$\Delta x$</th><th>$\Delta y$</th><th>$\dd y$</th><th>$\Delta y-\dd y$</th><th>$\frac{\Delta y-\dd y}{\Delta x}$</th></tr>
<tr><td>$0.1$</td><td>$0.331$</td><td>$0.3$</td><td>$0.031$</td><td>$0.31$</td></tr>
<tr><td>$0.01$</td><td>$0.030301$</td><td>$0.03$</td><td>$0.000301$</td><td>$0.0301$</td></tr>
<tr><td>$0.001$</td><td>$0.003003001$</td><td>$0.003$</td><td>$0.000003001$</td><td>$0.003001$</td></tr>
</table>
<p>$\Delta x$ 每缩小到原来的 $\frac1{10}$，误差 $\Delta y-\dd y$ 大约缩小到原来的 $\frac1{100}$，这正是“高阶无穷小”的含义。</p>
</x-remark>
</x-ex>

<x-viz type="incr" t="函数的增量 Δy 与微分 dy">
<p>虚线是过点 $P(x_0,f(x_0))$、斜率为 $A$ 的直线 $y=f(x_0)+A(x-x_0)$，沿它计算的增量就是微分 $\dd y$（绿色粗线段），红色粗线段是误差 $\Delta y-\dd y$。点击“让 Δx → 0”并勾选“跟随放大”：误差与 $\Delta x$ 之比越来越小。也可以在 $f(x)$ 框中输入自己的函数。（这条直线就是曲线在 $P$ 点的切线，§4.2 会详细讨论。）</p>
</x-viz>

<x-ex t="绝对值函数在原点不可微" id="ex-abs">
<p>证明 $y=|x|$ 在 $x_0=0$ 不可微，而在 $x_0\ne0$ 处可微。</p>
<x-sol l="证明">
<p>在 $x_0=0$ 处，$\Delta y=|\Delta x|$。若存在常数 $A$ 使 $|\Delta x|=A\Delta x+o(\Delta x)$，两边除以 $\Delta x$ 得 $\frac{|\Delta x|}{\Delta x}=A+\frac{o(\Delta x)}{\Delta x}$。令 $\Delta x\to0^+$ 得 $A=1$，令 $\Delta x\to0^-$ 得 $A=-1$，矛盾。所以 $|x|$ 在 $0$ 不可微。</p>
<p>在 $x_0>0$ 处，当 $|\Delta x|<x_0$ 时 $x_0+\Delta x>0$，$\Delta y=(x_0+\Delta x)-x_0=\Delta x$，所以 $\dd y=\dd x$。同理 $x_0<0$ 时 $\dd y=-\dd x$。合起来就是 $\dd|x|=\sgn x_0\,\dd x\ (x_0\ne0)$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>
<p>$|x|$ 在 $0$ 点连续，图像却有一个“尖角”：从右边看像直线 $y=x$，从左边看像直线 $y=-x$，找不到一条统一的直线来近似它。这是“连续而不可微”的最简单的例子。</p>
</x-remark>
</x-ex>
`);

MA.add("4-1", String.raw`
<h2 id="deriv">微分和导数</h2>

<p>从定义看，判断可微的关键是找出系数 $A$。如果 $f$ 在 $x_0$ 可微，那么 $\frac{\Delta y}{\Delta x}=A+\frac{o(\Delta x)}{\Delta x}\to A$。这提示我们去研究比值 $\frac{\Delta y}{\Delta x}$ 的极限。</p>

<x-def t="导数" id="def-deriv">
<p>设函数 $y=f(x)$ 在点 $x_0$ 的某个邻域内有定义。如果极限</p>
$$\lim_{\Delta x\to0}\frac{\Delta y}{\Delta x}=\lim_{\Delta x\to0}\frac{f(x_0+\Delta x)-f(x_0)}{\Delta x}$$
<p>存在（并且有限），就称 $f$ 在点 $x_0$ <b>可导</b>，称这个极限为 $f$ 在点 $x_0$ 的<b>导数</b>，记作</p>
$$f'(x_0),\qquad y'\big|_{x=x_0},\qquad \frac{\dd y}{\dd x}\Big|_{x=x_0},\qquad \frac{\dd f}{\dd x}(x_0) .$$
<p>$\frac{\Delta y}{\Delta x}$ 叫做 $f$ 在 $x_0$ 与 $x_0+\Delta x$ 之间的<b>差商</b>（平均变化率），导数就是差商的极限（瞬时变化率）。若上述极限不存在，就说 $f$ 在 $x_0$ <b>不可导</b>；极限为 $+\infty$ 或 $-\infty$ 时 $f$ 也不可导，但为了方便，有时也说 $f$ 在 $x_0$ 的导数为无穷大。</p>
</x-def>

<p>令 $x=x_0+\Delta x$，或者把 $\Delta x$ 记作 $h$，导数的定义还可以写成</p>
$$f'(x_0)=\lim_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}=\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h} .$$
<p>只考虑 $h\to0^+$ 或 $h\to0^-$ 的单侧极限，就得到右导数与左导数，这将在 §4.2 讨论。</p>

<x-thm t="可微与可导的等价性" id="thm-dd">
<p>函数 $f$ 在点 $x_0$ 可微的充分必要条件是 $f$ 在点 $x_0$ 可导，并且这时 <x-ref to="def-diff"></x-ref> 中的 $A=f'(x_0)$，即</p>
$$\dd y\big|_{x=x_0}=f'(x_0)\,\dd x .$$
<x-proof>
<p><b>必要性。</b>设 $\Delta y=A\Delta x+o(\Delta x)$，则 $\frac{\Delta y}{\Delta x}=A+\frac{o(\Delta x)}{\Delta x}\to A\ (\Delta x\to0)$，所以 $f$ 在 $x_0$ 可导，且 $f'(x_0)=A$。</p>
<p><b>充分性。</b>设 $f'(x_0)$ 存在。对 $\Delta x\ne0$ 令 $\alpha=\frac{\Delta y}{\Delta x}-f'(x_0)$，则 $\lim\limits_{\Delta x\to0}\alpha=0$，而</p>
$$\Delta y=f'(x_0)\,\Delta x+\alpha\,\Delta x ,$$
<p>其中 $\frac{\alpha\Delta x}{\Delta x}=\alpha\to0$，即 $\alpha\Delta x=o(\Delta x)$。取 $A=f'(x_0)$（它与 $\Delta x$ 无关），就得到 $f$ 在 $x_0$ 可微。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<x-note>
<ul>
<li>对一元函数，“可微”与“可导”是一回事，所以两个词常常混用。但它们的含义不同：可微说的是增量能被线性函数很好地近似，可导说的是差商有极限。到了下册的多元函数，两者就不再等价了（偏导数都存在也不一定可微）。</li>
<li>如果 $f$ 在区间 $I$ 内每一点都可导，那么 $x\mapsto f'(x)$ 是 $I$ 上的一个新函数，称为 $f$ 的<b>导函数</b>，也简称导数，记作 $f'(x)$、$y'$ 或 $\frac{\dd y}{\dd x}$。$f'(x_0)$ 就是导函数在 $x_0$ 的值。</li>
<li>由定理，$\dd y=f'(x)\,\dd x$，两边除以 $\dd x$ 得 $f'(x)=\frac{\dd y}{\dd x}$：导数等于函数的微分与自变量的微分之商，所以导数又称为<b>微商</b>。Leibniz 的记号 $\frac{\dd y}{\dd x}$ 原本是一个整体记号，现在确实可以理解为两个微分的商。</li>
</ul>
</x-note>

<x-warn>
<ul>
<li>$f'(x_0)$ 是“先求导、再代值”，而 $[f(x_0)]'$ 是常数 $f(x_0)$ 的导数，恒为 $0$。例如 $f(x)=x^2$ 时 $f'(3)=6$，而 $[f(3)]'=(9)'=0$。</li>
<li>定义里分子与分母的增量必须“配套”：$\lim\limits_{h\to0}\frac{f(x_0+2h)-f(x_0)}{h}=2f'(x_0)$，而不是 $f'(x_0)$。</li>
<li>导数只依赖 $f$ 在 $x_0$ 附近的值，但对 $f(x_0)$ 本身非常敏感：$f(x)=x\ (x\ne0)$、$f(0)=1$ 时，$f$ 在 $0$ 点不连续，因而不可导（见下文 <x-ref to="thm-cont"></x-ref>），尽管它与处处可导的函数 $y=x$ 只差一个点。</li>
</ul>
</x-warn>

<x-ex t="用定义求导数（一）" id="ex-basic">
<p>用定义求下列函数的导函数：(1) $f(x)=C$（常数）；(2) $f(x)=x^n\ (n\in\Np)$；(3) $f(x)=\sqrt x\ (x>0)$；(4) $f(x)=\frac1x\ (x\ne0)$。</p>
<x-sol l="解">
<p>(1) $\frac{C-C}h=0$，所以 $(C)'=0$。</p>
<p>(2) 由二项式定理，$h\to0$ 时</p>
$$\frac{(x+h)^n-x^n}{h}=nx^{n-1}+\mathrm{C}_n^2x^{n-2}h+\cdots+h^{n-1}\to nx^{n-1},$$
<p>所以 $(x^n)'=nx^{n-1}$。特别地，$(x)'=1$，$(x^2)'=2x$，$(x^3)'=3x^2$。</p>
<p>(3) $\frac{\sqrt{x+h}-\sqrt x}{h}=\frac1{\sqrt{x+h}+\sqrt x}\to\frac1{2\sqrt x}$（用到 $\sqrt x$ 的连续性），所以 $(\sqrt x)'=\frac1{2\sqrt x}$。</p>
<p>(4) $\frac1h\left(\frac1{x+h}-\frac1x\right)=-\frac1{x(x+h)}\to-\frac1{x^2}$，所以 $\left(\frac1x\right)'=-\frac1{x^2}$。</p>
</x-sol>
<x-remark>
<p>(2)(3)(4) 都符合同一个公式 $(x^\alpha)'=\alpha x^{\alpha-1}$（分别是 $\alpha=n$、$\alpha=\frac12$、$\alpha=-1$）。对一般实数 $\alpha$ 的幂函数，这个公式将在 §4.3 证明。</p>
</x-remark>
</x-ex>

<x-ex t="用定义求导数（二）" id="ex-elem">
<p>证明：(1) $(\sin x)'=\cos x$；(2) $(e^x)'=e^x$；(3) $(\ln x)'=\frac1x\ (x>0)$。</p>
<x-sol l="证明">
<p>(1) 由和差化积公式，</p>
$$\frac{\sin(x+h)-\sin x}{h}=\frac{2\cos\left(x+\frac h2\right)\sin\frac h2}{h}=\cos\left(x+\frac h2\right)\cdot\frac{\sin\frac h2}{\frac h2} .$$
<p>由 $\cos x$ 的连续性和 <x-ref to="3-1/thm-sinx"></x-ref>，$h\to0$ 时右边趋于 $\cos x\cdot1=\cos x$。</p>
<p>(2) $\frac{e^{x+h}-e^x}{h}=e^x\cdot\frac{e^h-1}{h}\to e^x$，这里用到了 $\lim\limits_{h\to0}\frac{e^h-1}h=1$（<x-ref to="3-2/ex-stdlim"></x-ref>）。</p>
<p>(3) $\frac{\ln(x+h)-\ln x}{h}=\frac1x\cdot\frac{\ln\left(1+\frac hx\right)}{\frac hx}$。令 $t=\frac hx$，则 $h\to0$ 时 $t\to0$ 且 $t\ne0$，由 $\lim\limits_{t\to0}\frac{\ln(1+t)}t=1$ 得极限为 $\frac1x$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>
<p>用同样的方法可以得到 $(\cos x)'=-\sin x$（习题 2）、$(a^x)'=a^x\ln a$、$(\log_ax)'=\frac1{x\ln a}$。全部基本初等函数的导数公式将在 §4.3 整理成表。</p>
</x-remark>
</x-ex>

<x-tip t="等价无穷小与 x = 0 处的导数">
<p>换一个角度看第三章的等价无穷小：</p>
<ul>
<li>$\sin x\sim x$ 说的是 $\lim\limits_{x\to0}\frac{\sin x-\sin0}{x-0}=1$，即 $(\sin x)'\big|_{x=0}=1$；</li>
<li>$e^x-1\sim x$ 就是 $(e^x)'\big|_{x=0}=1$；$\ln(1+x)\sim x$ 就是 $[\ln(1+x)]'\big|_{x=0}=1$；</li>
<li>$(1+x)^\alpha-1\sim\alpha x$ 就是 $[(1+x)^\alpha]'\big|_{x=0}=\alpha$。</li>
</ul>
<p>一般地，若 $f(0)=0$、$f'(0)=A\ne0$，则 $x\to0$ 时 $f(x)\sim Ax$。等价无穷小表实际上是一张“$x=0$ 处的导数表”。反过来，求形如 $\lim\limits_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}$ 的极限，就是求导数。</p>
</x-tip>

<x-ex t="与导数定义有关的极限" id="ex-lim">
<p>设 $f$ 在 $x_0$ 可导，求 $\lim\limits_{h\to0}\frac{f(x_0+2h)-f(x_0-h)}{h}$。</p>
<x-analysis>
<p>分子不是“从同一点 $x_0$ 出发”的增量。先插入 $f(x_0)$，把它拆成两个标准的差商，再让分母与分子的增量配套。</p>
</x-analysis>
<x-sol l="解">
$$\frac{f(x_0+2h)-f(x_0-h)}{h}=2\cdot\frac{f(x_0+2h)-f(x_0)}{2h}+\frac{f(x_0-h)-f(x_0)}{-h} .$$
<p>$h\to0$ 时 $2h\to0$、$-h\to0$，且都不等于 $0$，由变量代换（<x-ref to="3-1/thm-comp"></x-ref>），两个差商都趋于 $f'(x_0)$。所以所求极限为 $2f'(x_0)+f'(x_0)=3f'(x_0)$。</p>
</x-sol>
<x-remark>
<p>反过来不成立：极限 $\lim\limits_{h\to0}\frac{f(x_0+h)-f(x_0-h)}{2h}$ 存在，并不能推出 $f$ 在 $x_0$ 可导。例如 $f(x)=|x|$、$x_0=0$ 时，这个“对称差商”恒为 $0$，但 $|x|$ 在 $0$ 不可导。原因是对称差商根本没有用到 $f(x_0)$ 的值。</p>
</x-remark>
</x-ex>

<x-think t="导数为正，函数一定在附近递增吗？">
<p>若 $f'(x_0)>0$，由极限的保号性，在 $x_0$ 附近 $\frac{f(x)-f(x_0)}{x-x_0}>0$：$x$ 在 $x_0$ 右侧时 $f(x)>f(x_0)$，在左侧时 $f(x)<f(x_0)$。但这<b>不</b>意味着 $f$ 在 $x_0$ 的某个邻域内单调递增。例如</p>
$$f(x)=\begin{cases}x+2x^2\sin\dfrac1x,&x\ne0,\\[1ex]0,&x=0,\end{cases}$$
<p>有 $f'(0)=\lim\limits_{h\to0}\left(1+2h\sin\frac1h\right)=1>0$，但 $f$ 在 $0$ 的任何邻域内都不单调。学过求导法则（§4.3、§4.4）后可以验证：$x\ne0$ 时 $f'(x)=1+4x\sin\frac1x-2\cos\frac1x$，它在 $x=\frac1{2n\pi}$ 处等于 $-1$，在 $x=\frac1{(2n+1)\pi}$ 处等于 $3$。</p>
</x-think>

<x-viz type="dquot" t="差商 q(h) 与导数">
<p>选择不同的函数，观察 $q(h)=\frac{f(x_0+h)-f(x_0)}{h}$ 在 $h\to0$ 时的表现：$x^2$、$\sin x$ 的差商趋于一个确定的数；$|x|$ 的差商左右两支趋于不同的数；$\sqrt[3]x$ 的差商趋于 $+\infty$；$x\sin\frac1x$ 的差商无限振荡。</p>
</x-viz>
`);

MA.add("4-1", String.raw`
<h2 id="cont">可导与连续</h2>

<x-thm t="可导必连续" id="thm-cont">
<p>若函数 $f$ 在点 $x_0$ 可导（即可微），则 $f$ 在点 $x_0$ 连续。</p>
<x-proof>
<p>当 $\Delta x\to0$ 时，</p>
$$\Delta y=\frac{\Delta y}{\Delta x}\cdot\Delta x\to f'(x_0)\cdot0=0,$$
<p>即 $\lim\limits_{\Delta x\to0}f(x_0+\Delta x)=f(x_0)$。也可以直接由 $\Delta y=f'(x_0)\Delta x+o(\Delta x)\to0$ 看出。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<x-note>
<p>逆否命题同样有用：<b>不连续的点一定不可导</b>。例如符号函数 $\sgn x$ 和取整函数 $[x]$ 在 $x=0$ 不可导，Dirichlet 函数 $D(x)$ 处处不可导，Riemann 函数在每个有理点都不可导。</p>
</x-note>

<x-warn>
<p><b>连续不一定可导。</b>下面几个函数在 $x=0$ 都连续，但都不可导，它们的差商 $q(h)=\frac{f(h)-f(0)}{h}$ 各有各的“毛病”：</p>
<ul>
<li>$f(x)=|x|$：$q(h)=\sgn h$，右侧趋于 $1$、左侧趋于 $-1$，图像在原点有一个尖角；</li>
<li>$f(x)=\sqrt[3]x$：$q(h)=h^{-2/3}\to+\infty$，图像在原点“竖起来”（切线是竖直的）；</li>
<li>$f(x)=\sqrt{|x|}$：$q(h)=\frac{\sqrt{|h|}}h$，右侧趋于 $+\infty$、左侧趋于 $-\infty$，图像在原点形成一个尖点；</li>
<li>$f(x)=x\sin\frac1x\ (x\ne0)$，$f(0)=0$：$q(h)=\sin\frac1h$ 在 $-1$ 与 $1$ 之间无限振荡。取 $h_n=\frac1{n\pi}$ 与 $h_n'=\frac1{2n\pi+\pi/2}$，差商分别恒为 $0$ 与 $1$，由 Heine 定理（<x-ref to="3-1/thm-heine"></x-ref>）可知极限不存在。</li>
</ul>
<p>所以连续是可导的必要条件，但不是充分条件。</p>
</x-warn>

<x-ex t="x² sin(1/x) 在原点可导" id="ex-x2sin">
<p>设 $f(x)=x^2\sin\frac1x\ (x\ne0)$，$f(0)=0$。证明 $f$ 在 $x=0$ 可导，并求 $f'(0)$。</p>
<x-sol l="解">
<p>$\left|\frac{f(h)-f(0)}h\right|=\left|h\sin\frac1h\right|\le|h|\to0$，所以 $f'(0)=0$。</p>
</x-sol>
<x-remark>
<p>比较 $x^k\sin\frac1x$（在 $0$ 处补充定义为 $0$）：$k=0$ 时在 $0$ 不连续；$k=1$ 时连续但不可导；$k=2$ 时可导。乘上的因子 $x^k$ 越“小”，函数在 $0$ 附近就越“光滑”。另外，用 §4.3、§4.4 的求导法则可得 $x\ne0$ 时 $f'(x)=2x\sin\frac1x-\cos\frac1x$，它在 $x\to0$ 时没有极限：$f$ 处处可导，导函数却在 $0$ 点不连续。</p>
</x-remark>
</x-ex>

<x-ex t="只在一点可导的函数" id="ex-onept">
<p>设 $D(x)$ 是 Dirichlet 函数（$x$ 为有理数时取 $1$，为无理数时取 $0$），$f(x)=x^2D(x)$。证明 $f$ 只在 $x=0$ 可导。</p>
<x-sol l="证明">
<p>在 $x=0$ 处，$\left|\frac{f(h)-f(0)}h\right|=|h|D(h)\le|h|\to0$，所以 $f'(0)=0$。</p>
<p>在 $x_0\ne0$ 处，取有理数列 $r_n\to x_0$ 与无理数列 $s_n\to x_0$，则 $f(r_n)=r_n^2\to x_0^2$，而 $f(s_n)=0$。因为 $x_0^2\ne0$，由 Heine 定理，$\lim\limits_{x\to x_0}f(x)$ 不存在，$f$ 在 $x_0$ 不连续，所以不可导。<span class="qed">∎</span></p>
</x-sol>
<x-remark>
<p>这个例子说明，“在一点可导”是一个纯粹局部而且相当弱的条件：它甚至不能保证函数在这一点附近的其他点连续。</p>
</x-remark>
</x-ex>

<x-viz type="zoom" t="局部放大：可微的函数“近看是直线”">
<p>图中画的是 $g(u)=f(x_0+u)-f(x_0)$ 在窗口 $|u|\le w$ 内的图像，横纵坐标同比例。不断缩小窗口：$x^2$、$\sin x$ 的图像越来越接近一条直线（虚线）；$|x|$ 始终是一个尖角；$\sqrt[3]x$ 越来越接近竖直线；$x\sin\frac1x$ 始终在两条直线 $v=\pm u$ 之间振荡。</p>
</x-viz>

<x-intuit t="显微镜下的曲线">
<p>把可微函数的图像放在“显微镜”下观察，放大倍数越高，看到的部分越像一条直线。这正是 $\Delta y=f'(x_0)\Delta x+o(\Delta x)$ 的几何含义：在窗口 $|\Delta x|\le w$ 内，曲线偏离这条直线的距离是 $o(w)$，与窗口的大小相比可以忽略。不可导的点无论放大多少倍，看起来都“不是一条直线”。</p>
</x-intuit>

<x-hist t="处处连续而处处不可导的函数">
<p>19 世纪上半叶，许多数学家相信连续函数“除了个别点以外”总是可导的，Ampère 在 1806 年还发表过一篇试图证明这一点的论文。1872 年 7 月，Weierstrass 在柏林科学院的报告中给出了一个处处连续、却处处不可导的函数</p>
$$W(x)=\sum_{n=0}^{\infty}a^n\cos(b^n\pi x)\qquad\left(0<a<1,\ b\text{ 为正奇数},\ ab>1+\frac32\pi\right),$$
<p>这个例子由 du Bois-Reymond 于 1875 年首次发表。更早些时候，Bolzano 在 1834 年以前写成的手稿《函数论》（Functionenlehre）中构造过一个处处连续、在任何小区间上都不单调的函数，并证明了它在一个稠密的点集上不可导（后来人们证明它处处不可导）；但这部手稿直到 1930 年才整理出版，对当时的数学没有产生影响。这类函数说明：仅凭几何直观判断可导性是靠不住的，这也是分析学必须严格化的原因之一。（函数项级数将在下册学习。）</p>
</x-hist>

<h2 id="approx">用微分作近似计算</h2>

<p>若 $f$ 在 $x_0$ 可导，则 $\Delta y=f'(x_0)\Delta x+o(\Delta x)$，所以当 $|\Delta x|$ 很小时</p>
$$f(x_0+\Delta x)\approx f(x_0)+f'(x_0)\,\Delta x ,$$
<p>也可以写成 $f(x)\approx f(x_0)+f'(x_0)(x-x_0)$（$x$ 接近 $x_0$）。右边的一次函数 $L(x)=f(x_0)+f'(x_0)(x-x_0)$ 称为 $f$ 在 $x_0$ 的<b>线性近似</b>（线性化），误差是 $o(x-x_0)$。取 $x_0=0$，就得到一组常用的近似公式（$|x|$ 很小）：</p>
$$\sin x\approx x,\quad \tan x\approx x,\quad e^x\approx1+x,\quad \ln(1+x)\approx x,\quad (1+x)^\alpha\approx1+\alpha x .$$
<p>它们正是等价无穷小 $\sin x\sim x$、$\tan x\sim x$ 等的另一种写法。特别地，$\sqrt{1+x}\approx1+\frac x2$，$\sqrt[n]{1+x}\approx1+\frac xn$，$\frac1{1+x}\approx1-x$。</p>

<x-ex t="近似计算" id="ex-approx">
<p>求下列各数的近似值：(1) $\sqrt{1.02}$；(2) $\sqrt[3]{8.1}$；(3) $\sin31^\circ$；(4) $e^{-0.03}$。</p>
<x-sol l="解">
<p>(1) $\sqrt{1.02}=\sqrt{1+0.02}\approx1+\frac{0.02}2=1.01$（精确值 $1.009950\cdots$）。</p>
<p>(2) 先把 $8.1$ 写成“好算的数 $\times(1+$小量$)$”：$\sqrt[3]{8.1}=2\sqrt[3]{1+0.0125}\approx2\left(1+\frac{0.0125}3\right)\approx2.00833$（精确值 $2.008299\cdots$）。</p>
<p>(3) 角必须化为弧度：$31^\circ=\frac\pi6+\frac\pi{180}$。取 $f(x)=\sin x$、$x_0=\frac\pi6$、$\Delta x=\frac\pi{180}\approx0.017453$，由 $(\sin x)'=\cos x$，</p>
$$\sin31^\circ\approx\sin\frac\pi6+\cos\frac\pi6\cdot\frac\pi{180}=\frac12+\frac{\sqrt3}2\times0.017453\approx0.51511 .$$
<p>精确值为 $0.515038\cdots$。</p>
<p>(4) $e^{-0.03}\approx1-0.03=0.97$（精确值 $0.970446\cdots$）。</p>
</x-sol>
<x-remark>
<p>这几个近似值的误差都大致与 $(\Delta x)^2$ 同阶。例如 (1) 的误差约为 $5\times10^{-5}$，而 $(\Delta x)^2=4\times10^{-4}$。误差的精确估计要用第五章的 Taylor 公式。</p>
</x-remark>
</x-ex>

<x-warn>
<ul>
<li>线性近似只在 $|\Delta x|$ 很小时可靠。以 $\sqrt{1+x}\approx1+\frac x2$ 为例：$x=0.02$ 时误差约 $5\times10^{-5}$；$x=1$ 时 $1.5$ 与 $\sqrt2\approx1.414$ 相差约 $6\%$；$x=3$ 时 $2.5$ 与 $2$ 相差 $25\%$。（误差大约是 $\frac{x^2}8$，第五章会说明。）</li>
<li>三角函数的近似公式里，角必须用弧度：$\sin2^\circ\approx\frac{2\pi}{180}\approx0.034907$（精确值 $0.034899\cdots$），而不是 $2$。</li>
</ul>
</x-warn>

<h3 id="err">误差估计</h3>

<p>测量得到的量总有误差。设量 $x$ 的测量值为 $x_0$，绝对误差限为 $\delta$（即真值满足 $|x-x_0|\le\delta$）。用公式 $y=f(x)$ 计算出的 $y_0=f(x_0)$ 误差有多大？由于 $\Delta y\approx\dd y=f'(x_0)\Delta x$，</p>
$$|\Delta y|\approx|f'(x_0)|\,|\Delta x|\le|f'(x_0)|\,\delta ,$$
<p>所以 $y$ 的绝对误差约为 $\delta_y=|f'(x_0)|\,\delta$，相对误差约为</p>
$$\frac{\delta_y}{|y_0|}=\left|\frac{f'(x_0)}{f(x_0)}\right|\delta .$$
<p>特别地，若 $y=Cx^\alpha$（$\alpha$ 为一般实数时要用到 §4.3 的公式 $(x^\alpha)'=\alpha x^{\alpha-1}$），则 $\frac{f'(x)}{f(x)}=\frac\alpha x$，于是</p>
$$\frac{\delta_y}{|y_0|}\approx|\alpha|\cdot\frac{\delta}{|x_0|} :$$
<p><b>幂函数把相对误差放大 $|\alpha|$ 倍。</b>例如正方形面积的相对误差约为边长相对误差的 $2$ 倍，球体积的相对误差约为半径相对误差的 $3$ 倍，而开平方会把相对误差减半。</p>

<x-ex t="误差估计" id="ex-err">
<p>(1) 测得钢球的半径 $r=10\ \text{mm}$，绝对误差不超过 $0.1\ \text{mm}$，估计由此计算出的体积的误差。</p>
<p>(2) 用单摆测重力加速度：由 $T=2\pi\sqrt{L/g}$ 得 $g=\frac{4\pi^2L}{T^2}$。设摆长 $L=1\ \text{m}$ 是准确的，周期的测量值为 $T=2.006\ \text{s}$，误差不超过 $0.001\ \text{s}$，估计 $g$ 的误差。</p>
<x-sol l="解">
<p>(1) $V=\frac43\pi r^3$，$V'(r)=4\pi r^2$。$V_0=\frac43\pi\times10^3\approx4188.8\ \text{mm}^3$，绝对误差约为 $|\dd V|=4\pi\times10^2\times0.1=40\pi\approx125.7\ \text{mm}^3$，相对误差约为 $\frac{125.7}{4188.8}\approx3\%$，正好是半径相对误差 $1\%$ 的 $3$ 倍。作为比较：半径由 $10$ 变为 $10.1$ 时，体积的精确增量约为 $126.9\ \text{mm}^3$。</p>
<p>(2) $g_0=\frac{4\pi^2}{2.006^2}\approx9.811\ \text{m/s}^2$。$g$ 是 $T$ 的 $-2$ 次幂（乘以常数），所以 $g$ 的相对误差约为 $2\times\frac{0.001}{2.006}\approx0.10\%$，绝对误差约为 $9.811\times0.0010\approx0.0098\ \text{m/s}^2$，即 $g\approx9.811\pm0.010\ \text{m/s}^2$。</p>
</x-sol>
<x-remark>
<p>(2) 说明周期测量的相对误差会被放大一倍传给 $g$。实验中常常测量几十个周期的总时间再取平均，就是为了减小 $T$ 的相对误差。</p>
</x-remark>
</x-ex>

<x-app t="热膨胀与小角近似">
<p><b>热膨胀。</b>金属棒的长度随温度变化，近似有 $L=L_0(1+\alpha\Delta T)$，$\alpha$ 是线膨胀系数（钢约为 $1.2\times10^{-5}\ {}^\circ\text{C}^{-1}$）。正方形薄片的面积 $S=L^2$，由相对误差的放大规律，面积的相对变化约为 $2\alpha\Delta T$：面膨胀系数约为线膨胀系数的 $2$ 倍，同理体膨胀系数约为 $3$ 倍。这正是本节开头正方形例子的实际背景。</p>
<p><b>小角近似。</b>物理中常用 $\sin\theta\approx\theta$（$\theta$ 用弧度）把单摆的运动方程线性化，从而得到周期公式 $T=2\pi\sqrt{L/g}$。$\theta=10^\circ$ 时 $\theta$ 与 $\sin\theta$ 的相对误差约为 $0.51\%$，$\theta=5^\circ$ 时约为 $0.13\%$，所以这个公式只适用于小幅摆动。</p>
</x-app>

<x-hist t="微分与导数的记号">
<p>Newton（1643—1727）在 1665—1666 年间发展了“流数术”，后来用 $\dot x$ 表示变量 $x$ 的“流数”（变化率）；他的《流数法》写成于 1671 年前后，直到 1736 年才以英文出版。Leibniz（1646—1716）在 1675 年的手稿中开始使用记号 $\int$ 与 $\dd x$，1684 年在莱比锡的学术期刊 Acta Eruditorum 上发表了第一篇微积分论文《一种求极大值、极小值和切线的新方法》，$\dd x$、$\dd y$ 与 $\frac{\dd y}{\dd x}$ 的记号从此流传开来。Lagrange（1736—1813）在 1797 年的《解析函数论》中引入了“导函数”（fonction dérivée）的名称和 $f'(x)$ 的记号。Cauchy（1789—1857）在 1823 年的《无穷小计算教程概论》中用差商的极限定义导数，并把微分定义为 $\dd y=f'(x)\,\dd x$，这就是今天教科书的讲法。中文的“微分”“积分”等名称，来自清代数学家李善兰与英国传教士伟烈亚力 1859 年合译的《代微积拾级》。</p>
</x-hist>
`);

MA.add("4-1", String.raw`
<h2 id="summary">本节要点</h2>

<x-sum>
<ul>
<li>可微：$\Delta y=A\Delta x+o(\Delta x)$，$A$ 与 $\Delta x$ 无关；微分 $\dd y=A\,\dd x$ 是增量的线性主部，自变量的微分 $\dd x=\Delta x$。</li>
<li>导数：$f'(x_0)=\lim\limits_{h\to0}\frac{f(x_0+h)-f(x_0)}h=\lim\limits_{x\to x_0}\frac{f(x)-f(x_0)}{x-x_0}$，是差商（平均变化率）的极限。</li>
<li>一元函数可微 $\iff$ 可导，且 $A=f'(x_0)$；$\dd y=f'(x)\,\dd x$，$f'(x)=\frac{\dd y}{\dd x}$（微商）。</li>
<li>可导必连续，不连续必不可导；连续不一定可导（$|x|$、$\sqrt[3]x$、$\sqrt{|x|}$、$x\sin\frac1x$）。$x^2\sin\frac1x$ 在 $0$ 可导，$x^2D(x)$ 只在 $0$ 可导。</li>
<li>已求出的导数：$(C)'=0$，$(x^n)'=nx^{n-1}$，$(\sqrt x)'=\frac1{2\sqrt x}$，$\left(\frac1x\right)'=-\frac1{x^2}$，$(\sin x)'=\cos x$，$(e^x)'=e^x$，$(\ln x)'=\frac1x$。</li>
<li>求含 $f(x_0+\square)-f(x_0+\triangle)$ 的极限：插入 $f(x_0)$，拆成标准差商，让分子分母的增量“配套”。</li>
<li>线性近似 $f(x_0+\Delta x)\approx f(x_0)+f'(x_0)\Delta x$；误差估计 $\delta_y\approx|f'(x_0)|\,\delta$，幂函数 $Cx^\alpha$ 把相对误差放大 $|\alpha|$ 倍；三角函数一律用弧度。</li>
</ul>
</x-sum>

<h2 id="quiz">概念自测</h2>

<x-quiz t="§4.1 概念自测">
<x-q type="choice" answer="B">
<x-stem>设 $f$ 在 $x_0$ 可微，则 $\Delta x\to0$ 时 $\Delta y-\dd y$ 是</x-stem>
<x-opt>与 $\Delta x$ 同阶的无穷小</x-opt>
<x-opt>比 $\Delta x$ 高阶的无穷小</x-opt>
<x-opt>与 $\Delta x$ 等价的无穷小</x-opt>
<x-opt>不一定是无穷小</x-opt>
<x-exp>由定义 $\Delta y=A\Delta x+o(\Delta x)$、$\dd y=A\Delta x$，所以 $\Delta y-\dd y=o(\Delta x)$。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若 $f$ 在 $x_0$ 连续，则 $f$ 在 $x_0$ 可导。</x-stem>
<x-exp>反例：$|x|$ 在 $0$ 连续但不可导。连续只是可导的必要条件。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $f$ 在 $x_0$ 不连续，则 $f$ 在 $x_0$ 一定不可导。</x-stem>
<x-exp>这是“可导必连续”的逆否命题。</x-exp>
</x-q>
<x-q type="fill" answer="0.01" ph="填一个小数">
<x-stem>$y=x^2$ 在 $x_0=1$ 处取 $\Delta x=0.1$，则 $\Delta y-\dd y=$ ____。</x-stem>
<x-exp>$\Delta y=1.1^2-1=0.21$，$\dd y=2\times1\times0.1=0.2$，差为 $(\Delta x)^2=0.01$。</x-exp>
</x-q>
<x-q type="fill" answer="0.12" ph="填一个小数">
<x-stem>$y=x^3$ 在 $x=2$ 处、$\Delta x=0.01$ 时的微分 $\dd y=$ ____。</x-stem>
<x-exp>$\dd y=3x^2\Delta x=3\times4\times0.01=0.12$。（$\Delta y=2.01^3-8=0.120601$。）</x-exp>
</x-q>
<x-q type="fill" answer="-6" ph="填一个整数">
<x-stem>设 $f'(x_0)=2$，则 $\lim\limits_{h\to0}\frac{f(x_0-3h)-f(x_0)}h=$ ____。</x-stem>
<x-exp>$\frac{f(x_0-3h)-f(x_0)}h=-3\cdot\frac{f(x_0-3h)-f(x_0)}{-3h}\to-3f'(x_0)=-6$。</x-exp>
</x-q>
<x-q type="multi" answer="AD">
<x-stem>下列函数中，在 $x=0$ 处可导的是（各函数在 $0$ 处补充定义为 $0$）</x-stem>
<x-opt>$x|x|$</x-opt>
<x-opt>$|x|$</x-opt>
<x-opt>$\sqrt[3]x$</x-opt>
<x-opt>$x^2\sin\frac1x$</x-opt>
<x-opt>$x\sin\frac1x$</x-opt>
<x-exp>差商分别为 $|h|\to0$、$\sgn h$（无极限）、$h^{-2/3}\to+\infty$、$h\sin\frac1h\to0$、$\sin\frac1h$（振荡），所以 A、D 可导。</x-exp>
</x-q>
<x-q type="choice" answer="D">
<x-stem>已知 $\lim\limits_{h\to0}\frac{f(h)-f(-h)}{2h}=1$，则</x-stem>
<x-opt>$f'(0)=1$</x-opt>
<x-opt>$f$ 在 $0$ 连续</x-opt>
<x-opt>$f'(0)$ 存在，但不一定等于 $1$</x-opt>
<x-opt>以上结论都不一定成立</x-opt>
<x-exp>$f(x)=x+|x|$ 满足条件但在 $0$ 不可导，排除 A、C；$f(x)=x\ (x\ne0)$、$f(0)=1$ 满足条件但在 $0$ 不连续，排除 B。对称差商不涉及 $f(0)$ 的值。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $f'(x_0)\ne0$，则 $\Delta x\to0$ 时 $\Delta y$ 与 $\dd y$ 是等价无穷小。</x-stem>
<x-exp>$\frac{\Delta y}{\dd y}=\frac{f'(x_0)\Delta x+o(\Delta x)}{f'(x_0)\Delta x}\to1$。若 $f'(x_0)=0$，则 $\dd y=0$，谈不上等价。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>设 $f(x)=x^2$，则 $[f(3)]'=6$。</x-stem>
<x-exp>$f(3)=9$ 是常数，$[f(3)]'=0$；$f'(3)=6$ 是先求导再代值。</x-exp>
</x-q>
<x-q type="fill" answer="2.01" tol="0.0005" ph="保留两位小数">
<x-stem>用微分作近似计算：$\sqrt{4.04}\approx$ ____。</x-stem>
<x-exp>$\sqrt{4.04}=2\sqrt{1.01}\approx2\left(1+\frac{0.01}2\right)=2.01$（精确值 $2.009975\cdots$）。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>测量圆的半径时相对误差约为 $1\%$，则计算出的圆面积的相对误差约为</x-stem>
<x-opt>$0.5\%$</x-opt>
<x-opt>$1\%$</x-opt>
<x-opt>$2\%$</x-opt>
<x-opt>$\pi\%$</x-opt>
<x-exp>$S=\pi r^2$ 是 $r$ 的 $2$ 次幂，相对误差放大 $2$ 倍。</x-exp>
</x-q>
<x-q type="fill" answer="-0.25" ph="填一个小数">
<x-stem>设 $f(x)=\frac1x$，则 $f'(2)=$ ____。</x-stem>
<x-exp>$f'(x)=-\frac1{x^2}$，$f'(2)=-\frac14=-0.25$。</x-exp>
</x-q>
</x-quiz>
`);

MA.add("4-1", String.raw`
<h2 id="exercises">习题</h2>

<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>

<x-prob level="基础" t="增量与微分">
<div><p>设 $y=x^3-x$。按定义求它在 $x=2$ 处的微分；并分别对 $\Delta x=0.1$ 与 $\Delta x=0.01$ 计算 $\Delta y$、$\dd y$ 与 $\Delta y-\dd y$。</p></div>
<x-check answer="1.161" ph="填一个小数">$\Delta x=0.1$ 时 $\Delta y=$</x-check>
<x-check answer="0.000601" ph="填一个小数">$\Delta x=0.01$ 时 $\Delta y-\dd y=$</x-check>
<x-hint><p>把 $\Delta y=(2+\Delta x)^3-(2+\Delta x)-6$ 展开，按 $\Delta x$ 的幂次整理。</p></x-hint>
<x-ans>
<p>$\Delta y=(x_0+\Delta x)^3-(x_0+\Delta x)-(x_0^3-x_0)=(3x_0^2-1)\Delta x+3x_0(\Delta x)^2+(\Delta x)^3$，后两项是 $o(\Delta x)$。所以 $\dd y=(3x_0^2-1)\dd x$，在 $x_0=2$ 处 $\dd y=11\,\dd x$。</p>
<p>$\Delta x=0.1$：$\Delta y=7.161-6=1.161$，$\dd y=1.1$，$\Delta y-\dd y=0.061$。</p>
<p>$\Delta x=0.01$：$\Delta y=6.110601-6=0.110601$，$\dd y=0.11$，$\Delta y-\dd y=0.000601$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="用定义求导数">
<div><p>用导数的定义求下列函数的导函数：(1) $ax^2+bx+c$；(2) $\frac1{\sqrt x}\ (x>0)$；(3) $\frac x{1+x}\ (x\ne-1)$；(4) $\cos x$。</p></div>
<x-check answer="-0.0625" ph="填一个小数">(2) 中 $f'(4)=$</x-check>
<x-hint><p>(2) 先通分，再对分子有理化；(3) 先通分；(4) 用和差化积 $\cos\alpha-\cos\beta=-2\sin\frac{\alpha+\beta}2\sin\frac{\alpha-\beta}2$。</p></x-hint>
<x-ans>
<p>(1) $\frac{a(x+h)^2+b(x+h)-ax^2-bx}h=2ax+b+ah\to2ax+b$。</p>
<p>(2) $\frac1h\left(\frac1{\sqrt{x+h}}-\frac1{\sqrt x}\right)=\frac{\sqrt x-\sqrt{x+h}}{h\sqrt x\sqrt{x+h}}=-\frac1{\sqrt x\sqrt{x+h}\,(\sqrt x+\sqrt{x+h})}\to-\frac1{2x\sqrt x}$，所以 $f'(4)=-\frac1{16}=-0.0625$。</p>
<p>(3) $\frac1h\left(\frac{x+h}{1+x+h}-\frac x{1+x}\right)=\frac1{(1+x)(1+x+h)}\to\frac1{(1+x)^2}$。</p>
<p>(4) $\frac{\cos(x+h)-\cos x}h=-\sin\left(x+\frac h2\right)\cdot\frac{\sin\frac h2}{\frac h2}\to-\sin x$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="判断可导性">
<div><p>判断下列函数在指定点是否可导，可导时求出导数：(1) $|x-1|$，$x=1$；(2) $x|x|$，$x=0$；(3) $\sqrt[3]{x^2}$，$x=0$；(4) $f(x)=x^2\ (x\ge0)$，$f(x)=0\ (x<0)$，$x=0$；(5) $\sin|x|$，$x=0$。</p></div>
<x-check answer="2" ph="填一个整数">五个函数中，在指定点可导的有几个？</x-check>
<x-hint><p>写出差商 $q(h)$，分别看 $h\to0^+$ 与 $h\to0^-$。</p></x-hint>
<x-ans>
<p>(1) $q(h)=\frac{|h|}h=\sgn h$，左右极限 $-1\ne1$，不可导。</p>
<p>(2) $q(h)=|h|\to0$，可导，导数为 $0$。</p>
<p>(3) $q(h)=\frac{h^{2/3}}h=h^{-1/3}$，右侧趋于 $+\infty$、左侧趋于 $-\infty$，不可导。</p>
<p>(4) $h>0$ 时 $q(h)=h$，$h<0$ 时 $q(h)=0$，都趋于 $0$，可导，导数为 $0$。</p>
<p>(5) $q(h)=\frac{\sin|h|}h$，右侧趋于 $1$、左侧趋于 $-1$，不可导。</p>
<p>所以可导的是 (2)(4)，共 $2$ 个。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="与导数定义有关的极限">
<div><p>设 $f$ 在 $x_0$ 可导，用 $f'(x_0)$（以及 $f(x_0)$）表示下列极限：</p>
<p>(1) $\lim\limits_{h\to0}\frac{f(x_0+h)-f(x_0-h)}h$；(2) $\lim\limits_{h\to0}\frac{f(x_0+ah)-f(x_0+bh)}h$（$a,b$ 为常数）；</p>
<p>(3) $\lim\limits_{n\to\infty}n\left[f\left(x_0+\frac1n\right)-f(x_0)\right]$；(4) $\lim\limits_{x\to x_0}\frac{xf(x_0)-x_0f(x)}{x-x_0}$。</p></div>
<x-check answer="8" ph="填一个整数">若 $a=3$、$b=-1$、$f'(x_0)=2$，则 (2) 的值为</x-check>
<x-hint><p>插入 $f(x_0)$ 后拆成标准差商；(3) 用 Heine 定理；(4) 把分子写成 $(x-x_0)f(x_0)-x_0[f(x)-f(x_0)]$。</p></x-hint>
<x-ans>
<p>(1) $2f'(x_0)$。</p>
<p>(2) $\frac{f(x_0+ah)-f(x_0)}h-\frac{f(x_0+bh)-f(x_0)}h\to af'(x_0)-bf'(x_0)$，结果为 $(a-b)f'(x_0)$（$a$ 或 $b$ 为 $0$ 时对应的项本来就是 $0$，结论不变）。$a=3$、$b=-1$、$f'(x_0)=2$ 时为 $8$。</p>
<p>(3) 取 $h_n=\frac1n\to0$，由 Heine 定理，$\frac{f(x_0+h_n)-f(x_0)}{h_n}\to f'(x_0)$，所以极限为 $f'(x_0)$。</p>
<p>(4) $\frac{xf(x_0)-x_0f(x)}{x-x_0}=f(x_0)-x_0\cdot\frac{f(x)-f(x_0)}{x-x_0}\to f(x_0)-x_0f'(x_0)$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="近似计算">
<div><p>利用微分求近似值：(1) $\sqrt{1.05}$；(2) $\sqrt[3]{1010}$；(3) $\ln0.98$；(4) $\sin29^\circ$；(5) $e^{0.05}$。</p></div>
<x-check answer="10.0333" tol="0.0002" ph="保留四位小数">(2) $\sqrt[3]{1010}\approx$</x-check>
<x-check answer="0.48489" tol="0.00003" ph="保留五位小数">(4) $\sin29^\circ\approx$</x-check>
<x-hint><p>(2) $1010=1000\times1.01$；(4) $29^\circ=\frac\pi6-\frac\pi{180}$，用 $(\sin x)'=\cos x$。</p></x-hint>
<x-ans>
<p>(1) $\sqrt{1.05}\approx1+\frac{0.05}2=1.025$（精确值 $1.024695\cdots$）。</p>
<p>(2) $\sqrt[3]{1010}=10\sqrt[3]{1.01}\approx10\left(1+\frac{0.01}3\right)\approx10.0333$（精确值 $10.033223\cdots$）。</p>
<p>(3) $\ln0.98=\ln(1-0.02)\approx-0.02$（精确值 $-0.020203\cdots$）。</p>
<p>(4) $\sin29^\circ\approx\sin\frac\pi6-\cos\frac\pi6\cdot\frac\pi{180}=0.5-0.866025\times0.017453\approx0.48489$（精确值 $0.484810\cdots$）。</p>
<p>(5) $e^{0.05}\approx1.05$（精确值 $1.051271\cdots$）。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="乘积因子与可导性">
<div><p>(1) 设 $\varphi$ 在 $a$ 连续，证明 $f(x)=(x-a)\varphi(x)$ 在 $a$ 可导，并求 $f'(a)$。</p>
<p>(2) 设 $\varphi$ 在 $a$ 连续，证明 $g(x)=|x-a|\varphi(x)$ 在 $a$ 可导的充分必要条件是 $\varphi(a)=0$。</p>
<p>(3) $u(x)=|x^3-1|$ 在 $x=1$ 是否可导？</p></div>
<x-hint><p>(2) 差商为 $\sgn h\cdot\varphi(a+h)$，分别求左右极限；(3) $x^3-1=(x-1)(x^2+x+1)$。</p></x-hint>
<x-ans>
<p>(1) $\frac{f(a+h)-f(a)}h=\varphi(a+h)\to\varphi(a)$，所以 $f'(a)=\varphi(a)$。注意这里只假设了 $\varphi$ 连续，不能用乘积的求导法则。</p>
<p>(2) $g(a)=0$，$\frac{g(a+h)-g(a)}h=\sgn h\cdot\varphi(a+h)$，右侧趋于 $\varphi(a)$，左侧趋于 $-\varphi(a)$。极限存在当且仅当 $\varphi(a)=-\varphi(a)$，即 $\varphi(a)=0$，这时 $g'(a)=0$。</p>
<p>(3) $u(x)=|x-1|\,(x^2+x+1)$，$\varphi(x)=x^2+x+1$ 连续且 $\varphi(1)=3\ne0$，由 (2) 知 $u$ 在 $x=1$ 不可导。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="确定参数">
<div><p>设 $f(x)=x^2\ (x\le1)$，$f(x)=ax+b\ (x>1)$。为使 $f$ 在 $x=1$ 可导，$a$、$b$ 应取何值？</p></div>
<x-check answer="2" ph="填一个整数">$a=$</x-check>
<x-check answer="-1" ph="填一个整数">$b=$</x-check>
<x-hint><p>可导必连续，先由连续性得到 $a+b=1$；再让左右两侧的差商有相同的极限。</p></x-hint>
<x-ans>
<p>可导必连续：$\lim\limits_{x\to1^+}f(x)=a+b$ 应等于 $f(1)=1$，即 $a+b=1$。</p>
<p>左侧：$h<0$ 时 $\frac{f(1+h)-f(1)}h=\frac{(1+h)^2-1}h=2+h\to2$。右侧：$h>0$ 时 $\frac{a(1+h)+b-1}h=\frac{(a+b-1)+ah}h=a$。所以 $a=2$，$b=-1$。</p>
<x-remark><p>如果忘了连续性条件，只让“右侧的斜率” $a$ 等于 $2$，可能得到 $a=2$、$b=0$ 这样的错误答案。这时右侧差商 $\frac{2(1+h)-1}h=\frac{1+2h}h\to+\infty$，$f$ 在 $1$ 不连续，更不可导。</p></x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="由极限推出导数">
<div><p>(1) 设 $f$ 在 $x=0$ 连续，且 $\lim\limits_{x\to0}\frac{f(x)}x=1$。证明 $f(0)=0$，$f'(0)=1$。</p>
<p>(2) 若去掉“$f$ 在 $0$ 连续”的条件，(1) 的结论是否还成立？</p>
<p>(3) 若 $f'(0)$ 与 $\lim\limits_{x\to0}\frac{f(x)}x$ 都存在，它们一定相等吗？</p></div>
<x-hint><p>(1) $f(x)=\frac{f(x)}x\cdot x$；(2) 改变 $f(0)$ 的值。</p></x-hint>
<x-ans>
<p>(1) $x\to0$ 时 $f(x)=\frac{f(x)}x\cdot x\to1\cdot0=0$，由连续性 $f(0)=\lim\limits_{x\to0}f(x)=0$。于是 $\frac{f(x)-f(0)}{x-0}=\frac{f(x)}x\to1$，即 $f'(0)=1$。</p>
<p>(2) 不成立。例如 $f(x)=x\ (x\ne0)$、$f(0)=1$：$\frac{f(x)}x=1$，但 $f(0)\ne0$，且 $f$ 在 $0$ 不连续，不可导。</p>
<p>(3) 一定相等。$f'(0)$ 存在时 $f$ 在 $0$ 连续，由 (1) 的推理，$f(0)=\lim\limits_{x\to0}\frac{f(x)}x\cdot x=0$，于是 $f'(0)=\lim\limits_{x\to0}\frac{f(x)-f(0)}x=\lim\limits_{x\to0}\frac{f(x)}x$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="函数方程">
<div><p>(1) 设 $f$ 对一切实数 $x,y$ 满足 $f(x+y)=f(x)+f(y)$，且在 $x=0$ 可导。证明 $f$ 处处可导，且 $f'(x)=f'(0)$。</p>
<p>(2) 设 $f$ 对一切实数 $x,y$ 满足 $f(x+y)=f(x)f(y)$，$f(0)\ne0$，且 $f'(0)=1$。证明 $f$ 处处可导，且 $f'(x)=f(x)$。</p></div>
<x-hint><p>先令 $x=y=0$ 求出 $f(0)$，再把 $f(x+h)-f(x)$ 用方程化成只含 $h$ 的式子。</p></x-hint>
<x-ans>
<p>(1) 令 $x=y=0$ 得 $f(0)=2f(0)$，所以 $f(0)=0$。对任意 $x$，$\frac{f(x+h)-f(x)}h=\frac{f(h)}h=\frac{f(h)-f(0)}h\to f'(0)$。</p>
<p>(2) 令 $x=y=0$ 得 $f(0)=f(0)^2$，又 $f(0)\ne0$，所以 $f(0)=1$。对任意 $x$，$\frac{f(x+h)-f(x)}h=f(x)\cdot\frac{f(h)-f(0)}h\to f(x)f'(0)=f(x)$。</p>
<x-remark><p>以后（第五章）可以证明：满足 (1) 的可导函数只能是 $f(x)=cx$，满足 (2) 的只能是 $f(x)=e^x$。只在一点可导的假设就把它们“锁定”了。</p></x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="一族函数的连续性与可导性">
<div><p>设 $\alpha$ 为实数，$f(x)=|x|^\alpha\sin\frac1x\ (x\ne0)$，$f(0)=0$。问 $\alpha$ 取何值时：(1) $f$ 在 $0$ 连续；(2) $f$ 在 $0$ 可导？</p></div>
<x-hint><p>差商 $q(h)=\sgn h\cdot|h|^{\alpha-1}\sin\frac1h$。分 $\alpha>1$ 与 $\alpha\le1$ 讨论，后者取 $h_n=\frac1{2n\pi+\pi/2}$ 与 $h_n'=\frac1{n\pi}$。</p></x-hint>
<x-ans>
<p>(1) $\alpha>0$ 时 $|f(x)|\le|x|^\alpha\to0$，连续。$\alpha\le0$ 时取 $x_n=\frac1{2n\pi+\pi/2}\to0$，$f(x_n)=x_n^\alpha\ge1$ 不趋于 $0$，不连续。所以连续当且仅当 $\alpha>0$。</p>
<p>(2) $q(h)=\frac{f(h)}h=\sgn h\cdot|h|^{\alpha-1}\sin\frac1h$。$\alpha>1$ 时 $|q(h)|\le|h|^{\alpha-1}\to0$，可导且 $f'(0)=0$。$\alpha\le1$ 时，$q(h_n)=h_n^{\alpha-1}\ge1\ (0<h_n<1)$，而 $q(h_n')=0$，极限不存在。所以可导当且仅当 $\alpha>1$。</p>
</x-ans>
</x-prob>
`);

MA.add("4-1", String.raw`
<x-prob level="挑战" t="Carathéodory 的可导性判别法">
<div><p>证明：$f$ 在 $x_0$ 可导的充分必要条件是，存在一个在 $x_0$ 连续的函数 $\varphi$，使得在 $x_0$ 的某个邻域内</p>
$$f(x)-f(x_0)=\varphi(x)(x-x_0),$$
<p>并且这时 $f'(x_0)=\varphi(x_0)$。</p></div>
<x-hint><p>必要性：在 $x\ne x_0$ 处令 $\varphi(x)$ 等于差商，在 $x_0$ 处令 $\varphi(x_0)=f'(x_0)$。</p></x-hint>
<x-ans>
<p><b>必要性。</b>令 $\varphi(x)=\frac{f(x)-f(x_0)}{x-x_0}\ (x\ne x_0)$，$\varphi(x_0)=f'(x_0)$。则等式在 $x\ne x_0$ 时成立，在 $x=x_0$ 时两边都是 $0$；而 $\lim\limits_{x\to x_0}\varphi(x)=f'(x_0)=\varphi(x_0)$，即 $\varphi$ 在 $x_0$ 连续。</p>
<p><b>充分性。</b>$x\ne x_0$ 时 $\frac{f(x)-f(x_0)}{x-x_0}=\varphi(x)\to\varphi(x_0)$，所以 $f'(x_0)=\varphi(x_0)$。</p>
<x-remark><p>这个判别法把“差商有极限”改写成“某个函数连续”，可以直接搬用连续函数的性质。§4.4 用它证明复合函数的求导法则会特别简洁，而且自动避开了“$\Delta u$ 可能等于 $0$”的麻烦。</p></x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="不对称的差商">
<div><p>(1) 设 $f$ 在 $x_0$ 可导，$\alpha_n<x_0<\beta_n$，且 $\alpha_n\to x_0$、$\beta_n\to x_0$。证明</p>
$$\lim_{n\to\infty}\frac{f(\beta_n)-f(\alpha_n)}{\beta_n-\alpha_n}=f'(x_0).$$
<p>(2) 如果 $x_0$ 不夹在 $\alpha_n$ 与 $\beta_n$ 之间，结论可能不成立。设 $f(x)=x^2\sin\frac1x\ (x\ne0)$，$f(0)=0$，$\alpha_n=\frac1{2n\pi+\pi/2}$，$\beta_n=\frac1{2n\pi-\pi/2}$，求 $\lim\limits_{n\to\infty}\frac{f(\beta_n)-f(\alpha_n)}{\beta_n-\alpha_n}$，并与 $f'(0)$ 比较。</p></div>
<x-check answer="-0.63662" tol="0.001" ph="保留五位小数">(2) 中的极限 $\approx$</x-check>
<x-hint><p>(1) 令 $\lambda_n=\frac{\beta_n-x_0}{\beta_n-\alpha_n}\in(0,1)$，把所求的差商写成 $x_0$ 两侧两个差商的加权平均。</p></x-hint>
<x-ans>
<p>(1) 记 $\lambda_n=\frac{\beta_n-x_0}{\beta_n-\alpha_n}$，则 $0<\lambda_n<1$，$1-\lambda_n=\frac{x_0-\alpha_n}{\beta_n-\alpha_n}$，并且</p>
$$\frac{f(\beta_n)-f(\alpha_n)}{\beta_n-\alpha_n}=\lambda_n\cdot\frac{f(\beta_n)-f(x_0)}{\beta_n-x_0}+(1-\lambda_n)\cdot\frac{f(\alpha_n)-f(x_0)}{\alpha_n-x_0} .$$
<p>两个差商都趋于 $f'(x_0)$，记它们与 $f'(x_0)$ 的差为 $\eps_n$、$\eps_n'$，则左边与 $f'(x_0)$ 之差的绝对值 $\le\lambda_n|\eps_n|+(1-\lambda_n)|\eps_n'|\le|\eps_n|+|\eps_n'|\to0$。</p>
<p>(2) $f'(0)=0$（<x-ref to="ex-x2sin"></x-ref>）。记 $t=2n\pi$，则 $f(\alpha_n)=\alpha_n^2$，$f(\beta_n)=-\beta_n^2$，</p>
$$\frac{f(\beta_n)-f(\alpha_n)}{\beta_n-\alpha_n}=-\frac{\alpha_n^2+\beta_n^2}{\beta_n-\alpha_n}=-\frac{2t^2+\pi^2/2}{\pi\,(t^2-\pi^2/4)}\to-\frac2\pi\approx-0.63662 ,$$
<p>不等于 $f'(0)=0$。</p>
<x-remark><p>两点都在 $x_0$ 同一侧时，“割线斜率”可以不趋于导数。(1) 中的加权平均技巧说明，只要 $x_0$ 夹在中间，割线斜率就被两侧的差商“夹住”。</p></x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="Riemann 函数处处不可导">
<div><p>设 $R(x)$ 是定义在全体实数上的 Riemann 函数：$x=\frac pq$（$p\in\Z$，$q\in\Np$，$p$ 与 $q$ 互素）时 $R(x)=\frac1q$，$x$ 为无理数时 $R(x)=0$。证明 $R$ 在任何点都不可导。</p></div>
<x-hint><p>有理点处 $R$ 不连续。无理点 $x_0$ 处，若可导，导数只能是 $0$（沿无理数列看）；再利用 Dirichlet 逼近定理：有无穷多个既约分数 $\frac pq$ 满足 $\left|x_0-\frac pq\right|<\frac1{q^2}$。</p></x-hint>
<x-ans>
<p>在有理点 $x_0=\frac pq$ 处，$R(x_0)=\frac1q>0$，而沿趋于 $x_0$ 的无理数列 $R$ 的值恒为 $0$，所以 $R$ 在 $x_0$ 不连续，不可导。</p>
<p>设 $x_0$ 为无理数，$R(x_0)=0$。若 $R'(x_0)$ 存在，沿趋于 $x_0$ 的无理数列，差商恒为 $0$，所以 $R'(x_0)=0$。下面找一列有理数 $r_k\to x_0$，使差商趋于 $+\infty$，从而得出矛盾。</p>
<p><b>Dirichlet 逼近。</b>对正整数 $N$，考察 $N+1$ 个数 $kx_0-[kx_0]\in[0,1)$（$k=0,1,\cdots,N$）。把 $[0,1)$ 等分成 $N$ 个长为 $\frac1N$ 的小区间，由抽屉原理，必有两个数落在同一个小区间里：存在 $0\le j<k\le N$ 使 $|(k-j)x_0-m|<\frac1N$，其中 $m=[kx_0]-[jx_0]$。记 $q=k-j\in[1,N]$，则 $\left|x_0-\frac mq\right|<\frac1{qN}$。把 $\frac mq$ 约成既约分数 $\frac{p'}{q'}$（$q'\le q\le N$），则</p>
$$\left|x_0-\frac{p'}{q'}\right|<\frac1{qN}\le\frac1{q'^2}\quad\text{且}\quad\left|x_0-\frac{p'}{q'}\right|<\frac1N .$$
<p>令 $N\to\infty$，得到一列既约分数 $r=\frac{p'}{q'}\to x_0$。由于 $x_0$ 是无理数，它与分母不超过某个固定数 $Q$ 的分数的距离有正的下界（这样的分数在 $x_0$ 附近只有有限个），所以这些分母 $q'\to\infty$。于是</p>
$$\left|\frac{R(r)-R(x_0)}{r-x_0}\right|=\frac{1/q'}{|r-x_0|}>\frac{1/q'}{1/q'^2}=q'\to\infty ,$$
<p>与 $R'(x_0)=0$ 矛盾。所以 $R$ 在任何点都不可导。<span class="qed">∎</span></p>
<x-remark><p>Riemann 函数在每个无理点都连续（第三章），却处处不可导：连续性与可导性之间的差距可以非常大。</p></x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="金属板受热膨胀">
<div><p>边长为 $20\ \text{cm}$ 的正方形铝板，温度升高 $50\ {}^\circ\text{C}$，铝的线膨胀系数约为 $2.3\times10^{-5}\ {}^\circ\text{C}^{-1}$。用微分估计铝板面积的增加量，并与精确值比较。</p></div>
<x-check answer="0.92" tol="0.005" unit="cm²" ph="保留两位小数">面积的增加量约为</x-check>
<x-hint><p>先算边长的增量 $\Delta L=L_0\alpha\Delta T$，再用 $\dd S=2L_0\,\dd L$。</p></x-hint>
<x-ans>
<p>$\Delta L=20\times2.3\times10^{-5}\times50=0.023\ \text{cm}$，$\dd S=2\times20\times0.023=0.92\ \text{cm}^2$。精确值 $20.023^2-400=0.920529\ \text{cm}^2$，两者只差 $(\Delta L)^2\approx0.00053\ \text{cm}^2$。面积的相对增量约为 $0.23\%$，正好是边长相对增量 $0.115\%$ 的 $2$ 倍。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="测量精度的要求">
<div><p>(1) 要使计算出的球体积的相对误差不超过 $1\%$，测量半径时的相对误差最多允许多大？</p>
<p>(2) 正方体的棱长约为 $50\ \text{cm}$，要使计算出的体积的绝对误差不超过 $30\ \text{cm}^3$，测量棱长时的绝对误差最多允许多大？</p></div>
<x-check answer="0.333" tol="0.002" unit="%" ph="保留三位小数">(1) 半径的相对误差最多约为</x-check>
<x-check answer="0.004" tol="0.0002" unit="cm" ph="填一个小数">(2) 棱长的绝对误差最多约为</x-check>
<x-hint><p>(1) 用“幂函数把相对误差放大 $|\alpha|$ 倍”；(2) 用 $|\dd V|=3a^2|\dd a|$。</p></x-hint>
<x-ans>
<p>(1) $V=\frac43\pi r^3$，体积的相对误差约为半径相对误差的 $3$ 倍，所以半径的相对误差不能超过 $\frac13\%\approx0.333\%$。</p>
<p>(2) $|\dd V|=3a^2|\dd a|=7500\,|\dd a|\le30$，所以 $|\dd a|\le0.004\ \text{cm}$，即 $0.04\ \text{mm}$。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="摆钟的热胀冷缩">
<div><p>摆钟的周期 $T=2\pi\sqrt{L/g}$，走时准确时 $T=2\ \text{s}$。摆杆用黄铜制成，线膨胀系数约为 $1.9\times10^{-5}\ {}^\circ\text{C}^{-1}$。气温升高 $10\ {}^\circ\text{C}$ 后，这只钟一昼夜大约慢多少秒？</p></div>
<x-check answer="8.2" tol="0.1" unit="s" ph="保留一位小数">一昼夜大约慢</x-check>
<x-hint><p>$T$ 是 $L$ 的 $\frac12$ 次幂，周期的相对变化约为摆长相对变化的一半。钟是靠数摆动次数来计时的。</p></x-hint>
<x-ans>
<p>摆长的相对变化 $\frac{\dd L}L=1.9\times10^{-5}\times10=1.9\times10^{-4}$，周期的相对变化 $\frac{\dd T}T\approx\frac12\cdot\frac{\dd L}L=9.5\times10^{-5}$。钟每摆动一次就记 $2\ \text{s}$，现在每次实际用时变长了，一昼夜（$86400\ \text{s}$）少摆的比例约为 $9.5\times10^{-5}$，所以大约慢 $86400\times9.5\times10^{-5}\approx8.2\ \text{s}$。（精确计算为 $86400\left(1-\frac1{\sqrt{1.00019}}\right)\approx8.21\ \text{s}$。）</p>
<x-remark><p>一天慢 $8$ 秒，一个月就是 $4$ 分钟。18 世纪英国钟表匠 Harrison 用黄铜杆和钢杆交替组成“栅形摆”，利用两种金属膨胀系数的差别让摆长保持不变，解决了这个问题。</p></x-remark>
</x-ans>
</x-prob>
`);
