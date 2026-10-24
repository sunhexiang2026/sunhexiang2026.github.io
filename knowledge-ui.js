/* 本地知识条目的展示层。正文始终以文本处理；不执行条目中的 HTML。 */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const mathTags = new Set(['math','mrow','mi','mn','mo','mtext','mfrac','msqrt','mroot','msub','msup','msubsup','munder','mover','munderover','mtable','mtr','mtd','mspace']);
  function mathMarkup(source, description) {
    const xml = new DOMParser().parseFromString('<math xmlns="http://www.w3.org/1998/Math/MathML">'+source+'</math>','application/xml');
    if(xml.querySelector('parsererror')) return '<p class="math-fallback">'+esc(description)+'</p>';
    function clean(node) {
      if(node.nodeType === 3) return esc(node.textContent);
      if(node.nodeType !== 1 || !mathTags.has(node.localName) || node.namespaceURI !== 'http://www.w3.org/1998/Math/MathML') return '';
      const variant = ['normal','bold','italic','double-struck','script'].includes(node.getAttribute('mathvariant')) ? ' mathvariant="'+node.getAttribute('mathvariant')+'"' : '';
      return '<'+node.localName+variant+'>'+[...node.childNodes].map(clean).join('')+'</'+node.localName+'>';
    }
    return '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block" aria-label="'+esc(description)+'" alttext="'+esc(description)+'">'+[...xml.documentElement.childNodes].map(clean).join('')+'</math>';
  }
  function localPath(source, type) {
    if(typeof source!=='string'||source.includes('..')||!/^media\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_.-]+$/.test(source)) return null;
    const ext=source.split('.').pop().toLowerCase();
    const types={image:['svg','png','jpg','jpeg','webp','gif'],audio:['mp3','wav','ogg','m4a'],video:['mp4','webm'],captions:['vtt']};
    return types[type]?.includes(ext) ? './'+source : null;
  }
  function sourceLink(value) {
    try { const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password?url.href:null; } catch {return null;}
  }
  function paragraphs(text) {return String(text??'').split(/\n\s*\n/).map(p=>'<p>'+esc(p).replace(/\n/g,'<br>')+'</p>').join('');}
  function renderBlock(block) {
    if(block.type==='text') return paragraphs(block.text);
    if(block.type==='lead') return '<div class="knowledge-lead">'+paragraphs(block.text)+'</div>';
    if(block.type==='formula') return '<figure class="formula-block"><div class="formula-scroll">'+mathMarkup(block.math,block.description)+'</div><figcaption>'+esc(block.description)+'</figcaption>'+(block.symbols?.length?'<dl class="symbol-list">'+block.symbols.map(([symbol,meaning])=>'<div><dt>'+esc(symbol)+'</dt><dd>'+esc(meaning)+'</dd></div>').join('')+'</dl>':'')+'</figure>';
    if(block.type==='flow') return '<ol class="knowledge-flow">'+block.steps.map(step=>'<li><strong>'+esc(step.title)+'</strong><span>'+esc(step.text)+'</span></li>').join('')+'</ol>';
    if(block.type==='table') return '<div class="knowledge-table"><table><caption>'+esc(block.caption||'对照表')+'</caption><thead><tr>'+block.columns.map(c=>'<th scope="col">'+esc(c)+'</th>').join('')+'</tr></thead><tbody>'+block.rows.map(row=>'<tr>'+row.map((cell,i)=>i===0?'<th scope="row">'+esc(cell)+'</th>':'<td>'+esc(cell)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>';
    if(block.type==='note') return '<aside class="knowledge-note"><strong>'+esc(block.label||'适用边界')+'</strong>'+paragraphs(block.text)+'</aside>';
    if(block.type==='quiz') return '<details class="knowledge-check"><summary><span>想一想</span>'+esc(block.question)+'</summary><div>'+paragraphs(block.answer)+'</div></details>';
    if(block.type==='image') {const src=localPath(block.src,'image');return src?'<figure class="knowledge-figure"><img src="'+esc(src)+'" alt="'+esc(block.alt)+'" loading="lazy"><figcaption>'+esc(block.caption)+'</figcaption></figure>':'<p class="knowledge-note">图像未配置为有效的本地素材。</p>';}
    if(block.type==='audio'||block.type==='video') {
      const src=localPath(block.src,block.type);if(!src)return '<p class="knowledge-note">音视频未配置为有效的本地素材。</p>';
      const captions=block.type==='video'&&localPath(block.captions,'captions');
      return '<figure class="knowledge-figure"><'+block.type+' controls preload="none" '+(block.type==='video'?'playsinline ':'')+'src="'+esc(src)+'" aria-label="'+esc(block.label||'讲解')+'">'+(captions?'<track kind="captions" src="'+esc(captions)+'" srclang="zh" label="中文" default>':'')+'当前浏览器不支持播放。</'+block.type+'><figcaption>'+esc(block.caption)+'</figcaption>'+(block.transcript?'<details class="knowledge-check"><summary>文字讲稿</summary><div>'+paragraphs(block.transcript)+'</div></details>':'')+'</figure>';
    }
    if(block.type==='sources') return '<ol class="knowledge-sources">'+block.items.map(item=>{const href=sourceLink(item.url);return '<li>'+(href?'<a href="'+esc(href)+'" target="_blank" rel="noopener noreferrer">'+esc(item.title)+' ↗</a>':'<strong>'+esc(item.title)+'</strong>')+'<p>'+esc(item.note)+'</p></li>';}).join('')+'</ol><p class="source-disclosure">公开链接仅在点击后打开。图示与数值例子为本站教学重绘或人工构造，不是原研究数据。</p>';
    if(block.type==='estimator-lab') return '<section class="learning-lab" data-lab="estimator"><p class="lab-kicker">动手改一个数 · 人工构造的分布</p><p>X 只取 0 或 2；给定记录后，取 2 的概率是 0.75。拖动你要报出的估计值。</p><label>报出的数 a <output data-estimate-value>1.50</output><input type="range" min="0" max="2" step="0.05" value="1.5" aria-label="报出的估计值 a"></label><div class="lab-result" aria-live="polite"></div><div class="loss-track" aria-hidden="true"><span></span></div><p class="lab-footnote">绿色条表示相对额外误差；后验平均值 1.50 对应额外误差 0。</p></section>';
    if(block.type==='selection-lab') return '<section class="learning-lab" data-lab="selection"><p class="lab-kicker">切换分母 · 固定的 10 次尝试</p><p>其中 6 轮平方误差为 1，另外 4 轮为 9。这个教学例子假设评分后可按误差筛选，不代表真实任务允许这样做。</p><div class="lab-actions"><button type="button" data-select="all" aria-pressed="true">保留全部 10 轮</button><button type="button" data-select="easy" aria-pressed="false">只保留 6 个易样本</button></div><div class="trial-dots" aria-hidden="true">'+Array.from({length:10},(_,i)=>'<span class="trial-dot '+(i<6?'easy':'hard')+'">'+(i<6?'1':'9')+'</span>').join('')+'</div><div class="lab-result" aria-live="polite"></div><p class="lab-footnote">原始误差没有改善；只是保留样本和评分分母变了。实际筛选可使用哪些信息，必须由任务规则决定。</p></section>';
    return '';
  }
  function render(post) {
    const headings=[];
    const html=(post.blocks||[]).map(block=>{let heading='';if(block.title){const id='knowledge-section-'+headings.length;headings.push({id,text:block.title});heading='<h2 id="'+id+'">'+esc(block.title)+'</h2>';}return heading+renderBlock(block);}).join('');
    return {html,headings};
  }
  function plainText(post) {
    const parts=[post.content||'',...(post.tags||[]),post.level||''];
    function walk(value,key) {if(key==='math'||key==='url'||key==='src'||key==='captions')return;if(typeof value==='string')parts.push(value);else if(Array.isArray(value))value.forEach(x=>walk(x,''));else if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>walk(v,k));}
    walk(post.blocks,'');return parts.join(' ');
  }
  function mount(root) {
    root.querySelectorAll('[data-lab="estimator"]').forEach(lab=>{
      const input=lab.querySelector('input');
      const update=()=>{const a=Number(input.value),extra=(a-1.5)**2,loss=.75+extra;lab.querySelector('output').textContent=a.toFixed(2);lab.querySelector('.lab-result').textContent='平均平方误差 = '+loss.toFixed(4)+'；其中不可消除的后验方差为 0.7500，报值偏离带来的额外误差为 '+extra.toFixed(4)+'。';lab.querySelector('.loss-track span').style.width=(extra/2.25*100)+'%';};
      input.addEventListener('input',update);update();
    });
    root.querySelectorAll('[data-lab="selection"]').forEach(lab=>{
      const update=mode=>{const easy=mode==='easy',q=easy?.6:1,d=easy?1:4.2;lab.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.select===mode)));lab.querySelectorAll('.hard').forEach(dot=>dot.classList.toggle('excluded',easy));lab.querySelector('.lab-result').textContent='回答率 q = '+q.toFixed(2)+'；保留轮次的条件误差 D = '+d.toFixed(2)+'；按全部尝试计的 qD = '+(q*d).toFixed(2)+'。';};
      lab.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>update(b.dataset.select)));update('all');
    });
  }
  window.KnowledgeUI={render,plainText,mount};
})();
