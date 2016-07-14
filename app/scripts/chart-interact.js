$(document).ready(function () {
    
    $("svg").mouseenter(function () {

        //off to prevent multiple tooltips showing up        
        $("rect").off().mouseenter(function () {
            $(".tooltip").remove();
            let xPosition = event.clientX;
            let yPosition = event.clientY;
            let mousePosition = [xPosition, yPosition];
            console.log(mousePosition);

            //not sure this is the best place to get the data, but it works, I guess            
            let crimes = $(this).context.__data__.data;
            
            let year = crimes["Year"];
            let population = crimes["Population"];
            let violentCrime = crimes["Violent Crime"];
            
            let assault = crimes["Aggravated Assault"] 
            let assaultRate = rateFormat(assault / violentCrime);

            let robbery = crimes["Robbery"]
            let robberyRate = rateFormat(robbery / violentCrime);

            let rape = crimes["Forcible Rape"]
            let rapeRate = rateFormat(rape / violentCrime);

            let murder = crimes["Murder"]
            let murderRate = rateFormat(murder / violentCrime);
            
            createTooltip(mousePosition, year, population, violentCrime, assault, assaultRate, robbery, robberyRate, rape, rapeRate, murder, murderRate);


        })
    })
        .mouseout(function () {
            $(".tooltip").remove();
    })
    
    function rateFormat(rate) {
        return (rate * 100).toFixed(2) + "%";
    }

    function createTooltip(mousePosition, year, population, violentCrime, assault, assaultRate, robbery, robberyRate, rape, rapeRate, murder, murderRate) {
        let background = createBackground(mousePosition);
        let dataTable = createTable(year, population, violentCrime, assault, assaultRate, robbery, robberyRate, rape, rapeRate, murder, murderRate);
        background.prepend(dataTable);
        $("body").prepend(background);
        
        
    }

    function createBackground(mousePosition) {
        let background = $("<div/>", {
            class: "tooltip",
            position: "absolute"
        })
        background.css({
            left: mousePosition[0] - 200+ "px",
            top: mousePosition[1] + "px"
        })
        return background;
    }

//need to clean this up for efficiency    
    function createTable(year, population, violentCrime, assault, assaultRate, robbery, robberyRate, rape, rapeRate, murder, murderRate) {
        let table = "<table><caption>" + year + 
            `</caption>
                <thead>
                <th>Crime</th>
                <th>Total Number</th>
                <th>Percent of Total</th>
            </thead>
            <tbody>
            <tr>
                <td>Aggravated Assault</td>
                <td>
            ` + assault + "</td><td>" + assaultRate + "</td>"
          + `
            </tr>
            <tr>
                <td>Robbery</td>
                <td>
            ` + robbery + "</td><td>" + robberyRate + "</td>"
            + `
            </tr>
            <tr>
                <td>Rape</td>
                <td>
            ` + rape + "</td><td>" + rapeRate + "</td>"
            + `
            </tr>
            <tr>
                <td>Murder</td>
                <td>
        ` + murder + "</td><td>" + murderRate + "</td>"
        + "</tr></table>"
            
            
        return table;
    }

})