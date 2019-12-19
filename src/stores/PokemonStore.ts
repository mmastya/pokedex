import { observable, action, configure, runInAction, computed } from "mobx";
import { Pokemon } from "../models/Pokemon";
import { get } from "../utils/get";

configure({ enforceActions: "observed" });

export class PokemonStore {
  @observable isLoading: boolean;
  @observable count: number;
  @observable results: Pokemon[];
  @observable amount: number;
  @observable offset: number;
  @observable search: string;
  @observable selectedTags: string[];

  constructor() {
    this.isLoading = false;
    this.count = 0;
    this.results = [];
    this.amount = 10;
    this.offset = 0;
    this.search = "";
    this.selectedTags = [];

    this.init = this.init.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.setSearch = this.setSearch.bind(this);
    this.setTags = this.setTags.bind(this);
    this.setAmount = this.setAmount.bind(this);
  }

  @computed get previous(): string {
    const offset = this.offset - this.amount;
    console.log(offset);
    console.log(this.offset);
    console.log(this.amount);

    if (offset >= 0) {
      return `pokemon/?offset=${offset}&limit=${this.amount}`;
    }

    return `pokemon/?offset=0&limit=${this.amount}`;
  }

  @computed get next(): string {
    if (this.offset + this.amount < this.count) {
      return `pokemon/?offset=${this.offset}&limit=${this.amount}`;
    }

    if (this.offset >= this.count) {
      return `pokemon/?offset=${this.count - this.amount}&limit=${this.count}`;
    }

    return `pokemon/?offset=${this.offset}&limit=${this.count}`;
  }

  @computed get pokemonList(): Pokemon[] {
    return this.results.filter((pokemon: Pokemon) => {
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
  async load(path: string): Promise<void> {
    this.isLoading = true;

    const pokemonList = await get(path);
    console.log(pokemonList);

    if (pokemonList) {
      const pokemonsData: any[] = await Promise.all(
        pokemonList.results.map(({ url }) => get(url, true)),
      );

      runInAction(() => {
        this.count = pokemonList.count;
        this.results = pokemonsData.map(({ id, name, sprites, types, stats }) => {
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
        });
        this.isLoading = false;

        console.log(this.results);
      });
    }
  }

  @action
  async nextPage(): Promise<void> {
    this.offset = this.offset + this.amount;

    if (this.offset >= this.count) {
      this.offset = this.count - this.amount;
    }
    await this.load(this.next);
  }

  @action
  async previousPage(): Promise<void> {
    await this.load(this.previous);

    runInAction(() => {
      this.offset = this.offset - this.amount;

      if (this.offset < 0) {
        this.offset = 0;
      }
    });
  }

  @action
  async setAmount(amount: number): Promise<void> {
    this.amount = amount;

    await this.load(`pokemon/?offset=${this.offset}&limit=${this.amount}`);
  }

  @action
  async init(amount = 10): Promise<void> {
    this.offset = 0;
    this.amount = amount;
    await this.load(`pokemon/?offset=${this.offset}&limit=${this.amount}`);
  }
}

export const pokemonStore = new PokemonStore();
