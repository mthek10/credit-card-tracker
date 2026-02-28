import { useParams, Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import CreditCard3D from './ui/CreditCard3D';
import BenefitTracker from './BenefitTracker';

export default function CardDetails() {
  const { cardId } = useParams();
  const { walletCards, loading, error } = useWallet();

  const card = walletCards.find(c => c.id === parseInt(cardId));

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
        Error loading card: {error}
      </div>
    );
  }

  if (!card) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
        <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Card not found</h2>
        <p className="text-gray-600 mb-6">This card may have been removed from your wallet.</p>
        <Link
          to="/wallet"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all"
        >
          Back to Wallet
        </Link>
      </div>
    );
  }

  const isPositive = card.netValue >= 0;
  const progressPercentage = Math.round((card.cardmemberYear.daysElapsed / card.cardmemberYear.totalDays) * 100);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          to="/wallet"
          className="p-2.5 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {card.nickname || card.name}
          </h1>
          <p className="text-gray-500">{card.issuer} {card.nickname ? `• ${card.name}` : ''}</p>
        </div>
      </div>

      {/* Card Preview and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CreditCard3D card={card}>
            <div 
              className={`absolute -top-2 -right-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg z-10 ${
                isPositive 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}
            >
              {isPositive ? '+' : ''}{formatCurrency(card.netValue)}
            </div>
          </CreditCard3D>
        </div>

        <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard
            label="Net Value"
            value={formatCurrency(card.netValue)}
            valueClass={isPositive ? 'text-green-600' : 'text-red-600'}
            prefix={isPositive ? '+' : ''}
            icon={isPositive ? CheckIcon : AlertIcon}
            iconBg={isPositive ? 'bg-green-100' : 'bg-red-100'}
            iconColor={isPositive ? 'text-green-600' : 'text-red-600'}
          />
          <StatCard
            label="Benefits Used"
            value={formatCurrency(card.totalBenefitsUsed)}
            valueClass="text-indigo-600"
            icon={TrendingIcon}
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
          />
          <StatCard
            label="Annual Fee"
            value={formatCurrency(card.annualFee)}
            valueClass="text-gray-900"
            icon={CreditCardIcon}
            iconBg="bg-gray-100"
            iconColor="text-gray-600"
          />
          <StatCard
            label="Days Left"
            value={card.cardmemberYear.daysRemaining}
            valueClass={card.cardmemberYear.daysRemaining <= 30 ? 'text-amber-600' : 'text-gray-900'}
            subtitle={formatDate(card.cardmemberYear.yearEnd)}
            icon={CalendarIcon}
            iconBg={card.cardmemberYear.daysRemaining <= 30 ? 'bg-amber-100' : 'bg-gray-100'}
            iconColor={card.cardmemberYear.daysRemaining <= 30 ? 'text-amber-600' : 'text-gray-600'}
          />
        </div>
      </div>

      {/* Cardmember Year Progress */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Cardmember Year Progress</h2>
            <p className="text-sm text-gray-500">
              {formatDateFull(card.cardmemberYear.yearStart)} - {formatDateFull(card.cardmemberYear.yearEnd)}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-indigo-600">{progressPercentage}%</div>
            <div className="text-xs text-gray-500">of year complete</div>
          </div>
        </div>
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
          {/* Milestone markers */}
          <div className="absolute inset-0 flex justify-between px-1">
            {[25, 50, 75].map(mark => (
              <div 
                key={mark} 
                className="w-px h-full bg-gray-300"
                style={{ marginLeft: `${mark}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>{card.cardmemberYear.daysElapsed} days elapsed</span>
          <span>{card.cardmemberYear.daysRemaining} days remaining</span>
        </div>
      </div>

      {/* Benefits Tracker */}
      <BenefitTracker card={card} />
    </div>
  );
}

function StatCard({ label, value, valueClass, prefix = '', subtitle, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center mb-3`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className={`text-2xl font-bold ${valueClass}`}>
        {prefix}{value}
      </div>
      <div className="text-sm text-gray-500">{label}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
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

function formatDateFull(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function CheckIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function AlertIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function TrendingIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  );
}

function CreditCardIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
}

function CalendarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}
