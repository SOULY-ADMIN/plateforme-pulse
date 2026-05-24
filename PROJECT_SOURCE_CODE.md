# PULSE Project Source Code

FILE: app.js

```javascript
const icons = {
  search: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/></svg>`,
  heart: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6c-1.9-1.7-4.8-1.5-6.5.4L12 7.5 9.7 5C8 3.1 5.1 2.9 3.2 4.6 1.1 6.5 1 9.8 2.9 11.8L12 21l9.1-9.2c1.9-2 1.8-5.3-.3-7.2Z"/></svg>`,
  bookmark: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3h12v18l-6-3.7L6 21V3Z"/></svg>`,
  open: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 17 17 7"/><path d="M8 7h9v9"/></svg>`,
  comment: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a8 8 0 0 1-8 8H7l-4 3v-5.2A8 8 0 1 1 21 12Z"/></svg>`,
  upload: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4"/><path d="m7 9 5-5 5 5"/><path d="M20 16v4H4v-4"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z"/><path d="m19 15 .8 2.7 2.7.8-2.7.8L19 21l-.8-2.7-2.7-.8 2.7-.8L19 15Z"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 19V5"/><path d="M4 19h17"/><path d="m7 15 4-4 3 3 5-7"/></svg>`,
  bell: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></svg>`,
  check: `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 12 4 4L19 6"/></svg>`,
  lock: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>`,
  menu: `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
};

const supportedLanguages = ["en", "fr", "ar", "es"];
const languageMeta = {
  en: { label: "EN", dir: "ltr", name: "English" },
  fr: { label: "FR", dir: "ltr", name: "Francais" },
  ar: { label: "AR", dir: "rtl", name: "العربية" },
  es: { label: "ES", dir: "ltr", name: "Espanol" },
};

const storedLanguage = localStorage.getItem("pulse_language");

const state = {
  liked: new Set(JSON.parse(localStorage.getItem("pulse_liked") || "[]")),
  saved: new Set(JSON.parse(localStorage.getItem("pulse_saved") || "[]")),
  language: supportedLanguages.includes(storedLanguage) ? storedLanguage : "en",
  communityLimit: 8,
  filters: {
    q: "",
    category: "All",
    type: "All",
    fabric: "All",
  },
  waitlist: JSON.parse(localStorage.getItem("pulse_waitlist") || "null"),
  inviteCode: localStorage.getItem("pulse_invite") || "",
  onboardingDone: localStorage.getItem("pulse_onboarding_done") === "true",
};

const translationRows = [
  ["PULSE - Community Streetwear Futures", "PULSE - Futurs streetwear communautaires", "PULSE - مستقبل أزياء الشارع المجتمعية", "PULSE - Futuros streetwear comunitarios"],
  ["COMMUNITY DESIGN HOUSE", "MAISON DE DESIGN COMMUNAUTAIRE", "دار تصميم مجتمعية", "CASA DE DISENO COMUNITARIA"],
  ["Language", "Langue", "اللغة", "Idioma"],
  ["Home", "Accueil", "الرئيسية", "Inicio"],
  ["Community", "Communaute", "المجتمع", "Comunidad"],
  ["Explore", "Explorer", "استكشف", "Explorar"],
  ["Submit Design", "Soumettre", "إرسال تصميم", "Enviar diseno"],
  ["Submit", "Soumettre", "إرسال", "Enviar"],
  ["Drops", "Drops", "الإصدارات", "Drops"],
  ["Shop", "Boutique", "المتجر", "Tienda"],
  ["Waitlist", "Liste", "قائمة الانتظار", "Lista"],
  ["Contact", "Contact", "تواصل", "Contacto"],
  ["Admin", "Admin", "الإدارة", "Admin"],
  ["Notifications", "Notifications", "الإشعارات", "Notificaciones"],
  ["PULSE home", "Accueil PULSE", "الرئيسية PULSE", "Inicio PULSE"],
  ["Primary", "Navigation principale", "التنقل الرئيسي", "Navegacion principal"],
  ["Mobile", "Mobile", "الجوال", "Movil"],
  ["Verified creator", "Createur verifie", "مبدع موثق", "Creador verificado"],
  ["PULSE / COMMUNITY STREETWEAR FUTURES", "PULSE / FUTURS STREETWEAR COMMUNAUTAIRES", "PULSE / مستقبل أزياء الشارع المجتمعية", "PULSE / FUTUROS STREETWEAR COMUNITARIOS"],
  ["PULSE / FUTURE GARMENTS / VOTED BY CULTURE", "PULSE / VETEMENTS FUTURS / VOTE PAR LA CULTURE", "PULSE / ملابس المستقبل / بتصويت الثقافة", "PULSE / PRENDAS FUTURAS / VOTADO POR LA CULTURA"],
  ["PULSE FEED", "FEED PULSE", "خلاصة PULSE", "FEED PULSE"],
  ["Designs submitted by creators. Drops shaped by the community.", "Des designs proposes par les createurs. Des drops faconnes par la communaute.", "تصاميم يقدمها المبدعون وإصدارات يشكلها المجتمع.", "Disenos enviados por creadores. Drops definidos por la comunidad."],
  ["PULSE index 001", "Index PULSE 001", "فهرس PULSE 001", "Indice PULSE 001"],
  ["Digital atelier for streetwear futures", "Atelier numerique des futurs streetwear", "أتيليه رقمي لمستقبل أزياء الشارع", "Atelier digital para futuros streetwear"],
  ["A monochrome fashion gallery where the feed behaves like a runway, and every concept carries a creator signal.", "Une galerie mode monochrome ou le feed se comporte comme un runway, et chaque concept porte un signal createur.", "معرض أزياء أحادي اللون يعمل فيه الخلاصة كمنصة عرض، وكل مفهوم يحمل إشارة مبدع.", "Una galeria de moda monocroma donde el feed actua como pasarela y cada concepto lleva una senal de creador."],
  ["DROP LAB", "LAB DROP", "مختبر الإصدارات", "LAB DROP"],
  ["Alpha access is curated, not open.", "L'acces alpha est curate, pas ouvert.", "الدخول إلى ألفا منسق وليس مفتوحا.", "El acceso alpha es curado, no abierto."],
  ["PULSE is launching with a small group of creators, voters and collectors. Join the queue or enter an invite code to unlock early studio access.", "PULSE demarre avec un petit groupe de createurs, votants et collectionneurs. Rejoins la file ou entre un code d'invitation pour debloquer l'acces studio anticipe.", "ينطلق PULSE مع مجموعة صغيرة من المبدعين والمصوتين والجامعين. انضم إلى القائمة أو أدخل رمز دعوة لفتح دخول مبكر إلى الاستوديو.", "PULSE se lanza con un grupo pequeno de creadores, votantes y coleccionistas. Unete a la cola o introduce un codigo para acceso temprano al estudio."],
  ["Remaining alpha seats", "Places alpha restantes", "مقاعد ألفا المتبقية", "Plazas alpha restantes"],
  ["Invite code optional", "Code d'invitation optionnel", "رمز الدعوة اختياري", "Codigo de invitacion opcional"],
  ["Request access", "Demander l'acces", "طلب الدخول", "Solicitar acceso"],
  ["You are in the alpha queue.", "Tu es dans la file alpha.", "أنت في قائمة ألفا.", "Estas en la cola alpha."],
  ["Invite codes unlock priority onboarding and creator dashboard access.", "Les codes d'invitation debloquent l'onboarding prioritaire et le dashboard createur.", "رموز الدعوة تفتح أولوية الإعداد ولوحة المبدع.", "Los codigos desbloquean onboarding prioritario y acceso al panel de creador."],
  ["Premium onboarding", "Onboarding premium", "إعداد مميز", "Onboarding premium"],
  ["From invite to first signal in four steps", "De l'invitation au premier signal en quatre etapes", "من الدعوة إلى أول إشارة في أربع خطوات", "De la invitacion a la primera senal en cuatro pasos"],
  ["Claim identity", "Reclamer l'identite", "تأكيد الهوية", "Reclamar identidad"],
  ["Select taste lanes", "Choisir les axes de gout", "اختيار مسارات الذوق", "Elegir carriles de gusto"],
  ["Save references", "Sauver des references", "حفظ المراجع", "Guardar referencias"],
  ["Submit concept", "Soumettre un concept", "إرسال مفهوم", "Enviar concepto"],
  ["Verified studio roster", "Roster studio verifie", "قائمة الاستوديو الموثقة", "Roster de estudio verificado"],
  ["Featured creators", "Createurs en avant", "مبدعون مميزون", "Creadores destacados"],
  ["View leaderboard", "Voir le classement", "عرض المتصدرين", "Ver ranking"],
  ["Community leaderboard", "Classement communaute", "ترتيب المجتمع", "Ranking comunitario"],
  ["Weekly signal", "Signal hebdo", "إشارة أسبوعية", "Senal semanal"],
  ["Signal methodology", "Methodologie du signal", "منهجية الإشارة", "Metodologia de senal"],
  ["Leaderboard rank combines approval rate, save depth, comment quality, creator consistency and drop readiness.", "Le rang combine taux d'approbation, profondeur des saves, qualite des commentaires, regularite createur et preparation au drop.", "يجمع الترتيب بين نسبة الموافقة وعمق الحفظ وجودة التعليقات وثبات المبدع وجاهزية الإصدار.", "El ranking combina aprobacion, guardados, calidad de comentarios, constancia del creador y preparacion de drop."],
  ["Trending drop countdown", "Compte a rebours du drop tendance", "عد تنازلي للإصدار الرائج", "Cuenta atras del drop tendencia"],
  ["Days", "Jours", "أيام", "Dias"],
  ["Hours", "Heures", "ساعات", "Horas"],
  ["Min", "Min", "دقائق", "Min"],
  ["Sec", "Sec", "ثوان", "Seg"],
  ["Community powered drops", "Drops propulses par la communaute", "إصدارات يقودها المجتمع", "Drops impulsados por la comunidad"],
  ["THE COMMUNITY CREATES", "LA COMMUNAUTE CREE", "المجتمع يصنع", "LA COMUNIDAD CREA"],
  ["THE FUTURE OF STREETWEAR", "LE FUTUR DU STREETWEAR", "مستقبل أزياء الشارع", "EL FUTURO DEL STREETWEAR"],
  ["Submit designs. Get voted by the community. Become part of the next drop. PULSE turns fashion concepts into a living public studio.", "Soumets des designs. Fais-les voter par la communaute. Entre dans le prochain drop. PULSE transforme les concepts mode en studio public vivant.", "أرسل التصاميم. دع المجتمع يصوت. كن جزءا من الإصدار القادم. يحول PULSE مفاهيم الموضة إلى استوديو عام حي.", "Envia disenos. Recibe votos de la comunidad. Forma parte del proximo drop. PULSE convierte conceptos de moda en un estudio publico vivo."],
  ["Explore Designs", "Explorer les designs", "استكشف التصاميم", "Explorar disenos"],
  ["Submit Yours", "Soumettre le tien", "أرسل تصميمك", "Enviar el tuyo"],
  ["Creator-owned concepts", "Concepts possedes par les createurs", "مفاهيم يملكها المبدعون", "Conceptos de propiedad creadora"],
  ["Community signal", "Signal communaute", "إشارة المجتمع", "Senal comunitaria"],
  ["Selected for production", "Selectionne pour production", "مختار للإنتاج", "Seleccionado para produccion"],
  ["Designs submitted", "Designs soumis", "تصاميم مرسلة", "Disenos enviados"],
  ["Active creators", "Createurs actifs", "مبدعون نشطون", "Creadores activos"],
  ["Community votes", "Votes communaute", "أصوات المجتمع", "Votos comunitarios"],
  ["Trending velocity", "Vitesse de tendance", "سرعة الرواج", "Velocidad de tendencia"],
  ["AI ranking detects high save rate, comment depth and creator momentum.", "Le classement IA detecte un haut taux de saves, profondeur des commentaires et momentum createur.", "يرصد ترتيب الذكاء الاصطناعي معدل حفظ مرتفعا وعمق التعليقات وزخم المبدع.", "El ranking IA detecta alto guardado, profundidad de comentarios e impulso creador."],
  ["COMMUNITY DESIGN INDEX", "INDEX DESIGN COMMUNAUTE", "فهرس تصميم المجتمع", "INDICE DE DISENO COMUNITARIO"],
  ["FUTURE DROP LAB", "LAB DROP FUTUR", "مختبر الإصدارات المستقبلية", "LAB DE DROPS FUTUROS"],
  ["STREETWEAR SIGNAL", "SIGNAL STREETWEAR", "إشارة ستريتوير", "SENAL STREETWEAR"],
  ["CREATOR-FIRST PLATFORM", "PLATEFORME CREATEUR-FIRST", "منصة تضع المبدع أولا", "PLATAFORMA CREATOR-FIRST"],
  ["Trending concepts", "Concepts tendance", "مفاهيم رائجة", "Conceptos tendencia"],
  ["Live community heat", "Chaleur communaute live", "زخم المجتمع المباشر", "Calor comunitario en vivo"],
  ["Open community", "Ouvrir la communaute", "فتح المجتمع", "Abrir comunidad"],
  ["Designers are the brand", "Les designers sont la marque", "المصممون هم العلامة", "Los disenadores son la marca"],
  ["Profiles foreground contribution, rank, taste and community value so creators feel visible from day one.", "Les profils mettent en avant contribution, rang, gout et valeur communaute pour rendre les createurs visibles des le premier jour.", "تبرز الملفات المساهمة والترتيب والذوق وقيمة المجتمع ليشعر المبدعون بالظهور منذ اليوم الأول.", "Los perfiles destacan contribucion, rango, gusto y valor comunitario para que los creadores sean visibles desde el primer dia."],
  ["Latest drops", "Derniers drops", "أحدث الإصدارات", "Ultimos drops"],
  ["Community selected releases", "Sorties selectionnees par la communaute", "إصدارات اختارها المجتمع", "Lanzamientos elegidos por la comunidad"],
  ["View drops", "Voir les drops", "عرض الإصدارات", "Ver drops"],
  ["followers", "abonnes", "متابعون", "seguidores"],
  ["likes", "likes", "إعجابات", "me gusta"],
  ["Community feed", "Feed communaute", "خلاصة المجتمع", "Feed comunitario"],
  ["Explore submitted concepts", "Explorer les concepts soumis", "استكشف المفاهيم المرسلة", "Explorar conceptos enviados"],
  ["A Pinterest-style design network where likes, saves and comments move ideas toward real production.", "Un reseau design facon Pinterest ou likes, saves et commentaires poussent les idees vers une production reelle.", "شبكة تصميم بأسلوب Pinterest حيث تدفع الإعجابات والحفظ والتعليقات الأفكار نحو إنتاج حقيقي.", "Una red de diseno estilo Pinterest donde likes, guardados y comentarios mueven ideas hacia produccion real."],
  ["Community modes", "Modes communaute", "أوضاع المجتمع", "Modos comunidad"],
  ["For you", "Pour toi", "لك", "Para ti"],
  ["Trending", "Tendance", "رائج", "Tendencia"],
  ["Outerwear", "Outerwear", "ملابس خارجية", "Abrigo"],
  ["Tops", "Hauts", "قطع علوية", "Prendas superiores"],
  ["Bottoms", "Bas", "قطع سفلية", "Pantalones"],
  ["Footwear", "Chaussures", "أحذية", "Calzado"],
  ["Rising creators", "Createurs montants", "مبدعون صاعدون", "Creadores emergentes"],
  ["Search", "Recherche", "بحث", "Buscar"],
  ["Search concepts, tags, creators", "Rechercher concepts, tags, createurs", "ابحث عن مفاهيم ووسوم ومبدعين", "Buscar conceptos, etiquetas, creadores"],
  ["Category", "Categorie", "الفئة", "Categoria"],
  ["Type", "Type", "النوع", "Tipo"],
  ["Fabric", "Matiere", "القماش", "Tejido"],
  ["Filter", "Filtrer", "تصفية", "Filtrar"],
  ["All", "Tout", "الكل", "Todo"],
  ["Load more concepts", "Charger plus de concepts", "تحميل المزيد من المفاهيم", "Cargar mas conceptos"],
  ["No designs found", "Aucun design trouve", "لم يتم العثور على تصاميم", "No se encontraron disenos"],
  ["Try a different search or filter.", "Essaie une autre recherche ou un autre filtre.", "جرّب بحثا أو مرشحا مختلفا.", "Prueba otra busqueda o filtro."],
  ["Like design", "Liker le design", "إعجاب بالتصميم", "Dar like al diseno"],
  ["Save design", "Sauver le design", "حفظ التصميم", "Guardar diseno"],
  ["Open project", "Ouvrir le projet", "فتح المشروع", "Abrir proyecto"],
  ["approval", "approbation", "موافقة", "aprobacion"],
  ["concepts", "concepts", "مفاهيم", "conceptos"],
  ["heat", "heat", "زخم", "calor"],
  ["Full product specifications", "Specifications produit completes", "مواصفات المنتج الكاملة", "Especificaciones completas"],
  ["From concept to garment", "Du concept au vetement", "من المفهوم إلى القطعة", "Del concepto a la prenda"],
  ["Title", "Titre", "العنوان", "Titulo"],
  ["Creator", "Createur", "المبدع", "Creador"],
  ["Inspiration", "Inspiration", "الإلهام", "Inspiracion"],
  ["Streetwear style", "Style streetwear", "أسلوب ستريتوير", "Estilo streetwear"],
  ["Fit", "Coupe", "القصة", "Fit"],
  ["Cut", "Coupe technique", "القص", "Corte"],
  ["Embroidery", "Broderie", "تطريز", "Bordado"],
  ["Print type", "Type d'impression", "نوع الطباعة", "Tipo de estampado"],
  ["GSM", "GSM", "الوزن GSM", "GSM"],
  ["Colorway", "Coloris", "الألوان", "Colorway"],
  ["Oversized or fitted", "Oversized ou ajuste", "واسع أو ضيق", "Oversized o ajustado"],
  ["Washing style", "Lavage", "أسلوب الغسل", "Lavado"],
  ["Target aesthetic", "Esthetique cible", "الجمالية المستهدفة", "Estetica objetivo"],
  ["Community comments", "Commentaires communaute", "تعليقات المجتمع", "Comentarios comunidad"],
  ["Add a comment", "Ajouter un commentaire", "أضف تعليقا", "Anadir comentario"],
  ["Post", "Publier", "نشر", "Publicar"],
  ["Signal", "Signal", "إشارة", "Senal"],
  ["Reply", "Repondre", "رد", "Responder"],
  ["now", "maintenant", "الآن", "ahora"],
  ["Related concepts", "Concepts lies", "مفاهيم ذات صلة", "Conceptos relacionados"],
  ["Same lane, different energy", "Meme axe, energie differente", "نفس المسار بطاقة مختلفة", "Mismo carril, energia distinta"],
  ["Creator profile", "Profil createur", "ملف المبدع", "Perfil creador"],
  ["Followers", "Abonnes", "المتابعون", "Seguidores"],
  ["Following", "Abonnements", "يتابع", "Siguiendo"],
  ["Total likes", "Likes totaux", "إجمالي الإعجابات", "Likes totales"],
  ["Uploaded designs", "Designs envoyes", "تصاميم مرفوعة", "Disenos subidos"],
  ["Follow", "Suivre", "متابعة", "Seguir"],
  ["View feed", "Voir le feed", "عرض الخلاصة", "Ver feed"],
  ["Featured projects", "Projets en avant", "مشاريع مميزة", "Proyectos destacados"],
  ["AI discover", "Decouverte IA", "استكشاف بالذكاء الاصطناعي", "Descubrimiento IA"],
  ["Taste graph recommendations", "Recommandations du graphe de gout", "توصيات خريطة الذوق", "Recomendaciones de grafo de gusto"],
  ["The recommendation engine scores vote velocity, save depth, creator rank, category momentum and similarity to your saved concepts.", "Le moteur score vitesse de vote, profondeur des saves, rang createur, momentum categorie et similarite avec tes concepts sauves.", "يقيم المحرك سرعة التصويت وعمق الحفظ وترتيب المبدع وزخم الفئة والتشابه مع مفاهيمك المحفوظة.", "El motor puntua velocidad de voto, guardados, ranking del creador, impulso de categoria y similitud con tus conceptos guardados."],
  ["Trending algorithm", "Algorithme tendance", "خوارزمية الرواج", "Algoritmo tendencia"],
  ["Score = likes + save depth + comment density + approval confidence + creator velocity.", "Score = likes + profondeur saves + densite commentaires + confiance approbation + vitesse createur.", "النتيجة = الإعجابات + عمق الحفظ + كثافة التعليقات + ثقة الموافقة + سرعة المبدع.", "Puntuacion = likes + guardados + densidad de comentarios + confianza de aprobacion + velocidad del creador."],
  ["Creator ranking", "Classement createur", "ترتيب المبدعين", "Ranking de creadores"],
  ["Category heat", "Heat categorie", "زخم الفئة", "Calor de categoria"],
  ["Recommended for you", "Recommande pour toi", "موصى به لك", "Recomendado para ti"],
  ["High signal concepts", "Concepts a signal fort", "مفاهيم بإشارة قوية", "Conceptos de alta senal"],
  ["Adjust filters", "Ajuster les filtres", "تعديل المرشحات", "Ajustar filtros"],
  ["Alpha onboarding", "Onboarding alpha", "إعداد ألفا", "Onboarding alpha"],
  ["Build your creator signal", "Construis ton signal createur", "ابنِ إشارة المبدع الخاصة بك", "Construye tu senal de creador"],
  ["PULSE learns your taste lanes, saves your reference archive and turns your first actions into a personalized community feed.", "PULSE apprend tes axes de gout, garde tes references et transforme tes premieres actions en feed personnalise.", "يتعلم PULSE مسارات ذوقك ويحفظ أرشيف مراجعك ويحول أفعالك الأولى إلى خلاصة مجتمع مخصصة.", "PULSE aprende tus carriles de gusto, guarda tus referencias y convierte tus primeras acciones en un feed personalizado."],
  ["Identity", "Identite", "هوية", "Identidad"],
  ["Taste lanes", "Axes de gout", "مسارات الذوق", "Carriles de gusto"],
  ["First signal", "Premier signal", "أول إشارة", "Primera senal"],
  ["01 Identity", "01 Identite", "01 الهوية", "01 Identidad"],
  ["02 Categories", "02 Categories", "02 الفئات", "02 Categorias"],
  ["03 Notifications", "03 Notifications", "03 الإشعارات", "03 Notificaciones"],
  ["04 Submit", "04 Soumettre", "04 إرسال", "04 Enviar"],
  ["Creator username", "Nom createur", "اسم المستخدم المبدع", "Usuario creador"],
  ["Technical outerwear", "Outerwear technique", "ملابس خارجية تقنية", "Abrigo tecnico"],
  ["Monochrome essentials", "Essentiels monochromes", "أساسيات أحادية اللون", "Esenciales monocromos"],
  ["Future sport", "Future sport", "رياضة مستقبلية", "Deporte futuro"],
  ["Studio uniforms", "Uniformes studio", "زي الاستوديو", "Uniformes de estudio"],
  ["Complete onboarding", "Terminer l'onboarding", "إنهاء الإعداد", "Completar onboarding"],
  ["Invite-only alpha", "Alpha sur invitation", "ألفا بالدعوة فقط", "Alpha solo por invitacion"],
  ["Join the PULSE queue", "Rejoindre la file PULSE", "انضم إلى قائمة PULSE", "Unirse a la cola PULSE"],
  ["We are opening the platform in controlled waves for creators, voters, moderators and early collectors.", "Nous ouvrons la plateforme par vagues controlees pour createurs, votants, moderateurs et premiers collectionneurs.", "نفتح المنصة على موجات منظمة للمبدعين والمصوتين والمشرفين والجامعين الأوائل.", "Abrimos la plataforma en oleadas controladas para creadores, votantes, moderadores y coleccionistas tempranos."],
  ["Accepted", "Acceptes", "مقبولون", "Aceptados"],
  ["Seats left", "Places restantes", "مقاعد متبقية", "Plazas restantes"],
  ["Access waves", "Vagues d'acces", "موجات الدخول", "Oleadas de acceso"],
  ["Invite code", "Code d'invitation", "رمز الدعوة", "Codigo de invitacion"],
  ["Why should PULSE invite you?", "Pourquoi PULSE devrait t'inviter ?", "لماذا يجب أن يدعوك PULSE؟", "Por que deberia invitarte PULSE?"],
  ["Join waitlist", "Rejoindre la waitlist", "الانضمام إلى قائمة الانتظار", "Unirse a lista"],
  ["Approved applicants receive onboarding, moderation access and early drop voting.", "Les candidats approuves recoivent onboarding, acces moderation et votes de drops en avance.", "يحصل المقبولون على الإعداد ودخول الإشراف والتصويت المبكر على الإصدارات.", "Los aprobados reciben onboarding, moderacion y voto temprano en drops."],
  ["Your studio pulse", "Ton pulse studio", "نبض الاستوديو الخاص بك", "Tu pulso de estudio"],
  ["Follow drop deadlines, moderation status, creator verification and voting moments from one center.", "Suis deadlines de drops, statut moderation, verification createur et moments de vote depuis un seul centre.", "تابع مواعيد الإصدارات وحالة الإشراف وتوثيق المبدعين ولحظات التصويت من مركز واحد.", "Sigue deadlines de drops, moderacion, verificacion de creadores y votaciones desde un centro."],
  ["Notification preferences", "Preferences notifications", "تفضيلات الإشعارات", "Preferencias de notificacion"],
  ["Live", "Live", "مباشر", "En vivo"],
  ["Drop deadlines", "Deadlines drops", "مواعيد الإصدارات", "Deadlines de drops"],
  ["Moderation updates", "Updates moderation", "تحديثات الإشراف", "Actualizaciones de moderacion"],
  ["Creator follows", "Follows createurs", "متابعات المبدعين", "Seguimientos de creadores"],
  ["On", "Actif", "مفعل", "Activo"],
  ["Digest", "Resume", "ملخص", "Resumen"],
  ["Community rank", "Rang communaute", "ترتيب المجتمع", "Rango comunidad"],
  ["Leaderboard", "Classement", "لوحة المتصدرين", "Ranking"],
  ["Creator ranking based on community approval, save velocity, production readiness and moderation quality.", "Classement createur base sur approbation communaute, vitesse de saves, readiness production et qualite moderation.", "ترتيب المبدعين مبني على موافقة المجتمع وسرعة الحفظ وجاهزية الإنتاج وجودة الإشراف.", "Ranking basado en aprobacion comunitaria, velocidad de guardados, produccion y calidad de moderacion."],
  ["Design taxonomy", "Taxonomie design", "تصنيف التصميم", "Taxonomia de diseno"],
  ["Categories", "Categories", "الفئات", "Categorias"],
  ["Browse PULSE by production lane, material behavior and community heat.", "Parcours PULSE par axe production, comportement matiere et heat communaute.", "تصفح PULSE حسب مسار الإنتاج وسلوك الخامة وزخم المجتمع.", "Explora PULSE por carril de produccion, material y calor comunitario."],
  ["Submit design", "Soumettre un design", "إرسال تصميم", "Enviar diseno"],
  ["Upload a future drop concept", "Uploader un concept de futur drop", "ارفع مفهوما لإصدار مستقبلي", "Subir concepto de futuro drop"],
  ["A premium submission flow that turns creative concepts into manufacturable drop proposals.", "Un flow premium qui transforme les concepts creatifs en propositions de drops manufacturables.", "مسار إرسال مميز يحول المفاهيم الإبداعية إلى مقترحات قابلة للتصنيع.", "Un flujo premium que convierte conceptos creativos en propuestas fabricables."],
  ["01 Concept", "01 Concept", "01 المفهوم", "01 Concepto"],
  ["02 Visuals", "02 Visuels", "02 المرئيات", "02 Visuales"],
  ["03 Specs", "03 Specs", "03 المواصفات", "03 Specs"],
  ["04 Review", "04 Review", "04 المراجعة", "04 Revision"],
  ["Drop cover and mockups here", "Depose cover et mockups ici", "ضع الغلاف والموكابات هنا", "Suelta portada y mockups aqui"],
  ["PNG, JPG or WebP. Live preview updates instantly.", "PNG, JPG ou WebP. Le preview live se met a jour instantanement.", "PNG أو JPG أو WebP. يتحدث العرض المباشر فورا.", "PNG, JPG o WebP. La vista previa se actualiza al instante."],
  ["Ready for visual upload", "Pret pour l'upload visuel", "جاهز لرفع المرئيات", "Listo para subir visuales"],
  ["Description", "Description", "الوصف", "Descripcion"],
  ["Sizing notes", "Notes de taille", "ملاحظات المقاسات", "Notas de tallaje"],
  ["Tags separated by commas", "Tags separes par virgules", "وسوم مفصولة بفواصل", "Etiquetas separadas por comas"],
  ["To keep production realistic, PULSE currently only accepts limited clothing types and production options.", "Pour garder la production realiste, PULSE accepte actuellement des types de vetements et options de production limites.", "لإبقاء الإنتاج واقعيا، يقبل PULSE حاليا أنواعا محدودة من الملابس وخيارات إنتاج محددة.", "Para mantener la produccion realista, PULSE acepta tipos de prendas y opciones limitadas."],
  ["Product category", "Categorie produit", "فئة المنتج", "Categoria de producto"],
  ["T-shirt", "T-shirt", "تي شيرت", "Camiseta"],
  ["Sweatshirt / Hoodie", "Sweatshirt / Hoodie", "سويت شيرت / هودي", "Sudadera / Hoodie"],
  ["Pants / Jogging", "Pantalon / Jogging", "بنطال / جوغر", "Pantalon / Jogger"],
  ["T-shirt / sweat system", "Systeme t-shirt / sweat", "نظام التي شيرت / السويت", "Sistema camiseta / sudadera"],
  ["Pants system", "Systeme pantalon", "نظام البنطال", "Sistema pantalon"],
  ["Straight Fit", "Straight Fit", "قصة مستقيمة", "Straight Fit"],
  ["Slim Fit", "Slim Fit", "قصة ضيقة", "Slim Fit"],
  ["Oversized", "Oversized", "واسع", "Oversized"],
  ["Boxy Fit", "Boxy Fit", "قصة مربعة", "Boxy Fit"],
  ["Baggy", "Baggy", "فضفاض", "Baggy"],
  ["Flare", "Flare", "واسع من الأسفل", "Flare"],
  ["Skinny", "Skinny", "ضيق جدا", "Skinny"],
  ["Bootcut", "Bootcut", "بوت كت", "Bootcut"],
  ["Straight Leg", "Straight Leg", "ساق مستقيمة", "Straight Leg"],
  ["Relaxed Fit", "Relaxed Fit", "قصة مريحة", "Relaxed Fit"],
  ["Clean vertical body, easy everyday proportion.", "Corps vertical net, proportion quotidienne facile.", "جسم عمودي نظيف ونسبة يومية سهلة.", "Cuerpo vertical limpio, proporcion diaria facil."],
  ["Closer chest and sleeve line for a sharper silhouette.", "Poitrine et manche plus proches pour une silhouette plus nette.", "صدر وأكمام أقرب للحصول على شكل أكثر حدة.", "Pecho y manga mas ajustados para una silueta nitida."],
  ["Dropped shoulder, longer sleeve, roomier streetwear volume.", "Epaule tombante, manche longue, volume streetwear plus ample.", "كتف ساقط وكم أطول وحجم ستريتوير أوسع.", "Hombro caido, manga larga y volumen streetwear amplio."],
  ["Shorter length with a wide square body block.", "Longueur plus courte avec bloc corps large et carre.", "طول أقصر مع كتلة جسم مربعة واسعة.", "Largo corto con bloque ancho y cuadrado."],
  ["Wide volume from hip to hem with relaxed drape.", "Volume large de la hanche a l'ourlet avec tombe decontracte.", "حجم واسع من الورك إلى الحافة مع انسدال مريح.", "Volumen ancho de cadera a bajo con caida relajada."],
  ["Controlled upper leg with a wider opening below the knee.", "Haut de jambe controle avec ouverture plus large sous le genou.", "ساق علوية مضبوطة مع فتحة أوسع تحت الركبة.", "Pierna superior controlada con apertura mas amplia bajo rodilla."],
  ["Narrow leg profile with close fit through the ankle.", "Profil jambe etroit avec ajustement proche a la cheville.", "شكل ساق ضيق مع قرب عند الكاحل.", "Perfil estrecho con ajuste cercano al tobillo."],
  ["Straight thigh with subtle expansion over footwear.", "Cuisse droite avec expansion subtile sur la chaussure.", "فخذ مستقيم مع اتساع خفيف فوق الحذاء.", "Muslo recto con expansion sutil sobre el calzado."],
  ["Uniform leg width for a balanced classic shape.", "Largeur de jambe uniforme pour une forme classique equilibree.", "عرض ساق موحد لشكل كلاسيكي متوازن.", "Ancho uniforme para una forma clasica equilibrada."],
  ["Comfortable thigh and knee with controlled width.", "Cuisse et genou confortables avec largeur controlee.", "فخذ وركبة مريحان مع عرض مضبوط.", "Muslo y rodilla comodos con ancho controlado."],
  ["Decoration type", "Type de decoration", "نوع الزخرفة", "Tipo de decoracion"],
  ["Print", "Print", "طباعة", "Estampado"],
  ["Print + Embroidery", "Print + Broderie", "طباعة + تطريز", "Estampado + Bordado"],
  ["Logo placement", "Placement logo", "موضع الشعار", "Ubicacion del logo"],
  ["Front center", "Centre devant", "الواجهة الوسطى", "Frente centro"],
  ["Small chest", "Petit torse", "صدر صغير", "Pecho pequeno"],
  ["Back", "Dos", "الخلف", "Espalda"],
  ["Sleeve", "Manche", "الكم", "Manga"],
  ["Leg", "Jambe", "الساق", "Pierna"],
  ["Fabric weight", "Poids tissu", "وزن القماش", "Peso de tejido"],
  ["Light", "Leger", "خفيف", "Ligero"],
  ["Medium", "Moyen", "متوسط", "Medio"],
  ["Low", "Bas", "منخفض", "Bajo"],
  ["High", "Haut", "مرتفع", "Alto"],
  ["Heavy", "Lourd", "ثقيل", "Pesado"],
  ["Color base", "Base couleur", "اللون الأساسي", "Color base"],
  ["Black", "Noir", "أسود", "Negro"],
  ["White", "Blanc", "أبيض", "Blanco"],
  ["Grey", "Gris", "رمادي", "Gris"],
  ["Navy", "Marine", "كحلي", "Azul marino"],
  ["Cream", "Creme", "كريمي", "Crema"],
  ["Style", "Style", "الأسلوب", "Estilo"],
  ["Minimal", "Minimal", "بسيط", "Minimal"],
  ["Streetwear", "Streetwear", "ستريتوير", "Streetwear"],
  ["Futuristic", "Futuriste", "مستقبلي", "Futurista"],
  ["Vintage", "Vintage", "قديم", "Vintage"],
  ["Sport", "Sport", "رياضي", "Sport"],
  ["Publish concept", "Publier le concept", "نشر المفهوم", "Publicar concepto"],
  ["Save draft", "Sauver brouillon", "حفظ كمسودة", "Guardar borrador"],
  ["Live preview", "Preview live", "عرض مباشر", "Vista previa"],
  ["Untitled concept", "Concept sans titre", "مفهوم بلا عنوان", "Concepto sin titulo"],
  ["Your concept description will appear here as the community card takes shape.", "La description de ton concept apparaitra ici pendant que la carte communaute prend forme.", "سيظهر وصف مفهومك هنا بينما تتشكل بطاقة المجتمع.", "La descripcion aparecera aqui mientras toma forma la tarjeta comunitaria."],
  ["Upper-body block", "Bloc haut du corps", "قالب الجزء العلوي", "Bloque superior"],
  ["Pants block", "Bloc pantalon", "قالب البنطال", "Bloque pantalon"],
  ["Pending approval", "En attente d'approbation", "بانتظار الموافقة", "Pendiente de aprobacion"],
  ["Community winners become real product", "Les gagnants communaute deviennent vrais produits", "فائزون من المجتمع يصبحون منتجات حقيقية", "Ganadores comunitarios se vuelven producto real"],
  ["Every drop carries its selected creators, voting context and launch countdown.", "Chaque drop porte ses createurs selectionnes, contexte de vote et compte a rebours.", "كل إصدار يحمل مبدعيه المختارين وسياق التصويت والعد التنازلي.", "Cada drop incluye creadores seleccionados, contexto de voto y cuenta atras."],
  ["Selected concepts", "Concepts selectionnes", "مفاهيم مختارة", "Conceptos seleccionados"],
  ["Current drop candidates", "Candidats drop actuels", "مرشحو الإصدار الحالي", "Candidatos actuales"],
  ["Winner badge", "Badge gagnant", "شارة الفائز", "Badge ganador"],
  ["Approved concepts only", "Concepts approuves uniquement", "مفاهيم معتمدة فقط", "Solo conceptos aprobados"],
  ["The commerce layer stays selective: only community-approved projects enter production.", "La couche commerce reste selective : seuls les projets approuves par la communaute entrent en production.", "تبقى طبقة التجارة انتقائية: فقط المشاريع المعتمدة من المجتمع تدخل الإنتاج.", "La capa comercial es selectiva: solo proyectos aprobados entran a produccion."],
  ["View product", "Voir produit", "عرض المنتج", "Ver producto"],
  ["Notify me", "Me notifier", "أعلمني", "Avisarme"],
  ["Contact PULSE", "Contacter PULSE", "تواصل مع PULSE", "Contactar PULSE"],
  ["Build the future studio with us", "Construire le studio futur avec nous", "ابنِ استوديو المستقبل معنا", "Construye el estudio futuro con nosotros"],
  ["For creator partnerships, manufacturing, retail collaborations and investment conversations.", "Pour partenariats createurs, manufacturing, collaborations retail et discussions investissement.", "لشراكات المبدعين والتصنيع وتعاونات البيع بالتجزئة وحوارات الاستثمار.", "Para alianzas con creadores, fabricacion, retail e inversion."],
  ["Creator support", "Support createur", "دعم المبدعين", "Soporte creador"],
  ["Drop lanes", "Axes drop", "مسارات الإصدار", "Carriles de drop"],
  ["Community studio", "Studio communaute", "استوديو المجتمع", "Estudio comunitario"],
  ["Name", "Nom", "الاسم", "Nombre"],
  ["Email", "Email", "البريد الإلكتروني", "Email"],
  ["Creator partnership", "Partenariat createur", "شراكة مبدع", "Alianza creador"],
  ["Manufacturing", "Fabrication", "تصنيع", "Fabricacion"],
  ["Retail", "Retail", "بيع بالتجزئة", "Retail"],
  ["Press", "Presse", "صحافة", "Prensa"],
  ["Message", "Message", "رسالة", "Mensaje"],
  ["Send message", "Envoyer le message", "إرسال الرسالة", "Enviar mensaje"],
  ["Admin dashboard", "Dashboard admin", "لوحة الإدارة", "Panel admin"],
  ["Studio command center", "Centre de commande studio", "مركز قيادة الاستوديو", "Centro de comando"],
  ["Operational controls for submissions, featured projects, drop curation and analytics.", "Controles operationnels pour submissions, projets en avant, curation drops et analytics.", "ضوابط تشغيلية للإرسالات والمشاريع المميزة وتنسيق الإصدارات والتحليلات.", "Controles operativos para envios, destacados, curacion y analitica."],
  ["Pending designs", "Designs en attente", "تصاميم معلقة", "Disenos pendientes"],
  ["Approval rate", "Taux approbation", "معدل الموافقة", "Tasa de aprobacion"],
  ["Votes today", "Votes aujourd'hui", "أصوات اليوم", "Votos hoy"],
  ["Quality threshold", "Seuil qualite", "حد الجودة", "Umbral de calidad"],
  ["Moderation queue", "File moderation", "قائمة الإشراف", "Cola de moderacion"],
  ["Live review", "Review live", "مراجعة مباشرة", "Revision en vivo"],
  ["Low risk", "Risque bas", "خطر منخفض", "Bajo riesgo"],
  ["Needs spec", "Spec requise", "يحتاج مواصفة", "Necesita specs"],
  ["Drop-ready", "Pret pour drop", "جاهز للإصدار", "Listo para drop"],
  ["Reject", "Rejeter", "رفض", "Rechazar"],
  ["Analytics", "Analytics", "تحليلات", "Analitica"],
  ["Likes analytics", "Analytics likes", "تحليلات الإعجابات", "Analitica de likes"],
  ["Trending creators", "Createurs tendance", "مبدعون رائجون", "Creadores tendencia"],
  ["Drop forecast", "Prevision drop", "توقع الإصدار", "Prevision de drop"],
  ["Waitlist applicants", "Candidats waitlist", "طلبات قائمة الانتظار", "Solicitudes lista"],
  ["Invite conversion", "Conversion invitation", "تحويل الدعوات", "Conversion invitacion"],
  ["Moderator SLA", "SLA moderation", "اتفاقية مستوى الإشراف", "SLA moderacion"],
  ["Draft saved locally for the prototype.", "Brouillon sauve localement pour le prototype.", "تم حفظ المسودة محليا للنموذج.", "Borrador guardado localmente."],
  ["Creator followed.", "Createur suivi.", "تمت متابعة المبدع.", "Creador seguido."],
  ["Drop notification enabled.", "Notification drop activee.", "تم تفعيل إشعار الإصدار.", "Notificacion de drop activada."],
  ["Submission approved for drop review.", "Soumission approuvee pour review drop.", "تمت الموافقة على الإرسال لمراجعة الإصدار.", "Envio aprobado para revision."],
  ["Submission moved to revision queue.", "Soumission deplacee en file de revision.", "نقل الإرسال إلى قائمة المراجعة.", "Envio movido a revision."],
  ["Design liked. Vote signal increased.", "Design like. Signal de vote augmente.", "تم الإعجاب بالتصميم وزادت إشارة التصويت.", "Diseno con like. Senal aumentada."],
  ["Like removed.", "Like retire.", "تمت إزالة الإعجاب.", "Like eliminado."],
  ["Saved to your future drop board.", "Sauve dans ton board de futur drop.", "تم الحفظ في لوحة الإصدار المستقبلية.", "Guardado en tu tablero futuro."],
  ["Removed from saved.", "Retire des saves.", "تمت الإزالة من المحفوظات.", "Eliminado de guardados."],
  ["Project link copied.", "Lien projet copie.", "تم نسخ رابط المشروع.", "Link copiado."],
  ["Message posted to the prototype stream.", "Message poste dans le flux prototype.", "تم نشر الرسالة في مسار النموذج.", "Mensaje publicado en el prototipo."],
  ["Invite accepted. Priority alpha access unlocked.", "Invitation acceptee. Acces alpha prioritaire debloque.", "تم قبول الدعوة وفتح أولوية ألفا.", "Invitacion aceptada. Acceso prioritario desbloqueado."],
  ["Waitlist request saved. You are in the alpha queue.", "Demande waitlist sauvee. Tu es dans la file alpha.", "تم حفظ طلب الانتظار. أنت في قائمة ألفا.", "Solicitud guardada. Estas en la cola alpha."],
  ["Onboarding complete. Your PULSE signal is active.", "Onboarding termine. Ton signal PULSE est actif.", "اكتمل الإعداد. إشارة PULSE الخاصة بك نشطة.", "Onboarding completo. Tu senal PULSE esta activa."],
  ["Concept submitted to community moderation.", "Concept soumis a la moderation communaute.", "تم إرسال المفهوم إلى إشراف المجتمع.", "Concepto enviado a moderacion."],
  ["LIKE", "LIKE", "إعجاب", "LIKE"],
  ["SAVE", "SAVE", "حفظ", "SAVE"],
];

