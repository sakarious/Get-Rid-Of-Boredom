const BaseURL = 'https://api.agify.io?name='
const UserInput = document.querySelector('#text')
const Submit= document.querySelector('#submit')
const Result = document.querySelector('#result')
const Refresh = document.querySelector('#reload')
const DogBaseURL = 'https://dog.ceo/api/breeds/image/random'
const DogButton = document.querySelector('#dogBtn')
const DogImage = document.querySelector('#image')
let Name;

Submit.addEventListener('click', () => {
    if(UserInput.value.length >= 1){
        Name = UserInput.value.toLowerCase();

        (async () => {
            let fetchedProm = await fetch(`${BaseURL}${Name}`)
            let JsonResponse = await fetchedProm.json();
            let Username = JsonResponse.name
            let CapName = Username.charAt(0).toUpperCase() + Username.slice(1)
            let UserGuessedAge = JsonResponse.age
            return Result.innerHTML = `
            Your name is ${CapName} and you are ${UserGuessedAge} years old
            `
        })();
    }
})

Refresh.addEventListener('click', () => {
    UserInput.value = ''
})

DogApi = async () => {
    let PromiseDog = await fetch(`${DogBaseURL}`)
    console.log(PromiseDog)
    let JsonDog = await PromiseDog.json()
    let DogUrl = JsonDog.message
    //console.log(DogUrl)
    return JsonDog;
    
}

DogButton.addEventListener('click', async () => {
 let ReturnedDogPromise = await DogApi()
 let ImageSrc = ReturnedDogPromise.message
 console.log(ImageSrc)
 DogImage.innerHTML = `<img src="${ImageSrc}" alt="dog image" width="500px" />`
})
