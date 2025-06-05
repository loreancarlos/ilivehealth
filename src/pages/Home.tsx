import { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import AddressBar from "../components/AddressBar";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SpecialOffers from "../components/SpecialOffers";
import NearbyClinicsList from "../components/NearbyClinicsList";
import PopularProfessionalsList from "../components/PopularProfessionalsList";
import NotificationModal from "../components/NotificationModal";
import FilterModal from "../components/FilterModal";
import {
  categories,
  specialOffers,
  nearbyClinics,
  popularProfessionals,
} from "../data/mockData";
import { useClinicStore } from "../store/clinicStore";
import { Category } from "../types";
import { useProfessionalStore } from "../store/professionalStore";

const Home: React.FC = () => {
  const { setShowFilterModal } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState("");
  const {
    clinics,
    loading: clinicLoading,
    error: clinicError,
    fetchClinics,
    getClinicById,
  } = useClinicStore();
  const {
    professionals,
    loading: professionalLoading,
    error: professionalError,
    fetchProfessionals,
    getProfessionalById,
  } = useProfessionalStore();

  useEffect(() => {
    fetchClinics();
    fetchProfessionals();
  }, [fetchClinics, fetchProfessionals]);

  const handleClinics = useMemo(() => {
    return clinics;
  }, [clinics]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleCategorySelect = (category: Category) => {
    setShowFilterModal(true);
  };

  return (
    <div id="homeScreen" className="pb-4">
      <AddressBar />
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter categories={categories} onSelect={handleCategorySelect} />
      {specialOffers.length > 0 && <SpecialOffers offers={specialOffers} />}
      <NearbyClinicsList clinics={handleClinics} />
      <PopularProfessionalsList professionals={professionals} />

      <NotificationModal />
      <FilterModal />
    </div>
  );
};

export default Home;
