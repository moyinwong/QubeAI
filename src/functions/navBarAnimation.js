const navBarAnimation = (page) => {
    const navBorder = document.querySelector(".navBorder");

    switch (page) {
        case "welcome":
            /* left: calc(((60px + 2 * ((100vw - 240px) / 8)) * 0) + ((100vw - 240px) / 8) - 5px); */
            navBorder.style.left = "calc(((60px + (25vw - 60px)) * 0) + (12.5vw - 35px))";
            break;
        case "scan":
            navBorder.style.left = "calc(((60px + (25vw - 60px)) * 1) + (12.5vw - 35px))";
            break;
        case "virtual":
            navBorder.style.left = "calc(((60px + (25vw - 60px)) * 2) + (12.5vw - 35px))";
            break;
        case "solve":
            navBorder.style.left = "calc(((60px + (25vw - 60px)) * 3) + (12.5vw - 35px))";
            break;
    }
}

export default navBarAnimation;