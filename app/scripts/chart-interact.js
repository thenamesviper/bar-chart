$(document).ready(function () {
    
    $("svg").mouseenter(function () {

        //off to prevent multiple tooltips showing up        
        $("rect").off().mouseenter(function () {

            //allows for bars to be "selected". Poor implementation
            let i = $(this).index();
            $(".Assault rect").eq(i).css("opacity", .4);
            $(".Robbery rect").eq(i).css("opacity", .4);
            $(".Rape rect").eq(i).css("opacity", .4);
            $(".Murder rect").eq(i).css("opacity", .4)
            
            let xPosition = event.clientX;
            let yPosition = event.clientY;
            let mousePosition = [xPosition, yPosition];

            //not sure this is the best place to get the data, but it works, I guess            
            let crimes = $(this).context.__data__.data;

            let year = crimes["Year"];
            let population = crimes["Population"];
            let violentCrime = crimes["Violent Crime"];
            
            //this is such a convoluted way to use all of the data..need to work on this
            //arrays will be: [total crime, assaultPercentage(of total violent crimes), rate per 100,000 people]
            //all formatted already
            let assault = crimes["Aggravated Assault"] 
            let assaultPercent = rateFormat(assault / violentCrime);
            let assaultRate = (assault / population * 100000).toFixed(2);
            assault = assault.toLocaleString();
            let assaults = [assault, assaultPercent,assaultRate];

            let robbery = crimes["Robbery"]
            let robberyPercent = rateFormat(robbery / violentCrime);
            let robberyRate = (robbery / population * 100000).toFixed(2);
            robbery = robbery.toLocaleString();
            let robberies = [robbery, robberyPercent, robberyRate];

            let rape = crimes["Forcible Rape"]
            let rapePercent = rateFormat(rape / violentCrime);
            let rapeRate = (rape / population * 100000).toFixed(2);
            rape = rape.toLocaleString();
            let rapes = [rape, rapePercent, rapeRate];

            let murder = crimes["Murder"]
            let murderPercent = rateFormat(murder / violentCrime);
            let murderRate = (murder / population * 100000).toFixed(2);
            murder = murder.toLocaleString();
            let murders = [murder, murderPercent, murderRate];

            createTooltip(year, population, violentCrime, assaults, robberies, rapes, murders);


        })
            .mouseout(function () {
                //all bars go back to regular opacity. Poor implementation
                $(".Assault rect, .Robbery rect, .Rape rect, .Murder rect").css("opacity", 1)

        })
    })
        .mousemove(function () {
            $("#tooltip").css("left", event.clientX - 200 + "px");
       	    $("#tooltip").css("top", event.clientY - 315 + "px");
        })

        //the following is necessary to stop tooltip from always displaying, but gives flickering 
        .mouseout(function () {
            $("#tooltip").css("display", "none");
    })
        
    
    function rateFormat(rate) {
        return (rate * 100).toFixed(2) + "%";
    }

    function createTooltip(year, population, violentCrime, assaults, robberies, rapes, murders){
      $("#tooltip").css("display", "block");

        //tooltip is given the information based on what bar is it over
        //use for loop to do this
        $("#tooltip table caption").html(year + "<br/>" + population.toLocaleString());        
        $("#tooltip table tbody tr:first-child td:nth-child(2)").text(assaults[0]);
        $("#tooltip table tbody tr:first-child td:nth-child(3)").text(assaults[1]);
        $("#tooltip table tbody tr:first-child td:nth-child(4)").text(assaults[2]);

        $("#tooltip table tbody tr:nth-child(2) td:nth-child(2)").text(robberies[0]);
        $("#tooltip table tbody tr:nth-child(2) td:nth-child(3)").text(robberies[1]);
        $("#tooltip table tbody tr:nth-child(2) td:nth-child(4)").text(robberies[2]);

        $("#tooltip table tbody tr:nth-child(3) td:nth-child(2)").text(rapes[0]);
        $("#tooltip table tbody tr:nth-child(3) td:nth-child(3)").text(rapes[1]);
        $("#tooltip table tbody tr:nth-child(3) td:nth-child(4)").text(rapes[2]);

        $("#tooltip table tbody tr:nth-child(4) td:nth-child(2)").text(murders[0]);
        $("#tooltip table tbody tr:nth-child(4) td:nth-child(3)").text(murders[1]);
        $("#tooltip table tbody tr:nth-child(4) td:nth-child(4)").text(murders[2]);

        $("#tooltip table tbody tr:nth-child(5) td:nth-child(2)").text(violentCrime);
        $("#tooltip table tbody tr:nth-child(5) td:nth-child(4)").text((violentCrime/population*100000).toFixed(2));
    }

})