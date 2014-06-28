var wemu_gol = function () {
    var field = [
        {   "x": 100, "y": 100, "color": "red" },
        {   "x": 200, "y": 200, "color": "red" }
    ];

    return {
        draw: function () {
            var jsonCircles = [
                { "x": 1, "y": 1 },
                { "x": 1, "y": 2 },
                { "x": 3, "y": 1 }
            ];
            d3.select("svg").remove();

            var svgContainer = d3.select("#output").append("svg")
                .attr("width", 400)
                .attr("height", 400);

            svgContainer.selectAll("rect")
                .data(jsonCircles)
                .enter()
                .append("rect")
                .attr("x", function (d) {
                    return d.x;
                })
                .attr("y", function (d) {
                    return d.y;
                })
                .attr("width", 1)
                .attr("height", 1);
        }
    }

}();