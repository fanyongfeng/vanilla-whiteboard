const installCtor = {

}

export function createItem(type, data) { // attach to nebula!
    let ctor = installCtor[type];
    if(!ctor) throw new Error(`Can't find specified graphic '${type}'!`);

    return new ctor(data);
}

export function registerShape(type, ctor) {
    if(installCtor[type]) throw new Error(`Shape '${type}' already exist!`);

    ctor.type = type;
    installCtor[type] = ctor;
}

export default installCtor;