const translations = translationRows.reduce((acc, [en, fr, ar, es]) => {
  acc.fr[en] = fr;
  acc.ar[en] = ar;
  acc.es[en] = es;
  return acc;
}, { fr: {}, ar: {}, es: {} });

const translationPatterns = {
  fr: [
    [/^(.+) lane selected\.$/, "$1 selectionne."],
    [/^You are #(\d+) in the alpha queue\.$/, "Tu es n°$1 dans la file alpha."],
    [/^Queue position #(\d+)\. Status: Priority invite\.$/, "Position file n°$1. Statut : invitation prioritaire."],
    [/^Queue position #(\d+)\. Status: Pending review\.$/, "Position file n°$1. Statut : review en attente."],
  ],
  ar: [
    [/^(.+) lane selected\.$/, "تم اختيار مسار $1."],
    [/^You are #(\d+) in the alpha queue\.$/, "أنت رقم $1 في قائمة ألفا."],
    [/^Queue position #(\d+)\. Status: Priority invite\.$/, "موقعك في القائمة رقم $1. الحالة: دعوة أولوية."],
    [/^Queue position #(\d+)\. Status: Pending review\.$/, "موقعك في القائمة رقم $1. الحالة: مراجعة معلقة."],
  ],
  es: [
    [/^(.+) lane selected\.$/, "$1 seleccionado."],
    [/^You are #(\d+) in the alpha queue\.$/, "Estas en el puesto $1 de la cola alpha."],
    [/^Queue position #(\d+)\. Status: Priority invite\.$/, "Posicion $1. Estado: invitacion prioritaria."],
    [/^Queue position #(\d+)\. Status: Pending review\.$/, "Posicion $1. Estado: revision pendiente."],
  ],
};

const termReplacements = {
  fr: { approval: "approbation", followers: "abonnes", likes: "likes", comments: "commentaires", votes: "votes", concepts: "concepts", heat: "heat", signals: "signaux", today: "aujourd'hui" },
  ar: { approval: "موافقة", followers: "متابعون", likes: "إعجابات", comments: "تعليقات", votes: "أصوات", concepts: "مفاهيم", heat: "زخم", signals: "إشارات", today: "اليوم" },
  es: { approval: "aprobacion", followers: "seguidores", likes: "me gusta", comments: "comentarios", votes: "votos", concepts: "conceptos", heat: "calor", signals: "senales", today: "hoy" },
};

function translateText(value) {
  if (state.language === "en" || typeof value !== "string") return value;
  const lang = state.language;
  const match = value.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const leading = match?.[1] || "";
  const core = match?.[2] || value;
  const trailing = match?.[3] || "";
  if (!core.trim()) return value;
  const exact = translations[lang]?.[core];
  if (exact) return `${leading}${exact}${trailing}`;
  let translated = core;
  for (const [pattern, replacement] of translationPatterns[lang] || []) {
    if (pattern.test(core)) {
      translated = core.replace(pattern, replacement);
      return `${leading}${translated}${trailing}`;
    }
  }
  const terms = termReplacements[lang] || {};
  Object.entries(terms).forEach(([term, replacement]) => {
    translated = translated.replace(new RegExp(`\\b${term}\\b`, "gi"), replacement);
  });
  return `${leading}${translated}${trailing}`;
}

function t(value) {
  return translateText(value);
}

function localizeScoped(root) {
  if (!root || state.language === "en") return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
      if (parent.closest("script, style, svg, .language-switcher")) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    node.nodeValue = translateText(node.nodeValue);
  });
  root.querySelectorAll?.("[placeholder], [title], [aria-label], [alt]").forEach((element) => {
    ["placeholder", "title", "aria-label", "alt"].forEach((attr) => {
      const value = element.getAttribute(attr);
      if (value) element.setAttribute(attr, translateText(value));
    });
  });
}

function applyLanguageSettings() {
  const meta = languageMeta[state.language] || languageMeta.en;
  document.documentElement.lang = state.language;
  document.documentElement.dir = meta.dir;
  document.body?.setAttribute("data-language", state.language);
  document.title = t("PULSE - Community Streetwear Futures");
  const loaderCaption = document.querySelector(".loader-caption");
  if (loaderCaption) loaderCaption.textContent = t("COMMUNITY DESIGN HOUSE");
}

function localizePage() {
  applyLanguageSettings();
  localizeScoped(document.getElementById("app"));
  localizeScoped(document.getElementById("pulseLoader"));
}

function setLanguage(lang) {
  if (!supportedLanguages.includes(lang) || lang === state.language) return;
  state.language = lang;
  localStorage.setItem("pulse_language", lang);
  document.documentElement.classList.add("language-switching");
  render();
  window.setTimeout(() => document.documentElement.classList.remove("language-switching"), 520);
}

const creators = [
  {
    username: "kaizen.arc",
    name: "Kaizen Arc",
    bio: "Technical silhouettes, modular hardware and washed black utility systems.",
    followers: 18400,
    following: 218,
    likes: 128900,
    rank: 1,
    badge: "Drop winner",
    verified: true,
    specialty: "Technical outerwear",
  },
  {
    username: "noirshift",
    name: "Noir Shift",
    bio: "Minimal future uniforms with muted palettes and sculpted oversized fits.",
    followers: 12100,
    following: 340,
    likes: 76300,
    rank: 2,
    badge: "Featured",
    verified: true,
    specialty: "Monochrome fleece",
  },
  {
    username: "mika.systems",
    name: "Mika Systems",
    bio: "Footwear-led streetwear concepts inspired by motion, compression and mesh.",
    followers: 9700,
    following: 119,
    likes: 54400,
    rank: 3,
    badge: "Rising",
    verified: true,
    specialty: "Future sport",
  },
  {
    username: "atelier.zero",
    name: "Atelier Zero",
    bio: "Cropped proportions, contrast tape, and elevated daily uniforms.",
    followers: 8300,
    following: 275,
    likes: 48900,
    rank: 4,
    badge: "Curated",
    verified: false,
    specialty: "Studio uniforms",
  },
];

const designs = [
  {
    slug: "neon-utility-shell",
    title: "Neon Utility Shell",
    creator: "kaizen.arc",
    category: "Outerwear",
    clothingType: "Shell Jacket",
    fabric: "Ripstop nylon",
    gsm: "165 GSM",
    fit: "Oversized",
    cut: "Cropped technical block",
    embroidery: "Sleeve coordinate stitch",
    printType: "Reflective transfer",
    colorway: "Graphite / Volt",
    washing: "Cold technical wash",
    aesthetic: "Cyber terrace uniform",
    inspiration: "Rain shells, early trail gear, underground football culture.",
    description: "A modular shell with hidden pocket geometry, cinched hem and thin reflective pulse lines.",
    style: "Techwear",
    likes: 18340,
    comments: 842,
    approval: 92,
    saves: 5100,
    height: "tall",
    shape: "jacket",
    visual: "linear-gradient(135deg, #121417, #3d4145 42%, #0b0b0c)",
    garment: "linear-gradient(145deg, #0c0d0e, #4b5154)",
    palette: ["#070707", "#c8ccc9", "#d9ff66", "#5a5f62"],
    tags: ["technical", "reflective", "utility"],
  },
  {
    slug: "oxide-loop-hoodie",
    title: "Oxide Loop Hoodie",
    creator: "noirshift",
    category: "Tops",
    clothingType: "Heavy hoodie",
    fabric: "Brushed cotton fleece",
    gsm: "520 GSM",
    fit: "Boxy oversized",
    cut: "Dropped shoulder",
    embroidery: "Tonal chest seal",
    printType: "Discharge back graphic",
    colorway: "Washed black / Ash",
    washing: "Garment dyed mineral wash",
    aesthetic: "Monochrome luxury street",
    inspiration: "Concrete, archive tour merch, late night studio uniforms.",
    description: "A heavyweight hoodie with exaggerated ribbing, mineral fade and hidden side pocket entry.",
    style: "Luxury basics",
    likes: 14980,
    comments: 496,
    approval: 88,
    saves: 4200,
    height: "short",
    shape: "hoodie",
    visual: "linear-gradient(150deg, #050505, #2b2b2b 48%, #111)",
    garment: "linear-gradient(145deg, #151515, #6a6a66)",
    palette: ["#050505", "#2f3030", "#b8b8b1", "#ffffff"],
    tags: ["heavyweight", "washed", "minimal"],
  },
  {
    slug: "axis-parachute-cargo",
    title: "Axis Parachute Cargo",
    creator: "atelier.zero",
    category: "Bottoms",
    clothingType: "Cargo pant",
    fabric: "Cotton nylon",
    gsm: "240 GSM",
    fit: "Relaxed adjustable",
    cut: "Balloon leg",
    embroidery: "Pocket flag label",
    printType: "None",
    colorway: "Stone grey / Black",
    washing: "Enzyme soft wash",
    aesthetic: "Design studio uniform",
    inspiration: "Parachute volume, studio workwear, modern climbing trousers.",
    description: "Adjustable cargos with floating pocket panels, snap hems and a controlled balloon profile.",
    style: "Utility minimal",
    likes: 11120,
    comments: 391,
    approval: 82,
    saves: 3100,
    height: "tall",
    shape: "pants",
    visual: "linear-gradient(135deg, #101111, #84847e 50%, #151515)",
    garment: "linear-gradient(145deg, #9b9b91, #2c2d2d)",
    palette: ["#111111", "#8b8c84", "#d7d7d2", "#3b3d3e"],
    tags: ["cargo", "adjustable", "studio"],
  },
  {
    slug: "mesh-runner-zero",
    title: "Mesh Runner Zero",
    creator: "mika.systems",
    category: "Footwear",
    clothingType: "Runner",
    fabric: "Open mesh / TPU",
    gsm: "N/A",
    fit: "True to size",
    cut: "Low runner",
    embroidery: "Tongue pulse mark",
    printType: "Molded side grid",
    colorway: "Silver / Smoke / Ice",
    washing: "Wipe clean",
    aesthetic: "Futuristic daily runner",
    inspiration: "Early 2000s running shoes, lab footwear, liquid metal finishes.",
    description: "A sculpted mesh runner with segmented sole geometry and translucent overlays.",
    style: "Future sport",
    likes: 16240,
    comments: 664,
    approval: 90,
    saves: 5900,
    height: "short",
    shape: "shoe",
    visual: "linear-gradient(135deg, #151719, #e1e4df 56%, #222)",
    garment: "linear-gradient(145deg, #e8ebe7, #747b80)",
    palette: ["#ffffff", "#b9c1c4", "#4a4f54", "#8fe7ff"],
    tags: ["runner", "mesh", "silver"],
  },
  {
    slug: "signal-knit-vest",
    title: "Signal Knit Vest",
    creator: "kaizen.arc",
    category: "Tops",
    clothingType: "Knit vest",
    fabric: "Merino blend",
    gsm: "390 GSM",
    fit: "Cropped box fit",
    cut: "Deep arm opening",
    embroidery: "Back neck stitch",
    printType: "Jacquard grid",
    colorway: "Black / Ecru",
    washing: "Dry flat",
    aesthetic: "Gallery streetwear",
    inspiration: "Signal diagrams, monochrome galleries, cold-weather layering.",
    description: "A sculptural knit vest with gridded jacquard texture and clean high collar.",
    style: "Layered minimal",
    likes: 9340,
    comments: 244,
    approval: 79,
    saves: 2100,
    height: "short",
    shape: "vest",
    visual: "linear-gradient(135deg, #070707, #d8d8cf 48%, #222)",
    garment: "linear-gradient(145deg, #f0f0e8, #1d1d1c)",
    palette: ["#050505", "#efefe7", "#7a7b76", "#d9ff66"],
    tags: ["knit", "jacquard", "layering"],
  },
  {
    slug: "blackout-bomber-02",
    title: "Blackout Bomber 02",
    creator: "noirshift",
    category: "Outerwear",
    clothingType: "Bomber",
    fabric: "Nylon satin",
    gsm: "210 GSM",
    fit: "Oversized",
    cut: "Wide shoulder",
    embroidery: "Tonal sleeve code",
    printType: "None",
    colorway: "Black / Gunmetal",
    washing: "Professional clean",
    aesthetic: "Night commute uniform",
    inspiration: "MA-1 history, private club security, airport night light.",
    description: "A premium bomber with compressed padding, matte hardware and wide rib structure.",
    style: "Monochrome luxury",
    likes: 12640,
    comments: 377,
    approval: 86,
    saves: 3900,
    height: "tall",
    shape: "jacket",
    visual: "linear-gradient(135deg, #030303, #272b2d 54%, #111)",
    garment: "linear-gradient(145deg, #070707, #3a3d3f)",
    palette: ["#020202", "#202326", "#7f8387", "#e9e9e3"],
    tags: ["bomber", "satin", "night"],
  },
  {
    slug: "soft-armor-tee",
    title: "Soft Armor Tee",
    creator: "atelier.zero",
    category: "Tops",
    clothingType: "Oversized tee",
    fabric: "Compact cotton",
    gsm: "280 GSM",
    fit: "Oversized",
    cut: "Box tee",
    embroidery: "Hem label",
    printType: "Puff print",
    colorway: "Bone / Black",
    washing: "Stone wash",
    aesthetic: "Quiet graphic uniform",
    inspiration: "Armor panel lines, gallery merch, wearable blank space.",
    description: "A dense oversized tee with raised tonal panel graphics and a structured neckline.",
    style: "Graphic minimal",
    likes: 7880,
    comments: 188,
    approval: 76,
    saves: 1900,
    height: "short",
    shape: "hoodie",
    visual: "linear-gradient(135deg, #dad8cf, #111 70%)",
    garment: "linear-gradient(145deg, #ece9dc, #9a9589)",
    palette: ["#ece9dc", "#0d0d0d", "#737069", "#ffffff"],
    tags: ["tee", "puff", "minimal"],
  },
  {
    slug: "rift-panel-trouser",
    title: "Rift Panel Trouser",
    creator: "mika.systems",
    category: "Bottoms",
    clothingType: "Panel trouser",
    fabric: "Stretch twill",
    gsm: "300 GSM",
    fit: "Straight",
    cut: "Panelled leg",
    embroidery: "Inside waistband",
    printType: "Reflective piping",
    colorway: "Charcoal / Ice",
    washing: "Cold wash",
    aesthetic: "Urban performance uniform",
    inspiration: "Running tights, tailored trousers, architectural panel splits.",
    description: "A straight trouser with ergonomic panel cuts, hidden waist adjusters and light-reflective piping.",
    style: "Smart utility",
    likes: 10320,
    comments: 279,
    approval: 81,
    saves: 2600,
    height: "tall",
    shape: "pants",
    visual: "linear-gradient(135deg, #0c0d0e, #596064 52%, #101010)",
    garment: "linear-gradient(145deg, #22272a, #7c858a)",
    palette: ["#0b0b0c", "#4e565c", "#c9d4d8", "#8fe7ff"],
    tags: ["tailored", "reflective", "performance"],
  },
  {
    slug: "liminal-pocket-overshirt",
    title: "Liminal Pocket Overshirt",
    creator: "kaizen.arc",
    category: "Outerwear",
    clothingType: "Overshirt",
    fabric: "Waxed cotton",
    gsm: "340 GSM",
    fit: "Relaxed",
    cut: "Longline",
    embroidery: "Pocket serial",
    printType: "None",
    colorway: "Coal / Slate",
    washing: "Spot clean",
    aesthetic: "Architect studio outer layer",
    inspiration: "Studio aprons, waxed field jackets, monochrome furniture.",
    description: "A longline overshirt with oversized utility pockets and low-shine waxed finish.",
    style: "Workwear future",
    likes: 8670,
    comments: 205,
    approval: 80,
    saves: 1600,
    height: "tall",
    shape: "jacket",
    visual: "linear-gradient(135deg, #080808, #565c60 46%, #151515)",
    garment: "linear-gradient(145deg, #24292c, #60686d)",
    palette: ["#090909", "#30363a", "#6f777c", "#c9c9c2"],
    tags: ["waxed", "overshirt", "workwear"],
  },
  {
    slug: "eclipse-waffle-thermal",
    title: "Eclipse Waffle Thermal",
    creator: "noirshift",
    category: "Tops",
    clothingType: "Thermal",
    fabric: "Waffle cotton",
    gsm: "310 GSM",
    fit: "Fitted layer",
    cut: "Long sleeve",
    embroidery: "Cuff mark",
    printType: "None",
    colorway: "Charcoal / Bone",
    washing: "Garment wash",
    aesthetic: "Base layer luxury",
    inspiration: "Vintage thermals, performance base layers, faded concrete.",
    description: "A fitted waffle thermal with elongated sleeves and subtle contrast neckline.",
    style: "Layered basics",
    likes: 7210,
    comments: 143,
    approval: 74,
    saves: 1500,
    height: "short",
    shape: "hoodie",
    visual: "linear-gradient(135deg, #1c1c1b, #bcb9ad 72%)",
    garment: "linear-gradient(145deg, #2a2a28, #928f86)",
    palette: ["#1c1c1b", "#8c8980", "#cfcabd", "#ffffff"],
    tags: ["thermal", "waffle", "layer"],
  },
  {
    slug: "carbon-wrap-sneaker",
    title: "Carbon Wrap Sneaker",
    creator: "mika.systems",
    category: "Footwear",
    clothingType: "Lifestyle sneaker",
    fabric: "Mesh / synthetic",
    gsm: "N/A",
    fit: "True to size",
    cut: "Low profile",
    embroidery: "Heel pull tab",
    printType: "Carbon side wrap",
    colorway: "Black / Chrome",
    washing: "Wipe clean",
    aesthetic: "Post-runway sport",
    inspiration: "Carbon plates, motorcycle panels, black chrome hardware.",
    description: "A low sneaker with wrapped side panels, oversized pull tab and chrome midsole insert.",
    style: "Tech sport",
    likes: 13200,
    comments: 428,
    approval: 87,
    saves: 4400,
    height: "short",
    shape: "shoe",
    visual: "linear-gradient(135deg, #030303, #8b9295 50%, #121212)",
    garment: "linear-gradient(145deg, #0a0a0a, #aeb5b8)",
    palette: ["#020202", "#45494c", "#b9c0c3", "#ffffff"],
    tags: ["carbon", "sneaker", "chrome"],
  },
  {
    slug: "archive-denim-void",
    title: "Archive Denim Void",
    creator: "atelier.zero",
    category: "Bottoms",
    clothingType: "Wide denim",
    fabric: "Japanese denim",
    gsm: "430 GSM",
    fit: "Wide",
    cut: "Stacked leg",
    embroidery: "Back pocket pulse",
    printType: "Laser fade",
    colorway: "Black fade",
    washing: "Resin rinse",
    aesthetic: "Archive skate luxury",
    inspiration: "Skate denim, old campaign scans, deep black overdye.",
    description: "A wide denim shape with ghost fades, heavy drape and a clean black hardware system.",
    style: "Archive street",
    likes: 11990,
    comments: 356,
    approval: 84,
    saves: 3500,
    height: "tall",
    shape: "pants",
    visual: "linear-gradient(135deg, #040404, #1f2428 46%, #585b5e)",
    garment: "linear-gradient(145deg, #111418, #44484c)",
    palette: ["#050505", "#15191d", "#52565a", "#aeb1b2"],
    tags: ["denim", "wide", "archive"],
  },
];

const drops = [
  {
    id: "DROP #001",
    name: "SIGNAL / BLACK",
    status: "Live selection",
    date: "2026-07-15T18:00:00",
    winners: ["neon-utility-shell", "mesh-runner-zero", "axis-parachute-cargo"],
    copy: "Community-selected technical pieces in black, graphite and reflective silver.",
  },
  {
    id: "DROP #002",
    name: "VOID UNIFORM",
    status: "Voting opens",
    date: "2026-09-04T20:00:00",
    winners: ["oxide-loop-hoodie", "blackout-bomber-02", "archive-denim-void"],
    copy: "Heavy fleece, washed black denim and premium outerwear proposals.",
  },
  {
    id: "DROP #003",
    name: "RUN SYSTEM",
    status: "Curating",
    date: "2026-11-12T19:00:00",
    winners: ["carbon-wrap-sneaker", "rift-panel-trouser", "signal-knit-vest"],
    copy: "Footwear-led performance silhouettes with futuristic daily wear.",
  },
];

const products = designs
  .filter((design) => ["neon-utility-shell", "mesh-runner-zero", "oxide-loop-hoodie", "axis-parachute-cargo"].includes(design.slug))
  .map((design, index) => ({
    ...design,
    price: [248, 186, 148, 168][index],
    productStatus: index === 0 ? "Preorder open" : "Approved concept",
  }));

const alphaAccess = {
  mode: "INVITE ONLY",
  seats: 500,
  joined: 327,
  inviteCodes: ["PULSE-001", "SIGNAL-BLACK", "CREATOR-ALPHA"],
};

const categories = [
  { name: "Outerwear", code: "OUT", count: designs.filter((item) => item.category === "Outerwear").length, signal: 94 },
  { name: "Tops", code: "TOP", count: designs.filter((item) => item.category === "Tops").length, signal: 88 },
  { name: "Bottoms", code: "BTM", count: designs.filter((item) => item.category === "Bottoms").length, signal: 81 },
  { name: "Footwear", code: "FTW", count: designs.filter((item) => item.category === "Footwear").length, signal: 77 },
];

const notifications = [
  { type: "Drop", title: "DROP #001 reached production review", time: "2m", tone: "hot" },
  { type: "Vote", title: "Neon Utility Shell crossed 18K likes", time: "18m", tone: "signal" },
  { type: "Creator", title: "kaizen.arc was verified by PULSE studio", time: "1h", tone: "verified" },
  { type: "Invite", title: "148 alpha invites remain this week", time: "today", tone: "access" },
];

const moderationItems = [
  { design: "Neon Utility Shell", creator: "kaizen.arc", status: "Approve", risk: "Low", queue: "Drop review", score: 92 },
  { design: "Blackout Bomber 02", creator: "noirshift", status: "Feature", risk: "Low", queue: "Editorial", score: 86 },
  { design: "Soft Armor Tee", creator: "atelier.zero", status: "Needs spec", risk: "Medium", queue: "Revision", score: 76 },
  { design: "Carbon Wrap Sneaker", creator: "mika.systems", status: "Legal check", risk: "Medium", queue: "Footwear", score: 87 },
];

function persist() {
  localStorage.setItem("pulse_liked", JSON.stringify([...state.liked]));
  localStorage.setItem("pulse_saved", JSON.stringify([...state.saved]));
}

function creator(username) {
  return creators.find((item) => item.username === username) || creators[0];
}

function designBySlug(slug) {
  return designs.find((item) => item.slug === slug) || designs[0];
}

function initials(value) {
  return value
    .split(/[.\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function formatNumber(value) {
  return new Intl.NumberFormat("en", { notation: value > 9999 ? "compact" : "standard" }).format(value);
}

function visual(design, extra = "") {
  return `
    <div class="card-visual ${design.height || ""} ${extra}" style="--visual-bg:${design.visual}; --garment:${design.garment};">
      <div class="mockup">
        <div class="garment ${design.shape}">
          <i class="piece-a"></i>
          <i class="piece-b"></i>
          <i class="piece-c"></i>
          <i class="print-lines"></i>
        </div>
      </div>
    </div>
  `;
}

function palette(design) {
  return `<span class="palette-row">${design.palette.map((color) => `<i class="swatch" style="--c:${color}"></i>`).join("")}</span>`;
}

function verificationBadge(item) {
  return item.verified ? `<span class="verified-badge" title="Verified creator">${icons.check}</span>` : "";
}

function languageSwitcher() {
  return `
    <div class="language-switcher" role="group" aria-label="Language">
      ${supportedLanguages.map((lang) => `
        <button type="button" data-lang="${lang}" class="${state.language === lang ? "active" : ""}" aria-pressed="${state.language === lang}" title="${languageMeta[lang].name}">
          ${languageMeta[lang].label}
        </button>
      `).join("")}
    </div>
  `;
}

function nav() {
  const route = getRoute().page;
  const links = [
    ["home", "Home"],
    ["community", "Community"],
    ["explore", "Explore"],
    ["submit", "Submit Design"],
    ["drops", "Drops"],
    ["shop", "Shop"],
    ["waitlist", "Waitlist"],
    ["contact", "Contact"],
  ];
  return `
    <header class="nav">
      <div class="nav-inner">
        <a class="brand" href="#/home" aria-label="PULSE home">
          <span class="brand-mark"></span>
          <span class="rhythm-meter" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          <span>PULSE</span>
        </a>
        <nav class="nav-links" aria-label="Primary">
          ${links.map(([key, label]) => `<a class="nav-link ${route === key ? "active" : ""}" href="#/${key}">${label}</a>`).join("")}
        </nav>
        <div class="nav-actions">
          <a class="icon-btn nav-icon-only notification-dot" href="#/notifications" title="Notifications">${icons.bell}</a>
          ${languageSwitcher()}
          <a class="ghost-btn" href="#/admin">${icons.chart}<span>Admin</span></a>
          <a class="primary-btn" href="#/submit">${icons.upload}<span>Submit</span></a>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" aria-label="Mobile">
      <a class="${route === "home" ? "active" : ""}" href="#/home" title="Home">P</a>
      <a class="${route === "community" ? "active" : ""}" href="#/community" title="Community">${icons.search}</a>
      <a class="${route === "explore" ? "active" : ""}" href="#/explore" title="Explore">${icons.spark}</a>
      <a class="${route === "notifications" ? "active" : ""}" href="#/notifications" title="Notifications">${icons.bell}</a>
      <a class="${route === "submit" ? "active" : ""}" href="#/submit" title="Submit">${icons.upload}</a>
    </nav>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <div class="container footer-inner">
        <strong>PULSE / COMMUNITY STREETWEAR FUTURES</strong>
        <span>Designs submitted by creators. Drops shaped by the community.</span>
      </div>
    </footer>
  `;
}

function shell(content) {
  return `<div class="shell">${nav()}<div class="route-scrim" aria-hidden="true"></div><main class="view">${content}</main>${footer()}</div>`;
}

function editorialBand() {
  const lead = designs[5];
  const support = [designs[10], designs[8], designs[4]];
  return `
    <section class="editorial-composition">
      <div class="wide-container editorial-grid">
        <div class="editorial-copy">
          <span class="section-kicker">PULSE index 001</span>
          <h2 class="layered-heading" data-shadow="Digital atelier for streetwear futures">Digital atelier for streetwear futures</h2>
          <p class="section-copy">A monochrome fashion gallery where the feed behaves like a runway, and every concept carries a creator signal.</p>
          <div class="signal-dial" aria-hidden="true">
            <span></span>
            <b>92</b>
          </div>
        </div>
        <div class="editorial-poster">
          ${visual(lead, "tall")}
          <div class="poster-type">
            <span>DROP LAB</span>
            <strong>${lead.title}</strong>
          </div>
        </div>
        <div class="editorial-stack">
          ${support.map((item) => `
            <a class="mini-editorial-card" href="#/design/${item.slug}">
              ${visual(item, "short")}
              <span>${item.title}</span>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function alphaGate() {
  const remaining = alphaAccess.seats - alphaAccess.joined;
  return `
    <section class="alpha-gate">
      <div class="wide-container alpha-gate-grid">
        <div>
          <span class="eyebrow">${icons.lock}${alphaAccess.mode}</span>
          <h2 class="section-title">Alpha access is curated, not open.</h2>
          <p class="section-copy">PULSE is launching with a small group of creators, voters and collectors. Join the queue or enter an invite code to unlock early studio access.</p>
        </div>
        <form class="alpha-access-card" data-waitlist-form>
          <div class="price-row"><span>Remaining alpha seats</span><strong>${remaining}</strong></div>
          <div class="progress" style="--value:${(alphaAccess.joined / alphaAccess.seats) * 100}%"><span></span></div>
          <input class="field" name="email" type="email" placeholder="email@studio.com" required />
          <input class="field" name="invite" placeholder="Invite code optional" />
          <button class="primary-btn" type="submit">${icons.lock}<span>Request access</span></button>
          ${state.waitlist ? `<p class="muted">You are #${state.waitlist.position} in the alpha queue.</p>` : `<p class="muted">Invite codes unlock priority onboarding and creator dashboard access.</p>`}
        </form>
      </div>
    </section>
  `;
}

function onboardingPreview() {
  return `
    <section class="section-tight onboarding-strip">
      <div class="container">
        <div class="onboarding-card">
          <div>
            <span class="section-kicker">Premium onboarding</span>
            <h2 class="section-title">From invite to first signal in four steps</h2>
          </div>
          <div class="onboarding-steps">
            ${["Claim identity", "Select taste lanes", "Save references", "Submit concept"].map((step, index) => `
              <a href="#/onboarding" class="onboarding-step ${index === 0 && !state.onboardingDone ? "active" : ""}">
                <strong>0${index + 1}</strong>
                <span>${step}</span>
              </a>
            `).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function featuredCreatorsSection() {
  const featured = [...creators].sort((a, b) => a.rank - b.rank);
  return `
    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Verified studio roster</span>
            <h2 class="section-title">Featured creators</h2>
          </div>
          <a class="text-btn" href="#/leaderboard">View leaderboard ${icons.open}</a>
        </div>
        <div class="featured-creator-wall">
          ${featured.map((item) => `
            <a class="featured-creator" href="#/profile/${item.username}">
              <span class="rank">#${item.rank}</span>
              <span class="avatar large">${initials(item.username)}</span>
              <strong>${item.name} ${verificationBadge(item)}</strong>
              <small>@${item.username} / ${item.specialty}</small>
              <div class="progress" style="--value:${Math.min(98, 60 + item.rank * 8)}%"><span></span></div>
            </a>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

function categoryRail() {
  return `
    <div class="category-rail">
      ${categories.map((item) => `
        <button type="button" data-action="category" data-category="${item.name}" class="${state.filters.category === item.name ? "active" : ""}">
          <span>${item.code}</span>
          <strong>${item.name}</strong>
          <small>${item.count} concepts / ${item.signal}% heat</small>
        </button>
      `).join("")}
    </div>
  `;
}

function leaderboardSection() {
  const ranked = [...creators].sort((a, b) => b.likes + b.followers - (a.likes + a.followers));
  return `
    <section class="section-tight">
      <div class="container split">
        <div class="panel leaderboard-panel">
          <div class="comments-head">
            <h3>Community leaderboard</h3>
            <span>Weekly signal</span>
          </div>
          ${ranked.map((item, index) => `
            <a class="leaderboard-row" href="#/profile/${item.username}">
              <span class="rank">#${index + 1}</span>
              <span class="avatar">${initials(item.username)}</span>
              <span><strong>${item.name} ${verificationBadge(item)}</strong><small>@${item.username}</small></span>
              <b>${formatNumber(item.likes + item.followers)}</b>
            </a>
          `).join("")}
        </div>
        <div class="panel">
          <h3>Signal methodology</h3>
          <p class="muted">Leaderboard rank combines approval rate, save depth, comment quality, creator consistency and drop readiness.</p>
          <div class="chart">
            ${[86, 71, 94, 62, 78, 88, 69].map((h) => `<i class="bar" style="--h:${h}%"></i>`).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function notificationsCenter() {
  return `
    <div class="notifications-list">
      ${notifications.map((item) => `
        <article class="notification-card ${item.tone}">
          <span>${item.type}</span>
          <strong>${item.title}</strong>
          <small>${item.time}</small>
        </article>
      `).join("")}
    </div>
  `;
}

function dropCountdownHero() {
  const drop = drops[0];
  return `
    <section class="section-tight">
      <div class="container">
        <div class="trending-drop">
          <div>
            <span class="eyebrow">Trending drop countdown</span>
            <h2 class="section-title">${drop.id} / ${drop.name}</h2>
            <p class="section-copy">${drop.copy}</p>
          </div>
          <div class="countdown" data-date="${drop.date}">
            ${["00", "00", "00", "00"].map((value, i) => `<span class="timebox"><strong>${value}</strong><span>${["Days", "Hours", "Min", "Sec"][i]}</span></span>`).join("")}
          </div>
        </div>
      </div>
    </section>
  `;
}

function designCard(design, options = {}) {
  const c = creator(design.creator);
  const liked = state.liked.has(design.slug);
  const saved = state.saved.has(design.slug);
  const likes = design.likes + (liked ? 1 : 0);
  return `
    <article class="design-card ${options.compact ? "compact" : ""} pin-${design.height || "short"}" data-card="${design.slug}">
      <div class="quick-actions">
        <button class="icon-btn ${liked ? "liked" : ""}" data-action="like" data-slug="${design.slug}" title="Like design">${icons.heart}</button>
        <button class="icon-btn ${saved ? "saved" : ""}" data-action="save" data-slug="${design.slug}" title="Save design">${icons.bookmark}</button>
        <a class="icon-btn" href="#/design/${design.slug}" title="Open project">${icons.open}</a>
      </div>
      <a class="card-media" href="#/design/${design.slug}" aria-label="Open ${design.title}">
        ${visual(design)}
        <div class="card-social-overlay">
          <span class="creator-badge"><span class="avatar">${initials(c.username)}</span>@${c.username}${verificationBadge(c)}</span>
          <span class="approval-chip">${design.approval}%</span>
        </div>
      </a>
      <div class="card-body">
        <div class="card-top">
          <div>
            <h3 class="card-title">${design.title}</h3>
            <a class="creator-inline" href="#/profile/${c.username}">
              <span class="avatar">${initials(c.username)}</span>
              <span>@${c.username}</span>${verificationBadge(c)}
            </a>
          </div>
          ${palette(design)}
        </div>
        <p class="card-caption">${design.description}</p>
        <div class="tag-row" style="gap:7px; flex-wrap:wrap;">
          <span class="tag">${design.category}</span>
          <span class="tag">${design.clothingType}</span>
          <span class="tag">${design.fabric}</span>
        </div>
        <div class="card-meta">
          <span class="metric-pill">${icons.heart}${formatNumber(likes)}</span>
          <span class="metric-pill">${icons.comment}${formatNumber(design.comments)}</span>
          <span class="metric-pill">${design.approval}% approval</span>
        </div>
        <div class="card-footer-action">
          <span>${design.style}</span>
          <a href="#/design/${design.slug}">Open project ${icons.open}</a>
        </div>
      </div>
    </article>
  `;
}

function homePage() {
  const top = [...designs].sort((a, b) => b.likes - a.likes);
  return shell(`
    <section class="hero home-hero">
      <div class="hero-masthead" aria-hidden="true">PULSE</div>
      <div class="hero-light-field" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="runway-lines" aria-hidden="true"></div>
      <div class="container hero-layout">
        <div class="hero-copy-panel">
          <div class="vertical-signature" aria-hidden="true">PULSE / FUTURE GARMENTS / VOTED BY CULTURE</div>
          <span class="eyebrow">Community powered drops</span>
          <h1>THE COMMUNITY CREATES <span>THE FUTURE OF STREETWEAR</span></h1>
          <p class="hero-copy">Submit designs. Get voted by the community. Become part of the next drop. PULSE turns fashion concepts into a living public studio.</p>
          <div class="hero-actions">
            <a class="primary-btn" href="#/community">${icons.search}<span>Explore Designs</span></a>
            <a class="ghost-btn" href="#/submit">${icons.upload}<span>Submit Yours</span></a>
          </div>
          <div class="hero-proof">
            <span>Creator-owned concepts</span>
            <span>Community signal</span>
            <span>Selected for production</span>
          </div>
          <div class="hero-meta">
            <div class="stat-tile"><span class="stat-value" data-count="18420">18.4K</span><span class="stat-label">Designs submitted</span></div>
            <div class="stat-tile"><span class="stat-value" data-count="6400">6.4K</span><span class="stat-label">Active creators</span></div>
            <div class="stat-tile"><span class="stat-value" data-count="920000">920K</span><span class="stat-label">Community votes</span></div>
          </div>
        </div>
        <div class="hero-stage">
          <div class="hero-lookbook hero-lookbook-a">
            ${visual(top[1], "short")}
          </div>
          <div class="hero-lookbook hero-lookbook-b">
            ${visual(top[2], "short")}
          </div>
          <div class="hero-frame">
            ${visual(top[0], "tall")}
            <div class="editorial-tag">
              <strong>${top[0].title}</strong>
              <small>@${top[0].creator} / ${top[0].approval}% approved</small>
            </div>
          </div>
          <div class="floating-card panel">
            <div class="mini-metric"><span>Trending velocity</span><strong>+38%</strong></div>
            <div class="progress" style="--value:82%"><span></span></div>
            <p class="muted" style="margin-bottom:0;">AI ranking detects high save rate, comment depth and creator momentum.</p>
          </div>
        </div>
      </div>
      <div class="hero-ticker" aria-hidden="true">
        <span>COMMUNITY DESIGN INDEX</span>
        <span>FUTURE DROP LAB</span>
        <span>STREETWEAR SIGNAL</span>
        <span>CREATOR-FIRST PLATFORM</span>
      </div>
    </section>

    ${alphaGate()}
    ${onboardingPreview()}
    ${dropCountdownHero()}
    ${editorialBand()}

    <section class="section">
      <div class="wide-container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Trending concepts</span>
            <h2 class="section-title">Live community heat</h2>
          </div>
          <a class="text-btn" href="#/community">Open community ${icons.open}</a>
        </div>
        <div class="carousel">${top.slice(0, 6).map((item) => designCard(item, { compact: true })).join("")}</div>
      </div>
    </section>

    ${featuredCreatorsSection()}

    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Featured creators</span>
            <h2 class="section-title">Designers are the brand</h2>
          </div>
          <p class="section-copy">Profiles foreground contribution, rank, taste and community value so creators feel visible from day one.</p>
        </div>
        <div class="creator-grid">
          ${creators.slice(0, 3).map(creatorCard).join("")}
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Latest drops</span>
            <h2 class="section-title">Community selected releases</h2>
          </div>
          <a class="text-btn" href="#/drops">View drops ${icons.open}</a>
        </div>
        <div class="drop-grid">
          ${drops.map(dropCard).join("")}
        </div>
      </div>
    </section>
  `);
}

function creatorCard(item) {
  return `
    <article class="creator-card">
      <div class="creator-card-head">
        <a class="creator-inline" href="#/profile/${item.username}">
          <span class="avatar large">${initials(item.username)}</span>
          <span>
            <h3 class="creator-name">${item.name} ${verificationBadge(item)}</h3>
            <span>@${item.username}</span>
          </span>
        </a>
        <span class="rank">#${item.rank}</span>
      </div>
      <p class="creator-bio">${item.bio}</p>
      <div class="card-meta">
        <span class="metric-pill">${formatNumber(item.followers)} followers</span>
        <span class="metric-pill">${formatNumber(item.likes)} likes</span>
        <span class="metric-pill">${item.specialty}</span>
        <span class="status-pill">${item.badge}</span>
      </div>
    </article>
  `;
}

function creatorStories() {
  return `
    <div class="creator-stories" aria-label="Featured creators">
      ${creators.map((item) => `
        <a class="story" href="#/profile/${item.username}">
          <span class="story-ring"><span class="avatar">${initials(item.username)}</span></span>
          <span>@${item.username}${verificationBadge(item)}</span>
          <small>${item.badge}</small>
        </a>
      `).join("")}
    </div>
  `;
}

function communityPage() {
  const filtered = filteredDesigns();
  return shell(`
    <section class="section-tight community-surface">
      <div class="community-watermark" aria-hidden="true">PULSE FEED</div>
      <div class="wide-container">
        <div class="section-head community-head">
          <div>
            <span class="section-kicker">Community feed</span>
            <h1 class="section-title">Explore submitted concepts</h1>
          </div>
          <p class="section-copy">A Pinterest-style design network where likes, saves and comments move ideas toward real production.</p>
        </div>
        ${creatorStories()}
        <div class="community-tabs" aria-label="Community modes">
          <button class="active" type="button">For you</button>
          <button type="button">Trending</button>
          <button type="button">Outerwear</button>
          <button type="button">Footwear</button>
          <button type="button">Rising creators</button>
        </div>
        ${categoryRail()}
        ${filters()}
        <div class="masonry" id="communityGrid">
          ${filtered.slice(0, state.communityLimit).map((item) => designCard(item)).join("")}
        </div>
        ${
          filtered.length > state.communityLimit
            ? `<div style="display:grid; place-items:center; padding:28px;"><button class="ghost-btn" data-action="loadMore">Load more concepts</button></div>`
            : `<div class="empty"><div><strong>No designs found</strong><p>Try a different search or filter.</p></div></div>`
        }
      </div>
    </section>
    ${leaderboardSection()}
  `);
}

function filters() {
  const categories = ["All", ...new Set(designs.map((item) => item.category))];
  const types = ["All", ...new Set(designs.map((item) => item.clothingType))];
  const fabrics = ["All", ...new Set(designs.map((item) => item.fabric))];
  return `
    <form class="filters" id="filters">
      <label>
        <span class="hide">Search</span>
        <input class="field" name="q" value="${state.filters.q}" placeholder="Search concepts, tags, creators" />
      </label>
      <label><span class="hide">Category</span>${select("category", categories, state.filters.category)}</label>
      <label><span class="hide">Type</span>${select("type", types, state.filters.type)}</label>
      <label><span class="hide">Fabric</span>${select("fabric", fabrics, state.filters.fabric)}</label>
      <button class="ghost-btn" type="submit">${icons.search}<span>Filter</span></button>
    </form>
  `;
}

function select(name, values, current) {
  return `<select class="select" name="${name}">${values.map((value) => `<option value="${value}" ${value === current ? "selected" : ""}>${value}</option>`).join("")}</select>`;
}

function filteredDesigns() {
  const q = state.filters.q.trim().toLowerCase();
  return designs
    .filter((item) => {
      const haystack = [item.title, item.creator, item.category, item.clothingType, item.fabric, item.style, ...item.tags].join(" ").toLowerCase();
      return (
        (!q || haystack.includes(q)) &&
        (state.filters.category === "All" || item.category === state.filters.category) &&
        (state.filters.type === "All" || item.clothingType === state.filters.type) &&
        (state.filters.fabric === "All" || item.fabric === state.filters.fabric)
      );
    })
    .sort((a, b) => trendingScore(b) - trendingScore(a));
}

function trendingScore(item) {
  const saveWeight = item.saves * 1.7;
  const commentWeight = item.comments * 8;
  const approvalWeight = item.approval * 140;
  const likedBonus = state.liked.has(item.slug) ? 250 : 0;
  return item.likes + saveWeight + commentWeight + approvalWeight + likedBonus;
}

function detailPage(slug) {
  const item = designBySlug(slug);
  const c = creator(item.creator);
  const related = designs.filter((design) => design.slug !== item.slug && design.category === item.category).slice(0, 3);
  return shell(`
    <section class="detail-hero">
      <div class="wide-container detail-layout">
        <div class="gallery">
          ${visual(item, "tall")}
          <div class="gallery-stack">
            ${visual({ ...item, height: "short", garment: item.garment.replace("145deg", "45deg") })}
            ${visual({ ...item, height: "short", visual: item.visual.replace("135deg", "220deg") })}
            ${visual({ ...item, height: "short", garment: "linear-gradient(145deg, #0a0a0a, #eeeeea)" })}
          </div>
        </div>
        <aside class="panel">
          <span class="eyebrow">${item.category} concept</span>
          <h1 class="detail-title">${item.title}</h1>
          <a class="creator-inline" href="#/profile/${c.username}">
            <span class="avatar">${initials(c.username)}</span>
            <span>@${c.username}</span>
          </a>
          <p class="muted">${item.description}</p>
          <div class="approval">
            <div class="price-row"><strong>${item.approval}% community approval</strong><span>${formatNumber(item.likes)} votes</span></div>
            <div class="progress" style="--value:${item.approval}%"><span></span></div>
          </div>
          <div class="hero-actions">
            <button class="primary-btn ${state.liked.has(item.slug) ? "liked" : ""}" data-action="like" data-slug="${item.slug}">${icons.heart}<span>Like</span></button>
            <button class="ghost-btn ${state.saved.has(item.slug) ? "saved" : ""}" data-action="save" data-slug="${item.slug}">${icons.bookmark}<span>Save</span></button>
            <button class="ghost-btn" data-action="share" data-slug="${item.slug}">${icons.open}<span>Share</span></button>
          </div>
        </aside>
      </div>
    </section>

    <section class="section-tight">
      <div class="container split">
        <div class="panel">
          <div class="section-head">
            <div>
              <span class="section-kicker">Full product specifications</span>
              <h2 class="section-title">From concept to garment</h2>
            </div>
          </div>
          <div class="spec-grid">
            ${spec("Title", item.title)}
            ${spec("Creator", `@${item.creator}`)}
            ${spec("Inspiration", item.inspiration)}
            ${spec("Streetwear style", item.style)}
            ${spec("Fit", item.fit)}
            ${spec("Cut", item.cut)}
            ${spec("Embroidery", item.embroidery)}
            ${spec("Print type", item.printType)}
            ${spec("Fabric", item.fabric)}
            ${spec("GSM", item.gsm)}
            ${spec("Colorway", item.colorway)}
            ${spec("Oversized or fitted", item.fit)}
            ${spec("Washing style", item.washing)}
            ${spec("Target aesthetic", item.aesthetic)}
          </div>
        </div>
        <div class="panel">
          <div class="comments-head">
            <h3>Community comments</h3>
            <span>${formatNumber(item.comments)} signals</span>
          </div>
          ${comment("raye.forms", "The pocket placement makes this feel production-ready. Would buy in graphite instantly.")}
          ${comment("drift.unit", "Approval bar is deserved. The hem tension detail is the strongest part.")}
          ${comment(c.username, "I am testing a second mockup with a lighter liner and hidden cuff pullers.")}
          <form class="hero-actions" data-comment-form>
            <input class="field" placeholder="Add a comment" aria-label="Add a comment" />
            <button class="ghost-btn" type="submit">Post</button>
          </form>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="wide-container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Related concepts</span>
            <h2 class="section-title">Same lane, different energy</h2>
          </div>
        </div>
        <div class="carousel">${related.map((design) => designCard(design, { compact: true })).join("")}</div>
      </div>
    </section>
  `);
}

function spec(label, value) {
  return `<div class="spec-card"><span class="spec-label">${label}</span><span class="spec-value">${value}</span></div>`;
}

function comment(user, text) {
  return `
    <div class="comment">
      <span class="avatar">${initials(user)}</span>
      <div>
        <p style="margin:0;"><strong>@${user}</strong><span class="muted">${text}</span></p>
        <div class="comment-tools"><button type="button">Signal</button><button type="button">Reply</button><span>now</span></div>
      </div>
    </div>
  `;
}

function profilePage(username) {
  const c = creator(username);
  const uploaded = designs.filter((item) => item.creator === c.username);
  return shell(`
    <section class="section-tight">
      <div class="container">
        <div class="panel profile-hero profile-editorial">
          <div class="profile-cover" aria-hidden="true"></div>
          <span class="avatar large profile-avatar-xl">${initials(c.username)}</span>
          <div>
            <span class="section-kicker">Creator profile</span>
            <h1 class="section-title">${c.name}</h1>
            <p class="muted">@${c.username} - ${c.bio}</p>
            <div class="profile-stats">
              <span><strong>${formatNumber(c.followers)}</strong>Followers</span>
              <span><strong>${formatNumber(c.following)}</strong>Following</span>
              <span><strong>${formatNumber(uploaded.reduce((sum, item) => sum + item.likes, 0))}</strong>Total likes</span>
              <span><strong>${uploaded.length}</strong>Uploaded designs</span>
            </div>
          </div>
          <div class="profile-actions">
            <button class="primary-btn" data-action="follow">Follow</button>
            <a class="ghost-btn" href="#/community">View feed</a>
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wide-container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Featured projects</span>
            <h2 class="section-title">${c.name}'s design language</h2>
          </div>
        </div>
        <div class="masonry">${uploaded.map((item) => designCard(item)).join("")}</div>
      </div>
    </section>
  `);
}

function explorePage() {
  const ranked = [...designs].sort((a, b) => trendingScore(b) - trendingScore(a));
  const recos = ranked.slice(0, 6);
  return shell(`
    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">AI discover</span>
            <h1 class="section-title">Taste graph recommendations</h1>
          </div>
          <p class="section-copy">The recommendation engine scores vote velocity, save depth, creator rank, category momentum and similarity to your saved concepts.</p>
        </div>
        <div class="reco-grid">
          <div class="panel">
            <h3>Trending algorithm</h3>
            <p class="muted">Score = likes + save depth + comment density + approval confidence + creator velocity.</p>
            <div class="chart">
              ${[82, 58, 92, 66, 74, 88, 61, 79].map((h) => `<i class="bar" style="--h:${h}%"></i>`).join("")}
            </div>
          </div>
          <div class="panel">
            <h3>Creator ranking</h3>
            ${creators.map((item) => `<div class="admin-row" style="padding:9px 0;"><span>@${item.username}</span><strong>#${item.rank}</strong></div>`).join("")}
          </div>
          <div class="panel">
            <h3>Category heat</h3>
            ${["Outerwear", "Tops", "Footwear", "Bottoms"].map((cat, index) => `<div style="margin:13px 0;"><div class="price-row"><span>${cat}</span><strong>${[94, 82, 77, 69][index]}%</strong></div><div class="progress" style="--value:${[94, 82, 77, 69][index]}%"><span></span></div></div>`).join("")}
          </div>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="wide-container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Recommended for you</span>
            <h2 class="section-title">High signal concepts</h2>
          </div>
          <a class="text-btn" href="#/community">Adjust filters ${icons.open}</a>
        </div>
        <div class="carousel">${recos.map((item) => designCard(item, { compact: true })).join("")}</div>
      </div>
    </section>
  `);
}

function onboardingPage() {
  return shell(`
    <section class="auth-stage onboarding-page">
      <div class="auth-light-field" aria-hidden="true"><span></span><span></span></div>
      <div class="auth-layout">
        <div class="auth-editorial">
          <span class="eyebrow">Alpha onboarding</span>
          <h1 class="auth-title">Build your creator signal</h1>
          <p class="hero-copy">PULSE learns your taste lanes, saves your reference archive and turns your first actions into a personalized community feed.</p>
          <div class="auth-proof-grid">
            <div><strong>01</strong><span>Identity</span></div>
            <div><strong>02</strong><span>Taste lanes</span></div>
            <div><strong>03</strong><span>First signal</span></div>
          </div>
        </div>
        <form class="auth-panel onboarding-form" data-onboarding-form>
          <div class="form-card">
            <div class="submit-steps">
              <span class="active">01 Identity</span>
              <span>02 Categories</span>
              <span>03 Notifications</span>
              <span>04 Submit</span>
            </div>
            <input class="field" name="username" placeholder="Creator username" required />
            <select class="select" name="lane" required style="margin-top:12px;">
              <option>Technical outerwear</option>
              <option>Monochrome essentials</option>
              <option>Future sport</option>
              <option>Studio uniforms</option>
            </select>
            <div class="category-rail compact">
              ${categories.map((item) => `<button type="button" data-action="category" data-category="${item.name}"><span>${item.code}</span><strong>${item.name}</strong><small>${item.signal}%</small></button>`).join("")}
            </div>
            <button class="primary-btn" type="submit" style="margin-top:14px;">Complete onboarding</button>
          </div>
        </form>
      </div>
    </section>
  `);
}

function waitlistPage() {
  return shell(`
    <section class="auth-stage waitlist-page">
      <div class="auth-light-field" aria-hidden="true"><span></span><span></span></div>
      <div class="auth-layout">
        <div class="auth-editorial">
          <span class="eyebrow">${icons.lock} Invite-only alpha</span>
          <h1 class="auth-title">Join the PULSE queue</h1>
          <p class="hero-copy">We are opening the platform in controlled waves for creators, voters, moderators and early collectors.</p>
          <div class="hero-meta">
            <div class="stat-tile"><span class="stat-value">${alphaAccess.joined}</span><span class="stat-label">Accepted</span></div>
            <div class="stat-tile"><span class="stat-value">${alphaAccess.seats - alphaAccess.joined}</span><span class="stat-label">Seats left</span></div>
            <div class="stat-tile"><span class="stat-value">4</span><span class="stat-label">Access waves</span></div>
          </div>
        </div>
        <form class="auth-panel waitlist-form" data-waitlist-form>
          <div class="form-card">
            <h3>Request access</h3>
            <input class="field" name="email" type="email" placeholder="email@studio.com" required />
            <input class="field" name="invite" placeholder="Invite code" style="margin-top:12px;" />
            <textarea class="textarea" name="reason" placeholder="Why should PULSE invite you?" style="margin-top:12px;"></textarea>
            <button class="primary-btn" type="submit" style="margin-top:12px;">Join waitlist</button>
            ${state.waitlist ? `<p class="muted">Queue position #${state.waitlist.position}. Status: ${state.inviteCode ? "Priority invite" : "Pending review"}.</p>` : `<p class="muted">Approved applicants receive onboarding, moderation access and early drop voting.</p>`}
          </div>
        </form>
      </div>
    </section>
  `);
}

function notificationsPage() {
  return shell(`
    <section class="section-tight">
      <div class="container split">
        <div>
          <span class="eyebrow">${icons.bell} Notifications</span>
          <h1 class="detail-title">Your studio pulse</h1>
          <p class="hero-copy">Follow drop deadlines, moderation status, creator verification and voting moments from one center.</p>
        </div>
        <div class="panel">
          <div class="comments-head"><h3>Notification preferences</h3><span>Live</span></div>
          <div class="notification-toggle"><span>Drop deadlines</span><strong>On</strong></div>
          <div class="notification-toggle"><span>Moderation updates</span><strong>On</strong></div>
          <div class="notification-toggle"><span>Creator follows</span><strong>Digest</strong></div>
        </div>
      </div>
    </section>
    <section class="section-tight">
      <div class="container">${notificationsCenter()}</div>
    </section>
  `);
}

function leaderboardPage() {
  return shell(`
    <section class="section-tight">
      <div class="container">
        <span class="eyebrow">Community rank</span>
        <h1 class="detail-title">Leaderboard</h1>
        <p class="hero-copy">Creator ranking based on community approval, save velocity, production readiness and moderation quality.</p>
      </div>
    </section>
    ${leaderboardSection()}
  `);
}

function categoriesPage() {
  return shell(`
    <section class="section-tight">
      <div class="container">
        <span class="eyebrow">Design taxonomy</span>
        <h1 class="detail-title">Categories</h1>
        <p class="hero-copy">Browse PULSE by production lane, material behavior and community heat.</p>
        ${categoryRail()}
      </div>
    </section>
    <section class="section">
      <div class="wide-container masonry">${filteredDesigns().map((item) => designCard(item)).join("")}</div>
    </section>
  `);
}

const productionOptionGroups = [
  {
    name: "category",
    label: "Product category",
    options: ["T-shirt", "Sweatshirt / Hoodie", "Pants / Jogging"],
  },
  {
    name: "decorationType",
    label: "Decoration type",
    options: ["Print", "Embroidery", "Print + Embroidery"],
  },
  {
    name: "logoPlacement",
    label: "Logo placement",
    options: ["Front center", "Small chest", "Back", "Sleeve", "Leg"],
  },
  {
    name: "fabricWeight",
    label: "Fabric weight",
    options: ["Light", "Medium", "Heavy"],
  },
  {
    name: "colorBase",
    label: "Color base",
    options: ["Black", "White", "Grey", "Navy", "Cream"],
  },
  {
    name: "style",
    label: "Style",
    options: ["Minimal", "Streetwear", "Futuristic", "Vintage", "Sport"],
  },
];

const topFitOptions = [
  { label: "Straight Fit", shape: "top-straight", note: "Clean vertical body, easy everyday proportion." },
  { label: "Slim Fit", shape: "top-slim", note: "Closer chest and sleeve line for a sharper silhouette." },
  { label: "Oversized", shape: "top-oversized", note: "Dropped shoulder, longer sleeve, roomier streetwear volume." },
  { label: "Boxy Fit", shape: "top-boxy", note: "Shorter length with a wide square body block." },
];

const pantsFitOptions = [
  { label: "Baggy", shape: "pant-baggy", note: "Wide volume from hip to hem with relaxed drape." },
  { label: "Flare", shape: "pant-flare", note: "Controlled upper leg with a wider opening below the knee." },
  { label: "Skinny", shape: "pant-skinny", note: "Narrow leg profile with close fit through the ankle." },
  { label: "Bootcut", shape: "pant-bootcut", note: "Straight thigh with subtle expansion over footwear." },
  { label: "Straight Leg", shape: "pant-straight", note: "Uniform leg width for a balanced classic shape." },
  { label: "Relaxed Fit", shape: "pant-relaxed", note: "Comfortable thigh and knee with controlled width." },
];

function fitOptionsForCategory(category) {
  return category === "Pants / Jogging" ? pantsFitOptions : topFitOptions;
}

function productionOptionGroup(group) {
  return `
    <fieldset class="production-option-group">
      <legend>${group.label}</legend>
      <div class="option-pills">
        ${group.options.map((option, index) => {
          const id = `${group.name}-${option.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
          return `
            <label class="option-pill" for="${id}">
              <input id="${id}" type="radio" name="${group.name}" value="${option}" ${index === 0 ? "checked" : ""} />
              <span>${option}</span>
            </label>
          `;
        }).join("")}
      </div>
    </fieldset>
  `;
}

function fitOptionGroup(category = "T-shirt") {
  const options = fitOptionsForCategory(category);
  const mode = category === "Pants / Jogging" ? "Pants system" : "T-shirt / sweat system";
  return `
    <fieldset class="production-option-group fit-option-group" id="fitOptionGroup">
      <legend>Fit <span>${mode}</span></legend>
      <div class="fit-chip-grid">
        ${options.map((option, index) => {
          const id = `fit-${option.label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
          return `
            <label class="option-pill fit-pill" for="${id}">
              <input id="${id}" type="radio" name="fit" value="${option.label}" data-shape="${option.shape}" data-note="${option.note}" ${index === 0 ? "checked" : ""} />
              <span>
                <span class="fit-icon fit-icon--${option.shape}" aria-hidden="true"><i></i></span>
                <span class="fit-label">${option.label}</span>
              </span>
            </label>
          `;
        }).join("")}
      </div>
    </fieldset>
  `;
}

function fitPreviewMarkup(category = "T-shirt", fit = fitOptionsForCategory(category)[0]) {
  const options = fitOptionsForCategory(category);
  const selected = typeof fit === "string" ? options.find((option) => option.label === fit) || options[0] : fit;
  const label = selected.label;
  const note = selected.note;
  return `
    <div class="fit-preview" id="fitPreview">
      <div class="fit-preview-stage">
        <span class="fit-preview-figure fit-preview-figure--${selected.shape}" aria-hidden="true"><i></i></span>
      </div>
      <div>
        <span class="fit-preview-kicker">${category === "Pants / Jogging" ? "Pants block" : "Upper-body block"}</span>
        <strong id="fitPreviewTitle">${label}</strong>
        <p id="fitPreviewNote">${note}</p>
      </div>
    </div>
  `;
}

function submitPage() {
  return shell(`
    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Submit design</span>
            <h1 class="section-title">Upload a future drop concept</h1>
          </div>
          <p class="section-copy">A premium submission flow that turns creative concepts into manufacturable drop proposals.</p>
        </div>
        <div class="split">
          <form class="form-card" id="submitForm">
            <div class="submit-steps">
              <span class="active">01 Concept</span>
              <span>02 Visuals</span>
              <span>03 Specs</span>
              <span>04 Review</span>
            </div>
            <div class="upload-zone" id="uploadZone">
              <label>
                ${icons.upload}
                <strong style="display:block; margin:10px 0 6px;">Drop cover and mockups here</strong>
                <span class="muted">PNG, JPG or WebP. Live preview updates instantly.</span>
                <input id="fileInput" type="file" accept="image/*" multiple />
              </label>
            </div>
            <div class="upload-status"><span></span><strong>Ready for visual upload</strong></div>
            <div class="form-grid" style="margin-top:14px;">
              <input class="field" name="title" placeholder="Title" required />
              <textarea class="textarea full" name="description" placeholder="Description" required></textarea>
              <input class="field full" name="inspiration" placeholder="Inspiration" />
              <input class="field" name="sizing" placeholder="Sizing notes" />
              <input class="field full" name="tags" placeholder="Tags separated by commas" />
            </div>
            <p class="production-note">To keep production realistic, PULSE currently only accepts limited clothing types and production options.</p>
            <div class="production-matrix">
              ${productionOptionGroup(productionOptionGroups[0])}
              ${fitOptionGroup()}
              ${productionOptionGroups.slice(1).map(productionOptionGroup).join("")}
            </div>
            <div class="hero-actions">
              <button class="primary-btn" type="submit">${icons.upload}<span>Publish concept</span></button>
              <button class="ghost-btn" type="button" data-action="draft">Save draft</button>
            </div>
          </form>
          <aside class="panel preview-panel">
            <h3>Live preview</h3>
            <div class="preview-card">
              <div class="preview-image" id="previewImage">${visual(designs[1], "short")}</div>
              <div class="card-body">
                <h3 class="card-title" id="previewTitle">Untitled concept</h3>
                <p class="muted" id="previewDescription">Your concept description will appear here as the community card takes shape.</p>
                <div class="card-meta" id="previewSpecs">
                  <span class="metric-pill">T-shirt</span><span class="metric-pill">Straight Fit</span><span class="metric-pill">Print</span>
                </div>
              </div>
            </div>
            ${fitPreviewMarkup()}
          </aside>
        </div>
      </div>
    </section>
  `);
}

function dropsPage() {
  return shell(`
    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Drops</span>
            <h1 class="section-title">Community winners become real product</h1>
          </div>
          <p class="section-copy">Every drop carries its selected creators, voting context and launch countdown.</p>
        </div>
        <div class="drop-grid">${drops.map(dropCard).join("")}</div>
      </div>
    </section>
    <section class="section">
      <div class="wide-container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Selected concepts</span>
            <h2 class="section-title">Current drop candidates</h2>
          </div>
        </div>
        <div class="carousel">${products.map((item) => designCard(item, { compact: true })).join("")}</div>
      </div>
    </section>
  `);
}

function dropCard(drop) {
  const featured = drop.winners.map(designBySlug);
  return `
    <article class="drop-card">
      <div>
        <span class="status-pill">${drop.status}</span>
        <h3 class="section-title" style="font-size:30px;">${drop.id}<br>${drop.name}</h3>
        <p class="muted">${drop.copy}</p>
      </div>
      <div>
        <div class="countdown" data-date="${drop.date}">
          ${["00", "00", "00", "00"].map((value, i) => `<span class="timebox"><strong>${value}</strong><span>${["Days", "Hours", "Min", "Sec"][i]}</span></span>`).join("")}
        </div>
        <div class="card-meta" style="margin-top:13px;">
          ${featured.map((item) => `<a class="tag" href="#/design/${item.slug}">${item.title}</a>`).join("")}
          <span class="status-pill">Winner badge</span>
        </div>
      </div>
    </article>
  `;
}

function shopPage() {
  return shell(`
    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Shop</span>
            <h1 class="section-title">Approved concepts only</h1>
          </div>
          <p class="section-copy">The commerce layer stays selective: only community-approved projects enter production.</p>
        </div>
        <div class="product-grid">
          ${products.map(productCard).join("")}
        </div>
      </div>
    </section>
  `);
}

function productCard(item) {
  return `
    <article class="product-card">
      ${visual(item)}
      <div class="price-row">
        <div>
          <h3 class="card-title">${item.title}</h3>
          <p class="muted">${item.productStatus}</p>
        </div>
        <strong>$${item.price}</strong>
      </div>
      <div class="hero-actions">
        <a class="primary-btn" href="#/design/${item.slug}">View product</a>
        <button class="ghost-btn" data-action="notify">Notify me</button>
      </div>
    </article>
  `;
}

function contactPage() {
  return shell(`
    <section class="section-tight">
      <div class="container split">
        <div>
          <span class="eyebrow">Contact PULSE</span>
          <h1 class="detail-title">Build the future studio with us</h1>
          <p class="hero-copy">For creator partnerships, manufacturing, retail collaborations and investment conversations.</p>
          <div class="hero-meta">
            <div class="stat-tile"><span class="stat-value">24h</span><span class="stat-label">Creator support</span></div>
            <div class="stat-tile"><span class="stat-value">3</span><span class="stat-label">Drop lanes</span></div>
            <div class="stat-tile"><span class="stat-value">1</span><span class="stat-label">Community studio</span></div>
          </div>
        </div>
        <form class="form-card" data-contact-form>
          <input class="field" placeholder="Name" required />
          <input class="field" placeholder="Email" type="email" required style="margin-top:12px;" />
          <select class="select" style="margin-top:12px;"><option>Creator partnership</option><option>Manufacturing</option><option>Retail</option><option>Press</option></select>
          <textarea class="textarea" placeholder="Message" required style="margin-top:12px;"></textarea>
          <button class="primary-btn" type="submit" style="margin-top:12px;">Send message</button>
        </form>
      </div>
    </section>
  `);
}

function adminPage() {
  const pending = designs.slice(0, 5);
  return shell(`
    <section class="section-tight">
      <div class="container">
        <div class="section-head">
          <div>
            <span class="section-kicker">Admin dashboard</span>
            <h1 class="section-title">Studio command center</h1>
          </div>
          <p class="section-copy">Operational controls for submissions, featured projects, drop curation and analytics.</p>
        </div>
        <div class="admin-grid dashboard-metrics">
          ${adminMetric("Pending designs", "128", "+14 today")}
          ${adminMetric("Approval rate", "23%", "Quality threshold")}
          ${adminMetric("Votes today", "48.2K", "+18%")}
        </div>
      </div>
    </section>
    <section class="section-tight">
      <div class="container split">
        <div class="panel dashboard-queue">
          <div class="comments-head">
            <h3>Moderation queue</h3>
            <span>Live review</span>
          </div>
          <div class="moderation-toolbar">
            <button class="mini-btn">All</button>
            <button class="mini-btn">Low risk</button>
            <button class="mini-btn">Needs spec</button>
            <button class="mini-btn">Drop-ready</button>
          </div>
          ${moderationItems.map((item) => `
            <div class="admin-row" style="padding:12px 0; border-top:1px solid rgba(255,255,255,.08);">
              <div>
                <strong>${item.design}</strong>
                <p class="muted" style="margin:4px 0 0;">@${item.creator} / ${item.queue} / ${item.score}% signal</p>
              </div>
              <span style="display:flex; gap:8px; align-items:center;"><span class="risk-pill ${item.risk.toLowerCase()}">${item.risk}</span><button class="mini-btn" data-action="approve">${item.status}</button><button class="mini-btn" data-action="reject">Reject</button></span>
            </div>
          `).join("")}
        </div>
        <div class="panel dashboard-analytics">
          <h3>Analytics</h3>
          <div class="chart">
            ${[42, 68, 53, 81, 74, 96, 88, 70, 91].map((h) => `<i class="bar" style="--h:${h}%"></i>`).join("")}
          </div>
          <div class="card-meta">
            <span class="metric-pill">Likes analytics</span>
            <span class="metric-pill">Trending creators</span>
            <span class="metric-pill">Drop forecast</span>
          </div>
          <div class="waitlist-admin">
            <div class="price-row"><span>Waitlist applicants</span><strong>1,248</strong></div>
            <div class="price-row"><span>Invite conversion</span><strong>38%</strong></div>
            <div class="price-row"><span>Moderator SLA</span><strong>4h</strong></div>
          </div>
        </div>
      </div>
    </section>
  `);
}

function adminMetric(label, value, sub) {
  return `<div class="admin-card"><span class="section-kicker">${label}</span><span class="stat-value">${value}</span><p class="muted">${sub}</p></div>`;
}

function getRoute() {
  const raw = location.hash.replace(/^#\/?/, "") || "home";
  const [page, param] = raw.split("/");
  return { page, param };
}

function render() {
  document.documentElement.classList.add("route-changing");
  applyLanguageSettings();
  const route = getRoute();
  const app = document.getElementById("app");
  const pages = {
    home: homePage,
    community: communityPage,
    explore: explorePage,
    onboarding: onboardingPage,
    waitlist: waitlistPage,
    notifications: notificationsPage,
    leaderboard: leaderboardPage,
    categories: categoriesPage,
    submit: submitPage,
    drops: dropsPage,
    shop: shopPage,
    contact: contactPage,
    admin: adminPage,
  };
  if (route.page === "design") {
    app.innerHTML = detailPage(route.param);
  } else if (route.page === "profile") {
    app.innerHTML = profilePage(route.param);
  } else {
    app.innerHTML = (pages[route.page] || pages.home)();
  }
  localizePage();
  window.scrollTo({ top: 0, behavior: "instant" });
  bindInteractions();
  updateCountdowns();
  updateScrollProgress();
  markLoaded();
  window.setTimeout(() => document.documentElement.classList.remove("route-changing"), 420);
}

function bindInteractions() {
  bindBrandFx();
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.lang));
  });

  document.querySelectorAll("[data-action]").forEach((element) => {
    element.addEventListener("click", handleAction);
  });

  const filterForm = document.getElementById("filters");
  if (filterForm) {
    filterForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(filterForm);
      state.filters.q = data.get("q") || "";
      state.filters.category = data.get("category") || "All";
      state.filters.type = data.get("type") || "All";
      state.filters.fabric = data.get("fabric") || "All";
      state.communityLimit = 8;
      render();
    });
  }

  const submitForm = document.getElementById("submitForm");
  if (submitForm) {
    bindSubmit(submitForm);
  }

  document.querySelectorAll("[data-comment-form], [data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      toast(t("Message posted to the prototype stream."));
      form.reset();
    });
  });

  document.querySelectorAll("[data-waitlist-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const invite = String(data.get("invite") || "").trim().toUpperCase();
      const acceptedInvite = alphaAccess.inviteCodes.includes(invite);
      state.inviteCode = acceptedInvite ? invite : "";
      state.waitlist = {
        email: data.get("email") || "",
        invite,
        position: acceptedInvite ? 12 : 148 + Math.floor(Math.random() * 80),
      };
      localStorage.setItem("pulse_waitlist", JSON.stringify(state.waitlist));
      localStorage.setItem("pulse_invite", state.inviteCode);
      toast(acceptedInvite ? t("Invite accepted. Priority alpha access unlocked.") : t("Waitlist request saved. You are in the alpha queue."));
      render();
    });
  });

  document.querySelectorAll("[data-onboarding-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      state.onboardingDone = true;
      localStorage.setItem("pulse_onboarding_done", "true");
      toast(t("Onboarding complete. Your PULSE signal is active."));
      location.hash = "#/community";
    });
  });
}

function handleAction(event) {
  const button = event.currentTarget;
  const action = button.dataset.action;
  const slug = button.dataset.slug;
  if (action === "like") {
    burstAt(button, t("LIKE"));
    state.liked.has(slug) ? state.liked.delete(slug) : state.liked.add(slug);
    persist();
    toast(state.liked.has(slug) ? t("Design liked. Vote signal increased.") : t("Like removed."));
    render();
  }
  if (action === "save") {
    burstAt(button, t("SAVE"));
    state.saved.has(slug) ? state.saved.delete(slug) : state.saved.add(slug);
    persist();
    toast(state.saved.has(slug) ? t("Saved to your future drop board.") : t("Removed from saved."));
    render();
  }
  if (action === "share") {
    navigator.clipboard?.writeText(location.href);
    toast(t("Project link copied."));
  }
  if (action === "loadMore") {
    state.communityLimit += 4;
    render();
  }
  if (["draft", "follow", "notify", "approve", "reject"].includes(action)) {
    toast({
      draft: t("Draft saved locally for the prototype."),
      follow: t("Creator followed."),
      notify: t("Drop notification enabled."),
      approve: t("Submission approved for drop review."),
      reject: t("Submission moved to revision queue."),
    }[action]);
  }
  if (action === "category") {
    state.filters.category = button.dataset.category || "All";
    state.communityLimit = 8;
    toast(t(`${state.filters.category} lane selected.`));
    location.hash = "#/community";
    render();
  }
}

function bindSubmit(form) {
  const fileInput = document.getElementById("fileInput");
  const uploadZone = document.getElementById("uploadZone");
  const previewImage = document.getElementById("previewImage");
  const previewTitle = document.getElementById("previewTitle");
  const previewDescription = document.getElementById("previewDescription");
  const previewSpecs = document.getElementById("previewSpecs");

  const renderFitControls = (category) => {
    const group = document.getElementById("fitOptionGroup");
    if (group) group.outerHTML = fitOptionGroup(category);
    localizeScoped(document.getElementById("fitOptionGroup"));
  };

  const updatePreview = () => {
    const data = new FormData(form);
    const category = data.get("category") || "T-shirt";
    const fit = data.get("fit") || fitOptionsForCategory(category)[0].label;
    const selectedFit = fitOptionsForCategory(category).find((option) => option.label === fit) || fitOptionsForCategory(category)[0];
    previewTitle.textContent = data.get("title") || "Untitled concept";
    previewDescription.textContent = data.get("description") || "Your concept description will appear here as the community card takes shape.";
    if (previewSpecs) {
      const specs = [
        category,
        selectedFit.label,
        data.get("decorationType") || "Print",
        data.get("colorBase") || "Black",
        data.get("fabricWeight") || "Medium",
      ];
      previewSpecs.innerHTML = `${specs.map((spec) => `<span class="metric-pill">${spec}</span>`).join("")}<span class="metric-pill">Pending approval</span>`;
    }
    const fitPreview = document.getElementById("fitPreview");
    if (fitPreview) {
      const figure = fitPreview.querySelector(".fit-preview-figure");
      const kicker = fitPreview.querySelector(".fit-preview-kicker");
      const title = document.getElementById("fitPreviewTitle");
      const note = document.getElementById("fitPreviewNote");
      if (figure) {
        figure.className = `fit-preview-figure fit-preview-figure--${selectedFit.shape}`;
      }
      if (kicker) {
        kicker.textContent = category === "Pants / Jogging" ? "Pants block" : "Upper-body block";
      }
      if (title) title.textContent = selectedFit.label;
      if (note) note.textContent = selectedFit.note;
      localizeScoped(fitPreview);
    }
    localizeScoped(previewSpecs);
  };

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.name === "category") {
      renderFitControls(target.value);
    }
    updatePreview();
  });
  updatePreview();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    toast(t("Concept submitted to community moderation."));
    location.hash = "#/community";
  });

  ["dragenter", "dragover"].forEach((name) => {
    uploadZone.addEventListener(name, (event) => {
      event.preventDefault();
      uploadZone.classList.add("dragging");
    });
  });

  ["dragleave", "drop"].forEach((name) => {
    uploadZone.addEventListener(name, (event) => {
      event.preventDefault();
      uploadZone.classList.remove("dragging");
    });
  });

  uploadZone.addEventListener("drop", (event) => {
    const [file] = event.dataTransfer.files;
    previewFile(file);
  });

  fileInput.addEventListener("change", () => {
    previewFile(fileInput.files[0]);
  });

  function previewFile(file) {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      previewImage.innerHTML = `<img src="${reader.result}" alt="Uploaded design preview" />`;
    };
    reader.readAsDataURL(file);
  }
}

function updateCountdowns() {
  document.querySelectorAll("[data-date]").forEach((element) => {
    const target = new Date(element.dataset.date).getTime();
    const diff = Math.max(0, target - Date.now());
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    [days, hours, mins, secs].forEach((value, index) => {
      const box = element.children[index]?.querySelector("strong");
      if (box) box.textContent = String(value).padStart(2, "0");
    });
  });
}

function toast(message) {
  document.querySelector(".toast")?.remove();
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  document.body.appendChild(node);
  setTimeout(() => node.remove(), 2400);
}

let brandFxBound = false;

function bindBrandFx() {
  if (brandFxBound) return;
  brandFxBound = true;
  const cursor = document.getElementById("pulseCursor");
  const light = document.getElementById("cursorLight");
  window.addEventListener("pointermove", (event) => {
    document.documentElement.style.setProperty("--mx", `${event.clientX}px`);
    document.documentElement.style.setProperty("--my", `${event.clientY}px`);
    if (cursor) {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }
    if (light) {
      light.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    }
  }, { passive: true });

  document.addEventListener("pointerover", (event) => {
    const target = event.target;
    const isInteractive = target instanceof Element && target.closest("a, button, input, select, textarea, .design-card, .option-pill");
    document.documentElement.classList.toggle("cursor-engaged", Boolean(isInteractive));
  });

  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  document.addEventListener("pointerdown", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const surface = target.closest("a, button, .design-card, .story, .mini-editorial-card, .option-pill");
    if (!surface) return;
    rippleAt(event.clientX, event.clientY);
  });
}

function updateScrollProgress() {
  const bar = document.querySelector("#scrollProgress span");
  if (!bar) return;
  const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  const progress = Math.min(1, Math.max(0, window.scrollY / max));
  bar.style.transform = `scaleX(${progress})`;
}

function markLoaded() {
  window.setTimeout(() => {
    document.documentElement.classList.add("is-loaded");
    const loader = document.getElementById("pulseLoader");
    if (loader) {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
      loader.style.pointerEvents = "none";
    }
  }, 360);
}

function burstAt(element, label) {
  const rect = element.getBoundingClientRect();
  const burst = document.createElement("span");
  burst.className = "interaction-burst";
  burst.textContent = label;
  burst.style.left = `${rect.left + rect.width / 2}px`;
  burst.style.top = `${rect.top + rect.height / 2}px`;
  document.body.appendChild(burst);
  window.setTimeout(() => burst.remove(), 780);
}

function rippleAt(x, y) {
  const ripple = document.createElement("span");
  ripple.className = "ui-ripple";
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 680);
}

window.addEventListener("hashchange", render);
render();
setInterval(updateCountdowns, 1000);
```

FILE: app\account\[[...account]]\page.tsx

```tsx
import { UserProfile } from "@clerk/nextjs";
import { AuthExperience } from "@/src/components/auth-experience";

export default function AccountPage() {
  return (
    <AuthExperience eyebrow="Account settings" title="Tune your identity">
      <UserProfile path="/account" routing="path" />
    </AuthExperience>
  );
}

```

FILE: app\admin\page.tsx

```tsx
import { designs } from "@/src/lib/pulse-data";

export default function AdminPage() {
  return (
    <main>
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-kicker">Admin dashboard</span>
              <h1 className="section-title">Moderate, approve, launch</h1>
            </div>
          </div>
          <div className="admin-grid">
            <div className="admin-card"><span className="section-kicker">Pending designs</span><span className="stat-value">128</span></div>
            <div className="admin-card"><span className="section-kicker">Approval rate</span><span className="stat-value">23%</span></div>
            <div className="admin-card"><span className="section-kicker">Votes today</span><span className="stat-value">48.2K</span></div>
          </div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container panel">
          <h3>Moderation queue</h3>
          {designs.map((design) => (
            <div className="admin-row" key={design.slug} style={{ padding: "12px 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
              <div><strong>{design.title}</strong><p className="muted">@{design.creator} / {design.approval}% approval</p></div>
              <span style={{ display: "flex", gap: 8 }}><button className="mini-btn">Approve</button><button className="mini-btn">Reject</button></span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

```

FILE: app\api\designs\[slug]\like\route.ts

```typescript
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { recordLike } from "@/src/lib/db/social";

export async function POST(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const persisted = await recordLike(await currentUser(), slug);

  return NextResponse.json({
    designSlug: slug,
    liked: true,
    persisted,
    userId
  });
}
```

FILE: app\api\designs\[slug]\save\route.ts

```typescript
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { recordSave } from "@/src/lib/db/social";

export async function POST(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { slug } = await params;
  const persisted = await recordSave(await currentUser(), slug);

  return NextResponse.json({
    designSlug: slug,
    saved: true,
    persisted,
    userId
  });
}
```

FILE: app\api\designs\route.ts

```typescript
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { designs } from "@/src/lib/pulse-data";

const productCategories = ["T-shirt", "Sweatshirt / Hoodie", "Pants / Jogging"] as const;
const topFits = ["Straight Fit", "Slim Fit", "Oversized", "Boxy Fit"] as const;
const pantsFits = ["Baggy", "Flare", "Skinny", "Bootcut", "Straight Leg", "Relaxed Fit"] as const;
const fits = ["Straight Fit", "Slim Fit", "Oversized", "Boxy Fit", "Baggy", "Flare", "Skinny", "Bootcut", "Straight Leg", "Relaxed Fit"] as const;
const decorationTypes = ["Print", "Embroidery", "Print + Embroidery"] as const;
const logoPlacements = ["Front center", "Small chest", "Back", "Sleeve", "Leg"] as const;
const fabricWeights = ["Light", "Medium", "Heavy"] as const;
const colorBases = ["Black", "White", "Grey", "Navy", "Cream"] as const;
const styles = ["Minimal", "Streetwear", "Futuristic", "Vintage", "Sport"] as const;

const createDesignSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(20),
  category: z.enum(productCategories),
  inspiration: z.string().optional(),
  fit: z.enum(fits),
  decorationType: z.enum(decorationTypes).default("Print"),
  logoPlacement: z.enum(logoPlacements).default("Front center"),
  fabricWeight: z.enum(fabricWeights).default("Medium"),
  colorBase: z.enum(colorBases).default("Black"),
  style: z.enum(styles).default("Streetwear"),
  sizing: z.string().optional(),
  tags: z.array(z.string()).default([]),
  coverImageUrl: z.string().url(),
  galleryImageUrls: z.array(z.string().url()).default([])
}).superRefine((payload, ctx) => {
  const allowedFits: readonly string[] = payload.category === "Pants / Jogging" ? pantsFits : topFits;
  if (!allowedFits.includes(payload.fit)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `${payload.fit} is not available for ${payload.category}`,
      path: ["fit"]
    });
  }
});

export async function GET() {
  return NextResponse.json({ designs });
}

export async function POST(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = createDesignSchema.parse(await request.json());

  return NextResponse.json(
    {
      design: {
        id: crypto.randomUUID(),
        creatorId: userId,
        status: "PENDING_REVIEW",
        ...payload
      }
    },
    { status: 201 }
  );
}
```

FILE: app\api\recommendations\route.ts

```typescript
import { NextResponse } from "next/server";
import { designs } from "@/src/lib/pulse-data";
import { recommendedDesigns } from "@/src/lib/trending";

export async function GET() {
  return NextResponse.json({
    model: "pulse-signal-ranker-v0",
    factors: ["likes", "saves", "comments", "approval", "creatorVelocity"],
    designs: recommendedDesigns(designs)
  });
}

```

FILE: app\api\uploads\signature\route.ts

```typescript
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { cloudinary } from "@/src/lib/cloudinary";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const timestamp = Math.round(Date.now() / 1000);
  const folder = `pulse/designs/${userId}`;
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET ?? ""
  );

  return NextResponse.json({
    timestamp,
    folder,
    signature,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY
  });
}

```

FILE: app\api\waitlist\route.ts

```typescript
import { NextResponse } from "next/server";
import { z } from "zod";
import { sql } from "@/src/lib/db/client";

const waitlistSchema = z.object({
  email: z.string().email(),
  inviteCode: z.string().optional(),
  reason: z.string().optional()
});

export async function POST(request: Request) {
  const payload = waitlistSchema.parse(await request.json());
  const inviteCode = payload.inviteCode?.trim().toUpperCase() || null;
  const priority = inviteCode ? 12 : 148;
  const queuePosition = priority + Math.floor(Math.random() * 80);

  if (sql) {
    try {
      await sql`
        insert into waitlist_entries (email, invite_code, reason, queue_position, status)
        values (${payload.email}, ${inviteCode}, ${payload.reason || null}, ${queuePosition}, ${inviteCode ? "PRIORITY" : "PENDING"})
        on conflict (email)
        do update set
          invite_code = excluded.invite_code,
          reason = excluded.reason,
          queue_position = excluded.queue_position,
          status = excluded.status
      `;
    } catch {
      return NextResponse.json({ queued: true, persisted: false, queuePosition });
    }
  }

  return NextResponse.json({
    queued: true,
    persisted: Boolean(sql),
    queuePosition,
    status: inviteCode ? "PRIORITY" : "PENDING"
  });
}

```

FILE: app\community\page.tsx

```tsx
import { DesignCard } from "@/src/components/design-card";
import { creators, designs } from "@/src/lib/pulse-data";
import { recommendedDesigns } from "@/src/lib/trending";

export default function CommunityPage() {
  const ranked = recommendedDesigns(designs);
  return (
    <main className="section-tight community-surface">
      <div className="wide-container">
        <div className="section-head community-head">
          <div>
            <span className="section-kicker">Community feed</span>
            <h1 className="section-title">Explore submitted concepts</h1>
          </div>
          <p className="section-copy">Masonry design browsing with search, category filters and infinite scroll hooks ready for the API layer.</p>
        </div>
        <div className="creator-stories" aria-label="Featured creators">
          {creators.map((creator) => (
            <a className="story" href={`/profile/${creator.username}`} key={creator.username}>
              <span className="story-ring"><span className="avatar">{creator.username.slice(0, 2).toUpperCase()}</span></span>
              <span>@{creator.username}</span>
              <small>{creator.badge}</small>
            </a>
          ))}
        </div>
        <div className="community-tabs" aria-label="Community modes">
          <button className="active" type="button">For you</button>
          <button type="button">Trending</button>
          <button type="button">Outerwear</button>
          <button type="button">Footwear</button>
          <button type="button">Rising creators</button>
        </div>
        <div className="filters">
          <input className="field" placeholder="Search concepts, tags, creators" />
          <select className="select"><option>All categories</option><option>Outerwear</option><option>Tops</option><option>Footwear</option></select>
          <select className="select"><option>All types</option><option>Shell Jacket</option><option>Heavy hoodie</option><option>Runner</option></select>
          <select className="select"><option>All fabrics</option><option>Ripstop nylon</option><option>Brushed cotton fleece</option><option>Open mesh / TPU</option></select>
          <button className="ghost-btn">Filter</button>
        </div>
        <div className="masonry">{ranked.map((design) => <DesignCard key={design.slug} design={design} />)}</div>
      </div>
    </main>
  );
}
```

FILE: app\contact\page.tsx

```tsx
export default function ContactPage() {
  return (
    <main className="section-tight">
      <div className="container split">
        <div>
          <span className="eyebrow">Contact PULSE</span>
          <h1 className="detail-title">Build the future studio with us</h1>
          <p className="hero-copy">Creator partnerships, manufacturing, retail collaborations and investment conversations.</p>
        </div>
        <form className="form-card">
          <input className="field" placeholder="Name" />
          <input className="field" placeholder="Email" style={{ marginTop: 12 }} />
          <textarea className="textarea" placeholder="Message" style={{ marginTop: 12 }} />
          <button className="primary-btn" style={{ marginTop: 12 }}>Send message</button>
        </form>
      </div>
    </main>
  );
}

```

FILE: app\creator-dashboard\page.tsx

```tsx
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import type { CSSProperties } from "react";
import { DesignCard } from "@/src/components/design-card";
import { accountFromClerkUser } from "@/src/lib/auth-profile";
import { designs } from "@/src/lib/pulse-data";

export default async function CreatorDashboardPage() {
  const account = accountFromClerkUser(await currentUser());
  const activeDesigns = designs.slice(0, 3);

  return (
    <main>
      <section className="section-tight creator-dashboard-hero">
        <div className="container">
          <div className="panel creator-dashboard-panel">
            <div>
              <span className="eyebrow">Creator dashboard</span>
              <h1 className="detail-title">{account.displayName}'s studio</h1>
              <p className="hero-copy">
                Track your design signal, manage uploads, see community response and push concepts toward drop review.
              </p>
              <div className="hero-actions">
                <Link className="primary-btn" href="/submit-design">Submit new design</Link>
                <Link className="ghost-btn" href="/account">Edit identity</Link>
              </div>
            </div>
            <div className="dashboard-score">
              <span>Signal score</span>
              <strong>92</strong>
              <div className="progress" style={{ "--value": "92%" } as CSSProperties}><span /></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container admin-grid">
          <div className="admin-card"><span className="section-kicker">Followers</span><span className="stat-value">{account.followerCount.toLocaleString()}</span></div>
          <div className="admin-card"><span className="section-kicker">Saved concepts</span><span className="stat-value">{account.savedDesignSlugs.length}</span></div>
          <div className="admin-card"><span className="section-kicker">Liked posts</span><span className="stat-value">{account.likedDesignSlugs.length}</span></div>
        </div>
      </section>

      <section className="section">
        <div className="wide-container">
          <div className="section-head">
            <div>
              <span className="section-kicker">Active submissions</span>
              <h2 className="section-title">Concepts in review</h2>
            </div>
          </div>
          <div className="carousel">
            {activeDesigns.map((design) => <DesignCard key={design.slug} design={design} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
```

FILE: app\designs\[slug]\page.tsx

```tsx
import { MockupVisual } from "@/src/components/mockup-visual";
import { designs, findCreator, findDesign } from "@/src/lib/pulse-data";
import type { CSSProperties } from "react";

export function generateStaticParams() {
  return designs.map((design) => ({ slug: design.slug }));
}

export default async function DesignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const design = findDesign(slug);
  const creator = findCreator(design.creator);
  const specs = [
    ["Title", design.title],
    ["Creator", `@${creator.username}`],
    ["Inspiration", design.inspiration],
    ["Streetwear style", design.style],
    ["Fit", design.fit],
    ["Cut", design.cut],
    ["Embroidery", design.embroidery],
    ["Print type", design.printType],
    ["Fabric", design.fabric],
    ["GSM", design.gsm],
    ["Colorway", design.colorway],
    ["Washing style", design.washing],
    ["Target aesthetic", design.aesthetic]
  ];
  return (
    <main>
      <section className="detail-hero">
        <div className="wide-container detail-layout">
          <div className="gallery"><MockupVisual design={design} /><div className="gallery-stack"><MockupVisual design={design} /><MockupVisual design={design} /><MockupVisual design={design} /></div></div>
          <aside className="panel">
            <span className="eyebrow">{design.category} concept</span>
            <h1 className="detail-title">{design.title}</h1>
            <p className="muted">{design.description}</p>
            <div className="approval"><strong>{design.approval}% community approval</strong><div className="progress" style={{ "--value": `${design.approval}%` } as CSSProperties}><span /></div></div>
            <div className="hero-actions"><button className="primary-btn">Like</button><button className="ghost-btn">Save</button><button className="ghost-btn">Share</button></div>
          </aside>
        </div>
      </section>
      <section className="section-tight">
        <div className="container panel">
          <h2 className="section-title">Full product specifications</h2>
          <div className="spec-grid">{specs.map(([label, value]) => <div className="spec-card" key={label}><span className="spec-label">{label}</span><span className="spec-value">{value}</span></div>)}</div>
        </div>
      </section>
    </main>
  );
}
```

FILE: app\drops\page.tsx

```tsx
import { drops } from "@/src/lib/pulse-data";

export default function DropsPage() {
  return (
    <main className="section-tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Drops</span>
            <h1 className="section-title">Community winners become real product</h1>
          </div>
        </div>
        <div className="drop-grid">
          {drops.map((drop) => (
            <article className="drop-card" key={drop.id}>
              <span className="status-pill">{drop.status}</span>
              <h2 className="section-title" style={{ fontSize: 30 }}>{drop.id}<br />{drop.name}</h2>
              <p className="muted">{drop.copy}</p>
              <span className="status-pill">Community winner badge</span>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

```

FILE: app\explore\page.tsx

```tsx
import { DesignCard } from "@/src/components/design-card";
import { creators, designs } from "@/src/lib/pulse-data";
import { recommendedDesigns } from "@/src/lib/trending";
import type { CSSProperties } from "react";

export default function ExplorePage() {
  return (
    <main>
      <section className="section-tight">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="section-kicker">AI discover</span>
              <h1 className="section-title">Taste graph recommendations</h1>
            </div>
            <p className="section-copy">Scores combine vote velocity, save depth, creator rank, comments and category momentum.</p>
          </div>
          <div className="reco-grid">
            <div className="panel"><h3>Trending algorithm</h3><p className="muted">Signal-weighted recommendation lane ready for model-assisted ranking.</p></div>
            <div className="panel"><h3>Creator ranking</h3>{creators.map((c) => <div className="admin-row" key={c.username}><span>@{c.username}</span><strong>#{c.rank}</strong></div>)}</div>
            <div className="panel"><h3>Category heat</h3><div className="progress" style={{ "--value": "86%" } as CSSProperties}><span /></div></div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="wide-container carousel">
          {recommendedDesigns(designs).map((design) => <DesignCard key={design.slug} design={design} />)}
        </div>
      </section>
    </main>
  );
}
```

FILE: app\globals.css

```css
@import "../styles.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

::selection {
  background: rgba(217, 255, 102, 0.35);
  color: #fff;
}

```

FILE: app\layout.tsx

```tsx
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/src/components/navbar";
import { pulseClerkAppearance } from "@/src/lib/clerk-appearance";
import "./globals.css";

export const metadata: Metadata = {
  title: "PULSE - Community Streetwear Futures",
  description: "A futuristic community-driven streetwear platform for submitted concepts, voting and drops."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClerkProvider appearance={pulseClerkAppearance}>
          <div className="noise" aria-hidden="true" />
          <div className="ambient-grid" aria-hidden="true" />
          <Navbar />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
```

FILE: app\leaderboard\page.tsx

```tsx
import { creators } from "@/src/lib/pulse-data";

export default function LeaderboardPage() {
  return (
    <main className="section-tight">
      <div className="container">
        <span className="eyebrow">Community rank</span>
        <h1 className="detail-title">Leaderboard</h1>
        <div className="panel leaderboard-panel">
          {creators.map((creator, index) => (
            <a className="leaderboard-row" href={`/profile/${creator.username}`} key={creator.username}>
              <span className="rank">#{index + 1}</span>
              <span className="avatar">{creator.username.slice(0, 2).toUpperCase()}</span>
              <span><strong>{creator.name}</strong><small>@{creator.username}</small></span>
              <b>{(creator.likes + creator.followers).toLocaleString()}</b>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}

```

FILE: app\liked\page.tsx

```tsx
import { currentUser } from "@clerk/nextjs/server";
import { AccountHero } from "@/src/components/account-hero";
import { DesignCollection } from "@/src/components/design-collection";
import { accountDesigns, accountFromClerkUser } from "@/src/lib/auth-profile";
import { likedDesignSlugs } from "@/src/lib/db/social";

export default async function LikedPage() {
  const user = await currentUser();
  const account = accountFromClerkUser(user);
  const persisted = await likedDesignSlugs(user);
  const liked = accountDesigns(persisted.length ? persisted : account.likedDesignSlugs);

  return (
    <main>
      <AccountHero account={account} label="Liked posts" />
      <DesignCollection
        designs={liked}
        empty="No liked posts yet"
        kicker="Community signal"
        title="Liked posts"
      />
    </main>
  );
}
```

FILE: app\notifications\page.tsx

```tsx
const notifications = [
  ["Drop", "DROP #001 reached production review", "2m"],
  ["Vote", "Neon Utility Shell crossed 18K likes", "18m"],
  ["Creator", "kaizen.arc was verified by PULSE studio", "1h"],
  ["Invite", "148 alpha invites remain this week", "today"]
];

export default function NotificationsPage() {
  return (
    <main className="section-tight">
      <div className="container split">
        <div>
          <span className="eyebrow">Notifications</span>
          <h1 className="detail-title">Your studio pulse</h1>
          <p className="hero-copy">Drop deadlines, moderation status, creator verification and voting moments.</p>
        </div>
        <div className="panel notifications-list">
          {notifications.map(([type, title, time]) => (
            <article className="notification-card" key={title}>
              <span>{type}</span>
              <strong>{title}</strong>
              <small>{time}</small>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}

```

FILE: app\onboarding\page.tsx

```tsx
export default function OnboardingPage() {
  return (
    <main className="auth-stage">
      <div className="auth-light-field" aria-hidden="true"><span /><span /></div>
      <div className="auth-layout">
        <div className="auth-editorial">
          <span className="eyebrow">Alpha onboarding</span>
          <h1 className="auth-title">Build your creator signal</h1>
          <p className="hero-copy">Claim your identity, select taste lanes, save references and submit your first concept.</p>
        </div>
        <div className="auth-panel">
          <div className="form-card">
            <div className="submit-steps">
              <span className="active">01 Identity</span>
              <span>02 Categories</span>
              <span>03 Notifications</span>
              <span>04 Submit</span>
            </div>
            <input className="field" placeholder="Creator username" />
            <select className="select" style={{ marginTop: 12 }}><option>Technical outerwear</option><option>Future sport</option></select>
            <button className="primary-btn" style={{ marginTop: 12 }}>Complete onboarding</button>
          </div>
        </div>
      </div>
    </main>
  );
}

```

FILE: app\page.tsx

```tsx
import Link from "next/link";
import { Search, Upload } from "lucide-react";
import { DesignCard } from "@/src/components/design-card";
import { MockupVisual } from "@/src/components/mockup-visual";
import { Reveal } from "@/src/components/reveal";
import { creators, designs, drops } from "@/src/lib/pulse-data";
import { recommendedDesigns } from "@/src/lib/trending";

export default function HomePage() {
  const top = recommendedDesigns(designs);
  return (
    <main>
      <section className="hero home-hero">
        <div className="hero-light-field" aria-hidden="true"><span /><span /><span /></div>
        <div className="runway-lines" aria-hidden="true" />
        <div className="container hero-layout">
          <Reveal>
            <div className="hero-copy-panel">
            <span className="eyebrow">Community powered drops</span>
            <h1>THE COMMUNITY CREATES <span>THE FUTURE OF STREETWEAR</span></h1>
            <p className="hero-copy">Submit designs. Get voted by the community. Become part of the next drop.</p>
            <div className="hero-actions">
              <Link className="primary-btn" href="/community"><Search size={18} />Explore Designs</Link>
              <Link className="ghost-btn" href="/submit-design"><Upload size={18} />Submit Yours</Link>
            </div>
            <div className="hero-proof">
              <span>Creator-owned concepts</span>
              <span>Community signal</span>
              <span>Selected for production</span>
            </div>
            <div className="hero-meta">
              <div className="stat-tile"><span className="stat-value">18.4K</span><span className="stat-label">Designs submitted</span></div>
              <div className="stat-tile"><span className="stat-value">6.4K</span><span className="stat-label">Active creators</span></div>
              <div className="stat-tile"><span className="stat-value">920K</span><span className="stat-label">Community votes</span></div>
            </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="hero-stage">
              <div className="hero-lookbook hero-lookbook-a"><MockupVisual design={top[1]} className="short" /></div>
              <div className="hero-lookbook hero-lookbook-b"><MockupVisual design={top[2]} className="short" /></div>
              <div className="hero-frame">
                <MockupVisual design={top[0]} className="tall" />
                <div className="editorial-tag">
                  <strong>{top[0].title}</strong>
                  <small>@{top[0].creator} / {top[0].approval}% approved</small>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="hero-ticker" aria-hidden="true">
          <span>COMMUNITY DESIGN INDEX</span>
          <span>FUTURE DROP LAB</span>
          <span>STREETWEAR SIGNAL</span>
          <span>CREATOR-FIRST PLATFORM</span>
        </div>
      </section>
      <section className="section">
        <div className="wide-container">
          <div className="section-head">
            <div>
              <span className="section-kicker">Trending concepts</span>
              <h2 className="section-title">Live community heat</h2>
            </div>
            <Link className="text-btn" href="/community">Open community</Link>
          </div>
          <div className="carousel">{top.map((design) => <DesignCard key={design.slug} design={design} />)}</div>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <div className="creator-grid">
            {creators.map((creator) => (
              <article className="creator-card" key={creator.username}>
                <div className="creator-card-head">
                  <Link className="creator-inline" href={`/profile/${creator.username}`}>
                    <span className="avatar large">{creator.username.slice(0, 2).toUpperCase()}</span>
                    <span><h3 className="creator-name">{creator.name}</h3>@{creator.username}</span>
                  </Link>
                  <span className="rank">#{creator.rank}</span>
                </div>
                <p className="creator-bio">{creator.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container drop-grid">
          {drops.map((drop) => (
            <article className="drop-card" key={drop.id}>
              <span className="status-pill">{drop.status}</span>
              <h3 className="section-title" style={{ fontSize: 30 }}>{drop.id}<br />{drop.name}</h3>
              <p className="muted">{drop.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```

FILE: app\profile\[username]\page.tsx

```tsx
import { DesignCard } from "@/src/components/design-card";
import { creators, designs, findCreator } from "@/src/lib/pulse-data";

export function generateStaticParams() {
  return creators.map((creator) => ({ username: creator.username }));
}

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const creator = findCreator(username);
  const uploaded = designs.filter((design) => design.creator === creator.username);
  return (
    <main>
      <section className="section-tight">
        <div className="container panel profile-hero">
          <span className="avatar large">{creator.username.slice(0, 2).toUpperCase()}</span>
          <div>
            <span className="section-kicker">Creator profile</span>
            <h1 className="section-title">{creator.name}</h1>
            <p className="muted">@{creator.username} - {creator.bio}</p>
            <div className="profile-stats"><span><strong>{creator.followers}</strong>Followers</span><span><strong>{creator.likes}</strong>Total likes</span><span><strong>{uploaded.length}</strong>Uploaded designs</span></div>
          </div>
          <button className="primary-btn">Follow</button>
        </div>
      </section>
      <section className="section">
        <div className="wide-container masonry">{uploaded.map((design) => <DesignCard key={design.slug} design={design} />)}</div>
      </section>
    </main>
  );
}
```

FILE: app\profile\page.tsx

```tsx
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { AccountHero } from "@/src/components/account-hero";
import { DesignCollection } from "@/src/components/design-collection";
import { accountDesigns, accountFromClerkUser } from "@/src/lib/auth-profile";
import { savedDesignSlugs } from "@/src/lib/db/social";

export default async function ProfilePage() {
  const user = await currentUser();
  const account = accountFromClerkUser(user);
  const persisted = await savedDesignSlugs(user);
  const saved = accountDesigns(persisted.length ? persisted : account.savedDesignSlugs);

  return (
    <main>
      <AccountHero account={account} />
      <section className="section-tight">
        <div className="container profile-action-row">
          <Link className="primary-btn" href="/account">Edit profile picture and username</Link>
          <Link className="ghost-btn" href="/creator-dashboard">Open creator dashboard</Link>
        </div>
      </section>
      <DesignCollection
        designs={saved}
        empty="No saved designs yet"
        kicker="Saved references"
        title="Your private future-board"
      />
    </main>
  );
}
```

FILE: app\saved\page.tsx

```tsx
import { currentUser } from "@clerk/nextjs/server";
import { AccountHero } from "@/src/components/account-hero";
import { DesignCollection } from "@/src/components/design-collection";
import { accountDesigns, accountFromClerkUser } from "@/src/lib/auth-profile";
import { savedDesignSlugs } from "@/src/lib/db/social";

export default async function SavedPage() {
  const user = await currentUser();
  const account = accountFromClerkUser(user);
  const persisted = await savedDesignSlugs(user);
  const saved = accountDesigns(persisted.length ? persisted : account.savedDesignSlugs);

  return (
    <main>
      <AccountHero account={account} label="Saved designs" />
      <DesignCollection
        designs={saved}
        empty="No saved designs yet"
        kicker="Collections"
        title="Saved design archive"
      />
    </main>
  );
}
```

FILE: app\shop\page.tsx

```tsx
import { DesignCard } from "@/src/components/design-card";
import { designs } from "@/src/lib/pulse-data";

export default function ShopPage() {
  return (
    <main className="section-tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Shop</span>
            <h1 className="section-title">Approved concepts only</h1>
          </div>
          <p className="section-copy">This commerce section should stay selective so the platform never feels like a generic storefront.</p>
        </div>
        <div className="product-grid">{designs.slice(0, 3).map((design) => <DesignCard key={design.slug} design={design} />)}</div>
      </div>
    </main>
  );
}

```

FILE: app\sign-in\[[...sign-in]]\page.tsx

```tsx
import { SignIn } from "@clerk/nextjs";
import { AuthExperience } from "@/src/components/auth-experience";

export default function SignInPage() {
  return (
    <AuthExperience eyebrow="Member access" title="Enter the studio">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl="/creator-dashboard"
      />
    </AuthExperience>
  );
}

```

FILE: app\sign-up\[[...sign-up]]\page.tsx

```tsx
import { SignUp } from "@clerk/nextjs";
import { AuthExperience } from "@/src/components/auth-experience";

export default function SignUpPage() {
  return (
    <AuthExperience eyebrow="Creator onboarding" title="Claim your signal">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/creator-dashboard"
      />
    </AuthExperience>
  );
}

```

FILE: app\submit-design\page.tsx

```tsx
"use client";

import { useState } from "react";

const productCategories = ["T-shirt", "Sweatshirt / Hoodie", "Pants / Jogging"] as const;

const topFitOptions = [
  { label: "Straight Fit", shape: "top-straight", note: "Clean vertical body, easy everyday proportion." },
  { label: "Slim Fit", shape: "top-slim", note: "Closer chest and sleeve line for a sharper silhouette." },
  { label: "Oversized", shape: "top-oversized", note: "Dropped shoulder, longer sleeve, roomier streetwear volume." },
  { label: "Boxy Fit", shape: "top-boxy", note: "Shorter length with a wide square body block." },
] as const;

const pantsFitOptions = [
  { label: "Baggy", shape: "pant-baggy", note: "Wide volume from hip to hem with relaxed drape." },
  { label: "Flare", shape: "pant-flare", note: "Controlled upper leg with a wider opening below the knee." },
  { label: "Skinny", shape: "pant-skinny", note: "Narrow leg profile with close fit through the ankle." },
  { label: "Bootcut", shape: "pant-bootcut", note: "Straight thigh with subtle expansion over footwear." },
  { label: "Straight Leg", shape: "pant-straight", note: "Uniform leg width for a balanced classic shape." },
  { label: "Relaxed Fit", shape: "pant-relaxed", note: "Comfortable thigh and knee with controlled width." },
] as const;

const productionOptionGroups = [
  {
    name: "decorationType",
    label: "Decoration type",
    options: ["Print", "Embroidery", "Print + Embroidery"],
  },
  {
    name: "logoPlacement",
    label: "Logo placement",
    options: ["Front center", "Small chest", "Back", "Sleeve", "Leg"],
  },
  {
    name: "fabricWeight",
    label: "Fabric weight",
    options: ["Light", "Medium", "Heavy"],
  },
  {
    name: "colorBase",
    label: "Color base",
    options: ["Black", "White", "Grey", "Navy", "Cream"],
  },
  {
    name: "style",
    label: "Style",
    options: ["Minimal", "Streetwear", "Futuristic", "Vintage", "Sport"],
  },
] as const;

type ProductCategory = (typeof productCategories)[number];
type FitOption = (typeof topFitOptions)[number] | (typeof pantsFitOptions)[number];

function fitOptionsForCategory(category: ProductCategory): readonly FitOption[] {
  return category === "Pants / Jogging" ? pantsFitOptions : topFitOptions;
}

function optionId(name: string, value: string) {
  return `${name}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function ProductionOptionGroup({ group }: { group: { name: string; label: string; options: readonly string[] } }) {
  return (
    <fieldset className="production-option-group">
      <legend>{group.label}</legend>
      <div className="option-pills">
        {group.options.map((option, index) => {
          const id = optionId(group.name, option);
          return (
            <label className="option-pill" htmlFor={id} key={option}>
              <input id={id} type="radio" name={group.name} value={option} defaultChecked={index === 0} />
              <span>{option}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function SubmitDesignPage() {
  const [category, setCategory] = useState<ProductCategory>("T-shirt");
  const [selectedFit, setSelectedFit] = useState<FitOption>(topFitOptions[0]);
  const fitOptions = fitOptionsForCategory(category);

  function selectCategory(nextCategory: ProductCategory) {
    const nextFit = fitOptionsForCategory(nextCategory)[0];
    setCategory(nextCategory);
    setSelectedFit(nextFit);
  }

  return (
    <main className="section-tight">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-kicker">Submit design</span>
            <h1 className="section-title">Upload a future drop concept</h1>
          </div>
          <p className="section-copy">A premium submission flow that turns creative concepts into manufacturable drop proposals.</p>
        </div>
        <div className="split">
          <form className="form-card">
            <div className="upload-zone">
              <strong>Drag cover image and mockups here</strong>
              <span className="muted">Cloudinary signed upload ready.</span>
            </div>
            <div className="form-grid" style={{ marginTop: 14 }}>
              <input className="field" placeholder="Title" />
              <textarea className="textarea full" placeholder="Description" />
              <input className="field full" placeholder="Inspiration" />
              <input className="field" placeholder="Sizing notes" />
              <input className="field full" placeholder="Tags" />
            </div>
            <p className="production-note">To keep production realistic, PULSE currently only accepts limited clothing types and production options.</p>
            <div className="production-matrix">
              <fieldset className="production-option-group">
                <legend>Product category</legend>
                <div className="option-pills">
                  {productCategories.map((option) => {
                    const id = optionId("category", option);
                    return (
                      <label className="option-pill" htmlFor={id} key={option}>
                        <input
                          checked={category === option}
                          id={id}
                          name="category"
                          onChange={() => selectCategory(option)}
                          type="radio"
                          value={option}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <fieldset className="production-option-group fit-option-group">
                <legend>Fit <span>{category === "Pants / Jogging" ? "Pants system" : "T-shirt / sweat system"}</span></legend>
                <div className="fit-chip-grid">
                  {fitOptions.map((option) => {
                    const id = optionId("fit", option.label);
                    return (
                      <label className="option-pill fit-pill" htmlFor={id} key={option.label}>
                        <input
                          checked={selectedFit.label === option.label}
                          id={id}
                          name="fit"
                          onChange={() => setSelectedFit(option)}
                          type="radio"
                          value={option.label}
                        />
                        <span>
                          <span className={`fit-icon fit-icon--${option.shape}`} aria-hidden="true"><i /></span>
                          <span className="fit-label">{option.label}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              {productionOptionGroups.map((group) => (
                <ProductionOptionGroup group={group} key={group.name} />
              ))}
            </div>
            <button className="primary-btn" style={{ marginTop: 14 }}>Publish concept</button>
          </form>
          <aside className="panel preview-panel">
            <h3>Live preview</h3>
            <p className="muted">Production-ready concepts use constrained options so selected designs can move into costing faster.</p>
            <div className="card-meta" style={{ marginTop: 12 }}>
              <span className="metric-pill">{category}</span>
              <span className="metric-pill">{selectedFit.label}</span>
              <span className="metric-pill">Pending approval</span>
            </div>
            <div className="fit-preview">
              <div className="fit-preview-stage">
                <span className={`fit-preview-figure fit-preview-figure--${selectedFit.shape}`} aria-hidden="true"><i /></span>
              </div>
              <div>
                <span className="fit-preview-kicker">{category === "Pants / Jogging" ? "Pants block" : "Upper-body block"}</span>
                <strong>{selectedFit.label}</strong>
                <p>{selectedFit.note}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
```

FILE: app\waitlist\page.tsx

```tsx
import { WaitlistForm } from "@/src/components/waitlist-form";

export default function WaitlistPage() {
  return (
    <main className="auth-stage">
      <div className="auth-light-field" aria-hidden="true"><span /><span /></div>
      <div className="auth-layout">
        <div className="auth-editorial">
          <span className="eyebrow">Invite-only alpha</span>
          <h1 className="auth-title">Join the PULSE queue</h1>
          <p className="hero-copy">Controlled access for creators, voters, moderators and early collectors.</p>
          <div className="auth-proof-grid">
            <div><strong>500</strong><span>Alpha seats</span></div>
            <div><strong>4</strong><span>Access waves</span></div>
            <div><strong>48h</strong><span>Review cycle</span></div>
          </div>
        </div>
        <div className="auth-panel"><WaitlistForm /></div>
      </div>
    </main>
  );
}

```

FILE: index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="PULSE is a futuristic community-driven streetwear platform for submitting, voting and launching clothing concepts."
    />
    <title>PULSE - Community Streetwear Futures</title>
    <link rel="stylesheet" href="./styles.css?v=i18n2" />
  </head>
  <body>
    <div class="pulse-loader" id="pulseLoader" aria-hidden="true">
      <div class="loader-index">001</div>
      <div class="loader-word" data-text="PULSE">PULSE</div>
      <div class="loader-line"><span></span></div>
      <div class="loader-caption">COMMUNITY DESIGN HOUSE</div>
    </div>
    <div class="cursor-light" id="cursorLight" aria-hidden="true"></div>
    <div class="pulse-cursor" id="pulseCursor" aria-hidden="true"></div>
    <div class="scroll-progress" id="scrollProgress" aria-hidden="true"><span></span></div>
    <div class="noise" aria-hidden="true"></div>
    <div class="ambient-grid" aria-hidden="true"></div>
    <div id="app"></div>
    <script src="./app.js?v=i18n2"></script>
  </body>
</html>
```

FILE: middleware.ts

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/submit-design(.*)",
  "/admin(.*)",
  "/account(.*)",
  "/creator-dashboard(.*)",
  "/liked(.*)",
  "/saved(.*)",
  "/profile",
  "/api/designs(.*)",
  "/api/uploads(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
```

FILE: next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;

```

FILE: package.json

```json
{
  "name": "pulse-streetwear-platform",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@clerk/nextjs": "^6.12.0",
    "cloudinary": "^2.5.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.4.7",
    "lucide-react": "^0.468.0",
    "next": "^15.1.7",
    "postgres": "^3.4.5",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@types/node": "^22.13.4",
    "@types/react": "^19.0.8",
    "@types/react-dom": "^19.0.3",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.20.1",
    "eslint-config-next": "^15.1.7",
    "postcss": "^8.5.2",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.7.3"
  }
}

```

FILE: postcss.config.mjs

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

```

FILE: README.md

```markdown
# PULSE

PULSE is a premium prototype for a community-driven streetwear platform where creators submit concepts, the community votes, and the best work becomes future drops.

## Open The Prototype

Open `index.html` in a browser, or serve this folder with any static server.

The prototype includes:

- Cinematic home page
- Pinterest-style community grid
- Immersive design detail pages
- Creator profiles
- Submit design workflow with live preview
- Drops, shop, admin, analytics, search, filters and recommendation UI

## Production Stack Scaffold

This folder also includes a Next.js-oriented scaffold:

- `package.json` with Next.js, React, TailwindCSS, Framer Motion, Clerk, Cloudinary and Postgres dependencies
- `app/` routes and API examples
- `src/lib/db/schema.sql` PostgreSQL schema
- `.env.example` for Clerk, Cloudinary and database variables

The current machine does not expose npm in PATH, so the local preview is intentionally no-install. On a normal Node/npm setup, run:

```bash
npm install
npm run dev
```

## Clerk Auth

Create a Clerk application, copy `.env.example` to `.env.local`, and fill:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

Auth routes included:

- `/sign-in`
- `/sign-up`
- `/account`
- `/profile`
- `/saved`
- `/liked`
- `/creator-dashboard`
- `/waitlist`
- `/onboarding`
- `/notifications`
- `/leaderboard`

Alpha launch systems included:

- Invite-only waitlist API at `/api/waitlist`
- PostgreSQL tables for waitlist entries, invite codes, notifications and moderation events
- Creator leaderboard, category rails, moderation queue and drop countdown surfaces

## Product Direction

PULSE is designed to feel less like a Shopify storefront and more like a luxury creative network for future streetwear: dark, editorial, fast, immersive, creator-first.
```

FILE: src\components\account-hero.tsx

```tsx
import type { PulseAccount } from "@/src/lib/auth-profile";

export function AccountHero({ account, label = "Creator profile" }: { account: PulseAccount; label?: string }) {
  return (
    <section className="section-tight">
      <div className="container">
        <div className="panel profile-hero pulse-account-hero">
          {account.avatarUrl ? (
            <img className="avatar large account-photo" src={account.avatarUrl} alt="" />
          ) : (
            <span className="avatar large">{account.username.slice(0, 2).toUpperCase()}</span>
          )}
          <div>
            <span className="section-kicker">{label}</span>
            <h1 className="section-title">{account.displayName}</h1>
            <p className="muted">@{account.username} - {account.bio}</p>
            <div className="profile-stats">
              <span><strong>{account.followerCount.toLocaleString()}</strong>Followers</span>
              <span><strong>{account.followingCount.toLocaleString()}</strong>Following</span>
              <span><strong>{account.totalLikes.toLocaleString()}</strong>Total likes</span>
              <span><strong>{account.savedDesignSlugs.length}</strong>Saved</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

```

FILE: src\components\auth-experience.tsx

```tsx
import type { ReactNode } from "react";

export function AuthExperience({
  children,
  eyebrow,
  title
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <main className="auth-stage">
      <div className="auth-light-field" aria-hidden="true">
        <span />
        <span />
      </div>
      <section className="auth-layout">
        <div className="auth-editorial">
          <span className="eyebrow">{eyebrow}</span>
          <h1 className="auth-title">{title}</h1>
          <p className="hero-copy">
            Your identity is your studio pass. Save references, vote on concepts, follow creators and build a public design signal.
          </p>
          <div className="auth-proof-grid">
            <div><strong>01</strong><span>Creator profile</span></div>
            <div><strong>02</strong><span>Saved design archive</span></div>
            <div><strong>03</strong><span>Voting and drops</span></div>
          </div>
        </div>
        <div className="auth-panel">{children}</div>
      </section>
    </main>
  );
}

```

FILE: src\components\design-card.tsx

```tsx
import Link from "next/link";
import { ArrowUpRight, Bookmark, Heart, MessageCircle } from "lucide-react";
import type { CSSProperties } from "react";
import type { Design } from "@/src/lib/pulse-data";
import { findCreator } from "@/src/lib/pulse-data";
import { MockupVisual } from "./mockup-visual";

function initials(value: string) {
  return value
    .split(/[.\s-]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function compact(value: number) {
  return Intl.NumberFormat("en", { notation: value > 9999 ? "compact" : "standard" }).format(value);
}

export function DesignCard({ design }: { design: Design }) {
  const creator = findCreator(design.creator);

  return (
    <article className={`design-card pin-${design.height}`}>
      <div className="quick-actions">
        <button className="icon-btn" title="Like design"><Heart size={18} /></button>
        <button className="icon-btn" title="Save design"><Bookmark size={18} /></button>
      </div>
      <Link className="card-media" href={`/designs/${design.slug}`} aria-label={`Open ${design.title}`}>
        <MockupVisual design={design} />
        <div className="card-social-overlay">
          <span className="creator-badge"><span className="avatar">{initials(creator.username)}</span>@{creator.username}</span>
          <span className="approval-chip">{design.approval}%</span>
        </div>
      </Link>
      <div className="card-body">
        <div className="card-top">
          <div>
            <h3 className="card-title">{design.title}</h3>
            <Link className="creator-inline" href={`/profile/${creator.username}`}>
              <span className="avatar">{initials(creator.username)}</span>
              <span>@{creator.username}</span>
            </Link>
          </div>
          <span className="palette-row">
            {design.palette.map((color) => (
              <i key={color} className="swatch" style={{ "--c": color } as CSSProperties} />
            ))}
          </span>
        </div>
        <p className="card-caption">{design.description}</p>
        <div className="tag-row" style={{ gap: 7, flexWrap: "wrap" }}>
          <span className="tag">{design.category}</span>
          <span className="tag">{design.clothingType}</span>
          <span className="tag">{design.fabric}</span>
        </div>
        <div className="card-meta">
          <span className="metric-pill"><Heart size={16} />{compact(design.likes)}</span>
          <span className="metric-pill"><MessageCircle size={16} />{compact(design.comments)}</span>
          <span className="metric-pill">{design.approval}% approval</span>
        </div>
        <div className="card-footer-action">
          <span>{design.style}</span>
          <Link href={`/designs/${design.slug}`}>Open project <ArrowUpRight size={14} /></Link>
        </div>
      </div>
    </article>
  );
}
```

FILE: src\components\design-collection.tsx

```tsx
import { DesignCard } from "./design-card";
import type { Design } from "@/src/lib/pulse-data";

export function DesignCollection({
  designs,
  empty,
  kicker,
  title
}: {
  designs: Design[];
  empty: string;
  kicker: string;
  title: string;
}) {
  return (
    <section className="section">
      <div className="wide-container">
        <div className="section-head">
          <div>
            <span className="section-kicker">{kicker}</span>
            <h2 className="section-title">{title}</h2>
          </div>
        </div>
        {designs.length ? (
          <div className="masonry">{designs.map((design) => <DesignCard key={design.slug} design={design} />)}</div>
        ) : (
          <div className="empty"><div><strong>{empty}</strong><p>Start exploring the community feed to build this archive.</p></div></div>
        )}
      </div>
    </section>
  );
}

```

FILE: src\components\mockup-visual.tsx

```tsx
import type { Design } from "@/src/lib/pulse-data";
import type { CSSProperties } from "react";

export function MockupVisual({ design, className = "" }: { design: Design; className?: string }) {
  return (
    <div
      className={`card-visual ${design.height} ${className}`}
      style={{
        "--visual-bg": design.visual,
        "--garment": design.garment
      } as CSSProperties}
    >
      <div className="mockup">
        <div className={`garment ${design.shape}`}>
          <i className="piece-a" />
          <i className="piece-b" />
          <i className="piece-c" />
          <i className="print-lines" />
        </div>
      </div>
    </div>
  );
}
```

FILE: src\components\navbar.tsx

```tsx
"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bell, Bookmark, Heart, Search, Upload } from "lucide-react";
import clsx from "clsx";
import { pulseUserButtonAppearance } from "@/src/lib/clerk-appearance";

const links = [
  ["/", "Home"],
  ["/community", "Community"],
  ["/explore", "Explore"],
  ["/submit-design", "Submit Design"],
  ["/drops", "Drops"],
  ["/shop", "Shop"],
  ["/waitlist", "Waitlist"],
  ["/contact", "Contact"]
] as const;

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" href="/">
          <span className="brand-mark" />
          <span>PULSE</span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {links.map(([href, label]) => (
            <Link
              key={href}
              className={clsx("nav-link", pathname === href && "active")}
              href={href}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="nav-actions">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="ghost-btn" type="button">
                <span>Login</span>
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="primary-btn" type="button">
                <span>Join PULSE</span>
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link className="icon-btn nav-icon-only notification-dot" href="/notifications" title="Notifications">
              <Bell size={18} />
            </Link>
            <Link className="icon-btn nav-icon-only" href="/liked" title="Liked posts">
              <Heart size={18} />
            </Link>
            <Link className="icon-btn nav-icon-only" href="/saved" title="Saved designs">
              <Bookmark size={18} />
            </Link>
            <Link className="ghost-btn" href="/creator-dashboard">
              <BarChart3 size={18} />
              <span>Studio</span>
            </Link>
            <Link className="primary-btn" href="/submit-design">
              <Upload size={18} />
              <span>Submit</span>
            </Link>
            <UserButton
              appearance={pulseUserButtonAppearance}
              showName={false}
              userProfileUrl="/account"
            />
          </SignedIn>
        </div>
      </div>
      <nav className="mobile-nav" aria-label="Mobile">
        <Link className={clsx(pathname === "/" && "active")} href="/">P</Link>
        <Link className={clsx(pathname === "/community" && "active")} href="/community"><Search size={18} /></Link>
        <Link className={clsx(pathname === "/explore" && "active")} href="/explore">AI</Link>
        <Link className={clsx(pathname === "/saved" && "active")} href="/saved"><Bookmark size={18} /></Link>
        <Link className={clsx(pathname === "/submit-design" && "active")} href="/submit-design"><Upload size={18} /></Link>
      </nav>
    </header>
  );
}
```

FILE: src\components\reveal.tsx

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

```

FILE: src\components\waitlist-form.tsx

```tsx
"use client";

import { useState } from "react";
import type { FormEvent } from "react";

export function WaitlistForm() {
  const [status, setStatus] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.get("email"),
        inviteCode: data.get("inviteCode"),
        reason: data.get("reason")
      })
    });
    const result = await response.json();
    setStatus(`Queue position #${result.queuePosition}. Status: ${result.status}.`);
  }

  return (
    <form className="form-card waitlist-form" onSubmit={submit}>
      <h3>Request alpha access</h3>
      <input className="field" name="email" type="email" placeholder="email@studio.com" required />
      <input className="field" name="inviteCode" placeholder="Invite code" style={{ marginTop: 12 }} />
      <textarea className="textarea" name="reason" placeholder="Why should PULSE invite you?" style={{ marginTop: 12 }} />
      <button className="primary-btn" type="submit" style={{ marginTop: 12 }}>Join waitlist</button>
      {status ? <p className="muted">{status}</p> : <p className="muted">Invite codes unlock priority review.</p>}
    </form>
  );
}
```

FILE: src\lib\auth-profile.ts

```typescript
import { creators, designs, type Design } from "./pulse-data";

type ClerkProfileUser = {
  firstName?: string | null;
  fullName?: string | null;
  id?: string;
  imageUrl?: string;
  lastName?: string | null;
  primaryEmailAddress?: { emailAddress?: string | null } | null;
  username?: string | null;
};

export type PulseAccount = {
  avatarUrl: string;
  bio: string;
  displayName: string;
  followerCount: number;
  followingCount: number;
  likedDesignSlugs: string[];
  savedDesignSlugs: string[];
  totalLikes: number;
  username: string;
};

function stableNumber(seed: string, min: number, max: number) {
  let hash = 0;
  for (const char of seed) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  return min + (hash % (max - min + 1));
}

export function accountFromClerkUser(user: ClerkProfileUser | null | undefined): PulseAccount {
  const emailName = user?.primaryEmailAddress?.emailAddress?.split("@")[0];
  const username = user?.username || emailName || "pulse.creator";
  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    username;
  const seed = user?.id || username;
  const likedDesignSlugs = designs.filter((_, index) => index % 2 === stableNumber(seed, 0, 1)).map((design) => design.slug);
  const savedDesignSlugs = designs.filter((_, index) => index === 0 || index % 3 === stableNumber(seed, 0, 2)).map((design) => design.slug);

  return {
    avatarUrl: user?.imageUrl || "",
    bio: "Building a personal archive of technical streetwear, future uniforms and community-voted concepts.",
    displayName,
    followerCount: stableNumber(seed, 1200, 18400),
    followingCount: stableNumber(`${seed}:following`, 80, 620),
    likedDesignSlugs,
    savedDesignSlugs,
    totalLikes: stableNumber(`${seed}:likes`, 8400, 128900),
    username
  };
}

export function accountDesigns(slugs: string[]) {
  return slugs
    .map((slug) => designs.find((design) => design.slug === slug))
    .filter((design): design is Design => Boolean(design));
}

export function topCreatorBaseline() {
  return creators[0];
}
```

FILE: src\lib\clerk-appearance.ts

```typescript
export const pulseClerkAppearance = {
  variables: {
    colorBackground: "#050506",
    colorInputBackground: "rgba(255,255,255,0.055)",
    colorInputText: "#f5f5f2",
    colorPrimary: "#d9ff66",
    colorText: "#f5f5f2",
    colorTextSecondary: "#a3a3a3",
    borderRadius: "8px",
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
  },
  elements: {
    cardBox: "pulse-auth-card-box",
    card: "pulse-auth-card",
    headerTitle: "pulse-auth-title",
    headerSubtitle: "pulse-auth-subtitle",
    formButtonPrimary: "pulse-auth-primary",
    socialButtonsBlockButton: "pulse-auth-social",
    formFieldInput: "pulse-auth-input",
    footerActionLink: "pulse-auth-link",
    userButtonAvatarBox: "pulse-user-avatar"
  }
};

export const pulseUserButtonAppearance = {
  elements: {
    userButtonAvatarBox: "pulse-user-avatar",
    userButtonPopoverCard: "pulse-user-popover",
    userButtonPopoverActionButton: "pulse-user-action"
  }
};

```

FILE: src\lib\cloudinary.ts

```typescript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export { cloudinary };

```

FILE: src\lib\db\client.ts

```typescript
import postgres from "postgres";

export const sql = process.env.DATABASE_URL
  ? postgres(process.env.DATABASE_URL, { ssl: "require" })
  : null;

```

FILE: src\lib\db\schema.sql

```sql
create extension if not exists "uuid-ossp";

create type design_status as enum (
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'FEATURED',
  'SELECTED_FOR_DROP'
);

create table users (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text unique not null,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table designs (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid not null references users(id) on delete cascade,
  slug text unique not null,
  title text not null,
  description text not null,
  inspiration text,
  category text not null,
  clothing_type text not null,
  fabric text,
  gsm text,
  fit text not null default 'Straight Fit',
  decoration_type text not null default 'Print',
  logo_placement text not null default 'Front center',
  fabric_weight text not null default 'Medium',
  color_base text not null default 'Black',
  production_style text not null default 'Streetwear',
  cut text,
  embroidery text,
  print_type text,
  colorway text,
  washing_style text,
  target_aesthetic text,
  cover_image_url text not null,
  gallery_image_urls text[] not null default '{}',
  tags text[] not null default '{}',
  palette text[] not null default '{}',
  status design_status not null default 'PENDING_REVIEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint designs_category_check check (category in ('T-shirt', 'Sweatshirt / Hoodie', 'Pants / Jogging')),
  constraint designs_fit_check check (
    (category in ('T-shirt', 'Sweatshirt / Hoodie') and fit in ('Straight Fit', 'Slim Fit', 'Oversized', 'Boxy Fit'))
    or
    (category = 'Pants / Jogging' and fit in ('Baggy', 'Flare', 'Skinny', 'Bootcut', 'Straight Leg', 'Relaxed Fit'))
  ),
  constraint designs_decoration_type_check check (decoration_type in ('Print', 'Embroidery', 'Print + Embroidery')),
  constraint designs_logo_placement_check check (logo_placement in ('Front center', 'Small chest', 'Back', 'Sleeve', 'Leg')),
  constraint designs_fabric_weight_check check (fabric_weight in ('Light', 'Medium', 'Heavy')),
  constraint designs_color_base_check check (color_base in ('Black', 'White', 'Grey', 'Navy', 'Cream')),
  constraint designs_production_style_check check (production_style in ('Minimal', 'Streetwear', 'Futuristic', 'Vintage', 'Sport'))
);

create table design_likes (
  design_id uuid references designs(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (design_id, user_id)
);

create table design_saves (
  design_id uuid references designs(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  collection_name text not null default 'Saved',
  created_at timestamptz not null default now(),
  primary key (design_id, user_id, collection_name)
);

create table comments (
  id uuid primary key default uuid_generate_v4(),
  design_id uuid not null references designs(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table follows (
  follower_id uuid references users(id) on delete cascade,
  following_id uuid references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id)
);

create table drops (
  id uuid primary key default uuid_generate_v4(),
  drop_number int unique not null,
  title text not null,
  description text,
  launch_at timestamptz,
  status text not null default 'CURATING',
  created_at timestamptz not null default now()
);

create table drop_designs (
  drop_id uuid references drops(id) on delete cascade,
  design_id uuid references designs(id) on delete cascade,
  winner_badge text,
  production_status text not null default 'SELECTED',
  primary key (drop_id, design_id)
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  design_id uuid unique not null references designs(id) on delete restrict,
  name text not null,
  price_cents int not null,
  inventory_count int not null default 0,
  status text not null default 'PREORDER',
  created_at timestamptz not null default now()
);

create table waitlist_entries (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  invite_code text,
  reason text,
  status text not null default 'PENDING',
  queue_position int,
  created_at timestamptz not null default now()
);

create table invite_codes (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  max_uses int not null default 1,
  used_count int not null default 0,
  access_tier text not null default 'ALPHA',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  body text,
  type text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table moderation_events (
  id uuid primary key default uuid_generate_v4(),
  design_id uuid references designs(id) on delete cascade,
  moderator_id uuid references users(id) on delete set null,
  action text not null,
  risk_level text not null default 'LOW',
  notes text,
  created_at timestamptz not null default now()
);

create index designs_status_created_idx on designs(status, created_at desc);
create index designs_tags_idx on designs using gin(tags);
create index design_likes_design_idx on design_likes(design_id);
create index comments_design_created_idx on comments(design_id, created_at desc);
create index waitlist_status_created_idx on waitlist_entries(status, created_at desc);
create index notifications_user_created_idx on notifications(user_id, created_at desc);
create index moderation_events_design_created_idx on moderation_events(design_id, created_at desc);

create view user_profile_stats as
select
  u.id,
  u.clerk_user_id,
  u.username,
  u.display_name,
  u.avatar_url,
  u.bio,
  count(distinct inbound.follower_id) filter (where inbound.follower_id is not null) as follower_count,
  count(distinct outbound.following_id) filter (where outbound.following_id is not null) as following_count,
  count(distinct d.id) as uploaded_designs,
  count(distinct dl.design_id) as liked_designs,
  count(distinct ds.design_id) as saved_designs
from users u
left join follows inbound on inbound.following_id = u.id
left join follows outbound on outbound.follower_id = u.id
left join designs d on d.creator_id = u.id
left join design_likes dl on dl.user_id = u.id
left join design_saves ds on ds.user_id = u.id
group by u.id;
```

FILE: src\lib\db\social.ts

```typescript
import { sql } from "./client";

type ClerkDbUser = {
  firstName?: string | null;
  fullName?: string | null;
  id?: string;
  imageUrl?: string;
  lastName?: string | null;
  primaryEmailAddress?: { emailAddress?: string | null } | null;
  username?: string | null;
};

function usernameFor(user: ClerkDbUser) {
  return user.username || user.primaryEmailAddress?.emailAddress?.split("@")[0] || `pulse-${user.id?.slice(-8)}`;
}

function displayNameFor(user: ClerkDbUser) {
  return user.fullName || [user.firstName, user.lastName].filter(Boolean).join(" ") || usernameFor(user);
}

export async function ensurePulseUser(user: ClerkDbUser | null | undefined) {
  if (!sql || !user?.id) return null;
  const username = usernameFor(user);
  const displayName = displayNameFor(user);
  try {
    const rows = await sql`
      insert into users (clerk_user_id, username, display_name, avatar_url)
      values (${user.id}, ${username}, ${displayName}, ${user.imageUrl || null})
      on conflict (clerk_user_id)
      do update set
        username = excluded.username,
        display_name = excluded.display_name,
        avatar_url = excluded.avatar_url
      returning id
    `;
    return rows[0]?.id as string | undefined;
  } catch {
    return null;
  }
}

export async function recordLike(user: ClerkDbUser | null | undefined, slug: string) {
  if (!sql) return false;
  const userId = await ensurePulseUser(user);
  if (!userId) return false;
  try {
    await sql`
      insert into design_likes (design_id, user_id)
      select designs.id, ${userId}::uuid
      from designs
      where designs.slug = ${slug}
      on conflict do nothing
    `;
    return true;
  } catch {
    return false;
  }
}

export async function recordSave(user: ClerkDbUser | null | undefined, slug: string) {
  if (!sql) return false;
  const userId = await ensurePulseUser(user);
  if (!userId) return false;
  try {
    await sql`
      insert into design_saves (design_id, user_id)
      select designs.id, ${userId}::uuid
      from designs
      where designs.slug = ${slug}
      on conflict do nothing
    `;
    return true;
  } catch {
    return false;
  }
}

export async function savedDesignSlugs(user: ClerkDbUser | null | undefined) {
  if (!sql || !user?.id) return [];
  try {
    const rows = await sql`
      select designs.slug
      from design_saves
      join users on users.id = design_saves.user_id
      join designs on designs.id = design_saves.design_id
      where users.clerk_user_id = ${user.id}
      order by design_saves.created_at desc
    `;
    return rows.map((row) => row.slug as string);
  } catch {
    return [];
  }
}

export async function likedDesignSlugs(user: ClerkDbUser | null | undefined) {
  if (!sql || !user?.id) return [];
  try {
    const rows = await sql`
      select designs.slug
      from design_likes
      join users on users.id = design_likes.user_id
      join designs on designs.id = design_likes.design_id
      where users.clerk_user_id = ${user.id}
      order by design_likes.created_at desc
    `;
    return rows.map((row) => row.slug as string);
  } catch {
    return [];
  }
}
```

FILE: src\lib\pulse-data.ts

```typescript
export type Creator = {
  username: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  likes: number;
  rank: number;
  badge: string;
};

export type Design = {
  slug: string;
  title: string;
  creator: string;
  category: string;
  clothingType: string;
  fabric: string;
  gsm: string;
  fit: string;
  cut: string;
  embroidery: string;
  printType: string;
  colorway: string;
  washing: string;
  aesthetic: string;
  inspiration: string;
  description: string;
  style: string;
  likes: number;
  comments: number;
  approval: number;
  saves: number;
  shape: "hoodie" | "jacket" | "pants" | "vest" | "shoe";
  height: "short" | "tall";
  visual: string;
  garment: string;
  palette: string[];
  tags: string[];
};

export const creators: Creator[] = [
  {
    username: "kaizen.arc",
    name: "Kaizen Arc",
    bio: "Technical silhouettes, modular hardware and washed black utility systems.",
    followers: 18400,
    following: 218,
    likes: 128900,
    rank: 1,
    badge: "Drop winner"
  },
  {
    username: "noirshift",
    name: "Noir Shift",
    bio: "Minimal future uniforms with muted palettes and sculpted oversized fits.",
    followers: 12100,
    following: 340,
    likes: 76300,
    rank: 2,
    badge: "Featured"
  },
  {
    username: "mika.systems",
    name: "Mika Systems",
    bio: "Footwear-led streetwear concepts inspired by motion, compression and mesh.",
    followers: 9700,
    following: 119,
    likes: 54400,
    rank: 3,
    badge: "Rising"
  }
];

export const designs: Design[] = [
  {
    slug: "neon-utility-shell",
    title: "Neon Utility Shell",
    creator: "kaizen.arc",
    category: "Outerwear",
    clothingType: "Shell Jacket",
    fabric: "Ripstop nylon",
    gsm: "165 GSM",
    fit: "Oversized",
    cut: "Cropped technical block",
    embroidery: "Sleeve coordinate stitch",
    printType: "Reflective transfer",
    colorway: "Graphite / Volt",
    washing: "Cold technical wash",
    aesthetic: "Cyber terrace uniform",
    inspiration: "Rain shells, early trail gear, underground football culture.",
    description: "A modular shell with hidden pocket geometry, cinched hem and thin reflective pulse lines.",
    style: "Techwear",
    likes: 18340,
    comments: 842,
    approval: 92,
    saves: 5100,
    height: "tall",
    shape: "jacket",
    visual: "linear-gradient(135deg, #121417, #3d4145 42%, #0b0b0c)",
    garment: "linear-gradient(145deg, #0c0d0e, #4b5154)",
    palette: ["#070707", "#c8ccc9", "#d9ff66", "#5a5f62"],
    tags: ["technical", "reflective", "utility"]
  },
  {
    slug: "oxide-loop-hoodie",
    title: "Oxide Loop Hoodie",
    creator: "noirshift",
    category: "Tops",
    clothingType: "Heavy hoodie",
    fabric: "Brushed cotton fleece",
    gsm: "520 GSM",
    fit: "Boxy oversized",
    cut: "Dropped shoulder",
    embroidery: "Tonal chest seal",
    printType: "Discharge back graphic",
    colorway: "Washed black / Ash",
    washing: "Garment dyed mineral wash",
    aesthetic: "Monochrome luxury street",
    inspiration: "Concrete, archive tour merch, late night studio uniforms.",
    description: "A heavyweight hoodie with exaggerated ribbing, mineral fade and hidden side pocket entry.",
    style: "Luxury basics",
    likes: 14980,
    comments: 496,
    approval: 88,
    saves: 4200,
    height: "short",
    shape: "hoodie",
    visual: "linear-gradient(150deg, #050505, #2b2b2b 48%, #111)",
    garment: "linear-gradient(145deg, #151515, #6a6a66)",
    palette: ["#050505", "#2f3030", "#b8b8b1", "#ffffff"],
    tags: ["heavyweight", "washed", "minimal"]
  },
  {
    slug: "mesh-runner-zero",
    title: "Mesh Runner Zero",
    creator: "mika.systems",
    category: "Footwear",
    clothingType: "Runner",
    fabric: "Open mesh / TPU",
    gsm: "N/A",
    fit: "True to size",
    cut: "Low runner",
    embroidery: "Tongue pulse mark",
    printType: "Molded side grid",
    colorway: "Silver / Smoke / Ice",
    washing: "Wipe clean",
    aesthetic: "Futuristic daily runner",
    inspiration: "Early 2000s running shoes, lab footwear, liquid metal finishes.",
    description: "A sculpted mesh runner with segmented sole geometry and translucent overlays.",
    style: "Future sport",
    likes: 16240,
    comments: 664,
    approval: 90,
    saves: 5900,
    height: "short",
    shape: "shoe",
    visual: "linear-gradient(135deg, #151719, #e1e4df 56%, #222)",
    garment: "linear-gradient(145deg, #e8ebe7, #747b80)",
    palette: ["#ffffff", "#b9c1c4", "#4a4f54", "#8fe7ff"],
    tags: ["runner", "mesh", "silver"]
  }
];

export const drops = [
  {
    id: "DROP #001",
    name: "SIGNAL / BLACK",
    status: "Live selection",
    date: "2026-07-15T18:00:00",
    winners: ["neon-utility-shell", "mesh-runner-zero"],
    copy: "Community-selected technical pieces in black, graphite and reflective silver."
  },
  {
    id: "DROP #002",
    name: "VOID UNIFORM",
    status: "Voting opens",
    date: "2026-09-04T20:00:00",
    winners: ["oxide-loop-hoodie"],
    copy: "Heavy fleece, washed black denim and premium outerwear proposals."
  }
];

export function findCreator(username: string) {
  return creators.find((creator) => creator.username === username) ?? creators[0];
}

export function findDesign(slug: string) {
  return designs.find((design) => design.slug === slug) ?? designs[0];
}

```

FILE: src\lib\trending.ts

```typescript
import type { Design } from "./pulse-data";

export function trendingScore(design: Design) {
  return design.likes + design.saves * 1.7 + design.comments * 8 + design.approval * 140;
}

export function recommendedDesigns(designs: Design[]) {
  return [...designs].sort((a, b) => trendingScore(b) - trendingScore(a));
}

```

FILE: styles.css

```css
:root {
  color-scheme: dark;
  --bg: #030303;
  --panel: rgba(18, 18, 20, 0.76);
  --panel-strong: rgba(28, 29, 32, 0.92);
  --line: rgba(255, 255, 255, 0.12);
  --line-strong: rgba(255, 255, 255, 0.22);
  --text: #f5f5f2;
  --muted: #a3a3a3;
  --dim: #6f7177;
  --silver: #d7d7d2;
  --accent: #e8fff6;
  --cyan: #8fe7ff;
  --volt: #d9ff66;
  --danger: #ff6f6f;
  --ok: #9cffb9;
  --radius: 8px;
  --nav-h: 74px;
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.42);
  --font: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.025), transparent 24rem),
    radial-gradient(ellipse at top, rgba(255, 255, 255, 0.06), transparent 28rem),
    var(--bg);
  color: var(--text);
  font-family: var(--font);
  letter-spacing: 0;
  overflow-x: hidden;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input,
select,
textarea {
  font: inherit;
}

button {
  cursor: pointer;
}

img {
  display: block;
  max-width: 100%;
}

.pulse-loader {
  position: fixed;
  inset: 0;
  z-index: 120;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 18px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.03), transparent 24%, rgba(255, 255, 255, 0.045) 62%, transparent),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.045) 0 1px, transparent 1px 72px),
    #030303;
  transition: opacity 760ms cubic-bezier(0.22, 1, 0.36, 1), visibility 760ms ease;
}

.loader-index {
  color: var(--dim);
  font-size: 12px;
}

.loader-word {
  position: relative;
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 96px;
  font-weight: 950;
  line-height: 0.85;
}

.loader-word::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.25);
  transform: translate(9px, 9px);
}

.loader-line {
  width: min(360px, 72vw);
  height: 1px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.12);
}

.loader-line span {
  display: block;
  width: 48%;
  height: 100%;
  background: #fff;
  box-shadow: 0 0 28px rgba(255, 255, 255, 0.38);
  animation: loaderLine 1.2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

.loader-caption {
  color: rgba(245, 245, 242, 0.56);
  font-size: 12px;
}

@keyframes loaderLine {
  from { transform: translateX(-100%); }
  to { transform: translateX(220%); }
}

.is-loaded .pulse-loader {
  opacity: 0;
  visibility: hidden;
}

.cursor-light,
.pulse-cursor {
  position: fixed;
  left: 0;
  top: 0;
  pointer-events: none;
  will-change: transform;
}

.cursor-light {
  z-index: 4;
  width: 520px;
  height: 520px;
  margin: -260px 0 0 -260px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.08), rgba(143, 231, 255, 0.045) 28%, transparent 66%);
  mix-blend-mode: screen;
  opacity: 0.8;
}

.pulse-cursor {
  z-index: 130;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 1px solid rgba(255, 255, 255, 0.74);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 26px rgba(255, 255, 255, 0.18);
  transition: width 180ms ease, height 180ms ease, margin 180ms ease, background 180ms ease, border-color 180ms ease;
}

.cursor-engaged .pulse-cursor {
  width: 44px;
  height: 44px;
  margin: -22px 0 0 -22px;
  border-color: rgba(217, 255, 102, 0.58);
  background: rgba(217, 255, 102, 0.09);
}

@media (pointer: fine) {
  body,
  a,
  button,
  input,
  select,
  textarea {
    cursor: none;
  }
}

@media (pointer: coarse) {
  .pulse-cursor,
  .cursor-light {
    display: none;
  }
}

.noise {
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  opacity: 0.18;
  background-image:
    linear-gradient(0deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 3px 3px;
  mask-image: linear-gradient(to bottom, black, transparent 86%);
}

.ambient-grid {
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
  background:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 92px 92px;
  transform-origin: top center;
  transform: perspective(900px) rotateX(68deg) translateY(-34%);
  opacity: 0.18;
  animation: gridDrift 18s linear infinite;
}

@keyframes gridDrift {
  from { background-position: 0 0, 0 0; }
  to { background-position: 0 184px, 184px 0; }
}

.shell {
  min-height: 100vh;
}

.container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.wide-container {
  width: min(1440px, calc(100% - 32px));
  margin: 0 auto;
}

.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(3, 3, 3, 0.58);
  backdrop-filter: blur(22px);
}

.nav-inner {
  width: min(1440px, calc(100% - 32px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 28px;
  align-items: center;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 900;
  letter-spacing: 0;
}

.brand-mark {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0.02));
  box-shadow: 0 0 24px rgba(255, 255, 255, 0.12);
}

.brand-mark::before {
  content: "";
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--text);
  box-shadow: 0 0 16px rgba(255, 255, 255, 0.7);
}

.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.nav-link {
  border: 1px solid transparent;
  color: rgba(245, 245, 242, 0.72);
  padding: 10px 13px;
  border-radius: 999px;
  font-size: 13px;
  transition: color 180ms ease, background 180ms ease, border-color 180ms ease;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text);
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.12);
}

.nav-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.language-switcher {
  display: inline-grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3px;
  align-items: center;
  min-height: 42px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.025)),
    rgba(5, 5, 6, 0.62);
  backdrop-filter: blur(18px);
  direction: ltr;
}

.language-switcher button {
  position: relative;
  min-width: 32px;
  min-height: 32px;
  border: 0;
  border-radius: 999px;
  color: rgba(245, 245, 242, 0.58);
  background: transparent;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0;
  overflow: hidden;
  transition: color 180ms ease, background 180ms ease, box-shadow 180ms ease, transform 180ms var(--ease-soft);
}

.language-switcher button::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 18%, rgba(255, 255, 255, 0.2), transparent 58%);
  transform: translateX(-120%);
  transition: transform 620ms var(--ease-luxe);
}

.language-switcher button:hover {
  color: var(--text);
  transform: translateY(-1px);
}

.language-switcher button:hover::after {
  transform: translateX(120%);
}

.language-switcher button.active {
  color: #050505;
  background: linear-gradient(135deg, #ffffff, #d9ff66);
  box-shadow: 0 0 24px rgba(217, 255, 102, 0.18);
}

.icon-btn,
.ghost-btn,
.primary-btn,
.text-btn,
.mini-btn {
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.065);
  color: var(--text);
  min-height: 42px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: transform 180ms ease, border-color 180ms ease, background 180ms ease, box-shadow 180ms ease;
}

.icon-btn {
  width: 42px;
  padding: 0;
}

.ghost-btn,
.primary-btn,
.text-btn {
  padding: 0 18px;
}

.primary-btn {
  color: #050505;
  background: linear-gradient(135deg, #ffffff, #b9bebf);
  border-color: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 34px rgba(255, 255, 255, 0.16);
}

.primary-btn:hover,
.ghost-btn:hover,
.icon-btn:hover,
.text-btn:hover,
.mini-btn:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.34);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
}

.text-btn {
  background: transparent;
  color: var(--muted);
}

.mini-btn {
  min-height: 32px;
  padding: 0 11px;
  font-size: 12px;
}

.mobile-nav {
  display: none;
}

.view {
  min-height: calc(100vh - var(--nav-h));
  animation: viewEnter 680ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes viewEnter {
  from { opacity: 0; transform: translateY(18px); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero {
  min-height: calc(100vh - var(--nav-h));
  display: grid;
  align-items: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.hero::before {
  content: "";
  position: absolute;
  inset: 9% 0 auto 0;
  height: 56%;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent),
    repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.13) 0 1px, transparent 1px 18px);
  filter: blur(0.2px);
  opacity: 0.28;
  transform: skewY(-7deg);
  animation: scan 8s ease-in-out infinite alternate;
}

@keyframes scan {
  from { transform: translateX(-5%) skewY(-7deg); opacity: 0.18; }
  to { transform: translateX(5%) skewY(-7deg); opacity: 0.36; }
}

.hero-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(360px, 0.95fr);
  gap: 42px;
  align-items: center;
  padding: 58px 0;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--silver);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 8px 12px;
  background: rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(12px);
  font-size: 12px;
  text-transform: uppercase;
}

.eyebrow::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--volt);
  box-shadow: 0 0 18px var(--volt);
}

.hero h1 {
  margin: 24px 0 18px;
  max-width: 900px;
  font-size: 76px;
  line-height: 0.92;
  letter-spacing: 0;
  text-transform: uppercase;
}

.hero h1 span {
  display: block;
  color: rgba(255, 255, 255, 0.52);
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.34);
}

.hero-copy {
  max-width: 620px;
  color: var(--muted);
  font-size: 18px;
  line-height: 1.7;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 30px;
}

.hero-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 42px;
  max-width: 620px;
}

.stat-tile,
.panel,
.design-card,
.creator-card,
.drop-card,
.product-card,
.admin-card,
.form-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: var(--panel);
  backdrop-filter: blur(18px);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.stat-tile {
  padding: 18px;
  min-height: 94px;
}

.stat-value {
  display: block;
  font-size: 28px;
  font-weight: 850;
}

.stat-label {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
}

.hero-stage {
  position: relative;
  min-height: 610px;
}

.hero-frame {
  position: absolute;
  inset: 10px 0 0 auto;
  width: min(520px, 100%);
  height: 590px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #0a0a0b;
  box-shadow: 0 36px 120px rgba(0, 0, 0, 0.65);
}

.hero-frame::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, transparent 0 48%, rgba(0, 0, 0, 0.48)),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08), transparent 32%, rgba(255, 255, 255, 0.06));
  pointer-events: none;
}

.editorial-tag {
  position: absolute;
  z-index: 2;
  left: 18px;
  bottom: 18px;
  display: grid;
  gap: 4px;
  color: var(--text);
}

.editorial-tag strong {
  font-size: 20px;
}

.editorial-tag small {
  color: var(--muted);
}

.floating-card {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 44px;
  width: 250px;
  padding: 14px;
  animation: floatUp 5s ease-in-out infinite;
}

.floating-card .mini-metric {
  display: flex;
  justify-content: space-between;
  color: var(--muted);
  font-size: 12px;
  margin-bottom: 12px;
}

@keyframes floatUp {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.section {
  padding: 88px 0;
}

.section-tight {
  padding: 52px 0;
}

.section-head {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 24px;
  margin-bottom: 28px;
}

.section-kicker {
  color: var(--dim);
  font-size: 12px;
  text-transform: uppercase;
}

.section-title {
  margin: 8px 0 0;
  font-size: 40px;
  line-height: 1.05;
  letter-spacing: 0;
  text-transform: uppercase;
}

.section-copy {
  color: var(--muted);
  max-width: 580px;
  line-height: 1.65;
}

.carousel {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(280px, 360px);
  gap: 16px;
  overflow-x: auto;
  padding-bottom: 18px;
  scroll-snap-type: x proximity;
}

.carousel > * {
  scroll-snap-align: start;
}

.carousel::-webkit-scrollbar,
.masonry::-webkit-scrollbar {
  height: 8px;
}

.carousel::-webkit-scrollbar-thumb,
.masonry::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.18);
  border-radius: 999px;
}

.masonry {
  columns: 4 260px;
  column-gap: 16px;
}

.masonry .design-card {
  display: inline-block;
  width: 100%;
  margin: 0 0 16px;
}

.design-card {
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  transition: transform 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}

.design-card:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.52), 0 0 46px rgba(255, 255, 255, 0.08);
}

.card-visual {
  min-height: 360px;
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent),
    var(--visual-bg);
}

.design-card.compact .card-visual {
  min-height: 310px;
}

.card-visual.tall {
  min-height: 460px;
}

.card-visual.short {
  min-height: 300px;
}

.card-visual::before {
  content: "";
  position: absolute;
  inset: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
}

.card-visual::after {
  content: "";
  position: absolute;
  inset: auto 12% 8% 12%;
  height: 1px;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 40px rgba(255, 255, 255, 0.22);
}

.mockup {
  position: absolute;
  inset: 36px 34px 40px;
  display: grid;
  place-items: center;
  transform: translateZ(0);
  transition: transform 360ms ease;
}

.design-card:hover .mockup,
.hero-frame:hover .mockup {
  transform: scale(1.045);
}

.garment {
  position: relative;
  width: 66%;
  height: 78%;
  filter: drop-shadow(0 30px 50px rgba(0, 0, 0, 0.55));
}

.garment::before,
.garment::after,
.garment .piece-a,
.garment .piece-b,
.garment .piece-c {
  content: "";
  position: absolute;
  background: var(--garment);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 0 30px rgba(255, 255, 255, 0.06);
}

.hoodie .piece-a {
  left: 21%;
  top: 5%;
  width: 58%;
  height: 22%;
  border-radius: 42% 42% 18% 18%;
}

.hoodie .piece-b {
  left: 18%;
  top: 22%;
  width: 64%;
  height: 62%;
  border-radius: 18% 18% 8% 8%;
}

.hoodie::before {
  left: 0;
  top: 28%;
  width: 26%;
  height: 44%;
  transform: rotate(16deg);
  border-radius: 38px;
}

.hoodie::after {
  right: 0;
  top: 28%;
  width: 26%;
  height: 44%;
  transform: rotate(-16deg);
  border-radius: 38px;
}

.jacket .piece-a {
  left: 19%;
  top: 8%;
  width: 62%;
  height: 78%;
  clip-path: polygon(22% 0, 78% 0, 94% 100%, 6% 100%);
}

.jacket .piece-b {
  left: 47.5%;
  top: 12%;
  width: 5%;
  height: 71%;
  background: rgba(255, 255, 255, 0.2);
}

.jacket::before,
.jacket::after {
  top: 17%;
  width: 22%;
  height: 58%;
  border-radius: 44px;
}

.jacket::before {
  left: 0;
  transform: rotate(13deg);
}

.jacket::after {
  right: 0;
  transform: rotate(-13deg);
}

.pants .piece-a,
.pants .piece-b {
  top: 8%;
  width: 35%;
  height: 82%;
  border-radius: 36px 36px 18px 18px;
}

.pants .piece-a {
  left: 16%;
  transform: rotate(2deg);
}

.pants .piece-b {
  right: 16%;
  transform: rotate(-2deg);
}

.pants::before {
  left: 19%;
  top: 4%;
  width: 62%;
  height: 18%;
  border-radius: 30px;
}

.vest .piece-a {
  left: 22%;
  top: 8%;
  width: 56%;
  height: 78%;
  border-radius: 40px 40px 18px 18px;
  clip-path: polygon(16% 0, 41% 0, 50% 20%, 59% 0, 84% 0, 92% 100%, 8% 100%);
}

.vest .piece-b,
.vest .piece-c {
  width: 22%;
  height: 12%;
  top: 44%;
  background: rgba(255, 255, 255, 0.18);
  border-color: rgba(255, 255, 255, 0.16);
}

.vest .piece-b { left: 27%; }
.vest .piece-c { right: 27%; }

.shoe .piece-a {
  left: 5%;
  top: 44%;
  width: 88%;
  height: 26%;
  border-radius: 60% 20% 22% 34%;
  transform: skewX(-16deg);
}

.shoe .piece-b {
  left: 24%;
  top: 28%;
  width: 42%;
  height: 26%;
  border-radius: 60% 42% 8% 8%;
  transform: rotate(-8deg);
}

.shoe::after {
  left: 4%;
  top: 67%;
  width: 92%;
  height: 8%;
  background: rgba(255, 255, 255, 0.22);
  border-radius: 999px;
}

.print-lines {
  position: absolute;
  inset: 18%;
  background:
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.11) 0 1px, transparent 1px 16px),
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 28px);
  mix-blend-mode: screen;
  opacity: 0.58;
  mask-image: radial-gradient(ellipse, black 30%, transparent 72%);
}

.palette-row {
  display: flex;
  gap: 5px;
  align-items: center;
}

.swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.32);
  background: var(--c);
}

.card-body {
  padding: 14px;
}

.card-top,
.card-meta,
.creator-inline,
.quick-actions,
.tag-row {
  display: flex;
  align-items: center;
}

.card-top {
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.card-title {
  margin: 0;
  font-size: 17px;
  line-height: 1.2;
}

.creator-inline {
  gap: 9px;
  color: var(--muted);
  font-size: 13px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #050505;
  background: linear-gradient(135deg, #fff, #a8a8a8);
  border: 1px solid rgba(255, 255, 255, 0.48);
  font-size: 12px;
  font-weight: 900;
}

.avatar.large {
  width: 86px;
  height: 86px;
  font-size: 24px;
}

.card-meta {
  flex-wrap: wrap;
  gap: 7px;
  color: var(--muted);
  font-size: 12px;
  margin-top: 12px;
}

.metric-pill,
.tag,
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 27px;
  border-radius: 999px;
  padding: 0 9px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.tag {
  color: rgba(245, 245, 242, 0.76);
}

.quick-actions {
  position: absolute;
  z-index: 4;
  right: 12px;
  top: 12px;
  flex-direction: column;
  gap: 8px;
  opacity: 0;
  transform: translateY(-8px);
  transition: opacity 180ms ease, transform 180ms ease;
}

.design-card:hover .quick-actions,
.design-card:focus-within .quick-actions {
  opacity: 1;
  transform: translateY(0);
}

.quick-actions .icon-btn {
  width: 38px;
  height: 38px;
  min-height: 38px;
  background: rgba(0, 0, 0, 0.44);
  backdrop-filter: blur(14px);
}

.liked,
.saved {
  color: var(--volt);
  border-color: rgba(217, 255, 102, 0.35);
  box-shadow: 0 0 24px rgba(217, 255, 102, 0.12);
}

.filters {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) repeat(3, minmax(140px, 180px)) auto;
  gap: 10px;
  margin: 22px 0 28px;
}

.field,
.select,
.textarea {
  width: 100%;
  min-height: 46px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.13);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
  padding: 0 14px;
  outline: none;
  transition: border-color 160ms ease, background 160ms ease;
}

.field:focus,
.select:focus,
.textarea:focus {
  border-color: rgba(255, 255, 255, 0.38);
  background: rgba(255, 255, 255, 0.09);
}

.select option {
  background: #101012;
}

.textarea {
  min-height: 120px;
  padding: 13px 14px;
  resize: vertical;
}

.creator-grid,
.drop-grid,
.product-grid,
.admin-grid,
.profile-grid,
.spec-grid,
.reco-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.creator-card,
.drop-card,
.product-card,
.admin-card,
.form-card,
.panel {
  padding: 18px;
}

.creator-card {
  display: grid;
  gap: 18px;
}

.creator-card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.creator-name {
  margin: 0;
  font-size: 18px;
}

.creator-bio,
.muted {
  color: var(--muted);
  line-height: 1.55;
}

.rank {
  color: var(--volt);
  font-weight: 800;
}

.progress {
  position: relative;
  overflow: hidden;
  height: 9px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
}

.progress > span {
  display: block;
  width: var(--value);
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ffffff, #c7ff73);
  box-shadow: 0 0 22px rgba(217, 255, 102, 0.28);
}

.split {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  gap: 18px;
  align-items: start;
}

.detail-hero {
  padding: 40px 0 78px;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
  gap: 18px;
  align-items: start;
}

.gallery {
  display: grid;
  grid-template-columns: 1fr 0.42fr;
  gap: 12px;
}

.gallery .card-visual {
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  min-height: 660px;
}

.gallery-stack {
  display: grid;
  gap: 12px;
}

.gallery-stack .card-visual {
  min-height: 208px;
}

.detail-title {
  margin: 18px 0 10px;
  font-size: 46px;
  line-height: 1.02;
  text-transform: uppercase;
}

.approval {
  display: grid;
  gap: 9px;
  margin: 20px 0;
}

.spec-card {
  padding: 14px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.spec-label {
  display: block;
  color: var(--dim);
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.spec-value {
  color: var(--text);
}

.comment {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 12px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.comment strong {
  display: block;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.form-grid .full {
  grid-column: 1 / -1;
}

.upload-zone {
  min-height: 240px;
  display: grid;
  place-items: center;
  text-align: center;
  padding: 24px;
  border: 1px dashed rgba(255, 255, 255, 0.24);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.075), transparent),
    rgba(255, 255, 255, 0.035);
  transition: border-color 180ms ease, background 180ms ease;
}

.upload-zone.dragging {
  border-color: var(--volt);
  background: rgba(217, 255, 102, 0.08);
}

.upload-zone input {
  display: none;
}

.preview-panel {
  position: sticky;
  top: calc(var(--nav-h) + 18px);
}

.preview-card {
  overflow: hidden;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
}

.preview-image {
  min-height: 360px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.08), transparent),
    #101011;
}

.preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.timeline {
  display: grid;
  gap: 14px;
}

.drop-card {
  min-height: 280px;
  display: grid;
  align-content: space-between;
  overflow: hidden;
  position: relative;
}

.drop-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(130deg, rgba(255, 255, 255, 0.1), transparent 38%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0 1px, transparent 1px 22px);
  opacity: 0.45;
}

.drop-card > * {
  position: relative;
  z-index: 1;
}

.countdown {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}

.timebox {
  text-align: center;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(0, 0, 0, 0.3);
  padding: 10px 4px;
}

.timebox strong {
  display: block;
  font-size: 22px;
}

.timebox span {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
}

.product-card {
  overflow: hidden;
}

.product-card .card-visual {
  min-height: 330px;
  margin: -18px -18px 16px;
}

.price-row,
.admin-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.admin-card h3,
.panel h3,
.form-card h3 {
  margin-top: 0;
}

.chart {
  height: 190px;
  display: flex;
  align-items: end;
  gap: 8px;
  padding: 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.bar {
  flex: 1;
  height: var(--h);
  min-height: 18px;
  border-radius: 999px 999px 3px 3px;
  background: linear-gradient(180deg, #fff, rgba(255, 255, 255, 0.16));
}

.profile-hero {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 28px;
}

.profile-stats {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
}

.profile-stats strong {
  display: block;
}

.empty {
  min-height: 320px;
  display: grid;
  place-items: center;
  text-align: center;
  color: var(--muted);
  border: 1px dashed rgba(255, 255, 255, 0.14);
  border-radius: 8px;
}

.footer {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 40px 0 92px;
  color: var(--muted);
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

/* Premium cinematic pass */
.home-hero {
  min-height: calc(100svh - var(--nav-h));
  isolation: isolate;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), transparent 19%),
    linear-gradient(110deg, rgba(255, 255, 255, 0.05), transparent 33%, rgba(143, 231, 255, 0.08) 68%, transparent),
    #030303;
}

.home-hero::before {
  inset: -2% -10% auto -10%;
  height: 72%;
  background:
    linear-gradient(92deg, transparent 0 9%, rgba(255, 255, 255, 0.18) 24%, transparent 41%),
    repeating-linear-gradient(114deg, rgba(255, 255, 255, 0.15) 0 1px, transparent 1px 22px);
  opacity: 0.3;
  filter: blur(0.4px);
  animation: scan 11s cubic-bezier(0.22, 1, 0.36, 1) infinite alternate;
}

.home-hero::after {
  content: "";
  position: absolute;
  inset: auto -10% -1px -10%;
  height: 34%;
  background:
    linear-gradient(0deg, rgba(255, 255, 255, 0.08), transparent 74%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 90px);
  transform: perspective(760px) rotateX(70deg);
  transform-origin: bottom;
  opacity: 0.46;
  pointer-events: none;
}

.hero-light-field {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hero-light-field span {
  position: absolute;
  display: block;
  width: 62vw;
  height: 18rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.12), transparent),
    linear-gradient(180deg, rgba(143, 231, 255, 0.08), transparent);
  filter: blur(24px);
  opacity: 0.48;
  transform: rotate(-16deg);
  animation: glowSweep 14s ease-in-out infinite alternate;
}

.hero-light-field span:nth-child(1) {
  left: -15%;
  top: 8%;
}

.hero-light-field span:nth-child(2) {
  right: -18%;
  top: 34%;
  animation-delay: -4s;
}

.hero-light-field span:nth-child(3) {
  left: 30%;
  bottom: 5%;
  width: 44vw;
  opacity: 0.28;
  animation-delay: -8s;
}

.hero-masthead {
  position: absolute;
  left: -1vw;
  right: 0;
  top: 72px;
  z-index: 0;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.09);
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 220px;
  font-weight: 950;
  line-height: 0.76;
  opacity: 0.7;
  pointer-events: none;
  transform: scaleX(1.08);
  transform-origin: left top;
}

.vertical-signature {
  position: absolute;
  left: -34px;
  top: 90px;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  color: rgba(245, 245, 242, 0.34);
  font-size: 10px;
  text-transform: uppercase;
}

@keyframes glowSweep {
  from { transform: translate3d(-3%, -2%, 0) rotate(-16deg); opacity: 0.24; }
  to { transform: translate3d(4%, 4%, 0) rotate(-11deg); opacity: 0.58; }
}

.runway-lines {
  position: absolute;
  inset: 14% 0 auto;
  height: 42%;
  background:
    linear-gradient(90deg, transparent 8%, rgba(255, 255, 255, 0.16) 49%, transparent 82%),
    repeating-linear-gradient(100deg, transparent 0 27px, rgba(255, 255, 255, 0.09) 27px 28px);
  mask-image: linear-gradient(90deg, transparent, black 18%, black 78%, transparent);
  opacity: 0.34;
  transform: skewY(-8deg);
  animation: runwayDrift 16s linear infinite;
}

@keyframes runwayDrift {
  from { background-position: 0 0, 0 0; }
  to { background-position: 220px 0, 360px 0; }
}

.hero-layout {
  grid-template-columns: minmax(0, 1.12fr) minmax(390px, 0.78fr);
  gap: 46px;
  padding: 48px 0 42px;
}

.hero-copy-panel {
  position: relative;
  animation: copyRise 880ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes copyRise {
  from { opacity: 0; transform: translateY(22px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.hero h1,
.detail-title,
.section-title {
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-weight: 950;
  letter-spacing: 0;
}

.hero h1 {
  max-width: 820px;
  font-size: 74px;
  line-height: 0.9;
  text-shadow: 0 24px 70px rgba(0, 0, 0, 0.75);
}

.hero h1 span {
  color: rgba(255, 255, 255, 0.58);
  text-shadow:
    0 0 28px rgba(255, 255, 255, 0.08),
    0 28px 70px rgba(0, 0, 0, 0.7);
}

.hero-copy {
  max-width: 680px;
  font-size: 19px;
  color: rgba(245, 245, 242, 0.72);
}

.hero-proof {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.hero-proof span {
  min-height: 32px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 0 12px;
  color: rgba(245, 245, 242, 0.76);
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(16px);
  font-size: 12px;
  text-transform: uppercase;
}

.hero-meta {
  max-width: 720px;
  gap: 12px;
  margin-top: 28px;
}

.stat-tile,
.panel,
.design-card,
.creator-card,
.drop-card,
.product-card,
.admin-card,
.form-card {
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.025)),
    rgba(13, 13, 15, 0.64);
  border-color: rgba(255, 255, 255, 0.13);
  box-shadow:
    0 24px 90px rgba(0, 0, 0, 0.48),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.stat-tile {
  overflow: hidden;
  position: relative;
}

.stat-tile::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 12%, rgba(255, 255, 255, 0.13), transparent 48%);
  transform: translateX(-110%);
  transition: transform 740ms cubic-bezier(0.22, 1, 0.36, 1);
}

.stat-tile:hover::after {
  transform: translateX(110%);
}

.hero-stage {
  min-height: 590px;
  animation: stageFloat 7s ease-in-out infinite;
}

@keyframes stageFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.hero-frame {
  inset: 0 0 0 auto;
  width: min(515px, 100%);
  height: 590px;
  border-color: rgba(255, 255, 255, 0.2);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.1), transparent),
    rgba(6, 6, 7, 0.72);
  backdrop-filter: blur(18px);
  box-shadow:
    0 42px 130px rgba(0, 0, 0, 0.72),
    0 0 90px rgba(143, 231, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

.hero-frame .card-visual {
  min-height: 590px;
}

.hero-frame::before {
  content: "";
  position: absolute;
  inset: 16px;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  pointer-events: none;
}

.hero-lookbook {
  position: absolute;
  z-index: 2;
  overflow: hidden;
  width: 185px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(16px);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.44);
}

.hero-lookbook .card-visual {
  min-height: 205px;
}

.hero-lookbook-a {
  left: 0;
  top: 62px;
  transform: rotate(-4deg);
  animation: lookbookA 7s ease-in-out infinite;
}

.hero-lookbook-b {
  right: 10px;
  bottom: 10px;
  transform: rotate(3deg);
  animation: lookbookB 7s ease-in-out infinite;
}

@keyframes lookbookA {
  0%, 100% { transform: translateY(0) rotate(-4deg); }
  50% { transform: translateY(10px) rotate(-2deg); }
}

@keyframes lookbookB {
  0%, 100% { transform: translateY(0) rotate(3deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}

.floating-card {
  width: 285px;
  right: -12px;
  bottom: 56px;
  background: rgba(10, 10, 11, 0.58);
  border-color: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(24px);
}

.hero-ticker {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  display: flex;
  gap: 34px;
  overflow: hidden;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.36);
  backdrop-filter: blur(18px);
  padding: 12px 0;
  color: rgba(245, 245, 242, 0.62);
  white-space: nowrap;
  text-transform: uppercase;
  font-size: 12px;
}

.hero-ticker span {
  animation: tickerMove 18s linear infinite;
}

@keyframes tickerMove {
  from { transform: translateX(0); }
  to { transform: translateX(-280px); }
}

.editorial-composition {
  position: relative;
  overflow: hidden;
  padding: 112px 0 86px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 34%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 18vw);
}

.editorial-composition::before {
  content: "PULSE ATELIER";
  position: absolute;
  left: 3vw;
  top: 42px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 112px;
  line-height: 0.8;
}

.editorial-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(260px, 0.8fr) minmax(360px, 1fr) minmax(220px, 0.54fr);
  gap: 18px;
  align-items: end;
}

.editorial-copy {
  align-self: center;
  padding: 22px;
}

.layered-heading {
  position: relative;
  margin: 12px 0 18px;
  max-width: 620px;
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 54px;
  line-height: 0.92;
  text-transform: uppercase;
}

.layered-heading::after {
  content: attr(data-shadow);
  position: absolute;
  left: 12px;
  top: 12px;
  z-index: -1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.18);
}

.signal-dial {
  position: relative;
  width: 128px;
  height: 128px;
  display: grid;
  place-items: center;
  margin-top: 32px;
  border-radius: 50%;
  background:
    conic-gradient(from 210deg, rgba(217, 255, 102, 0.92) 0 74%, rgba(255, 255, 255, 0.08) 74% 100%);
  box-shadow: 0 0 54px rgba(217, 255, 102, 0.08);
}

.signal-dial::before {
  content: "";
  position: absolute;
  inset: 9px;
  border-radius: 50%;
  background: rgba(5, 5, 6, 0.94);
}

.signal-dial span {
  position: absolute;
  inset: -10px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.12);
  animation: dialSpin 10s linear infinite;
}

