// write your code here





//global variable declarations
const baseUrl = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDescription = document.querySelector('#ramen-detail')
const ramenForm = document.querySelector('#new-ramen')
let ramenCount = 6





//fetch functions
function getJSON(url){
    return fetch(url)
    .then((response)=> response.json())
}


function postJSON(url,data){
fetch(url, {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(res => res.json())
  .then(res => console.log(res));
}
//dom rendering functions
function renderRamenImage(ramen){
    let newRamen = document.createElement('img')
    newRamen.src = ramen.image
    newRamen.setAttribute('id', ramen.id)
    ramenMenu.append(newRamen)

}

function renderDetails(ramen){
    let ramenImage = ramenDescription.querySelector('img')
    //console.log(ramenImage)
    ramenImage.src = ramen.image
    let ramenName = ramenDescription.querySelector('h2')
    ramenName.textContent = ramen.name
    let ramenResta = ramenDescription.querySelector('h3')
    ramenResta.textContent = ramen.restaurant
}



//general function declarations
function initialize(){
    getJSON(baseUrl)
    .then((ramens) => ramens.forEach(renderRamenImage))

    getJSON(baseUrl + `/1`)
.then(response => renderDetails(response))
}

function createNewRamen(){
    event.preventDefault()
    console.log(event)
     let newRamen = document.createElement('img')
     newRamen.src = ramenForm.elements[2].value
     newRamen.setAttribute('id', ramenCount)
     ramenMenu.append(newRamen)
    let newRamenData = {"id" : ramenCount,
                        "name": ramenForm.elements[0].value,
                        "restauraunt": ramenForm.elements[1].value,
                        "image": ramenForm.elements[2].value,
                        "rating": ramenForm.elements[3].value, 
                        "comment": ramenForm.elements[4].value}
                        ramenCount++
    postJSON(baseUrl, newRamenData)

}




//handle functions
ramenMenu.addEventListener('click' , (event) => 
getJSON(baseUrl + `/${event.target.id}`)
.then((response) => renderDetails(response))
)
    
ramenForm.addEventListener('submit', (event) => createNewRamen())



//function invokation
initialize()
