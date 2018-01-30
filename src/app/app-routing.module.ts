import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { AuthGuard, HasAccess } from './auth-guard';
import { BuilderComponent } from './theme/builder/builder.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '',
                redirectTo: 'builder',
                pathMatch: 'prefix'
            },
            {
                path: 'builder',
                component: BuilderComponent
            }
        ])
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }
