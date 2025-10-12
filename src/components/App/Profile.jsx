import ClothesSection from "./ClothesSection";
import SideBar from "./SideBar";
import "../../blocks/Profile.css";

export default function Profile({
  clothingItems,
  handleAddClick,
  handleCardClick,
}) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}
