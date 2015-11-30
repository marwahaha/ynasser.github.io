$(document).ready(function() {	
    // 3.12.12, 4.6.12, 4.8.8, 6.6.6, and rosette dual tilings 10RD and 8RD
    function main(){
        var theta = document.getElementById("theta").value;
        var e = document.getElementById("tiling_selection");
        var tiling = e.options[e.selectedIndex].value;

        if (tiling == "4_6_12"){
                render_4_6_12(theta);
        } else if (tiling == "4_8_8"){
                render_4_8_8(theta);
        } else if (tiling == "6_6_6"){
                render_6_6_6(theta);
        } else {
                alert("Not implemented yet!");
        }
    
    }

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
   
    function render_6_6_6(theta){
            canvas.clear();
            var centre = [0,0];
            var n = 6;
            var radius = 75;
            var vertices = determine_vertices(centre[0], centre[1], radius, n);
            var midpoints = determine_midpoints(vertices);
            var hexagon = make_regular_polygon(centre[0], centre[1], radius, n);
            hexagon.set({
                fill:"rgba(0,0,0,0)",
                //fill:"rgba(124,240,10,0)",
                stroke:'green',
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

    $("#button").click(function() { main(); } );
    var canvas = new fabric.StaticCanvas('c');

});
