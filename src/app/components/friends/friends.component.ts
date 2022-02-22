import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { User } from './user.interface';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css'],
})
export class FriendsComponent implements OnInit {
  @ViewChild('search') search: ElementRef | undefined;
  public textFragment: string = '';
  public visibleFriends = true;
  public filteredUsers: Array<User> = [];
  public users: Array<User> = [
    {
      name: 'John Doe',
      email: 'john_doe@mail.com',
      id: 1,
    },
    {
      name: 'John Taylor',
      email: 'john_taylor@mail.com',
      id: 2,
    },
    {
      name: 'Lucy Kruch',
      email: 'lucy_kruch@mai.com',
      id: 3,
    },
    {
      name: 'Monika Nis',
      email: 'monika_nis@mail.com',
      id: 4,
    },
    {
      name: 'Antoni Kruch',
      email: 'antoni_kruch@mail.com',
      id: 5,
    },
    {
      name: 'Claudia Shynda',
      email: 'claudia_shynda@mail.com',
      id: 6,
    },
    {
      name: 'Rick Novak',
      email: 'rick_novak@mail.com',
      id: 7,
    },
    {
      name: 'Susan Connor',
      email: 'susan_connor@mail.com',
      id: 8,
    },
    {
      name: 'Ronald Barr',
      email: 'ronald_barr@mail.com',
      id: 9,
    },
    {
      name: 'Roger Lum',
      email: 'roger_lum@mail.com',
      id: 10,
    },
    {
      name: 'Jeff Johnson',
      email: 'jeff_johnson@mail.com',
      id: 11,
    },
    {
      name: 'Melvin Forbis',
      email: 'melvin_forbis@mail.com',
      id: 12,
    },
    {
      name: 'Alen Lee',
      email: 'alen_lee@mail.com',
      id: 13,
    },
  ];
  public friends: Array<User> = [
    {
      name: 'John Doe',
      email: 'john_doe@mail.com',
      id: 1,
    },
    {
      name: 'John Taylor',
      email: 'john_taylor@mail.com',
      id: 2,
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  onSearch(): void {
    this.filteredUsers = this.users;
    this.textFragment = this.search?.nativeElement.value;
    this.visibleFriends = false;
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(this.textFragment) ||
        user.email.toLowerCase().includes(this.textFragment)
    );
  }

  addFriend(user: any): void {
    this.visibleFriends = true;
    this.friends.push(user);
  }

  removeFriend(user: any): void {
    const id = user.id;
    const index = this.friends.findIndex((friend) => friend.id === id);
    this.friends.splice(index, 1);
  }
}
