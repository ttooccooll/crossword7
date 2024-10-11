(function($) {
	$(function() {
		// provide crossword entries in an array of objects like the following example
		// Position refers to the numerical order of an entry. Each position can have 
		// two entries: an across entry and a down entry
		var puzzleData = [
			 	{
					clue: "This monster isn't a fan of Italian cooking.",
					answer: "vampire",
					position: 3,
					orientation: "across",
					startx: 6,
					starty: 1
				},
			 	{
					clue: "When the moon is full, make sure that you get some of this, made in silver.",
					answer: "ammo",
					position: 6,
					orientation: "across",
					startx: 1,
					starty: 2
				},
				{
					clue: "Witches love this part of the Mandrake plant.",
					answer: "root",
					position: 7,
					orientation: "across",
					startx: 9,
					starty: 3
				},
				{
					clue: "There's a great Outkast song about this guy's nuptials. There's a short and simple synth solo that is just brilliant.",
					answer: "dracula",
					position: 8,
					orientation: "across",
					startx: 3,
					starty: 4
				},
				{
					clue: "Elves and fairies use this plant for transportation.",
					answer: "moss",
					position: 9,
					orientation: "across",
					startx: 9,
					starty: 5
				},
				{
					clue: "The werewolves are howling, the banshees are screeching, the zombies are moaning, and the generic monsters are doing this.",
					answer: "roaring",
					position: 11,
					orientation: "across",
					startx: 1,
					starty: 6
				},
				{
					clue: "Ray did not have great bedside manner when Venkman got covered in this.",
					answer: "ectoplasm",
					position: 12,
					orientation: "across",
					startx: 2,
					starty: 8
				},
				{
					clue: "This is what the zombie did to your brain.",
					answer: "ate",
					position: 15,
					orientation: "across",
					startx: 10,
					starty: 9
				},
				{
					clue: "These have replaced turnips in Halloween tradition.",
					answer: "pumpkins",
					position: 16,
					orientation: "across",
					startx: 1,
					starty: 10
				},
				{
					clue: "Don't let Gene Wilder catch you mispronouncing this one.",
					answer: "frankenstein",
					position: 18,
					orientation: "across",
					startx: 1,
					starty: 12
				},
				{
					clue: "Jack O' _______",
					answer: "lantern",
					position: 1,
					orientation: "down",
					startx: 1,
					starty: 1
				},
				{
					clue: "This is the most popular movie genre on October 31st.",
					answer: "horror",
					position: 2,
					orientation: "down",
					startx: 4,
					starty: 1
				},
				{
					clue: "This man's voice is more associated with Halloween than probably any of voice with any other holiday.",
					answer: "vincentprice",
					position: 3,
					orientation: "down",
					startx: 6,
					starty: 1
				},
				{
					clue: "The mummies come from these.",
					answer: "pyramids",
					position: 4,
					orientation: "down",
					startx: 9,
					starty: 1
				},
				{
					clue: "Danny Torrance arguably would have had a scary enough experience without ghosts, just because he was stuck in a building with so many of these.",
					answer: "rooms",
					position: 5,
					orientation: "down",
					startx: 11,
					starty: 1
				},
				{
					clue: "This monster is associated with a particular human body system.",
					answer: "skeleton",
					position: 10,
					orientation: "down",
					startx: 12,
					starty: 5
				},
				{
					clue: "You don't want to hear a ___ on your upstairs window at night.",
					answer: "tap",
					position: 13,
					orientation: "down",
					startx: 4,
					starty: 8
				},
				{
					clue: "If I only had King novels to go off of, this would be the spookiest place on earth.",
					answer: "maine",
					position: 14,
					orientation: "down",
					startx: 10,
					starty: 8
				},
				{
					clue: "If you see the Kraken, send out this.",
					answer: "sos",
					position: 17,
					orientation: "down",
					startx: 8,
					starty: 10
				}
			] 
	
		$('#puzzle-wrapper').crossword(puzzleData);
		
	})
	
})(jQuery)

let toggleState = 0;
let usdPrice = null;
let blockHeight = null;
let satFee = null;

async function fetchPrice() {
	try {
		const response = await fetch('https://mempool.space/api/v1/prices');
		const data = await response.json();
		usdPrice = data.USD.toFixed();
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchBlock() {
	try {
		const response = await fetch('https://blockchain.info/q/getblockcount');
		const data = await response.text();
		blockHeight = parseInt(data).toFixed(0);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function fetchFee() {
	try {
		const response = await fetch('https://mempool.space/api/v1/fees/recommended');
		const data = await response.json();
		satFee = data.halfHourFee.toFixed();
		console.log(satFee);
	} catch (error) {
		console.error('Error fetching the price:', error);
	}
}

async function togglePrice() {
	if (!usdPrice) {
		await fetchPrice();
	}
	if (!blockHeight) {
		await fetchBlock();
	}
	if (!satFee) {
		await fetchFee();
	}

	const button = document.querySelector('.onesat');
	switch (toggleState) {
		case 0:
			button.textContent = `${blockHeight}`;
			break;
		case 1:
			button.textContent = `${satFee} sat/vB`;
			break;
		case 2:
			button.textContent = `$${usdPrice}`;
			break;
		case 3:
			button.textContent = '1sat=1sat';
			break;
	}
	toggleState = (toggleState + 1) % 4;
}