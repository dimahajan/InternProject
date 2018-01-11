import numpy as np
import os
import operator
import numpy as np
import face_recognition
import base64
from base64 import decodestring
import random
from StringIO import StringIO
from flask import Flask, jsonify, request, redirect,render_template

# You can change this to any folder on your system
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app = Flask(__name__)

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/about', methods=['GET', 'POST'])
def about():
	return render_template('about.html')

@app.route('/share', methods=['GET', 'POST'])
def share():
    if request.method == 'GET':
	print "hii",request.form['t1']
	return ""
	

@app.route('/', methods=['GET', 'POST'])
def upload_image():
    if request.method == 'POST':
	imgPath = request.form['t1']
        if imgPath=='':
		listDup = os.listdir('static/duplicates')
        	filename = listDup[random.randint(0,len(listDup)-1)]
        	imgPath = 'static/duplicates/'+filename
        	(res1,per1,hname1) =  detect_faces_in_image(imgPath)
        	cnt = int(open("static/visit.txt").read()) 
        	return render_template('onePage.html',disp='none',visit=cnt, fname=filename.split('.')[0],res = res1 , imgpath = imgPath , per = per1 , hname = hname1) 
	data = request.form['filename'].split('#')
	if(len(data)==1):
		(imgPath,filename)=(imgPath, data[0])
		fh = StringIO()
		fh.write(str(imgPath.split(",")[1].decode('base64')))
        	(res1,per1,hname1) =  detect_faces_in_image(fh)
        	fh.close()
		cnt = int(open("static/visit.txt").read()) + 1
		open("static/visit.txt","w").write(str(cnt))
    		return render_template('onePage.html' , disp='block',visit=cnt,fname=filename.split('.')[0],res = res1 , imgpath = imgPath , per = per1 , hname = hname1) 
	else:
		cnt = int(open("static/visit.txt").read()) + 1
		(res1,filename,hname1,per1) = data
    		return render_template('share.html' ,visit=cnt,fname=filename,res = res1 , imgpath = imgPath , per = int(per1[:-1]) , hname = hname1) 
		
    else:
    	listDup = os.listdir('static/duplicates')
    	filename = listDup[random.randint(0,len(listDup)-1)]
    	imgPath = 'static/duplicates/'+filename
        (res1,per1,hname1) =  detect_faces_in_image(imgPath)
	cnt = int(open("static/visit.txt").read()) 
    	return render_template('onePage.html' ,disp='none',visit=cnt, fname=filename.split('.')[0],res = res1 , imgpath = imgPath , per = per1 , hname = hname1) 

def detect_faces_in_image(file_stream):
        fp = open("img_path.txt")
        images =[i[:-1] for i in fp.readlines()]
        fp.close()

        fp = open("faces_encoding.txt")
        known_faces = [ np.array([np.float32(i) for i in enc[1:-2].split()]) for enc in fp.readlines()]
        fp.close()

        check_image = face_recognition.load_image_file(file_stream)
        unknown_face_encoding = face_recognition.face_encodings(check_image)
	
	if unknown_face_encoding == []:
		return ("static/backgorundImg/wrong.jpg",0,'Image has no face, please retry')
	elif len(unknown_face_encoding)>1:
		return ("static/backgorundImg/wrong.jpg",0,'Image has multiple face, please select single face image')
		
        results =face_recognition.face_distance(known_faces, unknown_face_encoding[0])
        rs = results.argsort()
        return ('static/'+images[rs[0]],int(round((1-results[rs[0]])*100)),images[rs[0]].split('/')[1])

if __name__ == "__main__":
     app.run(host="192.168.15.64", port=5000, threaded=True, debug=True, ssl_context=('eigenviewcert.pem', 'eigenviewkey.pem'))
     #app.run( threaded=True, debug=True, ssl_context=('eigenviewcert.pem', 'eigenviewkey.pem'))
