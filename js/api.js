const API_URL = "https://6afaed13730c1d152f32c202.mockapi.io/api/v1/contents";


export async function jibMovietSeries() {
  try {
    const istijabaDylData = await fetch(API_URL);

    if (!istijabaDylData.ok) {
      console("Erreur lors du chargement des données");
    }

    const data = await istijabaDylData.json();

    return data;
  } catch (error) {
    console.log("Erreur :", error);
  }
}


const BASE_URL = "https://6afaed13730c1d152f32c202.mockapi.io/api/v1"

export async function request(path , options = {} ) {
    const istijabaDylData = await fetch (BASE_URL + path , {
        headers : { "Content-Type": "application/json" },
...options,
});
if (!istijabaDylData.ok) throw new Error(`Erreur ${istijabaDylData.status}`);
return istijabaDylData.json();
}

export const getContents = () => request("/contents")

export const createContent =(data) => 
    request("/contents", { method: "POST", body: JSON.stringify(data) });


export const updateContent =(id ,data)=>
    request(`/contents/${id}`, { method: "PUT", body: JSON.stringify(data) });


export const deleteContent = (id) => 
        request(`/contents/${id}`, { method: "DELETE", body: JSON.stringify(data) });
 

export const getCommments = () => request("/comments")
export const createComment = (data) => 
    request("/comments" , {method  : "POST" , body : JSON.stringify(data)})
    
