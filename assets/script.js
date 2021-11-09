function toggleMenu(){
	document.querySelector("nav .items").classList.toggle("active");
}

const ENDPOINTS = {
	TODAY: "today",
	SEARCH: "search"
}

// This array of arrays is used to set up a 24 hour clock like pattern.
// each duplet in this array is an x,y coordinate pair.
// This looks like (more like a diamond but that's fine):
/*
	_ _ _ X _ _ _
	_ _ X _ X _ _
	_ X _ _ _ X _
	X _ _ _ _ _ X
	_ X _ _ _ X _
	_ _ X _ X _ _
	_ _ _ X _ _ _
*/
const hourPositions = [
	[4, 1],
	[5, 2],
	[6, 3],
	[7, 4],
	[6, 5],
	[5, 6],
	[4, 7],
	[3, 6],
	[2, 5],
	[1, 4],
	[2, 3],
	[3, 2],
]

function range(length){
	return Array.apply(0, Array(length)).map(function(_,b) { return b + 1; });
}
async function fetchApi(ip_or_location){
	let options = {}
	let query;
	if(ip_or_location == "IP"){
		query = (await (await fetch("https://httpbin.org/ip")).json()).origin;  // get user's ip address from this api
	} else {
		query = ip_or_location
	}
	options = {
		body: new URLSearchParams({query}),
		method: "POST"
	}
	const response = await fetch("/.netlify/functions/today", options);
	const data = await response.json();
	return data;
}