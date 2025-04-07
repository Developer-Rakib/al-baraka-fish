import BannerSection from "./components/HomePage/BannerSection";
import Header from "./components/Shared/menus/Header";
// import Home from './components';

export default function Home() {
  return (
    <div className="mt-32 h-[1400px] text-center font-[family-name:var(--font-geist-sans)]">
      <BannerSection></BannerSection>
    </div>
  );
}