.signal-dial b {
  position: relative;
  z-index: 1;
  font-size: 32px;
}

@keyframes dialSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.editorial-poster {
  position: relative;
  overflow: hidden;
  min-height: 690px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  box-shadow: 0 34px 110px rgba(0, 0, 0, 0.56);
}

.editorial-poster .card-visual {
  min-height: 690px;
}

.poster-type {
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 18px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: end;
  color: var(--text);
}

.poster-type span {
  writing-mode: vertical-rl;
  color: rgba(245, 245, 242, 0.52);
  font-size: 11px;
}

.poster-type strong {
  max-width: 360px;
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 42px;
  line-height: 0.9;
  text-align: right;
  text-transform: uppercase;
}

.editorial-stack {
  display: grid;
  gap: 14px;
  transform: translateY(-56px);
}

.mini-editorial-card {
  position: relative;
  overflow: hidden;
  min-height: 210px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms ease;
}

.mini-editorial-card:nth-child(2) {
  transform: translateX(-46px);
}

.mini-editorial-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 255, 255, 0.34);
}

.mini-editorial-card:nth-child(2):hover {
  transform: translateX(-46px) translateY(-6px);
}

.mini-editorial-card .card-visual {
  min-height: 210px;
}

.mini-editorial-card span {
  position: absolute;
  left: 12px;
  bottom: 12px;
  z-index: 2;
  max-width: calc(100% - 24px);
  color: var(--text);
  font-size: 13px;
  font-weight: 800;
}

