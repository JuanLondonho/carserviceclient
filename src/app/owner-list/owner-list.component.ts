import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';


@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit {
  owners: Array<any>;
  selected: any = [];
  cars: any ={};

  constructor(private ownerService: OwnerService,
              private carService: CarService) { }

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
  }

  removeSelected(){
    for(var i=0; i < this.selected.length; i++){
      this.ownerService.get(this.selected[i]).subscribe(ownerDeleted => {
        this.carService.getAll().subscribe(cars =>{
          this.cars = cars._embedded.cars;
          for(var i =0; i<this.cars.length; i++){
            if((ownerDeleted.dni).localeCompare(this.cars[i].ownerDni) == 0){
              this.cars[i].ownerDni = null;
              this.carService.save(this.cars[i]).subscribe(save => {
              }, error => console.error(error));
            }
          }
        });
      })
      this.ownerService.remove(this.selected[i]).subscribe( result => {
        if(i == this.selected.length){
          this.selected = [];
          window.location.reload();
        }
      });
    }
  }
}
