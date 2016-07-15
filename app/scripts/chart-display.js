//colors should be given here, not in separate CSS


let margin = {
    vertical: 70,
    horizontal: 70
}

let svgHeight = 800;
let svgWidth = 1100;

let barPadding = 10;

let yearScale = d3.scaleBand()
    .domain(d3.range(1993, 2013))    
    .range([margin.horizontal, svgWidth + margin.horizontal])

//need to come back and make range dynamic
let crimeScale = d3.scaleLinear()
    .domain([0, 1500000])
    .range([0, 600])
    
let yScale = d3.scaleLinear()
    .domain([0,1500000])    
    .range([600,0])

let yearAxis = d3.axisBottom(yearScale)   
    .tickValues(d3.range(1993, 2013)) 

let crimeAxis = d3.axisLeft(yScale)
    .tickValues(d3.range(0, 2250000, 250000))

 
let svg = d3.select("#mySvg")
    .attr("height", svgHeight + 2*margin.vertical)
    .attr("width", svgWidth + 2*margin.horizontal)

let stack = d3.stack()
    .keys(["Murder", "Forcible Rape", "Robbery", "Aggravated Assault"])
    .order(d3.stackOrderNone)
    .offset(d3.stackOffsetNone);

d3.tsv("./data/violent-crime.tsv", function (error, data) {
    if (error) throw error;
   
    let barWidth = svgWidth / data.length - barPadding;

    //takes all data and makes it into integers    
    data.forEach(function (d) {
        d["Murder"] = parseInt(d["Murder"].replace(/,/g, ""));
        d["Forcible Rape"] = parseInt(d["Forcible Rape"].replace(/,/g, ""));
        d["Robbery"] = parseInt(d["Robbery"].replace(/,/g, ""));
        d["Aggravated Assault"] = parseInt(d["Aggravated Assault"].replace(/,/g, ""));
        d["Violent Crime"] = parseInt(d["Violent Crime"].replace(/,/g, ""));
        d["Population"] = parseInt(d["Population"].replace(/,/g, ""));
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
        .attr("x", 2*margin.horizontal)

        //each bar takes up room equivalent to itself and its padding. The index keeps them spaced apart
        .attr("transform", function (d, i) { return "translate(" + i * (barWidth + barPadding)  + "," + crimeScale(d[0]) +")" })
        .attr("width", barWidth)
        
        .attr("count", function(d,i) { return d[1]-d[0]})
        .attr("size", function(d) { return crimeScale(d[1]) -crimeScale(d[0])})
        .attr("y", function (d) {return svgHeight + margin.vertical - crimeScale(d[0]) - crimeScale(d[1])})
        .attr("height", function (d) { return crimeScale(d[1]) - crimeScale(d[0]) })    
    
        // .on("mouseover", function(d,i) {console.log(d) })
  
  
})          

svg.append("g")
    .attr("class", "x axis")     
    .attr("transform", "translate(65,880)")
    .call(yearAxis)

svg.append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(135,270)")
    // .attr("transform", "translate(70,-" + (svgHeight - 2*margin.vertical - 50) + ")")
    .call(crimeAxis)


//all that follows is poor implementation

svg.append("text")
    .attr("class", "label")    
    .attr("y", 925)
    .attr("x", 600)
    .text("Year")

svg.append("text")   
    .attr("class", "label")    
    .attr("transform", "translate(30,600)rotate(-90)")
    .text("Total Number of Violent Crimes")

svg.append("text")
    .attr("id", "title")
    .attr("x", 300)
    .attr("y", 50)
    .text("Violent Crime in the United States")

svg.append("text")
    .attr("id", "source")    
    .attr("x", 590)
    .attr("y", 90)
    .text("(Source: FBI)")


//this is even more garbage. more of a temporary thing until figure out actual implementation
let legend = svg.append("rect")
    .attr("x", 995)
    .attr("y", 100)
    .attr("height", 105)
    .attr("width", 210)
    .attr("fill", "lightgray")

svg.append("text")
    .attr("font-size", "1.5em")    
    .attr("x", 1000)
    .attr("y", 125)
    .style("fill", "navy")
    .text("Aggravated Assault")

svg.append("text")
    .attr("font-size", "1.5em")    
    .attr("x", 1000)
    .attr("y", 150)
    .style("fill", "maroon")
    .text("Robbery")

svg.append("text")
    .attr("font-size", "1.5em")        
    .attr("x", 1000)
    .attr("y", 175)
    .style("fill", "orange")
    .text("Rape")

svg.append("text")
    .attr("font-size", "1.5em")        
    .attr("x", 1000)
    .attr("y", 200)
    .style("fill", "teal")
    .text("Murder")

