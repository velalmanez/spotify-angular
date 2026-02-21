import { Component } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { TrackModel } from '@core/models/tracks.models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrl: './history-page.component.css'
})
export class HistoryPageComponent {

  listResults$: Observable<any> = of([]);
  
  constructor(private serachService: SearchService){}
  //funcion para recibir y procesar los datos del componente hijo (search)
  reciveData(event:string): void{
    // aplicaicon de filtro async para evitar encolar peticiones
    this.listResults$ = this.serachService.searchTrakcs$(event)
    
  }
}
