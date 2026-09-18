import {metadata,selectPoems} from './catalogue.js';
(() => {
  const menu=document.querySelector('.preview-menu'), nav=document.querySelector('#navigation');
  document.documentElement.classList.add('js');
  if(menu&&nav){menu.hidden=false;menu.addEventListener('click',()=>{const opened=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(opened));nav.classList.toggle('open',opened);});document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');menu.focus();}});}
  const data=document.querySelector('#poems-index');
  if(!data)return;
  const entries=JSON.parse(data.textContent), params=new URLSearchParams(location.search);
  document.querySelector('[data-search-tools]').hidden=false;
  document.querySelector('#search').value=params.get('s')||'';
  for(const name of ['theme','lieu','mois','tri']) {
    const field=document.querySelector(`select[name="${name}"]`);
    if(field&&params.has(name))field.value=params.get(name);
  }
  const keys=['s','theme','lieu','mois','tri','page'];
  if(!keys.some(k=>params.has(k)))return;
  const escape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const theme=params.get('theme')||'';
  const filtered=selectPoems(entries,params);
  const pages=Math.max(1,Math.ceil(filtered.length/8)),page=Math.max(1,Math.min(pages,Number.parseInt(params.get('page'),10)||1));
  const link=n=>{const p=new URLSearchParams(params);p.set('page',String(n));return 'poemes.html?'+p.toString();};
  document.querySelector('#results').innerHTML=filtered.length?`<ul class="lmdm-poem-list">${filtered.slice((page-1)*8,page*8).map(e=>`<li><p class="wp-block-post-terms">${e.themes.map(t=>`<a href="poemes.html?theme=${encodeURIComponent(t)}">${escape(t)}</a>`).join(' · ')}</p><h2 class="wp-block-post-title"><a href="poemes/${e.id}.html">${escape(e.titre)}</a></h2>${metadata(e)}<a href="poemes/${e.id}.html">Lire le poème →</a></li>`).join('')}</ul>${pages>1?`<nav class="wp-block-query-pagination" aria-label="Pagination des poèmes">${Array.from({length:pages},(_,i)=>i+1).map(n=>n===page?`<span class="page-numbers current" aria-current="page">${n}</span>`:`<a href="${escape(link(n))}">${n}</a>`).join('')}</nav>`:''}`:'<p class="lmdm-empty">Aucun poème à afficher.</p>';
  document.querySelector('#search-status').textContent=`${filtered.length} résultat${filtered.length===1?'':'s'}.`;
  document.querySelectorAll('.wp-block-categories-list a').forEach(a=>{if(new URL(a.href).searchParams.get('theme')===theme&&theme)a.setAttribute('aria-current','page');});
})();
