import { useState } from 'react';
import { AuthForm } from '@/components/auth/AuthForm';

export default function Auth() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-mist to-background p-4">
      <AuthForm mode={mode} onToggleMode={toggleMode} />
    </div>
  );
}