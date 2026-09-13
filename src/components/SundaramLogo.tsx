import React from "react";

interface SundaramLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
}

export function SundaramLogo({ size = 44, className = "", showText = false }: SundaramLogoProps) {
  const id = React.useId().replace(/:/g, "_");

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="relative flex items-center justify-center shrink-0"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]"
        >
          <defs>
            {/* Main Cyber Gradient */}
            <linearGradient id={`cyberGrad_${id}`} x1="30" y1="20" x2="170" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00d2ff" />
              <stop offset="35%" stopColor="#3b82f6" />
              <stop offset="70%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Circuit Line Gradient */}
            <linearGradient id={`orbitGrad_${id}`} x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00b4d8" />
              <stop offset="50%" stopColor="#0066ff" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>

            {/* Core Badge Gradient */}
            <linearGradient id={`coreGrad_${id}`} x1="75" y1="75" x2="125" y2="125" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0b1120" />
              <stop offset="100%" stopColor="#030712" />
            </linearGradient>

            {/* Letter S Gradient */}
            <linearGradient id={`sGrad_${id}`} x1="85" y1="80" x2="115" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#e0e7ff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Subtle glow filter */}
            <filter id={`neonGlow_${id}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 1. Outer Orbit Ring with Circuit Nodes */}
          {/* Main outer ring segments */}
          <circle
            cx="100"
            cy="100"
            r="82"
            stroke={`url(#orbitGrad_${id})`}
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.9"
          />

          {/* Radial circuit node lines & dots */}
          {/* Node 1: Top Right (approx 60 deg) */}
          <line x1="141" y1="29" x2="155" y2="20" stroke="#00d2ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="155" cy="20" r="4.5" fill="#00d2ff" />

          {/* Node 2: Top (approx 75 deg) */}
          <line x1="121" y1="19" x2="128" y2="9" stroke="#00b4d8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="128" cy="9" r="4" fill="#00d2ff" />

          {/* Node 3: Top Left (approx 125 deg) */}
          <line x1="53" y1="33" x2="42" y2="23" stroke="#0099ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="42" cy="23" r="4.5" fill="#0099ff" />

          {/* Node 4: Far Left (approx 160 deg) */}
          <line x1="23" y1="72" x2="12" y2="67" stroke="#0077ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="12" cy="67" r="4" fill="#0088ff" />

          {/* Node 5: Far Right (approx 20 deg) */}
          <line x1="177" y1="72" x2="188" y2="67" stroke="#0099ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="188" cy="67" r="4" fill="#0099ff" />

          {/* Node 6: Bottom Left (approx 220 deg) */}
          <line x1="37" y1="147" x2="25" y2="155" stroke="#0066ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="25" cy="155" r="4.5" fill="#0066ff" />

          {/* Node 7: Bottom (approx 255 deg) */}
          <line x1="68" y1="175" x2="60" y2="187" stroke="#0077ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="187" r="4.5" fill="#0077ff" />

          {/* Node 8: Bottom Right (approx 330 deg) */}
          <line x1="163" y1="147" x2="175" y2="155" stroke="#0066ff" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="175" cy="155" r="4.5" fill="#0066ff" />

          {/* 2. Middle Cyber Rings with Dynamic Diagonal Cut Slits */}
          {/* Segmented outer ring */}
          <circle
            cx="100"
            cy="100"
            r="67"
            stroke={`url(#cyberGrad_${id})`}
            strokeWidth="5"
            strokeDasharray="95 15 120 15"
            strokeDashoffset="25"
            strokeLinecap="round"
          />

          {/* Inner concentric ring */}
          <circle
            cx="100"
            cy="100"
            r="54"
            stroke={`url(#cyberGrad_${id})`}
            strokeWidth="4"
            strokeDasharray="80 12 110 12"
            strokeDashoffset="10"
            strokeLinecap="round"
          />

          {/* 3. Dynamic Diagonal Slanted Aperture Blades / Cross-Arms */}
          {/* Top-Right to Bottom-Left Blade Angle */}
          <path
            d="M 125 18 L 88 95 L 60 178"
            stroke={`url(#cyberGrad_${id})`}
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          {/* Top-Left to Bottom-Right Cross-Spoke */}
          <path
            d="M 38 78 L 162 122"
            stroke={`url(#cyberGrad_${id})`}
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* 4. Iris Aperture Petals (Curved Diamond Star surround) */}
          <path
            d="M 100 58 Q 120 72 142 100 Q 120 128 100 142 Q 80 128 58 100 Q 80 72 100 58 Z"
            stroke={`url(#cyberGrad_${id})`}
            strokeWidth="3.5"
            fill="none"
            strokeLinejoin="round"
          />
          {/* Inner curved petal facets */}
          <path
            d="M 100 68 C 114 80 124 92 132 100 C 124 108 114 120 100 132 C 86 120 76 108 68 100 C 76 92 86 80 100 68 Z"
            stroke={`url(#cyberGrad_${id})`}
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />

          {/* 5. Center Circular Core Disc with Neon Rim */}
          <circle
            cx="100"
            cy="100"
            r="28"
            fill={`url(#coreGrad_${id})`}
            stroke={`url(#cyberGrad_${id})`}
            strokeWidth="3.5"
          />

          {/* 6. Central Letter "S" Badge */}
          <text
            x="100"
            y="110"
            textAnchor="middle"
            fill={`url(#sGrad_${id})`}
            fontSize="30"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.5px"
            filter={`url(#neonGlow_${id})`}
          >
            S
          </text>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col select-none">
          <span className="text-xl lg:text-2xl font-black tracking-wider bg-gradient-to-r from-[#00d2ff] via-[#60a5fa] to-[#c084fc] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            SUNDARAM
          </span>
          <span className="text-[10px] font-bold tracking-[0.32em] text-[#a78bfa] uppercase -mt-0.5">
            TECH
          </span>
        </div>
      )}
    </div>
  );
}
