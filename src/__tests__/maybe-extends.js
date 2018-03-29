
// @flow
import Maybe from '../maybe-extends';

describe('Tests for Maybe Monad', () => {
    it('Constructor should pass in value', () => {
        const a = new Maybe(1);

        expect(a.value).toBe(1);
    });

    it('Functor: .map applies function to wrapped value', () => {
        const num = new Maybe(1);

        expect(num.map(val => val + 1).value).toBe(2);

        const str = new Maybe('hello');

        expect(str.map(val => `${val} world`).value).toBe('hello world');

        const none = new Maybe(null);

        expect(none.map(value => value).value).toBeNull();
    });

    it('Pointed Functor: .of creates a Maybe with any value', () => {
        const a = Maybe.of(1);

        expect(a.value).toBe(1);
    });

    it('.get will get nested Maybe value', () => {
        const a = Maybe.of(Maybe.of(1));

        expect(a.get().value).toBe(1);
    });

    it('.flatMap will recursively map and flatten nested Maybe types, and will allow chaining', () => {
        const user = new Maybe({
            firstName: 'Thomas',
            lastName: 'Tallis',
            age: Maybe.of(Maybe.of(Maybe.of(26))),
        });

        const userAge = user.flatMap(usr => usr.age);

        expect(userAge.value).toBe(26);

        const twoTimesAge = userAge.flatMap(age => (typeof age === 'number' ? age * 2 : null));

        expect(twoTimesAge.value).toBe(52);
    });

    it('.bind will apply a normal function to another Maybe', () => {
        const a = Maybe.of(1);

        expect((a.bind((n => n + 1))(Maybe.of(3))).value).toBe(4);
    });
});
