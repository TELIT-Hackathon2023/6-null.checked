import { Footer } from "@/components/footer";
import { LandingHero } from "@/components/landing-hero";
import Navbar from "@/components/navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <section className="h-full pb-40">
        <LandingHero />
      </section>
      <Footer />
    </>
  )
}
