import EventDetails from '@/components/wedding/EventDetails';
import Footer from '@/components/wedding/Footer';
import GiftList from '@/components/wedding/GiftList';
import Hero from '@/components/wedding/Hero';
import Navbar from '@/components/wedding/Navbar';
import OurStory from '@/components/wedding/OurStory';
import RSVPForm from '@/components/wedding/RSVPForm';

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* <Navbar /> */}
      <Hero />
      <OurStory />
      <EventDetails />
      <RSVPForm />
      <GiftList />
      {/* <Footer /> */}
    </div>
  );
}
