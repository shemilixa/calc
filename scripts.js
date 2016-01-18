'use strict';
class Calc {
	constructor(options){
		this.calc = options.element;
		this.tablo = this.calc.querySelector('.tablo').getElementsByTagName('span')[0];		
		this.table = this.calc.querySelector('table');

		this.table.onclick = this._eventsCalc.bind(this);
		document.onkeydown = this._eventsKey.bind(this);
		this.calc.onmousedown = this._dragNdrop.bind(this);


		this.container = '';
		this.intermediateValue = '';
		this.numberA = '';
		this.signA = '';
		this.numberB = '';
		this.signB = '';
		this.sign = '';	

	}	

	_eventsCalc(event){
		let eventTarget = event.target;
		if (eventTarget.tagName == 'TD') {
			switch(eventTarget.innerHTML){
				case 'C':
						this._clear();
					break;
				case 'CE':
						this._clearNumber();
					break;
				case '\u27F5':
						this._deleteLastCharacter();
					break;
				case '\u00B1':
						this._minusPlusNumber();
					break;
				case '*':
				case '/':
				case '-':
				case '+':
						this._writeSign(eventTarget.innerHTML);
					break;
				case '1/x':
						this._drob(eventTarget.innerHTML);
					break; 
				case '=':
						this._calculation();			
					break; 
				case '\u221A':
						this._sqrt();
					break;
				case '%':
						this._percent();
					break;
				default :
						this._writeNumbers(eventTarget.innerHTML);
					break; 
			}
		}
	}

	_eventsKey(event){
		let eventKey = event.keyCode;
		//console.log(eventKey);
		switch(eventKey) {
			case 106 :
				this._writeSign('*');
				break;
			case 111 :
				this._writeSign('/');
				break;
			case 109 :
				this._writeSign('-');
				break;
			case 107 :
				this._writeSign('+');
				break;
			case 13 :
				this._calculation();			
				break; 
			case 48 :
			case 96 :			
				this._writeNumbers(0);				
				break;
			case 49 :
			case 97 :
				this._writeNumbers(1);				
				break;
			case 50 :
			case 98 :
				this._writeNumbers(2);				
				break;
			case 51 :
			case 99 :
				this._writeNumbers(3);				
				break;
			case 52 :
			case 100 :
				this._writeNumbers(4);				
				break;
			case 53 :
			case 101 :
				this._writeNumbers(5);				
				break;
			case 54 :
			case 102 :
				this._writeNumbers(6);				
				break;
			case 55 :
			case 103 :
				this._writeNumbers(7);				
				break;
			case 56 :
			case 104 :
				this._writeNumbers(8);				
				break;
			case 57 :
			case 105 :
				this._writeNumbers(9);				
				break;
		}
	}

	_clear(){
		this.tablo.innerHTML = 0;
		this.numberA = '';
		this.signA = '';
		this.numberB = '';
		this.signB = '';
		this.sign = '';
	}

	_clearNumber(){
		if(this.sign){
			this.numberB = '';
			this.signB = '';
			this.tablo.innerHTML = 0;
		} else {
			this.numberA = '';
			this.signA = '';
			this.tablo.innerHTML = 0;
		}
	}

	_deleteLastCharacter(){
		if(this.sign){
			this.numberB = this.numberB.substring(0, this.numberB.length - 1);
			this.tablo.innerHTML = (this.numberB.length)? this.numberB : 0;
		} else {
			this.numberA = this.numberA.substring(0, this.numberA.length - 1);
			this.tablo.innerHTML = (this.numberA.length)? this.numberA : 0;
		}
	}

	_minusPlusNumber(){
		if(this.sign){
			this.signB = (!this.signB)?'-':'';

			this.tablo.innerHTML = this.signB+this.numberB;
		} else {
			this.signA = (!this.signA)?'-':'';

			this.tablo.innerHTML = this.signA+this.numberA;
		}
	}

	_writeNumbers(eventTarget){
		if(this.sign){
			this.numberB += eventTarget;
			this.tablo.innerHTML = this.signB+this.numberB;
		} else {
			this.numberA += eventTarget;
			this.tablo.innerHTML = this.signA+this.numberA;
		}
	}

	_writeSign(eventTarget){
		if (this.numberA) {
			if(this.sign && this.numberB){
				this._calculation();
			}
			this.sign = eventTarget;
		}
	}

	_drob(eventTarget){
		if(this.sign){
			this.numberB = 1/this.numberB;
			this.tablo.innerHTML = this.numberB;
		} else {
			this.numberA = 1/this.numberA;
			this.tablo.innerHTML = this.numberA;
		}
	}

	_sqrt(){
		if (this.numberA) {
			if(this.sign && this.numberB){
				this._calculation();
			}
			this.tablo.innerHTML = this.numberA = Math.sqrt(this.numberA);
		}
	}

	_percent(){
		this.tablo.innerHTML = this.numberB = (this.numberA*this.numberB)/100;
	}

	_calculation(){
			this.tablo.innerHTML = this.numberA = eval(this.signA+this.numberA+this.sign+this.signB+this.numberB);
			this.numberA = 1*this.numberA;
			this.signA = (this.numberA<0)?'-':'';		
			this.numberB = '';
			this.signB = '';
			this.sign = '';
	}

	_dragNdrop(event){
		if(event.target.tagName == 'DIV'){
			let coords = this._getCoords(this.calc);
  			let shiftX = event.pageX - coords.left;
  			let shiftY = event.pageY - coords.top;
			this._moveAt(event, shiftX, shiftY);

			document.body.appendChild(this.calc);

			this.calc.style.zIndex = 1000; 
			document.onmousemove = event => this._moveAt(event, shiftX, shiftY);
			this.calc.onmouseup = () => {
			    document.onmousemove = null;
			    this.calc.onmouseup = null;
			}	
		}	
	}

	_moveAt(eventDrop, shiftX, shiftY) {
		
	    this.calc.style.left = eventDrop.pageX - shiftX + 'px';
	    this.calc.style.top = eventDrop.pageY - shiftY + 'px';
	}
	
	_getCoords(elem) { 
	  	var box = elem.getBoundingClientRect();
	  	return {
	    	top: box.top + pageYOffset,
	    	left: box.left + pageXOffset
	  };

	}

}
