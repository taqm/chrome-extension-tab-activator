type LoadableState<T> =
  | {
      type: 'pending';
      value: Promise<T>;
    }
  | {
      type: 'fulfilled';
      value: T;
    }
  | {
      type: 'rejected';
      value: unknown;
    };

export class Loadable<T> {
  #state: LoadableState<T>;

  constructor(p: Promise<T>) {
    this.#state = {
      type: 'pending',
      value: p
        .then((v) => {
          this.#state = {
            type: 'fulfilled',
            value: v,
          };
          return v;
        })
        .catch((err) => {
          this.#state = {
            type: 'rejected',
            value: err,
          };
          throw err;
        }),
    };
  }

  getOrThrow(): T {
    switch (this.#state.type) {
      case 'pending':
        throw this.#state.value;
      case 'fulfilled':
        return this.#state.value;
      case 'rejected':
        throw this.#state.value;
    }
  }
}
