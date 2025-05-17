import HomeBanners from "@/components/HomeBanners";
import HomeBestSeller from "@/components/HomeBestSeller";

export default function Home() {
  return (
    <main>
    <HomeBanners />
      <div className="max-w-screen-xl mx-auto p-6">
        <HomeBestSeller />
      </div>
      
    </main>

  );
}
