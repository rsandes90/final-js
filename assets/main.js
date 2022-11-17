const requestPokemon = async(value) => {
    try {
        const baseURL = `https://my-json-server.typicode.com/rsandes90/entregaFinal-JS/db`;
        const response = await fetch(baseURL);
        const json = await response.json();
        const data = json.data;
        console.log(data);
    } catch (error) {
        alert(`se rompio todo ${error}`);
    }
};

requestPokemon();