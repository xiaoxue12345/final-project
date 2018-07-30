dataset = {
    "children": [{"Name":"Farming","Count":72955},
        {"Name":"General Store","Count":64729},
        {"Name":"Personal Housing Expenses","Count":32448},
        {"Name":"Pigs","Count":26624},
        {"Name":"Clothing Sales","Count":22339},
        {"Name":"Retail","Count":24771},
        {"Name":"Agriculture","Count":27023},
        {"Name":"Food Production/Sales","Count":28106},
        {"Name":"Home Appliances","Count":20167},
        {"Name":"Higher education costs","Count":19742},
        {"Name":"Fruits & Vegetables","Count":16610},
        {"Name":"Grocery Store ","Count":15102},
        {"Name":"Livestock","Count":13095},
        {"Name":"Fish Selling","Count":13060},
        {"Name":"Fishing ","Count":10066},
        {"Name":"Services","Count":9807},
        {"Name":"Poultry","Count":9783}
       ]
};
var diameter = 600;
var color = d3.scaleOrdinal(d3.schemeCategory20);

var bubble = d3.pack(dataset)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#chartTop203")
    .append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

var nodes = d3.hierarchy(dataset)
    .sum(function(d) { return d.Count; });

var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function(d){
        return  !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
    });

node.append("title")
    .text(function(d) {
        return d.Name + ": " + d.Count;
    });

node.append("circle")
    .attr("r", function(d) {
        return d.r;
    })
    .style("fill", function(d,i) {
        return color(i);
    });

node.append("text")
    .attr("dy", ".2em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Name.substring(0, d.r / 3);
    })
    .attr("font-family", "sans-serif")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

node.append("text")
    .attr("dy", "1.3em")
    .style("text-anchor", "middle")
    .text(function(d) {
        return d.data.Count;
    })
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("font-size", function(d){
        return d.r/5;
    })
    .attr("fill", "white");

d3.select(self.frameElement)
    .style("height", diameter + "px");