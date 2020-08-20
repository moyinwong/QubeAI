const navBarAnimation = (currentPage) => {
    const navBorder = document.querySelector(".navBorder");
    let index;

    switch (currentPage) {
        case "welcome":
            index = 0;
            break;
        case "scan":
            index = 1;
            break;
        case "virtual":
            index = 2;
            break;
        case "solve":
            index = 3;
            break;
        default:
            index = 0;
            break;
    }

    /* left: calc(((60px + 2 * ((100vw - 240px) / 8)) * index) + ((100vw - 240px) / 8) - 5px); */
    navBorder.style.left = `calc(((60px + (25vw - 60px)) * ${index}) + (12.5vw - 35px))`;
}

export default navBarAnimation;