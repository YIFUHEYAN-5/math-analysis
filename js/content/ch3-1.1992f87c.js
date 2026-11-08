/* §3.1 函数极限 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("3-1", String.raw`
<x-goal>
<ul>
<li>理解函数极限的 $\eps$-$\delta$ 定义及其几何意义，能用定义证明简单函数的极限，能准确写出“$A$ 不是 $f(x)$ 在 $x_0$ 处的极限”的数学表述。</li>
<li>掌握函数极限的唯一性、局部有界性、局部保序性与夹逼准则，熟练运用四则运算法则与变量代换（复合函数的极限）。</li>
<li>掌握两个重要极限 $\lim\limits_{x\to0}\frac{\sin x}x=1$ 与 $\lim\limits_{x\to\infty}\left(1+\frac1x\right)^x=e$，并会用它们计算极限。</li>
<li>理解 Heine 定理（函数极限与数列极限的关系），会用它证明函数极限不存在；了解函数极限的 Cauchy 收敛原理。</li>
<li>掌握单侧极限以及 $x\to\infty$、$f(x)\to\infty$ 等各种极限过程的定义，会用极限描述瞬时速度、饱和现象等实际问题。</li>
</ul>
</x-goal>
<p>第二章研究了数列 $\{a_n\}$ 当 $n\to\infty$ 时的极限。数列是定义在正整数集上的函数，自变量只能一步一步地“跳”向无穷；一般函数 $f(x)$ 的自变量却可以在实数轴上连续地变化，可以从左右两侧趋近某一点 $x_0$，也可以趋于 $+\infty$ 或 $-\infty$。先看一个例子：自由落体在时刻 $t$ 下落的距离是 $s(t)=\frac12gt^2$，它在时间段 $[t_0,t_0+h]$ 上的平均速度为</p>
$$\bar v(h)=\frac{s(t_0+h)-s(t_0)}h=\frac{\frac12g\left(2t_0h+h^2\right)}h=gt_0+\frac12gh\qquad(h\ne0).$$
<p>时间段越短，平均速度越能反映 $t_0$ 时刻运动的快慢。但 $h$ 不能等于 $0$（分母为 $0$），我们要问的是：当 $h$ <em>无限接近 $0$ 但不等于 $0$</em> 时，$\bar v(h)$ 无限接近什么数？答案显然是 $gt_0$，它就是 $t_0$ 时刻的<em>瞬时速度</em>。本节把“自变量无限接近 $x_0$ 时，函数值无限接近 $A$”这句话精确化，并建立函数极限的性质、运算法则和计算方法。很多证明与数列极限的证明平行，建议对照第二章阅读。</p>

<h2 id="def">函数极限的定义</h2>
<p>先引入记号。设 $x_0\in\R$，$\delta>0$。把 $x_0$ 的 $\delta$ 邻域 $O(x_0,\delta)=(x_0-\delta,x_0+\delta)$ 去掉中心 $x_0$，得到的集合</p>
$$\mathring O(x_0,\delta)=O(x_0,\delta)\setminus\{x_0\}=\{x\mid0<|x-x_0|<\delta\}$$
<p>称为 $x_0$ 的<em>去心 $\delta$ 邻域</em>。之所以去掉中心，是因为研究 $x\to x_0$ 时我们只关心 $x\ne x_0$ 处的函数值，函数在 $x_0$ 处甚至可以没有定义（如上面的 $\bar v(h)$ 在 $h=0$ 处）。</p>
<x-def t="函数极限" id="def-flim">
<p>设函数 $f(x)$ 在 $x_0$ 的某个去心邻域 $\mathring O(x_0,\rho)$ 中有定义。如果存在实数 $A$，对于任意给定的 $\eps>0$，可以找到 $\delta>0$，使得当 $0<|x-x_0|<\delta$ 时，成立</p>
$$|f(x)-A|<\eps,$$
<p>则称 $A$ 是函数 $f(x)$ 在点 $x_0$ 的<em>极限</em>，记作</p>
$$\lim_{x\to x_0}f(x)=A\quad\text{或}\quad f(x)\to A\ (x\to x_0).$$
<p>如果不存在具有上述性质的实数 $A$，则称 $f(x)$ 在点 $x_0$ 的极限不存在。用逻辑符号写成：</p>
$$\lim_{x\to x_0}f(x)=A\iff\forall\eps>0,\ \exists\delta>0,\ \forall x\in\mathring O(x_0,\delta):\ |f(x)-A|<\eps.$$
</x-def>
<x-intuit t="仍然是“挑战—应战”的游戏">
<p>质疑者给出一个精度 $\eps$，证明者要找到 $x_0$ 的一个去心邻域，保证邻域里<em>每一个</em> $x$ 的函数值都落在 $(A-\eps,A+\eps)$ 中。在图像上看：任意画一条以直线 $y=A$ 为中心、高为 $2\eps$ 的水平带子，总能找到一条以直线 $x=x_0$ 为中心、宽为 $2\delta$ 的竖直带子，使得函数图像在竖直带子内的部分（不计直线 $x=x_0$ 上的点）全部落在水平带子里，也就是落在以 $(x_0,A)$ 为中心、宽 $2\delta$、高 $2\eps$ 的矩形“窗口”中。</p>
</x-intuit>
<x-viz type="epsdelta" t="$\eps$-$\delta$ 定义的直观演示"><p>选择函数，调节 $\eps$ 与 $\delta$：绿色矩形就是上面说的窗口，红点表示窗口内跑到水平带子外面的函数值。按“取最大的 $\delta$”可以看到对当前 $\eps$ 最大可用的 $\delta$；按“用例题中的 $\delta$”可以检验下面例题推导出的 $\delta$——它通常比最大的 $\delta$ 小，因为定义只要求找到<em>某个</em>可用的 $\delta$。最后两个例子中猜测的 $A$ 都不是极限：$\eps$ 足够小时，无论 $\delta$ 取多小都有红点。</p></x-viz>
<x-note>
<ul>
<li><em>$x\ne x_0$</em>：定义只考察 $0<|x-x_0|<\delta$ 中的 $x$。$f$ 在 $x_0$ 处有没有定义、定义成多少，都与 $\lim\limits_{x\to x_0}f(x)$ 无关。例如 $\frac{x^2-1}{x-1}$ 在 $x=1$ 处没有定义，但 $x\to1$ 时它的极限是 $2$。</li>
<li><em>$\delta$ 依赖于 $\eps$</em>（一般也依赖于 $x_0$），有时写成 $\delta=\delta(\eps)$。$\delta$ 不唯一：可用的 $\delta$ 换成更小的正数仍然可用。所以总可以要求 $\delta\le\rho$，也可以要求 $\delta$ 不超过事先指定的某个正数（例如 $\delta\le1$）。</li>
<li>与数列极限一样，只需对充分小的 $\eps$ 找到 $\delta$；把 $|f(x)-A|<\eps$ 换成 $|f(x)-A|\le\eps$ 或 $|f(x)-A|<K\eps$（$K$ 是与 $x$、$\eps$ 无关的正常数），定义的含义不变。</li>
<li><em>极限是局部概念</em>：$\lim\limits_{x\to x_0}f(x)$ 只与 $f$ 在 $x_0$ 附近的值有关。任意改变 $f$ 在 $x_0$ 的某个去心邻域之外的值，不影响极限是否存在以及等于多少。</li>
</ul>
</x-note>

<x-ex t="用定义证明多项式的极限" id="ex-sq">
<p>用定义证明 $\lim\limits_{x\to3}x^2=9$。</p>
<x-analysis><p>要让 $|x^2-9|=|x+3|\,|x-3|$ 小于 $\eps$。因子 $|x-3|$ 可以由 $\delta$ 控制，因子 $|x+3|$ 却随 $x$ 变化。由于只关心 $3$ 附近的 $x$，可以先限制 $|x-3|<1$，这时 $2<x<4$，$|x+3|<7$，于是 $|x^2-9|<7|x-3|$，只要再让 $7|x-3|<\eps$ 就行了。</p></x-analysis>
<x-sol l="证明">
<p>任给 $\eps>0$，取 $\delta=\min\left\{1,\frac\eps7\right\}$。当 $0<|x-3|<\delta$ 时，$|x-3|<1$，所以 $|x+3|\le|x-3|+6<7$，从而</p>
$$|x^2-9|=|x+3|\,|x-3|<7|x-3|<7\delta\le\eps.$$
<p>所以 $\lim\limits_{x\to3}x^2=9$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>“先把 $x$ 限制在 $x_0$ 的某个固定邻域内，把与 $x$ 有关的因子放大成常数”是用定义证明函数极限的常用手法。限制的范围可以随意选，例如改为 $|x-3|<\frac12$，就得到 $|x+3|<\frac{13}2$，$\delta=\min\left\{\frac12,\frac{2\eps}{13}\right\}$。</x-remark>
</x-ex>
<x-warn><p>$\delta$ 只能依赖于 $\eps$（与 $x_0$），<em>不能依赖于 $x$</em>。定义的顺序是：先给定 $\eps$，再确定 $\delta$，然后对去心邻域中的<em>所有</em> $x$ 验证不等式。在上例中写“取 $\delta=\frac\eps{|x+3|}$”是错误的——这个“$\delta$”随 $x$ 变化，根本没有确定一个邻域。先限制 $|x-3|<1$，正是为了把 $|x+3|$ 放大成与 $x$ 无关的常数 $7$。</p></x-warn>

<x-ex t="用定义证明有理函数的极限" id="ex-frac">
<p>用定义证明 $\lim\limits_{x\to1}\frac{x^2-1}{2x^2-x-1}=\frac23$。</p>
<x-analysis><p>函数在 $x=1$ 处没有定义（分母为 $0$），但这不影响极限。由于 $x\ne1$，可以先约去公因子 $x-1$；再仿照上例，先限制 $x$ 的范围，把分母中与 $x$ 有关的部分缩小成正常数。</p></x-analysis>
<x-sol l="证明">
<p>$2x^2-x-1=(2x+1)(x-1)$，函数在 $\mathring O\left(1,\frac12\right)$ 中有定义。当 $x\ne1$ 时，</p>
$$\left|\frac{x^2-1}{2x^2-x-1}-\frac23\right|=\left|\frac{x+1}{2x+1}-\frac23\right|=\frac{|x-1|}{3|2x+1|}.$$
<p>当 $|x-1|<\frac12$ 时，$x>\frac12$，$2x+1>2$，于是上式 $<\frac{|x-1|}6$。任给 $\eps>0$，取 $\delta=\min\left\{\frac12,6\eps\right\}$，则当 $0<|x-1|<\delta$ 时，</p>
$$\left|\frac{x^2-1}{2x^2-x-1}-\frac23\right|<\frac{|x-1|}6<\frac\delta6\le\eps.$$
<p>所以极限为 $\frac23$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>约去公因子 $x-1$ 是合法的，因为极限过程中 $x\ne1$。这也是计算“$\frac00$ 型”极限最基本的方法。</x-remark>
</x-ex>

<x-ex t="$\sqrt x$ 的极限" id="ex-sqrt">
<p>设 $x_0>0$，用定义证明 $\lim\limits_{x\to x_0}\sqrt x=\sqrt{x_0}$。</p>
<x-sol l="证明">
<p>先限制 $|x-x_0|<x_0$，这时 $x>0$，函数有定义，且</p>
$$\left|\sqrt x-\sqrt{x_0}\right|=\frac{|x-x_0|}{\sqrt x+\sqrt{x_0}}\le\frac{|x-x_0|}{\sqrt{x_0}}.$$
<p>任给 $\eps>0$，取 $\delta=\min\{x_0,\sqrt{x_0}\,\eps\}$，则当 $0<|x-x_0|<\delta$ 时，$\left|\sqrt x-\sqrt{x_0}\right|<\frac\delta{\sqrt{x_0}}\le\eps$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这里的 $\delta$ 与 $x_0$ 有关：$x_0$ 越接近 $0$，同样的 $\eps$ 需要的 $\delta$ 越小（$\sqrt x$ 的图像在 $0$ 附近很陡）。“能否找到与 $x_0$ 无关的 $\delta$”正是 §3.4 中一致连续要讨论的问题。</x-remark>
</x-ex>

<p>为了讨论三角函数的极限，需要一个基本不等式。</p>
<x-lem t="正弦不等式" id="lem-sin">
<p>当 $0<x<\frac\pi2$ 时，$\sin x<x<\tan x$；对一切 $x\in\R$，$|\sin x|\le|x|$，等号仅当 $x=0$ 时成立。</p>
<x-proof><p>在单位圆中取圆心角 $\angle AOB=x$（弧度），$0<x<\frac\pi2$，其中 $A=(1,0)$，$B=(\cos x,\sin x)$；过 $A$ 作圆的切线，与射线 $OB$ 交于 $D=(1,\tan x)$。三角形 $AOB$、扇形 $AOB$、三角形 $AOD$ 依次包含，面积依次为 $\frac12\sin x$、$\frac12x$、$\frac12\tan x$，所以 $\sin x<x<\tan x$。</p>
<p>由此，$0<|x|<\frac\pi2$ 时 $|\sin x|<|x|$（$\sin x$ 是奇函数）；$|x|\ge\frac\pi2$ 时 $|\sin x|\le1<\frac\pi2\le|x|$；$x=0$ 时等号成立。<span class="qed">∎</span></p></x-proof>
</x-lem>
<x-note><p>证明中用到了扇形面积公式 $S=\frac12r^2\theta$，它来自弧度的定义。严格地说，弧长与面积要到积分学中才能严格定义，这里暂时承认这些几何事实。</p></x-note>

<x-ex t="正弦函数与余弦函数的极限" id="ex-sincos">
<p>证明：对任意 $x_0\in\R$，$\lim\limits_{x\to x_0}\sin x=\sin x_0$，$\lim\limits_{x\to x_0}\cos x=\cos x_0$。</p>
<x-sol l="证明">
<p>由和差化积公式与 <x-ref to="lem-sin"></x-ref>，</p>
$$|\sin x-\sin x_0|=2\left|\cos\frac{x+x_0}2\right|\left|\sin\frac{x-x_0}2\right|\le2\cdot\frac{|x-x_0|}2=|x-x_0|,$$
$$|\cos x-\cos x_0|=2\left|\sin\frac{x+x_0}2\right|\left|\sin\frac{x-x_0}2\right|\le|x-x_0|.$$
<p>任给 $\eps>0$，取 $\delta=\eps$，则当 $0<|x-x_0|<\delta$ 时，$|\sin x-\sin x_0|<\eps$，$|\cos x-\cos x_0|<\eps$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>前面几个例子的极限都等于函数在该点的值：$\lim\limits_{x\to x_0}f(x)=f(x_0)$。具有这种性质的函数称为在 $x_0$ 处<em>连续</em>，这是 §3.2 的主题。</x-remark>
</x-ex>

<p>与数列极限一样，要能准确写出定义的否定。“$A$ 不是 $f(x)$ 在 $x_0$ 处的极限”是说：</p>
$$\exists\eps_0>0,\ \forall\delta>0,\ \exists x\in\mathring O(x_0,\delta):\ |f(x)-A|\ge\eps_0,$$
<p>即存在一个精度 $\eps_0$，无论去心邻域取得多小，其中总有点的函数值与 $A$ 的距离不小于 $\eps_0$。“$\lim\limits_{x\to x_0}f(x)$ 不存在”是说：对每一个实数 $A$，上式都成立。</p>
<x-ex t="符号函数在 $0$ 处没有极限" id="ex-sgn">
<p>证明 $\lim\limits_{x\to0}\sgn x$ 不存在。</p>
<x-sol l="证明">
<p>任取 $A\in\R$，取 $\eps_0=1$。对任意 $\delta>0$：若 $A\ge0$，取 $x=-\frac\delta2\in\mathring O(0,\delta)$，则 $|\sgn x-A|=|-1-A|=1+A\ge1$；若 $A<0$，取 $x=\frac\delta2$，则 $|\sgn x-A|=1-A>1$。所以 $A$ 不是 $\sgn x$ 在 $0$ 处的极限。由 $A$ 的任意性，极限不存在。<span class="qed">∎</span></p>
</x-sol>
<x-remark>直观地看，$x$ 从右侧趋于 $0$ 时 $\sgn x$ 恒为 $1$，从左侧趋于 $0$ 时恒为 $-1$，“两边不一致”。学了单侧极限之后（<x-ref to="ex-sgnfloor"></x-ref>），这类问题可以说得更简洁。</x-remark>
</x-ex>
`);
MA.add("3-1", String.raw`
<h2 id="prop">函数极限的性质</h2>
<p>函数极限的性质与数列极限的性质（<x-ref to="2-2/thm-uniq"></x-ref>～<x-ref to="2-2/thm-squeeze"></x-ref>）一一对应，证明也几乎相同：把“当 $n>N$ 时”换成“当 $0<|x-x_0|<\delta$ 时”即可。不同之处在于，函数极限只能推出函数在 $x_0$ <em>附近</em>的性质，所以下面的定理大多带有“局部”二字。以下总设所涉及的函数在 $x_0$ 的某个去心邻域中有定义。</p>
<x-thm t="唯一性" id="thm-uniq">
<p>若 $\lim\limits_{x\to x_0}f(x)$ 存在，则极限是唯一的。</p>
<x-proof><p>设 $A$ 与 $B$ 都是 $f(x)$ 在 $x_0$ 处的极限，且 $A\ne B$。取 $\eps=\frac{|A-B|}2>0$，则存在 $\delta_1>0$，当 $0<|x-x_0|<\delta_1$ 时 $|f(x)-A|<\eps$；存在 $\delta_2>0$，当 $0<|x-x_0|<\delta_2$ 时 $|f(x)-B|<\eps$（两个 $\delta$ 都可以取得不超过 $f$ 的定义域所含去心邻域的半径）。取 $x=x_0+\frac12\min\{\delta_1,\delta_2\}$，则</p>
$$|A-B|\le|f(x)-A|+|f(x)-B|<2\eps=|A-B|,$$
<p>矛盾。所以 $A=B$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-thm t="局部有界性" id="thm-lbdd">
<p>若 $\lim\limits_{x\to x_0}f(x)=A$，则存在 $\delta>0$，使得 $f(x)$ 在 $\mathring O(x_0,\delta)$ 上有界。</p>
<x-proof><p>取 $\eps=1$，存在 $\delta>0$，当 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<1$，从而 $|f(x)|\le|f(x)-A|+|A|<|A|+1$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>只能保证<em>局部</em>有界。例如 $\lim\limits_{x\to1}\frac1x=1$，但 $\frac1x$ 在 $(0,1)$ 上无界；定理只保证它在 $1$ 的某个去心邻域中有界（例如在 $\mathring O\left(1,\frac12\right)$ 中 $\frac1x<2$）。这与“收敛数列必有界”（<x-ref to="2-2/thm-bdd"></x-ref>）不同：数列在“$n>N$”之外只有有限多项，而函数在邻域之外可能有无限多个“坏”点。</p></x-note>
<x-thm t="局部保序性" id="thm-lorder">
<p>若 $\lim\limits_{x\to x_0}f(x)=A$，$\lim\limits_{x\to x_0}g(x)=B$，且 $A>B$，则存在 $\delta>0$，当 $0<|x-x_0|<\delta$ 时，成立 $f(x)>g(x)$。</p>
<x-proof><p>取 $\eps=\frac{A-B}2>0$，存在 $\delta>0$（取两个定义中 $\delta$ 的较小者），当 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<\eps$ 且 $|g(x)-B|<\eps$，于是 $f(x)>A-\eps=\frac{A+B}2=B+\eps>g(x)$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-cor t="局部保号性" id="cor-lsign">
<p>若 $\lim\limits_{x\to x_0}f(x)=A>0$，则存在 $\delta>0$，当 $0<|x-x_0|<\delta$ 时，$f(x)>\frac A2>0$。对 $A<0$ 有类似的结论。</p>
<x-proof><p>在 <x-ref to="thm-lorder"></x-ref> 中取 $g(x)\equiv\frac A2$。<span class="qed">∎</span></p></x-proof>
</x-cor>
<x-cor t="极限的保不等式性" id="cor-lle">
<p>若在 $x_0$ 的某个去心邻域中 $f(x)\ge g(x)$，且 $\lim\limits_{x\to x_0}f(x)=A$，$\lim\limits_{x\to x_0}g(x)=B$，则 $A\ge B$。</p>
<x-proof><p>若 $A<B$，由 <x-ref to="thm-lorder"></x-ref>，在 $x_0$ 的某个（更小的）去心邻域中 $f(x)<g(x)$，与条件矛盾。<span class="qed">∎</span></p></x-proof>
</x-cor>
<x-warn><p>严格不等式在取极限后可能变成等号：在 $\mathring O(0,1)$ 中 $|x|>0$，但 $\lim\limits_{x\to0}|x|=0$。所以由 $f(x)>g(x)$ 只能推出 $A\ge B$，不能推出 $A>B$。反过来，<x-ref to="thm-lorder"></x-ref> 的条件 $A>B$ 也不能减弱为 $A\ge B$。</p></x-warn>
<x-thm t="夹逼准则" id="thm-fsq">
<p>若存在 $\rho>0$，当 $0<|x-x_0|<\rho$ 时 $g(x)\le f(x)\le h(x)$，且 $\lim\limits_{x\to x_0}g(x)=\lim\limits_{x\to x_0}h(x)=A$，则 $\lim\limits_{x\to x_0}f(x)=A$。</p>
<x-proof><p>任给 $\eps>0$，存在 $\delta_1,\delta_2>0$，当 $0<|x-x_0|<\delta_1$ 时 $g(x)>A-\eps$，当 $0<|x-x_0|<\delta_2$ 时 $h(x)<A+\eps$。取 $\delta=\min\{\rho,\delta_1,\delta_2\}$，则当 $0<|x-x_0|<\delta$ 时，$A-\eps<g(x)\le f(x)\le h(x)<A+\eps$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-ex t="有界函数乘以趋于零的函数" id="ex-xsin">
<p>证明 $\lim\limits_{x\to0}x\sin\frac1x=0$。</p>
<x-sol l="证明">
<p>当 $x\ne0$ 时，$\left|x\sin\frac1x\right|\le|x|$，即 $-|x|\le x\sin\frac1x\le|x|$。由于 $\lim\limits_{x\to0}|x|=0$（取 $\delta=\eps$ 即可），由夹逼准则得 $\lim\limits_{x\to0}x\sin\frac1x=0$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>后面将证明 $\sin\frac1x$ 在 $0$ 处没有极限（<x-ref to="ex-sin1x"></x-ref>），所以这里不能用乘积的运算法则。一般地，若 $g(x)$ 在 $x_0$ 的某个去心邻域中有界，$\lim\limits_{x\to x_0}f(x)=0$，则 $\lim\limits_{x\to x_0}f(x)g(x)=0$，证明完全相同。</x-remark>
</x-ex>

<p>下面是第一个重要极限。它是计算三角函数极限的基础，下一章还要用它求 $\sin x$ 的导数。</p>
<x-thm t="第一个重要极限" id="thm-sinx">
$$\lim_{x\to0}\frac{\sin x}x=1.$$
<x-proof><p>当 $0<x<\frac\pi2$ 时，由 <x-ref to="lem-sin"></x-ref>，$\sin x<x<\tan x$，各项除以 $\sin x>0$ 得 $1<\frac x{\sin x}<\frac1{\cos x}$，即</p>
$$\cos x<\frac{\sin x}x<1.$$
<p>由于 $\cos x$ 与 $\frac{\sin x}x$ 都是偶函数，上式对 $0<|x|<\frac\pi2$ 都成立。又由 <x-ref to="ex-sincos"></x-ref>，$\lim\limits_{x\to0}\cos x=\cos0=1$，由夹逼准则得 $\lim\limits_{x\to0}\frac{\sin x}x=1$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>由 $0<1-\frac{\sin x}x<1-\cos x=2\sin^2\frac x2\le\frac{x^2}2$（$0<|x|<\frac\pi2$）还可以直接写出 $\delta$：取 $\delta=\min\left\{\frac\pi2,\sqrt{2\eps}\right\}$。在上面的 $\eps$-$\delta$ 演示中选择 $\frac{\sin x}x$ 可以检验这个 $\delta$。数值上，$\frac{\sin0.1}{0.1}\approx0.998334$，$\frac{\sin0.01}{0.01}\approx0.99998333$。</p></x-note>
<x-viz type="plot" f="sin(x)/x;cos(x);1" xmin="-4" xmax="4" ymin="-1.1" ymax="1.3" t="$\frac{\sin x}x$ 被夹在 $\cos x$ 与 $1$ 之间"><p>图中依次画出 $\frac{\sin x}x$、$\cos x$ 与常数 $1$。$\frac{\sin x}x$ 在 $x=0$ 处没有定义，但在 $0<|x|<\frac\pi2$ 上被夹在另外两条曲线之间，而它们在 $x\to0$ 时都趋于 $1$。</p></x-viz>

<h2 id="arith">函数极限的四则运算</h2>
<x-thm t="四则运算法则" id="thm-farith">
<p>设 $\lim\limits_{x\to x_0}f(x)=A$，$\lim\limits_{x\to x_0}g(x)=B$，则</p>
<p>(1) $\lim\limits_{x\to x_0}\big(\alpha f(x)+\beta g(x)\big)=\alpha A+\beta B$（$\alpha,\beta$ 为常数）；</p>
<p>(2) $\lim\limits_{x\to x_0}f(x)g(x)=AB$；</p>
<p>(3) 当 $B\ne0$ 时，$\lim\limits_{x\to x_0}\frac{f(x)}{g(x)}=\frac AB$。</p>
<x-proof><p>(1) 由 $|\alpha f(x)+\beta g(x)-(\alpha A+\beta B)|\le|\alpha|\,|f(x)-A|+|\beta|\,|g(x)-B|$ 即得。</p>
<p>(2) 由局部有界性，存在 $\delta_0>0$ 与 $M>0$，当 $0<|x-x_0|<\delta_0$ 时 $|f(x)|\le M$。于是</p>
$$|f(x)g(x)-AB|\le|f(x)|\,|g(x)-B|+|B|\,|f(x)-A|\le M|g(x)-B|+|B|\,|f(x)-A|.$$
<p>任给 $\eps>0$，取 $\delta\le\delta_0$，使 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<\eps$ 且 $|g(x)-B|<\eps$，则 $|f(x)g(x)-AB|<(M+|B|)\eps$。</p>
<p>(3) 只需证明 $\lim\limits_{x\to x_0}\frac1{g(x)}=\frac1B$，再用 (2)。对 $\eps=\frac{|B|}2$，存在 $\delta_0>0$，当 $0<|x-x_0|<\delta_0$ 时 $|g(x)-B|<\frac{|B|}2$，从而 $|g(x)|>\frac{|B|}2>0$，$\frac1{g(x)}$ 有定义，且</p>
$$\left|\frac1{g(x)}-\frac1B\right|=\frac{|g(x)-B|}{|g(x)|\,|B|}<\frac2{B^2}|g(x)-B|,$$
<p>由此即得结论。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>由 $\lim\limits_{x\to x_0}c=c$ 与 $\lim\limits_{x\to x_0}x=x_0$，反复使用四则运算法则可知：对多项式 $P(x)$，$\lim\limits_{x\to x_0}P(x)=P(x_0)$；对有理函数 $\frac{P(x)}{Q(x)}$，当 $Q(x_0)\ne0$ 时，$\lim\limits_{x\to x_0}\frac{P(x)}{Q(x)}=\frac{P(x_0)}{Q(x_0)}$。当分子、分母的极限都是 $0$（称为 <em>$\frac00$ 型</em>）时，不能直接用商的法则，要先变形。</p>
<x-ex t="约去趋于零的公因子" id="ex-cancel">
<p>求 (1) $\lim\limits_{x\to2}\frac{x^3-8}{x^2-4}$；(2) $\lim\limits_{x\to1}\frac{x^n-1}{x-1}$（$n\in\Np$）。</p>
<x-sol>
<p>(1) 当 $x\ne2$ 时，$\frac{x^3-8}{x^2-4}=\frac{(x-2)(x^2+2x+4)}{(x-2)(x+2)}=\frac{x^2+2x+4}{x+2}$，所以极限为 $\frac{4+4+4}4=3$。</p>
<p>(2) 当 $x\ne1$ 时，$\frac{x^n-1}{x-1}=x^{n-1}+x^{n-2}+\cdots+x+1$，所以极限为 $n$。</p>
</x-sol>
</x-ex>

<x-thm t="复合函数的极限（变量代换）" id="thm-comp">
<p>设 $\lim\limits_{x\to x_0}g(x)=u_0$，$\lim\limits_{u\to u_0}f(u)=A$，并且存在 $\rho>0$，当 $0<|x-x_0|<\rho$ 时 $g(x)\ne u_0$，则</p>
$$\lim_{x\to x_0}f\big(g(x)\big)=\lim_{u\to u_0}f(u)=A.$$
<x-proof><p>任给 $\eps>0$，存在 $\eta>0$（可以要求 $\eta$ 不超过 $f$ 的定义域所含去心邻域的半径），当 $0<|u-u_0|<\eta$ 时 $|f(u)-A|<\eps$。对这个 $\eta$，存在 $\delta_1>0$，当 $0<|x-x_0|<\delta_1$ 时 $|g(x)-u_0|<\eta$。取 $\delta=\min\{\delta_1,\rho\}$，则当 $0<|x-x_0|<\delta$ 时，$0<|g(x)-u_0|<\eta$，所以 $f(g(x))$ 有定义，且 $|f(g(x))-A|<\eps$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>这个定理的用法是“换元”：要求 $\lim\limits_{x\to x_0}f(g(x))$，令 $u=g(x)$，转化为求 $\lim\limits_{u\to u_0}f(u)$。例如求 $\lim\limits_{x\to0}\frac{\sin2x}{2x}$ 时令 $u=2x$，当 $x\ne0$ 时 $u\ne0$，所以极限为 $\lim\limits_{u\to0}\frac{\sin u}u=1$。</p>
<x-warn><p>条件“$g(x)\ne u_0$”不能去掉。设 $f(u)=0\ (u\ne0)$，$f(0)=1$，则 $\lim\limits_{u\to0}f(u)=0$。取 $g(x)=x\sin\frac1x$（$x\ne0$），则 $g(x)\to0$，但 $g$ 在 $x_n=\frac1{n\pi}$ 处取值 $0$，所以 $f(g(x_n))=1$，而在 $g(x)\ne0$ 的点处 $f(g(x))=0$。在 $0$ 的任何去心邻域中，$f(g(x))$ 都既取到 $0$ 又取到 $1$，所以 $\lim\limits_{x\to0}f(g(x))$ 不存在。如果外函数 $f$ 在 $u_0$ 处连续（即 $f(u_0)=A$），这个条件就可以去掉，见 §3.2。</p></x-warn>

<x-ex t="三角函数的 $\frac00$ 型极限" id="ex-trig">
<p>求 (1) $\lim\limits_{x\to0}\frac{1-\cos x}{x^2}$；(2) $\lim\limits_{x\to0}\frac{\tan x}x$；(3) $\lim\limits_{x\to0}\frac{\sin ax}{\sin bx}$（$a,b\ne0$）。</p>
<x-sol>
<p>(1) 由 $1-\cos x=2\sin^2\frac x2$，</p>
$$\frac{1-\cos x}{x^2}=\frac12\left(\frac{\sin\frac x2}{\frac x2}\right)^2\to\frac12\cdot1^2=\frac12\quad(x\to0),$$
<p>这里令 $u=\frac x2$ 用了变量代换（$x\ne0$ 时 $u\ne0$）。</p>
<p>(2) $\frac{\tan x}x=\frac{\sin x}x\cdot\frac1{\cos x}\to1\cdot1=1$。</p>
<p>(3) $\frac{\sin ax}{\sin bx}=\frac ab\cdot\frac{\sin ax}{ax}\cdot\frac{bx}{\sin bx}\to\frac ab$。</p>
</x-sol>
<x-remark>(1) 说明 $x\to0$ 时 $1-\cos x$ 与 $\frac{x^2}2$“差不多大”，即 $\cos x\approx1-\frac{x^2}2$。例如 $\cos0.1=0.995004\cdots$，而 $1-\frac{0.01}2=0.995$。这类“近似程度”的比较是 §3.3 的内容。</x-remark>
</x-ex>
<x-ex t="分子分母同时有理化" id="ex-ratz">
<p>求 $\lim\limits_{x\to4}\frac{\sqrt{2x+1}-3}{\sqrt x-2}$。</p>
<x-sol>
<p>$\left(\sqrt{2x+1}-3\right)\left(\sqrt{2x+1}+3\right)=2(x-4)$，$\left(\sqrt x-2\right)\left(\sqrt x+2\right)=x-4$。于是当 $x\ne4$ 时，</p>
$$\frac{\sqrt{2x+1}-3}{\sqrt x-2}=\frac{2(x-4)}{\sqrt{2x+1}+3}\cdot\frac{\sqrt x+2}{x-4}=\frac{2\left(\sqrt x+2\right)}{\sqrt{2x+1}+3}.$$
<p>由 <x-ref to="ex-sqrt"></x-ref>，$\sqrt x\to2$；令 $u=2x+1$（$x\ne4$ 时 $u\ne9$），由 <x-ref to="thm-comp"></x-ref>，$\sqrt{2x+1}\to\sqrt9=3$。所以极限为 $\frac{2\times4}{3+3}=\frac43$。</p>
</x-sol>
</x-ex>
<x-tip t="计算 $\frac00$ 型极限的初等方法">
<ol>
<li><em>约去公因子</em>：分子、分母因式分解，约去趋于 $0$ 的公因子（如 $x-x_0$）；</li>
<li><em>有理化</em>：含根式时乘以共轭根式；</li>
<li><em>化为重要极限</em>：利用三角恒等式（如 $1-\cos x=2\sin^2\frac x2$）凑出 $\frac{\sin u}u$ 的形式；</li>
<li><em>变量代换</em>：令 $u=g(x)$，注意检查条件 $g(x)\ne u_0$。</li>
</ol>
<p>更一般的工具（等价量替换、L'Hospital 法则、Taylor 公式）将在 §3.3 与第五章介绍。</p>
</x-tip>
`);
MA.add("3-1", String.raw`
<h2 id="heine">函数极限与数列极限的关系</h2>
<p>$x\to x_0$ 是一个“连续”的过程，而数列 $x_n\to x_0$ 是一个“离散”的过程。下面的定理说明，前者可以完全由后者刻画，从而在函数极限与数列极限之间架起一座桥梁。</p>
<x-thm t="Heine 定理" id="thm-heine">
<p>设 $f(x)$ 在 $\mathring O(x_0,\rho)$ 中有定义，则 $\lim\limits_{x\to x_0}f(x)=A$ 的充分必要条件是：对于任意满足 $x_n\in\mathring O(x_0,\rho)$（即 $x_n\ne x_0$）且 $\lim\limits_{n\to\infty}x_n=x_0$ 的数列 $\{x_n\}$，相应的函数值数列都满足</p>
$$\lim_{n\to\infty}f(x_n)=A.$$
<x-proof><p><b>必要性</b>：任给 $\eps>0$，存在 $\delta>0$，当 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<\eps$。由于 $x_n\to x_0$ 且 $x_n\ne x_0$，存在 $N$，当 $n>N$ 时 $0<|x_n-x_0|<\delta$，从而 $|f(x_n)-A|<\eps$。所以 $f(x_n)\to A$。</p>
<p><b>充分性</b>：用反证法。若 $A$ 不是 $f(x)$ 在 $x_0$ 处的极限，则存在 $\eps_0>0$，对任意 $\delta>0$，存在 $x\in\mathring O(x_0,\delta)$ 使 $|f(x)-A|\ge\eps_0$。依次取 $\delta=\frac\rho n$（$n=1,2,\cdots$），得到 $x_n$，满足</p>
$$0<|x_n-x_0|<\frac\rho n,\qquad|f(x_n)-A|\ge\eps_0.$$
<p>于是 $x_n\in\mathring O(x_0,\rho)$，$x_n\to x_0$，但 $\{f(x_n)\}$ 不收敛于 $A$，与条件矛盾。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note>
<ul>
<li>Heine 定理最常用于<em>证明函数极限不存在</em>：只要找到两个趋于 $x_0$（且各项不等于 $x_0$）的数列 $\{x_n\}$、$\{y_n\}$，使 $\lim f(x_n)\ne\lim f(y_n)$，或者找到一个使 $\{f(x_n)\}$ 发散的数列，就说明 $\lim\limits_{x\to x_0}f(x)$ 不存在。</li>
<li>反过来，用 Heine 定理<em>证明</em>极限存在，需要考察<em>所有</em>这样的数列，只验证几个特殊数列是不够的。但定理的必要性部分可以把函数极限的结论直接“搬”到数列上，例如由 $\frac{\sin x}x\to1$ 立即得到 $n\sin\frac1n\to1$。</li>
<li>条件 $x_n\ne x_0$ 不能去掉，因为函数在 $x_0$ 处的值与极限无关。</li>
</ul>
</x-note>
<x-ex t="$\sin\frac1x$ 在 $0$ 处没有极限" id="ex-sin1x">
<p>证明 $\lim\limits_{x\to0}\sin\frac1x$ 不存在。</p>
<x-sol l="证明">
<p>取 $x_n=\frac1{n\pi}$，$y_n=\frac1{2n\pi+\frac\pi2}$，则 $x_n\to0$，$y_n\to0$，且各项都不等于 $0$。但</p>
$$\sin\frac1{x_n}=\sin n\pi=0\to0,\qquad\sin\frac1{y_n}=\sin\left(2n\pi+\frac\pi2\right)=1\to1.$$
<p>两个极限不相等，由 Heine 定理，$\lim\limits_{x\to0}\sin\frac1x$ 不存在。<span class="qed">∎</span></p>
</x-sol>
<x-remark>$x\to0$ 时 $\frac1x\to\infty$，$\sin\frac1x$ 在 $-1$ 与 $1$ 之间振荡无穷多次，而且越来越快。事实上，对任意 $c\in[-1,1]$，取 $z_n=\frac1{2n\pi+\arcsin c}$，就有 $z_n\to0$ 且 $\sin\frac1{z_n}=c$。</x-remark>
</x-ex>
<x-viz type="heine" t="Heine 定理：沿不同的数列趋近 $x_0$"><p>上图在函数图像上标出两个趋于 $x_0$ 的数列 $\{x_n\}$、$\{y_n\}$ 对应的点，下图画出函数值 $f(x_n)$、$f(y_n)$ 随 $n$ 的变化。若两列函数值趋于不同的数，函数极限就不存在。也可以自己输入函数与数列试一试。</p></x-viz>
<x-ex t="Dirichlet 函数处处没有极限" id="ex-dirichlet">
<p>设 Dirichlet 函数 $D(x)=\begin{cases}1,&x\in\Q,\\0,&x\notin\Q.\end{cases}$ 证明：对任意 $x_0\in\R$，$\lim\limits_{x\to x_0}D(x)$ 不存在。</p>
<x-sol l="证明">
<p>由有理数的稠密性（<x-ref to="2-1/thm-dense"></x-ref>），对每个 $n$，区间 $\left(x_0,x_0+\frac1n\right)$ 中有有理数 $x_n$；在区间 $\left(x_0-\sqrt2,x_0-\sqrt2+\frac1n\right)$ 中取有理数 $r_n$，则 $y_n=r_n+\sqrt2$ 是 $\left(x_0,x_0+\frac1n\right)$ 中的无理数。于是 $x_n\to x_0$，$y_n\to x_0$，各项都不等于 $x_0$，而 $D(x_n)=1\to1$，$D(y_n)=0\to0$。由 Heine 定理，$\lim\limits_{x\to x_0}D(x)$ 不存在。<span class="qed">∎</span></p>
</x-sol>
</x-ex>
<x-ex t="用函数极限求数列极限" id="ex-seqlim">
<p>求 (1) $\lim\limits_{n\to\infty}n\sin\frac\pi n$；(2) $\lim\limits_{n\to\infty}n^2\left(1-\cos\frac1n\right)$。</p>
<x-sol>
<p>(1) 令 $x_n=\frac\pi n$，则 $x_n\to0$ 且 $x_n\ne0$。由 <x-ref to="thm-sinx"></x-ref> 与 Heine 定理的必要性，$\frac{\sin x_n}{x_n}\to1$，所以 $n\sin\frac\pi n=\pi\cdot\frac{\sin x_n}{x_n}\to\pi$。</p>
<p>(2) 令 $x_n=\frac1n$，由 <x-ref to="ex-trig"></x-ref>(1)，$n^2\left(1-\cos\frac1n\right)=\frac{1-\cos x_n}{x_n^2}\to\frac12$。</p>
</x-sol>
<x-remark>$n\sin\frac\pi n$ 是单位圆内接正 $n$ 边形周长的一半。(1) 说明 $n\to\infty$ 时它趋于半圆周长 $\pi$，这正是 Archimedes 用正多边形逼近圆周率的思想。</x-remark>
</x-ex>

<p>数列有 Cauchy 收敛原理（<x-ref to="2-4/thm-cauchy"></x-ref>），可以在不知道极限值的情况下判断收敛性。借助 Heine 定理，它可以推广到函数极限。</p>
<x-thm t="函数极限的 Cauchy 收敛原理" id="thm-fcauchy">
<p>设 $f(x)$ 在 $\mathring O(x_0,\rho)$ 中有定义，则 $\lim\limits_{x\to x_0}f(x)$ 存在的充分必要条件是：对于任意给定的 $\eps>0$，存在 $\delta>0$，对一切 $x',x''\in\mathring O(x_0,\delta)$，成立</p>
$$|f(x')-f(x'')|<\eps.$$
<x-proof><p><b>必要性</b>：设 $\lim\limits_{x\to x_0}f(x)=A$。任给 $\eps>0$，存在 $\delta>0$，当 $x\in\mathring O(x_0,\delta)$ 时 $|f(x)-A|<\frac\eps2$。于是对 $x',x''\in\mathring O(x_0,\delta)$，$|f(x')-f(x'')|\le|f(x')-A|+|A-f(x'')|<\eps$。</p>
<p><b>充分性</b>：任取数列 $x_n\to x_0$，$x_n\in\mathring O(x_0,\rho)$。任给 $\eps>0$，取条件中的 $\delta$，存在 $N$，当 $n>N$ 时 $x_n\in\mathring O(x_0,\delta)$，于是当 $m,n>N$ 时 $|f(x_m)-f(x_n)|<\eps$。所以 $\{f(x_n)\}$ 是基本数列，由数列的 Cauchy 收敛原理，它收敛。</p>
<p>再说明极限与数列的选取无关。设 $\{x_n\}$、$\{y_n\}$ 是两个这样的数列，$f(x_n)\to A$，$f(y_n)\to B$。把它们交错排成 $x_1,y_1,x_2,y_2,\cdots$，得到的数列 $\{z_n\}$ 仍然趋于 $x_0$ 且各项不等于 $x_0$，所以 $\{f(z_n)\}$ 收敛；而 $\{f(x_n)\}$ 与 $\{f(y_n)\}$ 都是它的子列，由 <x-ref to="2-4/thm-sub"></x-ref>，$A=B$。因此所有这样的数列 $\{f(x_n)\}$ 都收敛于同一个数 $A$，由 Heine 定理，$\lim\limits_{x\to x_0}f(x)=A$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>否定形式：$\lim\limits_{x\to x_0}f(x)$ 不存在，当且仅当存在 $\eps_0>0$，对任意 $\delta>0$，都有 $x',x''\in\mathring O(x_0,\delta)$ 使 $|f(x')-f(x'')|\ge\eps_0$。例如对 $\sin\frac1x$，取 $\eps_0=1$，$x'=\frac1{2n\pi+\frac\pi2}$，$x''=\frac1{2n\pi}$（$n$ 充分大），则 $|f(x')-f(x'')|=1$。</p></x-note>

<h2 id="onesided">单侧极限</h2>
<p>$\sgn x$ 在 $0$ 处没有极限，但它在 $0$ 的右侧恒为 $1$、左侧恒为 $-1$，“各自都有确定的趋势”。分段函数、取整函数、区间端点处的函数，常常需要分别考察 $x$ 从右侧和从左侧趋于 $x_0$ 的情形。</p>
<x-def t="单侧极限" id="def-side">
<p>设 $f(x)$ 在 $(x_0,x_0+\rho)$ 上有定义。如果存在实数 $A$，对于任意给定的 $\eps>0$，可以找到 $\delta>0$，使得当 $0<x-x_0<\delta$ 时，成立 $|f(x)-A|<\eps$，则称 $A$ 是 $f(x)$ 在点 $x_0$ 的<em>右极限</em>，记作</p>
$$\lim_{x\to x_0^+}f(x)=A\quad\text{或}\quad f(x_0+)=A.$$
<p>类似地，设 $f(x)$ 在 $(x_0-\rho,x_0)$ 上有定义，把“$0<x-x_0<\delta$”换成“$-\delta<x-x_0<0$”，就得到<em>左极限</em> $\lim\limits_{x\to x_0^-}f(x)=A$，也记作 $f(x_0-)=A$。左极限与右极限统称为<em>单侧极限</em>。</p>
</x-def>
<x-thm t="极限与单侧极限的关系" id="thm-side">
<p>$\lim\limits_{x\to x_0}f(x)=A$ 的充分必要条件是 $f(x_0+)$ 与 $f(x_0-)$ 都存在且都等于 $A$。</p>
<x-proof><p>必要性：在极限定义中只考虑 $x>x_0$（或 $x<x_0$）的点即可。充分性：任给 $\eps>0$，存在 $\delta_1>0$，当 $0<x-x_0<\delta_1$ 时 $|f(x)-A|<\eps$；存在 $\delta_2>0$，当 $-\delta_2<x-x_0<0$ 时 $|f(x)-A|<\eps$。取 $\delta=\min\{\delta_1,\delta_2\}$，则当 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<\eps$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>单侧极限同样有唯一性、局部有界性、保序性、夹逼准则与四则运算法则；Heine 定理中只需改为考察从一侧趋于 $x_0$ 的数列。</p>
<x-ex t="符号函数与取整函数" id="ex-sgnfloor">
<p>讨论 (1) $\sgn x$ 在 $x=0$ 处；(2) $[x]$ 在整数点 $x=k$ 处的单侧极限与极限。</p>
<x-sol>
<p>(1) 当 $x>0$ 时 $\sgn x=1$，当 $x<0$ 时 $\sgn x=-1$，所以 $\sgn(0+)=1$，$\sgn(0-)=-1$。两者不相等，由 <x-ref to="thm-side"></x-ref>，$\lim\limits_{x\to0}\sgn x$ 不存在。</p>
<p>(2) 当 $k<x<k+1$ 时 $[x]=k$，当 $k-1<x<k$ 时 $[x]=k-1$（<x-ref to="1-2/ex-floor"></x-ref>），所以 $\lim\limits_{x\to k^+}[x]=k$，$\lim\limits_{x\to k^-}[x]=k-1$，$[x]$ 在整数点处没有极限。在非整数点 $x_0$ 处，$[x]$ 在 $x_0$ 的某个邻域中是常数，所以 $\lim\limits_{x\to x_0}[x]=[x_0]$。</p>
</x-sol>
</x-ex>
<x-ex t="由绝对值引起的单侧极限" id="ex-sqrtcos">
<p>求 $\lim\limits_{x\to0^+}\frac{\sqrt{1-\cos x}}x$ 与 $\lim\limits_{x\to0^-}\frac{\sqrt{1-\cos x}}x$，并判断 $\lim\limits_{x\to0}\frac{\sqrt{1-\cos x}}x$ 是否存在。</p>
<x-sol>
<p>$\sqrt{1-\cos x}=\sqrt{2\sin^2\frac x2}=\sqrt2\left|\sin\frac x2\right|$。当 $0<x<\pi$ 时 $\sin\frac x2>0$，</p>
$$\frac{\sqrt{1-\cos x}}x=\frac{\sqrt2}2\cdot\frac{\sin\frac x2}{\frac x2}\to\frac{\sqrt2}2\quad(x\to0^+);$$
<p>当 $-\pi<x<0$ 时 $\sin\frac x2<0$，同理 $\frac{\sqrt{1-\cos x}}x=-\frac{\sqrt2}2\cdot\frac{\sin\frac x2}{\frac x2}\to-\frac{\sqrt2}2\ (x\to0^-)$。左、右极限不相等，所以 $\lim\limits_{x\to0}\frac{\sqrt{1-\cos x}}x$ 不存在。</p>
</x-sol>
<x-remark>开平方时出现的绝对值是一个常见陷阱：$\sqrt{a^2}=|a|$，而不是 $a$。</x-remark>
</x-ex>
<p>单调数列必有（有限或无穷的）极限（<x-ref to="2-4/thm-mono"></x-ref>），单调函数也有类似的性质。</p>
<x-thm t="单调函数的单侧极限" id="thm-monolim">
<p>设 $f(x)$ 在 $(a,b)$ 上单调增加，$x_0\in(a,b)$，则 $f(x_0-)$ 与 $f(x_0+)$ 都存在，并且</p>
$$f(x_0-)=\sup_{a<x<x_0}f(x)\le f(x_0)\le\inf_{x_0<x<b}f(x)=f(x_0+).$$
<x-proof><p>数集 $\{f(x)\mid a<x<x_0\}$ 有上界 $f(x_0)$，由确界存在定理（<x-ref to="2-1/thm-sup"></x-ref>），它有上确界 $\beta\le f(x_0)$。任给 $\eps>0$，由上确界的定义，存在 $x_1\in(a,x_0)$ 使 $f(x_1)>\beta-\eps$。取 $\delta=x_0-x_1$，当 $-\delta<x-x_0<0$ 即 $x_1<x<x_0$ 时，</p>
$$\beta-\eps<f(x_1)\le f(x)\le\beta,$$
<p>所以 $f(x_0-)=\beta$。同理 $f(x_0+)=\inf\limits_{x_0<x<b}f(x)\ge f(x_0)$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>同样的论证说明：单调增加函数在区间左端点 $a$ 处的右极限 $f(a+)=\inf\limits_{a<x<b}f(x)$ 总存在（下方无界时为 $-\infty$），在右端点处 $f(b-)=\sup\limits_{a<x<b}f(x)$。单调减少函数有对称的结论。§3.2 将由此推出：单调函数的不连续点只能是“跳跃”，并且至多可列个。</p></x-note>

<h2 id="ext">函数极限定义的扩充</h2>
<p>前面讨论的是 $x\to x_0$（或 $x\to x_0^\pm$）、极限为有限数的情形。自变量的变化过程还可以是 $x\to+\infty$、$x\to-\infty$、$x\to\infty$，函数值的变化趋势还可以是趋于 $+\infty$、$-\infty$ 或 $\infty$。</p>
<x-def t="自变量趋于无穷大时的极限" id="def-xinf">
<p>设 $f(x)$ 在 $(a,+\infty)$ 上有定义。如果存在实数 $A$，对于任意给定的 $\eps>0$，可以找到 $X>0$，使得当 $x>X$ 时，成立 $|f(x)-A|<\eps$，则称 $x\to+\infty$ 时 $f(x)$ 的极限为 $A$，记作 $\lim\limits_{x\to+\infty}f(x)=A$。</p>
<p>把“$x>X$”换成“$x<-X$”或“$|x|>X$”，就得到 $\lim\limits_{x\to-\infty}f(x)=A$ 与 $\lim\limits_{x\to\infty}f(x)=A$ 的定义（这时 $f$ 分别在某个 $(-\infty,b)$ 与某个 $\{x\mid|x|>a\}$ 上有定义）。</p>
</x-def>
<x-def t="函数值趋于无穷大" id="def-finf">
<p>设 $f(x)$ 在 $x_0$ 的某个去心邻域中有定义。如果对于任意给定的 $G>0$，可以找到 $\delta>0$，使得当 $0<|x-x_0|<\delta$ 时，成立 $f(x)>G$，则称 $x\to x_0$ 时 $f(x)$ 趋于 $+\infty$，记作 $\lim\limits_{x\to x_0}f(x)=+\infty$。把“$f(x)>G$”换成“$f(x)<-G$”或“$|f(x)|>G$”，就得到 $\lim\limits_{x\to x_0}f(x)=-\infty$ 与 $\lim\limits_{x\to x_0}f(x)=\infty$ 的定义。</p>
</x-def>
<p>与数列的情形一样（<x-ref to="2-3/def-infl"></x-ref>），$\lim f(x)=\infty$ 只是一个记号，表示 $|f(x)|$ 无限增大，这时仍说 $f(x)$ 的极限不存在。“极限存在”总是指极限是一个有限数。</p>
<p>自变量的 $6$ 种变化过程与函数值的 $4$ 种变化趋势搭配，共有 $24$ 种极限。它们的定义都是同一个模式：“对于任意给定的 $\eps>0$（或 $G>0$），存在 $\delta>0$（或 $X>0$），使得当 $x$ 满足左表中相应的条件时，$f(x)$ 满足右表中相应的不等式。”</p>
<table class="center">
<tr><th>自变量的变化过程</th><th>当……时</th></tr>
<tr><td>$x\to x_0$</td><td>$0<|x-x_0|<\delta$</td></tr>
<tr><td>$x\to x_0^+$</td><td>$0<x-x_0<\delta$</td></tr>
<tr><td>$x\to x_0^-$</td><td>$-\delta<x-x_0<0$</td></tr>
<tr><td>$x\to+\infty$</td><td>$x>X$</td></tr>
<tr><td>$x\to-\infty$</td><td>$x<-X$</td></tr>
<tr><td>$x\to\infty$</td><td>$|x|>X$</td></tr>
</table>
<table class="center">
<tr><th>函数值的变化趋势</th><th>成立……</th></tr>
<tr><td>$f(x)\to A$</td><td>$|f(x)-A|<\eps$</td></tr>
<tr><td>$f(x)\to+\infty$</td><td>$f(x)>G$</td></tr>
<tr><td>$f(x)\to-\infty$</td><td>$f(x)<-G$</td></tr>
<tr><td>$f(x)\to\infty$</td><td>$|f(x)|>G$</td></tr>
</table>
<p>例如 $\lim\limits_{x\to x_0^-}f(x)=-\infty$ 的定义是：对于任意给定的 $G>0$，存在 $\delta>0$，使得当 $-\delta<x-x_0<0$ 时，成立 $f(x)<-G$。</p>
<x-note>
<ul>
<li>本节关于有限极限的结论——唯一性、局部有界性、局部保序性、夹逼准则、四则运算法则、变量代换、Heine 定理与 Cauchy 收敛原理——对各种极限过程都成立，只需把“去心邻域”换成相应的范围。例如 Heine 定理成为：$\lim\limits_{x\to+\infty}f(x)=A$ 当且仅当对任意 $x_n\to+\infty$，都有 $f(x_n)\to A$。特别地，由 $\lim\limits_{x\to+\infty}f(x)=A$ 可以推出 $\lim\limits_{n\to\infty}f(n)=A$。</li>
<li>反过来，由 $\lim\limits_{n\to\infty}f(n)=A$ 推不出 $\lim\limits_{x\to+\infty}f(x)=A$：$\sin(n\pi)=0$，但 $x\to+\infty$ 时 $\sin\pi x$ 没有极限。</li>
<li>与 <x-ref to="2-3/thm-recip"></x-ref> 类似：若 $f(x)\to\infty$，则 $\frac1{f(x)}\to0$；若 $f(x)\to0$ 且在去心邻域中 $f(x)\ne0$，则 $\frac1{f(x)}\to\infty$。</li>
</ul>
</x-note>
<x-ex t="$x\to\infty$ 时的极限" id="ex-ratinf">
<p>求 (1) $\lim\limits_{x\to\infty}\frac{3x^2-x+1}{2x^2+5}$；(2) $\lim\limits_{x\to+\infty}\left(\sqrt{x^2+x}-x\right)$；(3) $\lim\limits_{x\to-\infty}\left(\sqrt{x^2+x}-x\right)$。</p>
<x-sol>
<p>(1) 由定义易证 $\lim\limits_{x\to\infty}\frac1x=0$（取 $X=\frac1\eps$）。分子、分母同除以 $x^2$，</p>
$$\frac{3x^2-x+1}{2x^2+5}=\frac{3-\frac1x+\frac1{x^2}}{2+\frac5{x^2}}\to\frac32\quad(x\to\infty).$$
<p>(2) 当 $x>0$ 时，$\sqrt{x^2+x}-x=\frac x{\sqrt{x^2+x}+x}=\frac1{\sqrt{1+\frac1x}+1}$。由于 $1+\frac1x\to1$ 且 $\sqrt u\to1\ (u\to1)$，所以极限为 $\frac12$。</p>
<p>(3) 当 $x\le-1$ 时 $x^2+x\ge0$，且 $\sqrt{x^2+x}-x\ge-x=|x|$。任给 $G>0$，取 $X=\max\{1,G\}$，当 $x<-X$ 时 $\sqrt{x^2+x}-x\ge|x|>G$，所以极限为 $+\infty$。</p>
</x-sol>
<x-remark>(2)(3) 说明 $x\to+\infty$ 与 $x\to-\infty$ 时的结果可能完全不同，所以 $\lim\limits_{x\to\infty}\left(\sqrt{x^2+x}-x\right)$ 不存在。处理 $x\to-\infty$ 时要特别注意 $\sqrt{x^2}=|x|=-x$。</x-remark>
</x-ex>
<x-ex t="$e^{\frac1x}$ 在 $0$ 处的单侧极限" id="ex-e1x">
<p>证明 $\lim\limits_{x\to0^+}e^{\frac1x}=+\infty$，$\lim\limits_{x\to0^-}e^{\frac1x}=0$。</p>
<x-sol l="证明">
<p>先证明：当 $u>0$ 时 $e^u>u$。若 $0<u<1$，则 $e^u>1>u$；若 $u\ge1$，记 $k=[u]\ge1$，由 $e>2$ 及 Bernoulli 不等式（<x-ref to="1-2/lem-bern"></x-ref>），$e^u\ge e^k>2^k=(1+1)^k\ge1+k>u$。</p>
<p>任给 $G>0$，取 $\delta=\frac1G$，当 $0<x<\delta$ 时 $\frac1x>G$，所以 $e^{\frac1x}>\frac1x>G$。这证明了右极限为 $+\infty$。</p>
<p>当 $x<0$ 时，$0<e^{\frac1x}=\frac1{e^{-\frac1x}}<\frac1{-\frac1x}=|x|$。任给 $\eps>0$，取 $\delta=\eps$，当 $-\delta<x<0$ 时 $0<e^{\frac1x}<\eps$。这证明了左极限为 $0$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>两个单侧极限不同（其中一个甚至不是有限数），所以 $\lim\limits_{x\to0}e^{\frac1x}$ 不存在，也不是 $\infty$。</x-remark>
</x-ex>
<p>下面是第二个重要极限，它把数列极限 $\left(1+\frac1n\right)^n\to e$（<x-ref to="2-4/thm-e"></x-ref>）推广到连续变量。</p>
<x-thm t="第二个重要极限" id="thm-ex">
$$\lim_{x\to\infty}\left(1+\frac1x\right)^x=e,\qquad\lim_{x\to0}(1+x)^{\frac1x}=e.$$
<x-proof><p>(i) $x\to+\infty$。当 $x\ge1$ 时记 $n=[x]$，则 $n\le x<n+1$，$1+\frac1{n+1}<1+\frac1x\le1+\frac1n$。由于底数大于 $1$ 的指数函数单调增加，</p>
$$\left(1+\frac1{n+1}\right)^n<\left(1+\frac1x\right)^x<\left(1+\frac1n\right)^{n+1}.$$
<p>当 $n\to\infty$ 时，</p>
$$\left(1+\frac1{n+1}\right)^n=\frac{\left(1+\frac1{n+1}\right)^{n+1}}{1+\frac1{n+1}}\to e,\qquad\left(1+\frac1n\right)^{n+1}=\left(1+\frac1n\right)^n\left(1+\frac1n\right)\to e.$$
<p>于是任给 $\eps>0$，存在正整数 $N$，当 $n>N$ 时上面两个数都落在 $(e-\eps,e+\eps)$ 中。取 $X=N+1$，当 $x>X$ 时 $n=[x]>N$，所以 $\left|\left(1+\frac1x\right)^x-e\right|<\eps$。</p>
<p>(ii) $x\to-\infty$。当 $x<-1$ 时令 $t=-x-1>0$，则 $1+\frac1x=\frac{x+1}x=\frac t{t+1}$，</p>
$$\left(1+\frac1x\right)^x=\left(\frac{t+1}t\right)^{t+1}=\left(1+\frac1t\right)^t\left(1+\frac1t\right).$$
<p>$x\to-\infty$ 相当于 $t\to+\infty$，由 (i) 知极限为 $e\cdot1=e$。</p>
<p>(iii) 由 (i)(ii) 得 $\lim\limits_{x\to\infty}\left(1+\frac1x\right)^x=e$。对 $(1+x)^{\frac1x}$，令 $u=\frac1x$，则 $x\to0^+$ 与 $x\to0^-$ 分别对应 $u\to+\infty$ 与 $u\to-\infty$，而 $(1+x)^{\frac1x}=\left(1+\frac1u\right)^u\to e$，所以两个单侧极限都等于 $e$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-ex t="$1^\infty$ 型极限" id="ex-ek">
<p>求 (1) $\lim\limits_{x\to\infty}\left(1-\frac2x\right)^x$；(2) $\lim\limits_{x\to0}(1+3x)^{\frac1x}$；(3) $\lim\limits_{x\to\infty}\left(\frac{x+1}{x-1}\right)^x$。</p>
<x-sol>
<p>(1) 令 $u=-\frac x2$，则 $x\to\infty$ 时 $u\to\infty$，$\left(1-\frac2x\right)^x=\left[\left(1+\frac1u\right)^u\right]^{-2}\to e^{-2}$。</p>
<p>(2) 令 $u=3x$，则 $(1+3x)^{\frac1x}=\left[(1+u)^{\frac1u}\right]^3\to e^3$。</p>
<p>(3) 同 (1) 可得 $\left(1-\frac1x\right)^x\to e^{-1}$。由 $\frac{x+1}{x-1}=\frac{1+\frac1x}{1-\frac1x}$ 得 $\left(\frac{x+1}{x-1}\right)^x=\frac{\left(1+\frac1x\right)^x}{\left(1-\frac1x\right)^x}\to\frac e{e^{-1}}=e^2$。</p>
</x-sol>
<x-remark>这里只用到了整数次幂的运算法则。对任意实数 $r$，$\lim\limits_{x\to\infty}\left(1+\frac rx\right)^x=e^r$ 同样成立，但需要用到指数函数的连续性，将在 §3.2 中证明。</x-remark>
</x-ex>
<x-app t="酶促反应的饱和现象">
<p>生物化学中，酶促反应的初速度 $v$ 与底物浓度 $S$ 的关系常用 Michaelis–Menten 方程（1913）描述：</p>
$$v(S)=\frac{V_{\max}S}{K_m+S},$$
<p>其中 $V_{\max}$ 是最大反应速度，$K_m>0$ 称为 Michaelis 常数。由 $v(S)=\frac{V_{\max}}{1+K_m/S}$ 得 $\lim\limits_{S\to+\infty}v(S)=V_{\max}$：底物充足时，酶几乎全部处于工作状态，反应速度趋于饱和，再增加底物也无济于事。这个极限的“$\eps$-$X$”说法很有实际意义：$V_{\max}-v(S)=\frac{V_{\max}K_m}{K_m+S}<\eps$ 当且仅当 $S>\frac{V_{\max}K_m}\eps-K_m$。例如要使速度达到最大速度的 $95\%$，即 $V_{\max}-v<0.05V_{\max}$，需要 $S>19K_m$。另一方面，$\lim\limits_{S\to0^+}\frac{v(S)}S=\frac{V_{\max}}{K_m}$：底物很少时，反应速度近似与底物浓度成正比。</p>
</x-app>
<x-hist t="从“无限趋近”到 $\eps$-$\delta$">
<p>Newton 与 Leibniz 创立微积分时，依靠的是“无穷小量”“最终比”等直观但含糊的概念。1734 年，英国哲学家 Berkeley 在《分析学家》中尖锐地指出：无穷小量时而不是零（可以作除数），时而又是零（可以略去），并讥讽它们是“消失了的量的幽灵”。此后一百年间，数学家一面大量使用微积分，一面努力为它寻找可靠的基础。1817 年，Bolzano 用不等式的语言描述了连续性；1821 年，Cauchy 在《分析教程》中以“无限趋近”为核心定义了极限、无穷小与连续，使极限成为分析学的基础。但“无限趋近”仍带有运动的直观色彩。Weierstrass 在 19 世纪五六十年代的柏林讲课中，把它改写成完全由不等式构成的 $\eps$-$\delta$ 语言；Heine 在 1872 年的论文《函数论基础》中系统发表了这套严格的表述。今天教科书中的定义，基本上就是 Weierstrass 的形式。</p>
</x-hist>
`);
MA.add("3-1", String.raw`
<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li><em>定义</em>：$\lim\limits_{x\to x_0}f(x)=A\iff\forall\eps>0,\ \exists\delta>0,\ \forall x\ (0<|x-x_0|<\delta):\ |f(x)-A|<\eps$。极限只与 $f$ 在 $x_0$ 附近（不含 $x_0$）的值有关；$\delta$ 依赖于 $\eps$，不能依赖于 $x$。</li>
<li><em>性质</em>：唯一性、局部有界性、局部保序性与保号性、保不等式性（严格不等式取极限后可能变成等号）、夹逼准则。</li>
<li><em>运算</em>：四则运算法则；复合函数的极限（变量代换）需要条件 $g(x)\ne u_0$。$\frac00$ 型极限常用约去公因子、有理化、化为重要极限等方法。</li>
<li><em>两个重要极限</em>：$\lim\limits_{x\to0}\frac{\sin x}x=1$，$\lim\limits_{x\to\infty}\left(1+\frac1x\right)^x=\lim\limits_{x\to0}(1+x)^{\frac1x}=e$；由前者得 $\frac{1-\cos x}{x^2}\to\frac12$，$\frac{\tan x}x\to1$。</li>
<li><em>Heine 定理</em>：$\lim\limits_{x\to x_0}f(x)=A$ 当且仅当对所有 $x_n\to x_0$（$x_n\ne x_0$）都有 $f(x_n)\to A$。找两个数列使函数值趋于不同的数，是证明极限不存在的标准方法（如 $\sin\frac1x$、Dirichlet 函数）。函数极限也有 Cauchy 收敛原理。</li>
<li><em>单侧极限</em>：$\lim\limits_{x\to x_0}f(x)=A\iff f(x_0+)=f(x_0-)=A$；单调函数在每一点处的单侧极限都存在。</li>
<li><em>各种极限过程</em>：$6$ 种自变量变化过程与 $4$ 种函数值变化趋势搭配成 $24$ 种极限，都可以用“邻域”的语言统一描述；$\lim f(x)=\infty$ 时仍说极限不存在。</li>
</ul>
</x-sum>

<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对函数极限的理解">
<x-q type="choice" answer="C">
<x-stem>关于 $\lim\limits_{x\to x_0}f(x)=A$ 的定义，下列说法正确的是</x-stem>
<x-opt>$f(x)$ 必须在 $x_0$ 处有定义</x-opt>
<x-opt>若 $f(x)$ 在 $x_0$ 处有定义，则必有 $f(x_0)=A$</x-opt>
<x-opt>$\delta$ 可以依赖于 $\eps$ 与 $x_0$，但不能依赖于 $x$</x-opt>
<x-opt>对给定的 $\eps$，必须取最大的可用 $\delta$</x-opt>
<x-exp>定义只考察 $0<|x-x_0|<\delta$ 的点，$f$ 在 $x_0$ 处的值与极限无关，所以 A、B 都不对；$\delta$ 只需存在，不必最大，D 不对。$\delta$ 是在给定 $\eps$ 之后、考察 $x$ 之前确定的，所以不能依赖于 $x$。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若 $\lim\limits_{x\to x_0}f(x)=A$，且 $f$ 在 $x_0$ 处有定义，则 $f(x_0)=A$。</x-stem>
<x-exp>错误。例如 $f(x)=x^2\ (x\ne1)$，$f(1)=2$，则 $\lim\limits_{x\to1}f(x)=1\ne f(1)$。“极限等于函数值”是连续性的要求（§3.2），不是极限定义的一部分。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>若在 $x_0$ 的某个去心邻域中 $f(x)>0$，且 $\lim\limits_{x\to x_0}f(x)=A$，则</x-stem>
<x-opt>$A>0$</x-opt>
<x-opt>$A\ge0$</x-opt>
<x-opt>$A$ 可能小于 $0$</x-opt>
<x-opt>$f(x_0)>0$</x-opt>
<x-exp>由保不等式性得 $A\ge0$；等号可能成立，例如 $f(x)=x^2$，$x_0=0$。$f$ 在 $x_0$ 处可能没有定义，D 不对。</x-exp>
</x-q>
<x-q type="fill" answer="3">
<x-stem>$\lim\limits_{x\to0}\frac{\sin3x}x=$ ____</x-stem>
<x-exp>$\frac{\sin3x}x=3\cdot\frac{\sin3x}{3x}\to3$（令 $u=3x$）。</x-exp>
</x-q>
<x-q type="fill" answer="2">
<x-stem>$\lim\limits_{x\to0}\frac{1-\cos2x}{x^2}=$ ____</x-stem>
<x-exp>$1-\cos2x=2\sin^2x$，所以 $\frac{1-\cos2x}{x^2}=2\left(\frac{\sin x}x\right)^2\to2$。</x-exp>
</x-q>
<x-q type="fill" answer="e^2" ph="可输入表达式，如 e^2">
<x-stem>$\lim\limits_{x\to\infty}\left(1+\frac2x\right)^x=$ ____</x-stem>
<x-exp>令 $u=\frac x2$，$\left(1+\frac2x\right)^x=\left[\left(1+\frac1u\right)^u\right]^2\to e^2\approx7.389$。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>$\lim\limits_{x\to0}x\sin\frac1x$ 与 $\lim\limits_{x\to\infty}x\sin\frac1x$ 依次为</x-stem>
<x-opt>$0$，$0$</x-opt>
<x-opt>$0$，$1$</x-opt>
<x-opt>$1$，$0$</x-opt>
<x-opt>不存在，$1$</x-opt>
<x-exp>$x\to0$ 时 $\left|x\sin\frac1x\right|\le|x|\to0$；$x\to\infty$ 时令 $u=\frac1x\to0$，$x\sin\frac1x=\frac{\sin u}u\to1$。同一个函数在不同的极限过程中可以有完全不同的极限。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若存在一个数列 $x_n\to x_0$（$x_n\ne x_0$），使 $\lim\limits_{n\to\infty}f(x_n)=A$，则 $\lim\limits_{x\to x_0}f(x)=A$。</x-stem>
<x-exp>错误。Heine 定理要求对<em>所有</em>这样的数列成立。例如 $x_n=\frac1{n\pi}$ 使 $\sin\frac1{x_n}=0\to0$，但 $\lim\limits_{x\to0}\sin\frac1x$ 不存在。</x-exp>
</x-q>
<x-q type="multi" answer="ABD">
<x-stem>下列极限中，不存在（也不是 $\infty$）的有</x-stem>
<x-opt>$\lim\limits_{x\to0}\sin\frac1x$</x-opt>
<x-opt>$\lim\limits_{x\to0}e^{\frac1x}$</x-opt>
<x-opt>$\lim\limits_{x\to0}x\sin\frac1x$</x-opt>
<x-opt>$\lim\limits_{x\to0}\sgn x$</x-opt>
<x-exp>A 在 $-1$ 与 $1$ 之间振荡；B 的右极限为 $+\infty$、左极限为 $0$；D 的左、右极限分别为 $-1$、$1$。C 的极限为 $0$。</x-exp>
</x-q>
<x-q type="fill" answer="5">
<x-stem>$\lim\limits_{x\to1}\frac{x^5-1}{x-1}=$ ____</x-stem>
<x-exp>$\frac{x^5-1}{x-1}=x^4+x^3+x^2+x+1\to5$。</x-exp>
</x-q>
<x-q type="fill" answer="-1" ph="填一个整数">
<x-stem>$\lim\limits_{x\to0^-}[x]=$ ____（$[x]$ 为取整函数）</x-stem>
<x-exp>当 $-1\le x<0$ 时 $[x]=-1$，所以左极限为 $-1$；右极限为 $0$，所以 $\lim\limits_{x\to0}[x]$ 不存在。</x-exp>
</x-q>
<x-q type="choice" answer="A">
<x-stem>设 $\lim\limits_{u\to0}f(u)=A$，$\lim\limits_{x\to0}g(x)=0$。下列条件中，能保证 $\lim\limits_{x\to0}f(g(x))=A$ 的是</x-stem>
<x-opt>在 $0$ 的某个去心邻域中 $g(x)\ne0$</x-opt>
<x-opt>$f(0)$ 有定义</x-opt>
<x-opt>$g(0)$ 有定义</x-opt>
<x-opt>不需要任何附加条件</x-opt>
<x-exp>这正是变量代换定理（<x-ref to="thm-comp"></x-ref>）的条件。没有它可能出现定理后面的反例：$g(x)=x\sin\frac1x$ 在 $0$ 附近无穷多次取到 $0$，而 $f(0)\ne A$。另一个充分条件是 $f(0)=A$，即 $f$ 在 $0$ 处连续。</x-exp>
</x-q>
</x-quiz>

<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>

<x-prob level="基础" t="用定义证明极限">
<div><p>用 $\eps$-$\delta$ 或 $\eps$-$X$ 语言证明：</p>
<p>(1) $\lim\limits_{x\to2}(3x-1)=5$；　(2) $\lim\limits_{x\to3}\frac1x=\frac13$；　(3) $\lim\limits_{x\to\infty}\frac{x+1}{2x-1}=\frac12$。</p></div>
<x-hint>(2) 先限制 $|x-3|<1$，把 $\frac1{|x|}$ 放大成常数。(3) 化简后限制 $|x|>1$，把分母 $|2x-1|$ 缩小。</x-hint>
<x-ans>
<p>(1) $|(3x-1)-5|=3|x-2|$。任给 $\eps>0$，取 $\delta=\frac\eps3$，当 $0<|x-2|<\delta$ 时 $|(3x-1)-5|<\eps$。</p>
<p>(2) $\left|\frac1x-\frac13\right|=\frac{|x-3|}{3|x|}$。当 $|x-3|<1$ 时 $x>2$，上式 $<\frac{|x-3|}6$。任给 $\eps>0$，取 $\delta=\min\{1,6\eps\}$，当 $0<|x-3|<\delta$ 时 $\left|\frac1x-\frac13\right|<\frac\delta6\le\eps$。</p>
<p>(3) $\left|\frac{x+1}{2x-1}-\frac12\right|=\frac3{2|2x-1|}$。当 $|x|>1$ 时 $|2x-1|\ge2|x|-1>|x|$，上式 $<\frac3{2|x|}$。任给 $\eps>0$，取 $X=\max\left\{1,\frac3{2\eps}\right\}$，当 $|x|>X$ 时 $\left|\frac{x+1}{2x-1}-\frac12\right|<\frac3{2X}\le\eps$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="求 $\frac00$ 型极限">
<div><p>求下列极限：</p>
<p>(1) $\lim\limits_{x\to2}\frac{x^2-5x+6}{x^2-4}$；　(2) $\lim\limits_{x\to0}\frac{\sqrt{1+x}-\sqrt{1-x}}x$；</p>
<p>(3) $\lim\limits_{x\to-1}\frac{x^3+1}{x^2+3x+2}$；　(4) $\lim\limits_{x\to4}\frac{\sqrt{x+5}-3}{x-4}$。</p></div>
<x-check answer="-1/4" ph="分数或小数">(1)</x-check>
<x-check answer="1">(2)</x-check>
<x-check answer="3">(3)</x-check>
<x-check answer="1/6" ph="分数或小数">(4)</x-check>
<x-hint>(1)(3) 因式分解后约去公因子；(2)(4) 分子有理化。</x-hint>
<x-ans>
<p>(1) $\frac{(x-2)(x-3)}{(x-2)(x+2)}=\frac{x-3}{x+2}\to-\frac14$。</p>
<p>(2) $\frac{\sqrt{1+x}-\sqrt{1-x}}x=\frac{2x}{x\left(\sqrt{1+x}+\sqrt{1-x}\right)}=\frac2{\sqrt{1+x}+\sqrt{1-x}}\to1$。</p>
<p>(3) $x^3+1=(x+1)(x^2-x+1)$，$x^2+3x+2=(x+1)(x+2)$，所以原式 $=\frac{x^2-x+1}{x+2}\to\frac31=3$。</p>
<p>(4) $\frac{\sqrt{x+5}-3}{x-4}=\frac{(x+5)-9}{(x-4)\left(\sqrt{x+5}+3\right)}=\frac1{\sqrt{x+5}+3}\to\frac16$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="三角函数的极限">
<div><p>求下列极限：</p>
<p>(1) $\lim\limits_{x\to0}\frac{\sin5x}{\tan2x}$；　(2) $\lim\limits_{x\to0}x\cot3x$；　(3) $\lim\limits_{x\to0}\frac{1-\cos x}{x\sin x}$；　(4) $\lim\limits_{x\to\pi}\frac{\sin x}{\pi-x}$。</p></div>
<x-check answer="5/2" ph="分数或小数">(1)</x-check>
<x-check answer="1/3" ph="分数或小数">(2)</x-check>
<x-check answer="1/2" ph="分数或小数">(3)</x-check>
<x-check answer="1">(4)</x-check>
<x-hint>都化成 $\frac{\sin u}u$ 的形式；(4) 令 $u=\pi-x$。</x-hint>
<x-ans>
<p>(1) $\frac{\sin5x}{\tan2x}=\frac52\cdot\frac{\sin5x}{5x}\cdot\frac{2x}{\sin2x}\cdot\cos2x\to\frac52$。</p>
<p>(2) $x\cot3x=\frac13\cdot\frac{3x}{\sin3x}\cdot\cos3x\to\frac13$。</p>
<p>(3) $\frac{1-\cos x}{x\sin x}=\frac{1-\cos x}{x^2}\cdot\frac x{\sin x}\to\frac12$。</p>
<p>(4) 令 $u=\pi-x$，则 $x\to\pi$ 时 $u\to0$ 且 $u\ne0$，$\sin x=\sin(\pi-u)=\sin u$，所以极限为 $\lim\limits_{u\to0}\frac{\sin u}u=1$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="单侧极限与分段函数">
<div><p>(1) 设 $f(x)=\begin{cases}2x+a,&x<1,\\3x^2-2,&x>1.\end{cases}$ 求 $f(1-)$、$f(1+)$，并问 $a$ 取何值时 $\lim\limits_{x\to1}f(x)$ 存在；</p>
<p>(2) 求 $\lim\limits_{x\to0^+}\frac{|x|+x}x$ 与 $\lim\limits_{x\to0^-}\frac{|x|+x}x$。</p></div>
<x-check answer="-1">(1) 中的 $a$</x-check>
<x-check answer="2">(2) 右极限</x-check>
<x-check answer="0">(2) 左极限</x-check>
<x-hint>分别在 $x<1$ 与 $x>1$ 上用相应的表达式计算单侧极限；由 <x-ref to="thm-side"></x-ref>，极限存在当且仅当左、右极限存在且相等。</x-hint>
<x-ans>
<p>(1) $f(1-)=\lim\limits_{x\to1^-}(2x+a)=2+a$，$f(1+)=\lim\limits_{x\to1^+}(3x^2-2)=1$。极限存在当且仅当 $2+a=1$，即 $a=-1$，这时 $\lim\limits_{x\to1}f(x)=1$（与 $f$ 在 $x=1$ 处有没有定义无关）。</p>
<p>(2) $x>0$ 时 $\frac{|x|+x}x=2$，$x<0$ 时 $\frac{|x|+x}x=0$，所以右极限为 $2$，左极限为 $0$，$\lim\limits_{x\to0}\frac{|x|+x}x$ 不存在。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="极限与开方">
<p>设在 $x_0$ 的某个去心邻域中 $f(x)\ge0$，且 $\lim\limits_{x\to x_0}f(x)=A$。证明 $\lim\limits_{x\to x_0}\sqrt{f(x)}=\sqrt A$。</p>
<x-hint>先由保不等式性得 $A\ge0$，再分 $A>0$ 与 $A=0$ 两种情况。</x-hint>
<x-ans>
<p>由 <x-ref to="cor-lle"></x-ref>，$A\ge0$。若 $A>0$，则 $\left|\sqrt{f(x)}-\sqrt A\right|=\frac{|f(x)-A|}{\sqrt{f(x)}+\sqrt A}\le\frac{|f(x)-A|}{\sqrt A}$；任给 $\eps>0$，取 $\delta$ 使 $0<|x-x_0|<\delta$ 时 $|f(x)-A|<\sqrt A\,\eps$ 即可。若 $A=0$，任给 $\eps>0$，取 $\delta$ 使 $0<|x-x_0|<\delta$ 时 $0\le f(x)<\eps^2$，则 $0\le\sqrt{f(x)}<\eps$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="$x\left[\frac1x\right]$ 的极限">
<p>求 $\lim\limits_{x\to0}x\left[\frac1x\right]$ 与 $\lim\limits_{x\to+\infty}x\left[\frac1x\right]$。</p>
<x-check answer="1">$x\to0$</x-check>
<x-check answer="0">$x\to+\infty$</x-check>
<x-hint>利用 $\frac1x-1<\left[\frac1x\right]\le\frac1x$；注意 $x<0$ 时两边乘以 $x$ 要改变不等号的方向。</x-hint>
<x-ans>
<p>由 $\frac1x-1<\left[\frac1x\right]\le\frac1x$：当 $x>0$ 时，$1-x<x\left[\frac1x\right]\le1$；当 $x<0$ 时，$1\le x\left[\frac1x\right]<1-x$。两种情况下都有 $\left|x\left[\frac1x\right]-1\right|\le|x|$，所以 $\lim\limits_{x\to0}x\left[\frac1x\right]=1$。当 $x>1$ 时 $0<\frac1x<1$，$\left[\frac1x\right]=0$，所以 $\lim\limits_{x\to+\infty}x\left[\frac1x\right]=0$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="确定待定常数">
<div><p>(1) 已知 $\lim\limits_{x\to1}\frac{x^2+ax+b}{x-1}=3$，求常数 $a$、$b$；</p>
<p>(2) 已知 $\lim\limits_{x\to+\infty}\left(\sqrt{x^2-x+1}-ax-b\right)=0$，求常数 $a$、$b$。</p></div>
<x-check answer="1">(1) 中的 $a$</x-check>
<x-check answer="-2">(1) 中的 $b$</x-check>
<x-check answer="1">(2) 中的 $a$</x-check>
<x-check answer="-1/2" ph="分数或小数">(2) 中的 $b$</x-check>
<x-hint>(1) 分母趋于 $0$ 而商的极限存在，所以分子也必须趋于 $0$。(2) 先把式子除以 $x$ 求出 $a$，再求 $b=\lim\left(\sqrt{x^2-x+1}-ax\right)$。</x-hint>
<x-ans>
<p>(1) $x^2+ax+b=\frac{x^2+ax+b}{x-1}\cdot(x-1)\to3\times0=0$，而 $x^2+ax+b\to1+a+b$，所以 $b=-1-a$。于是 $x^2+ax+b=x^2-1+a(x-1)=(x-1)(x+1+a)$，原极限 $=\lim\limits_{x\to1}(x+1+a)=2+a=3$，得 $a=1$，$b=-2$。</p>
<p>(2) 由条件，$\frac{\sqrt{x^2-x+1}-ax-b}x\to0$，即 $\sqrt{1-\frac1x+\frac1{x^2}}-a-\frac bx\to0$，得 $a=1$。于是</p>
$$b=\lim_{x\to+\infty}\left(\sqrt{x^2-x+1}-x\right)=\lim_{x\to+\infty}\frac{-x+1}{\sqrt{x^2-x+1}+x}=\lim_{x\to+\infty}\frac{-1+\frac1x}{\sqrt{1-\frac1x+\frac1{x^2}}+1}=-\frac12.$$
</x-ans>
</x-prob>

<x-prob level="提高" t="$1^\infty$ 型极限">
<div><p>求下列极限：</p>
<p>(1) $\lim\limits_{x\to\infty}\left(\frac{x+2}{x-1}\right)^x$；　(2) $\lim\limits_{x\to0}(1-x)^{\frac1x}$；　(3) $\lim\limits_{x\to0}(1+2x)^{\frac3x}$。</p></div>
<x-check answer="e^3" ph="可输入表达式，如 e^2">(1)</x-check>
<x-check answer="e^(-1)" ph="可输入表达式，如 e^2">(2)</x-check>
<x-check answer="e^6" ph="可输入表达式，如 e^2">(3)</x-check>
<x-hint>化成 $\left(1+\frac1u\right)^u$ 或 $(1+u)^{\frac1u}$ 的整数次幂、乘积或商。</x-hint>
<x-ans>
<p>(1) $\frac{x+2}{x-1}=\frac{1+\frac2x}{1-\frac1x}$。由 <x-ref to="ex-ek"></x-ref> 的方法，$\left(1+\frac2x\right)^x\to e^2$，$\left(1-\frac1x\right)^x\to e^{-1}$，所以极限为 $\frac{e^2}{e^{-1}}=e^3\approx20.09$。</p>
<p>(2) 令 $u=-x$，$(1-x)^{\frac1x}=\left[(1+u)^{\frac1u}\right]^{-1}\to e^{-1}$。</p>
<p>(3) 令 $u=2x$，$(1+2x)^{\frac3x}=\left[(1+u)^{\frac1u}\right]^6\to e^6$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="用 Heine 定理证明极限不存在">
<div><p>(1) 证明 $\lim\limits_{x\to+\infty}\sin x$ 不存在；</p>
<p>(2) 证明：$f(x)=x\sin x$ 在任何区间 $(X,+\infty)$ 上都无界，但 $x\to+\infty$ 时 $f(x)$ 不趋于 $\infty$。</p></div>
<x-hint>(2) 分别考察 $x_n=2n\pi+\frac\pi2$ 与 $y_n=n\pi$。</x-hint>
<x-ans>
<p>(1) 取 $x_n=n\pi\to+\infty$，$y_n=2n\pi+\frac\pi2\to+\infty$，则 $\sin x_n=0\to0$，$\sin y_n=1\to1$，由 Heine 定理（$x\to+\infty$ 的形式），极限不存在。</p>
<p>(2) 对任意 $X>0$ 与 $G>0$，取 $n$ 充分大，使 $x_n=2n\pi+\frac\pi2>\max\{X,G\}$，则 $f(x_n)=x_n>G$，所以 $f$ 在 $(X,+\infty)$ 上无界。但 $y_n=n\pi\to+\infty$ 时 $f(y_n)=0$，不满足 $|f(y_n)|>G$，所以 $f(x)\not\to\infty$。可见“无界”比“趋于无穷大”弱得多。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="单调函数的极限">
<p>设 $f(x)$ 在 $(a,+\infty)$ 上单调增加，且 $\lim\limits_{n\to\infty}f(n)=A$。证明 $\lim\limits_{x\to+\infty}f(x)=A$。如果去掉“单调”的条件，结论还成立吗？</p>
<x-hint>先说明对一切正整数 $n>a$ 有 $f(n)\le A$；再把 $x$ 夹在两个整数之间。</x-hint>
<x-ans>
<p>$\{f(n)\}$（$n>a$）是单调增加的收敛数列，所以 $f(n)\le A$ 对一切 $n>a$ 成立（若某个 $f(n_0)>A$，则 $n\ge n_0$ 时 $f(n)\ge f(n_0)$，取极限得 $A\ge f(n_0)>A$，矛盾）。任给 $\eps>0$，存在正整数 $N>a$ 使 $f(N)>A-\eps$。当 $x>N$ 时，</p>
$$A-\eps<f(N)\le f(x)\le f([x]+1)\le A,$$
<p>所以 $\lim\limits_{x\to+\infty}f(x)=A$。去掉单调性，结论不成立：$f(x)=\sin\pi x$ 满足 $f(n)=0\to0$，但 $x\to+\infty$ 时 $f(x)$ 没有极限。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="周期函数的极限">
<p>设 $f(x)$ 是 $\R$ 上以 $T>0$ 为周期的函数，且 $\lim\limits_{x\to+\infty}f(x)=A$。证明 $f(x)\equiv A$。由此可知，非常数的周期函数（如 $\sin x$）在 $x\to+\infty$ 时没有极限。</p>
<x-hint>对固定的 $x$，考察数列 $x_n=x+nT$。</x-hint>
<x-ans>
<p>任意固定 $x\in\R$，令 $x_n=x+nT$，则 $x_n\to+\infty$。由 Heine 定理，$f(x_n)\to A$。但 $f(x_n)=f(x)$ 对一切 $n$ 成立，所以 $f(x)=A$。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="Heine 定理的加强形式">
<p>设 $f(x)$ 在 $\mathring O(x_0,\rho)$ 中有定义，并且对于任意满足 $x_n\in\mathring O(x_0,\rho)$、$x_n\to x_0$ 的数列 $\{x_n\}$，数列 $\{f(x_n)\}$ 都收敛（不预先要求极限相同）。证明 $\lim\limits_{x\to x_0}f(x)$ 存在。</p>
<x-hint>只需证明这些数列 $\{f(x_n)\}$ 的极限都相同，然后用 Heine 定理。仿照 <x-ref to="thm-fcauchy"></x-ref> 证明中“交错排列”的技巧。</x-hint>
<x-ans>
<p>设 $\{x_n\}$、$\{y_n\}$ 是两个满足条件的数列，$f(x_n)\to A$，$f(y_n)\to B$。令 $z_{2n-1}=x_n$，$z_{2n}=y_n$，则 $\{z_n\}$ 也满足条件，所以 $\{f(z_n)\}$ 收敛。它的两个子列 $\{f(x_n)\}$、$\{f(y_n)\}$ 的极限都等于 $\{f(z_n)\}$ 的极限（<x-ref to="2-4/thm-sub"></x-ref>），所以 $A=B$。于是所有这样的数列 $\{f(x_n)\}$ 都收敛于同一个数 $A$，由 Heine 定理，$\lim\limits_{x\to x_0}f(x)=A$。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="函数方程与极限">
<p>设 $f(x)$ 在 $(0,+\infty)$ 上有定义，满足 $f(x^2)=f(x)$，并且 $\lim\limits_{x\to1}f(x)=L$ 存在。证明 $f(x)$ 在 $(0,1)\cup(1,+\infty)$ 上恒等于 $L$。$f(1)$ 一定等于 $L$ 吗？</p>
<x-hint>反复使用条件得 $f(x)=f\left(x^{1/2^n}\right)$，再利用 $\sqrt[m]x\to1$（<x-ref to="2-2/ex-root"></x-ref>）。</x-hint>
<x-ans>
<p>由 $f(t)=f\left(\left(\sqrt t\right)^2\right)=f\left(\sqrt t\right)$，反复使用得 $f(x)=f\left(x^{1/2^n}\right)$，$n=1,2,\cdots$。设 $x>0$，$x\ne1$，令 $x_n=x^{1/2^n}$，它是数列 $\left\{\sqrt[m]x\right\}$ 的子列，所以 $x_n\to1$，且 $x_n\ne1$。由 Heine 定理，$f(x_n)\to L$；而 $f(x_n)=f(x)$，所以 $f(x)=L$。$f(1)$ 不一定等于 $L$：令 $f(1)=0$，$f(x)=1\ (x\ne1)$，它满足 $f(x^2)=f(x)$（当 $x>0$ 时 $x^2=1\iff x=1$），且 $\lim\limits_{x\to1}f(x)=1\ne f(1)$。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="自由落体的瞬时速度">
<p>自由落体下落的距离为 $s(t)=\frac12gt^2$，取 $g=9.8\ \mathrm{m/s^2}$。(1) 求 $[2,2.1]$（单位：秒）内的平均速度；(2) 求 $t=2$ 秒时的瞬时速度 $\lim\limits_{h\to0}\frac{s(2+h)-s(2)}h$。</p>
<x-check answer="20.09" tol="0.01" unit="m/s">(1)</x-check>
<x-check answer="19.6" tol="0.01" unit="m/s">(2)</x-check>
<x-hint>$s(2+h)-s(2)=4.9\left[(2+h)^2-4\right]=4.9\left(4h+h^2\right)$。</x-hint>
<x-ans>
<p>$\frac{s(2+h)-s(2)}h=4.9(4+h)=19.6+4.9h$（$h\ne0$）。(1) $h=0.1$ 时平均速度为 $19.6+0.49=20.09\ \mathrm{m/s}$。(2) 令 $h\to0$，瞬时速度为 $19.6\ \mathrm{m/s}$，即 $gt_0$。</p>
<x-remark>“平均变化率的极限”就是下一章要研究的导数：$s'(t_0)=\lim\limits_{h\to0}\frac{s(t_0+h)-s(t_0)}h$。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="酶促反应的饱和浓度">
<p>某酶促反应满足 Michaelis–Menten 方程 $v(S)=\frac{V_{\max}S}{K_m+S}$，其中 $V_{\max}=100\ \mu\mathrm{mol/(L\cdot min)}$，$K_m=2\ \mathrm{mmol/L}$。(1) 求 $\lim\limits_{S\to+\infty}v(S)$；(2) 底物浓度 $S$ 至少为多少时，反应速度不低于 $0.95V_{\max}$？(3) 求 $\lim\limits_{S\to0^+}\frac{v(S)}S$（单位换算成 $\mathrm{min^{-1}}$，$1\ \mathrm{mmol/L}=1000\ \mu\mathrm{mol/L}$）。</p>
<x-check answer="100" unit="μmol/(L·min)">(1)</x-check>
<x-check answer="38" unit="mmol/L">(2)</x-check>
<x-check answer="0.05" unit="min⁻¹">(3)</x-check>
<x-hint>(2) 解不等式 $\frac S{K_m+S}\ge0.95$。(3) $\frac{v(S)}S=\frac{V_{\max}}{K_m+S}$。</x-hint>
<x-ans>
<p>(1) $v(S)=\frac{V_{\max}}{1+K_m/S}\to V_{\max}=100\ \mu\mathrm{mol/(L\cdot min)}$。</p>
<p>(2) $\frac S{K_m+S}\ge0.95\iff0.05S\ge0.95K_m\iff S\ge19K_m=38\ \mathrm{mmol/L}$。</p>
<p>(3) $\frac{v(S)}S=\frac{V_{\max}}{K_m+S}\to\frac{V_{\max}}{K_m}=\frac{100\ \mu\mathrm{mol/(L\cdot min)}}{2000\ \mu\mathrm{mol/L}}=0.05\ \mathrm{min^{-1}}$。底物浓度很低时 $v\approx0.05S$，反应近似为一级反应。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="相对论的速度合成">
<p>狭义相对论中，速度 $u$ 与 $v$（$0<u,v<c$，$c$ 为光速）的合成速度为 $w=\frac{u+v}{1+\frac{uv}{c^2}}$。(1) 固定 $u$，求 $\lim\limits_{v\to c^-}w$（以 $c$ 为单位）；(2) 若 $u=v=0.9c$，求 $w$（以 $c$ 为单位）；(3) 固定 $u$、$v$，求 $\lim\limits_{c\to+\infty}w$，并说明它的物理意义。</p>
<x-check answer="1" unit="c">(1)</x-check>
<x-check answer="0.9945" tol="0.0005" unit="c">(2)</x-check>
<x-hint>(1) 直接代入；还可以证明 $c-w=\frac{c\left(1-\frac uc\right)\left(1-\frac vc\right)}{1+\frac{uv}{c^2}}>0$。</x-hint>
<x-ans>
<p>(1) $w\to\frac{u+c}{1+\frac uc}=\frac{c(u+c)}{c+u}=c$。又 $c-w=\frac{c\left(1-\frac uc\right)\left(1-\frac vc\right)}{1+\frac{uv}{c^2}}>0$，所以合成速度总小于光速，但可以无限接近光速。</p>
<p>(2) $w=\frac{1.8c}{1+0.81}=\frac{1.8}{1.81}c\approx0.9945c$，而不是经典力学的 $1.8c$。</p>
<p>(3) $\lim\limits_{c\to+\infty}w=u+v$：当速度远小于光速（相当于 $c$“很大”）时，相对论公式退化为经典的速度相加。</p>
</x-ans>
</x-prob>
`);
