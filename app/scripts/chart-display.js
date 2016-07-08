//colors should be given here, not in separate CSS


let margin = {
    vertical: 70,
    horizontal: 70
}

let svgHeight = 800;
let svgWidth = 1100;

let barPadding = 10;

let yearScale = d3.scaleBand()
    .domain(d3.range(1993, 2012))    
    .range([margin.horizontal, svgWidth + margin.horizontal])

//need to come back and make range dynamic
let crimeScale = d3.scaleLinear()
    .domain([0, 1500000])
    .range([0, 600])
    
let yScale = d3.scaleLinear()
    .domain([0,1500000])    
    .range([600,0])

let yearAxis = d3.axisBottom(yearScale)   
    .tickValues(d3.range(1993, 2012)) 

let crimeAxis = d3.axisLeft(yScale)
    .tickValues(d3.range(0, 2250000, 250000))

 
let svg = d3.select("body")
    .append("svg")
    .attr("height", svgHeight + 2*margin.vertical)
    .attr("width", svgWidth + 2*margin.horizontal)

let stack = d3.stack()
    .keys(["Murder", "Forcible Rape", "Robbery", "Aggravated Assault"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

d3.tsv("./data/violent-crime.tsv", function (error, data) {
    if (error) throw error;
   
    let barWidth = svgWidth / data.length - barPadding;
    // let mostCrime = 0;

    //takes all data and makes it into integers    
    data.forEach(function (d) {
        d["Murder"] = parseInt(d["Murder"].replace(/,/g, ""));
        d["Forcible Rape"] = parseInt(d["Forcible Rape"].replace(/,/g, ""));
        d["Robbery"] = parseInt(d["Robbery"].replace(/,/g, ""));
        d["Aggravated Assault"] = parseInt(d["Aggravated Assault"].replace(/,/g, ""));
        d["Violent Crime"] = parseInt(d["Violent Crime"].replace(/,/g, ""));

        // if (d["Violent Crime"] > mostCrime) {
        //     mostCrime = d["Violent Crime"];
        // }
       
    })
    
    let crimes = svg.selectAll(".crimes")
        .data(stack(data))
        .enter()
        .append("g")
        .attr("class", function (d) {return d.key })
    
    let more = crimes.selectAll("rect")
        .data(function (d, i) { return d })
        .enter()
        .append("rect")
        .attr("class", function (d) { return d.data.Year })
        .attr("x", margin.horizontal)

        //each bar takes up room equivalent to itself and its padding. The index keeps them spaced apart
        .attr("transform", function (d, i) { return "translate(" + i * (barWidth + barPadding)  + "," + crimeScale(d[0]) +")" })
        .attr("width", barWidth)
        
        .attr("size", function(d) { return crimeScale(d[1]) -crimeScale(d[0])})
        .attr("y", function (d) {return svgHeight + margin.vertical - crimeScale(d[0]) - crimeScale(d[1])})
        .attr("height", function (d) { return crimeScale(d[1]) - crimeScale(d[0]) })    
  
  
})          


svg.append("g")
    .attr("class", "axis")     
    .attr("transform", "translate(0,900)")
    .call(yearAxis)

    .append("g")
    .attr("class", "axis")
    .attr("transform", "translate(70,-" + (svgHeight - 2*margin.vertical - 30) + ")")
    .call(crimeAxis)

                                                           