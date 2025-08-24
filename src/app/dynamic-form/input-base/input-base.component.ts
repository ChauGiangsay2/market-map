import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-input-base',
  standalone: true,
  imports: [ InputTextModule,],
  templateUrl: './input-base.component.html',
  styleUrl: './input-base.component.scss'
})
export class InputBaseComponent {


}
