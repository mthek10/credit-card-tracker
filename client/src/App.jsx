import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
import Layout from './components/Layout';
import AuthPage from './components/AuthPage';
import VerifyPage from './components/VerifyPage';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import CardLibrary from './components/CardLibrary';
import CardDetails from './components/CardDetails';

export default function App() {
  const { isAuthenticated, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border-4 border-indigo-200 rounded-full animate-spin border-t-indigo-600"></div>
            <span className="text-gray-600 font-medium">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Magic link verification - always accessible */}
      <Route path="/auth/verify" element={<VerifyPage />} />
      
      {isAuthenticated ? (
        // Authenticated routes
        <>
          <Route path="/" element={<Layout><Dashboard /></Layout>} />
          <Route path="/wallet" element={<Layout><Wallet /></Layout>} />
          <Route path="/wallet/:cardId" element={<Layout><CardDetails /></Layout>} />
          <Route path="/library" element={<Layout><CardLibrary /></Layout>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </>
      ) : (
        // Unauthenticated - show auth page
        <Route path="*" element={<AuthPage />} />
      )}
    </Routes>
  );
}
