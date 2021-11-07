import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CardService} from "../../services/card.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Card} from "../../models/card";
import {SnackbarService} from "../../services/snackbar.service";

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!:FormGroup;
  showSpinner:boolean=false;
  constructor(
    private fb:FormBuilder,
    private cardService:CardService,
    private dialogRef:MatDialogRef<CardModalComponent>,
    private _snackBar: MatSnackBar,
    private snackBarService:SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data:Card,
  ) { }

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm=this.fb.group({
      name:[this.data?.name || '', [Validators.required,Validators.maxLength(50)]],
      title:[this.data?.title || '', [Validators.required,Validators.maxLength(255)]],
      phone:[this.data?.phone ||'', [Validators.required,Validators.maxLength(20)]],
      email:[this.data?.email ||'', [Validators.email,Validators.maxLength(50)]],
      address:[this.data?.address || '',[Validators.maxLength(255)]],
    });

  }
addCard(){
    this.showSpinner=true;
    this.cardService.addCard(this.cardForm.value)
      .subscribe((res: any)=>{
        this.getSucces(res||'Kartiviz Başarıyla Eklendi.')

  },(err:any)=>{
        this.getError(err.message || 'Kartvizit güncellenirken bir sorun oluştu');
      });

  }
  updateCard():void{
    this.showSpinner=true;
    this.cardService.updateCard(this.cardForm.value,this.data.id)
      .subscribe((res:any)=>{
        this.getSucces(res||'Kartiviz Başarıyla Düzenlendi.')
        },(err:any)=>{
        this.getError(err.message || 'Kartvizit güncellenirken bir sorun oluştu');
    });
}
  deleteCard():void{
    this.showSpinner=true;
    this.cardService.deleteCard(this.data.id)
      .subscribe((res:any)=>{
       this.getSucces(res||'Kartiviz Başarıyla Silindi.')
      },(err:any)=>{
        this.getError(err.message || 'Kartvizit güncellenirken bir sorun oluştu');
      });
  }
  getSucces(message:string):void{
  this.snackBarService.createSnackBar('success',message);
      this.cardService.getCards();
      this.showSpinner=false;
      this.dialogRef.close();
    }

    getError(message:string):void{
      this.snackBarService.createSnackBar('error',message);
      this.showSpinner=false;
    }
  }

