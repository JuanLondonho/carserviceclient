import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-edit',
  templateUrl: './car-edit.component.html',
  styleUrls: ['./car-edit.component.css']
})
export class CarEditComponent implements OnInit, OnDestroy {
  car: any = {};
  owners: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private carService: CarService,
              private ownerService:OwnerService,
              private giphyService: GiphyService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.carService.get(id).subscribe((car: any) => {
          if (car) {
            this.car = car;
            this.car.ownerDni = car.ownerDni;
            this.car.href = car._links.self.href;
            this.giphyService.get(car.name).subscribe(url => car.giphyUrl = url);
          } else {
            console.log(`Car with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/car-list']);
  }

  save(form: NgForm) {
    var ownerDni = (<HTMLInputElement>document.getElementById("ownerDni")).value;
    if(ownerDni != ""){
      this.ownerService.getAll().subscribe(result => {
        this.owners = result._embedded.owners;
        for(var i = 0; i < this.owners.length; i++){
          if(ownerDni.localeCompare(this.owners[i].dni) == 0){
            this.carService.save(form).subscribe(result => {
              this.gotoList();
            }, error => console.error(error));
            break;
          }else{
            if(i+1 == this.owners.length){
              alert("No existe ningun propietario con ese DNI");
            }
          }
          
          
        }
        
      });
    }else{
      this.carService.save(form).subscribe(result => {
        this.gotoList();
        return;
      }, error => console.error(error));
    }
    
    
  }

  remove(href) {
    this.carService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}

