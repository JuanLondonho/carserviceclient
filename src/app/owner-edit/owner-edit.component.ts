import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../shared/owner/owner.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-owner-edit',
  templateUrl: './owner-edit.component.html',
  styleUrls: ['./owner-edit.component.css']
})
export class OwnerEditComponent implements OnInit {
owner:any ={};

sub: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      if(dni){
        this.owner = this.ownerService.get(dni);
        if(this.owner){
          this.owner.href = this.owner._link.self.href;
        }else{
          console.log(`Car with dni '${dni}' not found, returning to list`);
          this.gotoList();
        }
      }
    })
  }

  gotoList() {
    this.router.navigate(['/owner-list']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  save(form: NgForm) {
    this.ownerService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.ownerService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
