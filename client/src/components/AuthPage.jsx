import { useState } from 'react';
import { useUser } from '../context/UserContext';

export default function AuthPage() {
  const { requestMagicLink, error, clearError } = useUser();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [needsName, setNeedsName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [devToken, setDevToken] = useState(null);
  const [emailFailed, setEmailFailed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    if (needsName && !name.trim()) return;
    
    setLoading(true);
    clearError();
    
    const nameToSend = needsName && name.trim() ? name.trim() : null;
    const result = await requestMagicLink(email.trim(), nameToSend);
    
    setLoading(false);
    
    if (result.needsName) {
      setNeedsName(true);
    } else if (result.success) {
      setEmailSent(true);
      setDevToken(result.devToken);
      setEmailFailed(result.emailError || false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {emailFailed ? 'Use this link to log in' : 'Check your email'}
          </h1>
          <p className="text-gray-600 mb-6">
            {emailFailed ? (
              <>Click the link below to log in</>
            ) : (
              <>We sent a login link to<br />
              <span className="font-semibold text-gray-900">{email}</span></>
            )}
          </p>
          
          {!emailFailed && (
            <div className="bg-indigo-50 rounded-xl p-4 mb-6 text-left">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-sm text-indigo-800">
                  Click the link in the email to log in. The link expires in 15 minutes.
                </div>
              </div>
            </div>
          )}

          {/* Show login link when email fails or in dev mode */}
          {devToken && (
            <div className={`rounded-xl p-4 mb-6 text-left ${emailFailed ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
              {!emailFailed && <div className="text-xs font-semibold text-amber-700 uppercase mb-2">Dev Mode</div>}
              <a 
                href={`/auth/verify?token=${devToken}`}
                className={`text-sm font-medium hover:underline break-all block ${emailFailed ? 'text-green-700' : 'text-amber-800'}`}
              >
                {emailFailed ? '→ Click here to log in to CardTracker' : 'Click here to log in (or check console for email preview)'}
              </a>
            </div>
          )}

          <button
            onClick={() => {
              setEmailSent(false);
              setDevToken(null);
            }}
            className="text-indigo-600 font-medium hover:underline"
          >
            Use a different email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Header */}
        <div className="p-8 pb-0 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
              <line x1="1" y1="10" x2="23" y2="10" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">CardTracker</h1>
          <p className="text-gray-500 mt-1">Track your credit card benefits</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              required
              disabled={needsName}
            />
          </div>

          {needsName && (
            <div className="animate-slide-up">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                required
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-2">
                Looks like you're new! We just need your name to create your account.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {needsName ? 'Create Account & Send Link' : 'Send Magic Link'}
              </>
            )}
          </button>

          {needsName && (
            <button
              type="button"
              onClick={() => {
                setNeedsName(false);
                setName('');
                clearError();
              }}
              className="w-full text-gray-500 text-sm hover:text-gray-700"
            >
              Use a different email
            </button>
          )}
        </form>

        {/* Footer */}
        <div className="px-8 pb-8">
          <div className="text-center text-sm text-gray-500">
            <p>We'll send you a magic link to log in.</p>
            <p className="mt-1">No password needed!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
