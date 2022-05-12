import Cliente from "../core/Cliente"

interface BotaoAcao {    
    cliente: Cliente
    onClick?: (cliente: Cliente) => void
    clienteSelecionado?: (cliente: Cliente) => void
    className?: string
    children: any
}

export default function BotaoAcao(props: BotaoAcao) {
    
    function renderBotao() {
        return (
        
            <button 
                onClick={() => props.onClick?.(props.cliente)}         
                className={`
                            flex justify-center items-center
                             rounded-full p-2 m-1
                            hover:bg-purple-50
                            ${props.className}
            `}>
                {props.children}
            </button>        
        )
    }

    return (
        <>
            {props.onClick ? renderBotao(): false}
        </>           
        
    )
}