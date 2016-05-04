var ctx, ctr, color;
window.onload = function() {
	init();
}

function init() {
	ctr = 0;
	color = [parseInt(Math.random() * 255), parseInt(Math.random() * 255), parseInt(Math.random() * 255)];
	ctx = viz.getContext('2d');
	animate();
}

function animate() {
	ctr ++;
	ctx.fillStyle = getColor();
	ctx.fillRect(0, 0, 100, 50 + ctr);
	window.requestAnimationFrame(animate);
}

function getColor() {
	color[0] += Math.random() > 0.5 ? 1 : -1;
	color[1] += Math.random() > 0.5 ? 1 : -1;
	color[2] += Math.random() > 0.5 ? 1 : -1;
	return 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')';
}