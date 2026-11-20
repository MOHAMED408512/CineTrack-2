export function showLoading(textLiRyban) {
  textLiRyban.textContent = "Chargement..."
    textLiRyban.classList.remove("hidden")



}



// hide loading text li ryba,

export function hideLoading (textLiRyban) {
    textLiRyban.classList.add("hidden")
}


// show green or red message 

export function showMessage (textLiRyban , text , type = "error") {
         textLiRyban.textContent=text


         if ( type === "success") {
            textLiRyban.className = " bg-green-600 text-white p-4 rounded m-4"
         
         }else {
            textLiRyban.className ="bg-red-600 text-white p-4 rounded m-4"

         }


         // lmisgae disseapers f 3 sec

         setTimeout(()=> textLiRyban.classList.add("hidden") , 3000)
        
        }
