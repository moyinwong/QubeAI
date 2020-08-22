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
        navBorder.style.left = `calc((160px * (${positionIndex} - 3.375)) + 50vw)`;
    } else if (document.body.clientWidth > 768) {
        navBorder.style.left = `calc(160px * ${positionIndex})`;
    } else {
        /* left: calc(((60px + 2 * ((100vw - 180px) / 6)) * ${positionIndex}) + ((100vw - 180px) / 6) - 5px); */
        navBorder.style.left = `calc(((100vw / 3) * (${positionIndex} + 0.5)) - 35px)`;
    }

}

export default navBarAnimation;