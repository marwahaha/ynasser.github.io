window.onload = function() {
    var r = Raphael(document.getElementById('canvas_container_0'), 500, 500),
                    dashed = {fill: "none", stroke: "#666", "stroke-dasharray": "- "};
    for(var j=-1;j<10;j+=1){
        for(var i=0; i<11; i+=1){
            r.path("M " + i*50 + " " + j*50 + " l 0 50 l 50 0 z");
        }
    }
    var r = Raphael(document.getElementById('canvas_container_1'), 500, 500),
                    dashed = {fill: "none", stroke: "#666", "stroke-dasharray": "- "};
    
    for(var j=0;j<60;j+=1){
        r.path("M " + (j*10-250) + " " + (j*10+250) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10-290) + " " + (j*10+200) + "l 50 0 l 0 10 l -50 0 z");
        
        r.path("M " + (j*10-200) + " " + (j*10+200) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10-230) + " " + (j*10+160) + "l 50 0 l 0 10 l -50 0 z");
        
        r.path("M " + (j*10-150) + " " + (j*10+150) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10-170) + " " + (j*10+120) + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + (j*10-100) + " " + (j*10+100) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10-110) + " " + (j*10+80) + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + (j*10-50) + " " + (j*10+50) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10-50) + " " + (j*10+40) + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + j*10 + " " + j*10 + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10+10) + " " + j*10 + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + (j*10+60) + " " + (j*10-40) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10+70) + " " + (j*10-40) + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + (j*10+120) + " " + (j*10-80) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10+130) + " " + (j*10-80) + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + (j*10+180) + " " + (j*10-120) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10+190) + " " + (j*10-120) + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + (j*10+240) + " " + (j*10-160) + "l 10 0 l 0 50 l -10 0 z");
        r.path("M " + (j*10+250) + " " + (j*10-160) + "l 50 0 l 0 10 l -50 0 z");

        r.path("M " + (j*10+300) + " " + (j*10-200) + "l 10 0 l 0 50 l -10 0 z");
    }
