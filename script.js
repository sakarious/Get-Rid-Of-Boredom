//For Predict Age

const BaseURL = 'https://api.agify.io?name='
const UserInput = document.querySelector('#text')
const Submit= document.querySelector('#submit')
const Result = document.querySelector('#result')
const Refresh = document.querySelector('#reload')
const AgeError = document.querySelector('#AgeError')
let Name;

//For Cute Dog Images

const DogBaseURL = 'https://dog.ceo/api/breeds/image/random'
const DogButton = document.querySelector('#dogBtn')
const DogImage = document.querySelector('#image')
const DogError = document.querySelector('#DogError')

// Currency Codes and Names

const CountryCodeBaseURL = 'response.json'
const htmlBody = document.querySelector('#id')
const htmlError = document.querySelector('#countryError')
const countryCodeButton = document.querySelector('#countryName')

//For Currency Rates

const CurrencyBaseURL = ' https://v6.exchangerate-api.com/v6/7588bb4e69376a482515a285/latest/'
const UserCurrency = document.querySelector('#currencyCode')
const ConvertBtn = document.querySelector('#convertRate')
const BaseCurrHTML = document.querySelector('#baseCurr')
const AllConversion = document.querySelector('#convert')
const Error = document.querySelector('#error')
let currency;

//For Predict Age
Submit.addEventListener('click', () => {
    if(UserInput.value.length >= 1){
        Name = UserInput.value.toLowerCase();

        (async () => {
            try{
                let fetchedProm = await fetch(`${BaseURL}${Name}`)
                let JsonResponse = await fetchedProm.json();
                let Username = JsonResponse.name
                let CapName = Username.charAt(0).toUpperCase() + Username.slice(1)
                let UserGuessedAge = JsonResponse.age
                return Result.innerHTML = `
                Your name is ${CapName} and you are ${UserGuessedAge} years old`
            }
            catch (error) {
                return (AgeError.innerHTML = 'Error, Try Again')
            }
        })();
    }
})

Refresh.addEventListener('click', () => {
    UserInput.value = ''
})

//For Cute Dog Images
DogApi = async () => {
    try{
        let PromiseDog = await fetch(`${DogBaseURL}`)
        console.log(PromiseDog)
        let JsonDog = await PromiseDog.json()
        return JsonDog;
    }
    catch (error) {
        return (DogError.innerHTML = 'Error, Try Again')
    }
}

DogButton.addEventListener('click', async () => {
 let ReturnedDogPromise = await DogApi()
 let ImageSrc = ReturnedDogPromise.message
 console.log(ImageSrc)
 DogImage.innerHTML = `<img src="${ImageSrc}" alt="dog image" width="500px" />`
})

//For Currency Rates
convertRate.addEventListener('click', () => {
    if(UserCurrency.value.length >= 1){
        currency = UserCurrency.value.toUpperCase()
        console.log(currency);
        
        ( async () => {
            try{
                let returnedConversionPromise = await fetch(`${CurrencyBaseURL}${currency}`)
                let returnedConversionJson = await returnedConversionPromise.json()
                console.log(returnedConversionJson)
                let BaseCurrCode = await returnedConversionJson['base_code']
                let conversionRates = await returnedConversionJson['conversion_rates']
                console.log(BaseCurrCode)
                console.log(conversionRates)
                const rates = Object.entries(conversionRates);
                console.log(rates)

                for(const [currency, convert] of rates){
                    AllConversion.innerHTML += (`<h2> Currency Code: ${currency}, Conversion Rate: ${convert} </h2>`)
                }
                BaseCurrHTML.innerHTML = `Base Currency: ${BaseCurrCode}`
            }

            catch (error) {
                return (Error.innerHTML = 'Error, Try Again')
            }
            
        })();

    }

})

// Currency Codes and Names
getCurrency = async () => {
    try {
            let fetchedPromise = await fetch(`${CountryCodeBaseURL}`)
            console.log(fetchedPromise);
            let response = await fetchedPromise.json()
            console.log(response);
            return response
    }

    catch (error){
        return (countryError.innerHTML = `<h1 class="h1"> Error, Try Again </h1>`)
    }
}


countryCodeButton.addEventListener('click', async () => {
    let currencyArray = await getCurrency();
    let realCurrencyArray = currencyArray.data
    console.log(realCurrencyArray);
    console.log(realCurrencyArray[0].name)
     let htmlRealCurrencyArray = realCurrencyArray.map((currency) => {
         return `
         <h2>Country Name: ${currency.name}</h2>
         <h2>Country Currency: ${currency.id}</h2>
         <hr>
         `
     })
     console.log(htmlRealCurrencyArray);
     htmlBody.innerHTML = htmlRealCurrencyArray.join(' ')
    
})