import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/models/computer';
import { ComputerService } from 'src/app/services/computer.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public computers: Computer[];
  public isLoading: boolean;
  public nbRestant: number;
  public errorMessage: string;

  constructor(private _computerService: ComputerService, private _toastrService: ToastrService) { }

  ngOnInit() {
    this.isLoading = true;
    this._computerService.getComputers().subscribe(
      (data) => {
        this.computers = data;
        this.isLoading = false;
        this.nbRestant = this.computers.length;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      }
    );
  }

  deleteComputer(_computer: Computer) {
    this._computerService.deleteComputer(_computer).subscribe(
      (data) => {
        this._computerService.getComputers().subscribe(
          (data) => {
            this.computers = data;
            this.nbRestant = this.computers.length;
            this._toastrService.success('Deleted!!');
          },
          (error) => {
            this.errorMessage = error;
          }
        );
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
