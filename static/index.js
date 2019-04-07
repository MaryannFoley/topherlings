let HEIGHT = 600;
let WIDTH = 800;

var body = d3.select("body");
var svg = body.append("svg")
.attr("width", WIDTH)
.attr("height", HEIGHT)
.attr("class", "bubble")
.style("border", "1px solid black")
.attr("id", "svgboi");

svg.append("text")
.attr("dy", ".3em")
.attr("x", 200)
.attr("y", 200)
.style("text-anchor", "middle")
.style('fill', 'black')
.attr("class", "cir_text")
.text("Hold up buddy");

// colors
var hue = 0;
var hue_step;

// main cats
var top_display = "freq";
var cat_holder = [];
var cat_freq = [];
var cat_fund = [];
var cat_backers = [];
var cat_success = [];

// sub cats
var subcat_holder = [];
var subcat_freq = [];
var subcat_fund = [];
var subcat_backers = [];
var subcat_success = [];

// sorted master lists
var sorted_fund = [];
var sorted_backers = [];

// parsed array
var categories = [];


var changeDisplay = function (new_state) {
    hue = 0;
    document.getElementById("svgboi").innerHTML = "";
    console.log("clicked");
    top_display = new_state;
    makeChart(categories, top_display);
}

var go = function () {
    d3.csv(data_sr).then(function (data) {
        // console.log(data);

        sorted_fund = data.concat().sort(function(a,b) { return parseFloat(a.usd_pledged_real) - parseFloat(b.usd_pledged_real);});
        sorted_backers = data.concat().sort(function(a,b) { return parseInt(a.backers) - parseInt(b.backers);});
        // console.log(sorted_fund);
        // console.log(sorted_backers);

        data.forEach(function (d) {
            // category does not exist
            if (cat_holder.indexOf(d.main_category) == -1) {
                // main cat stuff
                cat_holder.push(d.main_category);
                cat_freq.push(1);
                cat_backers.push(parseInt(d.backers));
                cat_fund.push(parseFloat(d.usd_pledged_real));
                cat_success.push(1);
                // console.log(cat_success);

                // sub cat stuff
                subcat.push([d.category]);
                subcat_freq.push([1]);
                subcat_backers.push([parseInt(d.backers)]);
                subcat_fund.push([parseFloat(d.usd_pledged_real)]);
                subcat_success.push([1]);

            } else {

                var cat_index = cat_holder.indexOf(d.main_category);

                // new subcat
                if (subcat[cat_index].indexOf(d.category) == -1) {
                    subcat[cat_index].push([d.category]);
                    subcat_freq[cat_index].push([1]);
                    subcat_backers[cat_index].push([parseInt(d.backers)]);
                    subcat_fund[cat_index].push([parseFloat(d.usd_pledged_real)]);
                    subcat_success[cat_index].push([1]);

                } else { // modify subcat

                    var subcat_index = subcat[cat_index].indexOf(d.category);

                    subcat_freq[cat_index][subcat_index] += 1;
                    subcat_backers[cat_index][subcat_index].push(parseInt(d.backers));
                    subcat_fund[cat_index][subcat_index].push(parseFloat(d.usd_pledged_real));
                    if ((d.state) == 'successful') {
                        subcat_success[cat_index][subcat_index] += 1;
                    }
                }

                // main cat stuff
                cat_freq[cat_index] += 1;
                cat_backers[cat_index] += parseInt(d.backers);
                cat_fund[cat_index] += parseFloat(d.usd_pledged_real);
                if ((d.state) == 'successful') {
                    cat_success[cat_index] += 1;
            }
        });

        cat_holder.forEach(function (d, i) {
            var new_obj = {
                name: d,
                freq: cat_freq[i],
                fund: cat_fund[i],
                backers: cat_backers[i],
                success: cat_success[i]
            };
            categories.push(new_obj);
        })

        hue_step = 360.0 / (categories.length + 1);

        makeChart(categories, top_display);

        // console.log(cat_holder);
        // console.log(cat_freq);
        // console.log(categories);
    });
}

var makeChart = function (data, thing) {
    console.log(thing);
    data = {
        "children": data
    };
    // console.log(data);

    var bubble = d3.pack(data)
    .size([WIDTH - 2, HEIGHT - 2])
    .padding(1.5);;

    // console.log(bubble);

    var nodes = d3.hierarchy(data)
    .sum(function (d) {
        return d[thing];
    });

    svg.html("");

    var node = svg.selectAll(".node")
    .data(bubble(nodes).descendants())
    .enter()
    .filter(function (d) {
        return !d.children
    })
    .append("g")
    .attr("class", "node")
    .attr("transform", function (d) {
        return "translate(" + d.x + "," + d.y + ")";
    })

    // console.log(node);
    node.append("title")
    .text(function (d) {
        // console.log(d);
        if (thing == "fund"){
            return d.data.name + ": $" + Math.floor(d.data[thing]);
        }
        else if (thing == "success") {
            return d.data.name + ": " + Math.floor(100*d.data["success"]/d.data["freq"])+"%";
        }
        else{
            return d.data.name + ": " + Math.floor(d.data[thing]);
        }
    });

    node.append("circle")
    .attr("r", function (d) {
        return d.r;
    })
    .style("fill", function () {
        var c = d3.color("hsl(" + hue + ", 90%, 50%)");
        hue += hue_step;
        return c;
    })
    .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
    .on("mouseout", function() { d3.select(this).attr("stroke", null); })
    .on("click", () => console.log("hello"));

    node.append("text")
    .attr("dy", ".3em")
    .style("text-anchor", "middle")
    .style('fill', 'black')
    .attr("class", "cir_text")
    .text(function (d) {
        //return "hat";
        return d.data.name;
    });
};

go();


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
