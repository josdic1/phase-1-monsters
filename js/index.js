

const init = () => {

    // DOM elements
    const createMonster = document.getElementById('create-monster')
    const monsterContainer = document.getElementById('monster-container')
    const back = document.getElementById('back')
    const forward = document.getElementById('forward')
    
    // dynamic elements
    let start = 0;
    let incr= 50;
    let end = 50;
    let displayList = []
    let monsterList = []
    let newMonster = {
       name: '',
       age: '',
       description: ''
    }
    
    // fetch data
    async function fetchMonsters() {
       try {
          const r = await fetch(`http://localhost:3000/monsters`)
          if(!r.ok) {
             throw new Error ('unable to retreive json')
          }
          const data = await r.json()
          monsterList = data
          renderMonsterList(data)
          renderMonsterForm()
       }catch(error){console.error(error)}
    }
    fetchMonsters()
    
    // build monster list html
    function renderMonsterList() {
       const list = monsterList.map(item => (
          `<div id=${item.id}>
          <h2>${item.name}</h2>
          <h4>${item.age}</h4>
            <p>${item.description}</p>
          </div>`
       ))
       monsterContainer.innerHTML = list.slice(start, end).join('')
    }
    
    
    
    // render monster form
     function renderMonsterForm() {
       createMonster.innerHTML = `
       <form id='form'>
       <div>
       <input id='name' type='text' placeholder='name...' />
       <input id='age' type='text' placeholder='age...' />
       <input id='description' type='text' placeholder='description...' />
       <button type='submit'>Create</button>
          </div>
       </form>
       `
     }
    
    
     // EL form onChange
    let nameInput;
    let ageInput;
    let descriptionInput;
    
     document.addEventListener('input', function (){
       nameInput = document.getElementById('name')
       ageInput = document.getElementById('age')
       descriptionInput = document.getElementById('description')
       
       newMonster = {
          name: nameInput.value,
          age: Number(ageInput.value),
          description: descriptionInput.value
       }
    
     })
    
     // EL form onSubmit
     document.addEventListener('submit', function (e) {
       e.preventDefault()
          createNewMonster(newMonster)
     })
    
     // EL back button
    back.addEventListener('click', function () {
       start -= incr
       end -= incr
       renderMonsterList()
    })
     
      // EL forward button
      forward.addEventListener('click', function () {
       start += incr
       end += incr
    renderMonsterList()
    })
    
     // create new monster
     async function createNewMonster(newMonster) {
       try {
          const r = await fetch(`http://localhost:3000/monsters`, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(newMonster)
          })
          if(!r.ok) {
             throw new Error ('cannot access response')
          }
          const data = await r.json()
          monsterList = [...monsterList, data]
          renderMonsterList(monsterList)
          clearForm()
       }catch(error) {console.error(error)}
     }
    
     // clear form
     const clearForm = () => {
       nameInput.value = ''
       ageInput.value = ''
       descriptionInput.value = ''
     }
    
    
    }
    
    
    
    window.addEventListener("DOMContentLoaded", init)
    
    
    