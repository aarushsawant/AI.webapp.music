song1="";
song2="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreleftwrist=0;
song1status="";
song2status="";
scorerightwrist=0;
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotposes);
}

function draw()
{
    image(video,0,0,600,500);
    song1status=song1.isPlaying();
    song2status=song2.isPlaying();
    fill("red");
    stroke("red");
    
    if(scoreleftwrist>0.2)
    {
    circle(leftwristx,leftwristy,20)
     song1.stop();
     if(song2status==false)
     {
        song2.play()
        document.getElementById("song").innerHTML="playing heat waves"
     }
    }

    if(scorerightwrist>0.2)
    {
    circle(rightwristx,rightwristy,20)
     song2.stop();
     if(song1status==false)
     {
        song1.play()
        document.getElementById("song").innerHTML="playing enemy"
     }
    }
}

function preload()
{
    song1=loadSound("music1.mp3");
    song2=loadSound("music2.mp3");
}

function music()
{
    song.play()
    song.setVolume(1);
    song.rate(1);
}

function modelloaded()
{
    console.log("HELLO");
}

function gotposes(results)
{
    if(results.length>0)
    {
        console.log(results);
        rightwristx=results[0].pose.rightWrist.x;
        rightwristy=results[0].pose.rightWrist.y;
        leftwristx=results[0].pose.leftWrist.x;
        leftwristy=results[0].pose.leftWrist.y;

        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;

    }
}