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
<video ref={videoRef} className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 mix-blend-screen" autoPlay
  loop muted playsInline />
);
};

const Header = ({ centerText, rightText, hideRight, isActive }) => (
<div className={`absolute top-[4%] left-[5.2%] right-[5.2%] flex justify-between items-center z-20 transition-all
  duration-1000 delay-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8' }`}>
  <div className="flex-1 flex justify-start group">
    <svg width="129" height="40" viewBox="0 0 129 40" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="transform scale-125 origin-right transition-transform group-hover:scale-150">
      <rect width="40" height="40" rx="8" fill="white" fillOpacity="0.1" stroke="white" strokeOpacity="0.3" />
      <path d="M12 20H28M20 12V28" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <text x="50" y="26" fill="white" fontSize="18" fontWeight="800" letterSpacing="-0.02em"
        fontFamily="Tajawal">مساواة</text>
    </svg>
  </div>
  {centerText && (
  <div
    className="flex-1 flex justify-center text-[clamp(18px,1.6vw,28px)] opacity-90 font-bold tracking-wide drop-shadow-md">
    {centerText}
  </div>
  )}
  <div
    className="flex-1 flex justify-end text-[clamp(18px,1.6vw,28px)] opacity-90 font-bold tracking-wide drop-shadow-md">
    {!hideRight && rightText}
  </div>
</div>
);

// Reusable animated interactive card component
const GlassCard = ({ icon: Icon, title, desc, delay, isActive, className = "", children, emoji }) => (
<div style={glassStyle} className={`hover-glass rounded-3xl p-[clamp(28px,3vw,56px)] flex flex-col justify-end
  transition-all ${isActive ? `anim-up ${delay}` : 'opacity-0 translate-y-12' } ${className}`}>
  {Icon &&
  <Icon className="text-[#D2FF55] mb-[6%] w-[clamp(48px,4vw,64px)] h-[clamp(48px,4vw,64px)] stroke-[1.5] anim-float" />}
  {children}
  {title && <h3 className="text-[clamp(24px,2.2vw,42px)] font-bold mb-4 flex items-center gap-3">{title} <span
      className="text-[1.2em]">{emoji}</span></h3>}
  {desc && <p className="text-[clamp(18px,1.5vw,26px)] text-white/95 leading-[1.8] font-medium">{desc}</p>}
</div>
);

