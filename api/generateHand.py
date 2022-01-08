from collections import Counter
from random import shuffle, choice
LETTERS = list('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
COUNT = [9,2,2,4,12,2,3,2,9,2,2,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1]
valuedict={"A":1,"B":3,"C":3,"D":2,"E":1,"F":4,"G":2,"H":4,"I":1,"J":8,"K":5,"L":1,
"M":3,"N":1,"O":1,"P":3,"Q":10,"R":1,"S":1,"T":1,"U":1,"V":4,"W":4,"X":8,"Y":4,"Z":10
}
bag = list(Counter(dict(zip(LETTERS,COUNT))).elements())
shuffle(bag)
def drawHand():
    hand={}
    vals={}
    for i in range(0,8):
        temp=choice(bag)
        hand[temp] = hand.get(temp,0)+1
        vals[temp] = valuedict[temp]
    return [hand,vals]