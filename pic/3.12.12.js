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
    // http://math.stackexchange.com/questions/64823/how-to-find-the-third-coordinate-of-a-right-triangle-given-2-coordinates-and-len
    function determine_midpoints(x,y,r,n,theta){
            // This function works similar to make_regular_polygons.
            // Recall that if P and Q are two points, then l(t)=P+t(Q-P) is the line segment beginning at P
            // and ending at Q if we restrict t>=0. If we want the midpoint, then for each point we generate,
            // we calculate [(p_x-q_x)/2, (p_y-q_y)/2]
            // It returns a list of coordinates which represent midpoints.
            //
            // Algorithm:
            //  p0
            //  |
            //  |
            //  p2 (p2 is the midpoint)
            //  |\
            //  |b\
            //  |  \
            // A|   \C
            //  |    \
            //  |c___a\
            // p1  B   p3
            //
            // coordinates of pn are (x_n,y_n)
            // slope of A is m_A = (y_2-y1)/(x_2-x_1)
            // slope of B is m_B = -1/m_A = (x_2-x_1)/(y_2-y_1)
            // then p_3 = p_1 +- B[(1/sqrt(1+m_B*m_B),(m_B/sqrt(1+m_B^2)]


            // Step 1: find one midpoint and its friend coord
            var p0_x = x + r * 1; 
            var p0_y = 0;
            console.log("p0");
            console.log([p0_x,p0_y]);
           
            var p1_x = x + r * Math.cos(2 * Math.PI * 1 / n); 
            var p1_y = y + r * Math.sin(2 * Math.PI * 1 / n);
            console.log("p1");
            console.log([p1_x,p1_y])

            var p2_x = (p1_x-p0_x)/2;
            var p2_y = (p1_y-p0_y)/2;
            console.log("p2");
            console.log([p2_x,p2_y])

            var m_A = (p2_y-p1_y)/(p2_x-p1_x);
            var m_B = -1/m_A;
            console.log("m_A: " + m_A);
            console.log("m_B: " + m_B);
        
            var p2_p1_length = Math.sqrt(Math.pow(p2_x-p1_x,2) + Math.pow(p2_y-p1_y,2))

            // B = a tan theta
            var B = p2_p1_length * Math.tan(theta);

            var p3_x = p1_x + B*(1/Math.sqrt(1+Math.pow(m_B,2))); // I hope it is + signs ... 
            var p3_y = p1_y + B*(m_B/Math.sqrt(1+Math.pow(m_B,2)));

            return [p3_x, p3_y];
    }
   
    var happy_point = determine_midpoints(250,150,75,12,30);
    console.log(happy_point);

    var circle = new fabric.Circle({
            radius:10,
            fill:'red',
            left:100,//happy_point[0],
            top:100,//happy_point[1]
    })

    // 3.12.12
    var dodecagon = make_regular_polygon(250,150,75,12);
    dodecagon.set({
        fill:'white',
        stroke:'green',
        angle:75
    })
    
    var triangle = make_regular_polygon(132,80,23,3);
    triangle.set({
        fill:'white', 
        stroke:'green',
        angle:30
    })
    
    // I make the translational unit by cheating and overlapping pg_1 and pg_2.
    var pg_1 = new fabric.Group([dodecagon, triangle]);      
    var pg_2 = new fabric.Group([dodecagon, triangle]);
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
    
    //canvas.add(pg_1);
    canvas.add(circle);
    //canvas.add(pg_2);
    // Everything past this line is concerned with tiling the plane, not PIC.
    /**
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
    **/
});
