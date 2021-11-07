import { Component} from '@angular/core';
import {CardService} from "../../services/card.service";

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss']
})
export class CardSearchComponent {

  constructor(
    private cardService:CardService
  ) { }


  search(searchText:string):void{
    searchText=searchText.toLowerCase();
    this.cardService.filterCards=this.cardService.cards.filter((card)=>{
      return card.name.toLowerCase().indexOf(searchText)>-1 || card.title.toLowerCase().indexOf(searchText)>-1;
    });
  }
}
