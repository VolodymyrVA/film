import template from './menu-template'
import localStor from '../../services/local-storage/localStorage'
import styles from './menu-styless.css'

export default MRP.view('home-page-menu-view', {
    template: template,


    events: {
        'click .home-menu': 'homePage',
        'click .selection': 'selection',
        'click .all': 'showAll',
        'click .favorits-item': 'showFilmPage',
        'click .new-filmMenu': 'showAddComponent'
    },


    onInit(){
        this.getStore();
    },

    onEndRender() {

    },

    showBar(){
        let element = document.querySelector('#menu-wrapper');
        if (element.classList.contains('collapsed')) {
            element.classList.remove('collapsed');
            element.style.width = 0;
        } else {
            element.classList.add('collapsed');
            element.style.width = '15%';
        }
    },

    getStore(){
        let store = localStor.getStorage('id');
        this.html = this.template(store);
    },

    selection(e) {
        let text = e.currentTarget.innerHTML;
        MRP.listView['home-page-view'].selection(text);
    },

    showAll() {
        MRP.listView['home-page-view'].showAll();
    },

    homePage(e) {
        this.getStore();
        this.update();

        MRP.showView('home-page-view', {
            selector: '#app-wrapper',
            animation: {type: 'withoutAnimation'}
        });

    },

    showFilmPage(e) {
        let text = e.currentTarget.innerHTML,
            store = localStor.getStorage('id'),
            page = store.find((film) => {
                return film.name == text;
            });

        page = page.id;

        MRP.showView('film-page-view', {
            selector: '#app-wrapper',
            animation: {type: 'withoutAnimation'},
            extra: page
        });

        e.stopPropagation();
    },

    showAddComponent() {
        MRP.showView('add-film-view', {
            selector: '#app-wrapper'
        });
    }


},);