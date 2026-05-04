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
        <text x="46" y="26" fill="white" fontSize="16" fontWeight="800" letterSpacing="-0.02em" fontFamily="Plus Jakarta Sans">EQUAL</text>
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
  <div style={glassStyle} className={`hover-glass rounded-3xl p-[clamp(20px,2vw,36px)] flex flex-col justify-center transition-all ${isActive ? `anim-up ${delay}` : 'opacity-0 translate-y-12'} ${className}`}>
    {Icon && <Icon className="text-[#D2FF55] mb-[5%] w-[clamp(32px,3vw,48px)] h-[clamp(32px,3vw,48px)] stroke-[1.5] anim-float shrink-0" />}
    {children}
    {title && <h3 className="text-[clamp(16px,1.5vw,26px)] font-bold mb-3 flex items-center gap-2 w-full">{title} <span className="text-[1.2em]">{emoji}</span></h3>}
    {desc && <p className="text-[clamp(13px,1.1vw,18px)] text-white/85 leading-[1.7]">{desc}</p>}
  </div>
);

// --- Slide 1: Cover ---
const Slide1 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" />
    <Header rightText="Presentation 🎬" hideRight={false} isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%] -mt-[3%]">
      <div className={`inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full w-max mb-6 border border-white/20 backdrop-blur-md ${isActive ? 'anim-down delay-200' : 'opacity-0'}`}>
        <Sparkles className="w-5 h-5 text-[#D2FF55]" />
        <span className="text-sm font-bold tracking-wide">Human Rights</span>
      </div>
      <h1 className={`text-[clamp(40px,7vw,110px)] tracking-tight leading-[1.1] font-extrabold max-w-5xl ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        Disability Rights: <br/> A Global Vision 🌍
      </h1>
      <p className={`text-[clamp(22px,2.8vw,52px)] opacity-95 mt-[3%] max-w-4xl font-medium leading-[1.6] ${isActive ? 'anim-up delay-300' : 'opacity-0'}`}>
        An analytical review of the religious 🕌, legal ⚖️, and humanitarian 🤝 frameworks ensuring dignity and equal opportunity.
      </p>
      <div className={`text-[clamp(16px,1.4vw,28px)] opacity-80 mt-[4%] flex items-center gap-4 ${isActive ? 'anim-up delay-500' : 'opacity-0'}`}>
        <div className="w-12 h-[3px] bg-[#D2FF55] rounded-full"></div>
        Strategic Document Overview & Analysis 📄
      </div>
    </div>
  </div>
);

// --- Slide 2: Introduction ---
const Slide2 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" />
    <Header centerText="Introduction 📖" rightText="02" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%]">
      <h2 className={`text-[clamp(32px,5vw,72px)] tracking-tight leading-[1.1] font-extrabold mb-[4%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        From Charity 🤲 <br className="hidden md:block" /> to the Era of Equality & Rights ⚖️
      </h2>
      
      <div className="flex flex-row mt-[2%] gap-[5%] items-stretch h-[45%]">
        <div className={`flex-[0_0_22%] flex flex-col justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover-glass ${isActive ? 'anim-left delay-300' : 'opacity-0'}`}>
          <div className="text-[clamp(48px,6vw,90px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">2006</div>
          <div className="text-[clamp(15px,1.3vw,24px)] opacity-90 mt-[8%] leading-[1.7] font-medium">
            The defining year the UN Convention was established as a binding global constitution 📜.
          </div>
        </div>
        
        <div className={`flex-[0_0_42%] flex items-center ${isActive ? 'anim-up delay-400' : 'opacity-0'}`}>
          <p className="text-[clamp(16px,1.4vw,26px)] opacity-100 leading-[2] font-semibold text-justify">
            The issue of persons with disabilities is no longer a marginal matter, but a fundamental benchmark of a nation's progress and profound respect for human rights 🌟. The world has witnessed a radical shift in perspective; from a group receiving temporary sympathy to a genuine rights-based approach grounded in comprehensive inclusion 🤝.
          </p>
        </div>
        
        <div className={`flex-[0_0_22%] flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 hover-glass ${isActive ? 'anim-right delay-500' : 'opacity-0'}`}>
          <div>
            <div className="text-[clamp(48px,6vw,90px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">5%</div>
            <div className="text-[clamp(15px,1.3vw,24px)] opacity-90 mt-[8%] leading-[1.7] font-medium">
              Minimum mandatory employment quota in pioneering legislations 💼.
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

// --- Slide 3: The Problem/Challenge ---
const Slide3 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" />
    <Header centerText="Challenges & Issues 🚧" rightText="03" isActive={isActive} />
    
    <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-[5.2%] pt-[2%]">
      {/* Top Text Section */}
      <div className="text-center w-full max-w-6xl mx-auto mb-[5%]">
        <h2 className={`text-[clamp(40px,6vw,90px)] tracking-tight leading-[1.1] font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          The Gap Between Text & Reality 📉
        </h2>
        <p className={`text-[clamp(18px,1.6vw,28px)] opacity-90 leading-[1.8] font-medium max-w-4xl mx-auto ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          Despite notable progress in drafting laws, persons with disabilities still face severe challenges hindering their full integration and threatening their basic safety.
        </p>
      </div>
      
      {/* 3 Equal Columns */}
      <div className="grid grid-cols-3 gap-[3%] w-full h-[45%]">
        <GlassCard 
          isActive={isActive} delay="delay-300"
          emoji="🛑" 
          title="Legislative Shortcomings"
          desc="The major crisis lies in the vast gap between ideal legal texts and actual practical application, making many rights mere ink on paper without tangible impact."
          className="items-center text-center justify-center border-t-4 border-t-orange-500/80 hover:border-orange-500"
        />
        
        <GlassCard 
          isActive={isActive} delay="delay-400"
          emoji="🚧" 
          title="Infrastructure Challenges"
          desc="The lack of genuine 'accessibility' standards in public facilities and transport reinforces daily isolation and societal marginalization."
          className="items-center text-center justify-center border-t-4 border-t-yellow-500/80 hover:border-yellow-500"
        />

        <GlassCard 
          isActive={isActive} delay="delay-500"
          emoji="💣" 
          title="Suffering During Conflicts"
          desc="The impossibility of safe evacuation under bombardment (as in Gaza), revealing a glaring international disregard for Article 11 of the UN Convention regarding protection in emergencies."
          className="items-center text-center justify-center border-t-4 border-t-red-600/80 bg-red-500/5 hover:border-red-500"
        />
      </div>
    </div>
  </div>
);

// --- Slide 4: The Proposed Solution ---
const Slide4 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" />
    <Header centerText="Proposed Solution 💡" rightText="04" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%] pt-[5%]">
      <div className="text-center w-full max-w-5xl mx-auto mb-[6%]">
        <h2 className={`text-[clamp(36px,5.5vw,85px)] tracking-tight leading-[1.1] font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          Comprehensive Methodology 🎯
        </h2>
        <p className={`text-[clamp(16px,1.5vw,26px)] opacity-90 leading-[1.8] font-medium ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          True change requires an integrated strategic approach beyond promises, building strong regulatory institutions capable of transforming written rights into lived reality 🌟.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-[4%] w-full mt-auto mb-[8%] h-[40%]">
        <GlassCard 
          icon={Scale} emoji="⚖️"
          title="Binding Legislation" 
          desc="Strict national endorsement enforcing employment quotas and providing comprehensive tax exemptions while criminalizing all forms of discrimination." 
          isActive={isActive} delay="delay-300" 
          className="items-center text-center justify-center border-t-4 border-t-[#D2FF55]"
        />
        <GlassCard 
          icon={Building2} emoji="🏗️"
          title="Universal Design" 
          desc="Legal obligation to apply 'accessibility' standards across buildings, transportation, and digital platforms." 
          isActive={isActive} delay="delay-400"
          className="items-center text-center justify-center border-t-4 border-t-blue-400"
        />
        <GlassCard 
          icon={Users} emoji="🤝"
          title="Societal Awareness" 
          desc="Launching educational campaigns to change stereotypical views and promote a culture of inclusion in schools and workplaces." 
          isActive={isActive} delay="delay-500"
          className="items-center text-center justify-center border-t-4 border-t-purple-400"
        />
      </div>
    </div>
  </div>
);

// --- Slide 5: Core Features (Fixed Layout & Sizes) ---
const Slide5 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" />
    <Header centerText="Key Highlights ⭐" rightText="05" isActive={isActive} />
    
    <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-[5.2%] pt-[6%] pb-[4%]">
      <div className="text-center mb-[4%]">
        <h2 className={`text-[clamp(36px,5vw,80px)] tracking-tight leading-[1.1] font-extrabold ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          Pillars of Inclusion & Dignity 🏛️
        </h2>
      </div>
      
      {/* 
        Fully Fixed Grid-Like Flexbox Layout 
        Ensures all 5 cards are exactly 31.33% wide.
        Top row has 3 cards. Bottom row has 2 cards perfectly centered.
      */}
      <div className="flex-1 flex flex-col gap-[3%] w-full max-w-[90%] mx-auto">
        {/* Top Row */}
        <div className="flex-1 flex justify-center gap-[3%] w-full">
          <GlassCard 
            emoji="🕌" icon={HeartHandshake} 
            title="Religious Perspective" 
            desc="Establishing human dignity regardless of limitations, considering active work and piety as the true standards." 
            isActive={isActive} delay="delay-200" 
            className="w-[31.33%] shrink-0" 
          />
          <GlassCard 
            emoji="🌍" icon={Globe} 
            title="International Covenants" 
            desc="Building long-term continental strategies to unify legislative paths in the Arab and European Decades." 
            isActive={isActive} delay="delay-300" 
            className="w-[31.33%] shrink-0" 
          />
          <GlassCard 
            emoji="🛡️" icon={Gavel} 
            title="Comprehensive Rights" 
            desc="Ensuring political empowerment, economic enablement, and social security to protect against poverty." 
            isActive={isActive} delay="delay-400" 
            className="w-[31.33%] shrink-0" 
          />
        </div>
        
        {/* Bottom Row - Centered */}
        <div className="flex-1 flex justify-center gap-[3%] w-full">
          <GlassCard 
            emoji="🇪🇬🇯🇴" icon={Landmark} 
            title="National Leadership" 
            desc="Drawing inspiration from models like Egyptian and Jordanian laws in establishing national councils to monitor guarantees." 
            isActive={isActive} delay="delay-500" 
            className="w-[31.33%] shrink-0" 
          />
          <GlassCard 
            emoji="🚨" icon={ShieldAlert} 
            title="Crisis Protocols" 
            desc="Pressuring to activate Article 11 of the Convention obligating warring parties to rescue persons with disabilities during disasters." 
            isActive={isActive} delay="delay-600" 
            className="w-[31.33%] shrink-0 border-red-500/30 bg-red-500/5 hover:border-red-500/60" 
          />
        </div>
      </div>

    </div>
  </div>
);

// --- Slide 6: Deep Dive 1 ---
const Slide6 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" />
    <Header centerText="Deep Analysis 🔍" rightText="06" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-row items-center px-[5.2%] gap-[6%]">
      <div className="w-[35%] flex flex-col gap-[clamp(20px,2.5vw,40px)]">
        <div style={glassStyle} className={`hover-glass p-[clamp(20px,2.5vw,40px)] rounded-3xl flex items-center gap-[6%] ${isActive ? 'anim-left delay-200' : 'opacity-0'}`}>
          <div className="w-[20%] flex justify-center text-[clamp(32px,3.5vw,56px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">1</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold">Civil & Political Rights 🗳️</div>
        </div>
        <div style={glassStyle} className={`hover-glass p-[clamp(20px,2.5vw,40px)] rounded-3xl flex items-center gap-[6%] ${isActive ? 'anim-left delay-300' : 'opacity-0'}`}>
          <div className="w-[20%] flex justify-center text-[clamp(32px,3.5vw,56px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">2</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold">Economic Empowerment 🎓</div>
        </div>
        <div style={glassStyle} className={`hover-glass p-[clamp(20px,2.5vw,40px)] rounded-3xl flex items-center gap-[6%] ${isActive ? 'anim-left delay-400' : 'opacity-0'}`}>
          <div className="w-[20%] flex justify-center text-[clamp(32px,3.5vw,56px)] font-black text-[#D2FF55] drop-shadow-[0_0_15px_rgba(210,255,85,0.5)]">3</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold">Legal Capacity Recognition 📑</div>
        </div>
      </div>
      
      <div className="w-[65%] flex flex-col">
        <div className={`inline-block bg-[#D2FF55]/10 border border-[#D2FF55]/30 text-[#D2FF55] px-4 py-2 rounded-full w-max mb-6 font-bold tracking-wide uppercase text-sm ${isActive ? 'anim-down delay-100' : 'opacity-0'}`}>Systematic Analysis</div>
        <h2 className={`text-[clamp(40px,6vw,95px)] tracking-tight leading-[1.1] font-extrabold mb-[5%] ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          Integrated Rights System 🧩
        </h2>
        <p className={`text-[clamp(18px,1.6vw,30px)] opacity-95 leading-[1.9] font-medium text-justify bg-white/5 p-8 rounded-3xl border border-white/10 ${isActive ? 'anim-up delay-500' : 'opacity-0'}`}>
          A common misconception is confining disability rights to medical care 🏥. In reality, rights span a comprehensive spectrum starting with <strong className="text-[#D2FF55]">Civil Rights</strong> ensuring the right to life, privacy, and founding a family 👨‍👩‍👧‍👦.
          <br/><br/>
          It completes the circle with <strong className="text-blue-400">Political Rights</strong> guaranteeing active participation in decision-making. At its core is <strong className="text-purple-400">Economic Empowerment</strong> through an accessible workplace 💼, breaking the cycle of financial marginalization.
        </p>
      </div>
    </div>
  </div>
);

// --- Slide 7: Timeline ---
const Slide7 = ({ isActive }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" />
    <Header centerText="Action Phases 🚀" rightText="07" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] px-[5.2%] pb-[8%]">
      <h2 className={`text-[clamp(36px,5.5vw,85px)] font-extrabold mb-[6%] text-center ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        Institutional Implementation Phases 📈
      </h2>
      <div className="flex-1 flex flex-row gap-[3%] items-stretch">
        <GlassCard emoji="🌐" icon={Globe} title="Int'l Recognition" desc="Adopting the UN Convention (2006) as a binding reference ending the era of guardianship." isActive={isActive} delay="delay-200" className="w-[23%] overflow-hidden relative group">
          <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">1</div>
        </GlassCard>
        <GlassCard emoji="🗺️" icon={FileText} title="Regional Covenants" desc="Adapting international laws to suit cultural contexts for the Arab and African regions." isActive={isActive} delay="delay-300" className="w-[23%] overflow-hidden relative group">
          <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">2</div>
        </GlassCard>
        <GlassCard emoji="⚖️" icon={BookOpen} title="National Legislation" desc="Enacting detailed local laws accompanied by deterrent penalty mechanisms to ensure seriousness." isActive={isActive} delay="delay-400" className="w-[23%] overflow-hidden relative group">
          <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform duration-500 group-hover:scale-110 group-hover:text-[#D2FF55]">3</div>
        </GlassCard>
        <GlassCard emoji="✅" icon={CheckCircle} title="Practical Application" desc="Tangible change: inclusive education, modifying infrastructure, and strict monitoring." isActive={isActive} delay="delay-500" className="w-[23%] overflow-hidden relative group">
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
    <Header centerText="Impact & Expectations 🎯" rightText="08" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] items-center justify-center px-[5.2%] pb-[6%]">
      <h2 className={`text-[clamp(36px,5.5vw,85px)] font-extrabold mb-[4%] text-center ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        Key Performance Indicators 📊
      </h2>
      <div className="w-[90%] h-[75%] grid grid-cols-2 grid-rows-2 gap-[3%]">
        <GlassCard isActive={isActive} delay="delay-200" className="items-center text-center justify-center !p-6 hover:border-[#D2FF55]/50">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] leading-none mb-4 pulse-glow">5%</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2">Mandatory Employment Quota 💼</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80">The minimum threshold to ensure financial sustainability and true economic empowerment.</div>
        </GlassCard>
        <GlassCard isActive={isActive} delay="delay-300" className="items-center text-center justify-center !p-6 hover:border-blue-400/50">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] leading-none mb-4 pulse-glow">100%</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2">Comprehensive Exemptions 🚘</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80">Full tax and customs facilitation for prosthetic devices and transportation means.</div>
        </GlassCard>
        <GlassCard isActive={isActive} delay="delay-400" className="items-center text-center justify-center !p-6 hover:border-purple-400/50">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] leading-none mb-4 pulse-glow">2030</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2">Future Vision 🔭</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80">The timeframe to achieve sustainable development that leaves no one behind.</div>
        </GlassCard>
        <GlassCard isActive={isActive} delay="delay-500" className="items-center text-center justify-center !p-6 border-red-500/20 hover:border-red-500/60 bg-red-500/5">
          <div className="text-[clamp(60px,7.5vw,130px)] font-black text-red-400 leading-none mb-4 pulse-glow-red">11</div>
          <div className="text-[clamp(18px,1.6vw,28px)] font-bold mb-2 text-red-100">Int'l Protection Clause 🚨</div>
          <div className="text-[clamp(14px,1.3vw,22px)] opacity-80 text-red-100/80">The emergency article that must be activated immediately to save lives during conflicts.</div>
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
        "Providing legal protection for persons with disabilities is not a luxury or a favor, but a <span className="text-[#D2FF55]">moral obligation</span> reflecting the core of our humanity." ✨
      </h2>
      <div className="w-32 h-2 bg-gradient-to-r from-transparent via-[#D2FF55] to-transparent mt-4 rounded-full opacity-80"></div>
    </div>
  </div>
);

// --- Slide 10: Conclusion ---
const Slide10 = ({ isActive }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" />
    <Header centerText="Conclusion 🏁" rightText="10" isActive={isActive} />
    
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-[5.2%] pt-[4%]">
      {/* Top Centered Section */}
      <div className="text-center w-full max-w-5xl mx-auto mb-[6%]">
        <h2 className={`text-[clamp(40px,6vw,95px)] tracking-tight font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
          Conclusion & Next Steps 🚀
        </h2>
        <p className={`text-[clamp(18px,1.6vw,30px)] opacity-95 leading-[1.8] font-medium text-center ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>
          Strict legislative efforts must converge with deep societal awareness campaigns to ensure the building of a civilized environment free of physical and psychological barriers, respecting differences and valuing capabilities 🌟.
        </p>
      </div>
      
      {/* Bottom Section: 2x2 Perfectly Spaced Grid */}
      <div className="grid grid-cols-2 grid-rows-2 gap-[3%] w-full max-w-7xl h-[45%]">
        {[
          { icon: Building2, emoji: "🏢", text: "Immediate application of universal and architectural design standards" },
          { icon: Megaphone, emoji: "📣", text: "Stiffening penalties on all forms of employment discrimination" },
          { icon: Heart, emoji: "❤️", text: "Securing humanitarian corridors for assistance during conflicts" },
          { icon: Activity, emoji: "💻", text: "Strongly integrating assistive technology in educational stages" }
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
      // Standard LTR keyboard navigation
      if (['ArrowRight', 'ArrowDown', ' '].includes(e.key)) { e.preventDefault(); nextSlide(); }
      if (['ArrowLeft', 'ArrowUp'].includes(e.key)) { e.preventDefault(); prevSlide(); }
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap');
        body, html { margin: 0; padding: 0; background: #000; overflow: hidden; font-family: 'Plus Jakarta Sans', sans-serif; }
        
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
        
        /* Keyframes for Entrances (Adjusted for LTR) */
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        
        .anim-up { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-down { animation: fadeInDown 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-right { animation: fadeInRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-left { animation: fadeInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-zoom { animation: zoomIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-scale { animation: zoomIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        
        /* Delays */
        .delay-100 { animation-delay: 100ms; } .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; } .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; } .delay-600 { animation-delay: 600ms; }
        .delay-700 { animation-delay: 700ms; } .delay-800 { animation-delay: 800ms; }
      `}} />
      
      {/* Perspective wrapper for 3D transitions - Set to LTR */}
      <div dir="ltr" className="relative w-screen h-screen overflow-hidden bg-[#050505] text-white cursor-default" style={{ perspective: '1200px' }}>
        
        {/* Top Hint Text */}
        <div className={`absolute top-[4%] right-[5.2%] text-[11px] text-white/40 tracking-wide z-50 transition-opacity duration-300 pointer-events-none uppercase font-bold ${controlsVisible ? 'opacity-100' : 'opacity-0'}`}>
          ← → Navigate &middot; F Fullscreen
        </div>

        {slides.map((SlideComponent, index) => {
          const isActive = index === currentSlide;
          const isPast = index < currentSlide;
          const isFuture = index > currentSlide;

          // Cinematic 3D Transitions (Adjusted for LTR visual flow)
          let transform = 'translateX(0) scale(1) rotateY(0) translateZ(0)';
          let opacity = '1';
          let filter = 'blur(0px)';
          let visibility = 'visible';
          
          if (isPast) {
            transform = 'translateX(-30%) scale(0.85) rotateY(12deg) translateZ(-150px)';
            opacity = '0';
            filter = 'blur(15px)';
            // Hide fully after transition to save resources
            if(currentSlide - index > 1) visibility = 'hidden'; 
          } else if (isFuture) {
            transform = 'translateX(30%) scale(0.85) rotateY(-12deg) translateZ(-150px)';
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
          <div className="mx-6 flex items-center gap-3 border-l border-white/10 pl-6">
            {slides.map((_, idx) => (
              <div 
                key={idx} 
                onClick={() => setCurrentSlide(idx)}
                className={`h-[4px] rounded-full transition-all duration-700 cursor-pointer hover:h-[8px] hover:bg-white/60 ${idx === currentSlide ? 'w-[40px] bg-[#D2FF55] shadow-[0_0_10px_rgba(210,255,85,0.6)]' : 'w-[8px] bg-white/20'}`} 
              />
            ))}
          </div>
          <div className="flex items-center gap-3 border-l border-white/10 pl-6 ml-6">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 hover:scale-110 disabled:opacity-20 disabled:hover:scale-100 disabled:hover:bg-transparent transition-all">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 hover:scale-110 disabled:opacity-20 disabled:hover:scale-100 disabled:hover:bg-transparent transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
