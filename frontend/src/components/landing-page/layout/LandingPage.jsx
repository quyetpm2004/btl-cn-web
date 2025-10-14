import { Outlet } from 'react-router'
import Navbar from '../Navbar'
import Hero from '../Hero'
import About from '../About'
import ApartmentTypes from '../ApartmentTypes'
import Pricing from '../Pricing'
import Amenities from '../Amenities'
import News from '../News'
import Contact from '../Contact'
import Footer from '../Footer'


const LandingPage = () => {
    return (
        <div className="bg-gray-50">
            <Navbar />
            <Hero />
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

export default LandingPage