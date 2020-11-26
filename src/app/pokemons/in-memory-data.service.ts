import { POKEMONS } from './mock-pokemon';
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";


export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let pokemons = POKEMONS;
        return { pokemons };
    }
}