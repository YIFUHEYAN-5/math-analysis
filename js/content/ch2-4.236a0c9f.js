/* §2.4 收敛准则 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("2-4", String.raw`
<x-goal>
<ul>
<li>掌握单调有界数列收敛定理，会用“有界性 + 单调性”研究递推数列；</li>
<li>理解 $\pi$ 与 $e$ 是怎样作为数列的极限严格定义出来的，掌握 $e$ 的级数表示与不等式 $\frac1{n+1}<\ln\left(1+\frac1n\right)<\frac1n$；</li>
<li>理解闭区间套定理、Bolzano–Weierstrass 定理、Cauchy 收敛原理的内容与证明思路；</li>
<li>会用子列证明数列发散，了解极限点的概念；</li>
<li>理解实数系基本定理之间的等价关系，以及它们在有理数系中为什么不成立。</li>
</ul>
</x-goal>
<p>用 §2.2 的定义证明收敛，必须先知道（或猜出）极限 $a$，再验证 $|x_n-a|<\eps$。可是很多时候极限事先无从知道，甚至极限本身就是要定义的新的数，例如 $\pi$ 与 $e$。本节的几个<em>收敛准则</em>只根据数列自身的性质判断它是否收敛，不需要预先知道极限。它们都是实数系连续性的不同表现形式，在有理数系中全都不成立。</p>

<h2 id="mono">单调有界数列收敛定理</h2>
<x-def t="单调数列" id="def-monoseq">
<p>若数列 $\{x_n\}$ 满足 $x_n\le x_{n+1}$（$n=1,2,\cdots$），则称它<em>单调增加</em>；若 $x_n<x_{n+1}$，则称它<em>严格单调增加</em>。类似地定义（严格）单调减少。单调增加与单调减少的数列统称为<em>单调数列</em>。</p>
</x-def>
<x-thm t="单调有界数列收敛定理" id="thm-mono">
<p>单调增加且有上界的数列必定收敛，其极限就是它的上确界；单调减少且有下界的数列必定收敛，其极限就是它的下确界。</p>
<x-proof>
<p>设 $\{x_n\}$ 单调增加且有上界。由确界存在定理（<x-ref to="2-1/thm-sup"></x-ref>），数集 $\{x_n\mid n\in\Np\}$ 有上确界，记为 $a$。任给 $\eps>0$，$a-\eps$ 不是上界，所以存在 $N$ 使 $x_N>a-\eps$。于是当 $n>N$ 时，</p>
$$a-\eps<x_N\le x_n\le a<a+\eps,$$
<p>即 $|x_n-a|<\eps$，所以 $\lim\limits_{n\to\infty}x_n=a$。单调减少的情形，对 $\{-x_n\}$ 用已证的结论即可。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-note>
<ul>
<li>单调增加而无上界的数列一定是正无穷大量：任给 $G>0$，有某项 $x_N>G$，此后各项都不小于 $x_N$。所以<em>单调数列总有极限</em>，要么是有限数，要么是 $+\infty$ 或 $-\infty$。</li>
<li>改变有限多项不影响收敛性，所以只需数列“从某一项起”单调。</li>
<li>单调有界是收敛的<em>充分</em>条件，不是必要条件：$\frac{(-1)^n}n$ 收敛于 $0$，但不单调。</li>
</ul>
</x-note>
<x-warn>
<p>这个定理在有理数系 $\Q$ 中不成立。$\sqrt2$ 的不足近似值 $1,\ 1.4,\ 1.41,\ 1.414,\ 1.4142,\cdots$ 都是有理数，构成单调增加、以 $2$ 为上界的数列，但在 $\Q$ 中找不到它的极限——它“想要”收敛到的 $\sqrt2$ 不是有理数。定理的证明用到了确界存在定理，而 $\Q$ 恰恰缺少这一性质（参看<x-ref to="2-1/ex-gap"></x-ref>）。</p>
</x-warn>

<x-ex t="嵌套根式" id="ex-nest">
<p>设 $x_1=\sqrt2$，$x_{n+1}=\sqrt{2+x_n}$（$n=1,2,\cdots$），即 $x_n=\underbrace{\sqrt{2+\sqrt{2+\cdots+\sqrt2}}}_{n\text{ 重根号}}$。证明 $\{x_n\}$ 收敛，并求其极限。</p>
<x-analysis><p>先猜：若极限 $L$ 存在，由 $x_{n+1}^2=2+x_n$ 得 $L^2=2+L$，所以 $L=2$（负根 $-1$ 舍去）。于是猜想 $x_n<2$ 且 $\{x_n\}$ 单调增加。前几项 $1.414,\ 1.848,\ 1.962,\ 1.990$ 也支持这一猜想。</p></x-analysis>
<x-sol>
<p><b>有界性。</b>$x_1=\sqrt2<2$；若 $x_n<2$，则 $x_{n+1}=\sqrt{2+x_n}<\sqrt4=2$。由数学归纳法，$0<x_n<2$ 对一切 $n$ 成立。</p>
<p><b>单调性。</b>$x_{n+1}^2-x_n^2=2+x_n-x_n^2=(2-x_n)(1+x_n)>0$，而 $x_n,x_{n+1}>0$，所以 $x_{n+1}>x_n$。</p>
<p><b>求极限。</b>由单调有界数列收敛定理，$\{x_n\}$ 收敛，设其极限为 $L$，则 $L\ge x_1>0$。在 $x_{n+1}^2=2+x_n$ 两边令 $n\to\infty$，得 $L^2=2+L$，解得 $L=2$ 或 $L=-1$，因此 $\lim\limits_{n\to\infty}x_n=2$。</p>
</x-sol>
<x-remark>利用半角公式 $2+2\cos\theta=4\cos^2\frac\theta2$，可以用归纳法验证 $x_n=2\cos\frac\pi{2^{n+1}}$，于是 $2-x_n=4\sin^2\frac\pi{2^{n+2}}$，每一步误差大约缩小为原来的 $\frac14$。这个数列还与 $\pi$ 有关：Viète 在 1593 年发现 $\frac2\pi=\frac{x_1}2\cdot\frac{x_2}2\cdot\frac{x_3}2\cdots$，这是数学史上最早的无穷乘积之一。</x-remark>
</x-ex>
<x-warn>
<p><em>必须先证明极限存在，才能对递推式取极限。</em>例如 $x_1=1$，$x_{n+1}=2x_n+1$：若贸然设极限为 $L$，会得到 $L=2L+1$，$L=-1$——可是各项都是正数，实际上 $x_n=2^n-1\to+\infty$。又如 $x_1=0$，$x_{n+1}=1-x_n$：方程 $L=1-L$ 有解 $L=\frac12$，但数列是 $0,1,0,1,\cdots$，根本不收敛。方程 $L=f(L)$ 的解只是“候选极限”。</p>
</x-warn>
<x-viz type="cobweb" start="0" t="蛛网图：递推数列 $x_{n+1}=f(x_n)$ 的几何意义">从 $x_1$ 出发，竖直走到曲线 $y=f(x)$，再水平走到直线 $y=x$，就得到 $x_2$；如此反复，折线逐渐逼近两条线的交点，即方程 $L=f(L)$ 的解。可以拖动起点、换用其他递推式：有的单调逼近，有的来回摆动，有的发散。</x-viz>
<x-tip t="研究递推数列 $x_{n+1}=f(x_n)$ 的一般步骤">
<ul>
<li><b>猜</b>：解方程 $L=f(L)$ 得到候选极限，并算几项看看数列的走向；</li>
<li><b>界</b>：用数学归纳法证明有界，常常是证明 $x_n<L$ 或 $x_n>L$；</li>
<li><b>调</b>：判断 $x_{n+1}-x_n$ 的符号（或比较 $\frac{x_{n+1}}{x_n}$ 与 $1$）。若 $f$ 单调增加，则 $x_{n+1}-x_n=f(x_n)-f(x_{n-1})$ 与 $x_n-x_{n-1}$ 同号，数列必定单调，方向由 $x_2$ 与 $x_1$ 的大小决定；</li>
<li><b>解</b>：由单调有界定理得极限存在，再对递推式取极限，解方程，并利用有界性、符号等排除不合理的根。若 $f$ 单调减少，数列一般不单调，可以分别研究奇数项与偶数项（见后面的<x-ref to="ex-cf"></x-ref>）。</li>
</ul>
</x-tip>

<x-ex t="Heron 开方法" id="ex-heron">
<p>设 $a>0$，任取 $x_1>0$，令 $x_{n+1}=\frac12\left(x_n+\frac a{x_n}\right)$。证明 $\lim\limits_{n\to\infty}x_n=\sqrt a$，并估计误差。</p>
<x-analysis><p>若 $x_n$ 是 $\sqrt a$ 的一个近似值，则 $x_n$ 与 $\frac a{x_n}$ 一个偏大、一个偏小（两者之积恰为 $a$），取它们的平均值应当更准确。由平均值不等式，$x_{n+1}$ 总不小于 $\sqrt a$，所以从第二项起数列应当单调减少。</p></x-analysis>
<x-sol>
<p>由归纳法，$x_n>0$。由平均值不等式（<x-ref to="1-2/thm-amgm"></x-ref>），$x_{n+1}\ge\sqrt{x_n\cdot\frac a{x_n}}=\sqrt a$，所以从第二项起 $x_n\ge\sqrt a$。于是当 $n\ge2$ 时</p>
$$x_{n+1}-x_n=\frac{a-x_n^2}{2x_n}\le0,$$
<p>即 $\{x_n\}$ 从第二项起单调减少，且有下界 $\sqrt a$，所以收敛。设极限为 $L$，则 $L\ge\sqrt a>0$。在 $2x_nx_{n+1}=x_n^2+a$ 两边取极限得 $2L^2=L^2+a$，所以 $L=\sqrt a$。</p>
<p><b>误差估计。</b>直接计算可得</p>
$$x_{n+1}-\sqrt a=\frac{x_n^2-2\sqrt a\,x_n+a}{2x_n}=\frac{\left(x_n-\sqrt a\right)^2}{2x_n}\le\frac{\left(x_n-\sqrt a\right)^2}{2\sqrt a}\qquad(n\ge2),$$
<p>新的误差与旧误差的<em>平方</em>成正比。以 $a=10$，$x_1=3$ 为例：</p>
<table class="center">
<tr><th>$n$</th><th>$x_n$</th><th>$x_n-\sqrt{10}$</th></tr>
<tr><td>$1$</td><td>$3$</td><td>$-1.6\times10^{-1}$</td></tr>
<tr><td>$2$</td><td>$\frac{19}6\approx3.1666667$</td><td>$4.4\times10^{-3}$</td></tr>
<tr><td>$3$</td><td>$\frac{721}{228}\approx3.1622807$</td><td>$3.0\times10^{-6}$</td></tr>
<tr><td>$4$</td><td>$3.16227766017\cdots$</td><td>$1.5\times10^{-12}$</td></tr>
</table>
</x-sol>
<x-remark>误差的指数大约每步翻一番，也就是有效数字的位数大约每步加倍，这称为<em>二阶收敛</em>。相比之下，<x-ref to="ex-nest"></x-ref>中的误差每步只缩小为约 $\frac14$，是一阶（线性）收敛。Heron 开方法是第五章将要学习的 Newton 迭代法用于方程 $x^2-a=0$ 的特例，计算机的数学函数库中也常用这类迭代计算平方根。</x-remark>
</x-ex>
<x-hist>
<p>这种开方法非常古老。耶鲁大学收藏的古巴比伦泥板 YBC 7289（约公元前 1800—前 1600 年）上刻有 $\sqrt2$ 的六十进制近似值 $1;24,51,10$，即</p>
$$1+\frac{24}{60}+\frac{51}{60^2}+\frac{10}{60^3}=1.41421296\cdots,$$
<p>误差仅约 $6\times10^{-7}$，人们推测它就是用类似的平均法得到的。公元 1 世纪，亚历山大的 Heron 在《度量论》中明确记载了这一方法。</p>
</x-hist>

<h2 id="pie">π 和 e</h2>
<h3>圆周率 π</h3>
<p>中学里说“圆周长与直径之比是常数 $\pi$”，但没有说清楚曲线的长度是什么，也没有说明这个比值为什么存在。用数列极限可以把它说清楚。在单位圆（半径为 $1$）中，设内接正 $n$ 边形的边长为 $a_n$，弦心距（圆心到边的距离）为 $c_n$，则 $\frac{a_n^2}4+c_n^2=1$。把内接正 $n$ 边形以圆心为中心放大到 $\frac1{c_n}$ 倍，就得到外切正 $n$ 边形。记内接、外切正 $n$ 边形的半周长分别为</p>
$$p_n=\frac{na_n}2,\qquad q_n=\frac{p_n}{c_n}.$$
<x-prop t="边数倍增公式" id="prop-double">
<p>$c_{2n}=\sqrt{\frac{1+c_n}2}$，$a_{2n}=\sqrt{2(1-c_n)}$，并且</p>
$$p_{2n}=\frac{p_n}{c_{2n}},\qquad q_{2n}=\frac{p_{2n}}{c_{2n}}=\frac{2c_n}{1+c_n}\,q_n.$$
<x-proof>
<p>设 $AB$ 是内接正 $n$ 边形的一条边，$H$ 为 $AB$ 的中点，$M$ 为弧 $AB$ 的中点，则圆心 $O$ 与 $H,M$ 共线，$OH=c_n$，$HM=1-c_n$，而 $AM$ 正是内接正 $2n$ 边形的边。由勾股定理，</p>
$$a_{2n}^2=AH^2+HM^2=\left(1-c_n^2\right)+(1-c_n)^2=2(1-c_n),$$
<p>于是 $c_{2n}^2=1-\frac{a_{2n}^2}4=\frac{1+c_n}2$。又</p>
$$\left(\frac{p_{2n}}{p_n}\right)^2=\left(\frac{2a_{2n}}{a_n}\right)^2=\frac{8(1-c_n)}{4\left(1-c_n^2\right)}=\frac2{1+c_n}=\frac1{c_{2n}^2},$$
<p>所以 $p_{2n}=\frac{p_n}{c_{2n}}$。最后 $q_{2n}=\frac{p_{2n}}{c_{2n}}=\frac{p_n}{c_{2n}^2}=\frac{2p_n}{1+c_n}=\frac{2c_n}{1+c_n}\,q_n$。<span class="qed">∎</span></p>
</x-proof>
</x-prop>
<x-ex t="圆周率的存在性" id="ex-pi">
<p>从正六边形出发（$n=6\cdot2^k$，$k=0,1,2,\cdots$），证明数列 $\{p_n\}$ 与 $\{q_n\}$ 收敛于同一个极限。</p>
<x-sol l="证明">
<p>正六边形的边长等于半径，所以 $a_6=1$，$c_6=\frac{\sqrt3}2$，$p_6=3$，$q_6=2\sqrt3$。由于 $0<c_n<1$，由倍增公式得</p>
$$p_{2n}>p_n,\qquad q_{2n}<q_n,\qquad p_n=c_nq_n<q_n,$$
<p>于是 $3=p_6<p_{12}<p_{24}<\cdots<q_{24}<q_{12}<q_6=2\sqrt3$。$\{p_n\}$ 单调增加有上界，$\{q_n\}$ 单调减少有下界，所以都收敛。再证两者之差趋于 $0$：由 $1-c_{2n}^2=\frac{1-c_n}2$ 得</p>
$$1-c_{2n}=\frac{1-c_n}{2\left(1+c_{2n}\right)}<\frac{1-c_n}2,$$
<p>所以 $0<1-c_{6\cdot2^k}\le\frac{1-c_6}{2^k}\to0$，从而 $0<q_n-p_n=q_n(1-c_n)\le2\sqrt3\,(1-c_n)\to0$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这个公共的极限就定义为 $\pi$（单位圆的半周长），并且对每个 $n$ 都有 $p_n<\pi<q_n$。证明中只用到勾股定理与单调有界定理，没有用到“曲线长度”的直观概念。</x-remark>
</x-ex>
<x-hist>
<p>Archimedes（约公元前 250 年）正是这样从正六边形算到正 $96$ 边形：$p_{96}\approx3.14103$，$q_{96}\approx3.14271$，由此得到 $3\frac{10}{71}<\pi<3\frac17$。我国魏晋时期的刘徽（公元 263 年）创立“割圆术”，算到正 $192$ 边形得 $\pi\approx3.14$，后来又算到正 $3072$ 边形得 $\pi\approx3.1416$；南北朝的祖冲之（5 世纪）得到 $3.1415926<\pi<3.1415927$，并给出约率 $\frac{22}7$ 与密率 $\frac{355}{113}$，这一纪录保持了近千年。</p>
</x-hist>
<x-viz type="pi" t="用正多边形逼近圆周率">拖动滑块，边数每次加倍，内接与外切正多边形把圆夹得越来越紧。表格最后一列用数学上等价、但数值上“不稳定”的公式计算，红色表示它与稳定公式算出的 $p_n$ 已经不一致，而且误差随倍增次数迅速放大。</x-viz>
<x-warn>
<p><em>数学上相等的公式，数值上可能大不一样。</em>倍增公式也可以写成 $a_{2n}=\sqrt{2-\sqrt{4-a_n^2}}$。当 $a_n$ 很小时，$\sqrt{4-a_n^2}$ 非常接近 $2$，两个几乎相等的数相减会丢失大量有效数字。在双精度浮点运算下，倍增十几次后这个公式就出现明显误差，倍增 $24$ 次时给出 $3.18$，倍增 $28$ 次后干脆得到 $0$。改写成 $a_{2n}=\frac{a_n}{\sqrt{2+\sqrt{4-a_n^2}}}$（分子有理化）就避免了相减，可以一直算到机器精度。</p>
</x-warn>

<h3>自然对数的底 e</h3>
<x-thm t="$e$ 的存在性" id="thm-e">
<p>数列 $e_n=\left(1+\frac1n\right)^n$ 严格单调增加，且 $2\le e_n<3$，因而收敛。它的极限记为 $e$：</p>
$$e=\lim_{n\to\infty}\left(1+\frac1n\right)^n.$$
<x-proof>
<p>由二项式定理，</p>
$$e_n=\sum_{k=0}^n\binom nk\frac1{n^k}=1+1+\sum_{k=2}^n\frac1{k!}\left(1-\frac1n\right)\left(1-\frac2n\right)\cdots\left(1-\frac{k-1}n\right).\tag{*}$$
<p><b>单调性。</b>把 $n$ 换成 $n+1$ 时，$(*)$ 中每个因子 $1-\frac jn$ 都变大，而且和式还多出一个正项，所以 $e_n<e_{n+1}$。（<x-ref to="1-2/ex-e-mono"></x-ref>用平均值不等式给出了另一个证明。）</p>
<p><b>有界性。</b>$(*)$ 中每个括号都小于 $1$，又 $k!\ge2^{k-1}$，所以</p>
$$e_n\le2+\sum_{k=2}^n\frac1{k!}\le2+\sum_{k=2}^n\frac1{2^{k-1}}=3-\frac1{2^{n-1}}<3.$$
<p>由单调有界数列收敛定理，$\{e_n\}$ 收敛。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-note>
<p>$e=2.718281828459045\cdots$。以 $e$ 为底的对数称为<em>自然对数</em>，记为 $\ln x$；记号 $e$ 是 Euler 引入的。由单调有界定理，$e$ 是数集 $\left\{\left(1+\frac1n\right)^n\right\}$ 的上确界，又因为数列严格增加，所以 $\left(1+\frac1n\right)^n<e$ 对一切 $n$ 成立。</p>
</x-note>
<x-thm t="$e$ 的级数表示" id="thm-eseries">
<p>记 $S_n=\sum\limits_{k=0}^n\frac1{k!}=1+1+\frac1{2!}+\cdots+\frac1{n!}$，则 $\lim\limits_{n\to\infty}S_n=e$，并且</p>
$$0<e-S_n<\frac1{n!\cdot n}\qquad(n=1,2,\cdots).$$
<x-proof>
<p>$\{S_n\}$ 严格单调增加，且与<x-ref to="thm-e"></x-ref>的证明一样可得 $S_n<3$，所以 $\{S_n\}$ 收敛，设其极限为 $S$。由<x-ref to="thm-e"></x-ref>证明中的 $(*)$ 式，$e_n\le S_n$，令 $n\to\infty$ 得 $e\le S$。</p>
<p>另一方面，固定正整数 $m$。当 $n>m$ 时，在 $(*)$ 式中只保留前 $m+1$ 项，得</p>
$$e_n>2+\sum_{k=2}^m\frac1{k!}\left(1-\frac1n\right)\cdots\left(1-\frac{k-1}n\right).$$
<p>右边是固定的有限多项之和，令 $n\to\infty$，每一项趋于 $\frac1{k!}$，所以 $e\ge S_m$。再令 $m\to\infty$ 得 $e\ge S$。故 $S=e$。</p>
<p><b>误差。</b>$e-S_n>0$ 是因为 $\{S_n\}$ 严格增加。对 $m>n$，</p>
$$S_m-S_n=\frac1{(n+1)!}\left(1+\frac1{n+2}+\frac1{(n+2)(n+3)}+\cdots\right)\le\frac1{(n+1)!}\left(1+\frac1{n+2}+\frac1{(n+2)^2}+\cdots+\frac1{(n+2)^{m-n-1}}\right)<\frac{n+2}{(n+1)\cdot(n+1)!}.$$
<p>令 $m\to\infty$ 得 $e-S_n\le\frac{n+2}{(n+1)\cdot(n+1)!}$，而 $\frac{n+2}{n+1}<\frac{n+1}n$，所以 $e-S_n<\frac{n+1}{n\cdot(n+1)!}=\frac1{n!\cdot n}$。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<p>两种表示的收敛速度相差悬殊：</p>
<table class="center">
<tr><th>$n$</th><th>$\left(1+\frac1n\right)^n$</th><th>误差</th><th>$n$</th><th>$S_n=\sum\limits_{k=0}^n\frac1{k!}$</th><th>误差</th></tr>
<tr><td>$10$</td><td>$2.5937425$</td><td>$1.2\times10^{-1}$</td><td>$5$</td><td>$2.7166667$</td><td>$1.6\times10^{-3}$</td></tr>
<tr><td>$100$</td><td>$2.7048138$</td><td>$1.3\times10^{-2}$</td><td>$8$</td><td>$2.7182788$</td><td>$3.1\times10^{-6}$</td></tr>
<tr><td>$1000$</td><td>$2.7169239$</td><td>$1.4\times10^{-3}$</td><td>$10$</td><td>$2.7182818011$</td><td>$2.7\times10^{-8}$</td></tr>
<tr><td>$10000$</td><td>$2.7181459$</td><td>$1.4\times10^{-4}$</td><td>$12$</td><td>$2.7182818283$</td><td>$1.7\times10^{-10}$</td></tr>
</table>
<p>$\left(1+\frac1n\right)^n$ 的误差约为 $\frac e{2n}$，$n$ 增大 $10$ 倍只多得到一位有效数字；而 $S_n$ 只取 $13$ 项（即 $S_{12}$），误差就不到 $2\times10^{-10}$。计算 $e$ 应当用级数。</p>
<x-thm t="$e$ 是无理数" id="thm-eirr">
<p>$e$ 是无理数。</p>
<x-proof>
<p>假设 $e=\frac pq$，$p,q$ 为正整数。由于 $2<e<3$，$e$ 不是整数，所以 $q\ge2$。在<x-ref to="thm-eseries"></x-ref>的误差估计中取 $n=q$，再乘以 $q!$，得</p>
$$0<q!\,e-q!\,S_q<\frac1q\le\frac12.$$
<p>但 $q!\,e=(q-1)!\,p$ 是整数，$q!\,S_q=\sum\limits_{k=0}^q\frac{q!}{k!}$ 也是整数，它们的差是介于 $0$ 与 $\frac12$ 之间的整数，矛盾。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-note>
<p>这个简洁的证明属于 Fourier（1815 年）。更进一步，Hermite 在 1873 年证明了 $e$ 是<em>超越数</em>（不是任何整系数多项式方程的根），Lindemann 在 1882 年证明了 $\pi$ 也是超越数，从而彻底否定了古希腊“化圆为方”尺规作图问题的可能性。</p>
</x-note>
<x-prop t="$e$ 的上下界与对数不等式" id="prop-ln">
<p>数列 $\left(1+\frac1n\right)^{n+1}$ 严格单调减少，且也收敛于 $e$。因此对一切正整数 $n$，</p>
$$\left(1+\frac1n\right)^n<e<\left(1+\frac1n\right)^{n+1},\qquad\frac1{n+1}<\ln\left(1+\frac1n\right)<\frac1n.$$
<x-proof>
<p>对 $n+1$ 个 $\frac n{n+1}$ 和一个 $1$ 用平均值不等式（这 $n+2$ 个数不全相等，所以不等号严格成立）：</p>
$$\sqrt[n+2]{\left(\frac n{n+1}\right)^{n+1}\cdot1}<\frac{(n+1)\cdot\frac n{n+1}+1}{n+2}=\frac{n+1}{n+2}.$$
<p>两边 $n+2$ 次方后取倒数，得 $\left(\frac{n+1}n\right)^{n+1}>\left(\frac{n+2}{n+1}\right)^{n+2}$，即 $\left(1+\frac1n\right)^{n+1}>\left(1+\frac1{n+1}\right)^{n+2}$。又 $\left(1+\frac1n\right)^{n+1}=e_n\left(1+\frac1n\right)\to e$。严格单调减少的数列的每一项都大于它的极限，严格单调增加的数列的每一项都小于它的极限，于是得到第一个不等式。对它取自然对数，得 $n\ln\left(1+\frac1n\right)<1<(n+1)\ln\left(1+\frac1n\right)$，即第二个不等式。<span class="qed">∎</span></p>
</x-proof>
</x-prop>
<x-ex t="Euler 常数" id="ex-gamma">
<p>证明数列 $c_n=1+\frac12+\cdots+\frac1n-\ln n$ 收敛。</p>
<x-analysis><p>§2.3 中看到调和数列 $H_n=1+\frac12+\cdots+\frac1n$ 趋于 $+\infty$，但增长得极慢。由刚证明的不等式，$\frac1k$ 与 $\ln(k+1)-\ln k$ 相差不多，所以 $H_n$ 应当与 $\ln n$ 相差不多。</p></x-analysis>
<x-sol l="证明">
<p><b>单调减少。</b>$c_n-c_{n+1}=\ln(n+1)-\ln n-\frac1{n+1}=\ln\left(1+\frac1n\right)-\frac1{n+1}>0$。</p>
<p><b>有下界。</b>由 $\frac1k>\ln\left(1+\frac1k\right)=\ln(k+1)-\ln k$，</p>
$$c_n>\sum_{k=1}^n\left[\ln(k+1)-\ln k\right]-\ln n=\ln(n+1)-\ln n>0.$$
<p>由单调有界数列收敛定理，$\{c_n\}$ 收敛。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这个极限称为 <em>Euler 常数</em>，记为 $\gamma=0.5772156649\cdots$。数值上 $c_{10}\approx0.6264$，$c_{100}\approx0.5822$，$c_{1000}\approx0.5777$，$c_{10^6}\approx0.5772162$。于是 $H_n=\ln n+\gamma+\eps_n$，其中 $\eps_n\to0$，这就精确刻画了调和数列的增长速度，例如 $H_{10^6}\approx\ln10^6+\gamma\approx14.39$。至今仍不知道 $\gamma$ 是有理数还是无理数，这是数论中著名的未解决问题。</x-remark>
</x-ex>
<x-ex t="与 $e$ 有关的极限" id="ex-eminus">
<p>求极限：(1) $\lim\limits_{n\to\infty}\left(1-\frac1n\right)^n$；(2) $\lim\limits_{n\to\infty}\left(\frac{n+3}{n+1}\right)^n$。</p>
<x-analysis><p>两题都是 $1^\infty$ 型待定型。要点是把底数凑成 $1+\frac1m$ 的形式，并让指数与 $m$ “配对”。</p></x-analysis>
<x-sol>
<p>(1) 当 $n\ge2$ 时，$1-\frac1n=\frac{n-1}n=\frac1{1+\frac1{n-1}}$，所以</p>
$$\left(1-\frac1n\right)^n=\frac1{\left(1+\frac1{n-1}\right)^{n-1}\left(1+\frac1{n-1}\right)}\to\frac1{e\cdot1}=\frac1e.$$
<p>这里 $\left(1+\frac1{n-1}\right)^{n-1}=e_{n-1}$ 只是把 $\{e_n\}$ 的下标平移了一位，极限仍为 $e$。</p>
<p>(2) 注意 $\frac{n+3}{n+1}=\frac{n+2}{n+1}\cdot\frac{n+3}{n+2}=\left(1+\frac1{n+1}\right)\left(1+\frac1{n+2}\right)$，所以</p>
$$\left(\frac{n+3}{n+1}\right)^n=\frac{e_{n+1}}{1+\frac1{n+1}}\cdot\frac{e_{n+2}}{\left(1+\frac1{n+2}\right)^2}\to e\cdot e=e^2.$$
</x-sol>
<x-remark>(2) 中“拆成若干个 $1+\frac1m$ 的乘积”的技巧可以推广：对正整数 $k$，$1+\frac kn=\prod\limits_{j=0}^{k-1}\left(1+\frac1{n+j}\right)$，由此可得 $\left(1+\frac kn\right)^n\to e^k$（见习题）。对一般的实数 $x$，$\left(1+\frac xn\right)^n\to e^x$ 也成立，证明要用到第三章的函数极限。</x-remark>
</x-ex>
<x-app t="连续复利与 72 法则">
<p>本金 $A$ 元，年利率为 $r$。若一年平均结息 $m$ 次（每次利率 $\frac rm$），一年后本利和为 $A\left(1+\frac rm\right)^m$，$t$ 年后为 $A\left(1+\frac rm\right)^{mt}$。结息越频繁，本利和越多，但不会无限增大：当 $m\to\infty$ 时，$\left(1+\frac rm\right)^m\to e^r$，这称为<em>连续复利</em>，$t$ 年后的本利和为 $Ae^{rt}$。</p>
<p>例如 $10000$ 元按年利率 $5\%$ 存 $10$ 年：按年复利得 $16288.95$ 元，按月复利得 $16470.09$ 元，连续复利得 $10000e^{0.5}\approx16487.21$ 元——按月复利与连续复利只差约 $17$ 元。</p>
<p>按年复利时，本金翻倍需要 $\frac{\ln2}{\ln(1+r)}$ 年。由 $\ln(1+r)\approx r$ 与 $\ln2\approx0.693$，翻倍时间约为 $\frac{69.3}{100r}$ 年。金融业常用更便于心算的“72 法则”：翻倍时间 $\approx\frac{72}{\text{年利率的百分数}}$ 年。例如年利率 $6\%$ 时，精确值为 $11.90$ 年，72 法则给出 $12$ 年。用 $72$ 代替 $69.3$，一是因为 $72$ 的因数多，二是也部分弥补了 $\ln(1+r)<r$ 带来的偏差。</p>
</x-app>
<x-viz type="compound" r="1" t="复利次数越多，本利和越接近 $e^r$">年利率取 $r=100\%$ 时，表格最后一行就是 $e$。拖动滑块改变利率，观察 $\left(1+\frac rm\right)^m$ 随 $m$ 的变化以及 72 法则的精度。</x-viz>
`);
MA.add("2-4", String.raw`
<h2 id="nested">闭区间套定理</h2>
<x-def t="闭区间套" id="def-nest">
<p>若一列闭区间 $\{[a_n,b_n]\}$ 满足</p>
<ul>
<li>$[a_{n+1},b_{n+1}]\subset[a_n,b_n]$（$n=1,2,\cdots$），即 $a_n\le a_{n+1}\le b_{n+1}\le b_n$；</li>
<li>$\lim\limits_{n\to\infty}(b_n-a_n)=0$，</li>
</ul>
<p>则称它为一个<em>闭区间套</em>。</p>
</x-def>
<x-thm t="闭区间套定理" id="thm-nest">
<p>若 $\{[a_n,b_n]\}$ 是一个闭区间套，则存在唯一的实数 $\xi$ 属于所有的区间 $[a_n,b_n]$，并且 $\lim\limits_{n\to\infty}a_n=\lim\limits_{n\to\infty}b_n=\xi$。</p>
<x-proof>
<p>由条件，$a_1\le a_2\le\cdots\le a_n\le\cdots\le b_n\le\cdots\le b_2\le b_1$。$\{a_n\}$ 单调增加、有上界 $b_1$，$\{b_n\}$ 单调减少、有下界 $a_1$，由单调有界数列收敛定理，两者都收敛。又 $b_n-a_n\to0$，所以它们的极限相同，记为 $\xi$。由<x-ref to="thm-mono"></x-ref>，$\xi=\sup\{a_n\}=\inf\{b_n\}$，所以 $a_n\le\xi\le b_n$ 对一切 $n$ 成立，即 $\xi$ 属于所有的区间。</p>
<p>若 $\eta$ 也属于所有的区间，则 $|\xi-\eta|\le b_n-a_n$ 对一切 $n$ 成立，令 $n\to\infty$ 得 $\xi=\eta$。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-intuit>
<p>一列越来越短、一个套一个的闭区间，最后“缩”成一个点。这个点一定是实数——实数轴上没有“洞”可以让区间套漏下去。</p>
</x-intuit>
<x-warn>
<ul>
<li><em>“闭”不能去掉</em>：开区间 $\left(0,\frac1n\right)$ 一个套一个，长度趋于 $0$，但它们的交集是空集（<x-ref to="1-1/ex-union"></x-ref>）。原因是 $a_n\equiv0$ 的极限 $0$ 恰好被所有区间排除在外。</li>
<li><em>在 $\Q$ 中不成立</em>：设 $r_n$ 是 $\sqrt2$ 的 $n$ 位不足近似值，则 $\left[r_n,r_n+10^{-n}\right]$ 是端点为有理数的闭区间套，但没有一个<em>有理数</em>属于所有这些区间。</li>
<li>若去掉条件 $b_n-a_n\to0$，交集仍然非空（它是闭区间 $[\sup a_n,\inf b_n]$），但可能不止一个点。</li>
</ul>
</x-warn>
<x-ex t="实数集不可列的另一个证明" id="ex-uncount">
<p>用闭区间套定理证明：闭区间 $[0,1]$ 不是可列集，从而 $\R$ 不是可列集。</p>
<x-sol l="证明">
<p>反证。假设 $[0,1]$ 中的数可以排成一列 $x_1,x_2,x_3,\cdots$。把 $[0,1]$ 三等分为三个闭区间，$x_1$ 至多属于其中两个（恰好是分点时属于两个），所以可以取出一个不含 $x_1$ 的，记为 $[a_1,b_1]$。再把 $[a_1,b_1]$ 三等分，取出一个不含 $x_2$ 的，记为 $[a_2,b_2]$。如此继续，得到闭区间套 $\{[a_n,b_n]\}$，其中 $b_n-a_n=\frac1{3^n}\to0$，且 $x_n\notin[a_n,b_n]$。</p>
<p>由闭区间套定理，存在 $\xi$ 属于所有的 $[a_n,b_n]$。$\xi\in[0,1]$，所以 $\xi$ 应当是某个 $x_m$；但 $x_m\notin[a_m,b_m]$，而 $\xi\in[a_m,b_m]$，矛盾。<span class="qed">∎</span></p>
</x-sol>
<x-remark>与<x-ref to="1-1/thm-cantor"></x-ref>的对角线证明相比，这里不需要小数表示，思想却是一样的：针对假想列表中的每一个数，构造出一个“躲开”它的实数。为什么要三等分而不是二等分？二等分时若 $x_n$ 恰好是中点，它就同时属于两半，无法躲开。</x-remark>
</x-ex>
<x-app t="二分法与二分查找">
<p>设 $f(x)$ 在 $[a,b]$ 上“连续”（第三章给出精确定义），且 $f(a)$ 与 $f(b)$ 异号。取中点 $m=\frac{a+b}2$：若 $f(m)=0$，问题已解决；否则 $[a,m]$ 与 $[m,b]$ 中恰有一个区间两端的函数值异号，取它作为新的区间。如此继续，得到一个闭区间套，第 $n$ 个区间的长度为 $\frac{b-a}{2^n}$。由闭区间套定理，这些区间缩向唯一的点 $\xi$，第三章将证明 $f(\xi)=0$。这就是求方程近似根的<em>二分法</em>。</p>
<p>取第 $n$ 个区间中的任一点作为近似根，误差不超过 $\frac{b-a}{2^n}$。例如在 $[1,2]$ 上求 $x^2-2=0$ 的根，要使误差小于 $10^{-6}$，只需 $2^n>10^6$，即二分 $20$ 次（$2^{20}=1048576$）。二分法每步只把误差减半，比 Heron 开方法慢得多，但它只要求两端函数值异号，非常可靠。</p>
<p>同样的思想用于在有序的数据中查找：猜一个 $1$ 到 $1000$ 之间的整数，每次被告知“大了”或“小了”，最多猜 $10$ 次就能猜中（$2^{10}=1024$）。程序员排查故障时，在几百个版本之间对半测试，几次就能找到第一个出错的版本（如 git 的 bisect 命令），用的也是这个原理。</p>
</x-app>
<x-viz type="bisect" t="二分法：用闭区间套逼近方程的根">选择方程或输入自定义的函数与区间，逐步增加二分次数；勾选“跟随放大当前区间”，可以看到区间不断缩小，而根始终被夹在其中。</x-viz>

<h2 id="sub">子列</h2>
<x-def t="子列" id="def-sub">
<p>设 $\{x_n\}$ 是一个数列，$n_1<n_2<\cdots<n_k<\cdots$ 是一列严格增加的正整数，则称数列</p>
$$x_{n_1},\ x_{n_2},\ \cdots,\ x_{n_k},\ \cdots$$
<p>为 $\{x_n\}$ 的一个<em>子列</em>，记为 $\{x_{n_k}\}$。</p>
</x-def>
<x-note>
<p>子列就是从原数列中按原来的先后顺序挑出无穷多项。子列的下标是 $k$：$x_{n_k}$ 是子列的第 $k$ 项、原数列的第 $n_k$ 项。由 $n_1\ge1$ 及 $n_{k+1}>n_k$ 归纳可得 $n_k\ge k$，这个简单的事实在证明中经常用到。偶数项 $\{x_{2k}\}$ 与奇数项 $\{x_{2k-1}\}$ 是最常用的子列。</p>
</x-note>
<x-thm t="收敛数列的子列也收敛" id="thm-sub">
<p>若 $\lim\limits_{n\to\infty}x_n=a$，则 $\{x_n\}$ 的任一子列 $\{x_{n_k}\}$ 都收敛，且 $\lim\limits_{k\to\infty}x_{n_k}=a$。对 $a=+\infty,-\infty,\infty$，结论同样成立。</p>
<x-proof>
<p>任给 $\eps>0$，存在 $N$，当 $n>N$ 时 $|x_n-a|<\eps$。由于 $n_k\ge k$，当 $k>N$ 时 $n_k>N$，从而 $|x_{n_k}-a|<\eps$。无穷大的情形，把 $|x_n-a|<\eps$ 换成 $x_n>G$ 等即可。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-cor t="判断数列发散的方法" id="cor-div">
<p>若数列 $\{x_n\}$ 有两个子列收敛于不同的极限，或者有一个子列发散，则 $\{x_n\}$ 发散。</p>
</x-cor>
<x-ex t="用子列证明发散" id="ex-subdiv">
<p>证明下列数列发散：(1) $x_n=\frac{(-1)^nn}{n+1}$；(2) $x_n=n^{(-1)^n}$，并说明 (2) 也不是无穷大量。</p>
<x-sol l="证明">
<p>(1) $x_{2k}=\frac{2k}{2k+1}\to1$，$x_{2k-1}=-\frac{2k-1}{2k}\to-1$，两个子列的极限不同，所以 $\{x_n\}$ 发散。</p>
<p>(2) $x_{2k}=2k\to+\infty$，这个子列发散，所以 $\{x_n\}$ 发散。又 $x_{2k-1}=\frac1{2k-1}\to0$；若 $\{x_n\}$ 是无穷大量，由<x-ref to="thm-sub"></x-ref>，它的子列也应当是无穷大量，矛盾。<span class="qed">∎</span></p>
</x-sol>
<x-remark>与 §2.2 中用定义的否定形式证明发散相比，用子列往往简单得多：只要找出两个“走向不同”的子列就够了。</x-remark>
</x-ex>
<x-ex t="利用子列求极限" id="ex-esub">
<p>求极限：(1) $\lim\limits_{n\to\infty}\left(1+\frac1{n^2}\right)^{n^2}$；(2) $\lim\limits_{n\to\infty}\left(1+\frac1{2n}\right)^n$。</p>
<x-sol>
<p>(1) 数列 $\left(1+\frac1{n^2}\right)^{n^2}$ 是 $e_m=\left(1+\frac1m\right)^m$ 取 $m=n^2$ 得到的子列（$1<4<9<\cdots$ 严格增加），所以极限为 $e$。</p>
<p>(2) $\left(1+\frac1{2n}\right)^{2n}=e_{2n}$ 是 $\{e_m\}$ 的偶数项子列，所以趋于 $e$。于是 $\left(1+\frac1{2n}\right)^n=\sqrt{e_{2n}}\to\sqrt e$（由 §2.2 习题，$a_n\to a\ge0$ 蕴含 $\sqrt{a_n}\to\sqrt a$）。</p>
</x-sol>
<x-remark>对比 $\left(1+\frac1{n^2}\right)^{n^2}\to e$，$\left(1+\frac1{n^2}\right)^n\to1$，$\left(1+\frac1n\right)^{n^2}\to+\infty$：$1^\infty$ 型的结果取决于底数趋于 $1$ 的速度与指数增长速度如何“配合”。</x-remark>
</x-ex>
<x-prop t="奇偶子列与收敛" id="prop-oddeven">
<p>$\lim\limits_{n\to\infty}x_n=a$ 的充分必要条件是 $\lim\limits_{k\to\infty}x_{2k}=\lim\limits_{k\to\infty}x_{2k-1}=a$。</p>
<x-proof>
<p>必要性由<x-ref to="thm-sub"></x-ref>得到。充分性：任给 $\eps>0$，存在 $K_1$，当 $k>K_1$ 时 $|x_{2k}-a|<\eps$；存在 $K_2$，当 $k>K_2$ 时 $|x_{2k-1}-a|<\eps$。取 $N=\max\{2K_1,2K_2\}$。当 $n>N$ 时：若 $n=2k$，则 $k>K_1$；若 $n=2k-1$，则 $2k>N+1\ge2K_2+1$，从而 $k>K_2$。总之 $|x_n-a|<\eps$。<span class="qed">∎</span></p>
</x-proof>
</x-prop>
<x-ex t="一个来回摆动的递推数列" id="ex-cf">
<p>设 $x_1=1$，$x_{n+1}=1+\frac1{1+x_n}$。证明 $\lim\limits_{n\to\infty}x_n=\sqrt2$。</p>
<x-analysis><p>前几项是 $1,\ \frac32,\ \frac75,\ \frac{17}{12},\ \frac{41}{29},\ \frac{99}{70},\cdots$，即 $1,\ \allowbreak 1.5,\ \allowbreak 1.4,\ \allowbreak 1.4167,\ \allowbreak 1.4138,\ \allowbreak 1.4143,\cdots$，在 $\sqrt2$ 两侧来回摆动，不单调，原因是 $f(x)=1+\frac1{1+x}$ 单调减少。但隔一项看，奇数项在增加，偶数项在减少，于是考虑“隔一步”的递推式。</p></x-analysis>
<x-sol l="证明">
<p>显然 $x_n\ge1$，从而 $1<x_{n+1}\le\frac32$，即 $1\le x_n\le\frac32$。代入两次递推式得</p>
$$x_{n+2}=1+\frac1{2+\frac1{1+x_n}}=\frac{4+3x_n}{3+2x_n}=g(x_n),\qquad g(x)=\frac32-\frac1{2(3+2x)}.$$
<p>$g$ 在 $x>-\frac32$ 时单调增加，所以 $x_{n+2}-x_n=g(x_n)-g(x_{n-2})$ 与 $x_n-x_{n-2}$ 同号（$n\ge3$）。由 $x_3=\frac75>x_1$ 得奇数项子列单调增加；由 $x_4=\frac{17}{12}<x_2$ 得偶数项子列单调减少。两个子列都有界，所以都收敛，设极限分别为 $A,B$，则 $A,B\in\left[1,\frac32\right]$。对 $x_{n+2}(3+2x_n)=4+3x_n$ 沿奇数项取极限，得 $A(3+2A)=4+3A$，即 $A^2=2$，所以 $A=\sqrt2$；同理 $B=\sqrt2$。由<x-ref to="prop-oddeven"></x-ref>，$x_n\to\sqrt2$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>$x_n$ 正是 $\sqrt2$ 的连分数 $1+\cfrac1{2+\cfrac1{2+\cdots}}$ 的渐近分数，§2.1 习题中 A4 纸长宽比的近似值 $\frac{99}{70}$ 就是第 $6$ 项。连分数的渐近分数是“分母不太大时最好的有理逼近”，在历法（闰年、闰月的安排）和齿轮传动比的设计中都有应用。</x-remark>
</x-ex>
<h3>极限点</h3>
<x-def t="极限点" id="def-limpt">
<p>若数列 $\{x_n\}$ 有一个子列收敛于 $\xi$，则称 $\xi$ 为 $\{x_n\}$ 的一个<em>极限点</em>。若有子列趋于 $+\infty$（或 $-\infty$），也称 $+\infty$（或 $-\infty$）为它的极限点。</p>
</x-def>
<p>对有限的 $\xi$，“$\xi$ 是极限点”等价于：$\xi$ 的任何邻域 $O(\xi,\eps)$ 中都含有数列的无穷多项（指下标无穷多，数值可以重复），证明留作习题。几个例子：</p>
<ul>
<li>$\left\{(-1)^n+\frac1n\right\}$ 的极限点是 $-1$ 和 $1$；$\left\{n^{(-1)^n}\right\}$ 的极限点是 $0$ 和 $+\infty$；</li>
<li>收敛数列只有一个极限点，就是它的极限（<x-ref to="thm-sub"></x-ref>）；</li>
<li>把全体有理数排成一列（<x-ref to="1-1/cor-q"></x-ref>），则<em>每一个实数</em>以及 $\pm\infty$ 都是它的极限点——一个数列可以有不可列个极限点；</li>
<li>可以证明，$\{\sin n\}$ 的极限点恰好组成闭区间 $[-1,1]$。</li>
</ul>
<x-note t="上极限与下极限">
<p>下面的 Bolzano–Weierstrass 定理将保证任何数列都至少有一个极限点（可能是 $\pm\infty$）。进一步可以证明，全体极限点中总有最大的和最小的，分别称为数列的<em>上极限</em> $\varlimsup\limits_{n\to\infty}x_n$ 与<em>下极限</em> $\varliminf\limits_{n\to\infty}x_n$；并且 $\lim\limits_{n\to\infty}x_n$ 存在（有限或无穷）当且仅当上极限等于下极限。例如 $\left\{(-1)^n+\frac1n\right\}$ 的上极限是 $1$、下极限是 $-1$。注意上极限 $1$ 与这个数集的上确界 $\frac32$（<x-ref to="2-1/ex-sup2"></x-ref>）不同：上确界可能被个别项“撑高”，上极限只看无穷多项聚集的位置。上、下极限在以后研究级数时很有用。</p>
</x-note>

<h2 id="bw">Bolzano–Weierstrass 定理</h2>
<x-thm t="Bolzano–Weierstrass 定理" id="thm-bw">
<p>有界数列必有收敛的子列。</p>
<x-proof>
<p>设 $a\le x_n\le b$（$n=1,2,\cdots$）。把 $[a,b]$ 二等分，两个闭子区间中至少有一个含有数列的无穷多项（指下标无穷多），把它记为 $[a_1,b_1]$；再把 $[a_1,b_1]$ 二等分，取含有无穷多项的一半记为 $[a_2,b_2]$。如此继续，得到闭区间套 $\{[a_k,b_k]\}$，$b_k-a_k=\frac{b-a}{2^k}\to0$，并且每个 $[a_k,b_k]$ 都含有数列的无穷多项。</p>
<p>任取 $x_{n_1}\in[a_1,b_1]$。由于 $[a_2,b_2]$ 含有无穷多项，可以取 $n_2>n_1$ 使 $x_{n_2}\in[a_2,b_2]$；一般地，取 $n_k>n_{k-1}$ 使 $x_{n_k}\in[a_k,b_k]$。这样得到子列 $\{x_{n_k}\}$，满足 $a_k\le x_{n_k}\le b_k$。由闭区间套定理，$a_k$ 与 $b_k$ 收敛于同一个 $\xi$，再由夹逼性质，$\lim\limits_{k\to\infty}x_{n_k}=\xi$。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-intuit>
<p>在一个有界区间里放进无穷多个点（允许重复），它们不可能处处稀疏，总有一处聚集了无穷多个点——这个聚集的位置就是某个子列的极限。证明中的二分法就是一步步把这个位置“逼”出来。</p>
</x-intuit>
<x-viz type="bw" t="二分法选出收敛子列">每次二分时保留含有更多（剩余）项的那一半，选出的子列下标严格增加，值被套在越来越小的区间里。试试 $\sin n$、$n\sqrt2$ 的小数部分这类“看不出规律”的数列。</x-viz>
<x-cor t="无界数列的子列" id="cor-unb">
<p>若数列 $\{x_n\}$ 无上界，则它有子列趋于 $+\infty$；若无下界，则有子列趋于 $-\infty$。因此，<em>任何数列都有极限点</em>（有限的或无穷的）。</p>
<x-proof>
<p>设 $\{x_n\}$ 无上界。取 $n_1$ 使 $x_{n_1}>1$。假设已取出 $n_1<\cdots<n_k$，由于去掉有限多项后数列仍无上界，可以取 $n_{k+1}>n_k$ 使 $x_{n_{k+1}}>k+1$。于是 $x_{n_k}>k$，$x_{n_k}\to+\infty$。有界数列的情形由 Bolzano–Weierstrass 定理得到。<span class="qed">∎</span></p>
</x-proof>
</x-cor>
<x-ex t="收敛子列的极限都相同则收敛" id="ex-sublim">
<p>设 $\{x_n\}$ 有界，且它的每一个收敛子列都收敛于同一个数 $a$。证明 $\lim\limits_{n\to\infty}x_n=a$。</p>
<x-analysis><p>用反证法。若 $x_n$ 不收敛于 $a$，则有无穷多项与 $a$ 保持一定距离；这些项组成的子列仍然有界，可以再用一次 Bolzano–Weierstrass 定理。</p></x-analysis>
<x-sol l="证明">
<p>假设 $x_n\not\to a$，则存在 $\eps_0>0$，对任意 $N$，有 $n>N$ 使 $|x_n-a|\ge\eps_0$。由此可以取出下标严格增加的子列 $\{x_{n_k}\}$，满足 $|x_{n_k}-a|\ge\eps_0$。这个子列有界，由 Bolzano–Weierstrass 定理，它又有收敛的子列，其极限 $b$ 满足 $|b-a|\ge\eps_0$（<x-ref to="2-2/cor-le"></x-ref>）。但“子列的子列”也是 $\{x_n\}$ 的子列，按条件应有 $b=a$，矛盾。<span class="qed">∎</span></p>
</x-sol>
<x-remark>“有界”不能去掉：数列 $0,1,0,2,0,3,\cdots$（$x_{2k-1}=0$，$x_{2k}=k$）的收敛子列都收敛于 $0$，但数列发散。用极限点的语言，本例是说：只有一个极限点的有界数列必定收敛。</x-remark>
</x-ex>
`);
MA.add("2-4", String.raw`
<h2 id="cauchy">Cauchy 收敛原理</h2>
<p>单调有界定理只适用于单调数列。对一般的数列，能否不借助极限值、只看数列本身来判断收敛？如果 $x_n\to a$，那么 $n$ 充分大时各项都挤在 $a$ 附近，因而<em>彼此之间</em>也挨得很近。Cauchy 收敛原理说，反过来也对。</p>
<x-def t="基本数列" id="def-cauchy">
<p>若对任意给定的 $\eps>0$，存在正整数 $N$，使得当 $m,n>N$ 时</p>
$$|x_m-x_n|<\eps,$$
<p>则称 $\{x_n\}$ 为<em>基本数列</em>（或 <em>Cauchy 数列</em>）。等价的说法是：任给 $\eps>0$，存在 $N$，当 $n>N$ 时，对一切正整数 $p$ 都有 $|x_{n+p}-x_n|<\eps$。</p>
</x-def>
<x-thm t="Cauchy 收敛原理" id="thm-cauchy">
<p>数列 $\{x_n\}$ 收敛的充分必要条件是：$\{x_n\}$ 是基本数列。</p>
<x-proof>
<p><b>必要性。</b>设 $x_n\to a$。任给 $\eps>0$，存在 $N$，当 $n>N$ 时 $|x_n-a|<\frac\eps2$。于是当 $m,n>N$ 时，$|x_m-x_n|\le|x_m-a|+|a-x_n|<\eps$。</p>
<p><b>充分性。</b>设 $\{x_n\}$ 是基本数列。</p>
<p>(1) <em>有界</em>：取 $\eps=1$，存在 $N_0$，当 $n>N_0$ 时 $|x_n-x_{N_0+1}|<1$，所以 $|x_n|\le\max\{|x_1|,\allowbreak\cdots,\allowbreak|x_{N_0}|,\allowbreak|x_{N_0+1}|+1\}$ 对一切 $n$ 成立。</p>
<p>(2) 由 Bolzano–Weierstrass 定理，有子列 $x_{n_k}\to\xi$。</p>
<p>(3) <em>整个数列收敛于 $\xi$</em>：任给 $\eps>0$，取 $N$ 使 $m,n>N$ 时 $|x_m-x_n|<\eps$；再取 $k$ 充分大，使 $n_k>N$ 且 $|x_{n_k}-\xi|<\eps$。于是当 $n>N$ 时，</p>
$$|x_n-\xi|\le|x_n-x_{n_k}|+|x_{n_k}-\xi|<2\eps,$$
<p>所以 $\lim\limits_{n\to\infty}x_n=\xi$。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-intuit>
<p>要判断一群人是否“聚在某个地点”，本来要先知道地点在哪里；Cauchy 收敛原理说，只要看到这群人<em>彼此</em>越来越近就够了，聚集的地点自然存在。这正是它的威力：不用知道极限是多少，就能判断收敛。</p>
</x-intuit>
<x-note>
<ul>
<li>否定形式：$\{x_n\}$ 不是基本数列 $\iff$ 存在 $\eps_0>0$，对任意 $N$，都有 $m,n>N$ 使 $|x_m-x_n|\ge\eps_0$。</li>
<li>在 $\Q$ 中充分性不成立：$\sqrt2$ 的 $n$ 位不足近似值 $r_n$ 满足 $|r_m-r_n|<10^{-\min\{m,n\}}$，是有理数的基本数列，但没有有理数极限。“基本数列都收敛”这一性质称为实数系的<em>完备性</em>。Cantor 正是用有理数的基本数列来构造实数的。</li>
</ul>
</x-note>
<x-warn>
<p>不要把条件弱化成“相邻两项之差趋于 $0$”。$x_n=\sqrt n$ 满足 $x_{n+1}-x_n=\frac1{\sqrt{n+1}+\sqrt n}\to0$，调和数列满足 $H_{n+1}-H_n=\frac1{n+1}\to0$，但两者都趋于 $+\infty$。基本数列要求的是<em>任意两项</em>之差都小（$m,n>N$ 任意，或者说 $p$ 任意），而不只是相邻两项。</p>
</x-warn>
<x-ex t="用 Cauchy 收敛原理证明调和数列发散" id="ex-harmc">
<p>证明 $H_n=1+\frac12+\cdots+\frac1n$ 发散。</p>
<x-sol l="证明">
<p>对任意 $n$，</p>
$$H_{2n}-H_n=\frac1{n+1}+\frac1{n+2}+\cdots+\frac1{2n}\ge n\cdot\frac1{2n}=\frac12.$$
<p>取 $\eps_0=\frac12$，对任意 $N$，取 $n=N+1$，$m=2n$，都有 $|H_m-H_n|\ge\eps_0$，所以 $\{H_n\}$ 不是基本数列，从而发散。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这和<x-ref to="2-3/ex-harm"></x-ref>的证明本质上是同一个估计。由 Euler 常数（<x-ref to="ex-gamma"></x-ref>）还可以知道 $H_{2n}-H_n\to\ln2$。</x-remark>
</x-ex>
<x-ex t="平方倒数和" id="ex-basel">
<p>证明数列 $x_n=1+\frac1{2^2}+\frac1{3^2}+\cdots+\frac1{n^2}$ 收敛。</p>
<x-sol l="证明">
<p>对任意正整数 $n$ 与 $p$，利用 $\frac1{k^2}<\frac1{k(k-1)}=\frac1{k-1}-\frac1k$（$k\ge2$），</p>
$$0<x_{n+p}-x_n=\sum_{k=n+1}^{n+p}\frac1{k^2}<\sum_{k=n+1}^{n+p}\left(\frac1{k-1}-\frac1k\right)=\frac1n-\frac1{n+p}<\frac1n.$$
<p>任给 $\eps>0$，取 $N=\left[\frac1\eps\right]$，当 $n>N$ 时，对一切 $p$ 都有 $|x_{n+p}-x_n|<\frac1n<\eps$。由 Cauchy 收敛原理，$\{x_n\}$ 收敛。<span class="qed">∎</span></p>
</x-sol>
<x-remark>本题也可以用单调有界定理：$\{x_n\}$ 单调增加，且由同样的估计 $x_n\le1+\left(1-\frac1n\right)<2$。它的极限是多少，是困扰了数学家近百年的“Basel 问题”，1734 年 Euler 求出 $\displaystyle\lim_{n\to\infty}\sum_{k=1}^n\frac1{k^2}=\frac{\pi^2}6\approx1.644934$。§2.3 的<x-ref to="2-3/ex-tail"></x-ref>估计了它的收敛速度。</x-remark>
</x-ex>
<x-ex t="不单调的数列" id="ex-sinsum">
<p>证明数列 $x_n=\frac{\sin1}2+\frac{\sin2}{2^2}+\cdots+\frac{\sin n}{2^n}$ 收敛。</p>
<x-sol l="证明">
<p>$\sin k$ 有正有负，这个数列增减不定，不能直接用单调有界定理。对任意 $n,p$，</p>
$$|x_{n+p}-x_n|=\left|\sum_{k=n+1}^{n+p}\frac{\sin k}{2^k}\right|\le\sum_{k=n+1}^{n+p}\frac1{2^k}<\frac1{2^n}.$$
<p>任给 $\eps\in(0,1)$，取 $N=\left[\log_2\frac1\eps\right]$，当 $n>N$ 时 $\frac1{2^n}<\eps$，所以 $\{x_n\}$ 是基本数列，从而收敛。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这里的技巧是“取绝对值后放大成收敛的几何级数”，以后在级数理论中称为比较判别法。这个极限约为 $0.592838$。</x-remark>
</x-ex>
<x-viz type="cauchy" t="Cauchy 收敛原理：后面的项是否挤在一条窄带里">选择数列并调节 $\eps$：若能找到 $N$，使第 $N$ 项以后各项的最大值与最小值之差小于 $\eps$，则这些项两两之差都小于 $\eps$。对 $\sqrt n$、$H_n$、$\sin n$，滑块范围内的 $\eps$ 都找不到这样的 $N$。事实上，对 $\sqrt n$ 和 $H_n$，$\eps$ 取多大都不行；对 $\sin n$，只要 $\eps<2$ 就不行。演示只计算了前 $200000$ 项。</x-viz>

<h3>压缩条件</h3>
<x-prop t="压缩条件" id="prop-contr">
<p>若存在常数 $q\in(0,1)$，使得</p>
$$|x_{n+1}-x_n|\le q\,|x_n-x_{n-1}|\qquad(n=2,3,\cdots),$$
<p>则 $\{x_n\}$ 收敛；若记其极限为 $\xi$，还有误差估计 $|x_n-\xi|\le\frac{q^{n-1}}{1-q}|x_2-x_1|$。</p>
<x-proof>
<p>反复使用条件得 $|x_{k+1}-x_k|\le q^{k-1}|x_2-x_1|$。于是对任意 $n,p$，</p>
$$|x_{n+p}-x_n|\le\sum_{k=n}^{n+p-1}|x_{k+1}-x_k|\le\left(q^{n-1}+q^n+\cdots+q^{n+p-2}\right)|x_2-x_1|\le\frac{q^{n-1}}{1-q}|x_2-x_1|.$$
<p>由 $q^{n-1}\to0$，$\{x_n\}$ 是基本数列，从而收敛。在上式中令 $p\to\infty$ 即得误差估计。<span class="qed">∎</span></p>
</x-proof>
</x-prop>
<x-warn>
<p>$q$ 必须是一个<em>固定的</em>、小于 $1$ 的常数。仅有 $|x_{n+1}-x_n|<|x_n-x_{n-1}|$ 是不够的：$H_n$ 的相邻项之差 $\frac1{n+1}$ 严格减少，但 $H_n\to+\infty$——这时比值 $\frac{|x_{n+1}-x_n|}{|x_n-x_{n-1}|}=\frac n{n+1}$ 越来越接近 $1$。</p>
</x-warn>
<x-ex t="Fibonacci 数列与黄金分割" id="ex-fib">
<p>Fibonacci 数列定义为 $F_1=F_2=1$，$F_{n+2}=F_{n+1}+F_n$，即 $1,1,2,3,5,8,13,21,\cdots$。证明相邻两项之比 $r_n=\frac{F_{n+1}}{F_n}$ 收敛，并求其极限。</p>
<x-analysis><p>由 $F_{n+2}=F_{n+1}+F_n$ 得 $r_{n+1}=1+\frac1{r_n}$。前几项 $1,\ \allowbreak 2,\ \allowbreak 1.5,\ \allowbreak 1.667,\ \allowbreak 1.6,\ \allowbreak 1.625,\ \allowbreak 1.615,\cdots$ 来回摆动，不单调（$f(x)=1+\frac1x$ 单调减少），但摆动的幅度迅速缩小，适合用压缩条件。</p></x-analysis>
<x-sol>
<p>显然 $r_n\ge1$，且 $r_nr_{n-1}=\left(1+\frac1{r_{n-1}}\right)r_{n-1}=r_{n-1}+1\ge2$。于是</p>
$$|r_{n+1}-r_n|=\left|\frac1{r_n}-\frac1{r_{n-1}}\right|=\frac{|r_n-r_{n-1}|}{r_nr_{n-1}}\le\frac12|r_n-r_{n-1}|.$$
<p>由压缩条件（$q=\frac12$），$\{r_n\}$ 收敛，设极限为 $\varphi$，则 $\varphi\ge1$。在 $r_{n+1}r_n=r_n+1$ 两边取极限得 $\varphi^2=\varphi+1$，所以</p>
$$\lim_{n\to\infty}\frac{F_{n+1}}{F_n}=\varphi=\frac{1+\sqrt5}2\approx1.6180340.$$
</x-sol>
<x-remark>$\varphi$ 就是<em>黄金分割比</em>，$\frac1\varphi=\varphi-1\approx0.618$。由误差估计，$|r_n-\varphi|\le\frac{(1/2)^{n-1}}{1-1/2}|r_2-r_1|=\frac1{2^{n-2}}$，实际收敛还要更快：$r_{12}=\frac{233}{144}\approx1.618056$，误差约 $2\times10^{-5}$。Fibonacci 数在植物的叶序、向日葵花盘的螺线条数中经常出现。</x-remark>
</x-ex>
<x-viz type="cobweb" start="3" t="$x_{n+1}=1+\frac1{x_n}$ 的蛛网图">$f(x)=1+\frac1x$ 单调减少，蛛网图呈螺旋状向内收缩：奇数项与偶数项从两侧夹向黄金分割比 $\varphi$。</x-viz>
<x-ex t="Kepler 方程的迭代解法" id="ex-kepler">
<p>§1.2 中提到，计算行星在椭圆轨道上的位置要解 Kepler 方程 $E-e\sin E=M$，其中 $M$ 是已知的平近点角，$e\in(0,1)$ 是轨道的离心率（这里的 $e$ 不是自然对数的底）。证明：任取 $E_1$，由 $E_{k+1}=M+e\sin E_k$ 得到的数列收敛，其极限就是方程的解。</p>
<x-sol l="证明">
<p>先证明 $|\sin x-\sin y|\le|x-y|$：由和差化积公式及 $|\sin t|\le|t|$，</p>
$$|\sin x-\sin y|=2\left|\cos\frac{x+y}2\right|\left|\sin\frac{x-y}2\right|\le2\left|\frac{x-y}2\right|=|x-y|.$$
<p>于是 $|E_{k+1}-E_k|=e\,|\sin E_k-\sin E_{k-1}|\le e\,|E_k-E_{k-1}|$，满足压缩条件（$q=e$），所以 $\{E_k\}$ 收敛，设极限为 $E^*$。由 $|\sin E_k-\sin E^*|\le|E_k-E^*|\to0$ 得 $\sin E_k\to\sin E^*$，在递推式两边取极限即得 $E^*=M+e\sin E^*$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>取 $M=1$，$e=0.5$，$E_1=1$，迭代得 $E_2,E_3,\cdots$ 依次为 $1.4207355$，$1.4943810$，$1.4985409$，$1.4986954$，$1.4987009$，$1.4987011$，$\cdots$，解为 $E^*\approx1.4987011$。地球轨道的离心率只有约 $0.0167$，误差每步缩小到约 $\frac1{60}$，迭代两三次就足够精确；离心率接近 $1$ 的彗星轨道，迭代就要慢得多。</x-remark>
</x-ex>

<h2 id="equiv">实数系的基本定理</h2>
<p>回顾本节与 §2.1 的证明链条：</p>
<p class="center">确界存在定理 ⟹ 单调有界数列收敛定理 ⟹ 闭区间套定理 ⟹ Bolzano–Weierstrass 定理 ⟹ Cauchy 收敛原理</p>
<p>下面补上最后一环：由 Cauchy 收敛原理推出确界存在定理。这样五个定理首尾相接构成一个循环，它们彼此等价。</p>
<x-thm t="由 Cauchy 收敛原理推出确界存在定理" id="thm-c2s">
<p>若 Cauchy 收敛原理成立，则非空有上界的数集必有上确界。</p>
<x-proof>
<p>设 $S$ 非空且有上界。取 $S$ 的一个上界 $b_1$，再任取 $x_0\in S$，令 $a_1=x_0-1$，则 $a_1$ 不是 $S$ 的上界。用二分法：取中点 $m=\frac{a_1+b_1}2$，若 $m$ 是 $S$ 的上界，令 $[a_2,b_2]=[a_1,m]$，否则令 $[a_2,b_2]=[m,b_1]$。如此继续，得到一列区间 $[a_n,b_n]$，满足：</p>
<ul>
<li>每个 $b_n$ 都是 $S$ 的上界，每个 $a_n$ 都不是 $S$ 的上界；</li>
<li>$a_n\le a_{n+1}\le b_{n+1}\le b_n$，$b_n-a_n=\frac{b_1-a_1}{2^{n-1}}$。</li>
</ul>
<p>当 $m>n$ 时 $0\le b_n-b_m\le b_n-a_n=\frac{b_1-a_1}{2^{n-1}}$，它可以任意小，所以 $\{b_n\}$ 是基本数列。由 Cauchy 收敛原理，$b_n\to\xi$，从而 $a_n=b_n-(b_n-a_n)\to\xi$。</p>
<p>$\xi$ 是上界：对任意 $x\in S$，$x\le b_n$，令 $n\to\infty$ 得 $x\le\xi$。$\xi$ 是最小的上界：任给 $\eps>0$，取 $n$ 使 $a_n>\xi-\eps$，由于 $a_n$ 不是上界，存在 $x\in S$ 使 $x>a_n>\xi-\eps$。因此 $\xi=\sup S$。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<p>于是下面这些命题在实数系中彼此等价，它们从不同角度刻画了实数系的<em>连续性</em>（也称<em>完备性</em>）。记 $r_n$ 为 $\sqrt2$ 的 $n$ 位不足近似值，每个命题在 $\Q$ 中都有反例：</p>
<table>
<tr><th>定理</th><th>内容</th><th>在 $\Q$ 中的反例</th></tr>
<tr><td>确界存在定理</td><td>非空有上界的数集有上确界</td><td>$\{x\in\Q\mid x^2<2\}$ 在 $\Q$ 中没有上确界</td></tr>
<tr><td>Dedekind 切割定理</td><td>每个切割 $A|B$ 中，$A$ 有最大数或 $B$ 有最小数</td><td>$A=\{x\in\Q\mid x\le0\text{ 或 }x^2<2\}$ 无最大数，其余部分 $B$ 无最小数</td></tr>
<tr><td>单调有界收敛定理</td><td>单调有界数列收敛</td><td>$\{r_n\}$ 单调增加有上界，在 $\Q$ 中没有极限</td></tr>
<tr><td>闭区间套定理</td><td>闭区间套恰有一个公共点</td><td>$\left[r_n,r_n+10^{-n}\right]$ 没有公共的有理点</td></tr>
<tr><td>Bolzano–Weierstrass 定理</td><td>有界数列有收敛子列</td><td>$\{r_n\}$ 没有在 $\Q$ 中收敛的子列</td></tr>
<tr><td>Cauchy 收敛原理</td><td>基本数列收敛</td><td>$\{r_n\}$ 是基本数列，在 $\Q$ 中不收敛</td></tr>
</table>
<x-note t="一个细节：Archimedes 性质">
<p>在由闭区间套定理推出 Bolzano–Weierstrass 定理、由 Cauchy 收敛原理推出确界存在定理这两步中，都用到了 $\frac1{2^n}\to0$，即 Archimedes 性质（<x-ref to="2-1/cor-arch"></x-ref>）。确界存在定理、单调有界定理和 Bolzano–Weierstrass 定理本身都蕴含 Archimedes 性质，但单独的闭区间套定理或 Cauchy 收敛原理推不出它：存在满足它们却不满足 Archimedes 性质的有序域。因此准确的说法是：在 Archimedes 性质成立的前提下，这些定理彼此等价。对实数系来说这当然没有问题。</p>
</x-note>
<x-hist>
<p>17—18 世纪的微积分建立在对“无穷小”的直观理解之上，实数的连续性被当作不言自明的事实。19 世纪，Bolzano（1817）在证明连续函数的介值定理时意识到需要实数的某种完备性；Cauchy 在《分析教程》（1821）中提出了用“各项彼此接近”来判断收敛的准则，但没有证明其充分性；Weierstrass 在柏林的讲课中使 $\eps$–$\delta$ 语言以及确界、聚点等概念系统化。1872 年，Dedekind 用切割、Cantor 用有理数的基本数列，各自从有理数出发严格地构造出了实数，实数的连续性从此成为可以证明的定理。这一过程被称为“分析的算术化”。以后还会遇到与这些定理等价的有限覆盖定理（Heine–Borel 定理）。</p>
</x-hist>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>单调有界数列必收敛（单调增加时极限是上确界），单调数列总有极限（有限或 $\pm\infty$）。研究递推数列：猜极限、证有界、证单调、取极限解方程，<em>先证存在再取极限</em>。</li>
<li>$\pi$ 是内接、外切正多边形半周长的公共极限。$e=\lim\left(1+\frac1n\right)^n=\lim\sum\limits_{k=0}^n\frac1{k!}$，$0<e-S_n<\frac1{n!\,n}$，$e$ 是无理数；$\frac1{n+1}<\ln\left(1+\frac1n\right)<\frac1n$；$H_n=\ln n+\gamma+\eps_n$，$\eps_n\to0$。</li>
<li>闭区间套定理：闭区间一个套一个、长度趋于 $0$，则恰有一个公共点。“闭”与实数系都不可少。</li>
<li>收敛数列的子列收敛于同一极限；两个子列极限不同 $\Rightarrow$ 发散；$x_n\to a\iff x_{2k}\to a$ 且 $x_{2k-1}\to a$。</li>
<li>Bolzano–Weierstrass 定理：有界数列必有收敛子列；任何数列都有极限点（可能是 $\pm\infty$）。</li>
<li>Cauchy 收敛原理：收敛 $\iff$ 基本数列。“相邻项之差趋于 $0$”不够；压缩条件 $|x_{n+1}-x_n|\le q|x_n-x_{n-1}|$（$0<q<1$ 为常数）保证收敛。</li>
<li>确界存在 $\Rightarrow$ 单调有界 $\Rightarrow$ 闭区间套 $\Rightarrow$ B–W $\Rightarrow$ Cauchy $\Rightarrow$ 确界存在：它们是实数系连续性的等价表述，在 $\Q$ 中全都不成立。</li>
</ul>
</x-sum>
`);
MA.add("2-4", String.raw`
<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对收敛准则的理解">
<x-q type="choice" answer="C">
<x-stem>下列说法中正确的是</x-stem>
<x-opt>单调数列必收敛</x-opt>
<x-opt>有界数列必收敛</x-opt>
<x-opt>单调有界数列必收敛</x-opt>
<x-opt>收敛数列必单调</x-opt>
<x-exp>单调数列可能趋于 $\pm\infty$（如 $x_n=n$）；有界数列可能振荡（如 $(-1)^n$）；收敛数列不必单调（如 $\frac{(-1)^n}n$）。只有“单调”与“有界”同时成立才保证收敛。</x-exp>
</x-q>
<x-q type="fill" answer="3">
<x-stem>设 $x_1=1$，$x_{n+1}=\sqrt{6+x_n}$。已知这个数列收敛，则 $\lim\limits_{n\to\infty}x_n=$ ____</x-stem>
<x-exp>设极限为 $a$，则 $a=\sqrt{6+a}$，$a^2-a-6=0$，$a=3$ 或 $a=-2$。由 $x_n>0$ 得 $a\ge0$，所以 $a=3$。数列依次为 $1,\ \allowbreak 2.6458,\ \allowbreak 2.9404,\ \allowbreak 2.9900,\ \allowbreak \cdots$，单调增加且以 $3$ 为上界（归纳：$x_n<3\Rightarrow x_{n+1}<\sqrt9=3$）。</x-exp>
</x-q>
<x-q type="fill" answer="e^3" ph="可输入表达式，如 e^2">
<x-stem>$\lim\limits_{n\to\infty}\left(1+\frac1n\right)^{3n}=$ ____</x-stem>
<x-exp>$\left(1+\frac1n\right)^{3n}=\left[\left(1+\frac1n\right)^n\right]^3\to e^3\approx20.0855$（乘积的极限运算法则）。</x-exp>
</x-q>
<x-q type="fill" answer="9">
<x-stem>用 $S_n=\sum\limits_{k=0}^n\frac1{k!}$ 近似 $e$。根据误差估计 $0<e-S_n<\frac1{n!\cdot n}$，要保证误差小于 $10^{-6}$，$n$ 最小取 ____</x-stem>
<x-exp>$8!\cdot8=322560<10^6$，$9!\cdot9=3265920>10^6$，所以取 $n=9$。实际误差 $e-S_8\approx3.06\times10^{-6}$，$e-S_9\approx3.03\times10^{-7}$，可见 $n=8$ 确实不够。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>开区间 $\left(0,\frac1n\right)$（$n=1,2,\cdots$）一个套一个，长度趋于 $0$。它们的公共部分 $\bigcap\limits_{n=1}^\infty\left(0,\frac1n\right)$ 是</x-stem>
<x-opt>$\{0\}$</x-opt>
<x-opt>$\varnothing$</x-opt>
<x-opt>某个正数组成的单点集</x-opt>
<x-opt>无法确定</x-opt>
<x-exp>若 $x$ 属于所有区间，则 $0<x<\frac1n$ 对一切 $n$ 成立，与 Archimedes 性质矛盾。闭区间套定理中的“闭”不能去掉：唯一可能的公共点 $0$ 恰好被挖掉了。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $\lim\limits_{k\to\infty}x_{2k}=\lim\limits_{k\to\infty}x_{2k-1}=a$，则 $\lim\limits_{n\to\infty}x_n=a$。</x-stem>
<x-exp>正确，见<x-ref to="prop-oddeven"></x-ref>。奇数项与偶数项合起来覆盖了数列的全部项，这是关键。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若数列 $\{x_n\}$ 的每一个子列都有收敛的子列，则 $\{x_n\}$ 有界。</x-stem>
<x-exp>正确。若 $\{x_n\}$ 无界，由<x-ref to="cor-unb"></x-ref>，它有趋于 $+\infty$ 或 $-\infty$ 的子列，这个子列的任何子列也趋于无穷，不可能收敛。结合 Bolzano–Weierstrass 定理：数列有界 $\iff$ 它的每个子列都有收敛的子列。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>若 $\lim\limits_{n\to\infty}(x_{n+1}-x_n)=0$，则 $\{x_n\}$</x-stem>
<x-opt>必收敛</x-opt>
<x-opt>必有界</x-opt>
<x-opt>不一定收敛，也不一定有界</x-opt>
<x-opt>必发散</x-opt>
<x-exp>$x_n=\sqrt n$ 满足条件，但无界、发散；$x_n=\frac1n$ 满足条件且收敛。Cauchy 收敛原理要求的是任意两项之差都小（$|x_{n+p}-x_n|$ 对一切 $p$ 都小），而不只是相邻两项之差。</x-exp>
</x-q>
<x-q type="multi" answer="AC">
<x-stem>下列数列中，哪些是基本数列（Cauchy 数列）？</x-stem>
<x-opt>$x_n=\sum\limits_{k=1}^n\frac1{k^2}$</x-opt>
<x-opt>$x_n=\sqrt n$</x-opt>
<x-opt>$x_n=\frac{(-1)^n}n$</x-opt>
<x-opt>$x_n=\sum\limits_{k=1}^n\frac1k$</x-opt>
<x-exp>在实数系中，基本数列就是收敛数列。A 收敛（<x-ref to="ex-basel"></x-ref>），C 收敛于 $0$；B 与 D 都趋于 $+\infty$（D 见<x-ref to="ex-harmc"></x-ref>）。</x-exp>
</x-q>
<x-q type="fill" answer="3">
<x-stem>数列 $\left\{\sin\frac{n\pi}3\right\}$ 共有 ____ 个极限点。</x-stem>
<x-exp>数列以 $6$ 为周期，依次取值 $\frac{\sqrt3}2,\ \allowbreak \frac{\sqrt3}2,\ \allowbreak 0,\ \allowbreak -\frac{\sqrt3}2,\ \allowbreak -\frac{\sqrt3}2,\ \allowbreak 0,\ \allowbreak \cdots$。每个值都被取到无穷多次，而其他数的小邻域中只有有限多项，所以极限点恰为 $\frac{\sqrt3}2,\ \allowbreak 0,\ \allowbreak -\frac{\sqrt3}2$ 三个。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>如果把讨论范围限制在有理数集 $\Q$ 内（数列的项和极限都必须是有理数），下列命题中仍然成立的是</x-stem>
<x-opt>单调有界数列必收敛</x-opt>
<x-opt>有界数列必有收敛子列</x-opt>
<x-opt>收敛数列必是基本数列</x-opt>
<x-opt>基本数列必收敛</x-opt>
<x-exp>C 的证明（<x-ref to="thm-cauchy"></x-ref>的必要性部分）只用到三角不等式，在 $\Q$ 中照样成立。A、B、D 的反例都是 $\sqrt2$ 的不足近似值数列 $\{r_n\}$：它单调有界，是基本数列，但在 $\Q$ 中没有极限，也没有在 $\Q$ 中收敛的子列。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若子列 $\{x_{2k}\}$ 与 $\{x_{3k}\}$ 都收敛于 $a$，则 $\{x_n\}$ 收敛于 $a$。</x-stem>
<x-exp>错误。这两个子列没有覆盖下标为 $6k\pm1$ 的项。例如：$n$ 与 $6$ 互素时 $x_n=1$，否则 $x_n=0$。则 $x_{2k}=x_{3k}=0$，但 $x_{6k+1}=1$，数列发散。对比<x-ref to="prop-oddeven"></x-ref>。</x-exp>
</x-q>
</x-quiz>
`);
MA.add("2-4", String.raw`
<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>

<x-prob level="基础" t="单调有界与递推数列">
<div><p>证明下列数列收敛，并求 (1)(2) 的极限：</p>
<p>(1) $x_1=1$，$x_{n+1}=\sqrt{3+2x_n}$；</p>
<p>(2) $0<x_1<1$，$x_{n+1}=x_n(2-x_n)$；</p>
<p>(3) $x_n=\sum\limits_{k=1}^n\frac1{3^k+1}$。</p></div>
<x-check answer="3">(1) 的极限</x-check>
<x-check answer="1">(2) 的极限</x-check>
<x-hint>(1) 用归纳法证明 $x_n<3$ 且 $x_n<x_{n+1}$。(2) 注意 $1-x_{n+1}=(1-x_n)^2$。(3) 单调增加是显然的，上界可以和几何级数比较。</x-hint>
<x-ans>
<p>(1) <b>有界</b>：$x_1=1<3$；若 $x_n<3$，则 $x_{n+1}<\sqrt{3+6}=3$。<b>单调</b>：$x_2=\sqrt5>x_1$；若 $x_n>x_{n-1}$，则 $x_{n+1}=\sqrt{3+2x_n}>\sqrt{3+2x_{n-1}}=x_n$。所以 $\{x_n\}$ 单调增加有上界，收敛。设极限为 $a$，则 $a\ge1$，$a^2=3+2a$，得 $a=3$（舍去 $a=-1$）。前几项为 $2.2361,\ \allowbreak 2.7335,\ \allowbreak 2.9098,\ \allowbreak 2.9698,\cdots$。</p>
<p>(2) 由 $1-x_{n+1}=1-2x_n+x_n^2=(1-x_n)^2$ 及 $0<1-x_1<1$，归纳得 $0<1-x_n<1$，即 $0<x_n<1$；于是 $x_{n+1}-x_n=x_n(1-x_n)>0$，数列单调增加且有上界 $1$，收敛。设极限为 $a$，则 $a\ge x_1>0$，由 $a=a(2-a)$ 得 $a=1$。事实上 $1-x_n=(1-x_1)^{2^{n-1}}$，收敛极快：$x_1=0.5$ 时，$x_2,x_3,x_4,x_5$ 依次为 $0.75,\ \allowbreak 0.9375,\ \allowbreak 0.99609,\ \allowbreak 0.999985$。</p>
<p>(3) $x_{n+1}-x_n=\frac1{3^{n+1}+1}>0$，且 $x_n<\sum\limits_{k=1}^n\frac1{3^k}=\frac12\left(1-\frac1{3^n}\right)<\frac12$，所以 $\{x_n\}$ 单调增加有上界，收敛。它的极限约为 $0.4040633$，没有简单的表达式——单调有界定理只断言极限存在，并不负责求出极限。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="与 $e$ 有关的极限">
<div><p>求下列极限：</p>
<p>(1) $\lim\limits_{n\to\infty}\left(1+\frac1n\right)^{n+3}$；　(2) $\lim\limits_{n\to\infty}\left(1+\frac1{2n}\right)^{3n}$；</p>
<p>(3) $\lim\limits_{n\to\infty}\left(\frac{n-1}{n+1}\right)^n$；　(4) $\lim\limits_{n\to\infty}\left(1-\frac1{2n}\right)^n$。</p></div>
<x-check answer="e" ph="可输入表达式，如 e^2">(1)</x-check>
<x-check answer="e^(3/2)" ph="可输入表达式，如 e^2">(2)</x-check>
<x-check answer="e^(-2)" ph="可输入表达式，如 e^2">(3)</x-check>
<x-check answer="e^(-1/2)" ph="可输入表达式，如 e^2">(4)</x-check>
<x-hint>把每个式子化成 $\left(1+\frac1m\right)^m$ 或 $\left(1-\frac1m\right)^m$ 的子列、乘积、商或幂。用到 $\left(1-\frac1n\right)^n\to\frac1e$（<x-ref to="ex-eminus"></x-ref>）。</x-hint>
<x-ans>
<p>(1) $\left(1+\frac1n\right)^{n+3}=\left(1+\frac1n\right)^n\left(1+\frac1n\right)^3\to e\cdot1=e$。</p>
<p>(2) $\left(1+\frac1{2n}\right)^{2n}$ 是 $\left\{\left(1+\frac1m\right)^m\right\}$ 的偶数项子列，趋于 $e$。而 $\left(1+\frac1{2n}\right)^{3n}=a_n\sqrt{a_n}$，其中 $a_n=\left(1+\frac1{2n}\right)^{2n}$，所以极限为 $e\sqrt e=e^{3/2}\approx4.4817$。</p>
<p>(3) $\frac{n-1}{n+1}=\frac{1-\frac1n}{1+\frac1n}$，所以 $\left(\frac{n-1}{n+1}\right)^n=\frac{\left(1-\frac1n\right)^n}{\left(1+\frac1n\right)^n}\to\frac{1/e}e=e^{-2}\approx0.1353$。</p>
<p>(4) $\left(1-\frac1{2n}\right)^n=\sqrt{\left(1-\frac1{2n}\right)^{2n}}\to\sqrt{\frac1e}=e^{-1/2}\approx0.6065$，这里 $\left(1-\frac1{2n}\right)^{2n}$ 是 $\left\{\left(1-\frac1m\right)^m\right\}$ 的偶数项子列。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="闭区间套定理的条件">
<div><p>下列区间列中，哪些满足闭区间套定理的条件？分别求出所有区间的公共部分：</p>
<p>(1) $\left[-\frac1n,\ 1+\frac1n\right]$；　(2) $\left[1-\frac1n,\ 1+\frac1n\right]$；　(3) $\left(1,\ 1+\frac1n\right)$；　(4) $[n,+\infty)$。</p></div>
<x-hint>逐条检查：是不是有限的闭区间？是否一个套一个？长度是否趋于 $0$？</x-hint>
<x-ans>
<p>闭区间套定理要求：每个区间都是有限的闭区间，一个套一个，且长度趋于 $0$。</p>
<p>(1) 区间是闭的且一个套一个，但长度 $1+\frac2n\to1\ne0$，不是闭区间套。公共部分是 $[0,1]$：$x$ 属于所有区间 $\iff-\frac1n\le x\le1+\frac1n$ 对一切 $n$ 成立 $\iff0\le x\le1$。</p>
<p>(2) 满足全部条件，公共点只有 $1$。</p>
<p>(3) 是开区间，不满足条件。公共部分是空集：若 $1<x<1+\frac1n$ 对一切 $n$ 成立，则 $0<x-1<\frac1n$，与 Archimedes 性质矛盾。</p>
<p>(4) $[n,+\infty)$ 是无穷区间，不满足条件。公共部分是空集：任何实数 $x$ 都小于某个正整数 $n$，从而 $x\notin[n,+\infty)$。</p>
<x-remark>(1) 说明：去掉“长度趋于 $0$”后，一个套一个的有限闭区间仍然有公共点——$\{a_n\}$ 单调增加、$\{b_n\}$ 单调减少，且 $a_n\le b_m$ 对一切 $n,m$ 成立，公共部分恰为闭区间 $\left[\lim a_n,\lim b_n\right]$——只是公共点不一定唯一。(3)(4) 说明“闭”与“有限”都不能去掉。</x-remark>
</x-ans>
</x-prob>

<x-prob level="基础" t="用子列判断发散">
<div><p>证明下列数列发散，并求出它们的全部极限点（包括 $\pm\infty$）：</p>
<p>(1) $x_n=(-1)^n\frac n{n+1}$；　(2) $x_n=\cos\frac{2n\pi}3$；</p>
<p>(3) $x_n=\left(1+\frac1n\right)^{(-1)^nn}$；　(4) $x_n=1+n\sin\frac{n\pi}2$。</p></div>
<x-hint>按下标的奇偶（或除以 $3$、$4$ 的余数）把数列分成几个子列，分别求极限。</x-hint>
<x-ans>
<p>先说明一个常用的事实：若把数列分成有限多个子列（每一项恰好属于其中一个），而每个子列都有极限（有限或无穷），则这些极限就是数列的全部极限点。这是因为数列的任一收敛子列必有无穷多项落在其中某一个子列里，这些项组成那个子列的子列，极限与那个子列的极限相同。</p>
<p>(1) $x_{2k}=\frac{2k}{2k+1}\to1$，$x_{2k-1}=-\frac{2k-1}{2k}\to-1$。两个子列的极限不同，数列发散（<x-ref to="cor-div"></x-ref>），极限点为 $\pm1$。</p>
<p>(2) 数列以 $3$ 为周期，依次取值 $-\frac12,\ -\frac12,\ 1,\cdots$：$x_{3k}=1$，$x_{3k-1}=x_{3k-2}=-\frac12$。数列发散，极限点为 $-\frac12$ 和 $1$。</p>
<p>(3) $x_{2k}=\left(1+\frac1{2k}\right)^{2k}\to e$，$x_{2k-1}=\left(1+\frac1{2k-1}\right)^{-(2k-1)}\to\frac1e$。数列发散，极限点为 $e$ 和 $\frac1e$。</p>
<p>(4) $n$ 为偶数时 $\sin\frac{n\pi}2=0$，$x_n=1$；$n=4k+1$ 时 $x_n=1+n\to+\infty$；$n=4k+3$ 时 $x_n=1-n\to-\infty$。数列发散，极限点为 $1$、$+\infty$、$-\infty$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="Cauchy 收敛原理的直接应用">
<div><p>用 Cauchy 收敛原理证明：</p>
<p>(1) $x_n=\sum\limits_{k=1}^n\frac{\cos k}{k(k+1)}$ 收敛；</p>
<p>(2) $x_n=\sum\limits_{k=1}^n\frac1{\sqrt k}$ 发散。</p></div>
<x-hint>(1) $\left|\frac{\cos k}{k(k+1)}\right|\le\frac1k-\frac1{k+1}$。(2) 估计 $x_{2n}-x_n$ 的下界。</x-hint>
<x-ans>
<p>(1) 由 $\left|\frac{\cos k}{k(k+1)}\right|\le\frac1{k(k+1)}=\frac1k-\frac1{k+1}$，对任意正整数 $n,p$，</p>
$$|x_{n+p}-x_n|\le\sum_{k=n+1}^{n+p}\left(\frac1k-\frac1{k+1}\right)=\frac1{n+1}-\frac1{n+p+1}<\frac1n.$$
<p>任给 $\eps>0$，取 $N=\left[\frac1\eps\right]$，当 $n>N$ 时 $\frac1n<\eps$，所以 $\{x_n\}$ 是基本数列，从而收敛（极限约为 $0.11827$）。</p>
<p>(2) 对任意 $n$，$x_{2n}-x_n=\sum\limits_{k=n+1}^{2n}\frac1{\sqrt k}\ge n\cdot\frac1{\sqrt{2n}}=\sqrt{\frac n2}\ge\frac1{\sqrt2}$。取 $\eps_0=\frac12$，对任意 $N$，取 $n=N+1$，$m=2n$，都有 $|x_m-x_n|\ge\eps_0$，所以 $\{x_n\}$ 不是基本数列，发散。</p>
<x-remark>(2) 中的数列单调增加，既然不收敛，就一定无界，即趋于 $+\infty$。更精确地，可以证明 $x_n-2\sqrt n$ 收敛（极限约为 $-1.4604$），也就是说 $x_n$ 大约像 $2\sqrt n$ 那样增长。</x-remark>
</x-ans>
</x-prob>
`);
MA.add("2-4", String.raw`
<x-prob level="提高" t="不单调的递推数列">
<div><p>设 $x_1=1$，$x_{n+1}=\frac1{2+x_n}$。证明 $\{x_n\}$ 收敛，并求其极限。</p></div>
<x-check answer="sqrt(2)-1" ph="可输入表达式或小数">极限值</x-check>
<x-hint>$f(x)=\frac1{2+x}$ 单调减少，数列不单调。可以证明 $|x_{n+1}-x_n|\le\frac14|x_n-x_{n-1}|$，也可以分别考察奇数项和偶数项。</x-hint>
<x-ans>
<p>由归纳法 $x_n>0$，所以 $(2+x_n)(2+x_{n-1})>4$，</p>
$$|x_{n+1}-x_n|=\left|\frac1{2+x_n}-\frac1{2+x_{n-1}}\right|=\frac{|x_n-x_{n-1}|}{(2+x_n)(2+x_{n-1})}\le\frac14|x_n-x_{n-1}|.$$
<p>由<x-ref to="prop-contr"></x-ref>（$q=\frac14$），$\{x_n\}$ 收敛。设极限为 $a$，则 $a\ge0$；在 $x_{n+1}(2+x_n)=1$ 中取极限得 $a(2+a)=1$，解得 $a=\sqrt2-1\approx0.4142136$。</p>
<x-remark>数列依次为 $1,\ \frac13,\ \frac37,\ \frac7{17},\ \frac{17}{41},\ \frac{41}{99},\cdots$：奇数项减少、偶数项增加，从两侧夹向极限（也可以根据这个观察，对奇、偶子列分别用单调有界定理）。它们加上 $1$ 就是 $\sqrt2$ 的有理近似，例如 $1+\frac{41}{99}=\frac{140}{99}\approx1.41414$。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="$\left(1+\frac kn\right)^n\to e^k$" id="pb-ek">
<div><p>设 $k$ 是正整数。</p>
<p>(1) 验证 $1+\frac kn=\prod\limits_{j=0}^{k-1}\left(1+\frac1{n+j}\right)$，并由此证明 $\lim\limits_{n\to\infty}\left(1+\frac kn\right)^n=e^k$；</p>
<p>(2) 证明 $\lim\limits_{n\to\infty}\left(1-\frac kn\right)^n=e^{-k}$。</p></div>
<x-check answer="e^3" ph="可输入表达式">k = 3 时 (1) 中的极限</x-check>
<x-hint>(1) 乘积是“裂项相消”的：$\frac{n+1}n\cdot\frac{n+2}{n+1}\cdots$。对每个固定的 $j$，$\left(1+\frac1{n+j}\right)^n=\left(1+\frac1{n+j}\right)^{n+j}\Big/\left(1+\frac1{n+j}\right)^j$。</x-hint>
<x-hint>(2) $1-\frac kn=\frac1{1+\frac k{n-k}}$。</x-hint>
<x-ans>
<p>(1) $\prod\limits_{j=0}^{k-1}\left(1+\frac1{n+j}\right)=\frac{n+1}n\cdot\frac{n+2}{n+1}\cdots\frac{n+k}{n+k-1}=\frac{n+k}n=1+\frac kn$。对每个固定的 $j$，</p>
$$\left(1+\frac1{n+j}\right)^n=\frac{\left(1+\frac1{n+j}\right)^{n+j}}{\left(1+\frac1{n+j}\right)^j}\to\frac e1=e,$$
<p>这里分子是 $\left\{\left(1+\frac1m\right)^m\right\}$ 把下标平移了 $j$ 位，极限仍为 $e$；分母是 $j$ 个趋于 $1$ 的因子之积。于是 $\left(1+\frac kn\right)^n$ 是 $k$ 个（个数固定）趋于 $e$ 的因子之积，极限为 $e^k$。</p>
<p>(2) 当 $n>k$ 时，$1-\frac kn=\frac{n-k}n=\frac1{1+\frac k{n-k}}$。记 $m=n-k$，则</p>
$$\left(1-\frac kn\right)^n=\frac1{\left(1+\frac km\right)^m\left(1+\frac km\right)^k}\to\frac1{e^k\cdot1}=e^{-k}.$$
<x-remark>$k=1$ 时 (2) 就是<x-ref to="ex-eminus"></x-ref>的 (1)，而那里 (2) 的拆分方法正是本题 $k=2$ 的情形。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="极限点的邻域刻画" id="pb-limpt">
<div><p>设 $\xi$ 是有限数，$\{x_n\}$ 是数列。</p>
<p>(1) 证明：$\xi$ 是 $\{x_n\}$ 的极限点的充分必要条件是，对任意 $\eps>0$，都有无穷多个下标 $n$ 使 $x_n\in O(\xi,\eps)$；</p>
<p>(2) 设 $\xi_1,\xi_2,\cdots$ 都是 $\{x_n\}$ 的极限点，且 $\xi_k\to\xi$。证明 $\xi$ 也是 $\{x_n\}$ 的极限点。</p></div>
<x-hint>(1) 充分性：依次在 $O(\xi,1)$，$O\left(\xi,\frac12\right)$，$O\left(\xi,\frac13\right),\cdots$ 中挑选下标越来越大的项。(2) 用 (1)，注意 $O\left(\xi_k,\frac\eps2\right)\subset O(\xi,\eps)$ 当 $|\xi_k-\xi|<\frac\eps2$。</x-hint>
<x-ans>
<p>(1) <b>必要性。</b>设 $x_{n_k}\to\xi$。任给 $\eps>0$，存在 $K$，当 $k>K$ 时 $x_{n_k}\in O(\xi,\eps)$，而下标 $n_{K+1}<n_{K+2}<\cdots$ 有无穷多个。</p>
<p><b>充分性。</b>取 $n_1$ 使 $x_{n_1}\in O(\xi,1)$。假设已取出 $n_1<n_2<\cdots<n_k$，由于使 $x_n\in O\left(\xi,\frac1{k+1}\right)$ 的下标 $n$ 有无穷多个，其中必有大于 $n_k$ 的，取一个作为 $n_{k+1}$。这样得到子列 $\{x_{n_k}\}$，满足 $|x_{n_k}-\xi|<\frac1k$，所以 $x_{n_k}\to\xi$。</p>
<p>(2) 任给 $\eps>0$，取 $k$ 使 $|\xi_k-\xi|<\frac\eps2$。由 (1)，有无穷多个下标 $n$ 使 $x_n\in O\left(\xi_k,\frac\eps2\right)$；而 $O\left(\xi_k,\frac\eps2\right)\subset O(\xi,\eps)$，所以也有无穷多个下标 $n$ 使 $x_n\in O(\xi,\eps)$。再由 (1)，$\xi$ 是极限点。</p>
<x-remark>“无穷多个下标”不能换成“无穷多个不同的值”：常数数列 $x_n\equiv1$ 只取一个值，但 $1$ 是它的极限点。(2) 说明“极限点的极限仍是极限点”，后面讨论上、下极限时要用到。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="取平均的递推数列">
<div><p>设 $x_1=a$，$x_2=b$，$x_{n+2}=\frac{x_n+x_{n+1}}2$（$n=1,2,\cdots$）。</p>
<p>(1) 证明 $\{x_n\}$ 收敛；(2) 用 $a,b$ 表示它的极限；(3) 求 $a=0$，$b=1$ 时的极限。</p></div>
<x-check answer="2/3">(3) 的极限</x-check>
<x-hint>考察相邻两项之差的关系；再找一个与 $n$ 无关的量，例如 $x_{n+1}+\lambda x_n$。</x-hint>
<x-ans>
<p>(1) 由递推式，$x_{n+2}-x_{n+1}=\frac{x_n+x_{n+1}}2-x_{n+1}=-\frac12(x_{n+1}-x_n)$，所以 $|x_{n+2}-x_{n+1}|=\frac12|x_{n+1}-x_n|$。由<x-ref to="prop-contr"></x-ref>（$q=\frac12$），$\{x_n\}$ 收敛。</p>
<p>(2) 注意 $x_{n+2}+\frac12x_{n+1}=\frac{x_n+x_{n+1}}2+\frac12x_{n+1}=x_{n+1}+\frac12x_n$，即 $x_{n+1}+\frac12x_n$ 与 $n$ 无关，恒等于 $x_2+\frac12x_1=b+\frac a2$。设极限为 $L$，令 $n\to\infty$ 得 $\frac32L=b+\frac a2$，所以 $L=\frac{a+2b}3$。</p>
<p>(3) $L=\frac23$。</p>
<x-remark>也可以直接求和：$x_{n+1}-x_n=\left(-\frac12\right)^{n-1}(b-a)$，所以 $x_n=a+(b-a)\sum\limits_{k=0}^{n-2}\left(-\frac12\right)^k\to a+\frac23(b-a)$。几何上，每次取数轴上前两个点的中点，这些点左右跳动，最终收敛到 $a,b$ 之间靠近 $b$ 的三等分点。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="交错调和数列的和">
<div><p>(1) 利用<x-ref to="prop-ln"></x-ref>证明 $\lim\limits_{n\to\infty}\left(\frac1{n+1}+\frac1{n+2}+\cdots+\frac1{2n}\right)=\ln2$；</p>
<p>(2) 记 $S_n=1-\frac12+\frac13-\cdots+\frac{(-1)^{n+1}}n$，证明 $S_{2n}=\frac1{n+1}+\frac1{n+2}+\cdots+\frac1{2n}$；</p>
<p>(3) 证明 $\lim\limits_{n\to\infty}S_n=\ln2$。</p></div>
<x-check answer="ln(2)" ph="可输入表达式或小数">(3) 的极限</x-check>
<x-hint>(1) 由<x-ref to="prop-ln"></x-ref>，$\ln\frac{k+1}k<\frac1k<\ln\frac k{k-1}$（$k\ge2$），对 $k=n+1,\cdots,2n$ 求和。</x-hint>
<x-hint>(2) $S_{2n}=H_{2n}-2\left(\frac12+\frac14+\cdots+\frac1{2n}\right)$。(3) 再看奇数项 $S_{2n-1}=S_{2n}+\frac1{2n}$。</x-hint>
<x-ans>
<p>(1) 由<x-ref to="prop-ln"></x-ref>，$\frac1k>\ln\left(1+\frac1k\right)=\ln\frac{k+1}k$；把其中的 $\frac1{n+1}<\ln\left(1+\frac1n\right)$ 中的 $n$ 换成 $k-1$，得 $\frac1k<\ln\frac k{k-1}$（$k\ge2$）。对 $k=n+1,\cdots,2n$ 求和，记 $T_n=\sum\limits_{k=n+1}^{2n}\frac1k$，得</p>
$$\ln\frac{2n+1}{n+1}<T_n<\ln\frac{2n}n=\ln2.$$
<p>而 $\ln2-\ln\frac{2n+1}{n+1}=\ln\left(1+\frac1{2n+1}\right)<\frac1{2n+1}$，所以 $0<\ln2-T_n<\frac1{2n+1}$，由夹逼得 $T_n\to\ln2$。</p>
<p>(2) $S_{2n}=\left(1+\frac12+\cdots+\frac1{2n}\right)-2\left(\frac12+\frac14+\cdots+\frac1{2n}\right)=H_{2n}-H_n=T_n$。</p>
<p>(3) $S_{2n}=T_n\to\ln2$，$S_{2n-1}=S_{2n}+\frac1{2n}\to\ln2$，由<x-ref to="prop-oddeven"></x-ref>，$S_n\to\ln2$。</p>
<x-remark>(1) 也可以由<x-ref to="ex-gamma"></x-ref>得到：$H_{2n}-H_n=\ln2+\eps_{2n}-\eps_n\to\ln2$。收敛相当慢：$T_{10}\approx0.668771$，$T_{100}\approx0.690653$，$T_{1000}\approx0.692897$，误差大约是 $\frac1{4n}$；而 $\ln2\approx0.693147$。以后在级数理论中会看到，把交错调和数列的各项重新排列次序，可以改变它的极限。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="开立方的迭代法">
<div><p>设 $x_1=1$，$x_{n+1}=\frac13\left(2x_n+\frac2{x_n^2}\right)$。证明 $\{x_n\}$ 收敛于 $\sqrt[3]2$。</p></div>
<x-check answer="2^(1/3)" tol="1e-4" ph="可输入表达式或小数">极限值</x-check>
<x-hint>对三个数 $x_n,\ x_n,\ \frac2{x_n^2}$ 用平均值不等式（<x-ref to="1-2/thm-amgm"></x-ref>），证明 $n\ge2$ 时 $x_n\ge\sqrt[3]2$；再证明从第二项起数列单调减少。</x-hint>
<x-ans>
<p>归纳可知 $x_n>0$。由三个数的平均值不等式，</p>
$$x_{n+1}=\frac{x_n+x_n+\frac2{x_n^2}}3\ge\sqrt[3]{x_n\cdot x_n\cdot\frac2{x_n^2}}=\sqrt[3]2,$$
<p>所以 $n\ge2$ 时 $x_n\ge\sqrt[3]2$。于是 $n\ge2$ 时 $x_{n+1}-x_n=\frac{2-x_n^3}{3x_n^2}\le0$，数列从第二项起单调减少且有下界 $\sqrt[3]2$，收敛。设极限为 $a$，则 $a\ge\sqrt[3]2>0$，且 $a=\frac13\left(2a+\frac2{a^2}\right)$，即 $a^3=2$，$a=\sqrt[3]2$。</p>
<p>数值上，$x_2=\frac43\approx1.3333333$，$x_3=\frac{91}{72}\approx1.2638889$，$x_4\approx1.2599335$，$x_5\approx1.2599211$，而 $\sqrt[3]2=1.2599210\cdots$。</p>
<x-remark>这是第五章将要学习的 Newton 迭代法用于方程 $x^3=2$ 的结果。一般地，$x_{n+1}=\frac1k\left((k-1)x_n+\frac a{x_n^{k-1}}\right)$ 收敛于 $\sqrt[k]a$，与 Heron 开方法（<x-ref to="ex-heron"></x-ref>）一样，每迭代一次有效数字大约翻倍。</x-remark>
</x-ans>
</x-prob>
`);
MA.add("2-4", String.raw`
<x-prob level="挑战" t="趋于 0 的速度">
<div><p>(1) 设 $0<x_1<1$，$x_{n+1}=x_n(1-x_n)$。证明 $\lim\limits_{n\to\infty}x_n=0$，并且 $\lim\limits_{n\to\infty}nx_n=1$；</p>
<p>(2) 设 $x_1=1$，$x_{n+1}=\frac{x_n}{1+x_n^2}$。求 $\lim\limits_{n\to\infty}\sqrt n\,x_n$。</p></div>
<x-check answer="1">(1) 中 n·xₙ 的极限</x-check>
<x-check answer="1/sqrt(2)" tol="1e-4" ph="可输入表达式">(2) 的极限</x-check>
<x-hint>先证明两个数列都单调减少地趋于 $0$。</x-hint>
<x-hint>(1) 计算 $\frac1{x_{n+1}}-\frac1{x_n}$，再对 $\frac n{1/x_n}$ 用 Stolz 定理。(2) 计算 $\frac1{x_{n+1}^2}-\frac1{x_n^2}$。</x-hint>
<x-ans>
<p>(1) 归纳可得 $0<x_n<1$：若 $0<x_n<1$，则 $0<x_{n+1}=x_n(1-x_n)<x_n<1$。于是 $\{x_n\}$ 单调减少、有下界 $0$，收敛。设极限为 $a$，则 $a=a(1-a)$，得 $a=0$。</p>
<p>由此 $y_n=\frac1{x_n}$ 严格单调增加且趋于 $+\infty$（<x-ref to="2-3/thm-recip"></x-ref>），并且</p>
$$y_{n+1}-y_n=\frac1{x_n(1-x_n)}-\frac1{x_n}=\frac1{1-x_n}\to1.$$
<p>由 Stolz 定理（<x-ref to="2-3/thm-stolz"></x-ref>），</p>
$$\lim_{n\to\infty}nx_n=\lim_{n\to\infty}\frac n{y_n}=\lim_{n\to\infty}\frac{(n+1)-n}{y_{n+1}-y_n}=\lim_{n\to\infty}(1-x_n)=1.$$
<p>(2) 同样，$x_n>0$ 且 $x_{n+1}<x_n$，数列单调减少有下界，极限 $a$ 满足 $a=\frac a{1+a^2}$，得 $a=0$。令 $y_n=\frac1{x_n^2}$，则</p>
$$y_{n+1}-y_n=\frac{(1+x_n^2)^2}{x_n^2}-\frac1{x_n^2}=2+x_n^2\to2.$$
<p>由 Stolz 定理，$\lim\limits_{n\to\infty}\frac{y_n}n=\lim\limits_{n\to\infty}\frac{y_{n+1}-y_n}{(n+1)-n}=2$，所以 $nx_n^2=\frac n{y_n}\to\frac12$，$\sqrt n\,x_n\to\frac1{\sqrt2}$。</p>
<x-remark>两题的共同思路是：找一个变换 $y_n$（取倒数、取倒数的平方），使差 $y_{n+1}-y_n$ 趋于常数，再用 Stolz 定理。§2.3 习题中 $x_{n+1}=x_n+\frac1{x_n}$ 用的也是这个方法（那里是取平方）。数值上，(1) 中取 $x_1=0.5$，$n=10^5$ 时 $nx_n\approx0.99988$；(2) 中 $n=10^6$ 时 $\sqrt n\,x_n\approx0.707106$，而 $\frac1{\sqrt2}\approx0.707107$。有趣的是 (1) 的结论与初值 $x_1$ 无关：数列“忘记”了自己从哪里出发。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="上极限与下极限" id="pb-limsup">
<div><p>设 $\{x_n\}$ 有界，$E$ 为它的全体极限点组成的集合。证明：</p>
<p>(1) $E$ 非空有界，且 $\sup E\in E$，$\inf E\in E$，即 $E$ 中有最大数和最小数（它们就是上极限 $\varlimsup\limits_{n\to\infty}x_n$ 与下极限 $\varliminf\limits_{n\to\infty}x_n$）；</p>
<p>(2) $\{x_n\}$ 收敛的充分必要条件是 $\varlimsup\limits_{n\to\infty}x_n=\varliminf\limits_{n\to\infty}x_n$。</p></div>
<x-hint>(1) 用上确界的定义取 $\xi_k\in E$ 使 $\xi_k\to\sup E$，再用<x-ref to="pb-limpt"></x-ref>的 (2)。(2) 用<x-ref to="ex-sublim"></x-ref>。</x-hint>
<x-ans>
<p>(1) 由 Bolzano–Weierstrass 定理，$E\ne\varnothing$。若 $m\le x_n\le M$ 对一切 $n$ 成立，则由极限的保序性，每个极限点都在 $[m,M]$ 中，所以 $E$ 有界。记 $\xi^*=\sup E$。由上确界的定义，对每个 $k$ 有 $\xi_k\in E$ 满足 $\xi^*-\frac1k<\xi_k\le\xi^*$，于是 $\xi_k\to\xi^*$。由<x-ref to="pb-limpt"></x-ref>的 (2)，$\xi^*\in E$。同理 $\inf E\in E$。</p>
<p>(2) 若 $x_n\to a$，由<x-ref to="thm-sub"></x-ref>，每个子列都收敛于 $a$，所以 $E=\{a\}$，上、下极限都等于 $a$。反之，若 $\sup E=\inf E=a$，则 $E=\{a\}$，即 $\{x_n\}$ 的每个收敛子列都收敛于 $a$，由<x-ref to="ex-sublim"></x-ref>，$x_n\to a$。</p>
<x-remark>例如 $\left\{(-1)^n+\frac1n\right\}$ 的 $E=\{-1,1\}$；$\left\{\sin\frac{n\pi}3\right\}$ 的 $E=\left\{-\frac{\sqrt3}2,0,\frac{\sqrt3}2\right\}$。上、下极限对一切有界数列都存在，把“极限”的概念推广到了不收敛的数列，以后研究级数的收敛判别法时会用到。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="有界变差数列">
<div><p>(1) 设存在常数 $M$，使得对一切 $n$ 都有 $\sum\limits_{k=1}^n|x_{k+1}-x_k|\le M$。证明 $\{x_n\}$ 收敛。</p>
<p>(2) 收敛数列是否一定满足 (1) 中的条件？</p></div>
<x-hint>记 $s_n=\sum\limits_{k=1}^n|x_{k+1}-x_k|$，它单调增加有上界。比较 $|x_{n+p}-x_n|$ 与 $s_{n+p-1}-s_{n-1}$。(2) 考虑 $\frac{(-1)^n}n$。</x-hint>
<x-ans>
<p>(1) 记 $s_n=\sum\limits_{k=1}^n|x_{k+1}-x_k|$，$\{s_n\}$ 单调增加且有上界 $M$，所以收敛，从而是基本数列：任给 $\eps>0$，存在 $N$，当 $m>n>N$ 时 $s_m-s_n<\eps$。于是当 $n>N+1$ 时，对一切正整数 $p$，</p>
$$|x_{n+p}-x_n|\le\sum_{k=n}^{n+p-1}|x_{k+1}-x_k|=s_{n+p-1}-s_{n-1}<\eps,$$
<p>所以 $\{x_n\}$ 是基本数列，从而收敛。</p>
<p>(2) 不一定。$x_n=\frac{(-1)^n}n\to0$，但 $|x_{k+1}-x_k|=\frac1{k+1}+\frac1k>\frac1k$，所以 $\sum\limits_{k=1}^n|x_{k+1}-x_k|>H_n\to+\infty$。</p>
<x-remark>单调有界数列（此时 $\sum\limits_{k=1}^n|x_{k+1}-x_k|=|x_{n+1}-x_1|$）和满足压缩条件的数列（此时和不超过 $\frac{|x_2-x_1|}{1-q}$）都满足 (1) 中的条件，所以本题同时推广了单调有界定理和<x-ref to="prop-contr"></x-ref>。满足这个条件的数列称为<em>有界变差数列</em>，它总可以写成两个单调增加的有界数列之差。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="计算器上的 cos 键与 Kepler 方程">
<div><p>(1) 在计算器上（弧度制）随便输入一个数，然后反复按 cos 键，显示的数很快稳定下来。设 $x_1=1$，$x_{n+1}=\cos x_n$，证明 $\{x_n\}$ 收敛，并求极限的近似值（精确到 $10^{-6}$）。</p>
<p>(2) 某彗星轨道的离心率 $e=0.9$。取平近点角 $M=0.1$，用迭代 $E_{k+1}=0.1+0.9\sin E_k$（$E_1=0.1$）求 Kepler 方程 $E-0.9\sin E=0.1$ 的解（精确到 $10^{-4}$），并与<x-ref to="ex-kepler"></x-ref>比较收敛的快慢。</p></div>
<x-check answer="0.7390851" tol="1e-6">(1) 极限的近似值</x-check>
<x-check answer="0.6308435" tol="1e-4">(2) 方程的解 E</x-check>
<x-hint>(1) 从第二项起各项都在 $[0,1]$ 中；在 $[0,1]$ 上，$|\cos x-\cos y|\le\sin1\cdot|x-y|$。</x-hint>
<x-hint>数值计算可以用电子表格，也可以在本节的蛛网图演示中选择“自定义”，输入迭代函数。</x-hint>
<x-ans>
<p>(1) $\cos x$ 在 $[0,1]$ 上单调减少，把 $[0,1]$ 映到 $[\cos1,1]\subset[0,1]$，而 $x_1=1$，所以一切 $x_n\in[0,1]$。对 $x,y\in[0,1]$，</p>
$$|\cos x-\cos y|=2\left|\sin\frac{x+y}2\right|\left|\sin\frac{x-y}2\right|\le2\sin1\cdot\frac{|x-y|}2=\sin1\cdot|x-y|,$$
<p>这里用到 $\frac{x+y}2\in[0,1]$ 时 $0\le\sin\frac{x+y}2\le\sin1$，以及 $|\sin t|\le|t|$。于是 $|x_{n+1}-x_n|\le\sin1\cdot|x_n-x_{n-1}|$，而 $q=\sin1\approx0.8415<1$，由<x-ref to="prop-contr"></x-ref>，$\{x_n\}$ 收敛。设极限为 $\xi$，由 $|\cos x_n-\cos\xi|\le|x_n-\xi|\to0$，在递推式中取极限得 $\xi=\cos\xi$，$\xi\approx0.7390851$。</p>
<p>(2) 迭代得 $E^*\approx0.6308435$。从 $E_1=0.1$ 出发，要到第 $60$ 项左右误差才小于 $10^{-8}$；而<x-ref to="ex-kepler"></x-ref>（$e=0.5$，$M=1$）只要 $7$ 项左右，地球轨道（$e=0.0167$，$M=1$）只要 $4$ 项。</p>
<x-remark>压缩常数 $q$ 只是一个上界，实际的收敛快慢由极限附近的“局部压缩率”决定：对 $\cos x$ 是 $\sin\xi\approx0.674$，从 $x_1=1$ 出发要到 $x_{33}$ 误差才小于 $10^{-6}$；对 Kepler 迭代是 $e|\cos E^*|$，(2) 中约为 $0.727$，在<x-ref to="ex-kepler"></x-ref>中只有约 $0.036$。学了导数以后会明白，这个比率就是迭代函数在极限点处导数的绝对值。$0.7390851\cdots$ 这个数有时被称为 Dottie 数。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="种群模型中的“大小年”">
<div><p>生态学中常用 Logistic 模型 $x_{n+1}=rx_n(1-x_n)$ 描述种群数量的逐年变化，其中 $x_n\in(0,1)$ 表示第 $n$ 年的种群数量与环境容量之比，$r$ 是增长参数。取 $x_1=0.1$。</p>
<p>(1) $r=2.5$ 时，计算前若干项，猜出极限，并说明它满足的方程；</p>
<p>(2) $r=3.2$ 时，数列不收敛，但它的奇数项子列和偶数项子列分别收敛。求这两个极限（即数列的两个极限点）；</p>
<p>(3) 证明 (2) 中的两个极限 $p,q$ 满足 $q=rp(1-p)$，$p=rq(1-q)$，并由此求出它们的精确值。</p></div>
<x-check answer="0.6">(1) 的极限</x-check>
<x-check answer="0.5130445" tol="1e-4">(2) 奇数项子列的极限</x-check>
<x-check answer="0.7994555" tol="1e-4">(2) 偶数项子列的极限</x-check>
<x-hint>(3) $x_{2k}=f(x_{2k-1})$，$x_{2k+1}=f(x_{2k})$，其中 $f(x)=rx(1-x)$，两边取极限。把两个方程相减可以求出 $p+q$。</x-hint>
<x-ans>
<p>(1) 数列依次为 $0.1,\ \allowbreak 0.225,\ \allowbreak 0.4359,\ \allowbreak 0.6147,\ \allowbreak 0.5921,\ \allowbreak 0.6038,\ \allowbreak 0.5981,\ \allowbreak 0.6010,\cdots$，在 $0.6$ 两侧摆动并趋于 $0.6$。若极限 $a\ne0$，由 $a=2.5a(1-a)$ 得 $a=1-\frac1{2.5}=0.6$：种群稳定在环境容量的 $60\%$。</p>
<p>(2) 数列依次为 $0.1,\ \allowbreak 0.2880,\ \allowbreak 0.6562,\ \allowbreak 0.7219,\ \allowbreak 0.6424,\ \allowbreak 0.7351,\ \allowbreak 0.6231,\ \allowbreak 0.7515,\ \allowbreak 0.5975,\ \allowbreak 0.7696,\cdots$。从第 $3$ 项起奇数项减少，偶数项一直增加，分别趋于 $p\approx0.5130445$ 与 $q\approx0.7994555$：种群在“小年”和“大年”之间交替。</p>
<p>(3) 记 $f(x)=rx(1-x)$，则 $x_{2k}=f(x_{2k-1})$，$x_{2k+1}=f(x_{2k})$。令 $k\to\infty$，由极限的四则运算得 $q=f(p)$，$p=f(q)$。两式相减：</p>
$$q-p=r\left[(p-q)-(p^2-q^2)\right]=r(p-q)(1-p-q).$$
<p>由于 $p\ne q$（否则由<x-ref to="prop-oddeven"></x-ref>数列收敛），得 $p+q=1+\frac1r$。代入 $q=rp-rp^2$，得 $rp^2-(r+1)p+\left(1+\frac1r\right)=0$；同理 $q$ 也满足这个方程，所以 $p,q$ 是它的两个根：</p>
$$p,\ q=\frac{r+1\mp\sqrt{(r+1)(r-3)}}{2r}.$$
<p>$r=3.2$ 时，$p,\ q=\frac{4.2\mp\sqrt{0.84}}{6.4}$，即 $p\approx0.5130445$，$q\approx0.7994555$。</p>
<x-remark>公式说明只有 $r>3$ 时才会出现这种周期为 $2$ 的振荡。$r$ 继续增大，会依次出现周期 $4,8,16,\cdots$ 的振荡；$r$ 超过约 $3.57$ 后，数列可以变得毫无规律（称为<em>混沌</em>），并且对初值极其敏感。本节蛛网图演示中的两个 Logistic 预设分别展示了 $r=3.2$ 与 $r=3.9$ 的情形。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="二分法求根与查找故障版本">
<div><p>(1) 方程 $x^3+x-1=0$ 在 $[0,1]$ 中有唯一的根。从 $[0,1]$ 出发用二分法，至少要二分多少次，才能使所得区间的长度小于 $10^{-4}$？求出这个根的近似值。</p>
<p>(2) 某软件依次发布了 $500$ 个版本，已知第 $1$ 个版本正常、第 $500$ 个版本有故障，并且故障一旦出现就一直存在。为了找出第一个出故障的版本，每次测试一个版本。用二分的办法，最多需要测试多少次？</p></div>
<x-check answer="14">(1) 二分次数</x-check>
<x-check answer="0.6823278" tol="1e-4">(1) 根的近似值</x-check>
<x-check answer="9">(2) 最多测试次数</x-check>
<x-hint>(1) 二分 $k$ 次后区间长度为 $\frac1{2^k}$。(2) 第一个出故障的版本有多少种可能？每测试一次，可能的范围至少缩小到原来的多少？</x-hint>
<x-ans>
<p>(1) $f(x)=x^3+x-1$ 严格单调增加，$f(0)=-1<0$，$f(1)=1>0$，根唯一。二分 $k$ 次后区间长度为 $\frac1{2^k}$，要使 $\frac1{2^k}<10^{-4}$，即 $2^k>10^4$。由 $2^{13}=8192$，$2^{14}=16384$，至少要二分 $14$ 次，此时区间为 $[0.682312,\ 0.682373]$ 左右。根约为 $0.6823278$。</p>
<p>(2) 第一个出故障的版本只可能是第 $2$～$500$ 个，共 $499$ 种可能。每次测试中间的版本，可能的范围缩小到原来的一半（向上取整）：$499\to250\to125\to63\to32\to16\to8\to4\to2\to1$，共 $9$ 次。一般地，$m$ 种可能需要 $\left\lceil\log_2m\right\rceil$ 次；逐个测试则最坏要测 $498$ 次。</p>
<x-remark>二分法每一步都得到一个闭区间，它们构成闭区间套，这正是闭区间套定理的算法版本。git 的 bisect 命令就是按 (2) 的方式帮助程序员定位引入故障的提交。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="名义年利率与实际年利率">
<div><p>某信用卡分期的名义年利率为 $18\%$，按月计息，即每月利率为 $1.5\%$，利息计入本金。</p>
<p>(1) 借款一年不还，本息和是本金的多少倍？实际年利率是多少？</p>
<p>(2) 若改为按天计息（一年按 $365$ 天计，日利率为 $\frac{18\%}{365}$），或者“连续计息”（每年计息 $m$ 次，令 $m\to\infty$），实际年利率分别是多少？</p>
<p>(3) 证明：对任意 $r>0$，数列 $\left(1+\frac rm\right)^m$（$m=1,2,\cdots$）严格单调增加且有上界。这说明计息越频繁，实际利率越高，但有一个上限。</p></div>
<x-check answer="1.015^12" tol="1e-4">(1) 本息和是本金的倍数</x-check>
<x-check answer="(1+0.18/365)^365-1" tol="1e-4">(2) 按天计息的实际年利率（小数）</x-check>
<x-check answer="e^0.18-1" tol="1e-4">(2) 连续计息的实际年利率（小数）</x-check>
<x-hint>(3) 仿照<x-ref to="1-2/ex-e-mono"></x-ref>，对 $m$ 个 $1+\frac rm$ 和一个 $1$ 用平均值不等式。上界：取正整数 $k\ge r$，利用<x-ref to="pb-ek"></x-ref>。</x-hint>
<x-ans>
<p>(1) $1.015^{12}\approx1.19562$，实际年利率约为 $19.56\%$，比名义利率高出约 $1.56$ 个百分点。</p>
<p>(2) 按天计息：$\left(1+\frac{0.18}{365}\right)^{365}-1\approx0.197164$，约为 $19.72\%$。连续计息：$e^{0.18}-1\approx0.197217$，也约为 $19.72\%$。按天计息已经和连续计息相差无几。</p>
<p>(3) 对 $m$ 个 $1+\frac rm$ 和一个 $1$ 用平均值不等式（这 $m+1$ 个数不全相等，所以不等号是严格的）：</p>
$$\left(1+\frac rm\right)^m\cdot1<\left(\frac{m\left(1+\frac rm\right)+1}{m+1}\right)^{m+1}=\left(1+\frac r{m+1}\right)^{m+1}.$$
<p>取正整数 $k\ge r$，则 $\left(1+\frac rm\right)^m\le\left(1+\frac km\right)^m$。由刚才的结论（取 $r=k$），$\left(1+\frac km\right)^m$ 关于 $m$ 单调增加，而由<x-ref to="pb-ek"></x-ref>它趋于 $e^k$，所以 $\left(1+\frac km\right)^m\le e^k$。因此 $\left(1+\frac rm\right)^m\le e^k$，数列单调有界，必有极限。第三章将证明这个极限就是 $e^r$，所以连续计息时的实际年利率为 $e^r-1$。</p>
<x-remark>金融上把 $18\%$ 称为名义年利率，把 $19.56\%$ 称为实际年利率（有效年利率）。比较不同的贷款或理财产品时，应当比较实际年利率。</x-remark>
</x-ans>
</x-prob>
`);
