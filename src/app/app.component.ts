import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'prediction';
  model: any;
  age = 52;
  sex = 1;
  cp = 0;
  trestbps = 125;
  chol = 212;
  fbs = 0;
  restecg = 1;
  thalach = 168;
  exang = 0;
  oldpeak = 1;
  slope = 2;
  ca = 2;
  thal = 3;

  prediction = '';

  constructor() {}

  async ngOnInit() {
    this.model = await tf.loadLayersModel(
      './assets/tensorflow_serve/tfjs_model/model.json'
    );
  }

  onSubmit() {
    let data = [
      [
        this.age,
        this.sex,
        this.cp,
        this.trestbps,
        this.chol,
        this.fbs,
        this.restecg,
        this.thalach,
        this.exang,
        this.oldpeak,
        this.slope,
        this.ca,
        this.thal,
      ],
    ];
    let p = this.model.predict(tf.tensor2d(data, [1, 13])).dataSync();
    if (p[0] > 0.5) {
      this.prediction = 'Yes';
    } else if (p[0] <= 0.5 && p[0] > 0.2) {
      this.prediction = 'Danger';
    } else {
      this.prediction = 'No';
    }
  }
}
