import { Cache } from '../main';

class TestClass {

    testWithOneIntegerCallCount: number = 0;
    testWithNoArgsCallCount: number = 0;
    testWithTwoObjectsCallCount: number = 0;

    @Cache()
    testWithOneInteger(count: number) {
        this.testWithOneIntegerCallCount++;
    }

    @Cache()
    testWithNoArgs() {
        this.testWithNoArgsCallCount++;
    }

    @Cache()
    testWithTwoObjects(obj1: Object, obj2: Object) {
        this.testWithTwoObjectsCallCount++;
    }
}

test('Cache - 1 integer argument', () => {
    const obj = new TestClass();

    obj.testWithOneInteger(10000);
    obj.testWithOneInteger(10000);

    expect(obj.testWithOneIntegerCallCount).toBe(1);
});

test('Cache - 0 arguments', () => {
    const obj = new TestClass();

    obj.testWithNoArgs();
    obj.testWithNoArgs();

    expect(obj.testWithNoArgsCallCount).toBe(1);
});

test('Cache - 2 object arguments', () => {
    const obj = new TestClass();

    obj.testWithTwoObjects({ x: 1 }, { x: 2 });
    obj.testWithTwoObjects({ x: 1 }, { x: 2 });
    obj.testWithTwoObjects({ x: 1 }, { x: 2 });

    expect(obj.testWithTwoObjectsCallCount).toBe(1);
});
