import filmTemplate from './film-page-template'
import network from '../../services/network/network'
import localStor from '../../services/local-storage/localStorage'
import styles from './film-page-styless.css'

export default MRP.view('film-page-view', {
    template: filmTemplate,

    events: {
        'click #registration': 'onSubmit',
        'click .nav-bar': 'showBar',
        'click .full-discription': 'showDiscribe',
        'click .favorits': 'createFavoritsStore'
    },

    dataSetup : [],

    onEndRender(){
        this.initFavoritStore();
        this.hideMenuGanre();
    },

    storeFilmList(filmPage) {
        this.html = this.template(filmPage[this.extra]);
        this.dataSetup = filmPage;
    },

    onInit(){
        let self = this,
            filmPage = localStor.getStorage('filmSetup');
        console.log(filmPage)
        if(filmPage) this.storeFilmList(filmPage);
        else {
            network.getFilmList()
                .then((filmPage) => {
                    self.dataSetup = filmPage;

                    this.html = this.template(filmPage[this.extra]);
                    this.update();
                    this.initFavoritStore();
                    this.hideMenuGanre();
                })
                .catch((errStr) => {
                    console.log(errStr)
                })

        }
    },

    onSubmit() {
        MRP.listView['home-page-view'].onSubmit();
    },

    back(e){

        MRP.showView('home-page-view', {
            selector: '#app-wrapper'
        })
    },

    showBar(){
        MRP.listView['home-page-menu-view'].showBar();
    },

    showDiscribe(e) {
      let elem = document.querySelector('.full-discription');

      if(elem.style.height == '20px'){
          elem.style.height =  "150px";
          elem.style.transition =  "height 0.6s";
      }else {
          elem.style.height =  "20px";
          elem.style.transition =  "height 0.6s";
      }
    },

    createFavoritsStore(e) {
        let elem$ = e.currentTarget;

        if(elem$.classList.contains('favorits-check')){
            elem$.classList.remove('favorits-check');
            this.removeFavirites();
        }else{
            elem$.classList.add('favorits-check');
            this.addFavorites();
        }
        MRP.listView['home-page-menu-view'].getStore();
        MRP.listView['home-page-menu-view'].update();
        this.hideMenuGanre();
    },

    addFavorites(){
        let store = localStor.getStorage('id') || [],
            elem = document.querySelector('.nameFilm'),
            nameFilm = elem.innerHTML;

        store.push({id: this.extra, name: nameFilm});
        localStor.createStorage('id', store)
    },

    removeFavirites(){
        let store = localStor.getStorage('id') || [];

        store = store.filter((film) => {
            return film.id !== this.extra;
        });
        localStor.createStorage('id', store);
    },

    initFavoritStore(){
        let store = localStor.getStorage('id'),
            favorits = document.querySelector('.favorits');

        if(store){
            store.forEach((e) =>{
                if(e.id == this.extra){
                    favorits.classList.add('favorits-check');
                }
            })
        }
    },

    hideMenuGanre() {
        let elem = document.querySelector('.ganre-menu');

        elem.style.position = 'absolute';
        elem.classList.add('hidden')
    }

},);