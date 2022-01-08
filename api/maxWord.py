from wordCheck import word_check
def check_max_score(cursor, hand):
    regex="^["
    for val in hand:
        regex+=str(val)
    regex+="]+$"
    query="SELECT * from dictionary\n" \
          "WHERE Word RLIKE '{}'\n"\
          "ORDER BY Value DESC".format(regex)
    cursor.execute(query)
    result = cursor.fetchall()
    index = 0
    found = False
    while not found:
        if word_check(result[index][0],hand):
            return list(result[index])
            found = True
        else:
            index+=1
    return