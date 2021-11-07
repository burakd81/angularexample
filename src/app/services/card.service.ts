import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {Observable} from "rxjs";
import {Card} from "../models/card";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  cards!:Card[];
  filterCards!:Card[];
  constructor(
    @Inject('apiURL') private apiURL:string,
    private http:HttpClient
  ) { }

  getCards():void {

     this.http.get<Card[]>(this.apiURL+'/cards')
       .subscribe((res:any)=>{
         this.cards=res;
         this.filterCards=res;
       })
  }
  addCard(card:Card):Observable<any>{
    return this.http.post(this.apiURL+'/cards',card);
  }
  updateCard(card:Card,cardId:number):Observable<any>{
    return this.http.put(this.apiURL+'/cards/'+cardId,card);
  }
  deleteCard(cardId:number):Observable<any>{
    return this.http.delete(this.apiURL+'/cards/'+cardId)
  }
}
