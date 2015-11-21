$(document).ready(function() {	
    // 3.12.12, 4.6.12, 4.8.8, 6.6.6, and rosette dual tilings 10RD and 8RD

    var canvas = new fabric.StaticCanvas('c');

	var rect = new fabric.Rect({
          left: 100,
          top: 100,
          fill: 'red',
          width: 20,
          height: 20,
          angle:45
    });

    function make_regular_polygon(x,y,r,n){
        var shape = "";
        
        for (i = 0; i < n; i++) {
           shape_x = x + r * Math.cos(2 * Math.PI * i / n); 
           shape_y = y + r * Math.sin(2 * Math.PI * i / n);
           
           if (i==n-1){
               shape = shape + " " + shape_x + " " + shape_y + " z";
           } else {
               shape = shape + " " + shape_x + " " + shape_y + " L ";
           }
        }
        var path = new fabric.Path("M " + shape);
        return path;
    }
    
    // 3.12.12
    var dodecagon_1 = make_regular_polygon(250,150,75,12);
    dodecagon_1.set({
        fill:'red',
        stroke:'green',
        angle:75
    })
    //canvas.add(dodecagon_1);
    
    var dodecagon_2 = make_regular_polygon(175.5,24.5,75,12);
    dodecagon_2.set({
        fill:'blue',
        stroke:'green',
        angle:75
    })
    //canvas.add(dodecagon_2);
    
    var triangle = make_regular_polygon(132,80,23,3);
    triangle.set({
        fill:'black', 
        stroke:'green',
        angle:30
    })
    //canvas.add(triangle);
    //var pg = new fabric.Group([dodecagon_1, dodecagon_2, triangle]);      
    //pg.setCoords();
    //canvas.add(pg);
    for (var k = -3; k<7; k++){
    for (var j = -3; j<7; j++){
        var pg = new fabric.Group([dodecagon_1, dodecagon_2, triangle]);      
        pg.set({
            left:140+(145*j),
            top:-100+(250*k)
        });
        canvas.add(pg);
    }
    }
    /**for(p=-1;p<6;p++){
        for(q=0;q<6;q++){
            var dodecagon_1 = make_regular_polygon(250+145.5*p,220+148*q,75,12);
            dodecagon_1.set({
                fill:'red',
                stroke:'green',
                angle:75
            })
            canvas.add(dodecagon_1);
    
            var dodecagon_2 = make_regular_polygon(175.5+145.5*p,24.5,75,12);
            dodecagon_2.set({
                fill:'blue',
                stroke:'green',
                angle:75
            })
            canvas.add(dodecagon_2);
            
            var triangle = make_regular_polygon(132+145.5*p,80,23,3);
            triangle.set({
                fill:'black', 
                stroke:'green',
                angle:30
            })
            canvas.add(triangle);
        }
    }**/
  
    // 3^6
    /**
    for(l = 0;l < 6; l++){
        for(j = 0;j<6; j++){
            for(k=0;k<5;k++){
                 
                var triangle = make_regular_polygon(224*j,130.5*l,75,3);
                triangle.set({
                    fill:'white', 
                    stroke:'green',
                    transformMatrix:[1,0,0,1,0,0], 
                    angle:(k*60),
                    //stroke-width:"6"
                });
                canvas.add(triangle);
                
            }
        }
    }
    **/

});
