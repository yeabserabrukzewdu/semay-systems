/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TopBar from './components/TopBar';
import FloatingContact from './components/FloatingContact';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Cursor from './components/Cursor';
import Marquee from './components/Marquee';
import Ethiopia from './components/Ethiopia';
import Showcase from './components/Showcase';
import Services from './components/Services';
import Process from './components/Process';
import WhyEthiopia from './components/WhyEthiopia';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative selection:bg-accent selection:text-paper" id="app-root">
      <Cursor />
      <div className="relative z-[110]">
        <TopBar />
        <Navbar />
      </div>
      <FloatingContact />
      <main>
        <Hero />
        <div className="relative py-3 flex justify-center items-center gap-12 text-white/90 text-mono text-[9px] tracking-[0.18em] uppercase overflow-hidden">
          <div className="absolute inset-0 flex flex-col">
            <div className="flex-1 bg-et-green opacity-90" />
            <div className="flex-1 bg-et-yellow opacity-90" />
            <div className="flex-1 bg-et-red opacity-90" />
          </div>
          <div className="relative z-10 flex items-center gap-12">
            <span>Based in Addis Ababa, Ethiopia</span>
            <div className="w-px h-3 bg-white/20" />
            <span>Serving Ethiopia · East Africa · Global</span>
          </div>
        </div>
        <Marquee />
        <Ethiopia />
        <Showcase />
        <Services />
        <Process />
        <WhyEthiopia />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

