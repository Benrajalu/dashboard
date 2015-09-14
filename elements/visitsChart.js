angular.module('app')
.controller('visitsCtrl', function($scope, $rootScope, $http, $stateParams, $timeout, $location, $state, $cookies){
	// Get visits
	  $http.get('./data/visits.json').success(function(data){
	  	// Draw chart
	  	    var data = data;
	  	     
	  	    var margin = {top: 50, right: 0, bottom: 0, left: 0},
	  	        width = $('#visits').outerWidth(),
	  	        height = $('#visits').outerHeight() - 50,
	  	        bisectDate = d3.bisector(function(d) { return d.date; }).left;

	  	    var parseDate = d3.time.format("%d-%m-%Y").parse;

	  	    var x = d3.time.scale()
	  	        .range([0, width]);

	  	    var y = d3.scale.linear()
	  	        .range([height, 0]);

	  	    var xAxis = d3.svg.axis()
	  	        .scale(x)
	  	        .ticks(7)
	  	        .orient("top")
	  	        .tickFormat(function(d, i){
	  	        	// use d for data, i for index of tick. NOT DOCUMENTED
	  	        	if(i == "0" || i == data.length - 1){
	  	        		return ''
	  	        	}
	  	        	else{
	  	        		var format = d3.time.format("%d/%m");
	  	        		return (format(d));
	  	        	}
	  	        })
	  	        .outerTickSize(0);

	  	    var yAxis = d3.svg.axis()
	  	        .scale(y)
	  	        .innerTickSize(width)
	  	        .orient("right")
	  	        .tickFormat(function(d, i){
	  	        	if(i == "0"){
	  	        		return ''
	  	        	}
	  	        	else{
	  	        		return d
	  	        	}
	  	        });

	  	    var area = d3.svg.area()
	  	        .interpolate("cardinal")  
	  	        .x(function(d) { return x(d.date); })
	  	        .y0(height)
	  	        .y1(function(d) { return y(d.visits); });

	  	    var svg = d3.select("#visits").append("svg")
	  	        .attr("width", width + margin.left + margin.right)
	  	        .attr("height", height + margin.top + margin.bottom)
	  	        .attr("class", "d3Chart")
	  	        .append("g")
	  	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	  	      
	  		data.forEach(function(d) {
	  			d.date = parseDate(d.date);
	  			d.visits = +d.visits;
	  		}); 

	  		var startData = data.map( function( datum ) {
	  	       return {
	  	       	date  : datum.date,
	  	       	visits : 0
	  	       };
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
	  		  .datum(startData)
	  		  .attr("class", "area")
	  		  .attr("d", area)
	  		  .attr("style", "position:relative; z-index:1")
	  		  .transition()
	  	        .duration( 1000 )
	  	        .attrTween( 'd', function() {
	  	          var interpolator = d3.interpolateArray( startData, data );
	  	          
	  	          return function( t ) {
	  	            return area( interpolator( t ) );
	  	          }
	  	       });

	  		svg.append("g")
	  		  .attr("class", "x axis")
	  		  .attr("transform", "translate(0," + height + ")")
	  		  .attr("style", "position:relative; z-index:2")
	  		  .call(xAxis);


	  		svg.append("g")
	  		  .attr("class", "y axis")
	  		  .attr("style", "position:relative; z-index:2")
	  		  .call(yAxis)
	  		.selectAll("text")
	  		    .attr("y", 6)
	  		    .attr("x", 5)
	  		    .attr("class", "scale")
	  		    .style("text-anchor", "start");

	  		var focus = svg.append("g")
	  		      .attr("class", "focus")
	  		      .style("display", "none");

	  		  focus.append("circle")
	  		      .attr("r", 4.5);

	  		  focus.append("text")
	  		      .attr("x", 9)
	  		      .attr("dy", ".35em");

	  		  svg.append("rect")
	  		      .attr("class", "overlay")
	  		      .attr("width", width)
	  		      .attr("height", height)
	  		      .on("mouseover", function() { focus.style("display", null); })
	  		      .on("mouseout", function() { focus.style("display", "none"); })
	  		      .on("mousemove", mousemove);

	  		function mousemove() {
	  		    var x0 = x.invert(d3.mouse(this)[0]),
	  		        i = bisectDate(data, x0, 1),
	  		        d0 = data[i - 1],
	  		        d1 = data[i],
	  		        d = x0 - d0.date > d1.date - x0 ? d1 : d0;
	  		    focus.attr("transform", "translate(" + x(d.date) + "," + y(d.visits) + ")");
	  		    focus.select("text").text(d.visits);
	  		}

	  		function resize() {
	  		  /* Update graph using new width and height (code below) */
	  		  var width = parseInt(d3.select("#visits").style("width")),
	  		  	  height = parseInt(d3.select("#visits").style("height")) - 50;

	  		  var newYAxis = d3.svg.axis()
	  		      .scale(y)
	  		      .innerTickSize(width)
	  		      .orient("right")
	  		      .tickFormat(function(d, i){
	  		      	if(i == "0"){
	  		      		return ''
	  		      	}
	  		      	else{
	  		      		return d
	  		      	}
	  		      });

	  		   
	  		  /* Update the range of the scale with new width/height */
	  		  x.range([0, width]);
	  		  y.range([height, 0]);
	  		   
	  		  /* Update the axis with the new scale */
	  		  svg.select('.x.axis')
	  		    .attr("transform", "translate(0," + height + ")")
	  		    .call(xAxis);
	  		   
	  		  svg.select('.y.axis')
	  		    .call(newYAxis)
	  		    .selectAll("text")
	  		        .attr("y", 6)
	  		        .attr("x", 5)
	  		        .attr("class", "scale")
	  		        .style("text-anchor", "start");;
	  		   
	  		  /* Force D3 to recalculate and update the line */
	  		  svg.selectAll('.area')
	  		    .attr("d", area)
				.transition()
				.duration( 1000 )
				.attrTween( 'd', function() {
				  var interpolator = d3.interpolateArray( startData, data );
				  
				  return function( t ) {
				    return area( interpolator( t ) );
				  }
				});
	  		}
	  		 
	  		d3.select(window).on('resize', resize);
	  });
});