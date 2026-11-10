import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// 3D Realistic Trophy Vectors (Authentic Showcase Wall Display Trophies)
// ============================================================================

// 1. Gold Champion Cup (LeetCode 320+ Solved)
const GoldChampionCup = ({ theme, isLarge = false }) => {
  const isLight = theme === 'light';
  const size = isLarge ? 180 : 110;
  const idSuffix = isLarge ? 'lg' : 'sm';

  return (
    <svg viewBox="0 0 120 130" width={size} height={size + 10} className="trophy-svg gold-cup-svg">
      <defs>
        {/* Rich 24K Gold Gradients */}
        <linearGradient id={`gold-rim-grad-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#78350f" />
          <stop offset="20%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="80%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <linearGradient id={`gold-cup-body-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#92400e" />
          <stop offset="18%" stopColor="#fef08a" />
          <stop offset="42%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="88%" stopColor="#fef9c3" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id={`gold-inner-bowl-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#451a03" />
          <stop offset="60%" stopColor="#78350f" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id={`gold-handles-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id={`marble-base-dark-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        <linearGradient id={`brass-plate-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b45309" />
          <stop offset="30%" stopColor="#fef08a" />
          <stop offset="60%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <filter id={`cup-shadow-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow 
            dx="0" 
            dy={isLight ? "4" : "6"} 
            stdDeviation={isLight ? "3" : "5"} 
            floodColor={isLight ? "rgba(15, 23, 42, 0.16)" : "rgba(0,0,0,0.45)"} 
          />
        </filter>
      </defs>

      <g filter={`url(#cup-shadow-${idSuffix})`}>
        {/* Left Curved Trophy Handle */}
        <path
          d="M 34 32 C 14 32 10 60 30 68 C 24 64 22 42 36 38 Z"
          fill={`url(#gold-handles-${idSuffix})`}
          stroke="#78350f"
          strokeWidth="0.8"
        />

        {/* Right Curved Trophy Handle */}
        <path
          d="M 86 32 C 106 32 110 60 90 68 C 96 64 98 42 84 38 Z"
          fill={`url(#gold-handles-${idSuffix})`}
          stroke="#78350f"
          strokeWidth="0.8"
        />

        {/* Interior Cup Lip Depth */}
        <ellipse cx="60" cy="24" rx="26" ry="7" fill={`url(#gold-inner-bowl-${idSuffix})`} />

        {/* Main Trophy Chalice Body */}
        <path
          d="M 34 24 C 34 50 48 64 56 68 L 56 80 L 46 82 L 46 86 L 74 86 L 74 82 L 64 80 L 64 68 C 72 64 86 50 86 24 Z"
          fill={`url(#gold-cup-body-${idSuffix})`}
          stroke="#92400e"
          strokeWidth="1"
        />

        {/* Top Rim Ring */}
        <ellipse cx="60" cy="24" rx="26" ry="6.5" fill="none" stroke={`url(#gold-rim-grad-${idSuffix})`} strokeWidth="3" />

        {/* Specular Diagonal Sheen Streak */}
        <path
          d="M 44 26 L 40 52 C 43 56 47 60 52 64 L 56 26 Z"
          fill="#ffffff"
          opacity={isLight ? "0.18" : "0.32"}
        />

        {/* Golden Emblem on Trophy Belly: Star Crest */}
        <g transform="translate(60, 44)">
          <polygon
            points="0,-8 2.5,-2.5 8,-2.5 3.5,1.5 5.5,7 0,3.5 -5.5,7 -3.5,1.5 -8,-2.5 -2.5,-2.5"
            fill="#ffffff"
            stroke="#b45309"
            strokeWidth="0.8"
          />
        </g>

        {/* Trophy Stem Collar Rings */}
        <ellipse cx="60" cy="74" rx="8" ry="2.5" fill={`url(#gold-rim-grad-${idSuffix})`} stroke="#78350f" strokeWidth="0.8" />
        <ellipse cx="60" cy="81" rx="10" ry="3" fill={`url(#gold-rim-grad-${idSuffix})`} stroke="#78350f" strokeWidth="0.8" />

        {/* Heavy Black Marble Plinth Base */}
        <polygon points="36,88 84,88 88,110 32,110" fill={`url(#marble-base-dark-${idSuffix})`} stroke="#334155" strokeWidth="1" />
        
        {/* Polished Marble Top Bevel */}
        <polygon points="36,88 84,88 82,92 38,92" fill="#475569" opacity="0.6" />

        {/* Engraved Brass Nameplate */}
        <rect x="40" y="94" width="40" height="12" rx="1.5" fill={`url(#brass-plate-${idSuffix})`} stroke="#78350f" strokeWidth="0.8" />
        <rect x="42" y="96" width="36" height="8" rx="0.8" fill="none" stroke="#78350f" strokeWidth="0.5" strokeDasharray="1 1" />
        
        <text
          x="60"
          y="102"
          textAnchor="middle"
          fontSize="4.2"
          fontWeight="900"
          fontFamily="'Geist Mono', monospace"
          fill="#451a03"
          letterSpacing="0.06em"
        >
          320+ DSA
        </text>
      </g>
    </svg>
  );
};

// 2. Crystal Star Obelisk (9+ Technical Credentials)
const CrystalStarObelisk = ({ theme, isLarge = false }) => {
  const isLight = theme === 'light';
  const size = isLarge ? 180 : 110;
  const idSuffix = isLarge ? 'lg' : 'sm';

  return (
    <svg viewBox="0 0 120 130" width={size} height={size + 10} className="trophy-svg crystal-star-svg">
      <defs>
        {/* Optical Glass / Emerald Prismatic Gradients */}
        <linearGradient id={`crystal-face-left-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#e6fffa" : "#ffffff"} stopOpacity={isLight ? "0.7" : "0.85"} />
          <stop offset="35%" stopColor="#2dd4bf" stopOpacity={isLight ? "0.65" : "0.75"} />
          <stop offset="80%" stopColor="#0f766e" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#042f2e" />
        </linearGradient>

        <linearGradient id={`crystal-face-center-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={isLight ? "#2dd4bf" : "#5eead4"} stopOpacity={isLight ? "0.8" : "0.95"} />
          <stop offset="50%" stopColor={isLight ? "#ccfbf1" : "#ffffff"} stopOpacity={isLight ? "0.7" : "0.9"} />
          <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.85" />
        </linearGradient>

        <linearGradient id={`crystal-face-right-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="50%" stopColor="#115e59" />
          <stop offset="100%" stopColor="#042f2e" />
        </linearGradient>

        <linearGradient id={`gold-star-grad-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id={`titanium-tier-base-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>

        <filter id={`obelisk-glow-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow 
            dx="0" 
            dy={isLight ? "4" : "6"} 
            stdDeviation={isLight ? "3" : "5"} 
            floodColor={isLight ? "rgba(15, 23, 42, 0.14)" : "rgba(13,148,136,0.35)"} 
          />
        </filter>
      </defs>

      <g filter={`url(#obelisk-glow-${idSuffix})`}>
        {/* Tiered Pedestal Top Collar */}
        <polygon points="46,86 74,86 78,92 42,92" fill="#475569" stroke="#1e293b" strokeWidth="0.8" />

        {/* Multi-faceted Towering Crystal Obelisk */}
        <polygon points="60,20 44,86 54,86" fill={`url(#crystal-face-left-${idSuffix})`} stroke="#5eead4" strokeWidth="0.6" />
        <polygon points="60,20 54,86 66,86" fill={`url(#crystal-face-center-${idSuffix})`} stroke={isLight ? "#2dd4bf" : "#ffffff"} strokeWidth="0.8" />
        <polygon points="60,20 66,86 76,86" fill={`url(#crystal-face-right-${idSuffix})`} stroke="#0d9488" strokeWidth="0.6" />

        {/* Internal Laser-Etched 3D Cube / Chip Grid */}
        <g stroke={isLight ? "#0f766e" : "#ffffff"} strokeWidth="0.8" opacity={isLight ? "0.5" : "0.65"} fill="none">
          <polygon points="60,42 66,46 66,54 60,58 54,54 54,46" />
          <line x1="60" y1="42" x2="60" y2="58" />
          <line x1="54" y1="46" x2="66" y2="54" />
          <line x1="66" y1="46" x2="54" y2="54" />
        </g>

        {/* Brilliant Golden Star Apex on Top */}
        <g transform="translate(60, 16) scale(1.1)">
          <polygon
            points="0,-10 3,-3 10,-3 4.5,2 7,9 0,4.5 -7,9 -4.5,2 -10,-3 -3,-3"
            fill={`url(#gold-star-grad-${idSuffix})`}
            stroke="#78350f"
            strokeWidth="0.8"
          />
          <circle cx="0" cy="0" r="2.2" fill="#ffffff" />
        </g>

        {/* Two-Tier Titanium Base */}
        <polygon points="38,92 82,92 86,104 34,104" fill={`url(#titanium-tier-base-${idSuffix})`} stroke="#475569" strokeWidth="1" />
        <rect x="30" y="104" width="60" height="8" rx="1.5" fill="#0f172a" stroke="#334155" strokeWidth="1" />

        {/* Silver Laser-Etched Plaque */}
        <rect x="38" y="96" width="44" height="11" rx="1.2" fill="#e2e8f0" stroke="#0d9488" strokeWidth="0.8" />
        <text
          x="60"
          y="103"
          textAnchor="middle"
          fontSize="4"
          fontWeight="900"
          fontFamily="'Geist Mono', monospace"
          fill="#0f172a"
          letterSpacing="0.04em"
        >
          IIT · 9+ CERTS
        </text>
      </g>
    </svg>
  );
};

// 3. Laurel Torch of Mentorship (2+ Cohorts Mentored)
const LaurelTorchOfMentorship = ({ theme, isLarge = false }) => {
  const isLight = theme === 'light';
  const size = isLarge ? 180 : 110;
  const idSuffix = isLarge ? 'lg' : 'sm';

  return (
    <svg viewBox="0 0 120 130" width={size} height={size + 10} className="trophy-svg laurel-torch-svg">
      <defs>
        {/* Platinum / Chrome & Sapphire Flame Gradients */}
        <linearGradient id={`platinum-wreath-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={isLight ? "#f8fafc" : "#ffffff"} />
          <stop offset="40%" stopColor={isLight ? "#94a3b8" : "#cbd5e1"} />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <linearGradient id={`sapphire-flame-${idSuffix}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="30%" stopColor="#38bdf8" />
          <stop offset="70%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>

        <linearGradient id={`torch-cone-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="30%" stopColor="#f8fafc" />
          <stop offset="70%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        <filter id={`torch-glow-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow 
            dx="0" 
            dy={isLight ? "4" : "6"} 
            stdDeviation={isLight ? "3" : "5"} 
            floodColor={isLight ? "rgba(15, 23, 42, 0.14)" : "rgba(2,132,199,0.35)"} 
          />
        </filter>
      </defs>

      <g filter={`url(#torch-glow-${idSuffix})`}>
        {/* Left Laurel Branch Wreath */}
        <path
          d="M 38 68 C 22 56 20 34 32 18 C 30 28 32 44 42 56 Z"
          fill={`url(#platinum-wreath-${idSuffix})`}
          stroke="#475569"
          strokeWidth="0.8"
        />
        <ellipse cx="23" cy="38" rx="4" ry="2.2" transform="rotate(-30, 23, 38)" fill="#e2e8f0" />
        <ellipse cx="25" cy="50" rx="4.5" ry="2.4" transform="rotate(-15, 25, 50)" fill="#cbd5e1" />
        <ellipse cx="32" cy="60" rx="4" ry="2.2" transform="rotate(10, 32, 60)" fill="#e2e8f0" />

        {/* Right Laurel Branch Wreath */}
        <path
          d="M 82 68 C 98 56 100 34 88 18 C 90 28 88 44 78 56 Z"
          fill={`url(#platinum-wreath-${idSuffix})`}
          stroke="#475569"
          strokeWidth="0.8"
        />
        <ellipse cx="97" cy="38" rx="4" ry="2.2" transform="rotate(30, 97, 38)" fill="#e2e8f0" />
        <ellipse cx="95" cy="50" rx="4.5" ry="2.4" transform="rotate(15, 95, 50)" fill="#cbd5e1" />
        <ellipse cx="88" cy="60" rx="4" ry="2.2" transform="rotate(-10, 88, 60)" fill="#e2e8f0" />

        {/* Central Rising Eternal Sapphire Flame */}
        <path
          d="M 60 14 C 68 24 74 34 68 46 C 64 52 58 56 60 62 C 54 58 50 50 54 40 C 56 34 54 26 60 14 Z"
          fill={`url(#sapphire-flame-${idSuffix})`}
          stroke={isLight ? "#0284c7" : "#38bdf8"}
          strokeWidth="1"
        />
        <path
          d="M 60 26 C 64 32 66 38 63 44 C 61 46 58 48 59 52 C 56 50 54 44 57 38 C 58 34 57 30 60 26 Z"
          fill={isLight ? "#bae6fd" : "#ffffff"}
          opacity={isLight ? "0.6" : "0.85"}
        />

        {/* Torch Chalice Cone */}
        <polygon points="48,60 72,60 64,82 56,82" fill={`url(#torch-cone-${idSuffix})`} stroke="#334155" strokeWidth="0.8" />
        <ellipse cx="60" cy="60" rx="12" ry="3.5" fill="#e2e8f0" stroke="#475569" strokeWidth="1" />
        <ellipse cx="60" cy="82" rx="5" ry="1.8" fill="#cbd5e1" />

        {/* Stepped Architectural Plinth Base */}
        <polygon points="44,84 76,84 80,94 40,94" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
        <polygon points="34,94 86,94 90,110 30,110" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />

        {/* Polished Gold Engraved Plaque */}
        <rect x="38" y="98" width="44" height="10" rx="1.2" fill={`url(#gold-star-grad-${idSuffix})`} stroke="#78350f" strokeWidth="0.8" />
        <text
          x="60"
          y="105"
          textAnchor="middle"
          fontSize="4"
          fontWeight="900"
          fontFamily="'Geist Mono', monospace"
          fill="#451a03"
          letterSpacing="0.04em"
        >
          2+ MENTORED
        </text>
      </g>
    </svg>
  );
};

// 4. Crown Globe of Ambassador (1 Govt. Campus Ambassador)
const CrownGlobeOfAmbassador = ({ theme, isLarge = false }) => {
  const isLight = theme === 'light';
  const size = isLarge ? 180 : 110;
  const idSuffix = isLarge ? 'lg' : 'sm';

  return (
    <svg viewBox="0 0 120 130" width={size} height={size + 10} className="trophy-svg crown-globe-svg">
      <defs>
        {/* Regal Gold & Amethyst Globe Gradients */}
        <radialGradient id={`amethyst-globe-${idSuffix}`} cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor={isLight ? "#f3e8ff" : "#ffffff"} stopOpacity={isLight ? "0.7" : "0.8"} />
          <stop offset="30%" stopColor="#c084fc" stopOpacity={isLight ? "0.8" : "0.9"} />
          <stop offset="70%" stopColor="#7e22ce" />
          <stop offset="100%" stopColor="#3b0764" />
        </radialGradient>

        <linearGradient id={`orbital-gold-ring-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#eab308" />
          <stop offset="80%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id={`roman-pillar-base-${idSuffix}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="30%" stopColor="#64748b" />
          <stop offset="70%" stopColor="#475569" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        <filter id={`globe-glow-${idSuffix}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow 
            dx="0" 
            dy={isLight ? "4" : "6"} 
            stdDeviation={isLight ? "3" : "5"} 
            floodColor={isLight ? "rgba(15, 23, 42, 0.14)" : "rgba(168,85,247,0.35)"} 
          />
        </filter>
      </defs>

      <g filter={`url(#globe-glow-${idSuffix})`}>
        {/* Golden Ambassador Starburst Crown Apex */}
        <g transform="translate(60, 16) scale(0.95)">
          <polygon
            points="0,-9 2.5,-3 8.5,-3 3.5,1.5 5.5,8 0,4 -5.5,8 -3.5,1.5 -8.5,-3 -2.5,-3"
            fill={`url(#orbital-gold-ring-${idSuffix})`}
            stroke="#78350f"
            strokeWidth="0.8"
          />
        </g>

        {/* Outer Inclined Equatorial Golden Meridian Ring */}
        <ellipse
          cx="60"
          cy="44"
          rx="26"
          ry="10"
          transform="rotate(-22, 60, 44)"
          fill="none"
          stroke={`url(#orbital-gold-ring-${idSuffix})`}
          strokeWidth="3.2"
        />

        {/* Central Amethyst Imperial Globe Sphere */}
        <circle cx="60" cy="44" r="20" fill={`url(#amethyst-globe-${idSuffix})`} stroke={isLight ? "#581c87" : "#6b21a8"} strokeWidth="1" />

        {/* Globe Latitude & Longitude Meridians */}
        <ellipse cx="60" cy="44" rx="20" ry="8" fill="none" stroke={isLight ? "#e9d5ff" : "#f3e8ff"} strokeWidth="0.8" opacity={isLight ? "0.5" : "0.6"} />
        <ellipse cx="60" cy="44" rx="8" ry="20" fill="none" stroke={isLight ? "#e9d5ff" : "#f3e8ff"} strokeWidth="0.8" opacity={isLight ? "0.5" : "0.6"} />
        <line x1="40" y1="44" x2="80" y2="44" stroke={isLight ? "#e9d5ff" : "#f3e8ff"} strokeWidth="0.8" opacity={isLight ? "0.5" : "0.6"} />

        {/* Front Half of the Outer Inclined Meridian Ring */}
        <path
          d="M 36 54 C 42 64 74 58 84 34"
          fill="none"
          stroke={`url(#orbital-gold-ring-${idSuffix})`}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Supporting Imperial Eagle / Pillar Brackets */}
        <path
          d="M 48 58 L 52 74 L 68 74 L 72 58"
          fill={`url(#orbital-gold-ring-${idSuffix})`}
          stroke="#78350f"
          strokeWidth="0.8"
        />

        {/* Fluted Roman Column Capital */}
        <rect x="44" y="74" width="32" height="6" rx="1.5" fill={`url(#roman-pillar-base-${idSuffix})`} stroke="#334155" strokeWidth="0.8" />
        
        {/* Fluted Pedestal Shaft */}
        <polygon points="46,80 74,80 76,92 44,92" fill={`url(#roman-pillar-base-${idSuffix})`} stroke="#1e293b" strokeWidth="0.8" />
        <line x1="52" y1="80" x2="52" y2="92" stroke="#64748b" strokeWidth="1" />
        <line x1="60" y1="80" x2="60" y2="92" stroke="#cbd5e1" strokeWidth="1" />
        <line x1="68" y1="80" x2="68" y2="92" stroke="#64748b" strokeWidth="1" />

        {/* Heavy Marble Plinth Base */}
        <polygon points="34,92 86,92 90,110 30,110" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />

        {/* Royal Brass Seal Plaque */}
        <rect x="38" y="98" width="44" height="10" rx="1.2" fill={`url(#orbital-gold-ring-${idSuffix})`} stroke="#78350f" strokeWidth="0.8" />
        <text
          x="60"
          y="105"
          textAnchor="middle"
          fontSize="3.8"
          fontWeight="900"
          fontFamily="'Geist Mono', monospace"
          fill="#451a03"
          letterSpacing="0.03em"
        >
          MYGOV AMBASSADOR
        </text>
      </g>
    </svg>
  );
};

// Animated Number Counter
function CountUp({ to, suffix = '', duration = 1.4 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const end = parseInt(to, 10);
    if (isNaN(end)) {
      setCount(to);
      return;
    }
    const startTime = performance.now();
    const updateCount = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / (duration * 1000), 1);
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      if (progress < 1) {
        setCount(currentCount);
        requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    requestAnimationFrame(updateCount);
  }, [to, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ============================================================================
// 4 Individual Home Wall Trophy Shelf Data (Milestones & Numbers)
// ============================================================================
const STATS = [
  {
    id: 1,
    value: '320',
    suffix: '+',
    title: 'LeetCode Problems Solved',
    shortDesc: 'Advanced DSA mastery in Dynamic Programming, Graph Traversals, and optimal Big-O algorithmic design.',
    category: 'ALGORITHMIC MASTERY',
    shelfTag: 'DSA SOLVED',
    accent: '#f59e0b', // Championship Gold
    plaqueTitle: 'LEETCODE · 320+ DSA PROBLEMS SOLVED',
    detailedStory: 'Demonstrated relentless algorithmic problem-solving excellence by successfully solving over 320 curated Data Structures and Algorithms problems. Mastered multi-dimensional Dynamic Programming, Advanced Graph traversals (Dijkstra, Topological Sorting, Connected Components), Tree balancing, Tries, and Sliding Window techniques with an unwavering focus on sub-millisecond execution runtime and minimal auxiliary space.',
    breakdown: [
      { label: 'EASY FOUNDATIONS', val: '110+ Solved' },
      { label: 'MEDIUM CORE DSA', val: '180+ Solved' },
      { label: 'HARD OPTIMIZATIONS', val: '30+ Solved' },
      { label: 'DAILY STREAK', val: '150+ Days' },
    ],
    tags: ['Python', 'C++', 'Dynamic Programming', 'Graph Algorithms', 'Trees & Tries', 'Sliding Window', 'Big-O Complexity'],
    renderTrophy: (theme, isLarge) => <GoldChampionCup theme={theme} isLarge={isLarge} />
  },
  {
    id: 2,
    value: '9',
    suffix: '+',
    title: 'Technical Credentials',
    shortDesc: 'Verified academic & industry credentials, including Elite certification from IIT Madras via NPTEL.',
    category: 'CERTIFIED EXCELLENCE',
    shelfTag: 'ELITE CREDENTIALS',
    accent: '#0d9488', // Emerald Teal
    plaqueTitle: 'IIT MADRAS NPTEL ELITE · 9+ CREDENTIALS',
    detailedStory: 'Earned 9+ rigorously audited certifications from premier academic institutes and global tech bodies, headlined by the prestigious Elite-tier certification from IIT Madras (NPTEL). Credentials validate production-grade competence in Enterprise Software Design, Cloud Infrastructure, Database Engineering, and Modern Frontend Architecture.',
    breakdown: [
      { label: 'IIT MADRAS NPTEL', val: 'Elite Grade' },
      { label: 'INDUSTRY CERTIFICATES', val: '9+ Verified' },
      { label: 'FULL STACK SYSTEMS', val: 'Production-Ready' },
      { label: 'PERCENTILE RANK', val: 'Top Tier' },
    ],
    tags: ['IIT Madras NPTEL', 'Full Stack Architecture', 'Database Systems', 'Enterprise Software', 'React & Node.js', 'Cloud Fundamentals'],
    renderTrophy: (theme, isLarge) => <CrystalStarObelisk theme={theme} isLarge={isLarge} />
  },
  {
    id: 3,
    value: '2',
    suffix: '+',
    title: 'Mentored Cohorts',
    shortDesc: 'Guided 60+ ambitious students through foundational and practical AI/ML architectures and deep networks.',
    category: 'TECH MENTORSHIP',
    shelfTag: 'LEADERSHIP & MENTORSHIP',
    accent: '#0ea5e9', // Ice Sapphire
    plaqueTitle: 'AI/ML STUDENT MENTORSHIP · 2+ COHORTS',
    detailedStory: 'Spearheaded two student mentorship cohorts, delivering hands-on technical guidance to 60+ aspiring engineers. Formulated a project-based curriculum covering Deep Learning, Neural Network architectures, Computer Vision pipelines, and Generative AI, transforming abstract mathematics into deployable code prototypes.',
    breakdown: [
      { label: 'STUDENTS MENTORED', val: '60+ Learners' },
      { label: 'WORKSHOP SESSIONS', val: '8 Deliveries' },
      { label: 'AI CAPSTONES', val: '12 Prototypes' },
      { label: 'COHORT RETENTION', val: '96% Rate' },
    ],
    tags: ['Artificial Intelligence', 'Deep Learning', 'PyTorch', 'Computer Vision', 'Generative AI', 'Curriculum Design', 'Public Speaking'],
    renderTrophy: (theme, isLarge) => <LaurelTorchOfMentorship theme={theme} isLarge={isLarge} />
  },
  {
    id: 4,
    value: '1',
    suffix: '',
    title: 'Govt. Campus Ambassador',
    shortDesc: 'Official representative for MyGov digital democracy platform & national citizen tech initiatives.',
    category: 'PUBLIC REPRESENTATION',
    shelfTag: 'CAMPUS AMBASSADOR',
    accent: '#8b5cf6', // Royal Purple / Amethyst
    plaqueTitle: 'OFFICIAL MYGOV CAMPUS AMBASSADOR',
    detailedStory: 'Appointed as the official Campus Ambassador representing the Government of India’s flagship digital governance initiative, MyGov. Catalyzed campus participation across nationwide citizen engagement challenges, civic tech hackathons, and public digital literacy drives, connecting youth talent with state innovation programs.',
    breakdown: [
      { label: 'PLATFORM', val: 'MyGov India' },
      { label: 'CAMPUS REACH', val: '500+ Students' },
      { label: 'CIVIC CAMPAIGNS', val: '5 Hackathons' },
      { label: 'COMMENDATION', val: 'Official Certificate' },
    ],
    tags: ['MyGov India', 'Digital Democracy', 'Public Tech', 'Youth Engagement', 'Hackathon Organizing', 'Government Initiatives'],
    renderTrophy: (theme, isLarge) => <CrownGlobeOfAmbassador theme={theme} isLarge={isLarge} />
  }
];

function Achievements({ theme = 'dark' }) {
  const isLight = theme === 'light';
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Keyboard navigation for zoom modal
  const handlePrevTrophy = useCallback(() => {
    if (!selectedAchievement) return;
    const currIdx = STATS.findIndex(s => s.id === selectedAchievement.id);
    const prevIdx = (currIdx - 1 + STATS.length) % STATS.length;
    setSelectedAchievement(STATS[prevIdx]);
  }, [selectedAchievement]);

  const handleNextTrophy = useCallback(() => {
    if (!selectedAchievement) return;
    const currIdx = STATS.findIndex(s => s.id === selectedAchievement.id);
    const nextIdx = (currIdx + 1) % STATS.length;
    setSelectedAchievement(STATS[nextIdx]);
  }, [selectedAchievement]);

  useEffect(() => {
    if (!selectedAchievement) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedAchievement(null);
      if (e.key === 'ArrowLeft') handlePrevTrophy();
      if (e.key === 'ArrowRight') handleNextTrophy();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAchievement, handlePrevTrophy, handleNextTrophy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        {/* Section Header */}
        <div className="achievements-header">
          <span className="section-label">05 / ACHIEVEMENTS</span>
          <h2 className="section-title">Showcase Wall & Milestones</h2>
          <p className="achievements-subtitle">
            Four individual trophy shelves celebrating key technical feats and leadership impact. Tap any shelf to inspect in 3D zoom.
          </p>
        </div>

        {/* 4 Individual Wall Trophy Shelves Grid (Home Showcase Shelf Style) */}
        <motion.div 
          className="trophy-wall-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {STATS.map((stat) => (
            <motion.div 
              key={stat.id} 
              className="trophy-wall-shelf-card"
              variants={itemVariants}
              onClick={() => setSelectedAchievement(stat)}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedAchievement(stat);
                }
              }}
              aria-label={`Inspect ${stat.title} trophy shelf`}
            >
              {/* Overhead Spotlight Beam illuminating the shelf from above */}
              <div 
                className="shelf-spotlight" 
                style={{ 
                  background: isLight
                    ? `radial-gradient(ellipse at top, ${stat.accent}14 0%, transparent 65%)`
                    : `radial-gradient(ellipse at top, ${stat.accent}24 0%, transparent 70%)` 
                }} 
              />

              {/* Trophy Presentation Area */}
              <div className="shelf-trophy-stage">
                <motion.div 
                  className="trophy-float-wrapper"
                  animate={{ 
                    y: [0, -6, 0],
                    rotateY: [0, 6, -6, 0]
                  }}
                  transition={{ 
                    duration: 5.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: stat.id * 0.4
                  }}
                >
                  {stat.renderTrophy(theme, false)}
                </motion.div>

                {/* Ground Contact Shadow on the Shelf Surface */}
                <div className="trophy-shelf-shadow" />
              </div>

              {/* Architectural Wall Shelf Plank (Home Wall Showcase Shelf) */}
              <div className="shelf-plank">
                {/* Shelf Top Surface (where the trophy stands) */}
                <div className="shelf-top-surface" />

                {/* Shelf Front Beveled Face with Engraved Brass Plaque */}
                <div className="shelf-front-bevel">
                  <div className="shelf-brass-tag">
                    <span className="shelf-screw" />
                    <span className="shelf-tag-label">{stat.shelfTag}</span>
                    <span className="shelf-screw" />
                  </div>
                </div>

                {/* Shelf Underside Wall Shadow */}
                <div className="shelf-underside-shadow" />

                {/* Wall Mounting Metal Brackets */}
                <div className="shelf-bracket left" />
                <div className="shelf-bracket right" />
              </div>

              {/* Achievement Info Card underneath the shelf */}
              <div className="shelf-info-card">
                <div className="shelf-card-top-row">
                  <span className="shelf-cat-badge" style={{ color: stat.accent, borderColor: `${stat.accent}40` }}>
                    {stat.category}
                  </span>
                  <span className="shelf-inspect-pill">
                    ZOOM 🔍
                  </span>
                </div>

                <div className="shelf-metric-row">
                  <span className="shelf-metric-number" style={{ color: stat.accent }}>
                    <CountUp to={stat.value} suffix={stat.suffix} />
                  </span>
                  <h3 className="shelf-card-title">{stat.title}</h3>
                </div>

                <p className="shelf-card-desc">{stat.shortDesc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ====================================================================
          INTERACTIVE ZOOM-IN TROPHY INSPECTION STAGE (Click to Zoom & Explain)
          ==================================================================== */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div 
            className="trophy-zoom-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div 
              className="trophy-zoom-modal-card"
              initial={{ scale: 0.86, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                type="button"
                className="trophy-modal-close-btn"
                onClick={() => setSelectedAchievement(null)}
                title="Close inspection"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="trophy-modal-layout">
                {/* Left Side: 3D Spotlight Trophy Stage */}
                <div className="trophy-modal-stage">
                  {/* Gallery Spotlight Cone */}
                  <div 
                    className="modal-gallery-spotlight"
                    style={{
                      background: isLight
                        ? `radial-gradient(circle at 50% 20%, ${selectedAchievement.accent}14 0%, transparent 65%)`
                        : `radial-gradient(circle at 50% 20%, ${selectedAchievement.accent}30 0%, transparent 70%)`
                    }}
                  />

                  {/* 3D Floating / Rotating Trophy */}
                  <motion.div 
                    className="modal-trophy-wrapper"
                    animate={{ 
                      y: [0, -10, 0],
                      rotateY: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {selectedAchievement.renderTrophy(theme, true)}
                  </motion.div>

                  {/* Heavy Pedestal Plinth Base with Engraved Nameplate */}
                  <div className="modal-pedestal-plinth">
                    <span className="modal-plinth-brass-text">
                      {selectedAchievement.plaqueTitle}
                    </span>
                  </div>

                  {/* Soft Ground Contact Shadow */}
                  <div className="modal-trophy-shadow" />
                </div>

                {/* Right Side: Deep Milestone Dossier & Story */}
                <div className="trophy-modal-dossier">
                  {/* Category Pill */}
                  <div className="dossier-category-badge" style={{ color: selectedAchievement.accent }}>
                    <span className="dossier-badge-dot" style={{ backgroundColor: selectedAchievement.accent }} />
                    {selectedAchievement.category}
                  </div>

                  {/* Huge Milestone Metric */}
                  <div className="dossier-metric-display" style={{ color: selectedAchievement.accent }}>
                    {selectedAchievement.value}{selectedAchievement.suffix}
                  </div>

                  <h2 className="dossier-title">{selectedAchievement.title}</h2>

                  {/* Full Story Description */}
                  <p className="dossier-detailed-story">{selectedAchievement.detailedStory}</p>

                  {/* 4-Box Metric Breakdown */}
                  <div className="dossier-breakdown-grid">
                    {selectedAchievement.breakdown.map((item, idx) => (
                      <div key={idx} className="dossier-stat-box">
                        <span className="dossier-stat-label">{item.label}</span>
                        <span className="dossier-stat-val" style={{ color: selectedAchievement.accent }}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Key Tech & Skills Pills */}
                  <div className="dossier-tags-row">
                    {selectedAchievement.tags.map((tag, idx) => (
                      <span key={idx} className="dossier-tag-pill">{tag}</span>
                    ))}
                  </div>

                  {/* Tour Navigation Controls (Prev / Indicator / Next) */}
                  <div className="dossier-nav-bar">
                    <button 
                      type="button" 
                      className="dossier-nav-btn"
                      onClick={handlePrevTrophy}
                      title="Inspect previous trophy"
                      aria-label="Previous trophy"
                    >
                      ◄ PREV TROPHY
                    </button>
                    
                    <span className="dossier-counter">
                      TROPHY {STATS.findIndex(s => s.id === selectedAchievement.id) + 1} OF {STATS.length}
                    </span>

                    <button 
                      type="button" 
                      className="dossier-nav-btn"
                      onClick={handleNextTrophy}
                      title="Inspect next trophy"
                      aria-label="Next trophy"
                    >
                      NEXT TROPHY ►
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default React.memo(Achievements);
