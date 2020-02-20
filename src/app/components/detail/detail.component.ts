import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/models/computer';
import { ComputerService } from 'src/app/services/computer.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  public isLoading: boolean;
  public computerAfficher: Computer;
  public errorMessage: string;

  constructor(private _computerService: ComputerService, private _activatedRoute: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this._computerService.getComputerById(+this._activatedRoute.snapshot.paramMap.get('id')).subscribe(
      (data: Computer) => {
        this.computerAfficher = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
  }

}
