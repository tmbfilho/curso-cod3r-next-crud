import { useEffect, useState } from "react"
import ColecaoCliente from "../backend/db/ColecaoCliente"
import Cliente from "../core/Cliente"
import ClienteRepositorio from "../core/ClienteRepositorio"
import useTabelaOuForm from "./useTabelaOuForm"

export default function useClientes() {
    const repo: ClienteRepositorio = new ColecaoCliente()

    const { tabelaVisivel, formularioVisivel, exibirTabela, exibirFormulario } = useTabelaOuForm()

    const [clientes, setClientes] = useState<Cliente[]>([])
    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
    
    useEffect(obterTodos, [])

    function obterTodos() {
        repo.obterTodos().then((clientes) => {
        setClientes(clientes)
        exibirTabela()
        } )
    }

    function selecionarCliente(clienteSelecionado: Cliente): void {    
        setCliente(clienteSelecionado)
        exibirFormulario()
    }

    async function excluirCliente(cliente: Cliente) {
        await repo.excluir(cliente)
        obterTodos()
    }

    async function salvarCliente(cliente: Cliente) {
        const cli = await repo.salvar(cliente)
        console.log(cli)
        obterTodos()    
    }

    function novoCliente(): void {
        setCliente(Cliente.vazio())
        exibirFormulario()
    }
    
    return {
        cliente,
        clientes,        
        salvarCliente,
        novoCliente,
        excluirCliente,
        selecionarCliente,
        obterTodos,
        tabelaVisivel,
        exibirTabela
    }
}