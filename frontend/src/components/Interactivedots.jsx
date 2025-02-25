import React, { useEffect, useRef } from "react";

export const DotLetterEffect = () => {
    const canvasRef = useRef(null);
    const dots = [];
    const letter = "Farris";
    const fontSize = 100;
    const dotSpacing = 5;
    const dotSize = 1;

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d", {willReadFrequently: true});
        canvas.width = window.innerWidth / 1.7;
        canvas.height = 300;

        ctx.fillStyle = "#C19A6B"; // Lighter, warm brown
        ctx.font = `bold ${fontSize}px cursive`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(letter, canvas.width / 2, canvas.height / 2);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < canvas.height; y += dotSpacing) {
            for (let x = 0; x < canvas.width; x += dotSpacing) {
                const index = (y * canvas.width + x) * 4;
                if (imageData.data[index] < 128) {
                    dots.push({
                        x,
                        y,
                        originalX: x,
                        originalY: y,
                        vx: 0,
                        vy: 0,
                    });
                }
            }
        }

        //console.log("Total dots:", dots.length);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            dots.forEach((dot) => {
                dot.x += dot.vx;
                dot.y += dot.vy;
                dot.vx *= 0.85;
                dot.vy *= 0.85;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);
                ctx.fill();
            });
            requestAnimationFrame(animate);
        }
        animate();

        function handleMouseMove(event) {
            const rect = canvas.getBoundingClientRect(); // Get canvas position
            const mouseX = event.clientX - rect.left; // Adjust X coordinate
            const mouseY = event.clientY - rect.top;  // Adjust Y coordinate

            dots.forEach((dot) => {
                const dx = dot.x - mouseX;
                const dy = dot.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 80) {
                    const angle = Math.atan2(dy, dx);
                    dot.vx = Math.cos(angle) * 8;
                    dot.vy = Math.sin(angle) * 8;
                } else {
                    dot.vx += (dot.originalX - dot.x) * 0.1;
                    dot.vy += (dot.originalY - dot.y) * 0.1;
                }
            });
        }

        canvas.addEventListener("mousemove", handleMouseMove);
        return () => canvas.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center", 
            height: "50vh", 
            borderRadius: "100px",
            background: "#F1EBE7"  
            }}>
            <canvas ref={canvasRef} style={{ display: "block", borderRadius: "50px" }} />
        </div>
    );
};

