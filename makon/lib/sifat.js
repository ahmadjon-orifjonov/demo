/* MAKON — grafika sifati: «tejamkor rejim» zaif maktab kompyuterlari uchun (v3.13).
   three.min.js dan keyin, boshqa sahna fayllaridan OLDIN ulanadi.
   makon:sifat = "tejam" | "yuqori" (yo‘q bo‘lsa — videokarta nomi bo‘yicha avtomatik).
   Tejamkor rejimda: piksel zichligi 1, silliqlash (antialias) yo‘q, soyalar yo‘q,
   MeshPhysicalMaterial (clearcoat/transmission — eng og‘ir shader) → MeshStandardMaterial. */
(function(){
'use strict';
const KALIT = 'makon:sifat', SORALDI = 'makon:sifatSoraldi';
const ol = k=>{ try{ return JSON.parse(localStorage.getItem(k)); }catch(e){ return null; } };
const yoz = (k, v)=>{ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} };

function gpuNomi(){
  try{
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl') || c.getContext('experimental-webgl');
    if(!gl) return '';
    const i = gl.getExtension('WEBGL_debug_renderer_info');
    const nom = i ? gl.getParameter(i.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER);
    const yo = gl.getExtension('WEBGL_lose_context'); if(yo) yo.loseContext();
    return String(nom || '');
  }catch(e){ return ''; }
}
/* dasturiy (GPU siz) chizish yoki juda eski integratsiyalashgan grafika */
const ZAIF = /swiftshader|llvmpipe|softpipe|microsoft basic render|gdi generic|intel.*(gma|hd graphics( [2-4]\d{3})?$)|mali-4|adreno \(tm\) [2-3]\d\d/i;
let gpu = '', avto = false;
let tanlov = ol(KALIT);
if(tanlov !== 'tejam' && tanlov !== 'yuqori'){
  gpu = gpuNomi();
  const kamXotira = navigator.deviceMemory && navigator.deviceMemory <= 2;
  const kamYadro = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
  tanlov = (ZAIF.test(gpu) || kamXotira || kamYadro) ? 'tejam' : 'yuqori';
  avto = true;
}
const tejam = tanlov === 'tejam';

const S = window.MAKON_SIFAT = {
  tejam, avto,
  gpu: ()=>gpu || (gpu = gpuNomi()),
  ornat(v){ yoz(KALIT, v ? 'tejam' : 'yuqori'); location.reload(); },
  dpr: ()=>tejam ? 1 : Math.min(2, window.devicePixelRatio || 1)
};

const T = window.THREE;
if(T && tejam){
  /* renderer: dpr 1, antialias yo‘q, soyalar o‘chiq */
  const AslR = T.WebGLRenderer;
  T.WebGLRenderer = function(p){
    p = Object.assign({}, p, {antialias:false, preserveDrawingBuffer:false});
    const r = new AslR(p);
    const spr = r.setPixelRatio.bind(r);
    r.setPixelRatio = ()=>spr(1); spr(1);
    try{ Object.defineProperty(r.shadowMap, 'enabled', {get:()=>false, set(){}, configurable:true}); }catch(e){}
    return r;
  };
  T.WebGLRenderer.prototype = AslR.prototype;
  /* og‘ir fizik material → standart material */
  const FIZIK = ['clearcoat','clearcoatRoughness','clearcoatMap','clearcoatNormalMap','clearcoatNormalScale','clearcoatRoughnessMap',
    'transmission','transmissionMap','ior','reflectivity','thickness','thicknessMap','attenuationColor','attenuationDistance','sheen','specularIntensity','specularTint'];
  T.MeshPhysicalMaterial = function(p){
    p = Object.assign({}, p);
    const shaffof = p.transmission > 0;
    FIZIK.forEach(k=>delete p[k]);
    if(shaffof){ p.transparent = true; p.opacity = Math.min(p.opacity === undefined ? .35 : p.opacity, .45); p.depthWrite = false; }
    return new T.MeshStandardMaterial(p);
  };
  T.MeshPhysicalMaterial.prototype = T.MeshStandardMaterial.prototype;
}

/* Yuqori rejimda kadr tezligi past bo‘lsa — bir marta taklif qilinadi */
function olcha(){
  if(tejam || ol(SORALDI)) return;
  let kadr = 0, bosh = 0, faol = false;
  function tik(t){
    const bor = document.querySelector('#ilova canvas');
    if(!bor || document.hidden){ faol = false; kadr = 0; setTimeout(()=>requestAnimationFrame(tik), 1500); return; }
    if(!faol){ faol = true; bosh = t; kadr = 0; }
    kadr++;
    const o = t - bosh;
    if(o > 6000){
      const fps = kadr * 1000 / o;
      S.fps = Math.round(fps);
      if(fps < 24) taklif(fps); else return; /* yetarli tez — o‘lchash tugadi */
      return;
    }
    requestAnimationFrame(tik);
  }
  setTimeout(()=>requestAnimationFrame(tik), 2500);
}
function taklif(fps){
  yoz(SORALDI, 1);
  const d = document.createElement('div');
  d.className = 'sifat-taklif';
  d.setAttribute('role', 'alert');
  d.innerHTML = `<b>3D sekin ishlayapti (~${Math.round(fps)} kadr/s)</b><span>Tejamkor rejim soyalar va shisha effektlarini soddalashtirib, zaif kompyuterda tezlashtiradi. Keyin yon menyudan qaytarish mumkin.</span><div><button class="tg a kichik" data-h="1">Tejamkor rejimni yoqish</button><button class="tg o kichik" data-h="0">Kerak emas</button></div>`;
  d.addEventListener('click', e=>{ const b = e.target.closest('button'); if(!b) return; if(b.dataset.h === '1') S.ornat(true); d.remove(); });
  document.body.appendChild(d);
}
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', olcha); else olcha();
})();
