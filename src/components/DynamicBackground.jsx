import { StaticNoise } from "./StaticNoise";

export function  DynamicBackground({
    color1 = '#fdfc47',
    color2 = '#7ed957',
    noiseOpacity = 0.40,
    blurAmont  = 100
}){

    return(
        <div className=" fixed inset-0 w-full h-full -z-50 bg-[#DAD8D4]">

        <div
        className='absolute inset-0 z-1 pointer-events-none bg-noise'
        style={{opacity: noiseOpacity}}
        />

            <div className='absolute inset-0 z-0'
            style={{filter: `blur(${blurAmont}px)`}}
            >
                <div className='absolute -top-24 -right-24 w-[500px] h-[500px] rounded-full opacity-70 animate-blob-slow'
                style={{backgroundColor: color1}}
                />
                <div className='absolute -bottom-12 -left-12 w-[400px] h-[400px] rounded-full opacity-70 animate-blob-slow [animation-delay:2s]'
                style={{backgroundColor: color2}}
                />
            </div>
        </div>
    );
}
