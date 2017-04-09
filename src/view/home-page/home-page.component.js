import template from './home-page.template'
import network from '../../services/network/network'
import localStor from '../../services/local-storage/localStorage'
import styles from './home-page.styles.css'


export default MRP.view('home-page-view', {
    dataSetup : [],
    template: template,


    events: {
        'click #registration': 'onSubmit',
        'click .nav-bar': 'showBar',
        'click .menu-nav-bar': 'hideBar',
        'click .close': 'hideBar',
        'click .item-description': 'showFilmPage'
    },

    onInit(){
       this.getFilmList();
    },

    onEndRender() {

    },

    storeFilmList(filmListJson) {
        this.html = this.template(filmListJson);
        this.viseblGanre();
        return
    },

    getFilmList(){
        let filmListJson = localStor.getStorage('filmSetup');

        if(filmListJson) this.storeFilmList(filmListJson);
        else {
            network.getFilmList()
                .then((filmListJson) => {

                    this.dataSetup = filmListJson;
                    localStor.createStorage('filmSetup', filmListJson)
                    this.html = this.template(filmListJson);
                    this.update();
                    this.viseblGanre();
                })
                .catch((errStr) => {
                    alert(errStr)
                });
        }
    },

    onSubmit(e){
        let element = document.querySelector('#menu-wrapper');
        if(element) {
            element.classList.remove('collapsed');
            element.style.width = 0;
        }
        localStorage.clear();

        MRP.showView('login-form-view', {
            selector: '#app-wrapper',
            animation:{ type: 'hide' }
        });
    },

    showBar(){
        MRP.listView['home-page-menu-view'].showBar();
    },

    hideBar(e){
        let element = document.querySelector('.menu-nav-bar');
        element.classList.add('hidden');
    },

    selection(name){
        let text = name,
            clearWrapper = document.querySelector('.price'),
            tempSetup = [];

        clearWrapper.innerHTML = '';

        this.dataSetup.forEach((elem) =>{

            if(elem.description == text){
                tempSetup.push(elem);
            }
        });
        this.html = this.template(tempSetup);
        this.update();
    },

    showAll(e){
        let clearWrapper = document.querySelector('.price');
        clearWrapper.innerHTML = '';
        this.html = this.template(this.dataSetup);
        this.update();
    },

    showFilmPage(e) {
        let elem = e.currentTarget.getAttribute('name');

        MRP.showView('film-page-view', {
            selector: '#app-wrapper',
            animation:{ type: 'withoutAnimation' },
            extra: elem
        });
        e.stopPropagation();
    },

    viseblGanre() {
        let elem = document.querySelector('.ganre-menu');

        if(elem){
            elem.style.position = '';
            elem.classList.remove('hidden');
        }
    }

},);