import { observable, action, configure, runInAction, computed } from "mobx";
import { Pokemon } from "../models/Pokemon";
import { get } from "../utils/get";

configure({ enforceActions: "observed" });

const cache = new Map();
export class PokemonStore {
  @observable isLoading: boolean;
  @observable results: Pokemon[];
  @observable search: string;
  @observable selectedTags: string[];

  @observable private count: number;

  constructor() {
    this.isLoading = false;
    this.count = 0;
    this.results = [];
    this.search = "";
    this.selectedTags = [];

    this.fetchPokemons = this.fetchPokemons.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setTags = this.setTags.bind(this);
  }

  @computed get pokemonCount(): number {
    if (this.search !== "" || this.selectedTags.length > 0) {
      return this.pokemonList.length;
    }

    return this.count;
  }

  @computed get pokemonList(): Pokemon[] {
    let pokemons: Pokemon[] = this.results;

    if (this.search !== "" || this.selectedTags.length > 0) {
      pokemons = Array.from(cache.values()).map(this.pokemonParse);
    }

    return pokemons.filter((pokemon: Pokemon) => {
      const indexOfBySearch = pokemon.name.indexOf(this.search) !== -1;

      if (this.selectedTags.length > 0) {
        const findBySelectedTags = pokemon.types.find((type: string) =>
          this.selectedTags.includes(type),
        );

        return indexOfBySearch && findBySelectedTags;
      }

      return indexOfBySearch;
    });
  }

  @computed get tags(): string[] {
    const types: Set<string> = new Set();

    this.results.forEach((pokemon: Pokemon) => {
      pokemon.types.forEach((type: string) => {
        types.add(type);
      });
    });

    return Array.from(types);
  }

  @action
  setSearch(search: string): void {
    this.search = search;
  }

  @action
  setTags(selectedTags: string[]): void {
    this.selectedTags = selectedTags;
  }

  @action
  async fetchPokemons(pageNumber = 1, pageSize = 10): Promise<void> {
    this.isLoading = true;

    const pokemonList = await get(
      `pokemon/?offset=${(pageNumber - 1) * pageSize}&limit=${pageSize}`,
    );

    if (pokemonList) {
      const originPokemons: any[] = await Promise.all(
        pokemonList.results.map(async ({ url }) => {
          let originPokemon = cache.get(url);

          if (!originPokemon) {
            originPokemon = await get(url, true);

            cache.set(url, originPokemon);
          }

          return originPokemon;
        }),
      );

      runInAction(() => {
        this.count = pokemonList.count;
        this.results = originPokemons.map(this.pokemonParse);
        this.isLoading = false;

        console.log(this.results);
      });
    }
  }

  private pokemonParse({ id, name, sprites, types, stats }): Pokemon {
    return {
      id,
      name,
      avatar: sprites.front_default,
      types: types.map(({ type }) => type.name),
      stats: stats.map(({ base_stat, effort, stat }) => ({
        base_stat,
        effort,
        name: stat.name,
      })),
    };
  }
}

export const pokemonStore = new PokemonStore();
