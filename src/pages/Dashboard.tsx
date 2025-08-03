import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, DollarSign, Plus, Settings } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const isCharterOwner = profile?.role === 'charter_owner';

  // Mock data for demonstration
  const bookings = [
    {
      id: 1,
      boatTitle: "Luxury Yacht Experience",
      date: "2024-02-15",
      time: "2:00 PM - 6:00 PM",
      status: "confirmed",
      price: 1000,
      location: "Toronto Harbour"
    },
    {
      id: 2,
      boatTitle: "Speedboat Adventure",
      date: "2024-02-20",
      time: "10:00 AM - 2:00 PM",
      status: "pending",
      price: 480,
      location: "Centre Island"
    }
  ];

  const listings = [
    {
      id: 1,
      title: "My Yacht",
      type: "Yacht",
      capacity: 12,
      pricePerHour: 250,
      status: "active",
      bookings: 8
    },
    {
      id: 2,
      title: "Speed Demon",
      type: "Speedboat",
      capacity: 6,
      pricePerHour: 120,
      status: "active",
      bookings: 12
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Welcome back, {profile?.first_name || 'there'}!
            </h1>
            <p className="text-muted-foreground mt-2">
              {isCharterOwner ? 'Manage your boat listings and bookings' : 'View your upcoming adventures'}
            </p>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>

        <Tabs defaultValue={isCharterOwner ? "listings" : "bookings"} className="space-y-6">
          <TabsList>
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            {isCharterOwner && (
              <>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="earnings">Earnings</TabsTrigger>
              </>
            )}
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Your Bookings</h2>
              {!isCharterOwner && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Book a Boat
                </Button>
              )}
            </div>
            
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{booking.boatTitle}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {booking.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {booking.location}
                          </div>
                        </div>
                        <p className="text-sm">{booking.time}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                          {booking.status}
                        </Badge>
                        <p className="text-lg font-semibold mt-2">${booking.price}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {isCharterOwner && (
            <>
              <TabsContent value="listings" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Your Boat Listings</h2>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Boat
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {listings.map((listing) => (
                    <Card key={listing.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <h3 className="text-lg font-semibold">{listing.title}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant="outline">{listing.type}</Badge>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                Up to {listing.capacity}
                              </div>
                            </div>
                            <p className="text-sm">{listing.bookings} bookings this month</p>
                          </div>
                          <div className="text-right">
                            <Badge variant={listing.status === 'active' ? 'default' : 'secondary'}>
                              {listing.status}
                            </Badge>
                            <p className="text-lg font-semibold mt-2">${listing.pricePerHour}/hr</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="earnings" className="space-y-6">
                <h2 className="text-2xl font-semibold">Earnings Overview</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">This Month</CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$3,240</div>
                      <p className="text-xs text-muted-foreground">+12% from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">27</div>
                      <p className="text-xs text-muted-foreground">+8 from last month</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">4.8</div>
                      <p className="text-xs text-muted-foreground">Across all listings</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;