var wemu_gol = function () {
    var jsonCircles = [
        { "x": 1, "y": 1 },
        { "x": 1, "y": 2 },
        { "x": 3, "y": 1 }
    ];

    var theWidth = 400;
    var theHeight = 400;

    return {
        draw: function () {

            var x_scale = d3.scale.linear()
                .domain([0, 4])
                .range([0, theWidth]);

            var y_scale = d3.scale.linear()
                .domain([0,4])
                .range([0, theHeight]);


            d3.select("svg").remove();

            var svgContainer = d3.select("#output").append("svg")
                .attr("width", theWidth)
                .attr("height", theHeight);

            svgContainer.selectAll("rect")
                .data(jsonCircles)
                .enter()
                .append("rect")
                .attr("x", function (d) {
                    return x_scale(d.x);
                })
                .attr("y", function (d) {
                    return y_scale(d.y);
                })
                .attr("width", x_scale(1))
                .attr("height", y_scale(1));
        }
    }

}();