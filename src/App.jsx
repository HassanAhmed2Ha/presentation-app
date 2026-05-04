import React, { useState, useEffect, useRef, useCallback } from 'react';
import Hls from 'hls.js';
import { 
  ChevronLeft, ChevronRight, Maximize, Minimize, HeartHandshake, Globe, Scale, 
  Landmark, ShieldAlert, Building2, Megaphone, Briefcase, Heart, Eye, 
  TriangleAlert, Users, CheckCircle, FileText, Activity, Gavel, BookOpen, Quote,
  Sparkles
} from 'lucide-react';

// --- Shared Utilities & Components ---

const glassStyle = {
  backdropFilter: 'blur(24px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%), radial-gradient(circle at top left, rgba(255,255,255,0.15) 0%, transparent 40%)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
};

const VideoBackground = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    let hls;
    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(url);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current?.play().catch(() => {});
      });
    } else if (videoRef.current?.canPlayType('application/vnd.apple.mpegurl')) {
      videoRef.current.src = url;
      videoRef.current.addEventListener('loadedmetadata', () => {
        videoRef.current?.play().catch(() => {});
      });
    }
    return () => {
      if (hls) hls.destroy();
    };
  }, [url]);

  return (
    <video
      ref={videoRef}
      className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 mix-blend-screen"
      autoPlay loop muted playsInline
    />
  );
};

