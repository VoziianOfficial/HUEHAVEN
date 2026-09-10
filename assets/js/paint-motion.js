(() => {
'use strict';
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sections=[...document.querySelectorAll('.paint-section,.paint-values,.offer-section,.perspectives-section')];
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>{entries.forEach(({target,isIntersecting})=>target.classList.toggle('is-inview',isIntersecting));},{rootMargin:'80px'});sections.forEach(s=>observer.observe(s));}else sections.forEach(s=>s.classList.add('is-inview'));
if(reduced||!matchMedia('(hover: hover) and (pointer: fine)').matches)return;
for(const card of document.querySelectorAll('.service-tile,.card,.photo-card,.finish-card,.exposure-card,.offer-card,.story-card')){
 let bounds=null,raf=0,pointer=null;
 card.addEventListener('pointerenter',()=>{bounds=card.getBoundingClientRect();});
 card.addEventListener('pointermove',e=>{if(!bounds)return;pointer=e;if(raf)return;raf=requestAnimationFrame(()=>{raf=0;if(!bounds||!pointer)return;const x=Math.max(-1,Math.min(1,(pointer.clientX-bounds.left)/bounds.width*2-1));const y=Math.max(-1,Math.min(1,(pointer.clientY-bounds.top)/bounds.height*2-1));card.style.setProperty('--tilt-x',(-y*1.6).toFixed(2)+'deg');card.style.setProperty('--tilt-y',(x*1.6).toFixed(2)+'deg');});});
 card.addEventListener('pointerleave',()=>{bounds=null;pointer=null;if(raf)cancelAnimationFrame(raf);raf=0;card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
}
})();
