/* §3.4 闭区间上的连续函数 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("3-4", String.raw`
<x-goal>
<ul>
<li>掌握闭区间上连续函数的有界性定理与最值定理，知道“闭区间”和“连续”两个条件缺一不可。</li>
<li>掌握零点存在定理与中间值定理，会用它们证明方程有根、判断根的位置，会用二分法求根的近似值。</li>
<li>理解“连续函数把区间映成区间”，并由此完成区间上反函数连续性的讨论。</li>
<li>理解一致连续的定义及其否定形式，会用定义或数列判断函数在给定区间上是否一致连续。</li>
<li>掌握 Cantor 定理及有限开区间上一致连续的判别法，体会本节各定理与实数系基本定理之间的联系。</li>
</ul>
</x-goal>
<p>前两节讨论的连续性是“局部”性质：$f(x)$ 在 $x_0$ 处是否连续，只取决于 $f$ 在 $x_0$ 附近的值。本节讨论闭区间上连续函数的“整体”性质：有界、取到最大值与最小值、取遍介于最小值与最大值之间的一切值、一致连续。从图像上看，这些结论几乎是“显然”的：一条包括两个端点、能一笔画成的曲线当然有最高点和最低点；从 $x$ 轴下方画到上方，当然要穿过 $x$ 轴。但如果只在有理数中考虑，它们全都不成立：</p>
<ul>
<li>$f(x)=x^2-2$ 在 $[1,2]\cap\Q$ 上连续，$f(1)=-1<0<2=f(2)$，但它没有有理数零点（<x-ref to="2-1/thm-sqrt2"></x-ref>）；</li>
<li>$g(x)=\frac1{x^2-2}$ 在 $[1,2]\cap\Q$ 上处处有定义而且连续，却是无界的（在 $\sqrt2$ 附近取有理数即可看出）；</li>
<li>$h(x)=-\abs{x^2-2}$ 在 $[1,2]\cap\Q$ 上的上确界是 $0$，却取不到。</li>
</ul>
<p>可见这些“显然”的结论依赖于实数的连续性。本节的每个定理，证明中都要用到第二章的实数系基本定理：确界存在定理（<x-ref to="2-1/thm-sup"></x-ref>）、闭区间套定理（<x-ref to="2-4/thm-nest"></x-ref>）或 Bolzano–Weierstrass 定理（<x-ref to="2-4/thm-bw"></x-ref>）。以下记号 $f\in C[a,b]$ 表示 $f$ 在闭区间 $[a,b]$ 上连续（<x-ref to="3-2/def-intc"></x-ref>）：在每个内点连续，在 $a$ 右连续，在 $b$ 左连续。</p>

<h2 id="bound">有界性定理</h2>
<x-thm t="有界性定理" id="thm-bound">
<p>若 $f\in C[a,b]$，则 $f(x)$ 在 $[a,b]$ 上有界。</p>
<x-proof><p>用反证法。假设 $f$ 在 $[a,b]$ 上无界，则对每个正整数 $n$，存在 $x_n\in[a,b]$，使 $|f(x_n)|>n$。数列 $\{x_n\}$ 有界，由 Bolzano–Weierstrass 定理，它有收敛的子列 $\{x_{n_k}\}$，设 $\lim\limits_{k\to\infty}x_{n_k}=\xi$。由 $a\le x_{n_k}\le b$ 和极限的不等式（<x-ref to="2-2/cor-le"></x-ref>）得 $a\le\xi\le b$。</p>
<p>$f$ 在 $\xi$ 处连续（$\xi$ 是端点时为单侧连续），而 $x_{n_k}$ 都属于 $[a,b]$，由连续性的数列刻画（<x-ref to="3-2/prop-seqc"></x-ref>，对单侧连续同样成立）得 $\lim\limits_{k\to\infty}f(x_{n_k})=f(\xi)$，于是 $\{f(x_{n_k})\}$ 是有界数列。但 $|f(x_{n_k})|>n_k\ge k$，$\{f(x_{n_k})\}$ 无界，矛盾。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><ul>
<li>证明中三个条件各有用处：区间有界，保证 Bolzano–Weierstrass 定理可用；区间是闭的，保证子列的极限 $\xi$ 仍属于 $[a,b]$；$f$ 连续，保证 $f(x_{n_k})\to f(\xi)$。</li>
<li>也可以用闭区间套定理证明：若 $f$ 在 $[a,b]$ 上无界，把区间二等分，$f$ 至少在其中一半上无界；不断二等分，得到一列闭区间套 $\{[a_n,b_n]\}$，$f$ 在每个 $[a_n,b_n]$ 上都无界。设它们的公共点为 $\xi$。由 $f$ 在 $\xi$ 处连续，取 $\eps=1$，存在 $\delta>0$，当 $x\in[a,b]$ 且 $|x-\xi|<\delta$ 时 $|f(x)|<|f(\xi)|+1$；而 $n$ 充分大时 $[a_n,b_n]\subset(\xi-\delta,\xi+\delta)$，这与 $f$ 在 $[a_n,b_n]$ 上无界矛盾。</li>
</ul></x-note>
<x-warn><p>定理的条件缺一不可：</p>
<ul>
<li>区间不闭：$f(x)=\frac1x$ 在 $(0,1]$ 上连续，但无界；</li>
<li>函数不连续：令 $f(x)=\frac1x\ (0<x\le1)$，$f(0)=0$，它在闭区间 $[0,1]$ 上有定义，只在 $x=0$ 处不连续，同样无界；</li>
<li>区间无界：$f(x)=x$ 在 $[0,+\infty)$ 上连续，但无界。</li>
</ul></x-warn>

<h2 id="extr">最值定理</h2>
<p>有界性定理说明 $f([a,b])$ 是有界集，因而有上确界和下确界。一般的有界函数未必能取到确界（例如 $x-[x]$ 在 $[0,1)$ 上的上确界 $1$），闭区间上的连续函数却总能取到：</p>
<x-thm t="最值定理" id="thm-extr">
<p>若 $f\in C[a,b]$，则 $f(x)$ 在 $[a,b]$ 上能取到最大值与最小值，即存在 $\xi,\eta\in[a,b]$，使得对一切 $x\in[a,b]$，成立</p>
$$f(\eta)\le f(x)\le f(\xi).$$
<x-proof><p>由有界性定理和确界存在定理，$M=\sup\limits_{x\in[a,b]}f(x)$ 是有限数。由上确界的定义，对每个正整数 $n$，存在 $x_n\in[a,b]$，使</p>
$$M-\frac1n<f(x_n)\le M.$$
<p>由 Bolzano–Weierstrass 定理，$\{x_n\}$ 有收敛子列 $x_{n_k}\to\xi$。与上面的证明一样，$\xi\in[a,b]$ 且 $f(x_{n_k})\to f(\xi)$。另一方面，由 $M-\frac1{n_k}<f(x_{n_k})\le M$ 和夹逼准则得 $f(x_{n_k})\to M$。由极限的唯一性，$f(\xi)=M$，即 $M$ 是最大值。把这个结论用于 $-f$，即知 $f$ 能取到最小值。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>另一种证法：若 $M$ 取不到，则 $f(x)<M$ 对一切 $x\in[a,b]$ 成立，于是 $g(x)=\frac1{M-f(x)}$ 是 $[a,b]$ 上的正值连续函数。由有界性定理，存在 $K>0$ 使 $g(x)\le K$，即 $f(x)\le M-\frac1K$ 对一切 $x\in[a,b]$ 成立，这与 $M$ 是上确界矛盾。</p></x-note>
<x-warn><p>同样，定理的条件缺一不可，而且只是充分条件：</p>
<ul>
<li>$f(x)=x$ 在 $(0,1)$ 上连续、有界，上确界 $1$、下确界 $0$ 都取不到（区间不闭）；</li>
<li>$f(x)=x-[x]$ 在 $[0,1]$ 上有界，最小值 $0$ 能取到，上确界 $1$ 取不到——它在 $x=1$ 处不连续（$f(1-)=1\ne0=f(1)$）；</li>
<li>$f(x)=\arctan x$ 在 $(-\infty,+\infty)$ 上连续、有界，既没有最大值也没有最小值（区间无界）；</li>
<li>反过来，不满足条件的函数也可能取到最值：Dirichlet 函数在 $[0,1]$ 上处处不连续，最大值 $1$、最小值 $0$ 却都能取到。</li>
</ul>
<p>此外，定理只断言最值点存在，没有说怎样求出它们，也没有说最值点唯一。求最值点的方法将在第五章用导数解决。</p></x-warn>
<x-ex t="正的连续函数有正的下界" id="ex-pos">
<p>设 $f\in C[a,b]$，且 $f(x)>0$ 对一切 $x\in[a,b]$ 成立。证明存在常数 $c>0$，使 $f(x)\ge c$ 对一切 $x\in[a,b]$ 成立。</p>
<x-sol l="证明"><p>由最值定理，存在 $\eta\in[a,b]$，使 $f(\eta)=\min\limits_{x\in[a,b]}f(x)$。取 $c=f(\eta)$，则 $c>0$，且 $f(x)\ge c$ 对一切 $x\in[a,b]$ 成立。<span class="qed">∎</span></p></x-sol>
<x-remark>“$f(x)>0$ 处处成立”只能推出下确界 $\ge0$；下确界是否为正，要看它能否取到。在开区间上结论不成立：$f(x)=x$ 在 $(0,1)$ 上处处为正，下确界却是 $0$。这个结论常用来把“处处为正”加强为“有一致的正下界”，例如由它立即得到 $\frac1f$ 在 $[a,b]$ 上有界。</x-remark>
</x-ex>
<x-ex t="把无穷区间化为闭区间" id="ex-minr">
<p>设 $f(x)$ 在 $(-\infty,+\infty)$ 上连续，且 $\lim\limits_{x\to\infty}f(x)=+\infty$。证明 $f(x)$ 在 $(-\infty,+\infty)$ 上能取到最小值。</p>
<x-analysis><p>最值定理只适用于闭区间。条件说明 $|x|$ 很大时 $f(x)$ 也很大，最小值只可能在某个闭区间 $[-X,X]$ 上取到，于是只需在这个闭区间上用最值定理。</p></x-analysis>
<x-sol l="证明"><p>由 $\lim\limits_{x\to\infty}f(x)=+\infty$，对数 $f(0)$，存在 $X>0$，当 $|x|>X$ 时 $f(x)>f(0)$。$f$ 在 $[-X,X]$ 上连续，由最值定理，存在 $\eta\in[-X,X]$，使 $f(\eta)\le f(x)$ 对一切 $x\in[-X,X]$ 成立，特别地 $f(\eta)\le f(0)$。当 $|x|>X$ 时，$f(x)>f(0)\ge f(\eta)$。所以 $f(\eta)$ 是 $f$ 在 $(-\infty,+\infty)$ 上的最小值。<span class="qed">∎</span></p></x-sol>
<x-remark>例如多项式 $P(x)=x^4-3x+1$ 满足 $\lim\limits_{x\to\infty}P(x)=+\infty$，所以它在 $(-\infty,+\infty)$ 上有最小值。“用极限把无穷区间上的问题化为闭区间上的问题”是常用的技巧，习题中还会用到。</x-remark>
</x-ex>
`);
MA.add("3-4", String.raw`
<h2 id="zero">零点存在定理</h2>
<x-thm t="零点存在定理" id="thm-zero">
<p>若 $f\in C[a,b]$，且 $f(a)\cdot f(b)<0$，则一定存在 $\xi\in(a,b)$，使 $f(\xi)=0$。</p>
<x-proof><p>不妨设 $f(a)<0<f(b)$（否则考虑 $-f$）。记 $[a_1,b_1]=[a,b]$，取中点 $c_1=\frac{a_1+b_1}2$。若 $f(c_1)=0$，取 $\xi=c_1$ 即可；若 $f(c_1)<0$，令 $[a_2,b_2]=[c_1,b_1]$；若 $f(c_1)>0$，令 $[a_2,b_2]=[a_1,c_1]$。无论哪种情况，都有 $f(a_2)<0<f(b_2)$。</p>
<p>对 $[a_2,b_2]$ 重复这一过程。如果某一步的中点恰好是零点，证明已经完成；否则得到一列闭区间 $\{[a_n,b_n]\}$，满足</p>
$$[a_{n+1},b_{n+1}]\subset[a_n,b_n],\qquad b_n-a_n=\frac{b-a}{2^{n-1}}\to0,\qquad f(a_n)<0<f(b_n).$$
<p>由闭区间套定理，存在唯一的 $\xi\in\bigcap\limits_{n=1}^\infty[a_n,b_n]$，并且 $\lim\limits_{n\to\infty}a_n=\lim\limits_{n\to\infty}b_n=\xi$。由 $f$ 在 $\xi$ 处连续，$f(a_n)\to f(\xi)$，$f(b_n)\to f(\xi)$；再由极限的不等式，从 $f(a_n)<0$ 得 $f(\xi)\le0$，从 $f(b_n)>0$ 得 $f(\xi)\ge0$，所以 $f(\xi)=0$。由于 $f(a)\ne0$，$f(b)\ne0$，所以 $\xi\in(a,b)$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><ul>
<li>几何意义：连续曲线 $y=f(x)$ 的两个端点分别位于 $x$ 轴的两侧时，曲线与 $x$ 轴至少有一个交点。定理只保证零点存在，不保证唯一。</li>
<li>也可以用确界存在定理证明：设 $f(a)<0<f(b)$，令 $E=\{x\in[a,b]:f(x)<0\}$，$\xi=\sup E$。若 $f(\xi)<0$，则 $\xi<b$，由局部保号性（<x-ref to="3-1/cor-lsign"></x-ref>），$f$ 在 $\xi$ 右侧的一个小区间上仍为负，$E$ 中有大于 $\xi$ 的点，矛盾；若 $f(\xi)>0$，则 $\xi>a$，$f$ 在某个 $(\xi-\delta,\xi]$ 上为正，这些点都不属于 $E$，于是 $\xi-\delta$ 也是 $E$ 的上界，与 $\xi$ 是最小上界矛盾。所以 $f(\xi)=0$。</li>
<li>上面的证明本身就是一个求根的算法——<em>二分法</em>：二分 $n$ 次后，零点位于长度为 $\frac{b-a}{2^n}$ 的区间内。它对函数的要求只有连续，每一步都能可靠地把误差界减半。</li>
</ul></x-note>
<x-viz type="bisect" t="零点存在定理的证明就是二分法"><p>选择方程，逐步二分，观察区间套 $[a_n,b_n]$ 怎样收缩到零点。每二分一次误差界减半：在长度为 $1$ 的区间上二分 $20$ 次后，误差小于 $2^{-20}\approx9.5\times10^{-7}$。</p></x-viz>
<x-ex t="确定实根的个数与位置" id="ex-root3">
<p>证明方程 $x^3-x-1=0$ 恰有一个实根，并且它位于区间 $(1.3,1.4)$ 内。</p>
<x-sol l="证明"><p>记 $f(x)=x^3-x-1$，它在 $(-\infty,+\infty)$ 上连续。</p>
<p><b>存在性</b>：$f(1.3)=2.197-1.3-1=-0.103<0$，$f(1.4)=2.744-1.4-1=0.344>0$，由零点存在定理，$f$ 在 $(1.3,1.4)$ 内有零点。</p>
<p><b>唯一性</b>：先证当 $x\le1$ 时 $f(x)<0$。若 $x\le-1$ 或 $0\le x\le1$，则 $x$ 与 $x^2-1$ 不同号或有一个为 $0$，$x^3-x=x(x^2-1)\le0$，所以 $f(x)\le-1$；若 $-1<x<0$，则 $x^3-x=|x|(1-x^2)<1$，所以 $f(x)<0$。再看 $x\ge1$：对 $1\le x_1<x_2$，</p>
$$f(x_2)-f(x_1)=(x_2-x_1)\left(x_2^2+x_1x_2+x_1^2-1\right)>0,$$
<p>$f$ 在 $[1,+\infty)$ 上严格单调增加，至多有一个零点。所以方程恰有一个实根，它在 $(1.3,1.4)$ 内。<span class="qed">∎</span></p></x-sol>
<x-remark>继续二分可以把根定得更准：它约为 $1.324718$。在上面的演示中选“$x^3-x-1$”即可看到逼近的过程。注意存在性与唯一性要分别证明：零点存在定理只管存在。</x-remark>
</x-ex>
<x-ex t="奇数次多项式必有实根" id="ex-odd">
<p>证明：奇数次实系数多项式 $P(x)=a_0x^{2m+1}+a_1x^{2m}+\cdots+a_{2m+1}$（$a_0\ne0$）至少有一个实根。</p>
<x-sol l="证明"><p>不妨设 $a_0>0$。当 $x\ne0$ 时</p>
$$\frac{P(x)}{x^{2m+1}}=a_0+\frac{a_1}x+\cdots+\frac{a_{2m+1}}{x^{2m+1}}\to a_0\quad(x\to\infty).$$
<p>由局部保号性（对 $x\to\infty$ 同样成立），存在 $X>0$，当 $|x|\ge X$ 时 $\frac{P(x)}{x^{2m+1}}>\frac{a_0}2>0$，即 $P(x)$ 与 $x^{2m+1}$ 同号。于是 $P(-X)<0<P(X)$，由零点存在定理，$P$ 在 $(-X,X)$ 内有零点。<span class="qed">∎</span></p></x-sol>
<x-remark>偶数次多项式不一定有实根，例如 $x^2+1$。代数基本定理断言 $n$ 次多项式在复数范围内恰有 $n$ 个根（计重数），它的证明同样要用到实数的连续性。</x-remark>
</x-ex>
<x-ex t="不动点" id="ex-fix">
<p>设 $f\in C[a,b]$，且 $a\le f(x)\le b$ 对一切 $x\in[a,b]$ 成立（即 $f$ 把 $[a,b]$ 映到自身）。证明存在 $\xi\in[a,b]$，使 $f(\xi)=\xi$。</p>
<x-analysis><p>$f(\xi)=\xi$ 说明曲线 $y=f(x)$ 与对角线 $y=x$ 相交。把问题化为函数 $g(x)=f(x)-x$ 的零点问题。</p></x-analysis>
<x-sol l="证明"><p>令 $g(x)=f(x)-x$，则 $g\in C[a,b]$，$g(a)=f(a)-a\ge0$，$g(b)=f(b)-b\le0$。若 $g(a)=0$ 或 $g(b)=0$，取 $\xi=a$ 或 $\xi=b$；否则 $g(a)>0>g(b)$，由零点存在定理，存在 $\xi\in(a,b)$ 使 $g(\xi)=0$，即 $f(\xi)=\xi$。<span class="qed">∎</span></p></x-sol>
<x-remark>例如 $\cos x$ 把 $[0,1]$ 映到 $[\cos1,1]\subset[0,1]$，所以方程 $\cos x=x$ 在 $[0,1]$ 上有根；又 $\cos x-x$ 严格单调减少，根是唯一的，约为 $0.739085$。这个结论在高维空间的推广是 Brouwer 不动点定理：把闭球连续地映到自身的映射一定有不动点。</x-remark>
</x-ex>

<h2 id="ivt">中间值定理</h2>
<x-thm t="中间值定理" id="thm-ivt">
<p>若 $f\in C[a,b]$，$m$ 与 $M$ 分别是 $f$ 在 $[a,b]$ 上的最小值与最大值，则对任意 $c\in[m,M]$，存在 $\xi\in[a,b]$，使 $f(\xi)=c$。换言之，$f$ 的值域是闭区间：</p>
$$f([a,b])=[m,M].$$
<x-proof><p>由最值定理，存在 $\eta,\zeta\in[a,b]$，使 $f(\eta)=m$，$f(\zeta)=M$。若 $c=m$ 或 $c=M$，结论已成立。设 $m<c<M$，这时 $\eta\ne\zeta$。令 $g(x)=f(x)-c$，它在以 $\eta,\zeta$ 为端点的闭区间上连续，且 $g(\eta)=m-c<0$，$g(\zeta)=M-c>0$。由零点存在定理，在 $\eta$ 与 $\zeta$ 之间存在 $\xi$，使 $g(\xi)=0$，即 $f(\xi)=c$。这说明 $[m,M]\subset f([a,b])$；反过来的包含关系 $f([a,b])\subset[m,M]$ 就是最值的定义。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>特别地，介于 $f(a)$ 与 $f(b)$ 之间的每个数都能被 $f$ 取到（因为 $m\le f(a)\le M$，$m\le f(b)\le M$）；零点存在定理是 $c=0$ 时的特殊情形。中间值定理有一个重要的推论：</p>
<x-cor t="连续函数把区间映成区间" id="cor-interval">
<p>若 $f(x)$ 在区间 $I$ 上连续（$I$ 可以是开区间、闭区间、半开区间或无限区间），则 $f(I)$ 是一个区间（可能退化为一点）。</p>
<x-proof><p>一个实数集 $J$ 是区间，当且仅当 $J$ 中任意两数之间的数都属于 $J$（设 $\alpha=\inf J$，$\beta=\sup J$，可以是 $\pm\infty$；对 $\alpha<y<\beta$，$J$ 中既有比 $y$ 小的数，也有比 $y$ 大的数，于是 $y\in J$，从而 $(\alpha,\beta)\subset J\subset[\alpha,\beta]$）。设 $y_1<y_2$ 都属于 $f(I)$，$y_1=f(x_1)$，$y_2=f(x_2)$，$x_1,x_2\in I$，又设 $y_1<c<y_2$。$f$ 在以 $x_1,x_2$ 为端点的闭区间上连续（这个闭区间包含于 $I$），由中间值定理，存在介于 $x_1$ 与 $x_2$ 之间的 $\xi\in I$，使 $f(\xi)=c$，即 $c\in f(I)$。<span class="qed">∎</span></p></x-proof>
</x-cor>
<p>$f(I)$ 与 $I$ 的类型可以不同：$\sin x$ 把开区间 $(0,2\pi)$ 映成闭区间 $[-1,1]$，$\frac1x$ 把有限区间 $(0,1]$ 映成无限区间 $[1,+\infty)$。只有闭区间（有限）的像一定还是闭区间。</p>
<x-cor t="区间上连续严格单调函数的反函数" id="cor-invc">
<p>若 $f(x)$ 在区间 $I$ 上连续且严格单调增加（减少），则 $J=f(I)$ 是区间，反函数 $f^{-1}$ 在区间 $J$ 上连续且严格单调增加（减少）。特别地，若 $f\in C[a,b]$ 严格单调增加，则 $f^{-1}\in C[f(a),f(b)]$。</p>
<x-proof><p>由 <x-ref to="cor-interval"></x-ref>，$J$ 是区间；再由反函数连续性定理（<x-ref to="3-2/thm-invc"></x-ref>），$f^{-1}$ 在 $J$ 上严格单调且连续。当 $I=[a,b]$ 且 $f$ 严格单调增加时，$f(a)\le f(x)\le f(b)$，所以 $J=[f(a),f(b)]$。<span class="qed">∎</span></p></x-proof>
</x-cor>
<p>这就补全了 §3.2 关于反函数连续性的讨论。例如 $\sin x$ 在 $\left[-\frac\pi2,\frac\pi2\right]$ 上连续且严格单调增加，所以 $\arcsin x$ 是 $[-1,1]$ 上的连续函数。又如 $x^n$ 在 $[0,+\infty)$ 上连续且严格单调增加，由 <x-ref to="cor-interval"></x-ref>，它的值域是包含 $0$ 且没有上界的区间，即 $[0,+\infty)$——这给出了“每个非负实数都有 $n$ 次算术根”的又一个证明，并且 $\sqrt[n]x$ 在 $[0,+\infty)$ 上连续。</p>
<x-note><ul>
<li>中间值定理的逆命题不成立：具有“中间值性质”的函数未必连续。例如 $f(x)=\sin\frac1x\ (x\ne0)$，$f(0)=0$：在任何包含 $0$ 的区间上，它都取遍 $-1$ 与 $1$ 之间的一切值，所以在任何区间上都具有中间值性质，但 $x=0$ 是它的第二类不连续点。第五章将看到，导函数总具有中间值性质（Darboux 定理），却未必连续。</li>
<li>对单调函数而言，中间值性质与连续性是等价的：区间 $I$ 上的单调函数 $f$ 连续，当且仅当 $f(I)$ 是区间。必要性就是 <x-ref to="cor-interval"></x-ref>；充分性：若 $f$ 在某点 $x_0$ 处不连续，它是跳跃点（<x-ref to="3-2/thm-monodisc"></x-ref>），$f(x_0-)$ 与 $f(x_0+)$ 之间除 $f(x_0)$ 外的值都取不到，$f(I)$ 就出现了“空隙”。</li>
</ul></x-note>
<x-viz type="ivt" t="最值定理与中间值定理"><p>拖动水平线 $y=c$（或用滑块），观察它与曲线的交点。前两个例子是闭区间上的连续函数：最大值、最小值都能取到，$m\le c\le M$ 时至少有一个交点。后面几个例子各自破坏了一个条件（有跳跃、在某点无定义），结论随之失效；最后一个例子不连续，却仍有中间值性质。</p></x-viz>
<x-ex t="登山问题" id="ex-climb">
<p>某人早上 8 点从山脚出发，沿一条山路上山，傍晚 6 点到达山顶，在山顶住了一夜；第二天早上 8 点从山顶沿原路下山，傍晚 6 点回到山脚。两天中他走走停停，速度并不均匀。证明：山路上存在一个地点，他在两天的同一时刻经过这个地点。</p>
<x-analysis><p>想象第二天另有一个人代替他下山，两人同时出发、一上一下，必然在途中相遇，相遇的地点就是所求。用函数的语言，就是两个“位置函数”之差有零点。</p></x-analysis>
<x-sol l="证明"><p>设山路全长为 $L$，用 $s_1(t)$、$s_2(t)$ 分别表示第一天、第二天 $t$ 时刻他与山脚的路程（沿山路计算），$t\in[8,18]$。人的位置随时间连续变化，所以 $s_1,s_2\in C[8,18]$，且 $s_1(8)=0$，$s_1(18)=L$，$s_2(8)=L$，$s_2(18)=0$。令 $g(t)=s_1(t)-s_2(t)$，则 $g\in C[8,18]$，$g(8)=-L<0$，$g(18)=L>0$。由零点存在定理，存在 $t_0\in(8,18)$ 使 $g(t_0)=0$，即 $s_1(t_0)=s_2(t_0)$：两天的 $t_0$ 时刻他在同一地点。<span class="qed">∎</span></p></x-sol>
<x-remark>如果第二天中午就回到了山脚，结论仍然成立：到达后令 $s_2(t)=0$，$g$ 在两端仍然异号。</x-remark>
</x-ex>
<x-ex t="水平弦" id="ex-chord">
<p>设 $f\in C[0,1]$，且 $f(0)=f(1)$。证明存在 $\xi\in\left[0,\frac12\right]$，使 $f(\xi)=f\left(\xi+\frac12\right)$。</p>
<x-analysis><p>结论的几何意义是：曲线 $y=f(x)$ 上有一条长度为 $\frac12$ 的水平弦。考察“相距 $\frac12$ 的两点的函数值之差”。</p></x-analysis>
<x-sol l="证明"><p>令 $g(x)=f\left(x+\frac12\right)-f(x)$，$x\in\left[0,\frac12\right]$，则 $g$ 在 $\left[0,\frac12\right]$ 上连续，且</p>
$$g(0)+g\left(\tfrac12\right)=\left[f\left(\tfrac12\right)-f(0)\right]+\left[f(1)-f\left(\tfrac12\right)\right]=f(1)-f(0)=0.$$
<p>若 $g(0)=0$，取 $\xi=0$；否则 $g(0)$ 与 $g\left(\frac12\right)$ 异号，由零点存在定理，存在 $\xi\in\left(0,\frac12\right)$ 使 $g(\xi)=0$。<span class="qed">∎</span></p></x-sol>
<x-remark>同样的方法可以证明：对每个正整数 $n$，曲线上都有长度为 $\frac1n$ 的水平弦（习题）。对其他长度，结论不一定成立，这是 Lévy 的“万有弦定理”。习题中有一个跑步的例子。</x-remark>
</x-ex>
<x-tip t="用零点存在定理证明方程有根">
<ol>
<li>把方程写成 $g(x)=0$ 的形式，$g$ 往往是两个量之差，例如 $f(x)-x$、$f(x+h)-f(x)$、$s_1(t)-s_2(t)$；</li>
<li>验证 $g$ 在某个闭区间上连续；</li>
<li>找两个点使 $g$ 异号。找不到具体的点时，可以证明某几个值之和为 $0$（它们不能全正或全负），或者利用极限判断 $x\to\pm\infty$ 时 $g$ 的符号；</li>
<li>如果还要证明根唯一，再说明 $g$ 严格单调。</li>
</ol>
</x-tip>
<x-app t="椅子能在不平的地面上放稳吗">
<p>把椅子放在不平的地面上，通常只有三条腿着地。经验告诉我们：把椅子转一转，往往就能四脚着地放稳。这个经验可以用零点存在定理解释（见姜启源等《数学模型》）。</p>
<p><b>假设</b>：椅子的四条腿一样长，脚与地面的接触看作点，四脚连线是正方形 $ABCD$；地面高度连续变化（没有台阶），并且起伏不大，椅子在任何位置都至少有三条腿同时着地。</p>
<p><b>模型</b>：让椅子绕正方形的中心旋转，用转角 $\theta$ 表示位置。记 $f(\theta)$ 为 $A,C$ 两脚与地面距离之和，$g(\theta)$ 为 $B,D$ 两脚与地面距离之和，它们都是 $\theta$ 的连续函数，且 $f,g\ge0$。由于任何时候至少三脚着地，$f(\theta)$、$g(\theta)$ 中至少有一个为 $0$，即 $f(\theta)g(\theta)=0$。不妨设开始时 $g(0)=0$，$f(0)>0$。把椅子转 $\frac\pi2$ 后，$A,B,C,D$ 分别转到原来 $B,C,D,A$ 的位置，两组腿互换了位置，于是 $f\left(\frac\pi2\right)=g(0)=0$，$g\left(\frac\pi2\right)=f(0)>0$。</p>
<p><b>结论</b>：令 $h(\theta)=f(\theta)-g(\theta)$，则 $h(0)>0$，$h\left(\frac\pi2\right)<0$。由零点存在定理，存在 $\theta_0\in\left(0,\frac\pi2\right)$ 使 $h(\theta_0)=0$，即 $f(\theta_0)=g(\theta_0)$；再由 $f(\theta_0)g(\theta_0)=0$ 得 $f(\theta_0)=g(\theta_0)=0$：转过角度 $\theta_0$ 时四条腿同时着地。四脚连线是长方形时，把 $A,B$ 与 $C,D$ 分成两组、旋转 $\pi$，可以得到同样的结论。</p>
</x-app>
`);
MA.add("3-4", String.raw`
<h2 id="unif">一致连续</h2>
<p>回顾 <x-ref to="3-1/ex-sqrt"></x-ref>：证明 $\lim\limits_{x\to x_0}\sqrt x=\sqrt{x_0}$ 时取的 $\delta=\min\{x_0,\sqrt{x_0}\,\eps\}$ 不仅与 $\eps$ 有关，还与 $x_0$ 有关。一般地，$f$ 在区间 $I$ 上连续是指</p>
$$\forall x_0\in I,\ \forall\eps>0,\ \exists\delta>0,\ \forall x\in I:\ |x-x_0|<\delta\Rightarrow|f(x)-f(x_0)|<\eps,$$
<p>这里的 $\delta$ 允许随 $x_0$ 改变。自然要问：对给定的 $\eps$，能否找到一个对区间中所有点都适用的 $\delta$？</p>
<x-def t="一致连续" id="def-unif">
<p>设函数 $f(x)$ 在区间 $I$ 上有定义。若对任意给定的 $\eps>0$，存在 $\delta>0$，使得对一切满足 $|x'-x''|<\delta$ 的 $x',x''\in I$，都成立</p>
$$|f(x')-f(x'')|<\eps,$$
<p>则称 $f(x)$ 在 $I$ 上<em>一致连续</em>。</p>
</x-def>
<x-note><ul>
<li>与连续的定义相比，区别只在量词的顺序：连续是“$\forall x_0\ \forall\eps\ \exists\delta$”，$\delta$ 依赖于 $\eps$ 和 $x_0$；一致连续是“$\forall\eps\ \exists\delta\ \forall x',x''$”，$\delta$ 只依赖于 $\eps$。在定义中取 $x''=x_0$ 即知：一致连续的函数一定连续。</li>
<li>一致连续是函数在整个区间上的性质，说“$f$ 在某一点一致连续”没有意义。同一个函数在一个区间上一致连续，在另一个区间上可能不一致连续：下面将看到 $x^2$ 在 $[0,1]$ 上一致连续，在 $[0,+\infty)$ 上却不一致连续。</li>
<li>对固定的 $\eps$ 和 $x_0\in I$，记 $\delta_\eps(x_0)$ 为连续定义中能取的最大的 $\delta$（所有可用的 $\delta$ 的上确界，可能是 $+\infty$）。由定义，$f$ 在 $I$ 上一致连续，当且仅当对每个 $\eps>0$ 都有 $\inf\limits_{x_0\in I}\delta_\eps(x_0)>0$：这时取 $\delta$ 为任一不超过这个下确界的正数即可。</li>
</ul></x-note>
<x-intuit t="一致连续的几何意义">
<p>一致连续是说：给定任意高度 $\eps$，都能找到宽度 $\delta$，使曲线 $y=f(x)$ 在任何一段宽度小于 $\delta$ 的范围内上下起伏都不超过 $\eps$。好比用一个宽 $\delta$、高 $\eps$ 的框沿曲线滑动，框的大小始终不用改变，曲线总能被框住。$\frac1x$ 在 $(0,1)$ 上做不到这一点：无论框多窄，移到足够靠近 $0$ 的地方，曲线在框的宽度内就会升高很多。</p>
</x-intuit>
<x-viz type="unif" t="一致连续：δ 能否与 x₀ 无关"><p>上图在选定的 $x_0$ 处画出 $\eps$-$\delta$ 窗口，下图画出 $\delta_\eps(x_0)$ 随 $x_0$ 变化的曲线及其下确界。对闭区间上的连续函数，这条曲线的最低点仍是正数；而 $\frac1x$、$\ln x$、$\sin\frac1x$ 在 $(0,1]$ 上，$x_0\to0^+$ 时 $\delta_\eps(x_0)\to0$，不存在公共的 $\delta$。</p></x-viz>
<p>一致连续的否定是：存在 $\eps_0>0$，对任意 $\delta>0$，都存在 $x',x''\in I$，虽然 $|x'-x''|<\delta$，却有 $|f(x')-f(x'')|\ge\eps_0$。取 $\delta=\frac1n$，就得到常用的数列形式：</p>
<x-prop t="不一致连续的数列刻画" id="prop-nunif">
<p>$f(x)$ 在区间 $I$ 上不一致连续的充分必要条件是：存在 $\eps_0>0$ 和 $I$ 中的两个数列 $\{x_n'\}$、$\{x_n''\}$，满足</p>
$$\lim_{n\to\infty}(x_n'-x_n'')=0,\qquad\text{但}\qquad|f(x_n')-f(x_n'')|\ge\eps_0\quad(n=1,2,\cdots).$$
<x-proof><p><b>必要性</b>：由上面的否定形式，对 $\delta=\frac1n$，存在 $x_n',x_n''\in I$，$|x_n'-x_n''|<\frac1n$，而 $|f(x_n')-f(x_n'')|\ge\eps_0$。</p>
<p><b>充分性</b>：若 $f$ 一致连续，对 $\eps_0$ 取相应的 $\delta$。由 $x_n'-x_n''\to0$，$n$ 充分大时 $|x_n'-x_n''|<\delta$，于是 $|f(x_n')-f(x_n'')|<\eps_0$，矛盾。<span class="qed">∎</span></p></x-proof>
</x-prop>
<x-ex t="用定义证明一致连续" id="ex-unif">
<p>证明：(1) $\sin x$ 在 $(-\infty,+\infty)$ 上一致连续；(2) $\sqrt x$ 在 $[0,+\infty)$ 上一致连续；(3) $x^2$ 在任意有限区间 $[-A,A]$ 上一致连续。</p>
<x-sol l="证明"><p>(1) 由 $|\sin t|\le|t|$（<x-ref to="3-1/lem-sin"></x-ref>）和 $|\cos t|\le1$，</p>
$$|\sin x'-\sin x''|=2\left|\cos\frac{x'+x''}2\right|\left|\sin\frac{x'-x''}2\right|\le|x'-x''|.$$
<p>任给 $\eps>0$，取 $\delta=\eps$，当 $|x'-x''|<\delta$ 时 $|\sin x'-\sin x''|<\eps$。</p>
<p>(2) 设 $x'>x''\ge0$，则 $\sqrt{x'}-\sqrt{x''}\le\sqrt{x'-x''}$：两边平方后等价于 $x'-2\sqrt{x'x''}+x''\le x'-x''$，即 $x''\le\sqrt{x'x''}$，这显然成立。所以对一切 $x',x''\ge0$，</p>
$$\left|\sqrt{x'}-\sqrt{x''}\right|\le\sqrt{|x'-x''|}.$$
<p>任给 $\eps>0$，取 $\delta=\eps^2$，当 $|x'-x''|<\delta$ 时 $\left|\sqrt{x'}-\sqrt{x''}\right|<\eps$。</p>
<p>(3) 对 $x',x''\in[-A,A]$，$\left|(x')^2-(x'')^2\right|=|x'+x''|\,|x'-x''|\le2A|x'-x''|$，取 $\delta=\frac\eps{2A}$ 即可。<span class="qed">∎</span></p></x-sol>
<x-remark>(1)(3) 中的函数满足 <em>Lipschitz 条件</em>：存在常数 $L>0$，使 $|f(x')-f(x'')|\le L|x'-x''|$ 对区间中一切 $x',x''$ 成立。满足 Lipschitz 条件的函数一定一致连续（取 $\delta=\frac\eps L$）。$\sqrt x$ 在 $[0,+\infty)$ 上不满足 Lipschitz 条件（$\frac{\sqrt x-\sqrt0}{x-0}=\frac1{\sqrt x}$ 无界），却仍然一致连续，可见 Lipschitz 条件只是充分条件。与 <x-ref to="3-1/ex-sqrt"></x-ref> 中依赖于 $x_0$ 的 $\delta$ 相比，这里的 $\delta=\eps^2$ 对所有点都适用。</x-remark>
</x-ex>
<x-ex t="证明不一致连续" id="ex-nunif">
<p>证明：(1) $\frac1x$ 在 $(0,1)$ 上不一致连续，但对任意 $c\in(0,1)$，它在 $[c,1)$ 上一致连续；(2) $x^2$ 在 $[0,+\infty)$ 上不一致连续；(3) $\sin\frac1x$ 在 $(0,1)$ 上不一致连续。</p>
<x-analysis><p>用 <x-ref to="prop-nunif"></x-ref>：找两列越来越近的点，使函数值之差始终不小于某个正数。函数“变化很快”的地方，就是寻找这两列点的地方：$\frac1x$ 与 $\sin\frac1x$ 在 $0$ 附近，$x^2$ 在 $+\infty$ 附近。</p></x-analysis>
<x-sol l="证明"><p>(1) 取 $x_n'=\frac1n$，$x_n''=\frac1{n+1}$（$n\ge2$），则 $x_n'-x_n''=\frac1{n(n+1)}\to0$，但 $\left|\frac1{x_n'}-\frac1{x_n''}\right|=1$。取 $\eps_0=1$ 即知 $\frac1x$ 在 $(0,1)$ 上不一致连续。在 $[c,1)$ 上，</p>
$$\left|\frac1{x'}-\frac1{x''}\right|=\frac{|x'-x''|}{x'x''}\le\frac{|x'-x''|}{c^2},$$
<p>满足 Lipschitz 条件，所以一致连续。</p>
<p>(2) 取 $x_n'=n+\frac1n$，$x_n''=n$，则 $x_n'-x_n''=\frac1n\to0$，但 $(x_n')^2-(x_n'')^2=2+\frac1{n^2}>2$。</p>
<p>(3) 取 $x_n'=\frac1{2n\pi+\frac\pi2}$，$x_n''=\frac1{2n\pi}$，则 $x_n'-x_n''\to0$，但 $\sin\frac1{x_n'}-\sin\frac1{x_n''}=1-0=1$。<span class="qed">∎</span></p></x-sol>
<x-remark>(3) 说明有界的连续函数可以不一致连续；而 $\sqrt x$ 在 $[0,+\infty)$ 上无界，却一致连续。有界性与一致连续性之间没有必然的联系。(1) 中“在 $(0,1)$ 上不一致连续，在每个 $[c,1)$ 上却一致连续”的现象很典型：不一致连续往往来自区间端点附近（或无穷远处）的“坏”行为。</x-remark>
</x-ex>

<h2 id="cantor">Cantor 定理</h2>
<p>上面的例子中，导致不一致连续的“坏”行为总发生在开区间的端点附近或无穷远处。对闭区间上的连续函数，这种情况不会发生：</p>
<x-thm t="Cantor 定理" id="thm-cantor">
<p>若 $f\in C[a,b]$，则 $f(x)$ 在 $[a,b]$ 上一致连续。</p>
<x-proof><p>用反证法。若 $f$ 在 $[a,b]$ 上不一致连续，由 <x-ref to="prop-nunif"></x-ref>，存在 $\eps_0>0$ 及 $[a,b]$ 中的数列 $\{x_n'\}$、$\{x_n''\}$，使 $x_n'-x_n''\to0$，而 $|f(x_n')-f(x_n'')|\ge\eps_0$。由 Bolzano–Weierstrass 定理，$\{x_n'\}$ 有收敛子列 $x_{n_k}'\to\xi$，且 $\xi\in[a,b]$。于是</p>
$$x_{n_k}''=x_{n_k}'-\left(x_{n_k}'-x_{n_k}''\right)\to\xi-0=\xi.$$
<p>由 $f$ 在 $\xi$ 处连续（端点处为单侧连续），$f(x_{n_k}')\to f(\xi)$，$f(x_{n_k}'')\to f(\xi)$，从而 $f(x_{n_k}')-f(x_{n_k}'')\to0$，这与 $|f(x_{n_k}')-f(x_{n_k}'')|\ge\eps_0$ 矛盾。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-warn><p>Cantor 定理要求区间既有界又闭：$\frac1x$ 在 $(0,1]$ 上、$x^2$ 在 $[0,+\infty)$ 上都连续，却不一致连续。但这两个条件不是必要的：$\sqrt x$ 在 $[0,+\infty)$ 上、$\sin x$ 在 $(-\infty,+\infty)$ 上都一致连续。</p></x-warn>
<p>对有限开区间，可以给出一致连续的充分必要条件：</p>
<x-thm t="有限开区间上一致连续的判别" id="thm-unifab">
<p>设 $f(x)$ 在有限开区间 $(a,b)$ 上连续，则 $f(x)$ 在 $(a,b)$ 上一致连续的充分必要条件是：$f(a+)$ 与 $f(b-)$ 都存在（有限）。</p>
<x-proof><p><b>充分性</b>：令 $F(x)=f(x)\ (a<x<b)$，$F(a)=f(a+)$，$F(b)=f(b-)$，则 $F\in C[a,b]$。由 Cantor 定理，$F$ 在 $[a,b]$ 上一致连续，它在 $(a,b)$ 上当然也一致连续，即 $f$ 在 $(a,b)$ 上一致连续。</p>
<p><b>必要性</b>：任给 $\eps>0$，由一致连续，存在 $\delta>0$（不妨设 $\delta<b-a$），当 $x',x''\in(a,b)$ 且 $|x'-x''|<\delta$ 时 $|f(x')-f(x'')|<\eps$。特别地，对一切 $x',x''\in(a,a+\delta)$，有 $|x'-x''|<\delta$，从而 $|f(x')-f(x'')|<\eps$。这正是 $x\to a^+$ 时的 Cauchy 条件，由函数极限的 Cauchy 收敛原理（<x-ref to="3-1/thm-fcauchy"></x-ref>，对单侧极限同样成立），$f(a+)$ 存在。同理 $f(b-)$ 存在。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-ex t="判断有限开区间上的一致连续性" id="ex-unifab">
<p>判断下列函数在 $(0,1)$ 上是否一致连续：(1) $x\sin\frac1x$；(2) $\frac{\sin x}x$；(3) $\ln x$；(4) $e^{-\frac1x}$。</p>
<x-sol><p>四个函数在 $(0,1)$ 上都连续，由 <x-ref to="thm-unifab"></x-ref>，只需看端点处的单侧极限。四个函数在 $x=1$ 处都连续，左极限就是函数值。在左端点 $0$ 处：</p>
<p>(1) $\lim\limits_{x\to0^+}x\sin\frac1x=0$，一致连续；(2) $\lim\limits_{x\to0^+}\frac{\sin x}x=1$，一致连续；(3) $\lim\limits_{x\to0^+}\ln x=-\infty$，不一致连续；(4) $\lim\limits_{x\to0^+}e^{-\frac1x}=0$，一致连续。</p></x-sol>
<x-remark>把 (1) 与 $\sin\frac1x$ 对比：两者都在 $0$ 附近无限振荡，但 $x\sin\frac1x$ 的振幅趋于 $0$，振荡不妨碍一致连续。上面的演示中可以比较两者的 $\delta_\eps(x_0)$ 曲线。注意 <x-ref to="thm-unifab"></x-ref> 只适用于有限区间：$x^2$ 在 $(0,+\infty)$ 上连续，$x\to0^+$ 时的极限存在，它却不一致连续。</x-remark>
</x-ex>
<x-hist t="从“显然”到证明">
<p>中间值定理在 18 世纪被看作几何上显然的事实。1817 年，Bolzano 发表论文《纯分析的证明：在两个给出相反符号结果的值之间，方程至少有一个实根》，明确指出不能用几何直观代替证明，并给出了不依赖几何的论证。他的论证用到了“有上界的数集有上确界”这一性质，但当时还没有实数理论，这个性质本身无法真正证明；直到 1872 年前后 Dedekind、Cantor 等人建立了实数理论，这些定理才有了牢固的基础。Cauchy 在 1821 年的《分析教程》中用逐次细分区间的方法证明了中间值定理，思想与二分法相同。</p>
<p>Bolzano 在 1830 年前后的手稿《函数论》中已经证明了闭区间上连续函数的有界性定理与最值定理，但手稿直到 1930 年才出版。Weierstrass 在 1860 年代的柏林讲课中独立地证明了这些定理，并提炼出 Bolzano–Weierstrass 定理，它们才广为人知。</p>
<p>一致连续的概念与 Heine 的名字联系在一起。据数学史研究，Dirichlet 在 1862 年的讲课中最早证明了闭区间上的连续函数一致连续（讲义 1904 年才出版），Heine 在 1872 年发表了一致连续的定义和这个定理的证明。这些证明中“从无穷多个邻域中选出有限多个”的想法，后来发展为 Heine–Borel 有限覆盖定理。中文教材通常称这个定理为 Cantor 定理，英文文献多称 Heine–Cantor 定理。第七章将看到，一致连续是证明“闭区间上的连续函数可积”的关键。</p>
</x-hist>
`);
MA.add("3-4", String.raw`
<h2 id="summary">本节要点</h2>
<x-sum><ul>
<li><b>有界性定理</b>：$f\in C[a,b]\Rightarrow f$ 在 $[a,b]$ 上有界。<b>最值定理</b>：$f\in C[a,b]\Rightarrow f$ 在 $[a,b]$ 上取到最大值 $M$ 与最小值 $m$。两者的证明都用 Bolzano–Weierstrass 定理：取收敛子列，极限点仍在 $[a,b]$ 中，再用连续性。</li>
<li>条件缺一不可：$\frac1x$ 在 $(0,1]$ 上无界；$x$ 在 $(0,1)$ 上、$x-[x]$ 在 $[0,1]$ 上取不到上确界；$\arctan x$ 在 $\R$ 上没有最值。条件不满足时，结论可能成立，也可能不成立。</li>
<li><b>零点存在定理</b>：$f\in C[a,b]$，$f(a)f(b)<0\Rightarrow$ 存在 $\xi\in(a,b)$ 使 $f(\xi)=0$。证明就是二分法（闭区间套定理），二分 $n$ 次后误差不超过 $\frac{b-a}{2^n}$。存在性与唯一性要分别证明。</li>
<li><b>中间值定理</b>：$f\in C[a,b]\Rightarrow f([a,b])=[m,M]$；区间上的连续函数把区间映成区间。因此区间上连续且严格单调的函数，其反函数在值域区间上连续且严格单调。中间值性质推不出连续（$\sin\frac1x$ 补充 $f(0)=0$）。</li>
<li>证明方程有根的套路：构造辅助函数（$f(x)-x$、$f\left(x+\frac12\right)-f(x)$、$s_1(t)-s_2(t)$ 等），找两点使它异号，或证明几个值之和为 $0$，再用零点存在定理。</li>
<li><b>一致连续</b>：对任意 $\eps>0$，存在只依赖于 $\eps$ 的 $\delta>0$，使 $x',x''\in I$，$|x'-x''|<\delta$ 时 $|f(x')-f(x'')|<\eps$。否定的数列形式：$x_n'-x_n''\to0$，而 $|f(x_n')-f(x_n'')|\ge\eps_0$。满足 Lipschitz 条件的函数一致连续。</li>
<li><b>Cantor 定理</b>：$f\in C[a,b]\Rightarrow f$ 在 $[a,b]$ 上一致连续。有限开区间 $(a,b)$ 上的连续函数一致连续 $\iff f(a+)$、$f(b-)$ 都存在（有限）。典型的不一致连续：$\frac1x$、$\ln x$、$\sin\frac1x$ 在 $(0,1)$ 上，$x^2$ 在 $[0,+\infty)$ 上。</li>
</ul></x-sum>

<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对闭区间上连续函数性质的理解">
<x-q type="choice" answer="C">
<x-stem>设 $f$ 在 $[a,b]$ 上有定义。下列条件中，能保证 $f$ 在 $[a,b]$ 上取到最大值的是</x-stem>
<x-opt>$f$ 在 $(a,b)$ 上连续且有界</x-opt>
<x-opt>$f$ 在 $[a,b]$ 上有界</x-opt>
<x-opt>$f$ 在 $[a,b]$ 上连续</x-opt>
<x-opt>$f$ 在 $[a,b]$ 上除一点外处处连续</x-opt>
<x-exp>最值定理要求在闭区间上连续。反例：A、B 都可以取 $f(x)=x\ (0<x<1)$，$f(0)=f(1)=0$，上确界 $1$ 取不到；D 取 $x-[x]$，它在 $[0,1]$ 上只在 $x=1$ 处不连续，上确界 $1$ 取不到。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $f\in C[a,b]$，且 $f(x)>0$ 对一切 $x\in[a,b]$ 成立，则存在常数 $c>0$，使 $f(x)\ge c$ 对一切 $x\in[a,b]$ 成立。</x-stem>
<x-exp>正确。取 $c$ 为 $f$ 在 $[a,b]$ 上的最小值（<x-ref to="ex-pos"></x-ref>），它是某一点处的函数值，所以是正数。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若 $f$ 在 $(a,b)$ 上连续，且 $f(x)>0$ 对一切 $x\in(a,b)$ 成立，则存在常数 $c>0$，使 $f(x)\ge c$ 对一切 $x\in(a,b)$ 成立。</x-stem>
<x-exp>错误。$f(x)=x$ 在 $(0,1)$ 上处处为正，但下确界是 $0$。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>由零点存在定理，可以直接断定方程 $x^5-3x+1=0$ 在下列哪个区间内有根？</x-stem>
<x-opt>$(-1,0)$</x-opt>
<x-opt>$(0,1)$</x-opt>
<x-opt>$(2,3)$</x-opt>
<x-opt>$(3,4)$</x-opt>
<x-exp>记 $f(x)=x^5-3x+1$，$f(0)=1>0$，$f(1)=-1<0$，所以 $(0,1)$ 内有根。其余区间两端点的函数值同号：$f(-1)=3$，$f(2)=27$，$f(3)=235$，$f(4)=1013$。（另外两个实根分别在 $(-2,-1)$ 与 $(1,2)$ 内。）</x-exp>
</x-q>
<x-q type="fill" answer="10" ph="填一个整数">
<x-stem>用二分法在 $[0,1]$ 上求方程的根，要使最后得到的区间长度不超过 $10^{-3}$，至少要二分多少次？</x-stem>
<x-exp>二分 $n$ 次后区间长度为 $2^{-n}$。$2^9=512<1000\le1024=2^{10}$，所以至少 $10$ 次。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>设 $f\in C[0,1]$，$f(0)=1$，$f(1)=-1$。下列说法一定正确的是</x-stem>
<x-opt>$f$ 在 $(0,1)$ 内恰有一个零点</x-opt>
<x-opt>$f$ 在 $(0,1)$ 内至少有一个零点</x-opt>
<x-opt>$f$ 在 $[0,1]$ 上单调减少</x-opt>
<x-opt>$f$ 在 $[0,1]$ 上的最大值是 $1$</x-opt>
<x-exp>零点存在定理只保证零点存在，不保证唯一。$\cos3\pi x$ 满足条件，在 $(0,1)$ 内有 $3$ 个零点，也不单调；$1-2x+8x(1-x)$ 满足条件，在 $x=\frac14$ 处的值为 $2$，最大值大于 $1$。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>设 $f$ 在 $[a,b]$ 上有定义。若对介于 $f(a)$ 与 $f(b)$ 之间的任意 $c$，都存在 $\xi\in[a,b]$ 使 $f(\xi)=c$，则 $f$ 在 $[a,b]$ 上连续。</x-stem>
<x-exp>错误。例如在 $[0,2]$ 上令 $f(x)=x\ (0\le x\le1)$，$f(x)=x-1\ (1<x\le2)$，则 $f(0)=0$，$f(2)=1$，$[0,1]$ 中的每个值都能取到，但 $f$ 在 $x=1$ 处不连续。中间值性质推不出连续。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>若 $f\in C[a,b]$，则值域 $f([a,b])$</x-stem>
<x-opt>一定是开区间</x-opt>
<x-opt>一定是闭区间（可能退化为一点）</x-opt>
<x-opt>可能是半开区间</x-opt>
<x-opt>不一定是区间</x-opt>
<x-exp>由最值定理与中间值定理，$f([a,b])=[m,M]$；$f$ 为常数时退化为一点。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>下列叙述中，与“$f$ 在区间 $I$ 上一致连续”等价的是</x-stem>
<x-opt>对任意 $x_0\in I$ 和 $\eps>0$，存在 $\delta>0$，当 $x\in I$，$|x-x_0|<\delta$ 时，$|f(x)-f(x_0)|<\eps$</x-opt>
<x-opt>对任意 $\eps>0$，存在 $\delta>0$，对任意 $x_0\in I$，当 $x\in I$，$|x-x_0|<\delta$ 时，$|f(x)-f(x_0)|<\eps$</x-opt>
<x-opt>存在 $\delta>0$，对任意 $\eps>0$，当 $x',x''\in I$，$|x'-x''|<\delta$ 时，$|f(x')-f(x'')|<\eps$</x-opt>
<x-opt>对任意 $\eps>0$，存在 $\delta>0$，当 $x',x''\in I$，$|f(x')-f(x'')|<\eps$ 时，$|x'-x''|<\delta$</x-opt>
<x-exp>B 中的 $\delta$ 在 $x_0$ 之前选定，与 $x_0$ 无关，就是一致连续（把 $x_0$、$x$ 换成 $x''$、$x'$）。A 是在 $I$ 上连续；C 意味着相距小于 $\delta$ 的两点函数值相等，$f$ 只能是常数；D 把条件与结论颠倒了。</x-exp>
</x-q>
<x-q type="multi" answer="ACD">
<x-stem>下列函数中，在所给区间上一致连续的有</x-stem>
<x-opt>$x^2$，$[0,100]$</x-opt>
<x-opt>$\frac1x$，$(0,1)$</x-opt>
<x-opt>$\sqrt x$，$[0,+\infty)$</x-opt>
<x-opt>$x\sin\frac1x$，$(0,1)$</x-opt>
<x-exp>A：闭区间上的连续函数（Cantor 定理）；C：见 <x-ref to="ex-unif"></x-ref>，$\delta=\eps^2$；D：$x\to0^+$ 与 $x\to1^-$ 时的极限都存在（<x-ref to="thm-unifab"></x-ref>）。B：$x\to0^+$ 时 $\frac1x\to+\infty$，不一致连续。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $f$ 在有限开区间 $(a,b)$ 上一致连续，则 $f$ 在 $(a,b)$ 上有界。</x-stem>
<x-exp>正确。由 <x-ref to="thm-unifab"></x-ref>，$f(a+)$、$f(b-)$ 存在，补充端点处的值后得到 $[a,b]$ 上的连续函数，由有界性定理它有界。对无限区间结论不成立：$f(x)=x$ 在 $(0,+\infty)$ 上一致连续，但无界。</x-exp>
</x-q>
<x-q type="fill" answer="0.739" tol="0.006" ph="小数，如 0.5">
<x-stem>利用前面的二分法演示（选择 $\cos x-x$），求方程 $\cos x=x$ 的根，精确到 $0.01$。</x-stem>
<x-exp>根约为 $0.739085$，精确到 $0.01$ 是 $0.74$。$\cos x-x$ 在 $[0,1]$ 上严格单调减少，$\cos0-0=1>0$，$\cos1-1<0$，所以根唯一。</x-exp>
</x-q>
</x-quiz>
`);
MA.add("3-4", String.raw`
<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>
<x-prob level="基础" t="定理的条件与结论">
<div>
<p>判断下列函数在所给区间上是否有界，能否取到最大值与最小值，并说明是否与有界性定理、最值定理矛盾：</p>
<p>(1) $f(x)=x^2$，$x\in(-1,1]$；(2) $f(x)=\frac1x$，$x\in[1,+\infty)$；(3) $f(x)=x-[x]$，$x\in[0,1]$；(4) $f(x)=\tan x$，$x\in\left[0,\frac\pi2\right)$。</p>
</div>
<x-check answer="2" ph="填一个整数">能取到最大值的个数</x-check>
<x-check answer="3" ph="填一个整数">能取到最小值的个数</x-check>
<x-hint>定理的条件是充分条件：条件不满足时，结论可能成立，也可能不成立。</x-hint>
<x-ans>
<p>(1) 有界；最大值 $f(1)=1$，最小值 $f(0)=0$。区间不闭，结论仍然成立。</p>
<p>(2) 有界（$0<f(x)\le1$）；最大值 $f(1)=1$；下确界 $0$ 取不到。区间无界。</p>
<p>(3) 有界；最小值 $f(0)=f(1)=0$；上确界 $1$ 取不到。函数在 $x=1$ 处不连续。</p>
<p>(4) 无上界，没有最大值；最小值 $f(0)=0$。区间不闭。</p>
<p>都不与定理矛盾：定理的条件不满足时，定理不作任何断言。能取到最大值的是 (1)(2)，能取到最小值的是 (1)(3)(4)。</p>
</x-ans>
</x-prob>
<x-prob level="基础" t="证明方程有根">
<div>
<p>(1) 证明方程 $x^5-3x=1$ 在 $(1,2)$ 内至少有一个根；</p>
<p>(2) 设 $a>0$，$b>0$，证明方程 $x=a\sin x+b$ 至少有一个正根，并且它不超过 $a+b$；</p>
<p>(3) 证明方程 $e^x=3x$ 至少有两个实根，并求出较小的根（精确到 $0.01$）。</p>
</div>
<x-check answer="0.619" tol="0.006" ph="小数，如 0.5">(3) 较小的根</x-check>
<x-hint>(2) 考察 $f(x)=x-a\sin x-b$ 在 $[0,a+b]$ 两端的值；(3) 计算 $e^x-3x$ 在 $0,1,2$ 处的值，再在 $[0.6,0.7]$ 上二分。</x-hint>
<x-ans>
<p>(1) $f(x)=x^5-3x-1$ 连续，$f(1)=-3<0$，$f(2)=25>0$，由零点存在定理即得。</p>
<p>(2) $f(x)=x-a\sin x-b$ 连续，$f(0)=-b<0$，$f(a+b)=a\bigl(1-\sin(a+b)\bigr)\ge0$。若 $f(a+b)=0$，则 $a+b$ 就是根；否则 $f(a+b)>0$，由零点存在定理，在 $(0,a+b)$ 内有根。总之存在根 $\xi\in(0,a+b]$。</p>
<p>(3) $g(x)=e^x-3x$ 连续，$g(0)=1>0$，$g(1)=e-3<0$，$g(2)=e^2-6>0$，所以 $(0,1)$ 与 $(1,2)$ 内各有一根。$g(0.6)\approx0.0221>0$，$g(0.7)\approx-0.0862<0$；继续二分：$g(0.65)\approx-0.0345$，$g(0.625)\approx-0.0068$，$g(0.6125)\approx0.0075$，$g(0.61875)\approx0.0004$，所以较小的根在 $(0.61875,0.625)$ 内，精确到 $0.01$ 为 $0.62$（更精确地，约为 $0.619061$）。</p>
</x-ans>
</x-prob>
<x-prob level="基础" t="用定义证明一致连续">
<div>
<p>用一致连续的定义证明：(1) $\frac1x$ 在 $[1,+\infty)$ 上一致连续；(2) $\sqrt{1+x^2}$ 在 $(-\infty,+\infty)$ 上一致连续；(3) $\sqrt[3]x$ 在 $[1,+\infty)$ 上一致连续。</p>
<p>(4) 对 $[0,5]$ 上的 $x^2$，取 $\eps=0.01$，按 <x-ref to="ex-unif"></x-ref> 的方法给出的 $\delta$ 是多少？</p>
</div>
<x-check answer="0.001" ph="小数">(4) 的 $\delta$</x-check>
<x-hint>都证明 Lipschitz 条件。(2) 分子有理化；(3) 利用 $a^3-b^3=(a-b)(a^2+ab+b^2)$。</x-hint>
<x-ans>
<p>(1) 当 $x',x''\ge1$ 时，$\left|\frac1{x'}-\frac1{x''}\right|=\frac{|x'-x''|}{x'x''}\le|x'-x''|$，取 $\delta=\eps$。</p>
<p>(2) $\left|\sqrt{1+(x')^2}-\sqrt{1+(x'')^2}\right|=\frac{|x'+x''|\,|x'-x''|}{\sqrt{1+(x')^2}+\sqrt{1+(x'')^2}}\le|x'-x''|$，因为 $|x'+x''|\le|x'|+|x''|<\sqrt{1+(x')^2}+\sqrt{1+(x'')^2}$。取 $\delta=\eps$。</p>
<p>(3) 记 $a=\sqrt[3]{x'}$，$b=\sqrt[3]{x''}$，则 $a,b\ge1$，$|x'-x''|=|a-b|(a^2+ab+b^2)\ge3|a-b|$，即 $\left|\sqrt[3]{x'}-\sqrt[3]{x''}\right|\le\frac13|x'-x''|$。取 $\delta=3\eps$。</p>
<p>(4) $\left|(x')^2-(x'')^2\right|\le2\cdot5\,|x'-x''|$，$\delta=\frac\eps{10}=0.001$。</p>
<x-remark>$\sqrt[3]x$ 在整个 $(-\infty,+\infty)$ 上也一致连续，但在 $0$ 附近不满足 Lipschitz 条件，可以“拼接”：任给 $\eps>0$，由 Cantor 定理，有适用于 $[-2,2]$ 的 $\delta_1$；由 (3)，$\delta_2=3\eps$ 适用于 $[1,+\infty)$，同理也适用于 $(-\infty,-1]$。取 $\delta=\min\{\delta_1,\delta_2,1\}$，当 $|x'-x''|<\delta$ 时，$x',x''$ 或同属于 $[-2,2]$，或同属于 $[1,+\infty)$，或同属于 $(-\infty,-1]$，总有 $\left|\sqrt[3]{x'}-\sqrt[3]{x''}\right|<\eps$。</x-remark>
</x-ans>
</x-prob>
<x-prob level="基础" t="证明不一致连续">
<div>
<p>证明下列函数在所给区间上不一致连续：</p>
<p>(1) $x^3$，$(-\infty,+\infty)$；(2) $\ln x$，$(0,1)$；(3) $\cos\frac1x$，$(0,1)$；(4) $x\sin x$，$[0,+\infty)$。</p>
</div>
<x-hint>用 <x-ref to="prop-nunif"></x-ref>。(4) 取 $x_n'=2n\pi+\frac1n$，$x_n''=2n\pi$。</x-hint>
<x-ans>
<p>(1) $x_n'=n+\frac1n$，$x_n''=n$：$(x_n')^3-(x_n'')^3=3n+\frac3n+\frac1{n^3}>3$。</p>
<p>(2) $x_n'=e^{-n}$，$x_n''=e^{-n-1}$：$x_n'-x_n''\to0$，$\ln x_n'-\ln x_n''=1$。</p>
<p>(3) $x_n'=\frac1{2n\pi}$，$x_n''=\frac1{(2n+1)\pi}$：$x_n'-x_n''\to0$，$\cos\frac1{x_n'}-\cos\frac1{x_n''}=1-(-1)=2$。</p>
<p>(4) $x_n'=2n\pi+\frac1n$，$x_n''=2n\pi$：$x_n'-x_n''=\frac1n\to0$，而</p>
$$x_n'\sin x_n'-x_n''\sin x_n''=\left(2n\pi+\frac1n\right)\sin\frac1n=2\pi\cdot\frac{\sin\frac1n}{\frac1n}+\frac1n\sin\frac1n\to2\pi,$$
<p>所以 $n$ 充分大时这个差大于 $\eps_0=1$。</p>
<x-remark>(2)(3) 也可以用 <x-ref to="thm-unifab"></x-ref>：$x\to0^+$ 时 $\ln x\to-\infty$，$\cos\frac1x$ 没有极限。</x-remark>
</x-ans>
</x-prob>
<x-prob level="基础" t="连续函数的平均值">
<div>
<p>设 $f\in C[a,b]$。证明：</p>
<p>(1) 对 $[a,b]$ 中任意 $n$ 个点 $x_1,x_2,\cdots,x_n$，存在 $\xi\in[a,b]$，使 $f(\xi)=\frac1n\bigl(f(x_1)+f(x_2)+\cdots+f(x_n)\bigr)$；</p>
<p>(2) 对任意正数 $p,q$，存在 $\xi\in[a,b]$，使 $pf(a)+qf(b)=(p+q)f(\xi)$。</p>
</div>
<x-hint>平均值（加权平均值）介于最小值与最大值之间。</x-hint>
<x-ans>
<p>设 $m$、$M$ 是 $f$ 在 $[a,b]$ 上的最小值与最大值。(1) $m\le f(x_i)\le M$，相加后除以 $n$ 得 $m\le\frac1n\sum\limits_{i=1}^nf(x_i)\le M$，由中间值定理即得。(2) 同理，$m\le\frac{pf(a)+qf(b)}{p+q}\le M$。</p>
<x-remark>(1) 是第七章“积分中值定理”的离散形式：连续函数的平均值一定是它的某个函数值。</x-remark>
</x-ans>
</x-prob>
<x-prob level="提高" t="无穷区间上的最值">
<div>
<p>设 $f(x)$ 在 $[a,+\infty)$ 上连续，且 $\lim\limits_{x\to+\infty}f(x)=A$（有限）。证明：</p>
<p>(1) $f$ 在 $[a,+\infty)$ 上有界；</p>
<p>(2) 若存在 $x_1\ge a$ 使 $f(x_1)>A$，则 $f$ 在 $[a,+\infty)$ 上能取到最大值；</p>
<p>(3) 举例说明 (2) 中的条件 $f(x_1)>A$ 不能去掉。</p>
</div>
<x-hint>仿照 <x-ref to="ex-minr"></x-ref>，把问题化到闭区间上。</x-hint>
<x-ans>
<p>(1) 取 $\eps=1$，存在 $X>a$，当 $x>X$ 时 $|f(x)|<|A|+1$；$f$ 在 $[a,X]$ 上连续，有界。合起来，$f$ 在 $[a,+\infty)$ 上有界。</p>
<p>(2) 取 $\eps=f(x_1)-A>0$，存在 $X>\max\{a,x_1\}$，当 $x>X$ 时 $f(x)<A+\eps=f(x_1)$。$f$ 在 $[a,X]$ 上取到最大值 $f(\xi)$，且 $f(\xi)\ge f(x_1)$（因为 $x_1\in[a,X]$）。当 $x>X$ 时 $f(x)<f(x_1)\le f(\xi)$，所以 $f(\xi)$ 是 $f$ 在 $[a,+\infty)$ 上的最大值。</p>
<p>(3) $f(x)=\frac x{1+x}$，$x\in[0,+\infty)$：$f(x)<1=A$ 处处成立，上确界 $1$ 取不到。</p>
</x-ans>
</x-prob>
<x-prob level="提高" t="一致连续函数保持基本数列">
<div>
<p>(1) 设 $f$ 在区间 $I$ 上一致连续，$\{x_n\}\subset I$ 是基本数列（Cauchy 数列）。证明 $\{f(x_n)\}$ 也是基本数列，从而收敛。</p>
<p>(2) 说明 $f(x)=\frac1x$ 在 $(0,1)$ 上不具有 (1) 中的性质，并由此再次说明它在 $(0,1)$ 上不一致连续。</p>
<p>(3) 利用 (1) 证明：若 $f$ 在有限开区间 $(a,b)$ 上一致连续，则 $f(a+)$ 存在（这给出 <x-ref to="thm-unifab"></x-ref> 必要性的另一个证明）。</p>
</div>
<x-hint>(3) 用 Heine 定理：证明对任意 $x_n\to a^+$，$\{f(x_n)\}$ 都收敛，并且极限与数列的选取无关。</x-hint>
<x-ans>
<p>(1) 任给 $\eps>0$，取一致连续定义中的 $\delta$；由基本数列的定义，存在 $N$，当 $m,n>N$ 时 $|x_m-x_n|<\delta$，于是 $|f(x_m)-f(x_n)|<\eps$。由 Cauchy 收敛原理（<x-ref to="2-4/thm-cauchy"></x-ref>），$\{f(x_n)\}$ 收敛。</p>
<p>(2) $x_n=\frac1{n+1}$ 是 $(0,1)$ 中的基本数列，但 $f(x_n)=n+1\to+\infty$，不是基本数列。</p>
<p>(3) 设 $x_n\in(a,b)$，$x_n\to a$，它是基本数列，由 (1)，$\{f(x_n)\}$ 收敛。若另有 $y_n\in(a,b)$，$y_n\to a$，把两个数列交错排成 $x_1,y_1,x_2,y_2,\cdots$，它也趋于 $a$，相应的函数值数列收敛，所以 $\lim\limits_{n\to\infty}f(x_n)=\lim\limits_{n\to\infty}f(y_n)$。由 Heine 定理（<x-ref to="3-1/thm-heine"></x-ref>，对单侧极限同样成立），$f(a+)$ 存在。</p>
</x-ans>
</x-prob>
<x-prob level="提高" t="判断一致连续性">
<div>
<p>判断下列函数在所给区间上是否一致连续：</p>
<p>(1) $\frac{\sin x}x$，$(0,\pi)$；(2) $x\ln x$，$(0,1)$；(3) $e^x\cos\frac1x$，$(0,1)$；(4) $\frac1{\ln x}$，$(0,1)$；(5) $\sin x^2$，$[0,+\infty)$。</p>
</div>
<x-check answer="text:12|1,2|1、2|(1)(2)" ph="填题号，如 13">一致连续的是</x-check>
<x-hint>(1)–(4) 用 <x-ref to="thm-unifab"></x-ref>；(5) 是无限区间，用 <x-ref to="prop-nunif"></x-ref>，取 $x_n'=\sqrt{2n\pi+\frac\pi2}$，$x_n''=\sqrt{2n\pi}$。</x-hint>
<x-ans>
<p>(1) $x\to0^+$ 时极限为 $1$，$x\to\pi^-$ 时极限为 $0$，一致连续。</p>
<p>(2) $x\to0^+$ 时 $x\ln x\to0$（<x-ref to="3-3/cor-growth"></x-ref>），$x\to1^-$ 时极限为 $0$，一致连续。</p>
<p>(3) $x\to0^+$ 时 $e^x\to1$，而 $\cos\frac1x$ 没有极限，所以 $e^x\cos\frac1x$ 没有极限（否则 $\cos\frac1x=e^{-x}\cdot e^x\cos\frac1x$ 将有极限），不一致连续。</p>
<p>(4) $x\to0^+$ 时 $\frac1{\ln x}\to0$；但 $x\to1^-$ 时 $\ln x\to0^-$，$\frac1{\ln x}\to-\infty$，不一致连续。</p>
<p>(5) $x_n'-x_n''=\frac{\pi/2}{\sqrt{2n\pi+\pi/2}+\sqrt{2n\pi}}\to0$，而 $\sin\bigl((x_n')^2\bigr)-\sin\bigl((x_n'')^2\bigr)=1-0=1$，不一致连续。</p>
<x-remark>(5) 中的函数有界、连续，图像在 $x$ 很大时振荡得越来越快——与 $\sin\frac1x$ 在 $0$ 附近的情形相仿，只是“坏点”移到了无穷远处。</x-remark>
</x-ans>
</x-prob>
<x-prob level="提高" t="长度为 1/n 的水平弦">
<div>
<p>设 $f\in C[0,1]$，$f(0)=f(1)$，$n$ 是正整数。证明存在 $\xi\in\left[0,1-\frac1n\right]$，使 $f\left(\xi+\frac1n\right)=f(\xi)$。</p>
</div>
<x-hint>令 $g(x)=f\left(x+\frac1n\right)-f(x)$，考察 $g(0)+g\left(\frac1n\right)+\cdots+g\left(\frac{n-1}n\right)$。</x-hint>
<x-ans>
<p>$g$ 在 $\left[0,1-\frac1n\right]$ 上连续，且</p>
$$\sum_{k=0}^{n-1}g\left(\frac kn\right)=\sum_{k=0}^{n-1}\left[f\left(\frac{k+1}n\right)-f\left(\frac kn\right)\right]=f(1)-f(0)=0.$$
<p>若某个 $g\left(\frac kn\right)=0$，结论已成立；否则这 $n$ 个数不可能全正或全负，必有两个异号，由零点存在定理，$g$ 在它们之间有零点。</p>
<x-remark>对不是 $\frac1n$ 形式的长度 $h\in(0,1)$，结论可能不成立（Lévy，1934）：$f(x)=\sin^2\frac{\pi x}h-x\sin^2\frac\pi h$ 满足 $f(0)=f(1)=0$，但 $f(x+h)-f(x)=-h\sin^2\frac\pi h\ne0$。</x-remark>
</x-ans>
</x-prob>
<x-prob level="提高" t="零点与不动点">
<div>
<p>(1) 设 $f$ 在 $(-\infty,+\infty)$ 上连续，且 $f(f(x))=x$ 对一切 $x$ 成立。证明存在 $\xi$，使 $f(\xi)=\xi$。</p>
<p>(2) 设 $f\in C[a,b]$，且对每个 $x\in[a,b]$，存在 $y\in[a,b]$，使 $|f(y)|\le\frac12|f(x)|$。证明存在 $\xi\in[a,b]$，使 $f(\xi)=0$。</p>
</div>
<x-hint>(1) 若 $g(x)=f(x)-x$ 没有零点，由中间值定理它不变号；(2) 考察 $|f|$ 的最小值。</x-hint>
<x-ans>
<p>(1) 若 $g(x)=f(x)-x$ 没有零点，由于 $g$ 连续，由 <x-ref to="cor-interval"></x-ref>，$g$ 的值域是不含 $0$ 的区间，所以 $g$ 恒正或恒负。若 $f(x)>x$ 对一切 $x$ 成立，则 $x=f(f(x))>f(x)>x$，矛盾；恒负的情形同理。</p>
<p>(2) $|f|$ 在 $[a,b]$ 上连续，由最值定理，存在 $\xi$ 使 $|f(\xi)|=\min\limits_{[a,b]}|f|$。若 $|f(\xi)|>0$，由条件存在 $y$ 使 $|f(y)|\le\frac12|f(\xi)|<|f(\xi)|$，与最小性矛盾。所以 $f(\xi)=0$。</p>
<x-remark>(2) 也可以不用最值定理：从任一点出发，反复利用条件得到 $|f(y_n)|\le2^{-n}|f(x_0)|$，取 $\{y_n\}$ 的收敛子列，由连续性得极限点处 $f=0$——这正是最值定理证明的思路。</x-remark>
</x-ans>
</x-prob>
<x-prob level="挑战" t="连续的单射一定严格单调">
<div>
<p>设 $f$ 在区间 $I$ 上连续，并且是单射（$x'\ne x''$ 时 $f(x')\ne f(x'')$）。证明 $f$ 在 $I$ 上严格单调。</p>
</div>
<x-hint>取定 $a<b$，不妨设 $f(a)<f(b)$。对任意 $x<y$，考察 $g(t)=f\bigl((1-t)b+ty\bigr)-f\bigl((1-t)a+tx\bigr)$，$t\in[0,1]$。</x-hint>
<x-ans>
<p>若 $I$ 中只有一个点，结论平凡。取定 $I$ 中的 $a<b$，由单射性 $f(a)\ne f(b)$，不妨设 $f(a)<f(b)$，下证 $f$ 严格单调增加。任取 $I$ 中的 $x<y$，令</p>
$$u(t)=(1-t)a+tx,\qquad v(t)=(1-t)b+ty,\qquad t\in[0,1].$$
<p>$u(t)$ 介于 $a$ 与 $x$ 之间，$v(t)$ 介于 $b$ 与 $y$ 之间，因而都属于区间 $I$；并且 $v(t)-u(t)=(1-t)(b-a)+t(y-x)>0$。令 $g(t)=f(v(t))-f(u(t))$，它在 $[0,1]$ 上连续；由于 $u(t)\ne v(t)$ 而 $f$ 是单射，$g(t)\ne0$ 对一切 $t$ 成立。由零点存在定理，$g$ 在 $[0,1]$ 上不变号；而 $g(0)=f(b)-f(a)>0$，所以 $g(1)=f(y)-f(x)>0$。这就证明了 $f$ 严格单调增加。</p>
<x-remark>结合 <x-ref to="cor-invc"></x-ref>：区间上连续的单射，其反函数也连续。连续性不能去掉：$f(x)=x\ (0\le x<1)$，$f(x)=3-x\ (1\le x\le2)$ 是 $[0,2]$ 上的单射，但不单调。</x-remark>
</x-ans>
</x-prob>
<x-prob level="挑战" t="变上限的最大值函数">
<div>
<p>设 $f\in C[a,b]$，令 $M(x)=\max\limits_{a\le t\le x}f(t)$，$x\in[a,b]$。证明 $M(x)$ 在 $[a,b]$ 上连续。</p>
</div>
<x-hint>$M$ 单调增加。用 Cantor 定理：对 $\eps>0$ 取一致连续定义中的 $\delta$，证明当 $x<y<x+\delta$ 时 $0\le M(y)-M(x)<\eps$。</x-hint>
<x-ans>
<p>由最值定理，$M(x)$ 有定义，且显然单调增加。任给 $\eps>0$，由 Cantor 定理，存在 $\delta>0$，当 $s,t\in[a,b]$，$|s-t|<\delta$ 时 $|f(s)-f(t)|<\eps$。设 $a\le x<y\le b$，$y-x<\delta$，则</p>
$$M(y)=\max\Bigl\{M(x),\ \max_{x\le t\le y}f(t)\Bigr\}.$$
<p>对 $t\in[x,y]$，$|t-x|<\delta$，所以 $f(t)<f(x)+\eps\le M(x)+\eps$，从而 $M(x)\le M(y)<M(x)+\eps$。即对任意 $x,y\in[a,b]$，$|x-y|<\delta$ 时 $|M(x)-M(y)|<\eps$：$M$ 不仅连续，而且一致连续。</p>
</x-ans>
</x-prob>
<x-prob level="挑战" t="一致连续函数至多线性增长">
<div>
<p>(1) 设 $f$ 在 $[0,+\infty)$ 上一致连续。证明存在正数 $A,B$，使 $|f(x)|\le Ax+B$ 对一切 $x\ge0$ 成立。</p>
<p>(2) 由此说明 $x^2$、$e^x$ 在 $[0,+\infty)$ 上不一致连续。</p>
</div>
<x-hint>取 $\eps=1$ 及相应的 $\delta$，把 $[0,x]$ 等分成 $n=\left[\frac x\delta\right]+1$ 段，每段长度小于 $\delta$。</x-hint>
<x-ans>
<p>(1) 取 $\eps=1$，存在 $\delta>0$，当 $|x'-x''|<\delta$ 时 $|f(x')-f(x'')|<1$。对 $x>0$，令 $n=\left[\frac x\delta\right]+1$，则 $\frac xn<\delta$。记 $t_k=\frac{kx}n$（$k=0,1,\cdots,n$），则</p>
$$|f(x)-f(0)|\le\sum_{k=1}^n|f(t_k)-f(t_{k-1})|<n\le\frac x\delta+1,$$
<p>所以 $|f(x)|\le\frac1\delta x+|f(0)|+1$。取 $A=\frac1\delta$，$B=|f(0)|+1$ 即可（$x=0$ 时显然成立）。</p>
<p>(2) 若 $x^2$ 在 $[0,+\infty)$ 上一致连续，则 $x^2\le Ax+B$，即 $x\le A+\frac Bx$ 对一切 $x>0$ 成立，令 $x\to+\infty$ 得矛盾。$e^x$ 同理（$x\ge0$ 时 $e^x\ge\frac{x^2}2$）。</p>
<x-remark>反过来不成立：$\sin x^2$ 有界（当然满足线性增长的估计），却不一致连续。</x-remark>
</x-ans>
</x-prob>
<x-prob level="应用" t="跑步中的“定长段”">
<div>
<p>某人用 50 分钟跑完 10 公里，途中可以变速，也可以停下休息（但不后退）。</p>
<p>(1) 证明：一定有某个连续的 25 分钟，他恰好跑了 5 公里；</p>
<p>(2) 能否断言一定有某个连续的 20 分钟，他恰好跑了 4 公里？考察跑法 $s(t)=0.18t+\sin^2\frac{\pi t}{20}$（$s$ 以公里计，$t$ 以分钟计，$0\le t\le50$），求任一连续 20 分钟内跑过的路程。</p>
</div>
<x-check answer="3.6" ph="小数" unit="公里">(2) 中任一连续 20 分钟的路程</x-check>
<x-hint>(1) 仿照 <x-ref to="ex-chord"></x-ref>，令 $g(t)=s(t+25)-s(t)$，$t\in[0,25]$。</x-hint>
<x-ans>
<p>(1) 设 $s(t)$ 为 $t$ 时刻跑过的路程，$s\in C[0,50]$，$s(0)=0$，$s(50)=10$。令 $g(t)=s(t+25)-s(t)$，$t\in[0,25]$，则 $g(0)+g(25)=s(50)-s(0)=10$，所以 $g(0)$、$g(25)$ 中一个 $\ge5$，一个 $\le5$。由中间值定理，存在 $t_0\in[0,25]$ 使 $g(t_0)=5$，即在 $[t_0,t_0+25]$ 这 25 分钟内恰好跑了 5 公里。</p>
<p>(2) 不能。所给的 $s(t)$ 满足 $s(0)=0$，$s(50)=9+\sin^2\frac{5\pi}2=10$，并且严格单调增加（见注）。对任意 $t\in[0,30]$，</p>
$$s(t+20)-s(t)=0.18\times20+\sin^2\left(\frac{\pi t}{20}+\pi\right)-\sin^2\frac{\pi t}{20}=3.6,$$
<p>任一连续 20 分钟都恰好跑 3.6 公里，从来不是 4 公里。</p>
<x-remark>这正是 Lévy 万有弦定理的一个实例：50 分钟是 25 分钟的整数倍，却不是 20 分钟的整数倍。$s$ 的单调性：对 $t_1<t_2$，$\sin^2\frac{\pi t_2}{20}-\sin^2\frac{\pi t_1}{20}=\sin\frac{\pi(t_2-t_1)}{20}\sin\frac{\pi(t_1+t_2)}{20}\ge-\frac{\pi(t_2-t_1)}{20}$，而 $\frac\pi{20}\approx0.157<0.18$，所以 $s(t_2)-s(t_1)\ge(0.18-0.157)(t_2-t_1)>0$。</x-remark>
</x-ans>
</x-prob>
<x-prob level="应用" t="二分法的计算量">
<div>
<p>用二分法求方程的根，每二分一次需要计算一次函数值。</p>
<p>(1) 求 $x^3-x-1=0$ 在 $[1,2]$ 内的根，要使最后得到的区间长度小于 $10^{-6}$，至少需要二分多少次？</p>
<p>(2) 若一开始只知道根在 $[0,100]$ 内，达到同样的精度至少需要二分多少次？</p>
<p>(3) 初始区间的长度扩大为原来的 $100$ 倍，所需次数大约增加多少次？</p>
</div>
<x-check answer="20" ph="填一个整数">(1)</x-check>
<x-check answer="27" ph="填一个整数">(2)</x-check>
<x-check answer="7" ph="填一个整数">(3)</x-check>
<x-hint>二分 $n$ 次后区间长度为 $\frac\ell{2^n}$，$\ell$ 是初始区间的长度。</x-hint>
<x-ans>
<p>(1) $2^{-n}<10^{-6}\iff2^n>10^6$。$2^{19}=524288$，$2^{20}=1048576$，所以至少 $20$ 次。</p>
<p>(2) $\frac{100}{2^n}<10^{-6}\iff2^n>10^8$。$2^{26}=67108864$，$2^{27}=134217728$，所以至少 $27$ 次。</p>
<p>(3) $\log_2100\approx6.64$，大约增加 $7$ 次。二分法的次数只随初始区间长度的对数增长；精度每提高一位十进制数字，大约要多二分 $\log_210\approx3.32$ 次。</p>
<x-remark>二分法稳妥但较慢。第五章的 Newton 迭代法在根附近收敛快得多，但需要导数，而且初值选得不好时可能不收敛。</x-remark>
</x-ans>
</x-prob>
<x-prob level="应用" t="赤道上的对径点">
<div>
<p>假设某一时刻地球赤道上的气温随经度连续变化。证明：赤道上一定存在两个对径点（关于地心对称的两点），它们的气温相同。</p>
</div>
<x-hint>用经度 $\theta\in[0,2\pi]$ 表示赤道上的点，气温 $T(\theta)$ 连续且 $T(0)=T(2\pi)$。考察 $g(\theta)=T(\theta+\pi)-T(\theta)$。</x-hint>
<x-ans>
<p>$T$ 可以看作 $(-\infty,+\infty)$ 上以 $2\pi$ 为周期的连续函数。令 $g(\theta)=T(\theta+\pi)-T(\theta)$，它在 $[0,\pi]$ 上连续，且</p>
$$g(\pi)=T(2\pi)-T(\pi)=T(0)-T(\pi)=-g(0).$$
<p>若 $g(0)=0$，则 $\theta=0$ 与 $\theta=\pi$ 就是所求的两点；否则 $g(0)$ 与 $g(\pi)$ 异号，存在 $\theta_0\in(0,\pi)$ 使 $g(\theta_0)=0$，即 $T(\theta_0+\pi)=T(\theta_0)$。</p>
<x-remark>更深刻的 Borsuk–Ulam 定理断言：在整个地球表面上，一定存在一对对径点，它们的气温与气压都分别相同。它的证明需要代数拓扑的工具。</x-remark>
</x-ans>
</x-prob>
`);