// --- Slide 1: Cover ---
const Slide1 = ({ isActive }) => (
<div className="relative w-full h-full text-white">
  <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" />
  <Header rightText="عرض تقديمي 🎬" hideRight={false} isActive={isActive} />

  <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%] -mt-[3%]">
    <div className={`inline-flex items-center gap-3 bg-white/10 px-5 py-3 rounded-full w-max mb-8 border border-white/20
      backdrop-blur-md ${isActive ? 'anim-down delay-200' : 'opacity-0' }`}>
      <Sparkles className="w-6 h-6 text-[#D2FF55]" />
      <span className="text-[clamp(16px,1.2vw,24px)] font-bold tracking-wide">حقوق الإنسان</span>
    </div>
    <h1 className={`text-[clamp(50px,8vw,130px)] tracking-tight leading-[1.1] font-extrabold max-w-6xl drop-shadow-lg
      ${isActive ? 'anim-up delay-100' : 'opacity-0' }`}>
      حقوق ذوي الإعاقة: <br /> رؤية عالمية متكاملة 🌍
    </h1>
    <p className={`text-[clamp(28px,3vw,56px)] opacity-95 mt-[3%] max-w-5xl font-medium leading-[1.6] drop-shadow-md
      ${isActive ? 'anim-up delay-300' : 'opacity-0' }`}>
      استعراض تحليلي للأطر الدينية 🕌، القانونية ⚖️، والإنسانية 🤝 التي تضمن الكرامة وتكافؤ الفرص.
    </p>
    <div className={`text-[clamp(20px,1.8vw,32px)] opacity-85 mt-[5%] flex items-center gap-4 font-bold ${isActive
      ? 'anim-up delay-500' : 'opacity-0' }`}>
      <div className="w-16 h-[4px] bg-[#D2FF55] rounded-full"></div>
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
    <h2 className={`text-[clamp(45px,6vw,95px)] tracking-tight leading-[1.1] font-extrabold mb-[4%] drop-shadow-lg
      ${isActive ? 'anim-up delay-100' : 'opacity-0' }`}>
      من مرحلة الإحسان 🤲 <br className="hidden md:block" /> إلى عصر المساواة والحقوق ⚖️
    </h2>

    <div className="flex flex-row mt-[2%] gap-[5%] items-stretch h-[48%]">
      <div className={`flex-[0_0_24%] flex flex-col justify-center p-8 rounded-3xl bg-white/5 border border-white/10
        hover-glass ${isActive ? 'anim-right delay-300' : 'opacity-0' }`}>
        <div className="text-[clamp(65px,8vw,120px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">2006</div>
        <div className="text-[clamp(20px,1.8vw,32px)] opacity-95 mt-[8%] leading-[1.8] font-bold">
          العام الفاصل الذي شهد إقرار اتفاقية الأمم المتحدة كدستور عالمي ملزم 📜.
        </div>
      </div>

      <div className={`flex-[0_0_42%] flex items-center ${isActive ? 'anim-up delay-400' : 'opacity-0' }`}>
        <p className="text-[clamp(22px,1.8vw,36px)] opacity-100 leading-[1.9] font-bold text-justify drop-shadow-sm">
          إن قضية الأشخاص ذوي الإعاقة لم تعد مجرد مسألة هامشية، بل أصبحت معياراً أساسياً لتقدم الأمم ومدى احترامها لحقوق
          الإنسان 🌟. لقد شهد العالم تحولاً جذرياً في النظرة إليهم؛ من مجرد فئة تتلقى التعاطف إلى نهج حقوقي أصيل يستند
          للدمج الشامل 🤝.
        </p>
      </div>

      <div className={`flex-[0_0_24%] flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10
        hover-glass ${isActive ? 'anim-left delay-500' : 'opacity-0' }`}>
        <div>
          <div className="text-[clamp(65px,8vw,120px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">5%</div>
          <div className="text-[clamp(20px,1.8vw,32px)] opacity-95 mt-[8%] leading-[1.8] font-bold">
            نسبة التوظيف الدنيا المخصصة إلزامياً في القوانين 💼.
          </div>
        </div>
        <svg className="w-full h-[80px] mt-[10%] anim-float" viewBox="0 0 100 30" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(210,255,85,0.1)" />
              <stop offset="100%" stopColor="#D2FF55" />
            </linearGradient>
          </defs>
          <path d="M0 25 L20 18 L40 22 L60 8 L80 12 L100 2" fill="none" stroke="url(#lineGrad)" strokeWidth="4"
            vectorEffect="non-scaling-stroke" />
          <circle cx="100" cy="2" r="5" fill="#fff" className="pulse-glow" />
        </svg>
      </div>
    </div>
  </div>
</div>
);

