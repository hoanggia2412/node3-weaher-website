// fetch('http://puzzle.mead.io/puzzle').then((res)=>{
//     res.json().then((data)=>{
//         console.log(data);
//     })
// })

// fetch('http://localhost:3000/weather?address=BOSTON').then((res)=>{
//     res.json().then((data)=>{
//         if(data.error)
//         return console.log(data.error)
//         else{
//             console.log(data);
//         }
//     })
// })
const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const img = document.querySelector('img')
weatherForm.addEventListener('submit',(e)=>{
    const value = searchElement.value
    if(value.length>0){
        fetch(`/weather?address=${value}`).then((res)=>{
            res.json().then(({forecastData,location,error = undefined} = {}) => {
            if(error)
            return messageOne.textContent = error
            else {
                messageOne.textContent = location
                messageTwo.textContent = `${forecastData.description.toUpperCase()} (${forecastData.temp.toFixed(2)}) °C`
            if(forecastData.description.includes("cloud")){
                img.src = '/img/cloud.gif'
                document.body.style.backgroundImage = "/img/cloud-background.jpg";
            } else if((forecastData.description.includes("rain")))
                img.src = '/img/rain.gif'   
            }
            img.style.width = "150px";
            img.style.height = "150px";
             })
        })
    }

    e.preventDefault()
})