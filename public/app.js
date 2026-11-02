(()=>{
const WA='919324845800',$=s=>document.querySelector(s),wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),3200)};
$('#yr').textContent=new Date().getFullYear();
/* nav */
const nav=$('#nav'),menu=$('#menu'),bg=$('#burger');
addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>60),{passive:true});
const tog=o=>{menu.classList.toggle('open',o);bg.setAttribute('aria-expanded',o)};
bg.onclick=()=>tog(true);$('#close').onclick=()=>tog(false);menu.querySelectorAll('a').forEach(a=>a.onclick=()=>tog(false));
addEventListener('keydown',e=>e.key==='Escape'&&tog(false));
/* hero slider */
const hs=$('#home'),sl=[...hs.querySelectorAll('.slide')],dots=$('#dots'),reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
let i=0,timer;
dots.innerHTML=sl.map((_,k)=>`<button aria-label="Go to slide ${k+1}"></button>`).join('');
function go(n){i=(n+sl.length)%sl.length;sl.forEach((s,k)=>{s.classList.toggle('on',k===i);s.setAttribute('aria-hidden',k!==i);s.querySelectorAll('a').forEach(a=>a.tabIndex=k===i?0:-1)});[...dots.children].forEach((d,k)=>d.setAttribute('aria-current',k===i))}
function restart(){clearInterval(timer);if(!reduce)timer=setInterval(()=>go(i+1),6000)}
dots.onclick=e=>{const k=[...dots.children].indexOf(e.target);if(k>-1){go(k);restart()}};
$('#prev').onclick=()=>{go(i-1);restart()};$('#next').onclick=()=>{go(i+1);restart()};
hs.addEventListener('mouseenter',()=>clearInterval(timer));hs.addEventListener('mouseleave',restart);hs.addEventListener('focusin',()=>clearInterval(timer));
hs.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){go(i-1);restart()}if(e.key==='ArrowRight'){go(i+1);restart()}});
let sx=0;hs.addEventListener('touchstart',e=>{sx=e.touches[0].clientX},{passive:true});
hs.addEventListener('touchend',e=>{const d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>50){go(d<0?i+1:i-1);restart()}},{passive:true});
go(0);restart();
/* data */
const C=[['Traditional Mithai','Classic sweets for every occasion'],['Dry Fruit Sweets','Rich rolls and barfis with premium nuts'],['Kaju Sweets','Silky cashew delicacies'],['Bengali Sweets','Soft, syrupy favourites'],['Milk Sweets','Pedas, cakes and more'],['Motichoor & Laddu','Festive golden laddus'],['Chocolate Mithai','Where tradition meets cocoa'],['Premium Gift Boxes','Beautifully packed assortments'],['Wedding & Bulk Orders','Made in quantity, with care'],['Festival Specials','Seasonal sweets for celebrations']];
const P=['Kaju Katli','Motichoor Laddu','Gulab Jamun','Rasgulla','Pista Barfi','Kesar Peda','Dry Fruit Roll','Coconut Barfi','Anjeer Roll','Besan Laddu','Milk Cake','Assorted Premium Mithai Box'];
const cat=['Kaju Sweets','Laddu','Milk Sweets','Bengali Sweets','Dry Fruit Sweets','Milk Sweets','Dry Fruit Sweets','Traditional','Dry Fruit Sweets','Laddu','Milk Sweets','Gift Boxes'];
const ALIAS={'Assorted Premium Mithai Box':'assorted-mithai-box'};
const slug=s=>ALIAS[s]||s.toLowerCase().replace(/&/g,'').replace(/[^a-z]+/g,'-').replace(/^-|-$/g,'');
const CAT={'Traditional Mithai':'traditional','Dry Fruit Sweets':'dry-fruit','Kaju Sweets':'kaju','Bengali Sweets':'bengali','Milk Sweets':'milk','Motichoor & Laddu':'laddu','Chocolate Mithai':'chocolate','Premium Gift Boxes':'gift-boxes','Wedding & Bulk Orders':'wedding-bulk','Festival Specials':'festival'};
const ph=(n,c)=>`<img class="ph ${c?'pc':'pp'}" loading="lazy" width="${c?692:900}" height="${c?1160:818}" src="img/${c?'categories/cat-'+CAT[n]:'products/'+slug(n)}.webp" alt="${n}">`;
$('#cats').innerHTML=C.map((c,i)=>`<article class="card rv"><div class="phw">${ph(c[0],1)}</div><div class="b"><h3>${c[0]}</h3><p>${c[1]}</p><a class="l" href="#shop" data-c="${c[0]}">Explore Collection</a></div></article>`).join('');
const chips=['All',...new Set(cat)];let f='All';
$('#chips').innerHTML=chips.map(c=>`<button class="${c==='All'?'on':''}">${c}</button>`).join('');
function grid(){const q=$('#q').value.toLowerCase();$('#grid').innerHTML=P.map((p,i)=>({p,i})).filter(({p,i})=>(f==='All'||cat[i]===f)&&p.toLowerCase().includes(q)).map(({p,i})=>`<article class="card rv in"><div class="phw">${ph(p)}</div><div class="b"><span class="tag">Freshly prepared</span><h3>${p}</h3><p class="meta">Available in multiple sizes<br><b>Price on request</b></p><a class="btn" target="_blank" rel="noopener" href="${wa('Hello Shreeji Food Plaza, I would like to enquire about: '+p)}">Order on WhatsApp</a></div></article>`).join('')||'<p>No sweets match your search.</p>'}
$('#chips').onclick=e=>{if(e.target.tagName!=='BUTTON')return;f=e.target.textContent;document.querySelectorAll('#chips button').forEach(b=>b.classList.toggle('on',b===e.target));grid()};
$('#q').oninput=grid;grid();
$('#cats').onclick=e=>{const c=e.target.dataset.c;if(c){const m=chips.find(x=>c.includes(x.split(' ')[0]));f=m||'All';document.querySelectorAll('#chips button').forEach(b=>b.classList.toggle('on',b.textContent===f));grid()}};
/* Festival collection hidden for now (section is commented out in index.html). Re-enable together with it:
$('#fest').innerHTML=['Diwali','Raksha Bandhan','Holi','Eid','Ganesh Chaturthi','Navratri','Weddings','Anniversaries','Corporate celebrations'].map(x=>`<div><img loading="lazy" src="img/festivals/${slug(x)}.webp" alt="${x} sweets"><h3>${x}</h3></div>`).join('');
*/
const fallback='Please contact our team for current availability and details.';
const Q=['How can I place an order?','Do you offer delivery?','Do you accept same-day orders?','What box sizes are available?','Do you provide wedding return gifts?','Do you accept corporate orders?','How should mithai be stored?','What is the shelf life?','Do you offer eggless sweets?','Can I request a custom assortment?','How can I order through WhatsApp?','Do you offer pickup from the store?'];
$('#faq').innerHTML=Q.map((q,i)=>`<details><summary>${q}</summary><p>${i===10?'Message us on WhatsApp at +91 93248 45800 with the sweets and quantity you need.':i===0?'Call or WhatsApp us on +91 93248 45800, or visit the store. '+fallback:fallback}</p></details>`).join('');
/* quote form */
$('#qf').onsubmit=e=>{e.preventDefault();const f=e.target;let ok=true;['name','phone'].forEach(n=>{const i=f.elements[n],v=i.checkValidity()&&i.value.trim();i.classList.toggle('bad',!v);ok=ok&&!!v});
 const em=f.elements.email;em.classList.remove('bad');if(em.value&&!em.checkValidity()){em.classList.add('bad');ok=false}
 if(!ok)return toast('Please check the highlighted fields.');
 const d=Object.fromEntries(new FormData(f));
 open(wa(`Quotation request\nName: ${d.name}\nCompany/Family: ${d.org}\nPhone: ${d.phone}\nEmail: ${d.email}\nOccasion: ${d.occ}\nQuantity: ${d.qty}\nDelivery date: ${d.date}\nMessage: ${d.msg}`),'_blank');toast('Opening WhatsApp with your request…')};
/* reveal */
const io=!('IntersectionObserver' in window)?{observe:e=>e.classList.add('in'),unobserve(){}}:new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&(x.target.classList.add('in'),io.unobserve(x.target))),{threshold:0,rootMargin:'0px 0px -6% 0px'});
document.querySelectorAll('.sec>*,.gift .frame,.story>*,.why>div,.rev>*,.visit>*,.rv').forEach(el=>{el.classList.add('rv');io.observe(el)});
})();
