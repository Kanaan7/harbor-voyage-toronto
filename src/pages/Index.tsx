import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { BoatCard } from '@/components/boats/BoatCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Users, Star, Anchor } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPort, setSelectedPort] = useState('toronto-harbour');

  // Mock data for demonstration
  const boats = [
    {
      id: "1",
      name: "Luxury Yacht Experience",
      type: "Yacht",
      capacity: 12,
      price: 250,
      location: "Toronto Harbour",
      port: "toronto-harbour",
      rating: 4.8,
      reviews: 24,
      image: "/placeholder.svg",
      ownerName: "Captain Mike",
      features: ["WiFi", "Kitchen", "Sound System"]
    },
    {
      id: "2",
      name: "Island Explorer",
      type: "Pontoon",
      capacity: 8,
      price: 150,
      location: "Toronto Harbour",
      port: "toronto-harbour",
      rating: 4.9,
      reviews: 18,
      image: "/placeholder.svg",
      ownerName: "Sarah Johnson",
      features: ["WiFi", "Cooler", "Fishing Gear"]
    },
    {
      id: "3",
      name: "Credit Cruiser",
      type: "Speedboat",
      capacity: 6,
      price: 180,
      location: "Port Credit",
      port: "port-credit",
      rating: 4.7,
      reviews: 31,
      image: "/placeholder.svg",
      ownerName: "Alex Chen",
      features: ["Sound System", "Water Sports", "Cooler"]
    },
    {
      id: "4",
      name: "Hamilton Harbor Queen",
      type: "Motor Yacht",
      capacity: 20,
      price: 400,
      location: "Hamilton",
      port: "hamilton",
      rating: 5.0,
      reviews: 12,
      image: "/placeholder.svg",
      ownerName: "Captain Rodriguez",
      features: ["Kitchen", "Bar", "WiFi", "Sound System"]
    },
    {
      id: "5",
      name: "Lake Ontario Explorer",
      type: "Catamaran",
      capacity: 15,
      price: 250,
      location: "Port Credit",
      port: "port-credit",
      rating: 4.6,
      reviews: 27,
      image: "/placeholder.svg",
      ownerName: "Maria Santos",
      features: ["Sailing", "WiFi", "Kitchen"]
    },
    {
      id: "6",
      name: "Steel City Sailor",
      type: "Pontoon",
      capacity: 10,
      price: 160,
      location: "Hamilton",
      port: "hamilton",
      rating: 4.8,
      reviews: 22,
      image: "/placeholder.svg",
      ownerName: "Captain Smith",
      features: ["Kid Friendly", "Cooler", "Sound System"]
    }
  ];

  const filteredBoats = boats.filter(boat => {
    const matchesSearch = boat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boat.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      boat.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPort = boat.port === selectedPort;
    return matchesSearch && matchesPort;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* Browse Section */}
        <section className="py-8 bg-gradient-to-br from-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Available Boats</h2>
                <p className="text-muted-foreground">
                  Find the perfect boat for your adventure
                </p>
              </div>
              
              {/* Port Selection Tabs */}
              <div className="mb-6">
                <Tabs value={selectedPort} onValueChange={setSelectedPort} className="w-full max-w-lg mx-auto">
                  <TabsList className="grid w-full grid-cols-3 h-12">
                    <TabsTrigger value="toronto-harbour" className="flex items-center gap-1 text-xs sm:text-sm">
                      <Anchor className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Toronto Harbour</span>
                      <span className="sm:hidden">Toronto</span>
                    </TabsTrigger>
                    <TabsTrigger value="port-credit" className="flex items-center gap-1 text-xs sm:text-sm">
                      <Anchor className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Port Credit</span>
                      <span className="sm:hidden">Credit</span>
                    </TabsTrigger>
                    <TabsTrigger value="hamilton" className="flex items-center gap-1 text-xs sm:text-sm">
                      <Anchor className="h-3 w-3 sm:h-4 sm:w-4" />
                      Hamilton
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex gap-4 max-w-2xl mx-auto mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by boat name or type..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button>Search</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBoats.map((boat) => (
                  <BoatCard key={boat.id} {...boat} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
