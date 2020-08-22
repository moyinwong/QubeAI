// set canvas height and width
const height = 480
const width = 640

// # initial state for preview sticker
let state = [0, 0, 0,
    0, 0, 0,
    0, 0, 0]

let preview = ['white', 'white', 'white',
    'white', 'white', 'white',
    'white', 'white', 'white']

//sticker coordinate
function get_sticker_coordinates(name) {
    stickers = {
        'main': [
            [200, 120], [300, 120], [400, 120],
            [200, 220], [300, 220], [400, 220],
            [200, 320], [300, 320], [400, 320]
        ],
        'preview': [
            [20, 20], [54, 20], [88, 20],
            [20, 54], [54, 54], [88, 54],
            [20, 88], [54, 88], [88, 88]
        ],
        'current': [
            [20, 130], [54, 130], [88, 130],
            [20, 164], [54, 164], [88, 164],
            [20, 198], [54, 198], [88, 198]
        ]
    }
    return stickers[name]
}

//turn color name into BGR value
function name_to_rgb(name) {
    // """
    // Get the main BGR color for a name.

    // :param name: the color name that is requested
    // :returns: tuple
    // """
    color = {
        'red': [255, 0, 0, 255],
        'orange': [255, 165, 0, 255],
        'blue': [0, 0, 255, 255],
        'green': [0, 255, 0, 255],
        'white': [255, 255, 255, 255],
        'yellow': [255, 255, 0, 255]
    }
    return color[name]
}


sticker = get_sticker_coordinates('main')
preview_stickers = get_sticker_coordinates('preview')
current_stickers = get_sticker_coordinates('current')

function draw_main_sticker(frame) {
    for (let coordinate of sticker) {
        let x = coordinate[0]
        let y = coordinate[1]
        let startPoint = new cv.Point(x, y)
        let endPoint = new cv.Point(x + 30, y + 30)
        cv.rectangle(frame, startPoint, endPoint, [255, 255, 255, 0], 2)
    }
}

function draw_current_stickers(frame, stateOfRoi) {
    for (const [index, coordinate] of current_stickers.entries()) {
        let x = coordinate[0]
        let y = coordinate[1]
        let startPoint = new cv.Point(x, y)
        let endPoint = new cv.Point(x + 32, y + 32)
        cv.rectangle(frame, startPoint, endPoint, name_to_rgb(stateOfRoi[index]), -1)
    }
}

function draw_preview_stickers(frame, stateOfRoi) {
    for (const [index, coordinate] of preview_stickers.entries()) {
        let x = coordinate[0]
        let y = coordinate[1]
        let startPoint = new cv.Point(x, y)
        let endPoint = new cv.Point(x + 32, y + 32)
        cv.rectangle(frame, startPoint, endPoint, name_to_rgb(stateOfRoi[index]), -1)
    }
}

function average_hsv(roi) {
    let h = 0
    let s = 0
    let v = 0
    let num = 0

    for (let x = 0; x < roi.length; x++) {
        if (x % 3 === 0) {
            let chunk = roi[x]
            h += chunk[0]
            s += chunk[1]
            v += chunk[2]
            num++
        }
    }
    h /= num
    s /= num
    v /= num

    return [Math.floor(h), Math.floor(s), Math.floor(v)]
}

function get_color_name(hsv) {
    // """ Get the name of the color based on the hue.

    // :returns: string
    // """
    let h, s, v
    [h, s, v] = hsv
    if (s <= 48) {
        return 'white'
    }
    else if ((h >= 120)) {
        return 'red'
    }
    else if (h <= 20) {
        return 'blue'
    }
    else if (h <= 65) {
        return 'green'
    }
    else if (h <= 100) {
        return 'yellow'
    }
    else if (h < 120) {
        return 'orange'
    }

}

function color_to_notation(color) {
    // """
    // Return the notation from a specific color.
    // We want a user to have green in front, white on top,
    // which is the usual.

    // :param color: the requested color
    // """
    notation = {
        'green': 'F',
        'white': 'D',
        'blue': 'B',
        'red': 'L',
        'orange': 'R',
        'yellow': 'U'
    }
    return notation[color]
}

