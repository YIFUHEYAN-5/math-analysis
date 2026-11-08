/* §3.3 无穷小量与无穷大量的阶 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("3-3", String.raw`
<x-goal>
<ul>
<li>理解无穷小量（无穷大量）之间高阶、同阶、等价等概念，熟练使用记号 $o$、$O$ 与 $\sim$，会确定常见无穷小量的阶。</li>
<li>掌握 $o$ 记号的运算规则，理解“$u\sim v\iff u=v+o(v)$”的含义，会写简单的渐近展开（主部）。</li>
<li>掌握 $x\to+\infty$ 时 $(\ln x)^\beta$、$x^\alpha$、$a^x$ 的增长阶梯及其推论。</li>
<li>熟练运用等价量替换计算极限，并清楚替换的适用范围：只能替换乘积或商中的因子。</li>
<li>会用极限求曲线的渐近线，会用等价量估计近似公式的误差。</li>
</ul>
</x-goal>
<p>当 $x\to0$ 时，$\sin x$、$x^2$、$1-\cos x$ 都是无穷小量，但它们趋于 $0$ 的快慢并不相同：</p>
<table class="center">
<tr><th>$x$</th><th>$10^{-1}$</th><th>$10^{-2}$</th><th>$10^{-3}$</th></tr>
<tr><td>$\sin x$</td><td>$9.98334\times10^{-2}$</td><td>$9.99983\times10^{-3}$</td><td>$1.00000\times10^{-3}$</td></tr>
<tr><td>$x^2$</td><td>$1\times10^{-2}$</td><td>$1\times10^{-4}$</td><td>$1\times10^{-6}$</td></tr>
<tr><td>$1-\cos x$</td><td>$4.99583\times10^{-3}$</td><td>$4.99996\times10^{-5}$</td><td>$5.00000\times10^{-7}$</td></tr>
</table>
<p>$x$ 每缩小为原来的 $\frac1{10}$，$\sin x$ 也大约缩小为 $\frac1{10}$，$x^2$ 与 $1-\cos x$ 却缩小为 $\frac1{100}$，而且 $1-\cos x$ 始终约等于 $x^2$ 的一半。第二章用比值比较过数列趋于无穷的快慢（<x-ref to="2-3/thm-ladder"></x-ref>），本节用同样的办法比较函数：考察两个无穷小量（或无穷大量）之比的极限。这种比较既是计算极限的工具（等价量替换），也是近似计算的基础：“$\sin x\approx x$”有多准，要看 $\sin x-x$ 比 $x$ 小多少。</p>

<h2 id="small">无穷小量的比较</h2>
<p>若 $\lim\limits_{x\to x_0}u(x)=0$，则称 $u(x)$ 是 $x\to x_0$ 时的<em>无穷小量</em>。下面的定义写成 $x\to x_0$ 的形式，对 $x\to x_0^\pm$、$x\to\pm\infty$、$x\to\infty$ 以及数列（$n\to\infty$）同样适用，只要把“$x_0$ 的去心邻域”换成相应的范围。</p>
<x-def t="无穷小量的比较" id="def-ord">
<p>设 $u(x)$、$v(x)$ 都是 $x\to x_0$ 时的无穷小量，且 $v(x)$ 在 $x_0$ 的某个去心邻域中不等于 $0$。</p>
<ol>
<li>若 $\lim\limits_{x\to x_0}\frac{u(x)}{v(x)}=0$，则称 $x\to x_0$ 时 $u(x)$ 是 $v(x)$ 的<em>高阶无穷小量</em>（也称 $v(x)$ 是 $u(x)$ 的<em>低阶无穷小量</em>），记作 $u(x)=o(v(x))\ (x\to x_0)$。</li>
<li>若存在常数 $A>0$ 与 $\rho>0$，使得当 $0<|x-x_0|<\rho$ 时 $\left|\frac{u(x)}{v(x)}\right|\le A$，则记作 $u(x)=O(v(x))\ (x\to x_0)$。若还存在常数 $a>0$，使得当 $0<|x-x_0|<\rho$ 时 $a\le\left|\frac{u(x)}{v(x)}\right|\le A$，则称 $x\to x_0$ 时 $u(x)$ 与 $v(x)$ 是<em>同阶无穷小量</em>。特别地，若 $u(x)$ 与 $|x-x_0|^k$（$k>0$）是同阶无穷小量，则称 $u(x)$ 是 $x\to x_0$ 时的 <em>$k$ 阶无穷小量</em>。</li>
<li>若 $\lim\limits_{x\to x_0}\frac{u(x)}{v(x)}=1$，则称 $x\to x_0$ 时 $u(x)$ 与 $v(x)$ 是<em>等价无穷小量</em>，记作 $u(x)\sim v(x)\ (x\to x_0)$。</li>
</ol>
</x-def>
<x-note>
<ul>
<li><em>$O$ 比“同阶”宽</em>：$u=O(v)$ 只要求比值有界，$u$ 可以比 $v$ 小得多，例如 $x\to0$ 时 $x^2=O(x)$。$u$ 与 $v$ 同阶当且仅当 $u=O(v)$ 且 $v=O(u)$。若 $\lim\frac uv=c$ 是非零有限数，则由局部保序性（<x-ref to="3-1/thm-lorder"></x-ref>），在 $x_0$ 的某个去心邻域中 $\frac{|c|}2<\left|\frac uv\right|<\frac{3|c|}2$，所以 $u$ 与 $v$ 同阶，并且 $u\sim cv$。反过来，同阶并不要求比值有极限。</li>
<li><em>等号是单向的</em>：$o(v)$ 表示“某个比 $v$ 高阶的无穷小量”，是一类函数的代号。$x^2=o(x)$ 与 $x^3=o(x)$ 都成立，但不能由此得出 $x^2=x^3$；写成 $o(x)=x^2$ 也没有意义。含 $o$、$O$ 的等式中，“$=$”应读作“是”或“属于”，只能从左往右读。</li>
<li><em>$o(1)$ 与 $O(1)$</em>：$u=o(1)\ (x\to x_0)$ 就是说 $u$ 是无穷小量；$u=O(1)$ 就是说 $u$ 在 $x_0$ 的某个去心邻域中有界。这两个记号对任意函数都可以用。</li>
<li><em>并非任意两个无穷小量都能比出高低</em>：$x\to0$ 时 $\frac{x\sin(1/x)}x=\sin\frac1x$ 有界但没有极限，所以 $x\sin\frac1x=O(x)$，但它既不是 $x$ 的高阶无穷小量，也不与 $x$ 同阶（比值在 $x=\frac1{k\pi}$ 处等于 $0$）。</li>
<li>使用 $o$、$O$ 时必须指明极限过程：$x^2=o(x)\ (x\to0)$，而 $x=o(x^2)\ (x\to\infty)$。上下文明确时，可以省略“$(x\to x_0)$”。</li>
</ul>
</x-note>
<x-ex t="几个基本的比较" id="ex-ordbasic">
<p>当 $x\to0$ 时，比较下列无穷小量：(1) $\sin x$、$\tan x$、$1-\cos x$ 与 $x$；(2) $\sqrt{x+\sqrt x}$ 与 $x^{1/4}$（$x\to0^+$）；(3) $x\left(2+\sin\frac1x\right)$ 与 $x$；(4) $x^2\sin\frac1x$ 与 $x$、$x^2$。</p>
<x-sol>
<p>(1) 由 <x-ref to="3-1/thm-sinx"></x-ref> 与 <x-ref to="3-1/ex-trig"></x-ref>，$\sin x\sim x$，$\tan x\sim x$，$1-\cos x\sim\frac{x^2}2$。所以 $\sin x$、$\tan x$ 是 $1$ 阶无穷小量，$1-\cos x$ 是 $2$ 阶无穷小量，$1-\cos x=o(x)$。</p>
<p>(2) $\frac{\sqrt{x+\sqrt x}}{x^{1/4}}=\sqrt{\frac{x+\sqrt x}{\sqrt x}}=\sqrt{1+\sqrt x}\to1$，所以 $\sqrt{x+\sqrt x}\sim x^{\frac14}$，它是 $\frac14$ 阶无穷小量。阶不一定是整数。</p>
<p>(3) 比值 $2+\sin\frac1x$ 介于 $1$ 与 $3$ 之间，所以 $x\left(2+\sin\frac1x\right)$ 与 $x$ 同阶；但比值没有极限，二者不等价，也不存在常数 $c$ 使 $x\left(2+\sin\frac1x\right)\sim cx$。</p>
<p>(4) $\left|\frac{x^2\sin(1/x)}x\right|\le|x|\to0$，所以 $x^2\sin\frac1x=o(x)$；又 $\left|\frac{x^2\sin(1/x)}{x^2}\right|\le1$，所以 $x^2\sin\frac1x=O(x^2)$。但它不是 $2$ 阶无穷小量，因为比值 $\sin\frac1x$ 可以等于 $0$。</p>
</x-sol>
</x-ex>
<x-ex t="确定无穷小量的阶" id="ex-ordk">
<p>当 $x\to0$ 时，确定下列无穷小量的阶，并求出形如 $cx^k$ 的等价无穷小量：(1) $\tan x-\sin x$；(2) $\sqrt[3]{1+x}-1$；(3) $e^{x^2}-1$；(4) $\sqrt{1+x}-\sqrt{1-x}$。</p>
<x-sol>
<p>(1) $\tan x-\sin x=\tan x\,(1-\cos x)$，所以</p>
$$\frac{\tan x-\sin x}{x^3}=\frac{\tan x}x\cdot\frac{1-\cos x}{x^2}\to1\cdot\frac12=\frac12,$$
<p>$\tan x-\sin x$ 是 $3$ 阶无穷小量，$\tan x-\sin x\sim\frac{x^3}2$。</p>
<p>(2) 由立方差公式，$\sqrt[3]{1+x}-1=\frac x{\sqrt[3]{(1+x)^2}+\sqrt[3]{1+x}+1}$，分母趋于 $3$，所以 $\sqrt[3]{1+x}-1\sim\frac x3$，是 $1$ 阶无穷小量。（也可以直接用 <x-ref to="3-2/ex-stdlim"></x-ref> 中的 $\lim\limits_{x\to0}\frac{(1+x)^\alpha-1}x=\alpha$。）</p>
<p>(3) 令 $t=x^2$，则 $x\ne0$ 时 $t\ne0$，且 $t\to0$。由 $\lim\limits_{t\to0}\frac{e^t-1}t=1$ 与复合函数的极限（<x-ref to="3-1/thm-comp"></x-ref>）得 $\frac{e^{x^2}-1}{x^2}\to1$，即 $e^{x^2}-1\sim x^2$，是 $2$ 阶无穷小量。</p>
<p>(4) $\sqrt{1+x}-\sqrt{1-x}=\frac{2x}{\sqrt{1+x}+\sqrt{1-x}}$，分母趋于 $2$，所以 $\sqrt{1+x}-\sqrt{1-x}\sim x$，是 $1$ 阶无穷小量。</p>
</x-sol>
<x-remark>(1) 中 $\tan x$ 与 $\sin x$ 都与 $x$ 等价，它们的差却是 $3$ 阶无穷小量。两个等价无穷小量之差总是比它们高阶的无穷小量（见 <x-ref to="prop-equiv"></x-ref>），至于高多少阶，要具体计算。类似地，$x-\sin x$ 也是 $3$ 阶无穷小量，$x-\sin x\sim\frac{x^3}6$，初等证明见本节习题；第五章的 Taylor 公式会给出系统的方法。</x-remark>
</x-ex>
<x-viz type="order" t="比较两个无穷小量（$x\to0$）"><p>选择例子或输入两个 $x\to0$ 时的无穷小量 $\alpha(x)$ 与 $\beta(x)$。“比值”画法显示 $\frac{\alpha(x)}{\beta(x)}$ 在 $0$ 附近的图像，比值趋于 $1$ 说明二者等价；“双对数坐标”画法以 $\lg x$ 为横坐标、$\lg|\alpha|$ 与 $\lg|\beta|$ 为纵坐标，$k$ 阶无穷小量的图像近似是斜率为 $k$ 的直线。可以对比 $\tan x-\sin x$ 与 $x-\sin x$：两条直线的斜率都是 $3$。最后一个例子中比值 $\sin\frac1x$ 不停振荡，两个无穷小量比不出高低。</p></x-viz>
<x-prop t="$o$ 记号的运算规则" id="prop-oarith">
<p>设 $x\to x_0$，$c$ 是非零常数，并设出现在分母中（即作为比较对象）的函数在 $x_0$ 的某个去心邻域中不为 $0$，则</p>
<ol>
<li>$o(v)\pm o(v)=o(v)$；</li>
<li>$c\cdot o(v)=o(v)$，$o(cv)=o(v)$；</li>
<li>$u\cdot o(v)=o(uv)$，$o(u)\cdot o(v)=o(uv)$；</li>
<li>若 $u=O(v)$，则 $o(u)=o(v)$；特别地 $o(o(v))=o(v)$。</li>
</ol>
<p>每个等式的含义是：左边的任何一个函数都属于右边的那一类。例如规则 1 的意思是：若 $w_1=o(v)$，$w_2=o(v)$，则 $w_1\pm w_2=o(v)$。</p>
<x-proof><p>规则 1、2 由极限的四则运算立即得到。若 $w=o(v)$，则 $\frac{uw}{uv}=\frac wv\to0$，即 $uw=o(uv)$；若 $w_1=o(u)$，$w_2=o(v)$，则 $\frac{w_1w_2}{uv}=\frac{w_1}u\cdot\frac{w_2}v\to0$。若 $w=o(u)$ 且 $u=O(v)$，则 $\frac wv=\frac wu\cdot\frac uv$ 是无穷小量与局部有界量之积，趋于 $0$，即 $w=o(v)$。最后，$u=o(v)$ 蕴涵 $u=O(v)$（比值趋于 $0$，从而局部有界），所以 $o(o(v))=o(v)$ 是规则 4 的特例。<span class="qed">∎</span></p></x-proof>
</x-prop>
<p>对于幂函数，$x\to0$ 时若 $0<m\le n$，则 $x^n=O(x^m)$，因此</p>
$$o(x^n)=o(x^m),\qquad o(x^m)+o(x^n)=o(x^m),\qquad x^m\cdot o(x^n)=o(x^{m+n}).$$
<p>直观地说：$x\to0$ 时，次数高的项可以被次数低的项“吸收”。</p>
<x-warn><p>$o$ 记号不能像普通的数那样消去：$o(x)-o(x)=o(x)$，而不是 $0$，因为两个 $o(x)$ 可以代表不同的函数（例如 $x^2-x^3$）；$\frac{o(x^2)}{o(x)}$ 也没有确定的意义。$o(x^2)=o(x)$ 成立，反过来 $o(x)=o(x^2)$ 不成立：$x^2=o(x)$，但 $x^2$ 不是 $o(x^2)$。</p></x-warn>
<x-prop t="等价无穷小量与主部" id="prop-equiv">
<p>设 $v(x)$ 在 $x_0$ 的某个去心邻域中不为 $0$，则</p>
$$u(x)\sim v(x)\ (x\to x_0)\iff u(x)=v(x)+o(v(x))\ (x\to x_0).$$
<p>此外，$\sim$ 具有自反性、对称性与传递性：$u\sim u$；若 $u\sim v$，则 $v\sim u$；若 $u\sim v$，$v\sim w$，则 $u\sim w$。</p>
<x-proof><p>$u\sim v\iff\frac uv-1\to0\iff\frac{u-v}v\to0\iff u-v=o(v)$。若 $u\sim v$，由局部保序性，在 $x_0$ 的某个去心邻域中 $\frac uv>\frac12$，于是 $u\ne0$，且 $\frac vu=1\Big/\frac uv\to1$。传递性由 $\frac uw=\frac uv\cdot\frac vw\to1$ 得到。<span class="qed">∎</span></p></x-proof>
</x-prop>
<p>若 $u=v+o(v)$，而 $v$ 的形式比 $u$ 简单（例如 $v=cx^k$），就称 $v$ 是 $u$ 的<em>主部</em>。由前面的结果，$x\to0$ 时</p>
$$\sin x=x+o(x),\qquad\cos x=1-\frac{x^2}2+o(x^2),\qquad\tan x-\sin x=\frac{x^3}2+o(x^3),\qquad\sqrt[3]{1+x}=1+\frac x3+o(x).$$
<p>第二式由 $1-\cos x=\frac{x^2}2+o(x^2)$ 移项得到，最后一式同理。这样的式子称为<em>渐近展开</em>：主部给出近似值，$o(\cdot)$ 项说明误差比主部小得多。第五章的 Taylor 公式把这种展开推进到任意阶。</p>
<x-ex t="用渐近展开求极限" id="ex-oexp">
<p>求 $\lim\limits_{x\to0}\frac{e^x-\sqrt{1+x}}x$。</p>
<x-sol>
<p>由 $e^x-1\sim x$、$\sqrt{1+x}-1\sim\frac x2$（<x-ref to="3-2/ex-stdlim"></x-ref>）及 <x-ref to="prop-equiv"></x-ref>，$e^x=1+x+o(x)$，$\sqrt{1+x}=1+\frac x2+o(x)$。于是 $e^x-\sqrt{1+x}=\frac x2+o(x)-o(x)=\frac x2+o(x)$，</p>
$$\lim_{x\to0}\frac{e^x-\sqrt{1+x}}x=\lim_{x\to0}\left(\frac12+\frac{o(x)}x\right)=\frac12.$$
</x-sol>
<x-remark>展开的精度要与问题匹配。若求 $\lim\limits_{x\to0}\frac{e^x-1-x}{x^2}$，由 $e^x=1+x+o(x)$ 只能得到 $\frac{e^x-1-x}{x^2}=\frac{o(x)}{x^2}$，无法确定极限；需要更精确的展开 $e^x=1+x+\frac{x^2}2+o(x^2)$（第五章），答案是 $\frac12$。</x-remark>
</x-ex>
`);
MA.add("3-3", String.raw`
<h2 id="large">无穷大量的比较</h2>
<p>无穷大量也用比值来比较。若 $\lim\limits_{x\to x_0}u(x)=\infty$，则在 $x_0$ 的某个去心邻域中 $|u(x)|>1$，特别地 $u(x)\ne0$，所以两个无穷大量的比值总是有意义的。</p>
<x-def t="无穷大量的比较" id="def-ordinf">
<p>设 $u(x)$、$v(x)$ 都是 $x\to x_0$ 时的无穷大量。</p>
<ol>
<li>若 $\lim\limits_{x\to x_0}\frac{v(x)}{u(x)}=0$，即 $v=o(u)$，则称 $x\to x_0$ 时 $u(x)$ 是 $v(x)$ 的<em>高阶无穷大量</em>（也称 $v(x)$ 是 $u(x)$ 的<em>低阶无穷大量</em>）。</li>
<li>$u=O(v)$、同阶、等价（$u\sim v$）的定义与无穷小量的情形完全相同，都看比值 $\frac uv$。</li>
<li>若 $u(x)$ 与 $\frac1{|x-x_0|^k}$（$k>0$）同阶，则称 $u(x)$ 是 $x\to x_0$ 时的 <em>$k$ 阶无穷大量</em>；对于 $x\to\infty$ 等情形，把 $\frac1{|x-x_0|^k}$ 换成 $|x|^k$。</li>
</ol>
</x-def>
<x-note><p>无穷小量“高阶”是指趋于 $0$ 更快，无穷大量“高阶”是指趋于无穷更快。两种情形可以统一地说：$v=o(u)$ 表示与 $u$ 相比 $v$ 可以忽略。本站沿用第二章的写法，用 $v\ll u$ 表示 $v=o(u)$（数论文献中 $\ll$ 常表示 $O$，阅读时要注意）。</p></x-note>
<x-ex t="多项式的主部：抓最高次项还是最低次项" id="ex-polyord">
<p>设 $P(x)=a_mx^m+a_{m+1}x^{m+1}+\cdots+a_nx^n$，其中 $0\le m\le n$，$a_m\ne0$，$a_n\ne0$。证明：$x\to\infty$ 时 $P(x)\sim a_nx^n$；$x\to0$ 时 $P(x)\sim a_mx^m$。</p>
<x-sol l="证明">
<p>$x\to\infty$ 时 $\frac{P(x)}{a_nx^n}=1+\sum\limits_{k=m}^{n-1}\frac{a_k}{a_n}x^{k-n}\to1$；$x\to0$ 时 $\frac{P(x)}{a_mx^m}=1+\sum\limits_{k=m+1}^n\frac{a_k}{a_m}x^{k-m}\to1$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>同一个函数在不同的极限过程中，主部可以完全不同：$x^3-1000x^2\sim x^3\ (x\to\infty)$，而 $x^3-1000x^2\sim-1000x^2\ (x\to0)$。“抓大头”时，$x\to\infty$ 抓最高次项，$x\to0$ 抓最低次项。类似地，$\sqrt{x^2+x}\sim|x|\ (x\to\infty)$，$\sqrt{x^2+x}\sim\sqrt x\ (x\to0^+)$，$\frac{2x^3+x}{x^2-3}\sim2x\ (x\to\infty)$。</x-remark>
</x-ex>
<x-thm t="对数、幂与指数的增长速度" id="thm-growth">
<p>设 $\alpha>0$，$\beta>0$，$a>1$，则</p>
$$\lim_{x\to+\infty}\frac{x^\alpha}{a^x}=0,\qquad\lim_{x\to+\infty}\frac{(\ln x)^\beta}{x^\alpha}=0,$$
<p>即 $x\to+\infty$ 时 $(\ln x)^\beta\ll x^\alpha\ll a^x$。</p>
<x-proof><p>由 <x-ref to="2-3/thm-ladder"></x-ref>，$\lim\limits_{n\to\infty}\frac{n^\alpha}{a^n}=0$，所以也有 $\lim\limits_{n\to\infty}\frac{(n+1)^\alpha}{a^n}=\lim\limits_{n\to\infty}a\cdot\frac{(n+1)^\alpha}{a^{n+1}}=0$。任给 $\eps>0$，存在正整数 $N$，当 $n>N$ 时 $\frac{(n+1)^\alpha}{a^n}<\eps$。当 $x>N+1$ 时，令 $n=[x]$，则 $n>N$，$n\le x<n+1$，于是</p>
$$0<\frac{x^\alpha}{a^x}<\frac{(n+1)^\alpha}{a^n}<\eps.$$
<p>这就证明了第一式。对第二式，令 $t=\ln x$，则 $\frac{(\ln x)^\beta}{x^\alpha}=\frac{t^\beta}{(e^\alpha)^t}$，其中 $e^\alpha>1$。由第一式（把 $\alpha$、$a$ 分别换成 $\beta$、$e^\alpha$），任给 $\eps>0$，存在 $T>0$，当 $t>T$ 时 $0<\frac{t^\beta}{(e^\alpha)^t}<\eps$。于是当 $x>e^T$ 时 $t=\ln x>T$，从而 $0<\frac{(\ln x)^\beta}{x^\alpha}<\eps$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-cor t="几个常用的极限" id="cor-growth">
<p>设 $\alpha>0$，$a>1$，则</p>
$$\lim_{x\to0^+}x^\alpha\ln x=0,\qquad\lim_{x\to0^+}x^x=1,\qquad\lim_{x\to+\infty}x^{\frac1x}=1,\qquad\lim_{x\to+\infty}\frac{a^x}{x^x}=0.$$
<x-proof><p>令 $x=\frac1t$，则 $x\to0^+$ 相当于 $t\to+\infty$，$x^\alpha\ln x=-\frac{\ln t}{t^\alpha}\to0$。由指数函数的连续性（<x-ref to="3-2/thm-limc"></x-ref>），$x^x=e^{x\ln x}\to e^0=1\ (x\to0^+)$；同理 $x^{\frac1x}=e^{\frac{\ln x}x}\to e^0=1\ (x\to+\infty)$。最后，当 $x\ge2a$ 时 $0<\frac{a^x}{x^x}=\left(\frac ax\right)^x\le\frac1{2^x}$，而 $\frac1{2^x}\to0$。<span class="qed">∎</span></p></x-proof>
</x-cor>
<p>于是 $x\to+\infty$ 时有增长阶梯</p>
$$(\ln x)^\beta\ll x^\alpha\ll a^x\ll x^x\qquad(\alpha>0,\ \beta>0,\ a>1),$$
<p>它是 <x-ref to="2-3/thm-ladder"></x-ref> 的函数版本。每一级内部还有细分：$0<\alpha<\gamma$ 时 $x^\alpha\ll x^\gamma$，$1<a<b$ 时 $a^x\ll b^x$。$0^0$ 型的 $x^x\ (x\to0^+)$ 与 $\infty^0$ 型的 $x^{1/x}\ (x\to+\infty)$ 都趋于 $1$，原因是指数上的 $x\ln x$ 与 $\frac{\ln x}x$ 都是无穷小量。</p>
<x-warn><p>“$\ln x\ll x^{0.1}$”说的是 $x$ <em>充分大</em>以后的情形，不能用不太大的 $x$ 去检验。令 $t=\ln x$，不等式 $\ln x>x^{0.1}$ 化为 $t>e^{t/10}$，它在 $1.118<t<35.77$ 时成立，即当 $3.06<x<3.43\times10^{15}$ 时反而有 $\ln x>x^{0.1}$。例如 $x=10^{10}$ 时 $\ln x\approx23.03$，而 $x^{0.1}=10$。极限只描述最终的趋势；要知道“多大才算充分大”，必须另作估计。</p></x-warn>
<x-viz type="plot" f="x^a/2^x" a="5" amin="1" amax="12" astep="1" autoy="1" xmin="0" xmax="80" ymin="0" ymax="140" t="幂函数终将被指数函数压倒"><p>图中是 $y=\frac{x^a}{2^x}$（纵坐标范围随 $a$ 自动调整）。增大 $a$，峰值变高、位置右移（最大值点在 $x=\frac a{\ln2}$ 处），但无论 $a$ 多大，曲线最终都迅速衰减到 $0$，这就是 $x^a\ll2^x$。</p></x-viz>
<x-hist t="记号 $O$、$o$ 与素数定理">
<p>记号 $O$ 由德国数学家 Bachmann 在 1894 年的《解析数论》中引入，Landau 在 1909 年的素数分布专著中大量使用它，并补充了记号 $o$，所以它们常被称为 Bachmann–Landau 记号。这些记号最早用来研究<em>素数定理</em>：记 $\pi(x)$ 为不超过 $x$ 的素数的个数，则</p>
$$\pi(x)\sim\frac x{\ln x}\qquad(x\to+\infty).$$
<p>Gauss 与 Legendre 在 18 世纪末根据素数表猜到了这一结论。1850 年前后，Chebyshev 证明了 $x$ 充分大时 $0.921\frac x{\ln x}<\pi(x)<1.106\frac x{\ln x}$，即 $\pi(x)$ 与 $\frac x{\ln x}$ <em>同阶</em>；等价关系直到 1896 年才由 Hadamard 与 de la Vallée Poussin 各自独立证明。从同阶到等价，用了将近半个世纪。比值收敛得相当慢：$\pi(10^6)=78498$，$\frac{10^6}{\ln10^6}\approx72382.4$，比值约为 $1.0845$；$\pi(10^9)=50847534$，$\frac{10^9}{\ln10^9}\approx48254942.4$，比值约为 $1.0537$。</p>
</x-hist>
`);
MA.add("3-3", String.raw`
<h2 id="equiv">等价量</h2>
<p>“等价”的定义只用到比值趋于 $1$，并不要求 $u$、$v$ 是无穷小量或无穷大量。一般地，若 $\lim\limits_{x\to x_0}\frac{u(x)}{v(x)}=1$，就称 $x\to x_0$ 时 $u(x)$ 与 $v(x)$ 是<em>等价量</em>，仍记作 $u(x)\sim v(x)$。例如 $x\to+\infty$ 时 $\left(1+\frac1x\right)^x\sim e$，$\sqrt{x^2+1}\sim x$。等价量最重要的用途是简化极限的计算。</p>
<x-thm t="等价量替换" id="thm-equiv">
<p>设 $x\to x_0$ 时 $u(x)\sim v(x)$，则</p>
<ol>
<li>若 $\lim\limits_{x\to x_0}v(x)w(x)=A$，则 $\lim\limits_{x\to x_0}u(x)w(x)=A$；</li>
<li>若 $\lim\limits_{x\to x_0}\frac{w(x)}{v(x)}=A$，则 $\lim\limits_{x\to x_0}\frac{w(x)}{u(x)}=A$。</li>
</ol>
<p>这里 $A$ 可以是有限数，也可以是 $+\infty$、$-\infty$ 或 $\infty$。对其他极限过程，结论同样成立。</p>
<x-proof><p>由 $\frac uv\to1$ 及局部保序性，在 $x_0$ 的某个去心邻域中 $\frac uv>\frac12$，所以 $u\ne0$，且 $\frac vu\to1$。于是</p>
$$u(x)w(x)=\frac{u(x)}{v(x)}\cdot v(x)w(x)\to1\cdot A=A,\qquad\frac{w(x)}{u(x)}=\frac{w(x)}{v(x)}\cdot\frac{v(x)}{u(x)}\to A\cdot1=A.$$
<p>当 $A$ 为无穷大时，用到“极限为正数的函数与无穷大量之积仍是无穷大量（且符号不变）”，证明与 <x-ref to="2-3/thm-infop"></x-ref> 相同。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>简单地说：<em>求极限时，乘积或商中的因子可以换成与它等价的量</em>。等价无穷小量往往比原来的函数简单得多，这能大大简化计算。下表中的等价关系来自 <x-ref to="3-1/thm-sinx"></x-ref>、<x-ref to="3-1/ex-trig"></x-ref> 与 <x-ref to="3-2/ex-stdlim"></x-ref>，值得记住。</p>
<x-tip t="常用的等价无穷小量（$x\to0$）">
<table class="center">
<tr><td>$\sin x\sim x$</td><td>$\tan x\sim x$</td></tr>
<tr><td>$\arcsin x\sim x$</td><td>$\arctan x\sim x$</td></tr>
<tr><td>$\ln(1+x)\sim x$</td><td>$e^x-1\sim x$</td></tr>
<tr><td>$a^x-1\sim x\ln a\quad(a>0,\ a\ne1)$</td><td>$(1+x)^\alpha-1\sim\alpha x\quad(\alpha\ne0)$</td></tr>
<tr><td>$1-\cos x\sim\frac{x^2}2$</td><td>$\sh x\sim x,\quad\ch x-1\sim\frac{x^2}2$</td></tr>
</table>
<p>双曲函数的两个等价关系由 $\sh x=e^{-x}\cdot\frac{e^{2x}-1}2$ 与 $\ch x-1=2\sh^2\frac x2$ 得到。表中的 $x$ 可以换成任何满足 $\varphi(x)\to0$、且在去心邻域中 $\varphi(x)\ne0$ 的函数 $\varphi(x)$（<x-ref to="3-1/thm-comp"></x-ref>）。例如 $x\to0$ 时 $\sin x^2\sim x^2$，$\ln\cos x=\ln\bigl(1+(\cos x-1)\bigr)\sim\cos x-1\sim-\frac{x^2}2$；$x\to\infty$ 时 $e^{1/x}-1\sim\frac1x$。</p>
</x-tip>
<x-ex t="用等价量替换求极限" id="ex-equiv">
<p>求下列极限：(1) $\lim\limits_{x\to0}\frac{(1-\cos x)\tan3x}{x^2\arcsin x}$；(2) $\lim\limits_{x\to0}\frac{e^{x^2}-1}{1-\cos x}$；(3) $\lim\limits_{x\to0}\frac{\sqrt{1+x\sin x}-1}{x^2}$；(4) $\lim\limits_{n\to\infty}n\left(\sqrt[n]a-1\right)$（$a>0$）。</p>
<x-sol>
<p>(1) $1-\cos x\sim\frac{x^2}2$，$\tan3x\sim3x$，$\arcsin x\sim x$，所以</p>
$$\lim_{x\to0}\frac{(1-\cos x)\tan3x}{x^2\arcsin x}=\lim_{x\to0}\frac{\frac{x^2}2\cdot3x}{x^2\cdot x}=\frac32.$$
<p>(2) $e^{x^2}-1\sim x^2$，$1-\cos x\sim\frac{x^2}2$，所以极限为 $\lim\limits_{x\to0}\frac{x^2}{x^2/2}=2$。</p>
<p>(3) 当 $0<|x|<\pi$ 时 $x\sin x>0$，且 $x\sin x\to0$，所以 $\sqrt{1+x\sin x}-1\sim\frac{x\sin x}2\sim\frac{x^2}2$，极限为 $\frac12$。</p>
<p>(4) $a=1$ 时极限为 $0=\ln1$。设 $a\ne1$。由 $\lim\limits_{t\to0}\frac{a^t-1}t=\ln a$ 与 Heine 定理（<x-ref to="3-1/thm-heine"></x-ref>），取 $t=\frac1n$ 得</p>
$$\lim_{n\to\infty}n\left(\sqrt[n]a-1\right)=\lim_{n\to\infty}\frac{a^{1/n}-1}{1/n}=\ln a.$$
</x-sol>
<x-remark>(4) 把 <x-ref to="2-2/ex-root"></x-ref> 的结论 $\sqrt[n]a\to1$ 精确化了：$\sqrt[n]a=1+\frac{\ln a}n+o\left(\frac1n\right)$。</x-remark>
</x-ex>
<x-warn>
<p>等价量替换<em>只能用于乘积或商的因子</em>，不能随意用于和差，也不能随意用于指数或其他函数的内部：</p>
<ul>
<li>$\tan x\sim x$，$\sin x\sim x$，但 $\lim\limits_{x\to0}\frac{\tan x-\sin x}{x^3}=\frac12$（<x-ref to="ex-ordk"></x-ref>）。若把分子替换成 $x-x=0$，就会得到错误的结果 $0$。</li>
<li>求 $\lim\limits_{x\to0}\frac{\ln(1+x+x^2)+\ln(1-x+x^2)}{x^2}$ 时，若分别替换 $\ln(1+x+x^2)\sim x+x^2$、$\ln(1-x+x^2)\sim-x+x^2$，会得到错误的答案 $2$。正确的做法是先合并：分子等于 $\ln\bigl((1+x^2)^2-x^2\bigr)=\ln(1+x^2+x^4)\sim x^2+x^4\sim x^2$，极限是 $1$。</li>
<li>$x\to+\infty$ 时 $x^2+x\sim x^2$，但 $\frac{e^{x^2+x}}{e^{x^2}}=e^x\to+\infty$，$e^{x^2+x}$ 与 $e^{x^2}$ 并不等价。同样，$1+\frac1x\sim1$，但 $\left(1+\frac1x\right)^x\to e$，而不是 $1$。</li>
</ul>
<p>和差中的替换在一定条件下是允许的（见本节习题），但最稳妥的办法是用 $o$ 记号写出渐近展开，或者先通过恒等变形把和差化为积商。</p>
</x-warn>
<x-ex t="先变形，再替换" id="ex-equiv2">
<p>求 $\lim\limits_{x\to0}\frac{3\sin x+x^2\cos\frac1x}{(1+\cos x)\ln(1+x)}$。</p>
<x-analysis><p>分子是两项之和，不能直接替换其中的项；但分母中的 $\ln(1+x)$ 是因子，可以换成 $x$，再把 $x$ 除到分子的每一项中去。</p></x-analysis>
<x-sol>
$$\lim_{x\to0}\frac{3\sin x+x^2\cos\frac1x}{(1+\cos x)\ln(1+x)}=\lim_{x\to0}\frac1{1+\cos x}\cdot\frac{3\sin x+x^2\cos\frac1x}x=\frac12\lim_{x\to0}\left(3\cdot\frac{\sin x}x+x\cos\frac1x\right)=\frac32.$$
</x-sol>
<x-remark>分子中的 $x^2\cos\frac1x$ 没有极限意义上的“等价量”可用（它与 $x^2$ 不等价），但它是 $o(x)$，与主部 $3x$ 相比可以忽略：分子 $=3x+o(x)\sim3x$。</x-remark>
</x-ex>
<x-app t="相对论动能与经典动能">
<p>狭义相对论中，质量为 $m$、速度为 $v$ 的物体的动能是</p>
$$E_k=mc^2(\gamma-1),\qquad\gamma=\frac1{\sqrt{1-\beta^2}},\quad\beta=\frac vc,$$
<p>其中 $c\approx2.998\times10^8\ \text{m/s}$ 是光速。当 $\beta\to0$ 时，由 $(1+t)^{-\frac12}-1\sim-\frac t2$（取 $t=-\beta^2$）得 $\gamma-1\sim\frac{\beta^2}2$，所以</p>
$$E_k\sim mc^2\cdot\frac{\beta^2}2=\frac12mv^2\qquad(v\to0),$$
<p>经典动能 $\frac12mv^2$ 正是相对论动能在低速时的主部。比值 $\frac{E_k}{mv^2/2}=\frac{2(\gamma-1)}{\beta^2}$ 在 $v=0.1c$（每秒约 3 万千米）时约为 $1.00756$，误差不到 $1\%$；对于速度为 $300\ \text{m/s}$ 的飞机，$\beta\approx10^{-6}$，比值与 $1$ 只差约 $7.5\times10^{-13}$（可以证明比值 $-1\sim\frac34\beta^2$，见第五章），经典力学完全够用。只有在粒子加速器等接近光速的场合，两者才有显著差别：$v=0.9c$ 时比值约为 $3.20$。</p>
</x-app>
`);
MA.add("3-3", String.raw`
<h2 id="asym">曲线的渐近线</h2>
<p>无穷大量与 $o$ 记号的一个几何应用是求曲线的渐近线。直观地说，渐近线是曲线伸向无穷远时无限接近的直线，双曲线 $\frac{x^2}{a^2}-\frac{y^2}{b^2}=1$ 的渐近线 $y=\pm\frac bax$ 就是熟悉的例子。</p>
<x-def t="渐近线" id="def-asym">
<ol>
<li>若 $\lim\limits_{x\to x_0^+}f(x)=\infty$ 或 $\lim\limits_{x\to x_0^-}f(x)=\infty$（这里的 $\infty$ 也可以是 $+\infty$ 或 $-\infty$），则称直线 $x=x_0$ 是曲线 $y=f(x)$ 的<em>垂直渐近线</em>。</li>
<li>若 $\lim\limits_{x\to+\infty}\bigl[f(x)-(kx+b)\bigr]=0$，即 $f(x)=kx+b+o(1)\ (x\to+\infty)$，则称直线 $y=kx+b$ 是曲线 $y=f(x)$ 当 $x\to+\infty$ 时的<em>渐近线</em>；$k\ne0$ 时称为<em>斜渐近线</em>，$k=0$ 时称为<em>水平渐近线</em>。$x\to-\infty$ 的情形类似。</li>
</ol>
</x-def>
<x-thm t="斜渐近线的求法" id="thm-asym">
<p>直线 $y=kx+b$ 是曲线 $y=f(x)$ 当 $x\to+\infty$ 时的渐近线的充分必要条件是</p>
$$k=\lim_{x\to+\infty}\frac{f(x)}x,\qquad b=\lim_{x\to+\infty}\bigl[f(x)-kx\bigr].$$
<p>$x\to-\infty$ 的情形同样成立。</p>
<x-proof><p>必要性：若 $f(x)-kx-b\to0$，则 $f(x)-kx\to b$，且 $\frac{f(x)}x=k+\frac bx+\frac{f(x)-kx-b}x\to k$。充分性：若两个极限都存在，则 $f(x)-(kx+b)=\bigl[f(x)-kx\bigr]-b\to0$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note>
<ul>
<li>$x\to+\infty$ 与 $x\to-\infty$ 时的渐近线可能不同，应分别计算。</li>
<li>先求 $k$，再求 $b$；两个极限中只要有一个不存在（或是无穷大），相应方向上就没有渐近线。例如 $f(x)=x+\sin x$：$\frac{f(x)}x\to1$，但 $f(x)-x=\sin x$ 没有极限；$f(x)=\sqrt x$：$\frac{f(x)}x\to0$，但 $f(x)-0\to+\infty$。后者说明，比一次函数增长得慢的无穷大量也未必有渐近线。</li>
<li>若进一步有 $f(x)=kx+b+\frac cx+o\left(\frac1x\right)$（$c\ne0$），则 $x$ 充分大时 $f(x)-(kx+b)$ 与 $c$ 同号，由此可以看出曲线从渐近线的哪一侧逼近。</li>
</ul>
</x-note>
<x-ex t="求渐近线" id="ex-asym">
<p>求下列曲线的渐近线：(1) $y=\frac{x^2+1}{x-1}$；(2) $y=\sqrt{x^2+2x}$；(3) $y=xe^{\frac1x}$。</p>
<x-sol>
<p>(1) $x\to1^+$ 时 $y\to+\infty$，$x\to1^-$ 时 $y\to-\infty$，所以 $x=1$ 是垂直渐近线。又</p>
$$k=\lim_{x\to\infty}\frac{x^2+1}{x(x-1)}=1,\qquad b=\lim_{x\to\infty}\left(\frac{x^2+1}{x-1}-x\right)=\lim_{x\to\infty}\frac{x+1}{x-1}=1,$$
<p>所以 $x\to+\infty$ 与 $x\to-\infty$ 时的渐近线都是 $y=x+1$。事实上 $\frac{x^2+1}{x-1}=x+1+\frac2{x-1}$，最后一项是 $x\to\infty$ 时的无穷小量。</p>
<p>(2) 定义域为 $(-\infty,-2]\cup[0,+\infty)$，函数在定义域上连续，没有垂直渐近线。$x\to+\infty$ 时，$k=\lim\limits_{x\to+\infty}\sqrt{1+\frac2x}=1$，</p>
$$b=\lim_{x\to+\infty}\left(\sqrt{x^2+2x}-x\right)=\lim_{x\to+\infty}\frac{2x}{\sqrt{x^2+2x}+x}=1,$$
<p>渐近线是 $y=x+1$。$x\to-\infty$ 时，$\sqrt{x^2+2x}=|x|\sqrt{1+\frac2x}=-x\sqrt{1+\frac2x}$，所以 $k=-1$，</p>
$$b=\lim_{x\to-\infty}\left(\sqrt{x^2+2x}+x\right)=\lim_{x\to-\infty}\frac{2x}{\sqrt{x^2+2x}-x}=\lim_{x\to-\infty}\frac{2x}{-x\left(\sqrt{1+\frac2x}+1\right)}=-1,$$
<p>渐近线是 $y=-x-1$。这与几何事实一致：曲线是双曲线 $(x+1)^2-y^2=1$ 的上半支，这条双曲线的渐近线正是 $y=\pm(x+1)$。</p>
<p>(3) 令 $t=\frac1x$。$x\to0^+$ 时 $t\to+\infty$，$xe^{\frac1x}=\frac{e^t}t\to+\infty$（<x-ref to="thm-growth"></x-ref>）；$x\to0^-$ 时 $e^{\frac1x}\to0$，$xe^{\frac1x}\to0$。所以 $x=0$ 是垂直渐近线（只在右侧）。又 $k=\lim\limits_{x\to\infty}e^{\frac1x}=1$，</p>
$$b=\lim_{x\to\infty}x\left(e^{\frac1x}-1\right)=\lim_{t\to0}\frac{e^t-1}t=1,$$
<p>所以 $x\to+\infty$ 与 $x\to-\infty$ 时的渐近线都是 $y=x+1$。</p>
</x-sol>
</x-ex>
<x-viz type="plot" t="曲线与它的渐近线" presets="(x²+1)/(x−1)::(x^2+1)/(x-1); x+1::-6,8,-10,16;;√(x²+2x)::sqrt(x^2+2x); x+1; -x-1::-9,7,-1,9;;x·e^(1/x)::x*e^(1/x); x+1::-5,5,-4,9;;x + sin x（没有渐近线）::x+sin(x); x::-20,20,-20,20"><p>从“预设”中选择曲线：第一条曲线是函数图像，其余直线是渐近线。把横坐标范围改大（例如 $-100$ 到 $100$），曲线与渐近线会越来越难以分辨。最后一个例子中 $\frac{f(x)}x\to1$，但曲线始终围绕直线 $y=x$ 摆动，$f(x)-x$ 没有极限，所以没有渐近线。</p></x-viz>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>比较两个无穷小量（无穷大量）就是考察比值 $\frac uv$：$u=o(v)$ 表示比值趋于 $0$；$u=O(v)$ 表示比值局部有界；同阶表示比值夹在两个正数之间；$u\sim v$ 表示比值趋于 $1$。$k$ 阶无穷小量是与 $|x-x_0|^k$ 同阶的无穷小量。</li>
<li>$o(v)$、$O(v)$ 代表一类函数，等号只能从左往右读。运算规则：$o(v)\pm o(v)=o(v)$，$u\cdot o(v)=o(uv)$，$o(o(v))=o(v)$；$x\to0$ 时，$0<m\le n$ 蕴涵 $o(x^n)=o(x^m)$。</li>
<li>$u\sim v\iff u=v+o(v)$：等价量之间只差一个高阶量。两个等价无穷小量之差比它们高阶；主部与渐近展开是近似计算的基础。</li>
<li>$x\to+\infty$ 时 $(\ln x)^\beta\ll x^\alpha\ll a^x\ll x^x$（$\alpha,\beta>0$，$a>1$），由此 $x^\alpha\ln x\to0$、$x^x\to1\ (x\to0^+)$，$x^{1/x}\to1\ (x\to+\infty)$。多项式在 $x\to\infty$ 时与最高次项等价，在 $x\to0$ 时与最低次项等价。</li>
<li>等价量替换：乘积或商中的因子可以换成等价量；和差中的项、指数中的量不能随意替换。常用等价量：$\sin x$、$\tan x$、$\arcsin x$、$\arctan x$、$\ln(1+x)$、$e^x-1$ 都与 $x$ 等价，$1-\cos x\sim\frac{x^2}2$，$(1+x)^\alpha-1\sim\alpha x$，$a^x-1\sim x\ln a$。</li>
<li>$x=x_0$ 是垂直渐近线当且仅当 $f$ 在 $x_0$ 处的某个单侧极限是无穷大；$y=kx+b$ 是渐近线当且仅当 $k=\lim\frac{f(x)}x$ 与 $b=\lim[f(x)-kx]$ 存在，$x\to+\infty$ 与 $x\to-\infty$ 要分别计算。</li>
</ul>
</x-sum>

<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对阶与等价量的理解">
<x-q type="choice" answer="C"><x-stem>当 $x\to0$ 时，下列无穷小量中是 $x$ 的高阶无穷小量的是</x-stem>
<x-opt>$\sin x$</x-opt><x-opt>$x+x^2$</x-opt><x-opt>$1-\cos x$</x-opt><x-opt>$\sqrt{|x|}$</x-opt>
<x-exp>$\frac{1-\cos x}x=\frac{1-\cos x}{x^2}\cdot x\to\frac12\cdot0=0$。$\sin x$ 与 $x+x^2$ 都与 $x$ 等价；$\left|\frac{\sqrt{|x|}}x\right|=\frac1{\sqrt{|x|}}\to+\infty$，$\sqrt{|x|}$ 是比 $x$ 低阶的无穷小量。</x-exp></x-q>
<x-q type="choice" answer="C"><x-stem>当 $x\to0$ 时，$\tan x-\sin x$ 是几阶无穷小量？</x-stem>
<x-opt>$1$ 阶</x-opt><x-opt>$2$ 阶</x-opt><x-opt>$3$ 阶</x-opt><x-opt>$4$ 阶</x-opt>
<x-exp>$\tan x-\sin x=\tan x\,(1-\cos x)\sim x\cdot\frac{x^2}2=\frac{x^3}2$。两个与 $x$ 等价的无穷小量之差，阶可以高得多。</x-exp></x-q>
<x-q type="tf" answer="T"><x-stem>若 $x\to x_0$ 时 $u=o(v)$，则 $u=O(v)$。</x-stem>
<x-exp>正确。$\frac uv\to0$，由局部有界性（<x-ref to="3-1/thm-lbdd"></x-ref>），比值在 $x_0$ 的某个去心邻域中有界。反之不成立：$x=O(x)$，但 $x$ 不是 $o(x)$。</x-exp></x-q>
<x-q type="choice" answer="B"><x-stem>当 $x\to0$ 时，下列关于 $o$ 记号的说法中正确的是</x-stem>
<x-opt>由 $x^2=o(x)$、$x^3=o(x)$ 可得 $x^2=x^3$</x-opt>
<x-opt>$o(x^2)+o(x^3)=o(x^2)$</x-opt>
<x-opt>$o(x)-o(x)=0$</x-opt>
<x-opt>$o(x)\cdot o(x)=o(x^3)$</x-opt>
<x-exp>$o(x^3)=o(x^2)$，所以 B 正确。A：等号是单向的；C：两个 $o(x)$ 可以是不同的函数，差仍是 $o(x)$；D：应为 $o(x)\cdot o(x)=o(x^2)$，例如 $|x|^{3/2}=o(x)$，但 $|x|^{3/2}\cdot|x|^{3/2}=|x|^3$ 不是 $o(x^3)$。</x-exp></x-q>
<x-q type="tf" answer="F"><x-stem>若 $x\to0$ 时 $\alpha\sim\alpha'$，$\beta\sim\beta'$，则 $\alpha-\beta\sim\alpha'-\beta'$。</x-stem>
<x-exp>错误。$\tan x\sim x$，$\sin x\sim x$，但 $\tan x-\sin x\sim\frac{x^3}2$，而 $x-x=0$。等价量替换只适用于乘积与商的因子。</x-exp></x-q>
<x-q type="fill" answer="2" ph="填一个整数"><x-stem>$\lim\limits_{x\to0}\dfrac{\ln(1+x^2)}{1-\cos x}=$</x-stem>
<x-exp>$\ln(1+x^2)\sim x^2$，$1-\cos x\sim\frac{x^2}2$，极限为 $2$。</x-exp></x-q>
<x-q type="fill" answer="3/2" ph="分数或小数"><x-stem>$\lim\limits_{x\to0}\dfrac{\sqrt{1+3x}-1}{\tan x}=$</x-stem>
<x-exp>$\sqrt{1+3x}-1\sim\frac{3x}2$，$\tan x\sim x$，极限为 $\frac32$。</x-exp></x-q>
<x-q type="fill" answer="3" ph="填一个整数"><x-stem>当 $x\to0$ 时，$\sqrt{1+x^3}-1$ 是几阶无穷小量？阶数为</x-stem>
<x-exp>$\sqrt{1+x^3}-1\sim\frac{x^3}2$，是 $3$ 阶无穷小量。</x-exp></x-q>
<x-q type="choice" answer="C"><x-stem>当 $x\to+\infty$ 时，下列无穷大量中阶最高（增长最快）的是</x-stem>
<x-opt>$x^{100}$</x-opt><x-opt>$(\ln x)^{1000}$</x-opt><x-opt>$1.01^x$</x-opt><x-opt>$x\ln x$</x-opt>
<x-exp>底数大于 $1$ 的指数函数比任何幂函数增长都快，幂函数又比对数的任何次幂增长快。虽然在 $x$ 不太大时 $x^{100}$ 远大于 $1.01^x$，但阶的高低看的是最终趋势。</x-exp></x-q>
<x-q type="choice" answer="A"><x-stem>曲线 $y=\dfrac{2x^2+1}{x+1}$ 的斜渐近线是</x-stem>
<x-opt>$y=2x-2$</x-opt><x-opt>$y=2x+2$</x-opt><x-opt>$y=2x-1$</x-opt><x-opt>$y=2x$</x-opt>
<x-exp>$k=\lim\frac{2x^2+1}{x(x+1)}=2$，$b=\lim\left(\frac{2x^2+1}{x+1}-2x\right)=\lim\frac{1-2x}{x+1}=-2$。也可以直接做除法：$\frac{2x^2+1}{x+1}=2x-2+\frac3{x+1}$。</x-exp></x-q>
<x-q type="multi" answer="ABD"><x-stem>当 $x\to0$ 时，下列无穷小量中与 $x$ 等价的有（多选）</x-stem>
<x-opt>$\ln(1+x)$</x-opt><x-opt>$\arctan x$</x-opt><x-opt>$\sqrt{1+x}-1$</x-opt><x-opt>$\sin x+x^2$</x-opt>
<x-exp>$\sqrt{1+x}-1\sim\frac x2$，与 $x$ 同阶但不等价。$\frac{\sin x+x^2}x=\frac{\sin x}x+x\to1$，所以 D 与 $x$ 等价：添上一个高阶无穷小量不改变等价关系。</x-exp></x-q>
<x-q type="fill" answer="ln(2)" show="ln 2" ph="可输入表达式，如 ln(3)"><x-stem>$\lim\limits_{n\to\infty}n\left(\sqrt[n]2-1\right)=$</x-stem>
<x-exp>$\sqrt[n]2-1=e^{\frac{\ln2}n}-1\sim\frac{\ln2}n$，极限为 $\ln2\approx0.6931$。</x-exp></x-q>
</x-quiz>
`);
MA.add("3-3", String.raw`
<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>
<x-prob level="基础" t="确定无穷小量的阶">
<div>
<p>确定下列无穷小量的阶，并写出形如 $cx^k$ 的等价无穷小量：</p>
<p>(1) $\sqrt[3]{x^2}-\sqrt x\ (x\to0^+)$；(2) $\sqrt{1+\tan x}-\sqrt{1+\sin x}\ (x\to0)$；(3) $\ln\cos x\ (x\to0)$；(4) $x+\sin x^2\ (x\to0)$。</p>
</div>
<x-check answer="1/2" ph="阶数">(1) 的阶</x-check>
<x-check answer="3" ph="阶数">(2) 的阶</x-check>
<x-check answer="2" ph="阶数">(3) 的阶</x-check>
<x-hint>(1) 提出低阶的因子 $\sqrt x$；(2) 分子有理化，再利用 $\tan x-\sin x\sim\frac{x^3}2$；(3) $\ln\cos x=\ln\bigl(1+(\cos x-1)\bigr)$。</x-hint>
<x-ans>
<p>(1) $\sqrt[3]{x^2}-\sqrt x=-\sqrt x\left(1-x^{\frac16}\right)\sim-\sqrt x$，是 $\frac12$ 阶无穷小量。</p>
<p>(2) $\sqrt{1+\tan x}-\sqrt{1+\sin x}=\frac{\tan x-\sin x}{\sqrt{1+\tan x}+\sqrt{1+\sin x}}\sim\frac{x^3/2}2=\frac{x^3}4$，是 $3$ 阶无穷小量。</p>
<p>(3) 当 $0<|x|<2\pi$ 时 $\cos x-1\ne0$，且 $\cos x-1\to0$，所以 $\ln\cos x=\ln\bigl(1+(\cos x-1)\bigr)\sim\cos x-1\sim-\frac{x^2}2$，是 $2$ 阶无穷小量。</p>
<p>(4) $\frac{x+\sin x^2}x=1+\frac{\sin x^2}{x^2}\cdot x\to1$，所以 $x+\sin x^2\sim x$，是 $1$ 阶无穷小量。</p>
<x-remark>(1) 与 (4) 说明：几个阶不同的无穷小量相加，和与其中阶最低的那一项等价。若阶最低的项不止一个，它们可能相互抵消，例如 $\tan x-\sin x$。</x-remark>
</x-ans>
</x-prob>
<x-prob level="基础" t="用等价量替换求极限">
<div>
<p>求下列极限：</p>
<p>(1) $\lim\limits_{x\to0}\frac{1-\cos x}{x\ln(1+2x)}$；(2) $\lim\limits_{x\to0}\frac{e^{\sin x}-1}{\tan3x}$；(3) $\lim\limits_{x\to0}\frac{\arcsin2x\cdot(e^x-1)}{x\ln(1+x)}$；(4) $\lim\limits_{x\to0}\frac{\tan x-\sin x}{x\sin^2x}$。</p>
</div>
<x-check answer="1/4" ph="分数或小数">(1)</x-check>
<x-check answer="1/3" ph="分数或小数">(2)</x-check>
<x-check answer="2" ph="分数或小数">(3)</x-check>
<x-check answer="1/2" ph="分数或小数">(4)</x-check>
<x-hint>(2) 中 $e^{\sin x}-1\sim\sin x$；(4) 分子不能分别替换，先写成乘积。</x-hint>
<x-ans>
<p>(1) $1-\cos x\sim\frac{x^2}2$，$\ln(1+2x)\sim2x$，极限为 $\frac{x^2/2}{2x^2}=\frac14$。</p>
<p>(2) $\sin x\to0$，且 $0<|x|<\pi$ 时 $\sin x\ne0$，所以 $e^{\sin x}-1\sim\sin x\sim x$；又 $\tan3x\sim3x$，极限为 $\frac13$。</p>
<p>(3) $\arcsin2x\sim2x$，$e^x-1\sim x$，$\ln(1+x)\sim x$，极限为 $\frac{2x\cdot x}{x\cdot x}=2$。</p>
<p>(4) $\tan x-\sin x=\tan x\,(1-\cos x)\sim\frac{x^3}2$，$x\sin^2x\sim x^3$，极限为 $\frac12$。</p>
</x-ans>
</x-prob>
<x-prob level="基础" t="$o$ 记号的运算">
<div>
<p>设 $x\to0$。判断下列等式是否正确（每个等式理解为“左边的任何函数都属于右边的那一类”）：</p>
<p>(1) $o(x^2)=o(x)$；(2) $o(x)=o(x^2)$；(3) $x\cdot o(x^2)=o(x^3)$；(4) $\frac{o(x^2)}x=o(x)$；(5) $\frac{o(x^2)}{o(x)}=o(x)$；(6) $\bigl(x+o(x)\bigr)^2=x^2+o(x^2)$。</p>
</div>
<x-check answer="text:1346|1,3,4,6|1，3，4，6|1、3、4、6|(1)(3)(4)(6)" ph="正确等式的编号，如 125">正确的编号</x-check>
<x-hint>逐个用定义验证；要说明一个等式错误，举一个反例就够了。</x-hint>
<x-ans>
<p>(1) 正确：若 $w=o(x^2)$，则 $\frac wx=\frac w{x^2}\cdot x\to0$。(2) 错误：$x^2=o(x)$，但 $\frac{x^2}{x^2}=1$，$x^2$ 不是 $o(x^2)$。(3) 正确：$\frac{x\,w}{x^3}=\frac w{x^2}\to0$。(4) 正确：$\frac{w/x}x=\frac w{x^2}\to0$。(5) 错误：$x^3=o(x^2)$，$x^2=o(x)$，而 $\frac{x^3}{x^2}=x$ 不是 $o(x)$。(6) 正确：若 $w=o(x)$，则 $(x+w)^2=x^2+2xw+w^2$，其中 $2xw=o(x^2)$，$w^2=o(x)\cdot o(x)=o(x^2)$。</p>
<p>所以正确的是 (1)(3)(4)(6)。</p>
</x-ans>
</x-prob>
<x-prob level="基础" t="求渐近线">
<div>
<p>求下列曲线的全部渐近线：</p>
<p>(1) $y=\frac{x^3}{x^2+2x-3}$；(2) $y=x\ln\left(e+\frac1x\right)$；(3) $y=\sqrt{x^2-x+1}$。</p>
</div>
<x-check answer="-2">(1) 斜渐近线的截距</x-check>
<x-check answer="1/e" ph="可输入表达式，如 1/e">(2) 斜渐近线的截距</x-check>
<x-check answer="1/2" ph="分数或小数">(3) x→−∞ 时渐近线的截距</x-check>
<x-hint>(1) 分母 $x^2+2x-3=(x+3)(x-1)$；(2) 先确定定义域，$b=\lim x\left[\ln\left(e+\frac1x\right)-1\right]=\lim x\ln\left(1+\frac1{ex}\right)$；(3) 两个方向分别计算。</x-hint>
<x-ans>
<p>(1) $x\to1$ 与 $x\to-3$ 时 $y\to\infty$，所以 $x=1$、$x=-3$ 是垂直渐近线。$k=\lim\limits_{x\to\infty}\frac{x^2}{x^2+2x-3}=1$，$b=\lim\limits_{x\to\infty}\left(\frac{x^3}{x^2+2x-3}-x\right)=\lim\limits_{x\to\infty}\frac{-2x^2+3x}{x^2+2x-3}=-2$，斜渐近线为 $y=x-2$（两个方向相同）。</p>
<p>(2) 由 $e+\frac1x>0$ 得定义域 $\left(-\infty,-\frac1e\right)\cup(0,+\infty)$。$x\to\left(-\frac1e\right)^-$ 时 $e+\frac1x\to0^+$，$\ln\left(e+\frac1x\right)\to-\infty$，而 $x\to-\frac1e<0$，所以 $y\to+\infty$，$x=-\frac1e$ 是垂直渐近线；$x\to0^+$ 时 $y=x\ln(ex+1)-x\ln x\to0$（<x-ref to="cor-growth"></x-ref>），$x=0$ 不是垂直渐近线。又 $k=\lim\limits_{x\to\infty}\ln\left(e+\frac1x\right)=1$，</p>
$$b=\lim_{x\to\infty}x\left[\ln\left(e+\frac1x\right)-1\right]=\lim_{x\to\infty}x\ln\left(1+\frac1{ex}\right)=\lim_{x\to\infty}x\cdot\frac1{ex}=\frac1e,$$
<p>斜渐近线为 $y=x+\frac1e$（两个方向相同）。</p>
<p>(3) 函数处处有定义且连续，没有垂直渐近线。$x\to+\infty$ 时 $k=1$，$b=\lim\limits_{x\to+\infty}\left(\sqrt{x^2-x+1}-x\right)=\lim\limits_{x\to+\infty}\frac{-x+1}{\sqrt{x^2-x+1}+x}=-\frac12$，渐近线为 $y=x-\frac12$；$x\to-\infty$ 时 $\sqrt{x^2-x+1}=-x\sqrt{1-\frac1x+\frac1{x^2}}$，$k=-1$，$b=\lim\limits_{x\to-\infty}\left(\sqrt{x^2-x+1}+x\right)=\lim\limits_{x\to-\infty}\frac{-x+1}{\sqrt{x^2-x+1}-x}=\frac12$，渐近线为 $y=-x+\frac12$。</p>
</x-ans>
</x-prob>
<x-prob level="基础" t="增长快慢的排序">
<div>
<p>当 $x\to+\infty$ 时，把下列无穷大量按阶从低到高排列：</p>
<p>A. $x^{10}$；B. $e^{\sqrt x}$；C. $(\ln x)^{100}$；D. $1.1^x$；E. $x^x$；F. $\sqrt x$。</p>
</div>
<x-check answer="text:CFABDE|C,F,A,B,D,E|C，F，A，B，D，E|C、F、A、B、D、E" ph="按从低到高的顺序写字母，如 ABCDEF">排列顺序</x-check>
<x-hint>利用 <x-ref to="thm-growth"></x-ref>；比较 B 与 A 时令 $t=\sqrt x$，比较 B 与 D 时比较指数。</x-hint>
<x-ans>
<p>$\mathrm C\ll\mathrm F\ll\mathrm A\ll\mathrm B\ll\mathrm D\ll\mathrm E$。理由：$\frac{(\ln x)^{100}}{\sqrt x}\to0$；$\frac{\sqrt x}{x^{10}}\to0$；令 $t=\sqrt x$，$\frac{x^{10}}{e^{\sqrt x}}=\frac{t^{20}}{e^t}\to0$；$\frac{e^{\sqrt x}}{1.1^x}=e^{\sqrt x-x\ln1.1}\to0$，因为指数 $\sqrt x-x\ln1.1=-x\left(\ln1.1-\frac1{\sqrt x}\right)\to-\infty$；$\frac{1.1^x}{x^x}\to0$（<x-ref to="cor-growth"></x-ref>）。</p>
<x-remark>$e^{\sqrt x}$ 比任何幂函数增长都快，又比任何 $a^x$（$a>1$）增长都慢，它处在“幂”与“指数”两级阶梯之间。</x-remark>
</x-ans>
</x-prob>
<x-prob level="提高" t="对数与等价量">
<div>
<p>设 $x\to x_0$ 时 $u(x)\sim v(x)$，$u(x)>0$，$v(x)>0$，且 $v(x)\to0^+$ 或 $v(x)\to+\infty$。</p>
<p>(1) 证明 $\ln u(x)\sim\ln v(x)$；(2) 举例说明条件“$v\to0^+$ 或 $v\to+\infty$”不能去掉；(3) 利用 (1) 求 $\lim\limits_{x\to0^+}\frac{\ln\sin x}{\ln x}$ 与 $\lim\limits_{x\to+\infty}\frac{\ln(x^3+x)}{\ln x}$。</p>
</div>
<x-check answer="1">(3) 第一个极限</x-check>
<x-check answer="3">(3) 第二个极限</x-check>
<x-hint>$\frac{\ln u}{\ln v}=1+\frac{\ln(u/v)}{\ln v}$。</x-hint>
<x-ans>
<p>(1) $|\ln v|\to+\infty$，所以在 $x_0$ 的某个去心邻域中 $\ln v\ne0$，且 $\frac{\ln u}{\ln v}=\frac{\ln v+\ln\frac uv}{\ln v}=1+\frac{\ln\frac uv}{\ln v}$。由 $\frac uv\to1$ 与对数函数的连续性，$\ln\frac uv\to0$，而 $|\ln v|\to+\infty$，所以 $\frac{\ln u}{\ln v}\to1$。</p>
<p>(2) $x\to0$ 时 $1+2x\sim1+x$（两者都趋于 $1$），但 $\frac{\ln(1+2x)}{\ln(1+x)}\to2$。</p>
<p>(3) $x\to0^+$ 时 $\sin x\sim x\to0^+$，所以 $\ln\sin x\sim\ln x$，第一个极限为 $1$；$x\to+\infty$ 时 $x^3+x\sim x^3\to+\infty$，所以 $\ln(x^3+x)\sim\ln x^3=3\ln x$，第二个极限为 $3$。</p>
</x-ans>
</x-prob>
<x-prob level="提高" t="嵌套根式的主部">
<div>
<p>设 $f(x)=\sqrt{x+\sqrt{x+\sqrt x}}$。</p>
<p>(1) 求 $x\to0^+$ 时与 $f(x)$ 等价的形如 $x^k$ 的无穷小量；(2) 证明 $x\to+\infty$ 时 $f(x)\sim\sqrt x$，并求 $\lim\limits_{x\to+\infty}\bigl(f(x)-\sqrt x\bigr)$。</p>
</div>
<x-check answer="1/8" ph="分数或小数">(1) 中的 k</x-check>
<x-check answer="1/2" ph="分数或小数">(2) 中的极限</x-check>
<x-hint>若 $u\sim v$（$u,v>0$），则 $u^\alpha\sim v^\alpha$；若 $w=o(v)$，则 $v+w\sim v$。从里向外逐层处理。</x-hint>
<x-ans>
<p>先说明两个事实：若 $u\sim v$（$u,v>0$），则 $\frac{u^\alpha}{v^\alpha}=\left(\frac uv\right)^\alpha\to1$；若 $w=o(v)$，则 $\frac{v+w}v\to1$。</p>
<p>(1) $x\to0^+$ 时 $x=o(\sqrt x)$，所以 $x+\sqrt x\sim\sqrt x$，$\sqrt{x+\sqrt x}\sim x^{\frac14}$；又 $x=o\left(x^{\frac14}\right)$，所以 $x+\sqrt{x+\sqrt x}\sim x^{\frac14}$，$f(x)\sim x^{\frac18}$，$k=\frac18$。</p>
<p>(2) $x\to+\infty$ 时 $\sqrt x=o(x)$，所以 $x+\sqrt x\sim x$，$\sqrt{x+\sqrt x}\sim\sqrt x=o(x)$，从而 $x+\sqrt{x+\sqrt x}\sim x$，$f(x)\sim\sqrt x$。于是</p>
$$f(x)-\sqrt x=\frac{f(x)^2-x}{f(x)+\sqrt x}=\frac{\sqrt{x+\sqrt x}}{f(x)+\sqrt x}=\frac{\sqrt{x+\sqrt x}\big/\sqrt x}{f(x)\big/\sqrt x+1}\to\frac1{1+1}=\frac12.$$
<x-remark>两个方向的结论截然不同：$x\to0^+$ 时最里层的 $\sqrt x$ 起主要作用，$x\to+\infty$ 时最外层的 $x$ 起主要作用。</x-remark>
</x-ans>
</x-prob>
<x-prob level="提高" t="幂指函数的极限">
<div>
<p>求下列极限：(1) $\lim\limits_{x\to0^+}x^{\sin x}$；(2) $\lim\limits_{x\to+\infty}\left(x^2+2^x\right)^{\frac1x}$；(3) $\lim\limits_{x\to+\infty}\left(\frac{\ln x}x\right)^{\frac1x}$。</p>
</div>
<x-check answer="1">(1)</x-check>
<x-check answer="2">(2)</x-check>
<x-check answer="1">(3)</x-check>
<x-hint>写成 $e^{(\cdots)}$ 的形式；(2) 先提出 $2^x$。</x-hint>
<x-ans>
<p>(1) $x^{\sin x}=e^{\sin x\ln x}$，而 $\sin x\ln x=\frac{\sin x}x\cdot x\ln x\to1\cdot0=0$（<x-ref to="cor-growth"></x-ref>），极限为 $e^0=1$。</p>
<p>(2) $\left(x^2+2^x\right)^{\frac1x}=2\left(1+\frac{x^2}{2^x}\right)^{\frac1x}=2e^{\frac1x\ln\left(1+\frac{x^2}{2^x}\right)}$。由 $\frac{x^2}{2^x}\to0$ 得 $\frac1x\ln\left(1+\frac{x^2}{2^x}\right)\to0\cdot\ln1=0$，极限为 $2$。</p>
<p>(3) 当 $x>1$ 时 $\left(\frac{\ln x}x\right)^{\frac1x}=e^{\frac{\ln\ln x-\ln x}x}$，而 $\frac{\ln\ln x}x=\frac{\ln\ln x}{\ln x}\cdot\frac{\ln x}x\to0$（令 $t=\ln x$，$\frac{\ln t}t\to0$），$\frac{\ln x}x\to0$，极限为 $e^0=1$。</p>
</x-ans>
</x-prob>
<x-prob level="提高" t="和差中的等价替换">
<div>
<p>设 $x\to x_0$ 时 $\alpha\sim\alpha'$，$\beta\sim\beta'$（它们在 $x_0$ 的某个去心邻域中都不为 $0$），且 $\lim\limits_{x\to x_0}\frac\alpha\beta=c$，$c$ 是不等于 $-1$ 的有限数。</p>
<p>(1) 证明 $\alpha+\beta\sim\alpha'+\beta'$；(2) 说明 $c=-1$ 时结论可能不成立；(3) 求 $\lim\limits_{x\to0}\frac{\tan2x+\sin x}{\ln(1+x)+\arcsin3x}$。</p>
</div>
<x-check answer="3/4" ph="分数或小数">(3)</x-check>
<x-hint>$\frac{\alpha+\beta}{\alpha'+\beta'}=\frac\beta{\beta'}\cdot\frac{\frac\alpha\beta+1}{\frac{\alpha'}{\beta'}+1}$。</x-hint>
<x-ans>
<p>(1) $\frac{\alpha'}{\beta'}=\frac{\alpha'}\alpha\cdot\frac\alpha\beta\cdot\frac\beta{\beta'}\to c$，所以 $\frac{\alpha'}{\beta'}+1\to c+1\ne0$，在 $x_0$ 的某个去心邻域中 $\alpha'+\beta'=\beta'\left(\frac{\alpha'}{\beta'}+1\right)\ne0$，且</p>
$$\frac{\alpha+\beta}{\alpha'+\beta'}=\frac\beta{\beta'}\cdot\frac{\frac\alpha\beta+1}{\frac{\alpha'}{\beta'}+1}\to1\cdot\frac{c+1}{c+1}=1.$$
<p>(2) 取 $\alpha=\tan x$，$\beta=-\sin x$，$\alpha'=x$，$\beta'=-x$，则 $c=-1$，$\alpha'+\beta'\equiv0$，而 $\alpha+\beta\sim\frac{x^3}2$，结论不成立。</p>
<p>(3) $\frac{\tan2x}{\sin x}\to2\ne-1$，所以分子 $\sim2x+x=3x$；$\frac{\ln(1+x)}{\arcsin3x}\to\frac13\ne-1$，所以分母 $\sim x+3x=4x$。极限为 $\frac34$。</p>
</x-ans>
</x-prob>
`);
MA.add("3-3", String.raw`
<x-prob level="挑战" t="$x-\sin x$ 的阶" id="pb-xsin">
<div>
<p>证明 $\lim\limits_{x\to0}\frac{x-\sin x}{x^3}=\frac16$，即 $x-\sin x\sim\frac{x^3}6\ (x\to0)$。</p>
</div>
<x-check answer="1/6" ph="分数或小数">极限值</x-check>
<x-hint>记 $\varphi(x)=\frac{x-\sin x}{x^3}$，它是偶函数，只需考虑 $x\to0^+$。(1) 先证 $0<x\le1$ 时 $0<\varphi(x)<1$（利用 $x<\tan x$ 与 $1-\cos x=2\sin^2\frac x2\le\frac{x^2}2$）；(2) 由 $\sin3t=3\sin t-4\sin^3t$ 得 $\varphi(3t)=\frac19\varphi(t)+\frac4{27}\left(\frac{\sin t}t\right)^3$；(3) 反复使用 (2)。</x-hint>
<x-ans>
<p>$\varphi$ 是偶函数，只需证明 $x\to0^+$ 的情形。记 $s(t)=\frac{\sin t}t$。</p>
<p>(1) 当 $0<x\le1$ 时 $\sin x<x<\tan x$，所以</p>
$$0<x-\sin x<\tan x-\sin x=\tan x\,(1-\cos x)=2\tan x\sin^2\frac x2\le\frac{x^2}2\tan x,$$
<p>于是 $0<\varphi(x)<\frac{\tan x}{2x}=\frac{s(x)}{2\cos x}<\frac1{2\cos1}<1$。由此还得到 $0<1-s(x)=x^2\varphi(x)<x^2$。</p>
<p>(2) 由 $\sin3t=3\sin t-4\sin^3t$ 得 $3t-\sin3t=3(t-\sin t)+4\sin^3t$，两边除以 $(3t)^3=27t^3$，得</p>
$$\varphi(3t)=\frac19\varphi(t)+\frac4{27}s(t)^3.$$
<p>(3) 固定 $x\in(0,1]$，在 (2) 中依次取 $t=\frac x3,\frac x{3^2},\dots,\frac x{3^n}$，得到</p>
$$\varphi(x)=\frac4{27}\sum_{k=1}^n\frac1{9^{k-1}}\,s\!\left(\frac x{3^k}\right)^3+\frac1{9^n}\,\varphi\!\left(\frac x{3^n}\right).$$
<p>由 (1)，最后一项介于 $0$ 与 $\frac1{9^n}$ 之间，令 $n\to\infty$ 得 $\varphi(x)=\frac4{27}\sum\limits_{k=1}^\infty\frac1{9^{k-1}}\,s\!\left(\frac x{3^k}\right)^3$。又 $\frac4{27}\sum\limits_{k=1}^\infty\frac1{9^{k-1}}=\frac4{27}\cdot\frac98=\frac16$，所以</p>
$$\frac16-\varphi(x)=\frac4{27}\sum_{k=1}^\infty\frac1{9^{k-1}}\left[1-s\!\left(\frac x{3^k}\right)^3\right].$$
<p>当 $0<t\le1$ 时 $0<s(t)<1$，由 (1)，$0<1-s(t)^3=(1-s(t))\bigl(1+s(t)+s(t)^2\bigr)<3(1-s(t))<3t^2$，因此</p>
$$0<\frac16-\varphi(x)<\frac4{27}\sum_{k=1}^\infty\frac1{9^{k-1}}\cdot3\left(\frac x{3^k}\right)^2=\frac{x^2}{20}\qquad(0<x\le1).$$
<p>由夹逼准则，$\lim\limits_{x\to0^+}\varphi(x)=\frac16$。<span class="qed">∎</span></p>
<x-remark>这个证明还给出了误差估计 $0<\frac16-\frac{x-\sin x}{x^3}<\frac{x^2}{20}$（$0<|x|\le1$）。第五章用 Taylor 公式可以得到更精确的 $x-\sin x=\frac{x^3}6-\frac{x^5}{120}+o(x^5)$。</x-remark>
</x-ans>
</x-prob>
<x-prob level="挑战" t="由差的极限推出 $\frac{f(x)}x$ 的极限">
<div>
<p>设 $f(x)$ 在 $[a,+\infty)$ 的每个有限区间上有界，且 $\lim\limits_{x\to+\infty}\bigl[f(x+1)-f(x)\bigr]=A$（$A$ 为有限数）。证明 $\lim\limits_{x\to+\infty}\frac{f(x)}x=A$，并举例说明“在每个有限区间上有界”的条件不能去掉。</p>
</div>
<x-hint>任给 $\eps>0$，取 $X\ge\max\{a,0\}$，使得 $x\ge X$ 时 $|f(x+1)-f(x)-A|<\eps$。对 $x\ge X+1$，令 $n=[x-X]$，$t=x-X-n\in[0,1)$，把 $f(x)-f(X+t)$ 写成 $n$ 个差之和。</x-hint>
<x-ans>
<p>任给 $\eps>0$，取 $X\ge\max\{a,0\}$，使得 $x\ge X$ 时 $|f(x+1)-f(x)-A|<\eps$。设 $|f|\le M$ 于 $[X,X+1]$。对 $x\ge X+1$，令 $n=[x-X]\ge1$，$t=x-X-n\in[0,1)$，则</p>
$$f(x)-f(X+t)=\sum_{j=0}^{n-1}\bigl[f(X+t+j+1)-f(X+t+j)\bigr],$$
<p>每一项与 $A$ 之差的绝对值小于 $\eps$，所以 $\bigl|f(x)-f(X+t)-nA\bigr|<n\eps$。注意 $x-n=X+t\in[X,X+1)$，$n\le x$，于是</p>
$$\bigl|f(x)-Ax\bigr|\le\bigl|f(x)-f(X+t)-nA\bigr|+|f(X+t)|+|A|(x-n)<n\eps+M+|A|(X+1),$$
$$\left|\frac{f(x)}x-A\right|<\eps+\frac{M+|A|(X+1)}x.$$
<p>当 $x$ 充分大时右端第二项小于 $\eps$，所以 $\lim\limits_{x\to+\infty}\frac{f(x)}x=A$。<span class="qed">∎</span></p>
<p>反例：令 $f(x)=\frac1{x-[x]}$（$x$ 不是整数），$f(x)=0$（$x$ 是整数）。$f$ 以 $1$ 为周期，$f(x+1)-f(x)\equiv0$，但 $f$ 在每个区间 $(n,n+1)$ 中无界。取 $x_n=n+\frac1{n^2}$，则 $\frac{f(x_n)}{x_n}=\frac{n^2}{n+n^{-2}}\to+\infty$，而在 $x=n+\frac12$ 处 $\frac{f(x)}x=\frac2{n+1/2}\to0$，所以 $\frac{f(x)}x$ 没有极限。</p>
<x-remark>这是 Stolz 定理（<x-ref to="2-3/thm-stolz"></x-ref>）的一个函数版本。例如由 $\ln(x+1)-\ln x=\ln\left(1+\frac1x\right)\to0$ 立即得到 $\frac{\ln x}x\to0$。</x-remark>
</x-ans>
</x-prob>
<x-prob level="挑战" t="没有最慢的无穷大量，也没有最快的">
<div>
<p>(1) 证明：对任意 $k>0$，$x\to+\infty$ 时 $x^k=o\bigl((\ln x)^{\ln x}\bigr)$，且 $(\ln x)^{\ln x}=o(e^x)$；</p>
<p>(2) 证明：若 $u(x)\to+\infty\ (x\to+\infty)$，则 $\ln u(x)$ 是比 $u(x)$ 低阶的无穷大量，$e^{u(x)}$ 是比 $u(x)$ 高阶的无穷大量。由此说明：不存在增长最慢的无穷大量，也不存在增长最快的无穷大量。</p>
</div>
<x-hint>$(\ln x)^{\ln x}=e^{\ln x\cdot\ln\ln x}=x^{\ln\ln x}$（$x>1$）。</x-hint>
<x-ans>
<p>(1) 当 $x>1$ 时 $(\ln x)^{\ln x}=e^{\ln x\,\ln\ln x}=x^{\ln\ln x}$。当 $x>e^{e^{k+1}}$ 时 $\ln\ln x>k+1$，所以 $0<\frac{x^k}{x^{\ln\ln x}}=x^{k-\ln\ln x}<\frac1x\to0$。另一方面，由 $\ln y<y\ (y>0)$ 得 $\ln\ln x<\ln x\ (x>1)$，所以 $0<\frac{\ln x\,\ln\ln x}x<\frac{(\ln x)^2}x\to0$，指数 $\ln x\,\ln\ln x-x=-x\left(1-\frac{\ln x\,\ln\ln x}x\right)\to-\infty$，从而 $\frac{(\ln x)^{\ln x}}{e^x}=e^{\ln x\,\ln\ln x-x}\to0$。</p>
<p>(2) 由 <x-ref to="thm-growth"></x-ref>，$\lim\limits_{t\to+\infty}\frac{\ln t}t=0$，$\lim\limits_{t\to+\infty}\frac t{e^t}=0$。任给 $\eps>0$，存在 $T$，当 $t>T$ 时 $\frac{\ln t}t<\eps$；又存在 $X$，当 $x>X$ 时 $u(x)>T$，从而 $0<\frac{\ln u(x)}{u(x)}<\eps$（$T$ 取得大于 $1$）。所以 $\ln u=o(u)$，且 $\ln u\to+\infty$，它是比 $u$ 低阶的无穷大量。同理 $u=o\left(e^u\right)$。于是任给一个无穷大量 $u$，$\ln u$ 比它增长得慢，$e^u$ 比它增长得快：既没有增长最慢的，也没有增长最快的。</p>
<x-remark>$\ln x\gg\ln\ln x\gg\ln\ln\ln x\gg\cdots$ 一个比一个慢，$e^x\ll e^{e^x}\ll\cdots$ 一个比一个快。(1) 中的 $(\ln x)^{\ln x}$ 比任何幂函数都快，又比 $e^x$ 慢，它也处在“幂”与“指数”之间。</x-remark>
</x-ans>
</x-prob>
<x-prob level="应用" t="单摆的小角度近似">
<div>
<p>单摆的运动方程中出现 $\sin\theta$。小角度时常用近似 $\sin\theta\approx\theta$（$\theta$ 以弧度计），由此得到周期公式 $T\approx2\pi\sqrt{l/g}$。</p>
<p>(1) 计算 $\theta=10^\circ$ 时这一近似的相对误差 $\frac{\theta-\sin\theta}\theta$（用百分数表示）；</p>
<p>(2) 利用<x-ref to="pb-xsin"></x-ref>的结论 $\theta-\sin\theta\sim\frac{\theta^3}6$ 估计：要使相对误差不超过 $1\%$，$\theta$ 最大约为多少度？</p>
</div>
<x-check answer="0.507" tol="0.002" unit="%">(1)</x-check>
<x-check answer="14.03" tol="0.05" unit="°">(2) 的估计值</x-check>
<x-hint>$10^\circ=\frac\pi{18}$ 弧度；(2) 解 $\frac{\theta^2}6=0.01$。</x-hint>
<x-ans>
<p>(1) $\theta=\frac\pi{18}\approx0.174533$，$\sin\theta\approx0.173648$，相对误差 $\frac{\theta-\sin\theta}\theta\approx\frac{0.000885}{0.174533}\approx0.507\%$。用主部 $\frac{\theta^2}6$ 估计得 $0.508\%$，相当准确。</p>
<p>(2) 由 $\frac{\theta-\sin\theta}\theta\approx\frac{\theta^2}6\le0.01$ 得 $\theta\le\sqrt{0.06}\approx0.2449$ 弧度，约 $14.03^\circ$。精确求解 $\frac{\sin\theta}\theta=0.99$ 得 $\theta\approx14.06^\circ$，估计值很好。</p>
<x-remark>周期公式本身的误差还要另外分析：摆幅为 $\theta_0$ 时，精确的周期约为 $2\pi\sqrt{l/g}\left(1+\frac{\theta_0^2}{16}\right)$，$\theta_0=10^\circ$ 时只比近似公式大约 $0.19\%$。</x-remark>
</x-ans>
</x-prob>
<x-prob level="应用" t="素数定理中的两个近似">
<div>
<p>素数定理断言 $\pi(x)\sim\frac x{\ln x}\ (x\to+\infty)$，其中 $\pi(x)$ 是不超过 $x$ 的素数个数。已知 $\pi(10^6)=78498$。</p>
<p>(1) 证明 $\frac x{\ln x-1}\sim\frac x{\ln x}$，从而也有 $\pi(x)\sim\frac x{\ln x-1}$；</p>
<p>(2) 分别计算 $\frac{10^6}{\ln10^6}$ 与 $\frac{10^6}{\ln10^6-1}$（保留一位小数），以及前者作为 $\pi(10^6)$ 的近似值的相对误差；</p>
<p>(3) $\pi(x)\sim\frac x{\ln x}$ 能否保证差 $\pi(x)-\frac x{\ln x}$ 有界？</p>
</div>
<x-check answer="72382.4" tol="0.1">(2) 第一个值</x-check>
<x-check answer="78030.4" tol="0.1">(2) 第二个值</x-check>
<x-check answer="7.79" tol="0.01" unit="%">(2) 前者的相对误差</x-check>
<x-hint>(1) 比值为 $\frac{\ln x}{\ln x-1}$；(3) 想一想等价描述的是相对误差还是绝对误差。</x-hint>
<x-ans>
<p>(1) $\frac{x/(\ln x-1)}{x/\ln x}=\frac{\ln x}{\ln x-1}\to1$；由 $\sim$ 的对称性与传递性（<x-ref to="prop-equiv"></x-ref>）得 $\pi(x)\sim\frac x{\ln x-1}$。</p>
<p>(2) $\ln10^6\approx13.8155$，$\frac{10^6}{13.8155}\approx72382.4$，相对误差 $\frac{78498-72382.4}{78498}\approx7.79\%$；$\frac{10^6}{12.8155}\approx78030.4$，相对误差约为 $0.60\%$。</p>
<p>(3) 不能。等价只说明<em>相对误差</em>趋于 $0$，绝对误差可以趋于无穷：$x=10^6$ 时 $\pi(x)-\frac x{\ln x}\approx6116$，而且可以证明这个差随 $x$ 增大趋于 $+\infty$。两个都与 $\pi(x)$ 等价的近似式，精度可以相差很大；要比较它们，需要考察误差项的阶。</p>
</x-ans>
</x-prob>
<x-prob level="应用" t="能看多远：地平线的距离">
<div>
<p>地球半径 $R\approx6371\ \text{km}$。人眼高出海面 $h$ 时，视线与海面相切的切点到眼睛的距离为 $d(h)=\sqrt{(R+h)^2-R^2}$。</p>
<p>(1) 证明 $h\to0^+$ 时 $d(h)\sim\sqrt{2Rh}$，并求相对误差 $\frac{d(h)}{\sqrt{2Rh}}-1$ 的主部；</p>
<p>(2) 用 $\sqrt{2Rh}$ 计算：眼睛离海面 $1.7\ \text{m}$ 时与在 $100\ \text{m}$ 高的悬崖上时，能看到多远的海面（单位：km）？</p>
</div>
<x-check answer="4.654" tol="0.002" unit="km">(2) h = 1.7 m</x-check>
<x-check answer="35.70" tol="0.01" unit="km">(2) h = 100 m</x-check>
<x-hint>$d(h)=\sqrt{2Rh+h^2}=\sqrt{2Rh}\sqrt{1+\frac h{2R}}$；计算时把 $h$ 换算成千米。</x-hint>
<x-ans>
<p>(1) $\frac{d(h)}{\sqrt{2Rh}}=\sqrt{1+\frac h{2R}}\to1$，所以 $d(h)\sim\sqrt{2Rh}$；又 $\sqrt{1+\frac h{2R}}-1\sim\frac h{4R}$，相对误差的主部是 $\frac h{4R}$。</p>
<p>(2) $h=1.7\ \text{m}=0.0017\ \text{km}$ 时，$d\approx\sqrt{2\times6371\times0.0017}\approx4.654\ \text{km}$；$h=100\ \text{m}=0.1\ \text{km}$ 时，$d\approx\sqrt{2\times6371\times0.1}\approx35.70\ \text{km}$。两种情形的相对误差约为 $\frac h{4R}\approx6.7\times10^{-8}$ 与 $3.9\times10^{-6}$，完全可以忽略。</p>
<x-remark>由 $d\approx\sqrt{2Rh}$ 可知，可视距离与高度的平方根成正比：高度增加到 $4$ 倍，看到的距离只增加到 $2$ 倍。实际上大气折射会使光线略微弯曲，能看到的距离还要稍远一些。</x-remark>
</x-ans>
</x-prob>
`);
