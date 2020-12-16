const events =  {
	"1": {
        "title": "Alum Rock Park: Trail Crew",
        "id": "1",
		"organizer": "San Jose Parks: Volunteer Management Team",
		"location": "Alum Rock Park, San Jose, CA",
		"date": "Sat, December 12, 2020",
		"time": "9:00 AM - 12:00 AM PST",
		"url": "https://i.ytimg.com/vi/QGqJQCvJQ0Q/mqdefault.jpg",
		"destiIntro": "Alum Rock Park is California's oldest municipal park, established in 1872 but serving as public land since the pueblo was established in 1777. The ridge trails offer views of Santa Clara Valley and of the valley in which the park is located.",
		"eventIntro": "Like to hike? Then volunteer to improve the trails! Foot traffic wears down the tread, bushes and wildflowers grow over the trail and rain/fire/wind have their own effects. Therefore, help is needed to maintain a safe trail. Come work on the Trail Crew! Please plan on arriving at the Penitencia Creek entrance by 8:45 AM. Then follow the ‘Volunteer Event’ signs to the parking lot. The park is very large and has very limited cell phone reception. All tools and supplies are provided. Bring your own filled water bottle, or 2! A hat and sunscreen are recommended. After your inspiring volunteer experience, you will end up feeling refreshed, rejuvenated and ready to hike even more!",
		"equipment": "Please bring a filled water bottle and your own snack.",
		"notes": "No experience necessary. Come meet others that enjoy hiking and the great outdoors! Training and tools are provided, but you are welcome to bring your favorite tool. ",
        "participants": {"Mary": "Mary", "John": "John", "Amit": "Amit", "Harris": "Harris"}
    },
	"2": {
        "title": "Olympic National Park Small Group Tour",
        "id": "2",
		"organizer": "Joseph Corrar",
		"location": "101 4th Avenue South, Seattle, WA 98104",
		"date": "Sat, December 26, 2020",
		"time": "7:30 AM – 7:30 PM PST",
		"url": "https://image.kkday.com/v2/image/get/w_1900%2Cc_fit/s1.kkday.com/product_23367/20190422064923_2eQYL/jpg",
		"destiIntro": "Though this 1,100 sq. mile National Park would take a lifetime to explore, we dive deep into some of the park’s highlights on this day trip. Olympic National Park is a UNESCO World-Heritage Site remarkable for its ecological diversity and expansive wilderness.",
		"eventIntro": "This naturalist-guided tour takes you across Puget Sound by ferry to the northeast part of the Olympic Peninsula, where you’ll explore the moss-draped forests, azure lakes, and striking mountains that define the region. Visit Hurricane Ridge to watch deer graze in the meadows, listen to the distinct shrill of a marmot, smell the intoxicating perfume of a summer wildflower field, or feel the snow crunch beneath your feet on a winter snowshoe. Continue west to the glacially-carved Lake Crescent, where you’ll delve into the fern-filled forests that line its shores, venturing to Marymere Falls. Throughout the day your guide will chronicle how Olympic’s isolation and protection have produced such distinct ecosystems. On days when the weather closes access to Hurricane Ridge, we may visit the tidepools on the North Coast or spend more rambling through forests and gravel flats of key salmon habitat in the Elwha Valley.",
		"equipment": "",
		"notes": "This is a nature and sightseeing tour NOT a hiking tour and given the time it takes to reach Olympic National Park there will be considerable time in the van/on the ferry. If you’re looking to get your boots dirty we suggest a private, overnight or multi-day trip to fully experience the peninsula’s forests, mountains, and beaches!",
        "participants": {"Amit": "Amit", "John": "John", "Lily": "Lily", "Li": "Li", "David": "David", "Bao": "Bao"}
    }
}

let index = 3;

const create = function( event ) {
	event.id = index.toString();
	index++;
    events[event.id] = event;
    return index - 1;
}

const eventData = {
    events,
    create
};
module.exports = eventData;