/* 学术主页：个人信息由本人提供，仅展示明确授权公开的论文。 */
(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const glyphs = {
    arrow:'<path d="M4 12h15m-6-6 6 6-6 6"/>',
    chevron:'<path d="m9 5 7 7-7 7"/>',
    network:'<circle cx="12" cy="5" r="3"/><circle cx="5" cy="18" r="3"/><circle cx="19" cy="18" r="3"/><path d="m10.5 7.5-4 8m7-8 4 8M8 18h8"/>',
    chip:'<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3"/>',
    leaf:'<path d="M20 3C7 2 2 8 4 15s16 6 16-12Z"/><path d="M3 21 15 9"/>',
    file:'<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8m-8 4h6"/>',
    book:'<path d="M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Zm0 0v15"/>',
    mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
    chat:'<path d="M21 11a9 9 0 0 1-9 9c-1.5 0-3-.4-4.3-1L3 21l1.5-5A9 9 0 1 1 21 11Z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
    mountain:'<path d="m2 20 7-12 4 6 3-9 6 15H2ZM7 12l2 2 2-2m3-1 2 2 2-2"/>'
  };
  const icon = (name, cls='') => '<svg class="line-icon '+cls+'" viewBox="0 0 24 24" aria-hidden="true">'+(glyphs[name] || glyphs.file)+'</svg>';
  const arrow = () => icon('arrow');
  const sectionHeading = (en, title, link, label) => '<div class="academic-section-heading"><div><p class="section-kicker">'+en+'</p><h2>'+title+'<span class="heading-rule" aria-hidden="true"></span></h2></div>'+(link?'<a class="text-link" href="'+link+'">'+label+arrow()+'</a>':'')+'</div>';
  const button = (label,href,secondary=false) => '<a class="button '+(secondary?'button-outline':'button-primary')+'" href="'+href+'">'+label+arrow()+'</a>';
  const pageHeading = (en,title,description) => '<header class="academic-page-heading"><p class="section-kicker">'+en+'</p><h1>'+title+'</h1><p>'+description+'</p></header>';
  const profile = window.ACADEMIC_PROFILE;
  const papers = window.PUBLICATIONS;
  const external = (label, url, cls='text-link') => '<a class="'+cls+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+label+arrow()+'</a>';
  const authorLine = paper => paper.authors.map(name=>name===profile.englishName?'<strong>'+esc(name)+'</strong>':esc(name)).join(', ');
  const areas = [
    {id:'questions',icon:'network',title:'量子隐私比较',text:'在保护私密输入的前提下，获得约定的比较结果。',detail:'关注比较任务的输出权限、参与方角色与隐私要求。已发表工作研究仅由一方获得结果、无需第三方参与的比较场景。'},
    {id:'methods',icon:'chip',title:'量子隐私查询',text:'以查询协议为基础，构造隐私保护任务。',detail:'关注查询者与数据库持有者之间的信息边界，以及查询协议如何用于其他密码任务。已发表论文讨论了从量子隐私查询到单向隐私比较的构造。'},
    {id:'connections',icon:'leaf',title:'量子协议与安全分析',text:'把功能、认证与安全条件放在同一框架中理解。',detail:'关注协议设计中的身份认证、参与方可获得的信息与安全假设。具体安全结论需要结合论文中的模型、参数和适用条件阅读。'}
  ];
  const publicationTypes = [{id:'journal',name:'期刊论文',en:'JOURNAL ARTICLES',tone:'blue'},{id:'conference',name:'会议论文',en:'CONFERENCE PAPERS',tone:'amber'},{id:'preprint',name:'预印本',en:'PREPRINTS',tone:'sage'}];
  const updates = [
    {id:'profile-update',date:'2026-10-24',title:'更新个人介绍与第一篇 SCI 论文',text:'主页补充个人简介、学术邮箱与已发表论文信息，并加入中文导读和引用入口。',href:'#/publications',tag:'主页更新'},
    {id:'first-paper',date:'2025-05',title:'第一篇 SCI 论文发表于 Chinese Physics B',text:'Unidirectional quantum private comparison based on quantum private query，34(5)，050308。孙鹤翔为第一作者。',href:'#/publications',tag:'论文发表'}
  ];
  const directionCards = () => areas.map(area=>'<a class="direction-card" href="#/research/'+area.id+'"><span class="icon-disc">'+icon(area.icon)+'</span><span><strong>'+area.title+'</strong><small>'+area.text+'</small></span>'+icon('chevron','direction-chevron')+'</a>').join('');
  const publicationCards = () => papers.map(p=>'<a class="publication-card publication-featured" href="#/publications"><span class="document-icon">'+icon('file')+'</span><div><span class="publication-badge blue">期刊论文 · 第一作者</span><h3>'+esc(p.title)+'</h3><p>'+esc(p.chineseTitle)+'</p><p class="paper-authors">'+authorLine(p)+'</p><span class="publication-en">'+esc(p.journal)+' · '+p.volume+'('+p.issue+'), '+p.articleNumber+' · '+p.year+'</span></div>'+icon('arrow','publication-arrow')+'</a>').join('');
  const timeline = () => updates.map(item=>'<a class="news-row" href="'+item.href+'"><time datetime="'+item.date+'">'+item.date.replaceAll('-','.')+'</time><span class="news-dot" aria-hidden="true"></span><span>'+item.title+'</span>'+icon('chevron')+'</a>').join('');
  function home() {
    return '<div class="academic-home">'+
      '<section class="academic-hero" aria-labelledby="hero-title"><img class="hero-landscape" src="./media/academic-hero.png" alt="" fetchpriority="high"><div class="hero-wash"></div><div class="hero-content page-width"><p class="hero-welcome">孙鹤翔 · Hexiang Sun</p><h1 id="hero-title">探索未知<span class="hero-separator"> · </span><br class="mobile-break">分享知识<span class="hero-separator"> · </span><br class="mobile-break">促进交流</h1><p class="hero-description">从量子信息出发，理解隐私与安全。<br>记录已发表工作，也分享学习中的思考。</p><div class="hero-buttons">'+button('阅读我的论文','#/publications')+button('联系我','#/contact',true)+'</div></div><div class="hero-caption"><span class="caption-line"></span>QUANTUM INFORMATION & PRIVACY</div></section>'+
      '<div class="home-content page-width"><section class="home-introduction" aria-labelledby="about-heading"><div class="about-photo-wrap"><img class="about-photo" src="./media/academic-desk.png" alt="窗边书桌上的书籍、笔记本和绿植" width="720" height="560"><span class="photo-caption">A SPACE FOR THOUGHT</span></div><div class="home-about"><p class="section-kicker">ABOUT ME</p><h2 id="about-heading">'+esc(profile.name)+'</h2><span class="short-rule"></span><p>'+esc(profile.education)+'<br>'+esc(profile.position)+'</p><p class="muted-copy">'+esc(profile.introduction)+'</p>'+button('了解更多','#/about',true)+'</div><div class="research-panel"><div class="panel-heading"><h2>研究方向</h2><a class="text-link" href="#/research">查看全部'+arrow()+'</a></div>'+directionCards()+'<p class="panel-footnote">从已发表工作出发，持续学习与探索。</p></div></section>'+
      '<section class="home-publications" aria-label="研究成果">'+sectionHeading('PUBLICATIONS','研究成果','#/publications','论文详情与引用')+'<div class="publication-grid">'+publicationCards()+'</div></section>'+
      '<div class="home-bottom-grid"><section class="home-news">'+sectionHeading('NEWS & UPDATES','最新动态','#/news','查看全部动态')+'<div class="home-timeline">'+timeline()+'</div></section><section class="home-contact"><img src="./media/academic-desk.png" alt="" loading="lazy"><div class="contact-wash"></div><div class="contact-card-content"><p class="section-kicker">GET IN TOUCH</p><h2>交流互动<span class="heading-rule"></span></h2><p>欢迎围绕量子信息、隐私保护协议<br>以及学习与研究方法交流。</p>'+button('联系我','#/contact')+'</div></section></div>'+
      '<div class="reading-strip"><span>'+icon('book')+'文字与思考，也值得被好好收藏。</span><div><a class="text-link" href="#/articles">随笔与笔记'+arrow()+'</a><a class="text-link" href="#/knowledge">知识库'+arrow()+'</a></div></div></div></div>';
  }
  function about() {
    return pageHeading('ABOUT ME','孙鹤翔 · Hexiang Sun','在清晰的问题中，寻找值得继续探索的方向。')+
      '<section class="about-page-grid"><img src="./media/academic-desk.png" alt="阳光下的书桌与书籍" width="720" height="560"><div class="about-page-copy"><p class="section-kicker">QUANTUM INFORMATION & PRIVACY</p><h2>从量子信息出发。</h2><dl class="profile-facts"><div><dt>学业</dt><dd>'+esc(profile.education)+'</dd></div><div><dt>现职</dt><dd>'+esc(profile.position)+'</dd></div><div><dt>邮箱</dt><dd><a href="mailto:'+esc(profile.email)+'">'+esc(profile.email)+'</a></dd></div></dl><p>'+esc(profile.introduction)+'</p><p>我的第一篇 SCI 论文发表于 Chinese Physics B（2025），围绕基于量子隐私查询的单向量子隐私比较展开，我是论文第一作者。</p><div class="hero-buttons">'+button('阅读论文','#/publications')+button('联系我','#/contact',true)+'</div></div></section>'+
      '<div class="editorial-note">'+icon('book')+'<p>让阅读与研究留下清晰的脉络。<span>这里展示已发表论文，并为知识图解、学习笔记和生活记录留出空间。</span></p></div>';
  }
  function research(id) {
    const area=areas.find(item=>item.id===id);
    return pageHeading('RESEARCH INTERESTS',area?area.title:'量子信息中的隐私与安全',area?area.text:'从信息任务出发，关注协议功能、隐私边界与安全条件。')+
      '<div class="research-page-grid">'+areas.map(item=>'<a class="research-overview-card'+(item.id===id?' selected':'')+'" href="#/research/'+item.id+'"><span class="icon-disc">'+icon(item.icon)+'</span><p class="section-kicker">RESEARCH / 0'+(areas.indexOf(item)+1)+'</p><h2>'+item.title+'</h2><p>'+item.detail+'</p><span class="card-status">'+(item.id==='connections'?'方法视角':'已发表论文相关主题')+'</span></a>').join('')+'</div>'+
      '<section class="research-reading"><p class="section-kicker">RELATED PUBLICATION</p><h2>从一篇已发表论文开始阅读</h2><p>'+esc(papers[0].summary)+'</p>'+button('查看论文、导读与引用','#/publications',true)+'</section>';
  }
  function paperDetail(p) {
    return '<article class="publication-detail" id="'+p.id+'"><header><div class="paper-badges"><span class="publication-badge blue">已发表 · 期刊论文</span><span class="publication-badge sage">我的第一篇 SCI 论文</span></div><h2>'+esc(p.title)+'</h2><p class="paper-chinese-title">'+esc(p.chineseTitle)+'<small>（中文译题）</small></p><p class="paper-authors">'+authorLine(p)+'</p><p class="paper-journal"><em>'+esc(p.journal)+'</em> <strong>'+p.volume+'</strong>('+p.issue+'), '+p.articleNumber+' ('+p.year+')</p><p class="paper-doi">DOI: '+external(esc(p.doi),p.doiUrl)+'</p><div class="paper-links">'+external('期刊官网',p.journalUrl,'button button-primary')+external('IOP 页面',p.publisherUrl,'button button-outline')+external('期刊 PDF',p.pdfUrl,'button button-outline')+'<a class="button button-outline" download href="'+p.bibtex+'">下载 BibTeX ↓</a></div></header>'+
      '<section class="paper-explainer"><p class="section-kicker">A READING GUIDE</p><h3>这篇论文研究什么？</h3><p>'+esc(p.summary)+'</p><div class="concept-flow" aria-label="任务概念图：双方各自持有私密输入，通过单向隐私比较，仅由一方获得比较结果。此图不是协议步骤。"><div><span>01 / 输入</span><strong>双方持有私密数据</strong><p>明确各方输入及隐私要求</p></div><span class="flow-arrow" aria-hidden="true">→</span><div><span>02 / 任务</span><strong>单向隐私比较</strong><p>以量子隐私查询为基础</p></div><span class="flow-arrow" aria-hidden="true">→</span><div><span>03 / 输出</span><strong>仅一方获得比较结果</strong><p>不借助第三方参与比较</p></div></div><p class="paper-scope">以上为基于已发表摘要的中文导读与任务示意，不是完整协议流程。安全结论、IDS-ZF 性质及适用条件请以论文原文中的模型和分析为准。</p><div class="paper-keywords">'+p.keywords.map(k=>'<span>'+esc(k)+'</span>').join('')+'</div></section>'+
      '<section class="paper-citation"><h3>引用这篇论文</h3><p>'+esc(p.citation)+'</p><a class="text-link" download href="'+p.bibtex+'">下载 BibTeX 引用文件 ↓</a></section>'+
      '<details class="paper-affiliations"><summary>论文作者与发表时的署名单位</summary><p>作者顺序：孙鹤翔、邢丁、窦钊、李剑、陈秀波、李丽香。孙鹤翔为第一作者，窦钊为通讯作者。</p><p>孙鹤翔、邢丁、窦钊、陈秀波、李丽香：Information Security Center, State Key Laboratory of Networking and Switching Technology, Beijing University of Posts and Telecommunications, Beijing 100876, China.</p><p>李剑：Information Security Center, School of Cyberspace Security, Beijing University of Posts and Telecommunications, Beijing 100876, China.</p><p>以上为该论文的署名信息，不代表各作者当前任职单位。</p></details></article>';
  }
  function publications(filter) {
    const active=publicationTypes.some(type=>type.id===filter)?filter:'all';
    const visible=papers.filter(p=>active==='all'||p.type===active);
    return pageHeading('SELECTED PUBLICATIONS','研究成果','已发表论文、阅读导引与引用信息。')+
      '<nav class="publication-tabs" aria-label="成果类型"><a href="#/publications"'+(active==='all'?' aria-current="page"':'')+'>全部 <span>'+papers.length+'</span></a>'+publicationTypes.map(type=>'<a href="#/publications/'+type.id+'"'+(active===type.id?' aria-current="page"':'')+'>'+type.name+' <span>'+papers.filter(p=>p.type===type.id).length+'</span></a>').join('')+'</nav>'+
      (visible.length?visible.map(paperDetail).join(''):'<section class="academic-empty"><span class="empty-icon">'+icon('file')+'</span><h2>此分类暂无公开条目</h2><a class="text-link" href="#/publications">查看已发表论文'+arrow()+'</a></section>');
  }
  function news() {
    return pageHeading('NEWS & UPDATES','记录，正在发生的变化。','已发表论文与主页更新。')+'<section class="news-page-list">'+updates.map(item=>'<article class="news-detail"><time datetime="'+item.date+'">'+item.date.replaceAll('-','.')+'</time><div><span class="card-status">'+item.tag+'</span><h2>'+item.title+'</h2><p>'+item.text+'</p><a class="text-link" href="'+item.href+'">前往查看'+arrow()+'</a></div></article>').join('')+'</section>';
  }
  function contact() {
    return pageHeading('GET IN TOUCH','从一个好问题，开始交流。','欢迎就论文、量子信息与学习研究方法来信。')+'<section class="contact-page"><div class="contact-page-photo"><img src="./media/academic-desk.png" alt="窗边的笔记本与书籍"><span>GOOD IDEAS BEGIN WITH A CONVERSATION.</span></div><div class="contact-page-copy"><span class="empty-icon">'+icon('mail')+'</span><h2>'+esc(profile.name)+' · '+esc(profile.englishName)+'</h2><p>'+esc(profile.education)+'<br>'+esc(profile.position)+'</p><p class="contact-email"><a href="mailto:'+esc(profile.email)+'">'+esc(profile.email)+'</a></p><div class="hero-buttons"><a class="button button-primary" href="mailto:'+esc(profile.email)+'">发送邮件'+arrow()+'</a>'+external('GitHub',profile.github,'button button-outline')+'</div><p class="contact-hint">“发送邮件”会打开你的邮件应用，你可以编辑内容后自行发送。</p></div></section>';
  }
  const pages=[{title:'首页',href:'#/',text:'孙鹤翔 Hexiang Sun 学术主页 量子信息'},{title:'关于我',href:'#/about',text:'孙鹤翔 中国科学技术大学 物理学直博生（在读） 合肥国家实验室 助理研究员'},{title:'研究方向',href:'#/research',text:'量子隐私比较 量子隐私查询 量子密码学 协议安全'},{title:'研究成果',href:'#/publications',text:papers.map(p=>p.title+' '+p.chineseTitle+' '+p.journal+' '+p.doi).join(' ')},{title:'最新动态',href:'#/news',text:'第一篇 SCI 论文 2025 主页更新'},{title:'联系我',href:'#/contact',text:profile.email+' 邮箱 学术交流'},{title:'知识库',href:'#/knowledge',text:'知识点 研究经验'},{title:'文章归档',href:'#/archive',text:'时间归档 历史文章'}];

  function mount() {
    const menu=document.getElementById('menu-toggle'),nav=document.getElementById('primary-nav');
    const closeMenu=()=>{nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','打开导航菜单');};
    menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';nav.classList.toggle('is-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'关闭导航菜单':'打开导航菜单');});
    nav.addEventListener('click',event=>{if(event.target.closest('a'))closeMenu();});
    window.addEventListener('hashchange',closeMenu);
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
    document.addEventListener('click',event=>{if(!event.target.closest('.academic-header'))closeMenu();});
  }
  window.AcademicUI={home,about,research,publications,news,contact,pages,mount};
})();
