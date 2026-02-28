import CreditCard3D from './CreditCard3D';

export default function CardTemplateCard({ card, onAddToWallet }) {
  const creditBenefits = card.benefits.filter(b => b.type === 'credit');
  const totalCreditValue = creditBenefits.reduce((sum, b) => sum + (b.maxValue || b.value), 0);

  return (
    <div className="group">
      <CreditCard3D card={card} className="cursor-pointer mb-4">
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent rounded-b-2xl">
          <div className="text-white text-sm font-semibold">{card.name}</div>
        </div>
      </CreditCard3D>
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 space-y-3 transform transition-all duration-300 group-hover:shadow-lg">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Annual Fee</span>
          <span className="font-bold text-gray-900 text-lg">
            ${card.annualFee.toLocaleString()}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Credit Benefits</span>
          <span className="font-bold text-green-600 text-lg">
            +${totalCreditValue.toLocaleString()}
          </span>
        </div>

        <div className="border-t pt-3">
          <div className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">
            {card.benefits.length} benefit{card.benefits.length !== 1 ? 's' : ''} included
          </div>
          <div className="flex flex-wrap gap-1.5">
            {card.benefits.slice(0, 3).map(benefit => (
              <span 
                key={benefit.id}
                className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium"
              >
                {benefit.name}
              </span>
            ))}
            {card.benefits.length > 3 && (
              <span className="text-xs text-gray-400 px-2 py-1">
                +{card.benefits.length - 3} more
              </span>
            )}
          </div>
        </div>

        <button
          onClick={onAddToWallet}
          className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white py-2.5 px-4 rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Add to Wallet
        </button>
      </div>
    </div>
  );
}
