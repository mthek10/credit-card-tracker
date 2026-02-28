import { useState } from 'react';

const CARD_DESIGNS = {
  // American Express
  'platinum card': {
    background: 'linear-gradient(145deg, #A8A8A8 0%, #D4D4D4 25%, #E8E8E8 50%, #D4D4D4 75%, #A8A8A8 100%)',
    textColor: 'text-gray-800',
    logoColor: '#006FCF',
    pattern: 'metal',
    metallic: true,
  },
  'gold card': {
    background: 'linear-gradient(145deg, #C5A028 0%, #E8C84A 25%, #F5DC6B 50%, #E8C84A 75%, #C5A028 100%)',
    textColor: 'text-gray-900',
    logoColor: '#1A1A1A',
    pattern: 'metal',
    metallic: true,
  },
  'green card': {
    background: 'linear-gradient(145deg, #1B5E3B 0%, #2D8B5A 50%, #1B5E3B 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'blue business plus': {
    background: 'linear-gradient(145deg, #1E3A8A 0%, #3B82F6 50%, #1E3A8A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'delta skymiles reserve': {
    background: 'linear-gradient(145deg, #1F1F2E 0%, #2D2D44 50%, #1F1F2E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    metallic: true,
  },
  'delta skymiles platinum': {
    background: 'linear-gradient(145deg, #4A4A6A 0%, #6B6B8D 50%, #4A4A6A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'delta skymiles gold': {
    background: 'linear-gradient(145deg, #B8860B 0%, #DAA520 50%, #B8860B 100%)',
    textColor: 'text-gray-900',
    logoColor: '#1A1A1A',
    pattern: 'metal',
    metallic: true,
  },
  'hilton honors aspire': {
    background: 'linear-gradient(145deg, #0C2340 0%, #1A4D7C 50%, #0C2340 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'hilton honors surpass': {
    background: 'linear-gradient(145deg, #2F4F4F 0%, #4A7070 50%, #2F4F4F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'bonvoy brilliant': {
    background: 'linear-gradient(145deg, #5C1A1A 0%, #8B2929 50%, #5C1A1A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'bonvoy bevy': {
    background: 'linear-gradient(145deg, #3D2817 0%, #5D4030 50%, #3D2817 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  
  // Chase
  'sapphire reserve': {
    background: 'linear-gradient(145deg, #0D1B2A 0%, #1B3A5A 50%, #0D1B2A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    metallic: true,
  },
  'sapphire preferred': {
    background: 'linear-gradient(145deg, #1E40AF 0%, #3B82F6 50%, #1E40AF 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'freedom unlimited': {
    background: 'linear-gradient(145deg, #0284C7 0%, #38BDF8 50%, #0284C7 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'freedom flex': {
    background: 'linear-gradient(145deg, #0891B2 0%, #22D3EE 50%, #0891B2 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'ink business preferred': {
    background: 'linear-gradient(145deg, #171717 0%, #404040 50%, #171717 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'ink business unlimited': {
    background: 'linear-gradient(145deg, #374151 0%, #6B7280 50%, #374151 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'united club infinite': {
    background: 'linear-gradient(145deg, #0C2340 0%, #1E4D7B 50%, #0C2340 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'united quest': {
    background: 'linear-gradient(145deg, #4C1D95 0%, #7C3AED 50%, #4C1D95 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'southwest rapid rewards priority': {
    background: 'linear-gradient(145deg, #1E3A5F 0%, #3B7CB0 50%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFD700',
    pattern: 'gradient',
  },
  'world of hyatt': {
    background: 'linear-gradient(145deg, #1A1A1A 0%, #404040 50%, #1A1A1A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'ihg one rewards premier': {
    background: 'linear-gradient(145deg, #1E3A5F 0%, #3B7CB0 50%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'amazon prime rewards visa': {
    background: 'linear-gradient(145deg, #131921 0%, #232F3E 50%, #131921 100%)',
    textColor: 'text-white',
    logoColor: '#FF9900',
    pattern: 'premium',
    brandLogo: 'amazon',
  },
  'amazon store card': {
    background: 'linear-gradient(145deg, #FF9900 0%, #FFB84D 50%, #FF9900 100%)',
    textColor: 'text-gray-900',
    logoColor: '#131921',
    pattern: 'gradient',
    brandLogo: 'amazon',
  },
  
  // Capital One
  'venture x': {
    background: 'linear-gradient(145deg, #0D1B2A 0%, #1B3A5A 50%, #0D1B2A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    metallic: true,
  },
  'venture rewards': {
    background: 'linear-gradient(145deg, #7F1D1D 0%, #DC2626 50%, #7F1D1D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'savor rewards': {
    background: 'linear-gradient(145deg, #171717 0%, #404040 50%, #171717 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'quicksilver': {
    background: 'linear-gradient(145deg, #374151 0%, #6B7280 50%, #374151 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  
  // Citi
  'premier': {
    background: 'linear-gradient(145deg, #002855 0%, #004B8D 50%, #002855 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'custom cash': {
    background: 'linear-gradient(145deg, #047857 0%, #10B981 50%, #047857 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'double cash': {
    background: 'linear-gradient(145deg, #1E3A5F 0%, #3B7CB0 50%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'strata premier': {
    background: 'linear-gradient(145deg, #5C1A1A 0%, #991B1B 50%, #5C1A1A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'aadvantage executive world elite': {
    background: 'linear-gradient(145deg, #171717 0%, #404040 50%, #171717 100%)',
    textColor: 'text-white',
    logoColor: '#C41E3A',
    pattern: 'premium',
  },
  'costco anywhere visa': {
    background: 'linear-gradient(145deg, #C41E3A 0%, #E8384F 50%, #C41E3A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    brandLogo: 'costco',
  },
  
  // Discover
  'discover it': {
    background: 'linear-gradient(145deg, #EA580C 0%, #FB923C 50%, #EA580C 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'discover it miles': {
    background: 'linear-gradient(145deg, #047857 0%, #10B981 50%, #047857 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  
  // US Bank
  'altitude reserve': {
    background: 'linear-gradient(145deg, #171717 0%, #404040 50%, #171717 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    metallic: true,
  },
  'altitude connect': {
    background: 'linear-gradient(145deg, #1E3A5F 0%, #3B7CB0 50%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  
  // Wells Fargo
  'autograph': {
    background: 'linear-gradient(145deg, #7F1D1D 0%, #B91C1C 50%, #7F1D1D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  'active cash': {
    background: 'linear-gradient(145deg, #991B1B 0%, #DC2626 50%, #991B1B 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  
  // Bank of America
  'premium rewards': {
    background: 'linear-gradient(145deg, #7F1D1D 0%, #B91C1C 50%, #7F1D1D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
  },
  'premium rewards elite': {
    background: 'linear-gradient(145deg, #171717 0%, #404040 50%, #171717 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    metallic: true,
  },
  'unlimited cash rewards': {
    background: 'linear-gradient(145deg, #1E3A5F 0%, #3B7CB0 50%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  },
  
  // Bilt
  'bilt mastercard': {
    background: 'linear-gradient(145deg, #1A1A1A 0%, #333333 50%, #1A1A1A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'minimal',
  },
  
  // Apple Card
  'apple card': {
    background: 'linear-gradient(145deg, #E5E5E7 0%, #F5F5F7 25%, #FFFFFF 50%, #F5F5F7 75%, #E5E5E7 100%)',
    textColor: 'text-gray-800',
    logoColor: '#1D1D1F',
    pattern: 'metal',
    metallic: true,
    brandLogo: 'apple',
  },
  
  // Target
  'target redcard': {
    background: 'linear-gradient(145deg, #AA0000 0%, #CC0000 50%, #AA0000 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    brandLogo: 'target',
  },
};

export default function CreditCard3D({ card, children, onClick, className = '' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const design = getCardDesign(card.name, card.issuer, card.imageColor);

  return (
    <div
      className={`perspective-1000 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <div
        className="relative transition-all duration-300 ease-out transform-gpu"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.03) translateY(-4px)' : 'scale(1)'}`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Main Card */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            aspectRatio: '1.586',
            background: design.background,
            boxShadow: isHovered 
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset'
              : '0 10px 30px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255,255,255,0.05) inset',
          }}
        >
          {/* Metallic shine effect */}
          {design.metallic && (
            <div 
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `linear-gradient(
                  ${110 + rotation.y * 4}deg,
                  transparent 20%,
                  rgba(255,255,255,0.5) 45%,
                  rgba(255,255,255,0.7) 50%,
                  rgba(255,255,255,0.5) 55%,
                  transparent 80%
                )`,
                opacity: isHovered ? 0.6 : 0.3,
              }}
            />
          )}
          
          {/* Subtle shine for all cards */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(
                ${105 + rotation.y * 2}deg,
                transparent 35%,
                rgba(255,255,255,0.2) 50%,
                transparent 65%
              )`,
            }}
          />

          {/* EMV Chip - Apple Wallet style */}
          <div className="absolute top-[22%] left-[7%]">
            <div 
              className="w-10 h-8 rounded-md overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #D4AF37 0%, #F0D875 30%, #D4AF37 60%, #B8962E 100%)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)',
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-6 h-5 border border-yellow-700/30 rounded-sm" 
                  style={{
                    background: 'linear-gradient(145deg, #C9A227 0%, #E8D48B 50%, #C9A227 100%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Contactless Symbol */}
          <div className={`absolute top-[22%] left-[24%] ${design.textColor} opacity-50`}>
            <svg className="w-5 h-5 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 15a4 4 0 0 1 0-6" strokeLinecap="round"/>
              <path d="M12 18a7 7 0 0 1 0-12" strokeLinecap="round"/>
              <path d="M15 21a10 10 0 0 1 0-18" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Card Content */}
          <div className={`absolute inset-0 p-4 flex flex-col justify-between ${design.textColor}`}>
            {/* Top Row - Issuer & Brand */}
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                {design.brandLogo ? (
                  <BrandLogo brand={design.brandLogo} color={design.logoColor} />
                ) : (
                  <span className="text-[10px] font-semibold uppercase tracking-widest opacity-70">
                    {card.issuer}
                  </span>
                )}
              </div>
              <IssuerLogo issuer={card.issuer} color={design.logoColor} name={card.name} />
            </div>

            {/* Bottom Row - Card Info */}
            <div className="space-y-1">
              <div className="font-mono text-sm tracking-[0.25em] opacity-80">
                •••• •••• •••• ••••
              </div>
              <div className="text-base font-semibold truncate pr-16">
                {card.nickname || card.name}
              </div>
            </div>
          </div>

          {/* Network Logo */}
          <div className="absolute bottom-3 right-3">
            <NetworkLogo issuer={card.issuer} name={card.name} />
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}

function BrandLogo({ brand, color }) {
  switch (brand) {
    case 'amazon':
      return (
        <div className="flex items-center gap-1" style={{ color }}>
          <span className="text-sm font-bold">amazon</span>
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
      );
    case 'apple':
      return (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill={color}>
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      );
    case 'costco':
      return (
        <span className="text-xs font-bold tracking-tight" style={{ color }}>COSTCO</span>
      );
    case 'target':
      return (
        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center" style={{ borderColor: color }}>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
        </div>
      );
    default:
      return null;
  }
}

function IssuerLogo({ issuer, color, name }) {
  const style = { color: color || 'currentColor' };
  const nameLower = name?.toLowerCase() || '';
  
  // Special case for Apple Card
  if (nameLower.includes('apple')) {
    return null; // Apple logo shown as brand logo
  }
  
  switch (issuer.toLowerCase()) {
    case 'american express':
      return (
        <div className="text-right" style={style}>
          <div className="text-[9px] font-bold tracking-tight leading-none">AMERICAN</div>
          <div className="text-[9px] font-bold tracking-tight leading-none">EXPRESS</div>
        </div>
      );
    case 'chase':
      return (
        <svg className="w-8 h-8" viewBox="0 0 100 100" fill={color || 'currentColor'}>
          <path d="M50 10 L90 50 L50 90 L10 50 Z" fillOpacity="0.95"/>
        </svg>
      );
    case 'capital one':
      return (
        <div className="text-[9px] font-bold tracking-tight leading-tight" style={style}>
          <div>CAPITAL</div>
          <div>ONE</div>
        </div>
      );
    case 'citi':
      return (
        <div className="text-base font-bold" style={style}>citi</div>
      );
    case 'discover':
      return (
        <div className="text-xs font-bold italic" style={style}>DISCOVER</div>
      );
    case 'us bank':
      return (
        <div className="text-[9px] font-bold leading-tight" style={style}>
          <div>US</div>
          <div>BANK</div>
        </div>
      );
    case 'wells fargo':
      return (
        <div className="text-[8px] font-bold leading-tight" style={style}>
          <div>WELLS</div>
          <div>FARGO</div>
        </div>
      );
    case 'bank of america':
      return (
        <div className="text-[7px] font-bold leading-tight" style={style}>
          <div>BANK OF</div>
          <div>AMERICA</div>
        </div>
      );
    case 'bilt':
      return (
        <div className="text-base font-black tracking-tight" style={style}>BILT</div>
      );
    case 'synchrony':
      return (
        <div className="text-[8px] font-bold" style={style}>SYNCHRONY</div>
      );
    case 'goldman sachs':
      return null; // Apple Card - no Goldman logo shown
    case 'td bank':
      return (
        <div className="text-[8px] font-bold" style={style}>TD BANK</div>
      );
    default:
      return (
        <div className="text-[9px] font-bold uppercase" style={style}>{issuer}</div>
      );
  }
}

function NetworkLogo({ issuer, name }) {
  const nameLower = name?.toLowerCase() || '';
  
  // Mastercard networks
  if (nameLower.includes('mastercard') || issuer.toLowerCase() === 'bilt') {
    return (
      <div className="flex -space-x-1.5">
        <div className="w-5 h-5 rounded-full bg-[#EB001B]" />
        <div className="w-5 h-5 rounded-full bg-[#F79E1B]" />
      </div>
    );
  }
  
  // Amex is its own network
  if (issuer.toLowerCase() === 'american express') {
    return null;
  }
  
  // Discover
  if (issuer.toLowerCase() === 'discover') {
    return (
      <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-white/30" />
      </div>
    );
  }
  
  // Default to Visa
  return (
    <div className="font-bold italic text-base opacity-90 text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
      VISA
    </div>
  );
}

function getCardDesign(name, issuer, fallbackColor) {
  const nameLower = (name || '').toLowerCase();
  
  // Check for exact card match
  if (CARD_DESIGNS[nameLower]) {
    return CARD_DESIGNS[nameLower];
  }
  
  // Check for partial match
  for (const [key, design] of Object.entries(CARD_DESIGNS)) {
    if (nameLower.includes(key) || key.includes(nameLower)) {
      return design;
    }
  }
  
  // Default based on issuer
  const issuerDefaults = {
    'american express': {
      background: 'linear-gradient(145deg, #1a1a2e 0%, #2d3a5a 50%, #1a1a2e 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
    },
    'chase': {
      background: 'linear-gradient(145deg, #1a365d 0%, #2c5282 50%, #1a365d 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
    },
    'capital one': {
      background: 'linear-gradient(145deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
    },
    'citi': {
      background: 'linear-gradient(145deg, #003b70 0%, #005a9e 50%, #003b70 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
    },
    'discover': {
      background: 'linear-gradient(145deg, #EA580C 0%, #FB923C 50%, #EA580C 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
    },
  };
  
  if (issuerDefaults[issuer?.toLowerCase()]) {
    return issuerDefaults[issuer.toLowerCase()];
  }
  
  // Ultimate fallback
  return {
    background: `linear-gradient(145deg, ${fallbackColor || '#4F46E5'} 0%, ${adjustColor(fallbackColor || '#4F46E5', 30)} 50%, ${fallbackColor || '#4F46E5'} 100%)`,
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
  };
}

function adjustColor(hex, percent) {
  if (!hex) return '#6366f1';
  try {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, (num >> 8 & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return '#' + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  } catch {
    return '#6366f1';
  }
}
