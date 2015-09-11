angular.module('app')
.controller('visitsCtrl', function($scope, $rootScope, $http, $stateParams, $timeout, $location, $state, $cookies){
	// Build the chart
	var makeChart = function(visits){
	    var data = visits;
	     
	    var margin = {top: 0, right: 0, bottom: 0, left: 0},
	        width = $('#visits').outerWidth() + 15,
	        height = $('#visits').outerHeight();

	    var parseDate = d3.time.format("%d-%m-%Y").parse;

	    var x = d3.time.scale()
	        .range([0, width]);

	    var y = d3.scale.linear()
	        .range([height, 0]);

	    var xAxis = d3.svg.axis()
	        .scale(x)
	        .orient("top");

	    var yAxis = d3.svg.axis()
	        .scale(y)
	        .orient("left");

	    var area = d3.svg.area()
	        .interpolate("basis")  
	        .x(function(d) { return x(d.date); })
	        .y0(height)
	        .y1(function(d) { return y(d.visits); });

	    var svg = d3.select("#visits").append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	        .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	      
		data.forEach(function(d) {
			d.date = parseDate(d.date);
			d.visits = +d.visits;
		}); 

		x.domain(d3.extent(data, function(d) { return d.date; }));
		y.domain([0, d3.max(data, function(d) { return d.visits; })]);

	    svg.append("linearGradient")
			.attr("id", "grad")
			.attr("gradientUnits", "userSpaceOnUse")
			.attr("x1", 0).attr("y1", y(0))
			.attr("x2", 0).attr("y2", y(2))
		    .selectAll("stop")
		    .data([
		      {offset: "0%", color: "#9d7cbe"},
		      {offset: "70%", color: "#ba9cd8"}
		     ])
		    .enter().append("stop")
		    .attr("offset", function(d) { return d.offset; })
		    .attr("stop-color", function(d) { return d.color; });

		svg.append("path")
		  .datum(data)
		  .attr("class", "area")
		  .attr("d", area)
		  .attr("style", "position:relative; z-index:1");

		svg.append("g")
		  .attr("class", "x axis")
		  .attr("transform", "translate(0," + height + ")")
		  .attr("style", "position:relative; z-index:2")
		  .call(xAxis);

		svg.append("g")
		  .attr("class", "y axis")
		  .attr("style", "position:relative; z-index:2")
		  .call(yAxis)
		.append("text")
		  .attr("transform", "rotate(-90)")
		  .attr("y", 6)
		  .attr("dy", ".71em")
		  .style("text-anchor", "end")
		  .text("Price ($)");
	}

	// Get visits
	  $http.get('./data/visits.json').success(function(data){
	    //$scope.visits = data;
	    makeChart(data);
	  });
});