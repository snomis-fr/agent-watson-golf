<div className="fixed top-2 right-2 bg-red-600 text-white px-3 py-1 rounded">
  TAILWIND OK
</div>
import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, Menu, Sun, Wind, Sparkles, X, Keyboard, Trophy, User, RotateCcw, Check, UserCircle, Activity, Globe, Camera, Crown, Mail, Phone, CreditCard, MapPin } from 'lucide-react';

const WatsonGolfAI = () => {
  // --- TRANSLATIONS & DATA ---
  const LANGUAGES = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
  ];

  const TRANSLATIONS = {
    en: {
      greeting: "Hi! I'm Watson, your AI Caddie. \n\nOn the tee or in the rough, I've got your back. Ready to play?",
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
      language: "Language",
      reset: "Reset Conversation",
      vision_tip: "I see your ball is deep in the rough.\n\nTip: Grip the club tighter to avoid it twisting in the grass, and play the ball slightly back in your stance.",
      demo_query: "My ball is in the bunker but in water, what rules apply?",
      chips: { 
        rules: "Unplayable lie?", 
        mental: "First tee nerves", 
        tech: "Fix my slice" 
      },
      ranges: ["Expert", "Advanced", "Intermediate", "Improving", "Beginner"]
    },
    fr: {
      greeting: "Salut ! Je suis Watson, ton Caddie IA. \n\nSur le départ ou dans le rough, j'assure tes arrières. Prêt à jouer ?",
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
      language: "Langue",
      reset: "Réinitialiser",
      vision_tip: "Je vois que ta balle est enfoncée dans le rough.\n\nConseil : Tiens ton club plus fermement pour éviter qu'il ne tourne dans l'herbe, et joue la balle légèrement en arrière dans ton stance.",
      demo_query: "Ma balle se trouve dans le bunker mais dans l'eau, quelles sont les règles qui s'appliquent ?",
      chips: { 
        rules: "Balle injouable ?", 
        mental: "Gérer le stress", 
        tech: "Corriger mon slice" 
      },
      ranges: ["Expert", "Confirmé", "Intermédiaire", "En progression", "Débutant"]
    },
    es: {
      greeting: "¡Hola! Soy Watson, tu Caddie IA. \n\nEn el tee o en el rough, estoy contigo. ¿Listo para jugar?",
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
      reset: "Reiniciar",
      vision_tip: "Veo tu bola hundida en el rough.\n\nConsejo: Agarra el palo con más fuerza para evitar que gire en la hierba y juega la bola un poco más atrás.",
      demo_query: "Mi bola está en el bunker pero en el agua, ¿qué reglas se aplican?",
      chips: { 
        rules: "¿Bola injugable?", 
        mental: "Nervios tee 1", 
        tech: "Corregir slice" 
      },
      ranges: ["Experto", "Avanzado", "Intermedio", "Mejorando", "Principiante"]
    },
    ja: {
      greeting: "こんにちは！AIキャディのワトソンです。\n\nティーグラウンドでもラフでも、私がサポートします。準備はいいですか？",
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
      reset: "会話をリセット",
      vision_tip: "ボールがラフに沈んでいますね。\n\nヒント：芝に負けないようにグリップを強く握り、ボールを少し右足寄りに置いてください。",
      demo_query: "ボールがバンカー内の水の中にあります。どのようなルールが適用されますか？",
      chips: { 
        rules: "アンプレヤブル？", 
        mental: "朝イチの緊張", 
        tech: "スライス修正" 
      },
      ranges: ["エキスパート", "上級者", "中級者", "初級者", "初心者"]
    },
    ko: {
      greeting: "안녕하세요! AI 캐디 왓슨입니다. \n\n티박스나 러프 어디서든 도와드릴게요. 준비되셨나요?",
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
      reset: "대화 초기화",
      vision_tip: "공이 러프에 깊이 박혀 있네요.\n\n팁: 풀의 저항을 이겨내도록 그립을 단단히 잡고, 공을 평소보다 약간 오른발 쪽에 두세요.",
      demo_query: "공이 벙커 안 물에 있는데 어떤 규칙이 적용되나요?",
      chips: { 
        rules: "언플레이어블?", 
        mental: "첫 티샷 긴장", 
        tech: "슬라이스 교정" 
      },
      ranges: ["전문가", "상급자", "중급자", "향상 중", "초보자"]
    }
  };

  const handicapRanges = [
    { value: "0-10", descIndex: 0 },
    { value: "11-20", descIndex: 1 },
    { value: "21-30", descIndex: 2 },
    { value: "31-40", descIndex: 3 },
    { value: "41-54", descIndex: 4 }
  ];

  // --- STATES ---
  const [userProfile, setUserProfile] = useState({
    firstName: 'Stéphane', // Configuré pour la démo
    lastName: 'Nomis',      // Configuré pour la démo
    email: '',
    phone: '',
    handedness: 'right',    // Droitier
    handicap: handicapRanges[1], // Index 16 est dans la tranche 11-20 (index 1 du tableau)
    language: 'en',         // Parle anglais
    plan: 'free'
  });

  const [showSettings, setShowSettings] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingType, setProcessingType] = useState('text'); // 'text' or 'vision'
  const [inputText, setInputText] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  
  const [messages, setMessages] = useState([]);
  
  // Initialize greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        id: 1,
        sender: 'watson',
        type: 'greeting',
        text: TRANSLATIONS[userProfile.language].greeting,
        category: 'general'
      }]);
    }
  }, []);

  const t = TRANSLATIONS[userProfile.language];
  const messagesEndRef = useRef(null);

  // --- HANDLERS ---
  const updateProfile = (field, value) => {
    setUserProfile(prev => {
      const newProfile = { ...prev, [field]: value };
      if (field === 'language' && prev.language !== value) {
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
              <h1 className="font-bold text-white text-xl tracking-tight">Watson<span className="text-lime-400">.ai</span></h1>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {t.online}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-lime-400/80 font-medium">
                  {userProfile.firstName ? `${userProfile.firstName} • HCP ${userProfile.handicap.value}` : `HCP ${userProfile.handicap.value}`}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setShowSettings(true)}
            className="p-3 -mr-3 rounded-full hover:bg-slate-800 transition-colors active:scale-95"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7 text-slate-300" />
          </button>
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
                  {/* NEW FIELDS */}
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

              {/* SECTION: HANDEDNESS */}
              <section className="space-y-4">
                 <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Activity className="w-4 h-4" /> {t.dexterity}
                </h3>
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
            <div className="flex items-center gap-1"><Sun className="w-3 h-3 text-yellow-400" /> 72°F</div>
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
              <button onClick={() => handleSendMessage(t.chips.rules)} className="whitespace-nowrap px-4 py-2 bg-slate-800 rounded-full text-sm font-medium border border-slate-700 hover:border-lime-500/50 transition-colors text-white">
                {t.chips.rules}
              </button>
              <button onClick={() => handleSendMessage(t.chips.mental)} className="whitespace-nowrap px-4 py-2 bg-slate-800 rounded-full text-sm font-medium border border-slate-700 hover:border-lime-500/50 transition-colors text-white">
                {t.chips.mental}
              </button>
               <button onClick={() => handleSendMessage(t.chips.tech)} className="whitespace-nowrap px-4 py-2 bg-slate-800 rounded-full text-sm font-medium border border-slate-700 hover:border-lime-500/50 transition-colors text-white">
                {t.chips.tech}
              </button>
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