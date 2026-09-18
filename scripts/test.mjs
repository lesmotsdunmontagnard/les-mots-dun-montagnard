import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {build,poemText,loadEntries} from './build.mjs';

const original='\n\n  Éléments : "droits" \' -- ... & < >\r\n\r\nFIN\n';
const decoded=poemText(original).slice(6,-7).replace(/&#13;/g,'\r').replace(/&#10;/g,'\n').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&amp;/g,'&');
assert.equal(decoded,original,'Le texte doit être restitué caractère par caractère.');
function files(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const demo of [false,true]){
 const output=build({demo});
 for(const file of files(output).filter(f=>f.endsWith('.html'))){
  const html=fs.readFileSync(file,'utf8');
  assert.ok(!html.includes('127.0.0.1')&&!html.includes('C:/Users/'));
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
   const url=match[1].split(/[?#]/)[0];if(!url||/^[a-z]+:/i.test(url))continue;
   assert.ok(!url.startsWith('/'),'Les liens doivent fonctionner sous le nom du dépôt.');
   assert.ok(fs.existsSync(path.resolve(path.dirname(file),decodeURIComponent(url))),`Lien cassé : ${file} → ${url}`);
  }
 }
 if(demo){
  assert.ok(fs.existsSync(path.join(output,'poemes-2.html')));
  assert.ok(fs.existsSync(path.join(output,'poemes/emplacement-1.html')));
 }else{
  for(const e of loadEntries('poemes.json')) {
   const html=fs.readFileSync(path.join(output,'poemes',e.id+'.html'),'utf8');
   assert.ok(html.includes(poemText(e.texte)),'Le poème généré doit contenir son texte complet.');
  }
  assert.ok(!fs.readFileSync(path.join(output,'index.html'),'utf8').includes('Aperçu local'));
 }
}
console.log('Vérifié : fidélité du texte, pages statiques, liens relatifs, séparation aperçu/publication et pagination de démonstration.');

const {detectSignature}=await import('./detect.mjs');
const {selectPoems}=await import('../assets/catalogue.js');
assert.deepEqual(detectSignature('Titre\n\nDjamel Metref \nAt Yenni le 20 Août 2026\n\n(20 Août 1956)'),{auteur:'Djamel Metref',lieu:'At Yenni',date:'2026-08-20'});
assert.equal(detectSignature('4 septembre\nTexte sans signature').date,'');
assert.equal(detectSignature('Auteur Exemple\nParis le 31 février 2026').date,'');
const entries=[
{id:'ancien',titre:'A',texte:'',auteur:'Auteur Exemple',lieu:'Paris',date:'2026-08-01',themes:['Mémoire']},
{id:'recent',titre:'B',texte:'',auteur:'Auteur Exemple',lieu:'Paris',date:'2026-09-01',themes:['Mémoire']},
{id:'sans-date',titre:'C',texte:'',auteur:'',lieu:'',date:'',themes:['Nature']}
];
assert.deepEqual(selectPoems(entries,new URLSearchParams('auteur=Auteur+Exemple&lieu=Paris&mois=2026-09&theme=Mémoire')).map(e=>e.id),['recent']);
assert.equal(selectPoems(entries,new URLSearchParams('mois=__non_precise__')).length,1);
assert.equal(selectPoems(entries,new URLSearchParams('tri=recent'))[0].id,'recent');
assert.equal(selectPoems(entries,new URLSearchParams('tri=ancien'))[0].id,'ancien');
assert.equal(selectPoems(entries,new URLSearchParams('theme=Nature'))[0].id,'sans-date');
assert.equal(selectPoems(entries,new URLSearchParams('s=introuvable123')).length,0);
console.log('Vérifié : signatures, dates ambiguës, filtres combinés, sujets et classement chronologique.');
