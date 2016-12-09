if (window.Cluster) {
	Cluster.Symbol = ClusterSymbol;
	ClusterSymbol.IconScale = function(sum) {
		return 20 + (5 * Math.log(sum) / Math.log(2));
	};
	ClusterSymbol.IconStyle = function(name) {

		var colorsForLayer = {
			68:'rgb(195, 108, 22)',//subsitance
			69: 'rgb(88, 200, 245)'//cultural

		}
		var activeColorsForLayer = {
			68:'rgb(142, 79, 16)',
			69: 'rgb(45, 104, 128)'

		};
		var me = this;
		var getColor = function(colorMap,
			defaultColor) {
			try {
				var lid = me.cluster_.markers_[0].wrapper.getLayer().getId();
				if (colorMap['' + lid]) {
					return colorMap['' + lid];
				}
			} catch (e) {}
			return defaultColor;


		}


		//expect to be bound to ClusterSymbol object
		if (name == "hover") {

			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: getColor(activeColorsForLayer, "#FDF569"),
				fillOpacity: 0.7,
				strokeWeight: 1.5,
				strokeColor: "#000000",
				labelOrigin: google.maps.Point(0, 0)
			};


		} else {


			return {
				path: google.maps.SymbolPath.CIRCLE,
				fillColor: getColor(colorsForLayer, "#FDF569"),
				fillOpacity: 0.4,
				strokeWeight: 1.5,
				strokeColor: "#000000",
				labelOrigin: google.maps.Point(0, 0)

			};

		}

	};
} else {
	setTimeout(start, 100);
}