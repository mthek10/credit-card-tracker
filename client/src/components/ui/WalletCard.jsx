import { Link } from 'react-router-dom';
import CreditCard3D from './CreditCard3D';
import ProgressBar from './ProgressBar';

export default function WalletCard({ card, onRemove }) {
  const creditBenefits = card.benefits.filter(b => b.type === 'credit');
  const totalPotentialValue = creditBenefits.reduce((sum, b) => sum + (b.maxValue || b.value), 0);
  
  const usagePercentage = totalPotentialValue > 0 
    ? Math.round((card.totalBenefitsUsed / totalPotentialValue) * 100)
    : 0;

  const isPositive = card.netValue >= 0;

  return (
    <div className="group">
      <Link to={`/wallet/${card.id}`}>
        <CreditCard3D card={card} className="cursor-pointer">
          {/* Net value badge */}
          <div 
            className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10 ${
              isPositive 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            {isPositive ? '+' : ''}{formatCurrency(card.netValue)}
          </div>

          {/* Progress overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-2xl">
            <div className="flex justify-between items-center text-white text-sm mb-2">
              <span className="opacity-80">Benefits Progress</span>
              <span className="font-semibold">{usagePercentage}%</span>
            </div>
            <div className="h-1.5 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${
                  usagePercentage >= 100 ? 'bg-green-400' : 'bg-white'
                }`}
                style={{ width: `${Math.min(100, usagePercentage)}%` }}
              />
            </div>
          </div>
        </CreditCard3D>
      </Link>

      <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="font-semibold text-gray-900">
              {card.nickname || card.name}
            </h3>
            {card.nickname && (
              <div className="text-xs text-gray-400">{card.name}</div>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            title="Remove card"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-gray-50 rounded-lg p-2.5">
            <div className="text-xs text-gray-500">Benefits Used</div>
            <div className="font-semibold text-indigo-600">{formatCurrency(card.totalBenefitsUsed)}</div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5">
            <div className="text-xs text-gray-500">Annual Fee</div>
            <div className="font-semibold text-gray-900">{formatCurrency(card.annualFee)}</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
          <span>
            Resets {formatDate(card.cardmemberYear.yearEnd)}
          </span>
          <span className={`font-semibold ${card.cardmemberYear.daysRemaining <= 30 ? 'text-amber-600' : 'text-indigo-600'}`}>
            {card.cardmemberYear.daysRemaining} days left
          </span>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}
