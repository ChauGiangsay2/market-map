import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';

@Component({
  selector: 'app-dashboard-header',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ButtonModule,
    SplitButtonModule,
  ],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  @Output('onReload') onReload = new EventEmitter;

  constructor(){}

  listLevel: any[] = [
    { name: '0', code: 'NY' ,label: '0'},
    { name: '1', code: 'NY' ,label: '0'},
    { name: '2', code: 'RM' ,label: '0'},
    { name: '3', code: 'LDN' ,label: '0'},
    { name: '4', code: 'IST' ,label: '0'},
    { name: '5', code: 'PRS' ,label: '0'}
  ]; 
  listViewLevel: any[] = [
    { name: 'Xem đến bậc 0', code: '1' },
    { name: 'Xem đến bậc 1', code: '1' },
    { name: 'Xem đến bậc 2', code: '2' },
    { name: 'Xem đến bậc 3', code: '3' },
    { name: 'Xem đến bậc 4', code: '4' },
    { name: 'Xem đến bậc 5', code: '5' }
  ] ;
  selectedCity: any | undefined;

  reloadData(){
    this.onReload.emit();
  }
}
