(function(){
  document.documentElement.lang='ar'; document.documentElement.dir='rtl';
  var $=function(s,r){return (r||document).querySelector(s)};
  var $$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
  var esc=function(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})};
  var ico=function(n,c){return '<svg class="ic '+(c||'')+'" aria-hidden="true"><use href="#i-'+n+'"/></svg>'};
  var norm=function(s){return String(s||'').toLowerCase().replace(/[ً-ٰٟـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه')};
  var fmt=function(n){return n>=1000?(n/1000).toFixed(n>=10000?0:1).replace('.0','')+'K':String(n)};
  var hash=function(s){var h=0;for(var i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))>>>0}return h};

  /* ---------- البيانات التجريبية ---------- */
  var TYPES=[
    {k:'rap',l:'رابر',h:345},{k:'prod',l:'بروديوسر',h:165},{k:'sing',l:'مغنٍّ',h:42},
    {k:'dj',l:'دي جي',h:220},{k:'vid',l:'مصوّر فيديو',h:275},{k:'art',l:'مصمم',h:22}
  ];
  var T={}; TYPES.forEach(function(t){T[t.k]=t});

  var creators=[
    {id:'me',name:'اسمك هنا',handle:'yourname',roles:['prod'],city:'',bio:'',followers:0},
    {id:'zil',name:'ظلّ',handle:'zill',roles:['rap'],city:'تونس',bio:'رابر من أحياء الميناء. أكتب عن الليل والبحر والطريق إلى البيت.',followers:18400},
    {id:'nabd',name:'نبض',handle:'nabd.beats',roles:['prod'],city:'القاهرة',bio:'بروديوسر. إيقاعات تراب وبوم باب بعينات من الأرشيف العربي.',followers:12900},
    {id:'harf',name:'حرف',handle:'harf.studio',roles:['art'],city:'بيروت',bio:'مصمم أغلفة وملصقات للموسيقيين المستقلين. خط عربي وحبر وطباعة.',followers:7600},
    {id:'sarab',name:'DJ سراب',handle:'djsarab',roles:['dj'],city:'الدار البيضاء',bio:'أمزج بين الفولك المغربي والإلكترونيك على أسطح العمارات.',followers:9800},
    {id:'layali',name:'ليالي',handle:'layali.sings',roles:['sing'],city:'عمّان',bio:'مغنية وكاتبة. أغنيات قصيرة بالغيتار والصوت فقط.',followers:15200},
    {id:'jabal',name:'الجبل',handle:'aljabal',roles:['rap'],city:'الرياض',bio:'فريستايل يومي. أبحث عن بروديوسرز لمشروع ألبوم أول.',followers:6100},
    {id:'adasa',name:'عدسة',handle:'adasa.film',roles:['vid'],city:'تونس',bio:'مصوّر فيديو كليبات ووثائقيات قصيرة عن المشهد الموسيقي.',followers:11300},
    {id:'madar',name:'مدار',handle:'madar.wav',roles:['prod','dj'],city:'عمّان',bio:'بروديوسر ودي جي. أشرح طريقتي في بناء الإيقاعات خطوة بخطوة.',followers:8400},
    {id:'salma',name:'سلمى',handle:'salma.live',roles:['sing'],city:'القاهرة',bio:'أغني بالعربية والفرنسية. أبحث عن موزع لأغنيتي القادمة.',followers:13700},
    {id:'raml',name:'رمل',handle:'raml.mix',roles:['dj'],city:'بيروت',bio:'ميكسات طويلة لآخر الليل. هاوس وأفرو وإيقاعات من الصحراء.',followers:5200}
  ];
  var projects=[
    {id:'p1',title:'ليل الميناء',by:'zil',type:'rap',medium:'video',dur:'3:42',views:48200,likes:5120,age:2,tags:['راب','ليل','تونس'],desc:'كليب أغنية «ليل الميناء» مصوّر في ميناء حلق الوادي قبل الفجر. الإيقاع من نبض.'},
    {id:'p2',title:'بيت 808 من الصفر',by:'nabd',type:'prod',medium:'video',dur:'12:08',views:31900,likes:3480,age:4,tags:['بيت','808','شرح'],desc:'أبني إيقاعًا كاملًا أمامكم: الكيك، الهاي هات، ثم الطبقة الصوتية من عينة عود قديمة.'},
    {id:'p3',title:'غلاف ألبوم «رماد»',by:'harf',type:'art',medium:'image',views:9400,likes:1210,age:6,tags:['غلاف','خط عربي','تصميم'],desc:'غلاف ألبوم لفرقة إندي من بيروت. حبر على ورق مقوّى ثم معالجة رقمية.'},
    {id:'p4',title:'حفلة السطح',by:'sarab',type:'dj',medium:'video',dur:'5:20',views:22700,likes:2640,age:7,tags:['ميكس','دي جي','سطح'],desc:'مقطع من سهرة على سطح عمارة في الدار البيضاء. فولك مغربي فوق إيقاع هاوس.'},
    {id:'p5',title:'جلسة تسجيل: الصدى',by:'layali',type:'sing',medium:'image',views:7800,likes:1560,age:9,tags:['استوديو','غناء','كواليس'],desc:'لقطة من ليلة تسجيل النسخة الأخيرة من أغنية «الصدى». الميكروفون كان قديمًا ولهذا أحببته.'},
    {id:'p6',title:'فريستايل: الجبل',by:'jabal',type:'rap',medium:'video',dur:'2:55',views:36500,likes:4290,age:3,tags:['فريستايل','راب','الرياض'],desc:'ثلاث دقائق بدون ورق. أبحث عن بروديوسر يحب الإيقاعات البطيئة.'},
    {id:'p7',title:'خلف الكواليس: كليب نبض',by:'adasa',type:'vid',medium:'video',dur:'4:11',views:12400,likes:1830,age:11,tags:['كواليس','تصوير','كليب'],desc:'يومان من التصوير في مصنع مهجور بتونس العاصمة، مختصرة في أربع دقائق.'},
    {id:'p8',title:'ركن الاستوديو',by:'madar',type:'prod',medium:'image',views:5300,likes:940,age:13,tags:['استوديو','معدات'],desc:'مكاني في عمّان: لوحة مفاتيح مستعملة، سماعتان، وكثير من الشاي.'},
    {id:'p9',title:'نسخة الغيتار',by:'salma',type:'sing',medium:'video',dur:'3:30',views:28100,likes:3970,age:5,tags:['غناء','غيتار','أكوستيك'],desc:'أغنيتي الجديدة بغيتار واحد وصوتي فقط، من غرفة الجلوس.'},
    {id:'p10',title:'ميكس الفجر',by:'raml',type:'dj',medium:'video',dur:'28:40',views:19300,likes:2210,age:16,tags:['ميكس','هاوس','فجر'],desc:'ميكس مدته نصف ساعة تقريبًا لمن يسهر حتى الصباح. ابدأوه عند الثالثة.'},
    {id:'p11',title:'بورتريه المايك',by:'adasa',type:'vid',medium:'image',views:6100,likes:1330,age:18,tags:['بورتريه','تصوير'],desc:'لقطة لرابر وهو يعدّل الميكروفون قبل الجلسة. إضاءة واحدة فقط.'},
    {id:'p12',title:'ملصق جولة الخريف',by:'harf',type:'art',medium:'image',views:8200,likes:1480,age:21,tags:['ملصق','جولة','تصميم'],desc:'ملصق جولة من خمس مدن بثلاثة ألوان فقط، مطبوع بالسلك سكرين.'},
    {id:'p13',title:'ضربة جديدة: طين',by:'nabd',type:'prod',medium:'video',dur:'1:48',views:14600,likes:2020,age:1,tags:['بيت','تراب','عينة'],desc:'مقطع قصير من إيقاع جديد. مفتوح للتعاون مع الرابرز.'},
    {id:'p14',title:'كيف أبني اللوب',by:'madar',type:'prod',medium:'video',dur:'9:15',views:17800,likes:2390,age:8,tags:['شرح','لوب','بروديوسر'],desc:'طريقتي في بناء لوب من أربع نوتات، وكيف أحوله إلى أغنية كاملة.'},
    {id:'p15',title:'كلمات على الجدار',by:'zil',type:'rap',medium:'image',views:10900,likes:2160,age:25,tags:['جرافيتي','كلمات','تونس'],desc:'مقطع من كلمات أغنيتي مكتوبًا بالرش على جدار في حيّنا.'}
  ];
  var comments={
    p1:[{who:'نبض',text:'الصوت نظيف جدًا، والمشهد الأخير على الرصيف ممتاز.',age:'قبل ساعتين'},{who:'ليالي',text:'أحببت الجملة الأخيرة من الكوبليه الثاني.',age:'أمس'}],
    p2:[{who:'مدار',text:'من أين العينة؟ تشبه تسجيلات الستينات.',age:'قبل 3 أيام'}],
    p6:[{who:'ظلّ',text:'إيقاع بطيء ينتظرك. أرسل لي رسالة.',age:'أمس'}]
  };
  var playlists=[
    {id:'saved',name:'المحفوظات',ids:['p2','p9'],fixed:true},
    {id:'beats',name:'إيقاعات أبحث عنها',ids:['p2','p13','p14'],fixed:false},
    {id:'clips',name:'كليبات أعجبتني',ids:['p1','p4','p7'],fixed:false}
  ];

  /* ---------- الحالة ---------- */
  var S={
    view:'home',profileId:'me',q:'',searchTab:'all',type:'all',medium:'all',sort:'new',
    playlist:'all',plQuery:'',settingsTab:'account',profTab:'all',openId:null,delConfirm:false,
    liked:{},following:{},side:false,
    prefs:{theme:'system',density:'comfort',nLikes:true,nComments:true,nFollow:true,nCollab:true,nWeekly:false,pPublic:true,pComments:true,pViews:true,pShare:true},
    pending:null,lastFocus:null
  };
  function cr(id){return creators.filter(function(c){return c.id===id})[0]}
  function pr(id){return projects.filter(function(p){return p.id===id})[0]}
  function roleLabel(c){return c.roles.map(function(k){return T[k].l}).join(' · ')}
  function rel(d){
    if(d<=0)return 'اليوم'; if(d===1)return 'أمس'; if(d===2)return 'قبل يومين';
    if(d<=10)return 'قبل '+d+' أيام'; if(d<30)return 'قبل '+d+' يومًا';
    var m=Math.floor(d/30); if(m<=1)return 'قبل شهر'; if(m===2)return 'قبل شهرين'; if(m<=10)return 'قبل '+m+' أشهر'; return 'قبل '+m+' شهرًا';
  }
  function likeCount(p){return p.likes+(S.liked[p.id]?1:0)}

  /* تفضيلات محلية بسيطة */
  function loadPrefs(){try{var r=localStorage.getItem('sada-prefs');if(r){var o=JSON.parse(r);for(var k in o){if(k in S.prefs)S.prefs[k]=o[k]}}}catch(e){}}
  function savePrefs(){try{localStorage.setItem('sada-prefs',JSON.stringify(S.prefs))}catch(e){}}
  function applyPrefs(){
    var r=document.documentElement;
    if(S.prefs.theme==='light'||S.prefs.theme==='dark')r.setAttribute('data-theme',S.prefs.theme); else r.removeAttribute('data-theme');
    r.classList.toggle('compact',S.prefs.density==='compact');
  }

  /* ---------- رسومات الأغلفة ---------- */
  var gid=0;
  function art(p){
    var t=T[p.type]||T.rap,h=t.h,h2=(h+38)%360,seed=hash(p.id),pat=seed%4,id='g'+(++gid),s='';
    var st='hsla('+h+',95%,78%,.38)',i,x,y;
    if(pat===0){for(i=1;i<=6;i++)s+='<circle cx="'+(120+seed%90)+'" cy="'+(260-seed%50)+'" r="'+(i*34)+'" fill="none" stroke="'+st+'" stroke-width="'+(i%2?1.5:3)+'"/>'}
    else if(pat===1){for(i=-4;i<12;i++)s+='<line x1="'+(i*50)+'" y1="400" x2="'+(i*50+220)+'" y2="0" stroke="'+st+'" stroke-width="'+(i%3?1.5:6)+'"/>'}
    else if(pat===2){for(y=0;y<9;y++)for(x=0;x<9;x++)s+='<circle cx="'+(25+x*43)+'" cy="'+(25+y*43)+'" r="'+(((x+y+seed)%4)+1.2)+'" fill="'+st+'"/>'}
    else{s+='<circle cx="200" cy="230" r="120" fill="hsla('+h2+',95%,65%,.5)"/>';for(i=0;i<7;i++)s+='<rect x="0" y="'+(230+i*22)+'" width="400" height="'+(3+i*2)+'" fill="hsl('+h+',60%,12%)"/>'}
    var letter=String(p.title).replace(/[«»"'\s]/g,'').charAt(0)||'ص';
    return '<svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+h+' 62% 30%)"/><stop offset="1" stop-color="hsl('+h2+' 70% 11%)"/></linearGradient></defs><rect width="400" height="400" fill="url(#'+id+')"/>'+s+'<text x="28" y="372" style="direction:ltr" font-family="Reem Kufi, Tahoma, sans-serif" font-size="230" font-weight="700" fill="rgba(255,255,255,.13)">'+esc(letter)+'</text></svg>';
  }
  function thumbArt(p){
    if(p.src&&p.medium==='image')return '<img src="'+p.src+'" alt="">';
    if(p.src&&p.medium==='video')return '<video src="'+p.src+'#t=0.5" muted playsinline preload="metadata"></video>';
    return art(p);
  }
  function banner(c){
    var h=(T[c.roles[0]]||T.rap).h,h2=(h+50)%360,id='b'+(++gid),s='',i;
    for(i=0;i<14;i++)s+='<rect x="'+(i*110-20)+'" y="0" width="46" height="400" fill="hsla('+h+',90%,75%,'+(i%3?0.05:0.12)+')" transform="skewX(-18)"/>';
    return '<svg viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl('+h+' 60% 28%)"/><stop offset="1" stop-color="hsl('+h2+' 70% 10%)"/></linearGradient></defs><rect width="1200" height="300" fill="url(#'+id+')"/>'+s+'</svg>';
  }
  function avatar(c,size){
    var h=(T[c.roles[0]]||T.rap).h;
    var nm=String(c.name).replace(/^DJ\s*/i,'').trim();
    return '<span class="av '+(size||'')+'" style="--h:'+h+'">'+esc(nm.charAt(0)||'؟')+'</span>';
  }

  /* ---------- مكوّنات ---------- */
  function card(p){
    var c=cr(p.by),t=T[p.type],liked=!!S.liked[p.id];
    return '<article class="card"><div class="thumbwrap">'+
      '<button class="thumb" data-act="open" data-id="'+p.id+'" aria-label="فتح العمل: '+esc(p.title)+'">'+thumbArt(p)+
      (p.medium==='video'?'<span class="play">'+ico('play')+'</span><span class="badge mono">'+esc(p.dur||'فيديو')+'</span>':'<span class="badge">'+ico('image')+'صورة</span>')+
      '</button>'+
      '<button class="like" data-act="like" data-id="'+p.id+'" data-like="'+p.id+'" aria-pressed="'+liked+'" aria-label="إعجاب">'+ico('heart')+'</button></div>'+
      '<div class="meta"><h3 title="'+esc(p.title)+'">'+esc(p.title)+'</h3>'+
      '<div class="by"><button class="who" data-act="profile" data-id="'+c.id+'">'+esc(c.name)+'</button><span class="tchip" style="--c:var(--t-'+p.type+')">'+t.l+'</span></div>'+
      '<div class="stats"><span class="mono">'+ico('eye')+fmt(p.views)+'</span><span class="mono">'+ico('heart')+'<span data-likecount="'+p.id+'">'+fmt(likeCount(p))+'</span></span><span>'+rel(p.age)+'</span></div></div></article>';
  }
  function grid(list){return '<div class="grid">'+list.map(card).join('')+'</div>'}
  function followBtn(c){
    if(c.id==='me')return '<button class="btn sm" data-act="go" data-v="settings">تعديل الملف</button>';
    var f=!!S.following[c.id];
    return '<button class="btn sm '+(f?'':'accent')+'" data-act="follow" data-id="'+c.id+'" data-follow="'+c.id+'" aria-pressed="'+f+'">'+(f?'تتابعه':'متابعة')+'</button>';
  }
  function typeChips(counts){
    var h='<div class="chips" role="group" aria-label="تصفية حسب النوع"><button class="chip" data-act="type" data-v="all" aria-pressed="'+(S.type==='all')+'">الكل<em>'+counts.all+'</em></button>';
    TYPES.forEach(function(t){h+='<button class="chip" style="--c:var(--t-'+t.k+')" data-act="type" data-v="'+t.k+'" aria-pressed="'+(S.type===t.k)+'"><i></i>'+t.l+'<em>'+(counts[t.k]||0)+'</em></button>'});
    return h+'</div>';
  }
  function sortList(l){
    var a=l.slice();
    if(S.sort==='views')a.sort(function(x,y){return y.views-x.views});
    else if(S.sort==='likes')a.sort(function(x,y){return likeCount(y)-likeCount(x)});
    else if(S.sort==='old')a.sort(function(x,y){return y.age-x.age});
    else a.sort(function(x,y){return x.age-y.age});
    return a;
  }
  function matchP(p,q){
    var c=cr(p.by);
    return norm([p.title,p.desc,p.tags.join(' '),c.name,T[p.type].l].join(' ')).indexOf(q)>-1;
  }
  function matchC(c,q){return norm(c.name+' '+c.handle+' '+roleLabel(c)+' '+c.city+' '+c.bio).indexOf(q)>-1}

  /* ---------- الصفحة الرئيسية ---------- */
  function viewHome(){
    var pl=S.playlist==='all'?null:playlists.filter(function(p){return p.id===S.playlist})[0];
    var base=projects.filter(function(p){return (!pl||pl.ids.indexOf(p.id)>-1)&&(S.medium==='all'||p.medium===S.medium)});
    var counts={all:base.length};TYPES.forEach(function(t){counts[t.k]=base.filter(function(p){return p.type===t.k}).length});
    var list=sortList(base.filter(function(p){return S.type==='all'||p.type===S.type}));
    var h='<div class="page"><div class="page-head"><div><h1>'+(pl?esc(pl.name):'اكتشف الأعمال')+'</h1><p class="sub">'+(pl?'قائمة تشغيل · ':'')+list.length+' عمل'+(S.type!=='all'?' من '+T[S.type].l:'')+'</p></div>'+
      '<button class="btn accent" data-act="go" data-v="add">'+ico('plus')+'إضافة مشروع</button></div>';
    h+='<div class="toolbar"><div class="field-sel"><label class="vh" for="sortSel">ترتيب حسب</label><select id="sortSel" data-act="sort">'+
      [['new','الأحدث'],['views','الأكثر مشاهدة'],['likes','الأكثر إعجابًا'],['old','الأقدم']].map(function(o){return '<option value="'+o[0]+'"'+(S.sort===o[0]?' selected':'')+'>ترتيب: '+o[1]+'</option>'}).join('')+
      '</select></div>'+
      '<div class="seg" role="group" aria-label="نوع الوسائط">'+
      [['all','الكل',''],['video','فيديو','video'],['image','صور','image']].map(function(o){return '<button data-act="medium" data-v="'+o[0]+'" aria-pressed="'+(S.medium===o[0])+'">'+(o[2]?ico(o[2],''):'')+o[1]+'</button>'}).join('')+
      '</div></div>'+typeChips(counts);
    if(!list.length){
      h+='<div class="empty">'+ico('video')+'<h3>لا توجد أعمال هنا بعد</h3><p>'+(pl?'هذه القائمة فارغة أو لا تطابق التصفية. افتح أي عمل واضغط «إضافة إلى قائمة».':'جرّب نوعًا آخر أو أزل التصفية.')+'</p><button class="btn" data-act="reset">إزالة التصفية</button></div>';
    } else h+=grid(list);
    return h+'</div>';
  }

  /* ---------- البحث ---------- */
  function viewSearch(){
    var q=norm(S.q.trim());
    if(!q){
      var freq={};projects.forEach(function(p){p.tags.forEach(function(t){freq[t]=(freq[t]||0)+1})});
      var tags=Object.keys(freq).sort(function(a,b){return freq[b]-freq[a]}).slice(0,12);
      return '<div class="page"><div class="page-head"><div><h1>البحث</h1><p class="sub">اكتب في شريط البحث بالأعلى، أو ابدأ من وسم.</p></div></div>'+
        '<h2 class="sec-title">وسوم شائعة</h2><div class="tag-row">'+tags.map(function(t){return '<button class="tag" data-act="tag" data-v="'+esc(t)+'">#'+esc(t)+'</button>'}).join('')+'</div>'+
        '<h2 class="sec-title">ابحث حسب الدور</h2><div class="tag-row">'+TYPES.map(function(t){return '<button class="chip" style="--c:var(--t-'+t.k+')" data-act="tag" data-v="'+t.l+'"><i></i>'+t.l+'</button>'}).join('')+'</div></div>';
    }
    var ps=projects.filter(function(p){return matchP(p,q)}),cs=creators.filter(function(c){return c.id!=='me'&&matchC(c,q)});
    var tab=S.searchTab,h='<div class="page"><div class="page-head"><div><h1>نتائج «'+esc(S.q.trim())+'»</h1><p class="sub">'+ps.length+' عمل · '+cs.length+' فنان</p></div></div>';
    h+='<div class="seg" role="group" aria-label="نوع النتائج" style="align-self:flex-start">'+[['all','الكل'],['works','أعمال'],['people','فنانون']].map(function(o){return '<button data-act="stab" data-v="'+o[0]+'" aria-pressed="'+(tab===o[0])+'">'+o[1]+'</button>'}).join('')+'</div>';
    if(!ps.length&&!cs.length)return h+'<div class="empty">'+ico('search')+'<h3>لا نتائج</h3><p>لم نجد شيئًا يطابق بحثك. جرّب كلمة أقصر أو وسمًا مثل «راب» أو «بيت».</p></div></div>';
    if(tab!=='works'&&cs.length){h+='<h2 class="sec-title">فنانون</h2><div class="cr-list">'+cs.map(function(c){return '<div class="cr">'+avatar(c)+'<div class="info"><button data-act="profile" data-id="'+c.id+'">'+esc(c.name)+'</button><div class="roles">'+c.roles.map(function(k){return '<span class="tchip" style="--c:var(--t-'+k+')">'+T[k].l+'</span>'}).join('')+'</div><span class="handle">@'+esc(c.handle)+'</span></div>'+followBtn(c)+'</div>'}).join('')+'</div>'}
    if(tab!=='people'&&ps.length){h+='<h2 class="sec-title">أعمال</h2>'+grid(sortList(ps))}
    return h+'</div>';
  }

  /* ---------- الملف الشخصي ---------- */
  function viewProfile(){
    var c=cr(S.profileId)||cr('me'),mine=c.id==='me';
    var all=projects.filter(function(p){return p.by===c.id}),
        list=all.filter(function(p){return S.profTab==='all'||p.medium===S.profTab}),
        views=all.reduce(function(a,p){return a+p.views},0),
        fol=c.followers+(S.following[c.id]?1:0);
    var h='<div class="page"><div class="banner">'+banner(c)+'</div><div class="prof-head">'+avatar(c,'lg')+
      '<div class="txt"><h1>'+esc(c.name)+'</h1><span class="handle">@'+esc(c.handle)+'</span><div class="by" style="margin-top:6px;flex-wrap:wrap">'+
      c.roles.map(function(k){return '<span class="tchip" style="--c:var(--t-'+k+')">'+T[k].l+'</span>'}).join('')+(c.city?'<span style="color:var(--muted)">· '+esc(c.city)+'</span>':'')+'</div></div>'+
      '<div class="m-actions">'+followBtn(c)+(mine?'<button class="btn sm accent" data-act="go" data-v="add">'+ico('plus')+'مشروع جديد</button>':'')+'</div></div>';
    h+='<div class="statrow"><div><b>'+all.length+'</b><span>عمل</span></div><div><b>'+fmt(views)+'</b><span>مشاهدة</span></div><div><b>'+fmt(fol)+'</b><span>متابع</span></div></div>';
    h+='<div class="prof-body">'+(c.bio?'<p class="bio">'+esc(c.bio)+'</p>':(mine?'<p class="bio" style="color:var(--muted)">لم تكتب نبذة بعد. أضفها من الإعدادات ليعرفك الآخرون.</p>':''))+
      '<div class="seg" role="group" aria-label="نوع الأعمال" style="align-self:flex-start">'+[['all','كل الأعمال'],['video','فيديو'],['image','صور']].map(function(o){return '<button data-act="ptab" data-v="'+o[0]+'" aria-pressed="'+(S.profTab===o[0])+'">'+o[1]+'</button>'}).join('')+'</div>';
    if(!list.length){
      h+='<div class="empty">'+ico('upload')+'<h3>'+(mine?'لا أعمال في ملفك بعد':'لا أعمال هنا')+'</h3><p>'+(mine?'انشر أول فيديو أو صورة ليظهر هنا ويراه الرابرز والبروديوسرز الآخرون.':'لم ينشر شيئًا من هذا النوع.')+'</p>'+(mine?'<button class="btn accent" data-act="go" data-v="add">'+ico('plus')+'إضافة مشروع</button>':'')+'</div>';
    } else h+=grid(sortList(list));
    return h+'</div></div>';
  }

  /* ---------- الإعدادات ---------- */
  function sw(key,label,desc){
    return '<div class="row-item"><div><b>'+label+'</b><p>'+desc+'</p></div><label class="switch"><span class="vh">'+label+'</span><input type="checkbox" role="switch" data-pref="'+key+'"'+(S.prefs[key]?' checked':'')+'><i></i></label></div>';
  }
  function viewSettings(){
    var tabs=[['account','الحساب'],['look','المظهر'],['notify','الإشعارات'],['privacy','الخصوصية']];
    var h='<div class="page"><div class="page-head"><div><h1>الإعدادات</h1><p class="sub">تحكم في حسابك وكيف يظهر صدى لك.</p></div></div><div class="tabs" role="tablist">'+
      tabs.map(function(t){return '<button role="tab" data-act="stab2" data-v="'+t[0]+'" aria-selected="'+(S.settingsTab===t[0])+'">'+t[1]+'</button>'}).join('')+'</div>';
    var m=cr('me');
    if(S.settingsTab==='account'){
      h+='<form class="panel" id="accForm" novalidate><div class="two"><div class="field"><label for="aName">الاسم الفني</label><input class="inp" id="aName" value="'+esc(m.name)+'" maxlength="30"></div>'+
        '<div class="field"><label for="aHandle">المعرّف</label><input class="inp ltr" id="aHandle" value="'+esc(m.handle)+'" maxlength="24" dir="ltr"></div></div>'+
        '<div class="field"><span class="lab">أدواري</span><div class="role-pick" id="rolePick">'+TYPES.map(function(t){return '<button type="button" class="chip" style="--c:var(--t-'+t.k+')" data-act="role" data-v="'+t.k+'" aria-pressed="'+(m.roles.indexOf(t.k)>-1)+'"><i></i>'+t.l+'</button>'}).join('')+'</div><span class="hint">اختر دورًا واحدًا على الأقل. تظهر الأدوار على ملفك وتُستخدم في التصفية.</span></div>'+
        '<div class="field"><label for="aCity">المدينة</label><input class="inp" id="aCity" value="'+esc(m.city)+'" maxlength="30" placeholder="مثال: تونس"></div>'+
        '<div class="field"><label for="aBio">نبذة</label><textarea class="inp" id="aBio" maxlength="240" placeholder="عرّف بنفسك وبما تبحث عنه: تعاون، فيديو كليب، إيقاع جديد…">'+esc(m.bio)+'</textarea></div>'+
        '<div class="err" id="accErr" role="alert"></div><div><button class="btn accent" type="submit">حفظ التغييرات</button></div>'+
        '<div class="zone"><b>حذف الحساب</b><p style="color:var(--muted)">يحذف ملفك وأعمالك نهائيًا. لا يمكن التراجع.</p><div id="delArea">'+
        (S.delConfirm?'<div class="m-actions"><button type="button" class="btn danger" data-act="delyes">نعم، احذف حسابي</button><button type="button" class="btn ghost" data-act="delno">إلغاء</button></div>':'<button type="button" class="btn danger" data-act="del">حذف الحساب</button>')+'</div></div></form>';
    } else if(S.settingsTab==='look'){
      h+='<div class="panel"><div class="field"><span class="lab">السمة</span><div class="seg" role="group" aria-label="السمة" style="align-self:flex-start">'+
        [['system','تلقائي'],['light','فاتح'],['dark','داكن']].map(function(o){return '<button data-act="theme" data-v="'+o[0]+'" aria-pressed="'+(S.prefs.theme===o[0])+'">'+o[1]+'</button>'}).join('')+'</div><span class="hint">«تلقائي» يتبع إعداد جهازك.</span></div>'+
        '<div class="field"><span class="lab">كثافة الشبكة</span><div class="seg" role="group" aria-label="كثافة الشبكة" style="align-self:flex-start">'+
        [['comfort','مريحة'],['compact','مضغوطة']].map(function(o){return '<button data-act="density" data-v="'+o[0]+'" aria-pressed="'+(S.prefs.density===o[0])+'">'+o[1]+'</button>'}).join('')+'</div><span class="hint">المضغوطة تعرض أعمالًا أكثر في كل صف.</span></div></div>';
    } else if(S.settingsTab==='notify'){
      h+='<div class="panel">'+sw('nLikes','الإعجابات','عندما يعجب أحدهم بعمل من أعمالك.')+sw('nComments','التعليقات','عندما يعلّق أحدهم على عملك.')+sw('nFollow','متابعون جدد','عندما يبدأ فنان بمتابعتك.')+sw('nCollab','طلبات التعاون','عندما يرسل لك بروديوسر أو رابر عرضًا.')+sw('nWeekly','ملخص أسبوعي','رسالة واحدة كل أسبوع بأفضل الأعمال.')+'</div>';
    } else {
      h+='<div class="panel">'+sw('pPublic','ملف عام','يظهر ملفك وأعمالك في البحث لكل الزوار.')+sw('pComments','السماح بالتعليقات','يستطيع الجميع التعليق على أعمالك.')+sw('pViews','إظهار عدد المشاهدات','يرى الزوار عدد مشاهدات كل عمل.')+sw('pShare','السماح بالمشاركة خارج صدى','يمكن نسخ رابط أعمالك ونشره.')+'</div>';
    }
    return h+'</div>';
  }

  /* ---------- إضافة مشروع ---------- */
  function viewAdd(){
    var m=cr('me');
    return '<div class="page"><div class="page-head"><div><h1>إضافة مشروع</h1><p class="sub">انشر فيديو أو صورة. يظهر العمل في الصفحة الرئيسية وفي ملفك.</p></div></div>'+
      '<form class="add-grid" id="addForm" novalidate><div class="field"><span class="lab">الملف</span>'+
      '<div class="drop" id="drop"><div class="inner" id="dropInner">'+ico('upload')+'<b>اسحب الملف هنا</b><span>أو اضغط للاختيار. فيديو (MP4، MOV، WebM) أو صورة (JPG، PNG، WebP) حتى 300 ميغابايت.</span></div><input type="file" id="file" accept="video/*,image/*" aria-label="اختيار ملف فيديو أو صورة"></div>'+
      '<div class="err" id="fileErr" role="alert"></div></div>'+
      '<div style="display:flex;flex-direction:column;gap:18px;min-width:0">'+
      '<div class="field"><label for="fTitle">عنوان العمل</label><input class="inp" id="fTitle" maxlength="70" placeholder="مثال: ليل الميناء"><div class="err" id="titleErr" role="alert"></div></div>'+
      '<div class="field"><label for="fType">التصنيف</label><div class="field-sel"><select id="fType" class="sel" style="width:100%">'+TYPES.map(function(t){return '<option value="'+t.k+'"'+(m.roles[0]===t.k?' selected':'')+'>'+t.l+'</option>'}).join('')+'</select></div></div>'+
      '<div class="field"><label for="fDesc">وصف</label><textarea class="inp" id="fDesc" maxlength="400" placeholder="ما قصة هذا العمل؟ هل تبحث عن تعاون؟"></textarea></div>'+
      '<div class="field"><label for="fTags">وسوم</label><input class="inp" id="fTags" placeholder="راب، بيت، كواليس"><span class="hint">افصل بين الوسوم بفاصلة. حتى ستة وسوم.</span></div>'+
      '<div class="field"><label for="fPl">إضافة إلى قائمة</label><div class="field-sel"><select id="fPl" class="sel" style="width:100%"><option value="">بدون</option>'+playlists.map(function(p){return '<option value="'+p.id+'">'+esc(p.name)+'</option>'}).join('')+'</select></div></div>'+
      '<div class="field"><span class="lab">من يرى العمل</span><div class="radio-row"><label><input type="radio" name="vis" value="public" checked><span>الجميع</span></label><label><input type="radio" name="vis" value="follow"><span>المتابعون</span></label><label><input type="radio" name="vis" value="private"><span>أنا فقط</span></label></div></div>'+
      '<div class="m-actions"><button class="btn accent" type="submit">نشر العمل</button><button class="btn ghost" type="button" data-act="go" data-v="home">إلغاء</button></div></div></form></div>';
  }
  function setPending(file){
    var err=$('#fileErr');err.textContent='';
    if(!file)return;
    var kind=/^video\//.test(file.type)?'video':(/^image\//.test(file.type)?'image':'');
    if(!kind){err.textContent='نوع الملف غير مدعوم. اختر فيديو أو صورة.';return}
    if(file.size>300*1024*1024){err.textContent='حجم الملف أكبر من 300 ميغابايت. اختر ملفًا أصغر.';return}
    if(S.pending&&S.pending.url){try{URL.revokeObjectURL(S.pending.url)}catch(e){}}
    var url=URL.createObjectURL(file);S.pending={url:url,kind:kind,dur:'',name:file.name};
    var inner=$('#dropInner');
    inner.outerHTML='<div class="preview" id="dropInner">'+(kind==='video'?'<video id="pvVid" src="'+url+'" controls muted playsinline></video>':'<img src="'+url+'" alt="معاينة الصورة">')+'</div>';
    $('#drop').style.pointerEvents='auto';
    if(kind==='video'){
      var v=$('#pvVid');v.addEventListener('loadedmetadata',function(){var d=Math.round(v.duration||0);S.pending.dur=Math.floor(d/60)+':'+String(d%60).padStart(2,'0')});
    }
    var ti=$('#fTitle');if(ti&&!ti.value){ti.value=file.name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').slice(0,70)}
  }
  function bindAdd(){
    var drop=$('#drop'),file=$('#file');
    file.addEventListener('change',function(){setPending(file.files[0])});
    ['dragenter','dragover'].forEach(function(ev){drop.addEventListener(ev,function(e){e.preventDefault();drop.classList.add('over')})});
    ['dragleave','drop'].forEach(function(ev){drop.addEventListener(ev,function(){drop.classList.remove('over')})});
    $('#addForm').addEventListener('submit',function(e){
      e.preventDefault();
      var title=$('#fTitle').value.trim(),ok=true;
      $('#titleErr').textContent='';
      if(!S.pending){$('#fileErr').textContent='اختر فيديو أو صورة قبل النشر.';ok=false}
      if(title.length<2){$('#titleErr').textContent='اكتب عنوانًا من حرفين على الأقل.';ok=false}
      if(!ok)return;
      var tags=$('#fTags').value.split(/[,،#\s]+/).map(function(t){return t.trim()}).filter(function(t,i,a){return t&&a.indexOf(t)===i}).slice(0,6);
      var id='u'+Date.now();
      projects.unshift({id:id,title:title,by:'me',type:$('#fType').value,medium:S.pending.kind,dur:S.pending.kind==='video'?(S.pending.dur||'فيديو'):'',views:0,likes:0,age:0,tags:tags,desc:$('#fDesc').value.trim(),src:S.pending.url});
      var pid=$('#fPl').value;if(pid){playlists.filter(function(p){return p.id===pid})[0].ids.push(id)}
      S.pending=null;S.sort='new';S.type='all';S.medium='all';S.playlist='all';
      go('home');toast('تم نشر العمل');
    });
  }

  /* ---------- نافذة العمل ---------- */
  function modalHtml(p){
    var c=cr(p.by),t=T[p.type],liked=!!S.liked[p.id],list=comments[p.id]||[];
    var media;
    if(p.src&&p.medium==='video')media='<video controls playsinline src="'+p.src+'"></video>';
    else if(p.src)media='<img src="'+p.src+'" alt="'+esc(p.title)+'">';
    else media='<div class="demo-media">'+art(p)+(p.medium==='video'?'<button class="bigplay" data-act="demo" aria-label="تشغيل">'+ico('play')+'</button>':'')+'<span class="demo-flag">عمل تجريبي</span></div>';
    return '<div class="sheet"><button class="m-close" data-act="close" aria-label="إغلاق">'+ico('close')+'</button><div class="m-media">'+media+'</div>'+
      '<div class="m-info"><h2 id="mTitle">'+esc(p.title)+'</h2>'+
      '<div class="m-creator">'+avatar(c)+'<div class="nm"><button data-act="profile" data-id="'+c.id+'">'+esc(c.name)+'</button><span class="tchip" style="--c:var(--t-'+p.type+')">'+t.l+'</span></div>'+followBtn(c)+'</div>'+
      (p.desc?'<p>'+esc(p.desc)+'</p>':'')+
      (p.tags.length?'<div class="tag-row">'+p.tags.map(function(g){return '<button class="tag" data-act="tag" data-v="'+esc(g)+'">#'+esc(g)+'</button>'}).join('')+'</div>':'')+
      '<div class="stats mono" style="font-size:13px"><span>'+ico('eye')+fmt(p.views)+'</span><span>'+ico('heart')+'<span data-likecount="'+p.id+'">'+fmt(likeCount(p))+'</span></span><span style="font-family:var(--font-body)">'+rel(p.age)+'</span></div>'+
      '<div class="m-actions"><button class="btn" data-act="like" data-id="'+p.id+'" data-like="'+p.id+'" aria-pressed="'+liked+'">'+ico('heart')+'إعجاب</button><button class="btn" data-act="copy">'+ico('link')+'نسخ الرابط</button></div>'+
      '<details class="details"><summary>'+ico('bookmark')+'إضافة إلى قائمة</summary><div class="pl-pick" id="plPick">'+plPick(p.id)+'</div></details>'+
      '<div class="comments"><h3 class="sec-title" style="font-size:18px">التعليقات</h3><div id="cmList" class="comments">'+cmList(p.id)+'</div>'+
      '<form class="cm-form" id="cmForm"><label class="vh" for="cmIn">اكتب تعليقًا</label><input class="inp" id="cmIn" placeholder="اكتب تعليقًا" maxlength="200"><button class="btn accent" type="submit">إرسال</button></form></div></div></div>';
  }
  function plPick(id){
    return playlists.map(function(pl){return '<label><input type="checkbox" data-pl="'+pl.id+'"'+(pl.ids.indexOf(id)>-1?' checked':'')+'>'+esc(pl.name)+'</label>'}).join('');
  }
  function cmList(id){
    var l=comments[id]||[];
    if(!l.length)return '<p style="color:var(--muted)">لا تعليقات بعد. كن أول من يعلّق.</p>';
    return l.map(function(c){return '<div class="cm"><span class="av xs" style="--h:'+(hash(c.who)%360)+'">'+esc(String(c.who).replace(/^DJ\s*/i,'').charAt(0))+'</span><div class="t"><b style="font-weight:600">'+esc(c.who)+'</b><small>'+esc(c.age)+'</small><div>'+esc(c.text)+'</div></div></div>'}).join('');
  }
  function openModal(id){
    var p=pr(id);if(!p)return;
    S.openId=id;S.lastFocus=document.activeElement;
    var m=$('#modal');m.innerHTML=modalHtml(p);m.hidden=false;
    var c=$('.m-close',m);if(c)c.focus();
    $('#cmForm').addEventListener('submit',function(e){
      e.preventDefault();var inp=$('#cmIn'),v=inp.value.trim();if(!v)return;
      (comments[id]=comments[id]||[]).push({who:cr('me').name,text:v,age:'الآن'});
      inp.value='';$('#cmList').innerHTML=cmList(id);
    });
  }
  function closeModal(){
    var m=$('#modal');if(m.hidden)return;
    var v=$('video',m);if(v)v.pause();
    m.hidden=true;m.innerHTML='';S.openId=null;
    if(S.lastFocus&&S.lastFocus.focus&&document.contains(S.lastFocus))S.lastFocus.focus();
  }

  /* ---------- الهيكل والتوجيه ---------- */
  var VIEWS={home:viewHome,search:viewSearch,profile:viewProfile,settings:viewSettings,add:viewAdd};
  function renderTop(){
    var m=cr('me'),b=$('#btnProfile');
    b.innerHTML=avatar(m,'xs');b.style.padding='0';
    b.setAttribute('aria-current',S.view==='profile'&&S.profileId==='me'?'page':'false');
    $('#btnSettings').setAttribute('aria-current',S.view==='settings'?'page':'false');
  }
  function renderSide(){
    var q=norm(S.plQuery.trim());
    var items=[{id:'all',name:'كل الأعمال',n:projects.length,fixed:true}].concat(playlists.map(function(p){return {id:p.id,name:p.name,n:p.ids.length,fixed:p.fixed}}));
    items=items.filter(function(i){return !q||norm(i.name).indexOf(q)>-1});
    $('#plList').innerHTML=items.length?items.map(function(i){
      return '<li class="pl-item" aria-current="'+(S.playlist===i.id&&S.view==='home')+'"><button class="pl-btn" data-act="pl" data-id="'+i.id+'">'+ico(i.id==='all'?'list':'bookmark')+'<span class="n">'+esc(i.name)+'</span><span class="cnt mono">'+i.n+'</span></button>'+
        (i.fixed?'':'<button class="pl-del" data-act="pldel" data-id="'+i.id+'" aria-label="حذف القائمة '+esc(i.name)+'">'+ico('trash')+'</button>')+'</li>';
    }).join(''):'<li style="color:var(--muted);padding:8px 10px">لا توجد قائمة بهذا الاسم.</li>';
  }
  function render(){
    var aid=document.activeElement&&document.activeElement.id;
    renderTop();renderSide();
    $('#main').innerHTML=VIEWS[S.view]();
    if(S.view==='add')bindAdd();
    if(S.view==='settings')bindSettings();
    if(aid){var e=document.getElementById(aid);if(e&&e.focus&&aid!=='q'&&aid!=='plq'&&aid!=='plName')e.focus()}
  }
  function go(v,keepScroll){
    closeModal();
    S.view=v;if(v==='profile'&&!keepScroll){}
    try{if(location.hash!=='#'+v)location.hash=v}catch(e){}
    S.side=false;syncSide();render();$('#main').scrollTop=0;
  }
  function syncSide(){
    $('#side').classList.toggle('open',S.side);$('#scrim').classList.toggle('on',S.side);
    $('#btnSide').setAttribute('aria-expanded',String(S.side));
  }
  var tt;
  function toast(msg){
    var t=$('#toast');$('span',t).textContent=msg;t.classList.add('on');clearTimeout(tt);tt=setTimeout(function(){t.classList.remove('on')},2200);
  }
  function updLike(id){
    var on=!!S.liked[id],p=pr(id);
    $$('[data-like="'+id+'"]').forEach(function(b){b.setAttribute('aria-pressed',String(on))});
    $$('[data-likecount="'+id+'"]').forEach(function(s){s.textContent=fmt(likeCount(p))});
  }
  function updFollow(id){
    var on=!!S.following[id];
    $$('[data-follow="'+id+'"]').forEach(function(b){b.setAttribute('aria-pressed',String(on));b.textContent=on?'تتابعه':'متابعة';b.classList.toggle('accent',!on)});
  }
  function bindSettings(){
    var f=$('#accForm');if(!f)return;
    f.addEventListener('submit',function(e){
      e.preventDefault();var m=cr('me'),name=$('#aName').value.trim(),handle=$('#aHandle').value.trim().replace(/[^a-zA-Z0-9._]/g,''),err=$('#accErr');
      if(name.length<2){err.textContent='اكتب اسمًا فنيًا من حرفين على الأقل.';return}
      if(handle.length<3){err.textContent='المعرّف من ثلاثة أحرف إنجليزية أو أرقام على الأقل.';return}
      if(!m.roles.length){err.textContent='اختر دورًا واحدًا على الأقل.';return}
      err.textContent='';m.name=name;m.handle=handle;m.city=$('#aCity').value.trim();m.bio=$('#aBio').value.trim();
      renderTop();toast('تم حفظ الحساب');
    });
  }

  /* ---------- الأحداث ---------- */
  document.addEventListener('click',function(e){
    var el=e.target.closest('[data-act]');
    if(!el){
      if(!e.target.closest('.search'))$('#suggest').hidden=true;
      if(e.target.id==='modal')closeModal();
      return;
    }
    var a=el.getAttribute('data-act'),v=el.getAttribute('data-v'),id=el.getAttribute('data-id');
    switch(a){
      case 'sort':return;
      case 'go':e.preventDefault();go(v);break;
      case 'home':e.preventDefault();S.playlist='all';S.type='all';S.medium='all';go('home');break;
      case 'myprofile':S.profileId='me';S.profTab='all';go('profile');break;
      case 'profile':S.profileId=id;S.profTab='all';$('#suggest').hidden=true;go('profile');break;
      case 'open':openModal(id);break;
      case 'close':closeModal();break;
      case 'like':e.preventDefault();S.liked[id]=!S.liked[id];updLike(id);break;
      case 'follow':S.following[id]=!S.following[id];updFollow(id);
        if(S.view==='profile'){var c=cr(S.profileId);$$('.statrow b')[2].textContent=fmt(c.followers+(S.following[c.id]?1:0))}break;
      case 'type':S.type=v;render();break;
      case 'medium':S.medium=v;render();break;
      case 'reset':S.type='all';S.medium='all';render();break;
      case 'pl':S.playlist=id;S.type='all';S.side=false;syncSide();if(S.view!=='home'){go('home')}else{render();$('#main').scrollTop=0}break;
      case 'pldel':
        playlists=playlists.filter(function(p){return p.id!==id});
        if(S.playlist===id)S.playlist='all';render();toast('تم حذف القائمة');break;
      case 'side':S.side=!S.side;syncSide();break;
      case 'side-close':S.side=false;syncSide();break;
      case 'tag':S.q=v;$('#q').value=v;S.searchTab='all';$('#suggest').hidden=true;go('search');break;
      case 'stab':S.searchTab=v;render();break;
      case 'ptab':S.profTab=v;render();break;
      case 'stab2':S.settingsTab=v;S.delConfirm=false;render();break;
      case 'role':var m=cr('me'),i=m.roles.indexOf(v);if(i>-1){if(m.roles.length>1)m.roles.splice(i,1);else return}else m.roles.push(v);
        el.setAttribute('aria-pressed',String(m.roles.indexOf(v)>-1));break;
      case 'theme':S.prefs.theme=v;applyPrefs();savePrefs();render();break;
      case 'density':S.prefs.density=v;applyPrefs();savePrefs();render();break;
      case 'del':S.delConfirm=true;render();break;
      case 'delno':S.delConfirm=false;render();break;
      case 'delyes':S.delConfirm=false;render();toast('هذه نسخة تجريبية. لم يُحذف شيء.');break;
      case 'demo':toast('هذا عمل تجريبي بلا ملف. الأعمال التي تنشرها تُشغَّل فعليًا.');break;
      case 'copy':
        (function(){var ok=function(){toast('تم نسخ الرابط')},no=function(){toast('تعذّر النسخ. انسخ الرابط من شريط العنوان.')};
        try{navigator.clipboard.writeText(location.href).then(ok,no)}catch(err){no()}})();break;
    }
  });
  document.addEventListener('change',function(e){
    var t=e.target;
    if(t.id==='sortSel'){S.sort=t.value;render();return}
    if(t.hasAttribute&&t.hasAttribute('data-pref')){S.prefs[t.getAttribute('data-pref')]=t.checked;savePrefs();toast('تم الحفظ');return}
    if(t.hasAttribute&&t.hasAttribute('data-pl')&&S.openId){
      var pl=playlists.filter(function(p){return p.id===t.getAttribute('data-pl')})[0],i=pl.ids.indexOf(S.openId);
      if(t.checked&&i<0){pl.ids.push(S.openId);toast('أُضيف إلى «'+pl.name+'»')}
      if(!t.checked&&i>-1){pl.ids.splice(i,1);toast('أُزيل من «'+pl.name+'»')}
      renderSide();
    }
  });
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'){
      if(!$('#modal').hidden)closeModal();
      else if(S.side){S.side=false;syncSide()}
      $('#suggest').hidden=true;
    }
  });
  $('#plq').addEventListener('input',function(e){S.plQuery=e.target.value;renderSide()});
  $('#plNew').addEventListener('submit',function(e){
    e.preventDefault();var inp=$('#plName'),n=inp.value.trim();if(!n)return;
    var id='pl'+Date.now();playlists.push({id:id,name:n,ids:[],fixed:false});inp.value='';
    S.playlist=id;S.type='all';if(S.view!=='home')go('home');else render();toast('أُنشئت القائمة «'+n+'»');
  });
  var qi=$('#q'),sg=$('#suggest');
  qi.addEventListener('input',function(){
    var q=norm(qi.value.trim());
    if(!q){sg.hidden=true;return}
    var cs=creators.filter(function(c){return c.id!=='me'&&matchC(c,q)}).slice(0,3),ps=projects.filter(function(p){return matchP(p,q)}).slice(0,4),h='';
    if(cs.length){h+='<div class="sg-label">فنانون</div>'+cs.map(function(c){return '<button type="button" class="sg-item" data-act="profile" data-id="'+c.id+'">'+avatar(c,'xs')+'<span>'+esc(c.name)+'<small>'+roleLabel(c)+'</small></span></button>'}).join('')}
    if(ps.length){h+='<div class="sg-label">أعمال</div>'+ps.map(function(p){return '<button type="button" class="sg-item" data-act="open" data-id="'+p.id+'">'+ico(p.medium==='video'?'video':'image')+'<span>'+esc(p.title)+'<small>'+esc(cr(p.by).name)+'</small></span></button>'}).join('')}
    if(!h)h='<div class="sg-empty">لا نتائج سريعة. اضغط Enter للبحث الكامل.</div>';
    sg.innerHTML=h;sg.hidden=false;
  });
  qi.addEventListener('focus',function(){if(qi.value.trim())qi.dispatchEvent(new Event('input'))});
  $('#searchForm').addEventListener('submit',function(e){
    e.preventDefault();S.q=qi.value;S.searchTab='all';sg.hidden=true;qi.blur();go('search');
  });
  window.addEventListener('hashchange',function(){
    var v=(location.hash||'').replace('#','');
    if(VIEWS[v]&&v!==S.view){S.view=v;if(v==='profile')S.profileId='me';closeModal();render();$('#main').scrollTop=0}
  });

  /* ---------- البدء ---------- */
  loadPrefs();applyPrefs();
  try{var h0=(location.hash||'').replace('#','');if(VIEWS[h0])S.view=h0}catch(e){}
  render();
})();
