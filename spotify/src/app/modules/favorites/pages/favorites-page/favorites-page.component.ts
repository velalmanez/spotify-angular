import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.models';
import { Observable, Subscription } from 'rxjs';
import { TracksService } from 'src/app/modules/tracks/services/tracks.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrl: './favorites-page.component.css'
})
export class FavoritesPageComponent implements OnInit, OnDestroy{
  trackList: Array<TrackModel> = [];
  listObservers$: Array<Subscription> = [];

  constructor(private tracksSrevice: TracksService){}

  ngOnInit(): void {

    //llena la lista de tracks al inicializar el componente
     const observer1$ = this.tracksSrevice.getAllTracks$()
    .subscribe((response: TrackModel[]) =>{
      console.log(response)
      this.trackList = response
    }, err => {
      alert('error de conexion a la API');
    })

    this.listObservers$ = [observer1$];
  }

  ngOnDestroy(): void {
      this.listObservers$.forEach(ob => ob.unsubscribe())
  }





}
