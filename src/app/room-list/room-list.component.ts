import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css'],
})
export class RoomListComponent implements OnInit {
  rooms: any[] = [];
  newRoom: { name: string, owner: number } = { name: '', owner: 0 };
  selectedRoom: any;
  newOwnerId: any;
  isUpdateMode: boolean = false;

  constructor(private authService: AuthService) {
    this.newOwnerId = null;
  }

  ngOnInit(): void {
    this.fetchRooms();
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
    this.authService.createRoom(this.newRoom).subscribe(
      (response) => {
        console.log('Room created:', response);
        this.fetchRooms();
      },
      (error) => {
        console.error('Failed to create room', error);
      }
    );
  }

  updateSelectedRoom(roomId: number): void {
    this.authService.getRoom(roomId).subscribe(
      (room) => {
        this.selectedRoom = room;
        this.isUpdateMode = true;
      },
      (error) => {
        console.error('Failed to fetch room for update', error);
      }
    );
  }

  saveUpdatedRoom(): void {
    if (this.isUpdateValid()) {
      const roomId = this.selectedRoom.id;
      const updateData = { name: this.selectedRoom.name, owner: this.newOwnerId };

      this.authService.updateRoom(roomId, updateData).subscribe(
        (response) => {
          console.log('Room updated:', response);
          this.resetValuesAndRefreshList();
        },
        (error) => {
          console.error('Failed to update room', error);
        }
      );
    } else {
      console.error('Update conditions not met');
    }
  }

  isUpdateValid(): boolean {
    return this.newOwnerId !== undefined && this.selectedRoom !== undefined && this.selectedRoom.name !== undefined;
  }

  resetValuesAndRefreshList(): void {
    this.selectedRoom = null;
    this.newOwnerId = null;
    this.isUpdateMode = false;
    this.fetchRooms();
  }

  deleteRoom(roomId: number): void {
    this.authService.deleteRoom(roomId).subscribe(
      () => {
        console.log('Room deleted');
        this.fetchRooms();
      },
      (error) => {
        console.error('Failed to delete room', error);
      }
    );
  }

  cancelUpdate(): void {
    this.isUpdateMode = false;
    this.selectedRoom = null;
    this.newOwnerId = null;
  }
}