.community-surface {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.035), transparent 260px),
    linear-gradient(90deg, transparent, rgba(143, 231, 255, 0.035), transparent);
}

.community-watermark {
  position: fixed;
  left: 2vw;
  top: 19vh;
  z-index: -1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.055);
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 160px;
  line-height: 0.78;
  pointer-events: none;
}

.community-head {
  align-items: center;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.045);
  backdrop-filter: blur(18px);
}

.creator-stories {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(112px, 1fr);
  gap: 12px;
  overflow-x: auto;
  padding: 20px 0 6px;
  scrollbar-width: none;
}

.creator-stories::-webkit-scrollbar {
  display: none;
}

.story {
  min-height: 138px;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 7px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.025)),
    rgba(12, 12, 13, 0.6);
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms ease, background 260ms ease;
}

.story:hover {
  transform: translateY(-5px);
  border-color: rgba(217, 255, 102, 0.35);
  background:
    linear-gradient(145deg, rgba(217, 255, 102, 0.1), rgba(255, 255, 255, 0.035)),
    rgba(12, 12, 13, 0.74);
}

.story-ring {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: conic-gradient(from 130deg, #fff, #6f7177, #d9ff66, #fff);
}

.story .avatar {
  width: 50px;
  height: 50px;
}

.story small {
  color: var(--dim);
}

.community-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 16px 0 0;
  scrollbar-width: none;
}

