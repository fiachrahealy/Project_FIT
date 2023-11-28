import { Component, NgZone, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CurrentUser } from 'interfaces/current-user.interface';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-record-weight',
  templateUrl: './record-weight.component.html',
  styleUrls: ['./record-weight.component.scss']
})
export class RecordWeightComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecordWeightComponent>, public dataService: DataService, private ngZone: NgZone){}

  currentUser: CurrentUser = {
    ID: '',
    email: '',
    firstName: 'test',
    lastName: '',
    height: 0,
    nutritionalGoals: {
      calories: 0,
      protein: 0,
      fat: 0,
      saturates: 0,
      sugars: 0,
      salt: 0
    }
  }

  ngOnInit(): void {
    
    this.dataService.getCurrentUser()
    .then((user) => {
      this.currentUser = user;
    });

  }

  // Create Weight Diary Entry

  createWeightDiaryEntry(weight: string, date: string){

    this.dataService.createWeightDiaryEntry(parseFloat(weight), new Date(date), this.currentUser)
    .then(() => {
      this.ngZone.run(() => {
        this.dataService.refreshWeightGraph();
        this.dialogRef.close();
      });
    })

  }

}
