// Pie
google.charts.load('current', { 'packages': ['corechart', 'bar'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
    var data = google.visualization.arrayToDataTable(arrayForDrawPie);
    var options = {
        title: 'Companies by location'
    };
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}
// Column
function drawChart2() {
    var data2 = google.visualization.arrayToDataTable(arrayForDrawColumn);
    var options2 = {
        title: ' ',
        legend: { position: 'none' },
         chartArea: {
            left: "25%",
            top: "3%",
            height: "80%",
            width: "100%"
        },
        width: '100%',
        height: '100%',
    };
    var chart2 = new google.charts.Bar(document.getElementById('columnchart'));
    chart2.draw(data2, options2);
}
