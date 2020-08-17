import numpy as np
import cv2


#use webcam
cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)
cap.set(10, 150)


#respective hsv range for each color obtained through trackbars
myColors = [[71, 129, 48, 154, 255, 213], #blue
            [4, 148, 161, 176, 201, 214], #orange
            [22, 91, 123, 39, 255, 246],  #yellow
            [176, 134, 49, 179, 255, 255], #red
            [0, 44, 134, 132, 77, 178], #white
            [45, 117, 46, 71, 255, 255]] #green


#initial state for preview sticker
state = [0, 0, 0,
         0, 0, 0,
         0, 0, 0]


#define stickers coordinate on the window of webcam
def get_sticker_coordinates(name):
    stickers = {
        'main': [
            [200, 120], [300, 120], [400, 120],
            [200, 220], [300, 220], [400, 220],
            [200, 320], [300, 320], [400, 320]
        ],
        'preview': [
            [20, 130], [54, 130], [88, 130],
            [20, 164], [54, 164], [88, 164],
            [20, 198], [54, 198], [88, 198]
        ]
    }
    return stickers[name]


#sticker
sticker = get_sticker_coordinates('main')
preview_stickers = get_sticker_coordinates('preview')


#draw stickers function
def draw_main_sticker(frame):
    for x,y in sticker:
        cv2.rectangle(frame, (x,y), (x+30,y+30), (255,255,255), 2)


def draw_preview_stickers(frame, state_of_roi):
    """Draws the 9 preview stickers in the frame."""
    for index,(x,y) in enumerate(preview_stickers):
        cv2.rectangle(frame, (x,y), (x+32, y+32), name_to_rgb(state_of_roi[index]), -1)
        
        
#convert color name to bgr value
def name_to_rgb(name):
    """
    Get the main BGR color for a name.

    :param name: the color name that is requested
    :returns: tuple
    """
    color = {
        'red'    : (0,0,255),
        'orange' : (0,165,255),
        'blue'   : (255,0,0),
        'green'  : (0,255,0),
        'white'  : (255,255,255),
        'yellow' : (0,255,255)
    }
    return color[name]


#average the value of hsv inside one sticker
def average_hsv(roi):
    h = 0
    s = 0
    v = 0
    num = 0
    for y in range(len(roi)):
        # if y % 2 == 0:
            for x in range(len(roi[y])):
                # if x % 2 == 0:
                    chunk = roi[y][x]
                    num += 1
                    h += chunk[0]
                    s += chunk[1]
                    v += chunk[2]
    h /= num
    s /= num
    v /= num
    return (int(h), int(s), int(v))

#rules for determining the color
def get_color_name(hsv):
    """ Get the name of the color based on the hue.

    :returns: string
    """
    (h,s,v) = hsv
    #print((h,s,v))
    if h < 20 and v < 100:
        return 'red'
    if h <= 10 and v > 100:
        return 'orange'
    elif h <= 30 and s <= 100:
        return 'white'
    elif h <= 40:
        return 'yellow'
    elif h <= 85:
        return 'green'
    elif h <= 130:
        return 'blue'

    return 'white'

while True:
    success, img = cap.read()
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    draw_main_sticker(img)

    for index, (x,y) in enumerate(sticker):
        roi = hsv[y:y+32, x:x+32]
        avg_hsv = average_hsv(roi)
        color_name = get_color_name(avg_hsv)
        state[index] = color_name

    draw_preview_stickers(img, state)

    cv2.imshow("Result", img)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