// --- Slide 3: The Problem/Challenge (REDESIGNED as requested) ---
const Slide3 = ({ isActive }) => (
<div className="relative w-full h-full text-white">
  <VideoBackground url="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" />
  <Header centerText="التحديات والمشكلات 🚧" rightText="03" isActive={isActive} />

  <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%] pt-[6%]">
    <div className="text-center mb-[4%]">
      <h2 className={`text-[clamp(50px,6.5vw,100px)] tracking-tight leading-[1.1] font-extrabold drop-shadow-lg
        ${isActive ? 'anim-up delay-100' : 'opacity-0' }`}>
        الفجوة بين النص والواقع 📉
      </h2>
    </div>

    {/* New Layout Without Center Icon - 2 Large Grid Cards */}
    <div className="grid grid-cols-2 gap-[5%] w-full h-[55%]">

      {/* Card 1 */}
      <div style={glassStyle} className={`hover-glass rounded-[2rem] p-[clamp(32px,3.5vw,56px)] flex flex-col
        justify-center border-t-4 border-t-red-400 ${isActive ? 'anim-right delay-300' : 'opacity-0' }`}>
        <h3 className="text-[clamp(32px,3vw,50px)] font-black mb-6 text-red-300 flex items-center gap-4">
          <ShieldAlert className="w-[clamp(48px,4.5vw,72px)] h-[clamp(48px,4.5vw,72px)]" />
          تحديات التطبيق
        </h3>
        <p className="text-[clamp(24px,1.9vw,36px)] opacity-95 leading-[1.9] font-bold text-justify">
          رغم التقدم التشريعي، تتمثل العقبة الكبرى في الفجوة الشاسعة بين النصوص القانونية المثالية والتطبيق العملي.
          تعاني هذه الفئة باستمرار من ضعف إمكانية الوصول في البنية التحتية 🛑، بالإضافة إلى التهميش المجتمعي العميق.
        </p>
      </div>

      {/* Card 2 */}
      <div style={glassStyle} className={`hover-glass rounded-[2rem] p-[clamp(32px,3.5vw,56px)] flex flex-col
        justify-center border-t-4 border-t-red-600 bg-red-500/5 ${isActive ? 'anim-left delay-400' : 'opacity-0' }`}>
        <h3 className="text-[clamp(32px,3vw,50px)] font-black mb-6 text-red-400 flex items-center gap-4">
          <TriangleAlert className="w-[clamp(48px,4.5vw,72px)] h-[clamp(48px,4.5vw,72px)]" />
          الكوارث والنزاعات
        </h3>
        <p className="text-[clamp(24px,1.9vw,36px)] opacity-95 leading-[1.9] font-bold text-justify">
          تتفاقم التحديات بشكل مأساوي في ظل النزاعات المسلحة. ففي السياق الفلسطيني المستمر (قطاع غزة 🇵🇸)، تواجه هذه
          الفئة استحالة في الإخلاء الآمن تحت القصف 💣، مما يكشف عن تجاهل صارخ وواضح للمادة ١١ الدولية.
        </p>
      </div>

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
    <div className="text-center w-full max-w-6xl mx-auto mb-[6%]">
      <h2 className={`text-[clamp(50px,6vw,100px)] tracking-tight leading-[1.1] font-extrabold mb-[4%] drop-shadow-lg
        ${isActive ? 'anim-up delay-100' : 'opacity-0' }`}>
        منهجية الحلول الشاملة 🎯
      </h2>
      <p className={`text-[clamp(24px,1.8vw,36px)] opacity-95 leading-[1.9] font-bold ${isActive ? 'anim-up delay-200'
        : 'opacity-0' }`}>
        يتطلب التغيير الحقيقي مقاربة استراتيجية متكاملة تتجاوز الوعود، لبناء مؤسسات رقابية قوية قادرة على تحويل الحقوق
        المكتوبة إلى واقع مُعاش وملموس 🌟.
      </p>
    </div>

    <div className="grid grid-cols-3 gap-[4%] w-full mt-auto mb-[8%] h-[40%]">
      <GlassCard icon={Scale} emoji="⚖️" title="تشريعات ملزمة"
        desc="إقرار وطني صارم يفرض نسبة التوظيف، وتوفير إعفاءات ضريبية متكاملة تجرم التمييز بكافة أشكاله."
        isActive={isActive} delay="delay-300"
        className="text-center items-center justify-center border-t-4 border-t-[#D2FF55]" />
      <GlassCard icon={Building2} emoji="🏗️" title="التصميم الشامل"
        desc="الإلزام القانوني بتطبيق معايير 'إمكانية الوصول' في المباني العامة، النقل، والمنصات الرقمية."
        isActive={isActive} delay="delay-400"
        className="text-center items-center justify-center border-t-4 border-t-blue-400" />
      <GlassCard icon={Users} emoji="🤝" title="توعية مجتمعية"
        desc="إطلاق استراتيجيات إعلامية قوية لتغيير النظرة النمطية وتعزيز ثقافة الدمج في المدارس والعمل."
        isActive={isActive} delay="delay-500"
        className="text-center items-center justify-center border-t-4 border-t-purple-400" />
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
      <h2 className={`text-[clamp(45px,6vw,95px)] tracking-tight leading-[1.1] font-extrabold drop-shadow-lg ${isActive
        ? 'anim-up delay-100' : 'opacity-0' }`}>
        الركائز الأساسية للدمج والكرامة 🏛️
      </h2>
    </div>

    <div className="flex-1 flex flex-col gap-[3%]">
      <div className="flex-[1.2] flex gap-[3%] w-full">
        <GlassCard emoji="🕌" icon={HeartHandshake} title="الرؤية الدينية"
          desc="تكريس كرامة الإنسان بغض النظر عن القيود، واعتبار العمل الفاعل والتقوى هما المعيار الحقيقي."
          isActive={isActive} delay="delay-200" className="flex-1" />
        <GlassCard emoji="🌍" icon={Globe} title="المواثيق الدولية"
          desc="بناء استراتيجيات قارية طويلة الأمد لتوحيد التشريعات كما في العقد العربي والأوروبي." isActive={isActive}
          delay="delay-300" className="flex-1" />
        <GlassCard emoji="🛡️" icon={Gavel} title="الحقوق الشاملة"
          desc="ضمان التمكين السياسي (الترشح)، التمكين الاقتصادي، والضمان الاجتماعي العادل." isActive={isActive}
          delay="delay-400" className="flex-1" />
      </div>

      <div className="flex-1 flex gap-[3%] w-full">
        <GlassCard emoji="🇪🇬🇯🇴" icon={Landmark} title="الريادة الوطنية"
          desc="استلهام نماذج كالقانون المصري والأردني في إنشاء مجالس قومية لمراقبة تطبيق الإعفاءات."
          isActive={isActive} delay="delay-500" className="flex-1" />
        <GlassCard emoji="🚨" icon={ShieldAlert} title="بروتوكولات الأزمات"
          desc="الضغط لتفعيل المادة ١١ من الاتفاقية لإلزام أطراف النزاع بإنقاذ ذوي الإعاقة وقت الكوارث."
          isActive={isActive} delay="delay-600" className="flex-1 border-red-500/30 bg-red-500/5" />
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
    <div className="w-[40%] flex flex-col gap-[clamp(24px,3vw,48px)]">
      <div style={glassStyle} className={`hover-glass p-[clamp(24px,3vw,48px)] rounded-3xl flex items-center gap-[6%]
        ${isActive ? 'anim-right delay-200' : 'opacity-0' }`}>
        <div
          className="w-[15%] flex justify-center text-[clamp(40px,4.5vw,70px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">
          ١</div>
        <div className="text-[clamp(24px,2.2vw,38px)] font-bold">الحقوق المدنية والسياسية 🗳️</div>
      </div>
      <div style={glassStyle} className={`hover-glass p-[clamp(24px,3vw,48px)] rounded-3xl flex items-center gap-[6%]
        ${isActive ? 'anim-right delay-300' : 'opacity-0' }`}>
        <div
          className="w-[15%] flex justify-center text-[clamp(40px,4.5vw,70px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">
          ٢</div>
        <div className="text-[clamp(24px,2.2vw,38px)] font-bold">التمكين الاقتصادي والتعليمي 🎓</div>
      </div>
      <div style={glassStyle} className={`hover-glass p-[clamp(24px,3vw,48px)] rounded-3xl flex items-center gap-[6%]
        ${isActive ? 'anim-right delay-400' : 'opacity-0' }`}>
        <div
          className="w-[15%] flex justify-center text-[clamp(40px,4.5vw,70px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">
          ٣</div>
        <div className="text-[clamp(24px,2.2vw,38px)] font-bold">الاعتراف بالأهلية القانونية 📑</div>
      </div>
    </div>

    <div className="w-[60%] flex flex-col pl-4">
      <div className={`inline-block bg-[#D2FF55]/10 border border-[#D2FF55]/30 text-[#D2FF55] px-5 py-2 rounded-full
        w-max mb-6 font-bold text-[clamp(18px,1.6vw,28px)] ${isActive ? 'anim-down delay-100' : 'opacity-0' }`}>تحليل
        منهجي</div>
      <h2 className={`text-[clamp(45px,6vw,95px)] tracking-tight leading-[1.1] font-extrabold mb-[5%] drop-shadow-lg
        ${isActive ? 'anim-up delay-200' : 'opacity-0' }`}>
        منظومة الحقوق المتكاملة 🧩
      </h2>
      <p className={`text-[clamp(24px,1.9vw,36px)] opacity-95 leading-[1.9] font-bold text-justify bg-white/5 p-10
        rounded-3xl border border-white/10 ${isActive ? 'anim-up delay-500' : 'opacity-0' }`}>
        الخطأ الشائع هو حصر حقوق الأشخاص ذوي الإعاقة في زاوية الرعاية الطبية 🏥. في الواقع، يمتد نطاق الحقوق ليشمل طيفاً
        متكاملاً يبدأ بـ <strong className="text-[#D2FF55]">الحقوق المدنية</strong> التي تضمن الحق في الحياة، الخصوصية،
        وتأسيس أسرة 👨‍👩‍👧‍👦.
        <br /><br />
        وتكتمل الدائرة بـ <strong className="text-blue-400">الحقوق السياسية</strong> التي تضمن المشاركة النشطة في صنع
        القرار. وفي صميم ذلك يأتي <strong className="text-purple-400">التمكين الاقتصادي</strong> عبر توفير بيئة عمل
        مُيسرة 💼 تكسر دائرة التهميش.
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
    <h2 className={`text-[clamp(50px,6.5vw,100px)] font-extrabold mb-[6%] text-center drop-shadow-lg ${isActive
      ? 'anim-up delay-100' : 'opacity-0' }`}>
      مراحل التنفيذ المؤسسي والتشريعي 📈
    </h2>
    <div className="flex-1 flex flex-row gap-[3%] items-stretch">
      <GlassCard emoji="🌐" icon={Globe} title="الاعتراف الدولي"
        desc="اعتماد الاتفاقية الأممية (2006) كمرجع ملزم ينهي الوصاية." isActive={isActive} delay="delay-200"
        className="w-[23%] overflow-hidden relative group">
        <div
          className="text-[200px] font-black opacity-5 absolute -top-12 -right-12 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">
          1</div>
      </GlassCard>
      <GlassCard emoji="🗺️" icon={FileText} title="المواثيق الإقليمية"
        desc="تطويع القوانين الدولية لتناسب السياقات الثقافية للمنطقة العربية." isActive={isActive} delay="delay-300"
        className="w-[23%] overflow-hidden relative group">
        <div
          className="text-[200px] font-black opacity-5 absolute -top-12 -right-12 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">
          2</div>
      </GlassCard>
      <GlassCard emoji="⚖️" icon={BookOpen} title="التشريع الوطني"
        desc="سن قوانين محلية تفصيلية مصحوبة بآليات عقاب رادعة وحازمة." isActive={isActive} delay="delay-400"
        className="w-[23%] overflow-hidden relative group">
        <div
          className="text-[200px] font-black opacity-5 absolute -top-12 -right-12 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">
          3</div>
      </GlassCard>
      <GlassCard emoji="✅" icon={CheckCircle} title="التطبيق العملي"
        desc="التغيير الملموس: دمج التعليم والمراقبة الصارمة للمؤسسات كافة." isActive={isActive} delay="delay-500"
        className="w-[23%] overflow-hidden relative group">
        <div
          className="text-[200px] font-black opacity-5 absolute -top-12 -right-12 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">
          4</div>
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
    <h2 className={`text-[clamp(50px,6.5vw,100px)] font-extrabold mb-[5%] text-center drop-shadow-lg ${isActive
      ? 'anim-up delay-100' : 'opacity-0' }`}>
      مؤشرات الأداء الرئيسية 📊
    </h2>
    <div className="w-[95%] h-[75%] grid grid-cols-2 grid-rows-2 gap-[4%]">
      <GlassCard isActive={isActive} delay="delay-200"
        className="items-center text-center justify-center !p-8 hover:border-[#D2FF55]/50">
        <div className="text-[clamp(80px,9vw,160px)] font-black text-[#D2FF55] leading-none mb-6 pulse-glow">5%</div>
        <div className="text-[clamp(26px,2vw,40px)] font-bold mb-3">حصة التوظيف الإلزامية 💼</div>
        <div className="text-[clamp(20px,1.6vw,30px)] opacity-90 font-medium">الحد الأدنى لضمان الاستدامة المالية
          والتمكين الحقيقي.</div>
      </GlassCard>
      <GlassCard isActive={isActive} delay="delay-300"
        className="items-center text-center justify-center !p-8 hover:border-blue-400/50">
        <div className="text-[clamp(80px,9vw,160px)] font-black text-[#D2FF55] leading-none mb-6 pulse-glow">100%</div>
        <div className="text-[clamp(26px,2vw,40px)] font-bold mb-3">إعفاءات شاملة 🚘</div>
        <div className="text-[clamp(20px,1.6vw,30px)] opacity-90 font-medium">تسهيلات جمركية كاملة للأجهزة التعويضية
          ووسائل النقل.</div>
      </GlassCard>
      <GlassCard isActive={isActive} delay="delay-400"
        className="items-center text-center justify-center !p-8 hover:border-purple-400/50">
        <div className="text-[clamp(80px,9vw,160px)] font-black text-[#D2FF55] leading-none mb-6 pulse-glow">2030</div>
        <div className="text-[clamp(26px,2vw,40px)] font-bold mb-3">الرؤية المستقبلية 🔭</div>
        <div className="text-[clamp(20px,1.6vw,30px)] opacity-90 font-medium">الأفق الزمني لتحقيق التنمية التي لا تترك
          أحداً خلف الركب.</div>
      </GlassCard>
      <GlassCard isActive={isActive} delay="delay-500"
        className="items-center text-center justify-center !p-8 border-red-500/30 hover:border-red-500/60 bg-red-500/10">
        <div className="text-[clamp(80px,9vw,160px)] font-black text-red-400 leading-none mb-6 pulse-glow-red">11</div>
        <div className="text-[clamp(26px,2vw,40px)] font-bold mb-3 text-red-100">بند الحماية الدولية 🚨</div>
        <div className="text-[clamp(20px,1.6vw,30px)] opacity-90 font-medium text-red-100/90">المادة الواجب تفعيلها
          فوراً لإنقاذ الأرواح وقت الحروب والكوارث.</div>
      </GlassCard>
    </div>
  </div>
