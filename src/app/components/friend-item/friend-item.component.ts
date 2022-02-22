import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../friends/user.interface';

@Component({
  selector: 'app-friend-item',
  templateUrl: './friend-item.component.html',
  styleUrls: ['./friend-item.component.css']
})
export class FriendItemComponent implements OnInit {
  @Input() user: any;
  @Input() buttonText: string = '';
  @Input() buttonClass: boolean = true;
  @Output() btnClick: EventEmitter<User> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  toggleFriend(): void {
    this.btnClick.emit(this.user)
  }
}
