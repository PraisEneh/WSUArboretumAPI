const axios = require('axios');

const getTours = async () => {
    const json = await axios.get('https://w3.winona.edu/locations/api/themes')
    return json.data
}

const getTour = async (id) => {
    const json = await axios.get(`https://w3.winona.edu/locations/api/themes?id=${id}`)
    return json.data;
}

const handleGetTours = async (req, res) => {
    res.send(await getTours());
}

const handleGetTour = async (req, res) => {
    res.send(await getTour(req.query.id));
}

module.exports = {handleGetTours, handleGetTour}