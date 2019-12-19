import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../../stores/PokemonStore";
import { Button as ButtonMob } from "antd-mobile";
import "./ButtonsMobile.css";

export const ButtonMobile = observer(() => {
  const {
    init,
    next,
    previous,
    nextPage,
    previousPage,
    amount,
    isLoading,
    setAmount,
  } = pokemonStore;

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
    setAmount(50);
  };

  const handleAmountTwenty = (): void => {
    setAmount(20);
  };

  const handleAmountTen = (): void => {
    setAmount(10);
  };

  return (
    <div>
      <ul className="button-list-mobile">
        <li className="button-list-mobile__item">
          {previous ? (
            <ButtonMob type="primary" onClick={handlePrevious} loading={isLoading}>
              Previous
            </ButtonMob>
          ) : null}
        </li>
        <li className="button-list-mobile__item">
          {next ? (
            <ButtonMob type="primary" onClick={handleNext} loading={isLoading}>
              Next
            </ButtonMob>
          ) : null}
        </li>
        <li className="button-list-mobile__item">
          <ButtonMob type={amount === 10 ? "primary" : "ghost"} onClick={handleAmountTen}>
            10
          </ButtonMob>
        </li>
        <li className="button-list-mobile__item">
          <ButtonMob type={amount === 20 ? "primary" : "ghost"} onClick={handleAmountTwenty}>
            20
          </ButtonMob>
        </li>
        <li className="button-list-mobile__item">
          <ButtonMob type={amount === 50 ? "primary" : "ghost"} onClick={handleAmountFifty}>
            50
          </ButtonMob>
        </li>
      </ul>
    </div>
  );
});
