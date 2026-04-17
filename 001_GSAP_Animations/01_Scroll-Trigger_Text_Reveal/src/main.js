    import gsap from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";

    gsap.registerPlugin(ScrollTrigger);

    let main = document.querySelector("main");
    let p = document.querySelector("p");

    let sentence = p.textContent;

    let letters = sentence.split("");

    let clutter = ``;

    letters.forEach((element) => {
        clutter += `<span>${element}</span>`;
    });
    p.innerHTML = clutter;
    const sec = document.querySelector("section");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: "+=100%",
            scrub: 0.3,
            pin: true,
        },
    });

    tl.to("p span", {
        opacity: 1,
        stagger: 0.03,
    });
