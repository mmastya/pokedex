import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import { Button as ButtonMob } from "antd-mobile";
import "../../pages/PokemonListPage/PokemonListPage.css";

export const ButtonMobile = observer(() => {
  const { init, next, previous, nextPage, previousPage, amount } = pokemonStore;

  const handleNext = useCallback((): void => {
    nextPage();
  }, []);

  const handlePrevious = useCallback((): void => {
    previousPage();
  }, []);

  useEffect(() => {
    init(amount);
  }, []);

  const handleAmountFifty = (): void => {
    init(50);
  };

  const handleAmountTwenty = (): void => {
    init(20);
  };

  const handleAmountTen = (): void => {
    init(10);
  };

  return (
    <div>
      <ul className={"button-list--mobile"}>
        <li className={"button-list__item--mobile"}>
          {previous ? (
            <ButtonMob type="primary" onClick={handlePrevious}>
              Previous
            </ButtonMob>
          ) : null}
        </li>
        <li className={"button-list__item--mobile"}>
          {next ? (
            <ButtonMob type="primary" onClick={handleNext}>
              Next
            </ButtonMob>
          ) : null}
        </li>
        <li className={"button-list__item--mobile"}>
          <ButtonMob onClick={handleAmountTen}>10</ButtonMob>
        </li>
        <li className={"button-list__item--mobile"}>
          <ButtonMob onClick={handleAmountTwenty}>20</ButtonMob>
        </li>
        <li className={"button-list__item--mobile"}>
          <ButtonMob onClick={handleAmountFifty}>50</ButtonMob>
        </li>
      </ul>
    </div>
  );
});
