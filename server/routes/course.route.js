// meme route

const router = require('express').Router()
const axios = require('axios');
const cheerio = require('cheerio');

router.route('/list').get((req, res) => {
  axios.get('https://www.washington.edu/students/timeschd/WIN2022/cse.html')
    .then(response => {
      let data = [];
      const $ = cheerio.load(response.data);
      let titles = $('table[bgcolor=#99ccff]').each((i, elem) => {
        let course = {};
        $(elem).find('a').each((i, a) => {
          if (i == 0) {
            course.num = $(a).text();
          } else {
            course.name = $(a).text();
          }
        });
        data.push(course);
      });
      res.status(200).json(data);
    }).catch((error) => {
      res.status(404).send('404 - Something went wrong!');
    });
});

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