const showModalBox = (currentState) => {
    const modalBox = document.querySelector(".modalBox");
    const modalBoxContent = document.querySelector(".modalBoxContent");
    const modalScanSuccessfully = document.querySelector("#modalScanSuccessfully");
    const modalPleaseScan = document.querySelector("#modalPleaseScan");
    const modalNotSupported = document.querySelector("#modalNotSupported");

    modalBox.style.display = "flex";
    modalBoxContent.style.display = "flex";

    switch (currentState) {
        case "scanSuccessfully":
            modalScanSuccessfully.style.display = "flex";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            break;
        case "pleaseScan":
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "flex";
            modalNotSupported.style.display = "none";
            break;
        case "notSupported":
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "flex";
            break;
        case "none":
            modalBox.style.display = "none";
            modalBoxContent.style.display = "none";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            break;
        default:
            modalBox.style.display = "none";
            modalBoxContent.style.display = "none";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSupported.style.display = "none";
            break;
    }

}

export default showModalBox;