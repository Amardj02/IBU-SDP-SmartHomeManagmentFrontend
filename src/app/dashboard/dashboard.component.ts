// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { DevicesService } from '../services/devices.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  analogDevices: any[];
  smartDevices: any[];
  digitalDevices: any[];

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


  constructor(private deviceService: DevicesService) { }

  ngOnInit(): void {
    this.getAnalogDevices();
    this.getSmartDevices();
    this.getDigitalDevices();
  }
  toggleAnalogForm(): void {
    this.showAnalogForm = !this.showAnalogForm;
  }
  resetAndHideAnalogForm(): void {
    this.resetNewAnalogDevice(); 
    this.toggleAnalogForm(); 
  }
  toggleDigitalForm(): void {
    this.showDigitalForm = !this.showDigitalForm;
  }
  resetAndHideDigitalForm(): void {
    this.resetNewDigitalDevice(); 
    this.toggleDigitalForm(); 
  }
  toggleSmartForm(): void {
    this.showSmartForm = !this.showSmartForm;
  }
  resetAndHideSmartForm(): void {
    this.resetNewSmartDevice(); 
    this.toggleSmartForm(); 
  }
  getAnalogDevices(): void {
    this.deviceService.getAnalogDevices().subscribe(devices => this.analogDevices = devices);
  }

  getSmartDevices(): void {
    this.deviceService.getSmartDevices().subscribe(devices => this.smartDevices = devices);
  }

  getDigitalDevices(): void {
    this.deviceService.getDigitalDevices().subscribe(devices => this.digitalDevices = devices);
  }

  toggleActive(deviceId: number, type: string): void {
    this.deviceService.toggleActive(deviceId, type).subscribe(response => {
      const devices = this.getDeviceArrayByType(type);
      const index = devices.findIndex(device => device.id === deviceId);
      if (index !== -1) {
        devices[index].active = response.active;
      }
    });
  }

  createAnalogDevice(): void {
    this.deviceService.createAnalogDevice(this.newAnalogDevice).subscribe(newDevice => {
      this.analogDevices.push(newDevice);
      this.resetNewAnalogDevice();
    });
  }

  createSmartDevice(): void {
    this.deviceService.createSmartDevice(this.newSmartDevice).subscribe(newDevice => {
      this.smartDevices.push(newDevice);
      this.resetNewSmartDevice();
    });
  }

  createDigitalDevice(): void {
    this.deviceService.createDigitalDevice(this.newDigitalDevice).subscribe(newDevice => {
      this.digitalDevices.push(newDevice);
      this.resetNewDigitalDevice();
    });
  }

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


  updateAnalogDevice(deviceId: number): void {
  this.deviceService.updateAnalogDevice(deviceId, this.selectedAnalogDevice).subscribe(updatedDevice => {
    const index = this.analogDevices.findIndex(d => d.id === updatedDevice.id);
    if (index !== -1) {
      this.analogDevices[index] = updatedDevice;
    }
    this.showUpdateAnalogFormFlag = false; 
  });
}

updateSmartDevice(deviceId: number): void {
  this.deviceService.updateSmartDevice(deviceId, this.selectedSmartDevice).subscribe(updatedDevice => {
    const index = this.smartDevices.findIndex(d => d.id === updatedDevice.id);
    if (index !== -1) {
      this.smartDevices[index] = updatedDevice;
    }
    this.showUpdateSmartFormFlag = false; 
  });
}
  updateDigitalDevice(deviceId: number): void {
    this.deviceService.updateDigitalDevice(deviceId, this.selectedDigitalDevice).subscribe(updatedDevice => {
      const index = this.digitalDevices.findIndex(d => d.id === updatedDevice.id);
      if (index !== -1) {
        this.digitalDevices[index] = updatedDevice;
      }
      this.showUpdateDigitalFormFlag = false; 
    });
  }
    
  deleteAnalogDevice(deviceId: number): void {
    this.deviceService.deleteAnalogDevice(deviceId).subscribe(() => {
      const index = this.analogDevices.findIndex(device => device.id === deviceId);
      if (index !== -1) {
        this.analogDevices.splice(index, 1);
      }
    });
  }

  deleteSmartDevice(deviceId: number): void {
    this.deviceService.deleteSmartDevice(deviceId).subscribe(() => {
      const index = this.smartDevices.findIndex(device => device.id === deviceId);
      if (index !== -1) {
        this.smartDevices.splice(index, 1);
      }
    });
  }

  deleteDigitalDevice(deviceId: number): void {
    this.deviceService.deleteDigitalDevice(deviceId).subscribe(() => {
      const index = this.digitalDevices.findIndex(device => device.id === deviceId);
      if (index !== -1) {
        this.digitalDevices.splice(index, 1);
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

  private resetNewAnalogDevice(): void {
    this.newAnalogDevice = {
      mac_address: '',
      name: '',
      ip: '',
      room: null,
      active: false
    };
  }

  private resetNewSmartDevice(): void {
    this.newSmartDevice = {
      protocol_name: '',
      mac_address: '',
      name: '',
      ip: '',
      room: null,
      active: false
    };
  }

  private resetNewDigitalDevice(): void {
    this.newDigitalDevice = {
      mac_address: '',
      name: '',
      ip: '',
      room: null,
      active: false
    };
  }
}
