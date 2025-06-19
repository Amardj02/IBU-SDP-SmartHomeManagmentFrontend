import { Component, OnInit, ViewChild } from '@angular/core';
import { DevicesService } from '../services/devices.service';
import { AuthService } from '../services/auth.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  @ViewChild(ToastComponent) toast!: ToastComponent;

  analogDevices: any[] = [];
  smartDevices: any[] = [];
  digitalDevices: any[] = [];

  rooms: any[] = [];  // <-- Added: rooms list

  newAnalogDevice: any = {
    mac_address: '',
    name: '',
    ip: '',
    room: null,
    active: false
  };

  newSmartDevice: any = {
    protocol_name: '',
    mac_address: '',
    name: '',
    ip: '',
    room: null,
    active: false
  };

  newDigitalDevice: any = {
    mac_address: '',
    name: '',
    ip: '',
    room: null,
    active: false
  };

  showAnalogForm: boolean = false;
  showUpdateAnalogFormFlag: boolean = false;
  selectedAnalogDevice: any;

  showSmartForm: boolean = false;
  showUpdateSmartFormFlag: boolean = false;
  selectedSmartDevice: any;

  showDigitalForm: boolean = false;
  showUpdateDigitalFormFlag: boolean = false;
  selectedDigitalDevice: any;

  constructor(
    private authService: AuthService,
    private deviceService: DevicesService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isAuthenticated();

    if (this.isLoggedIn) {
      this.loadDevices();
      this.loadRooms();  // <-- Load rooms on init
    }
  }

  loadRooms(): void {
    this.authService.getRooms().subscribe(
      rooms => {
        this.rooms = rooms;
      },
      error => {
        console.error('Failed to load rooms', error);
      }
    );
  }

  loadDevices(): void {
    this.getAnalogDevices();
    this.getSmartDevices();
    this.getDigitalDevices();
  }

  // Device loading
  getAnalogDevices(): void {
    this.deviceService.getAnalogDevices().subscribe(devices => this.analogDevices = devices);
  }

  getSmartDevices(): void {
    this.deviceService.getSmartDevices().subscribe(devices => this.smartDevices = devices);
  }

  getDigitalDevices(): void {
    this.deviceService.getDigitalDevices().subscribe(devices => this.digitalDevices = devices);
  }

  // Toggle forms
  toggleAnalogForm(): void {
    this.showAnalogForm = !this.showAnalogForm;
  }

  toggleDigitalForm(): void {
    this.showDigitalForm = !this.showDigitalForm;
  }

  toggleSmartForm(): void {
    this.showSmartForm = !this.showSmartForm;
  }

  // Reset new devices
  private emptyAnalogDevice() {
    return { mac_address: '', name: '', ip: '', room: null, active: false };
  }

  private emptySmartDevice() {
    return { protocol_name: '', mac_address: '', name: '', ip: '', room: null, active: false };
  }

  private emptyDigitalDevice() {
    return { mac_address: '', name: '', ip: '', room: null, active: false };
  }

  resetNewAnalogDevice(): void {
    this.newAnalogDevice = this.emptyAnalogDevice();
  }

  resetNewSmartDevice(): void {
    this.newSmartDevice = this.emptySmartDevice();
  }

  resetNewDigitalDevice(): void {
    this.newDigitalDevice = this.emptyDigitalDevice();
  }

  resetAndHideAnalogForm(): void {
    this.resetNewAnalogDevice();
    this.toggleAnalogForm();
  }

  resetAndHideDigitalForm(): void {
    this.resetNewDigitalDevice();
    this.toggleDigitalForm();
  }

  resetAndHideSmartForm(): void {
    this.resetNewSmartDevice();
    this.toggleSmartForm();
  }

  // Create devices
  createAnalogDevice(): void {
    const payload = { ...this.newAnalogDevice };
    payload.room = payload.room ? Number(payload.room) : null;

    this.deviceService.createAnalogDevice(payload).subscribe(
      newDevice => {
        this.analogDevices.push(newDevice);
        this.resetNewAnalogDevice();
        this.showAnalogForm = false;
        this.toast.show('Analog device created successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to create analog device.', 'error');
        console.error(error);
      }
    );
  }

  createSmartDevice(): void {
    const payload = { ...this.newSmartDevice };
    payload.room = payload.room ? Number(payload.room) : null;

    this.deviceService.createSmartDevice(payload).subscribe(
      newDevice => {
        this.smartDevices.push(newDevice);
        this.resetNewSmartDevice();
        this.showSmartForm = false;
        this.toast.show('Smart device created successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to create smart device.', 'error');
        console.error(error);
      }
    );
  }

  createDigitalDevice(): void {
    const payload = { ...this.newDigitalDevice };
    payload.room = payload.room ? Number(payload.room) : null;

    this.deviceService.createDigitalDevice(payload).subscribe(
      newDevice => {
        this.digitalDevices.push(newDevice);
        this.resetNewDigitalDevice();
        this.showDigitalForm = false;
        this.toast.show('Digital device created successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to create digital device.', 'error');
        console.error(error);
      }
    );
  }

  // Show update forms
  showUpdateAnalogForm(device: any): void {
    this.selectedAnalogDevice = { ...device };
    this.showUpdateAnalogFormFlag = true;
  }

  showUpdateDigitalForm(device: any): void {
    this.selectedDigitalDevice = { ...device };
    this.showUpdateDigitalFormFlag = true;
  }

  showUpdateSmartForm(device: any): void {
    this.selectedSmartDevice = { ...device };
    this.showUpdateSmartFormFlag = true;
  }

  // Update devices
  updateAnalogDevice(deviceId: number): void {
    this.deviceService.updateAnalogDevice(deviceId, this.selectedAnalogDevice).subscribe(
      updatedDevice => {
        const index = this.analogDevices.findIndex(d => d.id === updatedDevice.id);
        if (index !== -1) {
          this.analogDevices[index] = updatedDevice;
        }
        this.showUpdateAnalogFormFlag = false;
        this.toast.show('Analog device updated successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to update analog device.', 'error');
        console.error(error);
      }
    );
  }

  updateSmartDevice(deviceId: number): void {
    this.deviceService.updateSmartDevice(deviceId, this.selectedSmartDevice).subscribe(
      updatedDevice => {
        const index = this.smartDevices.findIndex(d => d.id === updatedDevice.id);
        if (index !== -1) {
          this.smartDevices[index] = updatedDevice;
        }
        this.showUpdateSmartFormFlag = false;
        this.toast.show('Smart device updated successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to update smart device.', 'error');
        console.error(error);
      }
    );
  }

  updateDigitalDevice(deviceId: number): void {
    this.deviceService.updateDigitalDevice(deviceId, this.selectedDigitalDevice).subscribe(
      updatedDevice => {
        const index = this.digitalDevices.findIndex(d => d.id === updatedDevice.id);
        if (index !== -1) {
          this.digitalDevices[index] = updatedDevice;
        }
        this.showUpdateDigitalFormFlag = false;
        this.toast.show('Digital device updated successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to update digital device.', 'error');
        console.error(error);
      }
    );
  }

  // Delete devices
  deleteAnalogDevice(deviceId: number): void {
    this.deviceService.deleteAnalogDevice(deviceId).subscribe(
      () => {
        this.analogDevices = this.analogDevices.filter(device => device.id !== deviceId);
        this.toast.show('Analog device deleted successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to delete analog device.', 'error');
        console.error(error);
      }
    );
  }

  deleteSmartDevice(deviceId: number): void {
    this.deviceService.deleteSmartDevice(deviceId).subscribe(
      () => {
        this.smartDevices = this.smartDevices.filter(device => device.id !== deviceId);
        this.toast.show('Smart device deleted successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to delete smart device.', 'error');
        console.error(error);
      }
    );
  }

  deleteDigitalDevice(deviceId: number): void {
    this.deviceService.deleteDigitalDevice(deviceId).subscribe(
      () => {
        this.digitalDevices = this.digitalDevices.filter(device => device.id !== deviceId);
        this.toast.show('Digital device deleted successfully!', 'success');
      },
      error => {
        this.toast.show('Failed to delete digital device.', 'error');
        console.error(error);
      }
    );
  }

  // Toggle active
  toggleActive(deviceId: number, type: string): void {
    this.deviceService.toggleActive(deviceId, type).subscribe(response => {
      let devicesArray = this.getDeviceArrayByType(type);
      const index = devicesArray.findIndex(device => device.id === deviceId);
      if (index !== -1) {
        devicesArray[index].active = response.active;
        devicesArray[index].status = response.active ? 'Online' : 'Offline';
      }
    });
  }

  private getDeviceArrayByType(type: string): any[] {
    switch (type) {
      case 'analog':
        return this.analogDevices;
      case 'smart':
        return this.smartDevices;
      case 'digital':
        return this.digitalDevices;
      default:
        return [];
    }
  }
}
