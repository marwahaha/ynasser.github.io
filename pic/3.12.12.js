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
    var dodecagon_1 = make_regular_polygon(250,150,75,12);
    dodecagon_1.set({
        fill:'red',
        stroke:'green',
        angle:75
    })
    
    var triangle_1 = make_regular_polygon(132,80,23,3);
    triangle_1.set({
        fill:'blue', 
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
    // Note to self: the column is actually "two columns"
    var column = new fabric.Group();
    for (var k = -3; k<7; k++){
            var temp_group_left = new fabric.Group([pg_1, pg_2]);      
            temp_group_left.set({
                left:300,
                top:-101+(146*k)
            });

            var temp_group_right = new fabric.Group([pg_1, pg_2]);       
            temp_group_right.set({
                left:425,
                top:-174+(146*k)
            });
            column.add(temp_group_left, temp_group_right);
    }
    // Finally putting everything together!
    var tiling = new fabric.Group();
    for (var j = -3; j < 4; j++){
            var tg = new fabric.Group([column]);
            tg.set({
               left:250*j,
            });
            tiling.add(tg);
    }
    canvas.add(tiling);
});
