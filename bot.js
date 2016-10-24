
console.log('H~~llo~~~');


const Twit = require('twit');
const config = require('./config.js');
const T = new Twit(config);
const utf8 = require('utf8')
// T.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
// console.log(data)
// })

const params = { q: 'wikileaks', count: 2 };

function gotData(err, data, response) {
	const tweets = data.statuses
	for (var i = 0; i < tweets.length; i++) {
		console.log(utf8.encode(tweets[i].text))
	}
	//console.log(data)
};
T.get('search/tweets', params, gotData)

// var number = Math.random()
// auto_tweet = 'hello human! ' + number

// function tweetit() {
// 	var verbs =
// 		[
// 			["go to", "goes to", "going to", "went to", "gone to"],
// 			["look at", "looks at", "looking at", "looked at", "looked at"],
// 			["choose", "chooses", "choosing", "chose", "chosen"]
// 		];
// 	var tenses =
// 		[
// 			{ name: "Present", singular: 1, plural: 0, format: "%subject %verb %complement" },
// 			{ name: "Past", singular: 3, plural: 3, format: "%subject %verb %complement" },
// 			{ name: "Present Continues", singular: 2, plural: 2, format: "%subject %be %verb %complement" }
// 		];
// 	var subjects =
// 		[
// 			{ name: "I", be: "am", singular: 0 },
// 			{ name: "You", be: "are", singular: 0 },
// 			{ name: "He", be: "is", singular: 1 }
// 		];
// 	var complementsForVerbs =
// 		[
// 			["cinema", "Egypt", "home", "concert"],
// 			["for a map", "them", "the stars", "the lake"],
// 			["a book for reading", "a dvd for tonight"]
// 		]
// 	Array.prototype.random = function () { return this[Math.floor(Math.random() * this.length)]; };

// 	function generate() {
// 		var index = Math.floor(verbs.length * Math.random());
// 		var tense = tenses.random();
// 		var subject = subjects.random();
// 		var verb = verbs[index];
// 		var complement = complementsForVerbs[index];
// 		var str = tense.format;
// 		str = str.replace("%subject", subject.name).replace("%be", subject.be);
// 		str = str.replace("%verb", verb[subject.singular ? tense.singular : tense.plural]);
// 		str = str.replace("%complement", complement.random());
// 		return str;
// 	}


// 	var new_tweet = { status: generate() }
// 	function tweetOne(err, data, response) {
// 		if (err) {
// 			console.log('some went wrong')
// 		}
// 		else {
// 			console.log('it worked')
// 		}
// 		//console.log(data)
// 	}
// 	T.post('statuses/update', new_tweet, tweetOne)
// }
// tweetit()
// setInterval(tweetit, 1000 * 10)

var stream = T.stream('user');
stream.on('follow', followed);

// function followed(eventMsg) {
// 	var name = eventMsg.source.name;
// 	var screenName = eventMsg.source.screen_name
// 	reply('@' + screenName + ' Thanks for following me')

// }
function followed(eventMsg){
	var screenName = eventMsg.source.screen_name
	var txt = `${screenName}, thanks for following me!`
	send_message(screenName,txt)
}

function send_message(screenName,txt) {
	var dm = {
		"screen_name": screenName,
		"text": txt
	};
	function sendDM(err, data, response) {
		if (err) {
			console.log(err)
		}
		else {
			console.log('it worked')
		}
	};
	T.post('direct_messages/new', dm, sendDM)
}