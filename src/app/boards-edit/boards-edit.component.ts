import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
@Component({
  selector: 'app-boards-edit',
  templateUrl: './boards-edit.component.html',
  styleUrls: ['./boards-edit.component.css']
})
export class BoardsEditComponent implements OnInit {
  boardsForm: FormGroup;
  id:string = '';
  Name:string = '';
  Email:string = '';
  Phone:string = '';
  constructor(private router: Router, private route: ActivatedRoute, private fs: FsService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getBoard(this.route.snapshot.params['id']);
    this.boardsForm = this.formBuilder.group({
      'Name' : [null, Validators.required],
      'Email' : [null, Validators.required],
      'Phone' : [null, Validators.required]
    });
  }
  getBoard(id) {
    this.fs.getBoard(id).subscribe(data => {
      this.id = data.key;
      this.boardsForm.setValue({
        title: data.title,
        description: data.description,
        author: data.author
      });
    });
  }
  onFormSubmit(form:NgForm) {
    this.fs.updateBoards(this.id, form)
      .subscribe(res => {
          this.router.navigate(['/boards']);
        }, (err) => {
          console.log(err);
        }
      );
  }
  boardsDetails() {
    this.router.navigate(['/boards-details', this.id]);
  }
}
