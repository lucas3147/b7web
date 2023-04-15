let cart = [];
let qtdPizzasModal = 1;
let modalKey = 0;

const getElement = (el) => document.querySelector(el)
const getElements = (el) => document.querySelectorAll(el)

pizzaJson.map((item, index) => {
    let pizzaItem = getElement('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', item.id);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e)=>{
        e.preventDefault();

        qtdPizzasModal = 1;
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        key--;
        modalKey = key;

        getElement('.pizzaBig img').src = pizzaJson[key].img;
        getElement('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        getElement('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        getElement('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        getElement('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        getElement('.pizzaInfo--size.selected').classList.remove('selected');
        getElements('.pizzaInfo--size').forEach((size, sizeindex) => {
            if (sizeindex == 2) {
                size.classList.add('selected')
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeindex];

        });
        getElement('.pizzaInfo--qt').innerHTML = qtdPizzasModal;

        getElement('.pizzaWindowArea').style.display = 'flex';
        getElement('.pizzaWindowArea').style.opacity = '0';
        setTimeout(()=>{
            getElement('.pizzaWindowArea').style.opacity = '1';
        }, 200);
    });

    getElement('.pizza-area').append( pizzaItem );
});

function closeModal() {
    getElement('.pizzaWindowArea').style.opacity = '0';
    setTimeout(()=>{
        getElement('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

function updateCart() {
    getElement('.menu-openner span').innerHTML = cart.length;

    if (cart.length > 0) {
        getElement('aside').classList.add('show');
        getElement('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {

            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].quantidade;

            let cartItem = getElement('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;    
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].quantidade;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if (cart[i].quantidade > 1){
                    cart[i].quantidade--;
                }else{
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].quantidade++;
                updateCart();
            })

            getElement('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        getElement('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        getElement('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        getElement('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    }else{
        getElement('aside').classList.remove('show');
        getElement('aside').style.left = '100vw';
    }
}

getElements('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
});
getElement('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    qtdPizzasModal = qtdPizzasModal <= 1 ? qtdPizzasModal : qtdPizzasModal - 1;
    getElement('.pizzaInfo--qt').innerHTML = qtdPizzasModal;
})
getElement('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    qtdPizzasModal++;
    getElement('.pizzaInfo--qt').innerHTML = qtdPizzasModal;
})
getElements('.pizzaInfo--size').forEach((size, sizeindex) => {
    size.addEventListener('click', (e) => {
        getElement('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});
getElement('.pizzaInfo--addButton').addEventListener('click', () => {
        let size = parseInt(getElement('.pizzaInfo--size.selected').getAttribute('data-key'));

        let identifier = pizzaJson[modalKey].id + '@' + size;

        let key = cart.findIndex((item) => item.identifier == identifier);

        if (key > -1) {
            cart[key].quantidade += qtdPizzasModal;
        }else {
            cart.push({
                identifier,
                id: pizzaJson[modalKey].id,
                size,
                quantidade: qtdPizzasModal 
            });
        }

        updateCart();
        closeModal();
});
getElement('.menu-openner').addEventListener('click', () => {
    if (cart.length > 0) {
        getElement('aside').style.left = '0';
    }
});
getElement('.menu-closer').addEventListener('click', () => {
    getElement('aside').style.left = '100vw';
})
