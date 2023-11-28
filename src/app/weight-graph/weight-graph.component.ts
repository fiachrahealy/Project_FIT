import { Component, OnInit } from '@angular/core';
import Chart, { ChartDataset } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { CurrentUser } from 'interfaces/current-user.interface';
import { WeightDiaryEntry } from 'interfaces/weight-diary-entry.interface';
import { DataService } from 'services/data.service';

@Component({
  selector: 'app-weight-graph',
  templateUrl: './weight-graph.component.html',
  styleUrls: ['./weight-graph.component.scss']
})

export class WeightGraphComponent implements OnInit {

  constructor(public dataService: DataService) {

    this.dataService.weightGraphRefreshEvent.subscribe(value => {

      if (value === true) {
        this.pullGraphData();

      }

    });

  }

  weightGraphLoading: Boolean = false;

  chart: any = [];

  graphDatasets: Array<ChartDataset> = [];

  currentUser: CurrentUser = {
    ID: '',
    email: '',
    firstName: '',
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
  currentUserWeightDiaryEntries: Array<WeightDiaryEntry> = [];
  currentUserBMI: number = 0;
  currentUserWeight: number = 0;
  currentUserWeightLost: number = 0;

  ngOnInit(): void {

    this.pullGraphData();

    this.chart = new Chart("canvas", {
      type: 'line',
      data: {
        datasets: [
          {
            data: [],
            fill: false,
            backgroundColor: "#3692CD",
            borderColor: "#3692CD",
            pointBackgroundColor: "#3692CD"
          }
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time'
          }
        },
        animation: false
      }
    });

  }

  // Pull Graph Data

  pullGraphData() {

    this.weightGraphLoading = true;

    this.dataService.getCurrentUser()
      .then((user) => {
        this.currentUser = user;
        this.dataService.getAllWeightDiaryEntries(this.currentUser)
          .then((weightDiaryEntries) => {
            this.currentUserWeightDiaryEntries = weightDiaryEntries;
            this.currentUserWeightDiaryEntries.forEach((weightDiaryEntry) => {
              this.chart.data.datasets[0].data.push({ x: weightDiaryEntry.date, y: weightDiaryEntry.weight })
            });
            this.currentUserWeight = this.currentUserWeightDiaryEntries[this.currentUserWeightDiaryEntries.length - 1].weight;
            this.currentUserBMI = this.calculateBMI(this.currentUser.height, this.currentUserWeightDiaryEntries[this.currentUserWeightDiaryEntries.length - 1].weight);
            this.currentUserWeightLost = (Math.round((this.currentUserWeightDiaryEntries[0].weight - this.currentUserWeightDiaryEntries[this.currentUserWeightDiaryEntries.length - 1].weight) * 10)) / 10;
            this.chart.data.datasets[0].label = this.currentUser.firstName + " " + this.currentUser.lastName;
            this.weightGraphLoading = false;
          });
      });
  }

  // Calculate BMI

  calculateBMI(height: number, weight: number): number {

    return Math.round(weight / ((height / 100) * (height / 100)) * 10) / 10;

  }

}
