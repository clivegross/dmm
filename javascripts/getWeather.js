var url = "http://free.worldweatheronline.com/feed/marine.ashx?q=-32.50,115.70&format=json&key=c3013999bf225925122409&callback=?"
//write function to roundup current time to nearest 3 hours and convert to timecode (0-7)
var tcode = 4;
$(document).ready(function(){
	$.getJSON(url,
		function(data) {
			$('#temp').html(data.data.weather[0].hourly[tcode].tempC+"&deg;C");
			$('#wind').html(""+data.data.weather[0].hourly[tcode].windspeedKmph+"km/h "+data.data.weather[0].hourly[tcode].winddir16Point+"");
			//write function above and call here to convert angle to compass direction
			$('#swell').html(data.data.weather[0].hourly[tcode].swellHeight_m+'m '+data.data.weather[0].hourly[tcode].swellDir+"&deg;");
			$('#pressure').html(data.data.weather[0].hourly[tcode].pressure+"Pa");
			$('#humidity').html(data.data.weather[0].hourly[tcode].humidity+"%");
		});
});