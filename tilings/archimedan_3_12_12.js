window.onload = function() {
        var raphael = Raphael(document.getElementById('canvas_container_3_12_12'), 480, 480),
                    dashed = {fill: "none", stroke: "#666", "stroke-dasharray": "- "};
        var x = 200;
        var y = 150;
        var r = 53;
        var n = 12;
        // I didn't have to hardcore this, but figuring out borders was tricky to do without
        // first prototyping.
        for (j = -7 ; j <10; j++){
            var s1 = "";
            var s2 = "";
            var s3 = "";
            var s4 = "";
            var s5 = "";
            var s6 = "";
            var s7 = "";

            for (i = 0; i < n; i++) {
               s1_v1 = (x+(j*99) + r * Math.cos(2 * Math.PI * i / n)); 
               s1_v2 = y+(j*2*13) + r * Math.sin(2 * Math.PI * i / n);

               s2_v1 = (x+(j*99)+126 + r * Math.cos(2 * Math.PI * i / n)); 
               s2_v2 = y+125+(j*2*13) + r * Math.sin(2 * Math.PI * i / n);

               s3_v1 = (x+(j*99)-126 + r * Math.cos(2 * Math.PI * i / n)); 
               s3_v2 = y-125+(j*2*13) + r * Math.sin(2 * Math.PI * i / n);
               
               s4_v1 = (x+(j*99)-2*126 + r * Math.cos(2 * Math.PI * i / n)); 
               s4_v2 = y-2*125+(j*2*13) + r * Math.sin(2 * Math.PI * i / n);
               
               s5_v1 = (x+(j*99)+2*126 + r * Math.cos(2 * Math.PI * i / n)); 
               s5_v2 = y+2*125+(j*2*13) + r * Math.sin(2 * Math.PI * i / n);
               
               s6_v1 = (x+(j*99)+3*126 + r * Math.cos(2 * Math.PI * i / n)); 
               s6_v2 = y+3*125+(j*2*13) + r * Math.sin(2 * Math.PI * i / n);
               
               s7_v1 = (x+(j*99)+4*126 + r * Math.cos(2 * Math.PI * i / n)); 
               s7_v2 = y+4*125+(j*2*13) + r * Math.sin(2 * Math.PI * i / n);

               if (i==n-1){
                   s1 = s1 + " " + s1_v1 + " " + s1_v2 + " z";
                   s2 = s2 + " " + s2_v1 + " " + s2_v2 + " z";
                   s3 = s3 + " " + s3_v1 + " " + s3_v2 + " z";
                   s4 = s4 + " " + s4_v1 + " " + s4_v2 + " z";
                   s5 = s5 + " " + s5_v1 + " " + s5_v2 + " z";
                   s6 = s6 + " " + s6_v1 + " " + s6_v2 + " z";
                   s7 = s7 + " " + s7_v1 + " " + s7_v2 + " z";
               
               } else {
                   s1 = s1 + " " + s1_v1 + " " + s1_v2 + " L ";
                   s2 = s2 + " " + s2_v1 + " " + s2_v2 + " L ";
                   s3 = s3 + " " + s3_v1 + " " + s3_v2 + " L ";
                   s4 = s4 + " " + s4_v1 + " " + s4_v2 + " L ";
                   s5 = s5 + " " + s5_v1 + " " + s5_v2 + " L ";
                   s6 = s6 + " " + s6_v1 + " " + s6_v2 + " L ";
                   s7 = s7 + " " + s7_v1 + " " + s7_v2 + " L ";
                }
            } 
            
            //console.log(s1);
            raphael.path("M " + s1).attr({"fill":"00CC66"}); 
            raphael.path("M " + s2).attr({"fill":"blue"}); 
            raphael.path("M " + s3).attr({"fill":"blue"});; 
            raphael.path("M " + s4).attr({"fill":"00CC66"});; 
            raphael.path("M " + s5).attr({"fill":"00CC66"});; 
            raphael.path("M " + s6).attr({"fill":"blue"});; 
            raphael.path("M " + s7).attr({"fill":"00CC66"});; 
            }
    //}
}

