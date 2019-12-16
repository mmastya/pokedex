import React, { useEffect, useCallback } from "react";
import { observer } from "mobx-react-lite";
import { pokemonStore } from "../../stores/PokemonStore";
import { Input, Select } from "antd";

const { Option } = Select;
const { Search } = Input;

export const PokemonListPage = observer(() => {
  const {
    init,
    count,
    pokemonList,
    next,
    previous,
    nextPage,
    previousPage,
    amount,
    search,
    setSearch,
    setTags,
    tags,
    selectedTags,
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
      <Search
        placeholder="please input Pokemon name"
        onChange={(event): void => setSearch(event.target.value)}
        allowClear={true}
        value={search}
      />
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Please select"
        value={selectedTags}
        onChange={setTags}
      >
        {tags.map((tag) => (
          <Option value={tag} key={tag}>
            {tag}
          </Option>
        ))}
      </Select>
      <button onClick={handleAmountTen}>10</button>
      <button onClick={handleAmountTwenty}>20</button>
      <button onClick={handleAmountFifty}>50</button>
      <ul>
        {pokemonList.map(({ id, name, avatar }) => {
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
