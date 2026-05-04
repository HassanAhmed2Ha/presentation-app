import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Hls from 'hls.js';
import { 
  ChevronLeft, ChevronRight, Maximize, Minimize, HeartHandshake, Globe, Scale, 
  Landmark, ShieldAlert, Building2, Megaphone, Briefcase, Heart, Eye, 
  TriangleAlert, Users, CheckCircle, FileText, Activity, Gavel, BookOpen, Quote,
  Sparkles, GraduationCap, Award, Library
} from 'lucide-react';

// --- Shared Utilities & Components ---

const glassStyle = {
  backdropFilter: 'blur(24px) saturate(1.4)',
  WebkitBackdropFilter: 'blur(24px) saturate(1.4)',
  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%), radial-gradient(circle at top left, rgba(255,255,255,0.15) 0%, transparent 40%)',
  border: '1px solid rgba(255,255,255,0.12)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
};

/**
 * Enhanced Smart Video Component
 * Fixed alignment to ensure video fills the screen perfectly from (0,0)
 */
const VideoBackground = ({ url, isActive, isNeighbor }) => {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);
  
  const shouldLoad = isActive || isNeighbor;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldLoad) {
      if (!hlsRef.current) {
        if (Hls.isSupported()) {
          const hls = new Hls({ 
            enableWorker: true,
            lowLatencyMode: true,
            backBufferLength: 30 
          });
          hls.loadSource(url);
          hls.attachMedia(video);
          hlsRef.current = hls;
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
          video.src = url;
        }
      }

      if (isActive) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    } else {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
      video.pause();
      video.removeAttribute('src');
      video.load();
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [url, isActive, shouldLoad]);

  return (
    <video
      ref={videoRef}
      // Fixed: Explicit top-0 left-0 and block display to prevent gaps
      className={`absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-1000 mix-blend-screen block ${isActive ? 'opacity-90' : 'opacity-0'}`}
      muted
      playsInline
      loop
    />
  );
};

