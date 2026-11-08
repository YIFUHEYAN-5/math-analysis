/* §2.1 实数系的连续性 —— 内容为本站自编讲解，编号与教材不一定一致 */
MA.add("2-1", String.raw`
<x-goal>
<ul>
<li>理解有理数系的“空隙”：知道 $\sqrt2$ 不是有理数，明白数学分析为什么必须在实数系中进行；</li>
<li>掌握实数的无限小数表示，会把循环小数化为分数；</li>
<li>准确叙述上界、下界、最大数、最小数、上确界、下确界的定义，熟练使用确界的“$\eps$ 刻画”；</li>
<li>理解确界存在定理（实数系的连续性）的含义与证明思路，会用它推出 Archimedes 性质和有理数的稠密性；</li>
<li>会求常见数集的确界，并能用定义严格证明；</li>
<li>了解 Dedekind 切割定理，知道它与确界存在定理等价。</li>
</ul>
</x-goal>

<p>第一章准备好了集合与函数的语言。从这一章开始进入数学分析的核心——<em>极限</em>。极限讨论的是“无限逼近”：数列的项越来越接近某个数。可是，“被逼近的那个数”一定存在吗？在有理数的世界里，答案是否定的：有理数 $1,\ 1.4,\ 1.41,\ 1.414,\ 1.4142,\cdots$ 越来越接近一个“数”，它的平方等于 $2$，而它不是有理数。如果只有有理数，这个数列就“无处可去”。</p>
<p>本节的任务是把“实数没有空隙”这个直观说清楚。它的精确表述——<em>确界存在定理</em>——是整个数学分析的基石：§2.4 的单调有界定理、闭区间套定理、Cauchy 收敛原理，以及第三章闭区间上连续函数的种种性质，归根结底都来源于它。</p>

<h2 id="real">实数系</h2>

<h3>从自然数到有理数</h3>
<p>数系的每一次扩充，都是为了让某种运算畅通无阻：</p>
<ul>
<li>自然数集 $\N$ 对加法、乘法封闭，但 $3-5$ 在 $\N$ 中没有意义；</li>
<li>引入负数得到整数集 $\Z$，减法畅通了，但 $3\div5$ 在 $\Z$ 中没有意义；</li>
<li>引入分数得到有理数集 $\Q=\left\{\frac pq : p\in\Z,\ q\in\Np\right\}$，四则运算（除数不为 $0$）都畅通了。</li>
</ul>
<p>有理数集还有两条重要性质：</p>
<ul>
<li><em>有序性</em>：任意两个有理数 $a,b$ 恰有 $a<b$、$a=b$、$a>b$ 之一成立，并且序与运算相容，例如 $a<b\Rightarrow a+c<b+c$；$a<b,\ c>0\Rightarrow ac<bc$。</li>
<li><em>稠密性</em>：任意两个不同的有理数之间还有有理数，例如 $a<b$ 时 $a<\frac{a+b}2<b$。反复使用可知，任意两个不同的有理数之间有<em>无穷多个</em>有理数。</li>
</ul>
<p>在数轴上看，有理数点“密密麻麻”，任何一小段里都有无穷多个。然而它们并没有铺满整条数轴。</p>

<x-thm t="$\sqrt2$ 不是有理数" id="thm-sqrt2">
<p>不存在有理数 $r$，使得 $r^2=2$。</p>
<x-proof>
<p>用反证法。若有理数 $r$ 满足 $r^2=2$，不妨设 $r>0$（否则换成 $-r$），写成既约分数 $r=\frac pq$，其中 $p,q$ 是互素的正整数。由 $\frac{p^2}{q^2}=2$ 得 $p^2=2q^2$。</p>
<p>于是 $p^2$ 是偶数，从而 $p$ 是偶数（奇数的平方是奇数）。记 $p=2m$，代入得 $4m^2=2q^2$，即 $q^2=2m^2$，同理 $q$ 也是偶数。$p,q$ 都是偶数，与互素矛盾。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<x-hist>相传毕达哥拉斯学派的希帕索斯（Hippasus）最早发现：正方形的对角线与边长“不可公度”，即找不到一个共同的度量单位，使两者都是它的整数倍。这动摇了“万物皆数（整数之比）”的信条，史称第一次数学危机。直到 19 世纪下半叶，Dedekind、Cantor、Weierstrass 等人才给出实数的严格理论，这个问题才算真正解决。</x-hist>

<x-intuit>边长为 $1$ 的正方形，对角线长为 $\sqrt2$。以原点为圆心、对角线长为半径画圆弧，交数轴正半轴于点 $P$。$P$ 是数轴上实实在在的一个点，却不对应任何有理数——有理数在数轴上留下了“空隙”。这样的空隙远不止一个：$\sqrt3$、$\sqrt[3]2$、$\pi$、$e$ ……事实上，第一章的 <x-ref to="1-1/thm-cantor"></x-ref> 告诉我们，实数不可列，而有理数只有可列个：从“个数”上看，有理数在实数中只占微不足道的一部分。</x-intuit>

<h3>实数的无限小数表示</h3>
<p>中学里，实数被理解为“数轴上的点”或“无限小数”。这里采用后一种观点：每个实数都可以写成</p>
$$x=\pm\,a_0.a_1a_2a_3\cdots a_n\cdots,$$
<p>其中 $a_0$ 是非负整数（整数部分），$a_1,a_2,\cdots$ 是 $0,1,\cdots,9$ 中的数字。</p>
<ul>
<li>有理数恰好是<em>有限小数</em>或<em>无限循环小数</em>，例如 $\frac14=0.25$，$\frac13=0.333\cdots=0.\overline3$，$\frac17=0.\overline{142857}$（循环节上方画线，也常在循环节首尾数字上方加点）；</li>
<li>无理数恰好是<em>无限不循环小数</em>，例如 $\sqrt2=1.41421356\cdots$，$\pi=3.14159265\cdots$。</li>
</ul>
<p>有限小数有两种写法，例如 $0.25=0.24999\cdots$。为了使表示唯一，可以约定把有限小数统一写成以 $0$ 结尾的形式（或统一写成以 $9$ 循环的形式）。这只是记号上的约定，不影响数本身。</p>

<x-ex t="$0.999\cdots$ 等于 $1$ 吗？" id="ex-09">
<p>说明 $0.\overline9=1$。</p>
<x-sol>
<p>记 $x=0.\overline9$。显然 $x\le1$。若 $x<1$，则 $1-x>0$，可以取正整数 $n$ 使 $10^{-n}<1-x$（正数 $1-x$ 的小数表示中总有某一位不是 $0$）。但 $x$ 不小于它的 $n$ 位截断 $0.\underbrace{99\cdots9}_{n\text{ 个}}=1-10^{-n}$，于是 $1-x\le10^{-n}$，矛盾。所以 $x=1$。</p>
<p>另一种常见的“证法”是：$10x=9.\overline9$，两式相减得 $9x=9$。结论没错，但这默认了无限小数可以像有限小数那样逐位相乘、相减——严格地说这需要极限理论来保证。学完 §2.2 后会看到，$0.\overline9$ 就是数列 $0.9,\ 0.99,\ 0.999,\cdots$ 的极限，而这个极限等于 $1$。</p>
</x-sol>
<x-remark>“$0.999\cdots$ 比 $1$ 小一点点”是常见的直觉误区。两个不相等的实数之间一定隔着一个正的距离，而 $1$ 与 $0.\overline9$ 的距离比任何正数都小，只能是 $0$。“比任何正数都小的非负数只能是 $0$”——这种论证方式在后面的 $\eps$-$N$ 语言中会反复出现。</x-remark>
</x-ex>

<x-prop t="有理数与循环小数" id="prop-rep">
<p>一个实数是有理数，当且仅当它的小数表示是有限小数或无限循环小数。</p>
<x-proof>
<p><em>必要性</em>。设 $x=\frac pq$（$p\in\Z$，$q\in\Np$）。用长除法计算 $p\div q$ 时，每一步的余数只能是 $0,1,\cdots,q-1$ 之一。若某一步余数为 $0$，则除尽，得到有限小数；否则余数只能取 $1,\cdots,q-1$ 这 $q-1$ 个值，至多 $q$ 步之后必有两步的余数相同。而从相同的余数出发，后面的商和余数完全重复，所以小数从此循环，循环节长度不超过 $q-1$。</p>
<p><em>充分性</em>。有限小数显然是有理数。对循环小数，以 $x=0.a_1\cdots a_k\overline{b_1\cdots b_m}$ 为例，记 $A$ 为 $k$ 位数字串 $a_1\cdots a_k$ 所表示的整数，$B$ 为 $m$ 位数字串 $b_1\cdots b_m$ 所表示的整数，则</p>
$$x=\frac{A}{10^k}+\frac{B}{10^k}\left(\frac1{10^m}+\frac1{10^{2m}}+\cdots\right)=\frac{A}{10^k}+\frac{B}{10^k\,(10^m-1)},$$
<p>这里用到了无穷等比数列求和（严格证明见 §2.2），所以 $x$ 是有理数。<span class="qed">∎</span></p>
</x-proof>
</x-prop>

<x-ex t="把循环小数化为分数" id="ex-frac">
<p>把 $0.\overline{142857}$ 和 $2.1\overline6$ 化为既约分数。</p>
<x-sol>
<p>由上面的公式（$k=0$，$m=6$），$0.\overline{142857}=\dfrac{142857}{10^6-1}=\dfrac{142857}{999999}=\dfrac17$，因为 $999999=7\times142857$。</p>
<p>$2.1\overline6=2+0.1\overline6$，对 $0.1\overline6$ 取 $k=1$，$A=1$，$m=1$，$B=6$：</p>
$$2.1\overline6=2+\frac1{10}+\frac{6}{10\times9}=2+\frac1{10}+\frac1{15}=\frac{60+3+2}{30}=\frac{13}6.$$
</x-sol>
<x-tip>口诀：纯循环小数 $0.\overline{b_1\cdots b_m}$ 等于“循环节 ÷ $m$ 个 $9$”，如 $0.\overline{36}=\frac{36}{99}$；混循环小数先把不循环的部分分离出来，再按纯循环小数处理并除以相应的 $10^k$。</x-tip>
</x-ex>

<h3>实数系的基本性质</h3>
<p>实数可以比较大小（逐位比较小数表示），可以做四则运算，运算律与有理数完全相同。概括起来：</p>
<ul>
<li>$\R$ 对四则运算封闭（除数不为 $0$），且是有序的，序与运算相容；</li>
<li>有理数和无理数在 $\R$ 中都是稠密的（下面的 <x-ref to="thm-dense"></x-ref>）；</li>
<li><em>实数系是连续的</em>：实数与数轴上的点一一对应，实数“铺满”了整条数轴，没有空隙。</li>
</ul>
<p>前两条有理数也具备（相应地，有理数在 $\Q$ 中稠密），第三条是实数独有的。“没有空隙”只是直观说法，下面用“确界”把它变成精确的数学命题。</p>

<x-note>实数的严格构造（Dedekind 切割、有理数 Cauchy 列的等价类、无限小数）以及运算律的验证相当繁琐，初学时不必纠缠。数学分析通常的做法是：承认实数的四则运算和大小关系满足通常的规则，把“连续性”单独拎出来作为核心，后面的一切都从它推出。</x-note>

<h2 id="maxmin">最大数与最小数</h2>

<x-def t="最大数与最小数">
<p>设 $S$ 是非空实数集。若存在 $\xi\in S$，使得对一切 $x\in S$ 都有 $x\le\xi$，则称 $\xi$ 是 $S$ 的<em>最大数</em>，记作 $\xi=\max S$；若存在 $\eta\in S$，使得对一切 $x\in S$ 都有 $x\ge\eta$，则称 $\eta$ 是 $S$ 的<em>最小数</em>，记作 $\eta=\min S$。</p>
</x-def>
<p>定义有两个要点：最大数必须<em>属于</em> $S$；它不小于 $S$ 中的每一个数。最大数若存在则唯一：若 $\xi,\xi'$ 都是最大数，则 $\xi\le\xi'$ 且 $\xi'\le\xi$。</p>
<ul>
<li>有限的非空数集一定有最大数和最小数（逐个比较即可）。</li>
<li>无限集就不一定了：$\N$ 有最小数 $0$，没有最大数；开区间 $(0,1)$ 既没有最大数，也没有最小数；$[0,1)$ 有最小数 $0$，没有最大数；$\left\{\frac1n : n\in\Np\right\}$ 有最大数 $1$，没有最小数。</li>
</ul>

<x-ex t="开区间没有最大数" id="ex-open">
<p>证明 $(0,1)$ 没有最大数。</p>
<x-sol l="证明">
<p>任取 $x\in(0,1)$，令 $y=\frac{x+1}2$，则 $0<x<y<1$，即 $y\in(0,1)$ 且 $y>x$。所以 $(0,1)$ 中任何一个数都不是最大数。<span class="qed">∎</span></p>
</x-sol>
<x-remark>证明“没有最大数”的标准套路：对集合中<em>任意</em>一个元素，在集合里找出一个比它更大的元素。注意顺序是“先任取 $x$，再依据 $x$ 构造 $y$”，$y$ 可以依赖于 $x$。</x-remark>
</x-ex>

<x-ex t="有理数中的“空隙”" id="ex-gap">
<p>设 $A=\{x\in\Q : x>0,\ x^2<2\}$，$B=\{x\in\Q : x>0,\ x^2>2\}$。证明：$A$ 没有最大数，$B$ 没有最小数。</p>
<x-analysis><p>需要对每个 $r\in A$ 找出一个更大的 $r'\in A$。$r'$ 必须是有理数，所以不能用 $\sqrt2$ 之类的数来构造。一个巧妙的办法是用有理函数 $\varphi(r)=\dfrac{2r+2}{r+2}$ ——它把正有理数变成正有理数。</p></x-analysis>
<x-sol l="证明">
<p>对正有理数 $r$，令 $\varphi(r)=\dfrac{2r+2}{r+2}$，它仍是正有理数。直接计算：</p>
$$\varphi(r)-r=\frac{2-r^2}{r+2},\qquad \varphi(r)^2-2=\frac{(2r+2)^2-2(r+2)^2}{(r+2)^2}=\frac{2(r^2-2)}{(r+2)^2}.$$
<p>若 $r\in A$，即 $r^2<2$，则 $\varphi(r)>r$ 且 $\varphi(r)^2<2$，所以 $\varphi(r)\in A$ 且比 $r$ 大。故 $A$ 没有最大数。</p>
<p>若 $r\in B$，即 $r^2>2$，则 $\varphi(r)<r$ 且 $\varphi(r)^2>2$，所以 $\varphi(r)\in B$ 且比 $r$ 小。故 $B$ 没有最小数。<span class="qed">∎</span></p>
</x-sol>
<x-remark>由于 $\sqrt2$ 不是有理数，正有理数全体恰好分成 $A$、$B$ 两部分，$A$ 中每个数都小于 $B$ 中每个数，而 $A$ 的“右端”与 $B$ 的“左端”之间一个有理数也没有——这就是有理数在 $\sqrt2$ 处的“空隙”。从 $r=1$ 出发反复用 $\varphi$，得到 $1,\ \frac43,\ \frac75,\ \frac{24}{17},\ \frac{41}{29},\ \frac{140}{99},\cdots$，它们越来越接近 $\sqrt2$（$\frac{140}{99}=1.41414\cdots$），这本身也是一个计算 $\sqrt2$ 的算法。</x-remark>
</x-ex>
`);
MA.add("2-1", String.raw`
<h2 id="sup">上确界与下确界</h2>
<p>$(0,1)$ 没有最大数，但 $1$ 显然扮演着某种“最大”的角色：$(0,1)$ 中的数都不超过 $1$，而比 $1$ 小的任何数都“管不住” $(0,1)$。这个角色就是上确界。</p>

<x-def t="上界、下界与有界集">
<p>设 $S$ 是非空实数集。若存在 $M\in\R$，使得对一切 $x\in S$ 都有 $x\le M$，则称 $M$ 是 $S$ 的一个<em>上界</em>，称 $S$ <em>有上界</em>；若存在 $m\in\R$，使得对一切 $x\in S$ 都有 $x\ge m$，则称 $m$ 是 $S$ 的一个<em>下界</em>，称 $S$ <em>有下界</em>。既有上界又有下界的集合称为<em>有界集</em>；等价地，存在 $X>0$，使得对一切 $x\in S$ 都有 $|x|\le X$。</p>
</x-def>
<p>上界不唯一：若 $M$ 是上界，则比 $M$ 大的数都是上界，所以有上界的集合有无穷多个上界。自然要问：<em>上界中有没有最小的一个？</em></p>

<x-def t="上确界与下确界" id="def-sup">
<p>设 $S$ 是非空实数集。若实数 $\beta$ 满足：</p>
<ol>
<li>$\beta$ 是 $S$ 的上界：对一切 $x\in S$，有 $x\le\beta$；</li>
<li>任何小于 $\beta$ 的数都不是 $S$ 的上界：对任意 $\eps>0$，存在 $x\in S$，使得 $x>\beta-\eps$，</li>
</ol>
<p>则称 $\beta$ 为 $S$ 的<em>上确界</em>（supremum），记作 $\beta=\sup S$。类似地，若实数 $\alpha$ 满足：</p>
<ol>
<li>$\alpha$ 是 $S$ 的下界：对一切 $x\in S$，有 $x\ge\alpha$；</li>
<li>任何大于 $\alpha$ 的数都不是 $S$ 的下界：对任意 $\eps>0$，存在 $x\in S$，使得 $x<\alpha+\eps$，</li>
</ol>
<p>则称 $\alpha$ 为 $S$ 的<em>下确界</em>（infimum），记作 $\alpha=\inf S$。</p>
</x-def>
<p>一句话：<em>上确界是最小的上界，下确界是最大的下界</em>。条件 (2) 是“$\beta$ 是最小上界”的 $\eps$ 版本，证明中最常用。</p>

<x-intuit>把 $S$ 的全体上界想象成数轴右侧的“天花板区域”。上确界 $\beta$ 是天花板的最低点：它压住了 $S$ 的所有元素；而只要往下挪一点点（挪到 $\beta-\eps$），就会有 $S$ 的元素“冒出头来”。至于 $\beta$ 本身是否属于 $S$，定义并不关心。</x-intuit>

<x-warn>
<ul>
<li>$\sup S$ 不一定属于 $S$，例如 $\sup(0,1)=1\notin(0,1)$。</li>
<li>若 $S$ 有最大数，则 $\sup S=\max S$；反之，若 $\sup S\in S$，则它就是最大数。所以上确界是最大数概念的推广。</li>
<li>条件 (2) 中的 $x$ 依赖于 $\eps$：$\eps$ 越小，一般要找越靠近 $\beta$ 的元素。不要写成“存在 $x\in S$，使得对任意 $\eps>0$ 都有 $x>\beta-\eps$”——这样的 $x$ 必须满足 $x\ge\beta$，也就是说 $\beta$ 是最大数了。<em>量词的顺序不能随便交换</em>。</li>
</ul>
</x-warn>

<p>由定义立即可知上确界若存在则唯一。事实上，若 $\beta<\beta'$ 都是 $S$ 的上确界，取 $\eps=\beta'-\beta$，由 $\beta'$ 的条件 (2)，存在 $x\in S$ 使 $x>\beta'-\eps=\beta$，与 $\beta$ 是上界矛盾。</p>
<x-note>若非空数集 $S$ 没有上界，约定记 $\sup S=+\infty$；没有下界时记 $\inf S=-\infty$。例如 $\sup\Np=+\infty$，$\inf\Z=-\infty$。这只是记号上的约定，$\pm\infty$ 不是实数；本节说“上确界存在”时，总是指它是一个实数。</x-note>

<h3>确界存在定理</h3>
<x-thm t="确界存在定理（实数系的连续性）" id="thm-sup">
<p>非空有上界的实数集必有上确界；非空有下界的实数集必有下确界。</p>
<x-proof>
<p>只证上确界的情形。设 $S$ 非空且有上界，我们用“逐位确定”的办法造出 $\beta$ 的小数表示。</p>
<p><em>第 0 步</em>。考虑整数集 $K_0=\{k\in\Z :\ \text{存在 }x\in S\text{ 使 }x\ge k\}$。它非空（任取 $x_0\in S$，则 $[x_0]\in K_0$），且有上界（$S$ 的上界也是 $K_0$ 的上界），所以 $K_0$ 中有最大的整数，记为 $\beta_0$。于是 $S$ 中有元素 $\ge\beta_0$，而 $S$ 中所有元素都 $<\beta_0+1$（否则 $\beta_0+1\in K_0$）。</p>
<p><em>第 1 步</em>。在 $0,1,\cdots,9$ 中取最大的数字 $a_1$，使 $S$ 中有元素 $\ge\beta_0+\frac{a_1}{10}$（$a_1=0$ 总是满足的，所以这样的数字存在）。记 $\beta_1=\beta_0+\frac{a_1}{10}$，则 $S$ 中有元素 $\ge\beta_1$，而 $S$ 中所有元素都 $<\beta_1+\frac1{10}$：$a_1<9$ 时这由 $a_1$ 的最大性得到；$a_1=9$ 时 $\beta_1+\frac1{10}=\beta_0+1$，由第 0 步得到。</p>
<p><em>第 $n$ 步</em>。如此继续：取最大的数字 $a_n$，使 $S$ 中有元素 $\ge\beta_{n-1}+\frac{a_n}{10^n}$，记 $\beta_n=\beta_{n-1}+\frac{a_n}{10^n}$。则对每个 $n$ 都有</p>
$$\text{(i) }S\text{ 中有元素 }\ge\beta_n;\qquad\text{(ii) }S\text{ 中所有元素都 }<\beta_n+10^{-n}.$$
<p>令 $\beta=\beta_0+0.a_1a_2a_3\cdots$（整数部分为 $\beta_0$，小数部分逐位确定）。$\beta_n$ 是 $\beta$ 的 $n$ 位截断，所以 $\beta_n\le\beta\le\beta_n+10^{-n}$。下面验证 $\beta=\sup S$。</p>
<p><em>$\beta$ 是上界</em>。若有 $x\in S$ 使 $x>\beta$，取 $n$ 使 $10^{-n}<x-\beta$（正数 $x-\beta$ 的小数表示中总有某一位不是 $0$，参见<x-ref to="ex-09"></x-ref>；这一步只用到小数表示，并不依赖后面的 Archimedes 性质），则 $x>\beta+10^{-n}\ge\beta_n+10^{-n}$，与 (ii) 矛盾。</p>
<p><em>小于 $\beta$ 的数都不是上界</em>。对任意 $\eps>0$，取 $n$ 使 $10^{-n}<\eps$。由 (i)，存在 $x\in S$ 使 $x\ge\beta_n\ge\beta-10^{-n}>\beta-\eps$。</p>
<p>所以 $\beta=\sup S$。对下确界，把 $S$ 换成 $-S=\{-x : x\in S\}$ 即可：$\inf S=-\sup(-S)$。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<x-intuit>证明的过程就像用一把越来越精细的尺子去“量” $S$ 的右边界：先确定整数位，再确定第一位小数、第二位小数……每一步都保证“$S$ 中有元素够到这里”且“$S$ 中元素都够不到下一格”。无限次细分之后，这些数字拼成的无限小数就是右边界。在有理数系中，拼出来的无限小数可能不循环，于是“边界”不是有理数——这正是有理数系的缺陷。</x-intuit>

<x-note><x-ref to="ex-gap"></x-ref>中的集合 $A$ 非空，有有理上界（例如 $2$），但在 $\Q$ 中没有最小的上界：任何有理上界 $r$ 都不在 $A$ 中（$A$ 没有最大数），又 $r^2\ne2$，所以 $r\in B$；而 $B$ 没有最小数，$B$ 中每个数又都是 $A$ 的上界。也就是说，确界存在定理在 $\Q$ 中不成立。在 $\R$ 中，$\sup A=\sqrt2$。<em>确界存在定理正是“实数没有空隙”的精确表述</em>，所以称为实数系的连续性（也称完备性）。</x-note>

<h3>两个推论：Archimedes 性质与稠密性</h3>
<x-cor t="Archimedes 性质" id="cor-arch">
<p>对任意正数 $a$ 和任意实数 $b$，存在正整数 $n$ 使 $na>b$。特别地，对任意 $\eps>0$，存在 $n\in\Np$ 使 $\frac1n<\eps$。</p>
<x-proof>
<p>反证。若对一切 $n\in\Np$ 都有 $na\le b$，则数集 $\{na : n\in\Np\}$ 非空且有上界 $b$，由确界存在定理，它有上确界 $s$。$s-a<s$ 不是上界，所以存在 $m\in\Np$ 使 $ma>s-a$，即 $(m+1)a>s$，与 $s$ 是上界矛盾。取 $a=\eps$，$b=1$ 即得后一结论。<span class="qed">∎</span></p>
</x-proof>
</x-cor>

<x-intuit>“无论步子 $a$ 多小、路程 $b$ 多长，一步一步走，总能走完”——蚂蚁也能爬完地球的周长。这个看似显然的事实，正是后面无数次“取 $N>\frac1\eps$”的依据。</x-intuit>

<x-thm t="稠密性" id="thm-dense">
<p>任意两个不同的实数之间，既有有理数，也有无理数。</p>
<x-proof>
<p>设 $a<b$。由 Archimedes 性质，取 $n\in\Np$ 使 $n(b-a)>1$，即 $nb>na+1$。令 $m=[na]+1$，则 $m$ 是整数，且 $na<m\le na+1<nb$，于是 $a<\frac mn<b$。</p>
<p>再找无理数：在 $a-\sqrt2$ 与 $b-\sqrt2$ 之间取一个有理数 $r$，则 $a<r+\sqrt2<b$，而 $r+\sqrt2$ 是无理数（否则 $\sqrt2=(r+\sqrt2)-r$ 是有理数）。<span class="qed">∎</span></p>
</x-proof>
</x-thm>
<p>反复应用可知，任何区间 $(a,b)$ 中都有无穷多个有理数和无穷多个无理数。由此，每个实数都可以用有理数任意精确地逼近——这是计算器能够“算出” $\sqrt2$、$\pi$ 的理论前提。</p>

<h3>例题</h3>
<x-ex t="用定义证明确界" id="ex-sup1">
<p>设 $S=\left\{1-\frac1n : n\in\Np\right\}$。证明 $\sup S=1$，$\inf S=0$，并讨论最大数与最小数。</p>
<x-sol l="证明">
<p>$S=\left\{0,\frac12,\frac23,\frac34,\cdots\right\}$。</p>
<p>上确界：(1) 对一切 $n$ 有 $1-\frac1n<1$，所以 $1$ 是上界。(2) 对任意 $\eps>0$，由 Archimedes 性质取 $n>\frac1\eps$，则 $1-\frac1n>1-\eps$。所以 $\sup S=1$。由于 $1-\frac1n=1$ 无解，$1\notin S$，$S$ 没有最大数。</p>
<p>下确界：$1-\frac1n\ge0$，且 $n=1$ 时取到 $0$，所以 $\inf S=\min S=0$。<span class="qed">∎</span></p>
</x-sol>
<x-tip>求确界的一般步骤：<b>先猜</b>（列几项、画个图），<b>再验证</b>两个条件：① 是上界（不等式放缩）；② 对任意 $\eps>0$ 找出超过 $\beta-\eps$ 的元素（通常是解一个关于 $n$ 的不等式，解不出精确解时放缩后再解）。</x-tip>
</x-ex>

<x-ex t="上确界取得到、下确界取不到" id="ex-sup2">
<p>设 $S=\left\{(-1)^n+\frac1n : n\in\Np\right\}$，求 $\sup S$ 与 $\inf S$。</p>
<x-analysis><p>先列几项：$n=1,2,\cdots,6$ 时分别为 $0,\ \frac32,\ -\frac23,\ \frac54,\ -\frac45,\ \frac76$。偶数项 $1+\frac1n$ 从 $\frac32$ 开始递减地趋向 $1$，奇数项 $-1+\frac1n$ 从 $0$ 开始递减地趋向 $-1$。猜测 $\sup S=\frac32$，$\inf S=-1$。</p></x-analysis>
<x-sol>
<p>上确界：$n$ 为偶数时 $(-1)^n+\frac1n=1+\frac1n\le1+\frac12=\frac32$；$n$ 为奇数时 $(-1)^n+\frac1n=-1+\frac1n\le0$。所以 $\frac32$ 是上界，且 $n=2$ 时取到，故 $\sup S=\max S=\frac32$。</p>
<p>下确界：$n$ 为奇数时 $-1+\frac1n>-1$，$n$ 为偶数时 $1+\frac1n>-1$，所以 $-1$ 是下界。对任意 $\eps>0$，取奇数 $n>\frac1\eps$，则 $(-1)^n+\frac1n=-1+\frac1n<-1+\eps$。故 $\inf S=-1$；而 $-1\notin S$，$S$ 没有最小数。</p>
</x-sol>
</x-ex>

<x-viz type="supinf" t="上确界与下确界的 $\eps$ 刻画">拖动 ε 滑块，演示会标出第一个超过 sup − ε 的项和第一个小于 inf + ε 的项：ε 越小，要找的项一般越靠后；若确界属于集合（即为最大数或最小数），则对任何 ε 都能直接取到它本身。可以切换不同的数列，也可以输入自己的通项公式。</x-viz>

<x-ex t="$\sup\{x\in\Q : x>0,\ x^2<2\}=\sqrt2$" id="ex-sqrt2">
<p>设 $A=\{x\in\Q : x>0,\ x^2<2\}$，证明：在实数系中 $\sup A=\sqrt2$。</p>
<x-sol l="证明">
<p>(1) 若 $x\in A$，则 $x>0$ 且 $x^2<2=(\sqrt2)^2$，所以 $x<\sqrt2$，即 $\sqrt2$ 是上界。</p>
<p>(2) 任给 $\eps>0$。若 $\eps\ge\sqrt2$，取 $x=1\in A$，则 $x>0\ge\sqrt2-\eps$。若 $\eps<\sqrt2$，由稠密性，存在有理数 $r$ 满足 $\sqrt2-\eps<r<\sqrt2$，于是 $r>0$，$r^2<2$，即 $r\in A$，且 $r>\sqrt2-\eps$。所以 $\sup A=\sqrt2$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>同一个集合 $A$，在 $\Q$ 中找不到上确界，在 $\R$ 中上确界就是 $\sqrt2$。可以说，实数系就是把有理数的所有“空隙”都填上之后得到的。</x-remark>
</x-ex>

<x-ex t="确界的加法" id="ex-supsum">
<p>设 $A,B$ 是非空有上界的数集，$A+B=\{a+b : a\in A,\ b\in B\}$。证明 $\sup(A+B)=\sup A+\sup B$。</p>
<x-sol l="证明">
<p>记 $\alpha=\sup A$，$\beta=\sup B$。</p>
<p>(1) 对任意 $a\in A$，$b\in B$，有 $a\le\alpha$，$b\le\beta$，所以 $a+b\le\alpha+\beta$，即 $\alpha+\beta$ 是 $A+B$ 的上界。</p>
<p>(2) 任给 $\eps>0$，由确界的定义，存在 $a\in A$ 使 $a>\alpha-\frac\eps2$，存在 $b\in B$ 使 $b>\beta-\frac\eps2$，于是 $a+b\in A+B$，且 $a+b>\alpha+\beta-\eps$。所以 $\sup(A+B)=\alpha+\beta$。<span class="qed">∎</span></p>
</x-sol>
<x-remark>“把 $\eps$ 一分为二”（$\frac\eps2+\frac\eps2=\eps$）是分析中最常用的技巧之一，§2.2 证明极限的四则运算时还会见到。对乘法，$\sup(AB)=\sup A\cdot\sup B$ 一般需要 $A,B$ 都由正数组成，见习题。</x-remark>
</x-ex>

<x-ex t="函数值集合的确界" id="ex-supf">
<p>求函数 $f(x)=\dfrac{x}{1+x^2}$ 在 $(0,+\infty)$ 上的值域 $S=\{f(x) : x>0\}$ 的上确界与下确界。</p>
<x-sol>
<p>由 $1+x^2\ge2x$（即 $(x-1)^2\ge0$）得 $f(x)\le\frac12$，且 $x=1$ 时取等号，所以 $\sup S=\max S=\frac12$。</p>
<p>又 $f(x)>0$，所以 $0$ 是下界。任给 $\eps>0$，取 $x>\frac1\eps$，则 $f(x)=\dfrac{x}{1+x^2}<\dfrac{x}{x^2}=\dfrac1x<\eps$。故 $\inf S=0$，取不到。（实际上 $S=\left(0,\frac12\right]$。）</p>
</x-sol>
</x-ex>

<x-app t="平均成本永远降不到的那条线">
<p>某手工作坊制作一种小饰品，固定成本（模具、工具等）为 $100$ 元，每件的材料和人工成本为 $5$ 元。生产 $q$ 件时，平均每件的成本为 $C(q)=5+\dfrac{100}q$。</p>
<p>数集 $\{C(q) : q\in\Np\}$ 的最大数是 $C(1)=105$；下确界是 $5$，但取不到——无论产量多大，平均成本都高于 $5$ 元，却可以任意接近 $5$ 元。“任意接近”的含义正是下确界的条件 (2)：要使平均成本低于 $5+\eps$ 元，只需 $\frac{100}q<\eps$，即 $q>\frac{100}\eps$。例如要低于 $5.1$ 元，产量需超过 $1000$ 件。经济学中的“规模效应”有极限，物理中下落物体的速度越来越接近却达不到“终端速度”，说的都是“取不到的确界”。</p>
</x-app>

<x-viz type="plot" f="5+100/x;5" xmin="0" xmax="400" ymin="0" ymax="30" t="平均成本 $C(q)=5+\frac{100}q$ 与它的下确界">把横轴看作产量 q（曲线只在正整数处才有经济意义）。曲线越来越贴近水平直线 y = 5，却始终在它上方：5 是下确界，但不是最小值。</x-viz>

<x-app t="计算机里的“数”有空隙">
<p>计算机通常用 64 位二进制浮点数表示实数。它们只有有限多个（不超过 $2^{64}$ 个），而且都是有理数（有限二进制小数）。所以计算机的“数系”处处是空隙：$\sqrt2$、$\pi$ 无法精确表示，连 $0.1$ 也不行，因为它的二进制表示 $0.0\overline{0011}_{(2)}$ 是无限循环小数。在浏览器的开发者控制台中输入 <code>0.1 + 0.2 === 0.3</code>，会得到 <code>false</code>。</p>
<p>数值计算的思路是：用有理数（浮点数）逼近实数，并控制误差。这种逼近之所以有意义，靠的正是实数理论：有理数在实数中稠密，每个实数都能被有理数任意精确地逼近。</p>
</x-app>
`);
MA.add("2-1", String.raw`
<h2 id="dedekind">附录：Dedekind 切割定理</h2>
<p>确界存在定理用“上界”来刻画连续性。Dedekind 换了一个角度：把直线“切一刀”，看切口处是什么。</p>

<x-def t="切割" id="def-cut">
<p>设 $A,B$ 是 $\R$ 的两个子集，满足：</p>
<ol>
<li>$A,B$ 都非空；</li>
<li>$A\cup B=\R$，$A\cap B=\varnothing$；</li>
<li>对任意 $a\in A$，$b\in B$，都有 $a<b$，</li>
</ol>
<p>则称 $(A,B)$ 是实数系的一个<em>切割</em>（也称 Dedekind 分划），$A$ 称为下类，$B$ 称为上类。把其中的 $\R$ 换成 $\Q$，就得到有理数系的切割。</p>
</x-def>
<p>一刀切下去，切口处只有四种可能：</p>
<ol>
<li>$A$ 有最大数，$B$ 有最小数；</li>
<li>$A$ 有最大数，$B$ 没有最小数；</li>
<li>$A$ 没有最大数，$B$ 有最小数；</li>
<li>$A$ 没有最大数，$B$ 也没有最小数。</li>
</ol>
<p>情形 1 不可能出现：若 $a=\max A$，$b=\min B$，则中点 $\frac{a+b}2$ 满足 $a<\frac{a+b}2<b$，它既不在 $A$ 中（比 $A$ 的最大数大），也不在 $B$ 中（比 $B$ 的最小数小），与 $A\cup B$ 是全体矛盾。这个论证在 $\Q$ 和 $\R$ 中都成立。</p>
<p>情形 2、3 是“切在一个数上”：这个数要么归入下类成为最大数，要么归入上类成为最小数。情形 4 是“切在空隙上”。在 $\Q$ 中情形 4 确实会出现，例如</p>
$$A=\{x\in\Q : x\le0\ \text{或}\ x^2<2\},\qquad B=\{x\in\Q : x>0,\ x^2>2\}$$
<p>是 $\Q$ 的一个切割，由 <x-ref to="ex-gap"></x-ref>，$A$ 没有最大数，$B$ 没有最小数。Dedekind 正是用这样的切割来<em>定义</em>无理数的：每个“切在空隙上”的有理数切割，就确定一个无理数。</p>

<x-thm t="Dedekind 切割定理" id="thm-dedekind">
<p>对实数系的任意切割 $(A,B)$，或者 $A$ 有最大数，或者 $B$ 有最小数，二者必居其一，且只居其一。</p>
<x-proof>
<p>$A$ 非空，且每个 $b\in B$ 都是 $A$ 的上界。由确界存在定理，$\beta=\sup A$ 存在，并且 $\beta\le b$ 对一切 $b\in B$ 成立（上确界是最小的上界）。</p>
<p>$\beta$ 或者属于 $A$，或者属于 $B$。若 $\beta\in A$，则 $\beta$ 是 $A$ 的最大数；若 $\beta\in B$，由 $\beta\le b$（$b\in B$）知 $\beta$ 是 $B$ 的最小数。“只居其一”即上面已证明的“情形 1 不可能”。<span class="qed">∎</span></p>
</x-proof>
</x-thm>

<p>反过来，由 Dedekind 切割定理也能推出确界存在定理：</p>
<x-prop t="由切割定理推出确界存在定理" id="prop-ded2sup">
<p>若实数系满足 Dedekind 切割定理，则非空有上界的实数集必有上确界。</p>
<x-proof>
<p>设 $S$ 非空且有上界。令 $B$ 为 $S$ 的全体上界组成的集合，$A=\R\setminus B$。先验证 $(A,B)$ 是切割：</p>
<ul>
<li>$B$ 非空，因为 $S$ 有上界；$A$ 非空，因为任取 $x_0\in S$，$x_0-1$ 不是上界，属于 $A$；</li>
<li>$A\cup B=\R$，$A\cap B=\varnothing$，由定义显然；</li>
<li>若 $a\in A$，$b\in B$：$a$ 不是上界，所以存在 $x\in S$ 使 $x>a$；而 $b$ 是上界，$b\ge x$，于是 $a<b$。</li>
</ul>
<p>再说明 $A$ 没有最大数：对 $a\in A$，存在 $x\in S$ 使 $x>a$，则 $a'=\frac{a+x}2$ 满足 $a<a'<x$，所以 $a'$ 也不是上界，即 $a'\in A$ 且 $a'>a$。</p>
<p>由切割定理，$B$ 有最小数 $\beta$。$\beta$ 是最小的上界，即 $\beta=\sup S$。<span class="qed">∎</span></p>
</x-proof>
</x-prop>

<p>所以确界存在定理与 Dedekind 切割定理等价，它们是实数系连续性的两种表述。§2.4 还会给出更多等价的表述：单调有界定理、闭区间套定理、Bolzano–Weierstrass 定理和 Cauchy 收敛原理。</p>

<x-hist>据 Dedekind 自述，1858 年他在苏黎世讲授微积分时，苦恼于无法严格证明“单调有界的变量必有极限”，因为当时对实数本身并没有清楚的定义。他从“直线的连续性在于：若把直线上的点分成两类，使一类中的每个点都在另一类每个点的左边，则必有且只有一个点产生这一分割”出发，于 1872 年发表《连续性与无理数》，用有理数的切割严格定义了实数。同一年，Cantor 用有理数的 Cauchy 序列也给出了实数的构造。</x-hist>

<h2 id="summary">本节要点</h2>
<x-sum>
<ul>
<li>有理数对四则运算封闭、有序、稠密，但有“空隙”（如 $\sqrt2$ 处）；实数系填补了所有空隙。</li>
<li>实数可以看作无限小数；有理数 $\iff$ 有限小数或无限循环小数。</li>
<li>$\beta=\sup S$ $\iff$ ① 对一切 $x\in S$，$x\le\beta$；② 对任意 $\eps>0$，存在 $x\in S$，使 $x>\beta-\eps$。下确界类似。</li>
<li>上确界是最小的上界，不一定属于集合；属于集合时它就是最大数。</li>
<li>确界存在定理（实数系的连续性）：非空有上界的数集必有上确界，非空有下界的数集必有下确界。它在 $\Q$ 中不成立。</li>
<li>推论：Archimedes 性质；有理数和无理数在 $\R$ 中都稠密。</li>
<li>求确界：先猜，再用两个条件验证；常用技巧有“取 $n>\frac1\eps$”“把 $\eps$ 分成两半”。</li>
<li>Dedekind 切割定理与确界存在定理等价。</li>
</ul>
</x-sum>

<h2 id="quiz">概念自测</h2>
<x-quiz t="检验一下对确界的理解">
<x-q type="choice" answer="C">
<x-stem>下列数集中，有最大数的是</x-stem>
<x-opt>$(0,1)$</x-opt>
<x-opt>$\left\{1-\frac1n : n\in\Np\right\}$</x-opt>
<x-opt>$\left\{\frac1n : n\in\Np\right\}$</x-opt>
<x-opt>$\{x\in\Q : x^2<2\}$</x-opt>
<x-exp>$\left\{\frac1n\right\}$ 的最大数是 $n=1$ 时的 $1$。A、B 的上确界都是 $1$，但取不到；D 在 $\R$ 中的上确界是 $\sqrt2$，不属于该集合。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>若非空数集 $S$ 有上确界，则 $\sup S\in S$。</x-stem>
<x-exp>反例：$\sup(0,1)=1\notin(0,1)$。只有当 $S$ 有最大数时，$\sup S$ 才属于 $S$。</x-exp>
</x-q>
<x-q type="choice" answer="B">
<x-stem>设 $S$ 非空，$\beta$ 是 $S$ 的一个上界。下列哪个条件与“$\beta=\sup S$”等价？</x-stem>
<x-opt>存在 $x\in S$，使得对任意 $\eps>0$ 都有 $x>\beta-\eps$</x-opt>
<x-opt>对任意 $\eps>0$，存在 $x\in S$，使得 $x>\beta-\eps$</x-opt>
<x-opt>对任意 $\eps>0$，存在 $x\in S$，使得 $x>\beta+\eps$</x-opt>
<x-opt>存在 $x\in S$，使得 $x>\beta-1$</x-opt>
<x-exp>B 就是 $\eps$ 刻画。A 交换了量词顺序，实际上等价于 $\beta\in S$，即 $\beta$ 是最大数，比上确界强；C 与 $\beta$ 是上界矛盾；D 太弱。</x-exp>
</x-q>
<x-q type="fill" answer="-1" ph="填一个数">
<x-stem>数集 $\left\{(-1)^n+\frac1n : n\in\Np\right\}$ 的下确界是 ______。</x-stem>
<x-exp>奇数项 $-1+\frac1n$ 递减地趋向 $-1$，而所有项都大于 $-1$，所以下确界为 $-1$（取不到）。</x-exp>
</x-q>
<x-q type="fill" answer="1/2" ph="填一个数，如 1/3">
<x-stem>数集 $\left\{\dfrac{n}{n^2+1} : n\in\Np\right\}$ 的上确界是 ______。</x-stem>
<x-exp>由 $n^2+1\ge2n$ 得 $\frac n{n^2+1}\le\frac12$，$n=1$ 时取等号，所以上确界是最大数 $\frac12$。</x-exp>
</x-q>
<x-q type="multi" answer="ABC">
<x-stem>有理数集 $\Q$ 具有下列哪些性质？（多选）</x-stem>
<x-opt>对四则运算封闭（除数不为 $0$）</x-opt>
<x-opt>有序，且序与运算相容</x-opt>
<x-opt>稠密：任意两个不同的有理数之间还有有理数</x-opt>
<x-opt>非空有上界的有理数集必有有理数上确界</x-opt>
<x-exp>D 不成立：$\{x\in\Q : x^2<2\}$ 在 $\Q$ 中没有上确界。确界存在性正是实数区别于有理数的关键性质。</x-exp>
</x-q>
<x-q type="tf" answer="F">
<x-stem>两个无理数的和一定是无理数。</x-stem>
<x-exp>反例：$\sqrt2+(-\sqrt2)=0$。不过“有理数 + 无理数”一定是无理数。</x-exp>
</x-q>
<x-q type="fill" answer="33" ph="填一个正整数">
<x-stem>把 $0.\overline{12}$ 化为既约分数后，分母是 ______。</x-stem>
<x-exp>$0.\overline{12}=\frac{12}{99}=\frac4{33}$。</x-exp>
</x-q>
<x-q type="choice" answer="D">
<x-stem>对有理数系的切割 $A=\{x\in\Q : x\le0\text{ 或 }x^2<2\}$，$B=\{x\in\Q : x>0,\ x^2>2\}$，下列说法正确的是</x-stem>
<x-opt>$A$ 有最大数，$B$ 有最小数</x-opt>
<x-opt>$A$ 有最大数，$B$ 没有最小数</x-opt>
<x-opt>$A$ 没有最大数，$B$ 有最小数</x-opt>
<x-opt>$A$ 没有最大数，$B$ 也没有最小数</x-opt>
<x-exp>这是一个“切在空隙上”的切割，它对应无理数 $\sqrt2$。</x-exp>
</x-q>
<x-q type="tf" answer="T">
<x-stem>若数集 $S$ 有最大数，则 $\sup S=\max S$。</x-stem>
<x-exp>最大数 $\xi$ 是上界；任何小于 $\xi$ 的数都不是上界（$\xi$ 本身就超过它），所以 $\xi$ 是最小的上界。</x-exp>
</x-q>
</x-quiz>
`);
MA.add("2-1", String.raw`
<h2 id="exercises">习题</h2>
<p class="muted">建议先独立完成，再展开提示或解答。带输入框的题目可以直接核对数值结果（可以输入表达式，如 <code>27/110</code>、<code>sqrt(3)/2</code>）；做完后用题目下方的按钮标记“已掌握 / 需复习”。</p>

<x-prob level="基础" t="证明无理数">
<p>证明下列各数是无理数：(1) $\sqrt3$；(2) $\sqrt2+\sqrt3$；(3) $\log_23$。</p>
<x-hint>(1) 仿照 $\sqrt2$ 的证明，关键是“$3\mid p^2\Rightarrow3\mid p$”；(2) 假设它是有理数 $r$，把 $r^2$ 算出来；(3) 若 $\log_23=\frac pq$，则 $2^p=3^q$。</x-hint>
<x-ans>
<p>(1) 设 $\sqrt3=\frac pq$，$p,q$ 为互素的正整数，则 $p^2=3q^2$。若 $3\nmid p$，则 $p=3k\pm1$，$p^2=9k^2\pm6k+1$ 除以 $3$ 余 $1$，与 $3\mid p^2$ 矛盾，所以 $3\mid p$。记 $p=3m$，则 $9m^2=3q^2$，$q^2=3m^2$，同理 $3\mid q$，与互素矛盾。</p>
<p>(2) 若 $\sqrt2+\sqrt3=r\in\Q$，则 $r^2=5+2\sqrt6$，$\sqrt6=\frac{r^2-5}2\in\Q$。但 $\sqrt6$ 是无理数：若 $p^2=6q^2$（$p,q$ 互素），则 $p$ 为偶数，记 $p=2m$，得 $2m^2=3q^2$，于是 $3q^2$ 为偶数，$q$ 为偶数，矛盾。</p>
<p>(3) $\log_23>0$。若 $\log_23=\frac pq$（$p,q$ 为正整数），则 $2^{p/q}=3$，$2^p=3^q$，左边是偶数，右边是奇数，矛盾。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="循环小数化分数">
<p>把下列循环小数化为既约分数：(1) $0.\overline{36}$；(2) $0.2\overline{45}$；(3) $1.\overline{142857}$。</p>
<x-check answer="4/11">(1) $0.\overline{36}=$</x-check>
<x-check answer="27/110">(2) $0.2\overline{45}=$</x-check>
<x-check answer="8/7">(3) $1.\overline{142857}=$</x-check>
<x-hint>纯循环小数等于“循环节 ÷ 同样位数的 9…9”；(2) 先写成 $0.2+0.0\overline{45}$。</x-hint>
<x-ans>
<p>(1) $\frac{36}{99}=\frac4{11}$。</p>
<p>(2) $0.2\overline{45}=\frac2{10}+\frac1{10}\cdot\frac{45}{99}=\frac2{10}+\frac{45}{990}=\frac{198+45}{990}=\frac{243}{990}=\frac{27}{110}$。验算：$27\div110=0.24545\cdots$。</p>
<p>(3) $1+\frac{142857}{999999}=1+\frac17=\frac87$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="求确界">
<div>
<p>求下列数集的上确界与下确界，并指出它们是否是最大数、最小数：</p>
<p>(1) $\left\{1+\frac{(-1)^n}n : n\in\Np\right\}$；(2) $\{x\in\R : x^2-3x+2<0\}$；(3) $\left\{\sin\frac{n\pi}3 : n\in\Np\right\}$；(4) $\left\{\frac{n-1}{n+1} : n\in\Np\right\}$。</p>
</div>
<x-check answer="3/2">(1) 的上确界 =</x-check>
<x-check answer="0">(1) 的下确界 =</x-check>
<x-check answer="-sqrt(3)/2">(3) 的下确界 =</x-check>
<x-check answer="1">(4) 的上确界 =</x-check>
<x-hint>先列出前几项观察规律；(3) 中的数列以 $6$ 为周期；(4) 写成 $1-\frac2{n+1}$。</x-hint>
<x-ans>
<p>(1) 前几项为 $0,\ \frac32,\ \frac23,\ \frac54,\ \frac45,\ \frac76,\cdots$。$n$ 为奇数时 $1-\frac1n\in[0,1)$，$n$ 为偶数时 $1+\frac1n\in\left(1,\frac32\right]$。所以 $\sup=\max=\frac32$（$n=2$），$\inf=\min=0$（$n=1$）。</p>
<p>(2) $x^2-3x+2=(x-1)(x-2)<0\iff1<x<2$，数集为 $(1,2)$，$\sup=2$，$\inf=1$，都取不到。</p>
<p>(3) $n=1,\cdots,6$ 时依次为 $\frac{\sqrt3}2,\ \frac{\sqrt3}2,\ 0,\ -\frac{\sqrt3}2,\ -\frac{\sqrt3}2,\ 0$，此后周期重复，数集是有限集 $\left\{\frac{\sqrt3}2,0,-\frac{\sqrt3}2\right\}$，$\sup=\max=\frac{\sqrt3}2$，$\inf=\min=-\frac{\sqrt3}2$。</p>
<p>(4) $\frac{n-1}{n+1}=1-\frac2{n+1}$ 关于 $n$ 递增，$n=1$ 时为 $0$，所以 $\inf=\min=0$。各项都小于 $1$；对任意 $\eps>0$，取 $n>\frac2\eps$，则 $1-\frac2{n+1}>1-\frac2n>1-\eps$。所以 $\sup=1$，取不到。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="用定义证明确界">
<p>用确界的定义证明：(1) $\sup\left\{1-\frac1{2^n} : n\in\Np\right\}=1$；(2) $\inf\left\{\frac1n+\frac1m : m,n\in\Np\right\}=0$，并求该集合的最大数。</p>
<x-hint>(1) 由 Bernoulli 不等式 $2^n=(1+1)^n\ge1+n>n$，所以 $\frac1{2^n}<\frac1n$；(2) 取 $m=n$。</x-hint>
<x-ans>
<p>(1) $1-\frac1{2^n}<1$，所以 $1$ 是上界。任给 $\eps>0$，取 $n>\frac1\eps$，则 $\frac1{2^n}<\frac1n<\eps$，即 $1-\frac1{2^n}>1-\eps$。所以上确界为 $1$。</p>
<p>(2) 各元素都大于 $0$，所以 $0$ 是下界。任给 $\eps>0$，取 $n>\frac2\eps$，令 $m=n$，则 $\frac1n+\frac1m=\frac2n<\eps=0+\eps$。所以下确界为 $0$（取不到）。又 $\frac1n+\frac1m\le1+1=2$，$m=n=1$ 时取等号，所以最大数为 $2$。</p>
</x-ans>
</x-prob>

<x-prob level="基础" t="区间中有无穷多个有理数">
<p>证明：任意两个不同的实数之间有无穷多个有理数。</p>
<x-hint>反复使用稠密性：在 $(a,b)$ 中取 $r_1$，再在 $(r_1,b)$ 中取 $r_2$……</x-hint>
<x-ans>
<p>设 $a<b$。由稠密性，存在有理数 $r_1\in(a,b)$；再在 $(r_1,b)$ 中取有理数 $r_2$，在 $(r_2,b)$ 中取有理数 $r_3$……得到 $a<r_1<r_2<r_3<\cdots<b$，它们是 $(a,b)$ 中两两不同的无穷多个有理数。</p>
<p>另一种写法：区间 $\left(a+\frac{b-a}{k+1},\ a+\frac{b-a}k\right)$（$k=1,2,\cdots$）两两不交，且都包含于 $(a,b)$，每个区间中各取一个有理数即可。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="确界的基本性质">
<p>设 $A,B$ 是非空有界数集。证明：(1) $\inf A=-\sup(-A)$，其中 $-A=\{-x : x\in A\}$；(2) 若 $A\subset B$，则 $\inf B\le\inf A\le\sup A\le\sup B$；(3) $\sup(A\cup B)=\max\{\sup A,\sup B\}$。</p>
<x-hint>每一问都只需验证确界定义的两个条件；(2) 用“上确界是最小的上界”。</x-hint>
<x-ans>
<p>(1) 记 $\beta=\sup(-A)$。对 $x\in A$，$-x\le\beta$，即 $x\ge-\beta$，所以 $-\beta$ 是 $A$ 的下界。任给 $\eps>0$，存在 $-x\in-A$（$x\in A$）使 $-x>\beta-\eps$，即 $x<-\beta+\eps$。所以 $\inf A=-\beta$。</p>
<p>(2) $\sup B$ 是 $B$ 的上界，从而也是 $A$ 的上界，而 $\sup A$ 是 $A$ 的最小上界，所以 $\sup A\le\sup B$。同理 $\inf B\le\inf A$。又任取 $x\in A$，有 $\inf A\le x\le\sup A$。</p>
<p>(3) 记 $M=\max\{\sup A,\sup B\}$。对 $x\in A\cup B$，$x\le\sup A\le M$ 或 $x\le\sup B\le M$，所以 $M$ 是上界。不妨设 $M=\sup A$，任给 $\eps>0$，存在 $x\in A\subset A\cup B$ 使 $x>\sup A-\eps=M-\eps$。所以 $\sup(A\cup B)=M$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="确界的乘法">
<p>设 $A,B$ 是由正数组成的非空有上界的数集，$AB=\{ab : a\in A,\ b\in B\}$。证明 $\sup(AB)=\sup A\cdot\sup B$。去掉“正数”的条件，结论是否仍成立？</p>
<x-hint>记 $\alpha=\sup A$，$\beta=\sup B$。对 $a>\alpha-\delta$，$b>\beta-\delta$，估计 $\alpha\beta-ab=\alpha(\beta-b)+b(\alpha-a)$，再选取合适的 $\delta$。</x-hint>
<x-ans>
<p>记 $\alpha=\sup A$，$\beta=\sup B$，则 $\alpha,\beta>0$。(1) 对 $a\in A$，$b\in B$，$0<a\le\alpha$，$0<b\le\beta$，所以 $ab\le\alpha\beta$。(2) 任给 $\eps>0$，令 $\delta=\frac{\eps}{\alpha+\beta}$，取 $a\in A$ 使 $a>\alpha-\delta$，取 $b\in B$ 使 $b>\beta-\delta$。则 $0\le\alpha-a<\delta$，$0\le\beta-b<\delta$，于是</p>
$$\alpha\beta-ab=\alpha(\beta-b)+b(\alpha-a)\le\alpha(\beta-b)+\beta(\alpha-a)<(\alpha+\beta)\delta=\eps,$$
<p>即 $ab>\alpha\beta-\eps$。所以 $\sup(AB)=\alpha\beta$。</p>
<p>去掉正数条件后不成立。例如 $A=B=\{-1,-2\}$，则 $AB=\{1,2,4\}$，$\sup(AB)=4$，而 $\sup A\cdot\sup B=(-1)\cdot(-1)=1$。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="无理数的运算与稠密性">
<p>(1) 证明：有理数与无理数之和是无理数；非零有理数与无理数之积是无理数。(2) 证明：形如 $r\sqrt2$（$r$ 为非零有理数）的数在 $\R$ 中稠密，即任意两个不同实数之间都有这样的数。</p>
<x-hint>(1) 反证法；(2) 在 $\frac a{\sqrt2}$ 与 $\frac b{\sqrt2}$ 之间取一个非零有理数。</x-hint>
<x-ans>
<p>(1) 设 $r\in\Q$，$x$ 是无理数。若 $r+x=s\in\Q$，则 $x=s-r\in\Q$，矛盾。若 $r\ne0$ 且 $rx=s\in\Q$，则 $x=\frac sr\in\Q$，矛盾。</p>
<p>(2) 设 $a<b$，则 $\frac a{\sqrt2}<\frac b{\sqrt2}$，这个区间中有无穷多个有理数，可以取一个非零的有理数 $r$。于是 $a<r\sqrt2<b$，而由 (1)，$r\sqrt2$ 是无理数。这给出了“无理数稠密”的另一个证明。</p>
</x-ans>
</x-prob>

<x-prob level="提高" t="有理数系中没有上确界">
<p>证明：数集 $S=\{x\in\Q : x^3<2\}$ 在 $\Q$ 中有上界，但没有一个有理数是 $S$ 的最小上界。</p>
<x-hint>先证 $\sqrt[3]2$ 是无理数。再证：$S$ 的任一有理上界 $r$ 都满足 $r>\sqrt[3]2$，而 $\sqrt[3]2$ 与 $r$ 之间的有理数是更小的上界。</x-hint>
<x-ans>
<p>$2$ 是 $S$ 的有理上界（$x\ge2\Rightarrow x^3\ge8$）。</p>
<p>$\sqrt[3]2$ 是无理数：若 $p^3=2q^3$（$p,q$ 为互素的正整数），则 $p$ 为偶数，记 $p=2m$，得 $q^3=4m^3$，$q$ 也为偶数，矛盾。</p>
<p>设有理数 $r$ 是 $S$ 的上界。若 $r<\sqrt[3]2$，取有理数 $s$ 满足 $r<s<\sqrt[3]2$，则 $s^3<2$，$s\in S$ 且 $s>r$，矛盾；又 $r\ne\sqrt[3]2$，所以 $r>\sqrt[3]2$。再取有理数 $t$ 满足 $\sqrt[3]2<t<r$：对 $x\in S$，$x^3<2<t^3$，所以 $x<t$（立方函数严格递增），即 $t$ 是比 $r$ 更小的有理上界。故 $S$ 在 $\Q$ 中没有最小上界。</p>
</x-ans>
</x-prob>

<x-prob level="挑战" t="平方根的存在性">
<p>用确界存在定理证明：对任意正实数 $a$，存在唯一的正实数 $\beta$，使 $\beta^2=a$。</p>
<x-hint>令 $S=\{x>0 : x^2<a\}$，$\beta=\sup S$。分别说明 $\beta^2<a$ 和 $\beta^2>a$ 都不可能：例如 $\beta^2<a$ 时，找小正数 $h$ 使 $(\beta+h)^2<a$，利用 $(\beta+h)^2\le\beta^2+h(2\beta+1)$（$0<h<1$）。</x-hint>
<x-ans>
<p>令 $S=\{x>0 : x^2<a\}$。$S$ 非空：$x_0=\frac a{1+a}$ 满足 $0<x_0<1$ 且 $x_0<a$，所以 $x_0^2<x_0<a$。$S$ 有上界 $1+a$：若 $x\ge1+a$，则 $x^2\ge(1+a)^2>a$。由确界存在定理，$\beta=\sup S$ 存在，且 $\beta\ge x_0>0$。</p>
<p>若 $\beta^2<a$：取 $h$ 满足 $0<h<1$ 且 $h<\frac{a-\beta^2}{2\beta+1}$，则 $(\beta+h)^2=\beta^2+2\beta h+h^2<\beta^2+h(2\beta+1)<a$，所以 $\beta+h\in S$，与 $\beta$ 是上界矛盾。</p>
<p>若 $\beta^2>a$：取 $h$ 满足 $0<h<\beta$ 且 $h<\frac{\beta^2-a}{2\beta}$，则 $(\beta-h)^2>\beta^2-2\beta h>a$。对任意 $x\in S$，$x^2<a<(\beta-h)^2$，而 $x>0$，$\beta-h>0$，所以 $x<\beta-h$，即 $\beta-h$ 是比 $\beta$ 更小的上界，矛盾。</p>
<p>所以 $\beta^2=a$。唯一性：若 $\beta,\gamma>0$，$\beta^2=\gamma^2=a$，则 $(\beta-\gamma)(\beta+\gamma)=0$，而 $\beta+\gamma>0$，故 $\beta=\gamma$。</p>
<x-remark>同样的方法可以证明 $n$ 次方根的存在性。在 $\Q$ 中，对应的集合未必有上确界（例如 $a=2$，见<x-ref to="ex-gap"></x-ref>）——$\sqrt a$ 的存在性正是由实数的连续性保证的。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="取不到的上确界附近">
<p>设 $S$ 非空有上界，$\beta=\sup S\notin S$。证明：对任意 $\eps>0$，区间 $(\beta-\eps,\beta)$ 中含有 $S$ 的无穷多个点；并由此构造 $S$ 中严格递增的一列数 $x_1<x_2<\cdots$，使 $\beta-x_n<\frac1n$。</p>
<x-hint>由定义，存在 $x_1\in S$ 使 $x_1>\beta-\eps$，又 $x_1\ne\beta$；再对 $\eps'=\beta-x_1$ 使用定义……</x-hint>
<x-ans>
<p>由定义存在 $x_1\in S$ 使 $x_1>\beta-\eps$，又 $x_1\le\beta$ 且 $x_1\ne\beta$（$\beta\notin S$），所以 $x_1\in(\beta-\eps,\beta)$。再对 $\eps_1=\beta-x_1>0$ 使用定义，得 $x_2\in S$，$x_1<x_2<\beta$。如此继续，得到 $(\beta-\eps,\beta)$ 中 $S$ 的无穷多个两两不同的点。</p>
<p>构造：取 $x_1\in S$ 使 $x_1>\beta-1$。已取定 $x_n$ 后，令 $\eps_{n+1}=\min\left\{\beta-x_n,\ \frac1{n+1}\right\}>0$，取 $x_{n+1}\in S$ 使 $x_{n+1}>\beta-\eps_{n+1}$，则 $x_{n+1}>x_n$ 且 $\beta-x_{n+1}<\frac1{n+1}$。</p>
<x-remark>学了 §2.2 就知道，这说明 $S$ 中有严格递增的数列收敛到 $\beta$。“确界可以用集合中的点来逼近”是确界最重要的用法之一。</x-remark>
</x-ans>
</x-prob>

<x-prob level="挑战" t="Dirichlet 逼近定理">
<p>设 $\alpha$ 是无理数，$N$ 是正整数。证明：存在整数 $p$ 和正整数 $q\le N$，使 $|q\alpha-p|<\frac1N$，从而 $\left|\alpha-\frac pq\right|<\frac1{q^2}$。进一步证明：满足 $\left|\alpha-\frac pq\right|<\frac1{q^2}$ 的分数 $\frac pq$ 有无穷多个。</p>
<x-hint>抽屉原理：把 $N+1$ 个数 $\{k\alpha\}=k\alpha-[k\alpha]$（$k=0,1,\cdots,N$）放进 $N$ 个小区间 $\left[\frac jN,\frac{j+1}N\right)$（$j=0,\cdots,N-1$）。</x-hint>
<x-ans>
<p>$N+1$ 个数 $\{0\cdot\alpha\},\{\alpha\},\cdots,\{N\alpha\}$ 都在 $[0,1)$ 中，而 $[0,1)$ 被分成 $N$ 个长为 $\frac1N$ 的小区间，由抽屉原理，必有两个数 $\{i\alpha\}$、$\{j\alpha\}$（$0\le i<j\le N$）落在同一个小区间，于是 $|\{j\alpha\}-\{i\alpha\}|<\frac1N$。令 $q=j-i$（$1\le q\le N$），$p=[j\alpha]-[i\alpha]$，则 $q\alpha-p=\{j\alpha\}-\{i\alpha\}$，故 $|q\alpha-p|<\frac1N$。两边除以 $q$，得 $\left|\alpha-\frac pq\right|<\frac1{qN}\le\frac1{q^2}$。</p>
<p>无穷多个：若只有有限个这样的分数 $\frac{p_1}{q_1},\cdots,\frac{p_k}{q_k}$，因为 $\alpha$ 是无理数，$\delta=\min_i\left|\alpha-\frac{p_i}{q_i}\right|>0$。取 $N>\frac1\delta$，由前面的结论得 $\frac pq$ 满足 $\left|\alpha-\frac pq\right|<\frac1{qN}\le\frac1N<\delta$ 且 $\left|\alpha-\frac pq\right|<\frac1{q^2}$，它不在这 $k$ 个分数之中，矛盾。</p>
<x-remark>例如 $\pi\approx\frac{22}7$，误差约 $0.00126<\frac1{49}$；祖冲之的密率 $\frac{355}{113}$ 误差仅约 $2.7\times10^{-7}$。齿轮传动比、历法置闰等实际问题，都需要用分母不大的分数逼近无理数。</x-remark>
</x-ans>
</x-prob>

<x-prob level="应用" t="定制徽章的平均成本">
<p>某文创店定制一款纪念徽章，开模费 $2000$ 元，每枚的生产成本为 $8$ 元，生产 $q$ 枚的平均成本为 $C(q)=8+\frac{2000}q$（元/枚）。(1) 求数集 $\{C(q) : q\in\Np\}$ 的上确界与下确界，它们能否取到？(2) 要使平均成本不超过 $10$ 元，至少要生产多少枚？(3) 要使平均成本与其下确界之差小于 $\eps$ 元，至少要生产多少枚（用 $\eps$ 表示）？</p>
<x-check answer="1000" unit="枚">(2) 至少生产</x-check>
<x-hint>$C(q)$ 关于 $q$ 递减；(2) 解不等式 $\frac{2000}q\le2$。</x-hint>
<x-ans>
<p>(1) $C(q)$ 关于 $q$ 严格递减，所以 $\sup=\max=C(1)=2008$。$C(q)>8$，且对任意 $\eps>0$，$q>\frac{2000}\eps$ 时 $C(q)<8+\eps$，所以 $\inf=8$，取不到。</p>
<p>(2) $8+\frac{2000}q\le10\iff q\ge1000$，至少生产 $1000$ 枚。</p>
<p>(3) $\frac{2000}q<\eps\iff q>\frac{2000}\eps$，至少生产 $\left[\frac{2000}\eps\right]+1$ 枚。这正是“下确界的 $\eps$ 刻画”在实际问题中的样子：对任意给定的精度要求 $\eps$，都能找到满足要求的产量。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="终端速度">
<p>跳伞运动员打开降落伞之前，在空气阻力作用下的下落速度可近似为 $v(t)=50\left(1-e^{-t/5}\right)$（m/s），$t\ge0$ 为时间（s）。(1) 求 $\{v(t) : t\ge0\}$ 的上确界，说明它能否取到，并解释其物理意义；(2) 速度第一次达到 $49$ m/s 是在什么时刻？</p>
<x-check answer="5*ln(50)" tol="0.01" unit="s">(2) $t=$</x-check>
<x-hint>(1) 解不等式 $v(t)>50-\eps$；(2) 解方程 $e^{-t/5}=\frac1{50}$。</x-hint>
<x-ans>
<p>(1) $e^{-t/5}>0$，所以 $v(t)<50$。对任意 $0<\eps<50$，$v(t)>50-\eps\iff50e^{-t/5}<\eps\iff t>5\ln\frac{50}\eps$。所以 $\sup=50$ m/s，取不到。物理上，$50$ m/s 是“终端速度”：空气阻力随速度增大，速度越来越接近终端速度，但在这个模型中永远达不到。</p>
<p>(2) $50\left(1-e^{-t/5}\right)=49\iff e^{-t/5}=\frac1{50}\iff t=5\ln50\approx19.56$ s。</p>
</x-ans>
</x-prob>

<x-prob level="应用" t="A4 纸里的 $\sqrt2$">
<p>A 系列纸张（A0、A1、A2、…）的长宽比都相同，并且把 A$k$ 纸沿长边的中点对折，恰好得到 A$(k+1)$ 纸。(1) 证明长宽比必为 $\sqrt2$；(2) A4 纸的尺寸为 $297$ mm × $210$ mm，计算 $\frac{297}{210}-\sqrt2$；(3) 在分子、分母都是不超过 $100$ 的正整数的分数中，哪一个最接近 $\sqrt2$？</p>
<x-check answer="297/210-sqrt(2)" tol="0.000001">(2) $\frac{297}{210}-\sqrt2\approx$</x-check>
<x-check answer="99/70">(3) 最接近 $\sqrt2$ 的分数是</x-check>
<x-hint>(1) 设长为 $L$、宽为 $W$，对折后的纸长为 $W$、宽为 $\frac L2$；(3) 先把 $\frac{297}{210}$ 约分看看。</x-hint>
<x-ans>
<p>(1) 设长宽比 $r=\frac LW$。对折后纸的两边为 $W$ 和 $\frac L2$，长宽比为 $\frac W{L/2}=\frac2r$。比例不变，故 $r=\frac2r$，$r=\sqrt2$。</p>
<p>(2) $\frac{297}{210}=\frac{99}{70}=1.4142857\cdots$，而 $\sqrt2=1.4142136\cdots$，差约为 $7.2\times10^{-5}$。</p>
<p>(3) $\frac{99}{70}$。可以用计算机穷举 $1\le p,q\le100$ 验证；理论上，$\sqrt2$ 的连分数“渐近分数”是 $1,\ \frac32,\ \frac75,\ \frac{17}{12},\ \frac{41}{29},\ \frac{99}{70},\ \frac{239}{169},\cdots$（每一项的分子、分母由前一项 $\frac pq$ 按 $\frac{p+2q}{p+q}$ 得到），分母不超过 $q$ 的分数中，没有比它们更接近 $\sqrt2$ 的。A4 纸的尺寸恰好取了其中的 $\frac{99}{70}$（乘以 $3$ 得 $\frac{297}{210}$）。</p>
<x-remark>A0 纸的面积规定为 $1\ \text{m}^2$，于是宽 $W=2^{-1/4}\approx0.8409$ m，长 $L=2^{1/4}\approx1.1892$ m，取整为 $841\times1189$ mm，对折 4 次得到 A4。用无理数比例设计纸张，正是因为只有它能保证“对折后形状不变”。</x-remark>
</x-ans>
</x-prob>
`);
