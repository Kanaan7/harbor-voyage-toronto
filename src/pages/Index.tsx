import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { MailingList } from '@/components/home/MailingList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, Shield, Clock, Star, Anchor } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        
        {/* How It Works Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Rent a boat in three simple steps and start your adventure on Toronto's beautiful waters
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>1. Choose Your Boat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Browse our selection of premium boats at Toronto Harbour, Port Credit, and Hamilton
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>2. Book Instantly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Select your date, duration, and party size. Secure your booking with instant confirmation
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Anchor className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>3. Set Sail</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Meet your captain at the marina and enjoy your unforgettable experience on the water
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About Toronto Harbour Boats</h2>
                <p className="text-muted-foreground mb-6">
                  We're Toronto's premier boat rental marketplace, connecting adventurers with 
                  trusted local charter owners. Since 2020, we've helped thousands of people 
                  discover the beauty of Lake Ontario's waters.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary" />
                    <span>Fully insured and licensed operators</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>24/7 customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-primary" />
                    <span>5-star average rating</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">100+</div>
                    <div className="text-sm text-muted-foreground">Boats Available</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Charter Owners</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">1000+</div>
                    <div className="text-sm text-muted-foreground">Happy Customers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">3</div>
                    <div className="text-sm text-muted-foreground">Marina Locations</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        <MailingList />
      </main>
    </div>
  );
};

export default Index;
