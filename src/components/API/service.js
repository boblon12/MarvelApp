import axios from "axios";

export default class Service {
    

    static async getCharacters(random) {
        const response = await axios.get(`https://gateway.marvel.com:443/v1/public/characters/${random}?apikey=74ebea2ecadc421048a215ba40c5e6b5`)
        return response;
    }





}
