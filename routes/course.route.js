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
      let classesToProfs = [];
      let count = -1;
      let all = $('table').each((i, elem) => {
        if ($(elem).attr('bgcolor')) {
          let course = {};
        $(elem).find('a').each((i, a) => {
          if (i == 0) {
            course.num = $(a).text();
          } else {
            course.name = $(a).text();
          }
        });
        classesToProfs.push({course: course, profs: []});
          count++;
        } else {
          $(elem).text().split(/(\s+)/).filter( e => e.trim().length > 0).forEach((str) => {
            if (str.includes(",") && count > 0) {
              let name = str.split(",");
              classesToProfs[count].profs.push(name[1] + " " + name[0]);
            } 
            
          });
        }
      });
      res.status(200).json(classesToProfs);
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
          difficulty.push($(elem).text());
        } else {
          takeAgain.push($(elem).text().replace('%', ''));
        }
      });
      $('a[class*=TeacherCard__StyledTeacherCard]').each((i, elem) => {
        link.push('https://www.ratemyprofessors.com' + $(elem).attr('href'));
      });
      
      res.status(200).json({
        quality: quality[0],
        rating: ratings[0],
        takeAgain: takeAgain[0],
        difficulty: difficulty[0],
        link: link[0]
      });
    }).catch((error) => {
      res.status(404).send('404 - Something went wrong!');
    });
});

router.route('/reddit').post((req, res) => {
  let course = req.body.course;
  let redditComments = [];
  r.search({
    query: course,
    subreddit: 'udub',
    sort: 'relevance',
    limit: 3
  }).then((data) => {
    let arr = [];
    r.getSubmission(data[0].id).expandReplies({limit: 3, depth:1}).then((replies) => {
      arr.push(replies);
      r.getSubmission(data[1].id).expandReplies({limit: 3, depth:1}).then((replies2) => {
        arr.push(replies2);
        r.getSubmission(data[2].id).expandReplies({limit: 3, depth:1}).then((replies3) => {
          arr.push(replies3);
          
          res.status(200).json(arr);
        });
      });
    });
    
  }).catch((error) => {
    res.status(404).send('404 - Something went wrong!');
  });
});

router.route('/prev_quarters').post((req, res) => {
  let course = req.body.course.replace(' ', '').toLowerCase();
  axios.get('http://courses.cs.washington.edu/courses/' + course + '/').then((response) => {
    let data = [];
    const $ = cheerio.load(response.data);
    let prevQ = $('li:contains("Previous") > ul > li').each((i, elem) => {
      let link = 'http://courses.cs.washington.edu/courses/' + course + '/' + $(elem).find('a').attr('href');
      let prof = $(elem).find('div').text();
      let term = $(elem).find('a').text().replace(' ' + prof, '');
      data.push({link: link, prof: prof, term: term});
    });
    res.status(200).json(data);
  }).catch((error) => {
    res.status(404).send('404 - Something went wrong!');
  });
    
});

router.route('/course_desc').post((req, res) => {
  let course = req.body.course.replace(' ', '').toLowerCase();
  axios.get('http://courses.cs.washington.edu/courses/' + course + '/').then((response) => {
    let data = [];
    const $ = cheerio.load(response.data);
    let p = $('p:contains("Catalog Description")').text();
    res.status(200).json(p);
  }).catch((error) => {
    res.status(404).send('404 - Something went wrong!');
  });
    
});

module.exports = router