import { jibContent , createContent, deleteContent, updateContent } from "./api.js";
import { showLoading , hideLoading ,showMessage } from "./ui.js";
import { validateform } from "./validators.js";




const tableBody = document.getElementById("tableBody")

const loading = document.getElementById("loading")

const messageLiryban = document.getElementById("messageLirayban")



let films = []

const filmForm = document.getElementById("filmForm")
const formTitle = document.getElementById("formTitle")
const submitBtn = document.getElementById("submitBotona");
const cancelBtn = document.getElementById("cancelBotona");
const titleInput = document.getElementById("title");
const typeInput = document.getElementById("type")
const yearInput = document.getElementById("releaseYear")
const imageInput = document.getElementById("image");
const durationInput = document.getElementById("duration");

const seasonsInput = document.getElementById("seasons")

const genresInput = document.getElementById("genres")

const directorsInput = document.getElementById("directors")
const productionCountriesInput = document.getElementById("productionCountries")

const descriptionInput = document.getElementById("description")



let editingId = null 



function faxykunMovieDisabled () {
    if(typeInput.value=== "movie") {
        durationInput.disabled = false
        seasonsInput.disabled = true
        seasonsInput.value =""

    }else if (typeInput.value === "series") {
                durationInput.disabled = true
        seasonsInput.disabled = false
        durationInput.value = ""

    
}}

typeInput.addEventListener("change" , faxykunMovieDisabled)



faxykunMovieDisabled()

//  nrj3o les genres into an array

function splitList(text) {
    if(text.trim() ==="") {
        return []
    }

return text.split(",").map(genre => genre.trim())

}
//9ra lform put what the user typed

function readForm() {
    return {
        title : titleInput.value ,
          type : typeInput.value ,
          releaseYear : parseInt(yearInput.value),
          image : imageInput.value ,
          duration : parseInt(durationInput.value),
          
          seasons: parseInt(seasonsInput.value) ,
          genres : splitList(genresInput.value),
          directors : splitList(directorsInput.value) ,

          productionCountries : splitList(productionCountriesInput.value),
          description : descriptionInput.value

    }
}

function showErrors(errors) {
    document.getElementById("error-title").textContent =errors.title || ""

        document.getElementById("error-type").textContent =errors.type || ""

    document.getElementById("error-releaseYear").textContent =errors.releaseYear || ""

        document.getElementById("error-image").textContent =errors.image || ""
    document.getElementById("error-duration").textContent =errors.duration || ""
    document.getElementById("error-seasons").textContent =errors.seasons || ""

}




// 
function fillForm(film) {
titleInput.value = film.title

typeInput.value = film.type

  yearInput.value = film.releaseYear

  imageInput.value = film.image

  genresInput.value = film.genres.join(", ") // bx twle text

  directorsInput.value =film.directors.join(", ")

productionCountriesInput.value = film.productionCountries.join(", ")

descriptionInput.value = film.description




// movie= duration ; series = list of seasons

if (film.type === "movie") {
    durationInput.value = film.duration

    seasonsInput.value =""

}else {
    seasonsInput.value =film.seasons.length
    durationInput.value =""
}


editingId = film.id   // remember wich title we edit
formTitle.textContent ="Modifier une titre"  //change the form title

submitBtn.textContent ="Enregistrer" 
cancelBtn.classList.remove("hidden")  // show the annuler botona 

faxykunMovieDisabled()

}
// reser back to btn ajouter mode with empty form
function resetForm() {
    filmForm.reset()
    editingId = null

    formTitle.textContent ="Ajouter un titre"
    submitBtn.textContent ="Ajouter"
    cancelBtn.classList.add("hidden")
    showErrors({
        title: "",
  type: "",
  releaseYear: "",
  image: "",
  duration: "",
  seasons: ""
    })    // remove the red messages
}


faxykunMovieDisabled()



cancelBtn.addEventListener("click" , resetForm)





// prepare the data for the api


function prepareData(film) {
    if(film.type === "series"){

        // api wants seasons ka liste 3 seasons = [1,2,3]



        const list = []
        for (let i =1 ; i <= film.seasons; i++) {
            list.push(i)
        }
film.seasons =list

delete film.duration   // series has no duration


    } else {
        delete film.seasons   // movue has no seasons

    }
return film
}

