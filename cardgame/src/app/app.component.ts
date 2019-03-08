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
      name: 'Spades',
      color: 'black',
      glyph: '&#x2660;'
    }, {
      name: 'Hearts',
      color: 'red',
      glyph: '&#x2665;'
    }, {
      name: 'Diamonds',
      color: 'red',
      glyph: '&#x2666;'
    }];
    listOfCards = [];
	selectedCard = [];
	
	
	randomCardPicker(min:number, max:number) {
          return Math.floor(Math.random() * (max - min + 1) + min);
    }
	
	formatData(cardType, letter:string, name:string) {
      return {
        cardType,
        letter,
        name: name || letter,
        displayName: (name || letter) + ' of ' + cardType.name
      };
    }
	
	divide(listOfCards) {
        if(listOfCards.length > 1) {
          let middle = Math.floor(listOfCards.length / 2);
          let variance = this.randomCardPicker(0, 12) - 6;
          middle += variance;
          middle = Math.max(middle, 1);
          return {
            top: listOfCards.slice(0, middle),
            bottom: listOfCards.slice(middle)
          };
        }

        return {
          top: (listOfCards.length === 1) ? [listOfCards[0]] : [],
          bottom: []
        };
    }
	
	shuffle() {
        // repeat 20 times for a new deck
        for (let i = 0; i < 20; i++) {
          // cut the cards in half
          let halves = this.divide(this.listOfCards);
          // we will stack both halves into this pile
          let deck = [];
          while (halves.top.length > 0 || halves.bottom.length > 0) {
            // a random number of cards to take from the top
            let take = this.randomCardPicker(1, 5);
            // take that many cards from the top and put in the pile
            deck = deck.concat(halves.top.splice(0, take));
            // a random number of cards to take from the bottom
            take = this.randomCardPicker(1, 5);
            // take that many cards from the bottom and put in the pile
            deck = deck.concat(halves.bottom.splice(0, take));
          }
          // put the bottom onto the top so cards are mixed up more
          let temp = this.divide(deck);
          this.listOfCards = temp.bottom.concat(temp.top);
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
