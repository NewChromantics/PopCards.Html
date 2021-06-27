
export default class CardElement extends HTMLElement 
{
	constructor()
	{
		super();
	}
	
	static ElementName()
	{
		return 'card-element';
	}
	
	static get observedAttributes() 
	{
		return ['card','css'];
	}
	get card()			{	return this.getAttribute('card');	}
	set card(newValue)	{	this.setAttribute('card', newValue);	}
	get css()			{	return this.getAttribute('css');	}
	set css(Css)		{	Css ? this.setAttribute('css', Css) : this.removeAttribute('css');	}
	

	SetupDom(Parent)
	{
		this.Element = document.createElement('div');
		this.Element.className = 'Card';
		
		this.Style = document.createElement('style');
		
		// attach the created elements to the shadow dom
		Parent.appendChild(this.Style);
		Parent.appendChild(this.Element);
	}
	
	attributeChangedCallback(name, oldValue, newValue) 
	{
		if ( this.Element )
		{
			this.Element.innerText = this.card;
			this.Element.setAttribute('card',this.card);
		}
		
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
window.customElements.define( CardElement.ElementName(), CardElement );
