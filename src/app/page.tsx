'use client';
import { useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { T, type Lang, type Translations } from './i18n';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/* ── Types ─────────────────────────────────────── */
interface Aramila { id:string;nom:string;prenom:string;date_naissance?:string;cin?:string;date_deces_mari?:string;nom_mari?:string;prenom_mari?:string;adresse?:string;telephone?:string;notes?:string;nb_enfants?:number; }
interface Enfant { id:string;aramila_id:string;nom:string;prenom:string;sexe?:string;date_naissance?:string;taille_vetements?:string;taille_chaussures?:string; }
interface Stats { total_aramilat:number;total_enfants:number;avec_enfants:number;sans_enfants:number; }
interface FieldSchema { key:string;label:string;type:'text'|'number'|'date';ops:string[]; }
interface FilterRow { id:string;field:string;op:string;val:string;val2:string; }
type Toast = {msg:string;type:'ok'|'err'|'info'}|null;

const emptyA=():Partial<Aramila>=>({nom:'',prenom:'',date_naissance:'',cin:'',date_deces_mari:'',nom_mari:'',prenom_mari:'',adresse:'',telephone:'',notes:''});
const emptyE=():Partial<Enfant>=>({nom:'',prenom:'',sexe:'',date_naissance:'',taille_vetements:'',taille_chaussures:''});
const uid=()=>Math.random().toString(36).slice(2);

/* ── Icons ─────────────────────────────────────── */
const Ic=(d:string,w=14)=><svg width={w} height={w} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" dangerouslySetInnerHTML={{__html:d}}/>;
const I={
  search: Ic('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',15),
  plus:   Ic('<path d="M12 5v14M5 12h14"/>'),
  edit:   Ic('<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/>',13),
  trash:  Ic('<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',13),
  export: Ic('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>'),
  child:  Ic('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'),
  user:   Ic('<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  cal:    Ic('<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',13),
  heart:  Ic('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',13),
  home:   Ic('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',13),
  phone:  Ic('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',13),
  note:   Ic('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',13),
  shoe:   Ic('<path d="M2 18h20v2H2zM3 13l3-8h7l3 5h5v3H3z"/>',13),
  shirt:  Ic('<path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.57a2 2 0 0 0-1.34-2.23z"/>',13),
  filter: Ic('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),
  check:  Ic('<polyline points="20 6 9 17 4 12"/>',15),
  x:      Ic('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',13),
  eye:    Ic('<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>'),
  id:     Ic('<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',13),
  zap:    Ic('<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',13),
  back:   Ic('<path d="M19 12H5M12 19l-7-7 7-7"/>',14),
  arrowR: Ic('<path d="M5 12h14M12 5l7 7-7 7"/>',13),
};

const ini=(n='',p='')=>((p[0]||'')+(n[0]||'')).toUpperCase()||'?';
const fmt=(d?:string)=>{if(!d)return'—';const[y,m,dd]=d.split('-');return dd&&m?`${dd}/${m}/${y}`:d;};

/* ── Op meta ─────────────────────────────────────── */
const OP_META:Record<string,{color:string;bg:string;needsVal:boolean;needsVal2:boolean}>={
  'LIKE':{color:'#1565A8',bg:'#E3F0FF',needsVal:true,needsVal2:false},
  '=':{color:'#2D6A4F',bg:'#E3F7EE',needsVal:true,needsVal2:false},
  '!=':{color:'#7B341E',bg:'#FEF0E6',needsVal:true,needsVal2:false},
  '>=':{color:'#553C9A',bg:'#EDE9FF',needsVal:true,needsVal2:false},
  '<=':{color:'#553C9A',bg:'#EDE9FF',needsVal:true,needsVal2:false},
  '>':{color:'#276749',bg:'#E3F7EE',needsVal:true,needsVal2:false},
  '<':{color:'#276749',bg:'#E3F7EE',needsVal:true,needsVal2:false},
  'BETWEEN':{color:'#C05621',bg:'#FEF0E6',needsVal:true,needsVal2:true},
  'IN':{color:'#2B6CB0',bg:'#EBF8FF',needsVal:true,needsVal2:false},
  'NOT NULL':{color:'#276749',bg:'#E3F7EE',needsVal:false,needsVal2:false},
  'NULL':{color:'#744210',bg:'#FFFFF0',needsVal:false,needsVal2:false},
};

/* ── Islamic SVG Logo ────────────────────────────── */
const IslamicLogo=({size=52}:{size?:number})=>(
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,4 61,35 94,35 68,56 78,88 50,68 22,88 32,56 6,35 39,35"
      fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1"/>
    <path d="M50 15 L57 35 L77 28 L64 44 L84 50 L64 56 L77 72 L57 65 L50 85 L43 65 L23 72 L36 56 L16 50 L36 44 L23 28 L43 35 Z"
      fill="rgba(196,154,34,0.12)" stroke="rgba(196,154,34,0.65)" strokeWidth="1.2"/>
    <polygon points="50,26 62,32 68,44 62,56 50,62 38,56 32,44 38,32"
      fill="rgba(196,154,34,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8"/>
    <circle cx="50" cy="50" r="14" fill="rgba(196,154,34,0.18)" stroke="rgba(196,154,34,0.75)" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="9" fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth="0.8" strokeDasharray="2,2"/>
    <circle cx="50" cy="50" r="4" fill="rgba(255,215,100,0.9)"/>
    {[[50,22],[78,50],[50,78],[22,50]].map(([cx,cy],i)=>(
      <polygon key={i} points={`${cx},${cy-5} ${cx+4},${cy} ${cx},${cy+5} ${cx-4},${cy}`}
        fill="rgba(196,154,34,0.55)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5"/>
    ))}
    {[[71,29],[71,71],[29,71],[29,29]].map(([cx,cy],i)=>(
      <polygon key={i+4} points={`${cx},${cy-3.5} ${cx+2.5},${cy} ${cx},${cy+3.5} ${cx-2.5},${cy}`}
        fill="rgba(255,215,100,0.3)"/>
    ))}
  </svg>
);

/* ── Language Switcher ───────────────────────────── */
const LangSwitch=({lang,onChange}:{lang:Lang;onChange:(l:Lang)=>void})=>(
  <div className="lang-switch">
    <button className={`lang-btn${lang==='fr'?' active':''}`} onClick={()=>onChange('fr')}>
      <div className="lang-btn-fr">
        <span className="lang-code">FR</span>
        <span className="lang-label">Français</span>
      </div>
    </button>
    <span className="lang-sep"/>
    <button className={`lang-btn${lang==='ar'?' active':''}`} onClick={()=>onChange('ar')}>
      <div className="lang-btn-ar">
        <span className="lang-label-ar">العربية</span>
        <span className="lang-sub-ar">Arabic</span>
      </div>
    </button>
  </div>
);

/* ── Skeleton Card ───────────────────────────────── */
function SkeletonCard({delay=0}:{delay?:number}) {
  return (
    <div className="skel-card" style={{animationDelay:`${delay}s`}}>
      <div className="skel-top">
        <div className="skel-av skeleton"/>
        <div className="skel-id">
          <div className="skeleton" style={{height:14,width:'70%',borderRadius:6}}/>
          <div className="skeleton" style={{height:10,width:'40%',borderRadius:6}}/>
        </div>
      </div>
      <div className="skel-meta">
        {[80,65,55].map((w,i)=>(
          <div key={i} className="skel-row">
            <div className="skeleton" style={{height:10,width:10,borderRadius:'50%',flexShrink:0}}/>
            <div className="skeleton" style={{height:10,width:50,borderRadius:6}}/>
            <div className="skeleton" style={{height:10,width:`${w}px`,borderRadius:6}}/>
          </div>
        ))}
      </div>
      <div className="skel-foot">
        <div className="skeleton" style={{height:22,width:90,borderRadius:99}}/>
        <div className="skeleton" style={{height:10,width:70,borderRadius:6,marginLeft:'auto'}}/>
      </div>
    </div>
  );
}

/* ── FormModal — Stacked modal (z:70) ────────────── */
function FormModal({title,subtitle,emoji,onClose,onSave,saving,saveLabel,children,dir='ltr',cancelLabel='Annuler'}:{
  title:string;subtitle?:string;emoji:string;onClose:()=>void;onSave:()=>void;
  saving:boolean;saveLabel:string;children:ReactNode;dir?:'ltr'|'rtl';cancelLabel?:string;
}) {
  return (
    <div className="fmodal-wrap" onClick={onClose}>
      <div className="fmodal" onClick={e=>e.stopPropagation()} dir={dir}>
        <div className="fmodal-hdr">
          <div className="fmodal-hdr-l">
            <div className="fmodal-emoji">{emoji}</div>
            <div>
              <h2 className="fmodal-title">{title}</h2>
              {subtitle&&<p className="fmodal-sub">{subtitle}</p>}
            </div>
          </div>
          <button className="fmodal-close" onClick={onClose}>{I.x}</button>
        </div>
        <div className="fmodal-body">{children}</div>
        <div className="fmodal-foot">
          <div className="fmodal-foot-back">
            <button className="btn btn-ghost btn-sm" onClick={onClose}>{I.back} {cancelLabel}</button>
          </div>
          <button className="btn btn-rose fmodal-save" onClick={onSave} disabled={saving}>
            {saving
              ? <><div className="spin" style={{width:14,height:14}}/><span>…</span></>
              : <><span>{I.check}</span><span>{saveLabel}</span></>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Field Input helper ──────────────────────────── */
function Fi({label,required,children}:{label:string;required?:boolean;children:ReactNode}) {
  return (
    <div className="fi">
      <label className="fi-label">{label}{required&&<span className="req"> *</span>}</label>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════════ */
export default function Page() {
  const [lang,setLang]           = useState<Lang>('fr');
  const t: Translations          = T[lang];
  const isAr                     = lang==='ar';

  const [list,setList]           = useState<Aramila[]>([]);
  const [stats,setStats]         = useState<Stats>({total_aramilat:0,total_enfants:0,avec_enfants:0,sans_enfants:0});
  const [schema,setSchema]       = useState<FieldSchema[]>([]);
  const [loading,setLoading]     = useState(true);
  const [quickQ,setQuickQ]       = useState('');
  const [filters,setFilters]     = useState<FilterRow[]>([]);
  const [showBuilder,setShowBuilder] = useState(false);

  // Popup stack: detail → form
  const [popup,setPopup]         = useState<Aramila|null>(null);
  const [popEnf,setPopEnf]       = useState<Enfant[]>([]);
  const [popLoad,setPopLoad]     = useState(false);

  // Form modals (stacked above popup)
  const [showFormA,setShowFormA] = useState(false);
  const [showFormE,setShowFormE] = useState(false);
  const [editA,setEditA]         = useState<Partial<Aramila>|null>(null);
  const [editE,setEditE]         = useState<Partial<Enfant>|null>(null);

  const [confirm,setConfirm]     = useState<{msg:string;fn:()=>void}|null>(null);
  const [toast,setToast]         = useState<Toast>(null);
  const [saving,setSaving]       = useState(false);
  const [sortField,setSortField] = useState('nom');
  const [sortDir,setSortDir]     = useState<'asc'|'desc'>('asc');
  const tRef = useRef<ReturnType<typeof setTimeout>|undefined>(undefined);

  useEffect(()=>{
    document.documentElement.lang=lang;
    document.documentElement.dir=t.dir;
    document.documentElement.className=isAr?'lang-ar':'lang-fr';
  },[lang,t.dir,isAr]);

  const showToast=useCallback((msg:string,type:'ok'|'err'|'info'='ok')=>{
    setToast({msg,type}); clearTimeout(tRef.current);
    tRef.current=setTimeout(()=>setToast(null),3400);
  },[]);

  const buildParams=useCallback(()=>{
    const p=new URLSearchParams();
    if(quickQ) p.set('q',quickQ);
    filters.forEach(f=>{
      if(!f.field) return;
      const meta=OP_META[f.op]; if(!meta) return;
      if(!meta.needsVal){p.set(f.field,f.op);return;}
      if(!f.val) return;
      if(f.op==='BETWEEN'){if(f.val&&f.val2)p.set(f.field,`BETWEEN ${f.val},${f.val2}`);return;}
      p.set(f.field,`${f.op} ${f.val}`);
    });
    return p;
  },[quickQ,filters]);

  function sortRows(rows:Aramila[],field:string,dir:'asc'|'desc'){
    return [...rows].sort((a,b)=>{
      const va=(a as any)[field]||'',vb=(b as any)[field]||'';
      const na=Number(va),nb=Number(vb);
      const cmp=(!isNaN(na)&&!isNaN(nb))?na-nb:va.localeCompare(vb,'fr');
      return dir==='asc'?cmp:-cmp;
    });
  }

  const fetchList=useCallback(async()=>{
    setLoading(true);
    try{
      const r=await fetch(`${API}/aramilat?${buildParams()}`);
      if(r.ok){let d=await r.json();setList(sortRows(d,sortField,sortDir));}
    }catch{showToast(t.connError,'err');}
    finally{setLoading(false);}
  },[buildParams,sortField,sortDir,showToast,t.connError]);

  const fetchStats=useCallback(async()=>{
    try{const r=await fetch(`${API}/stats`);if(r.ok)setStats(await r.json());}catch{}
  },[]);

  const fetchSchema=useCallback(async()=>{
    try{const r=await fetch(`${API}/filter-schema`);if(r.ok)setSchema(await r.json());}catch{}
  },[]);

  const fetchEnf=useCallback(async(id:string)=>{
    setPopLoad(true);
    try{const r=await fetch(`${API}/aramilat/${id}/enfants`);if(r.ok)setPopEnf(await r.json());}
    catch{}finally{setPopLoad(false);}
  },[]);

  useEffect(()=>{fetchSchema();fetchStats();},[]);
  useEffect(()=>{fetchList();},[buildParams,sortField,sortDir]);

  const tSchema=schema.map(s=>({...s,label:(t.schemaLabels as any)[s.key]||s.label}));
  const schemaOf=(key:string)=>tSchema.find(s=>s.key===key);

  const addFilter=(fieldKey?:string)=>{
    const first=tSchema.find(s=>s.key===fieldKey)||tSchema[0];
    if(!first) return;
    setFilters(f=>[...f,{id:uid(),field:first.key,op:first.ops[0]||'LIKE',val:'',val2:''}]);
    setShowBuilder(true);
  };
  const removeFilter=(id:string)=>setFilters(f=>f.filter(x=>x.id!==id));
  const updateFilter=(id:string,patch:Partial<FilterRow>)=>setFilters(f=>f.map(x=>x.id===id?{...x,...patch}:x));
  const clearAll=()=>{setFilters([]);setQuickQ('');};

  const openPopup=(a:Aramila)=>{setPopup(a);setPopEnf([]);fetchEnf(a.id);};
  const closePopup=()=>{setPopup(null);setPopEnf([]);};

  /* Open form modals — keep popup visible underneath */
  const openFormA=(data:Partial<Aramila>)=>{setEditA({...data});setShowFormA(true);};
  const openFormE=(data:Partial<Enfant>)=>{setEditE({...data});setShowFormE(true);};
  const closeFormA=()=>{setShowFormA(false);setEditA(null);};
  const closeFormE=()=>{setShowFormE(false);setEditE(null);};

  /* Save aramila — returns to popup if editing existing */
  const saveA=async()=>{
    if(!editA?.nom?.trim()||!editA?.prenom?.trim()){showToast(t.required,'err');return;}
    setSaving(true);
    try{
      const isNew=!editA.id;
      const url=isNew?`${API}/aramilat`:`${API}/aramilat/${editA.id}`;
      const r=await fetch(url,{method:isNew?'POST':'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(editA)});
      if(!r.ok)throw new Error();
      const saved=await r.json();
      showToast(isNew?t.created:t.updated);
      closeFormA();
      if(!isNew && popup){
        // Refresh popup with updated data
        setPopup({...saved, nb_enfants: popup.nb_enfants});
      }
      fetchList(); fetchStats();
    }catch{showToast(t.saveError,'err');}
    finally{setSaving(false);}
  };

  /* Save enfant — returns to popup */
  const saveE=async()=>{
    if(!editE?.nom?.trim()||!editE?.prenom?.trim()){showToast(t.required,'err');return;}
    if(!popup) return;
    setSaving(true);
    try{
      const isNew=!editE.id;
      const url=isNew?`${API}/aramilat/${popup.id}/enfants`:`${API}/enfants/${editE.id}`;
      const r=await fetch(url,{method:isNew?'POST':'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(editE)});
      if(!r.ok)throw new Error();
      showToast(isNew?t.childAdded:t.childUpdated);
      closeFormE();
      // Refresh children list in open popup
      fetchEnf(popup.id); fetchStats(); fetchList();
    }catch{showToast(t.saveError,'err');}
    finally{setSaving(false);}
  };

  const delA=(a:Aramila)=>setConfirm({
    msg:t.confirmFileDel(`${a.prenom} ${a.nom}`,a.nb_enfants||0),
    fn:async()=>{await fetch(`${API}/aramilat/${a.id}`,{method:'DELETE'});showToast(t.deleted);if(popup?.id===a.id)closePopup();fetchList();fetchStats();}
  });
  const delE=(e:Enfant)=>setConfirm({
    msg:t.confirmChildDel(`${e.prenom} ${e.nom}`),
    fn:async()=>{await fetch(`${API}/enfants/${e.id}`,{method:'DELETE'});showToast(t.childDeleted);if(popup)fetchEnf(popup.id);fetchStats();fetchList();}
  });
  const doExport=()=>{window.open(`${API}/export/excel?${buildParams()}`,'_blank');showToast(t.exporting,'info');};

  const activeCount=filters.filter(f=>f.field&&(OP_META[f.op]?.needsVal?f.val:true)).length+(quickQ?1:0);

  const sqlPreview=()=>{
    const parts:string[]=[];
    if(quickQ) parts.push(`GLOBAL LIKE "${quickQ}"`);
    filters.forEach(f=>{
      if(!f.field) return;
      const sc=schemaOf(f.field); const meta=OP_META[f.op];
      if(!sc||!meta) return;
      if(!meta.needsVal){parts.push(`${sc.label} IS ${f.op}`);return;}
      if(!f.val) return;
      const opLabel=(t.ops as any)[f.op]||f.op;
      if(f.op==='BETWEEN') parts.push(`${sc.label} ${opLabel} ${f.val} ${t.andLabel} ${f.val2||'…'}`);
      else if(f.op==='IN') parts.push(`${sc.label} IN (${f.val})`);
      else parts.push(`${sc.label} ${opLabel} "${f.val}"`);
    });
    return parts.length?parts.join(` ${t.andLabel} `):t.noFilter;
  };

  const CLOTHES=['2 ans','3 ans','4 ans','5 ans','6 ans','7 ans','8 ans','9 ans','10 ans','11 ans','12 ans','14 ans','XS','S','M','L','XL','XXL'];
  const SHOES=Array.from({length:28},(_,i)=>`${i+22}`);

  return (
    <div className={`app${isAr?' rtl':''}`}>

      {/* ══ SIDEBAR ══ */}
      <aside className="sidebar">
        <div className="sb-brand">
          <div className="sb-logo-wrap"><IslamicLogo size={58}/></div>
          <h1 className="sb-title">{t.appName}</h1>
          <p className="sb-sub">{t.appSub}</p>
          <div className="sb-line"/>
        </div>
        <div className="sb-lang"><LangSwitch lang={lang} onChange={setLang}/></div>
        <nav className="sb-nav">
          <div className="sb-sec">{isAr?'التنقل':'Navigation'}</div>
          <button className="nav-btn active">{I.user}<span>{t.allFiles}</span></button>
          <button className="nav-btn" onClick={()=>openFormA(emptyA())}>{I.plus}<span>{t.newFile}</span></button>
          <div className="sb-sec" style={{marginTop:8}}>{t.quickSearch}</div>
          {tSchema.slice(0,6).map(s=>(
            <button key={s.key} className="nav-btn" onClick={()=>addFilter(s.key)}>
              {I.filter}<span>{s.label}</span>
            </button>
          ))}
          <div className="sb-sec" style={{marginTop:8}}>{t.export}</div>
          <button className="nav-btn" onClick={doExport}>{I.export}<span>{t.exportBtn}</span></button>
        </nav>
        <div className="sb-stats">
          <div className="stat-tile"><strong>{stats.total_aramilat}</strong><span>{t.stats.aramilat}</span></div>
          <div className="stat-tile"><strong>{stats.total_enfants}</strong><span>{t.stats.enfants}</span></div>
          <div className="stat-tile"><strong>{stats.avec_enfants}</strong><span>{t.stats.avecEnfants}</span></div>
          <div className="stat-tile"><strong>{stats.sans_enfants}</strong><span>{t.stats.sansEnfants}</span></div>
        </div>
      </aside>

      {/* ══ MAIN ══ */}
      <div className="main">
        <div className="topbar">
          <div className="topbar-l"><span className="topbar-title">{t.topbarTitle}</span></div>
          <div className="topbar-r">
            <button className="btn btn-outline btn-sm" onClick={()=>setShowBuilder(!showBuilder)}>
              {I.filter} {t.advFilters}{activeCount>0&&<span className="badge-count">{activeCount}</span>}
            </button>
            <button className="btn btn-gold btn-sm" onClick={doExport}>{I.export} Excel</button>
            <button className="btn btn-rose btn-sm" onClick={()=>openFormA(emptyA())}>{I.plus} {t.newFile}</button>
          </div>
        </div>

        <div className="page">
          {/* Query Builder */}
          <div className="qb-panel">
            <div className="qb-top">
              <div className="search-wrap">
                {I.search}
                <input className="search-inp" placeholder={t.globalSearch} value={quickQ}
                  onChange={e=>setQuickQ(e.target.value)} dir={t.dir}/>
                {quickQ&&<button className="search-clr" onClick={()=>setQuickQ('')}>{I.x}</button>}
              </div>
              <button className="btn btn-outline btn-sm" onClick={()=>addFilter()}>{I.plus} {t.addFilter}</button>
              {(filters.length>0||quickQ)&&<button className="btn btn-ghost btn-sm" onClick={clearAll}>{t.clearAll}</button>}
              <button className={`btn btn-sm ${showBuilder?'btn-rose':'btn-outline'}`} onClick={()=>setShowBuilder(!showBuilder)}>
                {I.zap} {showBuilder?t.hide:t.advFilters}{activeCount>0&&<span className="badge-count">{activeCount}</span>}
              </button>
            </div>
            {showBuilder&&(
              <div className="qb-body">
                <div className="sql-preview">
                  <span className="sql-kw">{t.whereLabel}</span>
                  <span className="sql-expr">{sqlPreview()}</span>
                </div>
                {filters.length===0&&(
                  <div className="qb-empty">
                    <span>{t.noFiltersHint}</span>
                    <div className="qb-suggestions">
                      {t.suggestions.map((s,i)=>(
                        <button key={i} className="qb-sug" onClick={()=>{
                          setFilters(f=>[...f,{id:uid(),field:s.field,op:s.op,val:s.val,val2:''}]);
                        }}>{s.label}</button>
                      ))}
                    </div>
                  </div>
                )}
                {filters.map((f,idx)=>{
                  const sc=schemaOf(f.field); const meta=OP_META[f.op];
                  return (
                    <div className="fr" key={f.id} style={{animationDelay:`${idx*0.04}s`}} dir="ltr">
                      <span className="fr-idx">{idx+1}</span>
                      <select className="fr-sel fr-field" value={f.field}
                        onChange={e=>{const nsc=schemaOf(e.target.value);updateFilter(f.id,{field:e.target.value,op:nsc?.ops[0]||'LIKE',val:'',val2:''});}}>
                        {tSchema.map(s=><option key={s.key} value={s.key}>{s.label}</option>)}
                      </select>
                      <select className="fr-sel fr-op" value={f.op}
                        style={{background:meta?.bg,color:meta?.color,fontWeight:700}}
                        onChange={e=>updateFilter(f.id,{op:e.target.value,val:'',val2:''})}>
                        {(sc?.ops||[]).map(op=><option key={op} value={op}>{(t.ops as any)[op]||op}</option>)}
                      </select>
                      {meta?.needsVal&&(
                        sc?.type==='date'?(
                          <><input type="date" className="fr-inp" value={f.val} onChange={e=>updateFilter(f.id,{val:e.target.value})}/>
                            {f.op==='BETWEEN'&&<><span className="fr-and">{t.andLabel}</span><input type="date" className="fr-inp" value={f.val2} onChange={e=>updateFilter(f.id,{val2:e.target.value})}/></>}</>
                        ):sc?.type==='number'?(
                          <><input type="number" className="fr-inp fr-num" placeholder="…" value={f.val} onChange={e=>updateFilter(f.id,{val:e.target.value})}/>
                            {f.op==='BETWEEN'&&<><span className="fr-and">{t.andLabel}</span><input type="number" className="fr-inp fr-num" placeholder="…" value={f.val2} onChange={e=>updateFilter(f.id,{val2:e.target.value})}/></>}</>
                        ):f.op==='IN'?(
                          <input className="fr-inp fr-wide" placeholder="val1, val2, …" value={f.val} onChange={e=>updateFilter(f.id,{val:e.target.value})}/>
                        ):(
                          <input className="fr-inp fr-wide" placeholder="…" value={f.val} onChange={e=>updateFilter(f.id,{val:e.target.value})}/>
                        )
                      )}
                      {meta&&(meta.needsVal?f.val:true)&&<span className="fr-active">{t.activeLabel}</span>}
                      <button className="fr-del" onClick={()=>removeFilter(f.id)}>{I.x}</button>
                    </div>
                  );
                })}
                {filters.length>0&&(
                  <div style={{marginTop:12,display:'flex',gap:8}}>
                    <button className="btn btn-rose btn-sm" onClick={fetchList}>{I.search} {t.searchBtn}</button>
                    <button className="btn btn-ghost btn-sm" onClick={()=>addFilter()}>{I.plus} {t.addFilter}</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results + sort */}
          <div className="results-bar">
            <span className="results-count"><strong>{list.length}</strong> {t.results(list.length).replace(/^\d+ /,'')}</span>
            <div style={{display:'flex',gap:8,alignItems:'center',flexWrap:'wrap'}}>
              <span style={{fontSize:'.75rem',color:'var(--text-muted)'}}>{t.sortBy}</span>
              {Object.entries(t.sortFields).map(([k,l])=>(
                <button key={k} className={`sort-btn${sortField===k?' active':''}`}
                  onClick={()=>{if(sortField===k)setSortDir(d=>d==='asc'?'desc':'asc');else{setSortField(k);setSortDir('asc');}}}>
                  {l}{sortField===k&&<span>{sortDir==='asc'?'↑':'↓'}</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Cards grid */}
          {loading?(
            <div className="cards">
              {Array.from({length:6},(_,i)=><SkeletonCard key={i} delay={i*0.06}/>)}
            </div>
          ):list.length===0?(
            <div className="empty">
              <div className="empty-icon">🔍</div>
              <h3>{t.noResults}</h3>
              <p>{t.noResultsSub} <button className="lnk" onClick={clearAll}>{t.clearFilters}</button>.</p>
            </div>
          ):(
            <div className="cards">
              {list.map((a,i)=>(
                <div className="acard" key={a.id} style={{animationDelay:`${Math.min(i,10)*0.04}s`}} onClick={()=>openPopup(a)}>
                  <div className="acard-top">
                    <div className="avatar">{ini(a.nom,a.prenom)}</div>
                    <div className="acard-id">
                      <div className="acard-name">{a.prenom} {a.nom}</div>
                      <div className="acard-cin">{a.cin||'—'}</div>
                    </div>
                    <div className="acard-acts" onClick={e=>e.stopPropagation()}>
                      <button className="btn-icon" title="Voir" onClick={()=>openPopup(a)}>{I.eye}</button>
                      <button className="btn-icon" title="Modifier" onClick={()=>openFormA({...a})}>{I.edit}</button>
                      <button className="btn-icon del" title="Supprimer" onClick={()=>delA(a)}>{I.trash}</button>
                    </div>
                  </div>
                  <div className="acard-meta">
                    <div className="meta-row">{I.heart}<span className="meta-lbl">{t.husband} :</span>
                      <span className={`meta-val${!a.nom_mari?' nil':''}`}>{a.nom_mari?`${a.prenom_mari||''} ${a.nom_mari}`.trim():t.noValue}</span>
                    </div>
                    <div className="meta-row">{I.cal}<span className="meta-lbl">{t.death} :</span>
                      <span className={`meta-val${!a.date_deces_mari?' nil':''}`}>{fmt(a.date_deces_mari)}</span>
                    </div>
                    <div className="meta-row">{I.home}<span className="meta-lbl">{t.address} :</span>
                      <span className={`meta-val${!a.adresse?' nil':''}`} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:150}}>{a.adresse||t.noAddress}</span>
                    </div>
                  </div>
                  <div className="acard-foot">
                    <span className="badge-enf">{I.child} {t.child_badge(a.nb_enfants||0)}</span>
                    {a.telephone&&<span style={{fontSize:'.73rem',color:'var(--text-muted)',display:'flex',gap:4,alignItems:'center'}}>{I.phone}{a.telephone}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══ DETAIL POPUP (z:60) ══ */}
      {popup&&(
        <div className="popup-wrap" onClick={closePopup}>
          <div className="popup" onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div className="popup-hdr">
              <div className="popup-av">{ini(popup.nom,popup.prenom)}</div>
              <div className="popup-hdr-info">
                <h2>{popup.prenom} {popup.nom}</h2>
                <p>
                  {popup.cin&&<span>{I.id}&nbsp;{popup.cin}</span>}
                  {popup.telephone&&<span>{I.phone}&nbsp;{popup.telephone}</span>}
                  <span>{I.child}&nbsp;{popLoad?'…':popEnf.length} {t.child_badge(popEnf.length).replace(/^\d+ /,'')}</span>
                </p>
              </div>
              <div className="popup-hdr-acts">
                <button className="btn btn-sm ghost-white" onClick={()=>openFormA({...popup})}>{I.edit} {t.edit}</button>
                <button className="btn btn-sm ghost-white" onClick={()=>openFormE(emptyE())}>{I.plus} {t.children}</button>
                <button className="popup-close" onClick={closePopup}>{I.x}</button>
              </div>
            </div>
            {/* Body */}
            <div className="popup-body">
              <div className="popup-grid">
                <div className="popup-card">
                  <div className="popup-card-title">{I.user} {t.identity}</div>
                  <div className="det-field"><span className="field-lbl">{t.fullName}</span><span className="field-val">{popup.prenom} {popup.nom}</span></div>
                  <div className="det-field"><span className="field-lbl">{t.birthDate}</span><span className={`field-val${!popup.date_naissance?' nil':''}`}>{fmt(popup.date_naissance)}</span></div>
                  <div className="det-field"><span className="field-lbl">{t.cin}</span><span className={`field-val${!popup.cin?' nil':''}`} style={{fontFamily:'var(--font-mono)',letterSpacing:'.05em'}}>{popup.cin||'—'}</span></div>
                  <div className="det-field"><span className="field-lbl">{t.phone}</span><span className={`field-val${!popup.telephone?' nil':''}`}>{popup.telephone||'—'}</span></div>
                  <div className="det-field"><span className="field-lbl">{t.address}</span><span className={`field-val${!popup.adresse?' nil':''}`}>{popup.adresse||'—'}</span></div>
                </div>
                <div className="popup-card">
                  <div className="popup-card-title">{I.heart} {t.husbandInfo}</div>
                  <div className="det-field"><span className="field-lbl">{t.husbandFirst}</span><span className={`field-val${!popup.prenom_mari?' nil':''}`}>{popup.prenom_mari||'—'}</span></div>
                  <div className="det-field"><span className="field-lbl">{t.husbandLast}</span><span className={`field-val${!popup.nom_mari?' nil':''}`}>{popup.nom_mari||'—'}</span></div>
                  <div className="det-field"><span className="field-lbl">{t.deathDate}</span><span className={`field-val${!popup.date_deces_mari?' nil':''}`}>{fmt(popup.date_deces_mari)}</span></div>
                  {popup.notes&&<div className="det-field"><span className="field-lbl">{t.notes}</span><span className="field-val notes-val">{popup.notes}</span></div>}
                </div>
              </div>

              {/* Enfants section */}
              <div className="sect-hdr">
                <div className="sect-title">{I.child} {t.children} ({popLoad?'…':popEnf.length})</div>
                <button className="btn btn-rose btn-sm" onClick={()=>openFormE(emptyE())}>{I.plus} {t.addChild}</button>
              </div>
              {popLoad?(
                <div className="loading" style={{padding:24}}><div className="spin"/></div>
              ):popEnf.length===0?(
                <div className="empty" style={{padding:'28px 16px'}}>
                  <div className="empty-icon" style={{fontSize:'1.8rem'}}>👶</div>
                  <h3 style={{fontSize:'1rem'}}>{t.noChildren}</h3>
                  <p>{t.noChildrenSub}</p>
                </div>
              ):(
                <div className="tbl-wrap"><table>
                  <thead><tr>
                    <th>{t.tblName}</th><th>{t.tblSex}</th><th>{t.tblBirth}</th>
                    <th>{t.tblClothes}</th><th>{t.tblShoes}</th>
                    <th style={{textAlign:isAr?'left':'right'}}>{t.tblActions}</th>
                  </tr></thead>
                  <tbody>{popEnf.map((e,i)=>(
                    <tr key={e.id} style={{animationDelay:`${i*0.04}s`}}>
                      <td><span style={{fontWeight:600}}>{e.prenom} {e.nom}</span></td>
                      <td>{e.sexe?<span className={`badge-sexe sexe-${e.sexe}`}>{e.sexe==='M'?t.boy:t.girl}</span>:<span style={{color:'var(--text-muted)'}}>—</span>}</td>
                      <td>{fmt(e.date_naissance)}</td>
                      <td>{e.taille_vetements?<span className="taille-tag">{I.shirt} {e.taille_vetements}</span>:<span style={{color:'var(--text-muted)'}}>—</span>}</td>
                      <td>{e.taille_chaussures?<span className="taille-tag">{I.shoe} {e.taille_chaussures}</span>:<span style={{color:'var(--text-muted)'}}>—</span>}</td>
                      <td><div style={{display:'flex',gap:5,justifyContent:isAr?'flex-start':'flex-end'}}>
                        <button className="btn-icon" onClick={()=>openFormE({...e})}>{I.edit}</button>
                        <button className="btn-icon del" onClick={()=>delE(e)}>{I.trash}</button>
                      </div></td>
                    </tr>
                  ))}</tbody>
                </table></div>
              )}
            </div>
            {/* Footer */}
            <div className="popup-foot">
              <button className="btn btn-danger btn-sm" onClick={()=>delA(popup)}>{I.trash} {t.deleteFile}</button>
              <button className="btn btn-outline btn-sm" onClick={closePopup}>{t.close}</button>
              <button className="btn btn-rose btn-sm" onClick={()=>openFormA({...popup})}>{I.edit} {t.edit}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ FORM MODAL — ARAMILA (z:70) ══ */}
      {showFormA&&editA&&(
        <FormModal
          emoji={editA.id?'✏️':'🌹'}
          title={editA.id?t.editFile:t.newAramila}
          subtitle={editA.id?`${editA.prenom||''} ${editA.nom||''}`.trim():t.createNew}
          onClose={closeFormA} onSave={saveA} saving={saving}
          saveLabel={t.save} cancelLabel={t.cancel} dir={t.dir}
        >
          {/* Section: Identité */}
          <div className="fs">
            <div className="fs-title">{I.user} {t.identitySection}</div>
            <div className="fg">
              <Fi label={t.firstNameLbl} required>
                <input className="f-inp" placeholder={t.firstNameLbl} value={editA.prenom||''}
                  onChange={e=>setEditA(a=>({...a!,prenom:e.target.value}))}/>
              </Fi>
              <Fi label={t.lastNameLbl} required>
                <input className="f-inp" placeholder={t.lastNameLbl} value={editA.nom||''}
                  onChange={e=>setEditA(a=>({...a!,nom:e.target.value}))}/>
              </Fi>
              <Fi label={t.dobLbl}>
                <input className="f-inp" type="date" value={editA.date_naissance||''}
                  onChange={e=>setEditA(a=>({...a!,date_naissance:e.target.value}))}/>
              </Fi>
              <Fi label={t.cinLbl}>
                <input className="f-inp" placeholder="A123456" value={editA.cin||''}
                  onChange={e=>setEditA(a=>({...a!,cin:e.target.value}))} style={{fontFamily:'var(--font-mono)'}}/>
              </Fi>
              <Fi label={t.phoneLbl}>
                <input className="f-inp" placeholder="06 XX XX XX XX" value={editA.telephone||''}
                  onChange={e=>setEditA(a=>({...a!,telephone:e.target.value}))}/>
              </Fi>
              <Fi label={t.addressLbl}>
                <input className="f-inp" placeholder="Ville, quartier…" value={editA.adresse||''}
                  onChange={e=>setEditA(a=>({...a!,adresse:e.target.value}))}/>
              </Fi>
            </div>
          </div>
          {/* Section: Mari */}
          <div className="fs">
            <div className="fs-title">{I.heart} {t.husbandSection}</div>
            <div className="fg">
              <Fi label={t.husbandFirstLbl}>
                <input className="f-inp" value={editA.prenom_mari||''}
                  onChange={e=>setEditA(a=>({...a!,prenom_mari:e.target.value}))}/>
              </Fi>
              <Fi label={t.husbandLastLbl}>
                <input className="f-inp" value={editA.nom_mari||''}
                  onChange={e=>setEditA(a=>({...a!,nom_mari:e.target.value}))}/>
              </Fi>
              <Fi label={t.deathDateLbl}>
                <input className="f-inp" type="date" value={editA.date_deces_mari||''}
                  onChange={e=>setEditA(a=>({...a!,date_deces_mari:e.target.value}))}/>
              </Fi>
            </div>
          </div>
          {/* Section: Notes */}
          <div className="fs">
            <div className="fs-title">{I.note} {t.notesSection}</div>
            <div className="fg c1">
              <Fi label={t.notesLbl}>
                <textarea className="f-ta" placeholder={t.notesPlh} value={editA.notes||''}
                  onChange={e=>setEditA(a=>({...a!,notes:e.target.value}))}/>
              </Fi>
            </div>
          </div>
        </FormModal>
      )}

      {/* ══ FORM MODAL — ENFANT (z:70) ══ */}
      {showFormE&&editE&&popup&&(
        <FormModal
          emoji={editE.id?'✏️':'👶'}
          title={editE.id?t.editChildTitle:t.addChildTitle}
          subtitle={t.fileOf(`${popup.prenom} ${popup.nom}`)}
          onClose={closeFormE} onSave={saveE} saving={saving}
          saveLabel={t.save} cancelLabel={t.cancel} dir={t.dir}
        >
          {/* Section: Identité */}
          <div className="fs">
            <div className="fs-title">{I.user} {t.identitySection}</div>
            <div className="fg">
              <Fi label={t.firstNameLbl} required>
                <input className="f-inp" value={editE.prenom||''}
                  onChange={e=>setEditE(x=>({...x!,prenom:e.target.value}))}/>
              </Fi>
              <Fi label={t.lastNameLbl} required>
                <input className="f-inp" value={editE.nom||''}
                  onChange={e=>setEditE(x=>({...x!,nom:e.target.value}))}/>
              </Fi>
              <Fi label={t.tblSex}>
                <select className="f-sel" value={editE.sexe||''}
                  onChange={e=>setEditE(x=>({...x!,sexe:e.target.value}))}>
                  <option value="">{t.selectSex}</option>
                  <option value="M">{t.boy}</option>
                  <option value="F">{t.girl}</option>
                </select>
              </Fi>
              <Fi label={t.birthDate}>
                <input className="f-inp" type="date" value={editE.date_naissance||''}
                  onChange={e=>setEditE(x=>({...x!,date_naissance:e.target.value}))}/>
              </Fi>
            </div>
          </div>
          {/* Section: Tailles */}
          <div className="fs">
            <div className="fs-title">{I.shirt} {t.tblClothes} & {t.tblShoes}</div>
            <div className="fg">
              <Fi label={t.clothes}>
                <select className="f-sel" value={editE.taille_vetements||''}
                  onChange={e=>setEditE(x=>({...x!,taille_vetements:e.target.value}))}>
                  <option value="">{t.selectSex}</option>
                  {CLOTHES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </Fi>
              <Fi label={t.shoes}>
                <select className="f-sel" value={editE.taille_chaussures||''}
                  onChange={e=>setEditE(x=>({...x!,taille_chaussures:e.target.value}))}>
                  <option value="">{t.selectSex}</option>
                  {SHOES.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </Fi>
            </div>
          </div>
        </FormModal>
      )}

      {/* ══ CONFIRM ══ */}
      {confirm&&(
        <div className="dlg-wrap" onClick={()=>setConfirm(null)}>
          <div className="dlg" dir={t.dir} onClick={e=>e.stopPropagation()}>
            <span className="dlg-emoji">⚠️</span>
            <h3>{t.confirmDel}</h3>
            <p>{confirm.msg}</p>
            <div className="dlg-acts">
              <button className="btn btn-outline" onClick={()=>setConfirm(null)}>{t.cancel}</button>
              <button className="btn btn-danger" onClick={()=>{confirm.fn();setConfirm(null);}}>{I.trash} {t.confirm}</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast&&(
        <div className="toasts">
          <div className={`toast ${toast.type}`}>
            <span className="toast-icon">{toast.type==='ok'?'✓':toast.type==='err'?'✕':'ℹ'}</span>
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}
