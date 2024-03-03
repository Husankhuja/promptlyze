
import NavBar from '@/components/NavBar'
import { FooterBar } from '@/components/Footer'
import HeroCTA from '@/components/Hero'

export default function Home() {
  return (
    <>
      <NavBar brandName={`Pomrptlyze`} imageSrcPath={`/assets/images/logo.png`}  />
        <main>
          <HeroCTA />
        </main>
      <FooterBar />
    </>
  )
}