const Header = ({ centerText, rightText, hideRight, isActive }) => (
  <div className={`absolute top-[4%] left-[5.2%] right-[5.2%] flex justify-between items-center z-20 transition-all duration-1000 delay-300 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
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

const GlassCard = ({ icon: Icon, title, desc, delay, isActive, className = "", children, emoji }) => (
  <div style={glassStyle} className={`hover-glass rounded-3xl p-[clamp(16px,1.8vw,32px)] flex flex-col justify-center transition-all ${isActive ? `anim-up ${delay}` : 'opacity-0 translate-y-12'} ${className}`}>
    {Icon && <Icon className="text-[#D2FF55] mb-[4%] w-[clamp(28px,2.5vw,44px)] h-[clamp(28px,2.5vw,44px)] stroke-[1.5] anim-float shrink-0" />}
    {children}
    {title && <h3 className="text-[clamp(16px,1.5vw,26px)] font-bold mb-3 flex items-center justify-center gap-2 leading-tight">{title} <span className="text-[1.2em]">{emoji}</span></h3>}
    {desc && <p className="text-[clamp(13px,1.1vw,18px)] text-white/85 leading-[1.6]">{desc}</p>}
  </div>
);

// --- Individual Slides ---

const Slide1 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white overflow-hidden">
    <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header rightText="Presentation 🎬" hideRight={false} isActive={isActive} />
    {/* Removed -mt for Slide 1 to fix the 'raised' visual feeling of the content */}
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%]">
      <div className={`inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full w-max mb-6 border border-white/20 backdrop-blur-md ${isActive ? 'anim-down delay-200' : 'opacity-0'}`}>
        <Sparkles className="w-5 h-5 text-[#D2FF55]" />
        <span className="text-sm font-bold tracking-wide uppercase">Human Rights</span>
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

const Slide2 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Introduction 📖" rightText="02" isActive={isActive} />
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%]">
      <h2 className={`text-[clamp(32px,5vw,72px)] tracking-tight leading-[1.1] font-extrabold mb-[4%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>
        From Charity 🤲 <br className="hidden md:block" /> to the Era of Equality & Rights ⚖️
      </h2>
      <div className="flex flex-row mt-[2%] gap-[5%] items-stretch h-[45%]">
        <div className={`flex-[0_0_22%] flex flex-col justify-center p-8 rounded-3xl bg-white/5 border border-white/10 hover-glass ${isActive ? 'anim-left delay-300' : 'opacity-0'}`}>
          <div className="text-[clamp(48px,6vw,90px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">2006</div>
          <div className="text-[clamp(15px,1.3vw,24px)] opacity-90 mt-[8%] leading-[1.7] font-medium">The defining year the UN Convention was established as a binding global constitution 📜.</div>
        </div>
        <div className={`flex-[0_0_42%] flex items-center ${isActive ? 'anim-up delay-400' : 'opacity-0'}`}>
          <p className="text-[clamp(16px,1.4vw,26px)] opacity-100 leading-[2] font-semibold text-justify">The issue of persons with disabilities is no longer a marginal matter, but a fundamental benchmark of a nation's progress and profound respect for human rights 🌟. The world has witnessed a radical shift in perspective; from a group receiving temporary sympathy to a genuine rights-based approach grounded in comprehensive inclusion 🤝.</p>
        </div>
        <div className={`flex-[0_0_22%] flex flex-col justify-between p-8 rounded-3xl bg-white/5 border border-white/10 hover-glass ${isActive ? 'anim-right delay-500' : 'opacity-0'}`}>
          <div>
            <div className="text-[clamp(48px,6vw,90px)] font-black leading-none text-[#D2FF55] pulse-glow w-max">5%</div>
            <div className="text-[clamp(15px,1.3vw,24px)] opacity-90 mt-[8%] leading-[1.7] font-medium">Minimum mandatory employment quota in pioneering legislations 💼.</div>
          </div>
          <svg className="w-full h-[60px] mt-[15%] anim-float" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path d="M0 25 L20 18 L40 22 L60 8 L80 12 L100 2" fill="none" stroke="#D2FF55" strokeWidth="3" vectorEffect="non-scaling-stroke" />
            <circle cx="100" cy="2" r="4" fill="#fff" className="pulse-glow" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

const Slide3 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Challenges & Issues 🚧" rightText="03" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-[5.2%] pt-[2%]">
      <div className="text-center w-full max-w-6xl mx-auto mb-[5%]">
        <h2 className={`text-[clamp(40px,6vw,90px)] tracking-tight leading-[1.1] font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>The Gap Between Text & Reality 📉</h2>
        <p className={`text-[clamp(18px,1.6vw,28px)] opacity-90 leading-[1.8] font-medium max-w-4xl mx-auto ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>Despite notable progress in drafting laws, persons with disabilities still face severe challenges hindering their full integration and threatening their basic safety.</p>
      </div>
      <div className="grid grid-cols-3 gap-[3%] w-full h-[45%]">
        <GlassCard isActive={isActive} delay="delay-300" emoji="🛑" title="Legislative Shortcomings" desc="The major crisis lies in the vast gap between ideal legal texts and actual practical application." className="items-center text-center justify-center border-t-4 border-t-orange-500/80" />
        <GlassCard isActive={isActive} delay="delay-400" emoji="🚧" title="Infrastructure" desc="The lack of genuine 'accessibility' standards in public facilities reinforces daily isolation." className="items-center text-center justify-center border-t-4 border-t-yellow-500/80" />
        <GlassCard isActive={isActive} delay="delay-500" emoji="💣" title="Crisis Suffering" desc="The impossibility of safe evacuation under bombardment, ignoring Article 11 of the UN Convention." className="items-center text-center justify-center border-t-4 border-t-red-600/80 bg-red-500/5" />
      </div>
    </div>
  </div>
);

const Slide4 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Proposed Solution 💡" rightText="04" isActive={isActive} />
    <div className="relative z-10 w-full h-full flex flex-col justify-center px-[5.2%] pt-[5%]">
      <div className="text-center w-full max-w-5xl mx-auto mb-[6%]">
        <h2 className={`text-[clamp(36px,5.5vw,85px)] tracking-tight leading-[1.1] font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>Comprehensive Methodology 🎯</h2>
        <p className={`text-[clamp(16px,1.5vw,26px)] opacity-90 leading-[1.8] font-medium ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>True change requires an integrated strategic approach beyond promises, building strong regulatory institutions capable of transforming written rights into reality 🌟.</p>
      </div>
      <div className="grid grid-cols-3 gap-[4%] w-full mt-auto mb-[8%] h-[45%]">
        <GlassCard icon={Scale} emoji="⚖️" title="Binding Legislation" desc="Strict national laws enforcing employment quotas and tax exemptions while criminalizing discrimination." isActive={isActive} delay="delay-300" className="items-center text-center justify-center border-t-4 border-t-[#D2FF55]" />
        <GlassCard icon={Building2} emoji="🏗️" title="Universal Design" desc="Legal obligation to apply 'accessibility' standards across buildings and digital platforms." isActive={isActive} delay="delay-400" className="items-center text-center justify-center border-t-4 border-t-blue-400" />
        <GlassCard icon={Users} emoji="🤝" title="Societal Awareness" desc="Launching campaigns to promote a culture of inclusion in schools and workplaces." isActive={isActive} delay="delay-500" className="items-center text-center justify-center border-t-4 border-t-purple-400" />
      </div>
    </div>
  </div>
);

const Slide5 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Key Highlights ⭐" rightText="05" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-[5.2%] pt-[6%] pb-[4%]">
      <div className="text-center mb-[4%] shrink-0">
        <h2 className={`text-[clamp(36px,5vw,80px)] tracking-tight leading-[1.1] font-extrabold ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>Pillars of Inclusion & Dignity 🏛️</h2>
      </div>
      <div className="grid grid-cols-6 grid-rows-2 gap-[3%] w-full max-w-7xl mx-auto h-[65%]">
        <GlassCard emoji="🕌" icon={HeartHandshake} title="Religion" desc="Establishing dignity regardless of limitations." isActive={isActive} delay="delay-200" className="col-span-2 items-center text-center" />
        <GlassCard emoji="🌍" icon={Globe} title="Covenants" desc="Continental strategies to unify legislation." isActive={isActive} delay="delay-300" className="col-span-2 items-center text-center" />
        <GlassCard emoji="🛡️" icon={Gavel} title="Rights" desc="Ensuring political and economic empowerment." isActive={isActive} delay="delay-400" className="col-span-2 items-center text-center" />
        <GlassCard emoji="🇪🇬🇯🇴" icon={Landmark} title="Leadership" desc="Drawing inspiration from national monitoring councils." isActive={isActive} delay="delay-500" className="col-start-2 col-span-2 items-center text-center" />
        <GlassCard emoji="🚨" icon={ShieldAlert} title="Protocols" desc="Obligating rescue during disasters and wars." isActive={isActive} delay="delay-600" className="col-span-2 items-center text-center border-red-500/30 bg-red-500/5" />
      </div>
    </div>
  </div>
);

const Slide6 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Deep Analysis 🔍" rightText="06" isActive={isActive} />
    <div className="relative z-10 w-full h-full flex flex-row items-center px-[5.2%] gap-[6%]">
      <div className="w-[35%] flex flex-col gap-[clamp(20px,2.5vw,40px)]">
        {[ {id:1, t:"Civil Rights 🗳️"}, {id:2, t:"Empowerment 🎓"}, {id:3, t:"Legal Capacity 📑"} ].map((item, i) => (
          <div key={item.id} style={glassStyle} className={`hover-glass p-[clamp(20px,2.5vw,40px)] rounded-3xl flex items-center gap-[6%] ${isActive ? `anim-left delay-${(i+2)*100}` : 'opacity-0'}`}>
            <div className="w-[20%] flex justify-center text-[clamp(32px,3.5vw,56px)] font-black text-[#D2FF55]">{item.id}</div>
            <div className="text-[clamp(18px,1.6vw,28px)] font-bold">{item.t}</div>
          </div>
        ))}
      </div>
      <div className="w-[65%] flex flex-col">
        <div className={`inline-block bg-[#D2FF55]/10 border border-[#D2FF55]/30 text-[#D2FF55] px-4 py-2 rounded-full w-max mb-6 font-bold uppercase text-sm ${isActive ? 'anim-down delay-100' : 'opacity-0'}`}>Systematic Analysis</div>
        <h2 className={`text-[clamp(40px,6vw,95px)] tracking-tight leading-[1.1] font-extrabold mb-[5%] ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>Integrated Rights 🧩</h2>
        <p className={`text-[clamp(18px,1.6vw,30px)] opacity-95 leading-[1.9] font-medium text-justify bg-white/5 p-8 rounded-3xl border border-white/10 ${isActive ? 'anim-up delay-500' : 'opacity-0'}`}>
          A common misconception is confining disability rights to medical care 🏥. In reality, rights span a comprehensive spectrum ensuring the right to life, privacy, and active participation in decision-making. At its core is <strong className="text-purple-400">Economic Empowerment</strong> through accessible workplaces 💼.
        </p>
      </div>
    </div>
  </div>
);

const Slide7 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/Kec29dVyJgiPdtWaQtPuEiiGHkJIYQAVUJcNiIHUYeo.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Action Phases 🚀" rightText="07" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] px-[5.2%] pb-[8%]">
      <h2 className={`text-[clamp(36px,5.5vw,85px)] font-extrabold mb-[6%] text-center shrink-0 ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>Institutional Implementation 📈</h2>
      <div className="grid grid-cols-4 gap-[3%] w-full h-[55%]">
        {[ {e:"🌐", i:Globe, t:"Recognition", d:"Adopting UN Convention reference."}, {e:"🗺️", i:FileText, t:"Regional", d:"Adapting international laws."}, {e:"⚖️", i:BookOpen, t:"National", d:"Enacting detailed local laws."}, {e:"✅", i:CheckCircle, t:"Application", d:"Inclusive education monitoring."} ].map((step, i) => (
          <GlassCard key={i} emoji={step.e} icon={step.i} title={step.t} desc={step.d} isActive={isActive} delay={`delay-${(i+2)*100}`} className="overflow-hidden relative group">
            <div className="text-[150px] font-black opacity-5 absolute -top-8 -right-8 transition-transform group-hover:scale-110">{i+1}</div>
          </GlassCard>
        ))}
      </div>
    </div>
  </div>
);

const Slide8 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white flex flex-col">
    <VideoBackground url="https://stream.mux.com/fHfa8VIbBdqZelLGg5thjsypZ101M01dbyIMLNDWQwlLA.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Impact 🎯" rightText="08" isActive={isActive} />
    <div className="relative z-10 w-full flex-1 flex flex-col pt-[8%] items-center justify-center px-[5.2%] pb-[6%]">
      <h2 className={`text-[clamp(36px,5.5vw,85px)] font-extrabold mb-[4%] text-center ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>Performance Indicators 📊</h2>
      <div className="w-[90%] h-[75%] grid grid-cols-2 grid-rows-2 gap-[3%]">
        <GlassCard isActive={isActive} delay="delay-200" className="items-center text-center justify-center !p-6"><div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] pulse-glow">5%</div><div className="font-bold">Employment Quota 💼</div></GlassCard>
        <GlassCard isActive={isActive} delay="delay-300" className="items-center text-center justify-center !p-6"><div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] pulse-glow">100%</div><div className="font-bold">Exemptions 🚘</div></GlassCard>
        <GlassCard isActive={isActive} delay="delay-400" className="items-center text-center justify-center !p-6"><div className="text-[clamp(60px,7.5vw,130px)] font-black text-[#D2FF55] pulse-glow">2030</div><div className="font-bold">Vision Target 🔭</div></GlassCard>
        <GlassCard isActive={isActive} delay="delay-500" className="items-center text-center justify-center !p-6 bg-red-500/5"><div className="text-[clamp(60px,7.5vw,130px)] font-black text-red-400 pulse-glow-red">11</div><div className="font-bold text-red-100">Protection Clause 🚨</div></GlassCard>
      </div>
    </div>
  </div>
);

const Slide9 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white flex items-center justify-center">
    <VideoBackground url="https://stream.mux.com/4IMYGcL01xjs7ek5ANO17JC4VQVUTsojZlnw4fXzwSxc.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <div className={`relative z-10 w-full max-w-[85%] flex flex-col items-center text-center gap-[clamp(24px,3vw,50px)] ${isActive ? 'anim-scale delay-200' : 'opacity-0 scale-90'}`}>
      <Quote className="w-[clamp(60px,8vw,120px)] h-[clamp(60px,8vw,120px)] text-[#D2FF55] opacity-90 anim-float" />
      <h2 className="text-[clamp(38px,5.5vw,90px)] tracking-tight leading-[1.4] font-black drop-shadow-2xl">
        "Providing legal protection for persons with disabilities is not a luxury, but a <span className="text-[#D2FF55]">moral obligation</span> reflecting the core of our humanity." ✨
      </h2>
      <div className="w-32 h-2 bg-gradient-to-r from-transparent via-[#D2FF55] to-transparent mt-4 rounded-full"></div>
    </div>
  </div>
);

const Slide10 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/00qQnfNo7sSpn3pB1hYKkyeSDvxs01NxiQ3sr29uL3e028.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Conclusion 🏁" rightText="10" isActive={isActive} />
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-[5.2%] pt-[4%]">
      <div className="text-center w-full max-w-5xl mx-auto mb-[6%]">
        <h2 className={`text-[clamp(40px,6vw,95px)] tracking-tight font-extrabold mb-[3%] ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>Conclusion & Next Steps 🚀</h2>
        <p className={`text-[clamp(18px,1.6vw,30px)] opacity-95 leading-[1.8] font-medium text-center ${isActive ? 'anim-up delay-200' : 'opacity-0'}`}>Strict legislative efforts must converge with deep awareness to ensure the building of a civilized environment free of barriers 🌟.</p>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 gap-[3%] w-full max-w-7xl h-[45%]">
        {[ {i:Building2, e:"🏢", t:"Apply design standards"}, {i:Megaphone, e:"📣", t:"Stiffen penalties"}, {i:Heart, e:"❤️", t:"Secure corridors"}, {i:Activity, e:"💻", t:"Integrate technology"} ].map((item, idx) => (
          <div key={idx} style={glassStyle} className={`hover-glass flex items-center justify-between p-[clamp(20px,2vw,36px)] rounded-3xl ${isActive ? `anim-up delay-${(idx+3)*100}` : 'opacity-0'}`}>
            <div className="flex items-center gap-[5%] flex-1">
              <div className="bg-white/10 p-4 rounded-2xl border border-white/5 shrink-0"><item.i className="w-10 h-10 text-[#D2FF55]" /></div>
              <span className="text-[clamp(18px,1.6vw,28px)] font-bold">{item.t}</span>
            </div>
            <span className="text-5xl opacity-90">{item.e}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Slide11 = ({ isActive, isNeighbor }) => (
  <div className="relative w-full h-full text-white">
    <VideoBackground url="https://stream.mux.com/JNJEOYI6B3EffB9f5ZhpGbuxzc6gSyJcXaCBbCgZKRg.m3u8" isActive={isActive} isNeighbor={isNeighbor} />
    <Header centerText="Credits 🎓" rightText="11" isActive={isActive} />
    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-[5.2%]">
      <h2 className={`text-[clamp(40px,6vw,95px)] tracking-tight font-extrabold mb-[4%] text-center ${isActive ? 'anim-up delay-100' : 'opacity-0'}`}>Thank You 🌟</h2>
      <div style={glassStyle} className={`w-full max-w-5xl rounded-[40px] p-[clamp(40px,5vw,80px)] flex flex-col gap-[clamp(30px,4vw,50px)] relative overflow-hidden ${isActive ? 'anim-scale delay-200' : 'opacity-0'}`}>
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D2FF55] via-blue-400 to-purple-400"></div>
        <div className={`flex items-center gap-[5%] ${isActive ? 'anim-right delay-300' : 'opacity-0'}`}>
          <div className="bg-white/10 p-6 rounded-3xl border border-white/5"><GraduationCap className="w-12 h-12 text-[#D2FF55]" /></div>
          <div className="flex flex-col"><span className="opacity-70 font-bold mb-1 uppercase tracking-widest text-xs">Prepared By</span><span className="text-[clamp(28px,3vw,50px)] font-bold">Ziad Ahmed Mahmoud</span></div>
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
        <div className={`flex items-center gap-[5%] ${isActive ? 'anim-right delay-400' : 'opacity-0'}`}>
          <div className="bg-white/10 p-6 rounded-3xl border border-white/5"><Award className="w-12 h-12 text-blue-400" /></div>
          <div className="flex flex-col"><span className="opacity-70 font-bold mb-1 uppercase tracking-widest text-xs">Under the Supervision of</span><span className="text-[clamp(28px,3vw,50px)] font-bold">Prof. Dr. Lamiaa Fathi</span></div>
        </div>
        <div className="w-full h-[1px] bg-white/10"></div>
        <div className={`flex items-center gap-[5%] ${isActive ? 'anim-right delay-500' : 'opacity-0'}`}>
          <div className="bg-white/10 p-6 rounded-3xl border border-white/5"><Library className="w-12 h-12 text-purple-400" /></div>
          <div className="flex flex-col"><span className="opacity-70 font-bold mb-1 uppercase tracking-widest text-xs">Institution</span><span className="text-[clamp(24px,2.5vw,40px)] font-bold">Faculty of Law, Sadat City University</span></div>
        </div>
      </div>
    </div>
  </div>
);

// --- App Root Component ---

export default function App() {
  const slides = useMemo(() => [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11], []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(true);
  const timeoutRef = useRef(null);

  const nextSlide = useCallback(() => setCurrentSlide(p => Math.min(p + 1, slides.length - 1)), [slides.length]);
  const prevSlide = useCallback(() => setCurrentSlide(p => Math.max(p - 1, 0)), []);

  useEffect(() => {
    const handleKeyDown = (e) => {
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
        .hover-glass:hover { transform: translateY(-8px) scale(1.02); background: rgba(255,255,255,0.12) !important; border-color: rgba(255,255,255,0.4) !important; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .anim-float { animation: float 4s ease-in-out infinite; }
        @keyframes glow { 0%, 100% { text-shadow: 0 0 10px rgba(210,255,85,0.2); } 50% { text-shadow: 0 0 30px rgba(210,255,85,0.8); } }
        .pulse-glow { animation: glow 3s ease-in-out infinite; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInRight { from { opacity: 0; transform: translateX(60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeInLeft { from { opacity: 0; transform: translateX(-60px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes zoomIn { from { opacity: 0; transform: scale(0.5); } to { opacity: 1; transform: scale(1); } }
        .anim-up { animation: fadeInUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-down { animation: fadeInDown 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-right { animation: fadeInRight 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-left { animation: fadeInLeft 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .anim-scale { animation: zoomIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-100 { animation-delay: 100ms; } .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; } .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; } .delay-600 { animation-delay: 600ms; }
      `}} />
      
      <div dir="ltr" className="relative w-screen h-screen overflow-hidden bg-[#050505] text-white cursor-default" style={{ perspective: '1200px' }}>
        {slides.map((SlideComponent, index) => {
          const isActive = index === currentSlide;
          const isPast = index < currentSlide;
          const isFuture = index > currentSlide;
          const isNeighbor = Math.abs(index - currentSlide) <= 1;

          let transform = 'translateX(0) scale(1) rotateY(0) translateZ(0)';
          let opacity = '1';
          let filter = 'blur(0px)';
          
          if (isPast) {
            transform = 'translateX(-30%) scale(0.85) rotateY(12deg) translateZ(-150px)';
            opacity = '0';
            filter = 'blur(15px)';
          } else if (isFuture) {
            transform = 'translateX(30%) scale(0.85) rotateY(-12deg) translateZ(-150px)';
            opacity = '0';
            filter = 'blur(15px)';
          }

          return (
            <div
              key={index}
              className="absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.3,1)]"
              style={{
                transform,
                opacity,
                filter,
                zIndex: isActive ? 10 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                visibility: isNeighbor ? 'visible' : 'hidden'
              }}
            >
              <SlideComponent isActive={isActive} isNeighbor={isNeighbor} />
            </div>
          );
        })}

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center h-[64px] px-8 rounded-full z-50 transition-all duration-500 hover:bg-white/20 ${controlsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={glassStyle}>
          <div className="text-[15px] text-white/70 font-bold tabular-nums min-w-[50px] text-center tracking-widest">{currentSlide + 1} / {slides.length}</div>
          <div className="mx-6 flex items-center gap-3 border-l border-white/10 pl-6">
            {slides.map((_, idx) => (
              <div key={idx} onClick={() => setCurrentSlide(idx)} className={`h-[4px] rounded-full transition-all duration-700 cursor-pointer ${idx === currentSlide ? 'w-[40px] bg-[#D2FF55] shadow-[0_0_10px_rgba(210,255,85,0.6)]' : 'w-[8px] bg-white/20'}`} />
            ))}
          </div>
          <div className="flex items-center gap-3 border-l border-white/10 pl-6 ml-6">
            <button onClick={prevSlide} disabled={currentSlide === 0} className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"><ChevronLeft size={24} /></button>
            <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"><ChevronRight size={24} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
