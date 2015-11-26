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

    function determine_vertices(x,y,r,n){
        var vertices = [];
        for (i = 0; i < n; i++) {
                tmp_x = x + r * Math.cos(2 * Math.PI * i / n); 
                tmp_y = y + r * Math.sin(2 * Math.PI * i / n);

                vertices.push([tmp_x, tmp_y]);
        }
        return vertices;
    }

    function determine_midpoints(vertices){
            var midpoints = [];
            var l = vertices.length
            for(var v = 0; v < l; v++){
                tmp_x = (vertices[v%l][0] + vertices[(v+1)%l][0])/2
                tmp_y = (vertices[v%l][1] + vertices[(v+1)%l][1])/2

                midpoints.push([tmp_x, tmp_y])
            }
            return midpoints;
    }

    var theta = 90;
    var angle = (360 - theta) * (Math.PI/180);
    var vertices = determine_vertices(250,150,75,12);
    var midpoints = determine_midpoints(vertices);

    p_1 = vertices[0]
    m_1 = midpoints[0]

    var n_1_x = Math.cos(angle) * (p_1[0] - m_1[0]) - Math.sin(angle) * (p_1[1] - m_1[1]) + m_1[0];
    var n_1_y = Math.sin(angle) * (p_1[0] - m_1[0]) + Math.cos(angle) * (p_1[1] - m_1[1]) + m_1[1];

     

    //var n_1_x = Math.cos(theta)*(p_1[0]-m_1[0])-Math.sin(theta)*(p_1[1]-m_1[1])+m_1[0];
    //var n_1_y = Math.sin(theta)*(p_1[0]-m_1[1])+Math.cos(theta)*(p_1[1]-m_1[1])+m_1[1];
    var n_1 = [n_1_x, n_1_y];
    console.log("n_1: " + n_1);
    
    var m_1_circle = new fabric.Circle({
            radius:4,
            fill:'red',
            left:m_1[0],
            top:m_1[1]
    })
    
    var p_1_circle = new fabric.Circle({
            radius:4,
            fill:'black',
            left:p_1[0],
            top:p_1[1]
    })
    
    var n_1_circle = new fabric.Circle({
            radius:4,
            fill:'black',
            left:n_1[0],
            top:n_1[1]
    })
    
    // 3.12.12
    var dodecagon = make_regular_polygon(250,150,75,12);
    dodecagon.set({
        fill:'white',
        stroke:'green',
    })
    
    var triangle = make_regular_polygon(132,80,23,3);
    triangle.set({
        fill:'white', 
        stroke:'green',
    })
   /** 
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
    **/
    canvas.add(dodecagon);
    canvas.add(p_1_circle);
    canvas.add(m_1_circle);
    canvas.add(n_1_circle);
    //canvas.add(circle);
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
