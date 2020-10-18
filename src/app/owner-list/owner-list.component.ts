import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';


@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  selected: any = [];

  constructor(private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });
  }

  ownerSelected(url: String) {
    if(!this.selected.includes(url)){
      this.selected.push(url);
    }else{
      this.selected.splice(this.selected.indexOf(url) , 1)
    }
    console.log(this.selected);
  }

  removeSelected(){
    for(var i=0; i < this.selected.length; i++){
      console.log(this.selected[i]);
      this.ownerService.remove(this.selected[i]).subscribe( result => {
        if(i == this.selected.length){
          this.selected = [];
          window.location.reload();
        }
      });
    }
  }
}
