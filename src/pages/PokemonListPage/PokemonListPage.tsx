import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import "../../pages/PokemonListPage/PokemonListPage.css";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { TableBoxDesktop } from "../../components/TableBox/TableBoxDesktop";
import { TableBoxMobile } from "../../components/TableBox/TableBoxMobile";
import { Pagination } from "antd";

export const PokemonListPage = observer(() => {
  const { fetchPokemons, pokemonCount, isLoading } = pokemonStore;

  const [windowWidth, setWindowWidth] = useState(0);
  const resizeWindow = (): void => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return (): void => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="main-block">
      <h1>Pokedex</h1>
      <p>Count: {pokemonCount}</p>
      <div className="main-block__search-box">
        <SearchBox />
      </div>
      <div className="main-block__select-box">
        <SelectBox />
      </div>
      <div>
        <Pagination
          showSizeChanger
          onShowSizeChange={fetchPokemons}
          onChange={fetchPokemons}
          defaultCurrent={1}
          total={pokemonCount}
          pageSizeOptions={["10", "20", "50"]}
          disabled={isLoading}
        />
      </div>
      <div className="main-block__table-box">
        {windowWidth < 700 ? <TableBoxMobile /> : <TableBoxDesktop />}
      </div>
    </div>
  );
});
