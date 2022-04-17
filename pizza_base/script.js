//console.log(pizzaJson)

//const c = (el)=>document.querySelector(el);
const cs = (el)=> document.querySelectorAll(el);
const c = function(el){
    return document.querySelector(el)
    /*somente um variavel para substituir o querrySelector
    para não ficar precisando digitar inteiro*/
}


pizzaJson.map(function(item, index){
    //console.log(item)
    let pizzaItem = c('.models .pizza-item').cloneNode(true)

    //inserindo a imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    //preencher o valor da unidade
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    //preencher as informações em pizzaItem
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    //preencher as descrições
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    
    c('.pizza-area').append( pizzaItem )
})