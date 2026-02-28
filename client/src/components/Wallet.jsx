import { Link } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import WalletCard from './ui/WalletCard';

export default function Wallet() {
  const { walletCards, loading, error, removeCardFromWallet } = useWallet();

  const handleRemoveCard = async (cardId, cardName) => {
    if (window.confirm(`Remove ${cardName} from your wallet? This will delete all tracked benefits.`)) {
      await removeCardFromWallet(cardId);
    }
  };

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
        Error loading wallet: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-1">
            {walletCards.length} card{walletCards.length !== 1 ? 's' : ''} in your wallet
          </p>
        </div>
        <Link
          to="/library"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Card
        </Link>
      </div>

      {walletCards.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm">
          <div className="relative inline-block mb-6">
            <div className="w-32 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl transform -rotate-6 shadow-lg"></div>
            <div className="w-32 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl absolute top-2 left-2 transform rotate-3 shadow-lg opacity-50"></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wallet is empty</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Add cards from the library to start tracking your benefits and see your net value
          </p>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
          >
            Browse Card Library
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-animation">
          {walletCards.map((card, idx) => (
            <div 
              key={card.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              <WalletCard
                card={card}
                onRemove={() => handleRemoveCard(card.id, card.nickname || card.name)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
