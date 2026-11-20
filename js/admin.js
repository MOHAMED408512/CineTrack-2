import { jibContent , deleteContent } from "./api.js";
import { showLoading , hideLoading ,showMessage } from "./ui.js";




const tableBody = document.getElementById("tableBody")

const loading = document.getElementById("loading")

const messageLiryban = document.getElementById("messageLirayban")



let films = []
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
showMessage( messageLiryban , "Titre est supprime avec succes" , "succes")



}catch (error) {
    showMessage (messageLiryban ,"Erreur lors de la suppression")
}

})


loadFilms()