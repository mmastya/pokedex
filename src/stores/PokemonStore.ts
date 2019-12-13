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

    const result = await get("pokemon");

    if (result) {
      runInAction(() => {
        this.count = result.count;
        this.next = result.next;
        this.previous = result.previous;
        this.results = result.results;
        this.isLoading = false;
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
