import { observable, action, configure, runInAction } from "mobx";
import { Pokemon } from "../models/Pokemon";
import { get } from "../utils/get";

configure({ enforceActions: "observed" });

export class PokemonStore {
  @observable isLoading: boolean;
  @observable count: number;
  @observable next: string | null;
  @observable previous: string | null;
  @observable results: Pokemon[];
  constructor() {
    this.isLoading = false;
    this.count = 0;
    this.next = null;
    this.previous = null;
    this.results = [];

    this.init = this.init.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
  }

  @action
  async init(): Promise<void> {
    this.isLoading = true;

    const pokemonList = await get("pokemon");
    console.log(pokemonList);

    if (pokemonList) {
      runInAction(() => {
        this.count = pokemonList.count;
        this.next = pokemonList.next;
        this.previous = pokemonList.previous;
      });

      const pokemonsData: any[] = await Promise.all(
        pokemonList.results.map(({ url }) => get(url, true)),
      );
      runInAction(() => {
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
        console.log(this.results);
      });
    }
  }

  @action
  nextPage(): void {
    this.isLoading = true;
    fetch(`${this.next}`)
      .then((response) => response.json())
      .then(
        action(({ count, next, previous, results }) => {
          this.count = count;
          this.next = next;
          this.previous = previous;
          this.results = results;
          this.isLoading = false;
        }),
      );
  }

  @action
  previousPage(): void {
    fetch(`${this.previous}`)
      .then((response) => response.json())
      .then(
        action(({ count, next, previous, results }) => {
          this.count = count;
          this.next = next;
          this.previous = previous;
          this.results = results;
          this.isLoading = false;
        }),
      );
  }
}

export const pokemonStore = new PokemonStore();
