/* §3.2 连续函数 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("3-2", String.raw`
<x-goal>
<ul>
<li>理解函数在一点连续、单侧连续以及在区间上连续的定义，会用 $\eps$-$\delta$ 语言和数列语言叙述并证明函数的连续性。</li>
<li>掌握不连续点的分类（跳跃点、第二类不连续点、可去不连续点），会判断分段函数、由极限式定义的函数的不连续点及其类型。</li>
<li>掌握连续函数的四则运算、反函数连续性定理与复合函数的连续性定理，理解“初等函数在其定义区间上连续”。</li>
<li>会利用连续性计算极限，熟练掌握 $\frac{\ln(1+x)}x$、$\frac{e^x-1}x$、$\frac{(1+x)^\alpha-1}x$ 等常用极限以及 $1^\infty$ 型极限的算法。</li>
<li>知道单调函数的不连续点只能是跳跃点并且至多可列个，能用连续与跳跃的观点分析阶梯计价、分段计税等实际问题。</li>
</ul>
</x-goal>
<p>§3.1 的许多例子中，函数在 $x_0$ 处的极限恰好等于它在 $x_0$ 处的值：$\lim\limits_{x\to x_0}\sin x=\sin x_0$，$\lim\limits_{x\to x_0}\sqrt x=\sqrt{x_0}$，……这类函数的图像在 $x_0$ 附近是“连在一起”的：自变量变化很小时，函数值的变化也很小。另一些函数则会在某些点“断开”。例如某快递公司规定：首重 $1$ kg 收费 $12$ 元，续重每 kg 收费 $2$ 元，不足 $1$ kg 按 $1$ kg 计。包裹从 $1$ kg 增加到 $1.001$ kg，运费从 $12$ 元一下子跳到 $14$ 元——运费作为重量的函数在 $w=1$ 处“断开”了。本节把“连在一起”精确化为连续的定义，研究不连续点的类型，并证明连续函数经过四则运算、求反函数、复合以后仍然连续，由此得到“初等函数在其定义区间上连续”这一重要结论。它给出了计算极限最基本的方法：直接代入。</p>

<h2 id="def">连续函数的定义</h2>
<x-def t="连续" id="def-cont">
<p>设函数 $f(x)$ 在点 $x_0$ 的某个邻域 $O(x_0,\rho)$ 中有定义。如果</p>
$$\lim_{x\to x_0}f(x)=f(x_0),$$
<p>则称函数 $f(x)$ 在点 $x_0$ <em>连续</em>，称 $x_0$ 是 $f(x)$ 的<em>连续点</em>。用 $\eps$-$\delta$ 语言表述：</p>
$$f(x)\ \text{在}\ x_0\ \text{连续}\iff\forall\eps>0,\ \exists\delta>0,\ \forall x\ (|x-x_0|<\delta):\ |f(x)-f(x_0)|<\eps.$$
</x-def>
<x-note>
<ul>
<li>与极限的定义相比，这里要求 $f$ 在 $x_0$ <em>处</em>有定义，并且条件“$0<|x-x_0|<\delta$”可以放宽为“$|x-x_0|<\delta$”：$x=x_0$ 时 $|f(x)-f(x_0)|=0<\eps$ 自动成立。</li>
<li>“$f$ 在 $x_0$ 连续”包含三个要求：$f(x_0)$ 有定义；$\lim\limits_{x\to x_0}f(x)$ 存在；两者相等。只要有一条不满足，$f$ 就在 $x_0$ 不连续。</li>
<li>记 $\Delta x=x-x_0$（自变量的增量），$\Delta y=f(x_0+\Delta x)-f(x_0)$（函数值的增量），则 $f$ 在 $x_0$ 连续等价于 $\lim\limits_{\Delta x\to0}\Delta y=0$：自变量的增量趋于 $0$ 时，函数值的增量也趋于 $0$。</li>
</ul>
</x-note>
<x-prop t="连续性的数列刻画" id="prop-seqc">
<p>设 $f(x)$ 在 $O(x_0,\rho)$ 中有定义，则 $f(x)$ 在 $x_0$ 连续的充分必要条件是：对于任意满足 $x_n\in O(x_0,\rho)$ 且 $\lim\limits_{n\to\infty}x_n=x_0$ 的数列 $\{x_n\}$，都有</p>
$$\lim_{n\to\infty}f(x_n)=f(x_0)=f\Big(\lim_{n\to\infty}x_n\Big).$$
<x-proof><p>必要性：任给 $\eps>0$，取连续定义中的 $\delta$。由 $x_n\to x_0$，存在 $N$，当 $n>N$ 时 $|x_n-x_0|<\delta$，从而 $|f(x_n)-f(x_0)|<\eps$。充分性：条件对各项都不等于 $x_0$ 的数列当然成立，由 Heine 定理（<x-ref to="3-1/thm-heine"></x-ref>）得 $\lim\limits_{x\to x_0}f(x)=f(x_0)$。<span class="qed">∎</span></p></x-proof>
</x-prop>
<p>这个命题说明：对连续函数而言，“求极限”与“求函数值”这两种运算可以交换次序。与 Heine 定理不同，这里不必要求 $x_n\ne x_0$。</p>
<x-def t="单侧连续" id="def-sidec">
<p>设 $f(x)$ 在 $[x_0,x_0+\rho)$ 上有定义。如果 $f(x_0+)=f(x_0)$，即 $\lim\limits_{x\to x_0^+}f(x)=f(x_0)$，则称 $f(x)$ 在点 $x_0$ <em>右连续</em>。类似地，设 $f(x)$ 在 $(x_0-\rho,x_0]$ 上有定义，如果 $f(x_0-)=f(x_0)$，则称 $f(x)$ 在点 $x_0$ <em>左连续</em>。</p>
</x-def>
<p>由 <x-ref to="3-1/thm-side"></x-ref>，$f(x)$ 在 $x_0$ 连续当且仅当它在 $x_0$ 既左连续又右连续。</p>
<x-def t="区间上的连续函数" id="def-intc">
<p>如果 $f(x)$ 在开区间 $(a,b)$ 中的每一点都连续，则称 $f(x)$ 在 $(a,b)$ 上连续。如果 $f(x)$ 在 $(a,b)$ 上连续，并且在左端点 $a$ 右连续、在右端点 $b$ 左连续，则称 $f(x)$ 在闭区间 $[a,b]$ 上连续。$[a,b]$ 上连续函数的全体记作 $C[a,b]$。对半开区间以及 $[a,+\infty)$、$(-\infty,+\infty)$ 等无限区间可以类似地定义连续性：属于区间的端点只要求单侧连续。</p>
</x-def>
<x-intuit t="“一笔画成”">
<p>区间上的连续函数，图像是一条没有“断口”的曲线，可以一笔画成。这只是直观印象：§3.4 将证明闭区间上连续函数的图像确实不能“跳过”任何中间的值；而 <x-ref to="ex-xd"></x-ref> 与下面的 Riemann 函数说明，在单个点处的连续性可能与“一笔画成”的直观相去甚远。</p>
</x-intuit>

<x-ex t="几个基本的连续函数" id="ex-basic">
<p>证明：(1) $\sin x$、$\cos x$ 在 $(-\infty,+\infty)$ 上连续；(2) $|x|$ 在 $(-\infty,+\infty)$ 上连续；(3) $\sqrt x$ 在 $[0,+\infty)$ 上连续。</p>
<x-sol l="证明">
<p>(1) 这就是 <x-ref to="3-1/ex-sincos"></x-ref>。</p>
<p>(2) 由三角不等式（<x-ref to="1-2/thm-tri"></x-ref>），$\big||x|-|x_0|\big|\le|x-x_0|$，任给 $\eps>0$ 取 $\delta=\eps$ 即可。</p>
<p>(3) 当 $x_0>0$ 时，<x-ref to="3-1/ex-sqrt"></x-ref> 已经证明 $\lim\limits_{x\to x_0}\sqrt x=\sqrt{x_0}$。在 $x_0=0$ 处只需证明右连续：任给 $\eps>0$，取 $\delta=\eps^2$，当 $0\le x<\delta$ 时 $|\sqrt x-0|=\sqrt x<\eps$。<span class="qed">∎</span></p>
</x-sol>
</x-ex>
<x-ex t="取整函数的连续性" id="ex-floorc">
<p>讨论 $f(x)=[x]$ 的连续性。</p>
<x-sol>
<p>设 $n$ 为整数，则当 $n\le x<n+1$ 时 $[x]=n$（<x-ref to="1-2/ex-floor"></x-ref>）。若 $x_0\in(n,n+1)$，取 $\delta=\min\{x_0-n,\ n+1-x_0\}$，则 $f$ 在 $O(x_0,\delta)$ 中恒等于 $n$，所以 $f$ 在 $x_0$ 连续。在整数点 $n$ 处，</p>
$$f(n+)=\lim_{x\to n^+}[x]=n=f(n),\qquad f(n-)=\lim_{x\to n^-}[x]=n-1\ne f(n),$$
<p>所以 $[x]$ 在每个整数点右连续而不左连续，从而不连续；在其余各点都连续。</p>
</x-sol>
</x-ex>
<x-ex t="只在一点连续的函数" id="ex-xd">
<p>设 $D(x)$ 是 Dirichlet 函数（$x$ 为有理数时 $D(x)=1$，$x$ 为无理数时 $D(x)=0$）。证明 $f(x)=xD(x)$ 只在 $x=0$ 处连续。</p>
<x-sol l="证明">
<p>由于 $|f(x)-f(0)|=|x|D(x)\le|x|$，任给 $\eps>0$ 取 $\delta=\eps$，当 $|x|<\delta$ 时 $|f(x)-f(0)|<\eps$，所以 $f$ 在 $0$ 处连续。</p>
<p>设 $x_0\ne0$。由稠密性（<x-ref to="2-1/thm-dense"></x-ref>），对每个正整数 $n$，可以在区间 $\left(x_0,x_0+\frac1n\right)$ 中取一个有理数 $r_n$ 和一个无理数 $s_n$。于是 $r_n\to x_0$，$s_n\to x_0$，且各项都不等于 $x_0$，而</p>
$$f(r_n)=r_n\to x_0,\qquad f(s_n)=0\to0.$$
<p>由于 $x_0\ne0$，两个极限不相等，由 Heine 定理，$\lim\limits_{x\to x_0}f(x)$ 不存在，所以 $f$ 在 $x_0$ 不连续。<span class="qed">∎</span></p>
</x-sol>
<x-remark>Dirichlet 函数本身处处没有极限（<x-ref to="3-1/ex-dirichlet"></x-ref>），因而处处不连续；乘上因子 $x$ 以后，$0$ 附近的函数值被“压”向 $0$，于是在 $0$ 处连续。可见连续性是一个<em>逐点</em>的概念：函数可以只在个别点连续。</x-remark>
</x-ex>

<h2 id="arith">连续函数的四则运算</h2>
<x-thm t="连续函数的四则运算" id="thm-carith">
<p>设 $f(x)$ 与 $g(x)$ 都在点 $x_0$ 连续，则 $\alpha f(x)+\beta g(x)$（$\alpha,\beta$ 为常数）与 $f(x)g(x)$ 都在 $x_0$ 连续；如果还有 $g(x_0)\ne0$，则 $\frac{f(x)}{g(x)}$ 也在 $x_0$ 连续。</p>
<x-proof><p>$f$、$g$ 都在 $x_0$ 的某个邻域中有定义。若 $g(x_0)\ne0$，由函数极限的局部保号性（<x-ref to="3-1/cor-lsign"></x-ref>），$g$ 在 $x_0$ 的某个去心邻域中与 $g(x_0)$ 同号，再加上 $g(x_0)\ne0$，可知 $g$ 在 $x_0$ 的某个邻域中处处不为 $0$，所以 $\frac fg$ 在这个邻域中有定义。由函数极限的四则运算法则（<x-ref to="3-1/thm-farith"></x-ref>），</p>
$$\lim_{x\to x_0}\frac{f(x)}{g(x)}=\frac{\lim\limits_{x\to x_0}f(x)}{\lim\limits_{x\to x_0}g(x)}=\frac{f(x_0)}{g(x_0)}.$$
<p>其余两个结论同理可证。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>常数函数与 $f(x)=x$ 显然处处连续，反复应用 <x-ref to="thm-carith"></x-ref> 可知：多项式 $P(x)=a_0x^n+a_1x^{n-1}+\cdots+a_n$ 在 $(-\infty,+\infty)$ 上连续；有理函数 $\frac{P(x)}{Q(x)}$ 在使 $Q(x)\ne0$ 的每一点连续；$\tan x=\frac{\sin x}{\cos x}$、$\cot x$、$\sec x$、$\csc x$ 在各自定义域中的每一点连续。对这些函数，求极限只需“代入”，例如</p>
$$\lim_{x\to2}\frac{x^3-3x+1}{x^2+1}=\frac{8-6+1}{4+1}=\frac35.$$
<x-warn><p>四则运算定理只说“连续 $\pm$、$\times$、$\div$ 连续仍连续”，反过来不成立。例如 $f(x)=g(x)=\begin{cases}1,&x\ge0,\\-1,&x<0\end{cases}$ 在 $0$ 处都不连续，而 $f(x)g(x)\equiv1$ 处处连续；$f(x)+\big(-f(x)\big)\equiv0$ 也处处连续。不过“连续 $+$ 不连续”一定不连续：若 $f$ 连续而 $f+g$ 连续，则 $g=(f+g)-f$ 也连续。</p></x-warn>
<x-ex t="指数函数的连续性" id="ex-exp">
<p>设 $a>0$，$a\ne1$。证明指数函数 $a^x$ 在 $(-\infty,+\infty)$ 上连续。</p>
<x-analysis><p>先证明 $\lim\limits_{x\to0}a^x=1$，即 $a^x$ 在 $0$ 处连续；再利用 $a^x=a^{x_0}\cdot a^{x-x_0}$，把一般的点“平移”到 $0$。</p></x-analysis>
<x-sol l="证明">
<p>先设 $a>1$。由 <x-ref to="2-2/ex-root"></x-ref>，$\lim\limits_{n\to\infty}a^{\frac1n}=1$，从而 $\lim\limits_{n\to\infty}a^{-\frac1n}=\lim\limits_{n\to\infty}\frac1{a^{1/n}}=1$。任给 $\eps>0$，存在正整数 $n$，使得</p>
$$1-\eps<a^{-\frac1n}<1<a^{\frac1n}<1+\eps.$$
<p>取 $\delta=\frac1n$。由于 $a>1$ 时 $a^x$ 严格单调增加，当 $|x|<\delta$ 时 $a^{-\frac1n}<a^x<a^{\frac1n}$，所以 $|a^x-1|<\eps$。这就证明了 $\lim\limits_{x\to0}a^x=1$。</p>
<p>对任意 $x_0$，当 $|x-x_0|<\delta$ 时，</p>
$$\left|a^x-a^{x_0}\right|=a^{x_0}\left|a^{x-x_0}-1\right|<a^{x_0}\eps.$$
<p>由于 $\eps$ 是任意的，这就证明了 $\lim\limits_{x\to x_0}a^x=a^{x_0}$。</p>
<p>若 $0<a<1$，则 $\frac1a>1$，而 $a^x=\frac1{(1/a)^x}$，由 <x-ref to="thm-carith"></x-ref> 知它也处处连续。<span class="qed">∎</span></p>
</x-sol>
<x-remark>证明中用到了实数指数幂的运算法则 $a^xa^y=a^{x+y}$，以及 $a>1$ 时 $a^x$ 的严格单调性。实数指数幂可以用有理数指数幂的确界来定义（例如 $a>1$ 时 $a^x=\sup\{a^r\mid r\in\Q,\ r<x\}$），这些性质都可以由定义严格证明，这里不再展开。由本例与四则运算，双曲函数 $\sh x=\frac{e^x-e^{-x}}2$、$\ch x=\frac{e^x+e^{-x}}2$ 也在 $(-\infty,+\infty)$ 上连续。</x-remark>
</x-ex>
`);
MA.add("3-2", String.raw`
<h2 id="disc">不连续点的类型</h2>
<p>设 $f(x)$ 在 $x_0$ 的某个去心邻域中有定义。如果 $f(x)$ 在 $x_0$ 不连续（包括 $f$ 在 $x_0$ 处没有定义的情形），就称 $x_0$ 是 $f(x)$ 的<em>不连续点</em>，也称<em>间断点</em>。按照左、右极限的情况，不连续点可以分为三类。</p>
<x-def t="不连续点的类型" id="def-disc">
<p>设 $x_0$ 是 $f(x)$ 的不连续点。</p>
<p>(1) 若 $f(x_0+)$ 与 $f(x_0-)$ 都存在，但 $f(x_0+)\ne f(x_0-)$，则称 $x_0$ 是 $f(x)$ 的<em>第一类不连续点</em>，也称<em>跳跃点</em>，并称 $f(x_0+)-f(x_0-)$ 为 $f$ 在 $x_0$ 处的<em>跃度</em>。</p>
<p>(2) 若 $f(x_0+)$ 与 $f(x_0-)$ 中至少有一个不存在，则称 $x_0$ 是 $f(x)$ 的<em>第二类不连续点</em>。</p>
<p>(3) 若 $f(x_0+)=f(x_0-)$，即 $\lim\limits_{x\to x_0}f(x)$ 存在，但它不等于 $f(x_0)$，或者 $f$ 在 $x_0$ 处没有定义，则称 $x_0$ 是 $f(x)$ 的<em>第三类不连续点</em>，也称<em>可去不连续点</em>。</p>
</x-def>
<x-note>
<ul>
<li>这里“极限存在”指存在有限的极限。单侧极限为 $+\infty$ 或 $-\infty$ 时也算“不存在”，对应的不连续点属于第二类，常称为<em>无穷型</em>；单侧极限因振荡而不存在的，常称为<em>振荡型</em>。</li>
<li>“可去”的意思是：只要把 $f(x_0)$ 的值修改（或补充定义）为 $\lim\limits_{x\to x_0}f(x)$，得到的新函数就在 $x_0$ 连续。跳跃点与第二类不连续点无论怎样修改 $f(x_0)$ 都不能变成连续点。</li>
</ul>
</x-note>
<x-warn><p>不同教材对不连续点的分类方法不同。许多教材（例如华东师范大学数学科学学院编的《数学分析》、同济大学数学系编的《高等数学》）把左、右极限都存在的不连续点——跳跃点与可去点——统称为<em>第一类间断点</em>，其余的称为<em>第二类间断点</em>。本站与陈纪修等编的教材一致，分为跳跃点、第二类、可去点三类。两种分类中“第二类”的含义相同；阅读其他书籍或参加考试时，要注意所用的约定。</p></x-warn>

<x-ex t="常见的不连续点" id="ex-types">
<p>判断下列函数在 $x=0$ 处的不连续点类型：(1) $\sgn x$；(2) $\frac{\sin x}x$；(3) $\frac1x$；(4) $e^{\frac1x}$；(5) $\sin\frac1x$。</p>
<x-sol>
<p>(1) $\sgn(0-)=-1$，$\sgn(0+)=1$，所以 $0$ 是跳跃点（第一类），跃度为 $2$。</p>
<p>(2) $\lim\limits_{x\to0}\frac{\sin x}x=1$（<x-ref to="3-1/thm-sinx"></x-ref>），而函数在 $0$ 处没有定义，所以 $0$ 是可去不连续点（第三类）。补充定义 $f(0)=1$ 后，得到的函数在 $(-\infty,+\infty)$ 上连续。</p>
<p>(3) $\lim\limits_{x\to0^+}\frac1x=+\infty$，右极限不存在（不是有限数），所以 $0$ 是第二类不连续点（无穷型）。</p>
<p>(4) 由 <x-ref to="3-1/ex-e1x"></x-ref>，$e^{\frac1x}$ 在 $0$ 处的左极限为 $0$，右极限为 $+\infty$。只要有一侧极限不存在，就是第二类不连续点。</p>
<p>(5) <x-ref to="3-1/ex-sin1x"></x-ref> 中的两个数列都从右侧趋于 $0$，相应的函数值数列极限不同，所以右极限不存在；$\sin\frac1x$ 是奇函数，左极限也不存在。$0$ 是第二类不连续点（振荡型）。</p>
</x-sol>
<x-remark>Dirichlet 函数的每一点都是第二类不连续点；取整函数 $[x]$ 的每个整数点都是跳跃点，跃度为 $1$（<x-ref to="ex-floorc"></x-ref>）。</x-remark>
</x-ex>
<x-viz type="disc" t="不连续点的类型"><p>选择例子，或输入函数、$x_0$ 以及 $f(x_0)$ 的值（填“无定义”表示 $f$ 在 $x_0$ 处没有定义，留空则直接用表达式计算）。演示用 $x_0\pm h$（$h=10^{-5}\sim10^{-8}$）处的函数值估计左、右极限，并按上面的定义判断类型；拖动“放大倍数”可以看清 $x_0$ 附近的图像。</p></x-viz>
<x-ex t="判断不连续点的类型" id="ex-classify">
<p>求 $f(x)=\frac{x^2-x}{|x|\left(x^2-1\right)}$ 的不连续点，并判断其类型。</p>
<x-sol>
<p>$f$ 的定义域是 $x\ne0,\pm1$。由 <x-ref to="thm-carith"></x-ref> 与 $|x|$ 的连续性，$f$ 在定义域中的每一点都连续。当 $x\ne0,\pm1$ 时，</p>
$$f(x)=\frac{x(x-1)}{|x|(x-1)(x+1)}=\frac{\sgn x}{x+1}.$$
<p>在 $x=0$ 处，$f(0+)=1$，$f(0-)=-1$，所以 $0$ 是跳跃点，跃度为 $2$。</p>
<p>在 $x=1$ 处，$\lim\limits_{x\to1}f(x)=\lim\limits_{x\to1}\frac1{x+1}=\frac12$，而 $f$ 在 $1$ 处无定义，所以 $1$ 是可去不连续点，补充定义 $f(1)=\frac12$ 就在 $1$ 处连续了。</p>
<p>在 $x=-1$ 附近有 $x<0$，$f(x)=-\frac1{x+1}$，所以 $\lim\limits_{x\to-1^+}f(x)=-\infty$，$\lim\limits_{x\to-1^-}f(x)=+\infty$，$-1$ 是第二类不连续点。</p>
</x-sol>
<x-remark>化简时约去了因子 $x-1$，但不能因此认为 $f$ 在 $x=1$ 处有定义：函数的定义域由原来的表达式决定，约分只在 $x\ne1$ 时成立，它的作用是帮助我们求极限。</x-remark>
</x-ex>
<x-ex t="Riemann 函数" id="ex-riemann">
<p>定义 $(0,1)$ 上的 <em>Riemann 函数</em></p>
$$R(x)=\begin{cases}\dfrac1q,&x=\dfrac pq\ (p,q\ \text{为互质的正整数}),\\[2mm]0,&x\ \text{为无理数}.\end{cases}$$
<p>证明：对任意 $x_0\in[0,1]$，$\lim\limits_{x\to x_0}R(x)=0$（在端点处指单侧极限）。从而 $R(x)$ 在 $(0,1)$ 中的无理点处连续，在有理点处不连续，并且有理点都是可去不连续点。</p>
<x-analysis><p>函数值“大”的点很少：$R(x)\ge\eps$ 意味着 $x=\frac pq$ 且 $q\le\frac1\eps$，这样的分数只有有限个。只要 $x_0$ 的去心邻域避开这有限个点，邻域中的函数值就都小于 $\eps$。</p></x-analysis>
<x-sol l="证明">
<p>任给 $\eps>0$。满足 $R(x)\ge\eps$ 的 $x\in(0,1)$ 必是分数 $\frac pq$，且 $q\le\frac1\eps$，$1\le p<q$，这样的分数至多有 $\frac1{\eps^2}$ 个。记它们中不等于 $x_0$ 的为 $t_1,t_2,\cdots,t_k$，取</p>
$$\delta=\min\big\{|t_1-x_0|,|t_2-x_0|,\cdots,|t_k-x_0|\big\}>0$$
<p>（若 $k=0$，取 $\delta=1$）。当 $x\in(0,1)$ 且 $0<|x-x_0|<\delta$ 时，$x$ 既不是 $t_1,\cdots,t_k$ 中的任何一个，也不等于 $x_0$，所以 $0\le R(x)<\eps$。这就证明了 $\lim\limits_{x\to x_0}R(x)=0$。</p>
<p>若 $x_0$ 是无理数，则 $R(x_0)=0$，所以 $R$ 在 $x_0$ 连续；若 $x_0=\frac pq$ 是有理数，则 $R(x_0)=\frac1q\ne0$，极限存在但不等于函数值，所以 $x_0$ 是可去不连续点。<span class="qed">∎</span></p>
</x-sol>
<x-remark>与“一笔画成”的直观相反，Riemann 函数的连续点（无理点）与不连续点（有理点）都在 $(0,1)$ 中稠密：任何一个小区间里都既有连续点，又有不连续点。</x-remark>
</x-ex>
<x-viz type="plot" f="@riemann" xmin="0" xmax="1" ymin="-0.05" ymax="0.55" t="Riemann 函数"><p>图中画出了分母不太大的有理点 $\frac pq$ 处的函数值 $\frac1q$，无理点处的函数值 $0$ 画成红线。任意画一条水平线 $y=\eps$，线的上方只有有限个点——这正是 $R(x)$ 在每一点的极限都是 $0$ 的原因。</p></x-viz>

<x-thm t="单调函数的不连续点" id="thm-monodisc">
<p>设 $f(x)$ 在区间 $(a,b)$ 上单调，则 $f(x)$ 在 $(a,b)$ 中的不连续点都是跳跃点（第一类不连续点），并且不连续点至多有可列个。</p>
<x-proof><p>不妨设 $f$ 单调增加。由 <x-ref to="3-1/thm-monolim"></x-ref>，对每个 $x_0\in(a,b)$，$f(x_0-)$ 与 $f(x_0+)$ 都存在，且 $f(x_0-)\le f(x_0)\le f(x_0+)$。所以 $f$ 在 $x_0$ 不连续当且仅当 $f(x_0-)<f(x_0+)$，这时 $x_0$ 是跳跃点。</p>
<p>记 $E$ 为不连续点的全体。对每个 $x_0\in E$，开区间 $I_{x_0}=\big(f(x_0-),f(x_0+)\big)$ 非空，由稠密性可以在其中取定一个有理数 $r(x_0)$。若 $x_0<x_1$ 都属于 $E$，任取 $t\in(x_0,x_1)$，则</p>
$$f(x_0+)=\inf_{x_0<x<b}f(x)\le f(t)\le\sup_{a<x<x_1}f(x)=f(x_1-),$$
<p>所以区间 $I_{x_0}$ 与 $I_{x_1}$ 不相交，$r(x_0)\ne r(x_1)$。于是 $x_0\mapsto r(x_0)$ 是 $E$ 到有理数集 $\Q$ 的单射。$\Q$ 是可列集（<x-ref to="1-1/cor-q"></x-ref>），它的无限子集都是可列集，所以 $E$ 是有限集或可列集。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>单调函数的不连续点可以有无穷多个。例如 $f(x)=\dfrac1{[1/x]}$（$0<x\le1$）单调增加：当 $\frac1{n+1}<x\le\frac1n$ 时 $f(x)=\frac1n$。它在 $x=\frac12,\frac13,\cdots$ 处跳跃，跃度依次为 $1-\frac12,\ \frac12-\frac13,\cdots$。定理说的是：再多也只能是可列个，单调函数不可能在一个区间上“处处”跳跃。</p></x-note>
<x-app t="年终奖的“多发一元，少拿两千”">
<p>我国个人所得税规定，居民个人取得的全年一次性奖金可以选择单独计税：用奖金额除以 $12$ 得到的数，查“按月换算后的综合所得税率表”，确定适用税率 $r$ 与速算扣除数 $c$，应纳税额为 $T=\text{奖金}\times r-c$。税率表的前两档是：月度数额不超过 $3000$ 元的，$r=3\%$，$c=0$；超过 $3000$ 元至 $12000$ 元的，$r=10\%$，$c=210$。于是奖金 $x$（元）不超过 $144000$ 元时，</p>
$$T(x)=\begin{cases}0.03x,&0\le x\le36000,\\0.1x-210,&36000<x\le144000.\end{cases}$$
<p>$T(36000)=1080$，而 $T(36000+)=3600-210=3390$：$x=36000$ 是 $T$ 的跳跃点，跃度为 $2310$ 元。奖金为 $36000$ 元时税后收入为 $34920$ 元；奖金为 $36001$ 元时税额为 $3390.1$ 元，税后只有 $32610.9$ 元——多发 $1$ 元，到手反而少了 $2309.1$ 元。令 $x-T(x)=0.9x+210=34920$，解得 $x\approx38566.67$：奖金落在 $(36000,\ 38566.67)$ 中时，税后收入都不如 $36000$ 元，这就是所谓的“盲区”。</p>
<p>与此对照，综合所得的年度税率表采用超额累进：只对超过 $36000$ 元的<em>那一部分</em>按 $10\%$ 计税，税额函数为 $T_1(x)=0.03x\ (0\le x\le36000)$，$T_1(x)=0.1x-2520\ (36000<x\le144000)$。两段在 $36000$ 处的值都是 $1080$，$T_1$ 是连续函数，速算扣除数 $2520$ 正是为了让两段在分界点“接上”而设计的。连续的税额函数保证了“多挣一点，多交一点税，但到手的钱不会变少”。</p>
</x-app>
`);
MA.add("3-2", String.raw`
<h2 id="inv">反函数连续性定理</h2>
<p>由 <x-ref to="1-2/thm-inv"></x-ref>，严格单调的函数存在反函数，并且反函数具有相同的单调性。下面的定理说明，严格单调函数的反函数一定是连续的——即使原来的函数不连续。</p>
<x-thm t="反函数连续性定理" id="thm-invc">
<p>设函数 $y=f(x)$ 在区间 $I$ 上严格单调增加，值域为 $J=f(I)$，则其反函数 $x=f^{-1}(y)$ 在 $J$ 上严格单调增加并且连续：对任意 $y_0\in J$ 和任意 $\eps>0$，存在 $\delta>0$，当 $y\in J$ 且 $|y-y_0|<\delta$ 时，$\left|f^{-1}(y)-f^{-1}(y_0)\right|<\eps$。对严格单调减少的函数有同样的结论（反函数严格单调减少）。</p>
<x-proof><p>先证 $f^{-1}$ 严格单调增加。设 $y_1<y_2$ 都属于 $J$，$x_i=f^{-1}(y_i)$（$i=1,2$）。若 $x_1\ge x_2$，则 $y_1=f(x_1)\ge f(x_2)=y_2$，矛盾，所以 $x_1<x_2$。</p>
<p>再证连续性。设 $y_0=f(x_0)\in J$，$x_0\in I$，任给 $\eps>0$。先设 $x_0$ 是 $I$ 的内点，并且不妨设 $\eps$ 足够小，使 $x_0\pm\eps\in I$（对较小的 $\eps$ 找到的 $\delta$ 对较大的 $\eps$ 同样适用）。由 $f$ 严格单调增加，$f(x_0-\eps)<y_0<f(x_0+\eps)$。取</p>
$$\delta=\min\big\{f(x_0+\eps)-y_0,\ y_0-f(x_0-\eps)\big\}>0.$$
<p>当 $y\in J$ 且 $|y-y_0|<\delta$ 时，$f(x_0-\eps)<y<f(x_0+\eps)$，这三个数都属于 $J$，由 $f^{-1}$ 的严格单调性，</p>
$$x_0-\eps<f^{-1}(y)<x_0+\eps,\quad\text{即}\quad\left|f^{-1}(y)-x_0\right|<\eps.$$
<p>若 $x_0$ 是 $I$ 的左端点（属于 $I$），则 $y_0$ 是 $J$ 的最小值，$J$ 中只有 $y\ge y_0$ 的点，取 $\delta=f(x_0+\eps)-y_0$ 即可；右端点的情形类似。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note>
<ul>
<li>定理并不要求 $f$ 连续。但若 $f$ 不连续，值域 $J$ 会有“缺口”，$f^{-1}$ 是定义在这样一个集合上的函数。例如 $f(x)=x\ (x<0)$，$f(x)=x+1\ (x\ge0)$ 严格单调增加，在 $0$ 处跳跃，$J=(-\infty,0)\cup[1,+\infty)$，而反函数 $f^{-1}(y)=y\ (y<0)$，$f^{-1}(y)=y-1\ (y\ge1)$ 在 $J$ 上连续。</li>
<li>若 $f$ 在区间 $I$ 上连续且严格单调，则 $J$ 也是一个区间（这要用到 §3.4 的中间值定理），这时 $f^{-1}$ 就是区间 $J$ 上通常意义下的连续函数。例如 $f$ 在 $[a,b]$ 上连续且严格单调增加时，$f^{-1}$ 在 $[f(a),f(b)]$ 上连续且严格单调增加。</li>
</ul>
</x-note>
<x-ex t="反三角函数、对数函数与根式的连续性" id="ex-invelem">
<p>证明：$\arcsin x$、$\arccos x$ 在 $[-1,1]$ 上连续，$\arctan x$、$\arccot x$ 在 $(-\infty,+\infty)$ 上连续；$\log_ax$（$a>0$，$a\ne1$）在 $(0,+\infty)$ 上连续；$\sqrt[n]x$（$n$ 为正整数）在 $[0,+\infty)$ 上连续。</p>
<x-sol l="证明">
<p>$\sin x$ 在 $\left[-\frac\pi2,\frac\pi2\right]$ 上严格单调增加，值域为 $[-1,1]$，它的反函数就是 $\arcsin x$，由 <x-ref to="thm-invc"></x-ref>，$\arcsin x$ 在 $[-1,1]$ 上连续。同理：$\cos x$ 在 $[0,\pi]$ 上严格单调减少，值域为 $[-1,1]$，所以 $\arccos x$ 在 $[-1,1]$ 上连续；$\tan x$ 在 $\left(-\frac\pi2,\frac\pi2\right)$ 上严格单调增加，值域为 $(-\infty,+\infty)$，所以 $\arctan x$ 在 $(-\infty,+\infty)$ 上连续；$\cot x$ 在 $(0,\pi)$ 上严格单调减少，所以 $\arccot x$ 也在 $(-\infty,+\infty)$ 上连续。</p>
<p>当 $a>1$ 时，$a^x$ 在 $(-\infty,+\infty)$ 上严格单调增加，值域为 $(0,+\infty)$，所以它的反函数 $\log_ax$ 在 $(0,+\infty)$ 上连续；$0<a<1$ 时同理。特别地，$\ln x$ 在 $(0,+\infty)$ 上连续。最后，$x^n$ 在 $[0,+\infty)$ 上严格单调增加，值域为 $[0,+\infty)$，所以它的反函数 $\sqrt[n]x$ 在 $[0,+\infty)$ 上连续；$n$ 为奇数时，$x^n$ 在整个实轴上严格单调增加，$\sqrt[n]x$ 在 $(-\infty,+\infty)$ 上连续。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这里使用了各个函数值域的初等事实（例如 $\tan x$ 取遍一切实数，每个正数都有对数）。即使不知道值域，定理也保证了反函数在其定义域上连续。</x-remark>
</x-ex>

<h2 id="comp">复合函数的连续性</h2>
<x-thm t="复合函数的连续性" id="thm-compc">
<p>设 $u=g(x)$ 在点 $x_0$ 连续，$g(x_0)=u_0$，函数 $y=f(u)$ 在点 $u_0$ 连续，则复合函数 $y=f\big(g(x)\big)$ 在点 $x_0$ 连续。</p>
<x-proof><p>设 $f$ 在 $O(u_0,\rho)$ 中有定义。任给 $\eps>0$，由 $f$ 在 $u_0$ 连续，存在 $\eta\in(0,\rho]$，当 $|u-u_0|<\eta$ 时 $|f(u)-f(u_0)|<\eps$。对这个 $\eta$，由 $g$ 在 $x_0$ 连续，存在 $\delta>0$，当 $|x-x_0|<\delta$ 时 $|g(x)-u_0|<\eta$。于是当 $|x-x_0|<\delta$ 时，$f\big(g(x)\big)$ 有定义，并且（在上一个不等式中取 $u=g(x)$）</p>
$$\Big|f\big(g(x)\big)-f\big(g(x_0)\big)\Big|<\eps.$$
<p>所以 $f\big(g(x)\big)$ 在 $x_0$ 连续。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-thm t="外函数连续时的复合函数极限" id="thm-limc">
<p>设 $\lim\limits_{x\to x_0}g(x)=u_0$，函数 $f(u)$ 在点 $u_0$ 连续，则</p>
$$\lim_{x\to x_0}f\big(g(x)\big)=f(u_0)=f\Big(\lim_{x\to x_0}g(x)\Big).$$
<p>把 $x\to x_0$ 换成 $x\to x_0^+$、$x\to x_0^-$、$x\to+\infty$、$x\to-\infty$、$x\to\infty$，结论仍然成立。</p>
<x-proof><p>任给 $\eps>0$，取 <x-ref to="thm-compc"></x-ref> 证明中的 $\eta$。由 $g(x)\to u_0$，存在 $\delta>0$，当 $0<|x-x_0|<\delta$ 时 $|g(x)-u_0|<\eta$，从而 $\big|f\big(g(x)\big)-f(u_0)\big|<\eps$。对其他极限过程，只需把“$0<|x-x_0|<\delta$”换成相应的条件（如“$x>X$”）。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>与 <x-ref to="3-1/thm-comp"></x-ref> 相比，这里不需要条件“$g(x)\ne u_0$”：在 $g(x)=u_0$ 的点，$f\big(g(x)\big)=f(u_0)$ 恰好等于所求的极限值，不会造成麻烦。§3.1 中的反例之所以出问题，正是因为外函数在 $u_0$ 处不连续。</p></x-note>
<x-ex t="利用连续性求极限" id="ex-climit">
<p>求 (1) $\lim\limits_{x\to0}\ln\frac{\sin x}x$；(2) $\lim\limits_{x\to+\infty}\arctan\left(\sqrt{x^2+x}-x\right)$；(3) $\lim\limits_{x\to\infty}\sqrt{\left(1+\frac1x\right)^x}$。</p>
<x-sol>
<p>(1) $\frac{\sin x}x\to1$，而 $\ln u$ 在 $u=1$ 处连续，所以极限为 $\ln1=0$。</p>
<p>(2) 由 <x-ref to="3-1/ex-ratinf"></x-ref>，$x\to+\infty$ 时 $\sqrt{x^2+x}-x\to\frac12$，而 $\arctan u$ 处处连续，所以极限为 $\arctan\frac12$。</p>
<p>(3) 由 <x-ref to="3-1/thm-ex"></x-ref>，$\left(1+\frac1x\right)^x\to e$，而 $\sqrt u$ 在 $u=e$ 处连续，所以极限为 $\sqrt e$。</p>
</x-sol>
</x-ex>
<p>现在可以回答“哪些函数是连续的”了。先看一般的幂函数：$x>0$ 时 $x^\alpha=e^{\alpha\ln x}$ 是连续函数 $e^u$ 与 $u=\alpha\ln x$ 的复合，所以在 $(0,+\infty)$ 上连续；$\alpha>0$ 时，$x\to0^+$ 时 $\alpha\ln x\to-\infty$，$x^\alpha=e^{\alpha\ln x}\to0$，所以补充定义 $0^\alpha=0$ 后 $x^\alpha$ 在 $0$ 处右连续；至于 $x^{\frac13}$、$x^{\frac23}=\left(x^{\frac13}\right)^2$ 这类在负半轴也有定义的幂函数，可由 <x-ref to="ex-invelem"></x-ref> 与复合函数的连续性得到在整个实轴上的连续性。</p>
<x-thm t="初等函数的连续性" id="thm-elemc">
<p>一切初等函数在其定义区间上连续。</p>
<x-proof><p>初等函数（<x-ref to="1-2/def-elem"></x-ref>）是由常数函数与基本初等函数（幂函数、指数函数、对数函数、三角函数、反三角函数）经过有限次四则运算与复合得到的函数。上面已经证明，基本初等函数在各自的定义区间上连续（<x-ref to="ex-basic"></x-ref>、<x-ref to="ex-exp"></x-ref>、<x-ref to="ex-invelem"></x-ref> 以及上一段关于幂函数的讨论），而四则运算（<x-ref to="thm-carith"></x-ref>）与复合（<x-ref to="thm-compc"></x-ref>）都保持连续性，所以结论成立。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>“定义区间”是指包含在定义域中的区间。初等函数的定义域可能含有孤立的点，例如 $f(x)=\sqrt{\cos x-1}$ 的定义域是 $\{2k\pi\mid k\in\Z\}$，在这些点的附近函数没有定义，按本节的定义谈不上连续与否。定理说明：只要 $x_0$ 属于初等函数 $f$ 的某个定义区间，就有 $\lim\limits_{x\to x_0}f(x)=f(x_0)$，求极限时可以直接代入，例如 $\lim\limits_{x\to1}\frac{e^x+\ln x}{\sqrt{1+x^2}}=\frac e{\sqrt2}$。</p></x-note>
`);
MA.add("3-2", String.raw`
<h2 id="stdlim">几个常用的极限</h2>
<p>利用初等函数的连续性和两个重要极限，可以得到一批今后反复使用的极限。</p>
<x-ex t="常用的极限" id="ex-stdlim">
<p>证明下列极限（$a>0$，$\alpha$ 为实数）：</p>
<p>(1) $\lim\limits_{x\to0}\frac{\ln(1+x)}x=1$；(2) $\lim\limits_{x\to0}\frac{e^x-1}x=1$；(3) $\lim\limits_{x\to0}\frac{a^x-1}x=\ln a$；</p>
<p>(4) $\lim\limits_{x\to0}\frac{(1+x)^\alpha-1}x=\alpha$；(5) $\lim\limits_{x\to0}\frac{\arcsin x}x=1$，$\lim\limits_{x\to0}\frac{\arctan x}x=1$。</p>
<x-sol l="证明">
<p>(1) $\frac{\ln(1+x)}x=\ln(1+x)^{\frac1x}$。由 <x-ref to="3-1/thm-ex"></x-ref>，$(1+x)^{\frac1x}\to e$，而 $\ln u$ 在 $u=e$ 处连续，由 <x-ref to="thm-limc"></x-ref>，极限为 $\ln e=1$。</p>
<p>(2) 令 $u=e^x-1$，则 $x=\ln(1+u)$。由 $e^x$ 的连续性，$x\to0$ 时 $u\to0$；由 $e^x$ 的严格单调性，$x\ne0$ 时 $u\ne0$。由变量代换（<x-ref to="3-1/thm-comp"></x-ref>）与 (1)，</p>
$$\lim_{x\to0}\frac{e^x-1}x=\lim_{u\to0}\frac u{\ln(1+u)}=\lim_{u\to0}\frac1{\ln(1+u)/u}=1.$$
<p>(3) $a=1$ 时两边都是 $0$。$a\ne1$ 时 $\ln a\ne0$，$a^x=e^{x\ln a}$，令 $t=x\ln a$（$x\ne0$ 时 $t\ne0$），由 (2)，</p>
$$\frac{a^x-1}x=\frac{e^{x\ln a}-1}{x\ln a}\cdot\ln a=\frac{e^t-1}t\cdot\ln a\to\ln a.$$
<p>(4) $\alpha=0$ 时两边都是 $0$。设 $\alpha\ne0$，$-1<x<1$，$x\ne0$，则 $(1+x)^\alpha=e^{\alpha\ln(1+x)}$。令 $t=\alpha\ln(1+x)$，则 $x\to0$ 时 $t\to0$，且 $t\ne0$，于是</p>
$$\frac{(1+x)^\alpha-1}x=\frac{e^t-1}t\cdot\frac{\alpha\ln(1+x)}x\to1\cdot\alpha=\alpha.$$
<p>(5) 令 $u=\arcsin x$，则 $x=\sin u$；由 $\arcsin x$ 的连续性与严格单调性，$x\to0$ 时 $u\to0$ 且 $u\ne0$，所以 $\frac{\arcsin x}x=\frac u{\sin u}\to1$。同理，令 $u=\arctan x$ 得 $\frac{\arctan x}x=\frac u{\tan u}\to1$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>由 (3)，在所有指数函数 $a^x$ 中，只有 $a=e$ 使 $\lim\limits_{x\to0}\frac{a^x-1}x=1$。几何上，这个极限是曲线 $y=a^x$ 在点 $(0,1)$ 处切线的斜率（第四章），$e^x$ 是唯一一个在该点切线斜率为 $1$ 的指数函数。这是数学中偏爱以 $e$ 为底的指数与对数的一个原因。</x-remark>
</x-ex>
<x-tip t="常用的极限一览（$x\to0$）">
<table class="center">
<tr><th>极限</th><th>值</th><th>极限</th><th>值</th></tr>
<tr><td>$\dfrac{\sin x}x$</td><td>$1$</td><td>$\dfrac{\ln(1+x)}x$</td><td>$1$</td></tr>
<tr><td>$\dfrac{\tan x}x$</td><td>$1$</td><td>$\dfrac{e^x-1}x$</td><td>$1$</td></tr>
<tr><td>$\dfrac{\arcsin x}x$</td><td>$1$</td><td>$\dfrac{a^x-1}x$</td><td>$\ln a$</td></tr>
<tr><td>$\dfrac{\arctan x}x$</td><td>$1$</td><td>$\dfrac{(1+x)^\alpha-1}x$</td><td>$\alpha$</td></tr>
<tr><td>$\dfrac{1-\cos x}{x^2}$</td><td>$\dfrac12$</td><td>$(1+x)^{\frac1x}$</td><td>$e$</td></tr>
</table>
<p>由变量代换（<x-ref to="3-1/thm-comp"></x-ref>），表中的 $x$ 可以换成任何趋于 $0$ 而不等于 $0$ 的表达式。例如 $x\to0$ 时 $3x^2\to0$ 且 $3x^2\ne0$，所以</p>
$$\lim_{x\to0}\frac{\ln\left(1+3x^2\right)}{x^2}=\lim_{x\to0}3\cdot\frac{\ln\left(1+3x^2\right)}{3x^2}=3.$$
</x-tip>

<h3>幂指函数的极限与 $1^\infty$ 型</h3>
<p>形如 $u(x)^{v(x)}$（$u(x)>0$）的函数称为<em>幂指函数</em>。处理它的基本方法是写成 $u^v=e^{v\ln u}$，再利用 $e^t$ 与 $\ln t$ 的连续性。</p>
<x-thm t="幂指函数的极限" id="thm-uv">
<p>设 $\lim\limits_{x\to x_0}u(x)=a>0$，$\lim\limits_{x\to x_0}v(x)=b$，则 $\lim\limits_{x\to x_0}u(x)^{v(x)}=a^b$。对其他极限过程有同样的结论。</p>
<x-proof><p>由局部保号性，在 $x_0$ 的某个去心邻域中 $u(x)>\frac a2>0$，$u(x)^{v(x)}=e^{v(x)\ln u(x)}$ 有定义。由 $\ln t$ 在 $t=a$ 处连续，$\ln u(x)\to\ln a$（<x-ref to="thm-limc"></x-ref>）；由四则运算，$v(x)\ln u(x)\to b\ln a$；再由 $e^t$ 的连续性，$e^{v(x)\ln u(x)}\to e^{b\ln a}=a^b$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>当 $u\to1$、$v\to\infty$ 时定理不适用，这就是 <em>$1^\infty$ 型</em>的极限。§3.1 用变量代换算过几个这样的极限，下面的定理给出统一的方法。</p>
<x-thm t="$1^\infty$ 型极限" id="thm-1inf">
<p>设 $\lim\limits_{x\to x_0}u(x)=1$，$\lim\limits_{x\to x_0}v(x)\big(u(x)-1\big)=c$，则</p>
$$\lim_{x\to x_0}u(x)^{v(x)}=e^c.$$
<p>对其他极限过程有同样的结论。</p>
<x-proof><p>令 $\varphi(t)=\frac{\ln(1+t)}t$（$t>-1$，$t\ne0$），$\varphi(0)=1$。由 <x-ref to="ex-stdlim"></x-ref> (1)，$\varphi$ 在 $t=0$ 处连续，并且对一切 $t>-1$（包括 $t=0$）有 $\ln(1+t)=\varphi(t)\,t$。在 $x_0$ 的某个去心邻域中 $u(x)>0$，取 $t=u(x)-1$ 得</p>
$$v(x)\ln u(x)=\varphi\big(u(x)-1\big)\cdot v(x)\big(u(x)-1\big).$$
<p>由于 $u(x)-1\to0$ 而 $\varphi$ 在 $0$ 处连续，由 <x-ref to="thm-limc"></x-ref>，$\varphi\big(u(x)-1\big)\to\varphi(0)=1$，所以 $v(x)\ln u(x)\to c$，从而 $u(x)^{v(x)}=e^{v(x)\ln u(x)}\to e^c$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>证明中 $u(x)$ 可能在 $x_0$ 附近取值 $1$（例如 $u(x)=1+x\sin\frac1x$），这时 $u(x)-1=0$。因为用的是“外函数连续”的 <x-ref to="thm-limc"></x-ref>，而不是需要“$g(x)\ne u_0$”的变量代换定理，所以不必担心这一点。这正是补充定义 $\varphi(0)=1$ 的用意。</p></x-note>
<x-warn><p>$1^\infty$ 型的极限不一定是 $1$。底数趋于 $1$ 使幂“变小”，指数趋于 $\infty$ 又使幂“变大”，结果取决于两者的“竞争”，即 $v(u-1)$ 的极限。例如 $x\to+\infty$ 时 $\left(1+\frac1x\right)^x\to e$，$\left(1+\frac1{x^2}\right)^x\to e^0=1$，$\left(1+\frac1x\right)^{x^2}\to+\infty$。同样，$0^0$、$\infty^0$ 型的幂指函数极限也没有确定的值，取对数后它们都化为 $0\cdot\infty$ 型。</p></x-warn>
<x-ex t="$\left(1+\frac rx\right)^x\to e^r$" id="ex-rx">
<p>设 $r$ 为实数，证明 $\lim\limits_{x\to\infty}\left(1+\frac rx\right)^x=e^r$；特别地，$\lim\limits_{n\to\infty}\left(1+\frac rn\right)^n=e^r$。</p>
<x-sol l="证明">
<p>$r=0$ 时显然。设 $r\ne0$，取 $u=1+\frac rx\to1$，$v=x$，则 $v(u-1)=r$。由 <x-ref to="thm-1inf"></x-ref>，极限为 $e^r$。在 $x\to+\infty$ 的极限定义中只考虑正整数 $x=n$，就得到数列极限的结论。<span class="qed">∎</span></p>
</x-sol>
<x-remark>这样就回答了 <x-ref to="2-4/pb-ek">§2.4 中的一道习题</x-ref> 与 <x-ref to="3-1/ex-ek"></x-ref> 留下的问题：那里只对整数 $k$ 证明了 $\left(1+\frac kn\right)^n\to e^k$。在金融中，年利率为 $r$、每年计息 $m$ 次时，$1$ 元本金一年后的本利和是 $\left(1+\frac rm\right)^m$，计息越来越频繁时它趋于 $e^r$，称为<em>连续复利</em>。$r=5\%$ 时，每年计息一次得 $1.05$，按月计息得 $1.051162$，按日计息得 $1.051267$，连续复利得 $e^{0.05}=1.051271$：计息再频繁，收益也有一个上限。</x-remark>
</x-ex>
<x-viz type="plot" f="(1+a/x)^x;e^a" a="1" amin="-2" amax="2" astep="0.1" autoy="1" xmin="2.5" xmax="40" ymin="0" ymax="8" t="$\left(1+\frac ax\right)^x$ 趋于 $e^a$"><p>蓝色曲线是 $y=\left(1+\frac ax\right)^x$，水平直线是 $y=e^a$。拖动滑块改变 $a$（纵坐标范围会随之自动调整）：无论 $a$ 是正是负，曲线都从下方逼近 $e^a$。这是因为 $t>-1$、$t\ne0$ 时 $\ln(1+t)<t$，所以 $x\ln\left(1+\frac ax\right)<a$。</p></x-viz>
<x-ex t="$1^\infty$ 型极限的计算" id="ex-1inf">
<p>求 (1) $\lim\limits_{x\to0}(\cos x)^{\frac1{x^2}}$；(2) $\lim\limits_{x\to\infty}\left(\frac{x+a}{x-a}\right)^x$（$a$ 为实数）；(3) $\lim\limits_{x\to0}\left(\frac{a^x+b^x}2\right)^{\frac1x}$（$a>0$，$b>0$）。</p>
<x-sol>
<p>(1) $u=\cos x\to1$，$v(u-1)=\frac{\cos x-1}{x^2}\to-\frac12$（<x-ref to="3-1/ex-trig"></x-ref>），所以极限为 $e^{-\frac12}=\frac1{\sqrt e}$。</p>
<p>(2) $u-1=\frac{x+a}{x-a}-1=\frac{2a}{x-a}$，$v(u-1)=\frac{2ax}{x-a}\to2a$，所以极限为 $e^{2a}$（$a=1$ 时就是 §3.1 中的 $e^2$）。</p>
<p>(3) $u-1=\frac12\left[\left(a^x-1\right)+\left(b^x-1\right)\right]$，由 <x-ref to="ex-stdlim"></x-ref> (3)，</p>
$$v(u-1)=\frac12\left(\frac{a^x-1}x+\frac{b^x-1}x\right)\to\frac{\ln a+\ln b}2=\ln\sqrt{ab},$$
<p>所以极限为 $e^{\ln\sqrt{ab}}=\sqrt{ab}$。</p>
</x-sol>
<x-remark>(1) 的数值：$(\cos0.1)^{100}=0.60602\cdots$，$(\cos0.01)^{10000}=0.606526\cdots$，而 $e^{-1/2}=0.606531\cdots$。(3) 中的 $M_t=\left(\frac{a^t+b^t}2\right)^{\frac1t}$ 称为 $a,b$ 的 $t$ 次<em>幂平均</em>：$t=1$ 是算术平均，$t=-1$ 是调和平均。本例说明 $t\to0$ 时幂平均趋于几何平均 $\sqrt{ab}$，所以通常约定 $M_0=\sqrt{ab}$。</x-remark>
</x-ex>
<x-hist t="“连续”含义的演变">
<p>18 世纪，Euler 在《无穷分析引论》（1748）中把能用一个解析式子表达的函数称为“连续函数”，分段给出的函数则是“不连续的”。按这种理解，$|x|=\sqrt{x^2}$ 算是连续的，而写成 $|x|=\begin{cases}x,&x\ge0\\-x,&x<0\end{cases}$ 就成了不连续的——同一个函数的“连续性”竟依赖于它的写法，这显然不能令人满意。</p>
<p>1817 年，Bolzano 在证明中间值定理（§3.4）的论文中给出了接近现代的定义：若对充分小的 $\omega$，差 $f(x+\omega)-f(x)$ 可以小于任意给定的量，就称 $f$ 在 $x$ 处连续。Cauchy 在 1821 年的《分析教程》中说：“自变量的无穷小增量总产生函数的无穷小增量”，这就是今天的 $\Delta y\to0$。19 世纪后半叶，Weierstrass 在柏林的讲课中用 $\eps$-$\delta$ 语言把这些说法变成了今天的形式。</p>
<p>Dirichlet 在 1829 年研究 Fourier 级数时，提到了“有理点取一个值、无理点取另一个值”的函数，作为不能求积分的例子，这就是 Dirichlet 函数。本节的 Riemann 函数在国外文献中常称为 Thomae 函数，K. J. Thomae 在 1875 年的书中讨论过它；Riemann 本人在 1854 年的论文中构造过另一个在稠密集上不连续、却仍然可积的函数。这些“病态”的例子促使数学家仔细区分逐点的连续性、极限与积分，推动了分析学的严格化。</p>
</x-hist>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>$f$ 在 $x_0$ 连续：$\lim\limits_{x\to x_0}f(x)=f(x_0)$，即 $\forall\eps>0,\exists\delta>0$，$|x-x_0|<\delta$ 时 $|f(x)-f(x_0)|<\eps$；等价于 $\Delta y\to0$（$\Delta x\to0$），也等价于对一切 $x_n\to x_0$ 有 $f(x_n)\to f(x_0)$。连续 $\iff$ 左连续且右连续。</li>
<li>不连续点（本站按陈纪修教材分类）：左右极限都存在但不相等——跳跃点（第一类）；至少一侧极限不存在——第二类；极限存在但不等于函数值或函数无定义——可去点（第三类）。其他教材常把跳跃点与可去点合称“第一类间断点”。</li>
<li>连续函数的和、差、积、商（分母不为 $0$）与复合仍连续；外函数连续时 $\lim f\big(g(x)\big)=f\big(\lim g(x)\big)$，不需要“$g(x)\ne u_0$”。</li>
<li>反函数连续性定理：区间上严格单调函数的反函数严格单调且连续（不要求原函数连续）。由此，一切初等函数在其定义区间上连续，求极限时可以直接代入。</li>
<li>常用极限：$\frac{\ln(1+x)}x\to1$，$\frac{e^x-1}x\to1$，$\frac{a^x-1}x\to\ln a$，$\frac{(1+x)^\alpha-1}x\to\alpha$（$x\to0$）。幂指函数写成 $u^v=e^{v\ln u}$；$1^\infty$ 型：$u\to1$ 时 $u^v\to e^{\lim v(u-1)}$。特别地 $\left(1+\frac rx\right)^x\to e^r$。</li>
<li>单调函数只可能有跳跃点，且不连续点至多可列个；Riemann 函数在无理点连续、在有理点可去不连续，$xD(x)$ 只在 $0$ 处连续——连续是逐点的概念。</li>
</ul>
</x-sum>

<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对连续性的理解">
<x-q type="choice" answer="C">
<x-stem>设 $f$ 在 $x_0$ 的某个邻域中有定义。$f$ 在 $x_0$ 连续的充分必要条件是</x-stem>
<x-opt>$\lim\limits_{x\to x_0}f(x)$ 存在</x-opt>
<x-opt>$f(x_0+)=f(x_0-)$</x-opt>
<x-opt>$f(x_0+)=f(x_0-)=f(x_0)$</x-opt>
<x-opt>$f$ 在 $x_0$ 的某个邻域中有界</x-opt>
<x-exp>连续要求极限存在并且等于函数值。A、B 只保证极限存在（B 还要求单侧极限存在），不保证等于 $f(x_0)$；D 与连续性无关。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $f$ 在 $x_0$ 连续，则 $|f|$ 也在 $x_0$ 连续。</x-stem>
<x-exp>正确。由 $\big||f(x)|-|f(x_0)|\big|\le|f(x)-f(x_0)|$，或者看成连续函数 $|u|$ 与 $f$ 的复合。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若 $|f|$ 在 $x_0$ 连续，则 $f$ 也在 $x_0$ 连续。</x-stem>
<x-exp>错误。例如 $f(x)=1\ (x\ge0)$，$f(x)=-1\ (x<0)$，$|f|\equiv1$ 处处连续，而 $f$ 在 $0$ 处跳跃。若再加上 $f(x_0)=0$ 的条件，结论就成立了。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>$x=0$ 是 $f(x)=e^{\frac1x}$ 的</x-stem>
<x-opt>连续点</x-opt>
<x-opt>跳跃点</x-opt>
<x-opt>第二类不连续点</x-opt>
<x-opt>可去不连续点</x-opt>
<x-exp>$f(0-)=0$，而右极限为 $+\infty$，不存在有限的右极限，所以是第二类不连续点。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>$x=1$ 是 $f(x)=\arctan\frac1{x-1}$ 的</x-stem>
<x-opt>连续点</x-opt>
<x-opt>跳跃点</x-opt>
<x-opt>第二类不连续点</x-opt>
<x-opt>可去不连续点</x-opt>
<x-exp>$x\to1^+$ 时 $\frac1{x-1}\to+\infty$，$f(1+)=\frac\pi2$；$x\to1^-$ 时 $f(1-)=-\frac\pi2$。左右极限存在而不相等，是跳跃点，跃度为 $\pi$。</x-exp>
</x-q>
<x-q type="fill" answer="3" ph="填一个整数">
<x-stem>$\lim\limits_{x\to0}\dfrac{\sin3x}x=$ ______。</x-stem>
<x-exp>$\frac{\sin3x}x=3\cdot\frac{\sin3x}{3x}\to3$。</x-exp>
</x-q>
<x-q type="fill" answer="2" ph="填一个整数">
<x-stem>$\lim\limits_{x\to0}\dfrac{\ln(1+2x)}x=$ ______。</x-stem>
<x-exp>$\frac{\ln(1+2x)}x=2\cdot\frac{\ln(1+2x)}{2x}\to2$。</x-exp>
</x-q>
<x-q type="fill" answer="e^(-2)" ph="可输入表达式，如 e^2">
<x-stem>$\lim\limits_{x\to0}(1-2x)^{\frac1x}=$ ______。</x-stem>
<x-exp>$1^\infty$ 型：$v(u-1)=\frac1x\cdot(-2x)=-2$，极限为 $e^{-2}$。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $f$ 在 $x_0$ 连续而 $g$ 在 $x_0$ 不连续，则 $f+g$ 在 $x_0$ 一定不连续。</x-stem>
<x-exp>正确。若 $f+g$ 在 $x_0$ 连续，则 $g=(f+g)-f$ 作为两个连续函数的差也连续，矛盾。但两个不连续函数的和可能连续。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>设 $f$ 在 $(a,b)$ 上单调增加。关于 $f$ 的不连续点，正确的说法是</x-stem>
<x-opt>可能有可去不连续点</x-opt>
<x-opt>只能是跳跃点，并且至多可列个</x-opt>
<x-opt>可能有第二类不连续点</x-opt>
<x-opt>至多有有限个</x-opt>
<x-exp>单调函数在每一点的左右极限都存在，且 $f(x_0-)\le f(x_0)\le f(x_0+)$，所以不连续点只能是跳跃点，并且至多可列个。它们可以有无穷多个，例如 $\frac1{[1/x]}$。</x-exp>
</x-q>
<x-q type="multi" answer="ACD">
<x-stem>下列函数中，在 $x=0$ 处连续的有</x-stem>
<x-opt>$\sqrt{1-x^2}$</x-opt>
<x-opt>$[x]$</x-opt>
<x-opt>$f(x)=x\sin\frac1x\ (x\ne0)$，$f(0)=0$</x-opt>
<x-opt>$xD(x)$，其中 $D(x)$ 是 Dirichlet 函数</x-opt>
<x-exp>A 是初等函数，$0$ 属于定义区间 $[-1,1]$；B 在 $0$ 处左极限为 $-1\ne[0]=0$，是跳跃点；C 由 $\left|x\sin\frac1x\right|\le|x|$ 知连续；D 正是“只在一点连续”的例子，它恰好在 $0$ 处连续。</x-exp>
</x-q>
<x-q type="choice" answer="A">
<x-stem>设 $f$ 在区间 $I$ 上严格单调增加，但不一定连续。则反函数 $f^{-1}$ 在 $f(I)$ 上</x-stem>
<x-opt>一定连续</x-opt>
<x-opt>不一定连续</x-opt>
<x-opt>只有当 $f$ 连续时才存在</x-opt>
<x-opt>一定不连续</x-opt>
<x-exp>反函数连续性定理不要求 $f$ 连续：严格单调函数的反函数在其定义域 $f(I)$ 上严格单调且连续。$f$ 不连续时，$f(I)$ 不是区间而是有“缺口”的集合。</x-exp>
</x-q>
</x-quiz>
`);
MA.add("3-2", String.raw`
<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>

<x-prob level="基础" t="用定义证明连续性">
<div><p>用 $\eps$-$\delta$ 语言证明：</p>
<p>(1) $f(x)=x^2$ 在任意一点 $x_0$ 连续；</p>
<p>(2) $f(x)=\frac1x$ 在任意一点 $x_0\ne0$ 连续。</p></div>
<x-hint>(1) 先限制 $|x-x_0|<1$，则 $|x+x_0|<2|x_0|+1$。(2) 先限制 $|x-x_0|<\frac{|x_0|}2$，则 $|x|>\frac{|x_0|}2$。</x-hint>
<x-ans>
<p>(1) 任给 $\eps>0$，取 $\delta=\min\left\{1,\frac\eps{2|x_0|+1}\right\}$。当 $|x-x_0|<\delta$ 时，$|x+x_0|\le|x-x_0|+2|x_0|<2|x_0|+1$，所以</p>
$$\left|x^2-x_0^2\right|=|x-x_0|\,|x+x_0|<\delta\left(2|x_0|+1\right)\le\eps.$$
<p>(2) 任给 $\eps>0$，取 $\delta=\min\left\{\frac{|x_0|}2,\frac{x_0^2\eps}2\right\}$。当 $|x-x_0|<\delta$ 时，$|x|\ge|x_0|-|x-x_0|>\frac{|x_0|}2$（特别地 $x\ne0$），所以</p>
$$\left|\frac1x-\frac1{x_0}\right|=\frac{|x-x_0|}{|x|\,|x_0|}<\frac{2\delta}{x_0^2}\le\eps.$$
<x-remark>两题中的 $\delta$ 都依赖于 $x_0$。对 $\frac1x$ 而言，$x_0$ 越接近 $0$，所需的 $\delta$ 越小，并且不可能找到对 $(0,1)$ 中所有 $x_0$ 都适用的 $\delta$——这就是 §3.4 中“不一致连续”的典型例子。</x-remark>
</x-ans>
</x-prob>

<x-prob level="基础" t="判断不连续点的类型">
<div><p>求下列函数的不连续点，并判断其类型：</p>
<p>(1) $f(x)=\dfrac{x^2-1}{x^2-3x+2}$；(2) $f(x)=\dfrac x{\sin x}$；(3) $f(x)=[x]+[-x]$。</p></div>
<x-check answer="-2">(1) 中可去不连续点处的极限</x-check>
<x-hint>(1) 先约分，但要记住原来的定义域。(3) 分 $x$ 是否为整数讨论。</x-hint>
<x-ans>
<p>(1) 定义域为 $x\ne1,2$，在定义域上 $f$ 连续。当 $x\ne1,2$ 时 $f(x)=\frac{(x-1)(x+1)}{(x-1)(x-2)}=\frac{x+1}{x-2}$。$x=1$ 处 $\lim\limits_{x\to1}f(x)=\frac2{-1}=-2$，是可去不连续点；$x=2$ 处 $\lim\limits_{x\to2^\pm}f(x)=\pm\infty$，是第二类不连续点。</p>
<p>(2) 定义域为 $x\ne k\pi$（$k\in\Z$）。$x=0$ 处 $\lim\limits_{x\to0}\frac x{\sin x}=1$，是可去不连续点。$x=k\pi$（$k\ne0$）处，分母趋于 $0$ 而分子趋于 $k\pi\ne0$，$\left|\frac x{\sin x}\right|\to+\infty$，是第二类不连续点。</p>
<p>(3) 若 $x$ 不是整数，设 $n<x<n+1$，则 $-n-1<-x<-n$，$f(x)=n+(-n-1)=-1$；若 $x=n$ 是整数，则 $f(n)=n-n=0$。所以在每一点 $\lim\limits_{x\to x_0}f(x)=-1$：非整数点处连续，每个整数点都是可去不连续点。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="确定参数使函数连续">
<div><p>设</p>
$$f(x)=\begin{cases}e^x+a,&x<0,\\b,&x=0,\\\dfrac{\ln(1+3x)}x,&x>0.\end{cases}$$
<p>问 $a,b$ 取何值时，$f$ 在 $x=0$ 处连续？</p></div>
<x-check answer="2">$a=$</x-check>
<x-check answer="3">$b=$</x-check>
<x-hint>分别求 $f(0-)$ 与 $f(0+)$，令它们都等于 $f(0)$。</x-hint>
<x-ans>
<p>$f(0-)=\lim\limits_{x\to0^-}\left(e^x+a\right)=1+a$，$f(0+)=\lim\limits_{x\to0^+}3\cdot\frac{\ln(1+3x)}{3x}=3$，$f(0)=b$。连续当且仅当 $1+a=3=b$，即 $a=2$，$b=3$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="利用常用极限计算">
<div><p>求下列极限：</p>
<p>(1) $\lim\limits_{x\to0}\dfrac{\ln(1+3x)}{\sin x}$；(2) $\lim\limits_{x\to0}\dfrac{e^{2x}-1}x$；(3) $\lim\limits_{x\to0}\dfrac{\sqrt[3]{1+x}-1}x$；(4) $\lim\limits_{x\to0}(1+\sin x)^{\frac1x}$。</p></div>
<x-check answer="3">(1)</x-check>
<x-check answer="2">(2)</x-check>
<x-check answer="1/3" ph="分数或小数">(3)</x-check>
<x-check answer="e" ph="可输入表达式，如 e^2">(4)</x-check>
<x-hint>把式子凑成表中的标准形式；(4) 是 $1^\infty$ 型。</x-hint>
<x-ans>
<p>(1) $\frac{\ln(1+3x)}{\sin x}=\frac{\ln(1+3x)}{3x}\cdot\frac{3x}{\sin x}\to1\cdot3=3$。</p>
<p>(2) $\frac{e^{2x}-1}x=2\cdot\frac{e^{2x}-1}{2x}\to2$。</p>
<p>(3) 在 $\frac{(1+x)^\alpha-1}x\to\alpha$ 中取 $\alpha=\frac13$，极限为 $\frac13$。</p>
<p>(4) $u=1+\sin x\to1$，$v(u-1)=\frac{\sin x}x\to1$，极限为 $e$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="$1^\infty$ 型极限">
<div><p>求下列极限：</p>
<p>(1) $\lim\limits_{x\to\infty}\left(\dfrac{x^2+1}{x^2-1}\right)^{x^2}$；(2) $\lim\limits_{x\to0}(\cos2x)^{\frac1{x^2}}$；(3) $\lim\limits_{x\to\frac\pi2}(\sin x)^{\tan x}$。</p></div>
<x-check answer="e^2" ph="可输入表达式，如 e^2">(1)</x-check>
<x-check answer="e^(-2)" ph="可输入表达式，如 e^2">(2)</x-check>
<x-check answer="1">(3)</x-check>
<x-hint>都用 <x-ref to="thm-1inf"></x-ref>，关键是求 $v(u-1)$ 的极限。(3) 中利用 $1-\sin x=\frac{\cos^2x}{1+\sin x}$。</x-hint>
<x-ans>
<p>(1) $u-1=\frac2{x^2-1}$，$v(u-1)=\frac{2x^2}{x^2-1}\to2$，极限为 $e^2$。</p>
<p>(2) $u-1=\cos2x-1=-2\sin^2x$，$v(u-1)=-2\left(\frac{\sin x}x\right)^2\to-2$，极限为 $e^{-2}$。</p>
<p>(3) $u=\sin x\to1$，</p>
$$v(u-1)=\tan x\,(\sin x-1)=-\frac{\sin x}{\cos x}\cdot\frac{\cos^2x}{1+\sin x}=-\frac{\sin x\cos x}{1+\sin x}\to0,$$
<p>极限为 $e^0=1$。</p>
<x-remark>(3) 中 $x\to\frac\pi2^-$ 时 $\tan x\to+\infty$，$x\to\frac\pi2^+$ 时 $\tan x\to-\infty$，但两侧的极限都是 $1$：这次底数趋于 $1$ 的速度“赢了”。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="由极限定义的函数">
<div><p>设 $f(x)=\lim\limits_{n\to\infty}\dfrac{x^{2n}-1}{x^{2n}+1}$。求 $f(x)$ 的表达式，指出它的不连续点及其类型。</p></div>
<x-check answer="2" ph="填一个整数">不连续点的个数</x-check>
<x-hint>分 $|x|<1$、$|x|=1$、$|x|>1$ 三种情况求极限。</x-hint>
<x-ans>
<p>$|x|<1$ 时 $x^{2n}\to0$，$f(x)=-1$；$|x|=1$ 时 $f(x)=0$；$|x|>1$ 时 $x^{-2n}\to0$，$f(x)=\lim\limits_{n\to\infty}\frac{1-x^{-2n}}{1+x^{-2n}}=1$。所以 $f(x)=\sgn\left(x^2-1\right)$。</p>
<p>$f$ 在 $x\ne\pm1$ 处连续（在其附近是常数）。在 $x=1$ 处，$f(1-)=-1$，$f(1+)=1$，是跳跃点，跃度为 $2$；在 $x=-1$ 处，$f(-1-)=1$，$f(-1+)=-1$，也是跳跃点，跃度为 $-2$。共有 $2$ 个不连续点。</p>
<x-remark>每个函数 $f_n(x)=\frac{x^{2n}-1}{x^{2n}+1}$ 都处处连续，它们的极限函数却不连续。“连续函数序列的极限在什么条件下仍连续”是下册函数项级数一章中一致收敛要回答的问题。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="最大值函数与最小值函数">
<div><p>设 $f(x)$、$g(x)$ 都在 $x_0$ 连续，证明 $\max\{f(x),g(x)\}$ 与 $\min\{f(x),g(x)\}$ 都在 $x_0$ 连续。</p></div>
<x-hint>用 $f$、$g$ 与 $|f-g|$ 表示最大值与最小值。</x-hint>
<x-ans>
<p>对任意实数 $a,b$，$\max\{a,b\}=\frac{a+b+|a-b|}2$，$\min\{a,b\}=\frac{a+b-|a-b|}2$。$f-g$ 在 $x_0$ 连续，$|u|$ 处处连续，由复合函数的连续性，$|f-g|$ 在 $x_0$ 连续；再由四则运算，$\max\{f,g\}$ 与 $\min\{f,g\}$ 都在 $x_0$ 连续。</p>
<x-remark>特别地，$f^+=\max\{f,0\}$ 与 $f^-=\max\{-f,0\}$（$f$ 的正部与负部）都是连续函数。这个技巧在积分学中很常用。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="值域为区间的单调函数">
<div><p>设 $f(x)$ 在区间 $I$ 上单调，并且 $f(I)$ 是一个区间。证明 $f$ 在 $I$ 上连续。</p></div>
<x-hint>若 $f$ 单调增加且在内点 $x_0$ 不连续，则 $f(x_0-)<f(x_0+)$，而 $f$ 在 $\big(f(x_0-),f(x_0+)\big)$ 中至多取到一个值 $f(x_0)$。</x-hint>
<x-ans>
<p>不妨设 $f$ 单调增加。设 $x_0$ 是 $I$ 的内点，且 $f$ 在 $x_0$ 不连续，由 <x-ref to="thm-monodisc"></x-ref>，$f(x_0-)<f(x_0+)$。由 <x-ref to="3-1/thm-monolim"></x-ref>，$x<x_0$ 时 $f(x)\le f(x_0-)$，$x>x_0$ 时 $f(x)\ge f(x_0+)$，所以开区间 $\big(f(x_0-),f(x_0+)\big)$ 中至多含有 $f$ 的一个值 $f(x_0)$。另一方面，任取 $x_1<x_0<x_2$（$x_1,x_2\in I$），则 $f(x_1)\le f(x_0-)$，$f(x_2)\ge f(x_0+)$。由于 $f(I)$ 是区间，它包含 $[f(x_1),f(x_2)]$，从而包含整个开区间 $\big(f(x_0-),f(x_0+)\big)$，其中有无穷多个点，矛盾。</p>
<p>若 $x_0=a$ 是 $I$ 的左端点（属于 $I$），则 $f(a)\le f(a+)=\inf\limits_{x>a}f(x)$；若 $f$ 在 $a$ 处不右连续，则 $f(a)<f(a+)$，而 $f(I)$ 包含 $f(a)$ 以及不小于 $f(a+)$ 的值，却不含 $\big(f(a),f(a+)\big)$ 中的任何值，与 $f(I)$ 是区间矛盾。右端点同理。</p>
<x-remark>由 §3.4 的中间值定理，区间上连续函数的值域一定是区间。所以对区间上的单调函数，“连续”与“值域是区间”是等价的。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="满足 $f(2x)=f(x)$ 的连续函数">
<div><p>设 $f(x)$ 在 $(-\infty,+\infty)$ 上有定义，在 $x=0$ 处连续，并且对一切 $x$ 有 $f(2x)=f(x)$。证明 $f$ 是常数。</p></div>
<x-hint>$f(x)=f\left(\frac x2\right)=f\left(\frac x4\right)=\cdots$。</x-hint>
<x-ans>
<p>任取 $x$，由条件，对一切正整数 $n$ 有 $f(x)=f\left(\frac x{2^n}\right)$。当 $n\to\infty$ 时 $\frac x{2^n}\to0$，由 $f$ 在 $0$ 处连续与 <x-ref to="prop-seqc"></x-ref>，$f\left(\frac x{2^n}\right)\to f(0)$。所以 $f(x)=f(0)$。</p>
<x-remark>“在 $0$ 处连续”不能去掉。例如 $f(x)=D\left(\log_2|x|\right)$（$x\ne0$），$f(0)=0$，其中 $D$ 是 Dirichlet 函数：由 $\log_2|2x|=\log_2|x|+1$ 知 $f(2x)=f(x)$，但 $f$ 不是常数。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="三个指数的平均">
<div><p>求 $\lim\limits_{x\to0}\left(\dfrac{2^x+3^x+4^x}3\right)^{\frac1x}$。</p></div>
<x-check answer="24^(1/3)" ph="可输入表达式，如 e^2">极限</x-check>
<x-hint>仿照 <x-ref to="ex-1inf"></x-ref> (3)。</x-hint>
<x-ans>
<p>$u-1=\frac13\left[\left(2^x-1\right)+\left(3^x-1\right)+\left(4^x-1\right)\right]$，</p>
$$v(u-1)=\frac13\left(\frac{2^x-1}x+\frac{3^x-1}x+\frac{4^x-1}x\right)\to\frac{\ln2+\ln3+\ln4}3=\frac{\ln24}3,$$
<p>所以极限为 $e^{\frac{\ln24}3}=\sqrt[3]{24}\approx2.8845$，即 $2,3,4$ 的几何平均。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="Cauchy 函数方程">
<div><p>设 $f(x)$ 在 $(-\infty,+\infty)$ 上连续，且对一切实数 $x,y$ 有 $f(x+y)=f(x)+f(y)$。证明 $f(x)=f(1)\,x$。</p></div>
<x-hint>依次对整数、有理数证明结论，再用有理数的稠密性与连续性过渡到实数。</x-hint>
<x-ans>
<p>记 $c=f(1)$。取 $x=y=0$ 得 $f(0)=2f(0)$，所以 $f(0)=0$；取 $y=-x$ 得 $f(-x)=-f(x)$。由归纳法，对正整数 $n$ 有 $f(nx)=nf(x)$，于是 $f(n)=nc$。对有理数 $\frac pq$（$p\in\Z$，$q$ 为正整数），$qf\left(\frac pq\right)=f(p)=pc$，即 $f\left(\frac pq\right)=\frac pq\,c$（$p<0$ 时利用奇性）。</p>
<p>对任意实数 $x$，由稠密性（<x-ref to="2-1/thm-dense"></x-ref>），可以在 $\left(x,x+\frac1n\right)$ 中取有理数 $r_n$，则 $r_n\to x$。由 $f$ 的连续性，</p>
$$f(x)=\lim_{n\to\infty}f(r_n)=\lim_{n\to\infty}r_nc=cx.$$
<x-remark>连续性条件可以减弱为“在某一点连续”或“单调”或“在某个区间上有界”。如果完全不加限制，借助选择公理可以构造出满足方程而不连续的解，它们的图像在平面中稠密，非常“病态”。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="由差商推出 $f(x)/x\to0$">
<div><p>设 $\lim\limits_{x\to0}f(x)=0$，并且 $\lim\limits_{x\to0}\dfrac{f(x)-f\left(\frac x2\right)}x=0$。证明 $\lim\limits_{x\to0}\dfrac{f(x)}x=0$。</p></div>
<x-hint>把 $f(x)$ 写成 $\sum\limits_{k=0}^{n-1}\left[f\left(\frac x{2^k}\right)-f\left(\frac x{2^{k+1}}\right)\right]+f\left(\frac x{2^n}\right)$，再令 $n\to\infty$。</x-hint>
<x-ans>
<p>任给 $\eps>0$，存在 $\delta>0$，当 $0<|t|<\delta$ 时 $\left|f(t)-f\left(\frac t2\right)\right|<\eps|t|$。取定满足 $0<|x|<\delta$ 的 $x$，则 $t=\frac x{2^k}$（$k=0,1,2,\cdots$）也满足 $0<|t|<\delta$，所以</p>
$$\left|f(x)-f\left(\frac x{2^n}\right)\right|\le\sum_{k=0}^{n-1}\left|f\left(\frac x{2^k}\right)-f\left(\frac x{2^{k+1}}\right)\right|<\eps|x|\sum_{k=0}^{n-1}\frac1{2^k}<2\eps|x|.$$
<p>令 $n\to\infty$，由于 $\frac x{2^n}\to0$ 且 $\frac x{2^n}\ne0$，由 Heine 定理 $f\left(\frac x{2^n}\right)\to0$，于是 $|f(x)|\le2\eps|x|$，即 $\left|\frac{f(x)}x\right|\le2\eps$（$0<|x|<\delta$）。所以 $\lim\limits_{x\to0}\frac{f(x)}x=0$。</p>
<x-remark>条件 $\lim\limits_{x\to0}f(x)=0$ 不能去掉：$f(x)\equiv1$ 满足第二个条件，但 $\frac{f(x)}x$ 没有极限。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="单调函数跃度之和">
<div><p>设 $f(x)$ 在 $[a,b]$ 上单调增加，$x_1<x_2<\cdots<x_k$ 是 $f$ 在 $(a,b)$ 中的不连续点。</p>
<p>(1) 证明 $\sum\limits_{i=1}^k\big[f(x_i+)-f(x_i-)\big]\le f(b)-f(a)$；</p>
<p>(2) 由 (1) 再证明一次：$f$ 在 $(a,b)$ 中的不连续点至多可列个。</p></div>
<x-hint>(1) 在相邻的不连续点之间插入分点 $t_i$。(2) 跃度不小于 $\frac1m$ 的不连续点有多少个？</x-hint>
<x-ans>
<p>(1) 取 $t_0=a$，$t_k=b$，并在 $(x_i,x_{i+1})$ 中任取 $t_i$（$i=1,\cdots,k-1$），则 $t_0<x_1<t_1<x_2<\cdots<x_k<t_k$。由 <x-ref to="3-1/thm-monolim"></x-ref>，$f(x_i+)\le f(t_i)$，$f(x_i-)\ge f(t_{i-1})$，所以</p>
$$\sum_{i=1}^k\big[f(x_i+)-f(x_i-)\big]\le\sum_{i=1}^k\big[f(t_i)-f(t_{i-1})\big]=f(b)-f(a).$$
<p>(2) 对正整数 $m$，记 $E_m$ 为跃度不小于 $\frac1m$ 的不连续点的集合。若 $E_m$ 中有 $k$ 个点，由 (1)，$\frac km\le f(b)-f(a)$，所以 $E_m$ 至多有 $m\big(f(b)-f(a)\big)$ 个点，是有限集。每个不连续点的跃度都是正数，必属于某个 $E_m$。依次列出 $E_1$ 中的点、$E_2\setminus E_1$ 中的点、$E_3\setminus E_2$ 中的点……就把所有不连续点排成了一列（可能是有限列），所以不连续点至多可列个。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="年终奖的第二个“盲区”">
<div><p>全年一次性奖金单独计税时（规则见本节的“实际应用”），按月换算后的数额超过 $3000$ 元至 $12000$ 元的，税率为 $10\%$，速算扣除数为 $210$；超过 $12000$ 元至 $25000$ 元的，税率为 $20\%$，速算扣除数为 $1410$。设奖金为 $x$ 元，应纳税额为 $T(x)$。</p>
<p>(1) 求 $T(144000)$ 以及 $T$ 在 $x=144000$ 处的跃度；</p>
<p>(2) 奖金在什么范围内时，税后收入反而少于奖金恰为 $144000$ 元时的税后收入？</p></div>
<x-check answer="14190" unit="元">$T(144000)=$</x-check>
<x-check answer="13200" unit="元">跃度</x-check>
<x-check answer="160500" unit="元">“盲区”的右端点</x-check>
<x-hint>$144000\div12=12000$，恰好是第二档的上限。</x-hint>
<x-ans>
<p>(1) $T(144000)=144000\times10\%-210=14190$（元）。$144000<x\le300000$ 时 $T(x)=0.2x-1410$，所以 $T(144000+)=28800-1410=27390$，跃度为 $27390-14190=13200$（元）。</p>
<p>(2) 奖金为 $144000$ 元时税后收入为 $144000-14190=129810$ 元。$144000<x\le300000$ 时税后收入为 $x-(0.2x-1410)=0.8x+1410$，令 $0.8x+1410<129810$，得 $x<160500$。所以奖金在 $(144000,\ 160500)$ 中时，税后收入都少于 $129810$ 元。</p>
<x-remark>按月换算的税率表每一档的分界点处都有这样的跳跃。综合所得采用超额累进税率，税额是连续函数，没有这个问题。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="快递运费函数">
<div><p>某快递的运费为：首重 $1$ kg $12$ 元，续重每 kg $2$ 元，不足 $1$ kg 按 $1$ kg 计。于是重量为 $w$ kg（$w>0$）的包裹运费为</p>
$$C(w)=12+2\lceil w-1\rceil,$$
<p>其中 $\lceil t\rceil$ 表示不小于 $t$ 的最小整数。(1) 求 $C(2.3)$ 与 $C(3)$；(2) 求 $C(w)$ 的不连续点，并说明 $C(w)$ 在这些点处是左连续还是右连续。</p></div>
<x-check answer="16" unit="元">$C(2.3)=$</x-check>
<x-check answer="16" unit="元">$C(3)=$</x-check>
<x-hint>当 $k<w\le k+1$（$k=0,1,2,\cdots$）时 $\lceil w-1\rceil=k$。</x-hint>
<x-ans>
<p>(1) $C(2.3)=12+2\lceil1.3\rceil=16$，$C(3)=12+2\lceil2\rceil=16$（元）。</p>
<p>(2) 当 $k<w\le k+1$ 时 $C(w)=12+2k$，所以 $C$ 在每个开区间 $(k,k+1)$ 上是常数，从而连续。在正整数 $w=k$ 处，$C(k)=C(k-)=12+2(k-1)$，$C(k+)=12+2k$，所以每个正整数都是跳跃点，跃度为 $2$ 元，$C$ 在这些点左连续而不右连续。</p>
<x-remark>“不足 $1$ kg 按 $1$ kg 计”对应向上取整，得到左连续的阶梯函数；若规则是“超出部分不足 $1$ kg 不计”，则对应向下取整 $[w]$，得到右连续的阶梯函数。注意 $\lceil t\rceil=-[-t]$。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="复利与连续复利">
<div><p>本金 $10000$ 元，年利率 $5\%$，存 $10$ 年。分别求下列计息方式下到期的本利和：(1) 每年计息一次；(2) 每月计息一次；(3) 连续复利。(4) 在连续复利下，本金翻一番需要多少年？</p></div>
<x-check answer="16288.95" tol="0.01" unit="元">(1)</x-check>
<x-check answer="16470.09" tol="0.01" unit="元">(2)</x-check>
<x-check answer="16487.21" tol="0.01" unit="元">(3)</x-check>
<x-check answer="13.86" tol="0.01" unit="年">(4)</x-check>
<x-hint>(3) 每年计息 $m$ 次，$10$ 年后本利和为 $10000\left(1+\frac{0.05}m\right)^{10m}$，令 $m\to\infty$。</x-hint>
<x-ans>
<p>(1) $10000\times1.05^{10}\approx16288.95$ 元。</p>
<p>(2) $10000\times\left(1+\frac{0.05}{12}\right)^{120}\approx16470.09$ 元。</p>
<p>(3) 由 <x-ref to="ex-rx"></x-ref>，$\left(1+\frac{0.05}m\right)^{10m}=\left[\left(1+\frac{0.05}m\right)^m\right]^{10}\to e^{0.5}$（$m\to\infty$），本利和为 $10000e^{0.5}\approx16487.21$ 元。</p>
<p>(4) 由 $e^{0.05t}=2$ 得 $t=\frac{\ln2}{0.05}\approx13.86$ 年。</p>
<x-remark>民间有“72 法则”：年利率为 $r\%$ 时，本金大约 $\frac{72}r$ 年翻一番（$r=5$ 时约 $14.4$ 年）。由 (4) 的算法，连续复利时的精确值是 $\frac{100\ln2}r\approx\frac{69.3}r$ 年；用 $72$ 是因为它有较多的因数，便于心算，而且对每年计息一次的情形更准确。</x-remark>
</x-ans>
</x-prob>
`);
