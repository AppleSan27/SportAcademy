const $buttonStatus = document.querySelector('[button]')
const $buttonSport = document.forms.sport

$buttonStatus?.addEventListener('click', async (e) =>{
    e.preventDefault()
    let {id} = e.target
    let {status} = e.target.dataset
    console.log(status)
    if (id != ''){
    const response = await fetch('/cabinet',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id})
        })
        let responseJson = await response.json()
   if (response.ok) {
       let block = document.querySelector(`[data-id="${id}"]`)
       block.innerText = !responseJson.statusUser   } 
}   
})

$buttonSport.addEventListener('submit', async (event) => {
    event.preventDefault();
    const response = await fetch(`/cabinet/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: event.target.name.value,
        last_name: event.target.last_name.value,
        first_name: event.target.first_name.value
      })
    })
 
        window.location = '/cabinet'
    
    //   }else{ 
    //     const responseJson = await response.json();
    //     return  alert('Неверный логин/пароль')}
  });