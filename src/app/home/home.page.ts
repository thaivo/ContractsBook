import { Component, OnInit } from '@angular/core';
import { ContactService } from './../shared/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {
  Contacts: any = [];

  constructor(
    private contactService: ContactService
  ) {
  }

  ngOnInit() { }

  ionViewDidEnter() {
    this.contactService.getContactList().subscribe((res) => {
      console.log(res)
      this.Contacts = res;
    })
  }

  deleteContact(contact, i) {
    if (window.confirm('Do you want to delete contact?')) {
      this.contactService.deleteContact(contact._id)
        .subscribe(() => {
          this.Contacts.splice(i, 1);
          console.log('Contact deleted!')
        }
        )
    }
  }

  // searchContact(){

  // }
}
