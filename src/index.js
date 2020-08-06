const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://rickandmortyapi.com/api/character/";

document.addEventListener("DOMContentLoaded", localStorage.clear());

const getData = (api) => {
    if (localStorage.getItem("next_fetch") !== null) {
        api = localStorage.getItem("next_fetch");
    }

    fetch(api)
        .then((response) => response.json())
        .then((response) => {
            const characters = response.results;
            console.log(characters);
            let output = characters
                .map((character) => {
                    return `
                        <article class="Card">
                            <img alt="Character Picture: ${character.name}" src="${character.image}" />
                            <h2>${character.name}<span>${character.species}</span></h2>
                        </article>`;
                })
                .join("");
            let newItem = document.createElement("section");
            newItem.classList.add("Items");
            newItem.innerHTML = output;
            $app.appendChild(newItem);
            localStorage.setItem("next_fetch", response.info.next);
            console.log(localStorage);
        })
        .catch((error) => console.log(error));
};

const loadData = async () => {
    await getData(API);
};

const intersectionObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            loadData();
        }
    },
    {
        rootMargin: "0px 0px 100% 0px",
    }
);

intersectionObserver.observe($observe);
