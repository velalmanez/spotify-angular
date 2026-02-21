import { Component, Input, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { MultimediaService } from '../../services/multimedia.service';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrl: './play-list-body.component.css'
})
export class PlayListBodyComponent implements OnInit {
  @Input() tracks: TrackModel[] = [];

  //inicializacion del filtro
  optionSort:{property: string|null, order: string} = {property: null, order: 'asc'}
  
  constructor(public  multimediaService: MultimediaService){}

  ngOnInit():void{
    
  }

  //funcion para ordenar el array por la propiedad que se le pasa 
  changeSort(property: string): void{
    const{order} = this.optionSort

    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc': 'asc'
    }
  }

}
