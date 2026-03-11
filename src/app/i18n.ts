// ─── Translations ──────────────────────────────────────────────────────────
export type Lang = 'fr' | 'ar';

// 1. Define the Interface to allow any string for the keys
export interface TranslationSchema {
  appName: string;
  appSub: string;
  allFiles: string;
  newFile: string;
  quickSearch: string;
  export: string;
  exportBtn: string;
  stats: {
    aramilat: string;
    enfants: string;
    avecEnfants: string;
    sansEnfants: string;
  };
  topbarTitle: string;
  advFilters: string;
  addFilter: string;
  clearAll: string;
  hide: string;
  globalSearch: string;
  results: (n: number) => string;
  clickHint: string;
  sortBy: string;
  loading: string;
  noResults: string;
  noResultsSub: string;
  clearFilters: string;
  noFiltersHint: string;
  suggestions: Array<{ label: string; field: string; op: string; val: string }>;
  noFilter: string;
  whereLabel: string;
  andLabel: string;
  activeLabel: string;
  searchBtn: string;
  sortFields: {
    nom: string; prenom: string; nb_enfants: string;
    date_naissance: string; date_deces_mari: string;
  };
  husband: string;
  death: string;
  address: string;
  noValue: string;
  noAddress: string;
  child_badge: (n: number) => string;
  identity: string;
  fullName: string;
  birthDate: string;
  cin: string;
  phone: string;
  noCin: string;
  husbandInfo: string;
  husbandFirst: string;
  husbandLast: string;
  deathDate: string;
  notes: string;
  children: string;
  addChild: string;
  noChildren: string;
  noChildrenSub: string;
  tblName: string;
  tblSex: string;
  tblBirth: string;
  tblClothes: string;
  tblShoes: string;
  tblActions: string;
  boy: string;
  girl: string;
  deleteFile: string;
  close: string;
  edit: string;
  newAramila: string;
  editFile: string;
  createNew: string;
  identitySection: string;
  firstNameLbl: string;
  lastNameLbl: string;
  dobLbl: string;
  cinLbl: string;
  phoneLbl: string;
  addressLbl: string;
  husbandSection: string;
  husbandFirstLbl: string;
  husbandLastLbl: string;
  deathDateLbl: string;
  notesSection: string;
  notesLbl: string;
  notesPlh: string;
  cancel: string;
  save: string;
  saving: string;
  addChildTitle: string;
  editChildTitle: string;
  fileOf: (n: string) => string;
  selectSex: string;
  clothes: string;
  shoes: string;
  confirmDel: string;
  confirmFileDel: (name: string, n: number) => string;
  confirmChildDel: (name: string) => string;
  confirm: string;
  created: string;
  updated: string;
  deleted: string;
  childAdded: string;
  childUpdated: string;
  childDeleted: string;
  connError: string;
  saveError: string;
  required: string;
  exporting: string;
  schemaLabels: { [key: string]: string };
  ops: { [key: string]: string };
  dir: 'ltr' | 'rtl';
  fontClass: string;
}

