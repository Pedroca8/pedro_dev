import devGif from '../assets/programador.gif';

export function Hero(){
    return(
        <section className='relative w-full h-dvh flex items-center justify-center overflow-hidden bg-[#dad8d4]' >
            <div className='absolute inset-0 z-10 opacity-15 pointer-events-none bg-noise' />
                <div className='absolute inset-0 z-0 filter blur-[100px]'>
                    <div className='absolute -top-24 -right-24 w-[500px] h-[500px] bg-[#fdfc47] rounded-full opacity-70 animate-blob-2'/>
                    <div className='absolute -bottom-12 -left-12 w-[400px] h-[400px] bg-[#7ed957] rounded-full opacity-70 animate-blob-1'/>
                </div>
                <div className="relative z-20 container mx-auto px-6 flex-col flex lg:flex-row items-center justify-between gap-12">
                    <article className="flex-1 text-center lg:text-left">
                        <h1 className="font-['Archivo Black'] text-5xl lg:text-8xl font-bold text-[#1a1a1a] mb-6 leading-tight uppercase">
                            Pedro Henrique
                        </h1>
                        <p className="text-lg lg:text-xl text-[#444] leading-relaxed max-w-[ 500px ] mx-auto lg:mx-0 mb-8 font-['Sora']">
                            Desenvolvedor focado em criar experiências digitais únicas.
                            Transformando ideias complexas em interfaces simples e elegantes.
                        </p>

                        <div className=" flex flex-wrap justify-center lg:justify-start items-center gap-4">
                            <button className="px-8 py-3 border border-black rounded-md hover:bg-black hover:text-[#dad8d4] transition-all from-neutral-300 cursor-pointer font-bold">
                                <a href="/Sobre">SAIBA MAIS</a>
                            </button>
                            <a href="/#" className=" text-black hover:underline transition-all duration-300">Entre em Contato</a>
                        </div>
                    </article>

                    <div className="flex-1 flex jus] lg:justify-end">
                        <img
                        src={devGif}
                        alt="Programador Animado"
                        className='w-full max-w-[400px] lg:max-w-[500px] object-contain drop-shadow-2xl'
                        />
                    </div>
                </div>

        </section>
    )
}