.community-tabs::-webkit-scrollbar {
  display: none;
}

.community-tabs button {
  min-height: 38px;
  flex: 0 0 auto;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  padding: 0 14px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.045);
}

.community-tabs button.active,
.community-tabs button:hover {
  color: #050505;
  border-color: rgba(255, 255, 255, 0.65);
  background: linear-gradient(135deg, #ffffff, #b9bebf);
}

.filters {
  position: sticky;
  top: calc(var(--nav-h) + 10px);
  z-index: 8;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(5, 5, 6, 0.72);
  backdrop-filter: blur(24px);
}

.masonry {
  columns: 5 232px;
  column-gap: 18px;
}

.masonry .design-card {
  margin: 0 0 18px;
  break-inside: avoid;
}

.design-card {
  border-color: rgba(255, 255, 255, 0.11);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.018)),
    rgba(13, 13, 15, 0.7);
  transform-origin: center top;
  animation: pinEnter 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@keyframes pinEnter {
  from { opacity: 0; transform: translateY(24px) scale(0.98); filter: blur(8px); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.design-card:hover {
  transform: translateY(-8px) scale(1.012);
  border-color: rgba(255, 255, 255, 0.3);
  box-shadow:
    0 34px 100px rgba(0, 0, 0, 0.58),
    0 0 52px rgba(143, 231, 255, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.masonry .design-card:nth-child(3n + 2) {
  margin-top: 34px;
}

.masonry .design-card:nth-child(4n) {
  margin-top: 14px;
}

.design-card::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.08), transparent 18% 82%, rgba(255, 255, 255, 0.04)),
    repeating-linear-gradient(0deg, transparent 0 34px, rgba(255, 255, 255, 0.035) 34px 35px);
  opacity: 0;
  transition: opacity 260ms ease;
}

.design-card:hover::before {
  opacity: 1;
}

.card-media {
  display: block;
  position: relative;
  overflow: hidden;
}

.card-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.42)),
    linear-gradient(115deg, transparent 10%, rgba(255, 255, 255, 0.16), transparent 46%);
  opacity: 0;
  transform: translateX(-26%);
  transition: opacity 320ms ease, transform 620ms cubic-bezier(0.22, 1, 0.36, 1);
}

