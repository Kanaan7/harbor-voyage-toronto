import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Users, Star, Anchor } from 'lucide-react';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPort, setSelectedPort] = useState('toronto-harbour');

  // Mock data for demonstration
  const boats = [
    {
      id: 1,
      title: "Luxury Yacht Experience",
      type: "Yacht",
      capacity: 12,
      pricePerHour: 250,
      location: "Toronto Harbour",
      port: "toronto-harbour",
      rating: 4.8,
      reviews: 24,
      image: "/placeholder.svg",
      amenities: ["WiFi", "Kitchen", "Sound System"]
    },
    {
      id: 2,
      title: "Island Explorer",
      type: "Pontoon",
      capacity: 8,
      pricePerHour: 150,
      location: "Toronto Harbour",
      port: "toronto-harbour",
      rating: 4.9,
      reviews: 18,
      image: "/placeholder.svg",
      amenities: ["WiFi", "Cooler", "Fishing Gear"]
    },
    {
      id: 3,
      title: "Credit Cruiser",
      type: "Speedboat",
      capacity: 6,
      pricePerHour: 180,
      location: "Port Credit",
      port: "port-credit",
      rating: 4.7,
      reviews: 31,
      image: "/placeholder.svg",
      amenities: ["Sound System", "Water Sports", "Cooler"]
    },
    {
      id: 4,
      title: "Hamilton Harbor Queen",
      type: "Motor Yacht",
      capacity: 20,
      pricePerHour: 400,
      location: "Hamilton",
      port: "hamilton",
      rating: 5.0,
      reviews: 12,
      image: "/placeholder.svg",
      amenities: ["Kitchen", "Bar", "WiFi", "Sound System"]
    },
    {
      id: 5,
      title: "Lake Ontario Explorer",
      type: "Catamaran",
      capacity: 15,
      pricePerHour: 250,
      location: "Port Credit",
      port: "port-credit",
      rating: 4.6,
      reviews: 27,
      image: "/placeholder.svg",
      amenities: ["Sailing", "WiFi", "Kitchen"]
    },
    {
      id: 6,
      title: "Steel City Sailor",
      type: "Pontoon",
      capacity: 10,
      pricePerHour: 160,
      location: "Hamilton",
      port: "hamilton",
      rating: 4.8,
      reviews: 22,
      image: "/placeholder.svg",
      amenities: ["Kid Friendly", "Cooler", "Sound System"]
    }
  ];

  const filteredBoats = boats.filter(boat => {
    const matchesSearch = boat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
        <section className="py-8 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Available Boats</h2>
                <p className="text-muted-foreground">
                  Find the perfect boat for your adventure
                </p>
              </div>
              
              {/* Port Selection Tabs */}
              <div className="mb-6">
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
                  <Card key={boat.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted">
                      <img 
                        src={boat.image} 
                        alt={boat.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{boat.title}</CardTitle>
                        <Badge variant="secondary">{boat.type}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {boat.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          Up to {boat.capacity}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        <span className="font-medium">{boat.rating}</span>
                        <span className="text-muted-foreground">({boat.reviews} reviews)</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {boat.amenities.map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="text-2xl font-bold">${boat.pricePerHour}</span>
                          <span className="text-muted-foreground">/hour</span>
                        </div>
                        <Button>Book Now</Button>
                      </div>
                    </CardContent>
                  </Card>
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
