import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Ship, MapPin, Users, Clock, DollarSign, Camera, Wifi, Music, Anchor, UtensilsCrossed } from 'lucide-react';

export function BoatListingForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    capacity: '',
    location: '',
    port: '',
    pricePerHour: '',
    amenities: [] as string[],
  });

  const boatTypes = [
    'Yacht',
    'Pontoon',
    'Speedboat',
    'Sailboat',
    'Catamaran',
    'Motor Yacht',
    'Fishing Boat',
    'Cabin Cruiser'
  ];

  const ports = [
    { value: 'toronto-harbour', label: 'Toronto Harbour' },
    { value: 'port-credit', label: 'Port Credit' },
    { value: 'hamilton', label: 'Hamilton' }
  ];

  const availableAmenities = [
    { id: 'wifi', label: 'WiFi', icon: Wifi },
    { id: 'sound-system', label: 'Sound System', icon: Music },
    { id: 'kitchen', label: 'Kitchen', icon: UtensilsCrossed },
    { id: 'cooler', label: 'Cooler', icon: Anchor },
    { id: 'fishing-gear', label: 'Fishing Gear', icon: Anchor },
    { id: 'water-sports', label: 'Water Sports', icon: Anchor },
    { id: 'bar', label: 'Bar', icon: UtensilsCrossed },
    { id: 'kid-friendly', label: 'Kid Friendly', icon: Users },
  ];

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: checked 
        ? [...prev.amenities, amenityId]
        : prev.amenities.filter(id => id !== amenityId)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.type || !formData.port || !formData.pricePerHour) {
      toast({
        title: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically submit to your backend/Supabase
    console.log('Submitting boat listing:', formData);
    
    toast({
      title: "Boat listing submitted!",
      description: "We'll review your listing and get back to you within 24 hours."
    });

    // Reset form
    setFormData({
      name: '',
      type: '',
      description: '',
      capacity: '',
      location: '',
      port: '',
      pricePerHour: '',
      amenities: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ship className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Boat Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Sunset Cruiser"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Boat Type *</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select boat type" />
                </SelectTrigger>
                <SelectContent>
                  {boatTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase()}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your boat, its features, and what makes it special..."
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Location & Capacity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location & Capacity
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="port">Port/Marina *</Label>
              <Select value={formData.port} onValueChange={(value) => setFormData(prev => ({ ...prev, port: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select port" />
                </SelectTrigger>
                <SelectContent>
                  {ports.map((port) => (
                    <SelectItem key={port.value} value={port.value}>
                      {port.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="capacity">Maximum Capacity</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="capacity"
                  type="number"
                  placeholder="12"
                  value={formData.capacity}
                  onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Specific Location/Address</Label>
            <Input
              id="location"
              placeholder="e.g., Harbourfront Marina, Pier 6"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pricing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Pricing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="price">Price per Hour (CAD) *</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="price"
                type="number"
                placeholder="150"
                value={formData.pricePerHour}
                onChange={(e) => setFormData(prev => ({ ...prev, pricePerHour: e.target.value }))}
                className="pl-10"
                required
              />
            </div>
            <p className="text-sm text-muted-foreground">
              We'll help you optimize pricing based on market demand
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Amenities */}
      <Card>
        <CardHeader>
          <CardTitle>Amenities & Features</CardTitle>
          <p className="text-sm text-muted-foreground">
            Select all amenities available on your boat
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {availableAmenities.map((amenity) => {
              const IconComponent = amenity.icon;
              return (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={formData.amenities.includes(amenity.id)}
                    onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
                  />
                  <Label htmlFor={amenity.id} className="flex items-center gap-2 text-sm">
                    <IconComponent className="h-4 w-4" />
                    {amenity.label}
                  </Label>
                </div>
              );
            })}
          </div>
          
          {formData.amenities.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Selected amenities:</p>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenityId) => {
                  const amenity = availableAmenities.find(a => a.id === amenityId);
                  return (
                    <Badge key={amenityId} variant="secondary">
                      {amenity?.label}
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Photos Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Photos
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            High-quality photos increase bookings by 40%. We'll help you take professional photos.
          </p>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-2">
              Photo upload coming soon
            </p>
            <p className="text-sm text-muted-foreground">
              Our team will contact you to schedule a professional photo session
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Submit */}
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Save Draft
        </Button>
        <Button type="submit">
          Submit for Review
        </Button>
      </div>
    </form>
  );
}