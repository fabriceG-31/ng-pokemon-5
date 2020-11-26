import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../auth-guard.service';
import { DetailPokemonComponent } from './detail-pokemon/detail-pokemon.component';
import { EditPokemonComponent } from './edit-pokemon/edit-pokemon.component';
import { ListPokemonComponent } from './list-pokemon/list-pokemon.component';

const pokemonsRoutesWithoutGuard: Routes = [
    { path: 'pokemons', component: ListPokemonComponent },
    { path: 'pokemon/:id', component: DetailPokemonComponent },
    { path: 'pokemon/edit/:id', component: EditPokemonComponent }
];

const pokemonsRoutes: Routes = [
    {
        path: 'pokemon',
        canActivate: [AuthGuardService],
        children: [
            { path: 'all', component: ListPokemonComponent },
            { path: ':id', component: DetailPokemonComponent },
            { path: 'edit/:id', component: EditPokemonComponent }
        ]
    }

];


@NgModule({
    imports: [
        RouterModule.forChild(pokemonsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class PokemonRoutingModule { }