import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form',
  templateUrl: './pokemon-form.component.html',
  styleUrls: ['./pokemon-form.component.scss']
})
export class PokemonFormComponent implements OnInit {

  @Input() pokemon: Pokemon = null; // Propriété d'entrée du composant 
  types: Array<string>;

  constructor(private router: Router, private _pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.types = this._pokemonService.getPokemonTypes();
  }

  onSubmit() {
    // Validation de la saisie des composants de la forme .html
    this._pokemonService.updatePokemon(this.pokemon).subscribe(() => {
      let link = ['/pokemon', this.pokemon.id];
      this.router.navigate(link);
    });
  }

  // Détermine si le pokemon est du type
  hasType(type: string): boolean {
    let index = this.pokemon.types.indexOf(type);
    return (index > -1);
  }


  selectType($event: any, type: string): void {
    let checked = $event.target.checked;
    if (checked) {
      this.pokemon.types.push(type);
    } else {
      let index = this.pokemon.types.indexOf(type);
      if (index > -1) {
        this.pokemon.types.splice(index, 1);
      }
    }
  }

  // Valide le nombre de types pour chaque pokémon
  isTypesValid(type: string): boolean {
    if (this.pokemon.types.length === 1 && this.hasType(type)) {
      return false;
    }

    if (this.pokemon.types.length >= 3 && !this.hasType(type)) {
      return false;
    }

    return true;
  }
}
