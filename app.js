(() => {
  'use strict';
  const blog = window.BLOG;
  const academic = window.AcademicUI;
  const categories = {knowledge:'知识点',experience:'研究经验',essay:'随笔',notes:'笔记',life:'生活'};
  const learning = window.KNOWLEDGE || [];
  const richUI = window.KnowledgeUI;
  const posts = [...blog.posts,...learning].sort((a,b) => b.date.localeCompare(a.date)||Number(a.sample)-Number(b.sample));
  const main = document.getElementById('main');
  document.querySelector('.skip-link').addEventListener('click', event => {event.preventDefault();main.focus();main.scrollIntoView({block:'start'});});
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const postHref = post => '#/post/' + encodeURIComponent(post.id);
  const dateText = date => date.replaceAll('-', '.');
  const plainText = post => richUI ? richUI.plainText(post) : post.content;
  const minutes = post => Math.max(1, Math.ceil(plainText(post).replace(/\s/g,'').length / 350));
  const sample = post => post.sample ? '<span class="sample-label">示例</span>' : '';
  const meta = post => `<div class="post-meta"><a class="category" href="#/category/${encodeURIComponent(post.category)}">${escape(categories[post.category] || post.category)}</a><span>·</span><time datetime="${escape(post.date)}">${escape(dateText(post.date))}</time>${sample(post)}</div>`;

  function artwork(kind, hero=false) {
    if (hero) return `<svg viewBox="0 0 440 285" role="img" aria-label="抽象插画：山间的日光与打开的书本"><defs><clipPath id="hero-clip"><rect x="0" y="0" width="440" height="285" rx="5"/></clipPath><pattern id="hero-grain" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".45" fill="#5a6e50" opacity=".12"/></pattern></defs><g clip-path="url(#hero-clip)"><path fill="#e8eadd" d="M0 0h440v285H0z"/><circle cx="323" cy="82" r="37" fill="#d8a384"/><path d="M0 206Q88 95 194 164T440 131v154H0Z" fill="#c6d1bb"/><path d="M0 247Q86 173 186 201T440 173v112H0Z" fill="#9eb398"/><path d="M0 266q141-53 232-23t208-22v64H0Z" fill="#6c8b75"/><path d="m58 111 18-9 17 9M94 88l12-6 12 6" fill="none" stroke="#6c8069" stroke-width="1.5" stroke-linecap="round"/><ellipse cx="221" cy="256" rx="96" ry="9" fill="#3a5742" opacity=".17"/><path d="m126 211 84-8 18 14 18-14 77 10-8 43-88 7-96-7Z" fill="#657b64"/><path d="M134 203q43-16 92 8v43q-42-21-92-6Z" fill="#fffbed"/><path d="M226 211q39-26 89-8v45q-42-15-89 6Z" fill="#f2eedc"/><path d="M226 211v43m-77-37q32-6 61 5m-61 7q32-6 61 5m33-11q28-11 57-5m-57 16q28-11 57-5" fill="none" stroke="#c1c8b0" stroke-width="1.1"/><path d="m267 216-8 21 7-3 3 7 9-28" fill="#b4795d"/><path fill="url(#hero-grain)" d="M0 0h440v285H0z"/></g></svg>`;
    const art = {
      essay:`<rect width="150" height="145" fill="#e5e9dd"/><circle cx="111" cy="36" r="18" fill="#d7ad8a"/><path d="M0 100q43-40 88-12t62-5v62H0" fill="#bccbb2"/><path d="M0 125q61-34 150-13v33H0" fill="#829f84"/><path d="m34 88 38-9 36 9v34l-36-9-38 9Z" fill="#faf6e8"/><path d="M72 79v34" stroke="#bac5aa"/>`,
      notes:`<rect width="150" height="145" fill="#ece7db"/><rect x="36" y="24" width="75" height="100" rx="3" fill="#faf8ec" transform="rotate(-7 74 74)"/><path d="m49 47 44-6m-42 18 44-6m-42 18 31-4m-29 18 44-6m-42 18 31-4" stroke="#b5c2a5" stroke-width="2"/><path d="m109 38 7 3-36 68-6 4 1-8Z" fill="#a36f4e"/><path d="m110 38 6 3 4-8-6-3Z" fill="#46614b"/>`,
      life:`<rect width="150" height="145" fill="#e9e5db"/><rect x="24" y="20" width="102" height="105" rx="48" fill="#cfdbc7"/><circle cx="96" cy="48" r="16" fill="#d7a082"/><path d="M24 104q40-36 102-16v37H24Z" fill="#97af91"/><path d="M73 120V65m0 29Q50 94 49 74q23 1 24 20m0 11q22-1 24-21-22 1-24 21" fill="#5e805f" stroke="#5e805f" stroke-width="2"/><path d="M60 114h26l-5 18H65Z" fill="#bb8363"/>`
    };
    return `<svg viewBox="0 0 150 145" aria-hidden="true">${art[kind] || art.essay}</svg>`;
  }

  function sidebar() {
    return `<aside class="sidebar" aria-label="博客信息"><section><p class="aside-title">A LITTLE ABOUT THIS SPACE</p><div class="profile-emblem" aria-hidden="true">j.</div><h3>你好，欢迎来坐坐。</h3><p class="profile-text">这里收纳文字、笔记和日常。<br>在安静的一隅，让想法慢慢生长。</p><a class="small-link" href="#/about">关于这个小站 ↗</a></section><section class="aside-block"><p class="aside-title">文字的几个抽屉</p><div class="category-list">${Object.entries(categories).map(([key,label])=>`<a href="#/category/${key}"><span class="category-dot ${key}"></span>${label}<span class="category-number">${String(posts.filter(p=>p.category===key).length).padStart(2,'0')}</span></a>`).join('')}</div></section><div class="side-note"><div class="note-icon" aria-hidden="true">“</div><p>不必等到想法完整，<br>记录本身就是一种整理。</p><small>A SMALL THOUGHT, KEPT HERE.</small></div><p class="privacy-note"><span class="privacy-dot"></span>公开阅读 · 初始文章均为示例。</p></aside>`;
  }

  function postCard(post) {
    return `<article class="post-card"><div>${meta(post)}<h3><a href="${postHref(post)}">${escape(post.title)}</a></h3><p>${escape(post.excerpt)}</p><div class="post-footer"><span>约 ${minutes(post)} 分钟阅读</span><a class="read-link" href="${postHref(post)}" aria-label="阅读：${escape(post.title)}">阅读全文<span aria-hidden="true">↗</span></a></div></div><a class="post-art" href="${postHref(post)}" aria-label="阅读：${escape(post.title)}">${artwork(post.category)}</a></article>`;
  }

  function tabs(selected) {
    return `<nav class="category-tabs" aria-label="文章分类"><a href="#/articles" class="${selected?'':'active'}" ${selected?'':'aria-current="page"'}>全部</a>${Object.entries(categories).map(([key,label])=>`<a href="#/category/${key}" class="${selected===key?'active':''}" ${selected===key?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`;
  }

  function journal(category) {
    const list = category ? posts.filter(p=>p.category===category) : posts;
    return `<div class="journal-layout"><section id="journal" aria-label="文章列表"><div class="section-top"><h2>${escape(categories[category] || '最新文章')}<small>THE JOURNAL</small></h2><span class="count">${list.length} 篇记录</span></div>${tabs(category)}${list.map(postCard).join('') || '<p class="empty-state">这个抽屉还空着，下一篇文章正在路上。</p>'}${!category?'<a class="all-posts" href="#/archive">沿着时间，看看归档 ↗</a>':''}</section>${sidebar()}</div>`;
  }

  function heading(label,title,description) {
    return `<div class="page-heading"><p class="eyebrow">${escape(label)}</p><h1>${escape(title)}</h1><p>${escape(description)}</p></div>`;
  }

  function knowledge() {
    const total=learning.filter(p=>p.category==='knowledge').length;
    const methods=learning.filter(p=>p.category==='experience').length;
    const intro='<div class="learning-intro"><p><strong>'+total+' 个知识点 · '+methods+' 篇方法经验</strong><span>直觉 → 图解 → 公式 → 例子 → 自测 → 来源</span></p><p>'+(learning.length?'通用知识与方法经验，按理解顺序整理。':'知识点与研究经验已全部清空，后续可按需重新添加。')+'</p></div>';
    const entries=learning.map((post,i)=>'<div class="learning-entry"><p class="entry-label"><span>'+String(i+1).padStart(2,'0')+'</span>'+escape(post.evidence)+'</p>'+postCard(post)+'</div>').join('') || '<p class="empty-state">知识库暂无内容。</p>';
    return heading('LEARN, CONNECT & REMEMBER','把知识点，真正弄明白。','先看直觉，再读定义与推导。图解、例子、适用条件和来源，放在同一页。')+intro+'<div class="journal-layout"><section aria-label="知识库条目"><div class="section-top"><h2>从这里开始<small>A LEARNING PATH</small></h2><span class="count">按理解顺序排列</span></div>'+entries+'</section>'+sidebar()+'</div>';
  }

  function renderMarkdown(source) {
    if(window.SiteMarkdown){const container=document.createElement("div");container.innerHTML=window.SiteMarkdown.render(source);const headings=[];container.querySelectorAll("h1,h2,h3").forEach((h,i)=>{h.id="section-"+i;headings.push({id:h.id,text:h.textContent});});return {html:container.innerHTML,headings};}
    const lines = source.replace(/\r/g,'').split('\n');
    const output = [], headings = [];
    let paragraphs = [], list = [], quote = [], code = [], inCode = false;
    const flushParagraph = () => { if(paragraphs.length) { output.push('<p>'+escape(paragraphs.join('\n')).replace(/\n/g,'<br>')+'</p>'); paragraphs=[]; } };
    const flushList = () => { if(list.length) { output.push('<ul>'+list.map(t=>'<li>'+escape(t)+'</li>').join('')+'</ul>'); list=[]; } };
    const flushQuote = () => { if(quote.length) { output.push('<blockquote><p>'+escape(quote.join('\n')).replace(/\n/g,'<br>')+'</p></blockquote>'); quote=[]; } };
    const flush = () => {flushParagraph();flushList();flushQuote();};
    for (const line of lines) {
      if(line.startsWith('```')) { flush(); if(inCode) {output.push('<pre><code>'+escape(code.join('\n'))+'</code></pre>');code=[];} inCode=!inCode;continue; }
      if(inCode) {code.push(line);continue;}
      const h=line.match(/^(#{1,3})\s+(.+)$/);
      if(h) { flush(); const level=Math.max(2,h[1].length); const id='section-'+headings.length; headings.push({id,text:h[2]});output.push(`<h${level} id="${id}">${escape(h[2])}</h${level}>`);continue; }
      if(line.startsWith('- ')) { flushParagraph();flushQuote();list.push(line.slice(2));continue; }
      if(line.startsWith('> ')) {flushParagraph();flushList();quote.push(line.slice(2));continue;}
      if(!line.trim()) {flush();continue;}
      flushList();flushQuote();paragraphs.push(line);
    }
    flush();if(inCode) output.push('<pre><code>'+escape(code.join('\n'))+'</code></pre>');
    return {html:output.join(''),headings};
  }

  function article(id) {
    const post = posts.find(p=>p.id===id);
    if(!post) return heading('NOT FOUND','这篇文字还没有到来。','链接可能已更改。')+'<div class="about-copy"><a class="primary-link" href="#/articles">回到文章列表 ↗</a></div>';
    const rendered=renderMarkdown(post.content);
    if(post.blocks&&richUI){const rich=richUI.render(post);rendered.html+=rich.html;rendered.headings.push(...rich.headings);}
    const readingList=post.collection==='learning'?learning:posts.filter(p=>p.collection!=='learning');
    const index=readingList.indexOf(post),next=readingList[index+1];
    document.title=post.title+' · '+blog.title;
    return `<div class="reading-layout"><article><a href="#/articles" class="back-link">← 回到文章列表</a><header class="article-header">${meta(post)}<h1>${escape(post.title)}</h1><p class="quiet-label">约 ${minutes(post)} 分钟阅读 · ${escape(blog.owner)}</p>${post.sample?'<p class="article-note">建站示例 · 本文用于展示排版，不代表真实个人经历或研究成果。</p>':''}</header><div class="article-body">${rendered.html}</div><div class="article-end"><a href="#/articles">← 全部文章</a>${next?`<a href="${postHref(next)}">下一篇：${escape(next.title)} →</a>`:'<a href="#/archive">查看时间归档 →</a>'}</div></article><aside class="reading-aside"><div class="toc"><p class="aside-title">这一页的目录</p>${rendered.headings.map(h=>`<a href="#/post/${encodeURIComponent(id)}" data-section="${h.id}">${escape(h.text)}</a>`).join('')}</div></aside></div>`;
  }

  function archive() {
    const years=[...new Set(posts.map(p=>p.date.slice(0,4)))];
    return heading('ALONG THE WAY','沿着时间，慢慢积累。','每一篇文字，都在这里留下一个小小的坐标。')+`<div class="journal-layout"><section>${years.map(year=>`<h2 class="archive-year">${escape(year)} <span class="quiet-label">/ ${posts.filter(p=>p.date.startsWith(year)).length} 篇</span></h2>${posts.filter(p=>p.date.startsWith(year)).map(p=>`<div class="archive-row"><time datetime="${escape(p.date)}">${escape(p.date.slice(5).replace('-','.'))}</time><div><a href="${postHref(p)}">${escape(p.title)}</a>${meta(p)}</div></div>`).join('')}`).join('') || '<p class="empty-state">还没有文章。</p>'}</section>${sidebar()}</div>`;
  }

  function about() {
    return heading('A QUIET CORNER','一个安放文字的小地方。','文章、笔记，以及值得留下的生活片刻。')+`<section class="about-copy"><div class="article-body">${renderMarkdown(blog.about).html}</div><h2>在这里，记录些什么</h2><p>把想法写成随笔，把理解整理成笔记，也为日常留一些空白。</p><div class="about-categories">${Object.entries(categories).map(([key,label])=>`<a href="#/category/${key}">${label} ↗</a>`).join('')}</div><h2>关于隐私</h2><p>当前为 GitHub Pages 公开静态网站，任何人均可阅读。未设置评论、访问统计或外部字体。个人简介和已发表论文见相应栏目，未发表成果不在本站展示。</p></section>`;
  }

  function route() {
    let parts;
    try { parts=decodeURIComponent(location.hash.slice(1)).split('/').filter(Boolean); } catch {parts=[];}
    const [page,id] = parts;
    document.title=blog.title;
    const isLearning=(page==='post'&&learning.some(p=>p.id===id))||(page==='category'&&['knowledge','experience'].includes(id));
    document.querySelectorAll('[data-nav]').forEach(el=>{const current=(!page && el.dataset.nav==='home')||(el.dataset.nav===page)||(['post','category'].includes(page)&&el.dataset.nav===(isLearning?'knowledge':'articles'));if(current)el.setAttribute('aria-current','page');else el.removeAttribute('aria-current');});
    main.classList.toggle('is-home', !page);
    if(!page) main.innerHTML=academic.home();
    else if(page==='articles') main.innerHTML=heading('ALL THE WORDS','写下来的，都在这里。','随笔、笔记与生活记录。按分类，找一篇想读的文字。')+journal();
    else if(page==='category') main.innerHTML=heading('A DRAWER OF WORDS',categories[id]||'这个分类还空着。','把相关的片段放在一起，慢慢读。')+journal(id);
    else if(page==='knowledge') main.innerHTML=knowledge();
    else if(page==='archive') main.innerHTML=archive();
    else if(page==='about') main.innerHTML=academic.about();
    else if(page==='research') main.innerHTML=academic.research(id);
    else if(page==='publications') main.innerHTML=academic.publications(id);
    else if(page==='news') main.innerHTML=academic.news();
    else if(page==='contact') main.innerHTML=academic.contact();
    else if(page==='post') main.innerHTML=article(id);
    else main.innerHTML=heading('NOT FOUND','这一页暂时空着。','从首页重新开始吧。')+'<div class="about-copy"><a class="primary-link" href="#/">回到首页 ↗</a></div>';
    main.querySelectorAll('[data-section]').forEach(link=>link.addEventListener('click',event=>{event.preventDefault();const target=document.getElementById(link.dataset.section);if(target){target.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}}));
    const privacy=main.querySelector('.privacy-note');
    if(privacy)privacy.lastChild.textContent='公开阅读 · 初始文章均为示例。';
    if(page==='post'&&isLearning){
      const current=learning.find(p=>p.id===id);
      const back=main.querySelector('.back-link');
      back.href='#/knowledge';back.textContent='← 回到知识库';
      const header=main.querySelector('.article-header');
      const evidence=document.createElement('p');evidence.className='knowledge-evidence';evidence.textContent=current.evidence;header.append(evidence);
      const tags=document.createElement('p');tags.className='knowledge-tags';
      (current.tags||[]).forEach(tag=>{const span=document.createElement('span');span.textContent=tag;tags.append(span);});header.append(tags);
      const end=main.querySelector('.article-end a');end.href='#/knowledge';end.textContent='← 知识库目录';
    }
    if(richUI)richUI.mount(main);
    window.scrollTo(0,0);
  }

  const dialog=document.getElementById('search-dialog'), input=document.getElementById('search-input'), results=document.getElementById('search-results');
  function search() {
    const query=input.value.trim().toLocaleLowerCase();
    const found=posts.filter(p=>(p.title+' '+p.excerpt+' '+plainText(p)+' '+(categories[p.category]||'')).toLocaleLowerCase().includes(query));
    const pageMatches=academic.pages.filter(p=>(p.title+' '+p.text).toLocaleLowerCase().includes(query));
    const count=found.length+pageMatches.length;
    results.innerHTML='<p class="search-status">'+(query?'找到 '+count+' 个结果':'从这里开始探索')+'</p>'+pageMatches.map(p=>'<a class="search-result" href="'+p.href+'"><h3>'+escape(p.title)+'</h3><p>页面入口</p></a>').join('')+found.map(p=>'<a class="search-result" href="'+postHref(p)+'"><h3>'+escape(p.title)+(p.sample?' · 示例':'')+'</h3><p>'+escape(categories[p.category]||p.category)+' · '+escape(dateText(p.date))+'</p></a>').join('')+(!count?'<p class="search-status">暂时没有匹配的内容，试试别的词。</p>':'');
  }
  document.getElementById('search-open').addEventListener('click',()=>{search();dialog.showModal();input.focus();});
  document.getElementById('search-close').addEventListener('click',()=>dialog.close());
  input.addEventListener('input',search);
  results.addEventListener('click',event=>{if(event.target.closest('a'))dialog.close();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
  const themeButton=document.getElementById('theme-toggle');
  function setTheme(theme) {document.documentElement.dataset.theme=theme;themeButton.setAttribute('aria-pressed',String(theme==='dark'));themeButton.setAttribute('aria-label',theme==='dark'?'切换浅色模式':'切换深色模式');document.querySelector('meta[name="theme-color"]').content=theme==='dark'?'#111b29':'#ffffff';}
  try{setTheme(localStorage.getItem('journal-theme')||'light');}catch{setTheme('light');}
  themeButton.addEventListener('click',()=>{const theme=document.documentElement.dataset.theme==='dark'?'light':'dark';setTheme(theme);try{localStorage.setItem('journal-theme',theme);}catch{}});
  window.addEventListener('hashchange',()=>{route();main.focus({preventScroll:true});});
  academic.mount();
  route();
})();
