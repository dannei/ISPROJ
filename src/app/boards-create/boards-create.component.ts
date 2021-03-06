import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-boards-create',
  templateUrl: './boards-create.component.html',
  styleUrls: ['./boards-create.component.css']
})
export class BoardsCreateComponent implements OnInit {
  boardsForm: FormGroup;
  listNum:number=1;
  Name:string='';
  Email:string='';
  Phone:string='';
  constructor(private router: Router, private fs: FirestoreService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.boardsForm = this.formBuilder.group({
      'Name' : [null, Validators.required],
      'Email' : [null, Validators.required],
      'Phone' : [null, Validators.required]
    });
  }
  onFormSubmit(form:NgForm) {
    this.fs.postBoard(form)
      .subscribe(res => {
          let id = res['key'];
          this.router.navigate(['/boards-details', id]);
        }, (err) => {
          console.log(err);
        });
  }
}
