import { Component, OnInit } from "@angular/core";
import { Pokemon } from '../pokemon';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';

@Component({
    selector: 'detail-pokemon',
    templateUrl: './detail-pokemon.component.html'
})
export class DetailPokemonComponent  implements OnInit {
    pokemon: Pokemon = null;

    constructor(private route: ActivatedRoute, private router: Router, private _pokemonService: PokemonService) {}

    ngOnInit(): void {
        let id = +this.route.snapshot.paramMap.get('id');
        this._pokemonService.getPokemon(id).subscribe(data => {
            this.pokemon = data;
        });
    }

    goBack(): void {
        this.router.navigate(['/pokemons']);
    }

    goEdit(pokemon: Pokemon) {
        let link = ['/pokemon/edit', pokemon.id];
        console.log("Affichage de la page d'édition",link)
        this.router.navigate(link);
    }

    delete(pokemon: Pokemon) {
        this._pokemonService.deletePokemon(pokemon).subscribe(() => {
            let link = ['/pokemons'];
            this.router.navigate(link);
          });

        //this._pokemonService.deletePokemon(this.pokemon);
        //let link = ['/pokemon', this.pokemon.id];
        //this.router.navigate(link);
    }

}