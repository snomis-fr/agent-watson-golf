<div className="fixed top-2 right-2 bg-red-600 text-white px-3 py-1 rounded">
  TAILWIND OK
</div>
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mic, Send, Menu, Sun, Wind, Sparkles, X, Keyboard, Trophy, User, RotateCcw, Check, UserCircle, Activity, Globe, Camera, Crown, Mail, Phone, CreditCard, MapPin, Flag, Ruler, Lock, Settings, TrendingUp, History, Info, ChevronRight, Calculator } from 'lucide-react';

const WatsonGolfAI = () => {
  // --- TRANSLATIONS & DATA ---
  const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  const COUNTRIES = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi",
    "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
    "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
    "Fiji", "Finland", "France",
    "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary",
    "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast",
    "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
    "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway",
    "Oman",
    "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal",
    "Qatar",
    "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
    "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
    "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
    "Yemen",
    "Zambia", "Zimbabwe"
  ];

  const CLUBS = [
    { name: "Driver", defaultDist: 230 },
    { name: "3 Wood", defaultDist: 210 },
    { name: "5 Wood", defaultDist: 200 },
    { name: "Hybrid", defaultDist: 190 },
    { name: "3 Iron", defaultDist: 180 },
    { name: "4 Iron", defaultDist: 170 },
    { name: "5 Iron", defaultDist: 160 },
    { name: "6 Iron", defaultDist: 150 },
    { name: "7 Iron", defaultDist: 140 },
    { name: "8 Iron", defaultDist: 130 },
    { name: "9 Iron", defaultDist: 120 },
    { name: "PW", defaultDist: 110 },
    { name: "GW", defaultDist: 100 },
    { name: "SW", defaultDist: 90 },
    { name: "LW", defaultDist: 80 }
  ];

  const TENDENCIES = [
    { value: 'straight', labelKey: 'straight' },
    { value: 'draw', labelKey: 'draw' },
    { value: 'fade', labelKey: 'fade' },
    { value: 'hook', labelKey: 'hook' },
    { value: 'slice', labelKey: 'slice' }
  ];

  const TRANSLATIONS = {
    en: {
      greeting: "Hi! I'm Watson, your 24/7 AI Caddie. \n\nRules, technique, training, mental game, fitness, nutrition... I'm here to help with every aspect of your game. Ready?",
      online: "Online",
      tapToSpeak: "Tap to speak",
      listening: "Listening...",
      processing: "Thinking...",
      analyzing: "Analyzing image...",
      placeholder: "Ask Watson...",
      profile: "My Profile",
      identity: "Identity",
      firstName: "First Name",
      lastName: "Last Name",
      country: "Country",
      email: "Email",
      phone: "Phone",
      subscription: "Subscription",
      planFree: "Free Trial (1 Week)",
      planPremium: "Premium ($1.99/mo)",
      currentPlan: "Current Plan",
      dexterity: "Dexterity",
      righty: "Righty",
      lefty: "Lefty",
      handicap: "My Handicap",
      myBag: "My Bag & Distances",
      club: "Club",
      distance: "Dist.",
      dispersion: "Disp.",
      premiumFeature: "Premium Feature",
      upgradeToUnlock: "Upgrade to unlock",
      language: "Language",
      preferences: "Preferences",
      units: "Units",
      tendency: "Shot Tendency",
      tendencies: { straight: "Straight", draw: "Draw", fade: "Fade", hook: "Hook", slice: "Slice" },
      reset: "Reset Conversation",
      vision_tip: "I see your ball is deep in the rough. Here is a pro tip:\n\n**Goal: Get it out clean. Period.**\n\n1. **Accept losing distance:** You're playing the exit, not the flag. Don't be greedy.\n2. **Open the face slightly:** The rough will close it at impact. Anticipate to avoid pulling left.\n3. **Firmer grip:** Stabilize the club against the grass. Firm, not tense.\n4. **Ball back in stance:** Half a ball back for a descending blow.\n5. **Short swing, controlled finish:** Hit to escape, not to impress. \n\n⚠️ Expect more roll, so play short of the flag.",
      demo_query: "My ball is in the bunker but in water, what rules apply?",
      chips: { 
        rules: ["Unplayable lie?", "Casual water?", "Out of bounds?", "Lost ball?", "Drop rules?"], 
        mental: ["First tee nerves", "Pre-shot routine", "Stay focused", "Forget bad shot", "Putting confidence"], 
        tech: ["Fix my slice", "Gain distance", "Bunker shot", "Pure contact", "Straight putts"],
        training: ["Putting drill", "Driving drill", "Iron control", "Lob shots", "Sand saves"],
        fitness: ["Warm up 5min", "Back stretch", "Core strength", "Hip mobility", "Avoid back pain"],
        nutrition: ["Energy snack", "Hydration tips", "Pre-round meal", "Banana or bar?", "Caffeine on course?"]
      },
      ranges: ["Expert", "Advanced", "Intermediate", "Improving", "Beginner"],
      fitting: "Fitting Assistant",
      fittingDesc: "Find your specs (Wishon/Ping)",
      calculate: "Calculate",
      height: "Height (cm)",
      wristToFloor: "Wrist-Floor (cm)",
      carry7: "7-Iron Carry (m)",
      weight: "Weight (kg)",
      age: "Age",
      frequency: "Freq (/week)",
      recommendation: "Recommendation",
      length: "Length",
      lie: "Lie Angle",
      shaft: "Shaft Flex",
      fittingDisclaimer: "This tool provides theoretical estimates based on standard charts (Wishon, Patriot Golf, Ping). It does NOT replace a dynamic fitting session with a professional."
    },
    fr: {
      greeting: "Salut ! Je suis Watson, ton Caddie IA 24/7. \n\nArbitrage, technique, entraînement, mental, physique, nutrition... Je suis là pour t'aider dans tous les domaines. On y va ?",
      online: "En ligne",
      tapToSpeak: "Appuyez pour parler",
      listening: "Je vous écoute...",
      processing: "Je réfléchis...",
      analyzing: "Analyse de l'image...",
      placeholder: "Demandez à Watson...",
      profile: "Mon Profil",
      identity: "Identité",
      firstName: "Prénom",
      lastName: "Nom",
      country: "Pays",
      email: "E-mail",
      phone: "Téléphone",
      subscription: "Abonnement",
      planFree: "Essai Gratuit (1 sem.)",
      planPremium: "Premium (1,99$/mois)",
      currentPlan: "Plan Actuel",
      dexterity: "Latéralité",
      righty: "Droitier",
      lefty: "Gaucher",
      handicap: "Mon Index",
      myBag: "Mon Sac & Distances",
      club: "Club",
      distance: "Dist.",
      dispersion: "Disp.",
      premiumFeature: "Fonction Premium",
      upgradeToUnlock: "Abonnez-vous pour débloquer",
      language: "Langue",
      preferences: "Préférences",
      units: "Unités",
      tendency: "Tendance naturelle",
      tendencies: { straight: "Droit", draw: "Draw", fade: "Fade", hook: "Hook", slice: "Slice" },
      reset: "Réinitialiser",
      vision_tip: "Je vois que ta balle est profondément enfoncée.\n\n**Ton objectif : sortir la balle proprement, point.**\n\n1. **Accepte de perdre de la distance :** Tu ne joues pas le drapeau. Tu joues la sortie.\n2. **Ouvre légèrement la face :** Le rough va la refermer à l’impact. Anticipe pour ne pas tirer à gauche.\n3. **Grip plus ferme :** Juste assez pour stabiliser la face dans l’herbe.\n4. **Balle en arrière :** Un demi-balle suffit pour un contact descendant.\n5. **Swing court, finish contrôlé :** Tu frappes pour sortir, pas pour impressionner.\n\n⚠️ La balle va rouler davantage, vise court du drapeau.",
      demo_query: "Ma balle se trouve dans le bunker mais dans l'eau, quelles sont les règles qui s'appliquent ?",
      chips: { 
        rules: ["Balle injouable ?", "Eau fortuite ?", "Hors limites ?", "Balle perdue ?", "Dropper correct ?"], 
        mental: ["Gérer le stress", "Routine pré-coup", "Rester focus", "Oublier un échec", "Confiance au putting"], 
        tech: ["Corriger le slice", "Gagner en distance", "Sortie de bunker", "Contact plus pur", "Putter plus droit"],
        training: ["Exercice putting", "Drill driving", "Contrôle des fers", "Approches levées", "Sortie de sable"],
        fitness: ["Échauffement 5mn", "Étirement dos", "Renfo sangle abdo", "Mobilité hanches", "Éviter mal de dos"],
        nutrition: ["Snack énergie", "Hydratation", "Repas avant partie", "Banane ou barre ?", "Caféine sur le parcours ?"]
      },
      ranges: ["Expert", "Confirmé", "Intermédiaire", "En progression", "Débutant"],
      fitting: "Aide au Fitting",
      fittingDesc: "Trouvez vos specs (Wishon/Ping)",
      calculate: "Calculer",
      height: "Taille (cm)",
      wristToFloor: "Poignet-Sol (cm)",
      carry7: "Portée Fer 7 (m)",
      weight: "Poids (kg)",
      age: "Âge",
      frequency: "Fréq (/sem)",
      recommendation: "Recommandation",
      length: "Longueur",
      lie: "Angle de Lie",
      shaft: "Flex Shaft",
      fittingDisclaimer: "Cet outil fournit une estimation théorique basée sur des chartes standards (Wishon, Patriot Golf, Ping). Il NE remplace PAS un fitting dynamique avec un professionnel."
    },
    es: {
      greeting: "¡Hola! Soy Watson, tu Caddie IA 24/7. \n\nReglas, técnica, entrenamiento, mental, físico, nutrición... Estoy aquí para ayudarte en todos los aspectos de tu juego. ¿Listo?",
      online: "En línea",
      tapToSpeak: "Toca para hablar",
      listening: "Escuchando...",
      processing: "Pensando...",
      analyzing: "Analizando imagen...",
      placeholder: "Pregúntale a Watson...",
      profile: "Mi Perfil",
      identity: "Identidad",
      firstName: "Nombre",
      lastName: "Apellido",
      country: "País",
      email: "Correo",
      phone: "Teléfono",
      subscription: "Suscripción",
      planFree: "Prueba (1 semana)",
      planPremium: "Premium ($1.99/mes)",
      currentPlan: "Plan Actual",
      dexterity: "Destreza",
      righty: "Diestro",
      lefty: "Zurdo",
      handicap: "Mi Hándicap",
      language: "Idioma",
      preferences: "Preferencias",
      units: "Unidades",
      tendency: "Tendencia de golpe",
      tendencies: { straight: "Recto", draw: "Draw", fade: "Fade", hook: "Hook", slice: "Slice" },
      myBag: "Mi Bolsa y Distancias",
      club: "Palo",
      distance: "Dist.",
      dispersion: "Disp.",
      premiumFeature: "Función Premium",
      upgradeToUnlock: "Suscríbete para desbloquear",
      reset: "Reiniciar",
      vision_tip: "Veo tu bola hundida en el rough.\n\n**Tu objetivo: sacarla limpia.**\n\n1. **Acepta perder distancia:** Juegas la salida, no la bandera.\n2. **Abre ligeramente la cara:** El rough la cerrará al impacto.\n3. **Agarre más firme:** Para estabilizar el palo en la hierba.\n4. **Bola atrás:** Media bola atrás para un golpe descendente.\n5. **Swing corto y controlado:** Golpea para salir.\n\n⚠️ La bola rodará más, juega corto.",
      demo_query: "Mi bola está en el bunker pero en el agua, ¿qué reglas se aplican?",
      chips: { 
        rules: ["¿Bola injugable?", "¿Agua accidental?", "¿Fuera de límites?", "¿Bola perdida?", "¿Reglas de drop?"], 
        mental: ["Nervios del 1", "Rutina pre-golpe", "Mantener el foco", "Olvidar mal golpe", "Confianza al putt"], 
        tech: ["Arreglar slice", "Ganar distancia", "Sacada de bunker", "Contacto puro", "Putt recto"],
        training: ["Ejercicio putt", "Ejercicio drive", "Control de hierros", "Globo", "Salida de arena"],
        fitness: ["Calentamiento", "Estirar espalda", "Fuerza core", "Movilidad cadera", "Evitar dolor espalda"],
        nutrition: ["Snack energía", "Hidratación", "Comida pre-ronda", "¿Plátano o barrita?", "¿Cafeína en campo?"]
      },
      ranges: ["Experto", "Avanzado", "Intermedio", "Mejorando", "Principiante"],
      fitting: "Asistente de Fitting",
      fittingDesc: "Encuentra tus specs (Wishon/Ping)",
      calculate: "Calcular",
      height: "Altura (cm)",
      wristToFloor: "Muñeca-Suelo (cm)",
      carry7: "Vuelo Hierro 7 (m)",
      weight: "Peso (kg)",
      age: "Edad",
      frequency: "Frec (/sem)",
      recommendation: "Recomendación",
      length: "Longitud",
      lie: "Angulo Lie",
      shaft: "Flexión Eje",
      fittingDisclaimer: "Esta herramienta proporciona estimaciones teóricas basadas en tablas estándar. NO reemplaza un fitting dinámico profesional."
    },
    ja: {
      greeting: "こんにちは！24時間対応のAIキャディ、ワトソンです。\n\nルール、技術、練習、メンタル、フィジカル、栄養... ゴルフのあらゆる面でサポートします。準備はいいですか？",
      online: "オンライン",
      tapToSpeak: "タップして話す",
      listening: "聞いています...",
      processing: "考え中...",
      analyzing: "画像を解析中...",
      placeholder: "ワトソンに聞く...",
      profile: "プロフィール",
      identity: "ID",
      firstName: "名",
      lastName: "姓",
      country: "国",
      email: "メール",
      phone: "電話番号",
      subscription: "サブスクリプション",
      planFree: "無料体験（1週間）",
      planPremium: "プレミアム（$1.99/月）",
      currentPlan: "現在のプラン",
      dexterity: "利き手",
      righty: "右打ち",
      lefty: "左打ち",
      handicap: "ハンディキャップ",
      language: "言語",
      preferences: "設定",
      units: "単位",
      tendency: "持ち球",
      tendencies: { straight: "ストレート", draw: "ドロー", fade: "フェード", hook: "フック", slice: "スライス" },
      myBag: "クラブ距離",
      club: "クラブ",
      distance: "距離",
      dispersion: "ばらつき",
      premiumFeature: "プレミアム機能",
      upgradeToUnlock: "アップグレードして解除",
      reset: "会話をリセット",
      vision_tip: "ボールがラフに深く沈んでいますね。\n\n**目標：きれいに脱出すること。**\n\n1. **距離を欲張らない:** ピンではなく脱出を優先。\n2. **フェースを少し開く:** インパクトで芝に負けてフェースが被るのを防ぎます。\n3. **グリップを強く:** 芝の抵抗に負けないように。\n4. **ボールは右足寄り:** ダウンブローに打ち込むため。\n5. **コンパクトなスイング:** 大振りせず、確実に脱出。\n\n⚠️ ランが多く出るので、手前に落としましょう。",
      demo_query: "ボールがバンカー内の水の中にあります。どのようなルールが適用されますか？",
      chips: { 
        rules: ["アンプレヤブル？", "カジュアルウォーター？", "OBの処置？", "ロストボール？", "ドロップのルール？"], 
        mental: ["朝イチの緊張", "プレショットルーティン", "集中力を保つ", "ミスを忘れる", "パットの自信"], 
        tech: ["スライス修正", "飛距離アップ", "バンカーショット", "芯で捉える", "真っ直ぐパット"],
        training: ["パット練習", "ドライバー練習", "アイアン制御", "ロブショット", "バンカー練習"],
        fitness: ["5分でウォームアップ", "背中のストレッチ", "体幹トレーニング", "股関節の柔軟性", "腰痛予防"],
        nutrition: ["エネルギー補給", "水分補給", "ラウンド前の食事", "バナナかバーか？", "カフェイン摂取？"]
      },
      ranges: ["エキスパート", "上級者", "中級者", "初級者", "初心者"],
      fitting: "フィッティング支援",
      fittingDesc: "スペックを診断 (Wishon/Ping)",
      calculate: "計算する",
      height: "身長 (cm)",
      wristToFloor: "手首から床 (cm)",
      carry7: "7番アイアン飛距離 (m)",
      weight: "体重 (kg)",
      age: "年齢",
      frequency: "頻度 (/週)",
      recommendation: "推奨スペック",
      length: "長さ",
      lie: "ライ角",
      shaft: "シャフト硬さ",
      fittingDisclaimer: "このツールは標準チャートに基づく理論上の推定値を提供します。プロによる動的フィッティングの代わりにはなりません。"
    },
    ko: {
      greeting: "안녕하세요! 24시간 대기 중인 AI 캐디 왓슨입니다. \n\n규칙, 기술, 훈련, 멘탈, 피지컬, 영양... 골프의 모든 면에서 도와드릴 수 있습니다. 준비되셨나요?",
      online: "온라인",
      tapToSpeak: "탭하여 말하기",
      listening: "듣고 있어요...",
      processing: "생각 중...",
      analyzing: "이미지 분석 중...",
      placeholder: "왓슨에게 물어보세요...",
      profile: "내 프로필",
      identity: "신원",
      firstName: "이름",
      lastName: "성",
      country: "국가",
      email: "이메일",
      phone: "전화번호",
      subscription: "구독",
      planFree: "무료 체험 (1주)",
      planPremium: "프리미엄 ($1.99/월)",
      currentPlan: "현재 플랜",
      dexterity: "주 사용 손",
      righty: "오른손잡이",
      lefty: "왼손잡이",
      handicap: "핸디캡",
      language: "언어",
      preferences: "환경 설정",
      units: "단위",
      tendency: "구질",
      tendencies: { straight: "스트레이트", draw: "드로우", fade: "페이드", hook: "훅", slice: "슬라이스" },
      myBag: "내 클럽 비거리",
      club: "클럽",
      distance: "비거리",
      dispersion: "분산",
      premiumFeature: "프리미엄 기능",
      upgradeToUnlock: "업그레이드하여 잠금 해제",
      reset: "대화 초기화",
      vision_tip: "공이 러프에 깊이 박혀 있네요.\n\n**목표: 깨끗하게 탈출하는 것.**\n\n1. **거리 욕심 버리기:** 핀을 보지 말고 탈출에 집중하세요.\n2. **페이스 약간 열기:** 임팩트 시 풀에 감겨 닫히는 것을 방지합니다.\n3. **그립 단단히 잡기:** 풀의 저항을 이겨내야 합니다.\n4. **공은 오른발 쪽에:** 다운블로로 찍어치기 위함입니다.\n5. **짧고 간결한 스윙:** 정확한 임팩트로 탈출하세요.\n\n⚠️ 런이 많이 발생하므로 핀보다 짧게 공략하세요.",
      demo_query: "공이 벙커 안 물에 있는데 어떤 규칙이 적용되나요?",
      chips: { 
        rules: ["언플레이어블?", "캐주얼 워터?", "OB 처치?", "분실구?", "드롭 규칙?"], 
        mental: ["첫 티샷 긴장", "프리샷 루틴", "집중력 유지", "미스샷 잊기", "퍼팅 자신감"], 
        tech: ["슬라이스 교정", "비거리 증가", "벙커 탈출", "정타 맞추기", "직진 퍼팅"],
        training: ["퍼팅 연습", "드라이버 드릴", "아이언 컨트롤", "로브 샷", "벙커 연습"],
        fitness: ["5분 워밍업", "등 스트레칭", "코어 강화", "고관절 유연성", "허리 통증 예방"],
        nutrition: ["에너지 간식", "수분 섭취", "라운드 전 식사", "바나나 vs 바?", "카페인 섭취?"]
      },
      ranges: ["전문가", "상급자", "중급자", "향상 중", "초보자"],
      fitting: "피팅 어시스턴트",
      fittingDesc: "스펙 찾기 (Wishon/Ping)",
      calculate: "계산하기",
      height: "키 (cm)",
      wristToFloor: "손목-바닥 길이 (cm)",
      carry7: "7번 아이언 캐리 (m)",
      weight: "몸무게 (kg)",
      age: "나이",
      frequency: "빈도 (/주)",
      recommendation: "추천 스펙",
      length: "길이",
      lie: "라이각",
      shaft: "샤프트 강도",
      fittingDisclaimer: "이 도구는 표준 차트를 기반으로 한 이론적 추정치를 제공합니다. 전문가의 다이나믹 피팅을 대체하지 않습니다."
    }
  };

  const handicapRanges = [
    { value: "0-9", descIndex: 0, dispersionRate: 0.05 },
    { value: "10-20", descIndex: 1, dispersionRate: 0.10 },
    { value: "21-30", descIndex: 2, dispersionRate: 0.15 },
    { value: "31-40", descIndex: 3, dispersionRate: 0.20 },
    { value: "41-54", descIndex: 4, dispersionRate: 0.20 }
  ];

  // --- MOCK HISTORY DATA ---
  const getMockHistory = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const t = yesterday.getTime();
    
    return [
      { id: 'h1', sender: 'user', text: "Quelle est ma distance avec un fer 7 par beau temps en partant du rough ?", category: 'user', timestamp: t - 36000000 },
      { id: 'h1b', sender: 'watson', text: "Comment la balle est-elle lyée ? Est-elle portée ou enfoncée ?", category: 'tech', timestamp: t - 35995000 },
      { id: 'h1c', sender: 'user', text: "Posée sur l'herbe.", category: 'user', timestamp: t - 35990000 },
      { id: 'h2', sender: 'watson', text: "Attention au 'flyer' ! La balle va sortir vite avec peu de spin.\n\nDistance estimée : 155m (au lieu de 140m).\nRoule : Prévois au moins 10-15m de roule après l'impact.\nConseil : Joue-le bien en rythme, c'est plus important que la force. Vise l'entrée du green.\n\nVeux-tu que je calcule la distance ajustée avec le vent ?", category: 'tech', timestamp: t - 35985000 },
      
      { id: 'h3', sender: 'user', text: "Je suis dans un bunker rempli d'eau.", category: 'user', timestamp: t - 28000000 },
      { id: 'h4', sender: 'watson', text: "Règle 16.1c : Tu as droit à un dégagement gratuit DANS le bunker au point sec le plus proche. Si le bunker est totalement inondé, tu peux dropper dehors avec 1 coup de pénalité.\n\nTu veux savoir quel club jouer pour cette sortie ?", category: 'rules', timestamp: t - 27990000 },
      
      { id: 'h5', sender: 'user', text: "📸 [Ma balle est pluggée]", image: "https://zupimages.net/up/16/12/qsii.jpg", category: 'user', timestamp: t - 25000000 },
      { id: 'h6', sender: 'watson', text: "Quand ta balle est profondément enfoncée dans le rough\nTon objectif : sortir la balle proprement, point.\n\nAccepte de perdre de la distance\nTu ne joues pas le drapeau. Tu joues la sortie. Si tu cherches la distance, tu te mets en difficulté.\n\nOuvre légèrement la face avant de prendre le grip\nLe rough va refermer la face à l’impact. Si tu ne l’anticipes pas, tu vas tirer à gauche.\n\nPrends un grip un peu plus ferme que d’habitude\nJuste assez pour stabiliser la face dans l’herbe. Ferme, pas crispé.\n\nMets la balle légèrement en arrière dans le stance\nUn demi-balle suffit. Tu veux un contact descendant, pas balayer.\n\nUn swing court avec un finish contrôlé\nAvec moins d’amplitude mais plus de maîtrise. Tu frappes pour sortir, pas pour impressionner. Et n'oublie pas la balle va rouler davantage donc il vaut mieux etre court du drapeaux\n\nTu veux des conseils pour l'approche suivante ?", category: 'tech', timestamp: t - 24990000 },
      
      { id: 'h7', sender: 'user', text: "Je stresse au départ du 1.", category: 'user', timestamp: t - 20000000 },
      { id: 'h8', sender: 'watson', text: "C'est normal Stéphane. Fais 3 grandes respirations abdominales. Visualise la trajectoire, la cible où tu veux atterrir exactement et pas les obstacles. Dis-toi : 'Je veux atterrir à cet endroit précis en fade par exemple ?' Respire et Feu.\n\nTu te sens mieux pour taper ce drive ?", category: 'mental', timestamp: t - 19995000 },
      
      { id: 'h9', sender: 'user', text: "Quel snack pour tenir 18 trous ?", category: 'user', timestamp: t - 15000000 },
      { id: 'h10', sender: 'watson', text: "Privilégie les amandes, une banane ou une barre protéinée. Bois de l'eau tous les 3 trous, soit 1.5 litres minimum à cette température.\n\nAs-tu assez d'eau dans ton sac ?", category: 'nutrition', timestamp: t - 14995000 },
      
      { id: 'h11', sender: 'user', text: "Exercice pour l'échauffement ?", category: 'user', timestamp: t - 10000000 },
      { id: 'h12', sender: 'watson', text: "Voici 5 exercices pour s'échauffer complètement en 10 min : 1. Rotations du cou (10x)\n2. Rotations d'épaules avec club (15x)\n3. Rotations de hanches (10 cercles/côté)\n4. Squats (15 reps)\n5. Rotations des chevilles (10x/pied) - Crucial pour éviter les entorses !\n\nUn bon échauffement est vital pour la performance et la santé.\n\nPrêt à taper ?", category: 'fitness', timestamp: t - 9995000 },
      
      { id: 'h13', sender: 'user', text: "Ma balle a bougé quand je l'ai marquée.", category: 'user', timestamp: t - 5000000 },
      { id: 'h14', sender: 'watson', text: "Si c'est accidentel lors du marquage (Règle 13.1d), pas de pénalité. Replace-la simplement.\n\nElle est bien replacée à son endroit d'origine ?", category: 'rules', timestamp: t - 4995000 },
      
      { id: 'h15', sender: 'user', text: "Mon swing est trop rapide.", category: 'user', timestamp: t - 2000000 },
      { id: 'h16', sender: 'watson', text: "Essaie le tempo 'Tour' : compte '1-et-2' dans ta tête. 1 pour la montée, 'et' la transition, 2 l'impact.\n\nOn essaye ce tempo au practice ?", category: 'tech', timestamp: t - 1995000 },
      
      { id: 'h17', sender: 'user', text: "📸 [Photo]", image: "https://www.camposdegolf.es/images/campos/tarjetas-juego-rondas-entrenamiento.jpg", category: 'user', timestamp: t - 1000000 },
      { id: 'h18', sender: 'watson', text: "Belle carte de score ! Un birdie au 18, bravo. Continue comme ça.\n\nQuel est ton objectif pour les 9 derniers trous ?", category: 'mental', timestamp: t - 995000 },
      
      { id: 'h19', sender: 'user', text: "Il va pleuvoir ?", category: 'user', timestamp: t - 500000 },
      { id: 'h20', sender: 'watson', text: "Le ciel se couvre mais pas de pluie prévue avant 17h sur Marrakech.\n\nPrévois-tu de jouer 18 trous ?", category: 'weather', timestamp: t - 495000 },
    ];
  };

  // --- STATES ---
  const [userProfile, setUserProfile] = useState({
    firstName: 'Stéphane', 
    lastName: 'Nomis',      
    country: 'France',      
    email: '',
    phone: '',
    handedness: 'right',    
    handicap: handicapRanges[1], // Index 16 is in 11-20
    language: 'en',         
    plan: 'premium', 
    tempUnit: 'C', // 'C' or 'F'
    distUnit: 'm', // 'm' or 'yd'
    tendency: 'straight', // 'straight', 'draw', 'fade', 'hook', 'slice'
    distances: CLUBS.reduce((acc, club) => ({ ...acc, [club.name]: club.defaultDist }), {})
  });

  const [fittingData, setFittingData] = useState({
    height: '',
    wristToFloor: '',
    carry7: '',
    weight: '',
    age: '',
    frequency: '',
    results: null
  });
  const [showFittingInfo, setShowFittingInfo] = useState(false);
  const [showFittingMenu, setShowFittingMenu] = useState(false);

  const [showSettings, setShowSettings] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingType, setProcessingType] = useState('text'); // 'text' or 'vision'
  const [inputText, setInputText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  
  // Initialize with greeting ONLY
  const [messages, setMessages] = useState([]);
  
  // Initialize greeting text based on current language
  useEffect(() => {
    setMessages([{
      id: Date.now(),
      sender: 'watson',
      type: 'greeting',
      text: TRANSLATIONS[userProfile.language].greeting,
      category: 'general'
    }]);
  }, []); // Run once on mount

  const t = TRANSLATIONS[userProfile.language];
  const messagesEndRef = useRef(null);

  // --- MEMOIZED RANDOM CHIPS ---
  // Selects a random chip from the arrays whenever language or messages reset
  const currentChips = useMemo(() => {
    const selected = {};
    const categories = ['rules', 'tech', 'mental', 'training', 'fitness', 'nutrition'];
    
    categories.forEach(key => {
      const options = t.chips[key];
      // Check if it's an array (new format) or string (fallback)
      if (Array.isArray(options)) {
        selected[key] = options[Math.floor(Math.random() * options.length)];
      } else {
        selected[key] = options;
      }
    });
    return selected;
  }, [userProfile.language, messages.length === 0]); // Re-roll when lang changes or convo resets

  // --- HANDLERS ---
  const updateProfile = (field, value) => {
    setUserProfile(prev => {
      const newProfile = { ...prev, [field]: value };
      if (field === 'language' && prev.language !== value) {
        // Update greeting message immediately
        setMessages(current => current.map(msg => 
          msg.type === 'greeting' ? { ...msg, text: TRANSLATIONS[value].greeting } : msg
        ));

        setTimeout(() => {
          setMessages(msgs => [...msgs, {
            id: Date.now(),
            sender: 'watson',
            type: 'info',
            text: value === 'ja' ? '言語を変更しました。' : 
                  value === 'ko' ? '언어가 변경되었습니다.' :
                  value === 'fr' ? 'Langue changée.' :
                  value === 'es' ? 'Idioma cambiado.' : 'Language changed.',
            category: 'system'
          }]);
        }, 100);
      }
      return newProfile;
    });
  };

  const calculateFitting = () => {
    const h = parseFloat(fittingData.height);
    const wtf = parseFloat(fittingData.wristToFloor);
    const carry = parseFloat(fittingData.carry7);

    if (!h || !wtf || !carry) return;

    let lengthRec = "Standard";
    let lieRec = "Standard";
    let shaftRec = "Regular";

    // Simplified Logic based on common charts (e.g., Ping color code approximation)
    // WRIST TO FLOOR logic for Length
    if (wtf > 100) lengthRec = "+1.5\"";
    else if (wtf > 95) lengthRec = "+1.0\"";
    else if (wtf > 90) lengthRec = "+0.5\"";
    else if (wtf >= 85) lengthRec = "Standard"; // 85-90
    else if (wtf >= 80) lengthRec = "-0.25\"";
    else if (wtf >= 75) lengthRec = "-0.5\"";
    else lengthRec = "-1.0\"";

    // LIE ANGLE (Very simplified correlation between Height and WTF)
    // If tall with short arms -> upright. If short with long arms -> flat.
    // We use a simple matrix approximation here for the demo.
    // Ideally needs a full chart lookup.
    // 0 = Standard Black. Upright = Blue/Green/White/Silver. Flat = Red/Orange/Brown/Gold.
    
    // Simple heuristic: 
    // Standard WTF is roughly Height / 2 + small offset (~5-10cm)
    // If WTF is significantly larger than expected for height -> Short arms -> Upright needed
    // If WTF is significantly smaller -> Long arms -> Flat needed
    
    const expectedWTF = h * 0.48; // Rough average
    const diff = wtf - expectedWTF;
    
    if (diff > 5) lieRec = "2° Upright (Green)"; // High WTF
    else if (diff > 2) lieRec = "1° Upright (Blue)";
    else if (diff < -5) lieRec = "2° Flat (Orange)"; // Low WTF
    else if (diff < -2) lieRec = "1° Flat (Red)";
    else lieRec = "Standard (Black)";

    // SHAFT FLEX based on 7-Iron Carry (Approximate)
    // < 100m -> Ladies
    // 100-120m -> Senior (A)
    // 120-145m -> Regular
    // 145-165m -> Stiff
    // > 165m -> X-Stiff
    if (carry < 100) shaftRec = "Ladies (L)";
    else if (carry < 120) shaftRec = "Senior (A)";
    else if (carry < 145) shaftRec = "Regular (R)";
    else if (carry < 165) shaftRec = "Stiff (S)";
    else shaftRec = "X-Stiff (X)";

    setFittingData(prev => ({
      ...prev,
      results: { length: lengthRec, lie: lieRec, shaft: shaftRec }
    }));
  };

  const updateDistance = (clubName, newDist) => {
    setUserProfile(prev => ({
      ...prev,
      distances: {
        ...prev.distances,
        [clubName]: parseInt(newDist)
      }
    }));
  };

  const getDispersion = (distance) => {
    const rate = userProfile.handicap.dispersionRate || 0.15;
    return Math.round(distance * rate);
  };

  const loadHistory = () => {
    if (!historyLoaded) {
      const history = getMockHistory();
      setMessages(prev => {
        return [...history, ...prev];
      });
      setHistoryLoaded(true);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isProcessing, showKeyboard]);

  // --- MOCK AI LOGIC ---
  const handleSendMessage = async (textInput = null, type = 'text') => {
    const query = textInput || "Voice note...";
    const name = userProfile.firstName ? userProfile.firstName : (userProfile.language === 'ja' || userProfile.language === 'ko' ? '' : 'Chief');
    
    // Add User Message
    const userMsg = { 
      id: Date.now(), 
      sender: 'user', 
      text: type === 'vision' ? '📸 [Photo]' : query,
      image: type === 'vision' ? 'https://www.golfconnection.fr/wp-content/uploads/2025/05/04ec560c-736f-4f80-9465-76d8f3d3b051.jpg' : null,
      category: 'user' 
    };
    setMessages(prev => [...prev, userMsg]);
    
    setInputText('');
    setShowKeyboard(false);
    setIsProcessing(true);
    setProcessingType(type);

    setTimeout(() => {
      let responseText = "";
      let category = "general";
      const lang = userProfile.language;

      if (type === 'vision') {
        category = "tech";
        responseText = t.vision_tip;
      } else {
        // Text/Voice Logic
        const q = query.toLowerCase();
        const isRules = q.includes("bunker") || q.includes("water") || q.includes("eau") || q.includes("agua") || q.includes("バンカー") || q.includes("벙커") || q.includes("injouable") || q.includes("unplayable");
        const isSlice = q.includes("slice") || q.includes("right") || q.includes("droite") || q.includes("derecha") || q.includes("スライス") || q.includes("슬라이스");
        const isMental = q.includes("stress") || q.includes("fear") || q.includes("peur") || q.includes("miedo") || q.includes("怖い") || q.includes("두려움") || q.includes("nerves") || q.includes("nerf");

        if (isRules) {
            category = "rules";
            if (lang === 'fr') responseText = `Ok ${name}, situation injouable (Règle 19).\n\nTu as 3 options avec 1 coup de pénalité :\n1. Rejouer du coup précédent.\n2. Dropper en arrière sur la ligne drapeau-balle.\n3. Dropper latéralement à 2 longueurs de club.`;
            else if (lang === 'es') responseText = `Ok ${name}, bola injugable (Regla 19).\n\nTienes 3 opciones con 1 golpe de penalidad:\n1. Repetir el golpe.\n2. Dropar atrás en línea con la bandera.\n3. Dropar lateralmente a 2 palos.`;
            else if (lang === 'ja') responseText = `${name}さん、アンプレヤブルですね（規則19）。\n\n1罰打で3つの選択肢があります：\n1. 前の位置から打ち直し。\n2. ピンとボールを結んだ後方延長線上にドロップ。\n3. ホールに近づかず、2クラブレングス以内にドロップ。`;
            else if (lang === 'ko') responseText = `${name}님, 언플레이어블 볼 선언이군요 (규칙 19).\n\n1벌타 후 3가지 옵션이 있습니다:\n1. 직전 위치에서 다시 치기.\n2. 깃대와 볼을 연결한 후방 선상에 드롭.\n3. 홀에 가깝지 않게 2클럽 길이 이내에 드롭.`;
            else responseText = `Ok ${name}, unplayable lie (Rule 19).\n\nYou have 3 options with 1 penalty stroke:\n1. Stroke and Distance (replay).\n2. Back-on-the-line relief.\n3. Lateral relief (2 club-lengths).`;
        } else if (isSlice) {
            category = "tech";
            if (lang === 'fr') responseText = `${name}, pour corriger le slice :\n\nAssure-toi que ta face de club n'est pas ouverte. Essaie de "fermer la porte" avec tes avant-bras après l'impact.`;
            else if (lang === 'es') responseText = `${name}, para corregir el slice:\n\nAsegúrate de no abrir la cara del palo. Intenta rotar los antebrazos después del impacto.`;
            else if (lang === 'ja') responseText = `${name}さん、スライス修正のヒントです。\n\nフェースが開かないように意識し、インパクト後に前腕をローテーションさせるイメージを持ちましょう。`;
            else if (lang === 'ko') responseText = `${name}님, 슬라이스 교정 팁입니다.\n\n클럽 페이스가 열리지 않도록 주의하고, 임팩트 후 팔뚝을 회전시키는 느낌을 가져보세요.`;
            else responseText = `${name}, to fix that slice:\n\nEnsure your clubface isn't open. Try to rotate your forearms over through impact to "close the door".`;
        } else if (isMental) {
            category = "mental";
            if (lang === 'fr') responseText = `Respire ${name}. La peur n'est qu'une anticipation.\n\nConcentre-toi sur ta routine. Une grande respiration ventrale.`;
            else if (lang === 'es') responseText = `Respira ${name}. El miedo es solo anticipación.\n\nConcéntrate en tu rutina. Respira profundo.`;
            else if (lang === 'ja') responseText = `${name}さん、深呼吸しましょう。恐怖はただの予期不安です。\n\nルーティンに集中してください。腹式呼吸で落ち着きましょう。`;
            else if (lang === 'ko') responseText = `${name}님, 숨을 고르세요. 두려움은 단지 예상일 뿐입니다.\n\n루틴에만 집중하세요. 깊게 복식 호흡을 하세요.`;
            else responseText = `Breathe, ${name}. Fear is just anticipation.\n\nFocus only on your routine. Take a deep belly breath.`;
        } else {
            category = "chat";
            if (lang === 'fr') responseText = `C'est noté. Je prends en compte tes paramètres. Besoin d'un conseil ?`;
            else if (lang === 'es') responseText = `Entendido. Tengo en cuenta tus ajustes. ¿Necesitas un consejo?`;
            else if (lang === 'ja') responseText = `了解しました。設定を考慮してアドバイスします。何か手伝いましょうか？`;
            else if (lang === 'ko') responseText = `알겠습니다. 설정을 반영하여 조언해 드리겠습니다. 도움이 필요하신가요?`;
            else responseText = `Copy that, ${name}. I'm updated. Need a read on the wind or a club selection?`;
        }
      }

      const aiMsg = { id: Date.now() + 1, sender: 'watson', text: responseText, category: category };
      setMessages(prev => [...prev, aiMsg]);
      setIsProcessing(false);
    }, 2000); // 2 seconds delay for "Analysis" feel
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      // Use the translated spoken query
      handleSendMessage(t.demo_query);
    } else {
      setIsListening(true);
    }
  };

  // Simulate Vision Click
  const handleVisionClick = () => {
    // Play shutter sound
    const shutterSound = new Audio("https://www.soundjay.com/mechanical/sounds/camera-shutter-click-01.mp3");
    shutterSound.play().catch(e => console.log("Audio play failed", e));
    handleSendMessage(null, 'vision');
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'rules': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'mental': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'tech': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'weather': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'system': return 'bg-slate-700/50 text-slate-400 border-slate-600';
      default: return 'bg-lime-500/10 text-lime-400 border-lime-500/20';
    }
  };

  const getCategoryLabel = (cat) => {
    switch (cat) {
      case 'rules': return 'Rules';
      case 'mental': return 'Mental';
      case 'tech': return 'Tech';
      case 'weather': return 'Weather';
      case 'system': return 'System';
      default: return 'Caddie';
    }
  };

  // --- RENDER : MAIN APP ---
  return (
    // Outer Container for Desktop Simulation
    // IMPORTANT: This layout ensures phone-like appearance on desktop and full width on mobile
    <div className="min-h-screen w-full bg-slate-900 flex items-center justify-center p-0 sm:p-4 font-sans">
      
      {/* Phone Frame Container */}
      <div className="w-full h-[100dvh] sm:h-[850px] sm:w-[414px] bg-slate-950 sm:rounded-[3rem] sm:border-[8px] sm:border-slate-800 relative overflow-hidden flex flex-col shadow-2xl">
        
        {/* Background Ambience */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-900/20 to-transparent pointer-events-none" />

        {/* Header */}
        <header className="flex justify-between items-center p-6 z-10 backdrop-blur-sm bg-slate-950/50 sticky top-0 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(163,230,53,0.4)] ${userProfile.plan === 'premium' ? 'bg-gradient-to-br from-yellow-400 to-amber-600' : 'bg-lime-400'}`}>
              {userProfile.plan === 'premium' ? <Crown className="w-6 h-6 text-white" fill="currentColor" /> : <span className="font-bold text-slate-900 text-lg">W</span>}
            </div>
            <div>
              <h1 className="font-bold text-white text-xl tracking-tight leading-tight">Watson<span className="text-lime-400">.ai</span></h1>
              <div className="flex flex-col text-xs mt-0.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    {t.online}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="flex items-center gap-1 text-slate-300">
                    <span>{LANGUAGES.find(l => l.code === userProfile.language)?.flag}</span>
                    {userProfile.firstName}
                  </span>
                </div>
                <span className="text-lime-400/80 font-medium">
                  HCP {userProfile.handicap.value}
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {!historyLoaded && (
              <button 
                onClick={loadHistory}
                className="p-3 rounded-full hover:bg-slate-800 transition-colors active:scale-95"
                aria-label="Load History"
              >
                <History className="w-7 h-7 text-slate-300" />
              </button>
            )}
            <button 
              onClick={() => setShowSettings(true)}
              className="p-3 -mr-3 rounded-full hover:bg-slate-800 transition-colors active:scale-95"
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7 text-slate-300" />
            </button>
          </div>
        </header>

        {/* SETTINGS OVERLAY */}
        {showSettings && (
          <div className="absolute inset-0 z-[100] bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200 flex flex-col p-6 text-white">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <User className="w-6 h-6 text-lime-400" />
                {t.profile}
              </h2>
              <button 
                onClick={() => setShowSettings(false)}
                className="p-3 -mr-3 bg-slate-800 rounded-full text-slate-300 hover:text-white"
              >
                <Check className="w-6 h-6 text-lime-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto pb-8 space-y-8 no-scrollbar">
              
              {/* SECTION: IDENTITY */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <UserCircle className="w-4 h-4" /> {t.identity}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 ml-1">{t.firstName}</label>
                    <input 
                      type="text" 
                      value={userProfile.firstName}
                      onChange={(e) => updateProfile('firstName', e.target.value)}
                      placeholder="e.g. Tiger"
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 ml-1">{t.lastName}</label>
                    <input 
                      type="text" 
                      value={userProfile.lastName}
                      onChange={(e) => updateProfile('lastName', e.target.value)}
                      placeholder="e.g. Woods"
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    />
                  </div>
                  {/* COUNTRY SELECTOR */}
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs text-slate-400 ml-1 flex items-center gap-1"><Flag className="w-3 h-3" /> {t.country}</label>
                    <select
                      value={userProfile.country}
                      onChange={(e) => updateProfile('country', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-lime-500 transition-colors appearance-none"
                    >
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>{country}</option>
                      ))}
                    </select>
                  </div>
                  {/* EMAIL & PHONE */}
                  <div className="col-span-2 space-y-2">
                    <label className="text-xs text-slate-400 ml-1 flex items-center gap-1"><Mail className="w-3 h-3" /> {t.email}</label>
                    <input 
                      type="email" 
                      value={userProfile.email}
                      onChange={(e) => updateProfile('email', e.target.value)}
                      placeholder="tiger@golf.com"
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    />
                  </div>
                   <div className="col-span-2 space-y-2">
                    <label className="text-xs text-slate-400 ml-1 flex items-center gap-1"><Phone className="w-3 h-3" /> {t.phone}</label>
                    <input 
                      type="tel" 
                      value={userProfile.phone}
                      onChange={(e) => updateProfile('phone', e.target.value)}
                      placeholder="+1 555-0123"
                      className="w-full bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white focus:outline-none focus:border-lime-500 transition-colors"
                    />
                  </div>
                </div>
              </section>

              {/* SECTION: LANGUAGE */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4" /> {t.language}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => updateProfile('language', lang.code)}
                      className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                        userProfile.language === lang.code
                          ? 'bg-lime-900/20 border-lime-500 text-lime-400'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.label}</span>
                      {userProfile.language === lang.code && <Check className="w-4 h-4 ml-auto" />}
                    </button>
                  ))}
                </div>
              </section>

              {/* SECTION: PREFERENCES */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Settings className="w-4 h-4" /> {t.preferences}
                </h3>
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-4">
                  {/* UNITS: TEMP */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-300">{t.temp} ({t.units})</span>
                    <div className="flex bg-slate-800 rounded-lg p-1">
                      {['C', 'F'].map((unit) => (
                        <button
                          key={unit}
                          onClick={() => updateProfile('tempUnit', unit)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                            userProfile.tempUnit === unit 
                              ? 'bg-lime-400 text-slate-900 shadow' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          °{unit}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* UNITS: DIST */}
                  <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                    <span className="text-sm font-medium text-slate-300">{t.dist} ({t.units})</span>
                    <div className="flex bg-slate-800 rounded-lg p-1">
                      {['m', 'yd'].map((unit) => (
                        <button
                          key={unit}
                          onClick={() => updateProfile('distUnit', unit)}
                          className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                            userProfile.distUnit === unit 
                              ? 'bg-lime-400 text-slate-900 shadow' 
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {unit}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION: HANDICAP */}
              <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> {t.handicap}
                </h3>
                <div className="space-y-2">
                  {handicapRanges.map((range, index) => {
                    const isSelected = userProfile.handicap.value === range.value;
                    return (
                      <button
                        key={index}
                        onClick={() => updateProfile('handicap', range)}
                        className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between active:scale-95 ${
                          isSelected 
                            ? 'bg-lime-900/20 border-lime-500' 
                            : 'bg-slate-900 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex flex-col items-start">
                          <span className={`font-bold text-lg ${isSelected ? 'text-lime-400' : 'text-white'}`}>
                            {range.value}
                          </span>
                          <span className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                            {t.ranges[range.descIndex]}
                          </span>
                        </div>
                        {isSelected && <div className="w-6 h-6 rounded-full bg-lime-400 flex items-center justify-center">
                          <Check className="w-4 h-4 text-slate-900" strokeWidth={3} />
                        </div>}
                      </button>
                    );
                  })}
                </div>
              </section>

               {/* SECTION: SUBSCRIPTION */}
               <section className="space-y-4">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <CreditCard className="w-4 h-4" /> {t.subscription}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {/* FREE PLAN */}
                  <button
                    onClick={() => updateProfile('plan', 'free')}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all ${
                      userProfile.plan === 'free'
                        ? 'bg-lime-900/10 border-lime-500/50'
                        : 'bg-slate-900 border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="text-left">
                      <span className={`block font-bold ${userProfile.plan === 'free' ? 'text-lime-400' : 'text-slate-300'}`}>{t.planFree}</span>
                      <span className="text-xs text-slate-500">Basic features</span>
                    </div>
                    {userProfile.plan === 'free' && <Check className="w-5 h-5 text-lime-400" />}
                  </button>

                  {/* PREMIUM PLAN */}
                  <button
                    onClick={() => updateProfile('plan', 'premium')}
                    className={`p-4 rounded-xl border flex items-center justify-between transition-all relative overflow-hidden group ${
                      userProfile.plan === 'premium'
                        ? 'bg-gradient-to-br from-yellow-900/20 to-amber-900/20 border-yellow-500'
                        : 'bg-slate-900 border-slate-800 hover:border-yellow-500/50'
                    }`}
                  >
                     {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    
                    <div className="text-left">
                      <div className="flex items-center gap-2">
                          <span className={`block font-bold ${userProfile.plan === 'premium' ? 'text-yellow-400' : 'text-slate-300'}`}>{t.planPremium}</span>
                          {userProfile.plan === 'premium' && <Crown className="w-4 h-4 text-yellow-400" fill="currentColor" />}
                      </div>
                      <span className="text-xs text-slate-500">Unlimited AI, Vision & Stats</span>
                    </div>
                    {userProfile.plan === 'premium' && <Check className="w-5 h-5 text-yellow-400" />}
                  </button>
                </div>
              </section>

              {/* SECTION: DEXTERITY (Premium) */}
              <section className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <Activity className="w-4 h-4" /> {t.dexterity}
                    </h3>
                    {userProfile.plan !== 'premium' && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-3 h-3" /> {t.premiumFeature}
                        </span>
                    )}
                 </div>
                 
                 {userProfile.plan === 'premium' ? (
                    <div className="grid grid-cols-2 gap-4 p-1 bg-slate-900 rounded-2xl border border-slate-800">
                        <button 
                        onClick={() => updateProfile('handedness', 'right')}
                        className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                            userProfile.handedness === 'right' 
                            ? 'bg-lime-400 text-slate-900 shadow-lg' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                        >
                        {t.righty}
                        </button>
                        <button 
                        onClick={() => updateProfile('handedness', 'left')}
                        className={`p-3 rounded-xl font-medium transition-all duration-200 ${
                            userProfile.handedness === 'left' 
                            ? 'bg-lime-400 text-slate-900 shadow-lg' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                        >
                        {t.lefty}
                        </button>
                    </div>
                 ) : (
                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-slate-500" />
                        </div>
                        <p className="text-slate-400 text-sm">{t.upgradeToUnlock}</p>
                        <button 
                        onClick={() => updateProfile('plan', 'premium')}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-amber-500/20"
                        >
                        {t.planPremium}
                        </button>
                    </div>
                 )}
              </section>

              {/* SECTION: SHOT TENDENCY (Premium) */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" /> {t.tendency}
                    </h3>
                    {userProfile.plan !== 'premium' && (
                        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                        <Lock className="w-3 h-3" /> {t.premiumFeature}
                        </span>
                    )}
                </div>

                {userProfile.plan === 'premium' ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {TENDENCIES.map((tendency) => (
                            <button
                            key={tendency.value}
                            onClick={() => updateProfile('tendency', tendency.value)}
                            className={`p-2 rounded-xl text-sm border transition-all ${
                                userProfile.tendency === tendency.value 
                                ? 'bg-lime-900/20 border-lime-500 text-lime-400' 
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
                            }`}
                            >
                            {t.tendencies[tendency.labelKey]}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center text-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-slate-500" />
                        </div>
                        <p className="text-slate-400 text-sm">{t.upgradeToUnlock}</p>
                        <button 
                        onClick={() => updateProfile('plan', 'premium')}
                        className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-amber-500/20"
                        >
                        {t.planPremium}
                        </button>
                    </div>
                )}
              </section>

              {/* SECTION: FITTING ASSISTANT (NEW) */}
              <section className="space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                            <Ruler className="w-4 h-4" /> {t.fitting}
                        </h3>
                        {/* Toggle Switch */}
                        <button 
                            onClick={() => setShowFittingMenu(!showFittingMenu)}
                            className={`w-10 h-5 rounded-full relative transition-colors ${showFittingMenu ? 'bg-lime-500' : 'bg-slate-700'}`}
                        >
                            <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all ${showFittingMenu ? 'left-6' : 'left-1'}`} />
                        </button>
                    </div>
                    <button 
                      onClick={() => setShowFittingInfo(!showFittingInfo)}
                      className="text-slate-400 hover:text-white"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                 </div>
                 
                 {/* FITTING INFO POPUP */}
                 {showFittingInfo && (
                   <div className="bg-blue-900/20 border border-blue-500/50 rounded-xl p-3 text-xs text-blue-200 mb-2">
                     <p className="flex gap-2 items-start">
                       <Info className="w-4 h-4 shrink-0 mt-0.5" />
                       {t.fittingDisclaimer}
                     </p>
                   </div>
                 )}

                 {showFittingMenu && (
                 <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 space-y-4 animate-in fade-in slide-in-from-top-2">
                    <p className="text-xs text-slate-400">{t.fittingDesc}</p>
                    
                    <div className="grid grid-cols-3 gap-2">
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase">{t.height}</label>
                        <input 
                          type="number" 
                          placeholder="180"
                          value={fittingData.height}
                          onChange={(e) => setFittingData({...fittingData, height: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-lime-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase">{t.wristToFloor}</label>
                        <input 
                          type="number" 
                          placeholder="90"
                          value={fittingData.wristToFloor}
                          onChange={(e) => setFittingData({...fittingData, wristToFloor: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-lime-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase">{t.carry7}</label>
                        <input 
                          type="number" 
                          placeholder="145"
                          value={fittingData.carry7}
                          onChange={(e) => setFittingData({...fittingData, carry7: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-lime-500 outline-none"
                        />
                      </div>
                      {/* NEW INPUTS */}
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase">{t.weight}</label>
                        <input 
                          type="number" 
                          placeholder="75"
                          value={fittingData.weight}
                          onChange={(e) => setFittingData({...fittingData, weight: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-lime-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase">{t.age}</label>
                        <input 
                          type="number" 
                          placeholder="30"
                          value={fittingData.age}
                          onChange={(e) => setFittingData({...fittingData, age: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-lime-500 outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] text-slate-500 uppercase">{t.frequency}</label>
                        <input 
                          type="number" 
                          placeholder="2"
                          value={fittingData.frequency}
                          onChange={(e) => setFittingData({...fittingData, frequency: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white text-sm focus:border-lime-500 outline-none"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={calculateFitting}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <Calculator className="w-4 h-4" />
                      {t.calculate}
                    </button>

                    {fittingData.results && (
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 animate-in fade-in slide-in-from-top-2">
                        <div className="text-center p-2 bg-slate-950 rounded-lg border border-slate-800">
                           <div className="text-[10px] text-slate-500 uppercase mb-1">{t.length}</div>
                           <div className="text-lime-400 font-bold">{fittingData.results.length}</div>
                        </div>
                        <div className="text-center p-2 bg-slate-950 rounded-lg border border-slate-800">
                           <div className="text-[10px] text-slate-500 uppercase mb-1">{t.lie}</div>
                           <div className="text-blue-400 font-bold text-xs">{fittingData.results.lie}</div>
                        </div>
                        <div className="text-center p-2 bg-slate-950 rounded-lg border border-slate-800">
                           <div className="text-[10px] text-slate-500 uppercase mb-1">{t.shaft}</div>
                           <div className="text-purple-400 font-bold">{fittingData.results.shaft}</div>
                        </div>
                      </div>
                    )}
                 </div>
                 )}
              </section>

              {/* SECTION: DISTANCES (Premium) */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                    <Ruler className="w-4 h-4" /> {t.myBag}
                  </h3>
                  {userProfile.plan !== 'premium' && (
                    <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded font-bold uppercase tracking-wider flex items-center gap-1">
                      <Lock className="w-3 h-3" /> {t.premiumFeature}
                    </span>
                  )}
                </div>

                {userProfile.plan === 'premium' ? (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-800 text-slate-400">
                        <tr>
                          <th className="p-3 text-left font-medium">{t.club}</th>
                          <th className="p-3 text-center font-medium">{t.distance} ({userProfile.distUnit})</th>
                          <th className="p-3 text-center font-medium">{t.dispersion} ({userProfile.distUnit})</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {CLUBS.map((club) => (
                          <tr key={club.name} className="hover:bg-slate-800/50 transition-colors">
                            <td className="p-3 font-medium text-white">{club.name}</td>
                            <td className="p-3 text-center">
                              <select 
                                className="bg-slate-950 text-white border border-slate-700 rounded px-2 py-1 focus:border-lime-500 focus:outline-none"
                                value={userProfile.distances[club.name]}
                                onChange={(e) => updateDistance(club.name, e.target.value)}
                              >
                                {[...Array(61)].map((_, i) => {
                                  const dist = i * 5;
                                  return dist > 0 && <option key={dist} value={dist}>{dist}</option>;
                                })}
                              </select>
                            </td>
                            <td className="p-3 text-center text-slate-400">
                              ±{getDispersion(userProfile.distances[club.name])}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-slate-500" />
                    </div>
                    <p className="text-slate-400 text-sm">{t.upgradeToUnlock}</p>
                    <button 
                      onClick={() => updateProfile('plan', 'premium')}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-lg font-bold text-sm shadow-lg shadow-amber-500/20"
                    >
                      {t.planPremium}
                    </button>
                  </div>
                )}
              </section>

              <div className="pt-8 border-t border-slate-800">
                 <button 
                  onClick={() => { setMessages([]); setShowSettings(false); }}
                  className="w-full p-4 rounded-2xl border border-red-900/30 bg-red-500/10 text-red-400 flex items-center gap-3 justify-center hover:bg-red-500/20 transition-colors"
                 >
                   <RotateCcw className="w-5 h-5" />
                   {t.reset}
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* Weather Widget */}
        <div className="px-6 pb-2 z-10 shrink-0">
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 bg-slate-900/50 p-2 rounded-xl border border-slate-800 w-fit">
            <div className="flex items-center gap-1"><MapPin className="w-3 h-3 text-red-400" /> Marrakech</div>
            <div className="flex items-center gap-1"><Sun className="w-3 h-3 text-yellow-400" /> {userProfile.tempUnit === 'C' ? '22°C' : '72°F'}</div>
            <div className="flex items-center gap-1"><Wind className="w-3 h-3 text-blue-400" /> 10mph NW</div>
          </div>
        </div>

        {/* Main Conversation Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide pb-32">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[85%] rounded-3xl p-5 shadow-sm animate-in slide-in-from-bottom-2 duration-300 ${
                  msg.sender === 'user' 
                    ? 'bg-slate-800 text-slate-100 rounded-tr-sm' 
                    : msg.category === 'system'
                      ? 'bg-slate-900/50 border border-slate-800/50 text-slate-400 text-sm italic text-center w-full max-w-full'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-tl-sm backdrop-blur-md'
                }`}
              >
                {msg.sender === 'watson' && msg.category !== 'system' && (
                  <div className={`text-xs font-bold uppercase tracking-wider mb-2 px-2 py-1 rounded w-fit border ${getCategoryColor(msg.category)}`}>
                    {getCategoryLabel(msg.category)}
                  </div>
                )}
                {msg.image && (
                  <img src={msg.image} alt="User upload" className="rounded-lg mb-2 max-w-full h-auto" />
                )}
                <div className="whitespace-pre-line text-lg leading-relaxed text-white">
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-slate-900/50 rounded-3xl p-4 flex gap-2 items-center">
                {processingType === 'vision' ? (
                   <span className="text-lime-400 text-sm font-medium animate-pulse flex items-center gap-2">
                      <Camera className="w-4 h-4" /> {t.analyzing}
                   </span>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </>
                )}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Action Area */}
        <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent z-20 shrink-0">
          
          {/* Suggestion Chips */}
          {!isListening && !showKeyboard && messages.length < 3 && (
            <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mask-fade-right">
              {['rules', 'tech', 'mental', 'training', 'fitness', 'nutrition'].map(key => (
                <button
                  key={key}
                  onClick={() => handleSendMessage(currentChips[key])}
                  className="whitespace-nowrap px-4 py-2 bg-slate-800 rounded-full text-sm font-medium border border-slate-700 hover:border-lime-500/50 transition-colors text-white"
                >
                  {currentChips[key]}
                </button>
              ))}
            </div>
          )}

          {/* Input Controls */}
          <div className="flex items-end gap-3 relative">
            
            {showKeyboard ? (
              <div className="flex-1 flex gap-2 items-center animate-in slide-in-from-bottom-5 fade-in duration-200">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={t.placeholder}
                  className="flex-1 bg-slate-800/80 text-white placeholder-slate-400 rounded-2xl px-5 py-4 border border-slate-700 focus:outline-none focus:border-lime-500 focus:ring-1 focus:ring-lime-500 transition-all text-lg"
                  autoFocus
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                />
                <button 
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim()}
                  className="p-4 bg-lime-400 text-slate-900 rounded-full font-bold hover:bg-lime-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setShowKeyboard(false)}
                  className="p-4 bg-slate-800 text-slate-400 rounded-full hover:bg-slate-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            ) : (
              /* Voice First Interface */
              <div className="w-full flex flex-col items-center justify-center gap-4">
                 {isListening && (
                   <div className="text-lime-400 font-medium animate-pulse">{t.listening}</div>
                 )}
                
                <div className="flex items-center gap-6 w-full justify-center">
                  <button 
                    onClick={() => setShowKeyboard(true)}
                    className="p-4 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all backdrop-blur-md"
                    aria-label="Keyboard"
                  >
                    <Keyboard className="w-6 h-6" />
                  </button>

                  <button 
                    onClick={toggleListening}
                    className={`
                      relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl
                      ${isListening 
                        ? 'bg-red-500 text-white scale-110 shadow-[0_0_50px_rgba(239,68,68,0.6)]' 
                        : 'bg-lime-400 text-slate-900 hover:bg-lime-300 shadow-[0_0_30px_rgba(163,230,53,0.4)]'
                      }
                    `}
                  >
                    {isListening && (
                      <span className="absolute inset-0 rounded-full border-2 border-white animate-ping opacity-50"></span>
                    )}
                    <Mic className={`w-10 h-10 ${isListening ? 'animate-pulse' : ''}`} />
                  </button>

                  <button 
                    className="p-4 rounded-full bg-slate-800/50 text-slate-400 hover:bg-slate-700 hover:text-white transition-all backdrop-blur-md"
                    onClick={handleVisionClick}
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                </div>
                
                <p className="text-slate-500 text-sm font-medium">{t.tapToSpeak}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WatsonGolfAI;