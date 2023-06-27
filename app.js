let url ='https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=';
const page_url = 'http://en.wikipedia.org/?curid=${pageid}';

let form = document.querySelector('.main__form');
let container = document.querySelector('.main__results');
let grid = document.querySelector('.main__grid');
let input = form.querySelector('.form__input');
let counter = 10;

form.addEventListener('submit', search);



async function fetchURL(url){
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

async function search(e){
    e.preventDefault();
    let value = input.value;
    input.value = '';
    url = url+value;
    counter = 10;
    let data = await fetchURL(url);
    getResults(data);
}

function getResults(data, amount=0){
    let searchResults = data.query.search;
    container.innerHTML='';
    let list = '';
    grid.innerHTML='';
    if(document.querySelector('.btn-show')) document.querySelector('.btn-show').remove();
    searchResults.forEach(article=>{
        let {title, pageid, snippet} = article; 
        let newArticle = `<a href="${page_url}" class="results__item">
        <h3 class="results__title">${title}</h3>
        <p class="results__snippet">${snippet}</p>
      </a>`;
        list+=newArticle;
    });
        grid.innerHTML=list;
        container.append(grid);
        
        let showMore = `<button class='btn-show'>Show more</button>`;
        container.innerHTML+= showMore;
        let btn = document.querySelector('.btn-show');
        btn.addEventListener('click', async function(e){
            let regex = /srlimit=\d+/;
            let newUrl = url.replace(regex, `srlimit=${20+counter}`);
            counter=counter+10;
            let data = await fetchURL(newUrl);
            console.log(data);
            getResults(data);
        });
    
    if(!list) container.innerHTML = "<p class='results__error'>Sorry, even Wiki donesn't know that</p>";

}



