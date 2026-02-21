import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  src:string = ''; 

  //mandamos datos al padre(history)
  @Output() callbackData: EventEmitter<any> = new EventEmitter();

  callSearch(term:string): void{
    if(term.length >= 4){
      
      //pasamos el dato al componente padre
      this.callbackData.emit(term);
      
      console.log(term)
    }
  }

}
