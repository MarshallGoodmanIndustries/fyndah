import { NavBar, HeroSection, AdBanner, FeaturedPosts, Footer } from "../landingPageComponents";



function LandingPage() {
  return (
    <>
      <header className="relative overflow-x-clip bg-secondary w-full h-full">
        <NavBar />
        <HeroSection />
      </header>
      <main>
        {/* <div className="py-8 px-4 sm:px-5 md:px-6 lg:px-8">
          <AdBanner />
        </div> */}
        <FeaturedPosts />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage;