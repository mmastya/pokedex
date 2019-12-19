import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../../stores/PokemonStore";
import { Button } from "antd";
import "./ButtonsDesktop.css";

export const ButtonsDesktop = observer(() => {
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
    <ul className="button-list">
      <li className="button-list__item">
        {previous ? (
          <Button type="primary" onClick={handlePrevious}>
            Previous
          </Button>
        ) : null}
      </li>
      <li className="button-list__item">
        {next ? (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        ) : null}
      </li>
      <li className="button-list__item">
        <Button onClick={handleAmountTen}>10</Button>
      </li>
      <li className="button-list__item">
        <Button onClick={handleAmountTwenty}>20</Button>
      </li>
      <li className="button-list__item">
        <Button onClick={handleAmountFifty}>50</Button>
      </li>
    </ul>
  );
});
