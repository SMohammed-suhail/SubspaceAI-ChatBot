import React, { useState } from 'react';
import { Mail, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  onSignIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onSignUp: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onResendVerification: () => Promise<{ success: boolean; error?: string }>;
}

export default function AuthScreen({ onSignIn, onSignUp, onResendVerification }: AuthScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'error' | 'success' | 'info'>('error');
  const [showResendButton, setShowResendButton] = useState(false);

  const showMessage = (text: string, type: 'error' | 'success' | 'info') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 5000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { showMessage('Please fill in all fields', 'error'); return; }
    setLoading(true);
    setShowResendButton(false);
    try {
      const result = await onSignIn(email, password);
      if (!result.success) {
        showMessage(result.error || 'Sign in failed', 'error');
        if (result.error?.includes('verify your email')) setShowResendButton(true);
      }
    } catch { showMessage('An unexpected error occurred', 'error'); }
    finally { setLoading(false); }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { showMessage('Please fill in all fields', 'error'); return; }
    if (password.length < 6) { showMessage('Password must be at least 6 characters long', 'error'); return; }
    setLoading(true);
    setShowResendButton(false);
    try {
      const result = await onSignUp(email, password);
      if (result.success) showMessage(result.error || 'Account created! Please verify your email.', 'success');
      else showMessage(result.error || 'Sign up failed', 'error');
    } catch { showMessage('An unexpected error occurred', 'error'); }
    finally { setLoading(false); }
  };

  const handleResendVerification = async () => {
    setLoading(true);
    try {
      const result = await onResendVerification();
      if (result.success) { showMessage('Verification email sent!', 'success'); setShowResendButton(false); }
      else showMessage(result.error || 'Failed to send verification email', 'error');
    } catch { showMessage('An unexpected error occurred', 'error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">SubspaceAI</h1>
          <p className="text-gray-600">Welcome!</p>
          <p className="text-sm text-gray-500 mt-2">Sign in or create a new account</p>
          {loading && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-blue-700">Processing...</span>
              </div>
            </div>
          )}
        </div>

        <form className="space-y-4">
          <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading} />
          <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={loading} minLength={6} />

          {message && (
            <div className={`flex items-center space-x-2 p-3 rounded-lg text-sm ${messageType === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-blue-50 text-blue-700 border border-blue-200'}`}>
              {messageType === 'error' ? <AlertCircle className="w-4 h-4 flex-shrink-0" /> : <Mail className="w-4 h-4 flex-shrink-0" />}
              <span>{message}</span>
            </div>
          )}

          <div className="flex space-x-3">
            <button type="button" onClick={handleSignIn} disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
            <button type="button" onClick={handleSignUp} disabled={loading}
              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors">
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>

          {showResendButton && (
            <button type="button" onClick={handleResendVerification} disabled={loading}
              className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2">
              <Mail className="w-4 h-4" /><span>Resend Verification Email</span>
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
