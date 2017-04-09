import loginForm from './log-form-template'
import localStore from '../../services/local-storage/localStorage'
import styles from './log-form-styless.css'

export default MRP.view('login-form-view', {
    template: loginForm,

    events: {
        'click .submit-button': 'onSubmit'
    },

    onEndRender(){
        this.checkLog()
    },

    onInit(){

    },

    onSubmit(e){
        e.preventDefault();
        let valueStorage = this.collectFormValue(),
            func = JSON.stringify();

        localStore.createStorage('user', valueStorage);

        MRP.showView('home-page-menu-view', {selector: '#menu-wrapper'});

        MRP.showView('home-page-view', {
            selector: '#app-wrapper',
            animation:{ type: 'hide' }
        });


    },

    collectFormValue(){
        let form = document.querySelector('.log-form'),
            input = form.querySelectorAll('input'),
            tempObject = {};

        input.forEach((input, index) => {
            tempObject[input.name] = input.value;
        });
        return tempObject;
    },

    checkLog() {
        let store = localStore.getStorage('user');
        if(store) {
            MRP.showView('home-page-menu-view', {selector: '#menu-wrapper'});

            MRP.showView('home-page-view', {
                selector: '#app-wrapper'
            });
        }
    }

},);