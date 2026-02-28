import { useState } from 'react';
import { useWallet } from '../../context/WalletContext';

const COLORS = [
  '#4F46E5', '#7C3AED', '#EC4899', '#EF4444', '#F97316', 
  '#EAB308', '#22C55E', '#14B8A6', '#0EA5E9', '#6366F1',
  '#1A365D', '#D4AF37', '#E5E4E2', '#8B0000', '#004977',
];

const BENEFIT_TYPES = [
  { value: 'credit', label: 'Statement Credit' },
  { value: 'perk', label: 'Perk / Benefit' },
  { value: 'points_multiplier', label: 'Points Multiplier' },
];

export default function CreateCardModal({ onClose, editCard = null }) {
  const { createCustomCard, updateCardTemplate } = useWallet();
  const [name, setName] = useState(editCard?.name || '');
  const [issuer, setIssuer] = useState(editCard?.issuer || '');
  const [annualFee, setAnnualFee] = useState(editCard?.annualFee?.toString() || '0');
  const [imageColor, setImageColor] = useState(editCard?.imageColor || COLORS[0]);
  const [benefits, setBenefits] = useState(editCard?.benefits || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [newBenefit, setNewBenefit] = useState({
    name: '',
    description: '',
    type: 'credit',
    value: '',
    maxValue: '',
    category: '',
  });

  const handleAddBenefit = () => {
    if (!newBenefit.name || !newBenefit.value) {
      setError('Benefit name and value are required');
      return;
    }

    setBenefits([...benefits, {
      ...newBenefit,
      value: parseFloat(newBenefit.value),
      maxValue: newBenefit.maxValue ? parseFloat(newBenefit.maxValue) : null,
    }]);

    setNewBenefit({
      name: '',
      description: '',
      type: 'credit',
      value: '',
      maxValue: '',
      category: '',
    });
    setError('');
  };

  const handleRemoveBenefit = (index) => {
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !issuer) {
      setError('Card name and issuer are required');
      return;
    }

    setLoading(true);
    setError('');

    const cardData = {
      name,
      issuer,
      annualFee: parseFloat(annualFee) || 0,
      imageColor,
      benefits,
    };

    let success;
    if (editCard) {
      success = await updateCardTemplate(editCard.id, cardData);
    } else {
      success = await createCustomCard(cardData);
    }
    
    if (success) {
      onClose();
    } else {
      setError(`Failed to ${editCard ? 'update' : 'create'} card`);
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8">
        <div 
          className="h-20 flex items-center justify-center text-white font-bold rounded-t-xl"
          style={{ backgroundColor: imageColor }}
        >
          <div className="text-center">
            <div className="text-sm opacity-80">{issuer || 'Issuer'}</div>
            <div>{name || 'Card Name'}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">
            {editCard ? 'Edit Card' : 'Create Custom Card'}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Sapphire Reserve"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuer *
              </label>
              <input
                type="text"
                value={issuer}
                onChange={(e) => setIssuer(e.target.value)}
                placeholder="e.g., Chase"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Annual Fee
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                <input
                  type="number"
                  min="0"
                  value={annualFee}
                  onChange={(e) => setAnnualFee(e.target.value)}
                  className="w-full pl-7 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Color
              </label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setImageColor(color)}
                    className={`w-8 h-8 rounded-lg transition-transform ${
                      imageColor === color ? 'ring-2 ring-offset-2 ring-indigo-500 scale-110' : ''
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-medium text-gray-900 mb-4">Benefits</h3>
            
            {benefits.length > 0 && (
              <div className="space-y-2 mb-4">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2"
                  >
                    <div>
                      <span className="font-medium">{benefit.name}</span>
                      <span className="text-gray-500 ml-2">
                        {benefit.type === 'points_multiplier' 
                          ? `${benefit.value}x` 
                          : `$${benefit.maxValue || benefit.value}`}
                      </span>
                      <span className="text-xs text-gray-400 ml-2 capitalize">
                        ({benefit.type.replace('_', ' ')})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={newBenefit.name}
                  onChange={(e) => setNewBenefit({ ...newBenefit, name: e.target.value })}
                  placeholder="Benefit name"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                <select
                  value={newBenefit.type}
                  onChange={(e) => setNewBenefit({ ...newBenefit, type: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {BENEFIT_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="number"
                  min="0"
                  value={newBenefit.value}
                  onChange={(e) => setNewBenefit({ ...newBenefit, value: e.target.value })}
                  placeholder={newBenefit.type === 'points_multiplier' ? 'Multiplier (e.g., 3)' : 'Value ($)'}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
                {newBenefit.type !== 'points_multiplier' && (
                  <input
                    type="number"
                    min="0"
                    value={newBenefit.maxValue}
                    onChange={(e) => setNewBenefit({ ...newBenefit, maxValue: e.target.value })}
                    placeholder="Max value (optional)"
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
                <input
                  type="text"
                  value={newBenefit.category}
                  onChange={(e) => setNewBenefit({ ...newBenefit, category: e.target.value })}
                  placeholder="Category (e.g., travel)"
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <input
                type="text"
                value={newBenefit.description}
                onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                placeholder="Description (optional)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddBenefit}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors text-sm"
              >
                + Add Benefit
              </button>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editCard ? 'Update Card' : 'Create Card')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
