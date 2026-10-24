/* 学术主页展示层。未填写个人信息；研究方向、成果与联系方式为空。 */
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
  const areas = [
    {id:'questions',icon:'network',title:'研究主题',text:'从一个值得追问的问题出发。'},
    {id:'methods',icon:'chip',title:'方法与工具',text:'让思考与实践，彼此连接。'},
    {id:'connections',icon:'leaf',title:'跨领域探索',text:'在不同视角之间，寻找启发。'}
  ];
  const publicationTypes = [{id:'journal',name:'期刊论文',en:'JOURNAL ARTICLES',tone:'blue'},{id:'conference',name:'会议论文',en:'CONFERENCE PAPERS',tone:'amber'},{id:'preprint',name:'预印本',en:'PREPRINTS',tone:'sage'}];
  const updates = [
    {id:'new-home',date:'2026-10-24',title:'新的主页，从这里开始',text:'雪山、书页与留白，为阅读和思考准备一个清晰的空间。学术信息待后续补充。',href:'#/about',tag:'网站更新'},
    {id:'reading-space',date:'2026-10-20',title:'为文字，留一个安静的角落',text:'随笔、笔记与生活记录的三篇建站示例，可以在「随笔与笔记」中阅读。',href:'#/articles',tag:'阅读空间'},
    {id:'empty-library',date:'2026-10-20',title:'知识库，留待下一次积累',text:'之前整理的知识点和研究经验已全部清空，目前没有收录条目。',href:'#/knowledge',tag:'内容整理'}
  ];
  const directionCards = () => areas.map(area=>'<a class="direction-card" href="#/research/'+area.id+'"><span class="icon-disc">'+icon(area.icon)+'</span><span><strong>'+area.title+'</strong><small>'+area.text+'</small></span>'+icon('chevron','direction-chevron')+'</a>').join('');
  const publicationCards = (filter='all') => publicationTypes.filter(type=>filter==='all'||type.id===filter).map(type=>'<a class="publication-card" href="#/publications/'+type.id+'" aria-label="查看'+type.name+'"><span class="document-icon">'+icon('file')+'</span><div><span class="publication-badge '+type.tone+'">'+type.name+'</span><h3>期待下一次分享</h3><p>暂无公开条目</p><span class="publication-en">'+type.en+'</span></div>'+icon('arrow','publication-arrow')+'</a>').join('');
  const timeline = () => updates.map(item=>'<a class="news-row" href="'+item.href+'"><time datetime="'+item.date+'">'+item.date.replaceAll('-','.')+'</time><span class="news-dot" aria-hidden="true"></span><span>'+item.title+'</span>'+icon('chevron')+'</a>').join('');
  function home() {
    return '<div class="academic-home">'+
      '<section class="academic-hero" aria-labelledby="hero-title"><img class="hero-landscape" src="./media/academic-hero.png" alt="" fetchpriority="high"><div class="hero-wash"></div><div class="hero-content page-width"><p class="hero-welcome">欢迎来到我的学术主页</p><h1 id="hero-title">探索未知<span class="hero-separator"> · </span><br class="mobile-break">分享知识<span class="hero-separator"> · </span><br class="mobile-break">促进交流</h1><p class="hero-description">为知识留下脉络，为思考留出空间。<br>保持好奇，在探索中慢慢积累。</p><div class="hero-buttons">'+button('浏览研究成果','#/publications')+button('交流互动','#/contact',true)+'</div></div><div class="hero-caption"><span class="caption-line"></span>STAY CURIOUS. KEEP EXPLORING.</div></section>'+
      '<div class="home-content page-width"><section class="home-introduction" aria-labelledby="about-heading"><div class="about-photo-wrap"><img class="about-photo" src="./media/academic-desk.png" alt="窗边书桌上的书籍、笔记本和绿植" width="720" height="560"><span class="photo-caption">A SPACE FOR THOUGHT</span></div><div class="home-about"><p class="section-kicker">ABOUT THIS SPACE</p><h2 id="about-heading">关于我</h2><span class="short-rule"></span><p>在这里，留下阅读的线索、思考的片段，<br class="desktop-break">也为未来的交流留一扇窗。</p><p class="muted-copy">个人介绍尚未填写。<br>先让这个空间，慢慢长成自己的样子。</p>'+button('了解更多','#/about',true)+'</div><div class="research-panel"><div class="panel-heading"><h2>研究方向</h2><a class="text-link" href="#/research">查看全部'+arrow()+'</a></div>'+directionCards()+'<p class="panel-footnote">栏目预留 · 具体方向待补充</p></div></section>'+
      '<section class="home-publications" aria-label="研究成果">'+sectionHeading('PUBLICATIONS','研究成果','#/publications','查看全部成果')+'<div class="publication-grid">'+publicationCards()+'</div></section>'+
      '<div class="home-bottom-grid"><section class="home-news">'+sectionHeading('NEWS & UPDATES','最新动态','#/news','查看全部动态')+'<div class="home-timeline">'+timeline()+'</div><p class="panel-footnote">此处记录网站更新。</p></section><section class="home-contact"><img src="./media/academic-desk.png" alt="" loading="lazy"><div class="contact-wash"></div><div class="contact-card-content"><p class="section-kicker">GET IN TOUCH</p><h2>交流互动<span class="heading-rule" aria-hidden="true"></span></h2><p>好的想法，常常始于一次交流。<br>期待围绕共同的问题，分享思考与启发。</p>'+button('查看交流方式','#/contact')+'</div></section></div>'+
      '<div class="reading-strip"><span>'+icon('book')+'文字与思考，也值得被好好收藏。</span><div><a class="text-link" href="#/articles">阅读随笔与笔记'+arrow()+'</a><a class="text-link" href="#/knowledge">前往知识库'+arrow()+'</a></div></div></div></div>';
  }
  function about() {
    return pageHeading('ABOUT THIS SPACE','关于我，也关于这个空间。','把好奇心留下，把思考慢慢展开。')+
      '<section class="about-page-grid"><img src="./media/academic-desk.png" alt="阳光下的书桌与书籍" width="720" height="560"><div class="about-page-copy"><p class="section-kicker">A NOTE TO THE READER</p><h2>一页留白，无限可能。</h2><p>这里计划收纳阅读与学习中的理解、可分享的研究方向，以及经过整理的文字。内容会随着积累慢慢丰富。</p><p>个人简介、所属单位与联系方式尚未填写；研究成果栏目也暂时为空。</p><p>当前可以阅读三篇标有「示例」的博客文章，或到知识库查看后续内容入口。</p><div class="hero-buttons">'+button('阅读文字','#/articles')+button('前往知识库','#/knowledge',true)+'</div></div></section>'+
      '<div class="editorial-note">'+icon('leaf')+'<p>保持好奇，也保持耐心。<span>让每一篇文字，都来自一次认真的理解。</span></p></div>';
  }
  function research(id) {
    const area=areas.find(item=>item.id===id);
    return pageHeading('RESEARCH INTERESTS',area?area.title:'从问题出发，向未知探索。',area?area.text:'为研究主题、方法工具与跨领域的思考，保留清晰的入口。')+
      '<div class="research-page-grid">'+areas.map(item=>'<a class="research-overview-card'+(item.id===id?' selected':'')+'" href="#/research/'+item.id+'"><span class="icon-disc">'+icon(item.icon)+'</span><p class="section-kicker">RESEARCH / 0'+(areas.indexOf(item)+1)+'</p><h2>'+item.title+'</h2><p>'+item.text+'</p><span class="card-status">具体内容待补充</span></a>').join('')+'</div>'+
      '<section class="academic-empty"><span class="empty-icon">'+icon(area?area.icon:'network')+'</span><h2>'+(area?area.title+'尚未填写':'研究方向尚未填写')+'</h2><p>这里暂时保留栏目结构，等待你决定要分享的内容。</p><a class="text-link" href="#/articles">先读一些文字'+arrow()+'</a></section>';
  }
  function publications(filter) {
    const active=publicationTypes.some(type=>type.id===filter)?filter:'all';
    return pageHeading('SELECTED PUBLICATIONS','研究成果','为经过整理、可以分享的成果，留一处清晰的记录。')+
      '<nav class="publication-tabs" aria-label="成果类型"><a href="#/publications"'+(active==='all'?' aria-current="page"':'')+'>全部 <span>0</span></a>'+publicationTypes.map(type=>'<a href="#/publications/'+type.id+'"'+(active===type.id?' aria-current="page"':'')+'>'+type.name+' <span>0</span></a>').join('')+'</nav>'+
      '<section class="academic-empty publications-empty"><span class="empty-icon">'+icon('file')+'</span><p class="section-kicker">A PLACE FOR FUTURE WORK</p><h2>下一份分享，值得期待。</h2><p>目前没有收录'+(active==='all'?'研究成果':publicationTypes.find(type=>type.id===active).name)+'。<br>有可分享的内容后，再慢慢添上。</p><a class="text-link" href="#/research">浏览研究方向'+arrow()+'</a></section>';
  }
  function news() {
    return pageHeading('NEWS & UPDATES','记录，正在发生的变化。','这里先记录网站的更新，未来再加入可以分享的动态。')+
      '<section class="news-page-list">'+updates.map(item=>'<article class="news-detail"><time datetime="'+item.date+'">'+item.date.replaceAll('-','.')+'</time><div><span class="card-status">'+item.tag+'</span><h2>'+item.title+'</h2><p>'+item.text+'</p><a class="text-link" href="'+item.href+'">前往查看'+arrow()+'</a></div></article>').join('')+'</section>';
  }
  function contact() {
    return pageHeading('GET IN TOUCH','从一个好问题，开始交流。','分享理解，也倾听不同的视角。')+
      '<section class="contact-page"><div class="contact-page-photo"><img src="./media/academic-desk.png" alt="窗边的笔记本与书籍"><span>GOOD IDEAS BEGIN WITH A CONVERSATION.</span></div><div class="contact-page-copy"><span class="empty-icon">'+icon('mail')+'</span><h2>交流方式，稍后再见。</h2><p>目前尚未设置邮箱、社交账号或留言功能。</p><p>等准备好接收交流时，这里会展示你选择的联系方式。</p>'+button('先读一些文字','#/articles')+'</div></section>';
  }
  const pages=[{title:'首页',href:'#/',text:'学术主页 探索未知 分享知识'},{title:'关于我',href:'#/about',text:'个人介绍 关于本站'},{title:'研究方向',href:'#/research',text:'研究主题 方法与工具 跨领域探索'},{title:'研究成果',href:'#/publications',text:'期刊论文 会议论文 预印本'},{title:'最新动态',href:'#/news',text:'网站更新'},{title:'交流互动',href:'#/contact',text:'联系方式 联系我'},{title:'知识库',href:'#/knowledge',text:'知识点 研究经验'},{title:'文章归档',href:'#/archive',text:'时间归档 历史文章'}];
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
