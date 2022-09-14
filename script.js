const box = document.querySelector(".container");

const getCats = function(){ //IIFE
    fetch(" http://sb-cats.herokuapp.com/api/2/andy1337/show")
    .then(res => res.json())
    .then(data => {
        data.data.forEach(el => {
            if(el.id && el.name) {

let card = `
<div 
class="card" 
style="${el.img_link && `background-image: url(${el.img_link})`}">
<h4>${el.name}</h4>
</div>`;
box.innerHTML += card;


            }
        });
    })
    
};
getCats();

const form = document.forms.addCat;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const body = {}
    for (let i = 0; i < form.elements.length; i++) {
        const el = form.elements[i];
        if (el.name && el.value) {
            body[el.name] =el.value
        }
        console.log(body)
    }
    fetch("http://sb-cats.herokuapp.com/api/2/andy1337/add",{
        method: "POST",
        headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)

}
    ).then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.message === "ok"){
            box.innerHTML = ""
            getCats();
        }
    })
})