
/** 
 * mark setter change tigger canvas refresh & mark layer as dirty.
 */
export default function changed() {

    return function (target, name, descriptor) {

        if (typeof descriptor.set !== 'function') throw new Error(`Can't decorate ${name}, Only used for setter~`);

        const { set } = descriptor;
        descriptor.set = function () {
            if (this[cacheKey] && !this[dirtyCheckKey]) return this[cacheKey];
            this[dirtyCheckKey] = false;
            return this[cacheKey] = set.apply(this, arguments);
        }

        return descriptor;
    }
}