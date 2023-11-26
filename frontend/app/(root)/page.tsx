import { Footer } from "@/components/footer";
import { LandingHero } from "@/components/landing-hero";
import Navbar from "@/components/navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <section className="h-full">
        <LandingHero />
      </section>
      <Footer />
    </>
  )
}
