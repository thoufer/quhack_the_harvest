var months = [{month:'September', week:35},
              {month:'October',   week:40},
              {month:'November',  week:45},
              {month:'December',  week:50},
              {month:'January',   week:55}],
    HarvestByRegion;
var width = 800,
    height = 650,
    margin = {top: 20, right: 0, bottom: 50, left: 80},
    innerWidth = width - margin.left - margin.right,
    innerHeight = height - margin.top - margin.bottom,
    xScale = d3.scaleBand()
                .rangeRound([0, innerWidth])
                .padding(0.2),
    yScale = d3.scaleLinear()
                .rangeRound([innerHeight, 0]),
    xAxis = d3.axisBottom(xScale)
              .tickSize(0.1),
    yAxis = d3.axisLeft(yScale)
              .ticks(12, "%");

var svg = d3.select("#mapid").append("svg")
      .attr("width", width)
      .attr("height", height)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

init();


function init(){
    var data = HarvestByRegion[0];

    xScale.domain(data.values.map(function(d) { return d.week; }));
    //yScale.domain([0, d3.max(data.values, function(d) { return d.h; })]);
    yScale.domain([0, 0.12]);

    svg.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", "translate(0," + innerHeight + ")")
      .call(xAxis)
        .selectAll("text")
        .remove();

    svg.append("g")
        .attr("class", "axis axis-y")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 50)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Harvest");

    svg.append("g")
      .selectAll("text")
        .data(months).enter()
        .append("text")
          .attr("x", function(d){ return xScale(d.week) + 10; })
          .attr("y", innerHeight + 30)
          .style("text-anchor", "left")
          .text(function(d){ return d.month; });

    var bars = svg.selectAll(".bar")
      .data(data.values);

      bars.enter()
        .append("rect")
          .attr("class", "bar")
          .attr("x", function(d){ return xScale(d.week); })
          .attr("y", function(d) { return yScale(0); })
        	.attr("height", function(d){ return  innerHeight - yScale(0); })
        	.attr("width", xScale.bandwidth());
}

function update(regionIdx){
  var data = HarvestByRegion[regionIdx];

  xScale.domain(data.values.map(function(d) { return d.week; }));
  //yScale.domain([0, d3.max(data.values, function(d) { return d.h; })]);

  var bars = svg.selectAll(".bar")
    .data(data.values);

    bars.enter()
      .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return xScale(d.week); })
        .attr("y", function(d) { return yScale(d.h); })
      	.attr("height", function(d){ return  innerHeight - yScale(d.h); })
      	.attr("width", xScale.bandwidth());

    bars.exit().remove();

    bars.transition()
      .attr("y", function(d) { return yScale(d.h); })
      .attr("height", function(d){ return  innerHeight - yScale(d.h); })
      .duration(850);

};
