let HEIGHT = 800;
let WIDTH = 900;

var body = d3.select("body");
var svg = body.append("svg")
.attr("width", WIDTH)
.attr("height", HEIGHT)
.attr("class", "bubble")
.style("border", "1px solid black")
.attr("id", "svgboi")
.attr("viewBox", "0 0 " + WIDTH + " " + HEIGHT);

svg.append("text")
.attr("dy", ".3em")
.attr("x", 200)
.attr("y", 200)
.style("text-anchor", "middle")
.style('fill', 'black')
.attr("class", "cir_text")
.text("Hold up buddy");

var tab_container = body.append("div")
                        .attr("class", "table-container");

// colors
var hue = 145;
var hue_step;

// main cats
var top_display = "freq";
var cat_holder = [];
var cat_freq = [];
var cat_fund = [];
var cat_backers = [];
var cat_success = [];

// sub cats
var subcat = [];
var subcat_freq = [];
var subcat_fund = [];
var subcat_backers = [];
var subcat_success = [];

var subcat_topfund = {};
var subcat_topbackers={};

// sorted master lists
var sorted_fund = [];
var sorted_backers = [];

// parsed array
var categories = [];


var changeDisplay = function (new_state) {
    hue = 145;
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
        sorted_fund.reverse();
        sorted_backers.reverse();
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
                temp1=[];
                temp2=[];
                ind1=0;
                ind2=0;
                for (i=0, step=1;step<=10 && i<=sorted_fund.length;i++){
                    //console.log(sorted_fund[i]);
                    if (sorted_fund[i]["category"] == d.category) {
                        temp1.push(sorted_fund[i]);
                        step+=1;
                    }
                }
                for (i=0, step=1;step<=10 && i<=sorted_backers.length;i++){
                    //console.log(sorted_fund[i]);
                    if (sorted_backers[i]["category"] == d.category) {
                        temp2.push(sorted_backers[i]);
                        step+=1;
                    }
                }
                // console.log(temp1);
                subcat_topfund[d.main_category]=[temp1];
                //console.log(subcat_topfund);
                subcat_topbackers[d.main_category]=[temp2];
                //console.log(subcat_topbackers);
                subcat_success.push([1]);
            } else {

                var cat_index = cat_holder.indexOf(d.main_category);

                // new subcat if it doesn't exist
                if (subcat[cat_index].indexOf(d.category) == -1) {
                    subcat[cat_index].push(d.category);
                    subcat_freq[cat_index].push(1);
                    subcat_backers[cat_index].push(parseInt(d.backers));
                    subcat_fund[cat_index].push(parseFloat(d.usd_pledged_real));
                    subcat_success[cat_index].push(1);
                    temp1=[];
                    temp2=[];
                    // for (step=1;step<=10 && step<=sorted_fund.length;step++){
                    //   //!!!!!!!!!!!
                    //   //!!!!!!!!!!!
                    //   temp1.push(sorted_fund[sorted_fund.slice(ind1).indexOf(d.category)]);
                    //   temp2.push(sorted_fund[sorted_fund.slice(ind1).indexOf(d.category)]);
                    //   //!!!!!!!!!!!
                    //   //!!!!!!!!!!!
                    // }
                    // subcat_topfund[cat_index].push(temp1);
                    // subcat_topbackers[cat_index].push(temp2);
                    //console.log(subcat_topbackers);
                    for (i=0, step=1;step<=10 && i<=sorted_fund.length;i++){
                        //console.log(sorted_fund[i]);
                        if (sorted_fund[i]["category"] == d.category) {
                            temp1.push(sorted_fund[i]);
                            step+=1;
                        }
                    }
                    for (i=0, step=1;step<=10 && i<=sorted_backers.length;i++){
                        //console.log(sorted_fund[i]);
                        if (sorted_backers[i]["category"] == d.category) {
                            temp2.push(sorted_backers[i]);
                            step+=1;
                        }
                    }
                    // subcat_topfund.push(temp1);
                    // //console.log(subcat_topfund);
                    // subcat_topbackers.push(temp2);
                    subcat_topfund[d.main_category].push(temp1);
                    //console.log(subcat_topfund);
                    subcat_topbackers[d.main_category].push(temp2);


                } else { // modify subcat

                    var subcat_index = subcat[cat_index].indexOf(d.category);

                    subcat_freq[cat_index][subcat_index] += 1;
                    subcat_backers[cat_index][subcat_index] += parseInt(d.backers);
                    subcat_fund[cat_index][subcat_index] += parseFloat(d.usd_pledged_real);
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
            }
        });

        // console.log(subcat);
        // console.log(subcat_freq);
        // console.log(cat_holder);
        // console.log(cat_fund);

        cat_holder.forEach(function (d, cat_i) {
            var new_cat = {
                name: d,
                freq: cat_freq[cat_i],
                fund: cat_fund[cat_i],
                backers: cat_backers[cat_i],
                success: cat_success[cat_i],
                children: []
            };
            var cat = d;
            subcat[cat_i].forEach(function(d, subcat_i) {

                var new_subcat = {
                    name: d,
                    freq: subcat_freq[cat_i][subcat_i],
                    fund: subcat_fund[cat_i][subcat_i],
                    backers: subcat_backers[cat_i][subcat_i],
                    success: subcat_freq[cat_i][subcat_i],
                    topFund: subcat_topfund[cat][subcat_i],
                    topBack: subcat_topbackers[cat][subcat_i]
                }
                //console.log(new_subcat["topFund"])
                new_cat["children"].push(new_subcat);
            })
            categories.push(new_cat);
        })

        hue_step = 25.0 / (categories.length + 1);

        //console.log(categories);

        makeChart(categories, top_display);

    });
}