</div>
);

// --- Slide 9: Key Quote ---
const Slide9 = ({ isActive }) => (
<div className="relative w-full h-full text-white flex items-center justify-center">
  <VideoBackground url="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" />
  <div className={`relative z-10 w-full max-w-[90%] flex flex-col items-center text-center gap-[clamp(30px,3.5vw,60px)]
    ${isActive ? 'anim-scale delay-200' : 'opacity-0 scale-90' }`}>
    <div className="relative">
      <div className="absolute inset-0 bg-[#D2FF55]/20 blur-3xl rounded-full animate-pulse"></div>
      <Quote
        className="w-[clamp(80px,10vw,150px)] h-[clamp(80px,10vw,150px)] text-[#D2FF55] opacity-90 relative z-10 anim-float" />
    </div>
    <h2 className="text-[clamp(45px,6vw,100px)] tracking-tight leading-[1.4] font-black drop-shadow-2xl px-8">
      «إن توفير الحماية القانونية للأشخاص ذوي الإعاقة ليس ترفاً أو مِنّة، بل هو <span className="text-[#D2FF55]">التزام
        أخلاقي</span> يعكس جوهر إنسانيتنا، واستحقاق قانوني لا يسقط بالتقادم.» ✨
    </h2>
    <div className={`text-[clamp(24px,2vw,36px)] opacity-80 font-bold italic ${isActive ? 'anim-up delay-600' : 'opacity-0'}`}>
      — وثيقة حقوق الإنسان الاستراتيجية
    </div>
  </div>
</div>
);


