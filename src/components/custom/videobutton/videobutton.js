// Підключення функціоналу "аа"
import { addTouchAttr, addLoadedAttr, isMobile, FLS } from "@js/common/functions.js"

import "./videobutton.scss"

document.addEventListener("DOMContentLoaded", () => {
  const videoButtons = document.querySelectorAll(".video-youtube__button");
  const players = new Map(); // key: containerElement, value: playerInstance
  let apiLoaded = false;
  let apiReadyCallbacks = [];

  // --- Загрузка API ---
  function loadYouTubeAPI(callback) {
    if (apiLoaded) {
      if (typeof YT !== "undefined" && YT.Player) callback();
      else apiReadyCallbacks.push(callback);
      return;
    }

    apiLoaded = true;
    apiReadyCallbacks.push(callback);

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = function () {
      apiReadyCallbacks.forEach(cb => cb());
      apiReadyCallbacks = [];
    };
  }

  // --- Пауза всех видео кроме одного ---
  function pauseAll(exceptContainer = null) {
    players.forEach((player, container) => {
      if (container !== exceptContainer && player.pauseVideo) {
        player.pauseVideo();
      }
    });
  }

  // --- Создание YouTube-плеера ---
  function createPlayer(container, code, autoplay = true) {
    const iframeId = "yt-" + code + "-" + Date.now();
    const iframe = document.createElement("div");
    iframe.id = iframeId;

    container.innerHTML = "";
    container.appendChild(iframe);
    container.classList.add("video-added");

    const player = new YT.Player(iframeId, {
      videoId: code,
      playerVars: {
        rel: 0,
        showinfo: 0,
        autoplay: autoplay ? 1 : 0
      },
      events: {
        onStateChange(event) {
          if (event.data === YT.PlayerState.PLAYING) {
            pauseAll(container);
          }
        }
      }
    });

    // Запоминаем плеер по DOM-контейнеру
    players.set(container, player);
  }

  // --- Клик по кнопке ---
  videoButtons.forEach(button => {
    button.addEventListener("click", function () {
      const code = this.dataset.youtube;
      const container = this.closest(".video-youtube__body");

      loadYouTubeAPI(() => createPlayer(container, code, true));
    });
  });

  // STOP VIDEO WHEN PARTLY OUT OF VIEW
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const container = entry.target;
      const player = players.get(container);

      if (!player) return;

      // видно меньше 80% → ставим на паузу
      if (entry.intersectionRatio < 0.8) {
        if (player.getPlayerState() === YT.PlayerState.PLAYING) {
          player.pauseVideo();
        }
      }
    });
  }, {
    threshold: [0, 0.2, 0.5, 0.8, 1] 
  });

  document.querySelectorAll(".video-youtube__body").forEach(el => {
    observer.observe(el);
  });

});


// document.addEventListener("DOMContentLoaded", () => {
//   const videoButtons = document.querySelectorAll(".video-youtube__button");
//   const players = new Map();
//   let apiLoaded = false;
//   let apiReadyCallbacks = [];

//   // Загружаем API один раз
//   function loadYouTubeAPI(callback) {
//     if (apiLoaded) {
//       if (typeof YT !== "undefined" && YT.Player) {
//         callback();
//       } else {
//         apiReadyCallbacks.push(callback);
//       }
//       return;
//     }

//     apiLoaded = true;
//     apiReadyCallbacks.push(callback);

//     const tag = document.createElement("script");
//     tag.src = "https://www.youtube.com/iframe_api";
//     document.head.appendChild(tag);

//     // YouTube вызовет эту функцию, когда API будет готов
//     window.onYouTubeIframeAPIReady = function () {
//       apiReadyCallbacks.forEach(cb => cb());
//       apiReadyCallbacks = [];
//     };
//   }

//   function pauseAll(exceptId = null) {
//     players.forEach((player, id) => {
//       if (id !== exceptId && player.pauseVideo) {
//         player.pauseVideo();
//       }
//     });
//   }

//   function createPlayer(container, youTubeCode, autoplay = true) {
//     const iframeId = "yt-" + youTubeCode + "-" + Date.now();
//     const iframe = document.createElement("div");
//     iframe.setAttribute("id", iframeId);

//     container.innerHTML = "";
//     container.appendChild(iframe);
//     container.classList.add("video-added");

//     const player = new YT.Player(iframeId, {
//       videoId: youTubeCode,
//       playerVars: {
//         rel: 0,
//         showinfo: 0,
//         autoplay: autoplay ? 1 : 0
//       },
//       events: {
//         onStateChange: function (event) {
//           if (event.data === YT.PlayerState.PLAYING) {
//             pauseAll(iframeId);
//           }
//         }
//       }
//     });

//     players.set(iframeId, player);
//   }

//   videoButtons.forEach(button => {
//     button.addEventListener("click", function () {
//       const youTubeCode = this.getAttribute("data-youtube");
//       const container = this.closest(".video-youtube__body");

//       // Загружаем API и создаём плеер только при первом клике
//       loadYouTubeAPI(() => {
//         createPlayer(container, youTubeCode, true);
//       });
//     });
//   });
// });
