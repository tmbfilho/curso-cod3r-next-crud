import Cliente from "../core/Cliente"
import BotaoAcao from "./BotaoAcao"
import { IconeEdicao, IconeLixo } from "./Icones"

interface TabelaProps {
    clientes: Cliente[]
    clienteSelecionado?: (cliente: Cliente) => void
    clienteExcluido?: (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.clienteSelecionado || props.clienteExcluido

    
    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-4">Código</th>
                <th className="text-left p-4">Nome</th>
                <th className="text-left p-4">Idade</th>     
                {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    }


    function renderRows() {
        return props.clientes?.map((cliente, i) => {
            return (
                <tr key={cliente.id} className={`
                    ${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}
                `}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td>{cliente.idade}</td>
                    {renderActions(cliente)}
                </tr>
            )            
        })
    }

    function renderActions(cliente: Cliente) {
        return (
            <td className="flex justify-center">
             
                <BotaoAcao cliente={cliente} onClick={props.clienteSelecionado} className="text-green-600 ">
                    {IconeEdicao}
                </BotaoAcao>
                
                <BotaoAcao cliente={cliente} onClick={props.clienteExcluido} className="text-red-500 ">
                    {IconeLixo}
                </BotaoAcao>

            </td>
        )
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">             
            <thead className={`
                text-gray-100
                bg-gradient-to-r from-purple-500 to-purple-800
            `}>
                {renderHeader()}
            </thead>           
            <tbody>
                {renderRows()}
            </tbody>
            
        </table>
    )
}