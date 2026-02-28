import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import CreditCard3D from './ui/CreditCard3D';
import ProgressBar from './ui/ProgressBar';

export default function Dashboard() {
  const { walletCards, loading, error } = useWallet();

  const stats = useMemo(() => {
    if (walletCards.length === 0) return null;

    const totalFees = walletCards.reduce((sum, card) => sum + card.annualFee, 0);
    const totalBenefitsUsed = walletCards.reduce((sum, card) => sum + card.totalBenefitsUsed, 0);
    const netValue = totalBenefitsUsed - totalFees;

    const totalPotentialBenefits = walletCards.reduce((sum, card) => {
      const cardPotential = card.benefits
        .filter(b => b.type === 'credit' || b.type === 'perk')
        .reduce((s, b) => s + (b.maxValue || b.value), 0);
      return sum + cardPotential;
    }, 0);

    const overallProgress = totalPotentialBenefits > 0 
      ? Math.round((totalBenefitsUsed / totalPotentialBenefits) * 100)
      : 0;

    const expiringBenefits = [];
    walletCards.forEach(card => {
      if (card.cardmemberYear.daysRemaining <= 30) {
        card.benefits
          .filter(b => (b.type === 'credit' || b.type === 'perk') && b.used < (b.maxValue || b.value))
          .forEach(benefit => {
            const remaining = (benefit.maxValue || benefit.value) - benefit.used;
            if (remaining > 0) {
              expiringBenefits.push({
                cardId: card.id,
                cardName: card.nickname || card.name,
                benefitName: benefit.name,
                remaining,
                daysLeft: card.cardmemberYear.daysRemaining,
              });
            }
          });
      }
    });

    return {
      totalFees,
      totalBenefitsUsed,
      netValue,
      overallProgress,
      totalPotentialBenefits,
      expiringBenefits,
      cardCount: walletCards.length,
    };
  }, [walletCards]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-700">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading dashboard: {error}</span>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to CardTracker</h1>
          <p className="text-gray-600 mt-1">Start tracking your credit card benefits</p>
        </div>
        
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
          <div className="relative inline-block mb-6">
            <div className="w-24 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl transform -rotate-6 shadow-lg"></div>
            <div className="w-24 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl absolute top-2 left-2 transform rotate-3 shadow-lg"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No cards in your wallet</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Add your credit cards to start tracking benefits and see if you're getting your money's worth
          </p>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Browse Card Library
          </Link>
        </div>
      </div>
    );
  }

  const isPositive = stats.netValue >= 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Your credit card benefits at a glance</p>
        </div>
        <Link
          to="/wallet"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
        >
          View all cards
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Hero Stats */}
      <div className={`relative overflow-hidden rounded-3xl p-8 ${
        isPositive 
          ? 'bg-gradient-to-br from-green-500 to-emerald-600' 
          : 'bg-gradient-to-br from-red-500 to-rose-600'
      }`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-white/80 text-sm font-medium uppercase tracking-wider mb-1">
                Total Net Value
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                {isPositive ? '+' : ''}{formatCurrency(stats.netValue)}
              </div>
              <div className="text-white/80">
                {isPositive 
                  ? "You're maximizing your rewards!" 
                  : "Track more benefits to get in the green"}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-6 py-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{stats.cardCount}</div>
                <div className="text-white/80 text-sm">Cards</div>
              </div>
              <div className="text-center px-6 py-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <div className="text-3xl font-bold text-white">{stats.overallProgress}%</div>
                <div className="text-white/80 text-sm">Used</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Benefits Used"
          value={formatCurrency(stats.totalBenefitsUsed)}
          subtitle={`of ${formatCurrency(stats.totalPotentialBenefits)} available`}
          icon={TrendingUpIcon}
          color="indigo"
        />
        <StatCard
          label="Total Annual Fees"
          value={formatCurrency(stats.totalFees)}
          subtitle={`${stats.cardCount} card${stats.cardCount !== 1 ? 's' : ''} in wallet`}
          icon={CreditCardIcon}
          color="gray"
        />
        <StatCard
          label="Overall Progress"
          value={`${stats.overallProgress}%`}
          subtitle="of available credits used"
          icon={ChartIcon}
          color="purple"
          showProgress
          progressValue={stats.overallProgress}
        />
      </div>

      {/* Expiring Benefits Alert */}
      {stats.expiringBenefits.length > 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 animate-scale-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <AlertCircleIcon className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800">Benefits Expiring Soon</h3>
              <p className="text-sm text-amber-700">Use these before they reset!</p>
            </div>
          </div>
          <div className="space-y-2">
            {stats.expiringBenefits.map((item, idx) => (
              <Link
                key={idx}
                to={`/wallet/${item.cardId}`}
                className="flex items-center justify-between bg-white rounded-xl px-4 py-3 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {item.benefitName}
                  </div>
                  <div className="text-sm text-gray-500">{item.cardName}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-amber-600">{formatCurrency(item.remaining)}</div>
                  <div className="text-xs text-gray-500">{item.daysLeft} days left</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Card Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Cards</h2>
          <Link to="/wallet" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
          {walletCards.slice(0, 3).map((card, idx) => (
            <Link 
              key={card.id} 
              to={`/wallet/${card.id}`}
              className="animate-slide-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CreditCard3D card={card} className="cursor-pointer">
                <div 
                  className={`absolute -top-2 -right-2 px-3 py-1 rounded-full text-sm font-bold shadow-lg z-10 ${
                    card.netValue >= 0 
                      ? 'bg-green-500 text-white' 
                      : 'bg-red-500 text-white'
                  }`}
                >
                  {card.netValue >= 0 ? '+' : ''}{formatCurrency(card.netValue)}
                </div>
              </CreditCard3D>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, subtitle, icon: Icon, color, showProgress, progressValue }) {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    gray: 'bg-gray-100 text-gray-600',
    purple: 'bg-purple-50 text-purple-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
      {subtitle && <div className="text-xs text-gray-400 mt-1">{subtitle}</div>}
      {showProgress && (
        <div className="mt-3">
          <ProgressBar value={progressValue} />
        </div>
      )}
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

function AlertCircleIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function TrendingUpIcon({ className }) {
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

function ChartIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}
