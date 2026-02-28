import { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import ProgressBar from './ProgressBar';

export default function LogUsageModal({ benefit, cardId, onClose }) {
  const { logBenefitUsage } = useWallet();
  const [amount, setAmount] = useState('');
  const [usedDate, setUsedDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const maxValue = benefit.maxValue || benefit.value;
  const remaining = Math.max(0, maxValue - benefit.used);
  const currentPercentage = Math.round((benefit.used / maxValue) * 100);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setLoading(true);
    setError('');

    const success = await logBenefitUsage(cardId, benefit.id, amountNum, usedDate, notes);
    
    if (success) {
      onClose();
    } else {
      setError('Failed to log usage');
    }
    setLoading(false);
  };

  const handleQuickFill = () => {
    setAmount(remaining.toString());
  };

  const previewPercentage = amount 
    ? Math.min(100, Math.round(((benefit.used + parseFloat(amount || 0)) / maxValue) * 100))
    : currentPercentage;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-scale-in">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <h2 className="text-xl font-bold">Log Benefit Usage</h2>
          <p className="text-indigo-100 mt-1">{benefit.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          {/* Current Status */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">Current Progress</span>
              <span className="text-sm font-bold text-indigo-600">{currentPercentage}%</span>
            </div>
            <ProgressBar value={previewPercentage} size="large" />
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="bg-white rounded-lg p-2">
                <div className="text-xs text-gray-500">Total</div>
                <div className="font-semibold text-gray-900">{formatCurrency(maxValue)}</div>
              </div>
              <div className="bg-white rounded-lg p-2">
                <div className="text-xs text-gray-500">Used</div>
                <div className="font-semibold text-indigo-600">{formatCurrency(benefit.used)}</div>
              </div>
              <div className="bg-white rounded-lg p-2">
                <div className="text-xs text-gray-500">Remaining</div>
                <div className="font-semibold text-green-600">{formatCurrency(remaining)}</div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Amount Used
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-lg font-medium"
                  placeholder="0.00"
                  required
                />
              </div>
              {remaining > 0 && (
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-semibold hover:bg-indigo-100 transition-all whitespace-nowrap"
                >
                  Max ({formatCurrency(remaining)})
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Date Used
            </label>
            <input
              type="date"
              value={usedDate}
              onChange={(e) => setUsedDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g., Delta baggage fee"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all disabled:opacity-50 shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : 'Log Usage'}
            </button>
          </div>
        </form>
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
