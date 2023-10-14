import * as confetti from 'canvas-confetti';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit{
  data!: any[];
  revealed1: boolean = false;
  revealed2: boolean = false;
  revealed3: boolean = false;
  currentRevealed: number = 3;

  constructor() { }

  ngOnInit(): void {

  }

  rainConfetti(): void {
    const duration = 50000;

    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    const context = canvas.getContext('2d');

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';

    const removeCanvas = () => { document.body.removeChild(canvas); };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    const myConfetti = confetti.create(canvas, { resize: true, });

    myConfetti({
      particleCount: 700,
      spread: 150,
      origin: { y: 0 },
    });


    setTimeout(() => {
      window.removeEventListener('resize', handleResize);
      removeCanvas();
    }, duration);
  }

  reveal(): void {
    const cards = document.querySelectorAll('.card');

    if (this.currentRevealed === 3) {
      //cards[2].classList.remove('tremor3');
      this.revealed3 = true;
      this.currentRevealed = 2;
    } else if (this.currentRevealed === 2) {
      //cards[1].classList.remove('tremor2');
      this.revealed2 = true;
      this.currentRevealed = 1;
    } else {
      //cards[0].classList.remove('tremor1');
      this.revealed1 = true;
      this.rainConfetti();
    }
  }
}
