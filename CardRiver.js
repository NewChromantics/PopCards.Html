import CardElement from './CardElement.js'


//	convert value to an array of strings from...
//		a,b,c,d,e
//		['a','b'] (actual array)
//		'["a","b"]' (json)
function CardsValueToArray(Value)
{
	if ( Value === null || Value === undefined )
		return [];

	if ( Array.isArray(Value) )
		return Value;
	
	if ( typeof Value != typeof '' )
		throw `Cards string ${Value} not a string, or array... handle this case if valid`;
	
	try
	{
		const Parsed = JSON.parse(Value);
		if ( !Array.isArray(Parsed) )
			throw `If JSON ${Parsed}, then should be an array`;
	}
	catch(e)
	{
		console.log(`${Value} is not json`);
	}
	
	//	last chance... assume CSV values
	const Cards = Value.split(',');
	return Cards;
}



/*
	river is a load of cards, side-to-side
*/
export default class CardRiver extends HTMLElement 
{
	constructor()
	{
		super();
	}
	
	static ElementName()
	{
		return 'card-river';
	}
	
	
	//	reflect our properties
	static get observedAttributes() 
	{
		return ['cards','css'];
	}
	get css()			{	return this.getAttribute('css');	}
	
	//	array of strings identifying cards
	get cards()		
	{
		let Cards = this.getAttribute('cards');
		Cards = CardsValueToArray(Cards);
		return Cards	
	}
	set cards(Cards)	
	{
		//	do some type checks
		if ( typeof Cards != typeof '' )
		{
			//	todo: check is array
			Cards = JSON.stringify(Cards);
		}
		this.setAttribute('cards', Cards);	
	}
	
	
	get CardContainer()	{	return this.Shadow;	}

	SetupDom(Parent)
	{
		//this.Style = document.createElement('style');
		//this.CardContainer = document.createElement('div');
		//this.CardContainer.className = 'CardContainer';
		
		//Parent.appendChild(this.Style);
		//Parent.appendChild(this.CardContainer);
	}
	
	//	gr: to allow flex to control all the cards, we need them dictated by :root and not a container div
	//		to make this happen, we need to manage the card children ourselves
	get CardContainer()
	{
		return this.Shadow;
	}
	
	get CardChildren()
	{
		let Children = Array.from( this.Shadow.children );
		Children = Children.filter( e => e.nodeType == CardElement.ElementName() );
		return Children;
	}

	UpdateCardElements()
	{
		//	no DOM yet
		if ( !this.CardContainer )
			return;
			
		const Cards = this.cards;
		const CardChildren = this.CardChildren;
		const CardElementType = CardElement.ElementName();
		
		//	do a minimal amount of changes
		for ( let c=0;	c<Cards.length;	c++ )
		{
			const Card = Cards[c];
			let Element = CardChildren[c];
			
			//	create new element
			if ( !Element )
			{
				Element = document.createElement(CardElementType);
				this.CardContainer.appendChild(Element);
			}
			//	else, if it exists, try and steal/swap from latter child
			
			Element.card = Card;
			Element.css = this.css;
		}
		
		//	remove excess cards
		while ( this.CardChildren.length > Cards.length )
		{
			const LastIndex = this.CardChildren.length-1;
			this.CardContainer.removeChild( this.CardChildren[LastIndex] );
		}
	}
	
	attributeChangedCallback(name, oldValue, newValue) 
	{
		this.UpdateCardElements();
		
		if ( this.Style )
		{
			const Css = this.css; 
			this.Style.textContent = Css ? `@import "${Css}";` : '';
		}
	}
	
	connectedCallback()
	{
		//	Create a shadow root
		this.Shadow = this.attachShadow({mode: 'open'});
		this.SetupDom(this.Shadow);
		this.attributeChangedCallback();
	}
}

//	name requires dash!
window.customElements.define( CardRiver.ElementName(), CardRiver);
