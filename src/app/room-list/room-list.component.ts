import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [];
  newRoom: { name: string } = { name: '' };
  newRoomOwnerUsername: string = '';
  selectedRoom: any;
  newOwnerUsername: string = '';
  isUpdateMode: boolean = false;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.fetchRooms();
  }
    get isSuperUser(): boolean {
    return this.authService.isSuperUser();
  }
  
  fetchRooms(): void {
    this.authService.getRooms().subscribe(
      (rooms) => {
        this.rooms = rooms;
      },
      (error) => {
        console.error('Failed to fetch rooms', error);
      }
    );
  }

 createRoom(): void {
    const payload = {
      name: this.newRoom.name,
      owner_username: this.newRoomOwnerUsername
    };

    this.authService.createRoom(payload).subscribe(
      () => {
        console.log('Room created');
        this.fetchRooms();
        this.newRoom.name = '';
        this.newRoomOwnerUsername = '';
      },
      (error) => console.error('Failed to create room', error)
    );
  }

  updateSelectedRoom(roomId: number): void {
    this.authService.getRoom(roomId).subscribe(
      (room) => {
        this.selectedRoom = room;
        this.isUpdateMode = true;
      },
      (error) => console.error('Failed to fetch room for update', error)
    );
  }

  saveUpdatedRoom(): void {
    if (this.isUpdateValid()) {
      const updateData = {
        name: this.selectedRoom.name,
        owner_username: this.newOwnerUsername
      };

      this.authService.updateRoom(this.selectedRoom.id, updateData).subscribe(
        () => {
          console.log('Room updated');
          this.resetValuesAndRefreshList();
        },
        (error) => console.error('Failed to update room', error)
      );
    }
  }
   isUpdateValid(): boolean {
    return this.newOwnerUsername && this.selectedRoom?.name;
  }
 resetValuesAndRefreshList(): void {
    this.selectedRoom = null;
    this.newOwnerUsername = '';
    this.isUpdateMode = false;
    this.fetchRooms();
  }

   deleteRoom(roomId: number): void {
    this.authService.deleteRoom(roomId).subscribe(
      () => {
        console.log('Room deleted');
        this.fetchRooms();
      },
      (error) => console.error('Failed to delete room', error)
    );
  }

  cancelUpdate(): void {
    this.isUpdateMode = false;
    this.selectedRoom = null;
    this.newOwnerUsername = '';
  }
}
