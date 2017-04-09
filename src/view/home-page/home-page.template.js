const template = (list, users) => {
    return `
        <header class="header">
            <div class="nav-bar">  
                <img src="http://store.edgecast.steamstatic.com/public/shared/images/responsive/header_menu_hamburger.png" alt="">
            </div>
            <h1>Film Online</h1>
            <button id="registration">Registration</button>
        </header>
        <div class="main">
            <div class="price">
                ${function (list) {
                    if(!list) return '';

                    return list.map((item, index) => {
                            return `
                                <div class="main-item">
                                    <img src="${item.imageUrl}">
                                    <div class="item-description" name="${index+1}">
                                        <ul><li>${item.description}</li>
                                            <li>${item.name}</li>
                                            <li>rating: ${item.rating}</li>
                                            <li>id: ${item.id}</li>
                                        </ul>
                                    </div>
                                </div>`;
                        }).join('');
                    }(list)}
            </div>
        </div>
    `;
};

export default template;