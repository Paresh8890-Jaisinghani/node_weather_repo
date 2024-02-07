console.log("JavaScript File is Uploaded")


const weatherForm  =  document.querySelector('form');
const search = document.querySelector('input');
const meassageone = document.querySelector('#message-1');
const meassagetwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();

    const location = search.value;

    meassageone.textContent = 'Loading...'
    meassagetwo.textContent = "";
    fetch('http://localhost:3000/weather?address='+ location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            meassageone.textContent = data.error;
         
        }
        else{
            meassageone.textContent = data.location;
            meassagetwo.textContent = data.forecast;
        }
    })
})

})