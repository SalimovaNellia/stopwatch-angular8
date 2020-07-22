import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {

  counter: number = 0;
  timerRef;
  running: boolean = false;
  startText = 'Start';

  startTimer() {
    this.running = !this.running;
    if (this.running) {
      this.startText = 'Stop';
      this.timerRef = setInterval(() => {
        this.counter += 1;
      }, 1000);
    } else {
      this.startText = 'Start';
      clearInterval(this.timerRef);
      this.clearTimer();
    }
  }

  pauseTimer() {
    clearInterval(this.timerRef);
    this.running = !this.running;
    this.startText = 'Start';
  }

  clearTimer() {
    this.running = false;
    this.startText = 'Start';
    this.counter = 0;
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }

}
