/* Refonte home V1 — selected work */
(function(){
  const stage = document.getElementById('featuredStage');
  if(!stage || typeof DATA === 'undefined') return;

  const ids = ['ripple','biscuiterie','moka','yogatrail','kaapsul','primeur','altitude86'];
  const chosen = ids.map(id=>DATA.find(p=>p.id===id)).filter(Boolean);
  if(!chosen.length){ stage.closest('.featured')?.remove(); return; }

  stage.innerHTML = chosen.map((p,i)=>{
    const image = p.imgs?.[0]?.src || '';
    const label = (typeof LABELS!=='undefined' && LABELS[p.case]) ? LABELS[p.case] : p.case;
    return `<article class="f-project" data-id="${p.id}">
      <button class="f-sticky" type="button" aria-label="Voir le projet ${p.titre}">
        <span class="f-media"><img src="${image}" alt="" loading="${i<2?'eager':'lazy'}" decoding="async"></span>
        <span class="f-index">${String(i+1).padStart(2,'0')} / ${String(chosen.length).padStart(2,'0')}</span>
        <span class="f-meta">
          <span>
            <span class="f-kicker">${label}</span>
            <span class="f-title">${p.titre}</span>
          </span>
          <span class="f-open" aria-hidden="true">+</span>
        </span>
      </button>
    </article>`;
  }).join('');

  stage.addEventListener('click', e=>{
    const a=e.target.closest('.f-project'); if(!a) return;
    const p=DATA.find(x=>x.id===a.dataset.id); if(!p) return;
    if(p.demo){ sweep(p.titre,()=>{window.location.href=p.demo;}); return; }
    if(p.direct && p.url){ window.location.href=p.url; return; }
    sweep(p.titre,()=>open(p.id,a.querySelector('.f-sticky')));
  });

  if(typeof gsap==='undefined' || typeof ScrollTrigger==='undefined' || REDUCED) return;

  gsap.utils.toArray('.f-project').forEach((el,i)=>{
    const img=el.querySelector('img');
    const title=el.querySelector('.f-title');
    const kicker=el.querySelector('.f-kicker');
    gsap.fromTo(img,{scale:1.12,yPercent:i%2?-3:3},{scale:1.01,yPercent:i%2?3:-3,ease:'none',
      scrollTrigger:{trigger:el,start:'top bottom',end:'bottom top',scrub:.8}});
    gsap.fromTo(title,{yPercent:32,opacity:.2},{yPercent:-8,opacity:1,ease:'none',
      scrollTrigger:{trigger:el,start:'top 82%',end:'top 24%',scrub:.55}});
    gsap.fromTo(kicker,{opacity:0,x:i%2?30:-30},{opacity:1,x:0,ease:'none',
      scrollTrigger:{trigger:el,start:'top 72%',end:'top 42%',scrub:.45}});
  });
  ScrollTrigger.refresh();
})();