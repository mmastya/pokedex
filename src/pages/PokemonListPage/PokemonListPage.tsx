import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";

export const PokemonListPage = observer(() => {
  const { init, count, results, next, previous, nextPage, previousPage } = pokemonStore;

  const handleNext = useCallback((): void => {
    nextPage();
  }, []);

  const handlePrevious = useCallback((): void => {
    previousPage();
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
      <h1>PokemonListPage</h1>
      <div>count: {count}</div>
      <ul>
        {results.map(({ id, name, avatar, types, stats }) => {
          return (
            <li key={id}>
              <div>Name: {name}</div>
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
