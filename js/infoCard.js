import { jibComments } from "./comments.js"


const infoBagroundDark = document.getElementById("infoBagroundDark")
 
const infoCardContent = document.getElementById("infoCardContent")



export function openModel(card) {
   let typeCard = ""
   let time = ""
   
   if (card.type === "movie") {
     typeCard ="Film"
     time = `Duree : ${card.duration} min`

   }else {
    typeCard ="Serie"
    time =`Saisons : ${card.seasons.length}`
   }

//     info card text details
   infoCardContent.innerHTML = `
   <button id ="closeModel" class ="text-2xl font-bold">X</button>  
   <img src ="${card.image}" class ="w-full max-h-96 object-cover rounded mb-4">
   <h2 class ="text-2xl font-bold mb-2">${card.title}</h2>
   <p> Type : ${typeCard}</p>
     <p> Annee  : ${card.releaseYear}</p>
     <p> ${time}</p>
     <p> Genres : ${card.genres.join(", ")}</p>
     <p> Realisateurs : ${card.directors.join(", ")}</p>
     <p> Pays : ${card.productionCountries.join(", ")}</p>
     <p class ="mt-3">${card.description}</p>

    

     <div class ="my-4"></div>
     <h3 class ="text-xl font-bold mb-2">Commentaires</h3>
     <div id ="commentsLoader" class ="hidden font-bold"></div>
     <div id ="commentsList" class ="flex flex-col gap-2 mb-4"></div>



     <form id ="commentForm" class ="flex flex-col gap-2">
     <input id ="commentAuthor" type="text" placeholder ="Votre nom" class="p-2 rounded bg-white text-black">
     <p id ="errorCommentAuthor" class ="text-red-200 text-sm"></p>
     <textarea id ="commentText" placeholder ="Votre commentaire" class="p-2 rounded bg-white text-black"></textarea> 

     <p id ="errorCommentText" class ="text-red-200 text-sm"></p>
     

     <button type ="submit" class="bg-purple-800 text-white px-4 py-2 rounded font-bold">Publier</button>

     </form>
 `
 infoBagroundDark.classList.remove("hidden")
  infoBagroundDark.classList.add("flex")


  jibComments(card.id)





  const closeButton = document.getElementById("closeModel")
  
  closeButton.addEventListener("click" , closeModel)


}


export function closeModel(){
    infoBagroundDark.classList.add("hidden")
  infoBagroundDark.classList.remove("flex") 
}