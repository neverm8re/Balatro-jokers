import { useState, useMemo } from "react";
import jokersData from "./data/jokers.json";
import { JokerCard } from "./components/JokerCard";
import { Controls } from "./components/Controls";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRarity, setFilterRarity] = useState("All");

  const filteredJokers = useMemo(() => {
    return jokersData.filter((joker) => {
      const matchesSearch = joker.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRarity =
        filterRarity === "All" || joker.rarity === filterRarity;
      return matchesSearch && matchesRarity;
    });
  }, [searchTerm, filterRarity]);

  return (
    <div className="min-h-screen w-full py-20 px-10 sm:px-32 bg-[#1a1c1e] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <Controls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRarity={filterRarity}
          setFilterRarity={setFilterRarity}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
            gap: "140px 20px",
            justifyItems: "center",
          }}
        >
          {filteredJokers.map((joker, index) => (
            <JokerCard key={joker.name + index} joker={joker} />
          ))}
        </div>

        {filteredJokers.length === 0 && (
          <div className="text-center mt-32">
            <h2 className="balatro-font text-white text-5xl opacity-20 uppercase">
              No Jokers Found
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
