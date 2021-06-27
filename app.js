if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	 
	const canvas = document.getElementById('canvas');
	const c = canvas.getContext('2d');

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	let score = 0;
	let playing = true;
	let difficulty = 1;

	setInterval(() => {
		difficulty += 0.1;
	}, 2000);

	const refreshRate = 100;

	class Player{
		
		constructor(){
			this.x = canvas.width / 4;
			this.y = canvas.height / 2;
			this.radius = 20;
			this.colour = 'red';
			this.xVel = 0;
			this.yVel = 0;
			this.accel = 0.2;
		}

		draw(){
			c.beginPath();
			c.fillStyle = this.colour;
			c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
			c.fill();
		}


		update(){
			player.draw();
			this.yVel += this.accel;
			this.y = this.y += this.yVel;
		}


	}

	class Wall{
		
		constructor(x){
			this.x = canvas.width - 10;
			this.y = 0
			this.width = 20;
			this.height = canvas.height;
			this.colour = 'black';
			this.xVel = 2;
			this.gapHeight = Math.random() * canvas.height * 0.8;
			this.gapWidth = 170;
		}

		draw(){
			c.beginPath();
			c.fillStyle = 'green';
			c.fillRect(this.x, this.y, this.width, this.gapHeight);
			c.closePath();

			c.beginPath();
			c.fillRect(this.x, (this.gapHeight + this.gapWidth), this.width, canvas.height);
			c.closePath();		
		}


		update(){
			this.draw();
			this.x = this.x -= this.xVel;
			if(this.x < -20){
				walls.shift()
			}
		}


	}

	const player = new Player;
	const walls = [];

	setInterval(() => {
		const wall = new Wall;
		walls.push(wall);
	}, (3000 / difficulty));

	setInterval(() => {
		score += 1;
	}, 3000);

	window.addEventListener('touchend', () => {	
		player.yVel = -5;
	})

	function animate (){
		if(
			(player.y <= (canvas.height - 10)
			&&
			player.y >= (10))
			&& 
			(playing == true)
			){
			requestAnimationFrame(animate);
			c.clearRect(0, 0, canvas.width, canvas.height);
			c.fillStyle = "#7aebff";
			c.fillRect(0, 0, canvas.width, canvas.height);
			player.update();

			walls.forEach((wall) => {
				wall.update();

				if (
					((player.x > wall.x -10)
					&&
					(player.x < wall.x + 10))
					&&
					(((player.y - 10) < wall.gapHeight
					||
					((player.y + 10) > wall.gapHeight + wall.gapWidth)
					))
					){
						playing = false;
					}
			});

			c.font = "30px Arial";
			c.fillStyle = 'black';
			c.fillText("Score: " + score, 10, 50);

		} else {
			alert(`Hit! Your score was: ${score}`);
			window.location.reload();
		}
	}

	animate();

}






