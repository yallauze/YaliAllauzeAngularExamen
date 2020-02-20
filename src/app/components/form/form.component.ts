import { Component, OnInit } from '@angular/core';
import { Computer } from 'src/app/models/computer';
import { ComputerService } from 'src/app/services/computer.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  public isLoading: boolean;
  public isAdd: boolean;
  public isEdit: boolean;
  public errorMessage: string;
  public paramId: number;
  public marquesDispo: string[];
  public typesDispo: string[];
  public categoriesDispo: string[];
  public formComputer: Computer; // to bind with the formular
  public horsplage: boolean;
  public isNaN: boolean;
  public minValue: number = 0;

  constructor(private _computerService: ComputerService,
    private _toastrService: ToastrService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.marquesDispo = this._computerService.marques;
    this.typesDispo = this._computerService.types;
    this.categoriesDispo = this._computerService.categories;
    // check if there is parameter, if so, then the form component is for editing
    this.paramId = +this._activatedRoute.snapshot.paramMap.get('id');
    if (this.paramId) {
      this.isLoading = true;
      this.isEdit = true;
      this.isAdd = false;
      this._computerService.getComputerById(this.paramId).subscribe(
        (data) => {
          this.formComputer = data;
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error;
        });
    } else {
      this.isLoading = false;
      this.isAdd = true;
      this.isEdit = false;
      this.formComputer = new Computer(null, '', '', '', '', null, null, new Date());
    }
  }

  onSubmit() {
    if (this.isAdd) {
      this._computerService.addComputer(this.formComputer).subscribe(data => {
        this._toastrService.success(' Creation Submitted!!');
      });
    } else {
      this._computerService.updateComputer(this.formComputer).subscribe(data => {
        this._toastrService.success('Modification Submitted!!');
      });
    }
    this._router.navigate(['/computers']);
  }

  checkRangeAndNumber(_p: number, _$event: any) {
    this.checkRange(_p);
    this.checkIfNumber(_$event);
  }

  checkRange(p: number) {
    if (p < this.minValue) {
      this.horsplage = true;
    } else {
      this.horsplage = false;
    }
  }

  checkIfNumber($event: any) {
    if ($event.charCode > 57 || $event.charCode < 48) {
      this.isNaN = true;
    } else {
      this.isNaN = false;
    }
  }

}
