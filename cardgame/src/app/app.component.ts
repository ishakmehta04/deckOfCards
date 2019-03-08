import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
	
	constructor(){}
  title : string = 'cardgame';
  availableCards = [{
      name: 'Clubs',
      color: 'black',
      glyph: '&#x2663;'
    }, {
      name: 'Diamonds',
      color: 'red',
      glyph: '&#x2666;'
    },{
      name: 'Hearts',
      color: 'red',
      glyph: '&#x2665;'
    },
    {
      name: 'Spades',
      color: 'black',
      glyph: '&#x2660;'
    }];
  listOfCards = [];
	selectedCard = [];
	
	
	formatData(cardType, letter:string, name:string) {
    return {
      cardType,
      letter,
      name: name || letter,
      displayName: (name || letter) + ' of ' + cardType.name
    };
    }
	
	shuffle() {
    for(let i = this.listOfCards.length - 1; i > 0; i--) {
      let randomIndex = Math.floor(Math.random() * i);
      [this.listOfCards[i], this.listOfCards[randomIndex]] = [this.listOfCards[randomIndex], this.listOfCards[i]];
    }
  }
	  
  dealOne() {
    // get a card from the deck
    let nextCard = this.listOfCards.shift();
    if (nextCard) {
      this.selectedCard.push(nextCard);
      this.selectedCard = this.selectedCard.slice();
    }
  }
	  
  reset() {
    this.listOfCards = [];
    this.selectedCard = [];
    let self = this;
    this.availableCards.forEach(function(value) {
        self.listOfCards.push(self.formatData(value, 'A', 'Ace'));
        for (let i = 2; i <= 10; i++) {
          self.listOfCards.push(self.formatData(value, i+'',''));
        }
        self.listOfCards.push(self.formatData(value, 'J', 'Jack'));
        self.listOfCards.push(self.formatData(value, 'Q', 'Queen'));
        self.listOfCards.push(self.formatData(value, 'K', 'King'));
      });
    }
  
  ngOnInit() {
      this.reset();
  }
}
