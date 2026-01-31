import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import { useRef } from "react";

export function StaticNoise({
    intensity = 0.15,
    speed = 1,
    active = true,
}) {
    const noiseRef = useRef(null);

    useGSAP(() => {
        if(!active) return;

        const playStatic = () => {
            if (noiseRef.current) {
                const x = Math.random() * 100;
                const y = Math.random() * 100;

                gsap.set(noiseRef.current, {
                    backgroundPosition: `${x}% ${y}%`,
                    opacity: intensity
                });
            }
        };
        gsap.ticker.add(playStatic);

        return () => gsap.ticker.remove(playStatic);
    }, [intensity, speed, active]);
    return(
        <div
            ref={noiseRef}
            className="fixed inset-0 pointer-events-none z-10 bg-noise"
            style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
    />
    );
}
