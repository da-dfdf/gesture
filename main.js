nose_x = 0;
nose_y = 0;
difference = 0;
left_wrist_x = 0;
right_wrist_x = 0;


function setup(){
    canvas = createCanvas(550,550);
    canvas.position(1000,150);

    video = createCapture(VIDEO);
    video.size(550,500);
    video.position(300,200);
    
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);

}

function modelLoaded(){
    console.log("model loaded");
}

function gotPoses(results){
   if (results.length > 0){
     console.log(results);
     nose_x = results[0].pose.nose.x;
     nose_y = results[0].pose.nose.y;

    console.log("nose:" + nose_x, nose_y);

    left_wrist_x = results[0].pose.leftWrist.x;
    right_wrist_x = results[0].pose.rightWrist.x;

    difference = floor(left_wrist_x - right_wrist_x);

    console.log("difference: " + difference);
   }
}

function draw(){
    background('grey');
    document.getElementById("square_size").innerHTML = "Size of the square is " + difference + "px";
    square(nose_x, nose_y, difference);
    stroke("orange");
    fill("orange");
}