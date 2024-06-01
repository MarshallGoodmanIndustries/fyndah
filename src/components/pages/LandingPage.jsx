import { NavBar, HeroSection, FeaturedPosts, Footer } from "../landingPageComponents";


function LandingPage() {
  return (
    <>
      <header className="relative overflow-x-clip bg-secondary w-full h-full">
        <NavBar />
        <HeroSection />
      </header>
      <main>
        <FeaturedPosts />
      </main>
      <Footer />
    </>
  )
}

export default LandingPage;