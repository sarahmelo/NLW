function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") // ele irá buscar o primeiro "select" que aparecer no documento.
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) // IPC !! .then( (res) xx < não é necessário usar () se tem apenas um elemento (caso do primeiro res).
                               // {return res.json() }) xx < quando retornando um valor simples (Apenas o res.json no caso) pode-se retornar direto, como ao lado.
    .then( states => { 

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>` 
        }                     // * + * é o mesmo que ufSelect.innerHTML = ufSelect.innerHTML, ou seja, ele menciona ele mesmo.

        
    } )
}
populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufvalue = event.target.value 

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`

    citySelect.innerHTML = "<option>Selecione a Cidade</option>"   // [CORREÇÃO DE BUG]limpa o conteúdo para que não permita o armazenamento de cidades de outro estado que já havia sido selecionado.
    citySelect.disabled = true //

    fetch(url)
    .then( res => res.json() ) 
    .then( cities => {
        
        
     
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }         
     
        citySelect.disabled = false //quando estado é selecionado, o fieldset *Cidade* é habilitado. 
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

//Itens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected") //toggle (adicionar ou remover)

    const itemId = itemLi.dataset.id
    
    //verificar se existem items selecionas
    //pegar os items selecionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //true or-->// = atribuir valor / == comparar valor
        return itemFound
    })

    //se já estiver selecionado, 
    if( alreadySelected >= 0 ) {
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // se não estiver selecionado 
        // adicionar a seleção
        selectedItems.push(itemId)
    }
     
 
    //atualizar o campo escondido com os dados/items selecionados
    collectedItems.value = selectedItems


}









    //                                   Anotações Adicionais
    //  .then = executa alguma função com os dados que *fetch* buscou e retornou. 
    //  json = traduz a estrutura de dados de objetos, matrizes, números, strings, booleanos, e null
    //  .queryselector = seleciona e consulta 
    // != mesma coisa de >= or <=
