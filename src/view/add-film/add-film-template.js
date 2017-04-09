const template = () => {
    return `
    <header class="header">
        <div class="nav-bar">  
            <img src="http://store.edgecast.steamstatic.com/public/shared/images/responsive/header_menu_hamburger.png" alt="">
        </div>
        <h1>Film Online</h1>
        <button id="registration">Registration</button>
    </header> 
    <div class="main">         
      <form class="add-form"> 
        <div class="left-sideAdd">
    
          <div class="imgAdd">
              <div id="dropZone"></div>
          </div>
            
          <div class="producerAdd">
              
            <label>Add Producer: <input class="inp-producer" type="text" placeholder="producer"></label>
            <h2>Producer: <span class="text-producer"></span> </h2>
              
          </div>
          
          <div class="ratingAdd">
            ${function () {
                let star = "https://maxcdn.icons8.com/Share/icon/Messaging//outlined_star1600.png",
                    tempArr = [];
    
                for (let i = 0; i < 10; i++) {
                    tempArr.push(`<img class="rating-starAdd" src="${star}" >`)
                }
                tempArr = tempArr.join('');
                return tempArr;
            }()}
            <p>Raiting: <span class="num-reit"></span></p>    
          </div>
          
        </div>
               
                    
        <div class="right-sideAdd">
          <button class="add-onsaite">Add movie on sait</button>
          <div class="titleAdd">              
            <label>Add name title: <input class="inp-title" type="text" placeholder="Title name"></label>
            <h1>Title: <span class="add-title"></span></h1>              
          </div>
              
          <div class="ganre">
            <select class="add-selection">
              <option class="option-ganre" value="Animation">Animation</option>
              <option class="option-ganre" value="Fantastic">Fantastic</option>
              <option class="option-ganre" value="Action">Action</option>
              <option class="option-ganre" value="Fantasy">Fantasy</option>
              <option class="option-ganre" value="Mystery">Mystery</option>
            </select>
          </div>
              
          <div class="trailerAdd">              
            <input class="inp-trailer" type="text" placeholder="Movie title">
            <button id="addTrailer">Get Trailer</button>
               
            <div id="addModal" class="modalAdd">
              <div class="modal-contentAdd">
                <div class="modal-headerAdd"> 
                  <span class="closeAdd">&times;</span>
                </div>
                <div class="modal-bodyAdd">
                  <iframe class="getTrailerInframe" src=""></iframe>
                </div>
              </div>            
            </div>                  
          </div>
              
          <div class="scrinShotAdd">                    
            <input class="inp-scrin" type="text" placeholder="Add Url Img">
            <button class="addScrin">Add Scrinshot</button>                    
            <div class="collectionSrinAdd">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
              <img src="" alt="">
            </div>    
          </div>
          <div class="shortDiscriptionAdd">
            <textarea class="add-textarea"  rows="10" cols="100"></textarea>
            <button class="add-textarea-button">Add Discription</button>
          </div>
        </div>
      </form>
    </div>            
`
};

export default template