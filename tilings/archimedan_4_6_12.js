window.onload = function() {
        var raphael = Raphael(document.getElementById('canvas_container_4_6_12'), 480, 480),
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
            make_regular_polygon(150+(j*(180+32.5)), 150-(j*57), 90, 12);
            console.log("hi " + j);
            console.log("dssshi");

            //bottom_right_square
            make_regular_polygon(228+(j*(180+32.5)), 228-(j*57), 32.5, 4);
            
            //top_left_square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4);
            // middle_right_square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r210T184.5,49.5");
            // top right square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r60T106.5,-28");
            // middle left square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r-60T-28,106.5");
            // bottom left square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r-210T49,184");
        }
        for (j = -1; j < 3; j++){  
            //dodecagon
            make_regular_polygon(150+(j*(180+32.5)), 150-(j*57), 90, 12);
            console.log("hi " + j);
            console.log("dssshi");

            //bottom_right_square
            make_regular_polygon(228+(j*(180+32.5)), 228-(j*57), 32.5, 4);
            
            //top_left_square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4);
            // middle_right_square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r210T184.5,49.5");
            // top right square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r60T106.5,-28");
            // middle left square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r-60T-28,106.5");
            // bottom left square
            make_regular_polygon(72+(j*(180+32.5)),72-(j*57),32.5,4).transform("r-210T49,184");
        }
       /** 
        //dodecagon
        make_regular_polygon(150+180+32.5, 150-57, 90, 12);
        //bottom_right_square
        make_regular_polygon(228+180+32.5, 228-57, 32.5, 4);
        //top_left_square
        make_regular_polygon(72+180+32.5,72-57,32.5,4);
        // middle_right_square
        make_regular_polygon(72+180+32.5,72-57,32.5,4).transform("r210T184.5,49.5");
        // top right square
        make_regular_polygon(72+180+32.5,72-57,32.5,4).transform("r60T106.5,-28");
        // middle left square
        make_regular_polygon(72+180+32.5,72-57,32.5,4).transform("r-60T-28,106.5");
        // bottom left square
        make_regular_polygon(72+180+32.5,72-57,32.5,4).transform("r-210T49,184");

        //hexagon = make_regular_polygon(150,150,30,6);
**/
}
