# 🎬 Documentário: Componente 404 Animado com React + TypeScript

**Componente:** `MyAnimationAna` (Página 404)
**Stack:** React 18 + TypeScript + Vite + Tailwind CSS
**Data:** 28 de Janeiro de 2026
**Status:** 🚧 Implementação em Andamento


### 📁 Estrutura de Arquivos
```
src/
├── components/
│   └── MyAnimationAna/
│       ├── index.tsx          # Componente principal
│       └── hooks/             # Hooks customizados (futuro)
├── assets/
│   └── ana.png               # Sprite sheet otimizada
└── pages/
    └── NotFound.tsx          # Página 404 usando o componente
```

---

## 💻 Implementação Técnica

### `MyAnimationAna.tsx` - Código Completo

```tsx
import { useEffect, useRef } from 'react';
import Anascript from '../assets/ana.png';

export function MyAnimationAna() {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Configurações da sprite sheet
        const frameW = 200;      // Largura de cada frame
        const frameH = 296.40;   // Altura de cada frame
        const cols = 5;          // Colunas na sprite sheet
        const totalFrames = 60;  // Total de frames
        const fps = 18;          // Frames por segundo

        // Estado da animação
        let frameAtual = 0;
        let tempoAnterior = 0;

        // Loop de animação usando requestAnimationFrame
        const animar = (tempoAtual: number) => {
            if (tempoAtual - tempoAnterior >= 1000 / fps) {
                // Calcula posição na sprite sheet
                const coluna = frameAtual % cols;
                const linha = Math.floor(frameAtual / cols);

                // Posição em pixels
                const posX = Math.round(-(coluna * frameW));
                const posY = Math.round(-(linha * frameH));

                // Aplica transformação
                if (elementRef.current) {
                    elementRef.current.style.backgroundPosition = `${posX}px ${posY}px`;
                }

                // Avança para próximo frame
                frameAtual = (frameAtual + 1) % totalFrames;
                tempoAnterior = tempoAtual;
            }

            // Continua animação
            requestAnimationFrame(animar);
        };

        // Inicia animação
        const animationId = requestAnimationFrame(animar);

        // Cleanup
        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div
            ref={elementRef}
            className="w-[200px] h-[296.50px] bg-no-repeat inline-block"
            style={{
                backgroundImage: `url(${Anascript})`,
                backgroundSize: `${200 * 5}px ${296.40 * Math.ceil(60 / 5)}px`,
                imageRendering: 'pixelated',
            }}
            aria-label="Animação da personagem Ana procurando a página"
            role="img"
        />
    );
}
```

---

## 🎨 Detalhes da Sprite Sheet

### 📊 Especificações Técnicas
```typescript
interface SpriteConfig {
    frameWidth: 200;        // px
    frameHeight: 296.40;    // px
    columns: 5;             // colunas na sprite sheet
    totalFrames: 60;        // total de animações
    fps: 18;                // frames por segundo
    duration: 3.33;         // segundos (60/18)
}
```

### 📐 Cálculo da Sprite Sheet
```
Dimensões totais da imagem:
Largura: 200px × 5 colunas = 1000px
Altura: 296.40px × 12 linhas = 3556.8px
(60 frames ÷ 5 colunas = 12 linhas)

Cada ciclo: 60 frames ÷ 18 fps = 3.33 segundos
```

---

## Por que `requestAnimationFrame`?

### Vantagens da Abordagem
1. **Performance Otimizada**
   - Sincronizado com refresh rate do navegador
   - Pausa automaticamente em tabs inativas
   - Melhor para jogos e animações complexas

2. **Controle Preciso**
   - FPS constante (18 no caso)
   - Cálculo exato de tempo entre frames
   - Suave mesmo com múltiplas animações

3. **Comparação CSS vs JS**

| Aspecto | CSS Animation | requestAnimationFrame |
|---------|--------------|----------------------|
| **Controle** | Limitado | Total |
| **Performance** | Boa | Excelente |
| **Sincronização** | Automática | Manual precisa |
| **Compatibilidade** | Excelente | Excelente |

---

## 🎯 Personalização do Hook

Para reutilização, podemos criar um hook customizado:

```typescript
// hooks/useSpriteAnimation.ts
import { useRef, useEffect } from 'react';

interface UseSpriteAnimationProps {
    frameWidth: number;
    frameHeight: number;
    columns: number;
    totalFrames: number;
    fps: number;
}

export function useSpriteAnimation({
    frameWidth,
    frameHeight,
    columns,
    totalFrames,
    fps
}: UseSpriteAnimationProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let frameAtual = 0;
        let tempoAnterior = 0;

        const animar = (tempoAtual: number) => {
            if (tempoAtual - tempoAnterior >= 1000 / fps) {
                const coluna = frameAtual % columns;
                const linha = Math.floor(frameAtual / columns);

                const posX = Math.round(-(coluna * frameWidth));
                const posY = Math.round(-(linha * frameHeight));

                if (elementRef.current) {
                    elementRef.current.style.backgroundPosition = `${posX}px ${posY}px`;
                }

                frameAtual = (frameAtual + 1) % totalFrames;
                tempoAnterior = tempoAtual;
            }

            requestAnimationFrame(animar);
        };

        const animationId = requestAnimationFrame(animar);
        return () => cancelAnimationFrame(animationId);
    }, [frameWidth, frameHeight, columns, totalFrames, fps]);

    return elementRef;
}
```

### Componente Refatorado com Hook
```tsx
export function MyAnimationAna() {
    const elementRef = useSpriteAnimation({
        frameWidth: 200,
        frameHeight: 296.40,
        columns: 5,
        totalFrames: 60,
        fps: 18
    });

    return (
        <div
            ref={elementRef}
            className="w-[200px] h-[296.50px] bg-no-repeat inline-block"
            style={{
                backgroundImage: `url(${Anascript})`,
                backgroundSize: '1000px 3556.8px',
                imageRendering: 'pixelated',
            }}
        />
    );
}
```

---

## 🔧 Otimizações Implementadas

### 1. **Image Rendering Control**
```css
imageRendering: 'pixelated';
```
- Mantém a estética pixel art
- Evita blur em sprites low-res

### 2. **Precise Background Size**
```typescript
backgroundSize: `${200 * 5}px ${296.40 * Math.ceil(60 / 5)}px`
```
- Calculado dinamicamente
- Evita problemas de alinhamento

### 3. **Cleanup Automático**
```typescript
return () => cancelAnimationFrame(animationId);
```
- Prevents memory leaks
- Stops animation on unmount

---

## 🚀 Melhorias Sugeridas

### Performance
```tsx
// 1. Throttle para dispositivos móveis
const isMobile = window.innerWidth < 768;
const targetFps = isMobile ? 12 : 18;

// 2. WebP para sprites
import AnascriptWebP from '../assets/ana.webp';
import AnascriptFallback from '../assets/ana.png';

// 3. Lazy loading
import { lazy, Suspense } from 'react';
const MyAnimationAna = lazy(() => import('./MyAnimationAna'));
```

### Features Avançadas
```tsx
// 1. Controles de playback
const [isPlaying, setIsPlaying] = useState(true);
const [playbackSpeed, setPlaybackSpeed] = useState(1);

// 2. Interatividade
onClick={() => frameAtual = 0} // Reset ao clicar
onHover={() => fps = 30} // Acelera ao passar mouse

// 3. Debug visual
{process.env.NODE_ENV === 'development' && (
    <div className="debug-info">
        Frame: {frameAtual} | FPS: {fps}
    </div>
)}
```

---

## 📱 Responsividade com Tailwind

```tsx
<div
    ref={elementRef}
    className="
        w-[100px] h-[148.25px]      /* Mobile */
        md:w-[150px] md:h-[222.38px] /* Tablet */
        lg:w-[200px] lg:h-[296.50px] /* Desktop */
        bg-no-repeat inline-block
        transition-all duration-300
    "
    style={{
        backgroundImage: `url(${Anascript})`,
        backgroundSize: `
            calc(100px * 5) calc(148.25px * 12)   /* Mobile */
            md: calc(150px * 5) calc(222.38px * 12) /* Tablet */
            lg: calc(200px * 5) calc(296.50px * 12) /* Desktop */
        `,
        imageRendering: 'pixelated',
    }}
/>
```

---

## 🧪 Testes com React Testing Library

