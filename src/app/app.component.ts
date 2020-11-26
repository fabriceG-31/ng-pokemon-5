import { Component, OnInit } from '@angular/core';
import { POKEMONS } from './pokemons/mock-pokemon';
import { Pokemon } from './pokemons/pokemon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = "Toto";
  myBoolean: boolean = true;
  pokemons: Pokemon[];
  monString: string;

  ngOnInit(): void {
    this.pokemons = POKEMONS;
    console.log(this.pokemons);
  }

  onClickTest() {
   console.log("Mon test est ok");
  }

  onInput($event: any) {
    this.monString = $event.target.value;
    console.log("Mon message est ", this.monString);
  }

  selectPokemon(pokemon: Pokemon) {
    console.log("Vous avez sélectionné ", pokemon.name);
  }

}
