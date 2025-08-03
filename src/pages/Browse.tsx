import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Users, Star } from 'lucide-react';

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for demonstration
  const boats = [
    {
      id: 1,
      title: "Luxury Yacht Experience",
      type: "Yacht",
      capacity: 12,
      pricePerHour: 250,
      location: "Toronto Harbour",
      rating: 4.8,
      reviews: 24,
      image: "/placeholder.svg",
      amenities: ["WiFi", "Kitchen", "Sound System"]
    },
    {
      id: 2,
      title: "Speedboat Adventure",
      type: "Speedboat",
      capacity: 6,
      pricePerHour: 120,
      location: "Centre Island",
      rating: 4.6,
      reviews: 18,
      image: "/placeholder.svg",
      amenities: ["Water Sports", "Cooler", "Sound System"]
    },
    {
      id: 3,
      title: "Sailing Catamaran",
      type: "Sailboat",
      capacity: 8,
      pricePerHour: 180,
      location: "Harbourfront",
      rating: 4.9,
      reviews: 31,
      image: "/placeholder.svg",
      amenities: ["Sailing Experience", "Kitchen", "Deck Space"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Browse Boats</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Find the perfect boat for your Toronto Harbour adventure
          </p>
          
          <div className="flex gap-4 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by location, boat type, or amenities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button>Search</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {boats.map((boat) => (
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
                  <Button>View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Browse;