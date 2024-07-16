
import Footer from "../components/ui/Footer";
import { FrontSection } from "../components/ui/FrontSection";
import Header from "../components/ui/Header";


const Landing = () => (
  <div className="flex flex-col min-h-[100dvh]">
    <Header />
    <main className="flex-1">
      <FrontSection />
    </main>
    <Footer />
  </div>
);

export default Landing;
