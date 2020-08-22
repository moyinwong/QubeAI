const showModalBox = (currentState) => {
    const modalBox = document.querySelector(".modalBox");
    const modalBoxContent = document.querySelector(".modalBoxContent");
    const modalScanSuccessfully = document.querySelector("#modalScanSuccessfully");
    const modalPleaseScan = document.querySelector("#modalPleaseScan");
    const modalNotSupported = document.querySelector("#modalNotSupported");
    const modalInvalid = document.querySelector("#modalInvalid");
    const modalSolved = document.querySelector("#modalSolved");

    modalBox.style.display = "flex";
    modalBoxContent.style.display = "flex";

    switch (currentState) {
        case "scanSuccessfully":
            modalBoxContent.style.height = "30vh";
            modalScanSuccessfully.style.display = "flex";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            modalInvalid.style.display = "none";
            modalSolved.style.display = "none";
            break;
        case "pleaseScan":
            modalBoxContent.style.height = "25vh";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "flex";
            modalNotSupported.style.display = "none";
            modalInvalid.style.display = "none";
            modalSolved.style.display = "none";
            break;
        case "notSupported":
            modalBoxContent.style.height = "40vh";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "flex";
            modalInvalid.style.display = "none";
            modalSolved.style.display = "none";
            break;
        case "invalid":
            modalBoxContent.style.height = "40vh";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            modalInvalid.style.display = "flex";
            modalSolved.style.display = "none";
            break;
        case "solved":
            modalBoxContent.style.height = "35vh";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            modalInvalid.style.display = "none";
            modalSolved.style.display = "flex";
            break;
        case "none":
            modalBox.style.display = "none";
            modalBoxContent.style.display = "none";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            modalSolved.style.display = "none";
            break;
        default:
            modalBox.style.display = "none";
            modalBoxContent.style.display = "none";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            modalSolved.style.display = "none";
            break;
    }

}

export default showModalBox;