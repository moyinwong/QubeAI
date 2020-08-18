import numpy as np
import cv2


#use webcam
cap = cv2.VideoCapture(0)
cap.set(3, 640)
cap.set(4, 480)
cap.set(10, 150)

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


#define stickers coordinate on the window of webcam
def get_sticker_coordinates(name):
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


#sticker
sticker = get_sticker_coordinates('main')
preview_stickers = get_sticker_coordinates('preview')
current_stickers = get_sticker_coordinates('current')

#draw stickers function
def draw_main_sticker(frame):
    for x,y in sticker:
        cv2.rectangle(frame, (x,y), (x+30,y+30), (255,255,255), 2)

def draw_current_stickers(frame, state_of_roi):
    """Draws the 9 current stickers in the frame."""
    for index,(x,y) in enumerate(current_stickers):
        cv2.rectangle(frame, (x,y), (x+32, y+32), name_to_rgb(state_of_roi[index]), -1)

def draw_preview_stickers(frame, state_of_roi):
    """Draws the 9 preview stickers in the frame."""
    for index,(x,y) in enumerate(preview_stickers):
        cv2.rectangle(frame, (x,y), (x+32, y+32), name_to_rgb(state_of_roi[index]), -1)


#average the value of hsv inside one sticker
def average_hsv(roi):
    h = 0
    s = 0
    v = 0
    num = 0
    for y in range(len(roi)):
        if y % 3 == 0:
            for x in range(len(roi[y])):
                if x % 3 == 0:
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
    if s <= 30:
        return 'white'
    elif (h < 5 ) | (h > 130 and h < 180):
        return 'red'
    elif h < 20:
        return 'orange'
    elif h <= 30 and s <= 100:
        return 'white'
    elif h <= 40:
        return 'yellow'
    elif h <= 85:
        return 'green'
    else:
        return 'blue'

def color_to_notation(color):
    """
    Return the notation from a specific color.
    We want a user to have green in front, white on top,
    which is the usual.

    :param color: the requested color
    """
    notation = {
        'green'  : 'F',
        'white'  : 'D',
        'blue'   : 'B',
        'red'    : 'L',
        'orange' : 'R',
        'yellow' : 'U'
    }
    return notation[color]

def scan():
    sides = {}

    # initial state for preview sticker
    state = [0, 0, 0,
             0, 0, 0,
             0, 0, 0]

    preview = ['white', 'white', 'white',
               'white', 'white', 'white',
               'white', 'white', 'white']

    while True:
        success, img = cap.read()
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        key = cv2.waitKey(10) & 0xff
        draw_main_sticker(img)
        draw_current_stickers(img, preview)

        for index, (x,y) in enumerate(sticker):
            roi = hsv[y:y+32, x:x+32]
            avg_hsv = average_hsv(roi)

            # print(avg_hsv)
            color_name = get_color_name(avg_hsv)
            state[index] = color_name

            # update when space bar is pressed.
            if key == 32:
                preview = list(state)
                draw_current_stickers(img, state)
                face = color_to_notation(state[4])
                # notation = [color_to_notation(color) for color in state]
                sides[face] = list(state)

        draw_preview_stickers(img, state)

        # append amount of scanned sides
        text = 'scanned sides: {}/6'.format(len(sides))
        cv2.putText(img, text, (20, 460), cv2.FONT_HERSHEY_TRIPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

        # quit on escape.
        if key == 27:
            break

        cv2.imshow("Result", img)

    cap.release()
    cv2.destroyAllWindows()
    return sides if len(sides) == 6 else False


def sides_to_notation(sides):
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

# sides for test
# sides = {'F': ['blue', 'white', 'yellow', 'green', 'green', 'yellow', 'blue', 'blue', 'red'],
#          'R': ['orange', 'yellow', 'orange', 'red', 'orange', 'white', 'blue', 'yellow', 'orange'],
#          'B': ['green', 'white', 'yellow', 'blue', 'blue', 'yellow', 'green', 'green', 'green'],
#          'L': ['red', 'blue', 'white', 'green', 'red', 'orange', 'white', 'orange', 'white'],
#          'U': ['white', 'orange', 'blue', 'red', 'yellow', 'green', 'green', 'orange', 'orange'],
#          'D': ['yellow', 'blue', 'yellow', 'red', 'white', 'red', 'red', 'white', 'red']}

all_notations = sides_to_notation(scan())
print("\n".join("{}\t{}".format(k, v) for k, v in all_notations.items()))