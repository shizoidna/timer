import { fromEvent, iif, merge, NEVER, Observable, timer } from 'rxjs';
import { map, mapTo, pluck, switchMap } from 'rxjs/operators';

// =================== CONSTANCE =====================

const dueTime: number = 1000;
const periodOfScheduler: number = 1000;
const state: any = {counter: 0};

const startBtn: HTMLElement | null = document.getElementById('btn-start');
const pauseBtn: HTMLElement | null = document.getElementById('btn-pause');
const resetBtn: HTMLElement | null = document.getElementById('btn-reset');

// =================== STATE ============================
// =================== HELPERS ==========================
// =================== SUBSCRIPTION =====================

// =================== SOURCES ==========================
if (startBtn === null) {
  throw new Error('Chosen element does not exist');
}

if (pauseBtn === null) {
  throw new Error('Chosen element does not exist');
}

if (resetBtn === null) {
  throw new Error('Chosen element does not exist');
}

function renderTimer(item: number): void {
  const blockHeader: HTMLElement | null = document.getElementById('header');
  const text: string = `${item}`;

  if (blockHeader !== null) {
    blockHeader.textContent = text;
  }
}

const startEvent$: Observable<boolean> = fromEvent(startBtn, 'click')
  .pipe(
    mapTo(true))
;

const stopEvent$: Observable<boolean> = fromEvent(pauseBtn, 'click')
  .pipe(
    mapTo(false))
;

merge(startEvent$, stopEvent$)
  .pipe(
    switchMap((stopwatch: boolean) => iif(() => stopwatch, timer(dueTime, periodOfScheduler), NEVER),
  ))
  .subscribe(renderTimer);
