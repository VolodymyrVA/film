import View from './view'
import Animation from './animation'
import DOM from './dom'

class MRP {
    constructor() {
        this.listView = {};
        this.animation = new Animation();
        this.dom = new DOM();
        console.log(this.listView)
    }

    view(name, data) {
        let newView = new View(name, data);
        this.listView[name] = newView;
    }

    showView(viewName, setup) {
        let elem$ = document.querySelector(setup.selector),
            wrappView$ = elem$.firstChild ,
            view = this.listView[viewName];

        if (setup.animation) this.animation.startAnimation(wrappView$, setup);
        else this.clearElem$(elem$);
        Object.assign(view, setup);
        view.startRender();
    }

    destroyer(viewName) {
        let view = this.listView[viewName];

        document.querySelector(view.selector)
            .innerHTML = '';

        this.listView[viewName] = null;
        delete this.listView[viewName];
    }

    removeElem$(elem$) {
        elem$.remove();
    }

    clearElem$(elem$) {
        elem$.innerHTML = '';
    }
}

window.MRP = new MRP();

