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

    map<A, B>(func: (value: T) => B): Maybe<B | null> {
        if (this.isNothing()) {
            return Maybe.of(null);
        }

        return Maybe.of(func(this.value));
    }

    flatten(): Maybe<T> {
        if (this.value instanceof Maybe) {
            return this.value;
        }

        return this;
    }

    // Should this be recursive?
    flatMap<A, B>(func: (value: T) => B): Maybe<B | null> {
        return this.map(func).flatten();
    }

    orElse(defaultProp: T): Maybe<T> {
        if (this.isNothing()) {
            return Maybe.of(defaultProp);
        }

        return this;
    }

    ap(maybe: Maybe<T>): Maybe<?T> {
        if (typeof this.value === 'function') {
            return maybe.map(this.value);
        }

        return Maybe.of(null);
    }
}

export default Maybe;
