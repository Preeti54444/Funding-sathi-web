/* LOADER */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const l=document.getElementById('loader');
    l.style.transition='opacity 0.6s cubic-bezier(0.4,0,0.2,1)';l.style.opacity='0';
    setTimeout(()=>{l.style.display='none';document.body.classList.add('loaded')},600);
  },1800);
});

/* NAV SCROLL with smooth transition */
const nav=document.getElementById('nav');
let lastScroll=0;
window.addEventListener('scroll',()=>{
  const currentScroll=window.scrollY;
  if(currentScroll>60){nav.classList.add('scrolled');nav.classList.remove('top')}
  else{nav.classList.remove('scrolled');nav.classList.add('top')}
  // Hide nav on scroll down, show on scroll up
  if(currentScroll>lastScroll&&currentScroll>200){nav.style.transform='translateY(-100%)'}
  else{nav.style.transform='translateY(0)'}
  lastScroll=currentScroll;
});

/* HAMBURGER with smooth animation */
function toggleMenu(){
  const ul=document.querySelector('.nav-links');
  const hamburger=document.querySelector('.hamburger');
  const isOpen=ul.classList.contains('mobile-open');
  if(isOpen){
    ul.classList.remove('mobile-open');
    hamburger.classList.remove('active');
    ul.style.cssText='';
  }else{
    ul.classList.add('mobile-open');
    hamburger.classList.add('active');
    ul.style.cssText='display:flex;flex-direction:column;position:fixed;top:76px;left:0;width:100%;background:rgba(255,255,255,0.98);backdrop-filter:blur(20px);padding:2rem;gap:1.5rem;border-bottom:1px solid var(--border);z-index:998;box-shadow:var(--shadow-lg);animation:slideDown 0.3s ease forwards;';
    document.querySelectorAll('.nav-links a').forEach(a=>{a.style.color='var(--text)';a.style.fontSize='1.1rem'});
  }
}
// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link=>{
  link.addEventListener('click',()=>{
    const ul=document.querySelector('.nav-links');
    const hamburger=document.querySelector('.hamburger');
    ul.classList.remove('mobile-open');
    hamburger.classList.remove('active');
    ul.style.cssText='';
  });
});

/* SCROLL REVEAL with stagger effect */
const io=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>{e.target.classList.add('visible')},i*100);
    }
  });
},{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
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
        const targets=[1000,100,48,6,30000],prefixes=['₹','','','','₹'],suffixes=['M+','Cr+','hr','+','M+'];
        countUp(el,targets[i],prefixes[i],suffixes[i]);
      });
      statsObserver.disconnect();
    }
  });
},{threshold:0.3});
const statsEl=document.querySelector('.about-stats');
if(statsEl)statsObserver.observe(statsEl);

/* PARALLAX EFFECT for hero */
window.addEventListener('scroll',()=>{
  const scrolled=window.pageYOffset;
  const parallax=document.querySelector('.hero-grid');
  const glow=document.querySelector('.hero-glow');
  if(parallax)parallax.style.transform=`translateY(${scrolled*0.5}px)`;
  if(glow)glow.style.transform=`translateY(${scrolled*0.3}px) scale(${1+scrolled*0.0005})`;
});

/* SMOOTH SCROLL for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{
  anchor.addEventListener('click',function(e){
    e.preventDefault();
    const target=document.querySelector(this.getAttribute('href'));
    if(target){
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

/* MAGNETIC BUTTON EFFECT */
document.querySelectorAll('.btn-burg,.btn-gold,.nav-cta').forEach(btn=>{
  btn.addEventListener('mousemove',function(e){
    const rect=this.getBoundingClientRect();
    const x=e.clientX-rect.left-rect.width/2;
    const y=e.clientY-rect.top-rect.height/2;
    this.style.transform=`translate(${x*0.1}px,${y*0.1}px)`;
  });
  btn.addEventListener('mouseleave',function(){
    this.style.transform='';
  });
});

/* FORM SUBMIT with validation and loading state */
document.querySelector('.form-submit').addEventListener('click',function(e){
  e.preventDefault();
  const btn=this;
  const form=btn.closest('form');
  const inputs=form.querySelectorAll('.form-input');
  let valid=true;
  
  // Simple validation
  inputs.forEach(input=>{
    if(!input.value.trim()){
      valid=false;
      input.style.borderColor='#ef4444';
      input.style.boxShadow='0 0 0 3px rgba(239,68,68,0.15)';
      setTimeout(()=>{
        input.style.borderColor='';
        input.style.boxShadow='';
      },2000);
    }
  });
  
  if(valid){
    btn.innerHTML='<span class="spinner"></span> Submitting...';
    btn.disabled=true;
    
    setTimeout(()=>{
      btn.innerHTML='✓ Application Submitted';
      btn.style.background='linear-gradient(135deg,#16a34a 0%,#15803d 100%)';
      btn.style.boxShadow='0 4px 15px rgba(22,163,74,0.3)';
    },1500);
  }
});