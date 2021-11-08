const http = require("http")

exports.request = function(url, options) {
	// return a new promise
	return new Promise(function(resolve, reject) {
		http.request(url, options, function(res) {
			res.setEncoding("utf8")
			let body = ""
			res.on("data", function(chunk) {
				body += chunk
			})
			res.on("end", function() {
				resolve(JSON.parse(body))
			})
		}).on("error", function(err) {
			reject(err)
		}).end()
	})
};

exports.handler = () => {
	// redirect to home page
	return {
		statusCode: 302,
		headers: {
			Location: "/index.html"
		}
	}
}