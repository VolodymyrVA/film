let template = (store) => {
    return `
        <div class="menu">
            <div class="home-menu">
                <img src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRd_H8VlacM-rSvyqi2k-xmPJwzlDG9NL4ZB-idReAjjrkZA6T_5Q" alt="">
            </div>        
            <div class="ganre-menu">
                <h2>Ganre</h2>
                <ul>
                    <li class="selection" >Animation</li>
                    <li class="selection" >Fantastic</li>
                    <li class="selection" >Action</li>
                    <li class="selection" >Fantasy</li>
                    <li class="selection" >Mystery</li>
                    <li class="all" >All</li>
                </ul>
            </div>
            <div class="favorits-menu">
                <h2>Favorits</h2>
                <ul>
                    ${function (store) {
                        if(!store) return '';
                        return store.map((name) => {
                            return `<li class="favorits-item">${name.name}</li>`
                        }).join('')
                    }(store)}
                </ul>
            </div>
            <div class="add-films">
                <h2>Add film</h2>
                <ul>
                    <li class="new-filmMenu">New Film</li>
                </ul>
            </div>
        </div>
    `
};

export default template