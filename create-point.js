function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]") // ele irá buscar o primeiro "select" que aparecer no documento.
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() ) // IPC !! .then( (res) xx < não é necessário usar () se tem apenas um elemento (caso do primeiro res).
                               // {return res.json() }) xx < quando retornando um valor simples (Apenas o res.json no caso) pode-se retornar direto, como ao lado.
    .then( states => { 

        for( const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

        
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

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }         
     
        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)