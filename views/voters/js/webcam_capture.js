/* JS comes here */
(function() {

    var width = 400; // We will scale the photo width to this
    var height = 0; // This will be computed based on the input stream

    var streaming = false;

    var video = null;
    var canvas = null;
    var photo = null;
    var startbutton = null;

    var trigger = false; 
    var cleared = false;

    var fullPhoto = null;
    function startup() {
        video = document.getElementById('video');
        canvas = document.getElementById('canvas');
        photo = document.getElementById('photo');
        startbutton = document.getElementById('startbutton');
        clearbutton = document.getElementById('clearbutton');
        sendbutton = document.getElementById('sendpicture');
        navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
            })
            .then(function(stream) {
                video.srcObject = stream;
                video.play();
            })
            .catch(function(err) {
                console.log("An error occurred: " + err);
            });

        video.addEventListener('canplay', function(ev) {
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth / width);

                if (isNaN(height)) {
                    height = width / (4 / 3);
                }

                video.setAttribute('width', width);
                video.setAttribute('height', height);
                canvas.setAttribute('width', width);
                canvas.setAttribute('height', height);
                streaming = true;
            }
        }, false);

        startbutton.addEventListener('click', function(ev) {
            takepicture();
            ev.preventDefault();
        }, false);

        clearbutton.addEventListener('click',function(ev){
            clearphoto();
            ev.preventDefault();
        },false);

        sendbutton.addEventListener('click',function(ev){
            if(trigger && !cleared)
            {
                uploadPhoto();
            }
            else 
                alert("Photo Not Uploaded");
            ev.preventDefault();
        },false);
    }

    function uploadPhoto()
    {
        var message = document.getElementById('message');
        message.innerHTML = "Processing...";
        var xhr = new XMLHttpRequest();
        var url = "/voters/upload/images";
        xhr.open("POST", url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "trigger_value": trigger,
            "photo" : fullPhoto
        }));
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
        
            if (this.status == 200) {
                var data = (this.responseText).trim();
                if(data == 'x')
                    window.location = "/voters/voting";
                if(data == 'y')
                    window.location = "/";
            }
        };
    }

    function clearphoto() {
        cleared = true;
        var context = canvas.getContext('2d');
        context.fillStyle = "#AAA";
        context.fillRect(0, 0, canvas.width, canvas.height);

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function takepicture() {
        trigger = true;
        cleared = false;
        var context = canvas.getContext('2d');
        if (width && height) {
            canvas.width = width;
            canvas.height = height;
            context.drawImage(video, 0, 0, width, height);
            var data = canvas.toDataURL('image/png');
            photo.setAttribute('src', data);
            console.log(data);
            fullPhoto = data;
        } else {
            clearphoto();
        }
    }

    window.addEventListener('load', startup, false);
})();