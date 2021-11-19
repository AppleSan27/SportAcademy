const $buttonClient = document.querySelector('[button]')
console.log($buttonClient);

$buttonClient?.addEventListener('click', async (e) =>{
    e.preventDefault()
    let {id} = e.target.dataset
    
    if (id != ''){
    const response = await fetch('/cabinet',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id, isClient:true})
        })
//         let responseJson = await response.json()
//    if (response.ok) {
//        let block = document.querySelector(`[data-id="${id}"]`)
//        block.innerText = !responseJson.statusUser   } 
}   
})