const navBarAnimation = (currentPage) => {
    const navElements = document.querySelectorAll(".navElements")
    const activeNavElement = document.querySelector(".navBarContent .active .navElements");
    const navBorder = document.querySelector(".navBorder");

    let colorIndex;
    let positionIndex;

    switch (currentPage) {
        case "welcome":
            colorIndex = '#2881f5';
            positionIndex = 0;
            break;
        case "scan":
            colorIndex = '#e02b2b';
            positionIndex = 1;
            break;
        case "virtual":
            colorIndex = '#29c429';
            positionIndex = 2;
            break;
        case "solve":
            colorIndex = '#e08b2b';
            positionIndex = 3;
            break;
        default:
            colorIndex = '#2881f5';
            positionIndex = 0;
            break;
    }

    for (let navElement of navElements) {
        navElement.style.color = "#8f8f8f";
    }
    activeNavElement.style.color = colorIndex;
    navBorder.style.backgroundColor = colorIndex;

    if (document.body.clientWidth > 1080) {
        navBorder.style.left = `calc((160px * ${positionIndex}) + ((100vw - 1080px) / 2))`;
    } else if (document.body.clientWidth > 768) {
        navBorder.style.left = `calc(160px * ${positionIndex})`;
    } else {
        /* left: calc(((60px + 2 * ((100vw - 240px) / 8)) * positionIndex) + ((100vw - 240px) / 8) - 5px); */
        navBorder.style.left = `calc(((60px + (25vw - 60px)) * ${positionIndex}) + (12.5vw - 35px))`;
    }

}

export default navBarAnimation;