/* §2.3 无穷大量 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("2-3", String.raw`
<x-goal>
<ul>
<li>掌握正无穷大量、负无穷大量、无穷大量的定义，能用“$G$-$N$”语言证明简单的数列趋于无穷大；</li>
<li>分清“无界”与“无穷大量”，理解无穷大量与无穷小量的倒数关系；</li>
<li>掌握无穷大量的运算性质，知道哪些运算的结果是确定的，哪些是待定型；</li>
<li>熟悉 $\ln n\ll n^\alpha\ll a^n\ll n!\ll n^n$ 这条增长速度的阶梯，并能用它估计算法的运行时间；</li>
<li>掌握 Stolz 定理的两种形式，会用它处理 $\frac\infty\infty$ 型与 $\frac00$ 型的数列极限。</li>
</ul>
</x-goal>
<p>在 §2.2 中，发散数列被笼统地归为“没有极限”。但发散数列之间差别很大：$(-1)^n$ 在 $\pm1$ 之间来回摆动，而 $n^2$、$2^n$ 则一往无前地增大。后一类数列虽然没有有限的极限，却有明确的变化趋势，而且趋于无穷的“快慢”也可以比较。本节研究这类数列，并介绍处理待定型极限的一个有力工具——Stolz 定理。</p>

<h2 id="inf">无穷大量</h2>
<x-def t="无穷大量" id="def-infl">
<p>设 $\{x_n\}$ 是一个数列。</p>
<ul>
<li>若对任意给定的 $G>0$，存在正整数 $N$，使得当 $n>N$ 时成立 $x_n>G$，则称 $\{x_n\}$ 是<em>正无穷大量</em>，或称 $\{x_n\}$ 发散到正无穷大，记作 $\lim\limits_{n\to\infty}x_n=+\infty$ 或 $x_n\to+\infty$；</li>
<li>若对任意给定的 $G>0$，存在正整数 $N$，使得当 $n>N$ 时成立 $x_n<-G$，则称 $\{x_n\}$ 是<em>负无穷大量</em>，记作 $\lim\limits_{n\to\infty}x_n=-\infty$；</li>
<li>若对任意给定的 $G>0$，存在正整数 $N$，使得当 $n>N$ 时成立 $|x_n|>G$，则称 $\{x_n\}$ 是<em>无穷大量</em>，记作 $\lim\limits_{n\to\infty}x_n=\infty$。</li>
</ul>
</x-def>
<x-note>
<ul>
<li>记号 $\lim x_n=+\infty$ 只是一种简写，表示 $x_n$ 无限增大的趋势。$+\infty$ 不是实数，无穷大量仍然是<em>发散</em>数列。今后说“数列收敛”或“极限存在”，都是指极限为有限数。</li>
<li>正无穷大量、负无穷大量都是无穷大量；但无穷大量不一定是两者之一，例如 $(-2)^n$：$|(-2)^n|=2^n$ 无限增大，而它的项正负交替。</li>
<li>与 $\eps$-$N$ 定义一样，$N$ 依赖于 $G$；只对“大的”$G$（比如 $G>1$）验证就够了；改变数列的有限多项，不影响它是不是无穷大量。</li>
</ul>
</x-note>
<x-intuit>
<p>$\eps$-$N$ 定义说：无论 $\eps$ 多小，数列最终都落进 $(a-\eps,a+\eps)$ 并且不再出来；$G$-$N$ 定义说：无论 $G$ 多大，数列最终都越过 $G$ 并且<em>不再回头</em>。“从某项起所有项都在 $G$ 之上”与“有些项在 $G$ 之上”是两回事——后者只说明数列没有上界。</p>
</x-intuit>

<x-ex t="用定义证明数列是无穷大量" id="ex-infl">
<p>证明：(1) $\displaystyle\lim_{n\to\infty}\frac{n^2}{2n+5}=+\infty$；(2) 当 $|q|>1$ 时，$\lim\limits_{n\to\infty}q^n=\infty$；(3) $\lim\limits_{n\to\infty}\ln n=+\infty$。</p>
<x-analysis><p>与证明收敛时“放大 $|x_n-a|$”相反，这里要把 $x_n$ <em>缩小</em>成一个简单的、明显无限增大的式子 $g(n)$：只要 $x_n\ge g(n)$，而不等式 $g(n)>G$ 容易解出，就能找到 $N$。</p></x-analysis>
<x-sol l="证明">
<p>(1) 当 $n\ge5$ 时 $2n+5\le3n$，所以 $\frac{n^2}{2n+5}\ge\frac{n^2}{3n}=\frac n3$。任给 $G>0$，取 $N=\max\{5,[3G]\}$，则当 $n>N$ 时 $n>3G$，于是 $\frac{n^2}{2n+5}\ge\frac n3>G$。</p>
<p>(2) 因为 $\left|\frac1q\right|<1$，由<x-ref to="2-2/ex-qn"></x-ref>，$\frac1{q^n}\to0$。任给 $G>0$，对 $\eps=\frac1G$，存在 $N$，当 $n>N$ 时 $\frac1{|q|^n}<\frac1G$，即 $|q^n|>G$。当 $q>1$ 时 $q^n\to+\infty$；当 $q<-1$ 时 $q^n$ 正负交替，它是无穷大量，但既不是正无穷大量，也不是负无穷大量。</p>
<p>(3) 任给 $G>0$，取 $N=[e^G]$，则当 $n>N$ 时 $n>e^G$，于是 $\ln n>G$。</p>
</x-sol>
<x-remark>(3) 中的 $N$ 随 $G$ 增长得极快：要使 $\ln n>100$，需要 $n>e^{100}\approx2.7\times10^{43}$。$\ln n$ 是无穷大量，却是增长得非常慢的无穷大量。</x-remark>
</x-ex>

<h3>无穷大量与无界数列</h3>
<x-prop t="无穷大量与无界数列" id="prop-unb">
<p>无穷大量必是无界数列；但无界数列不一定是无穷大量。</p>
<x-proof>
<p>设 $x_n\to\infty$。任给 $M>0$，取 $G=M$，存在 $N$，当 $n>N$ 时 $|x_n|>M$，所以任何 $M$ 都不是 $\{|x_n|\}$ 的上界。反例：</p>
$$x_n=n^{(-1)^n}:\qquad1,\ 2,\ \frac13,\ 4,\ \frac15,\ 6,\ \cdots$$
<p>它的偶数项 $x_{2k}=2k$ 无界，但奇数项 $x_{2k-1}=\frac1{2k-1}\to0$。对 $G=1$，无论 $N$ 取多大，总有奇数 $n>N$ 使 $|x_n|<1$，所以它不是无穷大量。<span class="qed">∎</span></p>
</x-proof>
</x-prop>
<x-warn>
<p>“无界”是说：对任意 $M>0$，<em>存在某一项</em>满足 $|x_n|>M$；“无穷大量”是说：对任意 $G>0$，<em>从某项起所有项</em>都满足 $|x_n|>G$。第一章中的函数 $x\sin x$ 也是这样：它无界，但并不随 $x$ 增大而趋于无穷（<x-ref to="1-2/ex-bdd"></x-ref>）。</p>
</x-warn>

<h3>无穷大量与无穷小量</h3>
<x-thm t="无穷大量与无穷小量的关系" id="thm-recip">
<p>设 $x_n\ne0$（$n=1,2,\cdots$），则 $\{x_n\}$ 是无穷大量的充分必要条件是 $\left\{\frac1{x_n}\right\}$ 是无穷小量。</p>
<x-proof>
<p>注意 $|x_n|>G\iff\left|\frac1{x_n}\right|<\frac1G$。若 $x_n\to\infty$，任给 $\eps>0$，令 $G=\frac1\eps$，存在 $N$，当 $n>N$ 时 $|x_n|>G$，即 $\left|\frac1{x_n}\right|<\eps$。反之，若 $\frac1{x_n}\to0$，对给定的 $G>0$，取 $\eps=\frac1G$ 即可。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-note><p>由此立即得到：$\alpha>0$ 时 $n^\alpha\to+\infty$，因为 $\frac1{n^\alpha}\to0$（只需 $n>\eps^{-1/\alpha}$）。反过来要注意：$x_n\to0$ 时 $\frac1{x_n}$ 是无穷大量，但未必是正或负无穷大量，例如 $\frac{(-1)^n}n\to0$，而 $(-1)^nn$ 正负交替。</p></x-note>

<h3>无穷大量的运算</h3>
<x-thm t="无穷大量的运算性质" id="thm-infop">
<ol>
<li>若 $x_n\to+\infty$，$y_n\to+\infty$，则 $x_n+y_n\to+\infty$，$x_ny_n\to+\infty$；</li>
<li>若 $x_n\to+\infty$，$\{y_n\}$ 有下界，则 $x_n+y_n\to+\infty$。特别地，$x_n\to+\infty$ 而 $\{y_n\}$ 收敛或有界时，$x_n+y_n\to+\infty$；</li>
<li>若 $x_n\to\infty$，且存在 $\delta>0$ 与 $N_0$，使 $n>N_0$ 时 $|y_n|\ge\delta$，则 $x_ny_n\to\infty$。特别地，$x_n\to\infty$，$y_n\to b\ne0$ 时 $x_ny_n\to\infty$；</li>
<li>（比较）若 $x_n\to+\infty$，且从某项起 $y_n\ge x_n$，则 $y_n\to+\infty$。</li>
</ol>
<x-proof>
<p>只证 (2)(3)，其余类似。(2) 设 $y_n\ge-M$（$M>0$）。任给 $G>0$，存在 $N$，当 $n>N$ 时 $x_n>G+M$，于是 $x_n+y_n>G+M-M=G$。</p>
<p>(3) 任给 $G>0$，存在 $N_1$，当 $n>N_1$ 时 $|x_n|>\frac G\delta$。于是当 $n>\max\{N_0,N_1\}$ 时 $|x_ny_n|>\frac G\delta\cdot\delta=G$。若 $y_n\to b\ne0$，则 $|y_n|\to|b|>\frac{|b|}2$，由<x-ref to="2-2/thm-order"></x-ref>，从某项起 $|y_n|>\frac{|b|}2$，取 $\delta=\frac{|b|}2$ 即可。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<x-ex t="有理分式型数列（续）" id="ex-ratinf">
<p>设 $a_kb_l\ne0$，$k>l$。证明 $\displaystyle\frac{a_kn^k+\cdots+a_1n+a_0}{b_ln^l+\cdots+b_1n+b_0}$ 是无穷大量，并且当 $\frac{a_k}{b_l}>0$ 时它是正无穷大量。</p>
<x-sol l="证明">
<p>分子提出因子 $n^k$，分母提出因子 $n^l$：</p>
$$\frac{a_kn^k+\cdots+a_0}{b_ln^l+\cdots+b_0}=n^{k-l}\cdot\frac{a_k+\frac{a_{k-1}}n+\cdots+\frac{a_0}{n^k}}{b_l+\frac{b_{l-1}}n+\cdots+\frac{b_0}{n^l}}.$$
<p>右边第二个因子趋于 $\frac{a_k}{b_l}\ne0$，而 $n^{k-l}\to+\infty$，由<x-ref to="thm-infop"></x-ref>的 (3)，乘积是无穷大量。若 $\frac{a_k}{b_l}>0$，第二个因子从某项起大于 $\frac{a_k}{2b_l}>0$，于是乘积从某项起大于 $\frac{a_k}{2b_l}n^{k-l}$，由比较性质，它趋于 $+\infty$。</p>
</x-sol>
<x-remark>结合<x-ref to="2-2/ex-poly"></x-ref>，有理分式型数列的极限完全由分子、分母的最高次项决定：$k<l$ 时为 $0$，$k=l$ 时为 $\frac{a_k}{b_l}$，$k>l$ 时为无穷大。</x-remark>
</x-ex>

<x-ex t="调和数列趋于正无穷大" id="ex-harm">
<p>证明 $H_n=1+\frac12+\frac13+\cdots+\frac1n\to+\infty$。</p>
<x-analysis><p>$H_n$ 每次增加的量 $\frac1n$ 越来越小，而且趋于 $0$，看上去它可能收敛。14 世纪的 Oresme 给出了一个巧妙的分组证明：把各项按 $2$ 的方幂分段，每一段的和都不小于 $\frac12$。</p></x-analysis>
<x-sol l="证明">
$$H_{2^m}=1+\frac12+\left(\frac13+\frac14\right)+\left(\frac15+\cdots+\frac18\right)+\cdots+\left(\frac1{2^{m-1}+1}+\cdots+\frac1{2^m}\right).$$
<p>第 $j$ 个括号（$j=1,2,\cdots,m-1$）中有 $2^j$ 项，每项都不小于 $\frac1{2^{j+1}}$，所以括号内的和不小于 $\frac12$。连同前面的 $1+\frac12$，得 $H_{2^m}\ge1+\frac m2$。又 $\{H_n\}$ 单调增加，任给 $G>0$，取正整数 $m>2G$，则当 $n>2^m$ 时，$H_n\ge H_{2^m}\ge1+\frac m2>G$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这个下界相当粗糙：实际上 $H_{2^{10}}\approx7.51$，而 $1+\frac{10}2=6$。用同样的分组还可以证明 $H_n\le1+\log_2n$（见习题），所以 $H_n$ 与 $\log_2n$ 的增长同一量级；§2.4 将证明 $H_n-\ln n$ 收敛于 Euler 常数 $\gamma\approx0.5772$。$H_{10^6}\approx14.39$：加了一百万项，和才刚过 $14$。</x-remark>
</x-ex>

<x-app t="书本叠放：最多能伸出多远？">
<p>把 $n$ 本相同的书（长度为 $1$）一本压一本地叠放在桌子边缘，最上面的一本最多能伸出桌边多远？</p>
<p>设从上往下数第 $k$ 本书比第 $k+1$ 本多伸出 $d_k$（第 $n+1$ “本”就是桌面）。要使上面 $k$ 本书不翻倒，它们的整体重心不能超出第 $k+1$ 本书的右边缘，极限情形是恰好落在右边缘上。最上面一本书的重心在它的中点，所以 $d_1=\frac12$。若上面 $k$ 本书的重心恰在第 $k+1$ 本书的右边缘，则加上第 $k+1$ 本书（它的重心在其右边缘左方 $\frac12$ 处）后，这 $k+1$ 本书的整体重心位于第 $k+1$ 本书右边缘左方</p>
$$\frac{k\cdot0+1\cdot\frac12}{k+1}=\frac1{2(k+1)}$$
<p>处，所以 $d_{k+1}=\frac1{2(k+1)}$。于是最上面一本书伸出桌边的长度为</p>
$$d_1+d_2+\cdots+d_n=\frac12\left(1+\frac12+\cdots+\frac1n\right)=\frac{H_n}2\to+\infty.$$
<p>只要书足够多，最上面的书就能伸出任意远！不过 $H_n$ 增长得极慢：伸出超过 $1$ 个书长需要 $4$ 本书（$H_3\approx1.833$，$H_4\approx2.083$），超过 $2$ 个书长需要 $31$ 本（$H_{30}\approx3.995$，$H_{31}\approx4.027$），超过 $3$ 个书长需要 $227$ 本，超过 $5$ 个书长则需要 $12367$ 本。</p>
</x-app>
<x-viz type="bookstack" n="6" t="书本叠放与调和数列"><p>拖动滑块改变书的本数。图中颜色突出的是最上面的一本书，虚线标出它伸出桌边的距离 $\frac12H_n$；下方列出伸出 $k$ 个书长至少需要的本数。</p></x-viz>
`);
MA.add("2-3", String.raw`
<h2 id="order">无穷大量的比较</h2>
<p>$n$、$n^2$、$2^n$ 都是正无穷大量，但它们趋于无穷的速度相差悬殊。比较两个正无穷大量 $x_n$、$y_n$ 的自然办法是看比值：若 $\frac{x_n}{y_n}\to0$，就说 $y_n$ 比 $x_n$ <em>增长得快</em>（或说 $y_n$ 是比 $x_n$ 高阶的无穷大量），记作 $x_n\ll y_n$。无穷大量的阶将在第三章系统讨论，这里先给出最常用的几个结论。</p>
<x-thm t="增长速度的阶梯" id="thm-ladder">
<p>设 $\alpha>0$，$a>1$，则</p>
$$\lim_{n\to\infty}\frac{\ln n}{n^\alpha}=0,\qquad\lim_{n\to\infty}\frac{n^\alpha}{a^n}=0,\qquad\lim_{n\to\infty}\frac{a^n}{n!}=0,\qquad\lim_{n\to\infty}\frac{n!}{n^n}=0,$$
<p>即 $\ln n\ll n^\alpha\ll a^n\ll n!\ll n^n$。</p>
<x-proof>
<p><b>第二式。</b>取正整数 $k\ge\alpha$，因为 $0<\frac{n^\alpha}{a^n}\le\frac{n^k}{a^n}$，只需证明 $\frac{n^k}{a^n}\to0$。令 $a=1+h$，$h>0$。当 $n>2k$ 时，由二项式定理，</p>
$$a^n=(1+h)^n>\binom n{k+1}h^{k+1}=\frac{n(n-1)\cdots(n-k)}{(k+1)!}h^{k+1}>\frac{(n/2)^{k+1}}{(k+1)!}h^{k+1},$$
<p>这里用到了 $n-k>\frac n2$。于是 $0<\frac{n^k}{a^n}<\frac{2^{k+1}(k+1)!}{h^{k+1}}\cdot\frac1n\to0$。</p>
<p><b>第一式。</b>对每个正整数 $n$，取整数 $m\ge0$ 使 $2^m\le n<2^{m+1}$，则 $\ln n<(m+1)\ln2$，$n^\alpha\ge2^{m\alpha}=b^m$，其中 $b=2^\alpha>1$。于是</p>
$$0\le\frac{\ln n}{n^\alpha}<\ln2\cdot\frac{m+1}{b^m}.$$
<p>由第二式，$\frac{m+1}{b^m}=\frac m{b^m}+\frac1{b^m}\to0$（$m\to\infty$）。任给 $\eps>0$，存在 $M$，当 $m>M$ 时 $\ln2\cdot\frac{m+1}{b^m}<\eps$；于是当 $n\ge2^{M+1}$ 时 $m\ge M+1$，从而 $\frac{\ln n}{n^\alpha}<\eps$。</p>
<p><b>第三、四式</b>已在 §2.2 证明：$\frac{a^n}{n!}\to0$ 见 §2.2 习题中的“比值判别法”，$0<\frac{n!}{n^n}\le\frac1n$ 见<x-ref to="2-2/ex-fact"></x-ref>。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-intuit>
<p>可以这样记：对数被任何正次幂“压制”，幂被任何底数大于 $1$ 的指数“压制”，指数被阶乘“压制”，阶乘又被 $n^n$ “压制”。取对数看得更清楚：$\ln n^k=k\ln n$，$\ln a^n=n\ln a$，$\ln n!\approx n\ln n-n$（Stirling 公式，以后会学到），$\ln n^n=n\ln n$。</p>
</x-intuit>
<x-warn>
<p>“$\ll$”说的是<em>最终</em>的胜负，开始时可能完全相反。$\frac{n^{10}}{2^n}$ 在 $n=14$ 时达到最大值，约 $1.77\times10^7$；$n=2,3,\cdots,58$ 时都有 $2^n<n^{10}$，从 $n=59$ 起才恒有 $2^n>n^{10}$。$1.1^n$ 则要到 $n\ge686$ 才恒大于 $n^{10}$。更极端的是 $(\ln n)^{10}$ 与 $n^{0.1}$：虽然 $(\ln n)^{10}\ll n^{0.1}$，但要到 $n$ 约为 $10^{281}$ 时后者才追上前者。渐近比较告诉我们谁最终更大，至于从哪里开始，需要另行估计。</p>
</x-warn>
<x-app t="算法的时间复杂度">
<p>计算机科学用“基本运算次数随输入规模 $n$ 增长的阶”来衡量算法的效率。设计算机每秒执行 $10^9$ 次基本运算：</p>
<ul>
<li>运算量为 $n^2$ 的算法，$n=10^6$ 时需要 $10^{12}$ 次运算，约 $17$ 分钟；</li>
<li>运算量为 $2^n$ 的算法，$n=40$ 时约需 $18.3$ 分钟，$n=50$ 时约需 $13$ 天，$n=60$ 时约需 $36.5$ 年；</li>
<li>运算量为 $n!$ 的算法（比如逐一检查 $n$ 个对象的所有排列），$n=20$ 时约需 $77$ 年。</li>
</ul>
<p>反过来问：一小时（$3.6\times10^{12}$ 次运算）内能处理多大规模的问题？$n^2$ 型约为 $1.9\times10^6$，$n^3$ 型约为 $15326$，$2^n$ 型只有 $41$。若计算机快 $1000$ 倍，前两者的规模分别扩大到约 $31.6$ 倍和 $10$ 倍，而 $2^n$ 型只从 $41$ 增加到 $51$。这就是指数时间的算法被认为“不可行”的原因：硬件的进步对它几乎无济于事。</p>
</x-app>
<x-viz type="growth" n="30" t="增长速度的比较"><p>勾选要比较的数列，纵轴默认用对数刻度。下方可以计算 $2^n$ 从哪一项起超过 $n^k$；表格给出不同复杂度的算法在每秒 $10^9$ 次运算的计算机上所需的时间。</p></x-viz>

<h2 id="indet">待定型</h2>
<p>由<x-ref to="thm-infop"></x-ref>、<x-ref to="thm-recip"></x-ref>与 §2.2 的四则运算法则，下列情形的结果是确定的（$a$ 表示有限的极限）：</p>
<table>
<tr><th>形式</th><th>结果</th><th>形式</th><th>结果</th></tr>
<tr><td>$(+\infty)+(+\infty)$</td><td>$+\infty$</td><td>$a+(\pm\infty)$</td><td>$\pm\infty$</td></tr>
<tr><td>$(+\infty)\cdot(+\infty)$</td><td>$+\infty$</td><td>$a\cdot\infty\ (a\ne0)$</td><td>$\infty$</td></tr>
<tr><td>$\dfrac a\infty$</td><td>$0$</td><td>$\dfrac a0\ (a\ne0)$</td><td>$\infty$</td></tr>
</table>
<p>而下面七种形式的结果<em>不能</em>由各部分的极限确定，称为<em>待定型</em>（或不定式）：</p>
$$\frac00,\qquad\frac\infty\infty,\qquad0\cdot\infty,\qquad\infty-\infty,\qquad1^\infty,\qquad0^0,\qquad\infty^0.$$
<x-ex t="同一种待定型，不同的结果" id="ex-indet">
<p>观察下列数列：</p>
<ul>
<li>$\frac\infty\infty$ 型：$\frac n{n^2}\to0$，$\frac{n^2}n\to+\infty$，$\frac{2n+1}n\to2$，而 $\frac{\left(2+(-1)^n\right)n}n=2+(-1)^n$ 发散；</li>
<li>$1^\infty$ 型：$\left(1+\frac1{n^2}\right)^n\to1$（§2.2 习题），$\left(1+\frac1n\right)^n\to e$（§2.4），$\left(1+\frac1n\right)^{n^2}\to+\infty$；</li>
<li>$0^0$ 型：$\left(\frac1n\right)^{\frac1n}\to1$，而 $\left(\frac1{2^n}\right)^{\frac1n}=\frac12$；$\infty^0$ 型：$n^{\frac1n}\to1$，而 $(2^n)^{\frac1n}=2$。</li>
</ul>
<x-sol>
<p>大多数可由化简直接得到。$\left(\frac1n\right)^{\frac1n}=\frac1{\sqrt[n]n}\to1$ 用到了<x-ref to="2-2/ex-nroot"></x-ref>。$\left(1+\frac1n\right)^{n^2}$：由 Bernoulli 不等式（<x-ref to="1-2/lem-bern"></x-ref>），$\left(1+\frac1n\right)^{n^2}\ge1+n^2\cdot\frac1n=1+n\to+\infty$。</p>
</x-sol>
<x-remark>“待定”不是说极限不存在，而是说仅凭“分子趋于无穷、分母也趋于无穷”这样的信息无法确定结果，必须进一步分析两者的<em>相对</em>大小。处理待定型的常用方法有：提出或约去主要部分、有理化、利用已知的基本极限、下面介绍的 Stolz 定理，以及以后要学的 L'Hospital 法则与 Taylor 公式。</x-remark>
</x-ex>
<x-ex t="几种常用的变形技巧" id="ex-tricks">
<p>求极限：(1) $\displaystyle\lim_{n\to\infty}\frac{n^2+2^n}{n^3+3^n}$；(2) $\displaystyle\lim_{n\to\infty}n\left(\sqrt{n^2+1}-n\right)$；(3) $\displaystyle\lim_{n\to\infty}\left(\sqrt[3]{n^3+n^2}-n\right)$。</p>
<x-sol>
<p>(1) $\frac\infty\infty$ 型。分子、分母中增长最快的分别是 $2^n$ 与 $3^n$，同除以 $3^n$：</p>
$$\frac{n^2+2^n}{n^3+3^n}=\frac{\frac{n^2}{3^n}+\left(\frac23\right)^n}{\frac{n^3}{3^n}+1}\to\frac{0+0}{0+1}=0.$$
<p>(2) $0\cdot\infty$ 型，有理化后化为可以直接计算的形式：$n\left(\sqrt{n^2+1}-n\right)=\frac n{\sqrt{n^2+1}+n}=\frac1{\sqrt{1+\frac1{n^2}}+1}\to\frac12$。</p>
<p>(3) $\infty-\infty$ 型。记 $u_n=\sqrt[3]{n^3+n^2}$，由 $u^3-n^3=(u-n)(u^2+un+n^2)$ 得</p>
$$u_n-n=\frac{n^2}{u_n^2+u_nn+n^2}=\frac1{\left(\frac{u_n}n\right)^2+\frac{u_n}n+1}.$$
<p>而 $\frac{u_n}n=\sqrt[3]{1+\frac1n}\to1$（§2.2 习题：$a_n\to a$ 蕴含 $\sqrt[k]{a_n}\to\sqrt[k]a$），所以极限为 $\frac13$。</p>
</x-sol>
<x-remark>(1) 的思路是“抓主要部分”：$n^2+2^n$ 的主要部分是 $2^n$，$n^3+3^n$ 的主要部分是 $3^n$，所以原式的变化与 $\left(\frac23\right)^n$ 相仿。这一思想在第三章会发展为用等价量计算极限的方法。</x-remark>
</x-ex>
`);
MA.add("2-3", String.raw`
<h2 id="stolz">Stolz 定理</h2>
<p>§2.2 证明了：若 $a_n\to a$，则 $\frac{a_1+\cdots+a_n}n\to a$（<x-ref to="2-2/ex-cesaro"></x-ref>）。换个角度看：记 $x_n=a_1+\cdots+a_n$，$y_n=n$，结论是说“增量之比” $\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=a_n$ 的极限也就是 $\frac{x_n}{y_n}$ 的极限。把 $y_n=n$ 换成一般的严格增加、趋于 $+\infty$ 的数列，就得到 Stolz 定理。它常被看作数列形式的 L'Hospital 法则。</p>
<x-thm t="Stolz 定理（$\frac{*}{\infty}$ 型）" id="thm-stolz">
<p>设 $\{y_n\}$ 严格单调增加，且 $\lim\limits_{n\to\infty}y_n=+\infty$。若</p>
$$\lim_{n\to\infty}\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=a\qquad(a\text{ 为有限数，或 }+\infty\text{、}-\infty),$$
<p>则 $\displaystyle\lim_{n\to\infty}\frac{x_n}{y_n}=a$。</p>
<x-proof>
<p><b>$a$ 为有限数。</b>任给 $\eps>0$。因为 $y_n\to+\infty$，且增量之比趋于 $a$，存在 $N_1$，使 $y_{N_1}>0$，并且当 $n>N_1$ 时</p>
$$a-\eps<\frac{x_n-x_{n-1}}{y_n-y_{n-1}}<a+\eps.$$
<p>由于 $y_k-y_{k-1}>0$，乘以分母得 $(a-\eps)(y_k-y_{k-1})<x_k-x_{k-1}<(a+\eps)(y_k-y_{k-1})$（$k>N_1$）。对 $k=N_1+1,\cdots,n$ 求和，中间项相消：</p>
$$(a-\eps)(y_n-y_{N_1})<x_n-x_{N_1}<(a+\eps)(y_n-y_{N_1}),$$
<p>即 $\bigl|(x_n-x_{N_1})-a(y_n-y_{N_1})\bigr|<\eps(y_n-y_{N_1})<\eps y_n$。于是</p>
$$\left|\frac{x_n}{y_n}-a\right|=\left|\frac{x_{N_1}-ay_{N_1}}{y_n}+\frac{(x_n-x_{N_1})-a(y_n-y_{N_1})}{y_n}\right|<\frac{|x_{N_1}-ay_{N_1}|}{y_n}+\eps.$$
<p>$x_{N_1}-ay_{N_1}$ 是常数，$y_n\to+\infty$，所以存在 $N>N_1$，当 $n>N$ 时右边第一项小于 $\eps$，从而 $\left|\frac{x_n}{y_n}-a\right|<2\eps$。</p>
<p><b>$a=+\infty$。</b>存在 $N_1$，当 $n>N_1$ 时 $\frac{x_n-x_{n-1}}{y_n-y_{n-1}}>1$，即 $x_n-x_{n-1}>y_n-y_{n-1}>0$。所以从第 $N_1$ 项起 $\{x_n\}$ 严格增加，且 $x_n-x_{N_1}>y_n-y_{N_1}\to+\infty$，故 $x_n\to+\infty$。由<x-ref to="thm-recip"></x-ref>，$\frac{y_n-y_{n-1}}{x_n-x_{n-1}}\to0$。交换 $x$、$y$ 的角色，对 $\frac{y_n}{x_n}$ 用已证的有限情形，得 $\frac{y_n}{x_n}\to0$。又 $n$ 充分大时 $\frac{x_n}{y_n}>0$，再由<x-ref to="thm-recip"></x-ref>即得 $\frac{x_n}{y_n}\to+\infty$。$a=-\infty$ 时考虑 $\{-x_n\}$ 即可。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-note>
<ul>
<li>定理只要求<em>分母</em> $y_n\to+\infty$，并不要求分子趋于无穷，所以也称为 $\frac{*}{\infty}$ 型的 Stolz 定理。</li>
<li>取 $y_n=n$，$x_n=a_1+\cdots+a_n$，就得到 §2.2 中算术平均的极限。</li>
<li>只需“从某项起” $\{y_n\}$ 严格增加，因为改变有限多项不影响极限。</li>
</ul>
</x-note>
<x-warn>
<ul>
<li><em>逆命题不成立</em>：$x_n=(-1)^n$，$y_n=n$，则 $\frac{x_n}{y_n}\to0$，但 $\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=2\cdot(-1)^n$ 发散。增量之比的极限不存在时不能用 Stolz 定理，但原来的极限仍可能存在。</li>
<li><em>条件 $y_n\to+\infty$ 不能去掉</em>：$y_n=1-\frac1n$ 严格增加，$x_n=2-\frac1n$，增量之比恒等于 $1$，但 $\frac{x_n}{y_n}\to2$。</li>
</ul>
</x-warn>
<x-ex t="幂和的极限" id="ex-powsum">
<p>设 $p$ 为正整数，求 $\displaystyle\lim_{n\to\infty}\frac{1^p+2^p+\cdots+n^p}{n^{p+1}}$。</p>
<x-analysis><p>$\frac\infty\infty$ 型。分子的增量是 $n^p$；分母的增量 $n^{p+1}-(n-1)^{p+1}$ 用二项式定理展开，最高次项是 $(p+1)n^p$。</p></x-analysis>
<x-sol>
<p>令 $x_n=1^p+\cdots+n^p$，$y_n=n^{p+1}$，则 $\{y_n\}$ 严格增加且趋于 $+\infty$。由二项式定理，</p>
$$y_n-y_{n-1}=n^{p+1}-(n-1)^{p+1}=(p+1)n^p-\binom{p+1}2n^{p-1}+\cdots+(-1)^p,$$
<p>所以</p>
$$\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=\frac{n^p}{(p+1)n^p-\binom{p+1}2n^{p-1}+\cdots}=\frac1{(p+1)-\binom{p+1}2\frac1n+\cdots}\to\frac1{p+1}.$$
<p>由 Stolz 定理，原极限为 $\frac1{p+1}$。</p>
</x-sol>
<x-remark>几何意义：$\frac{1^p+\cdots+n^p}{n^{p+1}}=\sum\limits_{k=1}^n\left(\frac kn\right)^p\cdot\frac1n$ 是 $n$ 个窄矩形的面积之和，这些矩形拼起来逼近曲线 $y=x^p$（$0\le x\le1$）下方的图形。所以这个极限说明该图形的面积为 $\frac1{p+1}$——第七章的定积分 $\int_0^1x^p\,\dd x=\frac1{p+1}$ 正是从这样的和式出发定义的。</x-remark>
</x-ex>
<x-ex t="非整数次幂的和" id="ex-sqrtsum">
<p>求 $\displaystyle\lim_{n\to\infty}\frac{1+\sqrt2+\sqrt3+\cdots+\sqrt n}{n\sqrt n}$。</p>
<x-sol>
<p>令 $x_n=\sum\limits_{k=1}^n\sqrt k$，$y_n=n^{3/2}$。由 $y_n-y_{n-1}=n^{3/2}-(n-1)^{3/2}=\frac{n^3-(n-1)^3}{n^{3/2}+(n-1)^{3/2}}$ 得</p>
$$\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=\frac{\sqrt n\left(n^{3/2}+(n-1)^{3/2}\right)}{3n^2-3n+1}=\frac{1+\left(1-\frac1n\right)^{3/2}}{3-\frac3n+\frac1{n^2}}\to\frac23,$$
<p>这里 $\left(1-\frac1n\right)^{3/2}=\left(1-\frac1n\right)\sqrt{1-\frac1n}\to1$。由 Stolz 定理，原极限为 $\frac23$。</p>
</x-sol>
<x-remark>结果与上例的公式 $\frac1{p+1}$ 在 $p=\frac12$ 时一致。事实上，对任意实数 $p>0$ 都有 $\lim\limits_{n\to\infty}\frac{1^p+\cdots+n^p}{n^{p+1}}=\frac1{p+1}$，一般情形的证明要用到导数或定积分。</x-remark>
</x-ex>
<x-thm t="Stolz 定理（$\frac00$ 型）" id="thm-stolz0">
<p>设 $\{y_n\}$ 严格单调减少，$\lim\limits_{n\to\infty}x_n=\lim\limits_{n\to\infty}y_n=0$。若 $\displaystyle\lim_{n\to\infty}\frac{x_n-x_{n+1}}{y_n-y_{n+1}}=a$（$a$ 为有限数），则 $\displaystyle\lim_{n\to\infty}\frac{x_n}{y_n}=a$。</p>
<x-proof>
<p>因为 $\{y_n\}$ 严格减少且趋于 $0$，所以 $y_n>0$。任给 $\eps>0$，存在 $N$，当 $k>N$ 时</p>
$$(a-\eps)(y_k-y_{k+1})<x_k-x_{k+1}<(a+\eps)(y_k-y_{k+1}).$$
<p>对 $n>N$ 及任意 $m>n$，对 $k=n,n+1,\cdots,m-1$ 求和得</p>
$$(a-\eps)(y_n-y_m)<x_n-x_m<(a+\eps)(y_n-y_m).$$
<p>固定 $n$，令 $m\to\infty$，由 $x_m\to0$，$y_m\to0$ 及<x-ref to="2-2/cor-le"></x-ref>得 $(a-\eps)y_n\le x_n\le(a+\eps)y_n$，即当 $n>N$ 时 $\left|\frac{x_n}{y_n}-a\right|\le\eps$。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-ex t="级数余项的估计" id="ex-tail">
<p>§2.4 将证明极限 $\displaystyle\sum_{k=1}^\infty\frac1{k^2}=\lim_{n\to\infty}\sum_{k=1}^n\frac1{k^2}$ 存在（Euler 求出它等于 $\frac{\pi^2}6$）。记余项 $r_n=\sum\limits_{k=n}^\infty\frac1{k^2}=\frac{\pi^2}6-\sum\limits_{k=1}^{n-1}\frac1{k^2}$，证明 $\lim\limits_{n\to\infty}nr_n=1$。</p>
<x-sol l="证明">
<p>$r_n\to0$；$y_n=\frac1n$ 严格减少且趋于 $0$。又 $r_n-r_{n+1}=\frac1{n^2}$，$y_n-y_{n+1}=\frac1{n(n+1)}$，所以</p>
$$\frac{r_n-r_{n+1}}{y_n-y_{n+1}}=\frac{n(n+1)}{n^2}=1+\frac1n\to1.$$
<p>由 $\frac00$ 型的 Stolz 定理，$nr_n=\frac{r_n}{1/n}\to1$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这说明用部分和 $\sum\limits_{k=1}^n\frac1{k^2}$ 近似 $\frac{\pi^2}6$ 时，误差约为 $\frac1n$：取 $1000$ 项，误差约为 $10^{-3}$（实际为 $9.995\times10^{-4}$），收敛相当慢。知道了误差的主要部分，就可以把它补上：$\sum\limits_{k=1}^{1000}\frac1{k^2}+\frac1{1000}$ 的误差只有约 $5\times10^{-7}$。先估计余项、再加以修正，是数值计算中加速收敛的基本手段。</x-remark>
</x-ex>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>$x_n\to+\infty$：$\forall G>0,\ \exists N,\ \forall n>N:\ x_n>G$；$x_n\to\infty$ 只要求 $|x_n|>G$。无穷大量是发散数列。</li>
<li>无穷大量必无界；无界数列未必是无穷大量（如 $n^{(-1)^n}$）。$x_n\ne0$ 时，$x_n\to\infty\iff\frac1{x_n}\to0$。</li>
<li>结果确定的运算：$(+\infty)+(+\infty)$，$(+\infty)+$有下界的量，无穷大量 $\times$ 绝对值有正下界的量。待定型：$\frac00,\ \frac\infty\infty,\ 0\cdot\infty,\ \infty-\infty,\ 1^\infty,\ 0^0,\ \infty^0$。</li>
<li>增长的阶梯：$\ln n\ll n^\alpha\ll a^n\ll n!\ll n^n$（$\alpha>0$，$a>1$），但“最终”可能来得很晚。</li>
<li>$H_n=1+\frac12+\cdots+\frac1n\to+\infty$，但增长得极慢，与 $\log_2n$ 同一量级。</li>
<li>Stolz 定理：$y_n$ 严格增加趋于 $+\infty$（或 $y_n$ 严格减少趋于 $0$ 且 $x_n\to0$）时，增量之比的极限就是 $\frac{x_n}{y_n}$ 的极限；逆命题不成立。</li>
</ul>
</x-sum>
`);
MA.add("2-3", String.raw`
<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对无穷大量与 Stolz 定理的理解">
<x-q type="choice" answer="B">
<x-stem>$\lim\limits_{n\to\infty}x_n=+\infty$ 的正确表述是：</x-stem>
<x-opt>对任意 $G>0$，存在 $n$，使 $x_n>G$</x-opt>
<x-opt>对任意 $G>0$，存在 $N$，当 $n>N$ 时 $x_n>G$</x-opt>
<x-opt>存在 $G>0$，对任意 $N$，存在 $n>N$ 使 $x_n>G$</x-opt>
<x-opt>对任意 $G>0$ 与任意 $N$，存在 $n>N$ 使 $x_n>G$</x-opt>
<x-exp>A 只说明 $\{x_n\}$ 无上界；D 说明对每个 $G$ 都有无穷多项大于 $G$，如 $n^{(-1)^n}$ 也满足；C 更弱。只有 B 要求“从某项起所有项”都大于 $G$。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>无穷大量一定是无界数列。</x-stem>
<x-exp>正确：对任意 $M$，从某项起 $|x_n|>M$，所以 $M$ 不是上界。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>无界数列一定是无穷大量。</x-stem>
<x-exp>错误：$n^{(-1)^n}$ 的偶数项无界，但奇数项趋于 $0$。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>下列数列中，是无穷大量、但既不是正无穷大量也不是负无穷大量的是：</x-stem>
<x-opt>$n\sin\frac{n\pi}2$</x-opt>
<x-opt>$(-1)^nn$</x-opt>
<x-opt>$-\sqrt n$</x-opt>
<x-opt>$n^{(-1)^n}$</x-opt>
<x-exp>$|(-1)^nn|=n\to+\infty$，而符号交替。A 的偶数项为 $0$，D 的奇数项趋于 $0$，两者无界但不是无穷大量；C 是负无穷大量。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>两个正无穷大量之差，要么是无穷大量，要么收敛。</x-stem>
<x-exp>错误：$\left(n+(-1)^n\right)-n=(-1)^n$ 既不收敛，也不是无穷大量。$\infty-\infty$ 是待定型，什么情况都可能出现。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若 $x_n\to+\infty$，$\{y_n\}$ 有界，则 $x_ny_n$ 是无穷大量。</x-stem>
<x-exp>错误：$x_n=n$，$y_n=\frac1n$，乘积恒为 $1$。要保证乘积是无穷大量，需要 $|y_n|$ 从某项起不小于某个正数 $\delta$。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>$\displaystyle\lim_{n\to\infty}\left(1+\frac1n\right)^{n^2}$ 等于：</x-stem>
<x-opt>$1$</x-opt>
<x-opt>$e$</x-opt>
<x-opt>$+\infty$</x-opt>
<x-opt>不存在，也不是无穷大</x-opt>
<x-exp>由 Bernoulli 不等式，$\left(1+\frac1n\right)^{n^2}\ge1+n$。同为 $1^\infty$ 型，$\left(1+\frac1n\right)^n\to e$，$\left(1+\frac1{n^2}\right)^n\to1$。</x-exp>
</x-q>
<x-q type="multi" answer="ABDE">
<x-stem>下列数列中趋于 $0$ 的有（多选）：</x-stem>
<x-opt>$\frac{n^{100}}{1.01^n}$</x-opt>
<x-opt>$\frac{(\ln n)^{10}}n$</x-opt>
<x-opt>$\frac{2^n}{n^{10}}$</x-opt>
<x-opt>$\frac{n!}{n^n}$</x-opt>
<x-opt>$\frac{100^n}{n!}$</x-opt>
<x-exp>由增长速度的阶梯，A、D、E 趋于 $0$；B 可写成 $\left(\frac{\ln n}{n^{0.1}}\right)^{10}\to0$。C 是 $\frac{n^{10}}{2^n}$ 的倒数，趋于 $+\infty$。</x-exp>
</x-q>
<x-q type="fill" answer="1/3" ph="分数或小数">
<x-stem>$\displaystyle\lim_{n\to\infty}\frac{1^2+2^2+\cdots+n^2}{n^3}=$</x-stem>
<x-exp>幂和公式中取 $p=2$，得 $\frac1{p+1}=\frac13$；也可由 $1^2+\cdots+n^2=\frac{n(n+1)(2n+1)}6$ 直接计算。</x-exp>
</x-q>
<x-q type="fill" answer="1">
<x-stem>$\displaystyle\lim_{n\to\infty}\bigl(\sqrt{n^2+n}-\sqrt{n^2-n}\bigr)=$</x-stem>
<x-exp>有理化：$\frac{2n}{\sqrt{n^2+n}+\sqrt{n^2-n}}=\frac2{\sqrt{1+\frac1n}+\sqrt{1-\frac1n}}\to1$。</x-exp>
</x-q>
<x-q type="fill" answer="4">
<x-stem>按书本叠放的最优方式，至少要 ____ 本书，最上面一本才能伸出桌边超过 $1$ 个书长。</x-stem>
<x-exp>伸出长度为 $\frac12H_n$。$H_3=\frac{11}6<2$，$H_4=\frac{25}{12}>2$，所以至少要 $4$ 本。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>设 $\{y_n\}$ 严格增加且趋于 $+\infty$。若 $\frac{x_n}{y_n}$ 收敛，则 $\frac{x_n-x_{n-1}}{y_n-y_{n-1}}$ 也收敛。</x-stem>
<x-exp>错误，Stolz 定理的逆命题不成立：$x_n=(-1)^n$，$y_n=n$ 时 $\frac{x_n}{y_n}\to0$，而增量之比 $2\cdot(-1)^n$ 发散。</x-exp>
</x-q>
</x-quiz>

<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果（可以输入表达式，如 <code>1/3</code>、<code>sqrt(2)</code>）；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>

<x-prob level="基础" t="用定义证明数列趋于无穷大">
<p>用定义证明：(1) $\displaystyle\lim_{n\to\infty}\frac{n^2-1}{n+3}=+\infty$；(2) $\lim\limits_{n\to\infty}\ln\ln n=+\infty$（$n\ge2$）；(3) $\lim\limits_{n\to\infty}(-1)^n\sqrt n=\infty$，并说明它既不是正无穷大量，也不是负无穷大量。</p>
<x-hint>(1) 当 $n\ge2$ 时 $n^2-1\ge\frac34n^2$，$n+3\le3n$；(2) 从 $\ln\ln n>G$ 反解出 $n$。</x-hint>
<x-ans>
<p>(1) 当 $n\ge2$ 时，$\frac{n^2-1}{n+3}\ge\frac{\frac34n^2}{3n}=\frac n4$。任给 $G>0$，取 $N=\max\{2,[4G]\}$，则当 $n>N$ 时 $\frac{n^2-1}{n+3}\ge\frac n4>G$。</p>
<p>(2) $\ln\ln n>G\iff\ln n>e^G\iff n>e^{e^G}$。任给 $G>0$，取 $N=\left[e^{e^G}\right]$ 即可。$N$ 增长得惊人：$G=2$ 时 $e^{e^2}\approx1618$，$G=3$ 时 $e^{e^3}\approx5.3\times10^8$。</p>
<p>(3) $|(-1)^n\sqrt n|=\sqrt n>G\iff n>G^2$，取 $N=[G^2]$。对任意 $G>0$ 与任意 $N$，总有偶数 $n>N$ 使 $x_n>G$，也总有奇数 $n>N$ 使 $x_n<-G$，所以它既不是正无穷大量，也不是负无穷大量。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="无穷大量与无界数列的辨析">
<p>判断下列数列是否有界，是否为无穷大量；若是无穷大量，是否为正（负）无穷大量：(1) $n\sin\frac{n\pi}2$；(2) $n\left(2+(-1)^n\right)$；(3) $\frac{(-1)^nn^2}{n+1}$；(4) $\frac n{\ln(n+1)}$；(5) $\ln\frac1n$。</p>
<x-hint>(4) 先说明 $\frac{\ln(n+1)}n\to0$，再用无穷大量与无穷小量的关系。</x-hint>
<x-ans>
<p>(1) $n=4k+1$ 时项等于 $n$，所以无界；但 $n$ 为偶数时项为 $0$，不是无穷大量。</p>
<p>(2) $n\left(2+(-1)^n\right)\ge n$，由比较性质，它是正无穷大量。</p>
<p>(3) $\left|\frac{(-1)^nn^2}{n+1}\right|=\frac{n^2}{n+1}\ge\frac n2$，所以是无穷大量；由于正负交替，它不是正（负）无穷大量。</p>
<p>(4) $0<\frac{\ln(n+1)}n\le\frac{\ln(2n)}n=\frac{\ln2}n+\frac{\ln n}n\to0$（<x-ref to="thm-ladder"></x-ref>），由<x-ref to="thm-recip"></x-ref>，$\frac n{\ln(n+1)}$ 是无穷大量，且各项为正，所以是正无穷大量。</p>
<p>(5) $\ln\frac1n=-\ln n\to-\infty$，是负无穷大量。以上无穷大量都无界。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="用 Stolz 定理求极限">
<p>求下列极限：(1) $\displaystyle\lim_{n\to\infty}\frac{1\cdot2+2\cdot3+\cdots+n(n+1)}{n^3}$；(2) $\displaystyle\lim_{n\to\infty}\frac{1^3+2^3+\cdots+n^3}{n^4}$；(3) $\displaystyle\lim_{n\to\infty}\frac{1+\frac12+\cdots+\frac1n}n$；(4) $\displaystyle\lim_{n\to\infty}\frac{1}{n\cdot2^n}\bigl(1+2\cdot2+3\cdot2^2+\cdots+n\cdot2^{n-1}\bigr)$。</p>
<x-check answer="1/3">(1)</x-check>
<x-check answer="1/4">(2)</x-check>
<x-check answer="0">(3)</x-check>
<x-check answer="1">(4)</x-check>
<x-hint>分母依次取 $y_n=n^3,\ n^4,\ n,\ n\cdot2^n$，它们都严格增加且趋于 $+\infty$。</x-hint>
<x-ans>
<p>(1) $\frac{n(n+1)}{n^3-(n-1)^3}=\frac{n^2+n}{3n^2-3n+1}\to\frac13$。</p>
<p>(2) $\frac{n^3}{n^4-(n-1)^4}=\frac{n^3}{4n^3-6n^2+4n-1}\to\frac14$。</p>
<p>(3) $\frac{1/n}{n-(n-1)}=\frac1n\to0$（这也就是算术平均的极限）。</p>
<p>(4) $\frac{n\cdot2^{n-1}}{n\cdot2^n-(n-1)2^{n-1}}=\frac{n\cdot2^{n-1}}{2^{n-1}(2n-n+1)}=\frac n{n+1}\to1$。也可以直接求和：分子等于 $(n-1)2^n+1$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="待定型的计算">
<p>求下列极限：(1) $\lim\limits_{n\to\infty}\left(\sqrt{n^2+3n}-\sqrt{n^2+1}\right)$；(2) $\displaystyle\lim_{n\to\infty}\frac{2^n+n^5}{2^n-n^5}$；(3) $\displaystyle\lim_{n\to\infty}\frac{(n+1)^{10}-n^{10}}{n^9}$；(4) $\displaystyle\lim_{n\to\infty}n\left(\sqrt[3]{1+\frac1n}-1\right)$。</p>
<x-check answer="3/2">(1)</x-check>
<x-check answer="1">(2)</x-check>
<x-check answer="10">(3)</x-check>
<x-check answer="1/3">(4)</x-check>
<x-hint>(1) 有理化；(2) 同除以 $2^n$；(3) 二项式展开；(4) 令 $v_n=\sqrt[3]{1+\frac1n}$，利用 $v^3-1=(v-1)(v^2+v+1)$。</x-hint>
<x-ans>
<p>(1) $\sqrt{n^2+3n}-\sqrt{n^2+1}=\frac{3n-1}{\sqrt{n^2+3n}+\sqrt{n^2+1}}=\frac{3-\frac1n}{\sqrt{1+\frac3n}+\sqrt{1+\frac1{n^2}}}\to\frac32$。</p>
<p>(2) $\frac{1+\frac{n^5}{2^n}}{1-\frac{n^5}{2^n}}\to1$，因为 $\frac{n^5}{2^n}\to0$。</p>
<p>(3) $(n+1)^{10}-n^{10}=10n^9+45n^8+\cdots+1$，除以 $n^9$ 后趋于 $10$。</p>
<p>(4) $v_n^3-1=\frac1n$，所以 $n(v_n-1)=\frac{n(v_n^3-1)}{v_n^2+v_n+1}=\frac1{v_n^2+v_n+1}\to\frac13$（因为 $v_n\to1$）。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="增长速度的排序">
<p>(1) 设 $k$ 为正整数，$\alpha>0$，证明 $\displaystyle\lim_{n\to\infty}\frac{(\ln n)^k}{n^\alpha}=0$。(2) 把下列正无穷大量按增长速度从慢到快排列，并说明理由：$n^{10}$，$n!$，$(\ln n)^{10}$，$1.1^n$，$n^{0.1}$，$n^n$，$2^{\sqrt n}$。</p>
<x-hint>(1) $\frac{(\ln n)^k}{n^\alpha}=\left(\frac{\ln n}{n^{\alpha/k}}\right)^k$。(2) 把 $2^{\sqrt n}$ 与 $n^{10}$ 比较时令 $m=[\sqrt n]$；与 $1.1^n$ 比较时写成 $\left(\frac{2^{1/\sqrt n}}{1.1}\right)^n$。</x-hint>
<x-ans>
<p>(1) 由<x-ref to="thm-ladder"></x-ref>，$\frac{\ln n}{n^{\alpha/k}}\to0$，$k$ 个这样的无穷小量之积仍趋于 $0$。</p>
<p>(2) $(\ln n)^{10}\ll n^{0.1}\ll n^{10}\ll2^{\sqrt n}\ll1.1^n\ll n!\ll n^n$。</p>
<ul>
<li>$(\ln n)^{10}\ll n^{0.1}$ 由 (1)；$\frac{n^{0.1}}{n^{10}}=\frac1{n^{9.9}}\to0$。</li>
<li>$n^{10}\ll2^{\sqrt n}$：令 $m=[\sqrt n]$，则 $n<(m+1)^2$，$2^{\sqrt n}\ge2^m$，所以 $0<\frac{n^{10}}{2^{\sqrt n}}<\frac{(m+1)^{20}}{2^m}=2\cdot\frac{(m+1)^{20}}{2^{m+1}}$，当 $n\to\infty$ 时 $m\to\infty$，右边趋于 $0$。</li>
<li>$2^{\sqrt n}\ll1.1^n$：$\frac{2^{\sqrt n}}{1.1^n}=\left(\frac{2^{1/\sqrt n}}{1.1}\right)^n$。由于 $1<2^{1/\sqrt n}\le2^{1/m}\to1$（<x-ref to="2-2/ex-root"></x-ref>），从某项起 $2^{1/\sqrt n}<1.05$，于是 $0<\frac{2^{\sqrt n}}{1.1^n}<\left(\frac{1.05}{1.1}\right)^n\to0$。</li>
<li>$1.1^n\ll n!\ll n^n$ 由<x-ref to="thm-ladder"></x-ref>。</li>
</ul>
<x-remark>$2^{\sqrt n}$ 比任何多项式都增长得快，又比任何指数 $a^n$（$a>1$）都慢，称为“亚指数”增长，一些大整数分解算法的运行时间就是这一类型。另外注意，$(\ln n)^{10}$ 在 $3\le n<10^{281}$ 左右的范围内都大于 $n^{0.1}$——排序说的只是最终的情形。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="加权平均的极限">
<p>设 $\lim\limits_{n\to\infty}a_n=a$。(1) 证明 $\displaystyle\lim_{n\to\infty}\frac{a_1+2a_2+\cdots+na_n}{n^2}=\frac a2$；(2) 求 $\displaystyle\lim_{n\to\infty}\frac{1^2a_1+2^2a_2+\cdots+n^2a_n}{n^3}$。</p>
<x-hint>用 Stolz 定理，分母分别取 $n^2$ 与 $n^3$。</x-hint>
<x-ans>
<p>(1) 令 $x_n=a_1+2a_2+\cdots+na_n$，$y_n=n^2$，则 $\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=\frac{na_n}{2n-1}=\frac{a_n}{2-\frac1n}\to\frac a2$。</p>
<p>(2) 同理，$\frac{n^2a_n}{n^3-(n-1)^3}=\frac{n^2a_n}{3n^2-3n+1}\to\frac a3$。</p>
<x-remark>当 $a_n\equiv1$ 时，(1)(2) 就是 $\frac{1+2+\cdots+n}{n^2}\to\frac12$ 与 $\frac{1^2+\cdots+n^2}{n^3}\to\frac13$。权重 $k$、$k^2$ 越大，靠后的项越重要，但极限只与 $a$ 和权重的增长方式有关。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="由比值的极限求根值的极限">
<p>设 $a_n>0$，$\lim\limits_{n\to\infty}\frac{a_{n+1}}{a_n}=q$（$q\ge0$）。证明 $\lim\limits_{n\to\infty}\sqrt[n]{a_n}=q$，由此求 $\displaystyle\lim_{n\to\infty}\sqrt[n]{\binom{2n}n}$，并举例说明逆命题不成立。</p>
<x-check answer="4">$\displaystyle\lim\sqrt[n]{\binom{2n}n}=$</x-check>
<x-hint>令 $c_1=a_1$，$c_k=\frac{a_k}{a_{k-1}}$（$k\ge2$），则 $a_n=c_1c_2\cdots c_n$，再用 §2.2 习题中“几何平均的极限”。</x-hint>
<x-ans>
<p>$c_k\to q$，且 $\sqrt[n]{a_n}=\sqrt[n]{c_1c_2\cdots c_n}$ 是 $c_1,\cdots,c_n$ 的几何平均，由 §2.2 习题的结论（$q=0$ 时也成立），它趋于 $q$。</p>
<p>对 $a_n=\binom{2n}n$：$\frac{a_{n+1}}{a_n}=\frac{(2n+2)(2n+1)}{(n+1)^2}=\frac{2(2n+1)}{n+1}\to4$，所以 $\sqrt[n]{\binom{2n}n}\to4$。</p>
<p>逆命题不成立：$a_n=2+(-1)^n$ 满足 $1\le a_n\le3$，所以 $\sqrt[n]{a_n}\to1$；但 $\frac{a_{n+1}}{a_n}$ 在 $3$ 与 $\frac13$ 之间交替，没有极限。</p>
<x-remark>$\sqrt[n]{\binom{2n}n}$ 收敛得很慢：$n=10,100,1000$ 时分别约为 $3.36$、$3.89$、$3.98$。原因是 $\binom{2n}n\approx\frac{4^n}{\sqrt{\pi n}}$，多出的因子 $\frac1{\sqrt{\pi n}}$ 开 $n$ 次方后才慢慢趋于 $1$。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="调和数列的上下界">
<p>(1) 证明：对一切正整数 $n$，$1+\frac12\left[\log_2n\right]\le H_n\le1+\log_2n$。(2) 由 (1) 的上界，要使 $H_n>10$，$n$ 必须大于多少？由下界，$n$ 不小于多少时一定有 $H_n>10$（取 $2$ 的方幂）？</p>
<x-check answer="512">(2) 由上界：$n$ 必须大于</x-check>
<x-check answer="524288">由下界：只要 $n\ge$</x-check>
<x-hint>设 $2^m\le n<2^{m+1}$。下界用<x-ref to="ex-harm"></x-ref>；上界把 $H_{2^{m+1}-1}$ 分成 $m+1$ 段，第 $j$ 段为 $\frac1{2^j}+\cdots+\frac1{2^{j+1}-1}$。</x-hint>
<x-ans>
<p>(1) 设 $m=[\log_2n]$，则 $2^m\le n<2^{m+1}$。下界：$H_n\ge H_{2^m}\ge1+\frac m2$。上界：</p>
$$H_n\le H_{2^{m+1}-1}=\sum_{j=0}^m\left(\frac1{2^j}+\cdots+\frac1{2^{j+1}-1}\right)\le\sum_{j=0}^m2^j\cdot\frac1{2^j}=m+1\le1+\log_2n.$$
<p>(2) 由上界，$H_n>10$ 要求 $1+\log_2n>10$，即 $n>2^9=512$。由下界，只要 $1+\frac12[\log_2n]>10$，即 $[\log_2n]\ge19$，也就是 $n\ge2^{19}=524288$，就一定有 $H_n>10$。用计算机可以算出，使 $H_n>10$ 的最小的 $n$ 是 $12367$，确实介于两者之间。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="最后一项说了算">
<p>求 $\displaystyle\lim_{n\to\infty}\frac{1^1+2^2+3^3+\cdots+n^n}{n^n}$。</p>
<x-check answer="1">极限值</x-check>
<x-hint>用 Stolz 定理，$y_n=n^n$；或者直接估计前 $n-1$ 项之和与 $n^n$ 的比。</x-hint>
<x-ans>
<p>令 $x_n=1^1+\cdots+n^n$，$y_n=n^n$，$\{y_n\}$ 严格增加且趋于 $+\infty$。</p>
$$\frac{x_n-x_{n-1}}{y_n-y_{n-1}}=\frac{n^n}{n^n-(n-1)^{n-1}}=\frac1{1-\frac{(n-1)^{n-1}}{n^n}},$$
<p>而 $0<\frac{(n-1)^{n-1}}{n^n}<\frac{n^{n-1}}{n^n}=\frac1n\to0$，所以增量之比趋于 $1$，原极限为 $1$。</p>
<x-remark>和式几乎完全由最后一项决定，但收敛并不快：$n=10$ 时比值约为 $1.0405$，$n=20$ 时约为 $1.0193$，误差大约是 $\frac1{en}$。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="一个递推数列的增长速度">
<p>设 $x_1=1$，$x_{n+1}=x_n+\frac1{x_n}$。(1) 证明 $x_n\to+\infty$；(2) 证明 $\displaystyle\lim_{n\to\infty}\frac{x_n}{\sqrt{2n}}=1$。</p>
<x-check answer="sqrt(2)">$\displaystyle\lim\frac{x_n}{\sqrt n}=$</x-check>
<x-hint>考虑 $x_n^2$：$x_{n+1}^2=x_n^2+2+\frac1{x_n^2}$。</x-hint>
<x-ans>
<p>(1) 显然 $x_n>0$。$x_{n+1}^2=x_n^2+2+\frac1{x_n^2}>x_n^2+2$，所以 $x_n^2\ge x_1^2+2(n-1)=2n-1\to+\infty$，从而 $x_n\to+\infty$。</p>
<p>(2) 由 (1)，$x_{n+1}^2-x_n^2=2+\frac1{x_n^2}\to2$。以 $y_n=n$ 用 Stolz 定理，$\frac{x_n^2}n\to2$。再由 §2.2 习题（$a_n\to a\ge0$ 蕴含 $\sqrt{a_n}\to\sqrt a$），$\frac{x_n}{\sqrt n}\to\sqrt2$，即 $\frac{x_n}{\sqrt{2n}}\to1$。</p>
<x-remark>数值上：$x_{1000}\approx44.757$，而 $\sqrt{2000}\approx44.721$。“先平方再用 Stolz 定理”是研究递推数列增长速度的常用技巧，§2.4 的习题中还会遇到。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="隔项之差趋于零">
<p>设 $\lim\limits_{n\to\infty}(x_n-x_{n-2})=0$，证明 $\displaystyle\lim_{n\to\infty}\frac{x_n-x_{n-1}}n=0$。</p>
<x-hint>令 $z_n=(-1)^n(x_n-x_{n-1})$，计算 $z_n-z_{n-1}$。</x-hint>
<x-ans>
<p>令 $d_n=x_n-x_{n-1}$，$z_n=(-1)^nd_n$（$n\ge2$），则</p>
$$z_n-z_{n-1}=(-1)^n\left(d_n+d_{n-1}\right)=(-1)^n\left(x_n-x_{n-2}\right)\to0.$$
<p>以 $y_n=n$ 用 Stolz 定理，得 $\frac{z_n}n\to0$，于是 $\left|\frac{x_n-x_{n-1}}n\right|=\left|\frac{z_n}n\right|\to0$。</p>
<x-remark>巧妙之处在于乘上 $(-1)^n$：$d_n$ 本身的增量 $d_n-d_{n-1}$ 未必有极限，而 $d_n+d_{n-1}$ 由条件趋于 $0$，乘以 $(-1)^n$ 正好把“和”变成了“差”。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="算法能处理多大的问题">
<p>某计算机每秒执行 $10^9$ 次基本运算。(1) 运算量分别为 $n^2$、$n^3$、$2^n$ 的三种算法，一小时内能处理的最大规模 $n$ 各是多少？(2) 换用快 $1000$ 倍的计算机，$2^n$ 型算法一小时内能处理的最大规模是多少？</p>
<x-check answer="1897366">(1) $n^2$ 型</x-check>
<x-check answer="15326">$n^3$ 型</x-check>
<x-check answer="41">$2^n$ 型</x-check>
<x-check answer="51">(2) $2^n$ 型</x-check>
<x-hint>一小时共 $3.6\times10^{12}$ 次运算，分别解 $n^2\le3.6\times10^{12}$ 等不等式，取不超过解的最大整数。</x-hint>
<x-ans>
<p>(1) $n^2\le3.6\times10^{12}\iff n\le\sqrt{3.6}\times10^6\approx1897366.6$，所以最大为 $1897366$；$n^3\le3.6\times10^{12}\iff n\le15326.2$，最大为 $15326$；$2^n\le3.6\times10^{12}\iff n\le\log_2(3.6\times10^{12})\approx41.71$，最大为 $41$。</p>
<p>(2) $2^n\le3.6\times10^{15}\iff n\le51.68$，最大为 $51$。运算速度提高 $1000$ 倍，$2^n$ 型算法的规模只增加 $\log_21000\approx10$；而 $n^2$ 型的规模扩大到 $\sqrt{1000}\approx31.6$ 倍（约 $6\times10^7$），$n^3$ 型扩大到 $10$ 倍（约 $1.5\times10^5$）。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="指数增长的威力">
<p>(1) 一张厚 $0.1$ mm 的纸，假设可以无限对折，至少对折多少次，厚度能超过地球到月球的距离（约 $384400$ km）？(2) Malthus 在《人口原理》中认为人口按几何级数增长，而生活资料按算术级数增长。设某地人口每年增长 $2\%$；粮食开始时可供养 $1.5$ 倍的当前人口，此后每年增加的粮食可多供养相当于初始人口 $5\%$ 的人。从第几年起，人口将超过粮食能供养的人数？</p>
<x-check answer="42" unit="次">(1)</x-check>
<x-check answer="91">(2) 第几年</x-check>
<x-hint>(1) 解 $0.1\times2^n>3.844\times10^{11}$（单位 mm）；(2) 以初始人口为单位，比较 $1.02^m$ 与 $1.5+0.05m$，可以用计算器逐步试算。</x-hint>
<x-ans>
<p>(1) $384400$ km $=3.844\times10^{11}$ mm，需 $2^n>3.844\times10^{12}$，即 $n>\log_2(3.844\times10^{12})\approx41.8$，所以至少 $42$ 次。对折 $41$ 次时厚度约 $22$ 万 km，$42$ 次时约 $44$ 万 km。</p>
<p>(2) 第 $m$ 年人口为 $1.02^m$，可供养人数为 $1.5+0.05m$。$m=90$ 时 $1.02^{90}\approx5.943<6.00$，$m=91$ 时 $1.02^{91}\approx6.062>6.05$，所以从第 $91$ 年起人口超过可供养人数。尽管开始时有 $50\%$ 的余量，指数增长最终总会超过线性增长。（历史上，技术进步使粮食产量远超线性增长，Malthus 的悲观预言并未在全球应验。）</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="集卡问题">
<p>某零食每包随机附赠 $n$ 种卡片中的一张，各种卡片出现的机会均等。可以证明，集齐全部 $n$ 种卡片平均需要购买 $nH_n=n\left(1+\frac12+\cdots+\frac1n\right)$ 包。(1) $n=6$ 时平均要买多少包？(2) 证明 $nH_n\to+\infty$，但 $\frac{nH_n}{n^2}\to0$；(3) 利用 $H_n\le1+\log_2n$，给出 $n=100$ 时平均购买包数的一个上界。</p>
<x-check answer="14.7" tol="0.01" unit="包">(1)</x-check>
<x-check answer="100*(1+log2(100))" tol="1" unit="包">(3) 上界</x-check>
<x-hint>公式的来历：已集到 $k$ 种时，每买一包得到新卡的概率是 $\frac{n-k}n$，平均要买 $\frac n{n-k}$ 包才能得到一张新卡，对 $k=0,1,\cdots,n-1$ 求和即得 $nH_n$。</x-hint>
<x-ans>
<p>(1) $6H_6=6\bigl(1+\frac12+\frac13+\frac14+\frac15+\frac16\bigr)=6\times\frac{49}{20}=14.7$ 包。</p>
<p>(2) $nH_n\ge n\to+\infty$；$\frac{nH_n}{n^2}=\frac{H_n}n\le\frac{1+\log_2n}n\to0$（<x-ref to="thm-ladder"></x-ref>）。</p>
<p>(3) $100H_{100}\le100(1+\log_2100)\approx764.4$ 包。实际值 $100H_{100}\approx518.7$ 包，是卡片种数的 $5$ 倍多：最后几种卡片最难集齐，只差最后一种时，平均要买 $100$ 包才能碰到它。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="排序算法的比较">
<p>对 $n$ 个数排序。“选择排序”的比较次数为 $\frac{n(n-1)}2$，“归并排序”的比较次数约为 $n\log_2n$。设计算机每秒做 $10^9$ 次比较。(1) $n=10^6$ 时，两种算法各需要多少秒？(2) 证明 $\displaystyle\lim_{n\to\infty}\frac{n\log_2n}{n(n-1)/2}=0$，并解释其含义。</p>
<x-check answer="500" tol="1" unit="秒">(1) 选择排序约</x-check>
<x-check answer="0.0199" tol="0.0005" unit="秒">归并排序约</x-check>
<x-hint>(2) 化为 $\frac{2}{\ln2}\cdot\frac{\ln n}{n-1}$，再用增长速度的阶梯。</x-hint>
<x-ans>
<p>(1) 选择排序：$\frac{10^6(10^6-1)}2\approx5\times10^{11}$ 次，约 $500$ 秒；归并排序：$10^6\times\log_210^6\approx1.99\times10^7$ 次，约 $0.02$ 秒。</p>
<p>(2) $\frac{n\log_2n}{n(n-1)/2}=\frac2{\ln2}\cdot\frac{\ln n}{n-1}$，而 $\frac{\ln n}{n-1}=\frac{\ln n}n\cdot\frac n{n-1}\to0$。含义：$n\log_2n$ 是比 $n^2$ 低阶的无穷大量，规模越大，归并排序的优势越明显；$n=10^6$ 时两者已相差约 $25000$ 倍。</p>
</x-ans>
</x-prob>
`);