.design-card:hover .card-media::after {
  opacity: 1;
  transform: translateX(18%);
}

.card-social-overlay {
  position: absolute;
  z-index: 5;
  left: 12px;
  right: 12px;
  bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 240ms ease, transform 240ms ease;
}

.design-card:hover .card-social-overlay {
  opacity: 1;
  transform: translateY(0);
}

.creator-badge,
.approval-chip {
  min-height: 34px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  padding: 0 10px 0 4px;
  color: var(--text);
  background: rgba(0, 0, 0, 0.48);
  backdrop-filter: blur(16px);
  font-size: 12px;
}

.approval-chip {
  padding: 0 10px;
  color: #050505;
  background: linear-gradient(135deg, #ffffff, #d9ff66);
}

.card-visual {
  min-height: 390px;
}

.pin-tall .card-visual {
  min-height: 520px;
}

.pin-short .card-visual {
  min-height: 340px;
}

.card-visual::before {
  background:
    linear-gradient(90deg, transparent 49%, rgba(255, 255, 255, 0.16) 50%, transparent 51%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.07), transparent);
}

.mockup {
  transition: transform 760ms cubic-bezier(0.22, 1, 0.36, 1), filter 760ms ease;
}

.design-card:hover .mockup,
.hero-frame:hover .mockup {
  transform: scale(1.08) translateY(-5px);
  filter: drop-shadow(0 0 34px rgba(255, 255, 255, 0.1));
}