const Header = ({ centerText, rightText, hideRight, isActive }) => (
  <div className={`absolute top-[4%] left-[5.2%] right-[5.2%] flex justify-between items-center z-20 transition-all duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
    <div className="flex-1 flex justify-start group">
      <svg width="129" height="40" viewBox="0 0 129 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform group-hover:scale-105">
        <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.3"/>
        <path d="M12 20H28M20 12V28" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <text x="50" y="26" fill="white" fontSize="18" fontWeight="800" letterSpacing="-0.02em" fontFamily="Tajawal">مساواة</text>
      </svg>
    </div>
    {centerText && (
      <div className="flex-1 flex justify-center text-[clamp(14px,1.2vw,22px)] opacity-90 font-bold tracking-wide">
        {centerText}
      </div>
    )}
    <div className="flex-1 flex justify-end text-[clamp(14px,1.2vw,22px)] opacity-90 font-bold tracking-wide">
      {!hideRight && rightText}
    </div>
  </div>
);

// Reusable animated interactive card component
const GlassCard = ({ icon: Icon, title, desc, delay, isActive, className = "", children, emoji }) => (
  <div style={glassStyle} className={`hover-glass rounded-3xl p-[clamp(24px,2.5vw,48px)] flex flex-col justify-end transition-all ${isActive ? `anim-up ${delay}` : 'opacity-0 translate-y-12'} ${className}`}>
    {Icon && <Icon className="text-[#D2FF55] mb-[5%] w-[clamp(36px,3.5vw,56px)] h-[clamp(36px,3.5vw,56px)] stroke-[1.5] anim-float" />}
    {children}
    {title && <h3 className="text-[clamp(18px,1.8vw,36px)] font-bold mb-4 flex items-center justify-center gap-2">{title} <span className="text-[1.2em]">{emoji}</span></h3>}
    {desc && <p className="text-[clamp(14px,1.3vw,22px)] text-white/85 leading-[1.8]">{desc}</p>}
  </div>
);

// --- Slide 1: Cover ---
const Slide1 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" />
    <Header rightText="عرض تقديمي 🎬" hideRight={false} isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%] -mt-[3%]">
      <div className={`inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full w-max mb-6 border border-white/20 backdrop-blur-md ${isActive ? 'anim-down delay-200' : 'opacity-0'}`}>
        <Sparkles className="w-5 h-5 text-[#D2FF55]" />
        <span className="text-sm font-bold tracking-wide">حقوق الإنسان</span>
      </div>
      <h1 className={`text-[clamp(40px,7vw,110px)] tracking-tight leading-[1.1] font-extrabold max-w-5xl ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        حقوق ذوي الإعاقة: <br/> رؤية عالمية متكاملة 🌍
      </h1>
      <p className={`text-[clamp(22px,2.8vw,52px)] opacity-95 mt-[3%] max-w-4xl font-medium leading-[1.6] ${isActive ? 'anim-up delay-300' : 'opacity-0'}`}>
        استعراض تحليلي للأطر الدينية 🕌، القانونية ⚖️، والإنسانية 🤝 التي تضمن الكرامة وتكافؤ الفرص.
      </p>
      <div className={`text-[clamp(16px,1.4vw,28px)] opacity-80 mt-[4%] flex items-center gap-4 ${isActive ? 'anim-up delay-500' : 'opacity-0'}`}>
        <div className="w-12 h-[3px] bg-[#D2FF55] rounded-full"></div>
        نظرة عامة وتحليل للوثيقة الاستراتيجية 📄
      </div>
    </div>
  </div>
);

// --- Slide 2: Introduction ---
const Slide2 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" />
    <Header centerText="المقدمة 📖" rightText="02" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%]">
      <h2 className={`text-[clamp(32px,5vw,72px)] tracking-tight leading-[1.1] font-extrabold mb-[4%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        من مرحلة الإحسان 🤲 <br className="hidden md:block" /> إلى عصر المساواة والحقوق ⚖️
      </h2>
      
      <div className="flex flex-row mt-[2%] gap-[5%] items-stretch h-[45%]">
        <div className={`flex-[0_0_22%] flex flex-col justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover-glass ${isActive ? 'anim-right delay-300' : 'opacity-0'}`}>
          <div className="text-[clamp(48px,6vw,90px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">2006</div>
          <div className="text-[clamp(15px,1.3vw,24px)] opacity-90 mt-[8%] leading-[1.7] font-medium">
            العام الفاصل الذي شهد إقرار اتفاقية الأمم المتحدة كدستور عالمي ملزم 📜.
          </div>
        </div>
        
        <div className={`flex-[0_0_42%] flex items-center ${isActive ? 'anim-up delay-400' : 'opacity-0'}`}>
          <p className="text-[clamp(16px,1.4vw,26px)] opacity-100 leading-[2] font-semibold text-justify">
            إن قضية الأشخاص ذوي الإعاقة لم تعد مجرد مسألة هامشية، بل أصبحت معياراً أساسياً لتقدم الأمم ومدى احترامها العميق لحقوق الإنسان 🌟. لقد شهد العالم تحولاً جذرياً في النظرة إليهم؛ من مجرد فئة تتلقى التعاطف إلى نهج حقوقي أصيل يستند إلى مبادئ الدمج الشامل 🤝.
          </p>
        </div>
        
        <div className={`flex-[0_0_22%] flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 hover-glass ${isActive ? 'anim-left delay-500' : 'opacity-0'}`}>
          <div>
            <div className="text-[clamp(48px,6vw,90px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">5%</div>
            <div className="text-[clamp(15px,1.3vw,24px)] opacity-90 mt-[8%] leading-[1.7] font-medium">
              نسبة التوظيف الدنيا المخصصة إلزامياً 💼.
            </div>
          </div>
          <svg className="w-full h-[60px] mt-[15%] anim-float" viewBox="0 0 100 30" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(210,255,85,0.1)" />
                <stop offset="100%" stopColor="#D2FF55" />
              </linearGradient>
            </defs>
            <path d="M0 25 L20 18 L40 22 L60 8 L80 12 L100 2" fill="none" stroke="url(#lineGrad)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <circle cx="100" cy="2" r="4" fill="#fff" className="pulse-glow" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

// --- Slide 3: The Problem/Challenge (Redistributed for optimal space filling) ---
const Slide3 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" />
    <Header centerText="التحديات والمشكلات 🚧" rightText="03" isActive={isActive} />
    
    <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-[5.2%] pt-[2%]">
      {/* Top Text Section taking horizontal space */}
      <div className="text-center w-full max-w-6xl mx-auto mb-[5%]">
        <h2 className={`text-[clamp(40px,6vw,90px)] tracking-tight leading-[1.1] font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          الفجوة بين النص والواقع 📉
        </h2>
        <p className={`text-[clamp(18px,1.6vw,28px)] opacity-90 leading-[1.8] font-medium max-w-4xl mx-auto ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          رغم التطور الملحوظ في صياغة القوانين، لا يزال الأشخاص ذوو الإعاقة يواجهون تحديات جسيمة تعيق اندماجهم الكامل وتُهدد سلامتهم الأساسية في مختلف الظروف.
        </p>
      </div>
      
      {/* 3 Equal Columns to perfectly fill the lower half space */}
      <div className="grid grid-cols-3 gap-[3%] w-full h-[45%]">
        <GlassCard 
          isActive={isActive} delay="delay-300"
          emoji="🛑" 
          title="قصور التشريعات"
          desc="تكمن الأزمة الكبرى في الفجوة الشاسعة بين النصوص القانونية المثالية والتطبيق العملي الفعلي، مما يجعل العديد من الحقوق مجرد حبر على ورق دون أثر ملموس."
          className="text-center items-center justify-center border-t-4 border-t-orange-500/80 hover:border-orange-500"
        />
        
        <GlassCard 
          isActive={isActive} delay="delay-400"
          emoji="🚧" 
          title="تحديات البنية التحتية"
          desc="غياب المعايير الحقيقية لـ 'إمكانية الوصول' في المرافق العامة والمواصلات، مما يعزز حالة العزلة والتهميش المجتمعي بشكل يومي."
          className="text-center items-center justify-center border-t-4 border-t-yellow-500/80 hover:border-yellow-500"
        />

        <GlassCard 
          isActive={isActive} delay="delay-500"
          emoji="💣" 
          title="تفاقم المعاناة وقت النزاعات"
          desc="استحالة الإخلاء الآمن تحت القصف (كما في قطاع غزة)، مما يكشف عن تجاهل دولي صارخ للمادة ١١ من الاتفاقية الأممية المتعلقة بالحماية في حالات الطوارئ."
          className="text-center items-center justify-center border-t-4 border-t-red-600/80 bg-red-500/5 hover:border-red-500"
        />
      </div>
    </div>
  </div>
);

// --- Slide 4: The Proposed Solution ---
const Slide4 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" />
    <Header centerText="الحل المقترح 💡" rightText="04" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%] pt-[5%]">
      <div className="text-center w-full max-w-5xl mx-auto mb-[6%]">
        <h2 className={`text-[clamp(36px,5.5vw,85px)] tracking-tight leading-[1.1] font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          منهجية الحلول الشاملة 🎯
        </h2>
        <p className={`text-[clamp(16px,1.5vw,26px)] opacity-90 leading-[1.8] font-medium ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          يتطلب التغيير الحقيقي مقاربة استراتيجية متكاملة تتجاوز الوعود، لبناء مؤسسات رقابية قوية قادرة على تحويل الحقوق المكتوبة إلى واقع مُعاش 🌟.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-[4%] w-full mt-auto mb-[8%] h-[40%]">
        <GlassCard 
          icon={Scale} emoji="⚖️"
          title="تشريعات ملزمة" 
          desc="إقرار وطني صارم يفرض نسبة التوظيف، وتوفير إعفاءات ضريبية متكاملة تجرم التمييز بكافة أشكاله." 
          isActive={isActive} delay="delay-300" 
          className="text-center items-center justify-center border-t-4 border-t-[#D2FF55]"
        />
        <GlassCard 
          icon={Building2} emoji="🏗️"
          title="التصميم الشامل" 
          desc="الإلزام القانوني بتطبيق معايير 'إمكانية الوصول' في المباني، النقل، والمنصات الرقمية." 
          isActive={isActive} delay="delay-400"
          className="text-center items-center justify-center border-t-4 border-t-blue-400"
        />
        <GlassCard 
          icon={Users} emoji="🤝"
          title="توعية مجتمعية" 
          desc="إطلاق استراتيجيات إعلامية لتغيير النظرة النمطية وتعزيز ثقافة الدمج في المدارس والعمل." 
          isActive={isActive} delay="delay-500"
          className="text-center items-center justify-center border-t-4 border-t-purple-400"
        />
      </div>
    </div>
  </div>
);

// --- Slide 5: Core Features ---
const Slide5 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" />
    <Header centerText="أهم النقاط ⭐" rightText="05" isActive={isActive} />
    
    <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] px-[5.2%] pb-[6%]">
      <div className="text-center mb-[4%]">
        <h2 className={`text-[clamp(36px,5vw,80px)] tracking-tight leading-[1.1] font-extrabold ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          الركائز الأساسية للدمج والكرامة 🏛️
        </h2>
      </div>
      
      <div className="flex-1 flex flex-col gap-[3%]">
        <div className="flex-[1.2] flex gap-[3%] w-full">
          <GlassCard emoji="🕌" icon={HeartHandshake} title="الرؤية الدينية" desc="تكريس كرامة الإنسان بغض النظر عن القيود، واعتبار العمل الفاعل والتقوى هما المعيار." isActive={isActive} delay="delay-200" className="flex-1" />
          <GlassCard emoji="🌍" icon={Globe} title="المواثيق الدولية" desc="بناء استراتيجيات قارية طويلة الأمد لتوحيد مسارات التشريعات بالعقد العربي والأوروبي." isActive={isActive} delay="delay-300" className="flex-1" />
          <GlassCard emoji="🛡️" icon={Gavel} title="الحقوق الشاملة" desc="ضمان التمكين السياسي (الترشح)، التمكين الاقتصادي، والضمان الاجتماعي للحماية من الفقر." isActive={isActive} delay="delay-400" className="flex-1" />
        </div>
        
        <div className="flex-1 flex gap-[3%] w-full">
          <GlassCard emoji="🇪🇬🇯🇴" icon={Landmark} title="الريادة الوطنية" desc="استلهام نماذج كالقانون المصري والأردني في إنشاء مجالس قومية لمراقبة الإعفاءات والضمانات." isActive={isActive} delay="delay-500" className="flex-1" />
          <GlassCard emoji="🚨" icon={ShieldAlert} title="بروتوكولات الأزمات" desc="الضغط لتفعيل المادة ١١ من الاتفاقية لإلزام أطراف النزاع بإنقاذ ذوي الإعاقة وقت الكوارث." isActive={isActive} delay="delay-600" className="flex-1 border-red-500/30 bg-red-500/5 hover:border-red-500/60" />
        </div>
      </div>
    </div>
  </div>
);

// --- Slide 6: Deep Dive 1 ---
const Slide6 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" />
    <Header centerText="تحليل مفصل 🔍" rightText="06" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-row items-center px-[5.2%] gap-[6%]">
      <div className="w-[35%] flex flex-col gap-[clamp(20px,2.5vw,40px)]">
        <div style={glassStyle} className={`hover-glass p-[clamp(20px,2.5vw,40px)] rounded-3xl flex items-center gap-[6%] ${isActive ? 'anim-right delay-200' : 'opacity-0'}`}>
          <div className="w-[20%] flex justify-center text-[clamp(32px,3.5vw,56px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">١</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold">الحقوق المدنية والسياسية 🗳️</div>
        </div>
        <div style={glassStyle} className={`hover-glass p-[clamp(20px,2.5vw,40px)] rounded-3xl flex items-center gap-[6%] ${isActive ? 'anim-right delay-300' : 'opacity-0'}`}>
          <div className="w-[20%] flex justify-center text-[clamp(32px,3.5vw,56px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">٢</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold">التمكين الاقتصادي والتعليمي 🎓</div>
        </div>
        <div style={glassStyle} className={`hover-glass p-[clamp(20px,2.5vw,40px)] rounded-3xl flex items-center gap-[6%] ${isActive ? 'anim-right delay-400' : 'opacity-0'}`}>
          <div className="w-[20%] flex justify-center text-[clamp(32px,3.5vw,56px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">٣</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold">الاعتراف بالأهلية القانونية 📑</div>
        </div>
      </div>
      
      <div className="w-[65%] flex flex-col">
        <div className={`inline-block bg-[#D2FF55]/10 border border-[#D2FF55]/30 text-[#D2FF55] px-4 py-2 rounded-full w-max mb-6 font-bold ${isActive ? 'anim-down delay-100' : 'opacity-0'}`}>تحليل منهجي</div>
        <h2 className={`text-[clamp(40px,6vw,95px)] tracking-tight leading-[1.1] font-extrabold mb-[5%] ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          منظومة الحقوق المتكاملة 🧩
        </h2>
        <p className={`text-[clamp(18px,1.6vw,30px)] opacity-95 leading-[1.9] font-medium text-justify bg-white/5 p-8 rounded-3xl border border-white/10 ${isActive ? 'anim-up delay-500' : 'opacity-0'}`}>
          الخطأ الشائع هو حصر حقوق الأشخاص ذوي الإعاقة في زاوية الرعاية الطبية 🏥. في الواقع، يمتد نطاق الحقوق ليشمل طيفاً متكاملاً يبدأ بـ <strong className="text-[#D2FF55]">الحقوق المدنية</strong> التي تضمن الحق في الحياة، الخصوصية، وتأسيس أسرة 👨‍👩‍👧‍👦.
          <br/><br/>
          وتكتمل الدائرة بـ <strong className="text-blue-400">الحقوق السياسية</strong> التي تضمن المشاركة النشطة في صنع القرار. وفي صميم ذلك يأتي <strong className="text-purple-400">التمكين الاقتصادي</strong> عبر توفير بيئة عمل مُيسرة 💼 تكسر دائرة التهميش المالي.
        </p>
      </div>
    </div>
  </div>
);

// --- Slide 7: Timeline ---
const Slide7 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" />
    <Header centerText="مراحل العمل 🚀" rightText="07" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] px-[5.2%] pb-[8%]">
      <h2 className={`text-[clamp(36px,5.5vw,85px)] font-extrabold mb-[6%] text-center ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        مراحل التنفيذ المؤسسي والتشريعي 📈
      </h2>
      <div className="flex-1 flex flex-row gap-[3%] items-stretch">
        <GlassCard emoji="🌐" icon={Globe} title="الاعتراف الدولي" desc="اعتماد الاتفاقية الأممية (2006) كمرجع ملزم ينهي عصر الوصاية." isActive={isActive} delay="delay-200" className="w-[23%] overflow-hidden relative group">
          <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">1</div>
        </GlassCard>
        <GlassCard emoji="🗺️" icon={FileText} title="المواثيق الإقليمية" desc="تطويع القوانين الدولية لتناسب السياقات الثقافية للمنطقة العربية والأفريقية." isActive={isActive} delay="delay-300" className="w-[23%] overflow-hidden relative group">
          <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">2</div>
        </GlassCard>
        <GlassCard emoji="⚖️" icon={BookOpen} title="التشريع الوطني" desc="سن قوانين محلية تفصيلية مصحوبة بآليات عقاب رادعة للمخالفين لضمان الجدية." isActive={isActive} delay="delay-400" className="w-[23%] overflow-hidden relative group">
          <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">3</div>
        </GlassCard>
        <GlassCard emoji="✅" icon={CheckCircle} title="التطبيق العملي" desc="التغيير الملموس: دمج التعليم، تعديل البنية التحتية، والمراقبة الصارمة للمؤسسات." isActive={isActive} delay="delay-500" className="w-[23%] overflow-hidden relative group">
          <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">4</div>
        </GlassCard>
      </div>
    </div>
  </div>
);

// --- Slide 8: Impact & Results ---
const Slide8 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" />
    <Header centerText="النتائج والتطلعات 🎯" rightText="08" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] items-center justify-center px-[5.2%] pb-[6%]">
      <h2 className={`text-[clamp(36px,5.5vw,85px)] font-extrabold mb-[4%] text-center ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        مؤشرات الأداء الرئيسية 📊
      </h2>
      <div className="w-[90%] h-[75%] grid grid-cols-2 grid-rows-2 gap-[3%]">
        <GlassCard isActive={isActive} delay="delay-200" className="items-center text-center justify-center !p-6 hover:border-[#D2FF55]/50">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] leading-none mb-4 pulse-glow">5%</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2">حصة التوظيف الإلزامية 💼</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80">الحد الأدنى لضمان الاستدامة المالية والتمكين الاقتصادي الحقيقي.</div>
        </GlassCard>
        <GlassCard isActive={isActive} delay="delay-300" className="items-center text-center justify-center !p-6 hover:border-blue-400/50">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] leading-none mb-4 pulse-glow">100%</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2">إعفاءات شاملة 🚘</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80">تسهيلات ضريبية وجمركية كاملة للأجهزة التعويضية ووسائل النقل.</div>
        </GlassCard>
        <GlassCard isActive={isActive} delay="delay-400" className="items-center text-center justify-center !p-6 hover:border-purple-400/50">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] leading-none mb-4 pulse-glow">2030</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2">الرؤية المستقبلية 🔭</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80">الأفق الزمني لتحقيق التنمية المستدامة التي لا تترك أحداً خلف الركب.</div>
        </GlassCard>
        <GlassCard isActive={isActive} delay="delay-500" className="items-center text-center justify-center !p-6 border-red-500/20 hover:border-red-500/60 bg-red-500/5">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-red-400 leading-none mb-4 pulse-glow-red">11</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2 text-red-100">بند الحماية الدولية 🚨</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80 text-red-100/80">المادة الطارئة الواجب تفعيلها فوراً لإنقاذ الأرواح وقت النزاعات والحروب.</div>
        </GlassCard>
      </div>
    </div>
  </div>
);

// --- Slide 9: Key Quote ---
const Slide9 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex items-center justify-center">
    <VideoBackground url="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" />
    <div className={`relative z-10 w-full max-w-[85%] flex flex-col items-center text-center gap-[clamp(24px,3vw,50px)] ${isActive ? 'anim-scale delay-200' : 'opacity-0 scale-90'}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-[#D2FF55]/20 blur-3xl rounded-full animate-pulse"></div>
        <Quote className="w-[clamp(60px,8vw,120px)] h-[clamp(60px,8vw,120px)] text-[#D2FF55] opacity-90 relative z-10 anim-float" />
      </div>
      <h2 className="text-[clamp(38px,5.5vw,90px)] tracking-tight leading-[1.4] font-black drop-shadow-2xl">
        «إن توفير الحماية القانونية للأشخاص ذوي الإعاقة ليس ترفاً أو مِنّة، بل هو <span className="text-[#D2FF55]">التزام أخلاقي</span> يعكس جوهر إنسانيتنا، واستحقاق قانوني لا يسقط بالتقادم.» ✨
      </h2>
      <div className="w-32 h-2 bg-gradient-to-r from-transparent via-[#D2FF55] to-transparent mt-4 rounded-full opacity-80"></div>
    </div>
  </div>
);

// --- Slide 10: Conclusion (Redesigned Layout) ---
const Slide10 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" />
    <Header centerText="الخاتمة 🏁" rightText="10" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-[5.2%] pt-[4%]">
      {/* Top Centered Section */}
      <div className="text-center w-full max-w-5xl mx-auto mb-[6%]">
        <h2 className={`text-[clamp(40px,6vw,95px)] tracking-tight font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          الخاتمة والخطوات القادمة 🚀
        </h2>
        <p className={`text-[clamp(18px,1.6vw,30px)] opacity-95 leading-[1.8] font-medium text-center ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          يجب أن تتضافر الجهود التشريعية الصارمة مع حملات الوعي المجتمعي العميق لضمان بناء بيئة حضارية خالية من العوائق المادية والنفسية، تحترم الاختلاف وتثمن القدرات 🌟.
        </p>
      </div>
      
      {/* Bottom Section: 2x2 Perfectly Spaced Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-[3%] w-full max-w-7xl h-[45%]">
        {[
          { icon: Building2, emoji: "🏢", text: "التطبيق الفوري لمعايير التصميم الشامل والهندسي" },
          { icon: Megaphone, emoji: "📣", text: "تغليظ العقوبات على كافة أشكال التمييز الوظيفي" },
          { icon: Heart, emoji: "❤️", text: "تأمين ممرات إنسانية للمساعدة وقت النزاعات" },
          { icon: Activity, emoji: "💻", text: "إدماج التكنولوجيا المساعدة بقوة في مراحل التعليم" }
        ].map((item, idx) => (
          <div 
            key={idx} 
            style={glassStyle} 
            className={`hover-glass flex items-center justify-between gap-[4%] p-[clamp(20px,2vw,36px)] rounded-3xl cursor-default ${isActive ? `anim-up delay-${(idx+3)*100}` : 'opacity-0 translate-y-12'}`}
          >
            <div className="flex items-center gap-[5%] flex-1">
              <div className="bg-white/10 p-[clamp(12px,1.2vw,20px)] rounded-2xl shadow-inner border border-white/5 shrink-0">
                <item.icon className="w-[clamp(32px,3.5vw,48px)] h-[clamp(32px,3.5vw,48px)] text-[#D2FF55] anim-float" />
              </div>
              <span className="text-[clamp(18px,1.6vw,28px)] font-bold flex-1 leading-relaxed">{item.text}</span>
            </div>
            <span className="text-[clamp(32px,3.5vw,50px)] opacity-90 drop-shadow-lg shrink-0">{item.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// --- App Root Component ---

export default function App() {
  const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(() => setCurrentSlide(p => Math.min(p + 1, slides.length - 1)), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide(p => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['ArrowLeft', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); nextSlide(); }
      if (['ArrowRight', 'ArrowUp'].includes(e.key)) { e.preventDefault(); prevSlide(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    const handleMouseMove = () => {
      setControlsVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setControlsVisible(false), 3000);
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&family=Tajawal:wght@400;500;700;800;900&display=swap');
        body, html { margin: 0; padding: 0; background: #000; overflow: hidden; font-family: 'Tajawal', sans-serif; }
        
        /* Interactive Enhancements */
        .hover-glass:hover {
          transform: translateY(-8px) scale(1.02);
          background: rgba(255,255,255,0.12) !important;
          border-color: rgba(255,255,255,0.4) !important;
          box-shadow: 0 15px 40px -5px rgba(0,0,0,0.4), 0 0 20px rgba(210,255,85,0.1);
        }

        /* Continuous Animations */
        @keyframes float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-12px); } 
        }
        .anim-float { animation: float 4s ease-in-out infinite; }
        
        @keyframes glow { 
          0%, 100% { text-shadow: 0 0 10px rgba(210,255,85,0.2); } 
          50% { text-shadow: 0 0 30px rgba(210,255,85,0.8); } 
        }
        .pulse-glow { animation: glow 3s ease-in-out infinite; }

        @keyframes glow-red { 
          0%, 100% { text-shadow: 0 0 10px rgba(248,113,113,0.2); } 
          50% { text-shadow: 0 0 30px rgba(248,113,113,0.8); } 
        }
        .pulse-glow-red { animation: glow-red 3s ease-in-out infinite; }
        
        /* Keyframes for Entrances */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRightRTL { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInLeftRTL { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        
        .anim-up { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-down { animation: fadeInDown 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-right { animation: fadeInRightRTL 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-left { animation: fadeInLeftRTL 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-zoom { animation: zoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-scale { animation: zoomIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        /* Delays */
        .delay-100 { animation-delay: 100ms; } .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; } .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; } .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; } .delay-800 { animation-delay: 800ms; }
      `}} />
      
      {/* Perspective wrapper for 3D transitions */}
      <div dir="rtl" className="relative w-screen h-screen overflow-hidden bg-[#050505] text-white cursor-default" style={{ perspective: '1200px' }}>
        {slides.map((SlideComponent, index) => {
          const isActive = index === currentSlide;
          const isPast = index < currentSlide;
          const isFuture = index > currentSlide;

          // Cinematic 3D Transitions
          let transform = 'translateX(0) scale(1) rotateY(0) translateZ(0)';
          let opacity = '1';
          let filter = 'blur(0px)';
          let visibility = 'visible';
          
          if (isPast) {
            transform = 'translateX(30%) scale(0.85) rotateY(-12deg) translateZ(-150px)';
            opacity = '0';
            filter = 'blur(15px)';
            // Hide fully after transition to save resources
            if(currentSlide - index > 1) visibility = 'hidden'; 
          } else if (isFuture) {
            transform = 'translateX(-30%) scale(0.85) rotateY(12deg) translateZ(-150px)';
            opacity = '0';
            filter = 'blur(15px)';
            if(index - currentSlide > 1) visibility = 'hidden';
          }

          return (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.3,1)]"
              style={{
                transform,
                opacity,
                filter,
                visibility,
                zIndex: isActive ? 10 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <SlideComponent isActive={isActive} />
            </div>
          );
        })}

        {/* Cinematic Controls */}
        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center h-[64px] px-8 rounded-full z-50 transition-all duration-500 hover:bg-white/20 hover:border-white/30 ${controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={glassStyle}>
          <div className="text-[15px] text-white/70 font-bold tabular-nums min-w-[50px] text-center font-sans tracking-widest">
            {currentSlide + 1} / {slides.length}
          </div>
          <div className="mx-6 flex items-center gap-3">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`h-[4px] rounded-full transition-all duration-700 cursor-pointer hover:h-[8px] hover:bg-white/60 ${idx === currentSlide ? 'w-[40px] bg-[#D2FF55] shadow-[0_0_10px_rgba(210,255,85,0.6)]' : 'w-[8px] bg-white/20'}`} 
              />
            ))}
          </div>
          <div className="flex items-center gap-3 border-r border-white/10 pr-4">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 hover:scale-110 disabled:opacity-20 disabled:hover:scale-100 disabled:hover:bg-transparent transition-all">
              <ChevronRight size={24} />
            </button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 hover:scale-110 disabled:opacity-20 disabled:hover:scale-100 disabled:hover:bg-transparent transition-all">
              <ChevronLeft size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