// --- Slide 10: Recommendations ---
const Slide10 = ({ isActive }) => (
<div className="relative w-full h-full text-white flex flex-col">
  <VideoBackground url="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" />
  <Header centerText="التوصيات 📋" rightText="10" isActive={isActive} />
  <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] px-[5.2%] pb-[6%]">
    <h2 className={`text-[clamp(50px,6.5vw,100px)] font-extrabold mb-[5%] text-center drop-shadow-lg ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
      التوصيات الاستراتيجية النهائية 🎯
    </h2>
    <div className="flex-1 grid grid-cols-2 gap-[4%]">
      <GlassCard emoji="⚖️" icon={Scale} title="التشريع والرقابة"
        desc="إنشاء هيئات وطنية مستقلة لرصد مدى الامتثال للتشريعات، مع صلاحيات تنفيذية رادعة."
        isActive={isActive} delay="delay-200" className="border-t-4 border-t-[#D2FF55]" />
      <GlassCard emoji="🎓" icon={BookOpen} title="التعليم الشامل"
        desc="دمج مبادئ حقوق الإعاقة في المناهج الدراسية من المرحلة الابتدائية وحتى الجامعية."
        isActive={isActive} delay="delay-300" className="border-t-4 border-t-blue-400" />
      <GlassCard emoji="📡" icon={Megaphone} title="الإعلام والتوعية"
        desc="إطلاق حملات إعلامية ممنهجة لتغيير الصورة النمطية وتعزيز ثقافة الدمج الاجتماعي."
        isActive={isActive} delay="delay-400" className="border-t-4 border-t-purple-400" />
      <GlassCard emoji="🌍" icon={Globe} title="التعاون الدولي"
        desc="تعزيز الشراكات الإقليمية والدولية لتبادل أفضل الممارسات وبناء قدرات الكوادر البشرية."
        isActive={isActive} delay="delay-500" className="border-t-4 border-t-green-400" />
    </div>
  </div>
</div>
);

// --- Slide 11: Closing ---
const Slide11 = ({ isActive }) => (
<div className="relative w-full h-full text-white flex items-center justify-center">
  <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" />
  <Header rightText="شكراً 🙏" isActive={isActive} />
  <div className={`relative z-10 flex flex-col items-center text-center gap-8 px-[5.2%] ${isActive ? 'anim-scale delay-200' : 'opacity-0 scale-90'}`}>
    <div className="text-[clamp(80px,12vw,180px)] font-black leading-none text-[#D2FF55] pulse-glow drop-shadow-2xl">
      مساواة
    </div>
    <h2 className="text-[clamp(36px,5vw,80px)] font-bold drop-shadow-lg">
      معاً نبني مجتمعاً أكثر عدلاً وإنصافاً ✨
    </h2>
    <p className="text-[clamp(20px,1.8vw,32px)] opacity-80 font-medium max-w-4xl leading-relaxed">
      إن الكرامة الإنسانية لا تتجزأ، والحقوق لا تُمنح بل تُصان. فلنعمل معاً على ترجمة هذه المبادئ إلى واقع ملموس يُغير حياة ملايين الأشخاص.
    </p>
    <div className="flex items-center gap-4 mt-4">
      <div className="w-20 h-[4px] bg-[#D2FF55] rounded-full"></div>
      <span className="text-[clamp(18px,1.5vw,28px)] font-bold opacity-90">نهاية العرض التقديمي</span>
      <div className="w-20 h-[4px] bg-[#D2FF55] rounded-full"></div>
    </div>
  </div>
</div>
);

// --- Main App ---
const SLIDES = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11];
const TOTAL = SLIDES.length;

export default function App() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const goTo = useCallback((idx) => {
    setCurrent(Math.max(0, Math.min(TOTAL - 1, idx)));
  }, []);

  const handleKey = useCallback((e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1);
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goTo(current - 1);
    if (e.key === 'f' || e.key === 'F') toggleFullscreen();
  }, [current, goTo]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const SlideComponent = SLIDES[current];

  return (
    <div ref={containerRef} className="relative w-screen h-screen overflow-hidden bg-black font-['Tajawal',sans-serif]"
      dir="rtl">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap');
        @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes pulseGlow { 0%,100%{filter:drop-shadow(0 0 8px rgba(210,255,85,0.4))} 50%{filter:drop-shadow(0 0 24px rgba(210,255,85,0.9))} }
        @keyframes pulseGlowRed { 0%,100%{filter:drop-shadow(0 0 8px rgba(239,68,68,0.4))} 50%{filter:drop-shadow(0 0 24px rgba(239,68,68,0.9))} }
        @keyframes animUp { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes animDown { from{opacity:0;transform:translateY(-40px)} to{opacity:1;transform:translateY(0)} }
        @keyframes animLeft { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes animRight { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
        @keyframes animScale { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
        .anim-float { animation: floatY 4s ease-in-out infinite; }
        .pulse-glow { animation: pulseGlow 2.5s ease-in-out infinite; }
        .pulse-glow-red { animation: pulseGlowRed 2.5s ease-in-out infinite; }
        .anim-up { animation: animUp 0.7s cubic-bezier(.22,1,.36,1) both; }
        .anim-down { animation: animDown 0.7s cubic-bezier(.22,1,.36,1) both; }
        .anim-left { animation: animLeft 0.7s cubic-bezier(.22,1,.36,1) both; }
        .anim-right { animation: animRight 0.7s cubic-bezier(.22,1,.36,1) both; }
        .anim-scale { animation: animScale 0.7s cubic-bezier(.22,1,.36,1) both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .hover-glass { transition: all 0.3s ease; }
        .hover-glass:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.15); }
      `}</style>

      <SlideComponent isActive={true} />

      {/* Navigation Controls */}
      <div className="absolute bottom-[3%] left-0 right-0 flex justify-center items-center gap-6 z-30">
        <button id="btn-prev" onClick={() => goTo(current - 1)} disabled={current === 0}
          className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110">
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button key={i} id={`dot-${i}`} onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-3 bg-[#D2FF55]' : 'w-3 h-3 bg-white/30 hover:bg-white/60'}`} />
          ))}
        </div>

        <button id="btn-next" onClick={() => goTo(current + 1)} disabled={current === TOTAL - 1}
          className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110">
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-[4%] left-1/2 -translate-x-1/2 z-30 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-white text-sm font-bold">
        {current + 1} / {TOTAL}
      </div>

      {/* Fullscreen Button */}
      <button id="btn-fullscreen" onClick={toggleFullscreen}
        className="absolute top-[4%] right-[2%] z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110">
        {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
      </button>
    </div>
  );
}
