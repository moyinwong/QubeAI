const showModalBox = (currentStage) => {
    const modalBox = document.querySelector(".modalBox");
    const modalBoxContent = document.querySelector(".modalBoxContent");
    const modalScanSuccessfully = document.querySelector("#modalScanSuccessfully");
    const modalPleaseScan = document.querySelector("#modalPleaseScan");
    const modalNotSubmitted = document.querySelector("#modalNotSubmitted");

    modalBox.style.display = "flex";
    modalBoxContent.style.display = "flex";

    switch (currentStage) {
        case "scanSuccessfully":
            modalScanSuccessfully.style.display = "flex";
            modalPleaseScan.style.display = "none";
            modalNotSubmitted.style.display = "none";
            break;
        case "pleaseScan":
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "flex";
            modalNotSubmitted.style.display = "none";
            break;
        case "notSubmitted":
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSubmitted.style.display = "flex";
            break;
        default:
            modalBox.style.display = "none";
            modalBoxContent.style.display = "none";
            modalScanSuccessfully.style.display = "none";
            modalPleaseScan.style.display = "none";
            modalNotSubmitted.style.display = "none";
            break;
    }

}

export default showModalBox;