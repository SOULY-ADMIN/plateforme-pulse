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
  ["Tops", "Hauts", "قطع علوية", "Prendas superiores"],
  ["Bottoms", "Bas", "قطع سفلية", "Pantalones"],
  ["T-Shirts", "T-shirts", "تي شيرت", "Camisetas"],
  ["Hoodies", "Hoodies", "هوديز", "Hoodies"],
  ["Sweatshirts", "Sweatshirts", "سويت شيرت", "Sudaderas"],
  ["Pants", "Pantalons", "بناطيل", "Pantalones"],
  ["Shorts", "Shorts", "شورتات", "Shorts"],
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
  ["Technical fleece", "Fleece technique", "فليس تقني", "Fleece tecnico"],
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
  ["Product Type", "Type de produit", "نوع المنتج", "Tipo de producto"],
  ["Fabric", "Matiere", "القماش", "Tejido"],
  ["Branding", "Branding", "العلامة", "Branding"],
  ["Color", "Couleur", "اللون", "Color"],
  ["Collar", "Col", "الياقة", "Cuello"],
  ["Sleeve", "Manche", "الكم", "Manga"],
  ["Leg Opening", "Ouverture de jambe", "فتحة الساق", "Abertura de pierna"],
  ["Upload Design Mockup", "Uploader le mockup", "رفع نموذج التصميم", "Subir mockup"],
  ["Professional product builder", "Configurateur produit professionnel", "مكوّن منتج احترافي", "Configurador profesional"],
  ["Sizing notes", "Notes de taille", "ملاحظات المقاسات", "Notas de tallaje"],
  ["Tags separated by commas", "Tags separes par virgules", "وسوم مفصولة بفواصل", "Etiquetas separadas por comas"],
  ["To keep production realistic, PULSE currently only accepts limited clothing types and production options.", "Pour garder la production realiste, PULSE accepte actuellement des types de vetements et options de production limites.", "لإبقاء الإنتاج واقعيا، يقبل PULSE حاليا أنواعا محدودة من الملابس وخيارات إنتاج محددة.", "Para mantener la produccion realista, PULSE acepta tipos de prendas y opciones limitadas."],
  ["Product category", "Categorie produit", "فئة المنتج", "Categoria de producto"],
  ["T-shirt", "T-shirt", "تي شيرت", "Camiseta"],
  ["Long Sleeve", "Manche longue", "كم طويل", "Manga larga"],
  ["Sweatshirt", "Sweatshirt", "سويت شيرت", "Sudadera"],
  ["Hoodie", "Hoodie", "هودي", "Hoodie"],
  ["Joggers", "Joggers", "جوغر", "Joggers"],
  ["Cargo Pants", "Cargo pants", "بنطال كارغو", "Cargo pants"],
  ["T-shirt / sweat system", "Systeme t-shirt / sweat", "نظام التي شيرت / السويت", "Sistema camiseta / sudadera"],
  ["Pants system", "Systeme pantalon", "نظام البنطال", "Sistema pantalon"],
  ["Regular Fit", "Regular Fit", "قصة عادية", "Regular Fit"],
  ["Slim Fit", "Slim Fit", "قصة ضيقة", "Slim Fit"],
  ["Oversized Fit", "Oversized Fit", "قصة واسعة", "Oversized Fit"],
  ["Oversized", "Oversized", "واسع", "Oversized"],
  ["Boxy Fit", "Boxy Fit", "قصة مربعة", "Boxy Fit"],
  ["Regular", "Regular", "عادي", "Regular"],
  ["Boxy", "Boxy", "مربع", "Boxy"],
  ["Slim", "Slim", "ضيق", "Slim"],
  ["Straight", "Straight", "مستقيم", "Recto"],
  ["Baggy", "Baggy", "فضفاض", "Baggy"],
  ["Flare", "Flare", "واسع من الأسفل", "Flare"],
  ["Skinny", "Skinny", "ضيق جدا", "Skinny"],
  ["Bootcut", "Bootcut", "بوت كت", "Bootcut"],
  ["Straight Leg", "Straight Leg", "ساق مستقيمة", "Straight Leg"],
  ["Relaxed", "Relaxed", "مريح", "Relaxed"],
  ["Relaxed Fit", "Relaxed Fit", "قصة مريحة", "Relaxed Fit"],
  ["Clean vertical body, easy everyday proportion.", "Corps vertical net, proportion quotidienne facile.", "جسم عمودي نظيف ونسبة يومية سهلة.", "Cuerpo vertical limpio, proporcion diaria facil."],
  ["Closer chest and sleeve line for a sharper silhouette.", "Poitrine et manche plus proches pour une silhouette plus nette.", "صدر وأكمام أقرب للحصول على شكل أكثر حدة.", "Pecho y manga mas ajustados para una silueta nitida."],
  ["Dropped shoulder, longer sleeve, roomier streetwear volume.", "Epaule tombante, manche longue, volume streetwear plus ample.", "كتف ساقط وكم أطول وحجم ستريتوير أوسع.", "Hombro caido, manga larga y volumen streetwear amplio."],
  ["Shorter length with a wide square body block.", "Longueur plus courte avec bloc corps large et carre.", "طول أقصر مع كتلة جسم مربعة واسعة.", "Largo corto con bloque ancho y cuadrado."],
  ["Wide volume from hip to hem with relaxed drape.", "Volume large de la hanche a l'ourlet avec tombe decontracte.", "حجم واسع من الورك إلى الحافة مع انسدال مريح.", "Volumen ancho de cadera a bajo con caida relajada."],
  ["Controlled upper leg with a wider opening below the knee.", "Haut de jambe controle avec ouverture plus large sous le genou.", "ساق علوية مضبوطة مع فتحة أوسع تحت الركبة.", "Pierna superior controlada con apertura mas amplia bajo rodilla."],
  ["Narrow leg profile with close fit through the ankle.", "Profil jambe etroit avec ajustement proche a la cheville.", "شكل ساق ضيق مع قرب عند الكاحل.", "Perfil estrecho con ajuste cercano al tobillo."],
  ["Straight thigh with a subtle wider hem.", "Cuisse droite avec ourlet legerement plus large.", "فخذ مستقيم مع حافة أوسع قليلا.", "Muslo recto con bajo ligeramente mas ancho."],
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
    bio: "Technical tops, modular fleece systems and washed black utility pants.",
    followers: 18400,
    following: 218,
    likes: 128900,
    rank: 1,
    badge: "Drop winner",
    verified: true,
    specialty: "Technical fleece",
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
    bio: "Performance-informed tops and pants inspired by motion, compression and mesh.",
    followers: 9700,
    following: 119,
    likes: 54400,
    rank: 3,
    badge: "Rising",
    verified: true,
    specialty: "Sport garments",
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
    slug: "neon-utility-hoodie",
    title: "Neon Utility Hoodie",
    creator: "kaizen.arc",
    category: "Hoodies",
    clothingType: "Hoodie",
    fabric: "Premium Heavyweight",
    gsm: "520 GSM",
    fit: "Oversized",
    cut: "Boxy hooded block",
    embroidery: "Sleeve coordinate stitch",
    printType: "Screen print",
    colorway: "Graphite / Volt",
    washing: "Cold garment wash",
    aesthetic: "Cyber terrace uniform",
    inspiration: "Heavy fleece, underground football culture, night training kits.",
    description: "A heavyweight hoodie with hidden pocket geometry, ribbed hem and thin reflective pulse lines.",
    style: "Techwear",
    likes: 18340,
    comments: 842,
    approval: 92,
    saves: 5100,
    height: "tall",
    shape: "hoodie",
    visual: "linear-gradient(135deg, #121417, #3d4145 42%, #0b0b0c)",
    garment: "linear-gradient(145deg, #0c0d0e, #4b5154)",
    palette: ["#070707", "#c8ccc9", "#d9ff66", "#5a5f62"],
    tags: ["hoodie", "reflective", "utility"],
  },
  {
    slug: "oxide-loop-hoodie",
    title: "Oxide Loop Hoodie",
    creator: "noirshift",
    category: "Hoodies",
    clothingType: "Hoodie",
    fabric: "Heavy Fleece",
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
    category: "Pants",
    clothingType: "Cargo Pants",
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
    slug: "mesh-long-sleeve-zero",
    title: "Mesh Long Sleeve Zero",
    creator: "mika.systems",
    category: "T-Shirts",
    clothingType: "Long Sleeve",
    fabric: "Performance mesh cotton",
    gsm: "220 GSM",
    fit: "Slim Fit",
    cut: "Long sleeve base layer",
    embroidery: "Cuff pulse mark",
    printType: "Printed Logo",
    colorway: "Silver / Smoke / Ice",
    washing: "Cold wash",
    aesthetic: "Futuristic base layer",
    inspiration: "Lab uniforms, compression tops and liquid metal finishes.",
    description: "A sculpted long sleeve top with panel seams, translucent graphic overlays and a close athletic fit.",
    style: "Future sport",
    likes: 16240,
    comments: 664,
    approval: 90,
    saves: 5900,
    height: "short",
    shape: "hoodie",
    visual: "linear-gradient(135deg, #151719, #e1e4df 56%, #222)",
    garment: "linear-gradient(145deg, #e8ebe7, #747b80)",
    palette: ["#ffffff", "#b9c1c4", "#4a4f54", "#8fe7ff"],
    tags: ["long-sleeve", "mesh", "silver"],
  },
  {
    slug: "signal-knit-vest",
    title: "Signal Knit Sweatshirt",
    creator: "kaizen.arc",
    category: "Sweatshirts",
    clothingType: "Sweatshirt",
    fabric: "Premium Heavyweight",
    gsm: "430 GSM",
    fit: "Boxy",
    cut: "Boxy crew block",
    embroidery: "Back neck stitch",
    printType: "Jacquard grid",
    colorway: "Black / Ecru",
    washing: "Dry flat",
    aesthetic: "Gallery streetwear",
    inspiration: "Signal diagrams, monochrome galleries, cold-weather layering.",
    description: "A sculptural sweatshirt with gridded jacquard texture and a clean heavy crew neckline.",
    style: "Layered minimal",
    likes: 9340,
    comments: 244,
    approval: 79,
    saves: 2100,
    height: "short",
    shape: "hoodie",
    visual: "linear-gradient(135deg, #070707, #d8d8cf 48%, #222)",
    garment: "linear-gradient(145deg, #f0f0e8, #1d1d1c)",
    palette: ["#050505", "#efefe7", "#7a7b76", "#d9ff66"],
    tags: ["sweatshirt", "jacquard", "layering"],
  },
  {
    slug: "blackout-hoodie-02",
    title: "Blackout Hoodie 02",
    creator: "noirshift",
    category: "Hoodies",
    clothingType: "Hoodie",
    fabric: "Heavy Fleece",
    gsm: "540 GSM",
    fit: "Oversized",
    cut: "Wide shoulder hooded block",
    embroidery: "Tonal sleeve code",
    printType: "None",
    colorway: "Black / Gunmetal",
    washing: "Garment wash",
    aesthetic: "Night commute uniform",
    inspiration: "Private club security, airport night light and heavy fleece uniforms.",
    description: "A premium hoodie with compressed structure, matte drawcord hardware and wide rib construction.",
    style: "Monochrome luxury",
    likes: 12640,
    comments: 377,
    approval: 86,
    saves: 3900,
    height: "tall",
    shape: "hoodie",
    visual: "linear-gradient(135deg, #030303, #272b2d 54%, #111)",
    garment: "linear-gradient(145deg, #070707, #3a3d3f)",
    palette: ["#020202", "#202326", "#7f8387", "#e9e9e3"],
    tags: ["hoodie", "heavyweight", "night"],
  },
  {
    slug: "soft-armor-tee",
    title: "Soft Armor Tee",
    creator: "atelier.zero",
    category: "T-Shirts",
    clothingType: "T-Shirt",
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
    category: "Pants",
    clothingType: "Pants",
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
    slug: "liminal-pocket-hoodie",
    title: "Liminal Pocket Hoodie",
    creator: "kaizen.arc",
    category: "Hoodies",
    clothingType: "Hoodie",
    fabric: "Standard Fleece",
    gsm: "420 GSM",
    fit: "Relaxed",
    cut: "Longline hooded block",
    embroidery: "Pocket serial",
    printType: "None",
    colorway: "Coal / Slate",
    washing: "Spot clean",
    aesthetic: "Architect studio uniform",
    inspiration: "Studio aprons, utility pockets and monochrome furniture.",
    description: "A longline hoodie with oversized utility pockets and a low-shine garment-washed finish.",
    style: "Workwear future",
    likes: 8670,
    comments: 205,
    approval: 80,
    saves: 1600,
    height: "tall",
    shape: "hoodie",
    visual: "linear-gradient(135deg, #080808, #565c60 46%, #151515)",
    garment: "linear-gradient(145deg, #24292c, #60686d)",
    palette: ["#090909", "#30363a", "#6f777c", "#c9c9c2"],
    tags: ["hoodie", "pocket", "workwear"],
  },
  {
    slug: "eclipse-waffle-thermal",
    title: "Eclipse Waffle Thermal",
    creator: "noirshift",
    category: "T-Shirts",
    clothingType: "Long Sleeve",
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
    slug: "carbon-wrap-jogger",
    title: "Carbon Wrap Jogger",
    creator: "mika.systems",
    category: "Pants",
    clothingType: "Joggers",
    fabric: "Cotton nylon",
    gsm: "310 GSM",
    fit: "Relaxed",
    cut: "Tapered jogger",
    embroidery: "Pocket pulse tab",
    printType: "Carbon side print",
    colorway: "Black / Chrome",
    washing: "Cold wash",
    aesthetic: "Post-runway sport",
    inspiration: "Carbon panels, motorcycle uniforms and black chrome hardware.",
    description: "A tapered jogger with wrapped side panels, oversized cargo pocketing and chrome cord hardware.",
    style: "Tech sport",
    likes: 13200,
    comments: 428,
    approval: 87,
    saves: 4400,
    height: "short",
    shape: "pants",
    visual: "linear-gradient(135deg, #030303, #8b9295 50%, #121212)",
    garment: "linear-gradient(145deg, #0a0a0a, #aeb5b8)",
    palette: ["#020202", "#45494c", "#b9c0c3", "#ffffff"],
    tags: ["jogger", "carbon", "chrome"],
  },
  {
    slug: "archive-denim-void",
    title: "Archive Denim Void",
    creator: "atelier.zero",
    category: "Pants",
    clothingType: "Pants",
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
    winners: ["neon-utility-hoodie", "mesh-long-sleeve-zero", "axis-parachute-cargo"],
    copy: "Community-selected hoodies, long sleeves and cargo pants in black, graphite and reflective silver.",
  },
  {
    id: "DROP #002",
    name: "VOID UNIFORM",
    status: "Voting opens",
    date: "2026-09-04T20:00:00",
    winners: ["oxide-loop-hoodie", "blackout-hoodie-02", "archive-denim-void"],
    copy: "Heavy fleece, washed black denim and premium hoodie proposals.",
  },
  {
    id: "DROP #003",
    name: "CUT SYSTEM",
    status: "Curating",
    date: "2026-11-12T19:00:00",
    winners: ["carbon-wrap-jogger", "rift-panel-trouser", "signal-knit-vest"],
    copy: "Performance joggers, structured trousers and sweatshirts for futuristic daily wear.",
  },
];

