import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';
import { ActivatedRoute, Router } from '@angular/router';


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
              private carService: CarService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.selected = [];
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
    var h = 0;
    for(var i = 0; i < this.selected.length; i++){
      this.ownerService.get(this.selected[i]).subscribe(ownerDeleted => {
        this.carService.getAll().subscribe(cars =>{
          this.cars = cars;
          for(var j = 0; j < this.cars.length; j++){
            if((ownerDeleted.dni).localeCompare(this.cars[j].ownerDni) == 0){
              this.cars[j].ownerDni = null;
              this.carService.save(this.cars[j]).subscribe(save => {
              }, error => console.error(error));
            }
            if(j + 1 == this.cars.length){
              this.ownerService.remove(this.selected[h]).subscribe( result => {
                if(h+1 >= this.selected.length){
                  this.selected = [];
                  window.location.reload();
                }
              });
              h+=1;
            }
          }
        });
      })
    }
  }
}
