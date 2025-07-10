import { Hero } from "@/components/hero";
import { SearchForm } from "@/components/search-form";
import { SportsSection } from "@/components/sports-section";
import { FeaturedClubs } from "@/components/featured-clubs";
import { Benefits } from "@/components/benefits";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-16">
      <Hero />
      <div className="container mx-auto px-4">
        <SearchForm />
      </div>
      <SportsSection />
      <FeaturedClubs />
      <Benefits />
    </div>
  );
}
