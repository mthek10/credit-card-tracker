import { useState } from 'react';

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

  const gradientStyle = getCardGradient(card.issuer, card.imageColor);

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
            background: gradientStyle,
          }}
        >
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
            className="absolute inset-0 opacity-10 pointer-events-none"
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
          <div className="absolute top-[20%] left-[28%] opacity-60">
            <svg className="w-6 h-6 text-white rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8.5 14.5A5 5 0 0 1 7 11a5 5 0 0 1 1.5-3.5" strokeLinecap="round"/>
              <path d="M12 17a8 8 0 0 1-2.5-5.5A8 8 0 0 1 12 6" strokeLinecap="round"/>
              <path d="M15.5 19.5A11 11 0 0 1 12 11a11 11 0 0 1 3.5-8.5" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Card content */}
          <div className="absolute inset-0 p-5 flex flex-col justify-between text-white">
            {/* Issuer logo area */}
            <div className="flex justify-between items-start">
              <div className="text-xs font-medium uppercase tracking-wider opacity-80">
                {card.issuer}
              </div>
              <IssuerLogo issuer={card.issuer} />
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

          {/* Holographic strip for premium cards */}
          {card.annualFee >= 400 && (
            <div 
              className="absolute bottom-4 right-4 w-8 h-8 rounded-full opacity-60"
              style={{
                background: `linear-gradient(${rotation.y * 10}deg, 
                  #ff0080, #ff8c00, #40e0d0, #ff0080
                )`,
                filter: 'blur(1px)',
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

function IssuerLogo({ issuer }) {
  switch (issuer.toLowerCase()) {
    case 'american express':
      return (
        <div className="text-right">
          <div className="text-xs font-bold tracking-tight leading-none">AMERICAN</div>
          <div className="text-xs font-bold tracking-tight leading-none">EXPRESS</div>
        </div>
      );
    case 'chase':
      return (
        <svg className="w-10 h-10" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 5 L95 50 L50 95 L5 50 Z" fillOpacity="0.9"/>
        </svg>
      );
    case 'capital one':
      return (
        <div className="text-xs font-bold tracking-tight">
          <div>CAPITAL</div>
          <div>ONE</div>
        </div>
      );
    case 'citi':
      return (
        <div className="text-lg font-bold italic">citi</div>
      );
    default:
      return (
        <div className="text-xs font-bold uppercase">{issuer}</div>
      );
  }
}

function getCardGradient(issuer, fallbackColor) {
  const gradients = {
    'american express': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
    'chase': 'linear-gradient(135deg, #1a365d 0%, #2c5282 50%, #1a365d 100%)',
    'capital one': 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 50%, #1e3a5f 100%)',
    'citi': 'linear-gradient(135deg, #003b70 0%, #005a9e 50%, #003b70 100%)',
  };

  const issuerLower = issuer.toLowerCase();
  if (gradients[issuerLower]) {
    return gradients[issuerLower];
  }

  return `linear-gradient(135deg, ${fallbackColor} 0%, ${adjustColor(fallbackColor, 20)} 50%, ${fallbackColor} 100%)`;
}

function adjustColor(hex, percent) {
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
