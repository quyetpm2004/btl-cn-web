import { Navbar } from '../Navbar'
import { Hero } from '../Hero'
import { About } from '../About'
import { ApartmentTypes } from '../ApartmentTypes'
import { Pricing } from '../Pricing'
import { Amenities } from '../Amenities'
import { News } from '../News'
import { Contact } from '../Contact'
import { Footer } from '../Footer'
import LuxuryHero from '../LuxuryHero'

export const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      <Navbar />
      <LuxuryHero />
      <About />
      <ApartmentTypes />
      <Pricing />
      <Amenities />
      <News />
      <Contact />
      <Footer />
    </div>
  )
}
