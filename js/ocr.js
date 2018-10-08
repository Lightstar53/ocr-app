var output_format = "jpg";
var myImage = document.getElementById("pic");

// Processes the image
function processImg(){
	document.getElementById("result").innerHTML= "processing...";

	var result_image = document.getElementById("result_image");
	// HERMITE.resize_image(pic, 300,300);
	Tesseract.recognize(myImage)
	//Tesseract.recognize(result_image)
    .progress(function(message){
    	//if(message.status=="recognizing text")
		//console.log('progress is: ', message)
		document.getElementById("progress").style="display: block;"
		document.getElementById("result").innerHTML = message.status;
		document.getElementById("progress").style.width = (message.progress * 100).toString() +"%";

    });

    Tesseract.recognize(myImage).then(function(result){
	//Tesseract.recognize(result_image).then(function(result){
	    console.log(result.text);
	    document.getElementById("result").innerHTML = result.text;
	    document.getElementById("progress").style="display: none;"
	    speakText();
	});

}

// Speaks
function speakText(){
	var text = document.getElementById("result").innerHTML;
	console.log("speaking text");
	responsiveVoice.speak(text);
}

// Switches the file on select
function onFileSelected(event) {
  var selectedFile = event.target.files[0];
  var reader = new FileReader();

  var imgtag = document.getElementById("pic");
  var selimg= document.getElementById("selected");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    imgtag.src = event.target.result;
    selimg.src = event.target.result;
    //encode();
  };
  reader.readAsDataURL(selectedFile);
}

function playVoice(){
	speakText();
}
function stopVoice(){
	responsiveVoice.cancel();
}
function pauseVoice(){
	responsiveVoice.pause();
}
function resumeVoice(){
	responsiveVoice.resume();
}

// Handles selection
function handleSelect(selection){
	console.log(selection);
	console.log(selection.width);
	document.getElementById("selected").width = selection.width;
	document.getElementById("selected").height = selection.height;

	document.getElementById("selected").style.width = selection.width;
	document.getElementById("selected").style.height = selection.height;
}
document.getElementById("pic").addEventListener("load", processImg);

function encode(){
	var source_image = document.getElementById('pic');
    var result_image = document.getElementById('result_image');
    if (source_image.src == "") {
        alert("You must load an image first!");
        return false;
    }

    var quality = (20);
    console.log("Quality  >>" + quality);

    console.log("process start...");
    var time_start = new Date().getTime();

    result_image.src = jic.compress(source_image,quality,output_format).src;

    result_image.onload = function(){
    	var image_width=$(result_image).width(),
        image_height=$(result_image).height();

        if(image_width > image_height){
        	result_image.style.width="320px";
        }else{
        	result_image.style.height="300px";
        }
       result_image.style.display = "block";
    }
    var duration = new Date().getTime() - time_start;

    console.log("process finished...");
    console.log('Processed in: ' + duration + 'ms');
}