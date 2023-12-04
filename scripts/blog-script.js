const newsMainContent = document.getElementById('news-container');
const newsContainer = null || document.getElementById('news-table-body');
const countrySelector = document.getElementById('country-selector');
const newsTable = document.querySelector('.news-table');
const cardsContainer = document.querySelector('.cards-container');
const languageSelectorDiv = document.querySelector('.lang-container');
const languageSelector = document.querySelector('.language-selector');
const aboutMeLink = document.querySelector('#aboutme');

const countryUrl = 'https://newsi-api.p.rapidapi.com/api/Supported-language-and-countries';
let newsUrl = 'https://newsi-api.p.rapidapi.com/api/local?language=en&country=us&sort=top&page=1&limit=10';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c1fd112c6amsh400ae9a8a819031p1adf1ejsne89752aa586a',
		'X-RapidAPI-Host': 'newsi-api.p.rapidapi.com'
	}
};

async function fetchData(url) {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};

function formatDate(date) {
    const newDate = new Date(date);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    return newDate.toLocaleDateString('en-US', options);
}

async function fetchCountries() {
    try {
        const countries = await fetchData(countryUrl);
        const newCountries = countries.map(country => Object.entries(country));
        let otherArray = [];
        let finalArray = [];

        // console.log(newCountries);
        for (let i = 0; i < newCountries.length; i++) {
            // console.log(newCountries[i][0][0]);
            
            otherArray.push({
                countryName: newCountries[i][0][0],
                countryDetail: newCountries[i][0][1]
            });
        }

        // console.log(otherArray);

        for (country of otherArray) {
            // console.log(country.countryDetail[0]['Country code']);
            let countryCode = country.countryDetail[0]['Country code'];
            let language = country.countryDetail[0]['Language code'];
            let languageName = country.countryDetail[0]['Language name'];

            if (country.countryDetail.length >= 2) {
                for (let i = 0; i < country.countryDetail.length; i++) {
                    countryCode = country.countryDetail[i]['Country code'];
                    language = country.countryDetail[i]['Language code'];
                    languageName = country.countryDetail[i]['Language name'];

                    finalArray.push({
                        countryName: country.countryName,
                        countryCode: countryCode,
                        language: language,
                        languageName: languageName
                    });
                }
            }

            finalArray.push({
                countryName: country.countryName,
                countryCode: country.countryDetail[0]['Country code'],
                language: country.countryDetail[0]['Language code'],
                languageName: country.countryDetail[0]['Language name']
            });
        }
        return finalArray;
    } catch (error) {
        console.error(error);
    }

}

let currentLanguage = 'spanish';
languageSelectorDiv.addEventListener('click', function() {
    currentLanguage = (currentLanguage === 'spanish') ? 'english' : 'spanish';
    
    changeLanguage(currentLanguage);
});

function changeLanguage(language) {
    if (language == 'spanish') {
        languageSelector.setAttribute('src', './assets/us.svg');
        
        aboutMeLink.textContent = 'Volver';
    }

    if (language == 'english') {
        languageSelector.setAttribute('src', './assets/co.svg');
        
        aboutMeLink.textContent = 'Go back';
    }
}

/** Obtiene los países y idiomas disponibles para el select y devuelve las noticias del país seleccionado en el idioma seleccionado */
(async () => {
    try {
        
        const countriesData = await fetchCountries();
        let languageCode = '';
        let countryCode = '';
        let view = '';
        let mobileView = '';
        
        /* Este fpr genera las opciones con los países e idiomas disponibles en la api del servicio */
        for (country of countriesData) {
            let view = `
            <option id="selected-country" value="${country.language}-${country.countryCode}"> ${country.languageName} - ${country.countryName}</option>
            `;
            
            countrySelector.innerHTML += view;
        }

        /* En este caso el evento change toma el cambio en el selector y cuando se hace click se retorna las noticias del país seleccionado. El evento change toma
        el cambio en el selector y cuando se hace click se retorna las noticias del país seleccionado.  */
        countrySelector.addEventListener('change', async (event) => {
            const selectedCountry = event.target.value;
            codesInit = selectedCountry;
            // El split divide el string en un array de dos partes, el primero es el código del idioma y el segundo es el código del país.
            codes = codesInit.split('-');
            
            languageCode = codes[0]; // Se setea el código del país
            countryCode = codes[1]; // Se setea el código del idioma

            // Seteamos la url con los parámetros necesarios. Sólo retornará las 10 noticias más recientes
            newsUrl = `https://newsi-api.p.rapidapi.com/api/local?language=${languageCode}&country=${countryCode}&sort=top&page=1&limit=10`;
            // Aquí hacemos la consulta al endpoint de noticias con la url ajustada
            const news = await fetchData(newsUrl);

            // Aquí generamos la vista con las noticias obtenidas y las mostramos en el html páginas grandes.
            view = news.map(article => `
                <tr>
                    <td>
                        <div class="date-content">
                            <div class="news-image">
                                <a href="${article.link}" target="_blank">
                                    <img src="${article.image}" alt="${article.title}">
                                </a>                    
                            </div>
                            <div>
                                <p>${formatDate(article.publishedAt)}</p>
                            </div>
                        </div>
                    </td>
                    <td class="article-title">
                        <p>
                            <a href="${article.link}" target="_blank">${article.title}</a>
                        </p>
                    </td>
                </tr>
            `).join('');
            newsContainer.innerHTML = view;

            // También generamos la vista con las noticias obtenidas y las mostramos en el html páginas mobile.
            mobileView = news.map(article => `
            <div class="card-content">
                <div class="card-left">
                    <div class="news-image">
                        <img src="${article.image}" alt="">
                    </div>
                    <div class="news-date">${formatDate(article.publishedAt)}</div>
                </div>
                <div class="news-title">
                    <a href="${article.link}" target="_blank">${article.title}</a>
                </div>
            </div>

            `).join('');
            cardsContainer.innerHTML = mobileView;
        });

        // Aquí mostramos las noticias de US por defecto
        const news = await fetchData(newsUrl);

        // Aquí generamos la vista con las noticias obtenidas y las mostramos en el html.
        view = news.map(article => `
            <tr>
                <td>
                    <div class="date-content">
                        <div class="news-image">
                            <a href="${article.link}" target="_blank">
                                <img src="${article.image}" alt="${article.title}">
                            </a>                    
                        </div>
                        <div>
                            <p>${formatDate(article.publishedAt)}</p>
                        </div>
                    </div>
                </td>
                <td class="article-title">
                    <p>
                        <a href="${article.link}" target="_blank">${article.title}</a>
                    </p>
                </td>
            </tr>
        `).join('');
        newsContainer.innerHTML = view;

        mobileView = news.map(article => `
            <div class="card-content">
                <div class="card-left">
                    <div class="news-image">
                        <img src="${article.image}" alt="">
                    </div>
                    <div class="news-date">${formatDate(article.publishedAt)}</div>
                </div>
                <div class="news-title">
                    <a href="${article.link}" target="_blank">${article.title}</a>
                </div>
            </div>

        `).join('');
        cardsContainer.innerHTML = mobileView;
    } catch (error) {
        console.log(error);
    }
    
})();