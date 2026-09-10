(() => {
'use strict';
const stage=document.querySelector('.paint-house');
if(!stage)return;
const canvas=stage.querySelector('canvas'),ctx=canvas.getContext('2d'),roller=stage.querySelector('.roller-cursor'),status=document.querySelector('.paint-status');
const before=new Image();let ready=false,previous=null,frame=0,pending=null,painted=false;
canvas.width=1672;canvas.height=941;
function reset(){if(!ready)return;ctx.globalCompositeOperation='source-over';ctx.drawImage(before,0,0,canvas.width,canvas.height);canvas.classList.remove('is-painted');stage.classList.remove('started');painted=false;previous=null;status.textContent='Your blank canvas is ready.';}
before.onload=()=>{ready=true;stage.classList.add('is-ready');reset();};
before.onerror=()=>{canvas.hidden=true;status.textContent='Enjoy the finished colour concept.';};
before.src='assets/images/home-1-before.avif';
function stroke(e){if(!ready||painted)return;const box=stage.getBoundingClientRect(),x=(e.clientX-box.left)/box.width,y=(e.clientY-box.top)/box.height;roller.style.left=x*100+'%';roller.style.top=y*100+'%';const p={x:x*canvas.width,y:y*canvas.height};ctx.globalCompositeOperation='destination-out';ctx.lineWidth=canvas.width*.075;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(previous?.x??p.x,previous?.y??p.y);ctx.lineTo(p.x,p.y);ctx.stroke();previous=p;stage.classList.add('started');}
stage.addEventListener('pointermove',e=>{pending={clientX:e.clientX,clientY:e.clientY};if(frame)return;frame=requestAnimationFrame(()=>{frame=0;if(pending)stroke(pending);});},{passive:true});
function end(){previous=null;pending=null;if(frame)cancelAnimationFrame(frame);frame=0;}
stage.addEventListener('pointerleave',end);stage.addEventListener('pointercancel',end);stage.addEventListener('pointerup',e=>{if(e.pointerType!=='mouse')end();});
document.querySelector('#paint-all').addEventListener('click',()=>{painted=true;end();canvas.classList.add('is-painted');stage.classList.add('started');status.textContent='A fresh coat. A whole new feeling.';});
document.querySelector('#paint-reset').addEventListener('click',reset);
})();
