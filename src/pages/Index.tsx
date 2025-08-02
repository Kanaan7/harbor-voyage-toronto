import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/home/Hero';
import { MailingList } from '@/components/home/MailingList';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <MailingList />
      </main>
    </div>
  );
};

export default Index;
