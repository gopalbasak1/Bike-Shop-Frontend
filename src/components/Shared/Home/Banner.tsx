// BannerCarousel.jsx
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner4 from "../../../assets/images/purpose.jpg";
import banner2 from "../../../assets/images/mutt-motorcycles-3.jpg";
import banner3 from "../../../assets/images/MOTO-SHOP-NEW-END-2018.jpg";
import banner1 from "../../../assets/images/download (1).jpg";

const BannerCarousel = () => {
  const banners = [
    {
      id: 1,
      title: "Special Offer 1",
      description: "Get 50% off on your first purchase!",
      image: banner1,
    },
    {
      id: 2,
      title: "Limited Time Offer",
      description: "Free shipping on orders over $100!",
      image: banner2,
    },
    {
      id: 3,
      title: "New Arrivals",
      description: "Check out our latest collection!",
      image: banner3,
    },
    {
      id: 4, // Changed duplicate id
      title: "Exclusive Collection",
      description: "Discover our premium range!",
      image: banner4,
    },
  ];

  return (
    <div className="container mx-auto mt-4 shadow-lg rounded-2xl overflow-hidden">
      <Carousel
        showArrows={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
      >
        {banners.map((banner) => (
          <div key={banner.id} className="relative">
            <img
              src={banner.image}
              alt={banner.title}
              className="object-cover w-full h-auto md:h-[500px] lg:h-[600px]"
            />
            <div className="absolute bottom-0 left-0 w-full p-2 md:p-4 bg-black bg-opacity-60 text-white text-center">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold">
                {banner.title}
              </h2>
              <p className="text-sm md:text-lg">{banner.description}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default BannerCarousel;
