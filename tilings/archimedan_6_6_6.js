window.onload = function() {
        var raphael = Raphael(document.getElementById('canvas_container_6_6_6'), 400, 400),
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
    for (k = 0; k < 5; k++){
        for (j = -1 ; j < 5; j++){
            make_regular_polygon(50+(k*150),50+(j*87),50,6);
            make_regular_polygon(125+(k*150),180+(j*87),50,6);
        }
    }
}
