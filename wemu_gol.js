var wemu_gol = function () {
    var field = [];

    var theWidth = 400;
    var theHeight = 400;

    var the_field = null;

    function init(ySize, xSize) {
        field = [];
        for (y = 0; y < ySize; y++) {
            field.push([]);
            for (x = 0; x < xSize; x++) {
               field[y].push(Math.random()<=0.3);
            }
        }

        return field;
    }

    function calculateDisplayData(field) {
        var display_data = [];
        for (x = 0; x < field.length; x++) {
            for (y = 0; y < field[0].length; y++) {
                if (field[y][x]) {
                    display_data.push({"x": x, "y": y})
                }
            }
        }

        return display_data;
    }

    function neigbours(field, y, x) {
        var counter = 0;
        counter = fieldVal(field, y - 1, x - 1);
        counter += fieldVal(field, y - 1, x);
        counter += fieldVal(field, y - 1, x + 1);
        counter += fieldVal(field, y, x - 1);
        counter += fieldVal(field, y, x + 1);
        counter += fieldVal(field, y + 1, x - 1);
        counter += fieldVal(field, y + 1, x);
        counter += fieldVal(field, y + 1, x + 1);

        return counter;
    }

    function fieldVal(field, y, x) {
        if (y < 0 || y >= field.length || x < 0 || x > field[0].length) {
            return 0;
        }
        return field[y][x] ? 1 : 0;

    }

    function nextGeneration(field) {
        var result = [];
        for (y = 0; y < field.length; y++) {
            result.push([]);
            for (x = 0; x < field[0].length; x++) {
                result[y].push(field[y][x]);
                var neigbourss = neigbours(field, y, x);

                if (field[y][x]) {
                    if (neigbourss < 2 || neigbours > 3) {
                        result[y][x] = false;
                    }
                } else {
                    if (neigbourss === 3) {
                        result[y][x] = true;
                    }
                }
            }
        }
        return result;
    }

    function next() {
        if (the_field === null) {
            the_field = init(4, 4);
        } else {
            the_field = nextGeneration(the_field);
        }

        return the_field;
    }

    return {
        draw: function () {
            var myLocalField = next();

            var x_scale = d3.scale.linear()
                .domain([0, myLocalField[0].length])
                .range([0, theWidth]);

            var y_scale = d3.scale.linear()
                .domain([0, myLocalField.length])
                .range([0, theHeight]);


            d3.select("svg").remove();

            var svgContainer = d3.select("#output").append("svg")
                .attr("width", theWidth)
                .attr("height", theHeight);

            svgContainer.selectAll("rect")
                .data(calculateDisplayData(myLocalField))
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

}

();