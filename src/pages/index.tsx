import { Header } from "../components/Header";
import { FeaturedContent } from "../components/FeaturedContent";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <h1>Amber podcasts</h1>
        <FeaturedContent />
      </main>
    </>
  )
}
