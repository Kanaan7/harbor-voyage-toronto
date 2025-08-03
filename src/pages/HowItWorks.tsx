import { Header } from '@/components/layout/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Calendar, Anchor, CreditCard } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Search",
      description: "Explore our selection of boats available in Toronto Harbour. Filter by capacity, amenities, and location to find your perfect match.",
    },
    {
      icon: Calendar,
      title: "Book Your Date",
      description: "Select your preferred date and time. Our calendar shows real-time availability so you can book with confidence.",
    },
    {
      icon: CreditCard,
      title: "Secure Payment",
      description: "Pay securely online with our encrypted payment system. Your booking is confirmed instantly upon payment.",
    },
    {
      icon: Anchor,
      title: "Set Sail",
      description: "Meet your boat owner at the designated pickup location and enjoy your Toronto Harbour adventure!",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-foreground mb-6">How It Works</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Renting a boat in Toronto Harbour has never been easier. Follow these simple steps to get out on the water.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-sm font-medium text-primary mb-2">Step {index + 1}</div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">For Boat Owners</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-background rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">List Your Boat</h3>
                  <p className="text-muted-foreground">Create a detailed listing with photos, amenities, and availability.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-background rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manage Bookings</h3>
                  <p className="text-muted-foreground">Accept or decline requests and communicate with renters.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <div className="w-2 h-2 bg-background rounded-full"></div>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Get Paid</h3>
                  <p className="text-muted-foreground">Receive payments directly to your account after each rental.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Boat Owner Dashboard Preview</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HowItWorks;