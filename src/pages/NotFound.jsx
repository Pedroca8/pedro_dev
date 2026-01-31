import { MyAnimationAna } from "../components/MyAnimationAna"
import { DynamicBackground } from "../components/DynamicBackground"

export function NotFound(){
    return(
        <section className=" flex flex-col items-center justify-center w-full min-h-screen h-dvh">
            <DynamicBackground
            color1="#000"
            color2="#000"
            noiseOpacity={0}
            blurAmont={200}
            />

            <div className="flex flex-col lg:flex-row">
                <div className=" text-center lg:text-left max-w-md mb-10 lg:mb-0">
                <h1 className=" font-['Archivo Black'] text-2xl font-bold text-gray-900 mb-4 lg:text-8xl">404</h1>
                <p className=" text-lg w-70 lg:w-auto text-gray-600 leading-relaxed"> Ops! Parece que meu personagem se perdeu no caminho.
                 A página que você está procurando não existe ou foi movida para outra dimensão.</p>
            <a href="/" className="inline-block mt-8 text-blue-600">Voltar ao Início</a>
            </div>
            <div className="flex justify-center items-center">
                <MyAnimationAna/>
            </div>
            </div>

        </section>
    )
}