.card-body {
  position: relative;
  z-index: 2;
  padding: 15px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.035), rgba(255, 255, 255, 0.01));
}

.card-title {
  font-size: 18px;
  font-weight: 850;
}

.card-caption {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0 0 12px;
  color: rgba(245, 245, 242, 0.58);
  font-size: 13px;
  line-height: 1.45;
}

.quick-actions {
  right: 10px;
  top: 10px;
  gap: 7px;
}

.quick-actions .icon-btn {
  background: rgba(0, 0, 0, 0.52);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.34);
}

.quick-actions .icon-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  transform: scale(1.08);
}

.liked {
  animation: likePop 520ms cubic-bezier(0.22, 1, 0.36, 1);
}

.liked svg {
  fill: currentColor;
}

@keyframes likePop {
  0% { transform: scale(1); }
  38% { transform: scale(1.24); box-shadow: 0 0 38px rgba(217, 255, 102, 0.28); }
  100% { transform: scale(1); }
}

.creator-card {
  position: relative;
  overflow: hidden;
  min-height: 230px;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), border-color 240ms ease, box-shadow 240ms ease;
}

.creator-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(118deg, rgba(255, 255, 255, 0.09), transparent 34%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 22px);
  opacity: 0.5;
  pointer-events: none;
}

.creator-card > * {
  position: relative;
  z-index: 1;
}

.creator-card:hover {
  transform: translateY(-6px);
  border-color: rgba(217, 255, 102, 0.28);
  box-shadow:
    0 30px 90px rgba(0, 0, 0, 0.52),
    0 0 46px rgba(217, 255, 102, 0.06);
}

.toast {
  position: fixed;
  z-index: 90;
  right: 22px;
  bottom: 22px;
  max-width: 330px;
  padding: 13px 15px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(12, 12, 13, 0.86);
  backdrop-filter: blur(20px);
  color: var(--text);
  box-shadow: var(--shadow);
  animation: toastIn 260ms ease both;
}

.interaction-burst {
  position: fixed;
  z-index: 140;
  pointer-events: none;
  transform: translate(-50%, -50%);
  color: var(--volt);
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  text-shadow: 0 0 22px rgba(217, 255, 102, 0.4);
  animation: burstOut 780ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

@keyframes burstOut {
  0% { opacity: 0; transform: translate(-50%, -50%) scale(0.7); }
  28% { opacity: 1; transform: translate(-50%, -88%) scale(1.2); }
  100% { opacity: 0; transform: translate(-50%, -150%) scale(0.92); }
}

.auth-stage {
  min-height: calc(100vh - var(--nav-h));
  position: relative;
  overflow: hidden;
  padding: 72px 0;
  background:
    linear-gradient(130deg, rgba(255, 255, 255, 0.06), transparent 28%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.035) 0 1px, transparent 1px 94px),
    #030303;
}

.auth-stage::before {
  content: "MEMBER ACCESS";
  position: absolute;
  left: 3vw;
  top: 28px;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 112px;
  line-height: 0.8;
}

.auth-light-field {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.auth-light-field span {
  position: absolute;
  width: 540px;
  height: 540px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1), rgba(217, 255, 102, 0.055) 24%, transparent 62%);
  filter: blur(18px);
  animation: glowSweep 12s ease-in-out infinite alternate;
}

.auth-light-field span:first-child {
  left: -180px;
  top: 80px;
}

.auth-light-field span:last-child {
  right: -170px;
  bottom: 0;
  animation-delay: -5s;
}

.auth-layout {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(380px, 0.7fr);
  gap: 28px;
  align-items: center;
}

.auth-editorial {
  min-height: 620px;
  display: grid;
  align-content: center;
}

.auth-title {
  margin: 22px 0 18px;
  max-width: 780px;
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 72px;
  line-height: 0.9;
  text-transform: uppercase;
}

.auth-proof-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 32px;
}

.auth-proof-grid div {
  min-height: 122px;
  display: grid;
  align-content: space-between;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(18px);
}

.auth-proof-grid strong {
  color: var(--volt);
}

.auth-proof-grid span {
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
}

.auth-panel {
  display: grid;
  place-items: center;
  min-height: 620px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.02)),
    rgba(9, 9, 10, 0.7);
  backdrop-filter: blur(24px);
  box-shadow: 0 34px 110px rgba(0, 0, 0, 0.54);
}

.pulse-auth-card-box,
.pulse-auth-card {
  background: transparent !important;
  box-shadow: none !important;
  border-radius: 8px !important;
}

.pulse-auth-title {
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif !important;
  text-transform: uppercase !important;
}

.pulse-auth-subtitle {
  color: rgba(245, 245, 242, 0.62) !important;
}

.pulse-auth-primary {
  color: #050505 !important;
  background: linear-gradient(135deg, #ffffff, #d9ff66) !important;
  border-radius: 999px !important;
  box-shadow: 0 0 34px rgba(217, 255, 102, 0.16) !important;
}

.pulse-auth-social,
.pulse-auth-input {
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 8px !important;
  background: rgba(255, 255, 255, 0.06) !important;
  color: var(--text) !important;
}

.pulse-auth-link {
  color: var(--volt) !important;
}

.pulse-user-avatar,
.account-photo {
  border: 1px solid rgba(255, 255, 255, 0.34) !important;
  box-shadow: 0 0 28px rgba(255, 255, 255, 0.1) !important;
}

.pulse-user-popover {
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  background: rgba(8, 8, 9, 0.92) !important;
  backdrop-filter: blur(24px) !important;
}

.pulse-user-action {
  color: var(--text) !important;
}

.nav-icon-only {
  flex: 0 0 auto;
}

.pulse-account-hero {
  overflow: hidden;
  position: relative;
}

.pulse-account-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(112deg, rgba(217, 255, 102, 0.07), transparent 33%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.04) 0 1px, transparent 1px 26px);
  opacity: 0.7;
  pointer-events: none;
}

.pulse-account-hero > * {
  position: relative;
  z-index: 1;
}

.profile-action-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.creator-dashboard-hero {
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), transparent 68%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.032) 0 1px, transparent 1px 80px);
}

.creator-dashboard-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 230px;
  gap: 24px;
  align-items: end;
  padding: 28px;
}

.dashboard-score {
  min-height: 220px;
  display: grid;
  align-content: space-between;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.055);
}

.dashboard-score span {
  color: var(--muted);
  text-transform: uppercase;
  font-size: 12px;
}

.dashboard-score strong {
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 72px;
  line-height: 0.9;
}

/* Deep UX polish pass */
:root {
  --ease-luxe: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-soft: cubic-bezier(0.16, 1, 0.3, 1);
}

.scroll-progress {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 160;
  height: 2px;
  background: transparent;
  pointer-events: none;
}

.scroll-progress span {
  display: block;
  width: 100%;
  height: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: linear-gradient(90deg, #ffffff, #d9ff66, rgba(255, 255, 255, 0.35));
  box-shadow: 0 0 20px rgba(217, 255, 102, 0.32);
  transition: transform 160ms linear;
}

.route-scrim {
  position: fixed;
  inset: 0;
  z-index: 48;
  pointer-events: none;
  opacity: 0;
  background:
    linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent),
    rgba(3, 3, 3, 0.4);
  transform: translateX(-100%);
}

.route-changing .route-scrim {
  animation: routeWipe 520ms var(--ease-luxe);
}

.language-switching .view {
  animation: languageSwap 520ms var(--ease-luxe) both;
}

@keyframes languageSwap {
  0% { opacity: 0.58; filter: blur(8px); transform: translateY(8px); }
  100% { opacity: 1; filter: blur(0); transform: translateY(0); }
}

@keyframes routeWipe {
  0% { opacity: 0; transform: translateX(-100%); }
  35% { opacity: 1; }
  100% { opacity: 0; transform: translateX(100%); }
}

.rhythm-meter {
  width: 30px;
  height: 18px;
  display: inline-flex;
  align-items: end;
  gap: 3px;
}

.rhythm-meter i {
  width: 3px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.62);
  animation: rhythmPulse 1.4s ease-in-out infinite;
}

.rhythm-meter i:nth-child(1) { height: 7px; animation-delay: -0.2s; }
.rhythm-meter i:nth-child(2) { height: 14px; animation-delay: -0.5s; }
.rhythm-meter i:nth-child(3) { height: 10px; animation-delay: -0.8s; }
.rhythm-meter i:nth-child(4) { height: 16px; animation-delay: -1s; background: var(--volt); }

@keyframes rhythmPulse {
  0%, 100% { transform: scaleY(0.72); opacity: 0.42; }
  50% { transform: scaleY(1.08); opacity: 1; }
}

.pulse-loader {
  gap: 22px;
}

.loader-caption {
  position: relative;
  padding-top: 8px;
}

.loader-caption::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -4px;
  width: 46px;
  height: 1px;
  transform: translateX(-50%);
  background: rgba(217, 255, 102, 0.52);
}

.view {
  transform-origin: 50% 10%;
}

.section,
.section-tight,
.detail-hero {
  scroll-margin-top: calc(var(--nav-h) + 20px);
}

.nav {
  box-shadow: 0 10px 38px rgba(0, 0, 0, 0.22);
}

.nav-link,
.ghost-btn,
.primary-btn,
.icon-btn,
.mini-btn,
.story,
.design-card,
.creator-card,
.drop-card,
.product-card,
.panel,
.form-card {
  transition-timing-function: var(--ease-soft);
}

