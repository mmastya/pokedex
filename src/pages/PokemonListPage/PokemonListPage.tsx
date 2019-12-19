import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import "../../pages/PokemonListPage/PokemonListPage.css";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { ButtonsDesktop } from "../../components/Buttons/ButtonsDesktop/ButtonsDesktop";
import { TableBoxDesktop } from "../../components/TableBox/TableBoxDesktop";
import { ButtonMobile } from "../../components/Buttons/ButtonsMobile/ButtonsMobile";
import { TableBoxMobile } from "../../components/TableBox/TableBoxMobile";

export const PokemonListPage = observer(() => {
  const { init, count, amount } = pokemonStore;

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
    init(amount);
  }, []);

  return (
    <div className="main-block">
      <h1>Pokedex</h1>
      <p>Count: {count}</p>
      <div className="main-block__search-box">
        <SearchBox />
      </div>
      <div className="main-block__select-box">
        <SelectBox />
      </div>
      <div>{windowWidth < 700 ? <ButtonMobile /> : <ButtonsDesktop />}</div>
      <div className="main-block__table-box">
        {windowWidth < 700 ? <TableBoxMobile /> : <TableBoxDesktop />}
      </div>
      <div>{windowWidth < 700 ? <ButtonMobile /> : <ButtonsDesktop />}</div>
    </div>
  );
});
