class animation {
    constructor() {
        this.stepOut = 33;
    }

    startAnimation(prevElem$, setup) {
        let typeAnim = setup.animation.type,
            duration = setup.animation.duration;

        this[typeAnim](prevElem$, duration);
    }

    show() {

    }

    hide(selector, duration = 200) {
        let kadrs = duration / this.stepOut,
            step = 1 / kadrs,
            opacity = 1;

        let id = setInterval(() => {
            opacity -= step;
            selector.style.opacity = opacity;

            if (opacity <= 0) {
                clearInterval(id);
                MRP.removeElem$(selector)
            }
        }, this.stepOut);
    }

    withoutAnimation(selector) {
        MRP.removeElem$(selector)
    }

}

export default animation