function sides_to_notation(sides) {
    if (Object.keys(sides).length != 6) {
        return false
    }

    all_notations = {}

    all_notations['L'] = 'red'
    all_notations['R'] = 'orange'
    all_notations['U'] = 'yellow'
    all_notations['D'] = 'white'
    all_notations['F'] = 'green'
    all_notations['B'] = 'blue'

    all_notations['LB'] = [sides['L'][3], sides['B'][5]]
    all_notations['LF'] = [sides['L'][5], sides['F'][3]]
    all_notations['LU'] = [sides['L'][1], sides['U'][4]]
    all_notations['LD'] = [sides['L'][7], sides['D'][3]]
    all_notations['DB'] = [sides['D'][7], sides['B'][7]]
    all_notations['DF'] = [sides['D'][1], sides['F'][7]]
    all_notations['UB'] = [sides['U'][1], sides['B'][1]]
    all_notations['UF'] = [sides['U'][7], sides['F'][1]]
    all_notations['RB'] = [sides['R'][5], sides['B'][3]]
    all_notations['RF'] = [sides['R'][3], sides['F'][5]]
    all_notations['RU'] = [sides['R'][1], sides['U'][5]]
    all_notations['RD'] = [sides['R'][7], sides['D'][5]]

    all_notations['LDB'] = [sides['L'][6], sides['D'][6], sides['B'][8]]
    all_notations['LDF'] = [sides['L'][8], sides['D'][0], sides['F'][6]]
    all_notations['LUB'] = [sides['L'][0], sides['U'][0], sides['B'][2]]
    all_notations['LUF'] = [sides['L'][2], sides['U'][6], sides['F'][0]]
    all_notations['RDB'] = [sides['R'][8], sides['D'][8], sides['B'][6]]
    all_notations['RDF'] = [sides['R'][6], sides['D'][2], sides['F'][8]]
    all_notations['RUB'] = [sides['R'][2], sides['U'][2], sides['B'][0]]
    all_notations['RUF'] = [sides['R'][0], sides['U'][8], sides['F'][2]]
    return all_notations
}


function getVideo() {
    return new Promise((resolve, reject) => {
        function check() {
            let video = document.getElementById("cam_input"); // video is the id of video tag
            if (video) {
                resolve(video)
            } else {
                setTimeout(check)
            }
        }
        check()
    }) 
}

async function openCamera() {
            //let browser access webcam
            let video = await getVideo()
            // let video = document.getElementById("cam_input"); // video is the id of video tag
            async function getWebcam() {
                let stream = null;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
                    video.srcObject = stream;
                    video.play();
                } catch(err) {
                    console.log("An error occurred! " + err)
                }
            }
            getWebcam()

            let src = new cv.Mat(height, width, cv.CV_8UC4);
            let dst = new cv.Mat(height, width, cv.CV_8UC1);
            let hsv = new cv.Mat(height, width, cv.CV_8UC1);
            let hsvCopy = new cv.Mat(height, width, cv.CV_8UC1)
            let cap = new cv.VideoCapture(video);
            
            //setting fps for delaying the execution of each cv.imshow
            const FPS = 30;
    
            //initiate a sides object to store all notations in final step
            let sides = {};
            function processVideo() {
                if(!document.getElementById("cam_input")) {
                    return
                }

                let begin = Date.now();
    
                //capture each frame from the webcam
                cap.read(src);
                src.copyTo(dst);
    
                //converting original video to HSV for getting hsv value
                cv.cvtColor(dst, hsv, cv.COLOR_BGR2HSV)
    
                //draw sticker on copy version of video
                draw_main_sticker(dst)
                draw_current_stickers(dst, preview)
    
                //loop over the 9 stickers/region of interests of the frame
                for (const [index, coordinate] of sticker.entries()) {
                    let x = coordinate[0]
                    let y = coordinate[1]
    
                    let rect = new cv.Rect(x, y, 32, 32);
                    hsvCopy = hsv.roi(rect)
    
    
                    let h = []
                    let s = []
                    let v = []
                    let row = 32
                    let col = 32
                    for (let i = 0; i < row; i++) {
                        for (let y = 0; y < col; y++) {
                            let pixel = hsvCopy.ucharPtr(i, y);
                            h.push(pixel[0])
                            s.push(pixel[1])
                            v.push(pixel[2])
                        }
                    }
    
                    //getting the hsv value in the shape of a 2D array [[h,s,v], [h,s,v].....]
                    allPixels = []
                    for (let i = 0; i < h.length; i++) {
                        pixels = []
                        pixels.push(h[i])
                        pixels.push(s[i])
                        pixels.push(v[i])
                        allPixels.push(pixels)
                    }
    
                    //get average hsv
                    let avgHsv = average_hsv(allPixels)
                    let colorName = get_color_name(avgHsv)
                    state[index] = colorName
                    // if (index == 5) {
                    //     console.log(avgHsv)
                    // }
                    //scan button
                    let scanButton = document.getElementById('scan')
                    scanButton.addEventListener('click', () => {
                        preview = [...state]
                        draw_current_stickers(dst, state)
                        face = color_to_notation(state[4])
                        sides[face] = [...state]
                    })
                }
                draw_preview_stickers(dst, state)
                sidesLength = Object.keys(sides).length
    
                sidesText = document.getElementById('sidesText')
                sidesText.innerHTML = `scanned sides: ${sidesLength}/6`
    
                // cv.putText(dst, text)
                cv.imshow("canvasOutput", dst);
    
                // schedule next one.
                let delay = 1000 / FPS - (Date.now() - begin);
                setTimeout(processVideo, delay);
    
                //get all notations button
                let allNotationsButton = document.getElementById('notations')
                allNotationsButton.addEventListener('click', () => {
                    allNotations = sides_to_notation(sides)
                    // console.log(allNotations)
                    
                    // src.delete()
                    // dst.delete()
                    // hsv.delete()
                    // hsvCopy.delete()

                    sessionStorage.setItem('allNotations', JSON.stringify(allNotations));
                })
            }
            // schedule first one.
            setTimeout(processVideo, 0);
}

function openCvReady() {
    cv['onRuntimeInitialized'] = openCamera
}

