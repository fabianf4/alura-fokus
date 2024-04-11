const html = document.querySelector("html");
const shortBottom = document.querySelector(".app__card-button--corto");
const focusBottom = document.querySelector(".app__card-button--enfoque");
const longBottom = document.querySelector(".app__card-button--largo");
const bannerImg = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const switchMusic = document.getElementById("alternar-musica");
const buttonSP = document.getElementById("start-pause");
const textStartPause = document.getElementById("text-button-start-pause");
const imgStartPause = document.querySelector(".app__card-primary-butto-icon");

function setTimePage(timerSeg) {
    let minutes = Math.floor(timerSeg / 60);
    let seg = timerSeg % 60;
    pageTimer.innerHTML = `${minutes}:${seg < 10 ? "0" : ""}${seg}`;
}

const pageTimer = document.getElementById("timer");
let defaultCounter = 25 * 60;
let time = 25 * 60;
setTimePage(time);

const musica = new Audio("sonidos/luna-rise-part-one.mp3");
musica.loop = true;

switchMusic.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
});

function activeButton(active) {
    document.querySelectorAll(".app__card-button").forEach((element) => {
        element.classList.remove("active");
    });
    active.classList.add("active");
}

function changeContent(
    contexto,
    buttonActive,
    src,
    title1,
    title2,
    timeDefault
) {
    html.dataset.contexto = contexto;
    activeButton(buttonActive);
    bannerImg.src = "imagenes/" + src;
    title.innerHTML = `${title1}<br />
                    <strong class="app__title-strong"
                        >${title2}</strong
                    >`;
    time = timeDefault;
    setTimePage(timeDefault);
    if (interval !== undefined) {
        startPause();
    }
    defaultCounter = timeDefault;
}

shortBottom.addEventListener("click", () => {
    changeContent(
        "descanso-corto",
        shortBottom,
        "descanso-corto.png",
        "¿Que tal tomar un respiro?",
        "¡Haz una pausa corta!",
        5 * 60
    );
});

focusBottom.addEventListener("click", () => {
    changeContent(
        "enfoque",
        focusBottom,
        "enfoque.png",
        "Optimiza tu productividad,",
        "sumérgete en lo que importa.",
        25 * 60
    );
});

longBottom.addEventListener("click", () => {
    changeContent(
        "descanso-largo",
        longBottom,
        "descanso-largo.png",
        "Hora de volver a la superficie",
        "Haz una pausa larga.",
        15 * 60
    );
});

let interval;
const musicPlay = new Audio("sonidos/play.wav");
const musicPause = new Audio("sonidos/pause.mp3");
const musicBeep = new Audio("sonidos/beep.mp3");

function startPause() {
    if (interval === undefined) {
        musicPlay.play();
        textStartPause.innerHTML = "Pausa";
        imgStartPause.src = "imagenes/pause.png";

        interval = setInterval(() => {
            time--;
            setTimePage(time);

            if (time <= 0) {
                musicBeep.play();
                clearInterval(interval);
                interval = undefined;
                time = defaultCounter;
                setTimePage(time);
                textStartPause.innerHTML = "Iniciar";
                imgStartPause.src = "imagenes/play_arrow.png";
            }
        }, 1000);
    } else {
        musicPause.play();
        textStartPause.innerHTML = "Iniciar";
        imgStartPause.src = "imagenes/play_arrow.png";
        clearInterval(interval);
        interval = undefined;
    }
}

buttonSP.addEventListener("click", () => {
    startPause();
});
