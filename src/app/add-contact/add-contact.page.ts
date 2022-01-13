import { Component, OnInit, NgZone } from '@angular/core';
import { ContactService } from './../shared/contact.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

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
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      first_name: [''],
      last_name: [''],
      image: [''],
      phone_number: [''],
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