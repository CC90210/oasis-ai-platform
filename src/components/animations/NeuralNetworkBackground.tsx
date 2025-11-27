import { useEffect, useRef } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    connections: number[];
}

export const NeuralNetworkBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const nodesRef = useRef<Node[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize nodes
        const nodeCount = window.innerWidth < 768 ? 30 : 80;
        const nodes: Node[] = [];

        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                connections: []
            });
        }
        nodesRef.current = nodes;

        // Track mouse position
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const maxDistance = 150;
            const mouseInfluence = 100;

            // Update and draw nodes
            nodes.forEach((node, i) => {
                // Update position
                node.x += node.vx;
                node.y += node.vy;

                // Bounce off edges
                if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
                if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

                // Keep in bounds
                node.x = Math.max(0, Math.min(canvas.width, node.x));
                node.y = Math.max(0, Math.min(canvas.height, node.y));

                // Mouse interaction
                const dx = mouseRef.current.x - node.x;
                const dy = mouseRef.current.y - node.y;
                const distToMouse = Math.sqrt(dx * dx + dy * dy);

                let glowIntensity = 0.6;
                if (distToMouse < mouseInfluence) {
                    glowIntensity = 1 - (distToMouse / mouseInfluence) * 0.4;
                }

                // Draw node
                const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 8);
                gradient.addColorStop(0, `rgba(0, 212, 255, ${glowIntensity})`);
                gradient.addColorStop(1, 'rgba(0, 212, 255, 0)');

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 8, 0, Math.PI * 2);
                ctx.fill();

                // Find and draw connections
                nodes.forEach((otherNode, j) => {
                    if (i >= j) return;

                    const dx = otherNode.x - node.x;
                    const dy = otherNode.y - node.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < maxDistance) {
                        const opacity = (1 - distance / maxDistance) * 0.4;

                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(otherNode.x, otherNode.y);
                        ctx.stroke();
                    }
                });
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};
