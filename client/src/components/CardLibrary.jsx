import { useState, useMemo } from 'react';
import { useWallet } from '../context/WalletContext';
import AddToWalletModal from './ui/AddToWalletModal';
import CardTemplateCard from './ui/CardTemplateCard';
import CreateCardModal from './ui/CreateCardModal';

const ISSUERS = ['All', 'American Express', 'Chase', 'Capital One', 'Citi'];

export default function CardLibrary() {
  const { cardTemplates, loading, error } = useWallet();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIssuer, setSelectedIssuer] = useState('All');
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredCards = useMemo(() => {
    return cardTemplates.filter(card => {
      const matchesSearch = 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.issuer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesIssuer = selectedIssuer === 'All' || card.issuer === selectedIssuer;
      return matchesSearch && matchesIssuer;
    });
  }, [cardTemplates, searchQuery, selectedIssuer]);

  const groupedCards = useMemo(() => {
    const groups = {};
    filteredCards.forEach(card => {
      if (!groups[card.issuer]) {
        groups[card.issuer] = [];
      }
      groups[card.issuer].push(card);
    });
    return groups;
  }, [filteredCards]);

  const handleAddToWallet = (card) => {
    setSelectedCard(card);
    setShowAddModal(true);
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
        Error loading cards: {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Card Library</h1>
          <p className="text-gray-600 mt-1">Browse and add cards to your wallet</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 bg-white border-2 border-dashed border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-indigo-400 hover:text-indigo-600 transition-all"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Create Custom Card
        </button>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search cards..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {ISSUERS.map(issuer => (
              <button
                key={issuer}
                onClick={() => setSelectedIssuer(issuer)}
                className={`px-4 py-2.5 rounded-xl font-medium transition-all ${
                  selectedIssuer === issuer
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {issuer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {Object.keys(groupedCards).length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No cards found</h3>
          <p className="text-gray-500">Try adjusting your search or filter</p>
        </div>
      ) : (
        <div className="space-y-10">
          {Object.entries(groupedCards).map(([issuer, cards]) => (
            <div key={issuer}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {issuer.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{issuer}</h2>
                  <p className="text-sm text-gray-500">{cards.length} card{cards.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-animation">
                {cards.map((card, idx) => (
                  <div 
                    key={card.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <CardTemplateCard
                      card={card}
                      onAddToWallet={() => handleAddToWallet(card)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && selectedCard && (
        <AddToWalletModal
          card={selectedCard}
          onClose={() => {
            setShowAddModal(false);
            setSelectedCard(null);
          }}
        />
      )}

      {showCreateModal && (
        <CreateCardModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
