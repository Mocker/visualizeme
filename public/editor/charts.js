window.onload = function(){
	
	var graphs = d3.select("#accordion_graphs .wrapper");
	var graph_types = ["Donut", "Pie", "Area", "Line", "Bar", "Stacked Bar"];
	
	create_placeholders(graphs, graph_types)
	graph_types.forEach(create_graph)
	enable_menus();
	d3.selectAll(".module").attr("draggable", "true").on("dragstart", handleDragStart);
	place_colors();
	}


//FUNCTIONS

function enable_menus() {
	var dts = d3.selectAll(".accordion dt")
	dts.on("click", function(){
		dts.classed("open", false);
		d3.select(this).classed("open", true);
	})
}

function place_colors() {
	var colors = d3.range(16).map(function(d, i){ return d3.hcl(i*20, 70, 40)});
	d3.select("#accordion_color_schemes .wrapper")
		.selectAll(".module")
		.data(colors)
		.enter()
		.append("div")
		.attr("class", "module color")
		.attr("style", function(d){ return "background: " + d.toString() + ";"})
		.on("click", function(d){
			d3.select("#accent_rules").html(".accent {fill:" + d.toString() + "} .accent_stroke {stroke: " + d.toString() + "}")
		})


}

function create_placeholders(graphs, graph_types) {
		graphs
		.selectAll("div")
		.data(graph_types)
		.enter()
		.append("div")
			.attr("id", function(d, i){
				return "graph_" + d.toLowerCase().split(" ").join("_");
			})
			.attr("class", "module");
}

function handleDragStart() {
	var e = d3.event;
  // Target (this) element is the source node.
  //this.style.background = 'transparent';
  var dragSrcEl = this;
  var string = d3.select(this).html();
  e.dataTransfer.setData("svg/xml", string)
}

function create_graph(nodename) {

	var container = d3.select("#graph_" + nodename.toLowerCase().split(" ").join("_"))
	var width = container.node().offsetWidth;
	var height = container.node().offsetHeight;
	var dims = Math.min(width, height);
	var graph = container.append("svg")
		.attr("width", width)
		.attr("height", height)
		.attr("xmlns", "http://www.w3.org/2000/svg");

	if (nodename == "Pie" || nodename == "Donut") {
		var data = [60, 2, 3, 0, 1, 1, 14, 17, 10];
		var r = dims/2-10; 

		var piechart = graph.append("g")
				.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
		var arc = d3.svg.arc().outerRadius(r).innerRadius(nodename == "Donut" ? r-10 : 0);
		var pie = d3.layout.pie().value(function(d) {return d;});
		var arcs = piechart.selectAll("g.slice")
			.data(pie(data))
			.enter()
			.append("g")
			.attr("class", function(d,i){return classname = (i==0) ? "accent" : "complementary v" + i});
		arcs
			.append("path")
			.attr("d", arc);
	}

	if (nodename == "Area" || nodename == "Line") {
		var data = [3, 8, 5, 10, 3, 2, 29, 20, 15, 17];
		var max = d3.max(data);
	   
	   x  = d3.scale.linear().domain([0, data.length - 1]).range([0, width])
	   y  = d3.scale.linear().domain([0, max]).range([height-10, 0])
	   
	   graph
	       .attr('width', width)
	       .attr('height', height)

	   graph.selectAll('path.line')
	     .data([data])
		   .enter().append("svg:path")
		     .attr("d", d3.svg.area().x(function(d,i){ return x(i)}).y(y).interpolate("basis"))
		     .attr("class", "accent_stroke")
		     .attr("stroke-width", 5);
	   if (nodename == "Area") {
		   graph.selectAll('path.line')
		     .data([data])
			  .enter().append("svg:path")
			     .attr("d", d3.svg.area().x(function(d,i){ return x(i)}).y(y).y0(height).interpolate("basis"))
			     .attr("class", "accent")
			     .attr("fill-opacity", 0.5);
	   }	     
	}

	if (nodename == "Area" || nodename == "Line") {
		var data = [3, 8, 5, 10, 3, 2, 29, 20, 15, 17];
		var max = d3.max(data);
	   
	   x  = d3.scale.linear().domain([0, data.length - 1]).range([0, width])
	   y  = d3.scale.linear().domain([0, max]).range([height-10, 0])
	   
	   graph
	       .attr('width', width)
	       .attr('height', height)

	   graph.selectAll('path.line')
	     .data([data])
		   .enter().append("svg:path")
		     .attr("d", d3.svg.area().x(function(d,i){ return x(i)}).y(y).interpolate("basis"))
		     .attr("class", "accent_stroke")
		     .attr("stroke-width", 5);
	   if (nodename == "Area") {
		   graph.selectAll('path.line')
		     .data([data])
			  .enter().append("svg:path")
			     .attr("d", d3.svg.area().x(function(d,i){ return x(i)}).y(y).y0(height).interpolate("basis"))
			     .attr("class", "accent")
			     .attr("fill-opacity", 0.5);
	   }	     
	}
	if (nodename == "Bar" || nodename == "Stacked Bar") {
		var data = nodename == "Bar" ? [3, 8, 5, 10, 3, 2, 22, 20, 15, 17] : [1, 3, 5, 4, 5, 8, 5, 1, 3, 3];
		var bar_margin = 2;
		var v_margin = nodename == "Bar" ? 10 : 50
		height -= v_margin;
		var bar_width = (width/data.length) - (bar_margin)
		var x = function(d, i) {return i * bar_width+(i*2)}
    var y_multiplier = height/d3.max(data);
    graph.selectAll(".bar")
      .data(data)
    	.enter().append("rect")
	      .attr("class", "accent")
	      .attr("x", x)
	      .attr("width", bar_width)
	      .attr("y", function(d){ return (height-d*y_multiplier)+v_margin })
	      .attr("height", function(d){ return (d*y_multiplier) });
	  if (nodename == "Stacked Bar") {
	  	 graph.selectAll("rect").each(function(el,i) {
	  	 	var y = d3.select(this).attr("y");
	  	 	var x = d3.select(this).attr("x");
	  	 	var height = d3.select(this).attr("height");
	  	 	var width = d3.select(this).attr("width");
	  	 	var height = Math.random()*50;
	  	 	graph.append("rect")
	  	 		.attr("class", "complementary v1")
	  	 		.attr("height", height)
	  	 		.attr("y", y-height)
	  	 		.attr("x", x)
	  	 		.attr("width", width);
	  	 });
	  }

	}

}
