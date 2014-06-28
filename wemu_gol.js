var wemu_gol = function () {
    var field = [];

    var theWidth = 400;
    var theHeight = 400;

    function init() {
        field = [
            [0, 0, 0],
            [0, 1, 0],
            [1, 0, 1]
        ];
        return field;
    }

    function calculateDisplayData(field) {
        var display_data = [];
        for (x = 0; x < field.length; x++) {
            for (y = 0; y < field[0].length; y++) {
                if(field[y][x]) {
                    display_data.push({"x":x, "y":y})
                }
            }
        }

        return display_data;
    }

    return {


        draw: function () {
            var x_scale = d3.scale.linear()
                .domain([0, 4])
                .range([0, theWidth]);

            var y_scale = d3.scale.linear()
                .domain([0, 4])
                .range([0, theHeight]);


            d3.select("svg").remove();

            var svgContainer = d3.select("#output").append("svg")
                .attr("width", theWidth)
                .attr("height", theHeight);

            svgContainer.selectAll("rect")
                .data(calculateDisplayData(init()))
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