// 2. Map the languages to the Schema
export const T: Record<Lang, TranslationSchema> = {
  fr: {
    appName:        'أَرامِلات',
    appSub:         'Registre de Gestion',
    allFiles:       'Toutes les fiches',
    newFile:        'Nouvelle fiche',
    quickSearch:    'Recherche rapide',
    export:         'Export Excel',
    exportBtn:      'Exporter en Excel',
    stats: {
      aramilat:     'Aramilat',
      enfants:      'Enfants',
      avecEnfants:  'Avec enfants',
      sansEnfants:  'Sans enfants',
    },
    topbarTitle:    'Registre des Aramilat',
    advFilters:     'Filtres avancés',
    addFilter:      '+ Ajouter un filtre',
    clearAll:       'Tout effacer',
    hide:           'Masquer',
    globalSearch:   'Recherche globale dans toutes les informations…',
    results:        (n:number) => `${n} fiche${n!==1?'s':''} trouvée${n!==1?'s':''}`,
    clickHint:      'Cliquer sur une fiche pour voir les détails',
    sortBy:         'Trier par :',
    loading:        'Chargement…',
    noResults:      'Aucun résultat',
    noResultsSub:   'Modifiez vos critères ou',
    clearFilters:   'effacez tous les filtres',
    noFiltersHint:  'Aucun filtre — cliquez sur + Ajouter un filtre pour commencer',
    suggestions:    [
      {label:'≥ 50 ans →',    field:'age',          op:'>=', val:'50'},
      {label:'≥ 3 enfants →', field:'nb_enfants',   op:'>=', val:'3'},
      {label:'≥ 5 ans veuvage →', field:'annees_veuvage', op:'>=', val:'5'},
      {label:'Casablanca →',  field:'adresse',      op:'LIKE',val:'Casablanca'},
    ],
    noFilter:       'Aucun filtre actif',
    whereLabel:     'WHERE',
    andLabel:       'ET',
    activeLabel:    'actif',
    searchBtn:      'Rechercher',
    sortFields: {
      nom:'Nom', prenom:'Prénom', nb_enfants:'Enfants',
      date_naissance:'Naissance', date_deces_mari:'Décès'
    },
    husband:        'Mari',
    death:          'Décès',
    address:        'Adresse',
    noValue:        'Non renseigné',
    noAddress:      'Non renseignée',
    child_badge:    (n:number) => `${n} enfant${n!==1?'s':''}`,
    identity:       'Identité',
    fullName:       'Nom complet',
    birthDate:      'Date de naissance',
    cin:            'CIN',
    phone:          'Téléphone',
    noCin:          '—',
    husbandInfo:    'Informations du mari',
    husbandFirst:   'Prénom du mari',
    husbandLast:    'Nom du mari',
    deathDate:      'Date du décès',
    notes:          'Notes',
    children:       'Enfants',
    addChild:       'Ajouter',
    noChildren:     'Aucun enfant enregistré',
    noChildrenSub:  'Cliquez sur « Ajouter » pour commencer.',
    tblName:        'Nom & Prénom',
    tblSex:         'Sexe',
    tblBirth:       'Naissance',
    tblClothes:     'Vêtements',
    tblShoes:       'Pointure',
    tblActions:     'Actions',
    boy:            '♂ Garçon',
    girl:           '♀ Fille',
    deleteFile:     'Supprimer la fiche',
    close:          'Fermer',
    edit:           'Modifier',
    newAramila:     'Nouvelle aramila',
    editFile:       'Modifier la fiche',
    createNew:      'Créer une nouvelle fiche',
    identitySection:'Identité',
    firstNameLbl:   'Prénom',
    lastNameLbl:    'Nom',
    dobLbl:         'Date de naissance',
    cinLbl:         'CIN',
    phoneLbl:       'Téléphone',
    addressLbl:     'Adresse',
    husbandSection: 'Informations du mari',
    husbandFirstLbl:'Prénom du mari',
    husbandLastLbl: 'Nom du mari',
    deathDateLbl:   'Date du décès',
    notesSection:   'Notes',
    notesLbl:       'Remarques',
    notesPlh:       'Notes libres…',
    cancel:         'Annuler',
    save:           'Enregistrer',
    saving:         'Enregistrement…',
    addChildTitle:  'Ajouter un enfant',
    editChildTitle: "Modifier l'enfant",
    fileOf:         (n:string) => `Fiche de ${n}`,
    selectSex:      '— Sélectionner —',
    clothes:        'Vêtements',
    shoes:          'Pointure EU',
    confirmDel:     'Confirmer la suppression',
    confirmFileDel: (name:string, n:number) => `Supprimer la fiche de ${name} et ses ${n} enfant(s) ?`,
    confirmChildDel:(name:string) => `Supprimer l'enfant ${name} ?`,
    confirm:        'Supprimer',
    created:        'Fiche créée ✓',
    updated:        'Fiche mise à jour ✓',
    deleted:        'Fiche supprimée',
    childAdded:     'Enfant ajouté ✓',
    childUpdated:   'Enfant mis à jour ✓',
    childDeleted:   'Enfant supprimé',
    connError:      'Erreur de connexion',
    saveError:      'Erreur lors de la sauvegarde',
    required:       'Nom et prénom requis',
    exporting:      'Export en cours…',
    schemaLabels: {
      q: 'Recherche globale', nom: 'Nom', prenom: 'Prénom', cin: 'CIN',
      adresse: 'Adresse', telephone: 'Téléphone', nom_mari: 'Nom du mari',
      prenom_mari: 'Prénom du mari', age: 'Âge (aramila)',
      date_naissance: 'Date de naissance', date_deces_mari: 'Date décès du mari',
      annees_veuvage: 'Années de veuvage', nb_enfants: "Nombre d'enfants", notes: 'Notes',
    },
    ops: {
      LIKE: 'contient', '=': 'égal à', '!=': 'différent de',
      '>=': '≥', '<=': '≤', '>': '>', '<': '<',
      BETWEEN: 'entre', IN: 'dans', 'NOT NULL': 'renseigné', NULL: 'vide',
    },
    dir: 'ltr',
    fontClass: 'font-latin',
  },
  ar: {
    appName:        'أَرامِلات',
    appSub:         'سجل الإدارة',
    allFiles:       'جميع الملفات',
    newFile:        'ملف جديد',
    quickSearch:    'بحث سريع',
    export:         'تصدير Excel',
    exportBtn:      'تصدير إلى Excel',
    stats: {
      aramilat:     'أرملة',
      enfants:      'أطفال',
      avecEnfants:  'مع أطفال',
      sansEnfants:  'بدون أطفال',
    },
    topbarTitle:    'سجل الأراملة',
    advFilters:     'فلاتر متقدمة',
    addFilter:      '+ إضافة فلتر',
    clearAll:       'مسح الكل',
    hide:           'إخفاء',
    globalSearch:   'بحث عام في جميع المعلومات…',
    results:        (n:number) => `${n} ملف${n!==1?'ات':''} وُجد`,
    clickHint:      'انقر على ملف لعرض التفاصيل',
    sortBy:         'ترتيب حسب :',
    loading:        'جاري التحميل…',
    noResults:      'لا توجد نتائج',
    noResultsSub:   'غيّر معايير البحث أو',
    clearFilters:   'امسح جميع الفلاتر',
    noFiltersHint:  'لا فلاتر — انقر على + إضافة فلتر للبدء',
    suggestions:    [
      {label:'العمر ≥ 50 →',      field:'age',          op:'>=', val:'50'},
      {label:'≥ 3 أطفال →',       field:'nb_enfants',   op:'>=', val:'3'},
      {label:'ترمّل ≥ 5 سنوات →', field:'annees_veuvage', op:'>=', val:'5'},
      {label:'الدار البيضاء →',   field:'adresse',      op:'LIKE',val:'Casablanca'},
    ],
    noFilter:       'لا فلتر نشط',
    whereLabel:     'حيث',
    andLabel:       'و',
    activeLabel:    'نشط',
    searchBtn:      'بحث',
    sortFields: {
      nom:'الاسم', prenom:'اللقب', nb_enfants:'الأطفال',
      date_naissance:'الميلاد', date_deces_mari:'الوفاة'
    },
    husband:        'الزوج',
    death:          'الوفاة',
    address:        'العنوان',
    noValue:        'غير محدد',
    noAddress:      'غير محددة',
    child_badge:    (n:number) => `${n} طفل`,
    identity:       'الهوية',
    fullName:       'الاسم الكامل',
    birthDate:      'تاريخ الميلاد',
    cin:            'البطاقة الوطنية',
    phone:          'الهاتف',
    noCin:          '—',
    husbandInfo:    'معلومات الزوج',
    husbandFirst:   'اسم الزوج',
    husbandLast:    'لقب الزوج',
    deathDate:      'تاريخ الوفاة',
    notes:          'ملاحظات',
    children:       'الأطفال',
    addChild:       'إضافة',
    noChildren:     'لا أطفال مسجلون',
    noChildrenSub:  'انقر على « إضافة » للبدء.',
    tblName:        'الاسم واللقب',
    tblSex:         'الجنس',
    tblBirth:       'الميلاد',
    tblClothes:     'الملابس',
    tblShoes:       'المقاس',
    tblActions:     'الإجراءات',
    boy:            '♂ ولد',
    girl:           '♀ بنت',
    deleteFile:     'حذف الملف',
    close:          'إغلاق',
    edit:           'تعديل',
    newAramila:     'أرملة جديدة',
    editFile:       'تعديل الملف',
    createNew:      'إنشاء ملف جديد',
    identitySection:'الهوية الشخصية',
    firstNameLbl:   'الاسم',
    lastNameLbl:    'اللقب',
    dobLbl:         'تاريخ الميلاد',
    cinLbl:         'رقم البطاقة الوطنية',
    phoneLbl:       'الهاتف',
    addressLbl:     'العنوان',
    husbandSection: 'معلومات الزوج',
    husbandFirstLbl:'اسم الزوج',
    husbandLastLbl: 'لقب الزوج',
    deathDateLbl:   'تاريخ الوفاة',
    notesSection:   'ملاحظات',
    notesLbl:       'ملاحظات',
    notesPlh:       'ملاحظات حرة…',
    cancel:         'إلغاء',
    save:           'حفظ',
    saving:         'جاري الحفظ…',
    addChildTitle:  'إضافة طفل',
    editChildTitle: 'تعديل الطفل',
    fileOf:         (n:string) => `ملف ${n}`,
    selectSex:      '— اختر —',
    clothes:        'الملابس',
    shoes:          'مقاس الحذاء',
    confirmDel:     'تأكيد الحذف',
    confirmFileDel: (name:string, n:number) => `حذف ملف ${name} و${n} طفل(أطفال)؟`,
    confirmChildDel:(name:string) => `حذف الطفل ${name}؟`,
    confirm:        'حذف',
    created:        'تم إنشاء الملف ✓',
    updated:        'تم تحديث الملف ✓',
    deleted:        'تم حذف الملف',
    childAdded:     'تمت إضافة الطفل ✓',
    childUpdated:   'تم تحديث الطفل ✓',
    childDeleted:   'تم حذف الطفل',
    connError:      'خطأ في الاتصال',
    saveError:      'خطأ في الحفظ',
    required:       'الاسم واللقب مطلوبان',
    exporting:      'جاري التصدير…',
    schemaLabels: {
      q: 'بحث عام', nom: 'الاسم', prenom: 'اللقب', cin: 'البطاقة الوطنية',
      adresse: 'العنوان', telephone: 'الهاتف', nom_mari: 'اسم الزوج',
      prenom_mari: 'لقب الزوج', age: 'العمر',
      date_naissance: 'تاريخ الميلاد', date_deces_mari: 'تاريخ وفاة الزوج',
      annees_veuvage: 'سنوات الترمّل', nb_enfants: 'عدد الأطفال', notes: 'ملاحظات',
    },
    ops: {
      LIKE: 'يحتوي', '=': 'يساوي', '!=': 'لا يساوي',
      '>=': '≥', '<=': '≤', '>': '>', '<': '<',
      BETWEEN: 'بين', IN: 'ضمن', 'NOT NULL': 'محدد', NULL: 'فارغ',
    },
    dir: 'rtl',
    fontClass: 'font-arabic',
  }
};

// 3. Export the general type for use in Page components
export type Translations = TranslationSchema;