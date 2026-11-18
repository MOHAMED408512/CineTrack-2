export function showLoading (textLiRyban , text = "Chargement..") {
    textLiRyban.textContent = text  


textLiRyban.classList.remove("hidden")

}



// hide loading text li ryba,

export function hideLoading (textLiRyban) {
    textLiRyban.class.classList.add("hidden")
}