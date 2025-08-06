import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';
import { Header } from '@/components/layout/Header';

export default function Auth() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-mist to-background">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <AuthForm mode={mode} onToggleMode={toggleMode} />
      </div>
    </div>
  );
}