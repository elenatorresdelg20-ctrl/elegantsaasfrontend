"use client"

import { useState, useEffect, useCallback } from "react"
import { cn } from "@/lib/utils"

interface ParrotMascotProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
  mood?: "idle" | "thinking" | "talking" | "happy" | "waving" | "sleeping" | "excited"
  className?: string
  onClick?: () => void
  showName?: boolean
  interactive?: boolean
}

export function ParrotMascot({
  size = "md",
  mood = "idle",
  className,
  onClick,
  showName = false,
  interactive = true,
}: ParrotMascotProps) {
  const [blinking, setBlinking] = useState(false)
  const [currentMood, setCurrentMood] = useState(mood)
  const [isHovered, setIsHovered] = useState(false)

  // Sync mood with prop changes
  useEffect(() => {
    setCurrentMood(mood)
  }, [mood])

  // Blink animation
  useEffect(() => {
    if (currentMood === "sleeping") return

    const blinkInterval = setInterval(
      () => {
        setBlinking(true)
        setTimeout(() => setBlinking(false), 150)
      },
      2500 + Math.random() * 2000,
    )

    return () => clearInterval(blinkInterval)
  }, [currentMood])

  // Interactive hover effect
  const handleMouseEnter = useCallback(() => {
    if (!interactive) return
    setIsHovered(true)
    if (currentMood === "idle") {
      setCurrentMood("happy")
    }
  }, [interactive, currentMood])

  const handleMouseLeave = useCallback(() => {
    if (!interactive) return
    setIsHovered(false)
    if (mood === "idle") {
      setCurrentMood("idle")
    }
  }, [interactive, mood])

  const handleClick = useCallback(() => {
    if (!interactive) {
      onClick?.()
      return
    }
    setCurrentMood("excited")
    setTimeout(() => setCurrentMood(mood), 1000)
    onClick?.()
  }, [interactive, mood, onClick])

  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
    "2xl": "w-48 h-48",
  }

  const eyeSize = {
    xs: { outer: 3, inner: 1.5, highlight: 0.5 },
    sm: { outer: 4, inner: 2, highlight: 0.8 },
    md: { outer: 5, inner: 3, highlight: 1 },
    lg: { outer: 6, inner: 3.5, highlight: 1.2 },
    xl: { outer: 7, inner: 4, highlight: 1.5 },
    "2xl": { outer: 8, inner: 5, highlight: 2 },
  }

  const eyes = eyeSize[size]

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "relative cursor-pointer select-none transition-all duration-300",
          sizeClasses[size],
          interactive && "hover:scale-110",
          isHovered && "drop-shadow-[0_0_15px_rgba(37,99,235,0.5)]",
        )}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg
          viewBox="0 0 100 100"
          className={cn(
            "h-full w-full transition-transform",
            currentMood !== "thinking" &&
              currentMood !== "sleeping" &&
              "animate-[bounce-gentle_3s_ease-in-out_infinite]",
          )}
        >
          <defs>
            {/* Gradients for depth */}
            <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="bellyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F8FBFE" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="hatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="wingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="chartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
            {/* Glow filter */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Shadow */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.2" />
            </filter>
          </defs>

          {/* Shadow ellipse */}
          <ellipse
            cx="50"
            cy="95"
            rx="18"
            ry="4"
            fill="rgba(0,0,0,0.15)"
            className={cn(
              "transition-all duration-300",
              currentMood === "excited" && "animate-[pulse_0.5s_ease-in-out_infinite]",
            )}
          />

          {/* Tail feathers */}
          <g className={cn(currentMood === "excited" && "animate-[waggle_0.3s_ease-in-out_infinite]")}>
            <path
              d="M38 82 Q30 95 35 102"
              stroke="url(#wingGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
            <path d="M50 85 Q50 98 50 105" stroke="#1E40AF" strokeWidth="5" strokeLinecap="round" fill="none" />
            <path
              d="M62 82 Q70 95 65 102"
              stroke="url(#wingGradient)"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Body */}
          <ellipse cx="50" cy="62" rx="24" ry="28" fill="url(#bodyGradient)" filter="url(#shadow)" />

          {/* Belly */}
          <ellipse cx="50" cy="66" rx="16" ry="20" fill="url(#bellyGradient)" />

          {/* Belly feather details */}
          <path d="M42 58 Q50 62 58 58" stroke="#CBD5E1" strokeWidth="0.5" fill="none" opacity="0.5" />
          <path d="M40 65 Q50 70 60 65" stroke="#CBD5E1" strokeWidth="0.5" fill="none" opacity="0.5" />
          <path d="M42 72 Q50 77 58 72" stroke="#CBD5E1" strokeWidth="0.5" fill="none" opacity="0.5" />

          {/* Left wing */}
          <g
            className={cn(
              "origin-[30px_55px] transition-transform",
              currentMood === "waving" && "animate-[wave_0.6s_ease-in-out_infinite]",
              currentMood === "excited" && "animate-[flap_0.2s_ease-in-out_infinite]",
            )}
          >
            <path d="M26 50 Q14 62 18 78 Q26 72 30 60 Q28 54 26 50" fill="url(#wingGradient)" filter="url(#shadow)" />
            <path d="M28 55 Q20 65 22 72" stroke="#60A5FA" strokeWidth="1.5" fill="none" opacity="0.6" />
            <path d="M26 58 Q20 66 21 70" stroke="#93C5FD" strokeWidth="1" fill="none" opacity="0.4" />
          </g>

          {/* Right wing with chart icon */}
          <g
            className={cn(
              "origin-[70px_55px] transition-transform",
              currentMood === "waving" && "animate-[wave-reverse_0.6s_ease-in-out_infinite]",
              currentMood === "excited" && "animate-[flap-reverse_0.2s_ease-in-out_infinite]",
            )}
          >
            <path d="M74 50 Q86 62 82 78 Q74 72 70 60 Q72 54 74 50" fill="url(#wingGradient)" filter="url(#shadow)" />
            <path d="M72 55 Q80 65 78 72" stroke="#60A5FA" strokeWidth="1.5" fill="none" opacity="0.6" />

            {/* Chart badge on wing */}
            <g transform="translate(76, 58) scale(0.35)" filter="url(#glow)">
              <circle cx="15" cy="15" r="14" fill="white" stroke="#2563EB" strokeWidth="2" />
              <rect x="5" y="17" width="4" height="9" fill="#2563EB" rx="1" />
              <rect x="11" y="11" width="4" height="15" fill="url(#chartGradient)" rx="1" />
              <rect x="17" y="6" width="4" height="20" fill="#2563EB" rx="1" />
              <circle cx="7" cy="12" r="1.5" fill="#22C55E" />
              <circle cx="13" cy="7" r="1.5" fill="#22C55E" />
              <circle cx="19" cy="3" r="1.5" fill="#22C55E" />
              <path d="M7 12 L13 7 L19 3" stroke="#22C55E" strokeWidth="1" fill="none" />
            </g>
          </g>

          {/* Head */}
          <circle cx="50" cy="32" r="20" fill="url(#bodyGradient)" filter="url(#shadow)" />

          {/* Face patch */}
          <ellipse cx="50" cy="35" rx="14" ry="12" fill="url(#bellyGradient)" />

          {/* Hat */}
          <g
            className={cn(
              "origin-[50px_15px]",
              currentMood === "happy" && "animate-[tilt_0.5s_ease-in-out_infinite]",
              currentMood === "excited" && "animate-[jump_0.3s_ease-in-out_infinite]",
            )}
          >
            {/* Hat brim */}
            <ellipse cx="50" cy="18" rx="24" ry="7" fill="#1E40AF" />
            {/* Hat top */}
            <path d="M30 18 Q30 2 50 2 Q70 2 70 18" fill="url(#hatGradient)" />
            {/* Hat band */}
            <rect x="30" y="14" width="40" height="5" fill="#1E3A8A" />
            {/* Hat shine */}
            <path
              d="M38 8 Q42 4 50 4"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />
          </g>

          {/* Eyes */}
          <g>
            {/* Left eye */}
            <ellipse
              cx="40"
              cy="30"
              rx={eyes.outer}
              ry={currentMood === "sleeping" ? 0.5 : eyes.outer}
              fill="white"
              className="transition-all duration-150"
            />
            {currentMood !== "sleeping" && (
              <>
                <circle
                  cx={currentMood === "thinking" ? 38 : 41}
                  cy="30"
                  r={blinking ? 0.5 : eyes.inner}
                  fill="#1E3A5F"
                  className="transition-all duration-100"
                />
                <circle cx="43" cy="28" r={eyes.highlight} fill="white" />
              </>
            )}

            {/* Right eye */}
            <ellipse
              cx="60"
              cy="30"
              rx={eyes.outer}
              ry={currentMood === "sleeping" ? 0.5 : eyes.outer}
              fill="white"
              className="transition-all duration-150"
            />
            {currentMood !== "sleeping" && (
              <>
                <circle
                  cx={currentMood === "thinking" ? 58 : 61}
                  cy="30"
                  r={blinking ? 0.5 : eyes.inner}
                  fill="#1E3A5F"
                  className="transition-all duration-100"
                />
                <circle cx="63" cy="28" r={eyes.highlight} fill="white" />
              </>
            )}
          </g>

          {/* Eyebrows for expressions */}
          {currentMood === "thinking" && (
            <g>
              <path d="M35 24 Q40 22 45 24" stroke="#1E3A5F" strokeWidth="1.5" fill="none" />
              <path d="M55 24 Q60 22 65 24" stroke="#1E3A5F" strokeWidth="1.5" fill="none" />
            </g>
          )}
          {currentMood === "excited" && (
            <g>
              <path d="M35 23 L45 25" stroke="#1E3A5F" strokeWidth="1.5" fill="none" />
              <path d="M55 25 L65 23" stroke="#1E3A5F" strokeWidth="1.5" fill="none" />
            </g>
          )}

          {/* Beak */}
          <g
            className={cn(
              "origin-[50px_42px]",
              currentMood === "talking" && "animate-[talk_0.3s_ease-in-out_infinite]",
            )}
          >
            {/* Upper beak */}
            <path d="M50 38 Q43 41 45 46 Q50 44 55 46 Q57 41 50 38" fill="#F59E0B" stroke="#D97706" strokeWidth="0.5" />
            {/* Lower beak */}
            <path
              d="M46 46 Q50 49 54 46"
              fill="#FCD34D"
              stroke="#D97706"
              strokeWidth="0.5"
              className={cn(currentMood === "talking" && "animate-[beak_0.15s_ease-in-out_infinite]")}
            />
            {/* Beak shine */}
            <path d="M48 40 Q50 39 52 40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
          </g>

          {/* Cheek blush */}
          <ellipse
            cx="32"
            cy="38"
            rx="4"
            ry="3"
            fill="#FDA4AF"
            opacity={currentMood === "happy" || currentMood === "excited" ? "0.7" : "0.4"}
          />
          <ellipse
            cx="68"
            cy="38"
            rx="4"
            ry="3"
            fill="#FDA4AF"
            opacity={currentMood === "happy" || currentMood === "excited" ? "0.7" : "0.4"}
          />

          {/* Feet */}
          <g>
            <path
              d="M38 88 L35 94 M38 88 L38 94 M38 88 L41 94"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M62 88 L59 94 M62 88 L62 94 M62 88 L65 94"
              stroke="#F59E0B"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </g>

          {/* Thinking bubbles */}
          {currentMood === "thinking" && (
            <g>
              <circle
                cx="80"
                cy="20"
                r="3"
                fill="#60A5FA"
                opacity="0.5"
                className="animate-[float_1.5s_ease-in-out_infinite]"
              />
              <circle
                cx="86"
                cy="12"
                r="4"
                fill="#60A5FA"
                opacity="0.6"
                className="animate-[float_1.5s_ease-in-out_infinite_0.2s]"
              />
              <circle
                cx="92"
                cy="4"
                r="5"
                fill="#60A5FA"
                opacity="0.7"
                className="animate-[float_1.5s_ease-in-out_infinite_0.4s]"
              />
            </g>
          )}

          {/* Happy sparkles */}
          {(currentMood === "happy" || currentMood === "excited") && (
            <g filter="url(#glow)">
              <path
                d="M15 25 L17 20 L19 25 L24 27 L19 29 L17 34 L15 29 L10 27 Z"
                fill="#22C55E"
                className="animate-[sparkle_1s_ease-in-out_infinite]"
              />
              <path
                d="M80 40 L82 36 L84 40 L88 42 L84 44 L82 48 L80 44 L76 42 Z"
                fill="#22C55E"
                className="animate-[sparkle_1s_ease-in-out_infinite_0.3s]"
              />
              {currentMood === "excited" && (
                <>
                  <path
                    d="M25 55 L26 52 L27 55 L30 56 L27 57 L26 60 L25 57 L22 56 Z"
                    fill="#3B82F6"
                    className="animate-[sparkle_0.8s_ease-in-out_infinite_0.5s]"
                  />
                  <path
                    d="M75 20 L76 17 L77 20 L80 21 L77 22 L76 25 L75 22 L72 21 Z"
                    fill="#F59E0B"
                    className="animate-[sparkle_0.8s_ease-in-out_infinite_0.7s]"
                  />
                </>
              )}
            </g>
          )}

          {/* Sleeping Zs */}
          {currentMood === "sleeping" && (
            <g className="animate-[float_2s_ease-in-out_infinite]">
              <text x="70" y="20" fill="#60A5FA" fontSize="10" fontWeight="bold" opacity="0.7">
                Z
              </text>
              <text x="78" y="12" fill="#60A5FA" fontSize="8" fontWeight="bold" opacity="0.5">
                z
              </text>
              <text x="84" y="6" fill="#60A5FA" fontSize="6" fontWeight="bold" opacity="0.3">
                z
              </text>
            </g>
          )}
        </svg>
      </div>

      {showName && (
        <span
          className={cn(
            "font-bold text-primary transition-all",
            size === "xs" && "text-[8px]",
            size === "sm" && "text-xs",
            size === "md" && "text-sm",
            size === "lg" && "text-base",
            size === "xl" && "text-lg",
            size === "2xl" && "text-xl",
          )}
        >
          Parrot
        </span>
      )}

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-25deg); }
        }
        @keyframes wave-reverse {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(25deg); }
        }
        @keyframes flap {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        @keyframes flap-reverse {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(15deg); }
        }
        @keyframes talk {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.85); }
        }
        @keyframes beak {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(2px); }
        }
        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes jump {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(5deg); }
        }
        @keyframes waggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-5deg); }
          75% { transform: rotate(5deg); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.7); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}
