import { Header } from '@/components/layout/Header';
import { BoatListingForm } from '@/components/owner/BoatListingForm';

const ListBoat = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">List Your Boat</h1>
            <p className="text-lg text-muted-foreground">
              Start earning money by sharing your boat with fellow water enthusiasts
            </p>
          </div>
          
          <BoatListingForm />
        </div>
      </main>
    </div>
  );
};

export default ListBoat;