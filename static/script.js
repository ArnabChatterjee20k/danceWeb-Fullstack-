
let btn=document.querySelector("input[type=submit]");

btn.addEventListener("click",function(e){
    let names=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let number=document.getElementById("number").value;
    if(names.trim()=="" || email.trim()=="" || number.trim()==""){
        e.preventDefault()
        alert("Plz fullfill the form")
    }

})