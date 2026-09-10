(() => {
'use strict';
const fine=matchMedia('(hover: hover) and (pointer: fine)').matches;
for(const tab of document.querySelectorAll('.room-tabs [role=tab]'))if(fine)tab.addEventListener('pointerenter',()=>tab.click());
for(const card of document.querySelectorAll('.brief-flip')){
 const flip=()=>{const on=card.getAttribute('aria-pressed')!=='true';card.setAttribute('aria-pressed',String(on));card.classList.toggle('is-flipped',on);};
 card.addEventListener('click',flip);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();flip();}});
}
const comparison=document.querySelector('.comparison-frame');
for(const button of document.querySelectorAll('[data-compare]')){
 const show=()=>{const after=button.dataset.compare==='after';comparison.classList.toggle('show-after',after);document.querySelectorAll('[data-compare]').forEach(b=>{const active=b===button;b.classList.toggle('selected',active);b.setAttribute('aria-pressed',String(active));});document.querySelector('.comparison-state').textContent=after?'After · Coastal turquoise':'Before · Soft grey';};
 button.addEventListener('click',show);button.addEventListener('focus',show);if(fine)button.addEventListener('pointerenter',show);
}
for(const card of document.querySelectorAll('.roll-card'))card.addEventListener('click',()=>{const active=card.getAttribute('aria-pressed')!=='true';card.setAttribute('aria-pressed',String(active));card.classList.toggle('is-painted',active);});
})();
