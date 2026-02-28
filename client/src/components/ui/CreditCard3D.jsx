import { useState } from 'react';

const CARD_DESIGNS = {
  // American Express
  'platinum card': {
    background: 'linear-gradient(135deg, #8B8B8B 0%, #C0C0C0 20%, #E8E8E8 40%, #C0C0C0 60%, #8B8B8B 100%)',
    textColor: 'text-gray-800',
    logoColor: '#006FCF',
    pattern: 'metal',
    accent: '#E5E4E2',
  },
  'gold card': {
    background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 20%, #FFD700 40%, #DAA520 60%, #B8860B 100%)',
    textColor: 'text-gray-900',
    logoColor: '#006FCF',
    pattern: 'metal',
    accent: '#D4AF37',
  },
  'green card': {
    background: 'linear-gradient(135deg, #1B4D3E 0%, #228B22 30%, #2E8B57 50%, #228B22 70%, #1B4D3E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#228B22',
  },
  'blue business plus': {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 50%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#2563EB',
  },
  'delta skymiles reserve': {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 30%, #4a4a6a 50%, #2d2d44 70%, #1a1a2e 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#C41E3A',
  },
  'delta skymiles platinum': {
    background: 'linear-gradient(135deg, #4A4A6A 0%, #6B6B8D 30%, #8B8BAD 50%, #6B6B8D 70%, #4A4A6A 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#C41E3A',
  },
  'delta skymiles gold': {
    background: 'linear-gradient(135deg, #B8860B 0%, #DAA520 30%, #FFD700 50%, #DAA520 70%, #B8860B 100%)',
    textColor: 'text-gray-900',
    logoColor: '#C41E3A',
    pattern: 'metal',
    accent: '#C41E3A',
  },
  'hilton honors aspire': {
    background: 'linear-gradient(135deg, #0C2340 0%, #104C97 30%, #1E6FBA 50%, #104C97 70%, #0C2340 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#104C97',
  },
  'hilton honors surpass': {
    background: 'linear-gradient(135deg, #2F4F4F 0%, #4A6B6B 30%, #5F8A8A 50%, #4A6B6B 70%, #2F4F4F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#4A6B6B',
  },
  'bonvoy brilliant': {
    background: 'linear-gradient(135deg, #4A0E0E 0%, #8B0000 30%, #A52A2A 50%, #8B0000 70%, #4A0E0E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#8B0000',
  },
  'bonvoy bevy': {
    background: 'linear-gradient(135deg, #2C1810 0%, #5D3A2E 30%, #8B5A4A 50%, #5D3A2E 70%, #2C1810 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#5D3A2E',
  },
  
  // Chase
  'sapphire reserve': {
    background: 'linear-gradient(135deg, #0A1628 0%, #1A365D 30%, #234E82 50%, #1A365D 70%, #0A1628 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#1A365D',
    metallic: true,
  },
  'sapphire preferred': {
    background: 'linear-gradient(135deg, #1E40AF 0%, #2563EB 30%, #3B82F6 50%, #2563EB 70%, #1E40AF 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#2563EB',
  },
  'freedom unlimited': {
    background: 'linear-gradient(135deg, #0EA5E9 0%, #38BDF8 30%, #7DD3FC 50%, #38BDF8 70%, #0EA5E9 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#0EA5E9',
  },
  'freedom flex': {
    background: 'linear-gradient(135deg, #0891B2 0%, #06B6D4 30%, #22D3EE 50%, #06B6D4 70%, #0891B2 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#06B6D4',
  },
  'ink business preferred': {
    background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 30%, #404040 50%, #2D2D2D 70%, #1E1E1E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#404040',
  },
  'ink business unlimited': {
    background: 'linear-gradient(135deg, #374151 0%, #4B5563 30%, #6B7280 50%, #4B5563 70%, #374151 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#4B5563',
  },
  'united club infinite': {
    background: 'linear-gradient(135deg, #0C2340 0%, #1E3A5F 30%, #2D5A87 50%, #1E3A5F 70%, #0C2340 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#0C2340',
  },
  'united quest': {
    background: 'linear-gradient(135deg, #4B0082 0%, #6B238E 30%, #8B4CA0 50%, #6B238E 70%, #4B0082 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#6B238E',
  },
  'southwest rapid rewards priority': {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5A87 30%, #3D7AB0 50%, #2D5A87 70%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFBF00',
    pattern: 'gradient',
    accent: '#2D5A87',
  },
  'world of hyatt': {
    background: 'linear-gradient(135deg, #1E1E1E 0%, #333333 30%, #4A4A4A 50%, #333333 70%, #1E1E1E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#333333',
  },
  'ihg one rewards premier': {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5A87 30%, #3D7AB0 50%, #2D5A87 70%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#2D5A87',
  },
  
  // Capital One
  'venture x': {
    background: 'linear-gradient(135deg, #0A1628 0%, #1A365D 30%, #234E82 50%, #1A365D 70%, #0A1628 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#1A365D',
    metallic: true,
  },
  'venture rewards': {
    background: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 30%, #DC2626 50%, #B91C1C 70%, #7F1D1D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#B91C1C',
  },
  'savor rewards': {
    background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 30%, #404040 50%, #2D2D2D 70%, #1E1E1E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#404040',
  },
  'quicksilver': {
    background: 'linear-gradient(135deg, #374151 0%, #4B5563 30%, #6B7280 50%, #4B5563 70%, #374151 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#4B5563',
  },
  
  // Citi
  'premier': {
    background: 'linear-gradient(135deg, #00264D 0%, #003B70 30%, #004D99 50%, #003B70 70%, #00264D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#003B70',
  },
  'custom cash': {
    background: 'linear-gradient(135deg, #059669 0%, #10B981 30%, #34D399 50%, #10B981 70%, #059669 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#10B981',
  },
  'double cash': {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5A87 30%, #3D7AB0 50%, #2D5A87 70%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#2D5A87',
  },
  'strata premier': {
    background: 'linear-gradient(135deg, #4A0E0E 0%, #7F1D1D 30%, #991B1B 50%, #7F1D1D 70%, #4A0E0E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#7F1D1D',
  },
  'aadvantage executive world elite': {
    background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 30%, #404040 50%, #2D2D2D 70%, #1E1E1E 100%)',
    textColor: 'text-white',
    logoColor: '#C41E3A',
    pattern: 'premium',
    accent: '#2D2D2D',
  },
  
  // Discover
  'discover it': {
    background: 'linear-gradient(135deg, #F97316 0%, #FB923C 30%, #FDBA74 50%, #FB923C 70%, #F97316 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#F97316',
  },
  'discover it miles': {
    background: 'linear-gradient(135deg, #059669 0%, #10B981 30%, #34D399 50%, #10B981 70%, #059669 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#10B981',
  },
  
  // US Bank
  'altitude reserve': {
    background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 30%, #404040 50%, #2D2D2D 70%, #1E1E1E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#404040',
    metallic: true,
  },
  'altitude connect': {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5A87 30%, #3D7AB0 50%, #2D5A87 70%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#2D5A87',
  },
  
  // Wells Fargo
  'autograph': {
    background: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 30%, #B91C1C 50%, #991B1B 70%, #7F1D1D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#991B1B',
  },
  'active cash': {
    background: 'linear-gradient(135deg, #7F1D1D 0%, #B91C1C 30%, #DC2626 50%, #B91C1C 70%, #7F1D1D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#B91C1C',
  },
  
  // Bank of America
  'premium rewards': {
    background: 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 30%, #B91C1C 50%, #991B1B 70%, #7F1D1D 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#991B1B',
  },
  'premium rewards elite': {
    background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 30%, #404040 50%, #2D2D2D 70%, #1E1E1E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'premium',
    accent: '#2D2D2D',
    metallic: true,
  },
  'unlimited cash rewards': {
    background: 'linear-gradient(135deg, #1E3A5F 0%, #2D5A87 30%, #3D7AB0 50%, #2D5A87 70%, #1E3A5F 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: '#2D5A87',
  },
  
  // Bilt
  'bilt mastercard': {
    background: 'linear-gradient(135deg, #1E1E1E 0%, #2D2D2D 30%, #404040 50%, #2D2D2D 70%, #1E1E1E 100%)',
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'minimal',
    accent: '#2D2D2D',
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
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
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
        className="relative transition-transform duration-200 ease-out transform-gpu"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'scale(1.02)' : 'scale(1)'}`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div
          className="relative rounded-2xl overflow-hidden shadow-xl"
          style={{
            aspectRatio: '1.586',
            background: design.background,
          }}
        >
          {/* Metallic shine for premium cards */}
          {design.metallic && (
            <div 
              className="absolute inset-0 opacity-40 pointer-events-none"
              style={{
                background: `linear-gradient(
                  ${120 + rotation.y * 3}deg,
                  transparent 30%,
                  rgba(255,255,255,0.6) 45%,
                  rgba(255,255,255,0.8) 50%,
                  rgba(255,255,255,0.6) 55%,
                  transparent 70%
                )`,
              }}
            />
          )}
          
          {/* Card shine effect */}
          <div 
            className="absolute inset-0 opacity-30 pointer-events-none"
            style={{
              background: `linear-gradient(
                ${105 + rotation.y * 2}deg,
                transparent 40%,
                rgba(255,255,255,0.4) 50%,
                transparent 60%
              )`,
            }}
          />
          
          {/* Card texture overlay */}
          <div 
            className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* EMV Chip */}
          <div className="absolute top-[20%] left-[8%]">
            <div 
              className="w-12 h-9 rounded-md"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 25%, #d4af37 50%, #b8962e 75%, #d4af37 100%)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3), inset 0 -1px 2px rgba(0,0,0,0.2)',
              }}
            >
              <div className="grid grid-cols-3 grid-rows-3 gap-[1px] p-1 h-full">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className="rounded-[1px]"
                    style={{
                      background: i === 4 ? 'transparent' : 'linear-gradient(135deg, #c9a227 0%, #e8d48b 100%)',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Contactless icon */}
          <div className={`absolute top-[20%] left-[28%] opacity-60 ${design.textColor}`}>
            <svg className="w-6 h-6 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.5 14.5A5 5 0 0 1 7 11a5 5 0 0 1 1.5-3.5" strokeLinecap="round"/>
              <path d="M12 17a8 8 0 0 1-2.5-5.5A8 8 0 0 1 12 6" strokeLinecap="round"/>
              <path d="M15.5 19.5A11 11 0 0 1 12 11a11 11 0 0 1 3.5-8.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Card content */}
          <div className={`absolute inset-0 p-5 flex flex-col justify-between ${design.textColor}`}>
            {/* Issuer logo area */}
            <div className="flex justify-between items-start">
              <div className="text-xs font-medium uppercase tracking-wider opacity-80">
                {card.issuer}
              </div>
              <IssuerLogo issuer={card.issuer} color={design.logoColor} />
            </div>

            {/* Card number placeholder */}
            <div className="mt-auto">
              <div className="font-mono text-lg tracking-[0.2em] opacity-90 mb-1">
                •••• •••• •••• ••••
              </div>
              <div className="text-lg font-semibold tracking-wide">
                {card.nickname || card.name}
              </div>
            </div>
          </div>

          {/* Network logo */}
          <div className="absolute bottom-4 right-4">
            <NetworkLogo issuer={card.issuer} name={card.name} />
          </div>

          {/* Holographic element for premium cards */}
          {design.pattern === 'premium' && (
            <div 
              className="absolute top-4 right-4 w-10 h-10 rounded-full opacity-50"
              style={{
                background: `conic-gradient(from ${rotation.y * 10}deg, 
                  #ff0080, #ff8c00, #40e0d0, #7b68ee, #ff0080
                )`,
                filter: 'blur(2px)',
              }}
            />
          )}
        </div>

        {/* Card shadow */}
        <div 
          className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[90%] h-4 rounded-full blur-xl transition-opacity duration-200"
          style={{
            background: 'rgba(0,0,0,0.3)',
            opacity: isHovered ? 0.5 : 0.3,
          }}
        />

        {children}
      </div>
    </div>
  );
}

function IssuerLogo({ issuer, color }) {
  const style = { color: color || 'currentColor' };
  
  switch (issuer.toLowerCase()) {
    case 'american express':
      return (
        <div className="text-right" style={style}>
          <div className="text-[10px] font-bold tracking-tight leading-none">AMERICAN</div>
          <div className="text-[10px] font-bold tracking-tight leading-none">EXPRESS</div>
        </div>
      );
    case 'chase':
      return (
        <svg className="w-10 h-10" viewBox="0 0 100 100" fill={color || 'currentColor'}>
          <path d="M50 5 L95 50 L50 95 L5 50 Z" fillOpacity="0.9"/>
        </svg>
      );
    case 'capital one':
      return (
        <div className="text-[10px] font-bold tracking-tight" style={style}>
          <div>CAPITAL</div>
          <div>ONE</div>
        </div>
      );
    case 'citi':
      return (
        <div className="text-lg font-bold" style={style}>citi</div>
      );
    case 'discover':
      return (
        <div className="text-sm font-bold italic" style={style}>DISCOVER</div>
      );
    case 'us bank':
      return (
        <div className="text-[10px] font-bold" style={style}>
          <div>US</div>
          <div>BANK</div>
        </div>
      );
    case 'wells fargo':
      return (
        <div className="text-[9px] font-bold" style={style}>
          <div>WELLS</div>
          <div>FARGO</div>
        </div>
      );
    case 'bank of america':
      return (
        <div className="text-[8px] font-bold leading-tight" style={style}>
          <div>BANK OF</div>
          <div>AMERICA</div>
        </div>
      );
    case 'bilt':
      return (
        <div className="text-lg font-black tracking-tight" style={style}>BILT</div>
      );
    default:
      return (
        <div className="text-xs font-bold uppercase" style={style}>{issuer}</div>
      );
  }
}

function NetworkLogo({ issuer, name }) {
  const nameLower = name.toLowerCase();
  
  // Determine network based on card name or issuer
  if (nameLower.includes('mastercard') || issuer.toLowerCase() === 'bilt') {
    return (
      <div className="flex -space-x-2">
        <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
        <div className="w-6 h-6 rounded-full bg-yellow-500 opacity-90" />
      </div>
    );
  }
  
  if (issuer.toLowerCase() === 'american express') {
    return null; // Amex is its own network, logo already shown
  }
  
  if (issuer.toLowerCase() === 'discover') {
    return (
      <div className="w-8 h-8 rounded-full bg-orange-500 opacity-80" />
    );
  }
  
  // Default to Visa
  return (
    <div className="text-white font-bold italic text-lg opacity-90">VISA</div>
  );
}

function getCardDesign(name, issuer, fallbackColor) {
  const nameLower = name.toLowerCase();
  
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
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
      accent: '#0f3460',
    },
    'chase': {
      background: 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
      accent: '#2c5282',
    },
    'capital one': {
      background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
      accent: '#2d5a87',
    },
    'citi': {
      background: 'linear-gradient(135deg, #003b70 0%, #005a9e 50%, #003b70 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
      accent: '#005a9e',
    },
    'discover': {
      background: 'linear-gradient(135deg, #F97316 0%, #FB923C 50%, #F97316 100%)',
      textColor: 'text-white',
      logoColor: '#FFFFFF',
      pattern: 'gradient',
      accent: '#F97316',
    },
  };
  
  if (issuerDefaults[issuer.toLowerCase()]) {
    return issuerDefaults[issuer.toLowerCase()];
  }
  
  // Ultimate fallback
  return {
    background: `linear-gradient(135deg, ${fallbackColor || '#4F46E5'} 0%, ${adjustColor(fallbackColor || '#4F46E5', 20)} 50%, ${fallbackColor || '#4F46E5'} 100%)`,
    textColor: 'text-white',
    logoColor: '#FFFFFF',
    pattern: 'gradient',
    accent: fallbackColor || '#4F46E5',
  };
}

function adjustColor(hex, percent) {
  if (!hex) return '#6366f1';
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return '#' + (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
    (B < 255 ? (B < 1 ? 0 : B) : 255)
  ).toString(16).slice(1);
}
