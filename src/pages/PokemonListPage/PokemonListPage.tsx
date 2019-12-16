import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";

export const PokemonListPage = observer(() => {
  const { init, count, results, next, previous, nextPage, previousPage, amount } = pokemonStore;

  const handleNext = useCallback((): void => {
    nextPage();
  }, []);

  const handlePrevious = useCallback((): void => {
    previousPage();
  });

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
      <h1>PokemonListPage</h1>
      <div>count: {count}</div>
      <button onClick={handleAmountTen}>10</button>
      <button onClick={handleAmountTwenty}>20</button>
      <button onClick={handleAmountFifty}>50</button>
      <ul>
        {results.map(({ id, name, avatar }) => {
          return (
            <li key={id}>
              <div>
                Name: {name}
                ID: {id}
              </div>
              <div>
                Avatar: <img src={avatar}></img>
              </div>
            </li>
          );
        })}
      </ul>
      {previous ? <button onClick={handlePrevious}>Previous</button> : null}
      {next ? <button onClick={handleNext}>Next</button> : null}
    </div>
  );
});
