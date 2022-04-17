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

    pizzaItem.setAttribute('data-key', index);
    //inserindo a imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    //preencher o valor da unidade
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    //preencher as informações em pizzaItem
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    //preencher as descrições
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        //console.log(pizzaJson[key]);
        //console.log('Piza clicada:' +key);

        //começando a preencher as informações no modal
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;


        //console.log('clicou na pizza')
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(function(){
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });
    c('.pizza-area').append( pizzaItem )
});


