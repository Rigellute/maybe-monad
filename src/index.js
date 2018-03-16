// @flow

class Maybe<T> {
    value: T;

    constructor(value: T) {
        this.value = value;
    }

    static of(value: T): Maybe<T> {
        return new Maybe(value);
    }

    isNothing(): boolean {
        if (this.value === null || this.value === undefined) {
            return true;
        }

        return false;
    }

    map<A>(func: (value: T) => A): Maybe<A | null> {
        if (this.isNothing()) {
            return Maybe.of(null);
        }

        return Maybe.of(func(this.value));
    }

    get(): Maybe<T> {
        if (this.value instanceof Maybe) {
            return this.value;
        }

        return this;
    }

    // Unwrap nested maybe's recursively
    flatMap<A>(func: (value: T) => A): Maybe<A | null> {
        const innerFlatMapR = (fn, maybe) => {
            if (!maybe) {
                return innerFlatMapR(fn, this.map(fn));
            }

            if (!(maybe.value instanceof Maybe)) {
                return maybe.get();
            }

            return innerFlatMapR(fn, maybe.value);
        };

        return innerFlatMapR(func);
    }

    orElse(defaultProp: T): Maybe<T> {
        if (this.isNothing()) {
            return Maybe.of(defaultProp);
        }

        return this;
    }

    // eslint-disable-next-line class-methods-use-this
    bind<A>(func: (value: T) => A) {
        return (maybe: Maybe<T>) => maybe.map(func);
    }

    ap(maybe: Maybe<T>): Maybe<?T> {
        if (typeof this.value === 'function') {
            return maybe.map(this.value);
        }

        return Maybe.of(null);
    }
}

export default Maybe;
