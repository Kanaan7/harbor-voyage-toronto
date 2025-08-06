import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ContactOwner } from './ContactOwner';
import { MapPin, Users, Clock, Star } from 'lucide-react';

interface BoatCardProps {
  id: string;
  name: string;
  type: string;
  capacity: number;
  location: string;
  price: number;
  rating: number;
  image: string;
  ownerName: string;
  features: string[];
}

export function BoatCard({ 
  id, 
  name, 
  type, 
  capacity, 
  location, 
  price, 
  rating, 
  image, 
  ownerName,
  features 
}: BoatCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-card/50">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-background/90 text-foreground">
          {type}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Up to {capacity} people</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {features.slice(0, 3).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {feature}
            </Badge>
          ))}
          {features.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{features.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-between w-full">
          <div className="text-2xl font-bold text-primary">
            ${price}
            <span className="text-sm font-normal text-muted-foreground">/hour</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            Book Now
          </Button>
          <ContactOwner boatName={name} ownerName={ownerName} />
        </div>
      </CardFooter>
    </Card>
  );
}