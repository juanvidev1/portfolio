console.log('Prueba conectada');

/** Obtenemos el elemento donde quiero mostrar los resultados de la consulta a la api. En mi caso, va a ser el elemento main en mi html */

const newsMainContent = document.getElementById('news-container');
const newsContainer = null || document.getElementById('news-table-body');
const countrySelector = document.getElementById('country-selector');
const newsTable = document.querySelector('.news-table');

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

/** Obtiene los países y idiomas disponibles para el select y devuelve las noticias del país seleccionado en el idioma seleccionado */
(async () => {
    try {
        
        const countriesData = await fetchCountries();
        let languageCode = '';
        let countryCode = '';
        let view = '';
        let mobileView = '';
        // console.log(countriesData);
        
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
            // console.log(newsUrl);
            // Aquí hacemos la consulta al endpoint de noticias con la url ajustada
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
    } catch (error) {
        console.log(error);
    }
    
})();

/* // Esto es una forma de hacer el consumo. Sin embargo en rapidApi dan otra manera un poco más corta y precisa
async function fetchData(url) {
    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

// Podemos crear una función que se autoinvoca. Los paréntesis antes del punto y coma invocan la función una vez el código la encuentre
(async () => {
    try {
        const videos = await fetchData(url);
        console.log(videos.items);
        let view = videos.items.map(video => `
            <div class="video-container">
                <div class="thumbnail">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}">
                </div>
                <div class="title">
                    <h3>
                        <span aria-hidden="true"></span>
                        ${video.snippet.title}
                    </h3>
                </div>
            </div>
        `).splice(0, 4).join('');  // <-- Unir los elementos en un solo string
        
        mainContainer.innerHTML = view;
    } catch (error) {
        console.error(error);
    }
})();*/


