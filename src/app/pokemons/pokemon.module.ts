import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from '../auth-guard.service';
import { PokemonTypeColorPipe } from '../pokemon-types-color.pipe';
import { BorderCardDirective } from './border-card.directive';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';
import { PokemonRoutingModule } from './pockemon.routing.module';
import { PokemonFormComponent } from './pokemon-form/pokemon-form.component';
import { PokemonForm2Component } from './pokemon-form2/pokemon-form2.component';
import { PokemonService } from './pokemon.service';
import { SearchPokemonComponent } from './search-pokemon/search-pokemon.component';

@NgModule({
    declarations: [
        BorderCardDirective,
        PokemonTypeColorPipe,
        ListPokemonComponent,
        DetailPokemonComponent,
        EditPokemonComponent,
        SearchPokemonComponent,
        PokemonFormComponent,
        PokemonForm2Component
    ],
    imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          PokemonRoutingModule
        ],
    providers : [
        PokemonService,
        AuthGuardService
    ]
})

export class PokemonModule {}
