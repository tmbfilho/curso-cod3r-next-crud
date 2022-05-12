import Cliente from "../../core/Cliente";
import ClienteRepositorio from "../../core/ClienteRepositorio";
import firebaseApp from "../config";
import { getFirestore, collection, QueryDocumentSnapshot, SnapshotOptions, getDocs, addDoc, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"
//import firebase from "../config"; código compatível com firebase@8.9.1

export default class ColecaoCliente implements ClienteRepositorio {
    
    #conversor = {
        toFirestore(cliente: Cliente) {
            return {
                nome: cliente.nome,
                idade: cliente.idade                
            }
        },
        //fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente { código compatível com firebase@8.9.1
        fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {   
             
        if (cliente?.id) {
            //await this.colecao().doc(cliente.id).set(cliente) código compatível com firebase@8.9.1            
            const docRef = doc(this.colecao(), cliente.id)
            await setDoc(docRef, cliente)

            return cliente
        } else {            
            //const docRef = await this.colecao().add(cliente) código compatível com firebase@8.9.1 
            //const doc = await docRef.get() código compatível com firebase@8.9.1 
            const docRef = await addDoc(this.colecao(), cliente)
            const doc = await getDoc(docRef)
            return doc.data()
        }
    }

    async excluir(cliente: Cliente): Promise<void> {        
        //return this.colecao().doc(cliente.id).delete() código compatível com firebase@8.9.1        
        const docRef = doc(this.colecao(), cliente.id)
        return deleteDoc(docRef)
    }

    async obterTodos(): Promise<Cliente[]> {
        //const query = await this.colecao().get() código compatível com firebase@8.9.1
        const query = await getDocs(this.colecao())
        return query.docs.map(doc => doc.data())
    }

    private colecao() {       
        //return firebase.firestore().collection('clientes').withConverter(this.#conversor) código compatível com firebase@8.9.1        
        const db = getFirestore(firebaseApp) 
        return collection(db, 'clientes').withConverter(this.#conversor)
    }
}