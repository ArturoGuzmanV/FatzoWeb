/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { PaymentsRoiSection } from './components/PaymentsRoiSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { MockupStage } from './components/MenuShowcaseMockup';

export default function App() {
  const [mockupStage, setMockupStage] = useState<MockupStage>('carta');

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfdfb] text-[#111111]">
      <Navbar />
      <main className="flex-1">
        <HeroSection
          mockupStage={mockupStage}
          onSelectMockupStage={setMockupStage}
        />
        <CapabilitiesBento />
        <PaymentsRoiSection />
        <CaseStudiesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
