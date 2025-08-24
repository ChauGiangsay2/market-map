import { NgModule } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ValidatorsService } from './validators.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    // import service của các libs bên ngoài
    DialogService,
    ValidatorsService,
  ]
})
export class LibServiceModule { }
