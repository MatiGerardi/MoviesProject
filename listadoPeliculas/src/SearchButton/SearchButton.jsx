import { useState } from "react";
import "./SearchButton.css";
import SearchWindow from "../apiIMDB/SearchWindow";

function SearchButton() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <button className="search-btn" onClick={() => setSearchOpen(true)}>
        Buscar
      </button>

      {searchOpen && (
        <>
        <div className="search-modal">
          <SearchWindow></SearchWindow>
        </div>
          <button className="close-btn" onClick={() => setSearchOpen(false)}>
            ✖
          </button>
        </>
      )}
    </>
  );
}

export default SearchButton;
