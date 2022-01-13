import { Component, OnInit, NgZone } from '@angular/core';
import { ContactService } from './../shared/contact.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})

export class AddContactPage implements OnInit {
  contactForm: FormGroup;

  constructor(
    private contactAPI: ContactService,
    private router: Router,
    public fb: FormBuilder,
    private zone: NgZone
  ) {
    this.contactForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      image: [''],
      phone_number: [''],
      email: ['']
    })
  }

  ngOnInit() { }

  onFormSubmit() {
    if (!this.contactForm.valid) {
      return false;
    } else {
      this.contactAPI.addContact(this.contactForm.value)
        .subscribe((res) => {
          this.zone.run(() => {
            console.log(res)
            this.contactForm.reset();
            this.router.navigate(['/home']);
          })
        });
    }
  }
}