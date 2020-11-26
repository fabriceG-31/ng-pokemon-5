import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Pokemon } from '../pokemon';
import { PokemonService } from '../pokemon.service';

@Component({
  selector: 'app-pokemon-form2',
  templateUrl: './pokemon-form2.component.html',
  styleUrls: ['./pokemon-form2.component.scss']
})
export class PokemonForm2Component implements OnInit, OnChanges {

  editForm: FormGroup;
  submitted = false;

  @Input() pokemon: Pokemon = null; // Propriété d'entrée du composant 
  types: Array<string>;

  constructor(private router: Router, private _pokemonService: PokemonService, private formBuilder: FormBuilder) { }

  ngOnChanges(): void {

    console.log("Pokemon Form 2: ngOnChanges ",this.pokemon)

    if (this.pokemon) {
      this.editForm = this.formBuilder.group({
        name: [this.pokemon.name, [Validators.required, Validators.pattern('^[a-zA-Z0-9àéèç]{1,50}$')]],
        hp: [this.pokemon.hp, [Validators.required, Validators.pattern('^[0-9]{1,3}$'), Validators.min(0), Validators.max(999)]], 
        cp: [this.pokemon.cp, [Validators.required, Validators.pattern('^[0-9]{1,2}$'), Validators.min(0), Validators.max(99)]]
      })
    }
  }

  

  ngOnInit(): void {
    this.types = this._pokemonService.getPokemonTypes();
  }

  
  onSubmit() {

    this.submitted = true;

    console.log("Pokemon Form 2: Onsubmit")

    if (this.editForm.invalid) {
      console.log("Edit Form invalid")
      return;
    }

    // creation d'un nouveau pokemon
    this.pokemon = {
      ...this.pokemon, // copie des données initiales
      ...this.editForm.value // copie des données issues du formulaire
    }

    this.pokemon.name = this.editForm.value.name;
    this.pokemon.cp = this.editForm.value.cp;
    this.pokemon.hp = this.editForm.value.hp;

    // Validation de la saisie des composants de la forme .html
    this._pokemonService.updatePokemon(this.pokemon).subscribe(() => {
      this.submitted = false;
      let link = ['/pokemon', this.pokemon.id];
      this.router.navigate(link);
    });
  }

  get f() {return this.editForm.controls}

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
