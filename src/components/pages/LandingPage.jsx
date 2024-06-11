import { NavBar, HeroSection, FeaturedPosts, Footer, FeaturedListings, WhatWeOffer, WhyChooseUs } from "../landingPageComponents";



function LandingPage() {
  return (
    <>
      <header className="relative overflow-x-clip bg-secondary w-full h-full">
        <NavBar />
        <HeroSection />
      </header>
      <main>
        <FeaturedListings />
        <FeaturedPosts />
        <WhatWeOffer />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage;