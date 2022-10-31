/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app';

const appNode = document.querySelector('#app');

//internacionalizacion Intl
//1.- formato a fechas
//2.- format monedas

const formatPrice = (price) => {
   const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'USD',
    }).format(price);
    
    return newPrice
}

//web api
//conectarnos al server
window
    .fetch(`${baseUrl}/api/avo`)
//procesar la rta, y convertirla en JSON
    .then((respuesta) => respuesta.json())
//JSON -> Data -> renderizar info browser
    .then(responseJson => {

        const todosLosItems = [];
        
        responseJson.data.forEach((item) => {
        
            //crear img
            const imagen = document.createElement('img');
            imagen.src = `${baseUrl}${item.image}`;
            imagen.className = 'h-16 w-16 md:h-24 rounded-full mx-auto md:mx-0 md:mr-6'
        
            //crear titulo
            const title = document.createElement('h2');
            title.textContent = item.name;
            //1.-Agregando estilos utilizando las propiedades de estilos
            //title.style = 'font-size: 2rem';
            //title.style.fontSize = '3rem';
            //2.-Agregando estilos Utilizando clases
            //title.className = 'muy-grande';
            title.className = 'text-xl text-red-700';
            
            
            //crear precio
            const price = document.createElement('div');
            price.textContent = formatPrice(item.price);

            const container = document.createElement('div');
            container.append(imagen, title, price);
            container.className = 'contenedor';
            
            todosLosItems.push(container);
        });
        appNode.append(...todosLosItems)
    })
    //Si queremos mejorar el codigo podemos utilizar promise->async/await