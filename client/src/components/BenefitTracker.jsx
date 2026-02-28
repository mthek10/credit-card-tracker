import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import ProgressBar from './ui/ProgressBar';
import LogUsageModal from './ui/LogUsageModal';

const BENEFIT_TYPE_CONFIG = {
  credit: { 
    label: 'Statement Credits', 
    icon: DollarIcon,
    color: 'indigo',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-600',
  },
  perk: { 
    label: 'Perks & Benefits', 
    icon: GiftIcon,
    color: 'purple',
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
  },
  points_multiplier: { 
    label: 'Points Multipliers', 
    icon: SparklesIcon,
    color: 'amber',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
  },
};

const BENEFIT_TYPE_ORDER = ['credit', 'perk', 'points_multiplier'];

export default function BenefitTracker({ card }) {
  const { deleteBenefitUsage } = useWallet();
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [expandedBenefit, setExpandedBenefit] = useState(null);

  const groupedBenefits = BENEFIT_TYPE_ORDER.reduce((acc, type) => {
    const benefits = card.benefits.filter(b => b.type === type);
    if (benefits.length > 0) {
      acc[type] = benefits;
    }
    return acc;
  }, {});

  const handleDeleteUsage = async (usageId, benefitName) => {
    if (window.confirm(`Delete this ${benefitName} usage entry?`)) {
      await deleteBenefitUsage(usageId);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Benefits</h2>
      
      {Object.entries(groupedBenefits).map(([type, benefits]) => {
        const config = BENEFIT_TYPE_CONFIG[type];
        const Icon = config.icon;
        
        return (
          <div key={type} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className={`${config.bgColor} px-6 py-4 border-b border-gray-100 flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm`}>
                <Icon className={`w-5 h-5 ${config.textColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{config.label}</h3>
                <p className="text-sm text-gray-500">{benefits.length} benefit{benefits.length !== 1 ? 's' : ''}</p>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {benefits.map(benefit => (
                <BenefitRow
                  key={benefit.id}
                  benefit={benefit}
                  cardId={card.id}
                  isExpanded={expandedBenefit === benefit.id}
                  onToggleExpand={() => setExpandedBenefit(
                    expandedBenefit === benefit.id ? null : benefit.id
                  )}
                  onLogUsage={() => setSelectedBenefit(benefit)}
                  onDeleteUsage={handleDeleteUsage}
                />
              ))}
            </div>
          </div>
        );
      })}

      {selectedBenefit && (
        <LogUsageModal
          benefit={selectedBenefit}
          cardId={card.id}
          onClose={() => setSelectedBenefit(null)}
        />
      )}
    </div>
  );
}

function BenefitRow({ benefit, cardId, isExpanded, onToggleExpand, onLogUsage, onDeleteUsage }) {
  const isTrackable = benefit.type === 'credit' || benefit.type === 'perk';
  const maxValue = benefit.maxValue || benefit.value;
  const percentage = isTrackable ? Math.round((benefit.used / maxValue) * 100) : 0;
  const remaining = Math.max(0, maxValue - benefit.used);
  const isComplete = percentage >= 100;

  return (
    <div className="p-5 hover:bg-gray-50 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{benefit.name}</h4>
            {isComplete && (
              <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Complete
              </span>
            )}
          </div>
          {benefit.description && (
            <p className="text-sm text-gray-500 mb-3">{benefit.description}</p>
          )}
          
          {isTrackable && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {formatCurrency(benefit.used)} / {formatCurrency(maxValue)} used
                </span>
                <span className={`font-semibold ${isComplete ? 'text-green-600' : 'text-gray-900'}`}>
                  {isComplete ? 'Fully utilized!' : `${formatCurrency(remaining)} remaining`}
                </span>
              </div>
              <ProgressBar value={percentage} size="large" />
            </div>
          )}

          {benefit.type === 'points_multiplier' && (
            <div className="inline-flex items-center gap-2 mt-2 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg text-sm font-medium">
              <SparklesIcon className="w-4 h-4" />
              {benefit.value}x points on {benefit.category || 'purchases'}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isTrackable && (
            <>
              <button
                onClick={onLogUsage}
                className="inline-flex items-center gap-1.5 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Log
              </button>
              {benefit.usageHistory?.length > 0 && (
                <button
                  onClick={onToggleExpand}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-all"
                >
                  <svg 
                    className={`w-5 h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isExpanded && benefit.usageHistory?.length > 0 && (
        <div className="mt-4 bg-gray-50 rounded-xl p-4 animate-scale-in">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Usage History
          </div>
          <div className="space-y-2">
            {benefit.usageHistory.map(usage => (
              <div 
                key={usage.id}
                className="flex items-center justify-between bg-white rounded-lg px-4 py-3 shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <DollarIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(usage.amount_used)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatDate(usage.used_date)}
                      {usage.notes && <span className="text-gray-400"> • {usage.notes}</span>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => onDeleteUsage(usage.id, benefit.name)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Delete entry"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
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

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function DollarIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function GiftIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );
}
