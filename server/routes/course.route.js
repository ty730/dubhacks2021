// meme route

const router = require('express').Router()
const axios = require('axios');

router.route('/list').get((req, res) => {
  axios.get('https://google.com').then(response => res.status(200).json(response.data));
})

// router.route('/rankings').get((req, res) => {
//   Meme.find()
//     .sort({ elo: 'descending' })
//     .then(memes => res.status(200).json(memes))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

// router.route('/:id').delete((req, res) => {
//   Meme.findByIdAndDelete(req.params.id)
//     .then(() => res.status(204))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

// router.route('/:id').put((req, res) => {
  
  
// })

// router.route('/').get((req, res) => {
//   const query = Meme.aggregate([{$sample: { size: 2}}])
//     .then((memes) => res.json(memes))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

module.exports = router