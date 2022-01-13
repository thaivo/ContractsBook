import { Component, OnInit } from '@angular/core';
import { ContactService } from './../shared/contact.service';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {

  updateContactForm: FormGroup;
  id: any;

  constructor(
    private contactAPI: ContactService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public fb: FormBuilder
  ) {
    console.log('Thai this.actRoute:'+this.actRoute)
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getContactData(this.id);
    this.updateContactForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      phone_number: [''],
      image: ['']
    })
  }

  getContactData(id) {
    this.contactAPI.getContact(id).subscribe(res => {
      this.updateContactForm.setValue({
        first_name: res['first_name'],
        last_name: res['last_name'],
        email: res['email'],
        phone_number: res['phone_number'],
        image: res['image']

      });
    });
  }

  updateForm() {
    if (!this.updateContactForm.valid) {
      return false;
    } else {
      this.contactAPI.updateContact(this.id, this.updateContactForm.value)
        .subscribe((res) => {
          console.log(res)
          this.updateContactForm.reset();
          this.router.navigate(['/home']);
        })
    }
  }

}
