window.onload = function() {
        var raphael = Raphael(document.getElementById('canvas_container_4_6_12'), 400, 400),
                    dashed = {fill: "none", stroke: "#666", "stroke-dasharray": "- "};
        
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
            return raphael.path("M " + shape);
        }

        for (j = -1; j < 3; j++){  
            //dodecagon
            make_regular_polygon(150+(j*(180+32.5)), 150-(j*57), 90, 12).attr({"fill":"blue"});
            //bottom_right_square
            make_regular_polygon(228+(j*(180+32.5)), 228-(j*57), 32.5, 4).attr({"fill":"red"});
            //top_left_square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).attr({"fill":"red"});
            // middle_right_square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r210T184.5,49.5").attr({"fill":"red"});
            // top right square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r60T106.5,-28").attr({"fill":"red"});
            // middle left square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r-60T-28,106.5").attr({"fill":"red"});
            // bottom left square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r-210T49,184").attr({"fill":"red"});
        }
        for (k = -1; k < 3; k++){  
            //dodecagon
            make_regular_polygon(150-(k*57), 150+(k*212.5), 90, 12).attr({"fill":"blue"});
            //bottom_right_square
            make_regular_polygon(228-(k*57), 228+(k*212.5), 32.5, 4).attr({"fill":"red"});
            //top_left_square
            make_regular_polygon(72-(k*57),72+(k*212.5),32.5,4).attr({"fill":"red"});
            // middle_right_square
            make_regular_polygon(72-(k*57),72+(k*212.5),32.5,4).transform("r210T184.5,49.5").attr({"fill":"red"});
            // top right square
            make_regular_polygon(72-(k*57),72+(k*212.5),32.5,4).transform("r60T106.5,-28").attr({"fill":"red"});
            // middle left square
            make_regular_polygon(72-(k*57),72+(k*212.5),32.5,4).transform("r-60T-28,106.5").attr({"fill":"red"});
            // bottom left square
            make_regular_polygon(72-(k*57),72+(k*212.5),32.5,4).transform("r-210T49,184").attr({"fill":"red"});
        }
        
        make_regular_polygon(150-155, 150-155.2, 90, 12).attr({"fill":"blue"});
        make_regular_polygon(150+155, 150+155.2, 90, 12).attr({"fill":"blue"});
        make_regular_polygon(150+155+155,150+155.2+155.2, 90, 12).attr({"fill":"blue"});

}