// adding new title b POST

async function addFilm(film) {
    
    const newFilm = await createContent(film)   // api send back title bl id dylu li t ajouta
films.push(newFilm)

showMessage(messageLiryban , "Titre ajoute avec success", "success")
}


// edit and existing title

async function editFilm(film) {
    const oldFilm = films.find(film => film.id === editingId) // title 9bl change

    const updated = {...oldFilm, ...film}
    const saved = await updateContent(editingId, updated)
    films = films.map(film=> {
        if (film.id === editingId) {
            return saved
        }
        return film
    })
    showMessage(messageLiryban, "Titre modifie avec success", "success")

}

// ila user safi submita lform

filmForm.addEventListener("submit", async (event)=>{
    event.preventDefault()

    const datanewfilm = readForm() // read the form

    const errors = validateform(datanewfilm) // check
    showErrors(errors) // show errors if any


    // if errors ? nchekiw every field 

    if (errors.title || errors.type || errors.releaseYear || errors.image || errors.duration || errors.seasons) {
        return       // ila kan ra error wahd stopi nothing is sent
    }


    // no errors we prepare data for api

    const finalData = prepareData(datanewfilm)

    try {
        if (editingId === null) {

await addFilm(finalData) // adding a new title

        }else { 
            await editFilm (finalData)  // we are editing an existing title

        }
        drawRows(films)
        resetForm()
    }catch (error) {
        showMessage(messageLiryban , "Erreur lors de l'enrigestrement", "error")
    }
})











// nbuildiw lhtml dyl xe row 

function createRow(film) {
    let typeText = "Serie"

    if (film.type === "movie") {
        typeText ="Film"

    }


return `
<div class ="grid grid-cols-5 bg-purple-100 gap-2 items-center rounded text-center">
<div><img src ="${film.image}" class="w-12 h-16 object-cover rounded mx-auto"></div>
<div class ="font-bold">${film.title}</div>
<div>${typeText}</div>
<div>${film.releaseYear}</div>
<div>
<button data-edit ="${film.id}" class ="bg-purple-500 text-white px-3 py-1 rounded">Modifier</button>
<button data-delete ="${film.id}" class ="bg-red-500 text-white px-3 py-1 rounded">Supprimer</button>
</div>
</div>`


}

// ktjeb function create row w kder row per title aka show all the rows

function drawRows (list) {
    tableBody.innerHTML = list.map(createRow).join("")

}

//jib titles from mockapi w showehum

async function loadFilms() {
    showLoading(loading)
    try{

        films = await jibContent() 
        hideLoading(loading)
        drawRows(films)



    }catch (error) {
        hideLoading(loading) // darori nderu hide loading bx mtbqax chargement.. (problm me)
        showMessage(messageLiryban, "Impossible de charger la liste , reessayez" ,"error")

        
    }
}

// 5dmt b delegation  f event listener

tableBody.addEventListener("click" , async (event) =>{


 // did the user click Modifier?
    const editButton = event.target.closest("[data-edit]")
    if (editButton) {
        const film = films.find(f => f.id === editButton.dataset.edit)
        fillForm(film)
        return    // stop here so the delete code does not run
    }






    // did the user click a delete butn
    const deleteButton = event.target.closest("[data-delete]")  
    if (!deleteButton) 
        return   //if no mwrkx w9F hna 

const id = deleteButton.dataset.delete //storina id f button delete

const lfilmLebrenaYtsuprema = films.find(film => film.id === id)





// lconfiramtion ila user say no return
if (!confirm (`Supprimer ${lfilmLebrenaYtsuprema.title} ? `)) return


try {
    await deleteContent(id)
films = films.filter(lfilmlerytsuprema => lfilmlerytsuprema.id !== id)
drawRows(films)
showMessage( messageLiryban , "Titre est supprime avec success" , "success")



}catch (error) {
    showMessage (messageLiryban ,"Erreur lors de la suppression" , "error")
}

})


loadFilms()