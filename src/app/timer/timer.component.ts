import {Component, OnDestroy, OnInit} from '@angular/core';
import Timer = NodeJS.Timer;
import {Observable, interval, timer, Subscription} from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {

  public running: boolean = false;
  timer$: Observable<number>;
  timerSubscription: Subscription;
  counter: number = 0;

  hours: number;
  minutes: number;
  seconds: number;

  ngOnInit(): void {
    this.millisecondsToTime(this.counter);
    this.timer$ = timer(1000,1000);
  }

  ngOnDestroy(): void {
  }

  startTimer(): void {
    this.running = true;
    this.timerSubscription = this.timer$.subscribe(val => {
      this.counter += 1;
      this.millisecondsToTime(this.counter);
    });
  }

  pauseTimer(): void {
    this.running = false;
    if(this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
    this.millisecondsToTime(this.counter);
  }

  stopTimer(): void {
    this.running = false;
    this.timerSubscription.unsubscribe();
    this.counter = 0;
    this.millisecondsToTime(this.counter);
  }

  resetTimer(): void {
    if(this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.counter = 0;
      this.millisecondsToTime(this.counter);
      this.startTimer();
    }
  }

  millisecondsToTime(milliseconds: number): void {
    this.hours = Math.floor(milliseconds / 3600);
    this.minutes = Math.floor((milliseconds - (this.hours * 3600)) / 60);
    this.seconds = milliseconds - (this.hours * 3600) - (this.minutes * 60);
  }
}
