import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Clock, Users, Search, Anchor } from 'lucide-react';

export function Hero() {
  const [searchDate, setSearchDate] = useState('');
  const [selectedPort, setSelectedPort] = useState('toronto-harbour');
  const [searchCapacity, setSearchCapacity] = useState('');
  const [duration, setDuration] = useState('');

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

          {/* Port Selection Tabs */}
          <div className="mb-8">
            <Tabs value={selectedPort} onValueChange={setSelectedPort} className="w-full max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="toronto-harbour" className="flex items-center gap-2">
                  <Anchor className="h-4 w-4" />
                  Toronto Harbour
                </TabsTrigger>
                <TabsTrigger value="port-credit" className="flex items-center gap-2">
                  <Anchor className="h-4 w-4" />
                  Port Credit
                </TabsTrigger>
                <TabsTrigger value="hamilton" className="flex items-center gap-2">
                  <Anchor className="h-4 w-4" />
                  Hamilton
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

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
                    <Clock className="h-4 w-4 mr-2" />
                    Duration
                  </label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Hours</SelectItem>
                      <SelectItem value="4">4 Hours</SelectItem>
                      <SelectItem value="6">6 Hours</SelectItem>
                      <SelectItem value="8">Full Day (8 Hours)</SelectItem>
                      <SelectItem value="custom">Custom Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Capacity
                  </label>
                  <Select value={searchCapacity} onValueChange={setSearchCapacity}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select capacity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2-4">2-4 People</SelectItem>
                      <SelectItem value="5-8">5-8 People</SelectItem>
                      <SelectItem value="9-12">9-12 People</SelectItem>
                      <SelectItem value="13-20">13-20 People</SelectItem>
                      <SelectItem value="20+">20+ People</SelectItem>
                    </SelectContent>
                  </Select>
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