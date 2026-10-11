import HeroSlider from '@/components/home/HeroSlider';
import CategoryTiles from '@/components/home/CategoryTiles';
import NewArrivals from '@/components/home/NewArrivals';
import Bestsellers from '@/components/home/Bestsellers';
import BrandStory from '@/components/home/BrandStory';
import FeaturedSareeCollection from '@/components/home/FeaturedSareeCollection';
import JewelryShowcase from '@/components/home/JewelryShowcase';
import ShopTheLook from '@/components/home/ShopTheLook';
import PromoBanner from '@/components/home/PromoBanner';
import CustomerTestimonials from '@/components/home/CustomerTestimonials';
import SocialGallery from '@/components/home/SocialGallery';
import NewsletterSection from '@/components/home/NewsletterSection';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* 3. Animated hero slider with Framer Motion */}
      <HeroSlider />

      {/* 4. Shop by Category (12 Luxury Tiles) */}
      <CategoryTiles />

      {/* 5. New Arrivals */}
      <NewArrivals />

      {/* 7. Editorial Brand Story */}
      <BrandStory />

      {/* 8. Featured Saree Collection */}
      <FeaturedSareeCollection />

      {/* 6. Bestselling Products */}
      <Bestsellers />

      {/* 9. Jewelry Collection Showcase */}
      <JewelryShowcase />

      {/* 10. Shop the Look */}
      <ShopTheLook />

      {/* 11. Promotional campaign banner */}
      <PromoBanner />

      {/* 12. Customer testimonials */}
      <CustomerTestimonials />

      {/* 13. Social media gallery */}
      <SocialGallery />

      {/* 14. Newsletter signup */}
      <NewsletterSection />
    </div>
  );
}
