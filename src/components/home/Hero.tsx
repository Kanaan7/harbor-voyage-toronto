import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays, MapPin, Users, Search } from 'lucide-react';

export function Hero() {
  const [searchDate, setSearchDate] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [searchCapacity, setSearchCapacity] = useState('');

  return (
    <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-ocean-mist to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Discover Toronto's
            <span className="block text-primary">Beautiful Waters</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Rent premium boats from local charter owners. Experience Toronto Harbour 
            like never before with our trusted community marketplace.
          </p>

          {/* Search Card */}
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Date
                  </label>
                  <Input
                    type="date"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    Location
                  </label>
                  <Input
                    placeholder="Harbourfront, Islands..."
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Capacity
                  </label>
                  <Input
                    type="number"
                    placeholder="4"
                    value={searchCapacity}
                    onChange={(e) => setSearchCapacity(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <Button size="lg" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search Boats
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">Boats Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Charter Owners</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}