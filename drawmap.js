var Umo = require('./umo.js');
module.exports = function drawmap(mplanets, mstations,scale,xx,yy, px, py, radar, mships){//scale of -1 indicates autozoom?  xx,yy are screen coords
    var i = mplanets.length; //px, py are perspective x and y
    var x = 0;
    var y = 0;
    var size = 1;
    var xzoombox = canvas.width/scale;
    var yzoombox = canvas.height/scale
    context.beginPath(); //drawing yellowrectangle centered on x,y indicating zoom scale
    context.rect(xx-xzoombox/2,yy-yzoombox/2, xzoombox, yzoombox); //2*this.s wide
    context.lineWidth = 1; 
    context.strokeStyle = "yellow";
    context.stroke();	
    context.beginPath();//drawing red circle indicating radar range
    context.strokeStyle = "red"; 
    context.arc(xx, yy, radar/scale, 0, 2 * Math.PI, false); 
    context.lineWidth = 1; 
    context.stroke();	//ok now actually draw it.	
    
    while (i>0){
        i = i-1;
        x = xx + mplanets[i].x/scale - px/scale ;
        y = yy + mplanets[i].y/scale - py/scale;
        size = 1+ Math.floor(mplanets[i].s/scale);
        context.beginPath();
        context.strokeStyle = mplanets[i].c; //drawing planet
        context.arc(x, y, size, 0, 2 * Math.PI, false); 
        context.lineWidth = 1; 
        context.stroke();	//ok now actually draw it.	
        if (mplanets[i].parentid == 0){//If planet
            oradius = mplanets[0].distance(mplanets[i])/scale;
            context.beginPath();
            context.strokeStyle = "darkslategrey"; //drawing faint orbit radius
            context.arc(xx-px/scale, yy-py/scale, oradius, 0, 2 * Math.PI, false); 
            context.lineWidth = 1; 
            context.stroke();	//ok now actually draw it.	
            }
        }
    var i = mstations.length; //px, py are perspective x and y
    var x = 0;
    var y = 0;
    var size = 1;
    while (i>0){
        i = i-1;
        x = xx + mstations[i].x/scale - px/scale ;
        y = yy + mstations[i].y/scale - py/scale;
        size = 1+ Math.floor(mstations[i].s/scale);
        context.fillStyle = mstations[i].c; 
        context.fillRect(x, y, 4, 4); 
        context.fill();
        }
    var i = mships.length; //px, py are perspective x and y
    var x = 0;
    var y = 0;
    var size = 1;
    while (i>0){
        i = i-1;
        if (mships[i].distance(mships[0])<radar){
            x = xx + mships[i].x/scale - px/scale ;
            y = yy + mships[i].y/scale - py/scale;
            size = 1+ Math.floor(mships[i].s/scale);
            //context.fillStyle = mships[i].c; 
            if (mships[i].ai == "enemy"){context.fillStyle = "red";} 
            else if (mships[i].ai == "trader"){context.fillStyle = "blue";} 
            else {context.fillStyle = "white";} 
            context.fillRect(x, y, 3, 3); 
            context.fill();
            }
        }
    
    }
//drawmap(planets,1000,canvas.width/2,200);//scale of -1 indicates autozoom?  xx,yy are screen coords