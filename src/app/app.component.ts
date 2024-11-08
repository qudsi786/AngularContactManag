import { Component, OnInit, TemplateRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from "../app/Data/Users/users";
import { UsersSeedData } from '../app/Data/Users/users-seed-data';
import { NgFor,NgIf ,CommonModule} from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormBuilder, FormControl, FormGroup,ReactiveFormsModule,FormsModule, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  users: User[] = []
  modalRef?: BsModalRef;
  myForm: FormGroup;
 
  constructor(private modalService: BsModalService,private fb:FormBuilder) 
  { 
    this.myForm = this.fb.group({ 
      fname: new FormControl<string>('', [Validators.required]),
      lname: new FormControl<string>('', [Validators.required]),
       email: new FormControl<string>('', [Validators.required, Validators.email])
    })
  }
  
openModal(template: TemplateRef<any>) {    
  this.modalRef = this.modalService.show(template);
}
  ngOnInit(): void {
    // add the seed data here 
   this.users = UsersSeedData;
  }

  addUser() {
    if (this.myForm.valid) {
      const user: User = { 
        id: this.users.length,
        fname: this.myForm.value.fname,
        email: this.myForm.value.email,
        lastname: this.myForm.value.lname
       
      } as User;
    
      this.users.push(user);
    
      this.modalRef?.hide();
    }}
}
