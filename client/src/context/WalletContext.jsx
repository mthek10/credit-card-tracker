import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from './UserContext';

const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const { user } = useUser();
  const [cardTemplates, setCardTemplates] = useState([]);
  const [walletCards, setWalletCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCardTemplates = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/cards?userId=${user.id}`);
      if (!res.ok) throw new Error('Failed to fetch card templates');
      const data = await res.json();
      setCardTemplates(data);
    } catch (err) {
      setError(err.message);
    }
  }, [user]);

  const fetchWalletCards = useCallback(async () => {
    if (!user) return;
    try {
      const res = await fetch(`/api/wallet?userId=${user.id}`);
      if (!res.ok) throw new Error('Failed to fetch wallet');
      const data = await res.json();
      setWalletCards(data);
    } catch (err) {
      setError(err.message);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchCardTemplates(), fetchWalletCards()])
        .finally(() => setLoading(false));
    } else {
      setCardTemplates([]);
      setWalletCards([]);
      setLoading(false);
    }
  }, [user, fetchCardTemplates, fetchWalletCards]);

  const addCardToWallet = async (cardTemplateId, openDate, nickname = '') => {
    if (!user) return false;
    try {
      const res = await fetch('/api/wallet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, cardTemplateId, openDate, nickname }),
      });
      if (!res.ok) throw new Error('Failed to add card to wallet');
      await fetchWalletCards();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const removeCardFromWallet = async (userCardId) => {
    if (!user) return false;
    try {
      const res = await fetch(`/api/wallet/${userCardId}?userId=${user.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to remove card');
      await fetchWalletCards();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const logBenefitUsage = async (userCardId, benefitId, amountUsed, usedDate, notes) => {
    if (!user) return false;
    try {
      const res = await fetch('/api/benefits/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, userCardId, benefitId, amountUsed, usedDate, notes }),
      });
      if (!res.ok) throw new Error('Failed to log benefit usage');
      await fetchWalletCards();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteBenefitUsage = async (usageId) => {
    if (!user) return false;
    try {
      const res = await fetch(`/api/benefits/usage/${usageId}?userId=${user.id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete usage');
      await fetchWalletCards();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const createCustomCard = async (cardData) => {
    if (!user) return false;
    try {
      const res = await fetch('/api/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cardData, userId: user.id }),
      });
      if (!res.ok) throw new Error('Failed to create card');
      await fetchCardTemplates();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const updateCardTemplate = async (cardId, cardData) => {
    if (!user) return false;
    try {
      const res = await fetch(`/api/cards/${cardId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...cardData, userId: user.id }),
      });
      if (!res.ok) throw new Error('Failed to update card');
      await fetchCardTemplates();
      await fetchWalletCards();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const clearError = () => setError(null);

  const value = {
    cardTemplates,
    walletCards,
    loading,
    error,
    clearError,
    addCardToWallet,
    removeCardFromWallet,
    logBenefitUsage,
    deleteBenefitUsage,
    createCustomCard,
    updateCardTemplate,
    refreshWallet: fetchWalletCards,
    refreshCards: fetchCardTemplates,
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
