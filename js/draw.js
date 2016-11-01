// Pie
google.charts.load('current', { 'packages': ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable(arrayForDrawPie);
    var options = {
        title: 'Companies by location',
        width: '100%',
        height: '100%',
        axisTitlesPosition: 'out',
        chartArea: {
            left: "25%",
            top: "3%",
            height: "80%",
            width: "100%"
        },
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
    google.visualization.events.addListener(chart, 'select', selectHandler);

    function selectHandler() {
        var selectedItem = chart.getSelection();
        if (selectedItem) {
            var name = data.getValue(chart.getSelection()[0].row, 0);
            getListCompanyByLocation(name);
        }
    }
}
// Column
function drawChart2() {
    var data2 = google.visualization.arrayToDataTable(arrayForDrawColumn);
    var options2 = {
        title: ' ',
        legend: { position: 'none' },
        pieSliceText: 'percentage',
        width: '100%',
        height: '100%',
        axisTitlesPosition: 'out',
        chartArea: {
            left: "3%",
            top: "3%",
            height: "94%",
            width: "94%"
        }
    };
    var chart2 = new google.charts.Bar(document.getElementById('columnchart'));
    chart2.draw(data2, options2);

}
$(window).resize(function() {
    console.log("resize");
    google.charts.setOnLoadCallback(drawChart2);
    google.charts.setOnLoadCallback(drawChart);
});
