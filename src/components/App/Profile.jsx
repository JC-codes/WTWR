import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "../../blocks/Profile.css";

export default function Profile({ clothingItems, handleCardClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}
