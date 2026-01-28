import { useEffect, useRef } from 'react';
import Anascript from '../assets/ana.png'

export function MyAnimationAna(){

    const elementRef = useRef(null);

    useEffect(()=>{
        const frameW = 200;
        const frameH = 296.40;
        const cols = 5;
        const totalFrames = 60;
        const fps = 18;

        let frameAtual = 0;
        let tempoAnterior = 0;


        const animar = (tempoAtual) => {
            if (tempoAtual - tempoAnterior >= 1000 / fps){
                const coluna = frameAtual % cols;
                const linha = Math.floor(frameAtual / cols);

                const posX = Math.round(-(coluna * frameW));
                const posY = Math.round(-(linha * frameH));

                if(elementRef.current){
                    elementRef.current.style.backgroundPosition = `${posX}px ${posY}px`
                }
                frameAtual = (frameAtual + 1) % totalFrames;

                tempoAnterior = tempoAtual;
            }
            requestAnimationFrame(animar);
        };
        const id = requestAnimationFrame(animar);
        return () => cancelAnimationFrame(id);
    }, []);
    return(
        <div ref={elementRef}
        className=' w-[200px] h-[296.50px] bg-no-repeat bg-size-[1000px] block'
        style={{
            backgroundImage: `url(${Anascript})`,
            imageRendering: 'pixelated',
        }}
        ></div>
    );
}
