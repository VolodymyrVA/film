const template = (item) => {

    if(item){
        return `
        <header class="header">
            <div class="nav-bar">  
                <img src="http://store.edgecast.steamstatic.com/public/shared/images/responsive/header_menu_hamburger.png" alt="">
            </div>
            <h1>Film Online</h1>
            <button id="registration">Registration</button>
        </header>
        <div class="main">
            <div class="film-page">   
                      <div class="left-side">
                            <div class="img">
                                <img src="${item.imageUrl}">
                            </div>                           
                            <div class="rating">
                                <p>Rating:  ${item.rating}</p>
                            </div>
                            <div class="star">
                                ${function (starArr, rating) {
                                    let tempArr = [],
                                        star = Math.floor(rating);                                    
                                    
                                    for(let i = 0; i < 10; i++) {
                                        if(i < star) tempArr.push(`<img src="${starArr[0]}">`);                                            
                                        else tempArr.push(`<img src="${starArr[1]}">`);
                                    }
                                    return tempArr.join('');
                                    }(item.ratingStar, item.rating)}
                            </div>
                            <div class="coments">
                                ${function (item) {
                                    return item.map((coments) => {
                                        return `
                                            <h5>Producer: ${coments.author}</h5>
                                        `
                                    }).join('')
                                }(item.comments)}
                            </div>
                      </div>
                      
                      
                            
                      <div class="right-side">
                            <button class="favorits">Favorits</button>
                            <div class="name">
                                <h1 class="nameFilm">${item.name}</h1>
                            </div>
                            <div class="video">
                                <p>Trailer</p>
                                <iframe width="560" height="315" src="${item.trailer}" frameborder="0" allowfullscreen></iframe>
                            </div>
                            <div class="scrinshot">
                                <p>Scrinshot:</p> 
                                ${function (item) {
                                    return item.map((scrin) => {
                                        return `<img src="${scrin}">`
                                    }).join('')
                                }(item.additionalImages)}
                                
                            </div>
                            <div class="discription">
                                <h2>Genre: <p>${item.description}</p></h2>
                            </div>
                            <div class="wrapper-full">
                                <div class="full-discription">
                                    <p>Full discription: <span>&#8595</span></p>
                                    <p>
                                        ${item.fullDescription}
                                    </p>
                                </div>
                            </div>                                                        
                      </div>                                                         
            </div>
        </div>
    `;
    }

};

export default template;