const products = designs
  .filter((design) => ["neon-utility-hoodie", "mesh-long-sleeve-zero", "oxide-loop-hoodie", "axis-parachute-cargo"].includes(design.slug))
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
  { name: "T-Shirts", code: "TEE", count: designs.filter((item) => item.category === "T-Shirts").length, signal: 88 },
  { name: "Hoodies", code: "HDY", count: designs.filter((item) => item.category === "Hoodies").length, signal: 94 },
  { name: "Sweatshirts", code: "SWT", count: designs.filter((item) => item.category === "Sweatshirts").length, signal: 82 },
  { name: "Pants", code: "PNT", count: designs.filter((item) => item.category === "Pants").length, signal: 86 },
  { name: "Shorts", code: "SRT", count: designs.filter((item) => item.category === "Shorts").length, signal: 69 },
];

const clothingFilters = ["T-Shirts", "Hoodies", "Sweatshirts", "Pants", "Shorts"];

const notifications = [
  { type: "Drop", title: "DROP #001 reached production review", time: "2m", tone: "hot" },
  { type: "Vote", title: "Neon Utility Hoodie crossed 18K likes", time: "18m", tone: "signal" },
  { type: "Creator", title: "kaizen.arc was verified by PULSE studio", time: "1h", tone: "verified" },
  { type: "Invite", title: "148 alpha invites remain this week", time: "today", tone: "access" },
];

