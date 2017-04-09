import * as Lib from '../src/libs/mrp/mrp'
import * as HomePage from './view/home-page/home-page.component'
import * as LogForm from './view/login-form/log-form-component'
import * as FilmPage from './view/film-page/film-page-component'
import * as HomePageMenu from './view/home-page-menu/menu-component'
import * as AddFilm from './view/add-film/add-film-component'

class AppClass{
    constructor(){
        this.init();
    }

    init(){
        this.showHomePage();
    }

    showHomePage(){
        //MRP.showView('home-page-view', {selector:'#app-wrapper'});
        //MRP.showView('home-page-menu-view', {selector: '#menu-wrapper'})
        MRP.showView('login-form-view', {selector: '#app-wrapper'})
    }

}

export default new AppClass();