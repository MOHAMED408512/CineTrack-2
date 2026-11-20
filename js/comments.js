import { getComments , createComment } from "./api.js";

// draw the list of communts

function DirComments (list , container) {
    if (list.length === 0) {
        container.innerHTML="<p>Aucun commentaire</p>"
        return
    }

    container.innerHTML = list.map ( c => `
        <div class ="bg-purple-700 rounded p-2">
        <p class ="font-bold">${c.author}
        <span class ="text-xs font-bold">${new Date(c.createdAt).toLocaleDateString()}</span>
        </p>
        <p>${c.text}</p>
        </div>`).join("")
}


//

export async function jibComments(contentId) {
   

let comments = []

    const commentLoader = document.getElementById("commentsLoader")
    const commentList = document.getElementById("commentsList")
    const commentform = document.getElementById("commentForm")


    const authorInput =   document.getElementById("commentAuthor")

const textInput = document.getElementById("commentText")

const errorAuthor = document.getElementById("errorCommentAuthor")

const errorText = document.getElementById("errorCommentText")






// local storage drna fih pseudo (comment)
authorInput.value = localStorage.getItem("pseudo") || ""



// load comments    chatgement ktbqa tal3a hta ktwli hidden

commentLoader.textContent ="Chargement..."
commentLoader.classList.remove("hidden")



try {
    const all = await getComments()
     comments = all.filter(containerComment => containerComment.contentId === contentId)
     DirComments(comments , commentList)
}catch(error) {
    commentList.innerHTML ="<p>Impossible de charger les commentaires</p>"
}
commentLoader.classList.add("hidden")



// add comment when lfrom is sent (ytsauvegarda)

commentform.addEventListener("submit" , async (event)=>{
    event.preventDefault()


    const author = authorInput.value.trim()
    const text = textInput.value.trim()



    //  validation name w texte required

errorAuthor.textContent=""
errorText.textContent=""
if (author === "") {
    errorAuthor.textContent ="Le nom est obligatoire"

}
 if (text === "") {
    errorText.textContent ="Le commentaire est obligatoier"
 }
 if (author === "" || text === "") {
    return

 }


 try{
    const newComment = await createComment({
        contentId : contentId ,

        author : author,
        text : text,
        createdAt : new Date().toISOString()
    })


    comments.push(newComment)
    DirComments(comments , commentList)
    localStorage.setItem("pseudo" , author)
    textInput.value =""
 }catch (error) {
    errorText.textContent ="Erreur lors de l'envoi , reeasayez"
 }

} )
}

