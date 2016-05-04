var ctx, ctr, color;
window.onload = function() {
	ctx = viz.getContext('2d');
	init();
}

function init() {
	ctx.clearRect(0, 0, 1000, 1000);
	ctr = 0;
	color = [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)];
	animate();
}

function animate() {
	if (ctr > 1000) {
		init();
	}
	ctr ++;
	ctx.fillStyle = getColor();
	for (var i = 0; i < parseInt(Math.random() * 10); i ++) {
		ctx.fillRect(110 * i, 0, 100, 50 + ctr);
	}
	window.requestAnimationFrame(animate);
}

function getColor() {
	color[0] += Math.random() > 0.5 ? 1 : -1;
	color[1] += Math.random() > 0.5 ? 1 : -1;
	color[2] += Math.random() > 0.5 ? 1 : -1;
	return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
}