	var setImgOP1 = function(){ 
 	     var maxWidth = document.getElementById("dd").clientWidth -5;
 	     var maxHeight = document.getElementById("dd").clientHeight-5;
	     var width = document.getElementById("output_image").naturalWidth;
	     var height = document.getElementById("output_image").naturalHeight;
             if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
             }else {
                    width *= maxHeight / height;
                    height = maxHeight;
            }
             document.getElementById("output_image").style.width=width.toString()+"px";
	     document.getElementById("output_image").style.height=height.toString()+"px";
       }
       var setImgOP2 = function(){ 
 	     var maxWidth = document.getElementById("d2").clientWidth -5;
 	     var maxHeight = document.getElementById("d2").clientHeight-5;
	     var width = document.getElementById("op").naturalWidth;
             var height = document.getElementById("op").naturalHeight;
             if (width > height) {
                    height *= maxWidth / width;
                    width = maxWidth;
             }else {
                    width *= maxHeight / height;
                    height = maxHeight;
            }
             document.getElementById("op").style.width=width.toString()+"px";
             document.getElementById("op").style.height=height.toString()+"px";
 
	};
	var f = 0 ; flag = 0; 
	var MAX_WIDTH = 800;
        var MAX_HEIGHT = 800;
	var formSubmit = function(){
		setImgOP1();
		if(f==1){
			document.getElementById('form').submit();	
		}
	}
	
	document.onreadystatechange=function() {
		$('[data-toggle="tooltip"]').tooltip(); 
       	      var holder = document.getElementById('holder');
              holder.ondragover = function () { this.className = 'hover'; return false; };    
              holder.ondrop = drop;
              function drop(e) {
                e.preventDefault();
                var file = e.dataTransfer.files[0];
		var reader = new FileReader();
                reader.onload = function () {

                        var img = document.createElement("IMG");
                        img.src = reader.result;
			img.onload=function(){ 
                        var width = img.width;
                        var height = img.height;

                        if (width > height) {
                                if (width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                }
                        }else {
                                if (height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                }
                        }
                        var canvas =document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);


                       document.getElementById('fname').innerHTML =""
                       document.getElementById('hname').innerHTML="";
                       document.getElementById('pbar').innerHTML="";
                       document.getElementById('d2').style.display = 'none';
                       document.getElementById('d1').style.display = 'flex';
      		       document.getElementById('t1').value = canvas.toDataURL('image/png');
      		       document.getElementById('filename').value = file.name;
		       f = 1;
       		       document.getElementById('output_image').src=canvas.toDataURL('image/png');
		   }
                }
                reader.readAsDataURL(file);
              };
	};
        
        var load = function(event){
                var reader = new FileReader();
                reader.onload = function(){
			var img = document.createElement("IMG"); 
			img.src = reader.result;
			img.onload=function(){ 
			var width = img.width;
			var height = img.height;
 
			if (width > height) {
  				if (width > MAX_WIDTH) {
    					height *= MAX_WIDTH / width;
    					width = MAX_WIDTH;
  				}
			}else {
  				if (height > MAX_HEIGHT) {
    					width *= MAX_HEIGHT / height;
    					height = MAX_HEIGHT;
  				}
			}
			var canvas =document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			var ctx = canvas.getContext("2d");
		
			ctx.drawImage(img, 0, 0, width, height);
                       document.getElementById('d2').style.display = 'none';
                       document.getElementById('d1').style.display = 'flex';
                       document.getElementById('fname').innerHTML = document.getElementById('file1').value.split('\\')[2].split('.')[0];
      		       document.getElementById('t1').value = canvas.toDataURL('image/png');
      		       document.getElementById('filename').value = document.getElementById('fname').innerHTML; 
                       document.getElementById('hname').innerHTML="";
                       document.getElementById('pbar').innerHTML="";
	               f = 1;
                       document.getElementById('output_image').src = canvas.toDataURL('image/png');
		     }
                }
		
                reader.readAsDataURL(event.target.files[0]); 
        };

	var getUrl = function(){
                document.getElementById('output_image').src = '';
                document.getElementById('op').src = '';
                document.getElementById('output_image').style.display = 'none';
                document.getElementById('fname').innerHTML =""
                document.getElementById('hname').innerHTML =""
                document.getElementById('pbar').innerHTML="";
                document.getElementById('urlAccess').style.display = 'block';
	}	
	var fromUrl = function(){
		var res = document.getElementById('imageUrl').value;
		if(res!=null && res!=""){
                        var img = document.createElement("IMG");
			img.setAttribute('crossOrigin', 'anonymous');
			img.src = res; 
			console.log(img.src);
                        img.onload=function(){
                        var width = img.width;
                        var height = img.height;
			console.log(img.src);
                        if (width > height) {
                                if (width > MAX_WIDTH) {
                                        height *= MAX_WIDTH / width;
                                        width = MAX_WIDTH;
                                }
                        }else {
                                if (height > MAX_HEIGHT) {
                                        width *= MAX_HEIGHT / height;
                                        height = MAX_HEIGHT;
                                }
                        }
                        var canvas =document.createElement('canvas');
                        canvas.width = width;
                        canvas.height = height;
                        var ctx = canvas.getContext("2d");
                        ctx.drawImage(img, 0, 0, width, height);
                	document.getElementById('output_image').style.display = 'block';
                	document.getElementById('urlAccess').style.display = 'none';
                       document.getElementById('d2').style.display = 'none';
                       document.getElementById('d1').style.display = 'flex';
                       document.getElementById('fname').innerHTML = img.src.split("\/").pop().split(".")[0];
      		       document.getElementById('t1').value = canvas.toDataURL('image/png');
                       document.getElementById('filename').value = document.getElementById('fname').innerHTML;
                       document.getElementById('hname').innerHTML="";
                       document.getElementById('pbar').innerHTML="";
				f=1;
                       document.getElementById('output_image').src = canvas.toDataURL('image/png');
                     }
		     img.onerror = function(){
   			document.getElementById('accessError').innerHTML="Can't access the image Url";
		     }
		  }
        };


	 function takeSnapshot() {
	      var video = document.querySelector('video');
	      var context;
	      var width = video.offsetWidth
	        , height = video.offsetHeight;

	      var canvas =document.createElement('canvas');
	      canvas.width = width;
	      canvas.height = height;

	      context = canvas.getContext('2d');
	      context.translate(width, 0);
  	      context.scale(-1, 1);
	      context.drawImage(video, 0, 0, width, height);

                document.getElementById('output_image').style.display = 'block';
	        var img =  document.getElementById('output_image');
                document.getElementById('v1').style.display = 'none';
                       document.getElementById('hname').innerHTML="";
                       document.getElementById('d2').style.display = 'none';
                       document.getElementById('d1').style.display = 'flex';
      		       document.getElementById('t1').value = canvas.toDataURL('image/png');
      		       document.getElementById('filename').value = "Camera Image";
                       document.getElementById('pbar').innerHTML="";
		       f = 1;
	      	       img.src = canvas.toDataURL('image/png');
	  }

//navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
//window.URL = window.URL || window.webkitURL || window.mozURL || window.msURL;


var constraints = window.constraints = {
  audio: false,
  video: true
};


function successCallback(stream) {
	var video = document.querySelector('video');
	var videoTracks = stream.getVideoTracks();
 	console.log('Got stream with constraints:', constraints);
  	console.log('Using video device: ' + videoTracks[0].label);
  	stream.oninactive = function() {
    		console.log('Stream inactive');
  	};
  	window.stream = stream; // make variable available to browser console
	video.srcObject = stream;
	document.getElementById('camera').innerHTML="<span class=\"glyphicon glyphicon-record\"></span> Click <span class=\"badge\" id=\"s1\">5</span>";
	$('#camera').removeClass('btn-default').addClass('btn-success');

	setTimeout(function(){ 
    		document.getElementById("s1").innerHTML="4";
	}, 1000);
	setTimeout(function(){ 
    		document.getElementById("s1").innerHTML="3";
	}, 2000);
	setTimeout(function(){ 
    		document.getElementById("s1").innerHTML="2";
	}, 3000);
	setTimeout(function(){ 
    		document.getElementById("s1").innerHTML="1";
	}, 4000);
	setTimeout(function(){ 
    		document.getElementById("s1").innerHTML="0";
    		document.getElementById("camera").click();
	}, 5000);
	video.addEventListener('click', takeSnapshot);
}

function errorCallback(error) {
        console.error('An error occurred: [CODE ' + error.code + ']');
                document.getElementById('v1').style.display = 'none';
                document.getElementById('output_image').style.display = 'block';
	      	document.getElementById('output_image').src=document.getElementById('t1').value;
		document.getElementById('fname').innerHTML=document.getElementById('filename').value;	
    }


var startCamera = function(){
	if(flag == 0){
		flag = 1;	
      		document.getElementById('t1').value = document.getElementById('output_image').src;
		document.getElementById('filename').value = document.getElementById('fname').innerHTML;
                document.getElementById('output_image').src = '';
                document.getElementById('output_image').style.display = 'none';
                document.getElementById('fname').innerHTML =""
                document.getElementById('v1').style.display = 'block';
 	if (navigator.mediaDevices.getUserMedia) {
       		navigator.mediaDevices.getUserMedia(constraints).then(successCallback).catch(errorCallback);
	}else{
                	console.log('Native device media streaming (getUserMedia) not supported in this browser.');
        	}
 	}else{
		takeSnapshot();		
	}
};

function submitAndShare() {
	document.getElementById('t1').value =document.getElementById('output_image').src ;
        document.getElementById('filename').value =document.getElementById('op').src+"#"+ document.getElementById('fname').innerHTML + "#" + document.getElementById('hname').innerHTML+"#"+document.getElementById('pw').style.width;
	document.getElementById('form').submit();	
}
