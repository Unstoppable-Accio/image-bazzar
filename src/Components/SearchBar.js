// KeyUp, KeyDown
import React, {useState, useEffect} from "react"
import axios from "axios"

//Note: Access .env  

console.log("key is", process.env.REACT_APP_ACCESS_KEY)

const SearchBar = ({setImages}) => {
   const [searchTerm, setSearchTerm] = useState("nature")
   const [previousSearchTerm, setPreviousSearchTerm] = useState("")

   console.log(searchTerm)
  

//    console.log(images)

useEffect(()=>{
    fetchImage()
},[]
)


   const fetchImage = () => {
         if(searchTerm === previousSearchTerm) return
                axios.get("https://api.unsplash.com/search/photos", {
                    params:{
                        // client_id : "3izN2i3fcImpmaZNGgVf4F4ScL_5ckerUZyTU2WlvAU",
                        query : searchTerm || "nature"
                    },
                    headers:{
                        Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}}`
                    }

                })
                    .then((response) => {
                        setImages(response.data.results)
                        // setSearchTerm("")
                        setPreviousSearchTerm(searchTerm)
                    })
                    .catch((error) => console.log(error))
          
   }

//    function handleKeys(e){
//     //    console.log(e.key)
//     if(e.key == "s"){
//         fetchImage()
//     }
//    }


    return(
        <div >
            {/* onKeyDown={handleKeys} */}
            <input type="text" placeholder="Search for an image..." 
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={fetchImage}>Search</button>
        </div>
    )
}

export default SearchBar