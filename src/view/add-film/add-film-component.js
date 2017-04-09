import template from './add-film-template'
import styles from './add-film-style.css'
import network from '../../services/network/network'
import localStor from '../../services/local-storage/localStorage'

export default MRP.view('add-film-view', {
    trailerInpValue: '',
    producerInpValue: '',
    titleInpValue: '',
    tempScrinInpValue: '',
    sumStar: 0,
    ganreSelectValue: '',
    scrinField: 0,
    textareaValue: '',
    imageUrl: '',
    arrayScrin: [],
    dataSetup: [],

    template: template,

    events: {
        'click #registration': 'onSubmit',
        'click .nav-bar': 'showBar',
        'click .menu-nav-bar': 'hideBar',
        'click #addTrailer': 'showModal',
        'click .closeAdd': 'closeModal',
        'click #myModal': 'closeModal',
        'click .rating-starAdd': 'checkStar',
        'keyup .add-form': 'collectValue',
        'click .addScrin': 'addScrin',
        'click .add-textarea-button': 'quantityTextarea',
        'dragover #dropZone': 'dnbDragover',
        'drop #dropZone': 'dnb',
        'click .add-onsaite': 'createStore'
    },

    onInit(){

    },

    onEndRender() {
        this.hideMenuGanre();
        this.getFilmList();
    },

    getFilmList(){

        network.getFilmList()
            .then((filmListJson) => {

                this.dataSetup = filmListJson;
            })
            .catch((errStr) => {
                alert(errStr)
            });
    },

    onSubmit() {
        MRP.listView['home-page-view'].onSubmit();
    },

    showBar(){
        MRP.listView['home-page-menu-view'].showBar();
    },

    hideBar(e){
        let element = document.querySelector('.menu-nav-bar');
        element.classList.add('hidden');
    },

    showModal(e) {
        e.preventDefault();
        let modal = document.getElementById('addModal'),
            inframe = document.querySelector('.getTrailerInframe'),
            srcInframe;

        if (this.trailerInpValu) {
            srcInframe = `https://www.youtube.com/results?search_query=${this.trailerInpValu}`;
            inframe.setAttribute('src', srcInframe);
            modal.style.display = "block";
        }
        else {
            srcInframe = ``;
            modal.style.display = "none";
        }

        let iframe = document.querySelector('iframe');

        iframe.onload = () => {
            let frame$ = iframe.contentWindow.document;

            frame$
                .querySelector('.item-section')
                .addEventListener('click', (e)=> {
                    e.stopPropagation();
                    e.preventDefault();

                    let src =  e.target.getAttribute('src').split('/').slice(0,5).join('/');
                    console.log(src)
                })

        }

    },

    closeModal(e) {
        e.preventDefault();
        let modal = document.getElementById('addModal'),
            inframe = document.querySelector('.getTrailerInframe');

        inframe.setAttribute('src', `https://www.youtube.com/`);
        modal.style.display = "none";
    },

    checkStar(e) {
        e.preventDefault();
        let getStar = e.currentTarget,
            div = document.querySelector('.ratingAdd').children,
            src = getStar.getAttribute('src'),
            j = 0;

        if (src == "https://maxcdn.icons8.com/Share/icon/Messaging//outlined_star1600.png") getStar.setAttribute('src', "https://www.kioskoymas.com/img/star_icon.png");
        else getStar.setAttribute('src', "https://maxcdn.icons8.com/Share/icon/Messaging//outlined_star1600.png");

        for (let i = 0; i < div.length; i++) {
            let imgSrc = div[i].getAttribute('src');
            if (imgSrc != "https://maxcdn.icons8.com/Share/icon/Messaging//outlined_star1600.png") this.sumStar = j++;
        }
        this.showRating();
    },

    collectValue(e) {
        e.preventDefault();
        let inputTrailer = document.querySelector('.inp-trailer'),
            inputProducer = document.querySelector('.inp-producer'),
            inputTitle = document.querySelector('.inp-title'),
            inputScrin = document.querySelector('.inp-scrin');

        if (e.currentTarget[4] == inputTrailer) this.trailerInpValu = inputTrailer.value;
        if (e.currentTarget[0] == inputProducer) this.producerInpValue = inputProducer.value;
        if (e.currentTarget[2] == inputTitle) this.titleInpValue = inputTitle.value;
        if (e.currentTarget[6] == inputScrin) this.tempScrinInpValue = inputScrin.value;

        this.showProducer(e);
        this.showTitle(e);
    },

    addScrin(e) {
        e.preventDefault();
        let div = document.querySelector('.collectionSrinAdd').children,
            inputScrin = document.querySelector('.inp-scrin');

        if(this.tempScrinInpValue != ''){
            if(this.scrinField == 4){
                this.scrinField = 0;
            }
            else {
                    for(let i = 0; i < div.length; i++){
                        if(div[i].getAttribute('src') == this.tempScrinInpValue){
                            return
                        }

                    }
                div[this.scrinField].setAttribute('src', this.tempScrinInpValue);
                this.scrinField += 1;
                this.tempScrinInpValue = '';
                inputScrin.value = '';
            }
        }


    },

    createScrinArry(e) {
        let arrScrin = document.querySelector('.collectionSrinAdd').children,
            eachFor = [].forEach;
        eachFor.call(arrScrin, (scrin) => {
            this.arrayScrin.push(scrin.getAttribute('src'));
        });
    },

    showRating(e){
        let num = document.querySelector('.num-reit');

        num.innerHTML = this.sumStar;
    },

    showProducer(e) {
        e.preventDefault();
        let text = document.querySelector('.text-producer');

        text.innerHTML = `${this.producerInpValue}`;
    },

    showTitle(e) {
        e.preventDefault();
        let text = document.querySelector('.add-title');

        text.innerHTML = `${this.titleInpValue}`;
    },

    quantitySelection() {
        let sel = document.querySelector(".add-selection"),
            txt = sel.options[sel.selectedIndex].text;

        this.ganreSelectValue = txt;
    },

    quantityTextarea(e) {
      e.preventDefault();
      e.stopPropagation();

    this.textareaValue = document.querySelector('.add-textarea').value;
    },

    hideMenuGanre() {
        MRP.listView['film-page-view'].hideMenuGanre();
    },

    dnbDragover(e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
    },

    dnb(e){

        let dropZone = document.getElementById('dropZone');

            e.stopPropagation();
            e.preventDefault();
            let files = e.dataTransfer.files;

            for (let i=0, file; file=files[i]; i++) {

                if (file.type.match(/image.*/)) {
                    let reader = new FileReader();

                    reader.onload = function(e2) {
                        let img = document.createElement('img');
                        img.className = 'imgDnb';
                        img.src= e2.target.result;
                        dropZone.appendChild(img);
                    };

                    reader.readAsDataURL(file);
                }
            }
    },

    createStore(e){
        e.stopPropagation();
        e.preventDefault();
        this.dataSetup = localStor.getStorage('filmSetup');
        this.createScrinArry();
        this.quantitySelection();

        let img = document.querySelector('.imgDnb'),
            idItem = this.dataSetup[this.dataSetup.length -1].id + 1;

        if(img) this.imageUrl = img.getAttribute('src');

        let store = {
            name: this.titleInpValue,
            imageUrl: this.imageUrl,
            description: this.ganreSelectValue,
            fullDescription: this.textareaValue,
            additionalImages: this.arrayScrin,
            trailer: this.trailerInpValu,
            rating: this.sumStar,
            ratingStar: [
                "https://www.kioskoymas.com/img/star_icon.png",
                "https://maxcdn.icons8.com/Share/icon/Messaging//outlined_star1600.png"
            ],
            comments: [{
                author: this.producerInpValue
            }],
            id: idItem


        };
        this.dataSetup.push(store);
        localStor.createStorage('filmSetup', this.dataSetup);

        MRP.showView('home-page-view', {
            selector: '#app-wrapper',
            animation:{ type: 'hide' }
        });
        store = {};
    },

})