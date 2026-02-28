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

    // Collect all available credits to use
    const availableCredits = [];
    walletCards.forEach(card => {
      card.benefits
        .filter(b => b.type === 'credit' && b.maxValue)
        .forEach(benefit => {
          const remaining = benefit.maxValue - benefit.used;
          const percentUsed = Math.round((benefit.used / benefit.maxValue) * 100);
          if (remaining > 0) {
            availableCredits.push({
              cardId: card.id,
              cardName: card.nickname || card.name,
              cardIssuer: card.issuer,
              benefitName: benefit.name,
              description: benefit.description,
              category: benefit.category,
              total: benefit.maxValue,
              used: benefit.used,
              remaining,
              percentUsed,
              daysRemaining: card.cardmemberYear.daysRemaining,
              isExpiringSoon: card.cardmemberYear.daysRemaining <= 30,
            });
          }
        });
    });

    // Sort by: expiring soon first, then by remaining amount (highest first)
    availableCredits.sort((a, b) => {
      if (a.isExpiringSoon && !b.isExpiringSoon) return -1;
      if (!a.isExpiringSoon && b.isExpiringSoon) return 1;
      return b.remaining - a.remaining;
    });

    return {
      totalFees,
      totalBenefitsUsed,
      netValue,
      overallProgress,
      totalPotentialBenefits,
      expiringBenefits,
      availableCredits,
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

      {/* Available Credits Section */}
      {stats.availableCredits.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Credits to Use</h2>
              <p className="text-sm text-gray-500">Take advantage of these card benefits</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-indigo-600">
                {formatCurrency(stats.availableCredits.reduce((sum, c) => sum + c.remaining, 0))}
              </div>
              <div className="text-xs text-gray-500">available to use</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stats.availableCredits.slice(0, 6).map((credit, idx) => (
              <Link
                key={`${credit.cardId}-${credit.benefitName}-${idx}`}
                to={`/wallet/${credit.cardId}`}
                className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-lg hover:border-indigo-200 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getCategoryStyle(credit.category).bg}`}>
                      <CategoryIcon category={credit.category} className={`w-5 h-5 ${getCategoryStyle(credit.category).text}`} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {credit.benefitName}
                      </div>
                      <div className="text-sm text-gray-500">{credit.cardName}</div>
                    </div>
                  </div>
                  {credit.isExpiringSoon && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                      {credit.daysRemaining}d left
                    </span>
                  )}
                </div>
                
                <div className="mb-3">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-500">{formatCurrency(credit.used)} used</span>
                    <span className="font-medium text-gray-900">{formatCurrency(credit.remaining)} left</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        credit.percentUsed >= 75 ? 'bg-green-500' :
                        credit.percentUsed >= 50 ? 'bg-blue-500' :
                        credit.percentUsed >= 25 ? 'bg-amber-500' : 'bg-gray-300'
                      }`}
                      style={{ width: `${credit.percentUsed}%` }}
                    />
                  </div>
                </div>
                
                {credit.description && (
                  <p className="text-xs text-gray-500 line-clamp-2">{credit.description}</p>
                )}
              </Link>
            ))}
          </div>
          
          {stats.availableCredits.length > 6 && (
            <div className="mt-4 text-center">
              <Link 
                to="/wallet" 
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium"
              >
                View all {stats.availableCredits.length} available credits
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          )}
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

function getCategoryStyle(category) {
  const styles = {
    travel: { bg: 'bg-blue-100', text: 'text-blue-600' },
    dining: { bg: 'bg-orange-100', text: 'text-orange-600' },
    entertainment: { bg: 'bg-purple-100', text: 'text-purple-600' },
    shopping: { bg: 'bg-pink-100', text: 'text-pink-600' },
    transportation: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
    groceries: { bg: 'bg-green-100', text: 'text-green-600' },
    wellness: { bg: 'bg-rose-100', text: 'text-rose-600' },
    gas: { bg: 'bg-amber-100', text: 'text-amber-600' },
    general: { bg: 'bg-gray-100', text: 'text-gray-600' },
  };
  return styles[category] || styles.general;
}

function CategoryIcon({ category, className }) {
  switch (category) {
    case 'travel':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
      );
    case 'dining':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
    case 'entertainment':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      );
    case 'shopping':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case 'transportation':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8m-8 4h8m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      );
    case 'groceries':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'wellness':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      );
    case 'gas':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
  }
}