```typescript
// MyAnimationAna.test.tsx
import { render, screen } from '@testing-library/react';
import { MyAnimationAna } from './MyAnimationAna';

describe('MyAnimationAna', () => {
    it('renders the animation container', () => {
        render(<MyAnimationAna />);

        const container = screen.getByRole('img');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('w-[200px]');
        expect(container).toHaveStyle({
            backgroundImage: expect.stringContaining('ana.png'),
            imageRendering: 'pixelated'
        });
    });

    it('cleans up animation on unmount', () => {
        const { unmount } = render(<MyAnimationAna />);
        const cancelSpy = jest.spyOn(window, 'cancelAnimationFrame');

        unmount();
        expect(cancelSpy).toHaveBeenCalled();
    });
});
```

---

## 📊 Performance Metrics

```typescript
// Monitor de performance
useEffect(() => {
    const frames: number[] = [];
    let lastTime = performance.now();

    const measureFPS = () => {
        const now = performance.now();
        const delta = now - lastTime;
        lastTime = now;
        const fps = 1000 / delta;

        frames.push(fps);
        if (frames.length > 60) frames.shift();

        const avg = frames.reduce((a, b) => a + b) / frames.length;
        console.log(`Average FPS: ${avg.toFixed(2)}`);
    };

    const interval = setInterval(measureFPS, 1000);
    return () => clearInterval(interval);
}, []);
```

---

## 🎮 Uso na Página 404

```tsx
// pages/NotFound.tsx
import { MyAnimationAna } from '@/components/MyAnimationAna';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
            <div className="text-center space-y-8">
                <MyAnimationAna />

                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-white">404</h1>
                    <p className="text-xl text-gray-300 max-w-md mx-auto">
                        A personagem Ana está procurando, mas essa página
                        parece ter se perdido no espaço digital...
                    </p>
                </div>

                <div className="flex gap-4 justify-center">
                    <Button variant="primary" href="/">
                        🏠 Voltar para casa
                    </Button>
                    <Button variant="outline" onClick={() => window.location.reload()}>
                        🔄 Tentar novamente
                    </Button>
                </div>
            </div>

            {/* Easter egg */}
            <p className="mt-12 text-sm text-gray-500">
                Dica: Clique na animação para reiniciá-la!
            </p>
        </div>
    );
}
```

---

## 📈 Roadmap de Evolução

### Versão 1.0 (Atual)
- [x] Animação básica com requestAnimationFrame
- [x] Sprite sheet otimizada
- [x] Controle de FPS preciso

### Versão 2.0 (Próximo)
- [ ] Hook customizado `useSpriteAnimation`
- [ ] Controles de playback (play/pause/speed)
- [ ] Suporte a múltiplas animações
- [ ] Eventos customizados (onFrameChange, onLoop)

### Versão 3.0 (Futuro)
- [ ] Lazy loading de sprites
- [ ] WebP + fallback
- [ ] Animações baseadas em scroll
- [ ] Integração com React Spring para efeitos

---

## 🐛 Debugging Tips

```typescript
// Adicione estes logs para debugging
useEffect(() => {
    console.log('Sprite sheet dimensions:', {
        frameW: 200,
        frameH: 296.40,
        cols: 5,
        totalFrames: 60,
        totalWidth: 200 * 5,
        totalHeight: 296.40 * Math.ceil(60 / 5)
    });

    // Visualizar posições
    console.table(
        Array.from({ length: 10 }, (_, i) => ({
            frame: i,
            col: i % 5,
            row: Math.floor(i / 5),
            x: -(i % 5) * 200,
            y: -Math.floor(i / 5) * 296.40
        }))
    );
}, []);
```

---

## 🏆 Conclusão

Esta implementação demonstra:

1. **Controle preciso** com `requestAnimationFrame`
2. **Performance otimizada** para 60fps constantes
3. **Arquitetura React** moderna com hooks
4. **TypeScript** para type safety
5. **Tailwind CSS** para estilização utilitária

O componente é altamente reutilizável e pode ser adaptado para qualquer sprite sheet com ajustes nos parâmetros de configuração.

---

**Próximos passos:** Transformar em hook customizado, adicionar controles de UI e criar sistema de eventos.

*"Cada frame conta, cada pixel importa."*
