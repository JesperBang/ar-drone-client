//Require
var arDrone = require('ar-drone');
var keypress = require('keypress');

//ar client
var client  = arDrone.createClient({frameRate:25 ,imageSize:"240x140"});

//Http stream
require('ar-drone-png-stream')(client, {port:8004})

//variables
var flying = new Boolean(false);
var enginepower = 0.30;
//var pngStream = client.getPngStream();


//Drone sensor data
//client.on('navdata', console.log);

//Drone png stream from head camera
//client.config('video:video_channel', 0);
//pngStream.on('data', console.log);


// make `process.stdin` begin emitting "keypress" events 
keypress(process.stdin);

//formating
function formnum(x) {
    return Number.parseFloat(x).toFixed(2);
  }

// listen for the "keypress" event 
process.stdin.on('keypress', function (ch, key) {
    
    //toggle takeoff and landing by esc key
    if(key.name == 'escape'){
        if(flying == false){
            client.takeoff();
            flying = true;
            console.log("takeoff");
        }else{
            client.land();
            flying = false;
            console.log("landing");
        }
    }

    //Default engine power 30%
    //increment engine power by 1% increments
    if(key.name == 'pageup' && enginepower<1){
        enginepower += 0.01;
        console.log("engine power set to: ", formnum(enginepower*100), "%");
    }
    //decrease engine power by 1% 
    if(key.name == 'pagedown' && enginepower>0.05){
        enginepower -= 0.01;
        console.log("engine power set to: ", formnum(enginepower*100), "%");
    }

    //console.log(formnum(enginepower*100)/100);
    //Fly forward
    if(key.name == 'w'){
        //client.front(formnum(enginepower));
        client.front(enginepower);
        console.log("Fly forward with ", formnum(enginepower*100), "% engine power");

        //making sure that if w is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //Fly backwards
    if(key.name == 's'){
        //client.back(formnum(enginepower));
        client.back(enginepower);
        console.log("Fly backwards with ", formnum(enginepower*100), "% engine power");

        //making sure that if s is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //Fly left
    if(key.name == 'a'){
        //client.left(formnum(enginepower));
        client.left(enginepower);
        console.log("Fly left with ", formnum(enginepower*100), "% engine power");

        //making sure that if a is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //Fly right
    if(key.name == 'd'){
        //client.right(formnum(enginepower));
        client.right(enginepower);
        console.log("Fly right with ", formnum(enginepower*100), "% engine power");

        //making sure that if d is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //Rotation right
    if(key.name == 'e'){
        //client.clockwise(formnum(enginepower));
        client.clockwise(enginepower);
        console.log("Rotate right with ", formnum(enginepower*100), "% engine power");

        //making sure that if e is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //Rotation left
    if(key.name == 'q'){
        //client.counterClockwise(formnum(enginepower));
        client.counterClockwise(enginepower);
        console.log("Rotate left with ", formnum(enginepower*100), "% engine power");

        //making sure that if q is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //Increase altitude
    if(key.name == 'up'){
        //client.up(formnum(enginepower));
        client.up(enginepower);
        console.log("Increase altitude with ", formnum(enginepower*100), "% engine power");

        //making sure that if arrow up is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //Decrease altitude
    if(key.name == 'down'){
        //client.down(formnum(enginepower));
        client.down(enginepower);
        console.log("Decrease altitude with ", formnum(enginepower*100), "% engine power");

        //making sure that if arrow down is no longer pressed then the drone will hover
        client.after(5, function() {
            this.stop(); 
            console.log("Hover");
        });
    }

    //KILL BUTTON
    if(key.name == 'backspace'){
        client.stop();
        client.land();
        console.log('\n     EMERGENCY STOP\nLANDING DRONE IMMEDIATELY\n');
        
        /*Temp use to create code error and terminate task*/
        exit();
        /*------------------------------------------------*/
    }


  //console.log(key.name);
  if (key && key.ctrl && key.name == 'c') {
    process.stdin.pause();
  }
});

process.stdin.setRawMode(true);
process.stdin.resume();
