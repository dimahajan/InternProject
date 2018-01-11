             var maxWidth = 300;
             var maxHeight = 300;
var setImgOP1 = function(){
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




window.fbAsyncInit = function() {
             FB.init({
                 appId: '141899236429048',
                 autoLogAppEvents: true,
                 xfbml: true,
                 version: 'v2.10'
             });
             FB.AppEvents.logPageView();
};
 (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) { return; }
                 js = d.createElement(s);
                 js.id = id;
                 js.src = "https://connect.facebook.net/en_US/sdk.js";
                 fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));
	
var Base64Binary = {
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	
	/* will return a  Uint8Array type */
	decodeArrayBuffer: function(input) {
		var bytes = (input.length/4) * 3;
		var ab = new ArrayBuffer(bytes);
		this.decode(input, ab);
		
		return ab;
	},
	
	decode: function(input, arrayBuffer) {
		//get last chars to see if are valid
		var lkey1 = this._keyStr.indexOf(input.charAt(input.length-1));		 
		var lkey2 = this._keyStr.indexOf(input.charAt(input.length-2));		 
	
		var bytes = (input.length/4) * 3;
		if (lkey1 == 64) bytes--; //padding chars, so skip
		if (lkey2 == 64) bytes--; //padding chars, so skip
		
		var uarray;
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		var j = 0;
		
		if (arrayBuffer)
			uarray = new Uint8Array(arrayBuffer);
		else
			uarray = new Uint8Array(bytes);
		
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		
		for (i=0; i<bytes; i+=3) {	
			//get the 3 octects in 4 ascii chars
			enc1 = this._keyStr.indexOf(input.charAt(j++));
			enc2 = this._keyStr.indexOf(input.charAt(j++));
			enc3 = this._keyStr.indexOf(input.charAt(j++));
			enc4 = this._keyStr.indexOf(input.charAt(j++));
	
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
	
			uarray[i] = chr1;			
			if (enc3 != 64) uarray[i+1] = chr2;
			if (enc4 != 64) uarray[i+2] = chr3;
		}
	
		return uarray;	
	}
}


if ( XMLHttpRequest.prototype.sendAsBinary === undefined ) {
    XMLHttpRequest.prototype.sendAsBinary = function(string) {
        var bytes = Array.prototype.map.call(string, function(c) {
            return c.charCodeAt(0) & 0xff;
        });
        this.send(new Uint8Array(bytes).buffer);
    };
};

function postImageToFacebook( authToken, filename, mimeType, imageData, message )
{
    // this is the multipart/form-data boundary we'll use
    var boundary = '----ThisIsTheBoundary1234567890';
    // let's encode our image file, which is contained in the var
    var formData = '--' + boundary + '\r\n'
    formData += 'Content-Disposition: form-data; name="source"; filename="' + filename + '"\r\n';
    formData += 'Content-Type: ' + mimeType + '\r\n\r\n';
    for ( var i = 0; i < imageData.length; ++i )
    {
        formData += String.fromCharCode( imageData[ i ] & 0xff );
    }
    formData += '\r\n';
    formData += '--' + boundary + '\r\n';
    formData += 'Content-Disposition: form-data; name="message"\r\n\r\n';
    formData += message + '\r\n'
    formData += '--' + boundary + '--\r\n';

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'https://graph.facebook.com/me/photos?access_token=' + authToken, true );
    xhr.onload = xhr.onerror = function() {
        console.log( xhr.responseText );
	document.getElementById("form").submit();
    };
    xhr.setRequestHeader( "Content-Type", "multipart/form-data; boundary=" + boundary );
    xhr.sendAsBinary( formData );
};

function submitAndShare() {
	 window.scrollTo(0,document.body.scrollTop);
        var node= document.getElementById('pad');
        html2canvas(node, {
                  onrendered: function (canvas) {
                        var data = canvas.toDataURL("image/png");
        var encodedPng = data.substring(data.indexOf(',') + 1, data.length);
        var decodedPng = Base64Binary.decode(encodedPng);
        FB.getLoginStatus(function(response) {
          if (response.status === "connected") {
                postImageToFacebook(response.authResponse.accessToken, "Judwa2", "image/png", decodedPng, window.location.href);
          } else if (response.status === "not_authorized") {
                 FB.login(function(response) {
                        postImageToFacebook(response.authResponse.accessToken, "Judwa2", "image/png", decodedPng, window.location.href);
                 }, {scope: "publish_actions"});
          } else {
                 FB.login(function(response)  {
			if(response.authResponse!=null)
                        	postImageToFacebook(response.authResponse.accessToken, "Judwa2", "image/png", decodedPng, window.location.href);
                 }, {scope: "publish_actions"});
          }
});
                  }
        });
	
}
