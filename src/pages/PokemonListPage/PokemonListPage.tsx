import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import "../../pages/PokemonListPage/PokemonListPage.css";
import { SearchBox } from "../../components/SearchBox/SearchBox";
import { SelectBox } from "../../components/SelectBox/SelectBox";
import { ButtonsDesktop } from "../../components/Buttons/ButtonsDesktop";
import { TableBoxDesktop } from "../../components/TableBox/TableBoxDesktop";
import { ButtonMobile } from "../../components/Buttons/ButtonsMobile";
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
    <div className={"main-block"}>
      <h1 className={"main-block__title"}>Pokedex</h1>
      <p className={"main-block__count "}>Count: {count}</p>
      <div className={"search-box"}>
        <SearchBox />
      </div>
      <div className={"search-box"}>
        <SelectBox />
      </div>
      <div>{windowWidth < 700 ? <ButtonMobile /> : <ButtonsDesktop />}</div>
      <div className={"table-box"}>
        {windowWidth < 700 ? <TableBoxMobile /> : <TableBoxDesktop />}
      </div>
      <div>{windowWidth < 700 ? <ButtonMobile /> : <ButtonsDesktop />}</div>
    </div>
  );
});
