import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from "rxjs/operators"

@Component({
  selector: 'app-search-pokemon',
  templateUrl: './search-pokemon.component.html',
  styleUrls: ['./search-pokemon.component.scss']
})
export class SearchPokemonComponent implements OnInit {

  private searchItems = new Subject<string>();
  pokemons$: Observable<Pokemon[]>;

  constructor(private _pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {

    this.pokemons$ = this.searchItems.pipe(
      // attente de 300 ms
      debounceTime(300),
      // ignorer la recherche si c'est la même que la précédente
      distinctUntilChanged(),
      // Ne déclencher la recherche qu'au 3e caractère saisi
      filter(term => term.length > 2),
      // retourne le résultat de la recherche
      switchMap((term: string) => this._pokemonService.searchPokemons(term))
    )
  }

  search(term: string): void {
    this.searchItems.next(term);
  }

  goDetail(pokemon: Pokemon): void {
    this.router.navigate(['/pokemon', pokemon.id]);
  }
}
