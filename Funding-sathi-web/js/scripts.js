/* LOADER */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const l=document.getElementById('loader');
    l.style.transition='opacity 0.6s';l.style.opacity='0';
    setTimeout(()=>l.style.display='none',600);
  },1800);
});

/* NAV SCROLL */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  if(window.scrollY>60){nav.classList.add('scrolled');nav.classList.remove('top')}
  else{nav.classList.remove('scrolled');nav.classList.add('top')}
});

/* HAMBURGER */
function toggleMenu(){
  const ul=document.querySelector('.nav-links');
  const open=ul.style.display==='flex';
  ul.style.cssText=open?'':'display:flex;flex-direction:column;position:fixed;top:72px;left:0;width:100%;background:#F5F0EB;padding:1.5rem 2.5rem;gap:1.2rem;border-bottom:1px solid #D5CCC4;z-index:998;';
  if(!open) document.querySelectorAll('.nav-links a').forEach(a=>{a.style.color='#1E1E1E'});
}

/* SCROLL REVEAL */
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible')}});
},{threshold:0.07});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>io.observe(el));

/* COUNT UP */
function countUp(el,target,prefix='',suffix='',decimals=0){
  const dur=2000,step=target/(dur/16);let cur=0;
  const t=setInterval(()=>{
    cur=Math.min(cur+step,target);
    el.innerHTML=prefix+(decimals?cur.toFixed(decimals):Math.floor(cur).toLocaleString())+suffix;
    if(cur>=target)clearInterval(t);
  },16);
}
const statsObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.astat-num').forEach((el,i)=>{
        const targets=[1000,100,48,6],prefixes=['₹','','',''],suffixes=['M+','Cr+','hr','+'];
        countUp(el,targets[i],prefixes[i],suffixes[i]);
      });
      statsObserver.disconnect();
    }
  });
},{threshold:0.3});
const statsEl=document.querySelector('.about-stats');
if(statsEl)statsObserver.observe(statsEl);

/* FORM SUBMIT */
document.querySelector('.form-submit').addEventListener('click',function(){
  this.textContent='✓ Submitted — We\'ll contact you within 24hrs';
  this.style.background='#1a6b3a';
  this.disabled=true;
});