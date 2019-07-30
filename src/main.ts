import * as hash from 'object-hash';

export function Cache() {

    const memory = new Map<string, any>();

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const origin: Function = descriptor.value;

        descriptor.value = function () {
            const id = hash({ ...arguments });
            const inMemory = memory.has(id);

            if (inMemory) {
                return memory.get(id);
            }

            const res = origin.apply(this, arguments);
            memory.set(id, res);

            return res;
        };

        return descriptor;
    };
}
