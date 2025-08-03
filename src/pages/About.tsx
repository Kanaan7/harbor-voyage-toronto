import { Header } from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Anchor, Users, Shield, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Anchor,
      title: "Maritime Excellence",
      description: "We're passionate about connecting people with the beauty of Toronto's waterways through safe, memorable boating experiences.",
    },
    {
      icon: Users,
      title: "Community First",
      description: "Building a trusted community of boat owners and enthusiasts who share our love for the water and commitment to safety.",
    },
    {
      icon: Shield,
      title: "Safety & Trust",
      description: "Every boat listing is verified, and we provide comprehensive insurance coverage for peace of mind.",
    },
    {
      icon: Heart,
      title: "Local Love",
      description: "Born and raised in Toronto, we're dedicated to showcasing the incredible boating opportunities in our hometown.",
    },
  ];

  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "150+", label: "Boats Listed" },
    { number: "50+", label: "Boat Owners" },
    { number: "4.9", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-b from-ocean-deep/10 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">About Toronto Harbour</Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Your Gateway to Toronto's Waters
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're on a mission to make boat rentals accessible, safe, and unforgettable. 
              Since 2023, we've been connecting boat owners with adventure seekers across Toronto Harbour.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Values</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These core values guide everything we do, from vetting boat owners to ensuring amazing customer experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index}>
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <value.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                        <p className="text-muted-foreground">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-foreground mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Toronto Harbour was founded by a group of local boating enthusiasts who saw the incredible 
                    potential of Toronto's waterways but noticed how difficult it was for people to access boat rentals.
                  </p>
                  <p>
                    What started as a weekend project to help friends rent each other's boats has grown into 
                    Toronto's premier boat sharing platform. We've facilitated thousands of memorable experiences 
                    on Lake Ontario, from sunset cruises to birthday celebrations.
                  </p>
                  <p>
                    Today, we're proud to be the most trusted name in Toronto boat rentals, with a community 
                    of verified boat owners and satisfied customers who keep coming back for more adventures.
                  </p>
                </div>
              </div>
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Founder Team Photo</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;