import { useLoaderData } from "react-router";
import CoverageMap from "./CoverageMap";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

const Coverage = () => {
  const serviceCenterData = useLoaderData();
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearch = () => {
    if (!search.trim()) return;
    const lower = search.trim().toLowerCase();
    // Find by district name
    let found = serviceCenterData.find(d => d.district.toLowerCase().includes(lower));
    // If not found, search in covered_area
    if (!found) {
      found = serviceCenterData.find(d => d.covered_area.some(area => area.toLowerCase().includes(lower)));
    }
    setSelectedLocation(found || null);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="container mx-auto px-26 py-20 bg-white mt-8 mb-26 rounded-4xl">
      <h1 className="text-5xl font-extrabold">
        We are available in 64 districts
      </h1>

      <div className="join my-12 max-w-xl flex relative">
        <div className="w-full">
          <input
            className="input focus-within:outline-0 bg-[#CBD5E1] rounded-full border-none join-item w-full" 
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <button className="btn join-item border-none rounded-full bg-primary absolute right-0 z-10" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="border-t border-black/10 ">
        <p className="font-extrabold text-3xl my-12">We deliver almost all over Bangladesh</p>
        <CoverageMap serviceCenterData={serviceCenterData} selectedLocation={selectedLocation} />
      </div>
    </div>
  );
};

export default Coverage;