var makeChart = function (data, thing) {
    // console.log(data);
    // console.log(thing);
    data = {
        "children": data
    };
    // console.log(data);

    var bubble = d3.pack(data)
    .size([WIDTH - 2, HEIGHT - 2])
    .padding(3);;

    // console.log(bubble);

    var nodes = d3.hierarchy(data)
    .sum(function (d) {
        return d[thing];
    })
    .sort((a, b) => b[thing] - a[thing]);

    svg.html("");


    // var color = d3.scaleLinear()
    // .domain([0, categories.length + 1])
    // .range(["hsl(0,80%,80%)", "hsl(100,90%,50%)"])
    // .interpolate(d3.interpolateHcl)

    var color = function () {
        var c = d3.color("hsl(" + hue + ", 80%, 80%)");
        hue += hue_step;
        return c;
    };

    const node = svg.append("g")
        .selectAll("circle")
        .data(bubble(nodes).descendants().slice(1))
        .join("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("fill", d => d.children ? color(d.depth) : "hsl(160, 100%, 98%)")
        // .attr("pointer-events", d => !d.children ? "none" : null)
        .attr("class", d => !d.children ? "sub":"main")
        .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); })
        .on("mouseout", function() { d3.select(this).attr("stroke", null); })
        .on("click", d => focus !== d && (zoom(d), d3.event.stopPropagation()));

    var showInfo = function(e) {
        d3.event.stopPropagation();
        d3.select(this);

        var makeTable = function() {
            tab_container.html("");
            tab_container.append("h4").html("Most backers")

            var table = tab_container.append("table")
            .attr("class", "table table-bordered")
            .attr("id", "tableBoi")
            // .style("border","2px solid black")
            .style("text-align","center");

            tab_container.append("h4").html("Most funding")

            var table2 = tab_container.append("table")
            .attr("class", "table table-bordered")
            .attr("id", "tableBoi2")
            // .style("border","2px solid black")
            .style("text-align","center");
            theHTML="<thead><tr><th>Project</th><th>Funding</th><th>Backers</th></tr></thead>"
            for (i=0;i<e.data.topBack.length;i++){
                theHTML+="<tr><td>"+e.data.topBack[i].name+"</td><td>$"+e.data.topBack[i].usd_pledged_real+"</td><td>"+e.data.topBack[i].backers+"</td></tr>";
            }
            table.html(theHTML);
            theHTML="<thead><tr><th>Project</th><th>Funding</th><th>Backers</th></tr></thead>"
            for (i=0;i<e.data.topFund.length;i++){
                theHTML+="<tr><td>"+e.data.topFund[i].name+"</td><td>$"+e.data.topFund[i].usd_pledged_real+"</td><td>"+e.data.topFund[i].backers+"</td></tr>";
            }
            table2.html(theHTML);
        }

        console.log(e.data);
        makeTable();
        //console.log(e.data.name);
    };

    var sub = d3.selectAll(".sub")
        .on("click", showInfo);
        // .on("click", function() {
        //     d3.select(this)
        //
        // });

        //.on("click", d => console.log(d.children));


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

    const label = svg.append("g")
        .style("font", "10px sans-serif")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .selectAll("text")
        .data(bubble(nodes).descendants())
        .join("text")
        .style("fill-opacity", d => d.parent === bubble(nodes) ? 1 : 0)
        .style("display", d => d.parent === bubble(nodes) ? "inline" : "none")
        .text(d => d.data.name)
        .attr("transform", d => "translate(" + d.x + "," + d.y + ")");

    // var view = [bubble(nodes).x, bubble(nodes).y, bubble(nodes).r * 2]
    var view = [0,0,WIDTH];
    var zoomed_in = false;


    var zoomOut = function() {
        console.log(zoomed_in);
        if (zoomed_in) {
            node.attr("r", function (d) {
                return d.r;
            })
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            label.attr("transform", d => "translate(" + d.x + "," + d.y + ")")
            .style("fill-opacity", d => d.parent === bubble(nodes) ? 1 : 0)
            .style("display", d => d.parent === bubble(nodes) ? "inline" : "none")
            .text(d => d.data.name);
            zoomed_in = false;
            focus = bubble(nodes);
        }
    };

    // function shrink(d) {
    //     const transition = svg.transition()
    //         .duration(d3.event.altKey ? 7500 : 750)
    //         .tween("shrink", d => {
    //           return zoomOut();
    //       });
    // };

    svg.on("click", zoomOut);
    //zoomTo(view);

    // function zoomTo(v) {
    //     const k = (WIDTH  / 2) / v[2];
    //
    //     // console.log(k);
    //     view = v;
    //
    //     label.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    //     node.attr("transform", d => "translate(" + d.x + "," + d.y + ")");
    //     node.attr("r", d => d.r);
    // }

    function zoomTo(v) {
        const k = WIDTH / v[2];

        view = v;

        label.attr("transform", d => `translate(${(d.x - v[0]) * k + 100},${(d.y - v[1]) * k + 100})`);
        node.attr("transform", d => `translate(${(d.x - v[0]) * k + 100},${(d.y - v[1]) * k + 100})`);
        node.attr("r", d => d.r * k);
        zoomed_in = true;
    }



    function zoom(d) {
        const focus0 = focus;

        focus = d;

        const transition = svg.transition()
            .duration(d3.event.altKey ? 7500 : 750)
            .tween("zoom", d => {
              const i = d3.interpolateZoom(view, [focus.x - 75, focus.y - 75, focus.r * 4.5]);
              return t => zoomTo(i(t));
            });

        label
          .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .transition(transition)
            .style("fill-opacity", d => d.parent === focus ? 1 : 0)
            .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
            .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }


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
