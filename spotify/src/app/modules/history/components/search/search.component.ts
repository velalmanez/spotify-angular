import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  src:string = ''; 

  callSearch(term:string): void{
    if(term.length >= 4){
      console.log(term)
    }
  }

}