const moderationItems = [
  { design: "Neon Utility Hoodie", creator: "kaizen.arc", status: "Approve", risk: "Low", queue: "Drop review", score: 92 },
  { design: "Blackout Hoodie 02", creator: "noirshift", status: "Feature", risk: "Low", queue: "Editorial", score: 86 },
  { design: "Soft Armor Tee", creator: "atelier.zero", status: "Needs spec", risk: "Medium", queue: "Revision", score: 76 },
  { design: "Carbon Wrap Jogger", creator: "mika.systems", status: "Spec check", risk: "Medium", queue: "Pants", score: 87 },
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
    ["submit", "Submit Design"],
    ["drops", "Drops"],
    ["shop", "Shop"],
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
          <a class="primary-btn" href="#/submit">${icons.upload}<span>Submit</span></a>
        </div>
      </div>
    </header>
    <nav class="mobile-nav" aria-label="Mobile">
      <a class="${route === "home" ? "active" : ""}" href="#/home" title="Home">P</a>
      <a class="${route === "community" ? "active" : ""}" href="#/community" title="Community">${icons.search}</a>
      <a class="${route === "drops" ? "active" : ""}" href="#/drops" title="Drops">${icons.spark}</a>
      <a class="${route === "shop" ? "active" : ""}" href="#/shop" title="Shop">${icons.open}</a>
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
          <span class="tag product-type-badge">${design.clothingType}</span>
          <span class="tag">${design.category}</span>
          <span class="tag">${design.fabric}</span>
        </div>
        <div class="card-signal-row">
          <button class="like-cta ${liked ? "liked" : ""}" data-action="like" data-slug="${design.slug}" aria-label="Like design">
            ${icons.heart}<span>Like</span>
          </button>
          <span class="vote-count">${formatNumber(likes)} votes</span>
          <span class="approval-count">${design.approval}% approval</span>
        </div>
        <div class="card-meta">
          <span class="metric-pill">${icons.comment}${formatNumber(design.comments)}</span>
          <span class="metric-pill">${formatNumber(design.saves)} saves</span>
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
        <div class="clothing-filter-shell">
          <div>
            <span class="section-kicker">Clothing only</span>
            <strong>Filter by garment</strong>
          </div>
          ${filters()}
        </div>
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
  return `
    <div class="filters clothing-filters" id="filters" role="group" aria-label="Filter">
      ${clothingFilters.map((category) => `
        <button type="button" data-action="category" data-category="${category}" class="filter-chip ${state.filters.category === category ? "active" : ""}" aria-pressed="${state.filters.category === category}">
          <span>${category}</span>
        </button>
      `).join("")}
    </div>
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
        (state.filters.category === "All" || item.category === state.filters.category)
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
            ${categories.map((cat) => `<div style="margin:13px 0;"><div class="price-row"><span>${cat.name}</span><strong>${cat.signal}%</strong></div><div class="progress" style="--value:${cat.signal}%"><span></span></div></div>`).join("")}
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
              <option>Technical fleece</option>
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

const productTypes = ["T-shirt", "Long Sleeve", "Sweatshirt", "Hoodie", "Pants", "Joggers", "Cargo Pants", "Shorts"];
const coreColors = ["Black", "White", "Grey", "Navy", "Cream"];

const productCreationConfig = {
  "T-shirt": {
    family: "T-Shirts",
    system: "T-shirt system",
    fits: ["Regular Fit", "Slim Fit", "Oversized Fit", "Boxy Fit"],
    fabric: ["Lightweight", "Medium Weight", "Heavyweight"],
    branding: ["No Branding", "Embroidery", "Printed Logo", "Woven Label"],
    details: [
      { name: "collar", label: "Collar", options: ["Crew Neck", "Heavy Crew Neck", "Mock Neck"] },
      { name: "sleeve", label: "Sleeve", options: ["Short Sleeve", "Long Sleeve"] },
    ],
  },
  "Long Sleeve": {
    family: "T-Shirts",
    system: "Long sleeve system",
    fits: ["Regular Fit", "Slim Fit", "Oversized Fit", "Boxy Fit"],
    fabric: ["Lightweight", "Medium Weight", "Heavyweight"],
    branding: ["No Branding", "Embroidery", "Printed Logo", "Woven Label"],
    details: [
      { name: "collar", label: "Collar", options: ["Crew Neck", "Heavy Crew Neck", "Mock Neck"] },
      { name: "sleeve", label: "Sleeve", options: ["Long Sleeve"] },
    ],
  },
  Sweatshirt: {
    family: "Sweatshirts",
    system: "Sweatshirt system",
    fits: ["Regular", "Oversized", "Boxy"],
    fabric: ["Standard Fleece", "Heavy Fleece", "Premium Heavyweight"],
    branding: ["Embroidery", "Screen Print", "Puff Print", "Woven Label"],
    details: [],
  },
  Hoodie: {
    family: "Hoodies",
    system: "Hoodie system",
    fits: ["Regular", "Oversized", "Boxy"],
    fabric: ["Standard Fleece", "Heavy Fleece", "Premium Heavyweight"],
    branding: ["Embroidery", "Screen Print", "Puff Print", "Woven Label"],
    details: [],
  },
  Pants: {
    family: "Pants",
    system: "Pants system",
    fits: ["Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"],
    fabric: ["Cotton Twill", "Heavy Cotton", "Nylon Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: [{ name: "legOpening", label: "Leg Opening", options: ["Tapered", "Straight", "Wide"] }],
  },
  Joggers: {
    family: "Pants",
    system: "Jogger system",
    fits: ["Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"],
    fabric: ["Cotton Fleece", "Nylon Cotton", "Heavy Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: [{ name: "legOpening", label: "Leg Opening", options: ["Tapered", "Straight", "Wide"] }],
  },
  "Cargo Pants": {
    family: "Pants",
    system: "Cargo pants system",
    fits: ["Skinny", "Slim", "Straight", "Baggy", "Flare", "Bootcut", "Relaxed"],
    fabric: ["Cotton Twill", "Ripstop Cotton", "Nylon Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: [{ name: "legOpening", label: "Leg Opening", options: ["Tapered", "Straight", "Wide"] }],
  },
  Shorts: {
    family: "Shorts",
    system: "Shorts system",
    fits: ["Regular", "Relaxed", "Oversized"],
    fabric: ["Cotton Twill", "Fleece Cotton", "Nylon Cotton"],
    branding: ["Embroidery", "Printed Logo", "Woven Label"],
    details: [],
  },
};

const topFitVisuals = {
  "Regular Fit": { shape: "top-straight", note: "Clean everyday block with balanced chest, sleeve and body length." },
  "Slim Fit": { shape: "top-slim", note: "Closer chest and sleeve line for a sharper upper-body silhouette." },
  "Oversized Fit": { shape: "top-oversized", note: "Dropped shoulder, longer sleeve and roomier luxury streetwear volume." },
  "Boxy Fit": { shape: "top-boxy", note: "Shorter length with a wide square body block and strong shoulder line." },
  Regular: { shape: "top-straight", note: "Balanced fleece block for clean daily wear." },
  Oversized: { shape: "top-oversized", note: "Relaxed shoulder and body volume with a premium streetwear drape." },
  Boxy: { shape: "top-boxy", note: "Compact length with a wide body and architectural proportion." },
};

const bottomFitVisuals = {
  Skinny: { shape: "pant-skinny", note: "Narrow leg profile with close structure from thigh to hem." },
  Slim: { shape: "pant-slim", note: "Clean narrow leg with enough ease for movement." },
  Straight: { shape: "pant-straight", note: "Uniform leg width for a balanced classic block." },
  Baggy: { shape: "pant-baggy", note: "Wide volume from hip to hem with relaxed drape." },
  Flare: { shape: "pant-flare", note: "Controlled upper leg with a wider opening below the knee." },
  Bootcut: { shape: "pant-bootcut", note: "Straight thigh with a subtle wider hem." },
  Relaxed: { shape: "pant-relaxed", note: "Comfortable thigh and knee with controlled width." },
  Regular: { shape: "pant-straight", note: "Straight casual block with a clean everyday short length." },
  Oversized: { shape: "pant-baggy", note: "A wider short silhouette with strong streetwear proportion." },
};

function productConfig(productType = "T-shirt") {
  return productCreationConfig[productType] || productCreationConfig["T-shirt"];
}

function isBottomProduct(productType) {
  return ["Pants", "Joggers", "Cargo Pants", "Shorts"].includes(productType);
}

function fitVisualFor(productType, label) {
  const source = isBottomProduct(productType) ? bottomFitVisuals : topFitVisuals;
  return source[label] || source[productConfig(productType).fits[0]];
}

function optionId(name, value) {
  return `${name}-${value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

function creationOptionGroup(group, options = {}) {
  return `
    <fieldset class="production-option-group ${options.full ? "full" : ""} ${options.fit ? "fit-option-group" : ""}">
      <legend>${options.step ? `<span class="builder-step-kicker">${options.step}</span>` : ""}${group.label}${group.hint ? `<small>${group.hint}</small>` : ""}</legend>
      <div class="${options.fit ? "fit-chip-grid" : "option-pills"}">
        ${group.options.map((option, index) => {
          const id = optionId(group.name, option);
          const visual = options.fit ? fitVisualFor(options.productType, option) : null;
          const checked = options.selected ? option === options.selected : index === 0;
          return `
            <label class="option-pill ${options.fit ? "fit-pill" : ""}" for="${id}">
              <input id="${id}" type="radio" name="${group.name}" value="${option}" ${checked ? "checked" : ""} />
              <span>
                ${visual ? `<span class="fit-icon fit-icon--${visual.shape}" aria-hidden="true"><i></i></span>` : ""}
                <span class="fit-label">${option}</span>
              </span>
            </label>
          `;
        }).join("")}
      </div>
    </fieldset>
  `;
}

function productTypeGroup(selected = "T-shirt") {
  return creationOptionGroup({
    name: "productType",
    label: "Product Type",
    hint: "Tops and bottoms only",
    options: productTypes,
  }, { full: true, step: "01", selected });
}

function dynamicProductGroups(productType = "T-shirt") {
  const config = productConfig(productType);
  const detailGroups = config.details.map((group) => creationOptionGroup(group, { step: "03" })).join("");
  return `
    ${creationOptionGroup({ name: "fit", label: "Fit", hint: config.system, options: config.fits }, { fit: true, full: true, productType, step: "02" })}
    ${detailGroups}
    ${creationOptionGroup({ name: "fabric", label: "Fabric", options: config.fabric }, { step: "03" })}
    ${creationOptionGroup({ name: "branding", label: "Branding", options: config.branding }, { step: "04" })}
    ${creationOptionGroup({ name: "color", label: "Color", options: coreColors }, { step: "05" })}
  `;
}

function fitPreviewMarkup(productType = "T-shirt", fit = productConfig(productType).fits[0]) {
  const selected = fitVisualFor(productType, fit);
  return `
    <div class="fit-preview" id="fitPreview">
      <div class="fit-preview-stage">
        <span class="fit-preview-figure fit-preview-figure--${selected.shape}" aria-hidden="true"><i></i></span>
      </div>
      <div>
        <span class="fit-preview-kicker">${productConfig(productType).family} / Fit Preview</span>
        <strong id="fitPreviewTitle">${fit}</strong>
        <p id="fitPreviewNote">${selected.note}</p>
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
            <h1 class="section-title">Professional product builder</h1>
          </div>
          <p class="section-copy">Choose a clothing lane, lock realistic production specs, upload a mockup, then send it to community moderation.</p>
        </div>
        <div class="split">
          <form class="form-card submit-builder" id="submitForm">
            <div class="submit-steps">
              <span class="active">01 Product</span>
              <span>02 Fit</span>
              <span>03 Specs</span>
              <span>04 Mockup</span>
              <span>05 Review</span>
            </div>
            <p class="production-note">To keep production realistic, PULSE currently only accepts limited clothing types and production options.</p>
            <div class="production-matrix">
              ${productTypeGroup()}
              <div id="dynamicProductSpecs" class="dynamic-product-specs">
                ${dynamicProductGroups()}
              </div>
            </div>
            <div class="builder-step-card">
              <span class="builder-step-kicker">06</span>
              <div class="upload-zone" id="uploadZone">
                <label>
                  ${icons.upload}
                  <strong style="display:block; margin:10px 0 6px;">Upload Design Mockup</strong>
                  <span class="muted">PNG, JPG or WebP. Cover and detail mockups are accepted.</span>
                  <input id="fileInput" type="file" accept="image/*" multiple />
                </label>
              </div>
              <div class="upload-status"><span></span><strong>Ready for visual upload</strong></div>
            </div>
            <div class="builder-step-card">
              <span class="builder-step-kicker">07</span>
              <div class="form-grid">
                <input class="field" name="title" placeholder="Title" required />
                <textarea class="textarea full" name="description" placeholder="Description" required></textarea>
                <input class="field full" name="tags" placeholder="Tags separated by commas" />
              </div>
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
                  <span class="metric-pill">T-shirt</span><span class="metric-pill">Regular Fit</span><span class="metric-pill">Medium Weight</span>
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
      const submittedForm = event.currentTarget;
      if (submittedForm instanceof HTMLFormElement) {
        submittedForm.reset();
      }
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
    const nextCategory = button.dataset.category || "All";
    state.filters.category = state.filters.category === nextCategory ? "All" : nextCategory;
    state.communityLimit = 8;
    toast(t(`${state.filters.category === "All" ? "Community" : state.filters.category} lane selected.`));
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

  const renderDynamicSpecs = (productType) => {
    const specs = document.getElementById("dynamicProductSpecs");
    if (specs) {
      specs.innerHTML = dynamicProductGroups(productType);
      localizeScoped(specs);
    }
  };

  const updatePreview = () => {
    const data = new FormData(form);
    const productType = data.get("productType") || "T-shirt";
    const config = productConfig(productType);
    const fit = data.get("fit") || config.fits[0];
    const selectedFit = fitVisualFor(productType, fit);
    previewTitle.textContent = data.get("title") || "Untitled concept";
    previewDescription.textContent = data.get("description") || "Your concept description will appear here as the community card takes shape.";
    if (previewSpecs) {
      const specs = [
        productType,
        fit,
        data.get("fabric") || config.fabric[0],
        data.get("branding") || config.branding[0],
        data.get("color") || "Black",
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
        kicker.textContent = `${config.family} / Fit Preview`;
      }
      if (title) title.textContent = fit;
      if (note) note.textContent = selectedFit.note;
      localizeScoped(fitPreview);
    }
    localizeScoped(previewSpecs);
  };

  form.addEventListener("input", updatePreview);
  form.addEventListener("change", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement && target.name === "productType") {
      renderDynamicSpecs(target.value);
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
