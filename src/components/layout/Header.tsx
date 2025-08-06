import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Anchor, User, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="border-b bg-gradient-to-r from-card via-card/95 to-card backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/home" className="flex items-center space-x-2">
          <Anchor className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Toronto Harbour</h1>
        </Link>

        <nav className="flex items-center space-x-2 md:space-x-6 overflow-x-auto">
          <Link to="/home" className="text-foreground hover:text-primary transition-colors whitespace-nowrap px-2 py-1">
            About
          </Link>
          <Link to="/" className="text-foreground hover:text-primary transition-colors whitespace-nowrap px-2 py-1">
            Browse Boats
          </Link>
          <Button 
            onClick={() => navigate('/list-boat')}
            variant="outline"
            size="sm"
            className="whitespace-nowrap"
          >
            List Your Boat
          </Button>
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden md:inline">
                    {profile?.first_name || user.email}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}