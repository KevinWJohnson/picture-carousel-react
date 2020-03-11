  import axios from "axios"
  
  function getSlides(success) {
    return (axios.get('/api/slides')
      .then(success)
      .catch(function (error) {
        console.log(error); //handle error
      })
    );
  }

  function createSlide(data) {
    return (axios.post('/api/slides', data)
      .catch(function (error) {
        console.log(error); //handle error
      })
    );
  }

  function updateSlide(data) {
    return (axios.put('/api/slides', data)
    .catch(function (error) {
      console.log(error); //handle error
    })
  );
}

  function deleteSlide(data) {
    return (axios.delete('/api/slides', {data})
    .catch(function (error) {
      console.log(error); //handle error
    })
  );
}


const ClientAxios = { getSlides, createSlide, updateSlide, deleteSlide};
export default ClientAxios;
