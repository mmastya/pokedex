import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../../stores/PokemonStore";
import { Button } from "antd";
import "./ButtonsDesktop.css";

export const ButtonsDesktop = observer(() => {
  const { init, next, previous, nextPage, previousPage, amount, isLoading } = pokemonStore;

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
          <Button type="primary" onClick={handlePrevious} loading={isLoading}>
            Previous
          </Button>
        ) : null}
      </li>
      <li className="button-list__item">
        {next ? (
          <Button type="primary" onClick={handleNext} loading={isLoading}>
            Next
          </Button>
        ) : null}
      </li>
      <li className="button-list__item">
        <Button
          type={amount === 10 ? "primary" : "default"}
          onClick={handleAmountTen}
          disabled={isLoading}
        >
          10
        </Button>
      </li>
      <li className="button-list__item">
        <Button
          type={amount === 20 ? "primary" : "default"}
          onClick={handleAmountTwenty}
          disabled={isLoading}
        >
          20
        </Button>
      </li>
      <li className="button-list__item">
        <Button
          type={amount === 50 ? "primary" : "default"}
          onClick={handleAmountFifty}
          disabled={isLoading}
        >
          50
        </Button>
      </li>
    </ul>
  );
});
