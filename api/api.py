from flask import Flask, request
from generateHand import drawHand
from flask_mysqldb import MySQL
from wordCheck import word_check
from maxWord import check_max_score
import config

app = Flask(__name__)
app.config['MYSQL_HOST']=config.host
app.config['MYSQL_USER']=config.user
app.config['MYSQL_PASSWORD']=config.password
app.config['MYSQL_DB']=config.database
mysql=MySQL(app)
@app.route("/generateHand", methods=["GET"])
def generateHand():
    if request.method == "GET":
        temp=drawHand()
        return {"hand":temp[0],"vals":temp[1]}

@app.route("/getMaxWord",methods=["GET","POST"])
def getMaxWord():
    if request.method=="POST":
        temp = request.get_json()
        #tempWord=temp["word"]
        tempHand=temp["hand"]
        inputword=temp["word"].upper()
        print(temp["hand"])
        d={}
        for i in range(0,len(tempHand)):
            d[tempHand[i]]=d.get(tempHand[i],0)+1
        if word_check(inputword,d):
            cur= mysql.connection.cursor()
            max=check_max_score(cur,d)
            maxword=max[0]
            maxscore=max[1]
            cur.execute("SELECT * FROM dictionary WHERE WORD=%s",(inputword,))
            currscore=cur.fetchone()[1]
            cur.close()
            return {"maxword":maxword,"maxscore":str(maxscore),"currscore":str(currscore)}
        else:
            return {"maxword":"invalid input entered"}