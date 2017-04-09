class dom {
    createElement(itemDescription) {
        let elem = document.createElement(itemDescription.element),
            descriptionMap = {
                classes: (classes) => elem.className = classes,
                content: (content) => elem.innerHTML =content,
                attr: (attrMap) => {
                    for(let attribut in attrMap) {
                        elem.setAttribute(attribut, attrMap[attribut])
                    }
                }
            };

        for(let item in itemDescription){
            if(item != 'element'){
                let funktion = descriptionMap[item];
                funktion(itemDescription[item]);
            }

        }
        return elem;
    }
}
export default dom