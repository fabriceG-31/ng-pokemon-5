import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-edit-pokemon',
  templateUrl: './edit-pokemon.component.html',
  styleUrls: ['./edit-pokemon.component.scss']
})
export class EditPokemonComponent implements OnInit {

  @Input() pokemon: Pokemon = null; // Propriété d'entrée du composant 
  
  constructor(private route: ActivatedRoute, private router: Router, private _pokemonService: PokemonService) {}

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    this._pokemonService.getPokemon(id).subscribe(data => {
      this.pokemon = data;
    });
  }
}
