import React from "react";
import { pokemonStore } from "../../stores/PokemonStore";
import { Input } from "antd";
import { observer } from "mobx-react-lite";

const { Search } = Input;

export const SearchBox = observer(() => {
  const { search, setSearch, isLoading } = pokemonStore;

  return (
    <Search
      placeholder="please input Pokemon name"
      onChange={(event): void => setSearch(event.target.value)}
      allowClear={true}
      value={search}
      disabled={isLoading}
    />
  );
});
