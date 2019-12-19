import React from "react";
import { pokemonStore } from "../../stores/PokemonStore";
import { observer } from "mobx-react-lite";
import { Select } from "antd";

const { Option } = Select;

export const SelectBox = observer(() => {
  const { setTags, tags, selectedTags } = pokemonStore;

  return (
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
  );
});
