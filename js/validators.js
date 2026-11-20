export function validateform(film) {
const currentYear =  new Date().getFullYear()
    const errors ={}

    if(film.title.trim() === "") {
        errors.title ="Le titre est obligatioire"




    } if (film.type ===""){
        errors.type ="Choisissez un type"

    } if (!film.releaseYear || film.releaseYear < 1900 || film.releaseYear > currentYear) {
        errors.releaseYear =`l'annee doit etre entre 1900 et ${currentYear}`
    }


    // if the image url start with htttp zlq https
   if(!film.image.startsWith("http://")&& !film.image.startsWith("https://")){
    errors.image ="url d'image est invalide"
   } 


// movie needs duration and a serie needs number of seasons

if(film.type ==="movie" && !(film.duration > 0)) {
    errors.duration = "La duree est obligatoire pour un film"

} if(film.type ==="series" && !(film.seasons> 0)) {
    errors.seasons ="Le nombre de saisons est obligatoire pour une serie"
}



return errors

}