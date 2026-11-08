/* §1.1 集合 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("1-1", String.raw`
<x-goal>
<ul>
<li>理解集合、元素、子集、空集、幂集等概念，会用列举法与描述法表示集合，熟悉区间与邻域记号；</li>
<li>掌握并、交、差、补、对称差及其运算律，会用<span class="kw">元素法</span>（双向包含）证明集合等式；</li>
<li>会计算一列集合（集族）的并与交，例如 $\bigcup_{n=1}^{\infty}\left[\frac1n,1\right]$；</li>
<li>理解“对等”“可列”的含义，知道 $\Z,\Q$ 可列而 $\R$ 不可列，能复述 Cantor 对角线论证；</li>
<li>掌握 Descartes 乘积集合，理解坐标平面 $\R^2$ 是怎样由实数集“乘”出来的。</li>
</ul>
</x-goal>

<p>数学分析研究的对象是函数，而函数是定义在集合上的“对应规则”；极限、连续、可积这些概念，归根到底也都在描述某些集合的性质（比如“使 $|x_n-a|\ge\eps$ 的下标 $n$ 只有有限个”）。所以第一章先把<span class="kw">集合的语言</span>准备好。本节内容大多不难，但请做到“写得出、读得懂、证得清”——后面每一章都要用。</p>

<h2 id="basic">集合与元素</h2>

<x-def t="集合与元素">
<p>把具有某种确定性质的对象汇集在一起，就构成一个<span class="kw">集合</span>（简称<em>集</em>），其中每个对象称为这个集合的<span class="kw">元素</span>。若 $x$ 是集合 $A$ 的元素，记作 $x\in A$（读作“$x$ 属于 $A$”），否则记作 $x\notin A$。</p>
</x-def>

<p>集合中的元素有三个基本特点：</p>
<ul>
<li><b>确定性</b>：任给一个对象，它是否属于这个集合是确定的。“很大的数的全体”不构成集合，“大于 $10^{6}$ 的整数的全体”则构成集合；</li>
<li><b>互异性</b>：同一元素只算一次，$\{1,1,2\}$ 与 $\{1,2\}$ 是同一个集合；</li>
<li><b>无序性</b>：$\{1,2,3\}=\{3,1,2\}$。</li>
</ul>

<p>表示集合常用两种方法：</p>
<ul>
<li><b>列举法</b>：把元素一一列出，如 $\{1,2,3\}$；规律明显时也可写成 $\{1,3,5,7,\cdots\}$；</li>
<li><b>描述法</b>：写成 $\{x\mid x \text{ 具有性质 } P\}$，或 $\{x\in X\mid P(x)\}$（$X$ 指明 $x$ 的取值范围），例如 $\{x\in\R\mid x^2<2\}=(-\sqrt2,\sqrt2)$。竖线也常写成冒号。</li>
</ul>

<p>常用数集的记号：</p>
<table class="center">
<tr><th>记号</th><th>含义</th><th>记号</th><th>含义</th></tr>
<tr><td>$\N$</td><td>自然数集 $\{0,1,2,\cdots\}$</td><td>$\Np$</td><td>正整数集 $\{1,2,3,\cdots\}$</td></tr>
<tr><td>$\Z$</td><td>整数集</td><td>$\Q$</td><td>有理数集 $\{p/q\mid p\in\Z,\ q\in\Np\}$</td></tr>
<tr><td>$\R$</td><td>实数集</td><td>$\C$</td><td>复数集</td></tr>
</table>

<x-note><p>按照国家标准，自然数集 $\N$ 包含 $0$；不少老教材中的 $\N$ 从 $1$ 开始，阅读其他书时要注意区分。本站凡是需要“从 $1$ 开始”的地方都写 $\Np$。</p></x-note>

<x-def t="子集、相等与真子集">
<p>若集合 $A$ 的每个元素都属于集合 $B$，即 $x\in A\Rightarrow x\in B$，则称 $A$ 是 $B$ 的<span class="kw">子集</span>，记作 $A\subset B$ 或 $B\supset A$。若 $A\subset B$ 且 $B\subset A$，则称 $A$ 与 $B$ <span class="kw">相等</span>，记作 $A=B$。若 $A\subset B$ 但 $A\neq B$，则称 $A$ 是 $B$ 的<span class="kw">真子集</span>，记作 $A\subsetneqq B$。</p>
</x-def>

<x-note><p>这里的 $A\subset B$ 允许 $A=B$（相当于中学课本里的 $\subseteq$）。“$A=B$ 当且仅当 $A\subset B$ 且 $B\subset A$”看起来像废话，却是证明两个集合相等的<b>基本方法</b>，下面会反复使用。</p></x-note>

<x-def t="空集">
<p>不含任何元素的集合称为<span class="kw">空集</span>，记作 $\varnothing$。空集是任何集合的子集：对任意集合 $A$，$\varnothing\subset A$。</p>
</x-def>

<x-intuit t="为什么空集是任何集合的子集">
<p>按定义，$\varnothing\subset A$ 的意思是“$\varnothing$ 中的每个元素都属于 $A$”。要推翻它，必须找出一个属于 $\varnothing$ 而不属于 $A$ 的元素——可是 $\varnothing$ 根本没有元素，所以这句话无法被推翻，只能成立。这种“前提永远不满足，所以命题自动为真”的情形叫做<em>空虚真</em>（vacuous truth）。日常例子：“我口袋里的每一枚硬币都是金币”——如果口袋是空的，这句话就不是假话。</p>
</x-intuit>

<x-def t="幂集">
<p>集合 $A$ 的所有子集组成的集合称为 $A$ 的<span class="kw">幂集</span>，记作 $2^{A}$ 或 $\mathcal P(A)$。</p>
</x-def>

<x-ex t="列出全部子集">
<p>写出 $A=\{a,b,c\}$ 的幂集。</p>
<x-sol>
<p>按子集的元素个数分类列出：</p>
$$2^{A}=\bigl\{\varnothing,\ \{a\},\{b\},\{c\},\ \{a,b\},\{a,c\},\{b,c\},\ \{a,b,c\}\bigr\},$$
<p>共 $8=2^3$ 个元素，其中真子集 $7$ 个（去掉 $A$ 本身）。</p>
</x-sol>
<x-remark>$2^{A}$ 的元素本身是集合：$\{a\}\in 2^{A}$，而 $a\notin 2^{A}$；$\varnothing\in 2^{A}$，同时也有 $\varnothing\subset 2^{A}$。分清“是元素”与“是子集”是本节最基本的功夫。</x-remark>
</x-ex>

<x-prop t="幂集的元素个数" id="pow">
<p>若 $A$ 有 $n$ 个元素，则 $2^{A}$ 有 $2^{n}$ 个元素。</p>
<x-proof>
<p>构造 $A$ 的一个子集 $S$，相当于对 $A$ 的 $n$ 个元素逐一决定“放进 $S$”还是“不放进 $S$”。每个元素有 $2$ 种选择，不同的选择方式给出不同的子集，所以共有 $2\times2\times\cdots\times2=2^n$ 个子集。也可以按子集的元素个数 $k$ 分类计数：$\sum_{k=0}^{n}\binom nk=(1+1)^n=2^n$。</p>
</x-proof>
</x-prop>

<p>证明中“放进 / 不放进”的想法很有用：把“放进”记为 $1$、“不放进”记为 $0$，$A$ 的子集就与长度为 $n$ 的 $0$-$1$ 串一一对应。这也是记号 $2^{A}$ 的来历。</p>

<h3>区间与邻域</h3>

<p>设 $a,b\in\R$，$a<b$。数学分析中最常用的实数子集是区间：</p>
<table class="center">
<tr><th>名称</th><th>记号</th><th>定义</th></tr>
<tr><td>开区间</td><td>$(a,b)$</td><td>$\{x\mid a<x<b\}$</td></tr>
<tr><td>闭区间</td><td>$[a,b]$</td><td>$\{x\mid a\le x\le b\}$</td></tr>
<tr><td>半开半闭区间</td><td>$[a,b)$，$(a,b]$</td><td>$\{x\mid a\le x<b\}$，$\{x\mid a<x\le b\}$</td></tr>
<tr><td>无穷区间</td><td>$(a,+\infty)$，$[a,+\infty)$</td><td>$\{x\mid x>a\}$，$\{x\mid x\ge a\}$</td></tr>
<tr><td>无穷区间</td><td>$(-\infty,b)$，$(-\infty,b]$</td><td>$\{x\mid x<b\}$，$\{x\mid x\le b\}$</td></tr>
<tr><td>全体实数</td><td>$(-\infty,+\infty)$</td><td>$\R$</td></tr>
</table>

<x-def t="邻域">
<p>设 $a\in\R$，$\delta>0$。称开区间
$$O(a,\delta)=\{x\mid |x-a|<\delta\}=(a-\delta,\,a+\delta)$$
为点 $a$ 的 <span class="kw">$\delta$ 邻域</span>，$a$ 称为邻域的中心，$\delta$ 称为半径。去掉中心后的集合 $O(a,\delta)\setminus\{a\}=\{x\mid 0<|x-a|<\delta\}$ 称为 $a$ 的<span class="kw">去心 $\delta$ 邻域</span>。</p>
</x-def>

<p>“$|x-a|<\delta$”读作“$x$ 与 $a$ 的距离小于 $\delta$”。以后描述“$x$ 充分靠近 $a$”时，用的就是邻域的语言。</p>

<x-warn>
<ul>
<li>$+\infty$、$-\infty$ 只是记号，<b>不是实数</b>，所以不能写 $[a,+\infty]$，也不能对它做普通的加减运算；</li>
<li>“属于”与“包含于”是两种关系：$1\in\{1,2\}$，$\{1\}\subset\{1,2\}$；而 $1\subset\{1,2\}$、$\{1\}\in\{1,2\}$ 都是错误写法；</li>
<li>$0$、$\{0\}$、$\varnothing$、$\{\varnothing\}$ 是四个不同的东西：$\{0\}$ 有一个元素 $0$；$\varnothing$ 没有元素；$\{\varnothing\}$ 有一个元素，这个元素恰好是空集。</li>
</ul>
</x-warn>

<h2 id="ops">集合的运算</h2>

<x-def t="并、交、差、补">
<p>设 $A,B$ 是两个集合。</p>
<ul>
<li><span class="kw">并集</span> $A\cup B=\{x\mid x\in A \text{ 或 } x\in B\}$；</li>
<li><span class="kw">交集</span> $A\cap B=\{x\mid x\in A \text{ 且 } x\in B\}$；若 $A\cap B=\varnothing$，称 $A$ 与 $B$ <em>不相交</em>；</li>
<li><span class="kw">差集</span> $A\setminus B=\{x\mid x\in A \text{ 且 } x\notin B\}$；</li>
<li>若所讨论的集合都是某个集合 $X$ 的子集，就称 $X$ 为<em>全集</em>（基本集），称 $A^{c}=X\setminus A$ 为 $A$ 的<span class="kw">补集</span>（余集）。</li>
</ul>
<p>此外，称 $A\triangle B=(A\setminus B)\cup(B\setminus A)$ 为 $A$ 与 $B$ 的<span class="kw">对称差</span>，它由“恰好属于其中一个集合”的元素组成。</p>
</x-def>

<x-note><p>数学里的“或”是<b>可兼的</b>：“$x\in A$ 或 $x\in B$”包括 $x$ 同时属于两者的情形。日常语言中“喝茶或咖啡”往往是“二选一”，那更接近对称差。</p></x-note>

<x-viz type="venn" t="用 Venn 图检验集合等式" left="(A∪B)ᶜ" right="Aᶜ∩Bᶜ">
<p>在两个输入框里分别写出等式的两边，组件会比较集合 $A,B$（或 $A,B,C$）划分出的 $4$（或 $8$）个区域，判断两边是否相等；若不相等，会标出差异区域并给出反例。可用符号：∪ ∩ \ ᶜ △ 和括号（也可以用 + * - ' 代替）。也可以从下拉框里选择常见的运算律。</p>
</x-viz>

<x-thm t="集合的运算律" id="laws">
<p>设 $A,B,C$ 都是全集 $X$ 的子集，则</p>
<ol>
<li>交换律：$A\cup B=B\cup A$，$A\cap B=B\cap A$；</li>
<li>结合律：$(A\cup B)\cup C=A\cup(B\cup C)$，$(A\cap B)\cap C=A\cap(B\cap C)$；</li>
<li>分配律：$A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$，$A\cup(B\cap C)=(A\cup B)\cap(A\cup C)$；</li>
<li>De Morgan 律：$(A\cup B)^{c}=A^{c}\cap B^{c}$，$(A\cap B)^{c}=A^{c}\cup B^{c}$；</li>
<li>差与补的关系：$A\setminus B=A\cap B^{c}$。</li>
</ol>
<x-proof>
<p>以 De Morgan 律的第一式和分配律的第一式为例，其余同理。</p>
<p><b>(1)</b> 证 $(A\cup B)^{c}=A^{c}\cap B^{c}$。任取 $x\in(A\cup B)^{c}$，则 $x\notin A\cup B$，即 $x$ 既不属于 $A$ 也不属于 $B$，于是 $x\in A^{c}$ 且 $x\in B^{c}$，即 $x\in A^{c}\cap B^{c}$，这说明 $(A\cup B)^{c}\subset A^{c}\cap B^{c}$。反之，任取 $x\in A^{c}\cap B^{c}$，则 $x\notin A$ 且 $x\notin B$，所以 $x\notin A\cup B$，即 $x\in(A\cup B)^{c}$，这说明 $A^{c}\cap B^{c}\subset(A\cup B)^{c}$。两方面合起来即得等式。</p>
<p><b>(2)</b> 证 $A\cap(B\cup C)=(A\cap B)\cup(A\cap C)$：</p>
<p>$x\in A\cap(B\cup C)$ $\iff$ $x\in A$ 且（$x\in B$ 或 $x\in C$）$\iff$（$x\in A$ 且 $x\in B$）或（$x\in A$ 且 $x\in C$）$\iff$ $x\in(A\cap B)\cup(A\cap C)$。中间一步用的是逻辑上“且”对“或”的分配律。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<x-tip t="元素法（双向包含）">
<p>证明集合等式 $S=T$ 的标准步骤：</p>
<ol>
<li>任取 $x\in S$，根据定义一步步推出 $x\in T$，得 $S\subset T$；</li>
<li>任取 $x\in T$，推出 $x\in S$，得 $T\subset S$；</li>
<li>结论 $S=T$。</li>
</ol>
<p>若每一步推理都可逆，可以像上面 (2) 那样用“$\iff$”一气呵成，但要确保每个 $\iff$ 真的双向成立。另一个常用技巧是用 $A\setminus B=A\cap B^{c}$ 把差化为交，再套用运算律“计算”。</p>
</x-tip>

<x-ex t="差集的 De Morgan 律" id="ex-dm">
<p>证明：$A\setminus(B\cup C)=(A\setminus B)\cap(A\setminus C)$，$A\setminus(B\cap C)=(A\setminus B)\cup(A\setminus C)$。</p>
<x-analysis>“$A\setminus$”相当于“在 $A$ 内取补”，所以应当满足与 De Morgan 律相同形式的等式。可以用元素法直接证，也可以用 $A\setminus B=A\cap B^{c}$ 化为已知的运算律。</x-analysis>
<x-sol l="证明">
<p><b>方法一（元素法）</b>：$x\in A\setminus(B\cup C)$ $\iff$ $x\in A$ 且 $x\notin B\cup C$ $\iff$ $x\in A$ 且 $x\notin B$ 且 $x\notin C$ $\iff$（$x\in A$ 且 $x\notin B$）且（$x\in A$ 且 $x\notin C$）$\iff$ $x\in(A\setminus B)\cap(A\setminus C)$。</p>
<p><b>方法二（运算律）</b>：</p>
$$A\setminus(B\cap C)=A\cap(B\cap C)^{c}=A\cap(B^{c}\cup C^{c})=(A\cap B^{c})\cup(A\cap C^{c})=(A\setminus B)\cup(A\setminus C).$$
</x-sol>
<x-remark>方法二依次用了“差化交”、De Morgan 律和分配律。熟练以后，这类等式基本可以“算”出来，就像代数恒等式一样。</x-remark>
</x-ex>

<x-ex t="一个常见的“错误等式”">
<p>判断 $(A\setminus B)\cup B=A$ 是否对任意集合成立；若不成立，给出正确的结论。</p>
<x-analysis>先在 Venn 图上看：$A\setminus B$ 是从 $A$ 中挖掉与 $B$ 的公共部分，再并上整个 $B$，得到的是 $A\cup B$——比 $A$ 可能多出 $B\setminus A$ 这一块。</x-analysis>
<x-sol>
<p>不成立。反例：$A=\{1\}$，$B=\{2\}$，则 $(A\setminus B)\cup B=\{1,2\}\neq A$。正确的结论是</p>
$$(A\setminus B)\cup B=(A\cap B^{c})\cup B=(A\cup B)\cap(B^{c}\cup B)=(A\cup B)\cap X=A\cup B.$$
<p>因此 $(A\setminus B)\cup B=A$ 当且仅当 $A\cup B=A$，即 $B\subset A$。</p>
</x-sol>
<x-remark>集合的“差”与数的“减”不同：数满足 $(a-b)+b=a$，集合却没有这样的抵消律。在上面的演示中输入 <b>(A\B)∪B</b> 与 <b>A</b>，就能看到差异区域。</x-remark>
</x-ex>

<x-ex t="数轴上的集合运算">
<p>设 $A=\{x\in\R\mid x^2-3x+2\le0\}$，$B=\{x\in\R\mid |x-2|<1\}$，求 $A\cup B$，$A\cap B$，$A\setminus B$，$B\setminus A$ 和 $A^{c}$（全集为 $\R$）。</p>
<x-sol>
<p>由 $x^2-3x+2=(x-1)(x-2)\le0$ 得 $A=[1,2]$；由 $|x-2|<1$ 得 $B=(1,3)$。在数轴上画出两个区间，注意端点的开闭：</p>
<p>$A\cup B=[1,3)$，$A\cap B=(1,2]$，$A\setminus B=\{1\}$，$B\setminus A=(2,3)$，$A^{c}=(-\infty,1)\cup(2,+\infty)$。</p>
</x-sol>
<x-remark>$A\setminus B=\{1\}$ 是单点集，既不是空集，也不是区间——端点往往是这类题最容易出错的地方。</x-remark>
</x-ex>

<h3>任意多个集合的并与交</h3>

<x-def t="集族的并与交">
<p>设 $\Lambda$ 是一个非空的指标集，对每个 $\lambda\in\Lambda$ 给定一个集合 $A_\lambda$，称 $\{A_\lambda\}_{\lambda\in\Lambda}$ 为一个<span class="kw">集族</span>。定义</p>
$$\bigcup_{\lambda\in\Lambda}A_\lambda=\{x\mid \text{存在 }\lambda\in\Lambda\text{ 使 } x\in A_\lambda\},\qquad \bigcap_{\lambda\in\Lambda}A_\lambda=\{x\mid \text{对一切 }\lambda\in\Lambda\text{ 都有 } x\in A_\lambda\}.$$
<p>当 $\Lambda=\Np$ 时写成 $\bigcup_{n=1}^{\infty}A_n$ 与 $\bigcap_{n=1}^{\infty}A_n$。</p>
</x-def>

<p>De Morgan 律对集族同样成立：</p>
$$\Bigl(\bigcup_{\lambda\in\Lambda}A_\lambda\Bigr)^{c}=\bigcap_{\lambda\in\Lambda}A_\lambda^{c},\qquad \Bigl(\bigcap_{\lambda\in\Lambda}A_\lambda\Bigr)^{c}=\bigcup_{\lambda\in\Lambda}A_\lambda^{c}.$$
<p>口诀：<b>并的补等于补的交，交的补等于补的并</b>。证明与有限情形完全一样：“不存在 $\lambda$ 使 $x\in A_\lambda$”就是“对一切 $\lambda$ 都有 $x\notin A_\lambda$”。这种“存在”与“任意”的互换，在第二章写极限定义的否定时还会用到。</p>

<x-ex t="可列个区间的并与交" id="ex-union">
<p>求：(1) $\bigcup_{n=1}^{\infty}\left[\frac1n,1\right]$；(2) $\bigcap_{n=1}^{\infty}\left(-\frac1n,\frac1n\right)$；(3) $\bigcap_{n=1}^{\infty}\left(0,\frac1n\right)$；(4) $\bigcup_{n=1}^{\infty}\left[0,1-\frac1n\right]$。</p>
<x-analysis>先猜：(1) 区间的左端点 $\frac1n$ 越来越靠近 $0$，但永远不等于 $0$，猜结果是 $(0,1]$。然后用双向包含严格证明。关键的一步是：对任意 $x>0$，总有正整数 $n$ 使 $\frac1n<x$——这就是 Archimedes 性质（§2.1），这里先直接使用。</x-analysis>
<x-sol>
<p><b>(1)</b> 结果为 $(0,1]$。一方面每个 $\left[\frac1n,1\right]\subset(0,1]$，故并集含于 $(0,1]$。另一方面，任取 $x\in(0,1]$，取正整数 $n>\frac1x$，则 $\frac1n<x\le1$，即 $x\in\left[\frac1n,1\right]$，从而 $x$ 属于并集。</p>
<p><b>(2)</b> 结果为 $\{0\}$。$0$ 显然属于每个区间。若 $x\ne0$，取 $n>\frac1{|x|}$，则 $|x|>\frac1n$，$x\notin\left(-\frac1n,\frac1n\right)$，所以 $x$ 不属于交集。</p>
<p><b>(3)</b> 结果为 $\varnothing$。$0$ 不属于任何 $\left(0,\frac1n\right)$；若 $x>0$，取 $n>\frac1x$，则 $x\notin\left(0,\frac1n\right)$；$x<0$ 更不必说。没有任何实数属于全部这些区间。</p>
<p><b>(4)</b> 结果为 $[0,1)$。每个区间都含于 $[0,1)$；反之对 $x\in[0,1)$，取 $n>\frac1{1-x}$，则 $x<1-\frac1n$，即 $x\in\left[0,1-\frac1n\right]$。</p>
</x-sol>
<x-remark>(2) 与 (3) 的区别值得体会：两列区间都在“缩向 $0$”，但 (3) 中的区间从来不包含 $0$，所以交集里什么也不剩。可见无限次运算不能凭“取极限”的直觉想当然。另外，(1)、(4) 说明闭区间的可列并可以不是闭区间，(2) 说明开区间的可列交可以不是开区间。</x-remark>
</x-ex>

<x-think><p>$\bigcup_{n=2}^{\infty}\left[\frac1n,1-\frac1n\right]$ 等于什么？$\bigcap_{n=1}^{\infty}\left(0,\frac1n\right)$ 呢？（答案：$(0,1)$；$\varnothing$。）</p></x-think>

<x-app t="布尔检索与容斥原理">
<p>搜索引擎和数据库的“高级检索”本质上就是集合运算。设 $A$ 是含关键词“极限”的网页集合，$B$ 是含“连续”的网页集合，则</p>
<ul>
<li>“极限 AND 连续”对应 $A\cap B$，“极限 OR 连续”对应 $A\cup B$，“极限 NOT 连续”对应 $A\setminus B$；</li>
<li>SQL 语言中的 UNION、INTERSECT、EXCEPT 分别就是并、交、差。</li>
</ul>
<p>统计并集的元素个数要用<span class="kw">容斥原理</span>：对有限集，</p>
$$\card(A\cup B)=\card A+\card B-\card(A\cap B),$$
$$\card(A\cup B\cup C)=\card A+\card B+\card C-\card(A\cap B)-\card(A\cap C)-\card(B\cap C)+\card(A\cap B\cap C).$$
<p>直接把 $\card A$ 与 $\card B$ 相加时，$A\cap B$ 中的元素被数了两次，所以要减去一次；三个集合时，中心部分被加了 $3$ 次、减了 $3$ 次，所以要再加回一次。习题中有这方面的实际问题。</p>
</x-app>
`);
MA.add("1-1", String.raw`
<h2 id="infinite">有限集与无限集</h2>

<p>两个有限集谁的元素多，数一数就知道了。但“数”这个动作本身，其实是在建立集合与 $\{1,2,\cdots,n\}$ 之间的<b>一一对应</b>。不识数的牧羊人每放出一只羊就往口袋里放一颗石子，傍晚羊回圈时再一颗颗取出——他不知道羊有多少只，却能确定羊与石子“一样多”。Cantor 正是把这个朴素的想法推广到了无限集。</p>

<x-def t="对等" id="def-eq">
<p>若存在从集合 $A$ 到集合 $B$ 的一一对应（既单又满的映射，见 §1.2），则称 $A$ 与 $B$ <span class="kw">对等</span>，记作 $A\sim B$。</p>
</x-def>

<p>对等关系满足：$A\sim A$（自反性）；$A\sim B\Rightarrow B\sim A$（对称性）；$A\sim B,\ B\sim C\Rightarrow A\sim C$（传递性）。直观上，对等就是“元素一样多”。</p>

<x-def t="有限集、无限集与可列集">
<p>空集以及与某个 $\{1,2,\cdots,n\}$（$n\in\Np$）对等的集合称为<span class="kw">有限集</span>，不是有限集的集合称为<span class="kw">无限集</span>。与正整数集 $\Np$ 对等的集合称为<span class="kw">可列集</span>（也叫可数集）。有限集与可列集统称为<em>至多可列集</em>。</p>
</x-def>

<p>$A$ 可列，等价于 $A$ 的元素可以<b>不重复、不遗漏</b>地排成一个序列 $a_1,a_2,a_3,\cdots$：一一对应 $n\mapsto a_n$ 就是“给元素编号”。</p>

<x-ex t="部分可以与全体一样多">
<p>证明正偶数集 $E=\{2,4,6,\cdots\}$ 与 $\Np$ 对等，整数集 $\Z$ 是可列集。</p>
<x-sol l="证明">
<p>映射 $n\mapsto2n$ 是 $\Np$ 到 $E$ 的一一对应，故 $E\sim\Np$。</p>
<p>把整数排成 $0,1,-1,2,-2,3,-3,\cdots$，每个整数恰好出现一次。写成公式就是</p>
$$f(n)=\begin{cases}\dfrac n2,& n \text{ 为偶数},\\[2mm] -\dfrac{n-1}2,& n \text{ 为奇数},\end{cases}$$
<p>它是 $\Np$ 到 $\Z$ 的一一对应，所以 $\Z$ 可列。</p>
</x-sol>
<x-remark>$E$ 是 $\Np$ 的真子集，两者却对等：“全体大于部分”对有限集成立，对无限集却不成立。事实上，<b>一个集合是无限集，当且仅当它与自己的某个真子集对等</b>（Dedekind 曾用这条性质来定义无限集）。</x-remark>
</x-ex>

<x-hist t="Hilbert 旅馆">
<p>Hilbert 讲过一个故事：一家旅馆有无穷多个房间，编号 $1,2,3,\cdots$，而且全部住满了。又来了一位客人怎么办？经理请 $n$ 号房的客人搬到 $n+1$ 号房，$1$ 号房就空出来了。如果来了可列无穷多位新客人呢？请 $n$ 号房的客人搬到 $2n$ 号房，所有奇数号房间就都空出来了。这正是 $\Np\sim\Np\setminus\{1\}$ 和 $\Np\sim E$ 的通俗版本。</p>
</x-hist>

<x-thm t="可列个可列集的并是可列集" id="thm-union">
<p>若 $A_1,A_2,\cdots,A_n,\cdots$ 都是可列集，则 $\bigcup_{n=1}^{\infty}A_n$ 也是可列集。</p>
<x-proof>
<p>把 $A_n$ 的元素记为 $a_{n1},a_{n2},a_{n3},\cdots$，排成一张无限的表，第 $n$ 行是 $A_n$ 的元素：</p>
$$\begin{array}{cccc}
a_{11} & a_{12} & a_{13} & \cdots\\
a_{21} & a_{22} & a_{23} & \cdots\\
a_{31} & a_{32} & a_{33} & \cdots\\
\vdots & \vdots & \vdots &
\end{array}$$
<p>沿“斜线”依次排列：先排下标和为 $2$ 的 $a_{11}$，再排下标和为 $3$ 的 $a_{12},a_{21}$，再排下标和为 $4$ 的 $a_{13},a_{22},a_{31}$……下标和为 $k$ 的元素只有 $k-1$ 个，所以每个 $a_{ij}$ 都会在有限步之内被排到。排的过程中跳过已经出现过的元素（不同的 $A_n$ 可能有公共元素），就得到并集的一个不重复、不遗漏的排列。并集包含无限集 $A_1$，所以这个排列是无穷序列，并集可列。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<p>同样的论证说明：至多可列个至多可列集的并是至多可列集；可列集的无限子集是可列集（从排好的序列中删去一些项，再按原来的先后重新编号即可）。</p>

<x-cor t="有理数集可列" id="cor-q">
<p>有理数集 $\Q$ 是可列集。</p>
<x-proof>
<p>对每个 $q\in\Np$，令 $A_q=\{p/q\mid p\in\Z\}$，它与 $\Z$ 对等，是可列集。$\Q=\bigcup_{q=1}^{\infty}A_q$，由<x-ref to="thm-union"></x-ref> 即知 $\Q$ 可列。</p>
</x-proof>
</x-cor>

<x-viz type="enumq" n="8" t="把正有理数排成一列">
<p>按 $p+q=2,3,4,\cdots$ 沿斜线扫描分数表 $\frac pq$，跳过不是既约分数的项（它们代表的数前面已经出现过）。点“下一步”逐步观察，也可以输入一个分数，查询它排在第几位。</p>
</x-viz>

<p>可列集是“最小”的无限集：</p>
<x-thm t="无限集必含可列子集" id="thm-sub">
<p>任何无限集都包含一个可列子集。</p>
<x-proof>
<p>设 $A$ 是无限集。$A$ 非空，任取 $a_1\in A$；$A\setminus\{a_1\}$ 非空（否则 $A$ 有限），任取 $a_2\in A\setminus\{a_1\}$；一般地，若已取出互不相同的 $a_1,\cdots,a_n$，由于 $A$ 是无限集，$A\setminus\{a_1,\cdots,a_n\}\ne\varnothing$，可再取出 $a_{n+1}$。这样就得到 $A$ 的可列子集 $\{a_1,a_2,a_3,\cdots\}$。</p>
</x-proof>
</x-thm>

<p>那么，是不是所有无限集都可列？Cantor 在 1874 年给出了否定的回答。下面的证明是他 1891 年发现的“对角线方法”。</p>

<x-thm t="Cantor" id="thm-cantor">
<p>实数集 $\R$ 不是可列集。</p>
<x-proof>
<p>只要证明区间 $(0,1)$ 不可列（若 $\R$ 可列，它的无限子集 $(0,1)$ 也可列）。用反证法。假设 $(0,1)$ 可列，它的全部元素排成 $x_1,x_2,x_3,\cdots$，把每个数写成十进制小数（像 $0.5=0.4999\cdots$ 这样有两种写法的数，统一取有限小数的写法）：</p>
$$\begin{aligned}
x_1&=0.\,\mathbf{a_{11}}\,a_{12}\,a_{13}\cdots\\
x_2&=0.\,a_{21}\,\mathbf{a_{22}}\,a_{23}\cdots\\
x_3&=0.\,a_{31}\,a_{32}\,\mathbf{a_{33}}\cdots\\
&\ \ \vdots
\end{aligned}$$
<p>构造一个新的数 $b=0.b_1b_2b_3\cdots$，其中</p>
$$b_n=\begin{cases}1,& a_{nn}\ne1,\\ 2,& a_{nn}=1.\end{cases}$$
<p>则 $b\in(0,1)$，并且 $b$ 的各位只出现数字 $1,2$，它的小数表示是唯一的（有两种写法的数，两种写法分别以 $0$ 和 $9$ 无限循环结尾）。对每个 $n$，$b$ 的第 $n$ 位 $b_n\ne a_{nn}$，所以 $b\ne x_n$。于是 $b$ 不在序列 $x_1,x_2,\cdots$ 中，与“这个序列包含 $(0,1)$ 的全部元素”矛盾。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<x-viz type="diagonal" rows="8" t="对角线论证">
<p>表格是“假想的完整列表”的前几行（随机生成）。逐步点击，观察对角线上的数字如何被改写成 $b$ 的各位：无论列表怎样排，$b$ 都与第 $n$ 个数在第 $n$ 位不同。</p>
</x-viz>

<x-cor t="无理数集不可列">
<p>无理数集 $\R\setminus\Q$ 不可列。</p>
<x-proof><p>若无理数集可列，则 $\R=\Q\cup(\R\setminus\Q)$ 是两个可列集的并，也可列，与 Cantor 定理矛盾。</p></x-proof>
</x-cor>

<x-intuit t="“稠密”不等于“多”">
<p>有理数在实数中是<b>稠密</b>的：任意两个不同的实数之间都有有理数（§2.1 会证明）。直觉上有理数“到处都是”，似乎应该和实数一样多，Cantor 定理却说恰恰相反：从“个数”的意义上讲，几乎所有实数都是无理数。可以这样想象：把 $(0,1)$ 中的有理数排成 $r_1,r_2,\cdots$，用长度为 $\frac{\eps}{2^{n}}$ 的小区间盖住 $r_n$，所有小区间的总长度不超过 $\frac\eps2+\frac\eps4+\cdots=\eps$。全部有理数可以被总长任意小的一些区间盖住，而 $(0,1)$ 的长度却是 $1$。</p>
</x-intuit>

<x-ex t="长度不同的区间对等">
<p>证明：任意两个开区间 $(a,b)$ 与 $(c,d)$ 对等；$(0,1)$ 与 $\R$ 对等。</p>
<x-sol l="证明">
<p>线性函数 $f(x)=c+\frac{d-c}{b-a}(x-a)$ 严格单调增加，且 $f(a)=c$，$f(b)=d$，它把 $(a,b)$ 一一地映为 $(c,d)$。</p>
<p>函数 $g(x)=\tan\left(\pi x-\frac\pi2\right)$ 在 $(0,1)$ 上严格单调增加；当 $x$ 从 $0$ 变到 $1$ 时，$\pi x-\frac\pi2$ 从 $-\frac\pi2$ 变到 $\frac\pi2$，$g(x)$ 取遍全体实数。所以 $g$ 是 $(0,1)$ 到 $\R$ 的一一对应。</p>
</x-sol>
<x-remark>长度为 $1$ 的区间与无限长的直线“点一样多”——元素的多少与长度是两回事。$(0,1)$ 与 $[0,1]$ 也对等，留作习题。</x-remark>
</x-ex>

<x-warn>
<ul>
<li>“可列”不是“有序”或“离散”的意思：$\Q$ 稠密而可列；</li>
<li>证明一个集合可列，要说明它的元素能排成<b>一个</b>序列，而且每个元素都在<b>有限</b>步之内出现。把 $\Q$ 按“先排完全部整数、再排分母为 $2$ 的数……”的顺序列举是行不通的：整数永远排不完，分母为 $2$ 的数永远轮不到。斜线排列法的妙处正在于每条斜线上只有有限个元素。</li>
</ul>
</x-warn>

<x-hist t="无穷也有大小">
<p>Cantor 进一步证明了：<b>任何集合 $A$ 都不与它的幂集 $2^{A}$ 对等</b>（证明见习题）。于是 $\Np,\ 2^{\Np},\ 2^{2^{\Np}},\cdots$ 一个比一个“大”，无穷有无穷多个等级。还可以证明 $2^{\Np}\sim\R$。是否存在“比 $\Np$ 多、比 $\R$ 少”的集合？这就是著名的<em>连续统假设</em>。Gödel（1940）和 Cohen（1963）证明了：在通常的集合论公理下，它既不能被证明，也不能被否定。</p>
</x-hist>

<h2 id="product">Descartes 乘积集合</h2>

<x-def t="Descartes 乘积">
<p>设 $A,B$ 是两个集合，称</p>
$$A\times B=\{(x,y)\mid x\in A,\ y\in B\}$$
<p>为 $A$ 与 $B$ 的 <span class="kw">Descartes 乘积集合</span>（直积），其中 $(x,y)$ 是<em>有序对</em>：$(x_1,y_1)=(x_2,y_2)$ 当且仅当 $x_1=x_2$ 且 $y_1=y_2$。类似地定义</p>
$$A_1\times A_2\times\cdots\times A_n=\{(x_1,x_2,\cdots,x_n)\mid x_i\in A_i,\ i=1,2,\cdots,n\}.$$
<p>特别地，$\R^{n}=\underbrace{\R\times\cdots\times\R}_{n\ \text{个}}$ 称为 $n$ 维 Euclid 空间，$\R^2$ 就是坐标平面。</p>
</x-def>

<x-ex t="乘积集合的计算与图形">
<p>(1) 设 $A=\{1,2\}$，$B=\{a,b,c\}$，写出 $A\times B$ 与 $B\times A$；(2) 在坐标平面上画出 $[0,1]\times[0,2]$，$[1,2]\times\R$ 与 $\Z\times\Z$。</p>
<x-sol>
<p>(1) $A\times B=\{(1,a),\allowbreak(1,b),\allowbreak(1,c),\allowbreak(2,a),\allowbreak(2,b),\allowbreak(2,c)\}$，共 $2\times3=6$ 个元素；$B\times A=\{(a,1),\allowbreak(a,2),\allowbreak(b,1),\allowbreak(b,2),\allowbreak(c,1),\allowbreak(c,2)\}$。有序对讲究顺序，所以 $A\times B\ne B\times A$。</p>
<p>(2) $[0,1]\times[0,2]$ 是以 $(0,0),(1,0),(1,2),(0,2)$ 为顶点的闭矩形；$[1,2]\times\R$ 是夹在直线 $x=1$ 与 $x=2$ 之间的竖直带形（含边界）；$\Z\times\Z$ 是平面上全体整点构成的格点阵。</p>
</x-sol>
<x-remark>若 $A$ 有 $m$ 个元素、$B$ 有 $n$ 个元素，则 $A\times B$ 有 $mn$ 个元素——这正是计数中的<b>乘法原理</b>，也是“乘积”这个名字的由来。</x-remark>
</x-ex>

<x-app t="乘积集合无处不在">
<ul>
<li><b>坐标</b>：屏幕上的像素位置是 $\{0,1,\cdots,1919\}\times\{0,1,\cdots,1079\}$ 中的元素；地理位置是“纬度 × 经度”中的元素。</li>
<li><b>颜色</b>：RGB 颜色是 $\{0,1,\cdots,255\}^3$ 中的元素，共 $256^3=16\,777\,216$ 种。</li>
<li><b>数据表</b>：一张“学号 × 课程 × 成绩”的成绩表，是相应乘积集合的一个子集；关系数据库中“关系”一词正来源于此。</li>
<li><b>密码</b>：$6$ 位数字密码的全体是 $\{0,1,\cdots,9\}^6$，共 $10^6$ 个，这就是暴力破解最多要尝试的次数。</li>
</ul>
</x-app>

<x-hist t="有序对是什么">
<p>有序对也可以只用集合来定义：Kuratowski 规定 $(x,y)=\{\{x\},\{x,y\}\}$，可以验证 $(x_1,y_1)=(x_2,y_2)\iff x_1=x_2$ 且 $y_1=y_2$。可见“顺序”这个概念也能完全建立在集合之上——现代数学中几乎所有对象（数、函数、空间）都可以这样用集合构造出来。</p>
</x-hist>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>$A\subset B$ 指“$A$ 的元素都属于 $B$”；$A=B\iff A\subset B$ 且 $B\subset A$，这是证明集合相等的基本方法（元素法）。</li>
<li>最重要的运算律是分配律和 De Morgan 律：并的补等于补的交，交的补等于补的并，对任意集族都成立；差可以化为交：$A\setminus B=A\cap B^{c}$。</li>
<li>无限个集合的并与交要按“存在 / 任意”来理解，不能凭极限直觉，例如 $\bigcap_{n}\left(0,\frac1n\right)=\varnothing$。</li>
<li>对等 = 存在一一对应；可列 = 能排成不重复的序列。$\Np,\Z,\Q$ 以及可列个可列集的并都可列；$\R$、$(0,1)$、无理数集不可列（对角线论证）。</li>
<li>无限集可以与自己的真子集对等；“稠密”不等于“多”，“长度”也不等于“元素个数”。</li>
<li>$A\times B$ 由有序对组成，元素个数服从乘法原理；$\R^2$、$\R^n$ 都是乘积集合。</li>
</ul>
</x-sum>
`);
MA.add("1-1", String.raw`
<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对基本概念的理解">
<x-q type="choice" answer="C">
<x-stem>下列关系中正确的是</x-stem>
<x-opt>$0\in\varnothing$</x-opt>
<x-opt>$\varnothing\in\varnothing$</x-opt>
<x-opt>$\varnothing\subset\{0\}$</x-opt>
<x-opt>$\{0\}\in\{0\}$</x-opt>
<x-exp>空集没有元素，A、B 错；空集是任何集合的子集，C 对；$\{0\}$ 的唯一元素是 $0$ 而不是 $\{0\}$，D 错（应写成 $\{0\}\subset\{0\}$）。</x-exp>
</x-q>
<x-q type="fill" answer="31" ph="填一个整数">
<x-stem>集合 $\{1,2,3,4,5\}$ 共有多少个真子集？</x-stem>
<x-exp>子集共 $2^5=32$ 个，去掉集合本身，真子集有 $31$ 个（空集也是真子集）。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>对任意集合 $A,B$，都有 $(A\setminus B)\cup B=A$。</x-stem>
<x-exp>正确的是 $(A\setminus B)\cup B=A\cup B$，只有当 $B\subset A$ 时才等于 $A$。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>$(A\cap B)^{c}=$</x-stem>
<x-opt>$A^{c}\cap B^{c}$</x-opt>
<x-opt>$A^{c}\cup B^{c}$</x-opt>
<x-opt>$A\cup B$</x-opt>
<x-opt>$A^{c}\setminus B$</x-opt>
<x-exp>De Morgan 律：交的补等于补的并。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>$\bigcap_{n=1}^{\infty}\left(0,\frac1n\right)=$</x-stem>
<x-opt>$\{0\}$</x-opt>
<x-opt>$\varnothing$</x-opt>
<x-opt>$(0,1)$</x-opt>
<x-opt>$\{\varnothing\}$</x-opt>
<x-exp>$0$ 不属于其中任何一个区间；任何 $x>0$ 当 $n>\frac1x$ 时也不属于 $\left(0,\frac1n\right)$。所以交集为空。D 错：$\{\varnothing\}$ 有一个元素（即空集），它本身不是空集。</x-exp>
</x-q>
<x-q type="multi" answer="ABC">
<x-stem>下列集合中，可列集是（多选）</x-stem>
<x-opt>整数集 $\Z$</x-opt>
<x-opt>有理数集 $\Q$</x-opt>
<x-opt>平面上的整点集 $\Z\times\Z$</x-opt>
<x-opt>闭区间 $[0,1]$</x-opt>
<x-opt>无理数集</x-opt>
<x-exp>$\Z$、$\Q$、$\Z\times\Z$ 都可以排成序列；$[0,1]$ 包含不可列集 $(0,1)$，无理数集也不可列。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>任何无限集都与它的某个真子集对等。</x-stem>
<x-exp>无限集 $A$ 含可列子集 $\{a_1,a_2,\cdots\}$；令 $a_n\mapsto a_{n+1}$，其余元素不动，就得到 $A$ 到 $A\setminus\{a_1\}$ 的一一对应（Hilbert 旅馆）。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>有理数在实数中稠密，所以 $\Q$ 与 $\R$ 对等。</x-stem>
<x-exp>$\Q$ 可列而 $\R$ 不可列，两者不对等。“稠密”描述的是位置关系，不代表“一样多”。</x-exp>
</x-q>
<x-q type="fill" answer="6" ph="填一个整数">
<x-stem>设 $A=\{1,2\}$，$B=\{x,y,z\}$，则 $A\times B$ 有多少个元素？</x-stem>
<x-exp>乘法原理：$2\times3=6$。</x-exp>
</x-q>
</x-quiz>

<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果；做完后用题目下方的按钮标记“已掌握 / 需复习”，需复习的题会汇总到错题本。</p>

<x-prob level="基础" t="区间的运算">
<p>设全集为 $\R$，$A=\{x\mid |x-1|<2\}$，$B=\{x\mid x^2\ge4\}$。求 $A\cap B$，$A\cup B$，$A\setminus B$，$B^{c}$。</p>
<x-hint>先把 $A$、$B$ 化成区间：$A$ 是以 $1$ 为中心、半径为 $2$ 的邻域；$x^2\ge4\iff |x|\ge2$。</x-hint>
<x-ans>
<p>$A=(-1,3)$，$B=(-\infty,-2]\cup[2,+\infty)$，所以</p>
<p>$A\cap B=[2,3)$，$A\cup B=(-\infty,-2]\cup(-1,+\infty)$，$A\setminus B=(-1,2)$，$B^{c}=(-2,2)$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="属于与包含">
<div>
<p>设 $X=\{\varnothing,\{\varnothing\}\}$。</p>
<p>(1) 写出 $X$ 的幂集 $2^{X}$；</p>
<p>(2) 判断下列各式的对错：$\varnothing\in X$；$\varnothing\subset X$；$\{\varnothing\}\in X$；$\{\varnothing\}\subset X$；$\{\{\varnothing\}\}\subset X$；$\{\{\varnothing\}\}\in X$。</p>
</div>
<x-hint>$X$ 恰有两个元素：$\varnothing$ 和 $\{\varnothing\}$。判断“$\in$”看它是不是这两个元素之一；判断“$\subset$”看它的每个元素是否属于 $X$。</x-hint>
<x-ans>
<p>(1) $2^{X}=\bigl\{\varnothing,\ \allowbreak \{\varnothing\},\ \allowbreak \{\{\varnothing\}\},\ \allowbreak \{\varnothing,\{\varnothing\}\}\bigr\}$，共 $4$ 个元素。</p>
<p>(2) 前五个都对，最后一个错。$\{\varnothing\}$ 既是 $X$ 的元素，又是 $X$ 的子集（它唯一的元素 $\varnothing$ 属于 $X$）；$\{\{\varnothing\}\}$ 是 $X$ 的子集，但不是 $X$ 的元素。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="用元素法或运算律证明等式">
<div>
<p>证明：</p>
<p>(1) $A\cap(B\setminus C)=(A\cap B)\setminus(A\cap C)$；</p>
<p>(2) $A\cup(B\setminus A)=A\cup B$；</p>
<p>(3) $(A\setminus B)\setminus C=A\setminus(B\cup C)$。</p>
</div>
<x-hint>都可以先把差化成交：$P\setminus Q=P\cap Q^{c}$，再用 De Morgan 律与分配律。</x-hint>
<x-ans>
<p>(1) 右边 $=(A\cap B)\cap(A\cap C)^{c}=(A\cap B)\cap(A^{c}\cup C^{c})=(A\cap B\cap A^{c})\cup(A\cap B\cap C^{c})=\varnothing\cup(A\cap B\cap C^{c})=A\cap(B\setminus C)$。</p>
<p>(2) $A\cup(B\cap A^{c})=(A\cup B)\cap(A\cup A^{c})=(A\cup B)\cap X=A\cup B$。</p>
<p>(3) $(A\cap B^{c})\cap C^{c}=A\cap(B^{c}\cap C^{c})=A\cap(B\cup C)^{c}=A\setminus(B\cup C)$。</p>
<p>也可以用元素法，例如 (3)：$x\in(A\setminus B)\setminus C\iff x\in A,\ x\notin B,\ x\notin C\iff x\in A,\ x\notin B\cup C$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="可列个区间的并与交">
<p>求下列集合并给出证明：(1) $\bigcup_{n=2}^{\infty}\left(\frac1n,\,2-\frac1n\right)$；(2) $\bigcap_{n=1}^{\infty}\left(1-\frac1n,\,1+\frac1n\right)$；(3) $\bigcap_{n=1}^{\infty}[n,+\infty)$；(4) $\bigcup_{n=1}^{\infty}[-n,n]$。</p>
<x-hint>仿照<x-ref to="ex-union"></x-ref>：先猜结果，再用双向包含证明。需要用到“对任意 $x>0$，存在正整数 $n>\frac1x$”。</x-hint>
<x-ans>
<p>(1) $(0,2)$。各区间都含于 $(0,2)$；任取 $x\in(0,2)$，取正整数 $n>\max\left\{\frac1x,\frac1{2-x}\right\}$，则 $\frac1n<x<2-\frac1n$。</p>
<p>(2) $\{1\}$。$1$ 属于每个区间；若 $x\ne1$，取 $n>\frac1{|x-1|}$，则 $|x-1|>\frac1n$，$x\notin\left(1-\frac1n,1+\frac1n\right)$。</p>
<p>(3) $\varnothing$。对任一实数 $x$，取正整数 $n>x$，则 $x\notin[n,+\infty)$。</p>
<p>(4) $\R$。对任一实数 $x$，取正整数 $n\ge|x|$，则 $x\in[-n,n]$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="对称差的性质">
<p>证明：(1) $A\triangle B=(A\cup B)\setminus(A\cap B)$；(2) $A\triangle B=\varnothing\iff A=B$；(3) $(A\triangle B)\triangle C=A\triangle(B\triangle C)$；(4) 若 $A\triangle C=B\triangle C$，则 $A=B$。</p>
<x-hint>(3) 考察一个元素属于 $A,B,C$ 中的几个：$x\in P\triangle Q$ 当且仅当 $x$ 恰属于 $P,Q$ 之一。说明两边都由“属于 $A,B,C$ 中奇数个”的元素组成。可以先用本节的 Venn 图演示验证。</x-hint>
<x-hint>(4) 两边同时与 $C$ 作对称差，利用 (3) 以及 $C\triangle C=\varnothing$，$P\triangle\varnothing=P$。</x-hint>
<x-ans>
<p>(1) $x\in A\triangle B\iff x$ 恰属于 $A,B$ 之一 $\iff x\in A\cup B$ 且 $x\notin A\cap B$。</p>
<p>(2) 若 $A\triangle B=\varnothing$，则 $A\setminus B=B\setminus A=\varnothing$，即 $A\subset B$ 且 $B\subset A$；反之显然。</p>
<p>(3) 对元素 $x$ 与集合 $P$，令 $\chi_P(x)=1$（$x\in P$）或 $0$（$x\notin P$），称为 $P$ 的<em>特征函数</em>。则 $\chi_{P\triangle Q}\equiv\chi_P+\chi_Q\pmod 2$，于是两边的特征函数都等于 $\chi_A+\chi_B+\chi_C\pmod 2$，所以两个集合相等。换句话说，两边都恰好由属于 $A,B,C$ 中奇数个集合的元素组成。</p>
<p>(4) $A=A\triangle\varnothing=A\triangle(C\triangle C)=(A\triangle C)\triangle C=(B\triangle C)\triangle C=B\triangle(C\triangle C)=B$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="开区间与闭区间对等">
<p>证明 $(0,1)\sim[0,1]$。</p>
<x-hint>借鉴 Hilbert 旅馆：在 $(0,1)$ 中取出一列点 $\frac12,\frac13,\frac14,\cdots$，让它们“挪位置”给 $0$ 和 $1$ 腾出地方，其余的点不动。</x-hint>
<x-ans>
<p>定义 $f:(0,1)\to[0,1]$：</p>
$$f\left(\tfrac12\right)=0,\qquad f\left(\tfrac13\right)=1,\qquad f\left(\tfrac1n\right)=\tfrac1{n-2}\ (n\ge4),\qquad f(x)=x\ \ \left(x\ \text{不是}\ \tfrac1n\ \text{的形式}\right).$$
<p>$f$ 把 $\left\{\frac12,\frac13,\frac14,\frac15,\cdots\right\}$ 一一地映为 $\left\{0,1,\frac12,\frac13,\cdots\right\}$，而在其余点上是恒等映射，两部分的像互不相交且合起来恰为 $[0,1]$，所以 $f$ 是一一对应。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="几个可列集">
<p>证明下列集合都是可列集：(1) 平面上全体有理点（两个坐标都是有理数的点）组成的集合 $\Q\times\Q$；(2) 全体十进制有限小数组成的集合；(3) 端点都是有理数的开区间的全体。</p>
<x-hint>写成“可列个可列集的并”，例如 $\Q\times\Q=\bigcup_{r\in\Q}\bigl(\{r\}\times\Q\bigr)$；或者说明它与某个已知可列集的无限子集对等。</x-hint>
<x-ans>
<p>(1) 对每个 $r\in\Q$，$\{r\}\times\Q\sim\Q$ 可列；$\Q$ 本身可列，所以 $\Q\times\Q=\bigcup_{r\in\Q}(\{r\}\times\Q)$ 是可列个可列集的并，可列。</p>
<p>(2) 有限小数都是有理数，这个集合是 $\Q$ 的子集；它包含全体整数，是无限集。可列集的无限子集可列。（也可以按小数位数 $k$ 分类：$k$ 位小数的全体 $\{m/10^k\mid m\in\Z\}\sim\Z$。）</p>
<p>(3) 开区间 $(r,s)$（$r<s$，$r,s\in\Q$）与点 $(r,s)\in\Q\times\Q$ 一一对应，所以这个集合与 $\Q\times\Q$ 的一个无限子集对等，可列。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="代数数可列，超越数存在">
<p>若实数 $x$ 是某个非零整系数多项式 $a_nx^n+\cdots+a_1x+a_0$ 的根，则称 $x$ 为<em>代数数</em>；不是代数数的实数称为<em>超越数</em>。证明全体实代数数组成可列集，从而超越数存在，而且全体超越数不可列。</p>
<x-hint>对每个正整数 $h$，满足 $n+|a_0|+|a_1|+\cdots+|a_n|=h$（$a_n\ne0$）的整系数多项式只有有限个，而每个 $n$ 次多项式至多有 $n$ 个根。</x-hint>
<x-ans>
<p>称 $h=n+|a_0|+\cdots+|a_n|$（$a_n\ne0$）为多项式的“高”。对固定的 $h$，次数 $n\le h$，每个系数满足 $|a_i|\le h$，所以高为 $h$ 的多项式只有有限个；每个 $n$ 次多项式至多有 $n$ 个实根。因此高为 $h$ 的多项式的实根组成一个有限集 $E_h$。全体实代数数 $=\bigcup_{h=1}^{\infty}E_h$ 是可列个有限集的并，至多可列；它又包含全部有理数（$\frac pq$ 是 $qx-p$ 的根），是无限集，所以可列。</p>
<p>若全体超越数至多可列，则 $\R=\{\text{代数数}\}\cup\{\text{超越数}\}$ 至多可列，与 Cantor 定理矛盾。故超越数存在，并且不可列。（具体证明某个数是超越数则困难得多：$e$ 与 $\pi$ 的超越性分别直到 1873 年和 1882 年才被 Hermite 与 Lindemann 证明。）</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="互不相交的开区间族">
<p>设 $\mathcal F$ 是由直线上两两不相交的非空开区间组成的集族。证明 $\mathcal F$ 至多可列。</p>
<x-hint>每个非空开区间里都有有理数（有理数的稠密性，§2.1）。</x-hint>
<x-ans>
<p>对每个区间 $I\in\mathcal F$，在 $I$ 中取定一个有理数 $r_I$。由于区间两两不相交，不同的区间取出的有理数不同，因此 $I\mapsto r_I$ 是 $\mathcal F$ 到 $\Q$ 的单射，$\mathcal F$ 与 $\Q$ 的一个子集对等。$\Q$ 的子集至多可列，所以 $\mathcal F$ 至多可列。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="Cantor 定理的一般形式">
<p>证明：对任意集合 $A$，不存在 $A$ 到 $2^{A}$ 的一一对应。</p>
<x-hint>设 $f:A\to2^{A}$ 是任一映射，考察集合 $B=\{x\in A\mid x\notin f(x)\}$。它和对角线论证有什么相似之处？</x-hint>
<x-ans>
<p>设 $f:A\to2^{A}$ 是任一映射，令 $B=\{x\in A\mid x\notin f(x)\}$，则 $B\in2^{A}$。若存在 $b\in A$ 使 $f(b)=B$：若 $b\in B$，按 $B$ 的定义 $b\notin f(b)=B$，矛盾；若 $b\notin B$，即 $b\notin f(b)$，按定义又有 $b\in B$，仍矛盾。所以 $B$ 不在 $f$ 的值域中，$f$ 不是满射，更不是一一对应。</p>
<p>这与对角线论证本质相同：把“$x$ 是否属于 $f(y)$”排成一张以 $A\times A$ 为下标的表，$B$ 正是把对角线上的“属于 / 不属于”全部取反得到的。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="社团参与调查">
<p>某班 $50$ 名同学中，参加数学建模社团的有 $30$ 人，参加程序设计社团的有 $25$ 人，两个社团都参加的有 $10$ 人。两个社团都没有参加的有多少人？</p>
<x-check answer="5" unit="人">都没有参加的人数</x-check>
<x-hint>设 $A$、$B$ 分别为两个社团成员的集合，先用容斥原理求 $\card(A\cup B)$。</x-hint>
<x-ans><p>$\card(A\cup B)=30+25-10=45$，都没参加的人数为 $\card\bigl((A\cup B)^{c}\bigr)=50-45=5$。</p></x-ans>
</x-prob>

<x-prob level="应用" t="三门选修课">
<p>对某年级 $100$ 名学生的调查显示：选修 A 课程的有 $45$ 人，选修 B 课程的有 $38$ 人，选修 C 课程的有 $21$ 人；同时选修 A、B 的有 $15$ 人，同时选修 A、C 的有 $8$ 人，同时选修 B、C 的有 $6$ 人，三门都选的有 $3$ 人。问：(1) 三门都没选的有多少人？(2) 恰好只选一门的有多少人？</p>
<x-check answer="22" unit="人">(1) 三门都没选</x-check>
<x-check answer="55" unit="人">(2) 恰好只选一门</x-check>
<x-hint>三个集合的容斥原理：$\card(A\cup B\cup C)=\sum\card A-\sum\card(A\cap B)+\card(A\cap B\cap C)$。</x-hint>
<x-hint>画一个三圆 Venn 图，从中心（三门都选）开始往外填数：先填“只选两门”的三块，再填“只选一门”的三块。</x-hint>
<x-ans>
<p>(1) $\card(A\cup B\cup C)=45+38+21-15-8-6+3=78$，三门都没选的有 $100-78=22$ 人。</p>
<p>(2) 中心：三门都选 $3$ 人。只选 A、B 两门的有 $15-3=12$ 人，只选 A、C 的 $8-3=5$ 人，只选 B、C 的 $6-3=3$ 人。只选 A 的 $45-12-5-3=25$ 人，只选 B 的 $38-12-3-3=20$ 人，只选 C 的 $21-5-3-3=10$ 人。恰好只选一门的共 $25+20+10=55$ 人。（检验：$55+(12+5+3)+3=78$。）</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="文献检索">
<p>在某文献数据库中，含关键词“数学分析”的文献有 $120$ 篇，含“微积分”的有 $200$ 篇，两个关键词都含的有 $50$ 篇；在至少含有其中一个关键词的文献中，属于“习题集”类别的有 $40$ 篇。用集合运算写出检索式“(数学分析 OR 微积分) NOT 习题集”对应的集合，并求检索结果的篇数。</p>
<x-check answer="230" unit="篇">检索结果篇数</x-check>
<x-hint>设 $A$、$B$ 为分别含两个关键词的文献集合，$C$ 为习题集类文献的集合。所求集合为 $(A\cup B)\setminus C$，而 $\card\bigl((A\cup B)\setminus C\bigr)=\card(A\cup B)-\card\bigl((A\cup B)\cap C\bigr)$。</x-hint>
<x-ans><p>所求集合为 $(A\cup B)\setminus C=(A\cup B)\cap C^{c}$。$\card(A\cup B)=120+200-50=270$，其中属于 $C$ 的有 $40$ 篇，检索结果为 $270-40=230$ 篇。</p></x-ans>
</x-prob>

<x-prob level="应用" t="密码空间有多大">
<div>
<p>(1) 一个 $6$ 位密码，每一位可以是 $10$ 个数字或 $26$ 个小写英文字母之一。全部可能的密码组成哪个乘积集合？共有多少个？</p>
<p>(2) 若改为 $8$ 位，每一位可以是数字、小写字母或大写字母（共 $62$ 种），攻击者每秒能尝试 $10^9$ 个密码，穷举全部密码大约需要多少小时？</p>
</div>
<x-check answer="36^6" ph="可以输入算式，如 36^6">(1) 密码总数</x-check>
<x-check answer="62^8/10^9/3600" tol="1" unit="小时">(2) 穷举所需时间</x-check>
<x-hint>设字符集为 $S$，$\card S=m$，则 $k$ 位密码的全体是 $S^k=S\times\cdots\times S$，共 $m^k$ 个。</x-hint>
<x-ans>
<p>(1) 设 $S$ 为这 $36$ 个字符组成的集合，密码全体为 $S^6$，共 $36^6=2\,176\,782\,336\approx2.2\times10^9$ 个——每秒 $10^9$ 次的穷举只需约 $2$ 秒。</p>
<p>(2) 共 $62^8\approx2.18\times10^{14}$ 个，需要 $\frac{62^8}{10^9}\approx2.18\times10^5$ 秒，约 $60.7$ 小时（约 $2.5$ 天）。每增加一位，时间就乘以 $62$——这就是“密码越长越安全”的数学原因。</p>
</x-ans>
</x-prob>
`);
