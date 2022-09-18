//Get database
db = new Mongo().getDB("demo-db");

db.createCollection('publishers', { capped: false });
db.createCollection('newspapers', { capped: false });

db.publishers.insertMany([
	{ "_id" : 1, "name" : "Tina Moore", "joined_date" : ISODate("2015-07-06T11:22:37.000Z"), "__v" : 0 },
	{ "_id" : 2, "name" : "Adam Sabes", "joined_date" : ISODate("2015-07-06T11:22:37.000Z"), "__v" : 0 },
	{ "_id" : 3, "name" : "Steven Vago", "joined_date" : ISODate("2015-07-06T11:22:37.000Z"), "__v" : 0 },
    { "_id" : 7, "name" : "Rob Jr", "joined_date" : ISODate("2015-07-06T11:22:37.000Z"), "__v" : 0 }
]);

db.newspapers.insertMany([
	{
		"_id" : 1,
		"title" : "Tourist shot in back after refusing robber on NYC street, police say ",
		"image" : "public/image/tourist.png",
		"link" : "https://nypost.com/2022/09/18/tourist-shot-in-back-after-refusing-robber-in-nyc-cops/",
		"abstract" : "A tourist from Denmark was shot in the back after refusing to turn his property over to a gun-wielding robber on Manhattan’s Upper West side Sunday morning, cops said.",
		"publisher" : 1,
		"languages" : [ "en" ],
		"creation_date" : ISODate("2019-08-05T12:12:44.000Z"),
		"__v" : 0
	},
	{
		"_id" : 2,
		"title" : "Michigan City dispatch.",
		"image" : "public/image/michigan.png",
		"link" : "https://www.britannica.com/place/Michigan",
		"abstract" : "Michigan, constituent state of the United States of America. Although by the size of its land Michigan ranks only 22nd of the 50 states, the inclusion of the Great Lakes waters over which it has jurisdiction increases its area considerably, placing it 11th in terms of total area. The capital is Lansing, in south-central Michigan. The state's name is derived from michi-gama, an Ojibwa (Chippewa) word meaning 'large lake.'",
		"publisher" : 7,
		"languages" : [ "en", "es", "fr"],
		"creation_date" : ISODate("2019-08-05T12:12:44.000Z"),
		"__v" : 0
	},
	{
		"_id" : 3,
		"title" : "New Orleans becomes murder capital of America, overtaking St. Louis",
		"image" : "public/image/orleans.png",
		"link" : "https://nypost.com/2022/09/18/new-orleans-becomes-murder-capital-of-america-overtaking-st-louis/",
		"abstract" : "New Orleans has overtaken St. Louis as the murder capital of America as the city sees a 141% increase in homicides when compared to recent years.",
		"publisher" : 2,
		"languages" : [ "en" ],
		"creation_date" : ISODate("2019-08-05T12:12:44.000Z"),
		"__v" : 0
	},
	{
		"_id" : 4,
		"title" : "McDonald’s ax swinger had just been ‘rejected’ by woman, witness says",
		"image" : "public/image/mcdonalds.png",
		"link" : "https://nypost.com/2022/09/18/nyc-mcdonalds-ax-swinger-michael-palacios-had-just-been-rejected-by-woman-witness-says/",
		"abstract" : "A man who went on a scary ax-swinging rampage at a Manhattan McDonald’s on Friday morning had flipped out after a young woman “rejected” his advances, a witness said.",
		"publisher" : 3,
		"languages" : [ "en" ],
		"creation_date" : ISODate("2019-08-05T12:12:44.000Z"),
		"__v" : 0
	},
	{
		"_id" : 5,
		"title" : "E Street Band member, ‘Sopranos’ actor Steven Van Zandt to be honored for $1.5M in NYPD fundraising",
		"image" : "public/image/sopranos.png",
		"link" : "https://nypost.com/2022/09/13/steven-van-zandt-to-be-honored-for-nypd-fundraising/",
		"abstract" : "Steven Van Zandt, a musician and former cast member from “The Sopranos,” is being honored this week for putting the bada-bing in police fundraising.",
		"publisher" : 1,
		"languages" : [ "en" ],
		"creation_date" : ISODate("2019-08-05T12:12:44.000Z"),
		"__v" : 0
	}
]);
