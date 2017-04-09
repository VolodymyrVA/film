class view {
    constructor(name, data) {
        this.name = name;
        Object.assign(this, data);
        this.collectionCallback = [];
        this.elem$;

        this.init();
    }

    init(){
        this.createCallback();
    }

    createCallback() {
        for(let func in this.events){
            let nameFunc = this.events[func],
                callback = this[nameFunc].bind(this);

            this.collectionCallback.push(callback);
        }
    }

    addListeners(){
        let i = 0;
        for(let key in this.events){
            let tempArray = key.split(' '),
                event = tempArray[0],
                selector = tempArray[1],
                callback = this.collectionCallback[i++],
                selectorSetup = document.querySelectorAll(selector);

            if(!null){
                selectorSetup.forEach((elem) => {
                    elem.addEventListener(event, callback, false);
                })
            }
        }
    }

    startRender(){
        this.onInit && this.onInit();
        this.render();
        this.addListeners();
        this.onEndRender && this.onEndRender();
    }


    update(){
        this.elem$.innerHTML = this.html;
        this.addListeners();
    }

    render(){
        let divWrapper = document.createElement('div'),
            parentSelector = document.querySelector(this.selector);

        divWrapper.id = this.name;
        if(!this.html) this.html = this.template();
        divWrapper.innerHTML = this.html;
        this.elem$ = divWrapper;
        parentSelector.appendChild(divWrapper);
    }

}

export default view;