/* 第一章 §2 映射与函数：讲解、例题与习题均为自编，编号与教材不一定一致 */
MA.add("1-2", String.raw`
<x-goal>
<ul>
<li>理解映射的定义与要素，会判断单射、满射、双射，会求逆映射与复合映射，掌握像与原像的运算性质；</li>
<li>掌握函数的概念、自然定义域以及“两个函数相等”的含义；</li>
<li>熟悉基本初等函数和双曲函数的定义、图像与性质；</li>
<li>了解函数的分段、隐式、参数与极坐标表示，熟悉符号函数、取整函数、Dirichlet 函数和 Riemann 函数；</li>
<li>会写有界性、单调性、奇偶性、周期性的定义及其否定形式；</li>
<li>掌握三角不等式、Bernoulli 不等式与平均值不等式，并能用来做估计、求最值。</li>
</ul>
</x-goal>

<p>上一节建立了集合的语言，这一节用它来精确地描述“对应”。“函数”这个词从初中就开始用了，但直到 19 世纪，数学家们对“什么是函数”还争论不休：Euler 起初认为函数就是一个解析表达式，而 Fourier 用三角级数表示“任意”函数的工作迫使人们接受更一般的观点。今天的定义——<em>集合之间的对应法则</em>——是由 Dirichlet 等人逐步确立的。它看上去很抽象，却正是数学分析能够处理各种“奇怪”函数的基础。</p>

<h2 id="map">映射</h2>

<x-def t="映射" id="def-map">
设 $X$、$Y$ 是两个非空集合。若存在一个法则 $f$，使得对 $X$ 中的<em>每一个</em>元素 $x$，按法则 $f$，在 $Y$ 中有<em>唯一确定</em>的元素 $y$ 与之对应，则称 $f$ 是从 $X$ 到 $Y$ 的一个<em>映射</em>，记作
$$f:X\to Y,\qquad x\mapsto y=f(x).$$
$y$ 称为 $x$ 在 $f$ 下的<em>像</em>，$x$ 称为 $y$ 的一个<em>原像</em>（或逆像）。$X$ 称为 $f$ 的<em>定义域</em>，记作 $D_f$；全体像组成的集合 $R_f=f(X)=\{f(x)\mid x\in X\}$ 称为 $f$ 的<em>值域</em>。
</x-def>

<p>理解映射要抓住三点：</p>
<ul>
<li><b>处处有定义</b>：$X$ 中<em>每个</em>元素都必须有像；</li>
<li><b>像是唯一的</b>：每个 $x$ 只对应<em>一个</em> $y$，但不同的 $x$ 可以对应同一个 $y$；</li>
<li><b>值域可以比 $Y$ 小</b>：$Y$ 中的元素不一定都有原像，只要求 $R_f\subset Y$。</li>
</ul>
<p>两个映射 $f,g$ 相等，是指它们的定义域相同，并且对定义域中每个 $x$ 都有 $f(x)=g(x)$。</p>

<x-ex t="映射的例子与反例">
<p>判断下列对应是否是映射：</p>
<p>(1) $X$ 为某班全体同学，$Y=\Np$，每位同学对应他的学号；</p>
<p>(2) $X=[0,+\infty)$，$Y=\R$，每个 $x$ 对应满足 $y^2=x$ 的实数 $y$；</p>
<p>(3) $X=Y=\R$，$x\mapsto\frac1x$；</p>
<p>(4) $S$ 为有限集，$X=2^{S}$，$Y=\N$，$A\mapsto\card A$。</p>
<x-sol>
<p>(1) 是映射：每位同学恰有一个学号。值域只是 $\Np$ 的一个有限子集。</p>
<p>(2) 不是映射：$x=4$ 对应 $y=\pm2$ 两个值，违反了像的唯一性。若规定 $y\ge0$，即 $x\mapsto\sqrt x$，就成为映射。</p>
<p>(3) 不是映射：$x=0$ 没有像。把定义域改为 $\R\setminus\{0\}$ 才是映射。</p>
<p>(4) 是映射：每个子集的元素个数唯一确定。</p>
</x-sol>
</x-ex>

<x-def t="单射、满射与双射" id="def-inj">
设 $f:X\to Y$。
<ul>
<li>若对任意 $x_1,x_2\in X$，由 $x_1\ne x_2$ 可推出 $f(x_1)\ne f(x_2)$（等价地，由 $f(x_1)=f(x_2)$ 可推出 $x_1=x_2$），则称 $f$ 为<em>单射</em>；</li>
<li>若 $R_f=Y$，即每个 $y\in Y$ 都有原像，则称 $f$ 为<em>满射</em>；</li>
<li>若 $f$ 既是单射又是满射，则称 $f$ 为<em>双射</em>，也称 $f$ 是 $X$ 与 $Y$ 之间的<em>一一对应</em>。</li>
</ul>
</x-def>

<x-ex t="同一个法则，不同的定义域和陪域" id="ex-sq">
<p>对应法则都是 $x\mapsto x^2$。判断下列映射是否为单射、满射：</p>
<p>(1) $f_1:\R\to\R$；(2) $f_2:[0,+\infty)\to\R$；(3) $f_3:\R\to[0,+\infty)$；(4) $f_4:[0,+\infty)\to[0,+\infty)$。</p>
<x-sol>
<p>(1) $f_1(-1)=f_1(1)$，不是单射；$-1$ 没有原像，不是满射。</p>
<p>(2) 若 $x_1,x_2\ge0$ 且 $x_1^2=x_2^2$，则 $(x_1-x_2)(x_1+x_2)=0$，而 $x_1+x_2=0$ 只在 $x_1=x_2=0$ 时成立，故总有 $x_1=x_2$，是单射；但 $-1$ 仍没有原像，不是满射。</p>
<p>(3) 每个 $y\ge0$ 都有原像 $\sqrt y$，是满射；不是单射。</p>
<p>(4) 既是单射又是满射，是双射，它的逆映射是 $y\mapsto\sqrt y$。</p>
</x-sol>
<x-remark>“是不是单射、满射”不只取决于对应法则，还取决于定义域和 $Y$（有时称为<em>陪域</em>）。以后求反函数时，常常要先把定义域限制在函数单调的范围内，就是这个道理——例如 $\arcsin$ 是 $\sin$ 限制在 $\left[-\frac\pi2,\frac\pi2\right]$ 上的反函数。</x-remark>
</x-ex>

<x-def t="逆映射" id="def-invmap">
设 $f:X\to Y$ 是单射，则每个 $y\in R_f$ 恰有一个原像 $x$，记为 $x=f^{-1}(y)$。这样得到的映射 $f^{-1}:R_f\to X$ 称为 $f$ 的<em>逆映射</em>。
</x-def>
<p>由定义，$f^{-1}(f(x))=x$（$x\in X$），$f(f^{-1}(y))=y$（$y\in R_f$）。若 $f$ 是双射，则 $f^{-1}$ 定义在整个 $Y$ 上，它也是双射，并且 $(f^{-1})^{-1}=f$。</p>

<x-def t="复合映射" id="def-comp">
设 $f:X\to Y_1$，$g:Y_2\to Z$，并且 $R_f\subset Y_2$。则对每个 $x\in X$，$g(f(x))$ 有意义，由此确定的映射
$$g\circ f:X\to Z,\qquad x\mapsto g(f(x))$$
称为 $f$ 与 $g$ 的<em>复合映射</em>（先作用 $f$，再作用 $g$）。
</x-def>

<x-ex t="复合的顺序与条件" id="ex-comp">
<p>设 $f(x)=x+1$，$g(x)=x^2$（$x\in\R$），求 $g\circ f$ 与 $f\circ g$。又设 $u(x)=\sqrt{x}$（$x\ge0$），$v(x)=-1-x^2$（$x\in\R$），$u\circ v$ 是否有意义？</p>
<x-sol>
<p>$(g\circ f)(x)=g(x+1)=(x+1)^2$，$(f\circ g)(x)=f(x^2)=x^2+1$。二者不相等（$x=1$ 时分别为 $4$ 和 $2$），所以复合一般<em>不满足交换律</em>。</p>
<p>$R_v=(-\infty,-1]$ 与 $u$ 的定义域 $[0,+\infty)$ 不相交，对任何 $x$ 都无法计算 $u(v(x))$，所以 $u\circ v$ 无意义。</p>
</x-sol>
<x-remark>复合满足结合律：$h\circ(g\circ f)=(h\circ g)\circ f$，因为两边都把 $x$ 映为 $h(g(f(x)))$。所以多个映射的复合可以不加括号。</x-remark>
</x-ex>

<h3>集合的像与原像</h3>
<p>设 $f:X\to Y$，$A\subset X$，$B\subset Y$。称</p>
<p>$$f(A)=\{f(x)\mid x\in A\},\qquad f^{-1}(B)=\{x\in X\mid f(x)\in B\}$$</p>
<p>分别为 $A$ 的<em>像</em>与 $B$ 的<em>原像</em>。</p>

<x-warn>记号 $f^{-1}(B)$ 表示原像集合，<em>并不要求</em> $f$ 有逆映射。例如 $f(x)=x^2$（$x\in\R$）没有逆映射，但 $f^{-1}([1,4])=[-2,-1]\cup[1,2]$ 完全有意义。</x-warn>

<x-prop t="像与原像的运算性质" id="prop-img">
设 $f:X\to Y$，$A_1,A_2\subset X$，$B_1,B_2\subset Y$，则
<ol>
<li>$f(A_1\cup A_2)=f(A_1)\cup f(A_2)$；</li>
<li>$f(A_1\cap A_2)\subset f(A_1)\cap f(A_2)$，一般不能换成等号；</li>
<li>$f^{-1}(B_1\cup B_2)=f^{-1}(B_1)\cup f^{-1}(B_2)$，$f^{-1}(B_1\cap B_2)=f^{-1}(B_1)\cap f^{-1}(B_2)$；</li>
<li>$f^{-1}(Y\setminus B_1)=X\setminus f^{-1}(B_1)$。</li>
</ol>
<x-proof>
<p>(1) $y\in f(A_1\cup A_2)\iff$ 存在 $x\in A_1\cup A_2$ 使 $y=f(x)\iff$ 存在 $x\in A_1$ 使 $y=f(x)$，或存在 $x\in A_2$ 使 $y=f(x)\iff y\in f(A_1)\cup f(A_2)$。</p>
<p>(2) 若 $y\in f(A_1\cap A_2)$，则 $y=f(x)$，其中 $x\in A_1$ 且 $x\in A_2$，所以 $y\in f(A_1)$ 且 $y\in f(A_2)$。反例：$f(x)=x^2$，$A_1=[-1,0]$，$A_2=[0,1]$，则 $f(A_1\cap A_2)=f(\{0\})=\{0\}$，而 $f(A_1)\cap f(A_2)=[0,1]$。</p>
<p>(3)(4) 原像只涉及“$f(x)$ 属于哪个集合”，逐字翻译即可。例如 $x\in f^{-1}(B_1\cap B_2)\iff f(x)\in B_1$ 且 $f(x)\in B_2\iff x\in f^{-1}(B_1)\cap f^{-1}(B_2)$；$x\in f^{-1}(Y\setminus B_1)\iff f(x)\notin B_1\iff x\notin f^{-1}(B_1)$。</p>
</x-proof>
</x-prop>

<x-intuit>为什么“像”遇到交运算会出问题，而“原像”对各种运算都很“乖”？原像只问每个 $x$ 自己的像落在哪里，是逐点的判断；而 $f(A_1)\cap f(A_2)$ 中的 $y$，可能来自 $A_1$ 中的一个点和 $A_2$ 中的<em>另一个</em>点。$f$ 是单射时这种情况不会发生（见习题）。</x-intuit>

<h2 id="func">一元实函数</h2>

<x-def t="一元实函数" id="def-func">
当 $X\subset\R$，$Y=\R$ 时，映射 $f:X\to\R$ 称为<em>一元实函数</em>，简称<em>函数</em>，记作 $y=f(x)$，$x\in X$。$x$ 称为<em>自变量</em>，$y$ 称为<em>因变量</em>。平面点集
$$G_f=\{(x,y)\mid y=f(x),\ x\in X\}\subset\R^2$$
称为 $f$ 的<em>图像</em>。
</x-def>

<p>函数的两个要素是<em>定义域</em>与<em>对应法则</em>。实际问题中，定义域由问题的实际意义决定；只用解析式给出函数而不指明定义域时，约定定义域是使式子有意义的全体实数，称为<em>自然定义域</em>。常用的条件有：分母不为零；偶次根号下非负；对数的真数大于零；$\arcsin u$、$\arccos u$ 要求 $|u|\le1$；$\tan u$ 要求 $u\ne k\pi+\frac\pi2$。</p>

<x-ex t="求自然定义域" id="ex-domain">
<p>求下列函数的定义域：(1) $y=\sqrt{4-x^2}+\ln(x-1)$；(2) $y=\arcsin\frac{x-1}{2}+\frac{1}{\sqrt x}$；(3) $y=\frac{1}{\lg(3-x)}$。</p>
<x-sol>
<p>(1) 需 $4-x^2\ge0$ 且 $x-1>0$，即 $-2\le x\le2$ 且 $x>1$，定义域为 $(1,2]$。</p>
<p>(2) 需 $-1\le\frac{x-1}2\le1$ 且 $x>0$，即 $-1\le x\le3$ 且 $x>0$，定义域为 $(0,3]$。</p>
<p>(3) 需 $3-x>0$ 且 $\lg(3-x)\ne0$，即 $x<3$ 且 $x\ne2$，定义域为 $(-\infty,2)\cup(2,3)$。</p>
</x-sol>
<x-remark>求定义域就是解一组不等式，最后取<em>交集</em>。最容易漏掉的是“分母不为零”这类排除个别点的条件，如 (3) 中的 $x\ne2$。</x-remark>
</x-ex>

<x-ex t="两个函数何时相等" id="ex-eqf">
<p>下列各组函数是否相等？(1) $f(x)=|x|$，$g(x)=\sqrt{x^2}$；(2) $f(x)=x$，$g(x)=\frac{x^2}{x}$；(3) $f(x)=\ln x^2$，$g(x)=2\ln x$；(4) $f(x)=1$，$g(x)=\sin^2x+\cos^2x$。</p>
<x-sol>
<p>(1) 相等：定义域都是 $\R$，且 $\sqrt{x^2}=|x|$ 对一切实数成立。</p>
<p>(2) 不相等：$g$ 的定义域是 $\R\setminus\{0\}$，$f$ 的定义域是 $\R$。</p>
<p>(3) 不相等：$f$ 的定义域是 $\R\setminus\{0\}$，$g$ 的定义域是 $(0,+\infty)$。在 $(0,+\infty)$ 上二者相同；在 $(-\infty,0)$ 上只有 $f$ 有定义，且 $f(x)=2\ln|x|$。</p>
<p>(4) 相等：定义域都是 $\R$，每一点的函数值都是 $1$（尽管写法不同）。</p>
</x-sol>
<x-remark>判断两个函数是否相等，只看<em>定义域</em>和<em>每一点的函数值</em>，与表达式的形式、自变量用什么字母都无关：$y=x^2$ 与 $s=t^2$（定义域都是 $\R$）是同一个函数。</x-remark>
</x-ex>

<x-warn>
<p>“函数就是一个公式”是最常见的误解。函数是一种<em>对应法则</em>，可以用公式给出，也可以用表格、图像、文字描述给出，还可以在不同范围内用不同的式子（分段函数）。本节后面的 Dirichlet 函数无法用初等的式子写出，却是一个完全合法的函数。</p>
</x-warn>

<x-app>
<p>实际中的函数多数不是由公式给出的：</p>
<ul>
<li><b>表格</b>：气象站每小时记录的气温 $T(t)$；个人所得税的税率表；</li>
<li><b>图像</b>：心电图、股价走势图、地震仪的记录；</li>
<li><b>算法</b>：输入正整数 $n$，输出 $n$ 的二进制表示中数字 $1$ 的个数。</li>
</ul>
<p>数学分析研究的是这些对应的共同性质——是否连续、变化有多快、累积有多少，所以必须使用不依赖于公式的一般定义。</p>
</x-app>

<x-note t="函数的四则运算">
<p>设 $f,g$ 的定义域分别为 $D_f,D_g$，且 $D=D_f\cap D_g\ne\varnothing$。在 $D$ 上逐点定义</p>
$$(f\pm g)(x)=f(x)\pm g(x),\qquad(fg)(x)=f(x)\,g(x)\qquad(x\in D),$$
$$\left(\frac fg\right)(x)=\frac{f(x)}{g(x)}\qquad(x\in D,\ g(x)\ne0).$$
<p>例如 $f(x)=\sqrt x$，$g(x)=\sqrt{1-x}$，则 $f+g$ 与 $fg$ 的定义域都是 $[0,1]$，$\frac fg$ 的定义域是 $[0,1)$。求定义域要在化简之前进行：$\frac{x^2-1}{x-1}$ 的定义域不含 $1$，它与 $x+1$ 不是同一个函数。</p>
</x-note>
`);
MA.add("1-2", String.raw`
<h2 id="elem">初等函数</h2>
<p>以下六类函数称为<em>基本初等函数</em>，它们的图像和性质在中学已经熟悉，这里汇总如下：</p>
<table>
<tr><th>名称</th><th>表达式</th><th>定义域</th><th>值域与主要性质</th></tr>
<tr><td>常数函数</td><td>$y=c$</td><td>$\R$</td><td>值域 $\{c\}$</td></tr>
<tr><td>幂函数</td><td>$y=x^{\alpha}$（$\alpha\ne0$）</td><td>随 $\alpha$ 而定，总包含 $(0,+\infty)$</td><td>$\alpha>0$ 时在 $(0,+\infty)$ 上严格增，$\alpha<0$ 时严格减</td></tr>
<tr><td>指数函数</td><td>$y=a^x$（$a>0,\ a\ne1$）</td><td>$\R$</td><td>值域 $(0,+\infty)$；$a>1$ 时严格增，$0<a<1$ 时严格减</td></tr>
<tr><td>对数函数</td><td>$y=\log_a x$（$a>0,\ a\ne1$）</td><td>$(0,+\infty)$</td><td>值域 $\R$；是 $a^x$ 的反函数；$\log_e x$ 记作 $\ln x$</td></tr>
<tr><td>三角函数</td><td>$\sin x,\ \cos x,\ \tan x,\ \cot x,\ \sec x,\ \csc x$</td><td>$\sin,\cos$：$\R$；$\tan$：$x\ne k\pi+\frac\pi2$</td><td>$\sin,\cos$ 以 $2\pi$ 为周期，值域 $[-1,1]$；$\tan,\cot$ 以 $\pi$ 为周期</td></tr>
<tr><td>反三角函数</td><td>$\arcsin x,\ \arccos x,\ \arctan x,\ \arccot x$</td><td>$\arcsin,\arccos$：$[-1,1]$；其余：$\R$</td><td>值域依次为 $\left[-\frac\pi2,\frac\pi2\right]$，$[0,\pi]$，$\left(-\frac\pi2,\frac\pi2\right)$，$(0,\pi)$</td></tr>
</table>
<x-note>幂函数 $x^{\alpha}$ 的定义域：$\alpha$ 为正整数时是 $\R$；$\alpha$ 为负整数时是 $\R\setminus\{0\}$；$\alpha=\frac pq$（既约，$q$ 为奇数）时负数也可以开 $q$ 次方，定义域包含负半轴；$\alpha$ 为无理数时只在 $x\ge0$（$\alpha>0$）或 $x>0$（$\alpha<0$）上定义。反三角函数是三角函数限制在一个单调区间上的反函数：$\arcsin$ 对应 $\left[-\frac\pi2,\frac\pi2\right]$，$\arccos$ 对应 $[0,\pi]$，$\arctan$ 对应 $\left(-\frac\pi2,\frac\pi2\right)$，$\arccot$ 对应 $(0,\pi)$。</x-note>

<x-def t="初等函数" id="def-elem">
由基本初等函数经过<em>有限次</em>四则运算与复合运算得到、并且能用一个式子表示的函数，称为<em>初等函数</em>。
</x-def>
<p>例如 $y=\sqrt{1+\sin^2x}$，$y=\ln\left(x+\sqrt{x^2+1}\right)$，$|x|=\sqrt{x^2}$，以及 $x^x=e^{x\ln x}$（$x>0$）都是初等函数。符号函数、取整函数、Dirichlet 函数（见下文）都不是初等函数——第三章会证明初等函数在其定义区间上处处连续，而这几个函数都有不连续点。</p>

<x-viz type="plot" t="幂函数 $y=x^a$" f="x^a" a="2" amin="-3" amax="3" astep="0.1" xmin="-3" xmax="3" ymin="-3" ymax="3">拖动滑块改变指数 $a$，比较 $a>1$、$0<a<1$、$a<0$ 时图像的形状，注意所有曲线都经过点 $(1,1)$。本演示在 $a$ 不是整数时只画出 $x>0$ 的部分（像 $x^{1/3}$ 这样在负半轴也有定义的情形需要另外考虑）。</x-viz>

<x-viz type="plot" t="指数函数与对数函数互为反函数" f="a^x; ln(x)/ln(a); x" a="2" amin="0.2" amax="4" astep="0.05" xmin="-4" xmax="4" ymin="-4" ymax="4">三条曲线依次是 $y=a^x$、$y=\log_a x$ 和直线 $y=x$。拖动滑块：两条曲线始终关于 $y=x$ 对称；$a>1$ 时都递增，$0<a<1$ 时都递减；$a=1$ 时 $\log_a x$ 没有意义。</x-viz>

<h3>双曲函数</h3>
<p>工程和物理中经常遇到下面几个由指数函数组成的初等函数：</p>
<p>$$\sh x=\frac{e^x-e^{-x}}{2},\qquad \ch x=\frac{e^x+e^{-x}}{2},\qquad \operatorname{th}x=\frac{\sh x}{\ch x}=\frac{e^x-e^{-x}}{e^x+e^{-x}},$$</p>
<p>分别称为<em>双曲正弦</em>、<em>双曲余弦</em>和<em>双曲正切</em>（也记作 $\sinh x$，$\cosh x$，$\tanh x$）。$\sh x$ 与 $\operatorname{th}x$ 是奇函数，$\ch x$ 是偶函数且 $\ch x\ge1$；$\sh x$ 的值域是 $\R$，$\operatorname{th}x$ 的值域是 $(-1,1)$。</p>

<x-prop t="双曲函数的恒等式" id="prop-hyp">
对任意实数 $x,y$：
<ol>
<li>$\ch^2x-\sh^2x=1$；</li>
<li>$\sh(x\pm y)=\sh x\ch y\pm\ch x\sh y$，$\ch(x\pm y)=\ch x\ch y\pm\sh x\sh y$；</li>
<li>$\sh2x=2\sh x\ch x$，$\ch2x=\ch^2x+\sh^2x=1+2\sh^2x$。</li>
</ol>
<x-proof>
<p>(1) $\ch^2x-\sh^2x=(\ch x+\sh x)(\ch x-\sh x)=e^x\cdot e^{-x}=1$。</p>
<p>(2) 记 $u=e^x$，$v=e^y$，直接展开：</p>
<p>$$\sh x\ch y+\ch x\sh y=\frac{(u-u^{-1})(v+v^{-1})+(u+u^{-1})(v-v^{-1})}{4}=\frac{2uv-2u^{-1}v^{-1}}{4}=\sh(x+y).$$</p>
<p>其余三个式子同理。(3) 在 (2) 中取 $y=x$，再用 (1)。</p>
</x-proof>
</x-prop>

<x-tip>双曲函数的公式与三角函数“几乎一样”，只是某些符号不同：$\cos^2x+\sin^2x=1$ 对应 $\ch^2x-\sh^2x=1$。根源在于 Euler 公式（以后会学到）给出 $\cos x=\frac{e^{ix}+e^{-ix}}{2}$，$\sin x=\frac{e^{ix}-e^{-ix}}{2i}$，从而 $\ch x=\cos(ix)$，$\sh x=-i\sin(ix)$。“双曲”二字则来自：点 $(\ch t,\sh t)$ 总落在双曲线 $x^2-y^2=1$ 的右支上，正如 $(\cos t,\sin t)$ 总落在单位圆上。</x-tip>

<x-ex t="反双曲正弦" id="ex-arsinh">
<p>求 $y=\sh x$ 的反函数。</p>
<x-analysis>令 $u=e^x>0$，把 $y=\frac{u-u^{-1}}{2}$ 看成关于 $u$ 的二次方程来解。</x-analysis>
<x-sol>
<p>由 $y=\frac{e^x-e^{-x}}2$ 得 $e^{2x}-2ye^x-1=0$，解得 $e^x=y\pm\sqrt{y^2+1}$。由于 $e^x>0$ 而 $y-\sqrt{y^2+1}<0$，只能取正号：$e^x=y+\sqrt{y^2+1}$，即</p>
<p>$$x=\ln\left(y+\sqrt{y^2+1}\right),\qquad y\in\R.$$</p>
<p>按习惯交换字母，$\sh x$ 的反函数为 $\arsinh x=\ln\left(x+\sqrt{x^2+1}\right)$，$x\in\R$。</p>
</x-sol>
<x-remark>同理可得 $\ch x$ 在 $[0,+\infty)$ 上的反函数 $\arcosh x=\ln\left(x+\sqrt{x^2-1}\right)$（$x\ge1$），以及 $\artanh x=\frac12\ln\frac{1+x}{1-x}$（$|x|<1$）。$\ch x$ 是偶函数，在整个 $\R$ 上不是单射，必须先限制定义域——道理与<x-ref to="ex-sq"></x-ref> 相同。</x-remark>
</x-ex>

<x-app t="悬链线">
<p>两端固定、只受自身重力作用的柔软均匀链条（输电线、晾衣绳、项链）自然下垂时形成的曲线叫做<em>悬链线</em>。适当选取坐标系（原点在最低点正下方），它的方程是</p>
<p>$$y=a\ch\frac xa=\frac a2\left(e^{x/a}+e^{-x/a}\right),$$</p>
<p>其中常数 $a>0$ 等于最低点处的水平张力与单位长度链条重量之比。Galileo 曾以为下垂的链条是抛物线；1691 年，Leibniz、Huygens 和 Johann Bernoulli 各自求出了正确答案。推导需要微分方程，留待以后。</p>
</x-app>

<x-viz type="plot" t="双曲函数" f="sh x; ch x; th x" xmin="-3" xmax="3" ymin="-4" ymax="4">三条曲线依次是 $\sh x$、$\ch x$、$\operatorname{th}x$。$\ch x$ 的形状像抛物线，但增长快得多；$\operatorname{th}x$ 始终夹在 $y=\pm1$ 之间；$x$ 很大时 $\sh x$ 与 $\ch x$ 几乎重合（都约等于 $\frac{e^x}2$）。</x-viz>

<h2 id="repr">函数的分段表示、隐式表示与参数表示</h2>

<h3>分段表示</h3>
<p>在定义域的不同部分用不同式子表示的函数称为<em>分段函数</em>。下面几个分段函数在全书中会反复出现，它们常被用来检验一个概念或定理的条件是否必要。</p>
<ul>
<li><b>符号函数</b>：$\sgn x=1$（$x>0$），$\sgn 0=0$，$\sgn x=-1$（$x<0$）。对一切 $x$ 有 $x=|x|\sgn x$。</li>
<li><b>取整函数</b>：$[x]$ 表示不超过 $x$ 的最大整数，即 $[x]=n\iff n\le x<n+1$（$n\in\Z$）。例如 $[2.5]=2$，$[-2.5]=-3$，$[-3]=-3$。</li>
<li><b>小数部分</b>：$\{x\}=x-[x]$，总有 $0\le\{x\}<1$，并且 $\{x\}$ 以 $1$ 为周期。例如 $\{-2.5\}=0.5$。</li>
<li><b>Dirichlet 函数</b>：$D(x)=1$（$x\in\Q$），$D(x)=0$（$x\notin\Q$）。</li>
<li><b>Riemann 函数</b>：$R(x)=\frac1q$（$x=\frac pq$，$p\in\Z$，$q\in\Np$，$p,q$ 互质），$R(x)=0$（$x$ 为无理数）；按这个约定 $R(0)=1$（$0=\frac01$）。</li>
</ul>
<p>Dirichlet 函数在任何区间上都既取到 $1$ 又取到 $0$（有理数与无理数都是稠密的），它的图像“画不出来”。Riemann 函数则有一个微妙的性质：对任意 $\eps>0$，在 $[0,1]$ 中满足 $R(x)\ge\eps$ 的点只有有限个（分母 $q\le\frac1\eps$ 的分数只有有限个）。第三章会看到，这使得 $R$ 在每个无理点处连续，而在每个有理点处不连续。</p>

<x-viz type="plot" t="几个重要的分段函数" presets="取整函数 [x]::[x]::-3.5,3.5,-4,4;;夹逼：x−1 &lt; [x] ≤ x::[x]; x; x-1::-3.5,3.5,-4,4;;小数部分 x−[x]::x-[x]::-3.5,3.5,-0.5,1.5;;符号函数 sgn x::sgn(x)::-3,3,-1.6,1.6;;Dirichlet 函数::@dirichlet::-2,2,-0.5,1.5;;Riemann 函数::@riemann::0,1,-0.1,1.1">从“预设”中选择函数。取整函数的图像是一级级“台阶”，在每个整数处向上跳一格；第二个预设显示 $[x]$ 被夹在直线 $y=x-1$ 与 $y=x$ 之间；Riemann 函数的图像中，越高的点越稀疏。</x-viz>

<x-ex t="取整函数的基本性质" id="ex-floor">
<p>证明：对任意实数 $x$ 与整数 $n$，(1) $x-1<[x]\le x$；(2) $[x+n]=[x]+n$；(3) 当 $x$ 不是整数时 $[-x]=-[x]-1$，当 $x$ 是整数时 $[-x]=-[x]$。</p>
<x-sol>
<p>记 $m=[x]$，则 $m\le x<m+1$。</p>
<p>(1) 由 $x<m+1$ 得 $m>x-1$，又 $m\le x$。</p>
<p>(2) $m+n\le x+n<m+n+1$，且 $m+n$ 是整数，所以 $[x+n]=m+n$。</p>
<p>(3) 若 $x$ 不是整数，则 $m<x<m+1$，于是 $-m-1<-x<-m$，故 $[-x]=-m-1$；若 $x$ 是整数，则 $[-x]=-x=-[x]$。</p>
</x-sol>
<x-remark>不等式 $x-1<[x]\le x$ 是处理取整函数最常用的工具。例如由 $10^nx-1<[10^nx]\le10^nx$ 得 $x-\frac1{10^n}<\frac{[10^nx]}{10^n}\le x$：$x$ 的 $n$ 位不足近似值与 $x$ 相差不到 $10^{-n}$。</x-remark>
</x-ex>

<x-app t="出租车计费">
<p>某市出租车的计费规则是：起步价 $13$ 元（含 $3$ km），超过 $3$ km 的部分每公里 $2.3$ 元，不足 $1$ km 按 $1$ km 计。记 $\lceil t\rceil$ 为不小于 $t$ 的最小整数（上取整，$\lceil t\rceil=-[-t]$），则车费是行驶里程 $x$（km）的分段函数</p>
<p>$$C(x)=\begin{cases}13,&0<x\le3,\\ 13+2.3\lceil x-3\rceil,&x>3.\end{cases}$$</p>
<p>例如 $C(7.4)=13+2.3\times\lceil4.4\rceil=13+2.3\times5=24.5$（元）。$C$ 的图像也是一级级“台阶”，在 $x=3,4,5,\cdots$ 处向上跳。实际的计价器往往还按时间收取低速等候费，那时车费就成了里程与时间的二元函数。</p>
</x-app>

<h3>隐式表示</h3>
<p>有时变量 $x,y$ 之间的关系由一个方程 $F(x,y)=0$ 给出。若对某个范围内的每个 $x$，满足方程的 $y$ 存在且唯一，就确定了一个函数 $y=y(x)$，称为由该方程确定的<em>隐函数</em>。</p>

<x-ex t="由方程确定的函数" id="ex-implicit">
<p>(1) 方程 $x^2+y^2=1$ 能确定哪些函数？(2) 方程 $y^5+y-x=0$ 是否对每个实数 $x$ 确定唯一的 $y$？</p>
<x-sol>
<p>(1) 对 $x\in(-1,1)$，满足方程的 $y$ 有两个：$\pm\sqrt{1-x^2}$。要得到函数必须附加条件：$y\ge0$ 时得到上半圆 $y=\sqrt{1-x^2}$，$y\le0$ 时得到下半圆 $y=-\sqrt{1-x^2}$。（若在每个 $x$ 处任意选取一个符号，也能得到函数，只是图像支离破碎——这又一次说明函数只是对应法则。）</p>
<p>(2) 记 $g(y)=y^5+y$。若 $y_1<y_2$，则 $g(y_2)-g(y_1)=(y_2^5-y_1^5)+(y_2-y_1)>0$（$t\mapsto t^5$ 严格增），所以 $g$ 严格增，方程 $g(y)=x$ 至多有一个解。另一方面 $g$ 的值域是 $\R$（这要用到第三章的介值定理），所以对每个 $x$ 恰有一个 $y$，它就是 $g$ 的反函数在 $x$ 处的值。可以证明，对一般的 $x$ 这个 $y$ 不能用 $x$ 的根式表示出来（这与“一般五次方程没有根式解”的 Abel–Ruffini 定理有关）。</p>
</x-sol>
</x-ex>

<x-app t="Kepler 方程">
<p>行星沿椭圆轨道运动时，它在时刻 $t$ 的位置由<em>偏近点角</em> $E$ 决定，而 $E$ 满足 Kepler 方程</p>
<p>$$E-e\sin E=M,\qquad M=\frac{2\pi}{T}(t-t_0),$$</p>
<p>其中 $e\in[0,1)$ 是轨道的离心率，$T$ 是公转周期。因为 $E\mapsto E-e\sin E$ 严格增（利用 $|\sin a-\sin b|\le|a-b|$ 即可证明），给定 $M$ 时方程至多有一个解；又因为 $E-e\sin E$ 能取遍全体实数（要用到第三章的介值定理，§2.4 的迭代法也能直接构造出解），所以 $E$ 由 $M$ 唯一确定，是 $M$ 的隐函数。但它没有初等的显式表达式，天文学家用迭代 $E_{k+1}=M+e\sin E_k$ 求数值解——§2.4 会证明这个迭代收敛。</p>
</x-app>

<h3>参数表示</h3>
<p>平面曲线常用<em>参数方程</em> $x=\varphi(t)$，$y=\psi(t)$（$t\in T$）表示，参数 $t$ 通常是时间或角度。若 $\varphi$ 严格单调，就可以从 $x=\varphi(t)$ 解出 $t=\varphi^{-1}(x)$，于是 $y=\psi\bigl(\varphi^{-1}(x)\bigr)$ 是 $x$ 的函数。</p>

<x-ex t="斜抛运动" id="ex-proj">
<p>以初速度 $v_0$、仰角 $\alpha$（$0<\alpha<\frac\pi2$）从地面抛出一个物体，忽略空气阻力，求它的运动轨迹与水平射程。</p>
<x-sol>
<p>水平方向匀速运动，竖直方向是加速度为 $-g$ 的匀变速运动，所以</p>
<p>$$x=v_0t\cos\alpha,\qquad y=v_0t\sin\alpha-\frac12gt^2,\qquad 0\le t\le\frac{2v_0\sin\alpha}g.$$</p>
<p>由第一式解出 $t=\frac{x}{v_0\cos\alpha}$，代入第二式得</p>
<p>$$y=x\tan\alpha-\frac{g}{2v_0^2\cos^2\alpha}\,x^2,$$</p>
<p>轨迹是开口向下的抛物线。令 $y=0$ 得落地点 $x=\frac{2v_0^2\sin\alpha\cos\alpha}{g}=\frac{v_0^2\sin2\alpha}{g}$，所以 $\alpha=\frac\pi4$ 时射程最远。</p>
</x-sol>
</x-ex>

<x-ex t="摆线（旋轮线）" id="ex-cycloid">
<p>半径为 $a$ 的圆沿 $x$ 轴无滑动地向右滚动，求圆周上一个定点 $P$ 的轨迹（开始时 $P$ 位于原点）。</p>
<x-analysis>以圆转过的角度 $t$ 为参数。“无滑动”意味着圆心前进的距离等于圆周上滚过的弧长 $at$。</x-analysis>
<x-sol>
<p>圆转过角度 $t$ 后，圆心位于 $(at,a)$。$P$ 从圆的最低点出发，绕圆心顺时针转过角度 $t$，它相对于圆心的位置是 $(-a\sin t,\,-a\cos t)$。于是</p>
<p>$$x=at-a\sin t=a(t-\sin t),\qquad y=a-a\cos t=a(1-\cos t),\qquad t\in\R.$$</p>
<p>圆每转一周（$t$ 增加 $2\pi$），曲线重复一拱，拱宽 $2\pi a$，拱高 $2a$。</p>
</x-sol>
<x-remark>摆线有两个著名性质：它是<em>最速降线</em>——质点在重力作用下从一点滑到另一点，沿倒置的摆线用时最短（Johann Bernoulli 于 1696 年提出的问题）；它也是<em>等时曲线</em>——从倒置摆线上任何位置由静止释放，滑到最低点所用的时间都相同。这些结论要用积分和变分法才能证明。</x-remark>
</x-ex>

<h3>极坐标表示</h3>
<p>平面上点的位置也可以用它到原点的距离 $r$ 和极角 $\theta$ 来描述，二者与直角坐标的关系是 $x=r\cos\theta$，$y=r\sin\theta$。方程 $r=r(\theta)$ 给出的曲线，相当于以 $\theta$ 为参数的参数方程 $x=r(\theta)\cos\theta$，$y=r(\theta)\sin\theta$。常见的有：</p>
<ul>
<li><b>心形线</b> $r=a(1+\cos\theta)$；</li>
<li><b>Archimedes 螺线</b> $r=a\theta$（$\theta\ge0$）：极角每增加 $2\pi$，极径增加 $2\pi a$，蚊香、卷起来的纸、唱片的纹路都近似如此；</li>
<li><b>双纽线</b> $r^2=a^2\cos2\theta$，它的直角坐标方程是 $(x^2+y^2)^2=a^2(x^2-y^2)$；</li>
<li><b>三叶玫瑰线</b> $r=a\sin3\theta$；</li>
<li><b>星形线</b>（参数方程）$x=a\cos^3t$，$y=a\sin^3t$，消去参数得 $x^{2/3}+y^{2/3}=a^{2/3}$。</li>
</ul>

<x-viz type="curve" start="0" t="参数方程与极坐标曲线">选择不同的曲线，拖动参数滑块或点击“播放”，观察动点随参数运动画出的轨迹；摆线演示中同时画出了滚动的圆。也可以自己输入参数方程或极坐标方程。</x-viz>

<x-ex t="极坐标方程与直角坐标方程的互化" id="ex-polar">
<p>(1) 把 $r=2a\cos\theta$（$a>0$）化为直角坐标方程；(2) 把心形线 $r=a(1+\cos\theta)$ 化为直角坐标方程。</p>
<x-sol>
<p>(1) 两边乘以 $r$：$r^2=2ar\cos\theta$，即 $x^2+y^2=2ax$，也就是 $(x-a)^2+y^2=a^2$，这是以 $(a,0)$ 为圆心、$a$ 为半径的圆。</p>
<p>(2) 两边乘以 $r$：$r^2=ar+ar\cos\theta$，即 $x^2+y^2-ax=a\sqrt{x^2+y^2}$，平方得 $(x^2+y^2-ax)^2=a^2(x^2+y^2)$。</p>
</x-sol>
<x-remark>两边乘以 $r$ 可能引入原点（$r=0$），平方可能引入多余的点，都要回头检查。本例中原点本来就在两条曲线上（(1) 中 $\theta=\frac\pi2$，(2) 中 $\theta=\pi$ 时 $r=0$），所以乘以 $r$ 没有带来新的点。(2) 中平方一步可能多出 $x^2+y^2-ax=-a\sqrt{x^2+y^2}$ 这一支，化成极坐标是 $r=a(\cos\theta-1)$，在 $r\ge0$ 的约定下只能 $r=0$，也只含原点，所以平方后的方程恰好表示心形线。</x-remark>
</x-ex>
`);
MA.add("1-2", String.raw`
<h2 id="props">函数的简单特性</h2>

<h3>有界性</h3>
<x-def t="有界函数" id="def-bdd">
设函数 $f$ 在集合 $D$ 上有定义。若存在 $M\in\R$，使得对一切 $x\in D$ 都有 $f(x)\le M$，则称 $f$ 在 $D$ 上<em>有上界</em>，$M$ 称为它的一个上界；类似地定义<em>有下界</em>。若存在 $M>0$，使得对一切 $x\in D$ 都有 $|f(x)|\le M$，则称 $f$ 在 $D$ 上<em>有界</em>。
</x-def>
<p>显然，$f$ 有界当且仅当 $f$ 既有上界又有下界。把定义中的“存在”与“对一切”互换、结论取反，就得到<em>无界</em>的正面叙述：</p>
<p class="center">$f$ 在 $D$ 上无界 $\iff$ 对任意 $M>0$，存在 $x_M\in D$，使得 $|f(x_M)|>M$。</p>

<x-ex t="判断有界性" id="ex-bdd">
<p>(1) 证明 $f(x)=\frac{x}{1+x^2}$ 在 $\R$ 上有界；(2) 证明 $g(x)=\frac1x$ 在 $(0,1)$ 上无界，在 $[1,+\infty)$ 上有界；(3) $h(x)=x\sin x$ 在 $\R$ 上是否有界？</p>
<x-sol>
<p>(1) 由 $1+x^2\ge2|x|$（即 $(|x|-1)^2\ge0$）得 $|f(x)|=\frac{|x|}{1+x^2}\le\frac12$，且 $x=\pm1$ 时取到等号。</p>
<p>(2) 对任意 $M>0$（不妨设 $M>1$），取 $x_M=\frac1{2M}\in(0,1)$，则 $g(x_M)=2M>M$，所以 $g$ 在 $(0,1)$ 上无界。在 $[1,+\infty)$ 上 $0<g(x)\le1$，有界。</p>
<p>(3) 无界。对任意 $M>0$，取正整数 $k>M$，令 $x_k=2k\pi+\frac\pi2$，则 $h(x_k)=x_k>2k\pi>M$。</p>
</x-sol>
<x-remark>(3) 中的 $h$ 虽然无界，却并不“趋于无穷大”——它在每个 $x=k\pi$ 处都等于 $0$。“无界”与“趋于无穷大”是两回事，§2.3 会再讨论这个区别。</x-remark>
</x-ex>

<h3>单调性</h3>
<x-def t="单调函数" id="def-mono">
设函数 $f$ 在集合 $D$ 上有定义。若对任意 $x_1,x_2\in D$，当 $x_1<x_2$ 时总有 $f(x_1)\le f(x_2)$，则称 $f$ 在 $D$ 上<em>单调增加</em>；若总有 $f(x_1)<f(x_2)$，则称 $f$ 在 $D$ 上<em>严格单调增加</em>。类似地定义（严格）单调减少。单调增加与单调减少的函数统称为<em>单调函数</em>。
</x-def>

<x-ex t="用定义证明单调性" id="ex-cube">
<p>证明 $f(x)=x^3$ 在 $\R$ 上严格单调增加。</p>
<x-sol>
<p>设 $x_1<x_2$，则 $x_2^3-x_1^3=(x_2-x_1)(x_2^2+x_1x_2+x_1^2)$，其中 $x_2-x_1>0$，而</p>
<p>$$x_2^2+x_1x_2+x_1^2=\left(x_2+\frac{x_1}{2}\right)^2+\frac34x_1^2\ge0,$$</p>
<p>等号只在 $x_1=x_2=0$ 时成立，与 $x_1<x_2$ 矛盾，所以它大于 $0$，从而 $x_1^3<x_2^3$。</p>
</x-sol>
</x-ex>

<x-thm t="反函数存在定理" id="thm-inv">
设函数 $y=f(x)$ 在 $D$ 上严格单调增加（减少），则它存在反函数 $x=f^{-1}(y)$，$y\in R_f$，并且 $f^{-1}$ 在 $R_f$ 上也严格单调增加（减少）。
<x-proof>
<p>设 $f$ 严格增。若 $x_1\ne x_2$，不妨 $x_1<x_2$，则 $f(x_1)<f(x_2)$，所以 $f$ 是单射，反函数存在。任取 $y_1,y_2\in R_f$，$y_1<y_2$，令 $x_i=f^{-1}(y_i)$。若 $x_1\ge x_2$，由 $f$ 单调增得 $y_1=f(x_1)\ge f(x_2)=y_2$，矛盾。故 $x_1<x_2$，即 $f^{-1}$ 严格增。严格减的情形同理。</p>
</x-proof>
</x-thm>

<x-note>$x=f^{-1}(y)$ 与 $y=f(x)$ 的图像是同一条曲线；习惯上把反函数的自变量仍记作 $x$，写成 $y=f^{-1}(x)$，这时两者的图像关于直线 $y=x$ 对称（点 $(a,b)$ 与 $(b,a)$ 关于 $y=x$ 对称）。另外，定理的逆命题不成立：有反函数的函数不一定单调。例如 $f(x)=x$（$x\in\Q$），$f(x)=-x$（$x\notin\Q$）是 $\R$ 到 $\R$ 的双射，却在任何区间上都不单调。</x-note>

<h3>奇偶性</h3>
<x-def t="奇函数与偶函数" id="def-parity">
设 $D$ 关于原点对称（即 $x\in D\Rightarrow-x\in D$）。若对一切 $x\in D$ 有 $f(-x)=f(x)$，则称 $f$ 为<em>偶函数</em>；若 $f(-x)=-f(x)$，则称 $f$ 为<em>奇函数</em>。
</x-def>
<p>偶函数的图像关于 $y$ 轴对称，奇函数的图像关于原点对称；若奇函数在 $0$ 处有定义，则 $f(0)=0$。奇（偶）函数的和仍是奇（偶）函数；两个奇函数的积是偶函数，奇函数与偶函数的积是奇函数。</p>

<x-ex t="判断奇偶性" id="ex-parity">
<p>判断下列函数的奇偶性：(1) $f(x)=\ln\left(x+\sqrt{x^2+1}\right)$；(2) $g(x)=x\cdot\frac{e^x-1}{e^x+1}$；(3) $h(x)=x^2+x$，$x\in[-1,2]$。</p>
<x-sol>
<p>(1) 因为 $\sqrt{x^2+1}>|x|\ge-x$，定义域为 $\R$。$f(-x)=\ln\left(\sqrt{x^2+1}-x\right)=\ln\frac{1}{\sqrt{x^2+1}+x}=-f(x)$，是奇函数（它正是 $\arsinh x$）。</p>
<p>(2) 记 $u(x)=\frac{e^x-1}{e^x+1}$，则 $u(-x)=\frac{e^{-x}-1}{e^{-x}+1}$，分子分母同乘 $e^x$ 得 $u(-x)=\frac{1-e^x}{1+e^x}=-u(x)$。$x$ 与 $u$ 都是奇函数，所以 $g$ 是偶函数。</p>
<p>(3) 定义域 $[-1,2]$ 不关于原点对称（$2$ 在其中而 $-2$ 不在），所以既不是奇函数也不是偶函数。</p>
</x-sol>
<x-remark>判断奇偶性的第一步永远是检查定义域是否对称。(1) 中用到的“分子有理化” $\sqrt{x^2+1}-x=\frac{1}{\sqrt{x^2+1}+x}$ 在以后求极限时也很常用。</x-remark>
</x-ex>

<h3>周期性</h3>
<x-def t="周期函数" id="def-period">
若存在常数 $T>0$，使得对一切 $x\in D$ 有 $x\pm T\in D$，且 $f(x+T)=f(x)$，则称 $f$ 为<em>周期函数</em>，$T$ 称为 $f$ 的一个<em>周期</em>。若所有周期中有最小的一个，就称它为 $f$ 的<em>最小正周期</em>。
</x-def>
<p>若 $T$ 是周期，则 $2T,3T,\cdots$ 也都是周期。平常说“$\sin x$ 的周期是 $2\pi$”，指的是最小正周期。</p>

<x-ex t="周期与最小正周期" id="ex-period">
<p>(1) 求 $\sin^2x$ 与 $|\sin x|+|\cos x|$ 的最小正周期；(2) 证明 Dirichlet 函数以任何正有理数为周期，因而没有最小正周期；(3) 设 $f$ 定义在 $\R$ 上，$a>0$，且 $f(x+a)=-f(x)$ 对一切 $x$ 成立，证明 $f$ 是周期函数。</p>
<x-sol>
<p>(1) $\sin^2x=\frac{1-\cos2x}{2}$，最小正周期为 $\pi$。</p>
<p>对 $\varphi(x)=|\sin x|+|\cos x|$，有 $\varphi\left(x+\frac\pi2\right)=|\cos x|+|\sin x|=\varphi(x)$，所以 $\frac\pi2$ 是周期。另一方面 $\varphi(x)^2=1+|\sin2x|$，故 $\varphi(x)=1\iff\sin2x=0\iff x=\frac{k\pi}2$（$k\in\Z$）。若 $T>0$ 是周期，则 $\varphi(T)=\varphi(0)=1$，于是 $T$ 是 $\frac\pi2$ 的正整数倍。所以最小正周期是 $\frac\pi2$。</p>
<p>(2) 设 $r>0$ 为有理数。$x$ 为有理数时 $x+r$ 也是有理数；$x$ 为无理数时 $x+r$ 也是无理数（否则 $x=(x+r)-r$ 是有理数），所以 $D(x+r)=D(x)$，每个正有理数都是 $D$ 的周期。反过来，若 $T>0$ 是周期，则 $D(T)=D(0+T)=D(0)=1$，$T$ 必是有理数，于是 $\frac T2$ 是更小的正周期。所以 $D$ 没有最小正周期。</p>
<p>(3) $f(x+2a)=-f(x+a)=f(x)$，所以 $2a$ 是 $f$ 的一个周期。</p>
</x-sol>
<x-remark>(2) 说明周期函数不一定有最小正周期（常数函数也是例子）。还要注意，两个周期函数的和不一定是周期函数，例如 $\sin x+\sin\sqrt2x$ 就不是（证明见本节习题）。</x-remark>
</x-ex>

<x-intuit>周期现象在实际中无处不在：我国民用交流电的电压 $U(t)=U_0\sin(100\pi t)$，周期 $0.02$ s，即频率 $50$ Hz；昼夜、季节、潮汐也都是周期现象。信号处理中有一个基本事实：相当一般的周期信号都可以分解为一系列正弦信号的叠加（Fourier 级数，下册会讲）。</x-intuit>

<x-note t="性质的否定形式">
<p>与“无界”一样，把“对一切”与“存在”互换、结论取反，就得到其余几个性质的否定形式（设 $f$ 的定义域为 $D$）：</p>
<ul>
<li>$f$ 在 $D$ 上<em>不是</em>单调增加的 $\iff$ 存在 $x_1,x_2\in D$，$x_1<x_2$，但 $f(x_1)>f(x_2)$；</li>
<li>$f$ 在 $D$ 上<em>不是</em>单调函数 $\iff$ 存在 $x_1<x_2$ 使 $f(x_1)>f(x_2)$，<em>并且</em>存在 $x_3<x_4$ 使 $f(x_3)<f(x_4)$（这四个点都在 $D$ 中）；</li>
<li>$f$ <em>不是</em>偶函数 $\iff$ $D$ 不关于原点对称，或者存在 $x_0\in D$ 使 $f(-x_0)\ne f(x_0)$；奇函数的否定与此类似；</li>
<li>$T>0$ <em>不是</em> $f$ 的周期 $\iff$ 存在 $x_0\in D$，使 $x_0+T\notin D$，或 $x_0-T\notin D$，或 $f(x_0+T)\ne f(x_0)$；</li>
<li>$f$ <em>不是</em>周期函数 $\iff$ 对任意 $T>0$，$T$ 都不是 $f$ 的周期。</li>
</ul>
<p>注意量词的变化：要说明 $f$ 不是周期函数，必须对<em>每一个</em> $T>0$ 找出使等式失败的点，只验证 $2\pi$ 不是周期是不够的。例如 $f(x)=x^2$ 不是周期函数：对任意 $T>0$，取 $x_0=0$，则 $f(0+T)=T^2\ne0=f(0)$。</p>
</x-note>

<h2 id="ineq">两个常用不等式</h2>

<h3>三角不等式</h3>
<x-thm t="三角不等式" id="thm-tri">
对任意实数 $a,b$，
$$\bigl||a|-|b|\bigr|\le|a\pm b|\le|a|+|b|.$$
一般地，$|a_1+a_2+\cdots+a_n|\le|a_1|+|a_2|+\cdots+|a_n|$。
<x-proof>
<p>由 $-|a|\le a\le|a|$，$-|b|\le b\le|b|$ 相加得 $-(|a|+|b|)\le a+b\le|a|+|b|$，即 $|a+b|\le|a|+|b|$。</p>
<p>又 $|a|=|(a+b)-b|\le|a+b|+|b|$，所以 $|a|-|b|\le|a+b|$；对称地 $|b|-|a|\le|a+b|$，合起来就是 $\bigl||a|-|b|\bigr|\le|a+b|$。把 $b$ 换成 $-b$ 得到减号的情形。$n$ 个数的情形用数学归纳法。</p>
</x-proof>
</x-thm>

<x-note>$|a-b|$ 是数轴上 $a$、$b$ 两点间的距离，于是 $|a-c|\le|a-b|+|b-c|$ 说的是“经过中间点 $b$ 绕路不会更近”——在平面上，这就是“三角形两边之和大于第三边”，名称由此而来。数学分析中最常见的用法是<em>插项</em>：要估计 $|x_n-a|$，先插入一个便于控制的中间量 $b$，再分别估计 $|x_n-b|$ 和 $|b-a|$。第二章的证明中会反复用到。</x-note>

<h3>Bernoulli 不等式与平均值不等式</h3>

<x-lem t="Bernoulli 不等式" id="lem-bern">
设 $x>-1$，$n$ 为正整数，则 $(1+x)^n\ge1+nx$；当 $n\ge2$ 时，等号仅在 $x=0$ 时成立。
<x-proof>
<p>对 $n$ 用数学归纳法。$n=1$ 时是等式。设 $(1+x)^n\ge1+nx$，两边乘以正数 $1+x$ 得</p>
<p>$$(1+x)^{n+1}\ge(1+nx)(1+x)=1+(n+1)x+nx^2\ge1+(n+1)x,$$</p>
<p>并且 $x\ne0$ 时最后一个不等号是严格的。</p>
</x-proof>
</x-lem>

<x-thm t="平均值不等式" id="thm-amgm">
设 $a_1,a_2,\cdots,a_n$ 是正数，记
$$A_n=\frac{a_1+a_2+\cdots+a_n}{n},\qquad G_n=\sqrt[n]{a_1a_2\cdots a_n},\qquad H_n=\frac{n}{\frac1{a_1}+\frac1{a_2}+\cdots+\frac1{a_n}},$$
分别称为这 $n$ 个数的<em>算术平均值</em>、<em>几何平均值</em>与<em>调和平均值</em>，则
$$H_n\le G_n\le A_n,$$
并且等号成立当且仅当 $a_1=a_2=\cdots=a_n$。
<x-proof>
<p><b>先证 $G_n\le A_n$。</b>对 $n$ 归纳，$n=1$ 显然。设结论对任意 $n$ 个正数成立。考虑 $n+1$ 个正数，重新编号使 $a_{n+1}$ 是其中最大的。记 $A=\frac{a_1+\cdots+a_n}{n}$，则 $a_{n+1}\ge A$，令 $d=a_{n+1}-A\ge0$，于是</p>
<p>$$A_{n+1}=\frac{nA+a_{n+1}}{n+1}=A+\frac{d}{n+1}.$$</p>
<p>由 Bernoulli 不等式与归纳假设 $A^n\ge a_1a_2\cdots a_n$，</p>
<p>$$A_{n+1}^{\,n+1}=A^{n+1}\left(1+\frac{d}{(n+1)A}\right)^{n+1}\ge A^{n+1}\left(1+\frac dA\right)=A^n\,a_{n+1}\ge a_1a_2\cdots a_n\,a_{n+1},$$</p>
<p>即 $G_{n+1}\le A_{n+1}$。</p>
<p><b>等号条件。</b>各数相等时显然取等号。反之，若 $G_{n+1}=A_{n+1}$，则上式中两个“$\ge$”都必须取等号：第一个要求 $d=0$，第二个要求 $A^n=a_1\cdots a_n$，由归纳假设得 $a_1=\cdots=a_n=A$，再由 $d=0$ 得 $a_{n+1}=A$。</p>
<p><b>再证 $H_n\le G_n$。</b>对正数 $\frac1{a_1},\cdots,\frac1{a_n}$ 用刚才的结论：$\sqrt[n]{\frac{1}{a_1\cdots a_n}}\le\frac1n\left(\frac1{a_1}+\cdots+\frac1{a_n}\right)$，两边取倒数即得 $G_n\ge H_n$，等号条件相同。</p>
</x-proof>
</x-thm>

<x-intuit>两个正数 $a,b$ 的情形有一个漂亮的几何解释：在直径上依次截取长为 $a$、$b$ 的两段作半圆，则半径是 $\frac{a+b}2=A_2$；在分点处作直径的垂线交半圆，半弦长是 $\sqrt{ab}=G_2$（直角三角形的射影定理）；再把这条半弦投影到过其端点的半径上，投影长是 $\frac{G_2^2}{A_2}=\frac{2ab}{a+b}=H_2$。“半径 $\ge$ 半弦 $\ge$ 投影”一眼可见。</x-intuit>

<x-viz type="means" t="四种平均值的几何意义" a="1" b="4">拖动滑块改变 $a,b$，观察 $H\le G\le A\le Q$（其中 $Q=\sqrt{\frac{a^2+b^2}2}$ 是平方平均值）；当且仅当 $a=b$ 时四条线段一样长。下方还可以输入一组正数，计算它们的各种平均值。</x-viz>

<x-ex t="用平均值不等式证明数列的单调性" id="ex-e-mono">
<p>证明：对一切正整数 $n$，$\left(1+\frac1n\right)^n<\left(1+\frac1{n+1}\right)^{n+1}$。</p>
<x-analysis>左边是 $n$ 个 $1+\frac1n$ 的乘积。再乘上一个 $1$ 凑成 $n+1$ 个数，用“几何平均 $<$ 算术平均”。</x-analysis>
<x-sol>
<p>对 $n+1$ 个正数 $\underbrace{1+\tfrac1n,\ \cdots,\ 1+\tfrac1n}_{n\ \text{个}},\ 1$ 用平均值不等式（它们不全相等，所以不等号严格）：</p>
<p>$$\sqrt[n+1]{\left(1+\frac1n\right)^n\cdot1}<\frac{n\left(1+\frac1n\right)+1}{n+1}=\frac{n+2}{n+1}=1+\frac1{n+1}.$$</p>
<p>两边 $n+1$ 次方即得结论。</p>
</x-sol>
<x-remark>这说明数列 $\left(1+\frac1n\right)^n$ 严格单调增加。§2.4 将证明它还有上界，从而收敛，其极限就是自然对数的底 $e$。</x-remark>
</x-ex>

<x-ex t="用平均值不等式求最值" id="ex-box">
<p>(1) 设 $x>0$，求 $x+\frac4x$ 的最小值；(2) 用边长为 $a$ 的正方形铁皮，在四角各剪去一个边长为 $x$ 的小正方形，折成无盖的盒子。$x$ 取何值时盒子的容积最大？</p>
<x-sol>
<p>(1) $x+\frac4x\ge2\sqrt{x\cdot\frac4x}=4$，等号当且仅当 $x=\frac4x$，即 $x=2$ 时成立，最小值为 $4$。</p>
<p>(2) 容积 $V(x)=x(a-2x)^2$，$0<x<\frac a2$。直接对 $x,\ a-2x,\ a-2x$ 用平均值不等式行不通——它们的和 $2a-3x$ 不是常数。把 $x$ 换成 $4x$ 来“配平”：</p>
<p>$$4V=4x\cdot(a-2x)\cdot(a-2x)\le\left(\frac{4x+(a-2x)+(a-2x)}3\right)^3=\left(\frac{2a}3\right)^3,$$</p>
<p>所以 $V\le\frac{2a^3}{27}$，等号当且仅当 $4x=a-2x$，即 $x=\frac a6$ 时成立。例如 $a=60$ cm 时应剪去边长 $10$ cm 的小正方形，最大容积为 $16000\ \text{cm}^3$。</p>
</x-sol>
<x-remark>用平均值不等式求最值要做到“一正、二定、三相等”：各项为正；和（或积）是常数；等号能取到。(2) 中“乘以 $4$”就是为了让和成为常数。第五章学了导数以后，这类问题有更一般的方法，但平均值不等式往往更快。</x-remark>
</x-ex>

<x-app t="哪一种“平均”才对">
<ul>
<li><b>往返的平均速度</b>：去程速度 $v_1$，返程速度 $v_2$，单程路程都是 $s$，则平均速度 $=\frac{2s}{s/v_1+s/v_2}=\frac{2}{1/v_1+1/v_2}$，是<em>调和平均</em>。去程 $60$ km/h、返程 $40$ km/h，平均速度是 $48$ km/h 而不是 $50$ km/h。</li>
<li><b>平均增长率</b>：某产品连续三年销量的增长率分别为 $10\%$、$20\%$、$-5\%$，三年总增长倍数为 $1.1\times1.2\times0.95=1.254$。年平均增长率 $r$ 应满足 $(1+r)^3=1.254$，即 $1+r$ 是 $1.1,\ 1.2,\ 0.95$ 的<em>几何平均</em>，$r\approx7.84\%$，比算术平均 $8.33\%$ 小。</li>
<li><b>定投的平均成本</b>：每期投入相同金额购买价格波动的基金，平均每份的成本是各期价格的<em>调和平均</em>，它不超过价格的算术平均——这就是“定期定额投资”能摊低成本的数学原因（见习题）。</li>
</ul>
</x-app>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>映射 $f:X\to Y$ 要求<em>每个</em> $x$ 有<em>唯一</em>的像；单射：不同的点像不同；满射：值域等于 $Y$；双射：一一对应。</li>
<li>复合 $g\circ f$ 要求 $R_f\subset D_g$，一般 $g\circ f\ne f\circ g$；严格单调函数必有反函数，且单调方向相同。</li>
<li>像与原像：$f(A_1\cap A_2)\subset f(A_1)\cap f(A_2)$ 一般不取等号，原像则与并、交、补运算完全相容。</li>
<li>函数由定义域与对应法则决定；自然定义域是使式子有意义的 $x$ 的全体。</li>
<li>初等函数 = 基本初等函数经有限次四则运算与复合；双曲函数满足 $\ch^2x-\sh^2x=1$，$\arsinh x=\ln\left(x+\sqrt{x^2+1}\right)$。</li>
<li>$\sgn x$、$[x]$（满足 $x-1<[x]\le x$）、Dirichlet 函数、Riemann 函数是今后检验各种概念的“试金石”。</li>
<li>有界、单调、奇偶、周期的定义及其否定形式都要会写；判断奇偶性先看定义域是否对称。</li>
<li>三角不等式 $\bigl||a|-|b|\bigr|\le|a\pm b|\le|a|+|b|$；Bernoulli 不等式 $(1+x)^n\ge1+nx$；平均值不等式 $H_n\le G_n\le A_n$，等号当且仅当各数相等。</li>
</ul>
</x-sum>
`);
MA.add("1-2", String.raw`
<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对映射与函数的理解">
<x-q type="choice" answer="C">
<x-stem>下列对应中，哪一个是从 $\R$ 到 $\R$ 的映射？</x-stem>
<x-opt>$x\mapsto\pm\sqrt{|x|}$</x-opt>
<x-opt>$x\mapsto\ln|x|$</x-opt>
<x-opt>$x\mapsto[x]$</x-opt>
<x-opt>$x\mapsto\tan x$</x-opt>
<x-exp>A 中一个 $x$ 对应两个值；B 在 $x=0$ 处无定义；D 在 $x=k\pi+\frac\pi2$ 处无定义。只有 C 对每个实数给出唯一的值。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>映射 $f:[0,+\infty)\to[0,+\infty)$，$f(x)=x^2$ 是</x-stem>
<x-opt>单射但不是满射</x-opt>
<x-opt>满射但不是单射</x-opt>
<x-opt>双射</x-opt>
<x-opt>既不是单射也不是满射</x-opt>
<x-exp>见 <x-ref to="ex-sq"></x-ref> 的 (4)：限制了定义域和陪域之后，$x^2$ 成为双射，逆映射是 $\sqrt y$。</x-exp>
</x-q>
<x-q type="fill" answer="2" ph="填一个数">
<x-stem>函数 $y=\sqrt{4-x^2}+\ln(x-1)$ 的定义域是 $(1,b]$，则 $b=$</x-stem>
<x-exp>$4-x^2\ge0$ 且 $x>1$，定义域为 $(1,2]$。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>$f(x)=\ln x^2$ 与 $g(x)=2\ln x$ 是同一个函数。</x-stem>
<x-exp>定义域不同：$f$ 的定义域是 $\R\setminus\{0\}$，$g$ 的定义域是 $(0,+\infty)$。</x-exp>
</x-q>
<x-q type="fill" answer="-4" ph="填一个整数">
<x-stem>$[-\pi]=$</x-stem>
<x-exp>不超过 $-3.14159\cdots$ 的最大整数是 $-4$，而不是 $-3$。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>$|\sin x|$ 的最小正周期是</x-stem>
<x-opt>$\frac\pi2$</x-opt>
<x-opt>$\pi$</x-opt>
<x-opt>$2\pi$</x-opt>
<x-opt>它不是周期函数</x-opt>
<x-exp>$|\sin(x+\pi)|=|-\sin x|=|\sin x|$，所以 $\pi$ 是周期。又 $|\sin x|=0\iff x=k\pi$，任何周期 $T$ 都满足 $|\sin T|=|\sin0|=0$，所以 $T$ 是 $\pi$ 的整数倍。最小正周期为 $\pi$。</x-exp>
</x-q>
<x-q type="multi" answer="ABDE">
<x-stem>下列函数中，奇函数有（多选）</x-stem>
<x-opt>$x^3+\sin x$</x-opt>
<x-opt>$\ln\left(x+\sqrt{x^2+1}\right)$</x-opt>
<x-opt>$x^2\cos x$</x-opt>
<x-opt>$e^x-e^{-x}$</x-opt>
<x-opt>$\frac{e^x+1}{e^x-1}$</x-opt>
<x-exp>C 是偶函数。E 的定义域 $x\ne0$ 关于原点对称，$\frac{e^{-x}+1}{e^{-x}-1}$ 的分子分母同乘 $e^x$ 得 $\frac{1+e^x}{1-e^x}$，恰为原式的相反数。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>两个严格单调减少的函数复合（若复合有意义）后是严格单调增加的。</x-stem>
<x-exp>$x_1<x_2\Rightarrow f(x_1)>f(x_2)\Rightarrow g(f(x_1))<g(f(x_2))$。同理，增函数与减函数复合得减函数。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若 $f$ 在 $\R$ 上存在反函数，则 $f$ 在 $\R$ 上单调。</x-stem>
<x-exp>反例：$f(x)=x$（$x\in\Q$），$f(x)=-x$（$x\notin\Q$）是双射，但在任何区间上都不单调。不过第三章会证明：区间上的<em>连续</em>函数若有反函数，则一定严格单调。</x-exp>
</x-q>
<x-q type="fill" answer="48" ph="单位：km/h">
<x-stem>汽车去程速度 $60$ km/h，沿原路返回时速度 $40$ km/h，往返全程的平均速度是多少 km/h？</x-stem>
<x-exp>平均速度是调和平均 $\frac{2}{1/60+1/40}=48$，不是算术平均 $50$。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>对任意实数 $a,b$，下列不等式一定成立的是</x-stem>
<x-opt>$|a-b|\le|a|-|b|$</x-opt>
<x-opt>$|a+b|\ge|a|+|b|$</x-opt>
<x-opt>$|a|-|b|\le|a-b|$</x-opt>
<x-opt>$|a-b|\ge|a|+|b|$</x-opt>
<x-exp>由 $|a|=|(a-b)+b|\le|a-b|+|b|$ 得 C。A、B、D 都有反例：A 取 $a=0,b=1$；B 取 $a=1,b=-1$；D 取 $a=b=1$。</x-exp>
</x-q>
</x-quiz>

<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”。</p>

<x-prob level="基础" t="求定义域">
<p>求下列函数的自然定义域：(1) $y=\sqrt{3-2x-x^2}$；(2) $y=\ln(\sin x)$；(3) $y=\frac{1}{\ln(1-x)}$；(4) $y=\sqrt{\lg\frac{5x-x^2}{4}}$。</p>
<x-hint>(4) 根号下非负要求 $\lg\frac{5x-x^2}4\ge0$，即 $\frac{5x-x^2}4\ge1$（这时真数自然大于零）。</x-hint>
<x-ans>
<p>(1) $3-2x-x^2\ge0\iff x^2+2x-3\le0\iff(x+3)(x-1)\le0$，定义域为 $[-3,1]$。</p>
<p>(2) 需 $\sin x>0$，定义域为 $\bigcup_{k\in\Z}(2k\pi,\,2k\pi+\pi)$。</p>
<p>(3) 需 $1-x>0$ 且 $\ln(1-x)\ne0$，即 $x<1$ 且 $x\ne0$，定义域为 $(-\infty,0)\cup(0,1)$。</p>
<p>(4) $\frac{5x-x^2}4\ge1\iff x^2-5x+4\le0\iff(x-1)(x-4)\le0$，定义域为 $[1,4]$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="是否为同一个函数">
<p>下列各组函数是否相等？说明理由。(1) $f(x)=x$，$g(x)=(\sqrt x)^2$；(2) $f(x)=|x|$，$g(x)=x\sgn x$；(3) $f(x)=1$，$g(x)=\sec^2x-\tan^2x$；(4) $f(x)=x$，$g(x)=e^{\ln x}$；(5) $f(x)=\sqrt[3]{x^3}$，$g(x)=x$。</p>
<x-ans>
<p>(1) 不相等：$g$ 的定义域是 $[0,+\infty)$。</p>
<p>(2) 相等：定义域都是 $\R$；$x>0$ 时 $x\sgn x=x$，$x<0$ 时 $x\sgn x=-x$，$x=0$ 时为 $0$，恰好就是 $|x|$。</p>
<p>(3) 不相等：$g$ 在 $x=k\pi+\frac\pi2$ 处无定义。</p>
<p>(4) 不相等：$g$ 的定义域是 $(0,+\infty)$。</p>
<p>(5) 相等：实数的立方根唯一，$\sqrt[3]{x^3}=x$ 对一切实数成立（对比 $\sqrt{x^2}=|x|$）。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="复合函数的计算">
<div>
<p>(1) 设 $f(x)=\frac{1}{1-x}$，求 $f\circ f$ 与 $f\circ f\circ f$，并指出它们的定义域；</p>
<p>(2) 设 $f(x+1)=x^2+3x+5$，求 $f(x)$；</p>
<p>(3) 设 $f(x)=x+1$（$x<0$），$f(x)=x^2$（$x\ge0$），求 $f(f(x))$。</p>
</div>
<x-hint>(2) 令 $t=x+1$，把右边写成 $t$ 的式子。(3) 分别讨论 $f(x)<0$ 与 $f(x)\ge0$ 对应的 $x$ 的范围。</x-hint>
<x-ans>
<p>(1) $f(f(x))=\frac{1}{1-\frac1{1-x}}=\frac{1-x}{-x}=\frac{x-1}{x}$，定义域为 $x\ne0,1$（$x=1$ 时 $f(x)$ 无定义；$x=0$ 时 $f(x)=1$，不在 $f$ 的定义域内）。$f(f(f(x)))=\frac{1}{1-\frac{x-1}x}=x$，定义域同样是 $x\ne0,1$。所以在 $\R\setminus\{0,1\}$ 上 $f\circ f\circ f$ 是恒等映射。</p>
<p>(2) 令 $t=x+1$，则 $x=t-1$，$f(t)=(t-1)^2+3(t-1)+5=t^2+t+3$，即 $f(x)=x^2+x+3$。</p>
<p>(3) $x<-1$ 时 $f(x)=x+1<0$，$f(f(x))=x+2$；$-1\le x<0$ 时 $f(x)=x+1\in[0,1)$，$f(f(x))=(x+1)^2$；$x\ge0$ 时 $f(x)=x^2\ge0$，$f(f(x))=x^4$。即</p>
<p>$$f(f(x))=\begin{cases}x+2,&x<-1,\\ (x+1)^2,&-1\le x<0,\\ x^4,&x\ge0.\end{cases}$$</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="判断单射与满射">
<p>判断下列映射是否为单射、满射、双射：(1) $f:\R\to\R$，$f(x)=x^3$；(2) $f:\Np\to\Np$，$f(n)=n+1$；(3) $f:\Z\to\Z$，$f(n)=\left[\frac n2\right]$；(4) $f:\R\to[-1,1]$，$f(x)=\sin x$；(5) $f:\Np\to\Z$，$n$ 为偶数时 $f(n)=\frac n2$，$n$ 为奇数时 $f(n)=\frac{1-n}{2}$。</p>
<x-ans>
<p>(1) 双射：$x^3$ 严格增（<x-ref to="ex-cube"></x-ref>），每个 $y$ 有原像 $\sqrt[3]y$。</p>
<p>(2) 单射，但不是满射（$1$ 没有原像）。这是 Hilbert 旅馆的数学版本：无限集可以与自己的真子集一一对应。</p>
<p>(3) 满射（$m$ 是 $2m$ 的像），不是单射（$f(0)=f(1)=0$）。</p>
<p>(4) 满射，不是单射（$\sin0=\sin\pi$）。</p>
<p>(5) 双射：偶数 $2,4,6,\cdots$ 依次映为 $1,2,3,\cdots$，奇数 $1,3,5,\cdots$ 依次映为 $0,-1,-2,\cdots$。这正是把整数排成 $0,1,-1,2,-2,\cdots$ 的方法。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="判断奇偶性">
<p>判断下列函数的奇偶性：(1) $f(x)=\frac{a^x+a^{-x}}{2}$（$a>0$）；(2) $f(x)=\ln\frac{1-x}{1+x}$；(3) $f(x)=x^3-x+1$；(4) $f(x)=\sin x+\cos x$；(5) $f(x)=\frac{x}{e^x-1}+\frac x2$。</p>
<x-hint>(5) 先通分：$\frac{x}{e^x-1}+\frac x2=\frac x2\cdot\frac{e^x+1}{e^x-1}$。</x-hint>
<x-ans>
<p>(1) 偶函数。</p>
<p>(2) 定义域 $(-1,1)$ 关于原点对称，$f(-x)=\ln\frac{1+x}{1-x}=-f(x)$，奇函数。</p>
<p>(3) $f(0)=1\ne0$，不是奇函数；$f(2)=7\ne f(-2)=-5$，不是偶函数。非奇非偶。</p>
<p>(4) $f\left(\frac\pi4\right)=\sqrt2$，$f\left(-\frac\pi4\right)=0$，既不满足 $f(-x)=f(x)$，也不满足 $f(-x)=-f(x)$，非奇非偶。</p>
<p>(5) 定义域 $x\ne0$ 关于原点对称。$\frac{e^x+1}{e^x-1}$ 是奇函数（见概念自测），$\frac x2$ 是奇函数，两者之积是偶函数。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="复合映射的单射与满射">
<p>设 $f:X\to Y$，$g:Y\to Z$。证明：(1) 若 $f,g$ 都是单射（满射），则 $g\circ f$ 也是单射（满射）；(2) 若 $g\circ f$ 是单射，则 $f$ 是单射；若 $g\circ f$ 是满射，则 $g$ 是满射；(3) 举例说明：$g\circ f$ 是单射时，$g$ 不一定是单射。</p>
<x-ans>
<p>(1) 单射：若 $g(f(x_1))=g(f(x_2))$，由 $g$ 单射得 $f(x_1)=f(x_2)$，再由 $f$ 单射得 $x_1=x_2$。满射：任取 $z\in Z$，由 $g$ 满射，存在 $y\in Y$ 使 $g(y)=z$；由 $f$ 满射，存在 $x\in X$ 使 $f(x)=y$，于是 $(g\circ f)(x)=z$。</p>
<p>(2) 若 $f(x_1)=f(x_2)$，则 $g(f(x_1))=g(f(x_2))$，由 $g\circ f$ 单射得 $x_1=x_2$。若 $g\circ f$ 满射，则每个 $z\in Z$ 都可写成 $z=g(f(x))$，即 $z$ 是 $f(x)\in Y$ 在 $g$ 下的像，所以 $g$ 是满射。</p>
<p>(3) 取 $X=\{0\}$，$Y=Z=\R$，$f(0)=0$，$g(y)=y^2$。$g\circ f$ 的定义域只有一个点，当然是单射，但 $g$ 不是单射。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="单射与像的交">
<p>设 $f:X\to Y$。证明：$f$ 是单射，当且仅当对 $X$ 的任意子集 $A,B$ 都有 $f(A\cap B)=f(A)\cap f(B)$。</p>
<x-hint>“$\supset$”方向：任取 $y\in f(A)\cap f(B)$，则 $y=f(a)=f(b)$，其中 $a\in A$，$b\in B$。反方向可以取单点集 $A=\{x_1\}$，$B=\{x_2\}$。</x-hint>
<x-ans>
<p>设 $f$ 是单射。由 <x-ref to="prop-img"></x-ref>，只需证 $f(A)\cap f(B)\subset f(A\cap B)$。任取 $y\in f(A)\cap f(B)$，则存在 $a\in A$，$b\in B$ 使 $y=f(a)=f(b)$。由单射得 $a=b$，于是 $a\in A\cap B$，$y=f(a)\in f(A\cap B)$。</p>
<p>反之，设等式对一切子集成立。若有 $x_1\ne x_2$ 而 $f(x_1)=f(x_2)$，取 $A=\{x_1\}$，$B=\{x_2\}$，则 $f(A\cap B)=f(\varnothing)=\varnothing$，而 $f(A)\cap f(B)=\{f(x_1)\}\ne\varnothing$，矛盾。所以 $f$ 是单射。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="奇偶分解">
<p>设 $f$ 的定义域关于原点对称。证明 $f$ 可以唯一地表示为一个偶函数与一个奇函数之和，并写出 $e^x$ 与 $\frac1{1-x}$（$|x|<1$）的这种分解。</p>
<x-hint>若 $f=g+h$，$g$ 偶、$h$ 奇，则 $f(-x)=g(x)-h(x)$。与 $f(x)=g(x)+h(x)$ 联立解出 $g,h$。</x-hint>
<x-ans>
<p>唯一性：若 $f=g+h$，$g$ 偶、$h$ 奇，则 $f(-x)=g(x)-h(x)$，与 $f(x)=g(x)+h(x)$ 联立得</p>
<p>$$g(x)=\frac{f(x)+f(-x)}2,\qquad h(x)=\frac{f(x)-f(-x)}2,$$</p>
<p>即 $g,h$ 由 $f$ 唯一确定。存在性：按这两个公式定义 $g,h$，直接验证 $g$ 是偶函数、$h$ 是奇函数，且 $g+h=f$。</p>
<p>$e^x=\ch x+\sh x$；$\frac1{1-x}=\frac1{1-x^2}+\frac x{1-x^2}$，因为 $\frac12\left(\frac1{1-x}+\frac1{1+x}\right)=\frac1{1-x^2}$，$\frac12\left(\frac1{1-x}-\frac1{1+x}\right)=\frac x{1-x^2}$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="求反函数">
<p>求下列函数的反函数及其定义域：(1) $y=\frac{2x+1}{x-3}$；(2) $y=x^2-2x$，$x\in(-\infty,1]$；(3) $y=\operatorname{th}x$；(4) $y=\ch x$，$x\in[0,+\infty)$。</p>
<x-ans>
<p>(1) 由 $y(x-3)=2x+1$ 得 $x(y-2)=3y+1$，$x=\frac{3y+1}{y-2}$。反函数为 $y=\frac{3x+1}{x-2}$，定义域 $x\ne2$（即原函数的值域 $y=2+\frac7{x-3}\ne2$）。</p>
<p>(2) $y=(x-1)^2-1$，由 $x\le1$ 得 $x-1=-\sqrt{y+1}$。反函数为 $y=1-\sqrt{x+1}$，$x\ge-1$。</p>
<p>(3) $y=\frac{e^{2x}-1}{e^{2x}+1}$，解得 $e^{2x}=\frac{1+y}{1-y}$。反函数为 $\artanh x=\frac12\ln\frac{1+x}{1-x}$，$x\in(-1,1)$。</p>
<p>(4) 由 $e^{2x}-2ye^x+1=0$ 得 $e^x=y\pm\sqrt{y^2-1}$。$x\ge0$ 要求 $e^x\ge1$，而 $y-\sqrt{y^2-1}=\frac{1}{y+\sqrt{y^2-1}}\le1$（仅在 $y=1$ 时取等号，此时两根相同），所以取正号。反函数为 $\arcosh x=\ln\left(x+\sqrt{x^2-1}\right)$，$x\ge1$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="对称性与周期性">
<p>设 $f$ 定义在 $\R$ 上，$a<b$。(1) 若 $f$ 的图像关于直线 $x=a$ 与 $x=b$ 都对称，证明 $2(b-a)$ 是 $f$ 的周期；(2) 若 $f$ 的图像关于点 $(a,0)$ 与直线 $x=b$ 都对称，证明 $4(b-a)$ 是 $f$ 的周期。</p>
<x-hint>图像关于直线 $x=a$ 对称 $\iff f(x)=f(2a-x)$ 对一切 $x$ 成立；关于点 $(a,0)$ 对称 $\iff f(x)=-f(2a-x)$。</x-hint>
<x-ans>
<p>(1) 由 $f(x)=f(2a-x)$，$f(x)=f(2b-x)$ 得 $f(x+2(b-a))=f\bigl(2b-(x+2b-2a)\bigr)=f(2a-x)=f(x)$。</p>
<p>(2) 由 $f(x)=-f(2a-x)$，$f(x)=f(2b-x)$ 得 $f(x+2(b-a))=f(2a-x)=-f(x)$，再由 <x-ref to="ex-period"></x-ref> 的 (3)，$4(b-a)$ 是周期。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="取整函数的不等式">
<p>证明：对任意实数 $x,y$，(1) $[x]+[y]\le[x+y]\le[x]+[y]+1$；(2) $[2x]=[x]+\left[x+\frac12\right]$。</p>
<x-hint>(1) 写 $x=[x]+\{x\}$，$y=[y]+\{y\}$，注意 $0\le\{x\}+\{y\}<2$。(2) 按 $\{x\}<\frac12$ 与 $\{x\}\ge\frac12$ 分两种情况。</x-hint>
<x-ans>
<p>(1) 由 <x-ref to="ex-floor"></x-ref> 的 (2)，$[x+y]=\bigl[[x]+[y]+(\{x\}+\{y\})\bigr]=[x]+[y]+\bigl[\{x\}+\{y\}\bigr]$，而 $0\le\{x\}+\{y\}<2$，所以 $\bigl[\{x\}+\{y\}\bigr]$ 等于 $0$ 或 $1$。</p>
<p>(2) 记 $n=[x]$，$s=\{x\}$。若 $0\le s<\frac12$，则 $[2x]=[2n+2s]=2n$，$\left[x+\frac12\right]=\left[n+s+\frac12\right]=n$，等式成立。若 $\frac12\le s<1$，则 $[2x]=2n+1$，$\left[x+\frac12\right]=n+1$，等式也成立。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="两个周期函数之和未必是周期函数">
<p>证明 $f(x)=\sin x+\sin\sqrt2x$ 不是周期函数。</p>
<x-hint>设 $T>0$ 是周期，则 $f(x+T)+f(x-T)=2f(x)$ 对一切 $x$ 成立。用 $\sin(u+v)+\sin(u-v)=2\sin u\cos v$ 展开左边。</x-hint>
<x-hint>得到 $(1-\cos T)\sin x+(1-\cos\sqrt2T)\sin\sqrt2x=0$ 后，代入适当的 $x$，例如使 $\sin\sqrt2x=0$ 而 $\sin x\ne0$ 的点。</x-hint>
<x-ans>
<p>设 $T>0$ 是 $f$ 的周期，则 $f(x+T)=f(x)$，$f(x-T)=f(x)$，所以 $f(x+T)+f(x-T)=2f(x)$。而</p>
<p>$$f(x+T)+f(x-T)=2\sin x\cos T+2\sin\sqrt2x\cos\sqrt2T,$$</p>
<p>于是对一切 $x$ 有 $(1-\cos T)\sin x+(1-\cos\sqrt2T)\sin\sqrt2x=0$。</p>
<p>取 $x=\frac{\pi}{\sqrt2}$：$\sin\sqrt2x=\sin\pi=0$，而 $\frac\pi{\sqrt2}$ 不是 $\pi$ 的整数倍，$\sin\frac\pi{\sqrt2}\ne0$，所以 $\cos T=1$。取 $x=\pi$：$\sin x=0$，而 $\sqrt2$ 不是整数，$\sin\sqrt2\pi\ne0$，所以 $\cos\sqrt2T=1$。于是 $T=2m\pi$，$\sqrt2T=2n\pi$（$m,n$ 为正整数），得 $\sqrt2=\frac nm$ 是有理数，矛盾。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="Riemann 函数的两个性质">
<div>
<p>设 $R(x)$ 是 Riemann 函数。</p>
<p>(1) 证明 $R$ 是以 $1$ 为周期的周期函数；</p>
<p>(2) 证明：对任意 $\eps>0$，$[0,1]$ 中满足 $R(x)\ge\eps$ 的点只有有限个；</p>
<p>(3) $[0,1]$ 中满足 $R(x)\ge\frac15$ 的点共有几个？</p>
</div>
<x-check answer="11" unit="个">(3) 点的个数</x-check>
<x-hint>(1) $x=\frac pq$（既约）时，$x+1=\frac{p+q}{q}$ 仍是既约分数。(2) $R(x)\ge\eps$ 意味着 $x=\frac pq$ 且 $q\le\frac1\eps$。</x-hint>
<x-ans>
<p>(1) 若 $x$ 是无理数，则 $x+1$ 也是无理数，$R(x+1)=0=R(x)$。若 $x=\frac pq$ 既约，则 $p+q$ 与 $q$ 的公因数也是 $p$ 与 $q$ 的公因数，所以 $\frac{p+q}q$ 仍既约，$R(x+1)=\frac1q=R(x)$。</p>
<p>(2) $R(x)\ge\eps>0$ 说明 $x$ 是有理数 $\frac pq$（既约）且 $\frac1q\ge\eps$，即 $q\le\frac1\eps$。对每个这样的 $q$，$[0,1]$ 中分母为 $q$ 的分数 $\frac pq$ 满足 $0\le p\le q$，至多 $q+1$ 个；而 $q$ 只有有限种取值，所以这样的点只有有限个。</p>
<p>(3) 分母 $q\le5$ 的既约分数：$q=1$：$0,1$；$q=2$：$\frac12$；$q=3$：$\frac13,\frac23$；$q=4$：$\frac14,\frac34$；$q=5$：$\frac15,\frac25,\frac35,\frac45$。共 $2+1+2+2+4=11$ 个。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="Cauchy 函数方程">
<p>设 $f:\R\to\R$ 对一切 $x,y\in\R$ 满足 $f(x+y)=f(x)+f(y)$。(1) 证明对一切有理数 $r$，$f(r)=rf(1)$；(2) 若 $f$ 还是单调函数，证明对一切实数 $x$，$f(x)=xf(1)$。</p>
<x-hint>(1) 依次证明 $f(0)=0$，$f(-x)=-f(x)$，$f(nx)=nf(x)$（$n\in\Np$），再令 $x=\frac mn$。</x-hint>
<x-hint>(2) 不妨设 $f$ 单调增，记 $c=f(1)$。对任意 $x$ 和正整数 $n$，取有理数 $r,s$ 使 $r\le x\le s$ 且 $s-r<\frac1n$（有理数的稠密性，§2.1），则 $rc\le f(x)\le sc$。</x-hint>
<x-ans>
<p>(1) 令 $x=y=0$ 得 $f(0)=0$；令 $y=-x$ 得 $f(-x)=-f(x)$；归纳得 $f(nx)=nf(x)$。对 $r=\frac mn$（$m\in\Z$，$n\in\Np$），$nf\left(\frac mn\right)=f(m)=mf(1)$（$m<0$ 时利用奇性），所以 $f(r)=rf(1)$。</p>
<p>(2) 不妨设 $f$ 单调增（否则考虑 $-f$），记 $c=f(1)$，则 $c\ge f(0)=0$。任给实数 $x$ 与正整数 $n$，取有理数 $r,s$ 使 $r\le x\le s$，$s-r<\frac1n$。由单调性与 (1)，$rc=f(r)\le f(x)\le f(s)=sc$；又 $rc\le xc\le sc$，所以 $|f(x)-xc|\le(s-r)c\le\frac cn$。由 $n$ 的任意性，$f(x)=xc$。</p>
<p class="small muted">如果不加单调性之类的条件，可以证明（借助选择公理）存在不是 $f(x)=cx$ 形式的解，它们的图像在平面上处处稠密。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="平均值不等式的另一种证明">
<p>Cauchy 给出过 $G_n\le A_n$ 的如下证明，请补全细节：(1) 由 $n=2$ 的情形出发，证明不等式对一切 $n=2^k$ 成立；(2) 证明：若不等式对 $n$ 个数成立，则对 $n-1$ 个数也成立；(3) 由 (1)(2) 推出对一切正整数 $n$ 成立。</p>
<x-hint>(2) 对 $a_1,\cdots,a_{n-1}$ 以及它们的算术平均值 $A$ 这 $n$ 个数使用不等式。</x-hint>
<x-ans>
<p>(1) $n=2$：$\frac{a+b}2-\sqrt{ab}=\frac{(\sqrt a-\sqrt b)^2}2\ge0$。设对 $2^k$ 个数成立，把 $2^{k+1}$ 个数分成前后两组，每组 $2^k$ 个，几何平均分别为 $G',G''$，算术平均分别为 $A',A''$，则</p>
<p>$$G_{2^{k+1}}=\sqrt{G'G''}\le\frac{G'+G''}2\le\frac{A'+A''}2=A_{2^{k+1}}.$$</p>
<p>(2) 设对 $n$ 个数成立。对正数 $a_1,\cdots,a_{n-1}$，记 $A=\frac{a_1+\cdots+a_{n-1}}{n-1}$，对 $a_1,\cdots,a_{n-1},A$ 这 $n$ 个数用不等式：</p>
<p>$$\sqrt[n]{a_1\cdots a_{n-1}A}\le\frac{a_1+\cdots+a_{n-1}+A}{n}=\frac{(n-1)A+A}{n}=A.$$</p>
<p>两边 $n$ 次方得 $a_1\cdots a_{n-1}A\le A^n$，即 $a_1\cdots a_{n-1}\le A^{n-1}$。</p>
<p>(3) 对任意 $n$，取 $k$ 使 $2^k\ge n$，由 (1) 知对 $2^k$ 个数成立，再用 (2) 逐步降到 $n$。这种“先跳跃式向上、再逐步向下”的论证称为<em>反向归纳法</em>。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="出租车计费（续）">
<div>
<p>按正文中的计费规则（起步价 $13$ 元含 $3$ km，之后每公里 $2.3$ 元，不足 $1$ km 按 $1$ km 计）：</p>
<p>(1) 行驶 $10$ km 需付多少元？</p>
<p>(2) 某乘客付了 $33.7$ 元，他的行驶里程在什么范围内？最多行驶了多少千米？</p>
<p>(3) 把一段 $10$ km 的行程拆成两段 $5$ km 分别打车，共需多少元？哪种方式更省钱？</p>
</div>
<x-check answer="29.1" unit="元">(1) 车费</x-check>
<x-check answer="12" unit="km">(2) 最多行驶</x-check>
<x-check answer="35.2" unit="元">(3) 两段的总费用</x-check>
<x-hint>(2) 解方程 $13+2.3\lceil x-3\rceil=33.7$，得 $\lceil x-3\rceil=9$，再由上取整的定义写出 $x$ 的范围。</x-hint>
<x-ans>
<p>(1) $C(10)=13+2.3\times7=29.1$ 元。</p>
<p>(2) $\lceil x-3\rceil=\frac{33.7-13}{2.3}=9$，即 $8<x-3\le9$，$11<x\le12$，最多行驶 $12$ km。$C$ 不是单射，所以从车费只能反推出里程的一个<em>范围</em>——它没有反函数。</p>
<p>(3) $2C(5)=2\times(13+2.3\times2)=35.2$ 元，比一次打车多 $6.1$ 元——起步价被付了两次。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="阶梯电价">
<div>
<p>某地居民用电实行阶梯电价：每月用电量中不超过 $200$ kWh 的部分每 kWh $0.5$ 元；超过 $200$ 但不超过 $400$ kWh 的部分每 kWh $0.55$ 元；超过 $400$ kWh 的部分每 kWh $0.8$ 元。</p>
<p>(1) 写出月电费 $E$（元）关于用电量 $x$（kWh）的分段表达式；</p>
<p>(2) 某户本月用电 $450$ kWh，应缴电费多少元？</p>
<p>(3) 某户本月缴费 $155$ 元，用电多少 kWh？</p>
</div>
<x-check answer="250" unit="元">(2) 电费</x-check>
<x-check answer="300" unit="kWh">(3) 用电量</x-check>
<x-hint>$E$ 是严格增函数，有反函数，所以 (3) 的答案唯一。先判断 $155$ 元落在哪一档：用满第一档要 $100$ 元，用满第二档要 $210$ 元。</x-hint>
<x-ans>
<p>(1)</p>
<p>$$E(x)=\begin{cases}0.5x,&0\le x\le200,\\ 100+0.55(x-200),&200<x\le400,\\ 210+0.8(x-400),&x>400.\end{cases}$$</p>
<p>(2) $E(450)=210+0.8\times50=250$ 元。</p>
<p>(3) $100<155\le210$，属于第二档：$100+0.55(x-200)=155$，得 $x=300$ kWh。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="定期定额投资的平均成本">
<div>
<p>小王连续三个月，每月初用 $1000$ 元买入某基金，三次的价格分别是每份 $10$ 元、$8$ 元、$12.5$ 元。</p>
<p>(1) 他一共买到多少份？平均每份成本是多少元（保留三位小数）？</p>
<p>(2) 一般地，若 $n$ 期价格分别为 $p_1,\cdots,p_n$，每期投入相同金额，证明平均每份成本等于 $p_1,\cdots,p_n$ 的调和平均值，因而不超过它们的算术平均值。</p>
</div>
<x-check answer="305" unit="份">(1) 总份数</x-check>
<x-check answer="3000/305" tol="0.0005" unit="元">(1) 平均每份成本</x-check>
<x-ans>
<p>(1) 份数为 $\frac{1000}{10}+\frac{1000}{8}+\frac{1000}{12.5}=100+125+80=305$ 份，平均成本 $\frac{3000}{305}\approx9.836$ 元，低于三个价格的算术平均值 $\frac{10+8+12.5}{3}\approx10.167$ 元。</p>
<p>(2) 设每期投入 $m$ 元，总份数为 $\sum_{i=1}^n\frac m{p_i}$，平均成本为 $\frac{nm}{\sum_{i=1}^n m/p_i}=\frac{n}{\sum_{i=1}^n 1/p_i}=H_n$。由平均值不等式 $H_n\le A_n$，并且价格不全相同时严格小于。（这只说明平均成本低于平均价格，并不保证盈利——收益还取决于卖出时的价格。）</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="易拉罐的设计">
<div>
<p>要做一个容积为 $V$ 的有盖圆柱形罐子。</p>
<p>(1) 若各部分用料相同，证明表面积最小时高等于底面直径，即 $h=2r$；当 $V=500\ \text{cm}^3$ 时求这时的底面半径（精确到 $0.01$ cm）。</p>
<p>(2) 若顶盖和底面材料每单位面积的价格是侧面材料的 $k$ 倍，证明总费用最低时 $h=2kr$。</p>
</div>
<x-check answer="(250/pi)^(1/3)" tol="0.005" unit="cm">(1) 底面半径</x-check>
<x-hint>表面积 $S=2\pi r^2+2\pi rh$，用 $h=\frac{V}{\pi r^2}$ 消去 $h$ 得 $S=2\pi r^2+\frac{2V}r$。把 $\frac{2V}r$ 拆成 $\frac Vr+\frac Vr$，再对三项用平均值不等式。</x-hint>
<x-ans>
<p>(1) $S=2\pi r^2+\frac Vr+\frac Vr\ge3\sqrt[3]{2\pi r^2\cdot\frac Vr\cdot\frac Vr}=3\sqrt[3]{2\pi V^2}$，等号当且仅当 $2\pi r^2=\frac Vr$，即 $V=2\pi r^3$。又 $V=\pi r^2h$，所以 $h=2r$。$V=500$ 时 $r=\sqrt[3]{\frac{250}{\pi}}\approx4.30$ cm，$h\approx8.60$ cm。</p>
<p>(2) 以侧面材料单位面积的价格为单位，费用 $C=2k\pi r^2+2\pi rh=2k\pi r^2+\frac Vr+\frac Vr\ge3\sqrt[3]{2k\pi V^2}$，等号当且仅当 $2k\pi r^2=\frac Vr$，即 $V=2k\pi r^3$，从而 $h=\frac V{\pi r^2}=2kr$。</p>
<p>实际的饮料罐比 $h=2r$“瘦高”得多，原因之一正是顶盖比侧壁厚得多（相当于 (2) 中 $k>1$）；此外还要考虑手握、强度、堆放等因素。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="无盖水箱的用料">
<p>要做一个容积为 $32\ \text{m}^3$、底面为正方形的无盖长方体水箱。底面边长和高各为多少时用料最省？最少用料多少平方米？</p>
<x-check answer="48" unit="m²">最少用料</x-check>
<x-hint>设底面边长为 $x$，高为 $h$，则 $x^2h=32$，用料 $S=x^2+4xh=x^2+\frac{128}{x}$。把 $\frac{128}x$ 拆成两个相等的项。</x-hint>
<x-ans>
<p>$S=x^2+\frac{64}x+\frac{64}x\ge3\sqrt[3]{x^2\cdot\frac{64}x\cdot\frac{64}x}=3\sqrt[3]{4096}=48$，等号当且仅当 $x^2=\frac{64}x$，即 $x=4$ m，此时 $h=\frac{32}{16}=2$ m，最少用料 $48\ \text{m}^2$。</p>
</x-ans>
</x-prob>
`);
