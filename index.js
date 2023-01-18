const mainTag = document.querySelector("main");
const bodyTag = document.querySelector("body");
const figcaptions = document.querySelectorAll("figcaption");
const cursor = document.querySelector("div.cursor");
const cursorOuter = document.querySelector("div.cursor-outer");

const mq = window.matchMedia(
  "(prefers-reduced-motion: no-preference) and  (min-width: 600px)"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.25) {
        entry.target.classList.add("in-view");
      }
    });
  },
  {
    threshold: [0, 0.25, 0.1]
  }
);

figcaptions.forEach((caption) => observer.observe(caption));

const runScripts = () => {
  if (mq.matches) {
    mainTag.style.position = "fixed";
    mainTag.style.top = "0px";
    mainTag.style.left = "0px";
    mainTag.style.width = "100%";

    let currentScroll = 0;
    let aimScroll = 0;

    const changeScroll = function () {
      bodyTag.style.height = mainTag.offsetHeight + "px";
      currentScroll = currentScroll + (aimScroll - currentScroll) * 0.05;
      mainTag.style.top = -1 * currentScroll + "px";

      figcaptions.forEach((caption) => {
        const box = caption.getBoundingClientRect();
        const midY = box.y + box.height / 2;
        const middleScreen = window.innerHeight / 2;
        const diff = midY - middleScreen;

        const images = caption.querySelectorAll("img");
        images.forEach((image, index) => {
          const speed = index * 0.1 * 0.1;
          image.style.top = speed * diff + "px";
        });
      });

      requestAnimationFrame(changeScroll);
    };

    window.addEventListener("scroll", () => {
      aimScroll = window.pageYOffset;
    });

    changeScroll();

    let cursorCurrentX = 0;
    let cursorCurrentY = 0;
    let cursorOuterCurrentX = 0;
    let cursorOuterCurrentY = 0;
    let cursorAimX = 0;
    let cursorAimY = 0;

    const changeCursor = () => {
      cursorCurrentX = cursorCurrentX + (cursorAimX - cursorCurrentX) * 0.1;
      cursorCurrentY = cursorCurrentY + (cursorAimY - cursorCurrentY) * 0.1;

      cursor.style.left = cursorCurrentX + "px";
      cursor.style.top = cursorCurrentY + "px";

      cursorOuterCurrentX =
        cursorOuterCurrentX + (cursorAimX - cursorOuterCurrentX) * 0.05;
      cursorOuterCurrentY =
        cursorOuterCurrentY + (cursorAimY - cursorOuterCurrentY) * 0.05;

      cursorOuter.style.left = cursorOuterCurrentX + "px";
      cursorOuter.style.top = cursorOuterCurrentY + "px";

      requestAnimationFrame(changeCursor);
    };

    document.addEventListener("mousemove", (event) => {
      cursorAimX = event.pageX;
      cursorAimY = event.pageY;
    });

    changeCursor();
  }
};
runScripts();

mq.addListener(runScripts);
