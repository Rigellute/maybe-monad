// @flow
class Functor<T> {

    value: T;

    constructor(value: T) {
        this.value = value;
    }
    map<A>(func: (arg: T) => A) {
        return func(this.value);
    }
}

type FunctionType<T> = <A>(arg: T) => A;

class Applicative<T> extends Functor<T> {

    value: T;

    constructor(value: T) {
        super(value);
        this.value = value;
    }

    ap(functor) {
        return functor.map(this.value);
    }
}

class Monad<T> extends Applicative<T> {

    value: T;

    constructor(value: T) {
        super(value);
        this.value = value;
    }

    bind(func: *) {
        return monad => monad.map(func);
    }
}

class Maybe<T> extends Monad<T> {

    constructor(value: T) {
        super(value);
        this.value = value;
    }

    static of(value: T) {
        return new Maybe(value);
    }
}

