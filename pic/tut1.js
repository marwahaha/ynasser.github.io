$(document).ready(function() {	
    // 3.12.12, 4.6.12, 4.8.8, 6.6.6, and rosette dual tilings 10RD and 8RD

    var canvas = new fabric.StaticCanvas('c');

    function make_regular_polygon(x,y,r,n,print_coords = false){
        var shape = "";
        
        for (i = 0; i < n; i++) {
           shape_x = x + r * Math.cos(2 * Math.PI * i / n); 
           shape_y = y + r * Math.sin(2 * Math.PI * i / n);
           if (print_coords == true){
                console.log(shape_x, shape_y)
           }
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
    var dodecagon_1 = make_regular_polygon(250,150,75,12,false);
    dodecagon_1.set({
        fill:'white',
        stroke:'green',
        angle:75
    })
    
    var triangle_1 = make_regular_polygon(132,80,23,3,true);
    triangle_1.set({
        fill:'white', 
        stroke:'green',
        angle:30
    })
    
    // I make the translational unit by cheating and overlapping pg_1 and pg_2.
    var pg_1 = new fabric.Group([dodecagon_1, triangle_1]);      
    var pg_2 = new fabric.Group([dodecagon_1, triangle_1]);
    pg_1.set({
            top:100,
            left:145,
            angle:360/12,
    })
    pg_2.set({
            top:146.7,
            left:279,
            angle:360/4
    })

    // making a stack of translational units, so I translate them horizontally ... if this library's
    // documentation wasn't impossible to read, I could have just used vectors.
    var column = new fabric.Group();
    for (var k = -3; k<7; k++){
            var temp_group = new fabric.Group([pg_1, pg_2]);      
            temp_group.set({
                left:300,
                top:-100+(146*k)
            });
            column.add(temp_group);
    }
    canvas.add(column);

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
