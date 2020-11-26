import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { POKEMONS } from './mock-pokemon';
import { Pokemon } from './pokemon';

@Injectable()

export class PokemonService {

    private pokemonsUrl: string = 'api/pokemons';

    constructor(private http: HttpClient) {}

    getPokemons(): Observable<Pokemon[]> {
        return this.http.get<Pokemon[]>(this.pokemonsUrl);
    }

    getPokemonsMock(): Pokemon[] {
        return POKEMONS;
    }

    getPokemon(id: number): Observable<Pokemon> {
        const url = this.pokemonsUrl + '/' + id; // monsite/api/pokemons/3
        return this.http.get<Pokemon>(url);
    }

    updatePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        }

        return this.http.put<Pokemon>(this.pokemonsUrl, pokemon, httpOptions);
    }

    deletePokemon(pokemon: Pokemon): Observable<Pokemon> {
        const url = `${this.pokemonsUrl}/${pokemon.id}`;

        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json'})
        }
        return this.http.delete<Pokemon>(url, httpOptions);
    }

    getPokemonTypes() : Array<string> {
        return [
            'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
            'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
        ];
    }


    searchPokemons(term: string): Observable<Pokemon[]> {

        console.log("POKEMON Service: searchPokemons ",term);

        if (!term.trim()) {
            return of([]);
        }

        return this.http.get<Pokemon[]>(`api/pokemons?name=${term}`);
    }

}