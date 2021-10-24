// meme route
const router = require('express').Router()
const axios = require('axios');
const cheerio = require('cheerio');

const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap client
const r = new Snoowrap({
  userAgent: 'reddit-bot-example-node',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  username: process.env.REDDIT_USER,
  password: process.env.REDDIT_PASS
});

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

router.route('/prof').post((req, res) => {
  let prof = req.body.prof;
  axios.get('https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=University+of+Washington&schoolID=1530&query=' + prof.replace(' ', '+'))
    .then(response => {
      let quality = []; let ratings = []; let takeAgain = []; let difficulty = []; let link = [];
      const $ = cheerio.load(response.data);
      $('div[class*=CardNumRating__CardNumRatingNumber]').each((i, elem) => {
        quality.push($(elem).text());
      });
      $('div[class*=CardNumRating__CardNumRatingCount]').each((i, elem) => {
        ratings.push($(elem).text());
      });
      $('div[class*=CardFeedback__CardFeedbackNumber]').each((i, elem) => {
        if (i % 2) {
          takeAgain.push($(elem).text());
        } else {
          difficulty.push($(elem).text());
        }
      });
      $('a[class*=TeacherCard__StyledTeacherCard]').each((i, elem) => {
        link.push('https://www.ratemyprofessors.com/' + $(elem).attr('href'));
      });
      
      res.status(200).json({
        quality: quality[0],
        rating: ratings[0],
        takeAgain: takeAgain[0],
        difficulty: difficulty[0],
        link: link[0]
      });
    }).catch((error) => {
      console.log(error);
      res.status(404).send('404 - Something went wrong!');
    });
});

router.route('/reddit').post((req, res) => {
  let course = req.body.course;
  r.search({
    query: course,
    subreddit: 'udub',
    sort: 'relevance',
    limit: 10
  }).then((data) => {
    console.log(data);
    res.status(200).json(data);
  }).catch((error) => {
    console.log(error);
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