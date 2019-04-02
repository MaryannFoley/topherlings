var body = d3.select("body");
var svg = body.append("svg").attr("height", 500).attr("width", 500).attr("style", "border: 1px solid black");

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


d3.csv("kickstarter.csv", function(data) {
    console.log(data);
}
)

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
