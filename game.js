const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 400;

// Physics constants
const GRAVITY = 9.81;
const SCALE = 10; // Pixels per meter
const BALL_RADIUS = 5;

// Game objects
let ball = {
    x: 50,
    y: canvas.height - 20,
    vx: 0,
    vy: 0
};

let player = {
    x: 30,
    y: canvas.height - 40,
    width: 20,
    height: 40
};

let isSimulating = false;
let time = 0;
let initialX = 0;
let initialY = 0;

function drawPlayer() {
    ctx.fillStyle = '#FF0000';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.closePath();
}

function drawField() {
    // Draw grass
    ctx.fillStyle = '#2d662d';
    ctx.fillRect(0, canvas.height - 10, canvas.width, 10);
}

function startSimulation() {
    const velocity = parseFloat(document.getElementById('velocity').value);
    const angle = parseFloat(document.getElementById('angle').value);
    
    // Convert angle to radians
    const angleRad = angle * Math.PI / 180;
    
    // Set initial conditions
    initialX = ball.x;
    initialY = ball.y;
    ball.vx = velocity * Math.cos(angleRad);
    ball.vy = -velocity * Math.sin(angleRad); // Negative because y-axis is inverted
    
    isSimulating = true;
    time = 0;
    animate();
}

function calculatePosition(t) {
    // x = x0 + vx * t
    const x = initialX + (ball.vx * SCALE * t);
    
    // y = y0 + vy * t + (1/2) * g * t^2
    const y = initialY + (ball.vy * SCALE * t) + (0.5 * GRAVITY * t * t * SCALE);
    
    return { x, y };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    drawField();
    drawPlayer();
    
    const position = calculatePosition(time);
    drawBall(position.x, position.y);
    
    if (position.y < canvas.height - BALL_RADIUS && position.x < canvas.width) {
        time += 0.02;
        requestAnimationFrame(animate);
    } else {
        isSimulating = false;
        // Reset ball position
        ball.x = 50;
        ball.y = canvas.height - 20;
    }
}

// Initial draw
drawField();
drawPlayer();
drawBall(ball.x, ball.y);