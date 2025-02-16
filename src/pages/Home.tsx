import BannerCarousel from "@/components/Shared/Home/Banner";
import ProductSection from "@/components/Shared/Home/ProductSection";
import Reviews from "@/components/Shared/Home/Reviews";

const Home = () => {
  return (
    <div className="md:mx-2 mx-2">
      <BannerCarousel />
      <ProductSection />
      <Reviews />
    </div>
  );
};

export default Home;