.nav-link {
  position: relative;
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 14px;
  right: 14px;
  bottom: 5px;
  height: 1px;
  transform: scaleX(0);
  transform-origin: left center;
  background: var(--volt);
  transition: transform 260ms var(--ease-soft);
}

.nav-link:hover::after,
.nav-link.active::after {
  transform: scaleX(1);
}

.primary-btn,
.ghost-btn,
.icon-btn,
.mini-btn {
  position: relative;
  overflow: hidden;
}

.primary-btn::after,
.ghost-btn::after,
.icon-btn::after,
.mini-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent 18%, rgba(255, 255, 255, 0.2), transparent 58%);
  transform: translateX(-120%);
  transition: transform 620ms var(--ease-luxe);
}

.primary-btn:hover::after,
.ghost-btn:hover::after,
.icon-btn:hover::after,
.mini-btn:hover::after {
  transform: translateX(120%);
}

.hero-actions {
  align-items: center;
}

.stat-value,
.card-title,
.creator-name,
.section-title,
.detail-title {
  text-rendering: geometricPrecision;
}

.masonry {
  transition: column-gap 300ms var(--ease-soft);
}

.design-card {
  will-change: transform, box-shadow;
  contain: layout paint;
}

.design-card:nth-child(2n) {
  animation-delay: 60ms;
}

.design-card:nth-child(3n) {
  animation-delay: 110ms;
}

.card-footer-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--dim);
  font-size: 12px;
}

.card-footer-action a {
  color: var(--text);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.card-footer-action svg {
  width: 14px;
  height: 14px;
}

.comments-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
  margin-bottom: 10px;
}

.comments-head h3 {
  margin: 0;
}

.comments-head span {
  color: var(--dim);
  font-size: 12px;
  text-transform: uppercase;
}

.comment {
  align-items: start;
  border-top-color: rgba(255, 255, 255, 0.1);
  transition: background 220ms var(--ease-soft), transform 220ms var(--ease-soft);
}

.comment:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.035);
}

.comment-tools {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: 8px;
  color: var(--dim);
  font-size: 11px;
}

.comment-tools button {
  border: 0;
  padding: 0;
  color: rgba(245, 245, 242, 0.64);
  background: transparent;
  text-transform: uppercase;
  font-size: 11px;
}

.comment-tools button:hover {
  color: var(--volt);
}

.empty {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.06), transparent),
    rgba(255, 255, 255, 0.025);
}

.empty::before {
  content: "PULSE";
  position: absolute;
  inset: auto 18px 8px auto;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.08);
  font-family: "Arial Black", "Helvetica Neue", Arial, sans-serif;
  font-size: 76px;
  line-height: 0.8;
}

.upload-zone {
  position: relative;
  overflow: hidden;
}

.upload-zone::before {
  content: "";
  position: absolute;
  inset: 12px;
  border-radius: 8px;
  background:
    linear-gradient(90deg, transparent, rgba(217, 255, 102, 0.1), transparent),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.06) 0 1px, transparent 1px 18px);
  opacity: 0;
  transform: translateX(-30%);
  transition: opacity 260ms ease, transform 520ms var(--ease-luxe);
}

.upload-zone:hover::before,
.upload-zone.dragging::before {
  opacity: 1;
  transform: translateX(12%);
}

.upload-zone label {
  position: relative;
  z-index: 1;
}

.submit-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.submit-steps span {
  min-height: 34px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  color: var(--dim);
  background: rgba(255, 255, 255, 0.04);
  font-size: 11px;
  text-transform: uppercase;
}

.submit-steps span.active {
  color: #050505;
  border-color: rgba(255, 255, 255, 0.62);
  background: linear-gradient(135deg, #fff, #d9ff66);
}

.upload-status {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 12px 0 2px;
  color: var(--muted);
  font-size: 12px;
  text-transform: uppercase;
}

.upload-status span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--volt);
  box-shadow: 0 0 18px rgba(217, 255, 102, 0.52);
  animation: statusPulse 1.5s ease-in-out infinite;
}

@keyframes statusPulse {
  0%, 100% { opacity: 0.45; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.2); }
}

.production-note {
  position: relative;
  margin: 14px 0 0;
  padding: 14px 14px 14px 16px;
  border: 1px solid rgba(217, 255, 102, 0.18);
  border-radius: 8px;
  color: rgba(245, 245, 242, 0.78);
  background:
    linear-gradient(120deg, rgba(217, 255, 102, 0.09), transparent 42%),
    rgba(255, 255, 255, 0.045);
  line-height: 1.5;
  overflow: hidden;
}

.production-note::before {
  content: "PRODUCTION LIMIT";
  display: block;
  margin-bottom: 6px;
  color: var(--volt);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.production-note::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.11), transparent);
  transform: translateX(-115%);
  animation: noteSheen 5.4s var(--ease-luxe) infinite;
  pointer-events: none;
}

@keyframes noteSheen {
  0%, 62% { transform: translateX(-115%); }
  100% { transform: translateX(115%); }
}

.production-matrix {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  margin-top: 14px;
}

.production-option-group {
  position: relative;
  min-width: 0;
  margin: 0;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025)),
    rgba(8, 8, 10, 0.56);
  overflow: hidden;
}

.production-option-group:first-child,
.production-option-group.fit-option-group,
.production-option-group:nth-child(4),
.production-option-group:nth-child(7) {
  grid-column: 1 / -1;
}

.production-option-group::after {
  content: "";
  position: absolute;
  inset: auto 12px 10px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.24), transparent);
  opacity: 0;
  transform: scaleX(0.7);
  transition: opacity 220ms ease, transform 320ms var(--ease-luxe);
}

.production-option-group:hover::after {
  opacity: 1;
  transform: scaleX(1);
}

.production-option-group legend {
  float: left;
  width: 100%;
  margin: 0 0 10px;
  padding: 0;
  color: rgba(245, 245, 242, 0.62);
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
}

.production-option-group legend span {
  float: right;
  color: rgba(217, 255, 102, 0.72);
  font-size: 10px;
}

.option-pills {
  clear: both;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.option-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.option-pill input {
  position: absolute;
  inset: 0;
  opacity: 0;
}

.option-pill > span {
  min-height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 999px;
  padding: 0 13px;
  color: rgba(245, 245, 242, 0.76);
  background: rgba(255, 255, 255, 0.055);
  backdrop-filter: blur(14px);
  font-size: 12px;
  font-weight: 760;
  text-transform: uppercase;
  transition:
    transform 180ms var(--ease-soft),
    border-color 180ms ease,
    background 180ms ease,
    color 180ms ease,
    box-shadow 180ms ease;
}

.option-pill:hover > span {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.32);
  background: rgba(255, 255, 255, 0.09);
}

.option-pill input:checked + span {
  color: #050505;
  border-color: rgba(255, 255, 255, 0.64);
  background: linear-gradient(135deg, #ffffff, #d9ff66);
  box-shadow:
    0 0 32px rgba(217, 255, 102, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.72);
  transform: translateY(-1px);
}

.option-pill input:focus-visible + span {
  outline: 2px solid rgba(217, 255, 102, 0.62);
  outline-offset: 3px;
}

.fit-chip-grid {
  clear: both;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
}

.fit-pill {
  width: 100%;
}

.fit-pill > span {
  width: 100%;
  min-height: 64px;
  justify-content: flex-start;
  gap: 12px;
  border-radius: 8px;
  padding: 10px 12px;
  background:
    radial-gradient(circle at 18% 12%, rgba(255, 255, 255, 0.11), transparent 34%),
    rgba(255, 255, 255, 0.052);
}

.fit-pill:hover > span {
  transform: translateY(-3px) scale(1.01);
  border-color: rgba(217, 255, 102, 0.28);
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.26);
}

.fit-pill input:checked + span {
  background:
    linear-gradient(135deg, #ffffff, #d9ff66),
    rgba(255, 255, 255, 0.1);
  box-shadow:
    0 0 38px rgba(217, 255, 102, 0.26),
    0 20px 60px rgba(0, 0, 0, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.74);
}

.fit-label {
  line-height: 1.2;
}

.fit-icon {
  position: relative;
  flex: 0 0 42px;
  width: 42px;
  height: 46px;
  border-radius: 8px;
  color: currentColor;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.025)),
    rgba(0, 0, 0, 0.18);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.fit-icon::before,
.fit-icon::after,
.fit-icon i {
  content: "";
  position: absolute;
  display: block;
  background: currentColor;
}

.fit-icon--top-straight { --body-w: 22px; --body-h: 28px; --sleeve-w: 36px; --body-top: 13px; }
.fit-icon--top-slim { --body-w: 17px; --body-h: 29px; --sleeve-w: 30px; --body-top: 13px; }
.fit-icon--top-oversized { --body-w: 30px; --body-h: 31px; --sleeve-w: 42px; --body-top: 12px; }
.fit-icon--top-boxy { --body-w: 31px; --body-h: 24px; --sleeve-w: 40px; --body-top: 14px; }

.fit-icon[class*="--top-"]::before {
  left: 50%;
  top: var(--body-top);
  width: var(--body-w);
  height: var(--body-h);
  border-radius: 4px 4px 6px 6px;
  transform: translateX(-50%);
}

.fit-icon[class*="--top-"]::after {
  left: 50%;
  top: 13px;
  width: var(--sleeve-w);
  height: 13px;
  border-radius: 8px 8px 3px 3px;
  clip-path: polygon(0 18%, 29% 0, 71% 0, 100% 18%, 84% 100%, 16% 100%);
  transform: translateX(-50%);
}

.fit-icon[class*="--top-"] i {
  left: 50%;
  top: 13px;
  width: 8px;
  height: 3px;
  border-radius: 0 0 999px 999px;
  background: rgba(0, 0, 0, 0.26);
  transform: translateX(-50%);
}

.fit-icon--pant-baggy { --waist-w: 28px; --leg-w: 31px; --leg-h: 28px; --pant-clip: polygon(2% 0, 44% 0, 44% 100%, 0 100%, 56% 0, 98% 0, 100% 100%, 56% 100%); }
.fit-icon--pant-flare { --waist-w: 23px; --leg-w: 34px; --leg-h: 28px; --pant-clip: polygon(14% 0, 43% 0, 48% 100%, 0 100%, 57% 0, 86% 0, 100% 100%, 52% 100%); }
.fit-icon--pant-skinny { --waist-w: 23px; --leg-w: 19px; --leg-h: 28px; --pant-clip: polygon(5% 0, 43% 0, 43% 100%, 5% 100%, 57% 0, 95% 0, 95% 100%, 57% 100%); }
.fit-icon--pant-bootcut { --waist-w: 24px; --leg-w: 29px; --leg-h: 28px; --pant-clip: polygon(9% 0, 43% 0, 47% 100%, 0 100%, 57% 0, 91% 0, 100% 100%, 53% 100%); }
.fit-icon--pant-straight { --waist-w: 24px; --leg-w: 25px; --leg-h: 28px; --pant-clip: polygon(5% 0, 43% 0, 43% 100%, 5% 100%, 57% 0, 95% 0, 95% 100%, 57% 100%); }
.fit-icon--pant-relaxed { --waist-w: 27px; --leg-w: 28px; --leg-h: 28px; --pant-clip: polygon(3% 0, 44% 0, 45% 100%, 2% 100%, 56% 0, 97% 0, 98% 100%, 55% 100%); }

.fit-icon[class*="--pant-"]::before {
  left: 50%;
  top: 9px;
  width: var(--waist-w);
  height: 7px;
  border-radius: 4px 4px 2px 2px;
  transform: translateX(-50%);
}

.fit-icon[class*="--pant-"] i {
  left: 50%;
  top: 16px;
  width: var(--leg-w);
  height: var(--leg-h);
  background: linear-gradient(90deg, currentColor 0 43%, transparent 43% 57%, currentColor 57% 100%);
  clip-path: var(--pant-clip);
  transform: translateX(-50%);
}

.fit-icon[class*="--pant-"]::after {
  left: 50%;
  top: 16px;
  width: 3px;
  height: 10px;
  border-radius: 999px;
  opacity: 0.42;
  transform: translateX(-50%);
}

.fit-preview {
  display: grid;
  grid-template-columns: 138px 1fr;
  gap: 14px;
  align-items: center;
  margin-top: 14px;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background:
    radial-gradient(circle at 22% 20%, rgba(217, 255, 102, 0.11), transparent 38%),
    linear-gradient(145deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.025)),
    rgba(8, 8, 10, 0.62);
  overflow: hidden;
}

.fit-preview-stage {
  position: relative;
  min-height: 162px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.06) 1px, transparent 1px),
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    rgba(255, 255, 255, 0.035);
  background-size: 22px 22px;
}

.fit-preview-stage::after {
  content: "";
  position: absolute;
  inset: auto 18px 18px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(217, 255, 102, 0.72), transparent);
  box-shadow: 0 0 18px rgba(217, 255, 102, 0.24);
}

.fit-preview-figure {
  position: relative;
  width: 96px;
  height: 128px;
  color: rgba(245, 245, 242, 0.94);
  filter: drop-shadow(0 0 28px rgba(255, 255, 255, 0.16));
  transition: transform 360ms var(--ease-luxe), filter 360ms ease;
}

.fit-preview-figure::before,
.fit-preview-figure::after,
.fit-preview-figure i {
  content: "";
  position: absolute;
  display: block;
  background: currentColor;
}

.fit-preview:hover .fit-preview-figure {
  transform: translateY(-3px);
  filter: drop-shadow(0 0 34px rgba(217, 255, 102, 0.22));
}

.fit-preview-figure--top-straight { --body-w: 48px; --body-h: 78px; --sleeve-w: 84px; --body-top: 31px; }
.fit-preview-figure--top-slim { --body-w: 38px; --body-h: 80px; --sleeve-w: 70px; --body-top: 31px; }
.fit-preview-figure--top-oversized { --body-w: 68px; --body-h: 84px; --sleeve-w: 96px; --body-top: 30px; }
.fit-preview-figure--top-boxy { --body-w: 72px; --body-h: 64px; --sleeve-w: 92px; --body-top: 33px; }

.fit-preview-figure[class*="--top-"]::before {
  left: 50%;
  top: var(--body-top);
  width: var(--body-w);
  height: var(--body-h);
  border-radius: 9px 9px 12px 12px;
  transform: translateX(-50%);
}

.fit-preview-figure[class*="--top-"]::after {
  left: 50%;
  top: 31px;
  width: var(--sleeve-w);
  height: 30px;
  border-radius: 16px 16px 7px 7px;
  clip-path: polygon(0 18%, 30% 0, 70% 0, 100% 18%, 84% 100%, 16% 100%);
  transform: translateX(-50%);
}

.fit-preview-figure[class*="--top-"] i {
  left: 50%;
  top: 32px;
  width: 18px;
  height: 7px;
  border-radius: 0 0 999px 999px;
  background: rgba(0, 0, 0, 0.28);
  transform: translateX(-50%);
}

.fit-preview-figure--pant-baggy { --waist-w: 62px; --leg-w: 76px; --leg-h: 92px; --pant-clip: polygon(2% 0, 44% 0, 44% 100%, 0 100%, 56% 0, 98% 0, 100% 100%, 56% 100%); }
.fit-preview-figure--pant-flare { --waist-w: 52px; --leg-w: 82px; --leg-h: 92px; --pant-clip: polygon(15% 0, 43% 0, 49% 100%, 0 100%, 57% 0, 85% 0, 100% 100%, 51% 100%); }
.fit-preview-figure--pant-skinny { --waist-w: 50px; --leg-w: 48px; --leg-h: 92px; --pant-clip: polygon(5% 0, 42% 0, 42% 100%, 5% 100%, 58% 0, 95% 0, 95% 100%, 58% 100%); }
.fit-preview-figure--pant-bootcut { --waist-w: 54px; --leg-w: 70px; --leg-h: 92px; --pant-clip: polygon(10% 0, 43% 0, 48% 100%, 0 100%, 57% 0, 90% 0, 100% 100%, 52% 100%); }
.fit-preview-figure--pant-straight { --waist-w: 54px; --leg-w: 58px; --leg-h: 92px; --pant-clip: polygon(5% 0, 43% 0, 43% 100%, 5% 100%, 57% 0, 95% 0, 95% 100%, 57% 100%); }
.fit-preview-figure--pant-relaxed { --waist-w: 60px; --leg-w: 68px; --leg-h: 92px; --pant-clip: polygon(3% 0, 44% 0, 45% 100%, 2% 100%, 56% 0, 97% 0, 98% 100%, 55% 100%); }

.fit-preview-figure[class*="--pant-"]::before {
  left: 50%;
  top: 17px;
  width: var(--waist-w);
  height: 17px;
  border-radius: 8px 8px 4px 4px;
  transform: translateX(-50%);
}

.fit-preview-figure[class*="--pant-"] i {
  left: 50%;
  top: 34px;
  width: var(--leg-w);
  height: var(--leg-h);
  background: linear-gradient(90deg, currentColor 0 43%, transparent 43% 57%, currentColor 57% 100%);
  clip-path: var(--pant-clip);
  transform: translateX(-50%);
}

.fit-preview-figure[class*="--pant-"]::after {
  left: 50%;
  top: 34px;
  width: 5px;
  height: 26px;
  border-radius: 999px;
  opacity: 0.42;
  transform: translateX(-50%);
}

.fit-preview-kicker {
  display: block;
  margin-bottom: 7px;
  color: rgba(217, 255, 102, 0.72);
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}

.fit-preview strong {
  display: block;
  font-size: 24px;
  line-height: 1;
  text-transform: uppercase;
}

.fit-preview p {
  margin: 10px 0 0;
  color: rgba(245, 245, 242, 0.64);
  line-height: 1.5;
}

.preview-card {
  transition: transform 320ms var(--ease-soft), border-color 320ms ease;
}

.preview-card:hover {
  transform: translateY(-4px);
  border-color: rgba(217, 255, 102, 0.28);
}

.profile-editorial {
  grid-template-columns: 130px 1fr auto;
  min-height: 330px;
  overflow: hidden;
}

.profile-cover {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(118deg, rgba(217, 255, 102, 0.08), transparent 34%),
    repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0 1px, transparent 1px 32px);
  opacity: 0.8;
}

.profile-avatar-xl {
  width: 112px;
  height: 112px;
  font-size: 30px;
  box-shadow: 0 0 58px rgba(255, 255, 255, 0.08);
}

.profile-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.dashboard-metrics .admin-card {
  min-height: 156px;
}

.dashboard-queue .admin-row {
  transition: background 220ms var(--ease-soft), transform 220ms var(--ease-soft);
}

.dashboard-queue .admin-row:hover {
  transform: translateX(4px);
  background: rgba(255, 255, 255, 0.035);
}

.dashboard-analytics {
  overflow: hidden;
}

.chart .bar {
  animation: barBreathe 2.8s ease-in-out infinite;
}

.chart .bar:nth-child(2n) {
  animation-delay: -0.8s;
}

.chart .bar:nth-child(3n) {
  animation-delay: -1.4s;
}

@keyframes barBreathe {
  0%, 100% { opacity: 0.68; filter: brightness(0.9); }
  50% { opacity: 1; filter: brightness(1.18); }
}

.ui-ripple {
  position: fixed;
  z-index: 150;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border: 1px solid rgba(217, 255, 102, 0.55);
  border-radius: 50%;
  pointer-events: none;
  animation: rippleOut 680ms var(--ease-luxe) forwards;
}

@keyframes rippleOut {
  from { opacity: 0.9; transform: scale(0.4); }
  to { opacity: 0; transform: scale(4.6); }
}

/* Alpha launch readiness */
.notification-dot {
  position: relative;
}

.notification-dot::before {
  content: "";
  position: absolute;
  right: 8px;
  top: 8px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--volt);
  box-shadow: 0 0 16px rgba(217, 255, 102, 0.72);
}

.verified-badge {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  margin-left: 4px;
  border-radius: 50%;
  color: #050505;
  background: linear-gradient(135deg, #fff, #d9ff66);
  box-shadow: 0 0 18px rgba(217, 255, 102, 0.18);
  vertical-align: middle;
}

.alpha-gate {
  padding: 64px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  background:
    linear-gradient(112deg, rgba(217, 255, 102, 0.045), transparent 34%),
    rgba(255, 255, 255, 0.012);
}

.alpha-gate-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 420px);
  gap: 18px;
  align-items: center;
}

.alpha-access-card,
.onboarding-card,
.trending-drop {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.025)),
    rgba(8, 8, 9, 0.68);
  backdrop-filter: blur(22px);
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.42);
}

.alpha-access-card {
  display: grid;
  gap: 12px;
  padding: 18px;
}

.onboarding-card,
.trending-drop {
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(360px, 1fr);
  gap: 18px;
  align-items: center;
  padding: 22px;
}

.onboarding-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.onboarding-step {
  min-height: 128px;
  display: grid;
  align-content: space-between;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  transition: transform 260ms var(--ease-soft), border-color 260ms ease;
}

.onboarding-step:hover,
.onboarding-step.active {
  transform: translateY(-5px);
  border-color: rgba(217, 255, 102, 0.32);
}

.onboarding-step strong {
  color: var(--volt);
}

.featured-creator-wall {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.featured-creator {
  min-height: 260px;
  display: grid;
  align-content: space-between;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.08), transparent),
    rgba(255, 255, 255, 0.035);
  transition: transform 260ms var(--ease-soft), border-color 260ms ease, box-shadow 260ms ease;
}

.featured-creator:hover {
  transform: translateY(-7px);
  border-color: rgba(217, 255, 102, 0.3);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.48);
}

.featured-creator small {
  color: var(--muted);
}

.category-rail {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 18px 0;
}

.category-rail.compact {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.category-rail button {
  min-height: 108px;
  display: grid;
  align-content: space-between;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
  padding: 13px;
  color: var(--text);
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.02)),
    rgba(255, 255, 255, 0.035);
  transition: transform 220ms var(--ease-soft), border-color 220ms ease, background 220ms ease;
}

.category-rail button:hover,
.category-rail button.active {
  transform: translateY(-4px);
  border-color: rgba(217, 255, 102, 0.36);
  background:
    linear-gradient(145deg, rgba(217, 255, 102, 0.1), rgba(255, 255, 255, 0.025)),
    rgba(255, 255, 255, 0.05);
}

.category-rail button span,
.category-rail button small {
  color: var(--dim);
  font-size: 11px;
  text-transform: uppercase;
}

.leaderboard-panel {
  display: grid;
  gap: 8px;
}

.leaderboard-row,
.notification-card,
.notification-toggle {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.035);
  transition: transform 220ms var(--ease-soft), border-color 220ms ease, background 220ms ease;
}

.leaderboard-row:hover,
.notification-card:hover {
  transform: translateX(5px);
  border-color: rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.055);
}

.leaderboard-row small,
.notification-card small {
  display: block;
  color: var(--dim);
}

.notifications-list {
  display: grid;
  gap: 10px;
}

.notification-card {
  grid-template-columns: 82px 1fr auto;
}

.notification-card span {
  color: var(--volt);
  font-size: 11px;
  text-transform: uppercase;
}

.notification-toggle {
  grid-template-columns: 1fr auto;
  margin-top: 10px;
}

.notification-toggle strong {
  color: var(--volt);
}

.trending-drop .countdown {
  max-width: 460px;
  margin-left: auto;
}

.moderation-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0;
}

.risk-pill {
  min-height: 28px;
  display: inline-flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.13);
  border-radius: 999px;
  padding: 0 10px;
  color: var(--muted);
  font-size: 11px;
  text-transform: uppercase;
}

.risk-pill.low {
  color: var(--ok);
  border-color: rgba(156, 255, 185, 0.24);
}

.risk-pill.medium {
  color: var(--volt);
  border-color: rgba(217, 255, 102, 0.24);
}

.waitlist-admin {
  display: grid;
  gap: 10px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.09);
}

@keyframes toastIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.hide {
  display: none !important;
}

html[dir="rtl"] body {
  direction: rtl;
}

html[dir="rtl"] .brand,
html[dir="rtl"] .language-switcher,
html[dir="rtl"] .rhythm-meter,
html[dir="rtl"] .palette-row,
html[dir="rtl"] .countdown,
html[dir="rtl"] .stat-value,
html[dir="rtl"] .loader-word {
  direction: ltr;
}

html[dir="rtl"] .section-head,
html[dir="rtl"] .hero-copy-panel,
html[dir="rtl"] .editorial-copy,
html[dir="rtl"] .auth-editorial,
html[dir="rtl"] .panel,
html[dir="rtl"] .form-card,
html[dir="rtl"] .card-body,
html[dir="rtl"] .creator-card,
html[dir="rtl"] .drop-card,
html[dir="rtl"] .product-card,
html[dir="rtl"] .admin-card,
html[dir="rtl"] .footer-inner {
  text-align: right;
}

html[dir="rtl"] .nav-link::after {
  transform-origin: right center;
}

html[dir="rtl"] .scroll-progress span {
  transform-origin: right center;
}

html[dir="rtl"] .field,
html[dir="rtl"] .select,
html[dir="rtl"] .textarea {
  text-align: right;
}

html[dir="rtl"] .hero-actions,
html[dir="rtl"] .nav-actions,
html[dir="rtl"] .card-meta,
html[dir="rtl"] .tag-row,
html[dir="rtl"] .profile-actions,
html[dir="rtl"] .moderation-toolbar {
  flex-direction: row-reverse;
}

html[dir="rtl"] .leaderboard-row,
html[dir="rtl"] .notification-card,
html[dir="rtl"] .notification-toggle,
html[dir="rtl"] .comment,
html[dir="rtl"] .creator-inline,
html[dir="rtl"] .price-row {
  direction: rtl;
}

html[dir="rtl"] .vertical-signature,
html[dir="rtl"] .hero-ticker,
html[dir="rtl"] .brand span:last-child {
  direction: ltr;
}

@media (max-width: 1100px) {
  .hero h1 {
    font-size: 58px;
  }

  .home-hero {
    min-height: auto;
  }

  .hero-layout,
  .detail-layout,
  .split {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .hero-stage {
    min-height: 620px;
    animation: none;
  }

  .hero-frame {
    position: relative;
    width: 100%;
    height: 610px;
  }

  .hero-frame .card-visual {
    min-height: 610px;
  }

  .hero-lookbook {
    display: none;
  }

  .vertical-signature {
    display: none;
  }

  .editorial-grid {
    grid-template-columns: 1fr;
  }

  .auth-layout,
  .creator-dashboard-panel,
  .alpha-gate-grid,
  .onboarding-card,
  .trending-drop {
    grid-template-columns: 1fr;
  }

  .profile-editorial {
    grid-template-columns: 1fr;
  }

  .profile-actions {
    justify-content: flex-start;
  }

  .auth-editorial,
  .auth-panel {
    min-height: auto;
  }

  .editorial-copy {
    padding: 0;
  }

  .editorial-stack {
    grid-template-columns: repeat(3, 1fr);
    transform: none;
  }

  .mini-editorial-card:nth-child(2),
  .mini-editorial-card:nth-child(2):hover {
    transform: none;
  }

  .floating-card {
    right: 18px;
  }

  .creator-grid,
  .drop-grid,
  .product-grid,
  .admin-grid,
  .profile-grid,
  .reco-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .filters {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  :root {
    --nav-h: 64px;
  }

  .nav-inner {
    grid-template-columns: auto auto;
  }

  .nav-links,
  .nav-actions .ghost-btn,
  .nav-actions .primary-btn {
    display: none;
  }

  .nav-actions {
    justify-content: end;
    gap: 6px;
  }

  .language-switcher {
    min-height: 36px;
    padding: 3px;
  }

  .language-switcher button {
    min-width: 25px;
    min-height: 28px;
    font-size: 10px;
  }

  .mobile-nav {
    position: fixed;
    z-index: 70;
    left: 12px;
    right: 12px;
    bottom: 12px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 6px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 18px;
    padding: 7px;
    background: rgba(8, 8, 9, 0.82);
    backdrop-filter: blur(22px);
    box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08);
  }

  .mobile-nav a {
    min-height: 44px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    color: var(--muted);
    font-size: 17px;
  }

  .mobile-nav a.active {
    color: var(--text);
    background:
      linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(217, 255, 102, 0.1)),
      rgba(255, 255, 255, 0.08);
    box-shadow: 0 0 22px rgba(217, 255, 102, 0.08);
  }

  .container,
  .wide-container {
    width: min(100% - 24px, 720px);
  }

  .hero-layout {
    padding: 38px 0 58px;
  }

  .hero h1 {
    font-size: 48px;
    line-height: 0.9;
  }

  .hero-copy {
    font-size: 16px;
  }

  .hero-proof {
    gap: 6px;
  }

  .hero-proof span {
    min-height: 30px;
    font-size: 11px;
  }

  .submit-steps {
    grid-template-columns: repeat(2, 1fr);
  }

  .production-matrix {
    grid-template-columns: 1fr;
  }

  .production-option-group:first-child,
  .production-option-group.fit-option-group,
  .production-option-group:nth-child(4),
  .production-option-group:nth-child(7) {
    grid-column: auto;
  }

  .option-pill > span {
    min-height: 36px;
    padding: 0 11px;
    font-size: 11px;
  }

  .fit-chip-grid {
    grid-template-columns: 1fr;
  }

  .fit-pill > span {
    min-height: 58px;
    padding: 9px 10px;
  }

  .fit-preview {
    grid-template-columns: 1fr;
  }

  .fit-preview-stage {
    min-height: 140px;
  }

  .featured-creator-wall,
  .category-rail,
  .category-rail.compact,
  .onboarding-steps {
    grid-template-columns: 1fr;
  }

  .leaderboard-row {
    grid-template-columns: auto auto 1fr;
  }

  .leaderboard-row b {
    grid-column: 3;
  }

  .notification-card {
    grid-template-columns: 1fr;
  }

  .trending-drop .countdown {
    margin-left: 0;
  }

  .hero-meta,
  .form-grid,
  .creator-grid,
  .drop-grid,
  .product-grid,
  .admin-grid,
  .profile-grid,
  .reco-grid,
  .filters,
  .spec-grid {
    grid-template-columns: 1fr;
  }

  .hero-stage {
    min-height: 520px;
  }

  .hero-frame {
    height: 520px;
  }

  .hero-frame .card-visual {
    min-height: 520px;
  }

  .floating-card {
    left: 16px;
    right: 16px;
    bottom: 18px;
    width: auto;
  }

  .hero-ticker {
    padding: 10px 0;
  }

  .community-head {
    padding: 14px;
  }

  .hero-masthead {
    top: 80px;
    font-size: 118px;
  }

  .community-watermark {
    display: none;
  }

  .pulse-cursor,
  .cursor-light {
    display: none;
  }

  .editorial-composition {
    padding: 72px 0 56px;
  }

  .editorial-composition::before {
    font-size: 58px;
  }

  .auth-stage {
    padding: 52px 0 76px;
  }

  .auth-stage::before {
    font-size: 54px;
  }

  .auth-layout {
    width: min(100% - 24px, 720px);
  }

  .auth-title {
    font-size: 42px;
  }

  .auth-proof-grid {
    grid-template-columns: 1fr;
  }

  .layered-heading {
    font-size: 36px;
  }

  .editorial-poster,
  .editorial-poster .card-visual {
    min-height: 520px;
  }

  .poster-type strong {
    font-size: 28px;
  }

  .editorial-stack {
    grid-template-columns: 1fr;
  }

  .mini-editorial-card,
  .mini-editorial-card .card-visual {
    min-height: 240px;
  }

  .creator-stories {
    grid-auto-columns: 104px;
  }

  .story {
    min-height: 126px;
  }

  .filters {
    position: relative;
    top: auto;
    padding: 8px;
  }

  .masonry {
    columns: 1;
    column-gap: 0;
  }

  .masonry .design-card {
    margin-bottom: 16px;
  }

  .masonry .design-card:nth-child(3n + 2),
  .masonry .design-card:nth-child(4n) {
    margin-top: 0;
  }

  .card-visual,
  .pin-short .card-visual {
    min-height: 390px;
  }

  .pin-tall .card-visual {
    min-height: 500px;
  }

  .card-social-overlay,
  .quick-actions {
    opacity: 1;
    transform: none;
  }

  .quick-actions {
    flex-direction: row;
  }

  .section {
    padding: 60px 0;
  }

  .card-footer-action {
    align-items: flex-start;
    flex-direction: column;
  }

  .comments-head {
    align-items: flex-start;
    flex-direction: column;
  }

  .profile-avatar-xl {
    width: 92px;
    height: 92px;
  }

  .section-head {
    display: grid;
  }

  .section-title {
    font-size: 32px;
  }

  .gallery {
    grid-template-columns: 1fr;
  }

  .gallery .card-visual {
    min-height: 480px;
  }

  .profile-hero {
    grid-template-columns: 1fr;
  }

  .toast {
    left: 12px;
    right: 12px;
    bottom: 84px;
    max-width: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}
```

FILE: tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        pulse: {
          bg: "#030303",
          panel: "#121214",
          text: "#f5f5f2",
          muted: "#a3a3a3",
          silver: "#d7d7d2",
          volt: "#d9ff66",
          cyan: "#8fe7ff"
        }
      },
      borderRadius: {
        pulse: "8px"
      },
      boxShadow: {
        glow: "0 0 46px rgba(255,255,255,.08)",
        panel: "0 24px 80px rgba(0,0,0,.42)"
      }
    }
  },
  plugins: []
};

export default config;

```

FILE: tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

```

