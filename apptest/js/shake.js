var Shake = (function() {

	function eventStart() {
		var SHAKE_THRESHOLD = 3000,
			last_update = 0,
			count = 0,
			x = y = z = last_x = last_y = last_z = 0;

		var oCount = document.getElementById('count');

		if (window.DeviceMotionEvent) {
			window.addEventListener('devicemotion', deviceMotionHandler, false);
		}
		else {
			alert('本设备不支持devicemotion事件');
		}

		function deviceMotionHandler(eventData) {
			var acceleration = eventData.accelerationIncludingGravity,
				curTime = new Date().getTime(),
				speed = 0;

			if ((curTime - last_update) > 100) {
				var diffTime = curTime - last_update;
				last_update = curTime;
				x = acceleration.x;
				y = acceleration.y;
				z = acceleration.z;
				speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

				if (speed > SHAKE_THRESHOLD) {
					count++;
					doResult(count);
				}
				last_x = x;
				last_y = y;
				last_z = z;
			}
		}

		function doResult(count) {
			oCount.innerHTML = count;
		}
	}
	
	return {
		init: function() {
			eventStart();
			// alert('游戏开始，请摇动手机！');
		}
	};

})();