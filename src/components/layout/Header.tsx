import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { Anchor, User, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const { user, profile, signOut } = useAuth();

  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Anchor className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">Toronto Harbour</h1>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          <a href="/browse" className="text-foreground hover:text-primary transition-colors">
            Browse Boats
          </a>
          <a href="/how-it-works" className="text-foreground hover:text-primary transition-colors">
            How it Works
          </a>
          <a href="/about" className="text-foreground hover:text-primary transition-colors">
            About
          </a>
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
                <DropdownMenuItem>
                  <a href="/profile" className="flex items-center w-full">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <a href="/dashboard" className="flex items-center w-full">
                    Dashboard
                  </a>
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
              <a href="/auth">
                <Button variant="ghost">Sign In</Button>
              </a>
              <a href="/auth">
                <Button>Get Started</Button>
              </a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}