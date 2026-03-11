// ─── Translations ──────────────────────────────────────────────────────────
export type Lang = 'fr' | 'ar';

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

export const T: Record<Lang, TranslationSchema> = {
  fr: {
    appName:        'أَرامِلات',
    appSub:         'Registre de Gestion',
    allFiles:       'Toutes les fiches',
    newFile:        'Nouvelle fiche',
    quickSearch:    'Recherche rapide',
    export:         'Export Excel',
    exportBtn:      'Exporter vers Excel',
    stats: {
      aramilat:     'Veuves',
      enfants:      'Enfants',
      avecEnfants:  'Avec enfants',
      sansEnfants:  'Sans enfants',
    },
    topbarTitle:    'Registre des Veuves (Aramilat)',
    advFilters:     'Filtres avancés',
    addFilter:      '+ Ajouter un filtre',
    clearAll:       'Tout effacer',
    hide:           'Masquer',
    globalSearch:   'Recherche globale...',
    results:        (n:number) => `${n} fiche${n!==1?'s':''} trouvée${n!==1?'s':''}`,
    clickHint:      'Cliquer sur une fiche pour voir les détails',
    sortBy:         'Trier par :',
    loading:        'Chargement…',
    noResults:      'Aucun résultat',
    noResultsSub:   'Modifiez vos critères ou',
    clearFilters:   'effacez tous les filtres',
    noFiltersHint:  'Aucun filtre actif — cliquez sur + Ajouter pour commencer',
    suggestions:    [
      {label:'≥ 50 ans →',    field:'age',          op:'>=', val:'50'},
      {label:'≥ 3 enfants →', field:'nb_enfants',   op:'>=', val:'3'},
      {label:'≥ 5 ans veuvage →', field:'annees_veuvage', op:'>=', val:'5'},
      {label:'Casablanca →',  field:'adresse',      op:'LIKE',val:'Casablanca'},
    ],
    noFilter:       'Aucun filtre actif',
    whereLabel:     'CONDITION',
    andLabel:       'ET',
    activeLabel:    'actif',
    searchBtn:      'Rechercher',
    sortFields: {
      nom:'Nom', prenom:'Prénom', nb_enfants:'Enfants',
      date_naissance:'Naissance', date_deces_mari:'Décès Mari'
    },
    husband:        'Époux',
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
    noCin:          'Non spécifiée',
    husbandInfo:    'Informations du défunt époux',
    husbandFirst:   'Prénom du mari',
    husbandLast:    'Nom du mari',
    deathDate:      'Date du décès',
    notes:          'Remarques',
    children:       'Enfants',
    addChild:       'Ajouter un enfant',
    noChildren:     'Aucun enfant enregistré',
    noChildrenSub:  'Cliquez sur « Ajouter » pour enregistrer un enfant.',
    tblName:        'Nom & Prénom',
    tblSex:         'Sexe',
    tblBirth:       'Date de naissance',
    tblClothes:     'Vêtements',
    tblShoes:       'Pointure',
    tblActions:     'Actions',
    boy:            '♂ Garçon',
    girl:           '♀ Fille',
    deleteFile:     'Supprimer la fiche',
    close:          'Fermer',
    edit:           'Modifier',
    newAramila:     'Nouvelle veuve',
    editFile:       'Modifier la fiche',
    createNew:      'Créer une nouvelle fiche',
    identitySection:'Identité de la bénéficiaire',
    firstNameLbl:   'Prénom',
    lastNameLbl:    'Nom',
    dobLbl:         'Date de naissance',
    cinLbl:         'N° CIN',
    phoneLbl:       'Téléphone',
    addressLbl:     'Adresse complète',
    husbandSection: 'Informations de l\'époux',
    husbandFirstLbl:'Prénom de l\'époux',
    husbandLastLbl: 'Nom de l\'époux',
    deathDateLbl:   'Date du décès',
    notesSection:   'Notes additionnelles',
    notesLbl:       'Remarques',
    notesPlh:       'Saisir des notes libres ici...',
    cancel:         'Annuler',
    save:           'Enregistrer',
    saving:         'Enregistrement...',
    addChildTitle:  'Ajouter un enfant',
    editChildTitle: "Modifier les informations de l'enfant",
    fileOf:         (n:string) => `Dossier de ${n}`,
    selectSex:      '— Sélectionner —',
    clothes:        'Taille vêtements',
    shoes:          'Pointure (EU)',
    confirmDel:     'Confirmer la suppression',
    confirmFileDel: (name:string, n:number) => `Voulez-vous supprimer la fiche de ${name} ainsi que ses ${n} enfant(s) ?`,
    confirmChildDel:(name:string) => `Supprimer l'enfant ${name} ?`,
    confirm:        'Supprimer',
    created:        'Fiche créée avec succès ✓',
    updated:        'Fiche mise à jour ✓',
    deleted:        'Fiche supprimée',
    childAdded:     'Enfant ajouté avec succès ✓',
    childUpdated:   'Enfant mis à jour ✓',
    childDeleted:   'Enfant supprimé',
    connError:      'Erreur de connexion au serveur',
    saveError:      'Erreur lors de la sauvegarde',
    required:       'Le nom et le prénom sont obligatoires',
    exporting:      'Génération du fichier Excel...',
    schemaLabels: {
      q: 'Recherche', nom: 'Nom', prenom: 'Prénom', cin: 'CIN',
      adresse: 'Adresse', telephone: 'Téléphone', nom_mari: 'Nom du mari',
      prenom_mari: 'Prénom du mari', age: 'Âge',
      date_naissance: 'Date de naissance', date_deces_mari: 'Date décès mari',
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
    appSub:         'سجل التسيير الإداري',
    allFiles:       'جميع الملفات',
    newFile:        'إضافة ملف جديد',
    quickSearch:    'بحث سريع',
    export:         'تصدير Excel',
    exportBtn:      'تصدير البيانات إلى Excel',
    stats: {
      aramilat:     'أرملة',
      enfants:      'أطفال',
      avecEnfants:  'مع أطفال',
      sansEnfants:  'بدون أطفال',
    },
    topbarTitle:    'سجل الأرامل (أرملات)',
    advFilters:     'فلاتر متقدمة',
    addFilter:      '+ إضافة فلتر',
    clearAll:       'مسح الكل',
    hide:           'إخفاء',
    globalSearch:   'بحث شامل في قاعدة البيانات...',
    results:        (n:number) => `تم العثور على ${n} ملف${n!==1?'ات':''}`,
    clickHint:      'انقر على الملف لعرض التفاصيل الكاملة',
    sortBy:         'ترتيب حسب:',
    loading:        'جاري التحميل...',
    noResults:      'لا توجد نتائج مطابقة',
    noResultsSub:   'يرجى تغيير معايير البحث أو',
    clearFilters:   'مسح جميع الفلاتر',
    noFiltersHint:  'لا توجد فلاتر نشطة — انقر على + إضافة للبدء',
    suggestions:    [
      {label:'العمر ≥ 50 سنة →',  field:'age',          op:'>=', val:'50'},
      {label:'≥ 3 أطفال →',       field:'nb_enfants',   op:'>=', val:'3'},
      {label:'ترمّل ≥ 5 سنوات →', field:'annees_veuvage', op:'>=', val:'5'},
      {label:'الدار البيضاء →',   field:'adresse',      op:'LIKE',val:'Casablanca'},
    ],
    noFilter:       'لا يوجد فلتر نشط',
    whereLabel:     'شرط البحث',
    andLabel:       'و',
    activeLabel:    'نشط',
    searchBtn:      'بحث',
    sortFields: {
      nom:'الاسم العائلي', prenom:'الاسم الشخصي', nb_enfants:'عدد الأطفال',
      date_naissance:'تاريخ الميلاد', date_deces_mari:'تاريخ وفاة الزوج'
    },
    husband:        'الزوج',
    death:          'الوفاة',
    address:        'العنوان',
    noValue:        'غير متوفر',
    noAddress:      'العنوان غير مسجل',
    child_badge:    (n:number) => `${n} طفل`,
    identity:       'الهوية الشخصية',
    fullName:       'الاسم الكامل',
    birthDate:      'تاريخ الميلاد',
    cin:            'رقم البطاقة الوطنية',
    phone:          'رقم الهاتف',
    noCin:          'غير مسجل',
    husbandInfo:    'معلومات الزوج المتوفى',
    husbandFirst:   'اسم الزوج',
    husbandLast:    'نسب الزوج',
    deathDate:      'تاريخ الوفاة',
    notes:          'ملاحظات',
    children:       'الأبناء',
    addChild:       'إضافة ابن(ة)',
    noChildren:     'لا يوجد أطفال مسجلون',
    noChildrenSub:  'انقر على « إضافة » لتسجيل بيانات الأبناء.',
    tblName:        'الاسم الكامل',
    tblSex:         'الجنس',
    tblBirth:       'تاريخ الميلاد',
    tblClothes:     'مقاس الملابس',
    tblShoes:       'مقاس الحذاء',
    tblActions:     'إجراءات',
    boy:            '♂ ذكر',
    girl:           '♀ أنثى',
    deleteFile:     'حذف الملف النهائي',
    close:          'إغلاق',
    edit:           'تعديل',
    newAramila:     'ملف أرملة جديد',
    editFile:       'تعديل بيانات الملف',
    createNew:      'إنشاء ملف جديد',
    identitySection:'بيانات المستفيدة',
    firstNameLbl:   'الاسم الشخصي',
    lastNameLbl:    'الاسم العائلي',
    dobLbl:         'تاريخ الميلاد',
    cinLbl:         'رقم البطاقة الوطنية (CIN)',
    phoneLbl:       'رقم الهاتف',
    addressLbl:     'العنوان السكني',
    husbandSection: 'بيانات الزوج',
    husbandFirstLbl:'اسم الزوج الشخصي',
    husbandLastLbl: 'اسم الزوج العائلي',
    deathDateLbl:   'تاريخ الوفاة',
    notesSection:   'ملاحظات إضافية',
    notesLbl:       'ملاحظات',
    notesPlh:       'اكتب ملاحظات إضافية هنا...',
    cancel:         'إلغاء',
    save:           'حفظ البيانات',
    saving:         'جاري الحفظ...',
    addChildTitle:  'تسجيل ابن جديد',
    editChildTitle: 'تعديل بيانات الابن(ة)',
    fileOf:         (n:string) => `ملف المستفيدة: ${n}`,
    selectSex:      '— اختر الجنس —',
    clothes:        'مقاس الملابس',
    shoes:          'مقاس الحذاء (EU)',
    confirmDel:     'تأكيد الحذف النهائي',
    confirmFileDel: (name:string, n:number) => `هل أنت متأكد من حذف ملف ${name} مع جميع أبنائها (${n})؟`,
    confirmChildDel:(name:string) => `هل أنت متأكد من حذف بيانات ${name}؟`,
    confirm:        'تأكيد الحذف',
    created:        'تم إنشاء الملف بنجاح ✓',
    updated:        'تم تحديث البيانات بنجاح ✓',
    deleted:        'تم حذف الملف بنجاح',
    childAdded:     'تمت إضافة الابن(ة) بنجاح ✓',
    childUpdated:   'تم تحديث بيانات الابن(ة) ✓',
    childDeleted:   'تم حذف بيانات الابن(ة)',
    connError:      'خطأ في الاتصال بالسيرفر',
    saveError:      'فشل في حفظ البيانات',
    required:       'الاسم والنسب مطلوبان لإتمام العملية',
    exporting:      'جاري استخراج ملف Excel...',
    schemaLabels: {
      q: 'بحث عام', nom: 'الاسم العائلي', prenom: 'الاسم الشخصي', cin: 'البطاقة الوطنية',
      adresse: 'العنوان', telephone: 'الهاتف', nom_mari: 'نسب الزوج',
      prenom_mari: 'اسم الزوج', age: 'العمر',
      date_naissance: 'تاريخ الميلاد', date_deces_mari: 'تاريخ وفاة الزوج',
      annees_veuvage: 'سنوات الترمّل', nb_enfants: 'عدد الأطفال', notes: 'ملاحظات',
    },
    ops: {
      LIKE: 'يحتوي على', '=': 'يساوي', '!=': 'لا يساوي',
      '>=': 'أكبر من أو يساوي', '<=': 'أصغر من أو يساوي', '>': 'أكبر من', '<': 'أصغر من',
      BETWEEN: 'بين', IN: 'ضمن القائمة', 'NOT NULL': 'مسجل', NULL: 'فارغ',
    },
    dir: 'rtl',
    fontClass: 'font-arabic',
  }
};

export type Translations = TranslationSchema;