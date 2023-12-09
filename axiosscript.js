function fetchData() {
    const apiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

    // Making a GET request using Axios
    axios.get(apiUrl)
        .then(response => {
            console.log('Data fetched successfully:', response.data);
            alert('Data fetched successfully! Open the console to see the result.');
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
            alert('Error fetching data! Open the console to see the error.');
        });
}
