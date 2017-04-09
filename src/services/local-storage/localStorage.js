class LocalStor {
    constructor(){

    }

    createStorage(storageKey, data){
        let valueStorage = JSON.stringify(data);

        localStorage.setItem(storageKey, valueStorage);
    }

    getStorage(key) {
        let itemStorage = localStorage.getItem(key);

        itemStorage = JSON.parse(itemStorage);
        return itemStorage;
    }
}

let localStor = new LocalStor();

export default localStor