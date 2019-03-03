$(document).ready(function() {	
   // praise to the calculator gods: http://www.calculatorsoup.com/calculators/geometry-plane/polygon.php 
        
   function main(){
        
        canvas.clear();
        
        var theta = document.getElementById("theta").value;
        document.getElementById("current_theta_value").innerText = theta;
        var e = document.getElementById("tiling_selection");
        var tiling = e.options[e.selectedIndex].value;
        var display_base = document.getElementById("checkbox").checked;
        
        if (display_base == true){
            var stroke_colour = "green";
        } else {
            var stroke_colour = "white";
        }

        if (tiling == "4_6_12"){
                render_4_6_12(theta, stroke_colour);//, display_base);
        } else if (tiling == "4_8_8"){
                render_4_8_8(theta, stroke_colour);
        } else if (tiling == "6_6_6"){
                render_6_6_6(theta, stroke_colour);
        } else {
                alert("Not implemented yet!");
        }
    }

    function make_regular_polygon(x,y,r,n){
        var print_coords = false;
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

    function determine_contact_points(theta, vertices, midpoints, centre, n){
       // Now that I've discovered .setAngle, I don't need this function anymore.
       // There is also the rogue slope calculation somewhere.
       var centre_x = centre[0];
       var centre_y = centre[1];
       var angle = (360-theta) * (Math.PI/180);
       var l = vertices.length;
       var contact_points = [];

       for (var i = 0; i<l; i++){
            var p1 = vertices[i%l];
            var m1 = midpoints[i%l];
    
            var n1_x = Math.cos(angle) * (p1[0] - m1[0]) - Math.sin(angle) * (p1[1] - m1[1]) + m1[0];
            var n1_y = Math.sin(angle) * (p1[0] - m1[0]) + Math.cos(angle) * (p1[1] - m1[1]) + m1[1];
            var n1 = [n1_x, n1_y];

            var l1_slope = (n1_y-m1[1])/(n1_x-m1[0]);
            var l1_b = n1_y - (l1_slope)*n1_x;
            var l1 = [l1_slope, l1_b];
            
            var l2_slope = (centre_y - p1[1])/(centre_x - p1[0]);
            var l2_b = centre_y - (l2_slope)*centre_x;
            var l2 = [l2_slope, l2_b];
                
            var px = (l2_b - l1_b)/(l1_slope - l2_slope);
            var py = l1_slope*px + l1_b;
            var p = [px, py];
            contact_points.push(p);
       }
      return contact_points; 
    }

    function make_motif(polygon, theta, vertices, midpoints, centre, n){
       var centre_x = centre[0];
       var centre_y = centre[1];
       var angle = (360-theta) * (Math.PI/180);
       var p1 = vertices[0];
       var m1 = midpoints[0];
       var m2 = midpoints[n-1];

       var n1_x = Math.cos(angle) * (p1[0] - m1[0]) - Math.sin(angle) * (p1[1] - m1[1]) + m1[0];
       var n1_y = Math.sin(angle) * (p1[0] - m1[0]) + Math.cos(angle) * (p1[1] - m1[1]) + m1[1];
       var n1 = [n1_x, n1_y];
            
       var l1_slope = (n1_y-m1[1])/(n1_x-m1[0]);
       var l1_b = n1_y - (l1_slope)*n1_x;
       var l1 = [l1_slope, l1_b];
       
       var l2_slope = (centre_y - p1[1])/(centre_x - p1[0]);
       var l2_b = centre_y - (l2_slope)*centre_x;
       var l2 = [l2_slope, l2_b];
        
       var px = (l2_b - l1_b)/(l1_slope - l2_slope);
       var py = l1_slope*px + l1_b;
       var p = [px, py];

       var contactLine1 = new fabric.Line([px, py, m1[0], m1[1]],
                       {fill: 'green',
                               stroke: 'green',
                               strokeWidth: 1,
                               selectable:false
                       });

       var contactLine2 = new fabric.Line([px, py, m2[0], m2[1]],
                       {fill: 'green',
                               stroke: 'green',
                               strokeWidth: 1,
                               selectable:false
                       });
       
       // I am not sure why, but motif1 has to be here ... ¯\_(ツ)_/¯ 
       var motif1 = new fabric.Group([polygon, contactLine1, contactLine2]);
       
       var motif = new fabric.Group();
       for(var i = 0; i <= n; i++){
               var tmp_group = new fabric.Group([polygon, contactLine1, contactLine2]);
               tmp_group.setAngle(360*i/n);
               motif.add(tmp_group);
       }
       return motif;
    }
   
    function render_6_6_6(theta, stroke_colour){
            var centre = [0,0];
            var n = 6;
            var radius = 75;
            var vertices = determine_vertices(centre[0], centre[1], radius, n);
            var midpoints = determine_midpoints(vertices);
            var hexagon = make_regular_polygon(centre[0], centre[1], radius, n);


            hexagon.set({
                fill:"rgba(0,0,0,0)",
                stroke: stroke_colour,
                strokeWidth:1,
            })
            var motif = make_motif(hexagon, theta, vertices, midpoints, centre, n)
            var column = new fabric.Group();
            
            for (var k = -3; k < 7; k++){
                    var tmp_group_0 = new fabric.Group([motif]);
                    tmp_group_0.set({
                            left:100,
                            top:129*k
                    });
                    var tmp_group_1 = new fabric.Group([motif]);
                    tmp_group_1.set({
                            left:213.5,
                            top:64.5+129*k
                    });
                    column.add(tmp_group_0);
                    column.add(tmp_group_1);
            }
            
            var plane = new fabric.Group();
            for (var j = -3; j < 10; j++){
                    var tmp_group = new fabric.Group([column]);
                    tmp_group.set({
                            left:227*j,
                            top:100
                    });
                plane.add(tmp_group);
            }
            canvas.add(plane);
    }

    function render_4_6_12(theta, stroke_colour){
        // making the dodecagon
        var centre = [0,0];
        var n = 12;
        var radius = 75; // a = 38.8229
        var vertices = determine_vertices(centre[0], centre[1], radius, n);
        var midpoints = determine_midpoints(vertices);
        var dodecagon = make_regular_polygon(centre[0], centre[1], radius, n);
        dodecagon.set({
            fill:"rgba(0,0,0,0)",
            stroke:stroke_colour,
            strokeWidth:1,
        })
        var dodecagon_motif = make_motif(dodecagon, theta, vertices, midpoints, centre, n)
            
        var dodecagon = new fabric.Group([dodecagon_motif]);
        dodecagon.set({
            left:175,
            top:176
        })

        // making the squares (3)
        var centre = [0,0];
        var n = 4;
        var radius = 27.4519;
        var vertices = determine_vertices(centre[0], centre[1], radius, n);
        var midpoints = determine_midpoints(vertices);
        var square_1 = make_regular_polygon(centre[0], centre[1], radius, n);
        square_1.set({
            fill:"rgba(0,0,0,0)",
            stroke:stroke_colour,
            strokeWidth:1,
        })
        var square_motif_1 = make_motif(square_1, theta, vertices, midpoints, centre, n)
        var square_1 = new fabric.Group([square_motif_1]);
        square_1.set({
            left:110,
            top:110
        })

        var square_2 = make_regular_polygon(centre[0], centre[1], radius, n);
        square_2.set({
            fill:"rgba(0,0,0,0)",
            stroke:stroke_colour,
            strokeWidth:1,
        })
        var square_motif_2 = make_motif(square_2, theta, vertices, midpoints, centre, n)
        var square_2 = new fabric.Group([square_motif_2]);
        square_2.set({
            left:86,
            top:200,
        })
        square_2.setAngle(30);

        var square_3 = make_regular_polygon(centre[0], centre[1], radius, n);
        square_3.set({
            fill:"rgba(0,0,0,0)",
            stroke:stroke_colour,
            strokeWidth:1,
        })
        var square_motif_3 = make_motif(square_3, theta, vertices, midpoints, centre, n)
        var square_3 = new fabric.Group([square_motif_3]);
        square_3.set({
            left:150.5,
            top:264,
        })   
        square_3.setAngle(60);

        // making the hexagons (3)
        var n = 6;
        var radius = 38.8229;
        var vertices = determine_vertices(centre[0], centre[1], radius, n);
        var midpoints = determine_midpoints(vertices);
        var hexagon_1 = make_regular_polygon(centre[0], centre[1], radius, n);
        hexagon_1.set({
            fill:"rgba(0,0,0,0)",
            stroke:stroke_colour,
            strokeWidth:1,
        })
        var hexagon_motif_1 = make_motif(hexagon_1, theta, vertices, midpoints, centre, n)
        var hexagon_1 = new fabric.Group([hexagon_motif_1]);
        hexagon_1.set({
            left:72,
            top:148
        })
        hexagon_1.setAngle(45);

        var hexagon_2 = make_regular_polygon(centre[0], centre[1], radius, n);
        hexagon_2.set({
            fill:"rgba(0,0,0,0)",
            stroke:stroke_colour,
            strokeWidth:1,
        })
        var hexagon_motif_2 = make_motif(hexagon_2, theta, vertices, midpoints, centre, n)
        var hexagon_2 = new fabric.Group([hexagon_motif_2]);
        hexagon_2.set({
            left:99.5,
            top:251
        })
        hexagon_2.setAngle(45);
        
        var hexagon_3 = make_regular_polygon(centre[0], centre[1], radius, n);
        hexagon_3.set({
            fill:"rgba(0,0,0,0)",
            stroke:stroke_colour,
            strokeWidth:1,
        })
        var hexagon_motif_3 = make_motif(hexagon_3, theta, vertices, midpoints, centre, n)
        var hexagon_3 = new fabric.Group([hexagon_motif_3]);
        hexagon_3.set({
            left:202,
            top:278.5
        })
        hexagon_3.setAngle(45);
        
        var translational_unit = new fabric.Group([dodecagon, hexagon_1, hexagon_2, hexagon_3, square_1, square_2, square_3]);
        translational_unit.setAngle(45);
        //canvas.add(translational_unit);
            
        var column = new fabric.Group();
        for (var k = -1; k < 3; k++){
                var tmp_group_0 = new fabric.Group([translational_unit]);
                tmp_group_0.set({
                        left:100,
                        top:184*k
                });
                
                var tmp_group_1 = new fabric.Group([translational_unit]);
                tmp_group_1.set({
                        left:260,
                        top:92+184*k
                });
                column.add(tmp_group_0);
                column.add(tmp_group_1);
        }
        //canvas.add(column);
        var plane = new fabric.Group();
        for (var j = -2; j < 4; j++){
                var tmp_group = new fabric.Group([column]);
                tmp_group.set({
                        left:320*j,
                        top:96
                });
                plane.add(tmp_group);
        }
        canvas.add(plane);
      }

    function render_4_8_8(theta, stroke_colour){
            // making the square:
            var centre = [0,0];
            var n = 4;
            var radius = 75; //sidelength = 106.666
            var vertices = determine_vertices(centre[0], centre[1], radius, n);
            var midpoints = determine_midpoints(vertices);
            var square = make_regular_polygon(centre[0], centre[1], radius, n);
            square.set({
                fill:"rgba(0,0,0,0)",
                stroke: stroke_colour,
                strokeWidth:1,
            })
            var square_motif = make_motif(square, theta, vertices, midpoints, centre, n)
                    
            // making the octagon
            var centre = [0,0];
            var n = 8;
            var radius = 139.366;
            var vertices = determine_vertices(centre[0], centre[1], radius, n);
            var midpoints = determine_midpoints(vertices);
            var octagon = make_regular_polygon(centre[0], centre[1], radius, n);
            octagon.set({
                fill:"rgba(0,0,0,0)",
                stroke:stroke_colour,
                strokeWidth:1,
            })
            var octagon_motif = make_motif(octagon, theta, vertices, midpoints, centre, n)
            
            var octagon_1 = new fabric.Group([octagon_motif])
            octagon_1.set({
                    left:100,
                    top:200
            })
            octagon_1.setAngle(45/2);
            
            var square_1 = new fabric.Group([square_motif])
            square_1.set({
                    left:282,
                    top:200
            })
            square_1.setAngle(45);
            
            var square_2 = new fabric.Group([square_motif])
            square_2.set({
                    left:100,
                    top:19
            })
            square_2.setAngle(45);

            var translational_unit = new fabric.Group([octagon_1, square_1, square_2]);

            var column = new fabric.Group();
            for (var k = -5; k < 4; k++){
                    var tmp_group_0 = new fabric.Group([translational_unit]);
                    tmp_group_0.set({
                            left:100,
                            top:364.5*k
                    });
                    
                    var tmp_group_1 = new fabric.Group([translational_unit]);
                    tmp_group_1.set({
                            left:282,
                            top:182+364.5*k
                    });
                    column.add(tmp_group_0);
                    column.add(tmp_group_1);
            }
            
            var plane = new fabric.Group();
            for (var j = -3; j < 5; j++){
                    var tmp_group = new fabric.Group([column]);
                    tmp_group.set({
                            left:364.5*j,
                            top:96
                    });
                    plane.add(tmp_group);
            }
            canvas.add(plane);
    }

    $("#theta").change(main);
    $("#tiling_dropdown").change(main);
    $('#checkbox').click(main);
    var canvas = new fabric.StaticCanvas('c');
    main();

});
