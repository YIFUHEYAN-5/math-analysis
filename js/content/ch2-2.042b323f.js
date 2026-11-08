/* §2.2 数列极限 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("2-2", String.raw`
<x-goal>
<ul>
<li>理解数列极限的 $\eps$-$N$ 定义及其几何意义，能用定义证明简单数列的极限，掌握“放大法”。</li>
<li>能准确写出“$a$ 不是 $\{a_n\}$ 的极限”与“$\{a_n\}$ 发散”的数学表述，并用它证明数列发散。</li>
<li>掌握收敛数列的唯一性、有界性、保序性与夹逼准则，知道哪些逆命题不成立。</li>
<li>熟练运用极限的四则运算法则；记住 $q^n$、$\sqrt[n]a$、$\sqrt[n]n$ 与几何级数等基本极限。</li>
<li>会用数列极限描述药物浓度、反弹小球、贷款与年金等实际过程的长期行为。</li>
</ul>
</x-goal>
<p>极限是数学分析的核心概念：后面要学的连续、导数、积分、级数，归根到底都是某种极限。本节先把“$n$ 越来越大时，$a_n$ 无限接近 $a$”这句直观但含糊的话变成精确的定义，再由定义推出收敛数列的性质与运算法则。第一次接触 $\eps$-$N$ 语言时觉得别扭是正常的，建议把本节的例题逐行读懂，并亲手完成基础题中的定义证明。</p>

<h2 id="def">数列与数列极限</h2>
<x-def t="数列">
<p>定义在正整数集 $\Np$ 上的实值函数 $f:\Np\to\R$ 称为<em>数列</em>。记 $a_n=f(n)$，数列也写成 $a_1,a_2,\cdots,a_n,\cdots$，简记为 $\{a_n\}$；$a_n$ 称为数列的<em>通项</em>或第 $n$ 项。</p>
</x-def>
<p>数列可以用通项公式给出，如 $a_n=\frac1n$；可以用递推公式给出，如 Fibonacci 数列 $F_1=F_2=1$，$F_{n+2}=F_{n+1}+F_n$；也可以用文字描述，如“$a_n$ 是 $\sqrt2$ 的 $n$ 位不足近似值”。先看几个数列在 $n$ 增大时的表现：</p>
<table class="center">
<tr><th>数列</th><th>前几项</th><th>$n$ 增大时的表现</th></tr>
<tr><td>$\frac1n$</td><td>$1,\ \frac12,\ \frac13,\ \frac14,\ \cdots$</td><td>单调减少，越来越接近 $0$</td></tr>
<tr><td>$1+\frac{(-1)^n}n$</td><td>$0,\ \frac32,\ \frac23,\ \frac54,\ \cdots$</td><td>在 $1$ 的两侧来回摆动，越来越接近 $1$</td></tr>
<tr><td>$\frac{\sin n}n$</td><td>$0.841,\ 0.455,\ 0.047,\ -0.189,\ \cdots$</td><td>忽正忽负、不单调，但越来越接近 $0$</td></tr>
<tr><td>$(-1)^n$</td><td>$-1,\ 1,\ -1,\ 1,\ \cdots$</td><td>在 $\pm1$ 之间跳动，不接近任何一个数</td></tr>
<tr><td>$n^2$</td><td>$1,\ 4,\ 9,\ 16,\ \cdots$</td><td>无限增大</td></tr>
</table>
<p>怎样精确描述“$a_n$ 越来越接近 $a$”？说“$|a_n-a|$ 越来越小”是不行的：$1+\frac1n$ 与 $0$ 的距离也越来越小，可它接近的是 $1$；而 $\frac{\sin n}n$ 与 $0$ 的距离并不是逐项减小的。真正要表达的是：<em>只要 $n$ 足够大，$|a_n-a|$ 就能小于任意给定的正数</em>。</p>
<x-def t="数列极限" id="def-lim">
<p>设 $\{a_n\}$ 是数列，$a$ 是实数。若对任意给定的 $\eps>0$，存在正整数 $N$，使得当 $n>N$ 时，成立</p>
$$|a_n-a|<\eps,$$
<p>则称数列 $\{a_n\}$ <em>收敛于</em> $a$，或称 $a$ 是 $\{a_n\}$ 的<em>极限</em>，记作</p>
$$\lim_{n\to\infty}a_n=a\quad\text{或}\quad a_n\to a\ (n\to\infty).$$
<p>存在极限的数列称为<em>收敛数列</em>，不收敛的数列称为<em>发散数列</em>。用逻辑符号写成：</p>
$$\lim_{n\to\infty}a_n=a\iff\forall\eps>0,\ \exists N\in\Np,\ \forall n>N:\ |a_n-a|<\eps.$$
</x-def>
<x-intuit t="一场“挑战—应战”的游戏">
<p>可以把定义想象成两人之间的游戏：质疑者提出一个精度要求 $\eps$（比如 $0.01$，或者 $10^{-100}$），证明者必须回答一个位置 $N$，保证从第 $N+1$ 项起，所有项与 $a$ 的距离都小于 $\eps$。$\lim a_n=a$ 的意思是：<em>无论质疑者提出多么苛刻的 $\eps$，证明者总能应战成功</em>。因此 $N$ 一般随 $\eps$ 而变（$\eps$ 越小，$N$ 往往越大），有时写成 $N=N(\eps)$。</p>
</x-intuit>
<p><em>几何意义</em>：$|a_n-a|<\eps$ 即 $a_n\in O(a,\eps)=(a-\eps,a+\eps)$。所以 $\lim a_n=a$ 等价于：对 $a$ 的任意一个 $\eps$ 邻域，数列只有有限多项（至多前 $N$ 项）落在邻域之外。把点 $(n,a_n)$ 画在平面上，就是：任意画一条以直线 $y=a$ 为中心、宽为 $2\eps$ 的水平带子，从某一项之后，所有的点都落在带子里。</p>
<x-viz type="epsn" t="$\eps$-$N$ 定义的直观演示"><p>选择数列、调节 $\eps$，观察使“$n>N$ 时所有点都在带子内”的最小 $N$ 如何随 $\eps$ 变化，并与下面例题中推导出的理论 $N$ 比较。理论 $N$ 通常比最小的 $N$ 大——定义只要求找到<em>某个</em> $N$，并不要求最小。最后一个数列 $(-1)^n$ 发散：无论把候选极限 $L$ 设成多少，$\eps$ 足够小时都找不到 $N$。</p></x-viz>
<x-note>
<ul>
<li><em>$\eps$ 的任意性</em>：$\eps$ 必须可以任意小，这是定义的灵魂。不过证明时只需对充分小的 $\eps$（比如 $0<\eps<1$）找到 $N$：对小的 $\eps$ 可用的 $N$，对大的 $\eps$ 同样可用。</li>
<li><em>$N$ 只需存在</em>：$N$ 不唯一，若 $N$ 可用，则任何更大的正整数也可用。我们只关心 $N$ 是否存在，不追求最小的 $N$，这为“放大”留下了余地。</li>
<li>把“$|a_n-a|<\eps$”换成“$|a_n-a|\le\eps$”或“$|a_n-a|<K\eps$”（$K$ 是与 $n$、$\eps$ 无关的正常数），把“$n>N$”换成“$n\ge N$”，定义的含义都不变。</li>
<li>改变数列的有限多项，不影响它是否收敛以及极限是多少：只要把 $N$ 取得比被改动项的下标都大即可。</li>
</ul>
</x-note>

<x-ex t="用定义证明有理分式型数列的极限" id="ex-rat">
<p>用定义证明 $\displaystyle\lim_{n\to\infty}\frac{3n^2+n}{2n^2-1}=\frac32$。</p>
<x-analysis><p>目标是对任意 $\eps>0$ 找到 $N$。直接解不等式 $\left|\frac{3n^2+n}{2n^2-1}-\frac32\right|<\eps$ 很麻烦（要解关于 $n$ 的二次不等式），而且没有必要，因为我们不需要最小的 $N$。常用的办法是<em>放大</em>：先把 $|a_n-a|$ 化简，再放大成一个简单的、仍然趋于 $0$ 的式子，比如 $\frac Cn$，然后只需让这个简单的式子小于 $\eps$。</p></x-analysis>
<x-sol l="证明">
<p>先化简：</p>
$$\left|\frac{3n^2+n}{2n^2-1}-\frac32\right|=\frac{|2(3n^2+n)-3(2n^2-1)|}{2(2n^2-1)}=\frac{2n+3}{2(2n^2-1)}.$$
<p>当 $n\ge2$ 时，分子 $2n+3\le2n+2n=4n$，分母 $2(2n^2-1)=4n^2-2\ge2n^2$，所以</p>
$$\left|\frac{3n^2+n}{2n^2-1}-\frac32\right|\le\frac{4n}{2n^2}=\frac2n\qquad(n\ge2).$$
<p>任给 $\eps>0$，取 $N=\max\left\{2,\left[\frac2\eps\right]\right\}$，则当 $n>N$ 时，$n\ge2$ 且 $n>\frac2\eps$，于是 $\left|\frac{3n^2+n}{2n^2-1}-\frac32\right|\le\frac2n<\eps$。所以极限为 $\frac32$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>放大时可以“分子放大、分母缩小”，但要注意两点：放大后的式子必须仍然能任意小（放大成 $\frac2n$ 有用，放大成 $1$ 就没用了）；放大往往只对充分大的 $n$ 成立，这时要在 $N$ 中加上相应的限制（这里是 $n\ge2$）。</x-remark>
</x-ex>
<x-tip t="用定义证明极限的“放大法”">
<ol>
<li>化简 $|a_n-a|$；</li>
<li>放大：找一个简单的 $g(n)$，使得 $n$ 充分大（比如 $n\ge n_0$）时 $|a_n-a|\le g(n)$，且从 $g(n)<\eps$ 容易解出 $n$。常见的 $g(n)$ 有 $\frac Cn$、$\frac C{\sqrt n}$、$Cq^n$；</li>
<li>由 $g(n)<\eps$ 解出 $n>h(\eps)$，取 $N=\max\{n_0,[h(\eps)]\}$；</li>
<li>按定义的格式写出结论：“任给 $\eps>0$，取 $N=\cdots$，则当 $n>N$ 时，$|a_n-a|\le g(n)<\eps$。”</li>
</ol>
</x-tip>

<x-ex t="几何数列 $q^n$" id="ex-qn">
<p>设 $|q|<1$，证明 $\displaystyle\lim_{n\to\infty}q^n=0$。</p>
<x-analysis><p>要使 $|q|^n<\eps$，可以取对数解出 $n>\frac{\ln\eps}{\ln|q|}$（注意 $\ln|q|<0$，两边同除以它时不等号反向），这要用到对数函数的性质。下面给出一个只用 Bernoulli 不等式（<x-ref to="1-2/lem-bern"></x-ref>）的证明，这种放大思路以后会经常用到。</p></x-analysis>
<x-sol l="证明">
<p>$q=0$ 时显然。设 $0<|q|<1$，记 $\frac1{|q|}=1+h$，则 $h>0$。由 Bernoulli 不等式，$(1+h)^n\ge1+nh>nh$，所以</p>
$$|q^n-0|=|q|^n=\frac1{(1+h)^n}<\frac1{nh}.$$
<p>任给 $\eps>0$，取 $N=\left[\frac1{h\eps}\right]+1$，则当 $n>N$ 时 $|q^n-0|<\frac1{nh}<\eps$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>用二项式展开中的平方项代替一次项，即 $(1+h)^n>\frac{n(n-1)}2h^2$，同样可以证明 $|q|<1$ 时 $nq^n\to0$。“指数衰减比多项式增长快”是 §2.3 的重要结论。</x-remark>
</x-ex>

<x-ex t="$\sqrt[n]a\to1$" id="ex-root">
<p>设 $a>0$，证明 $\displaystyle\lim_{n\to\infty}\sqrt[n]a=1$。</p>
<x-analysis><p>$a>1$ 时 $\sqrt[n]a>1$，把它写成 $1+h_n$（$h_n>0$），只需证 $h_n\to0$。由 Bernoulli 不等式，$a=(1+h_n)^n\ge1+nh_n$，于是 $h_n$ 被 $\frac{a-1}n$ 控制。$0<a<1$ 时取倒数，化为前一种情形。</p></x-analysis>
<x-sol l="证明">
<p>$a=1$ 时显然。设 $a>1$，记 $\sqrt[n]a=1+h_n$，则 $h_n>0$，且 $a=(1+h_n)^n\ge1+nh_n$，所以</p>
$$0<\sqrt[n]a-1=h_n\le\frac{a-1}n.$$
<p>任给 $\eps>0$，取 $N=\left[\frac{a-1}\eps\right]+1$，则 $n>N$ 时 $|\sqrt[n]a-1|\le\frac{a-1}n<\eps$。</p>
<p>设 $0<a<1$，记 $b=\frac1a>1$，则 $\sqrt[n]b\ge1$，且</p>
$$|\sqrt[n]a-1|=1-\frac1{\sqrt[n]b}=\frac{\sqrt[n]b-1}{\sqrt[n]b}\le\sqrt[n]b-1\le\frac{b-1}n,$$
<p>取 $N=\left[\frac{b-1}\eps\right]+1$ 即可。<span class="qed">∎</span></p>
</x-sol>
</x-ex>

<x-ex t="$\sqrt[n]n\to1$" id="ex-nroot">
<p>证明 $\displaystyle\lim_{n\to\infty}\sqrt[n]n=1$。</p>
<x-analysis><p>仍记 $\sqrt[n]n=1+h_n$。这次若只用 Bernoulli 不等式，得到 $n\ge1+nh_n$，即 $h_n\le\frac{n-1}n$，不能说明 $h_n\to0$——放得太粗了。改用二项式展开中的平方项：$(1+h)^n\ge1+\frac{n(n-1)}2h^2$（$h\ge0$）。</p></x-analysis>
<x-sol l="证明">
<p>记 $\sqrt[n]n=1+h_n$，则 $h_n\ge0$。当 $n\ge2$ 时，由二项式定理（各项非负），</p>
$$n=(1+h_n)^n=1+nh_n+\frac{n(n-1)}2h_n^2+\cdots+h_n^n\ge1+\frac{n(n-1)}2h_n^2,$$
<p>所以 $h_n^2\le\frac{2(n-1)}{n(n-1)}=\frac2n$，即 $0\le\sqrt[n]n-1\le\sqrt{\frac2n}$。任给 $\eps>0$，取 $N=\left[\frac2{\eps^2}\right]+1$，则 $n>N$ 时 $n>\frac2{\eps^2}$，$|\sqrt[n]n-1|\le\sqrt{\frac2n}<\eps$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>“把 $a_n$ 写成 $1+h_n$，再用二项式展开中合适的一项估计 $h_n$”是证明这类极限的常用技巧：一次项不够用时就用二次项。数值上 $\sqrt[n]n$ 趋于 $1$ 很慢：$\sqrt[100]{100}\approx1.0471$，$\sqrt[10000]{10000}\approx1.00092$。</x-remark>
</x-ex>
`);
MA.add("2-2", String.raw`
<h3>极限定义的否定：怎样证明发散</h3>
<p>按照逻辑规则（“任意”与“存在”互换，最后的结论取反），“$a$ 不是 $\{a_n\}$ 的极限”可以写成</p>
$$\exists\eps_0>0,\ \forall N\in\Np,\ \exists n>N:\ |a_n-a|\ge\eps_0.$$
<p>几何上，就是 $a$ 的某个邻域 $O(a,\eps_0)$ 之外有 $\{a_n\}$ 的<em>无穷多项</em>。“$\{a_n\}$ 发散”则是：对<em>每一个</em>实数 $a$，上面的命题都成立。</p>
<x-ex t="$(-1)^n$ 发散" id="ex-alt">
<p>证明数列 $\{(-1)^n\}$ 发散。</p>
<x-analysis><p>要对任意实数 $a$ 说明 $a$ 不是极限。数列的奇数项都是 $-1$，偶数项都是 $1$，两者相距 $2$，所以 $a$ 不可能同时离它们都很近：至少有一个与 $a$ 的距离不小于 $1$。</p></x-analysis>
<x-sol l="证明">
<p>任取实数 $a$，令 $\eps_0=1$。对任意正整数 $N$，取 $n_1=2N+1$，$n_2=2N+2$，它们都大于 $N$，且</p>
$$|a_{n_1}-a|+|a_{n_2}-a|=|-1-a|+|1-a|\ge|(1-a)-(-1-a)|=2,$$
<p>所以 $|a_{n_1}-a|$ 与 $|a_{n_2}-a|$ 中至少有一个不小于 $1=\eps_0$。因此任何实数 $a$ 都不是 $\{(-1)^n\}$ 的极限，数列发散。<span class="qed">∎</span></p>
</x-sol>
</x-ex>
<x-warn>
<p>定义中“任意”与“存在”的顺序不能随意改动：</p>
<ul>
<li>“<em>存在</em> $\eps>0$，存在 $N$，使 $n>N$ 时 $|a_n-a|<\eps$”：只说明数列从某项起落在 $a$ 的某个邻域中。任何有界数列对任何 $a$ 都满足它（取很大的 $\eps$ 即可），例如 $(-1)^n$ 与 $a=100$。</li>
<li>“存在 $N$，使对<em>任意</em> $\eps>0$，$n>N$ 时 $|a_n-a|<\eps$”：$N$ 不能随 $\eps$ 改变，这迫使 $n>N$ 时 $a_n=a$，即数列从某项起是常数列，条件过强。</li>
<li>“对任意 $\eps>0$，有无穷多个 $n$ 使 $|a_n-a|<\eps$”：只说明 $a$ 附近有数列的无穷多项，例如 $(-1)^n$ 与 $a=1$。§2.4 中会看到，这样的 $a$ 叫做数列的<em>极限点</em>。</li>
</ul>
<p>另外，收敛并不要求 $|a_n-a|$ 单调减少（如 $\frac{\sin n}n$），也不要求 $a_n\ne a$（常数列 $a,a,a,\cdots$ 收敛于 $a$）。</p>
</x-warn>

<h3>无穷小量</h3>
<x-def t="无穷小量" id="def-inf0">
<p>若 $\displaystyle\lim_{n\to\infty}a_n=0$，则称 $\{a_n\}$ 为<em>无穷小量</em>。</p>
</x-def>
<p>由定义立即可得：$\lim a_n=a\iff\{a_n-a\}$ 是无穷小量。所以研究极限，常常归结为研究无穷小量。注意无穷小量是一个<em>趋于 $0$ 的数列</em>，而不是“一个很小的数”：$10^{-100}$ 再小也不是无穷小量（常数列 $10^{-100}$ 的极限是 $10^{-100}\ne0$）。</p>
<x-prop t="有界量与无穷小量之积" id="prop-bdd0">
<p>若 $\{x_n\}$ 有界，$\{y_n\}$ 是无穷小量，则 $\{x_ny_n\}$ 是无穷小量。</p>
<x-proof><p>设 $|x_n|\le M$（$M>0$）。任给 $\eps>0$，由 $y_n\to0$，存在 $N$，使 $n>N$ 时 $|y_n|<\frac\eps M$，于是 $|x_ny_n|\le M|y_n|<\eps$。<span class="qed">∎</span></p></x-proof>
</x-prop>
<p>例如 $|\sin n|\le1$，$\frac1n\to0$，所以 $\frac{\sin n}n\to0$；同理 $\frac{(-1)^n}{\sqrt n}\to0$，$\frac{\cos(n^2+1)}n\to0$。这比逐个用定义证明省事得多。</p>

<h2 id="props">收敛数列的性质</h2>
<p>下面的性质都直接由定义推出。它们看似简单，却是以后一切极限运算的基础；证明中“把 $\eps$ 取成某个特定的值”的手法尤其值得留意。</p>
<x-thm t="唯一性" id="thm-uniq">
<p>收敛数列的极限是唯一的。</p>
<x-proof><p>设 $a_n\to a$，$a_n\to b$，且 $a\ne b$。取 $\eps=\frac{|a-b|}2>0$，则存在 $N_1$，$n>N_1$ 时 $|a_n-a|<\eps$；存在 $N_2$，$n>N_2$ 时 $|a_n-b|<\eps$。取 $n>\max\{N_1,N_2\}$，则</p>
$$|a-b|\le|a-a_n|+|a_n-b|<2\eps=|a-b|,$$
<p>矛盾。所以 $a=b$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-intuit><p>两个不同的点 $a,b$ 各取半径为 $\frac{|a-b|}2$ 的邻域，这两个邻域互不相交；而数列从某项起必须同时落在两个邻域里，这不可能。</p></x-intuit>
<x-thm t="有界性" id="thm-bdd">
<p>收敛数列必有界：若 $\lim a_n=a$，则存在 $M>0$，使 $|a_n|\le M$ 对一切 $n$ 成立。</p>
<x-proof><p>取 $\eps=1$，存在 $N$，使 $n>N$ 时 $|a_n-a|<1$，从而 $|a_n|\le|a_n-a|+|a|<|a|+1$。令</p>
$$M=\max\{|a_1|,|a_2|,\cdots,|a_N|,\ |a|+1\},$$
<p>则 $|a_n|\le M$ 对一切 $n$ 成立。<span class="qed">∎</span></p></x-proof>
</x-thm>
<p>逆命题不成立：$\{(-1)^n\}$ 有界但发散。所以有界是收敛的<em>必要条件</em>而非充分条件。它的逆否命题“无界数列必发散”常用来判断发散，例如 $\left\{n\sin\frac{n\pi}2\right\}$ 无界，所以发散。§2.4 将证明：<em>单调</em>且有界的数列必收敛。</p>
<x-thm t="保序性" id="thm-order">
<p>设 $\lim a_n=a$，$\lim b_n=b$，且 $a<b$，则存在 $N$，使 $n>N$ 时 $a_n<b_n$。</p>
<x-proof><p>取 $\eps=\frac{b-a}2>0$。存在 $N_1$，$n>N_1$ 时 $a_n<a+\eps=\frac{a+b}2$；存在 $N_2$，$n>N_2$ 时 $b_n>b-\eps=\frac{a+b}2$。取 $N=\max\{N_1,N_2\}$，则 $n>N$ 时 $a_n<\frac{a+b}2<b_n$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-cor t="保号性" id="cor-sign">
<p>若 $\lim a_n=a>0$，则存在 $N$，使 $n>N$ 时 $a_n>\frac a2>0$。$a<0$ 时有类似结论。</p>
<x-proof><p>对常数列 $\frac a2,\frac a2,\cdots$ 与 $\{a_n\}$ 应用<x-ref to="thm-order"></x-ref>即可，因为两者的极限满足 $\frac a2<a$。<span class="qed">∎</span></p></x-proof>
</x-cor>
<x-cor t="极限的不等式" id="cor-le">
<p>设 $\lim a_n=a$，$\lim b_n=b$，且从某项起 $a_n\le b_n$，则 $a\le b$。</p>
<x-proof><p>若 $a>b$，由<x-ref to="thm-order"></x-ref>，从某项起 $a_n>b_n$，与条件矛盾。<span class="qed">∎</span></p></x-proof>
</x-cor>
<x-warn><p>严格不等式在取极限后可能变成等号：$-\frac1n<\frac1n$ 对一切 $n$ 成立，但两边的极限都是 $0$。所以由 $a_n<b_n$ 只能推出 $\lim a_n\le\lim b_n$。类似地，若 $a_n>0$ 且 $a_n\to a$，只能得到 $a\ge0$。</p></x-warn>
<x-thm t="夹逼准则" id="thm-squeeze">
<p>设从某项起 $a_n\le x_n\le b_n$，且 $\lim a_n=\lim b_n=a$，则 $\lim x_n=a$。</p>
<x-proof><p>设 $n>N_0$ 时 $a_n\le x_n\le b_n$。任给 $\eps>0$，存在 $N_1$，$n>N_1$ 时 $a_n>a-\eps$；存在 $N_2$，$n>N_2$ 时 $b_n<a+\eps$。取 $N=\max\{N_0,N_1,N_2\}$，则 $n>N$ 时</p>
$$a-\eps<a_n\le x_n\le b_n<a+\eps,$$
<p>即 $|x_n-a|<\eps$。<span class="qed">∎</span></p></x-proof>
</x-thm>
<x-note><p>夹逼准则的价值在于：它不仅给出极限的值，还同时<em>证明了极限存在</em>；而<x-ref to="cor-le"></x-ref>要求事先知道两个极限都存在。使用夹逼准则的关键是找到两边“夹得住”、极限又相同的数列，常见手法有：把和式的每一项都换成最大项或最小项；利用 $\sqrt[n]c\to1$（$c>0$）吸收常数因子；把乘积中的大部分因子放大成 $1$。</p></x-note>
<x-ex t="$n$ 次方根中“最大者决定一切”" id="ex-maxroot">
<p>设 $a_1,a_2,\cdots,a_k$ 是正数，证明 $\displaystyle\lim_{n\to\infty}\sqrt[n]{a_1^n+a_2^n+\cdots+a_k^n}=\max\{a_1,a_2,\cdots,a_k\}$。</p>
<x-analysis><p>记 $A=\max\{a_1,\cdots,a_k\}$。和式中每一项都不超过 $A^n$，且至少有一项等于 $A^n$，所以和式介于 $A^n$ 与 $kA^n$ 之间；开 $n$ 次方后，常数 $k$ 变成 $\sqrt[n]k\to1$，被“吸收”掉了。</p></x-analysis>
<x-sol l="证明">
<p>$A^n\le a_1^n+\cdots+a_k^n\le kA^n$，所以</p>
$$A\le\sqrt[n]{a_1^n+\cdots+a_k^n}\le\sqrt[n]k\cdot A.$$
<p>由<x-ref to="ex-root"></x-ref>，$\sqrt[n]k\to1$，而 $|\sqrt[n]k\cdot A-A|=A|\sqrt[n]k-1|$，所以右边 $\sqrt[n]k\cdot A\to A$。由夹逼准则，原极限为 $A$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>例如 $\sqrt[n]{2^n+3^n}\to3$，$\sqrt[n]{1+2^n+5^n}\to5$。在几个指数量的“竞争”中，长期起决定作用的只有增长最快的那一个，这个现象在 §2.3 中还会多次遇到。</x-remark>
</x-ex>
<x-viz type="plot" f="(2^x+3^x)^(1/x);3;3*2^(1/x)" xmin="1" xmax="30" ymin="2.5" ymax="6.5" t="夹逼：$3\le\sqrt[n]{2^n+3^n}\le3\sqrt[n]2$"><p>把 $n$ 换成连续变量 $x$ 画图：中间的曲线被夹在常数 $3$ 与 $3\sqrt[x]2$ 之间，而上界也趋于 $3$。把鼠标移到图上可以读出数值。</p></x-viz>
<x-ex t="$\dfrac{n!}{n^n}\to0$" id="ex-fact">
<p>证明 $\displaystyle\lim_{n\to\infty}\frac{n!}{n^n}=0$。</p>
<x-sol l="证明">
<p>把分子、分母都写成 $n$ 个因子的乘积：</p>
$$0<\frac{n!}{n^n}=\frac1n\cdot\frac2n\cdot\frac3n\cdots\frac nn\le\frac1n,$$
<p>因为除第一个因子外，其余每个因子都不超过 $1$。由 $\frac1n\to0$ 及夹逼准则即得。<span class="qed">∎</span></p>
</x-sol>
<x-remark>“把乘积中的大部分因子放大成 $1$，只留下一个起作用的因子”是处理阶乘与连乘积的常用手法，同样可以证明 $\frac{5^n}{n!}\to0$（见习题）。</x-remark>
</x-ex>
`);
MA.add("2-2", String.raw`
<h2 id="arith">极限的四则运算</h2>
<p>用定义证明极限往往需要细致的放大；有了四则运算法则，许多复杂的极限可以由几个基本极限“组装”出来。</p>
<x-thm t="四则运算法则" id="thm-arith">
<p>设 $\lim a_n=a$，$\lim b_n=b$，则</p>
<ol>
<li>$\lim(\alpha a_n+\beta b_n)=\alpha a+\beta b$（$\alpha,\beta$ 为常数）；</li>
<li>$\lim a_nb_n=ab$；</li>
<li>若 $b\ne0$，则 $\displaystyle\lim\frac{a_n}{b_n}=\frac ab$。</li>
</ol>
<x-proof>
<p>任给 $\eps>0$，存在 $N_1$，$n>N_1$ 时 $|a_n-a|<\eps$；存在 $N_2$，$n>N_2$ 时 $|b_n-b|<\eps$。以下都取 $n>\max\{N_1,N_2\}$（在 (3) 中还要更大）。</p>
<p>(1) $|(\alpha a_n+\beta b_n)-(\alpha a+\beta b)|\le|\alpha||a_n-a|+|\beta||b_n-b|\le(|\alpha|+|\beta|)\eps$。</p>
<p>(2) 由<x-ref to="thm-bdd"></x-ref>，存在 $M>0$ 使 $|a_n|\le M$。于是</p>
$$|a_nb_n-ab|=|a_n(b_n-b)+b(a_n-a)|\le M|b_n-b|+|b||a_n-a|<(M+|b|)\eps.$$
<p>(3) 由 (2)，只需证 $\frac1{b_n}\to\frac1b$。因为 $\big||b_n|-|b|\big|\le|b_n-b|$，所以 $|b_n|\to|b|>0$，由保号性，存在 $N_3$，$n>N_3$ 时 $|b_n|>\frac{|b|}2$。于是 $n>\max\{N_2,N_3\}$ 时</p>
$$\left|\frac1{b_n}-\frac1b\right|=\frac{|b_n-b|}{|b_n||b|}<\frac2{b^2}\eps.$$
<p>以上右端都是“与 $n$ 无关的常数 $\times\,\eps$”，由 $\eps$ 的任意性，结论成立。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<x-note>
<ul>
<li>证明中的 $(|\alpha|+|\beta|)\eps$、$(M+|b|)\eps$、$\frac2{b^2}\eps$ 都是“常数 $\times\,\eps$”，由于 $\eps$ 任意，这与定义中的 $\eps$ 等价（见前面关于定义的说明）。</li>
<li>作商时，$b_n$ 可能有有限多项为 $0$，此时 $\frac{a_n}{b_n}$ 只对充分大的 $n$ 有意义；这不影响极限，因为极限只与“充分靠后”的项有关。</li>
<li>由 (1)(2) 及归纳法，法则可以推广到任意<em>固定个数</em>的数列的和与积，例如 $\lim a_n^k=a^k$（$k$ 为固定的正整数）。</li>
</ul>
</x-note>
<x-warn>
<ul>
<li>法则要求 $\lim a_n$、$\lim b_n$ <em>都存在</em>（作商时还要求 $b\ne0$）。反过来，由 $\lim(a_n+b_n)$ 存在推不出 $\lim a_n$、$\lim b_n$ 存在：$a_n=(-1)^n$、$b_n=(-1)^{n+1}$ 都发散，但 $a_n+b_n=0$。</li>
<li>法则只适用于<em>固定个数</em>的数列相加、相乘。$\underbrace{\frac1n+\frac1n+\cdots+\frac1n}_{n\text{ 个}}=1$，若“逐项取极限”，就会得到错误的 $0+0+\cdots+0=0$——项数随 $n$ 增长时不能这样做。同理，求 $\left(1+\frac1n\right)^n$ 的极限时不能“先把 $1+\frac1n$ 换成 $1$”，它的极限是 $e$ 而不是 $1$（§2.4）。</li>
<li>遇到 $\frac\infty\infty$、$\infty-\infty$、$0\cdot\infty$ 这类形式，不能直接用法则，要先变形（约去公共因子、有理化等），这正是 §2.3 “待定型”要讨论的问题。</li>
</ul>
</x-warn>
<x-ex t="有理分式型数列" id="ex-poly">
<p>求 (1) $\displaystyle\lim_{n\to\infty}\frac{3n^2+n}{2n^2-1}$；(2) $\displaystyle\lim_{n\to\infty}\frac{2n^3-n+5}{5n^3+4n^2}$；(3) $\displaystyle\lim_{n\to\infty}\frac{n^2+1}{n^3-2}$。</p>
<x-analysis><p>分子、分母都趋于无穷大，不能直接用商的法则。分子分母同除以分母的最高次幂，化成由 $\frac1{n^k}\to0$ 组成的式子。</p></x-analysis>
<x-sol>
<p>(1) $\displaystyle\frac{3n^2+n}{2n^2-1}=\frac{3+\frac1n}{2-\frac1{n^2}}\to\frac{3+0}{2-0}=\frac32$。与<x-ref to="ex-rat"></x-ref>中的定义证明相比，简单多了。</p>
<p>(2) $\displaystyle\frac{2n^3-n+5}{5n^3+4n^2}=\frac{2-\frac1{n^2}+\frac5{n^3}}{5+\frac4n}\to\frac25$。</p>
<p>(3) $\displaystyle\frac{n^2+1}{n^3-2}=\frac{\frac1n+\frac1{n^3}}{1-\frac2{n^3}}\to\frac01=0$。</p>
</x-sol>
<x-remark>一般地，设 $a_kb_l\ne0$，则 $\displaystyle\lim_{n\to\infty}\frac{a_kn^k+\cdots+a_1n+a_0}{b_ln^l+\cdots+b_1n+b_0}$ 当 $k=l$ 时等于 $\frac{a_k}{b_l}$，当 $k<l$ 时等于 $0$；当 $k>l$ 时数列发散（是无穷大量，见 §2.3）。只需比较分子、分母的最高次项。</x-remark>
</x-ex>
<x-ex t="“$\infty-\infty$”型：有理化" id="ex-sqrtdiff">
<p>求 $\displaystyle\lim_{n\to\infty}\left(\sqrt{n^2+n}-n\right)$。</p>
<x-analysis><p>两项都趋于无穷大，“相减等于 $0$”是错误的直觉，事实上 $\sqrt{n^2+n}$ 比 $n$ 大约 $\frac12$。把分子有理化，差就变成了商。</p></x-analysis>
<x-sol>
$$\sqrt{n^2+n}-n=\frac{(n^2+n)-n^2}{\sqrt{n^2+n}+n}=\frac n{\sqrt{n^2+n}+n}=\frac1{\sqrt{1+\frac1n}+1}.$$
<p>由于 $1\le\sqrt{1+\frac1n}\le1+\frac1n$（平方后即可验证），由夹逼准则 $\sqrt{1+\frac1n}\to1$，所以原极限为 $\frac1{1+1}=\frac12$。</p>
</x-sol>
<x-remark>一般地，若 $a_n\ge0$，$a_n\to a$，则 $\sqrt{a_n}\to\sqrt a$（见习题）。学了函数的连续性之后，这类结论会统一成“连续函数与极限运算可以交换次序”。</x-remark>
</x-ex>
<x-ex t="项数随 $n$ 增长的和式" id="ex-sumsqrt">
<p>求 $\displaystyle\lim_{n\to\infty}\biggl(\frac1{\sqrt{n^2+1}}+\frac1{\sqrt{n^2+2}}+\cdots+\frac1{\sqrt{n^2+n}}\biggr)$。</p>
<x-analysis><p>和式的项数是 $n$，随 $n$ 增长，不能逐项取极限（每项都趋于 $0$，但和并不趋于 $0$）。用夹逼准则：把每一项换成最小项或最大项。</p></x-analysis>
<x-sol>
<p>记和式为 $S_n$。它的 $n$ 项中最小的是 $\frac1{\sqrt{n^2+n}}$，最大的是 $\frac1{\sqrt{n^2+1}}$，所以</p>
$$\frac n{\sqrt{n^2+n}}\le S_n\le\frac n{\sqrt{n^2+1}},\quad\text{即}\quad\frac1{\sqrt{1+\frac1n}}\le S_n\le\frac1{\sqrt{1+\frac1{n^2}}}.$$
<p>用上例的方法可知两边都趋于 $1$，故 $\lim S_n=1$。</p>
</x-sol>
</x-ex>
<x-ex t="几何级数" id="ex-geom">
<p>设 $|q|<1$，求 $\displaystyle\lim_{n\to\infty}\left(1+q+q^2+\cdots+q^{n-1}\right)$，并由此说明 $0.999\cdots=1$，$0.\overline{36}=\frac4{11}$。</p>
<x-sol>
<p>$q\ne1$ 时，$S_n=1+q+\cdots+q^{n-1}=\frac{1-q^n}{1-q}$。由<x-ref to="ex-qn"></x-ref>，$q^n\to0$，所以</p>
$$\lim_{n\to\infty}S_n=\frac1{1-q}\qquad(|q|<1).$$
<p>这个极限记作 $\sum\limits_{k=0}^\infty q^k=\frac1{1-q}$，称为<em>几何级数</em>的和。无限小数 $0.a_1a_2a_3\cdots$ 的值，就是它的有限截断 $0.a_1a_2\cdots a_n$ 当 $n\to\infty$ 时的极限，于是</p>
$$0.999\cdots=\lim_{n\to\infty}\left(\frac9{10}+\frac9{10^2}+\cdots+\frac9{10^n}\right)=\frac9{10}\cdot\frac1{1-\frac1{10}}=1,$$
$$0.\overline{36}=\frac{36}{100}\cdot\frac1{1-\frac1{100}}=\frac{36}{99}=\frac4{11}.$$
</x-sol>
<x-remark>这就补上了 §2.1 中循环小数化分数（<x-ref to="2-1/prop-rep"></x-ref>）和 $0.999\cdots=1$（<x-ref to="2-1/ex-09"></x-ref>）所用到的求和公式。</x-remark>
</x-ex>
<x-ex t="算术平均的极限" id="ex-cesaro">
<p>设 $\lim a_n=a$，证明 $\displaystyle\lim_{n\to\infty}\frac{a_1+a_2+\cdots+a_n}n=a$。</p>
<x-analysis><p>$\frac{a_1+\cdots+a_n}n-a=\frac{(a_1-a)+\cdots+(a_n-a)}n$。把分子分成两段：前面固定的 $N_1$ 项（个数固定，除以 $n$ 后趋于 $0$）和后面的项（每项都小于 $\frac\eps2$，平均起来也小于 $\frac\eps2$）。这种<em>分段估计</em>是分析中最常用的技巧之一。</p></x-analysis>
<x-sol l="证明">
<p>任给 $\eps>0$，存在 $N_1$，$n>N_1$ 时 $|a_n-a|<\frac\eps2$。于是 $n>N_1$ 时</p>
$$\left|\frac{a_1+\cdots+a_n}n-a\right|\le\frac{|a_1-a|+\cdots+|a_{N_1}-a|}n+\frac{|a_{N_1+1}-a|+\cdots+|a_n-a|}n.$$
<p>记 $C=|a_1-a|+\cdots+|a_{N_1}-a|$，它是与 $n$ 无关的常数；右边第二项小于 $\frac{n-N_1}n\cdot\frac\eps2<\frac\eps2$。再取 $N_2$ 使 $n>N_2$ 时 $\frac Cn<\frac\eps2$。令 $N=\max\{N_1,N_2\}$，则 $n>N$ 时 $\left|\frac{a_1+\cdots+a_n}n-a\right|<\eps$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>逆命题不成立：$a_n=(-1)^n$ 发散，但它的算术平均的绝对值不超过 $\frac1n$，趋于 $0$。“取平均”能抹平振荡，这正是统计中用平均值、工程中用滑动平均滤除噪声的道理。§2.3 的 Stolz 定理是这个结论的推广。</x-remark>
</x-ex>
<x-app t="药物在体内的积累">
<p>某药每天服用一次，每次 $100$ mg；经过一天，体内的药物约有 $70\%$ 被代谢，只剩 $30\%$。设 $x_n$ 为第 $n$ 次服药后体内的药量（$x_0=0$ 表示开始前体内没有药），则</p>
$$x_{n+1}=0.3x_n+100,\qquad x_1=100,\ x_2=130,\ x_3=139,\ x_4=141.7,\ \cdots$$
<p>药量会无限增加吗？设想存在“稳态” $L$，它应满足 $L=0.3L+100$，即 $L=\frac{100}{0.7}=\frac{1000}7\approx142.86$。两式相减得 $x_{n+1}-L=0.3(x_n-L)$，所以</p>
$$x_n-L=0.3^n(x_0-L)=-\frac{1000}7\cdot0.3^n\to0,$$
<p>即 $\lim x_n=\frac{1000}7$：药量从下方逐渐逼近稳态，误差每天缩小到原来的 $30\%$，第 $5$ 次服药后与稳态相差已不到 $0.35$ mg。临床上有时会加大首剂（“负荷剂量”），让药量一开始就处在稳态：本例中若首剂取 $\frac{1000}7\approx143$ mg，以后每天 $100$ mg，则每次服药后的药量都恰好是稳态值。常说的“首剂加倍”对应每个给药间隔药量减半（间隔等于半衰期）的情形，那时稳态恰好是每次剂量的 $2$ 倍。</p>
</x-app>
<x-viz type="cobweb" start="4" t="迭代 $x_{n+1}=0.3x_n+100$ 的蛛网图"><p>竖直线段从曲线 $y=f(x)$ 上取值，水平线段把结果搬回直线 $y=x$，作为下一次迭代的输入。蛛网逐步收向两线的交点 $L=\frac{1000}7$。可以拖动初值，或改选其他迭代——§2.4 会系统地研究这类递推数列。</p></x-viz>
<x-hist t="Zeno 悖论：追不上的乌龟">
<p>古希腊的 Zeno 说：Achilles 永远追不上在他前面 $100$ m 的乌龟。因为 Achilles 跑到乌龟原来的位置时，乌龟又前进了一段；他再追到那里，乌龟又前进了一小段……这样的过程有无穷多步。</p>
<p>设 Achilles 的速度为 $10$ m/s，乌龟为 $1$ m/s。第一步用时 $10$ s，这期间乌龟前进 $10$ m；第二步用时 $1$ s，乌龟又前进 $1$ m；……各步用时构成公比为 $\frac1{10}$ 的等比数列，总用时为</p>
$$10+1+0.1+0.01+\cdots=\frac{10}{1-\frac1{10}}=\frac{100}9\approx11.11\ \text{s},$$
<p>追上时 Achilles 跑了 $\frac{1000}9\approx111.11$ m。无穷多步的时间之和是有限的——悖论的症结在于把“无穷多步”误当成了“无穷长的时间”。直接解方程 $10t=100+t$ 也得到 $t=\frac{100}9$。</p>
</x-hist>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>$\lim a_n=a$：$\forall\eps>0,\ \exists N,\ \forall n>N:\ |a_n-a|<\eps$。几何意义：$a$ 的任意邻域之外只有有限多项。$N$ 依赖于 $\eps$，不唯一，也不必最小。</li>
<li>否定：$\exists\eps_0>0,\ \forall N,\ \exists n>N:\ |a_n-a|\ge\eps_0$。证明发散要对<em>每个</em> $a$ 做到这一点。</li>
<li>用定义证明的核心是放大：$|a_n-a|\le g(n)$，其中 $g(n)$ 简单且趋于 $0$。</li>
<li>收敛数列的性质：唯一性、有界性、保序性（严格不等式取极限后可能变成等号）、夹逼准则。有界不一定收敛。</li>
<li>四则运算法则要求各极限都存在、项数固定、作商时分母的极限非零；遇到 $\frac\infty\infty$、$\infty-\infty$ 先变形。</li>
<li>基本极限：$|q|<1$ 时 $q^n\to0$，$\sum\limits_{k=0}^\infty q^k=\frac1{1-q}$；$\sqrt[n]a\to1$（$a>0$）；$\sqrt[n]n\to1$；有界量乘无穷小量仍是无穷小量；$a_n\to a\Rightarrow\frac{a_1+\cdots+a_n}n\to a$。</li>
</ul>
</x-sum>
`);
MA.add("2-2", String.raw`
<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对数列极限的理解">
<x-q type="choice" answer="B">
<x-stem>下列命题中，与 $\lim\limits_{n\to\infty}a_n=a$ 等价的是：</x-stem>
<x-opt>存在 $\eps>0$，存在 $N$，当 $n>N$ 时 $|a_n-a|<\eps$</x-opt>
<x-opt>对任意 $\eps>0$，存在 $N$，当 $n>N$ 时 $|a_n-a|<2\eps$</x-opt>
<x-opt>存在 $N$，对任意 $\eps>0$，当 $n>N$ 时 $|a_n-a|<\eps$</x-opt>
<x-opt>对任意 $\eps>0$，有无穷多个 $n$ 使 $|a_n-a|<\eps$</x-opt>
<x-exp>B 中的 $2\eps$ 也能任意小，与定义等价。A 对任何有界数列都成立；C 迫使数列从某项起恒等于 $a$；D 只说明 $a$ 附近有无穷多项，如 $(-1)^n$ 与 $a=1$。</x-exp>
</x-q>
<x-q type="choice" answer="C">
<x-stem>“$a$ 不是数列 $\{a_n\}$ 的极限”的正确表述是：</x-stem>
<x-opt>对任意 $\eps>0$，存在 $N$，当 $n>N$ 时 $|a_n-a|\ge\eps$</x-opt>
<x-opt>存在 $\eps_0>0$，存在 $N$，当 $n>N$ 时 $|a_n-a|\ge\eps_0$</x-opt>
<x-opt>存在 $\eps_0>0$，对任意 $N$，存在 $n>N$ 使 $|a_n-a|\ge\eps_0$</x-opt>
<x-opt>对任意 $\eps>0$ 与任意 $N$，存在 $n>N$ 使 $|a_n-a|\ge\eps$</x-opt>
<x-exp>“任意”与“存在”互换，最后的不等式取反。B 要求从某项起所有项都离 $a$ 较远，比“不收敛于 $a$”强得多：$(-1)^n$ 不以 $1$ 为极限，但它的偶数项都等于 $1$。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $\lim a_n=a$，则 $\lim|a_n|=|a|$。</x-stem>
<x-exp>正确，因为 $\big||a_n|-|a|\big|\le|a_n-a|$。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若 $\lim|a_n|=|a|$，则 $\lim a_n=a$。</x-stem>
<x-exp>错误：$a_n=(-1)^n$ 满足 $|a_n|\to1$，但 $a_n$ 发散。只有 $a=0$ 时结论成立。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>有界数列必收敛。</x-stem>
<x-exp>错误，$(-1)^n$ 就是反例。收敛 $\Rightarrow$ 有界，反之不然；§2.4 将证明“单调有界数列必收敛”。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>设 $a_n<b_n$ 对一切 $n$ 成立，且 $\lim a_n=a$，$\lim b_n=b$，则一定有：</x-stem>
<x-opt>$a<b$</x-opt>
<x-opt>$a\le b$</x-opt>
<x-opt>$a=b$</x-opt>
<x-opt>$a$ 与 $b$ 的大小关系不能确定</x-opt>
<x-exp>严格不等式取极限后可能变成等号，如 $-\frac1n<\frac1n$，两边的极限都是 $0$。</x-exp>
</x-q>
<x-q type="fill" answer="2/5" ph="分数或小数">
<x-stem>$\displaystyle\lim_{n\to\infty}\frac{2n^3-n+5}{5n^3+4n^2}=$</x-stem>
<x-exp>分子分母同除以 $n^3$，极限等于最高次项系数之比 $\frac25$。</x-exp>
</x-q>
<x-q type="fill" answer="3/2" ph="分数或小数">
<x-stem>$\displaystyle\lim_{n\to\infty}\left(\sqrt{n^2+3n}-n\right)=$</x-stem>
<x-exp>有理化：$\frac{3n}{\sqrt{n^2+3n}+n}=\frac3{\sqrt{1+\frac3n}+1}\to\frac32$。</x-exp>
</x-q>
<x-q type="fill" answer="5">
<x-stem>$\displaystyle\lim_{n\to\infty}\sqrt[n]{2^n+5^n}=$</x-stem>
<x-exp>$5\le\sqrt[n]{2^n+5^n}\le\sqrt[n]2\cdot5$，由夹逼准则，极限为 $5$。</x-exp>
</x-q>
<x-q type="fill" answer="10">
<x-stem>对 $a_n=\frac1{n^2}$ 和 $\eps=0.01$，使“$n>N$ 时 $|a_n-0|<\eps$”成立的最小正整数 $N=$</x-stem>
<x-exp>$\frac1{n^2}<0.01\iff n>10$，所以 $N=10$ 可用，而 $N=9$ 不行（$a_{10}=0.01$ 不小于 $\eps$）。当然，证明极限时不必找最小的 $N$。</x-exp>
</x-q>
<x-q type="multi" answer="ACD">
<x-stem>下列数列中收敛的有（多选）：</x-stem>
<x-opt>$\frac{(-1)^n}n$</x-opt>
<x-opt>$(-1)^n\frac n{n+1}$</x-opt>
<x-opt>$\frac{\sin n}n$</x-opt>
<x-opt>$\sqrt[n]n$</x-opt>
<x-opt>$\frac{1+(-1)^n}2$</x-opt>
<x-exp>A、C 是有界量乘无穷小量，D 见本节 $\sqrt[n]n\to1$ 的例题。B 的偶数项趋于 $1$、奇数项趋于 $-1$；E 是 $0,1,0,1,\cdots$；两者都发散。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若 $\{a_n\}$ 与 $\{a_n+b_n\}$ 都收敛，则 $\{b_n\}$ 收敛。</x-stem>
<x-exp>正确：$b_n=(a_n+b_n)-a_n$ 是两个收敛数列之差。但若只知道 $\{a_n+b_n\}$ 收敛，则推不出 $\{a_n\}$、$\{b_n\}$ 收敛。</x-exp>
</x-q>
</x-quiz>

<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果（可以输入表达式，如 <code>800/3</code>、<code>sqrt(2)</code>）；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>

<x-prob level="基础" t="用定义证明极限">
<p>用 $\eps$-$N$ 定义证明：(1) $\displaystyle\lim_{n\to\infty}\frac{2n-1}{3n+2}=\frac23$；(2) $\displaystyle\lim_{n\to\infty}\frac{n^2-2}{n^2+n+1}=1$；(3) $\displaystyle\lim_{n\to\infty}\left(\sqrt{n+1}-\sqrt n\right)=0$；(4) $\displaystyle\lim_{n\to\infty}\frac n{2^n}=0$。</p>
<x-hint>先化简 $|a_n-a|$ 再放大：(1) 化简后分子是常数；(2) $n+3\le4n$；(3) 分子有理化；(4) 由二项式展开，$2^n=(1+1)^n>\frac{n(n-1)}2$。</x-hint>
<x-ans>
<p>(1) $\left|\frac{2n-1}{3n+2}-\frac23\right|=\frac{|3(2n-1)-2(3n+2)|}{3(3n+2)}=\frac7{9n+6}<\frac7{9n}<\frac1n$。任给 $\eps>0$，取 $N=\left[\frac1\eps\right]+1$，则 $n>N$ 时 $\left|a_n-\frac23\right|<\frac1n<\eps$。</p>
<p>(2) $\left|\frac{n^2-2}{n^2+n+1}-1\right|=\frac{n+3}{n^2+n+1}<\frac{4n}{n^2}=\frac4n$（因为 $n\ge1$ 时 $n+3\le4n$）。取 $N=\left[\frac4\eps\right]+1$。</p>
<p>(3) $0<\sqrt{n+1}-\sqrt n=\frac1{\sqrt{n+1}+\sqrt n}<\frac1{2\sqrt n}$。要使 $\frac1{2\sqrt n}<\eps$，只需 $n>\frac1{4\eps^2}$，取 $N=\left[\frac1{4\eps^2}\right]+1$。</p>
<p>(4) $n\ge2$ 时 $2^n=(1+1)^n\ge1+n+\frac{n(n-1)}2>\frac{n(n-1)}2$，所以 $0<\frac n{2^n}<\frac2{n-1}$。要使 $\frac2{n-1}<\eps$，只需 $n>1+\frac2\eps$，取 $N=\left[\frac2\eps\right]+2$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="不收敛的表述与证明">
<p>(1) 用 $\eps$-$N$ 语言写出“$\{a_n\}$ 不以 $3$ 为极限”，并在数轴上解释其含义；(2) 证明数列 $\left\{\sin\frac{n\pi}2\right\}$ 发散；(3) 证明数列 $\{n\}$ 不以任何实数为极限。</p>
<x-hint>(2) 数列为 $1,0,-1,0,1,0,-1,0,\cdots$，$1$ 和 $-1$ 都出现无穷多次，仿照<x-ref to="ex-alt"></x-ref>；(3) 用有界性。</x-hint>
<x-ans>
<p>(1) 存在 $\eps_0>0$，对任意正整数 $N$，存在 $n>N$，使 $|a_n-3|\ge\eps_0$。含义：区间 $(3-\eps_0,3+\eps_0)$ 之外有数列的无穷多项。</p>
<p>(2) 任取实数 $a$，令 $\eps_0=1$。对任意 $N$，取 $n_1=4N+1$，$n_2=4N+3$，则 $a_{n_1}=1$，$a_{n_2}=-1$，而 $|1-a|+|-1-a|\ge2$，所以 $|a_{n_1}-a|$、$|a_{n_2}-a|$ 中至少有一个不小于 $1$。故任何 $a$ 都不是极限，数列发散。</p>
<p>(3) 若 $\{n\}$ 收敛，由<x-ref to="thm-bdd"></x-ref>它有界，但 $\{n\}$ 无上界（Archimedes 性质），矛盾。也可以直接用定义：任取 $a$，令 $\eps_0=1$，对任意 $N$，取 $n>\max\{N,|a|+1\}$，则 $|n-a|\ge n-|a|>1$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="用运算法则求极限">
<div>
<p>求下列极限：</p>
<p>(1) $\displaystyle\lim_{n\to\infty}\frac{3n^3+2n-1}{4n^3-n^2+7}$；(2) $\displaystyle\lim_{n\to\infty}\frac{1+2+\cdots+n}{n^2}$；(3) $\displaystyle\lim_{n\to\infty}\left(\sqrt{n^2+4n}-n\right)$；</p>
<p>(4) $\displaystyle\lim_{n\to\infty}\frac{2^n+3^n}{2^{n+1}+3^{n+1}}$；(5) $\displaystyle\lim_{n\to\infty}\frac{1+\frac12+\cdots+\frac1{2^n}}{1+\frac13+\cdots+\frac1{3^n}}$。</p>
</div>
<x-check answer="3/4">(1)</x-check>
<x-check answer="1/2">(2)</x-check>
<x-check answer="2">(3)</x-check>
<x-check answer="1/3">(4)</x-check>
<x-check answer="4/3">(5)</x-check>
<x-hint>(2) 先求和；(3) 有理化；(4) 分子分母同除以 $3^n$；(5) 分子、分母都是几何级数的部分和。</x-hint>
<x-ans>
<p>(1) 同除以 $n^3$：$\frac{3+\frac2{n^2}-\frac1{n^3}}{4-\frac1n+\frac7{n^3}}\to\frac34$。</p>
<p>(2) $\frac{n(n+1)}{2n^2}=\frac12\left(1+\frac1n\right)\to\frac12$。注意不能写成 $\frac1{n^2}+\frac2{n^2}+\cdots+\frac n{n^2}\to0+0+\cdots+0$。</p>
<p>(3) $\frac{4n}{\sqrt{n^2+4n}+n}=\frac4{\sqrt{1+\frac4n}+1}\to2$。</p>
<p>(4) $\frac{\left(\frac23\right)^n+1}{2\left(\frac23\right)^n+3}\to\frac{0+1}{0+3}=\frac13$。</p>
<p>(5) 分子 $=\frac{1-\left(\frac12\right)^{n+1}}{1-\frac12}\to2$，分母 $=\frac{1-\left(\frac13\right)^{n+1}}{1-\frac13}\to\frac32$，极限为 $\frac43$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="用夹逼准则求极限">
<p>求：(1) $\displaystyle\lim_{n\to\infty}\biggl(\frac1{n^2+1}+\frac2{n^2+2}+\cdots+\frac n{n^2+n}\biggr)$；(2) $\displaystyle\lim_{n\to\infty}\sqrt[n]{3^n+n\cdot2^n}$；(3) $\displaystyle\lim_{n\to\infty}\frac{5^n}{n!}$。</p>
<x-check answer="1/2">(1)</x-check>
<x-check answer="3">(2)</x-check>
<x-check answer="0">(3)</x-check>
<x-hint>(1) 把所有分母都换成 $n^2+n$ 或 $n^2+1$；(2) $3^n\le3^n+n\cdot2^n\le(n+1)3^n$，再说明 $\sqrt[n]{n+1}\to1$；(3) 把除 $\frac5n$ 以外的大部分因子放大，参考<x-ref to="ex-fact"></x-ref>。</x-hint>
<x-ans>
<p>(1) 第 $k$ 项满足 $\frac k{n^2+n}\le\frac k{n^2+k}\le\frac k{n^2+1}$，求和得</p>
$$\frac{n(n+1)}{2(n^2+n)}\le S_n\le\frac{n(n+1)}{2(n^2+1)},$$
<p>左边恒等于 $\frac12$，右边 $=\frac{1+\frac1n}{2\left(1+\frac1{n^2}\right)}\to\frac12$，故极限为 $\frac12$。</p>
<p>(2) $3\le\sqrt[n]{3^n+n\cdot2^n}\le3\sqrt[n]{n+1}$，而 $1\le\sqrt[n]{n+1}\le\sqrt[n]{2n}=\sqrt[n]2\cdot\sqrt[n]n\to1$，故极限为 $3$。</p>
<p>(3) $n\ge6$ 时，$\frac{5^n}{n!}=\frac{5^5}{5!}\cdot\frac56\cdot\frac57\cdots\frac5n$，其中 $\frac56,\cdots,\frac5{n-1}$ 都小于 $1$，所以</p>
$$0<\frac{5^n}{n!}\le\frac{5^5}{5!}\cdot\frac5n=\frac{3125}{24n}\to0.$$
<p>一般地，对任意常数 $a$，都有 $\frac{a^n}{n!}\to0$：阶乘比指数增长得快。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="绝对值与开方">
<p>(1) 证明：若 $\lim a_n=a$，则 $\lim|a_n|=|a|$；举例说明逆命题不成立，并证明 $a=0$ 时逆命题成立。(2) 设 $a_n\ge0$，$\lim a_n=a$，证明 $\lim\sqrt{a_n}=\sqrt a$。</p>
<x-hint>(2) 分 $a=0$ 和 $a>0$ 两种情形；$a>0$ 时 $|\sqrt{a_n}-\sqrt a|=\frac{|a_n-a|}{\sqrt{a_n}+\sqrt a}$。</x-hint>
<x-ans>
<p>(1) $\big||a_n|-|a|\big|\le|a_n-a|$，所以 $|a_n-a|<\eps$ 蕴含 $\big||a_n|-|a|\big|<\eps$。反例：$a_n=(-1)^n$，$|a_n|\to1$，但 $a_n$ 发散。$a=0$ 时 $|a_n-0|=\big||a_n|-0\big|$，两个命题完全相同。</p>
<p>(2) 由<x-ref to="cor-le"></x-ref>，$a\ge0$。若 $a=0$：任给 $\eps>0$，存在 $N$，$n>N$ 时 $a_n<\eps^2$，于是 $\sqrt{a_n}<\eps$。若 $a>0$：</p>
$$|\sqrt{a_n}-\sqrt a|=\frac{|a_n-a|}{\sqrt{a_n}+\sqrt a}\le\frac{|a_n-a|}{\sqrt a},$$
<p>任给 $\eps>0$，取 $N$ 使 $n>N$ 时 $|a_n-a|<\sqrt a\,\eps$ 即可。同理可证 $\sqrt[k]{a_n}\to\sqrt[k]a$（利用 $x^k-y^k=(x-y)(x^{k-1}+x^{k-2}y+\cdots+y^{k-1})$）。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="奇偶两部分">
<p>证明：$\lim a_n=a$ 的充分必要条件是 $\displaystyle\lim_{k\to\infty}a_{2k}=a$ 且 $\displaystyle\lim_{k\to\infty}a_{2k-1}=a$。由此证明数列 $\left\{\frac{n+(-1)^n}n\right\}$ 收敛，而 $\left\{(-1)^n\frac n{n+1}\right\}$ 发散。</p>
<x-hint>充分性：对偶数项、奇数项分别取 $K_1$、$K_2$，再令 $N=\max\{2K_1,2K_2-1\}$。</x-hint>
<x-ans>
<p>必要性：任给 $\eps>0$，存在 $N$，$n>N$ 时 $|a_n-a|<\eps$。当 $k>N$ 时 $2k>N$，$2k-1\ge k>N$，所以 $|a_{2k}-a|<\eps$，$|a_{2k-1}-a|<\eps$。</p>
<p>充分性：任给 $\eps>0$，存在 $K_1$，$k>K_1$ 时 $|a_{2k}-a|<\eps$；存在 $K_2$，$k>K_2$ 时 $|a_{2k-1}-a|<\eps$。令 $N=\max\{2K_1,2K_2-1\}$。若 $n>N$ 为偶数，$n=2k$，则 $2k>2K_1$，$k>K_1$；若 $n>N$ 为奇数，$n=2k-1$，则 $2k-1>2K_2-1$，$k>K_2$。两种情形都有 $|a_n-a|<\eps$。</p>
<p>应用：$\frac{n+(-1)^n}n=1+\frac{(-1)^n}n$，偶数项 $1+\frac1{2k}\to1$，奇数项 $1-\frac1{2k-1}\to1$，故收敛于 $1$。而 $(-1)^n\frac n{n+1}$ 的偶数项 $\frac{2k}{2k+1}\to1$，奇数项 $-\frac{2k-1}{2k}\to-1$，两者不同，故发散（若它收敛于某个 $a$，则偶数项与奇数项都应趋于 $a$）。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="比值判别法">
<p>设 $a_n\ne0$，且 $\displaystyle\lim_{n\to\infty}\left|\frac{a_{n+1}}{a_n}\right|=q<1$。证明 $\lim a_n=0$，并由此求 $\displaystyle\lim_{n\to\infty}\frac{n^{10}}{2^n}$ 与 $\displaystyle\lim_{n\to\infty}\frac{a^n}{n!}$（$a$ 为常数）。</p>
<x-check answer="0">$\displaystyle\lim\frac{n^{10}}{2^n}=$</x-check>
<x-hint>取 $r$ 满足 $q<r<1$，则从某项起 $|a_{n+1}|<r|a_n|$，于是 $|a_n|\le Cr^n$。</x-hint>
<x-ans>
<p>取 $r=\frac{1+q}2$，则 $q<r<1$。由保序性，存在 $N$，$n\ge N$ 时 $\left|\frac{a_{n+1}}{a_n}\right|<r$。于是 $n>N$ 时</p>
$$|a_n|<r|a_{n-1}|<r^2|a_{n-2}|<\cdots<r^{n-N}|a_N|=\frac{|a_N|}{r^N}\cdot r^n.$$
<p>$\frac{|a_N|}{r^N}$ 是常数，$r^n\to0$，由夹逼准则 $a_n\to0$。</p>
<p>应用：$\frac{(n+1)^{10}/2^{n+1}}{n^{10}/2^n}=\frac12\left(1+\frac1n\right)^{10}\to\frac12<1$，所以 $\frac{n^{10}}{2^n}\to0$——尽管它开始时增长得很快，$n=10$ 时约为 $9.8\times10^6$。$a\ne0$ 时 $\left|\frac{a^{n+1}/(n+1)!}{a^n/n!}\right|=\frac{|a|}{n+1}\to0$，所以 $\frac{a^n}{n!}\to0$；$a=0$ 时显然。</p>
<x-remark>类似地，若 $\left|\frac{a_{n+1}}{a_n}\right|\to q>1$，则 $|a_n|$ 无限增大。$q=1$ 时无法判断：$\frac1n$ 与 $n$ 的相邻项之比都趋于 $1$。</x-remark>
</x-ans>
</x-prob>

<x-prob level="提高" t="由增量的极限求平均增长">
<p>(1) 设 $\lim(a_n-a_{n-1})=d$，证明 $\displaystyle\lim_{n\to\infty}\frac{a_n}n=d$。(2) 设 $a_1=1$，$a_{n+1}=a_n+\frac{2n+1}{n+1}$，求 $\displaystyle\lim\frac{a_n}n$。</p>
<x-check answer="2">(2) $\displaystyle\lim\frac{a_n}n=$</x-check>
<x-hint>$a_n=a_1+(a_2-a_1)+\cdots+(a_n-a_{n-1})$，再用<x-ref to="ex-cesaro"></x-ref>。</x-hint>
<x-ans>
<p>(1) 记 $b_1=a_1$，$b_k=a_k-a_{k-1}$（$k\ge2$），则 $b_k\to d$，且 $a_n=b_1+b_2+\cdots+b_n$。由算术平均的极限，$\frac{a_n}n=\frac{b_1+\cdots+b_n}n\to d$。</p>
<p>(2) $a_{n+1}-a_n=\frac{2n+1}{n+1}=2-\frac1{n+1}\to2$，由 (1)，$\frac{a_n}n\to2$。</p>
<x-remark>直观意义：若每一步的增量趋于 $d$，则长期的平均增量也趋于 $d$。比如某人每月存款的增加额逐渐稳定在 $3000$ 元，那么长期来看，平均每月的存款增长也是 $3000$ 元，与开头几个月的波动无关。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="几何平均的极限">
<p>设 $a_n>0$，$\lim a_n=a>0$。证明 $\displaystyle\lim_{n\to\infty}\sqrt[n]{a_1a_2\cdots a_n}=a$，并由此再证一次 $\sqrt[n]n\to1$。</p>
<x-hint>用平均值不等式（<x-ref to="1-2/thm-amgm"></x-ref>）：调和平均 $\le$ 几何平均 $\le$ 算术平均，再对两端用<x-ref to="ex-cesaro"></x-ref>。对 $\sqrt[n]n$，令 $a_1=1$，$a_k=\frac k{k-1}$。</x-hint>
<x-ans>
<p>由平均值不等式，</p>
$$\frac n{\frac1{a_1}+\cdots+\frac1{a_n}}\le\sqrt[n]{a_1\cdots a_n}\le\frac{a_1+\cdots+a_n}n.$$
<p>右端 $\to a$。因为 $\frac1{a_n}\to\frac1a$，由算术平均的极限，$\frac1n\left(\frac1{a_1}+\cdots+\frac1{a_n}\right)\to\frac1a$，取倒数得左端 $\to a$。由夹逼准则即得结论。</p>
<p>令 $a_1=1$，$a_k=\frac k{k-1}$（$k\ge2$），则 $a_k\to1$，且 $a_1a_2\cdots a_n=1\cdot\frac21\cdot\frac32\cdots\frac n{n-1}=n$，所以 $\sqrt[n]n\to1$。</p>
<x-remark>$a=0$ 时结论仍成立（只用右半边的不等式和夹逼准则）。几何平均衡量的是“平均增长倍数”：若某基金每年的收益倍数逐渐稳定在 $1.05$，则长期的年化平均倍数也趋于 $1.05$。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="“卷积”型平均">
<div>
<p>设 $\lim a_n=a$，$\lim b_n=b$。证明</p>
$$\lim_{n\to\infty}\frac{a_1b_n+a_2b_{n-1}+\cdots+a_nb_1}n=ab.$$
</div>
<x-hint>令 $\alpha_k=a_k-a$，则 $\alpha_k\to0$。把分子拆成 $a(b_1+\cdots+b_n)$ 与 $\alpha_1b_n+\cdots+\alpha_nb_1$ 两部分；后一部分用 $|b_k|\le M$ 及<x-ref to="ex-cesaro"></x-ref>。</x-hint>
<x-ans>
<p>令 $\alpha_k=a_k-a$，则 $\alpha_k\to0$，且</p>
$$\frac{a_1b_n+\cdots+a_nb_1}n=a\cdot\frac{b_1+\cdots+b_n}n+\frac{\alpha_1b_n+\alpha_2b_{n-1}+\cdots+\alpha_nb_1}n.$$
<p>第一项 $\to ab$。由<x-ref to="thm-bdd"></x-ref>，存在 $M$ 使 $|b_k|\le M$，所以第二项的绝对值不超过 $M\cdot\frac{|\alpha_1|+\cdots+|\alpha_n|}n$；而 $|\alpha_k|\to0$，由算术平均的极限，它趋于 $0$。所以原极限为 $ab$。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="$\left(1+\frac1{n^2}\right)^n$ 的极限">
<p>(1) 证明：当 $0\le x<\frac1n$ 时，$(1+x)^n\le\frac1{1-nx}$；(2) 由此证明 $\displaystyle\lim_{n\to\infty}\left(1+\frac1{n^2}\right)^n=1$；(3) 这与 $\left(1+\frac1n\right)^n\to e$ 有什么不同？</p>
<x-hint>(1) $(1+x)^n(1-x)^n=(1-x^2)^n\le1$，再对 $(1-x)^n$ 用 Bernoulli 不等式。</x-hint>
<x-ans>
<p>(1) $(1+x)^n(1-x)^n=(1-x^2)^n\le1$，又由 Bernoulli 不等式 $(1-x)^n\ge1-nx>0$，所以 $(1+x)^n\le\frac1{(1-x)^n}\le\frac1{1-nx}$。</p>
<p>(2) 取 $x=\frac1{n^2}$（$n\ge2$ 时 $nx=\frac1n<1$），得</p>
$$1\le\left(1+\frac1{n^2}\right)^n\le\frac1{1-\frac1n}=\frac n{n-1}\to1,$$
<p>由夹逼准则，极限为 $1$。</p>
<p>(3) 两者都是“底数趋于 $1$、指数趋于无穷”的 $1^\infty$ 型。$\left(1+\frac1{n^2}\right)^n$ 的底数趋于 $1$ 的速度（$\frac1{n^2}$）远快于指数增长的速度（$n$），结果是 $1$；而 $\left(1+\frac1n\right)^n$ 中两者“势均力敌”，结果是 $e$。$1^\infty$ 型的结果取决于这种竞争，这正是 §2.3 讨论待定型的原因。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="给药方案与稳态药量">
<p>某抗生素每 $6$ 小时注射一次，每次 $200$ mg；每过 $6$ 小时，体内药量只剩下 $25\%$。设 $x_n$ 为第 $n$ 次注射后体内的药量（$x_1=200$）。(1) 写出递推公式与 $x_n$ 的通项；(2) 求 $\lim x_n$；(3) 从第几次注射起，注射后的药量与稳态值之差小于 $1$ mg？(4) 若希望稳态药量（每次注射后的药量）为 $400$ mg，每次应注射多少？</p>
<x-check answer="800/3" unit="mg">(2) $\lim x_n=$</x-check>
<x-check answer="5">(3) 从第几次注射起</x-check>
<x-check answer="300" unit="mg">(4) 每次注射</x-check>
<x-hint>仿照正文中的“药物在体内的积累”：设稳态 $L=0.25L+200$，则 $\{x_n-L\}$ 是等比数列。</x-hint>
<x-ans>
<p>(1) $x_{n+1}=0.25x_n+200$。稳态 $L$ 满足 $L=0.25L+200$，$L=\frac{800}3$。$x_{n+1}-L=0.25(x_n-L)$，所以 $x_n-L=0.25^{n-1}(x_1-L)=-\frac{200}3\cdot0.25^{n-1}$，即</p>
$$x_n=\frac{800}3-\frac{200}3\cdot0.25^{n-1}=\frac{800}3\left(1-0.25^n\right).$$
<p>(2) $0.25^n\to0$，所以 $\lim x_n=\frac{800}3\approx266.67$ mg。</p>
<p>(3) $L-x_n=\frac{800}3\cdot0.25^n$：$n=4$ 时约为 $1.04$，$n=5$ 时约为 $0.26$。所以从第 $5$ 次注射起，差值小于 $1$ mg。</p>
<p>(4) 每次注射 $D$ mg 时，稳态为 $\frac D{1-0.25}=\frac43D$。令 $\frac43D=400$，得 $D=300$ mg。</p>
<x-remark>稳态药量 $=\frac{\text{每次剂量}}{1-\text{残留比例}}$，与初始状态无关；残留比例越高（药物代谢越慢），稳态越高，接近稳态也越慢。这是药代动力学中设计给药方案的基本公式。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="反弹小球">
<p>一个小球从 $2$ m 高处自由落下，每次落地后反弹的高度为前一次高度的 $\frac35$。(1) 小球从开始下落到最终静止，经过的总路程是多少？(2) 不计空气阻力，取 $g=9.8\ \text{m/s}^2$，从高 $h$ 处下落一次用时 $\sqrt{2h/g}$，求小球运动的总时间。</p>
<x-check answer="8" unit="m">(1) 总路程</x-check>
<x-check answer="sqrt(4/9.8)*(1+sqrt(0.6))/(1-sqrt(0.6))" tol="0.01" unit="s">(2) 总时间约为</x-check>
<x-hint>第 $k$ 次反弹的高度 $h_k=2\cdot0.6^k$，小球上升、下落各经过一次；一次“上升 + 下落”用时 $2\sqrt{2h_k/g}$，这些时间构成公比为 $\sqrt{0.6}$ 的等比数列。</x-hint>
<x-ans>
<p>(1) 总路程</p>
$$S=2+2\sum_{k=1}^\infty2\cdot0.6^k=2+4\cdot\frac{0.6}{1-0.6}=2+6=8\ \text{m}.$$
<p>(2) 首次下落用时 $t_0=\sqrt{\frac{2\times2}{9.8}}\approx0.6389$ s。第 $k$ 次反弹的上升与下落共用时 $2\sqrt{\frac{2h_k}g}=2t_0q^k$，其中 $q=\sqrt{0.6}\approx0.7746$。总时间</p>
$$T=t_0+2t_0\sum_{k=1}^\infty q^k=t_0\left(1+\frac{2q}{1-q}\right)=t_0\cdot\frac{1+q}{1-q}\approx0.6389\times7.873\approx5.03\ \text{s}.$$
<x-remark>无穷多次反弹，却在有限的时间内完成，这又是一个“无穷多项之和可以有限”的例子。真实的小球大约 $5$ 秒后就不再明显跳动，与模型基本相符；当然，反弹高度很小时，“每次反弹为前一次的 $\frac35$”这个假设就不准确了。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="等额本息房贷">
<p>小王向银行贷款 $P=100$ 万元，月利率 $r=0.4\%$，分 $N=360$ 个月（30 年）等额还款，每月末还 $A$ 元。(1) 设第 $k$ 个月还款后的欠款为 $B_k$（$B_0=P$），写出递推公式，求 $B_k$ 的表达式，并由 $B_N=0$ 求出 $A$；(2) 计算月供 $A$ 和总利息（已知 $1.004^{360}\approx4.20859$）；(3) 若还款期 $N\to\infty$，月供 $A_N$ 趋于多少？解释其含义。</p>
<x-check answer="5246.65" tol="0.05" unit="元">(2) 月供 $A\approx$</x-check>
<x-check answer="4000" unit="元">(3) $\lim A_N=$</x-check>
<x-hint>$B_{k+1}=(1+r)B_k-A$；仿照药物问题找出“不动点” $\frac Ar$，则 $\left\{B_k-\frac Ar\right\}$ 是等比数列。</x-hint>
<x-ans>
<p>(1) $B_{k+1}=(1+r)B_k-A$。不动点 $L$ 满足 $L=(1+r)L-A$，$L=\frac Ar$。于是 $B_k-\frac Ar=(1+r)^k\left(P-\frac Ar\right)$，即</p>
$$B_k=(1+r)^kP-A\cdot\frac{(1+r)^k-1}r.$$
<p>令 $B_N=0$，得 $A=\frac{Pr(1+r)^N}{(1+r)^N-1}$。</p>
<p>(2) $A=\frac{10^6\times0.004\times4.20859}{3.20859}\approx5246.65$ 元；总还款 $360A\approx188.88$ 万元，总利息约 $88.88$ 万元。</p>
<p>(3) $A_N=\frac{Pr}{1-(1+r)^{-N}}$，而 $(1+r)^{-N}=\left(\frac1{1+r}\right)^N\to0$，所以 $A_N\to Pr=4000$ 元。含义：还款期再长，月供也不会低于每月的利息 $4000$ 元，否则欠款会越滚越多。30 年期的月供 $5246.65$ 元已经比 $4000$ 元高不了多少，继续延长贷款期限对降低月供的作用很有限，却会大大增加总利息。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="永续年金的现值">
<p>某奖学金基金每年末发放 $1$ 万元，永续发放。设年利率为 $4\%$，第 $k$ 年末的 $1$ 万元相当于现在的 $\frac1{1.04^k}$ 万元（称为现值）。(1) 至少要一次性存入多少钱才能设立这项基金？(2) 若发放额每年增长 $2\%$（第 $k$ 年末发放 $1.02^{k-1}$ 万元），又需要多少？</p>
<x-check answer="25" unit="万元">(1)</x-check>
<x-check answer="50" unit="万元">(2)</x-check>
<x-hint>前 $n$ 年发放额的现值之和是等比数列的部分和，再令 $n\to\infty$。</x-hint>
<x-ans>
<p>(1) $\displaystyle\lim_{n\to\infty}\sum_{k=1}^n\frac1{1.04^k}=\frac{1/1.04}{1-1/1.04}=\frac1{0.04}=25$ 万元。直观上：$25$ 万元每年的利息恰好是 $1$ 万元，本金永远不动。</p>
<p>(2) $\displaystyle\sum_{k=1}^\infty\frac{1.02^{k-1}}{1.04^k}=\frac1{1.04}\sum_{k=0}^\infty\left(\frac{1.02}{1.04}\right)^k=\frac1{1.04}\cdot\frac{1.04}{0.02}=50$ 万元。若增长率达到或超过利率，部分和无限增大，任何有限的本金都不够。</p>
</x-ans>
</x-prob>
`);
