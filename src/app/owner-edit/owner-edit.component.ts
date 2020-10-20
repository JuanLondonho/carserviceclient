import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { CarService } from '../shared/car/car.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
owners:any ={};
owner:any = {};
cars:any = {};
ownersValidate: Array<any>;


sub: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService,
              private carService: CarService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      if(dni){
        this.ownerService.getAll().subscribe((owners: any) => {
            this.owners = owners._embedded.owners;
            for (var i = 0; i < this.owners.length; i++){
              if(dni.localeCompare(this.owners[i].dni) == 0){
                this.owner = this.owners[i];
              }
            }
            if(this.owner){
              this.owner.href = this.owner._links.self.href;
            }else{
              console.log(`Car with id '${dni}' not found, returning to list`);
              this.gotoList();
            }
        });
      }
    });
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save(form: NgForm) {
    var ownerDni = (<HTMLInputElement>document.getElementById("ownerDni")).value;
    var ownerName = (<HTMLInputElement>document.getElementById("ownerName")).value;
    console.log(ownerDni);
    this.ownerService.getAll().subscribe(result => {
      this.ownersValidate = result._embedded.owners;
      if(this.ownersValidate.length == 0){
        this.ownerService.save(form).subscribe(result => {
          this.gotoList();
        }, error => console.error(error));
      }else{
        for(var i =0; i<this.ownersValidate.length; i++){
          if(ownerDni.localeCompare(this.ownersValidate[i].dni) == 0){
            if(ownerName.localeCompare(this.ownersValidate[i].name) == 0){
              this.ownerService.save(form).subscribe(result => {
                this.gotoList();
              }, error => console.error(error));
            }else{
              alert("El usauario con el dni "+ownerDni+" ya existe.");
            }
            return;
          }else{
            if(i+1 == this.ownersValidate.length){
              this.ownerService.save(form).subscribe(result => {
                this.gotoList();
              }, error => console.error(error));
            }
          }
        }
      }
    })
    
  }

  remove(href) {
    this.ownerService.get(href).subscribe(ownerDeleted => {
      this.carService.getAll().subscribe(cars => {
        this.cars = cars._embedded.cars;
        for(var i =0; i<this.cars.length; i++){
          if((ownerDeleted.dni).localeCompare(this.cars[i].ownerDni) == 0){
            this.cars[i].ownerDni = null;
            this.carService.save(this.cars[i]).subscribe(save => {
            }, error => console.error(error));
          }
        }
      })
      this.ownerService.remove(href).subscribe(result => {
        this.gotoList();
      }, error => console.error(error));
    })
  }
}
