let cart = [];
let modalQt = 1;
let Modalkey = 0;
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
        modalQt = 1;
        modalkey = key;

        //começando a preencher as informações no modal
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2){
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];

        });

        c('.pizzaInfo--qt').innerHTML = modalQt;

        //console.log('clicou na pizza')
        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(function(){
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });
    c('.pizza-area').append( pizzaItem )
});

// Eventos do Modal

function closeModal(){
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

cs('.pizzaInfo--cancelButton,.pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});

c('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
   if(modalQt > 1){
    modalQt--;
    c('.pizzaInfo--qt').innerHTML = modalQt
   }
});

c('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt
});

cs('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected'); 
    });
});
c('.pizzaInfo--addButton').addEventListener('click', ()=>{
    //Qual o tamanho
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalkey].id+'@'+ size;

    let key = cart.findIndex((item)=>item.identifier == identifier);

    if(key > -1){
        cart[key].qt += modalQt
    }
    else{
    cart.push({
        identifier,
        id:pizzaJson[modalkey].id,
        size,
        qt:modalQt
        });
    }
    closeModal();
});
