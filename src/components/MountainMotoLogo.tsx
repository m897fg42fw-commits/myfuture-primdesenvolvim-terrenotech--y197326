import React from 'react'

interface MountainMotoLogoProps {
  variant?: 'icon' | 'badge' | 'hero' | 'card'
  className?: string
  showText?: boolean
  subtext?: string
}

/**
 * MountainMotoLogo
 * Ilustração própria SVG: Moto trail/naked no cume do Morro Fortaleza (RS)
 * com camadas de montanhas verdes em degradê e céu noturno tech com estrelas/brilho suave.
 *
 * Variantes:
 * - 'icon': versão compacta (40x40 ou custom), ideal para header/favicon/botões.
 * - 'badge': versão média para telas de login/registro.
 * - 'hero': versão horizontal rica e panorâmica para banner/destaque do catálogo.
 * - 'card': versão média para cards de destaque.
 */
export const MountainMotoLogo: React.FC<MountainMotoLogoProps> = ({
  variant = 'icon',
  className = '',
  showText = false,
  subtext,
}) => {
  // ÍCONE COMPACTO PARA HEADER / LOGO
  if (variant === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-10 h-10 select-none ${className}`}
        aria-label="Logo Terrenotech - Moto no Morro Fortaleza"
      >
        <defs>
          <linearGradient
            id="iconSky"
            x1="50"
            y1="0"
            x2="50"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#070F26" />
            <stop offset="0.4" stopColor="#0B132B" />
            <stop offset="0.8" stopColor="#101A30" />
            <stop offset="1" stopColor="#0F241C" />
          </linearGradient>

          <linearGradient
            id="iconBorder"
            x1="0"
            y1="0"
            x2="100"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#1E3A8A" />
            <stop offset="0.3" stopColor="#3B82F6" />
            <stop offset="0.7" stopColor="#22D3EE" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>

          <linearGradient
            id="iconMountBack"
            x1="0"
            y1="50"
            x2="100"
            y2="90"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#064E3B" stopOpacity="0.8" />
            <stop offset="1" stopColor="#047857" stopOpacity="0.7" />
          </linearGradient>

          <linearGradient
            id="iconMountFront"
            x1="0"
            y1="65"
            x2="80"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10B981" />
            <stop offset="0.6" stopColor="#059669" />
            <stop offset="1" stopColor="#064E3B" />
          </linearGradient>

          <radialGradient id="iconMoonGlow" cx="28" cy="28" r="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" stopOpacity="0.4" />
            <stop offset="0.7" stopColor="#8B5CF6" stopOpacity="0.15" />
            <stop offset="1" stopColor="#0B0D12" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Borda externa com gradiente tech e cantos arredondados */}
        <rect
          x="1.5"
          y="1.5"
          width="97"
          height="97"
          rx="22"
          fill="url(#iconSky)"
          stroke="url(#iconBorder)"
          strokeWidth="2.5"
        />

        {/* Brilho da lua / aurora tech */}
        <circle cx="28" cy="28" r="22" fill="url(#iconMoonGlow)" />
        <circle cx="28" cy="26" r="6" fill="#F4F5F7" fillOpacity="0.95" />
        <circle cx="30" cy="25" r="5" fill="#151A26" />

        {/* Estrelinhas discretas no céu noturno */}
        <circle cx="68" cy="18" r="1" fill="#22D3EE" fillOpacity="0.8" />
        <circle cx="82" cy="28" r="1.2" fill="#F4F5F7" fillOpacity="0.9" />
        <circle cx="48" cy="14" r="0.8" fill="#F4F5F7" fillOpacity="0.6" />

        {/* Camada 1: Cânions/Montanhas distantes do RS */}
        <path d="M2 72 Q 24 52 48 64 T 98 62 L 98 98 L 2 98 Z" fill="url(#iconMountBack)" />

        {/* Camada 2: Morro Fortaleza com vegetação verde viva */}
        <path d="M2 84 Q 28 66 52 68 Q 72 70 98 80 L 98 98 L 2 98 Z" fill="url(#iconMountFront)" />

        {/* Pico do platô onde a moto está estacionada */}
        <path
          d="M28 72 C 38 70 60 70 70 73 L 72 77 C 58 75 38 75 26 76 Z"
          fill="#34D399"
          fillOpacity="0.9"
        />

        {/* SILHUETA DA MOTO TRAIL (estacionada no cume com descanso) */}
        {/* Roda traseira */}
        <circle
          cx="42"
          cy="67"
          r="4.8"
          stroke="#0B0D12"
          strokeWidth="2"
          fill="#22D3EE"
          fillOpacity="0.3"
        />
        <circle cx="42" cy="67" r="1.5" fill="#22D3EE" />

        {/* Roda dianteira */}
        <circle
          cx="62"
          cy="65.5"
          r="5.2"
          stroke="#0B0D12"
          strokeWidth="2"
          fill="#22D3EE"
          fillOpacity="0.3"
        />
        <circle cx="62" cy="65.5" r="1.5" fill="#22D3EE" />

        {/* Quadro, motor e tanque trail da moto */}
        <path d="M 42 67 L 48 61 L 54 60 L 59 55 L 57 53 L 50 54 L 46 59 Z" fill="#F4F5F7" />

        {/* Garfo dianteiro telescópico e guidão */}
        <line
          x1="62"
          y1="65.5"
          x2="57"
          y2="52"
          stroke="#22D3EE"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M 55 52 L 59 51 L 58 49"
          stroke="#34D399"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Farol dianteiro aceso iluminando o cânion */}
        <polygon points="60,53 82,50 82,58 60,55" fill="#22D3EE" fillOpacity="0.35" />
        <line
          x1="58"
          y1="53.5"
          x2="62"
          y2="53.5"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Banco e rabeta trail */}
        <path d="M 44 58 Q 48 57 52 57" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" />

        {/* Descanso lateral / pezinho apoiado no morro */}
        <line
          x1="48"
          y1="63"
          x2="46"
          y2="71"
          stroke="#0B0D12"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  // BADGE / TELA DE LOGIN / REGISTRO
  if (variant === 'badge') {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <svg
          viewBox="0 0 200 130"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-48 h-32 select-none filter drop-shadow-xl"
          aria-label="Ilustração Terrenotech - Morro Fortaleza"
        >
          <defs>
            <linearGradient
              id="badgeSky"
              x1="100"
              y1="0"
              x2="100"
              y2="130"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#0B0D12" />
              <stop offset="0.5" stopColor="#131926" />
              <stop offset="1" stopColor="#09291D" />
            </linearGradient>

            <linearGradient
              id="badgeBorder"
              x1="0"
              y1="0"
              x2="200"
              y2="130"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B5CF6" />
              <stop offset="0.5" stopColor="#22D3EE" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>

            <linearGradient
              id="badgeMountFar"
              x1="0"
              y1="60"
              x2="200"
              y2="120"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#064E3B" stopOpacity="0.8" />
              <stop offset="1" stopColor="#047857" stopOpacity="0.5" />
            </linearGradient>

            <linearGradient
              id="badgeMountNear"
              x1="0"
              y1="80"
              x2="180"
              y2="130"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#10B981" />
              <stop offset="0.5" stopColor="#059669" />
              <stop offset="1" stopColor="#064E3B" />
            </linearGradient>

            <radialGradient id="badgeGlow" cx="60" cy="35" r="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22D3EE" stopOpacity="0.3" />
              <stop offset="0.6" stopColor="#8B5CF6" stopOpacity="0.1" />
              <stop offset="1" stopColor="#0B0D12" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Fundo do card badge */}
          <rect
            x="2"
            y="2"
            width="196"
            height="126"
            rx="20"
            fill="url(#badgeSky)"
            stroke="url(#badgeBorder)"
            strokeWidth="1.5"
          />

          {/* Brilho de lua no Morro Fortaleza */}
          <circle cx="60" cy="35" r="30" fill="url(#badgeGlow)" />
          <circle cx="58" cy="32" r="9" fill="#F4F5F7" fillOpacity="0.9" />
          <circle cx="61" cy="30" r="7.5" fill="#131926" />

          {/* Estrelas */}
          <circle cx="120" cy="22" r="1.2" fill="#22D3EE" fillOpacity="0.9" />
          <circle cx="160" cy="30" r="1.5" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="140" cy="45" r="1" fill="#F4F5F7" fillOpacity="0.6" />
          <circle cx="30" cy="25" r="1" fill="#22D3EE" fillOpacity="0.7" />

          {/* Camada 1: Cânions de Cambará do Sul / Fortaleza */}
          <path d="M2 95 Q 40 68 85 82 T 198 78 L 198 126 L 2 126 Z" fill="url(#badgeMountFar)" />

          {/* Camada 2: Encostas e morros verdes do RS */}
          <path
            d="M2 110 Q 50 82 105 85 Q 155 88 198 102 L 198 126 L 2 126 Z"
            fill="url(#badgeMountNear)"
          />

          {/* Platô rochoso com vegetação de altitude */}
          <path d="M60 90 C 80 87 125 87 145 92 L 148 98 C 120 95 80 95 55 97 Z" fill="#34D399" />

          {/* MOTO NO PLATÔ (ampliada e nítida) */}
          {/* Luz do farol projetando feixe sobre o morro */}
          <polygon points="128,71 185,63 190,82 128,76" fill="#22D3EE" fillOpacity="0.25" />

          {/* Roda traseira */}
          <circle cx="92" cy="88" r="8" stroke="#0B0D12" strokeWidth="2.5" fill="#1E293B" />
          <circle cx="92" cy="88" r="3" fill="#22D3EE" />

          {/* Roda dianteira */}
          <circle cx="128" cy="86" r="8.5" stroke="#0B0D12" strokeWidth="2.5" fill="#1E293B" />
          <circle cx="128" cy="86" r="3" fill="#22D3EE" />

          {/* Chassi / motor / escape */}
          <path d="M 92 88 L 102 78 L 112 77 L 122 70 L 118 67 L 106 68 L 98 77 Z" fill="#F4F5F7" />

          {/* Tanque e carenagem trail (azul-escuro profundo TT 125 com borda tech) */}
          <path
            d="M 106 68 Q 114 65 119 69 L 115 74 L 105 73 Z"
            fill="#1E3A8A"
            stroke="#3B82F6"
            strokeWidth="0.8"
          />

          {/* Banco do piloto */}
          <path
            d="M 96 74 Q 103 72 108 73"
            stroke="#22D3EE"
            strokeWidth="2.8"
            strokeLinecap="round"
          />

          {/* Garfo telescópico dianteiro */}
          <line
            x1="128"
            y1="86"
            x2="120"
            y2="67"
            stroke="#22D3EE"
            strokeWidth="2.4"
            strokeLinecap="round"
          />

          {/* Guidão trail elevado */}
          <path
            d="M 117 66 L 122 65 L 121 62"
            stroke="#10B981"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Farol aceso */}
          <circle cx="124" cy="69" r="2.5" fill="#FFFFFF" />

          {/* Descanso lateral apoiado na pedra */}
          <line
            x1="102"
            y1="83"
            x2="98"
            y2="94"
            stroke="#0B0D12"
            strokeWidth="2.2"
            strokeLinecap="round"
          />

          {/* Pílula discreta Morro Fortaleza - RS */}
          <rect
            x="10"
            y="10"
            width="105"
            height="18"
            rx="9"
            fill="#0B0D12"
            fillOpacity="0.8"
            stroke="#232B3A"
          />
          <text
            x="18"
            y="22"
            fill="#34D399"
            fontSize="8.5"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            ⛰️ Morro Fortaleza • RS
          </text>
        </svg>

        {showText && (
          <div className="mt-2 text-center">
            <span className="font-extrabold text-lg tracking-tight text-white flex items-center justify-center gap-1">
              Terreno<span className="text-[#22D3EE]">tech</span>
            </span>
            {subtext && <p className="text-[11px] text-[#A1A6B3]">{subtext}</p>}
          </div>
        )}
      </div>
    )
  }

  // HERO / BANNER PANORÂMICO DO CATÁLOGO
  return (
    <div className={`relative overflow-hidden rounded-2xl select-none ${className}`}>
      <svg
        viewBox="0 0 600 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-h-[320px] object-cover"
        aria-label="Cenário Terrenotech - Moto no topo do Morro Fortaleza no RS"
      >
        <defs>
          <linearGradient
            id="heroSky"
            x1="300"
            y1="0"
            x2="300"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0B0D12" />
            <stop offset="0.4" stopColor="#111726" />
            <stop offset="0.75" stopColor="#0F241C" />
            <stop offset="1" stopColor="#064E3B" />
          </linearGradient>

          <linearGradient
            id="heroRidge1"
            x1="0"
            y1="120"
            x2="600"
            y2="260"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#064E3B" stopOpacity="0.6" />
            <stop offset="0.5" stopColor="#047857" stopOpacity="0.4" />
            <stop offset="1" stopColor="#0B0D12" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient
            id="heroRidge2"
            x1="0"
            y1="160"
            x2="600"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#047857" stopOpacity="0.8" />
            <stop offset="0.4" stopColor="#059669" stopOpacity="0.7" />
            <stop offset="1" stopColor="#064E3B" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient
            id="heroRidge3"
            x1="0"
            y1="210"
            x2="550"
            y2="320"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10B981" />
            <stop offset="0.6" stopColor="#059669" />
            <stop offset="1" stopColor="#022C22" />
          </linearGradient>

          <radialGradient id="heroMoonGlow" cx="120" cy="70" r="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#22D3EE" stopOpacity="0.35" />
            <stop offset="0.5" stopColor="#8B5CF6" stopOpacity="0.15" />
            <stop offset="1" stopColor="#0B0D12" stopOpacity="0" />
          </radialGradient>

          <linearGradient
            id="heroLightBeam"
            x1="380"
            y1="175"
            x2="580"
            y2="190"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#22D3EE" stopOpacity="0.45" />
            <stop offset="0.6" stopColor="#34D399" stopOpacity="0.2" />
            <stop offset="1" stopColor="#10B981" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Céu noturno das serras gaúchas */}
        <rect width="600" height="320" rx="20" fill="url(#heroSky)" />

        {/* Lua crescente brilhante */}
        <circle cx="120" cy="70" r="70" fill="url(#heroMoonGlow)" />
        <circle cx="118" cy="65" r="18" fill="#F4F5F7" fillOpacity="0.95" />
        <circle cx="124" cy="61" r="15" fill="#111726" />

        {/* Constelações e estrelas */}
        <circle cx="210" cy="45" r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="280" cy="65" r="1.2" fill="#22D3EE" fillOpacity="0.8" />
        <circle cx="340" cy="35" r="1.8" fill="#FFFFFF" fillOpacity="0.9" />
        <circle cx="430" cy="70" r="1.4" fill="#22D3EE" fillOpacity="0.85" />
        <circle cx="510" cy="40" r="1.6" fill="#F4F5F7" fillOpacity="0.8" />
        <circle cx="480" cy="100" r="1.2" fill="#A7F3D0" fillOpacity="0.75" />
        <circle cx="70" cy="110" r="1.3" fill="#22D3EE" fillOpacity="0.7" />

        {/* Brilho da aurora tecnológica no horizonte */}
        <path
          d="M 0 170 Q 150 130 300 150 T 600 140 L 600 200 L 0 200 Z"
          fill="#8B5CF6"
          fillOpacity="0.08"
        />

        {/* Camada 1: Cânions profundos do Morro Fortaleza ao fundo */}
        <path
          d="M 0 190 Q 90 140 180 165 T 380 155 Q 490 145 600 180 L 600 320 L 0 320 Z"
          fill="url(#heroRidge1)"
        />

        {/* Camada 2: Serras verdes intermediárias com relevo gaúcho */}
        <path
          d="M 0 225 Q 120 170 240 195 T 460 185 Q 530 190 600 230 L 600 320 L 0 320 Z"
          fill="url(#heroRidge2)"
        />

        {/* Camada 3: Cume do Morro Fortaleza em primeiro plano (verde vivo) */}
        <path
          d="M 0 270 Q 150 205 320 215 Q 430 220 600 255 L 600 320 L 0 320 Z"
          fill="url(#heroRidge3)"
        />

        {/* Detalhes de vegetação rasteira e rochas no cume */}
        <path
          d="M 220 220 C 270 215 380 215 440 225 L 445 235 C 380 228 270 228 210 232 Z"
          fill="#34D399"
          fillOpacity="0.8"
        />

        {/* FEIXE DO FAROL DA MOTO ILUMINANDO O HORIZONTE */}
        <polygon points="380,186 590,165 595,225 380,195" fill="url(#heroLightBeam)" />

        {/* A MOTO NO CUME DO MORRO FORTALEZA (detalhada) */}
        {/* Sombra da moto no gramado */}
        <ellipse cx="340" cy="225" rx="55" ry="7" fill="#022C22" fillOpacity="0.8" />

        {/* Roda traseira trail com raios */}
        <circle cx="305" cy="210" r="18" stroke="#0B0D12" strokeWidth="4.5" fill="#1E293B" />
        <circle cx="305" cy="210" r="7" stroke="#22D3EE" strokeWidth="2.5" fill="#0B0D12" />
        <line x1="305" y1="192" x2="305" y2="228" stroke="#A1A6B3" strokeWidth="1.2" />
        <line x1="287" y1="210" x2="323" y2="210" stroke="#A1A6B3" strokeWidth="1.2" />

        {/* Roda dianteira aro maior 21" típica de trail brasileira */}
        <circle cx="380" cy="206" r="20" stroke="#0B0D12" strokeWidth="4.5" fill="#1E293B" />
        <circle cx="380" cy="206" r="8" stroke="#22D3EE" strokeWidth="2.5" fill="#0B0D12" />
        <line x1="380" y1="186" x2="380" y2="226" stroke="#A1A6B3" strokeWidth="1.2" />
        <line x1="360" y1="206" x2="400" y2="206" stroke="#A1A6B3" strokeWidth="1.2" />

        {/* Balança traseira, corrente e coroa */}
        <line
          x1="305"
          y1="210"
          x2="330"
          y2="198"
          stroke="#8B5CF6"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle
          cx="305"
          cy="210"
          r="10"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeDasharray="2 2"
          fill="none"
        />

        {/* Bloco do motor e chassi tubular */}
        <path
          d="M 320 205 L 338 185 L 358 182 L 352 208 L 328 212 Z"
          fill="#1E293B"
          stroke="#475569"
          strokeWidth="1.5"
        />
        {/* Aletas de refrigeração do motor até 200cc */}
        <line x1="326" y1="195" x2="346" y2="193" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="328" y1="200" x2="348" y2="198" stroke="#94A3B8" strokeWidth="1.5" />
        <line x1="330" y1="205" x2="348" y2="203" stroke="#94A3B8" strokeWidth="1.5" />

        {/* Escapamento elevado trail */}
        <path
          d="M 342 202 Q 330 195 305 186 L 290 185"
          stroke="#94A3B8"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <rect
          x="286"
          y="180"
          width="22"
          height="7"
          rx="3.5"
          fill="#F4F5F7"
          stroke="#0B0D12"
          strokeWidth="1"
        />

        {/* Tanque de combustível em formato agressivo trail */}
        <path
          d="M 334 176 C 342 165 358 165 368 172 L 358 184 L 334 184 Z"
          fill="#8B5CF6"
          stroke="#A78BFA"
          strokeWidth="1.5"
        />

        {/* Banco anatômico em dois níveis */}
        <path
          d="M 308 178 Q 324 175 338 178 L 336 182 L 310 183 Z"
          fill="#0B0D12"
          stroke="#22D3EE"
          strokeWidth="1"
        />

        {/* Rabeta traseira com suporte de placa */}
        <path
          d="M 308 178 L 290 182 L 296 188"
          stroke="#8B5CF6"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Bengala / Garfo telescópico longo da suspensão dianteira */}
        <line
          x1="380"
          y1="206"
          x2="364"
          y2="162"
          stroke="#22D3EE"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="375"
          y1="195"
          x2="362"
          y2="164"
          stroke="#0B0D12"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* Carenagem do farol dianteiro */}
        <polygon points="364,162 374,164 372,176 362,172" fill="#8B5CF6" />

        {/* Bloco do farol de LED aceso */}
        <ellipse cx="372" cy="169" rx="3.5" ry="5" fill="#FFFFFF" />
        <circle cx="372" cy="169" r="6" fill="#22D3EE" fillOpacity="0.6" />

        {/* Guidão com protetor de mão */}
        <line
          x1="358"
          y1="160"
          x2="368"
          y2="158"
          stroke="#10B981"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="368" cy="158" r="3" fill="#34D399" />

        {/* Retrovisores padrão original */}
        <line
          x1="362"
          y1="158"
          x2="359"
          y2="148"
          stroke="#F4F5F7"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <ellipse cx="358" cy="147" rx="3" ry="2" fill="#22D3EE" />

        {/* Descanso lateral (cavalete) apoiado no solo */}
        <line
          x1="330"
          y1="205"
          x2="322"
          y2="223"
          stroke="#0B0D12"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Badge flutuante simpática para motociclistas */}
        <g transform="translate(20, 20)">
          <rect
            width="210"
            height="42"
            rx="14"
            fill="#0B0D12"
            fillOpacity="0.88"
            stroke="#232B3A"
            strokeWidth="1.5"
          />
          <circle cx="24" cy="21" r="10" fill="#10B981" fillOpacity="0.2" />
          <text x="18" y="25" fill="#34D399" fontSize="13">
            ⛰️
          </text>
          <text
            x="42"
            y="19"
            fill="#FFFFFF"
            fontSize="11"
            fontWeight="bold"
            fontFamily="sans-serif"
          >
            Morro Fortaleza • Cambará do Sul (RS)
          </text>
          <text
            x="42"
            y="32"
            fill="#22D3EE"
            fontSize="9.5"
            fontWeight="500"
            fontFamily="sans-serif"
          >
            Espírito trail • Direto ao motoqueiro
          </text>
        </g>
      </svg>
    </div>
  )
}

export default MountainMotoLogo
