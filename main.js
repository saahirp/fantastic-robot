img = "";
status = "";
objects = [];
variable1 = ""; 
function preload(){
    img = loadImage('babyimg.jpg');
    audio = "alert_alert.mp3"
}

function setup(){
    canvas = createCanvas(360, 240);
    canvas.center();
    img = "babyimg.jpg";
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Currently Detecting Human/s";
    audio.play();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}
function draw(){
    image(img, 0, 0, 360, 240);
    if(status != ""){
        red = random(255);
        green = random(255);
        blue = random(255);
        objectDetector.detect(video, gotResult);
        for (i=0; i < objects.length; i++){
            fill(red, green, blue);
            amount = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + amount + "%" + objects[i].x +15, objects[i].y + 15);
            noFill();
            stroke(red, green, blue);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == "person"){
                document.getElementById("status").innerHTML = "Baby Detected";
                audio.stop();
            } else {
                document.getElementById("status").innerHTML = "Baby Not Detected";
                audio.play();  
            }
            if(objects.length < 0){
                document.getElementById("status").innerHTML = "Baby Not Detected";
                audio.play();
            }
        }
    }
}
function modelLoaded(){
    console.log("Model Loaded");
    status = "true";
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
    objects[0].label;
    objects[0].height;
    objects[0].width;
}