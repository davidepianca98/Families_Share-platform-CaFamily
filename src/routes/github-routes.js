const express = require('express')
const router = new express.Router()
const exec = require('child_process').exec;

router.post('/pushevent', (req, res, next) => {
	exec('sh client/sync.sh', (err, stdout, stderr) => {
		console.log(stdout)
		console.log(stderr)
	});
	res.sendStatus(200)
})

module.exports = router
