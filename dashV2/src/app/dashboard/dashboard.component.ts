import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AmazonService } from '../getfromAPI/amazon.service';
import { InterService } from '../getfromAPI/international.service';
import { SalereportServiceService } from '../getfromAPI/salereport.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Chart } from 'chart.js/auto';
import { TableauComponent } from '../tableau/tableau.component';

@Component({
  selector: 'app-dashboard',
  imports: [HttpClientModule,CommonModule,TableauComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit , AfterViewInit  {
  
  constructor(private amazonService : AmazonService ,
              private internationnalService : InterService,
              private salereportService : SalereportServiceService
  ) {}

  ngAfterViewInit(): void {

    // status stt
    this.amazonService.getStatusSTT().subscribe(data => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        const colorMap: Record<string, string> = {
          'Shipped': '#26c6da',
          'Cancelled': '#ffca28',
          'Delivered to Buyer': '#ef5350',
          'Returned to Seller': '#e0e0e0'
        };

        const backgroundColors = labels.map(label => colorMap[label] || '#ccc');

        new Chart('statusstt', {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: backgroundColors,
              borderWidth: 0
            }]
          },
          options: {
            plugins: { legend: { display: false } },
            cutout: '60%'
          }
        });
      });
    // topmodelivraison
    this.amazonService.getTopmodelivraison().subscribe(data => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        const colorMap: Record<string, string> = {
          'Expedited': '#26c6da',
          'Standard': '#ffca28'
        };

        const backgroundColors = labels.map(label => colorMap[label] || '#ccc');

        new Chart('topmodelivraison', {
          type: 'doughnut',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              backgroundColor: backgroundColors,
              borderWidth: 0
            }]
          },
          options: {
            plugins: { legend: { display: false } },
            cutout: '60%'
          }
        });
      });
    // Chart 1: size grand stock
    this.salereportService.getSizegrandStock().subscribe(data => {
      const labels = Object.keys(data);   
      const values = Object.values(data);

      new Chart('sizegrandstock', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            label: 'Sales',
            borderColor: '#ffffff',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ffffff',
            tension: 0.4
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive:true,
          plugins: { legend: { display: false } },        
          scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
          }
        }
      });
    });

    // Chart 1: couleur grand stock
    this.salereportService.getCouleurgrandStock().subscribe(data => {
      const labels = Object.keys(data);   
      const values = Object.values(data); 

      new Chart('couleurgrandstock', {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            label: 'Sales',
            borderColor: '#ffffff',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#ffffff',
            tension: 0.4
          }]
        },
        options: {
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },        
          scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
          }
        }
      });
    });

    // Chart 2: day of week 
    this.amazonService.getTopstates().subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      new Chart('topstates', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: '#fff'
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
          }
        }
      });
    });
    // Chart 2: day of week 
    this.amazonService.getDayofweek().subscribe(data => {
      const labels = Object.keys(data);
      const values = Object.values(data);

      new Chart('dayofweek', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            data: values,
            backgroundColor: '#fff'
          }]
        },
        options: {
          plugins: { legend: { display: false } },
          scales: {
            x: { ticks: { color: '#fff' } },
            y: { ticks: { color: '#fff' } }
          }
        }
      });
    });

  
  }

  nbrcmd! : number;
  ca! : number;
  panmyn! : number;
  nbrproduit! : number;
  dateD! : string;
  dateF! : string;
  ngOnInit(): void {
    this.amazonService.getCmdTotal().subscribe(data => {
      this.nbrcmd = data;
    });

    this.internationnalService.getCA().subscribe(data => {
      this.ca = data;
    });

    this.internationnalService.getPaniermoyn().subscribe(data => {
      this.panmyn = data;
    });

    this.salereportService.getNbrproduit().subscribe(data => {
      this.nbrproduit = data;
    });

    this.internationnalService.getPeriode().subscribe(data => {
      this.dateD = data[0];
      this.dateF = data[1];
    });
    console.log(this.dateD,this.dateF);
  }

}
