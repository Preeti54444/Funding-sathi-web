/* LOADER */
window.addEventListener('load',()=>{
  setTimeout(()=>{
    const l=document.getElementById('loader');
    l.style.transition='opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1)';
    l.style.opacity='0';
    l.style.transform='scale(0.95)';
    setTimeout(()=>{l.style.display='none';document.body.classList.add('loaded')},800);
  },2000);
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
  const overlay=document.querySelector('.mobile-menu-overlay');
  const isOpen=ul.classList.contains('mobile-open');
  if(isOpen){
    ul.classList.remove('mobile-open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
    ul.style.cssText='';
  }else{
    ul.classList.add('mobile-open');
    hamburger.classList.add('active');
    overlay.classList.add('active');
    ul.style.cssText='display:flex;flex-direction:column;position:fixed;top:76px;left:0;width:100%;background:rgba(255,255,255,0.98);backdrop-filter:blur(20px);padding:2rem;gap:1.5rem;border-bottom:1px solid var(--border);z-index:998;box-shadow:var(--shadow-lg);animation:slideDown 0.3s ease forwards;';
    document.querySelectorAll('.nav-links a').forEach(a=>{a.style.color='var(--text)';a.style.fontSize='1.1rem'});
  }
}
// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link=>{
  link.addEventListener('click',()=>{
    const ul=document.querySelector('.nav-links');
    const hamburger=document.querySelector('.hamburger');
    const overlay=document.querySelector('.mobile-menu-overlay');
    ul.classList.remove('mobile-open');
    hamburger.classList.remove('active');
    overlay.classList.remove('active');
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
  const dur=2500,step=target/(dur/16);let cur=0;
  const easeOut=(t)=>1-Math.pow(1-t,3); // Cubic ease out
  const start=performance.now();
  const animate=(time)=>{
    const elapsed=time-start;
    const progress=Math.min(elapsed/dur,1);
    const eased=easeOut(progress);
    cur=eased*target;
    el.innerHTML=prefix+(decimals?cur.toFixed(decimals):Math.floor(cur).toLocaleString())+suffix;
    if(progress<1)requestAnimationFrame(animate);
  };
  requestAnimationFrame(animate);
}
const statsObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.astat-num').forEach((el,i)=>{
        const targets=[1000,100,48,6,30000],prefixes=['₹','','','','₹'],suffixes=['M+','Cr+','hr','+','M+'];
        setTimeout(()=>{countUp(el,targets[i],prefixes[i],suffixes[i])},i*200); // Stagger animation
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

/* BACK TO TOP BUTTON */
function scrollToTop(){
  window.scrollTo({top:0,behavior:'smooth'});
}
const backToTopBtn=document.querySelector('.back-to-top');
window.addEventListener('scroll',()=>{
  if(window.scrollY>300){
    backToTopBtn.classList.add('show');
  }else{
    backToTopBtn.classList.remove('show');
  }
});

/* FORM VALIDATION */
const form=document.querySelector('.cta-form');
if(form){
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const submitBtn=document.querySelector('.form-submit');
    const successMsg=document.querySelector('.form-success-msg');
    const errorMsgs=document.querySelectorAll('.form-error-msg');
    
    // Hide previous messages
    errorMsgs.forEach(msg=>msg.classList.remove('show'));
    successMsg.style.display='none';
    
    // Get form inputs
    const nameInput=document.querySelector('input[placeholder="Rajesh Kumar"]');
    const phoneInput=document.querySelector('input[placeholder="+91 98765 43210"]');
    const companyInput=document.querySelector('input[placeholder="Your Company Pvt. Ltd."]');
    const requirementTextarea=document.querySelector('textarea[placeholder*="funding need"]');
    
    let isValid=true;
    
    // Validate name
    if(!nameInput.value.trim()){
      nameInput.classList.add('error');
      nameInput.nextElementSibling.classList.add('show');
      isValid=false;
    }else{
      nameInput.classList.remove('error');
      nameInput.classList.add('success');
    }
    
    // Validate phone
    const phoneRegex=/^\+91\s\d{10}$/;
    if(!phoneRegex.test(phoneInput.value.trim())){
      phoneInput.classList.add('error');
      phoneInput.nextElementSibling.classList.add('show');
      isValid=false;
    }else{
      phoneInput.classList.remove('error');
      phoneInput.classList.add('success');
    }
    
    // Validate company
    if(!companyInput.value.trim()){
      companyInput.classList.add('error');
      companyInput.nextElementSibling.classList.add('show');
      isValid=false;
    }else{
      companyInput.classList.remove('error');
      companyInput.classList.add('success');
    }
    
    // Validate requirement
    if(!requirementTextarea.value.trim()){
      requirementTextarea.classList.add('error');
      requirementTextarea.nextElementSibling.classList.add('show');
      isValid=false;
    }else{
      requirementTextarea.classList.remove('error');
      requirementTextarea.classList.add('success');
    }
    
    if(isValid){
      // Show loading state
      submitBtn.classList.add('loading');
      submitBtn.disabled=true;
      
      // Simulate form submission
      setTimeout(()=>{
        submitBtn.classList.remove('loading');
        submitBtn.disabled=false;
        successMsg.style.display='block';
        form.reset();
        // Reset validation states
        document.querySelectorAll('.form-input').forEach(input=>{
          input.classList.remove('error','success');
        });
      },2000);
    }
  });
  
  // Real-time validation
  document.querySelectorAll('.form-input').forEach(input=>{
    input.addEventListener('input',()=>{
      if(input.classList.contains('error') || input.classList.contains('success')){
        input.classList.remove('error','success');
        input.nextElementSibling.classList.remove('show');
      }
    });
  });
}

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