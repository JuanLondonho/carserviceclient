import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CarService } from '../shared/car/car.service';
import { OwnerService } from '../shared/owner/owner.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-car-owner-list',
  templateUrl: './car-owner-list.component.html',
  styleUrls: ['./car-owner-list.component.css']
})
export class CarOwnerListComponent implements OnInit {
  cars:Array<any>;
  ownerCarList: Array<any>;
  owners: Array<any>;


  constructor(private carService: CarService,
              private ownerService: OwnerService,
              private giphyService: GiphyService,
              ) { }

  ngOnInit() {
    this.ownerCarList =[];
    this.ownerService.getAll().subscribe(result => {
      this.owners = result._embedded.owners;
      this.carService.getAll().subscribe(cars => {
        this.cars = cars;
        for(const car of this.cars){
          if(car.ownerDni != null){
            this.giphyService.get(car.name).subscribe(giphy => {
              car.giphyUrl = giphy;
              for(const owner of this.owners){
                if((owner.dni).localeCompare(car.ownerDni) == 0){
                  this.ownerCarList.push({
                    carName: car.name,
                    ownerDni: car.ownerDni,
                    ownerName: owner.name,
                    giphyUrl: car.giphyUrl
                  });
                }
              }
            })
          }
        }
      })
    })
  }

}
