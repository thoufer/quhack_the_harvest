function drawMap() {
  var svg = d3.select("#map");
  var path = d3.geoPath();
  var stateInfo = d3.map();

  resize();
  d3.select(window).on("resize", resize);

  d3.queue()
     .defer(d3.json, "https://d3js.org/us-10m.v1.json")
     .defer(d3.csv, "js/States.csv", function(d){ stateInfo.set(d.id, {'name':d.name,
                                                                    'ab':d.abbrev,
                                                                    'days':d.days,
                                                                    'hunters':d.activeHunters,
                                                                    'bag':d.bagPerHunter});
                                              })
     .await(ready);

  function ready(error, us) {
     if (error) throw error;

     svg.append("g")
         .attr("class", "states")
       .selectAll("path")
       .data(topojson.feature(us, us.objects.states).features)
       .enter().append("path")
         .attr("d", path)
         .on("click", function(d){
             data = stateInfo.get(d.id);
             document.getElementById('state-value').innerHTML= data.name;
             document.getElementById('days-value').innerHTML= (Number(data.days) / Number(data.hunters)).toFixed(0); //.toFixed(2);
             document.getElementById('bag-value').innerHTML= Number(data.bag).toFixed(0);
           });

     svg.append("path")
         .attr("class", "state-borders")
         .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));
       };

       function resize() {
         width = window.innerWidth, height = window.innerHeight;
         svg.attr("width", width).attr("height", height)
         svg.size([width, height]);
       };
}
drawMap();
