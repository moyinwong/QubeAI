const navBarAnimation = (index) => {
    const navBorder = document.querySelector(".navBorder");

    /* left: calc(((60px + 2 * ((100vw - 240px) / 8)) * index) + ((100vw - 240px) / 8) - 5px); */
    navBorder.style.left = `calc(((60px + (25vw - 60px)) * ${index}) + (12.5vw - 35px))`;
}

export default navBarAnimation;