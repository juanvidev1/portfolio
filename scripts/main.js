console.log('Desarrollos JuanviDev Inc');

const burgerMenu = document.querySelector('.menu-icon');
const mobileMenu = document.querySelector('.mobile-menu');
const socialMediaList = document.querySelector('.social-media-list');
const aboutMeLink = document.querySelector('#aboutme');
const projectsLink = document.querySelector('#projects');
const aboutmeMobileLink = document.querySelector('#aboutme-mobile');
const projectsMobileLink = document.querySelector('#projects-mobile');
const mainContent = document.querySelector('.aboutme');
const aboutMeTitle = document.querySelector('.content-title');
const aboutMeContent = document.querySelector('#aboutme-content');
const projectsContent = document.querySelector('#projects-content');
const contentParagraph = document.querySelector('.content-paragraph');
const experience = document.querySelector('.experience-content');
const languageSelectorDiv = document.querySelector('.lang-container');
const languageSelector = document.querySelector('.language-selector');
const blogLink = document.querySelector('#blog');



burgerMenu.addEventListener('click', toggleMobileMenu);
aboutMeLink.addEventListener('click', toggleProjectsContent);
projectsLink.addEventListener('click', toggleAboutMeContent);

aboutmeMobileLink.addEventListener('click', toggleProjectsContent);
projectsMobileLink.addEventListener('click', toggleAboutMeContent);


let currentLanguage = 'spanish';
languageSelectorDiv.addEventListener('click', function() {
    currentLanguage = (currentLanguage === 'spanish') ? 'english' : 'spanish';
    
    changeLanguage(currentLanguage);
});

const spanish = [
    'Sobre mí',
    `Soy un apasionado desarrollador web con 2 años de experiencia en la creación de soluciones digitales cautivadoras. Mi enfoque va más allá del 
    simple código; me esfuerzo por dar vida a experiencias en línea impactantes y funcionales. He trabajado en diversos proyectos donde he aplicado 
    mi habilidad para traducir conceptos creativos en código limpio y eficiente. Mi destreza abarca tanto el front-end como el back-end, utilizando 
    tecnologías como HTML, CSS, JavaScript, Node.js, PHP y Python. Además de mi habilidad técnica, poseo una mentalidad proactiva y orientada a resultados que 
    me impulsa a enfrentar desafíos con creatividad y resiliencia. Mi compromiso con el aprendizaje continuo y mi capacidad para colaborar efectivamente 
    en equipos multidisciplinarios son pilares fundamentales de mi enfoque profesional. Estoy ansioso por contribuir con mi experiencia y energía a un 
    equipo innovador donde pueda seguir desarrollándome y aportando al crecimiento conjunto`
];

const english = [
    'About Juanvi',
    `I am a passionate web developer with 2 years of experience in creating captivating digital solutions. My focus goes beyond mere code; 
    I strive to bring impactful and functional online experiences to life. I have worked on various projects where I applied my skill to translate creative 
    concepts into clean and efficient code. My expertise spans both front-end and back-end, using technologies such as HTML, CSS, JavaScript, Node.js, PHP, and Python. 
    In addition to my technical skills, I possess a proactive and results-oriented mindset that drives me to tackle challenges with creativity and resilience. 
    My commitment to continuous learning and my ability to collaborate effectively in multidisciplinary teams are foundational pillars of my professional approach. 
    I am eager to contribute my expertise and energy to an innovative team where I can continue to grow and contribute to collective success`
];

const projects = [
    {
        id: 1,
        name: 'Backend Serviplus',
        description: 'Serviplus es un proyecto de creación de tickets utilizando NodeJs y MongoDB desarrollado en el marco de MisiónTic2022',
        repo: 'https://github.com/juanvidev1/serviplus2'
    },
    {
        id: 2,
        name: 'Frontend Serviplus',
        description: 'Este es el front de Serviplus desarrollado en ReactJs en el marco de MisiónTic2022',
        repo: 'https://github.com/juanvidev1/serviplus-front2'
    },
    {
        id: 3,
        name: 'Ecommerce Laravel',
        description: 'Este es un ecommerce desarrollado en Laravel durante el bootcamp de PHP de evertec',
        repo: 'https://github.com/juanvireyes/ecommerce'
    },
    {
        id: 4,
        name: 'Backend Ecommerce NodeJs',
        description: 'Este es un ecommerce desarrollado en NodeJs para la saga de cursos de desarrollo backend con NodeJs de la ruta de Full-Stack Developer con Javascript',
        repo: 'https://github.com/juanvidev1/nodeEcommerce'
    }
];

function toggleMobileMenu() {
    mobileMenu.classList.toggle('inactive');
}

function toggleAboutMeContent() {
    const isAboutMeContentActive = !aboutMeContent.classList.contains('inactive');
    if (isAboutMeContentActive) {
        aboutMeContent.classList.add('inactive');
        projectsLink.classList.add('inactive');
        aboutMeLink.classList.remove('inactive');
        aboutmeMobileLink.classList.remove('inactive');
        projectsMobileLink.classList.add('inactive');
    }

    projectsContent.classList.toggle('inactive');
}

function toggleProjectsContent() {
    const projectsContentActive = !projectsContent.classList.contains('inactive');
    if (projectsContentActive) {
        projectsContent.classList.add('inactive');
        aboutMeLink.classList.add('inactive');
        projectsLink.classList.remove('inactive');
        aboutmeMobileLink.classList.add('inactive');
        projectsMobileLink.classList.remove('inactive');
    }
    
    aboutMeContent.classList.toggle('inactive');
}

function generateProjects(projects) {
    const title = document.createElement('h1');
    title.textContent = 'Proyectos';
    title.classList.add('projects-content-title');
    projectsContent.appendChild(title);

    const list = document.createElement('ul');
    list.classList.add('projects-list');

    projects.forEach(project => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <br>
        <p class="project-name">${project.name}</p>
        <p class="project-description">${project.description}</p>
        <a href="${project.repo}" class="project-link">Repositorio</a>
        `;
        list.appendChild(listItem);
    });
    projectsContent.appendChild(list);
}

function changeLanguage(language) {
    if (language == 'spanish') {
        aboutMeTitle.textContent = spanish[0];
        contentParagraph.textContent = spanish[1];
        languageSelector.setAttribute('src', '../assets/us.svg');
        blogLink.textContent = 'Noticias';
        projectsLink.textContent = 'Proyectos';
        projectsMobileLink.textContent = 'Proyectos';
        aboutMeLink.textContent = 'Sobre Juanvi';
        aboutmeMobileLink.textContent = 'Sobre Juanvi';
        document.querySelector('.projects-content-title').textContent = 'Proyectos';
    }

    if (language == 'english') {
        aboutMeTitle.textContent = english[0];
        contentParagraph.textContent = english[1];
        languageSelector.setAttribute('src', '../assets/co.svg');
        blogLink.textContent = 'News';
        projectsLink.textContent = 'Projects';
        projectsMobileLink.textContent = 'Projects';
        aboutMeLink.textContent = 'About Juanvi';
        aboutmeMobileLink.textContent = 'About Juanvi';
        document.querySelector('.projects-content-title').textContent = 'Projects';
    }
}

generateProjects(projects);


