var url = "http://free.worldweatheronline.com/feed/marine.ashx?q=-32.50,115.70&format=json&key=c3013999bf225925122409&callback=?"
//function to roundup current time to nearest 3 hours and convert to timecode (0-7)
function getTimeCode(h) {
	if (h<4) {t=1;}
	else {
		if (h<7) {t=2;}
		else {
			if (h<10) {t=3;}
			else {
				if (h<13) {t=4;}
				else {
					if (h<16) {t=5;}
					else {
						if (h<19) {t=6;}
						else {t=7;}
	}}}}}
	return t
}
// function to convert a numeric angle in degrees to a compass direction string
function getCompassDir(angle) {
	if (angle<22.5 || angle>337.5) {
		var compass = 'N';
	}
	else if (angle>22.5 && angle<67.5) {
		var compass = 'NE';
	}
	else if (angle>67.5 && angle<112.5) {
		var compass = 'E';
	}
	else if (angle>112.5 && angle<157.5) {
		var compass = 'SE';
	}
	else if (angle>157.5 && angle<202.5) {
		var compass = 'S';
	}
	else if (angle>202.5 && angle<247.5) {
		var compass = 'SW';
	}
	else if (angle>247.5 && angle<292.5) {
		var compass = 'W';
	}
	else if (angle>292.5 && angle<337.5) {
		var compass = 'NW';
	}
	return compass
}

$(document).ready(function(){
	$.getJSON(url,
		function(data) {
			var currentTime = new Date()
			var hour = currentTime.getHours();
			var tcode = getTimeCode(hour);
			var cDir = getCompassDir(data.data.weather[0].hourly[tcode].swellDir);
			$('#temp').html(data.data.weather[0].hourly[tcode].tempC+"&deg;C");
			$('#wind').html(data.data.weather[0].hourly[tcode].windspeedKmph+" km/h, "+data.data.weather[0].hourly[tcode].winddir16Point);
			//write function above and call here to convert angle to compass direction
			$('#swell').html(data.data.weather[0].hourly[tcode].swellHeight_m+' m, '+cDir);
			$('#pressure').html(data.data.weather[0].hourly[tcode].pressure+" Pa");
			$('#humidity').html(data.data.weather[0].hourly[tcode].humidity+"%");
		});
});