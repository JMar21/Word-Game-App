def word_check(vals, hand):
    if len(vals)==0:
        return False
    temp=hand.copy()
    for val in vals:
        if temp.get(val,0) == 0:
            return False
        else:
            temp[val]-=1
    return True