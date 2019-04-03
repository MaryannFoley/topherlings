let HEIGHT = 600;
let WIDTH = 800;

var body = d3.select("body");
var svg = body.append("svg")
            .attr("width", WIDTH)
            .attr("height", HEIGHT)
            .attr("class", "bubble")

// [category, project count, funding, backers]

// d3.csv("kickstarter.csv", function(d) {
//       return {
//         name: d.name, // convert "Year" column to Date
//         category: d.category,
//         backers: d.Model,
//         usd: d.usd_pledged_real // convert "Length" column to number
//       };
//     }, function(error, rows) {
//       console.log(rows);
//     });
//
//     console.log(data);


d3.csv(data_sr).then(function(data) {
    // console.log(data);

    var cat_holder = [];
    var cat_freq = [];
    var categories = [];

    data.forEach(function(d) {
        // total num of projects
        if (cat_holder.indexOf(d.main_category) == -1){
            cat_holder.push(d.main_category);
            cat_freq.push(1);
        }
        else {
            cat_freq[cat_holder.indexOf(d.main_category)] += 1;
        }

        // Funding

        // number of Backers

        // success rate
    });

    cat_holder.forEach(function(d, i) {
        var new_obj = {
            name: d,
            freq: cat_freq[i],
            fund: 0,
            backers: 0,
            success: 0
        };
        categories.push(new_obj);
    })

    makeChart(categories);

    // console.log(cat_holder);
    // console.log(cat_freq);
    // console.log(categories);
});

var makeChart = function(data) {

    data = {"children": data};
    console.log(data);

    var bubble = d3.pack(data)
                    .size([WIDTH-2, HEIGHT-2])
                    .padding(1.5);;

    // console.log(bubble);

    var nodes = d3.hierarchy(data)
            .sum(function(d) { return d.freq; });

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

    // console.log(node);
    node.append("title")
            .text(function(d) {
                // console.log(d);
                return d.data.name + ": " + d.data.freq;
            });

    node.append("circle")
        .attr("r", function(d) {
                return d.r;
        })
        .style("fill", "red");

    node.append("text")
            .attr("dy", ".3em")
            .style("text-anchor", "middle")
            .attr("class", "cir_text")
            .text(function(d) {
                return d.data.name;
            });
};

    // var max_projects = 0;
    // var max_funding = 0;
    // var max_backers = 0;
//
// for (let item of data) {
//   if (item[1] > max_projects) max_projects = item[1];
//   if (item[2] > max_funding) max_funding = item[2];
//   if (item[3] > max_backers) max_backers = item[3];
// }
//
// var hue = 0;
// var hue_step = 360.0 / (data.length + 1);
//
// for (let item of data) {
//   var cx = Math.floor(Math.random() * 500);
//   var cy = Math.floor(Math.random() * 500);
//   var r = (item[1] / max_projects) * 100;
//   var c = d3.color("hsl(" + hue + ", 100%, 50%)");
//   console.log(c);
//   svg.append("circle").attr("cx", cx).attr("cy", cy).attr("r", r).attr("fill", c.toString());
//   hue += hue_step;
//   hue %= 360;
// }
