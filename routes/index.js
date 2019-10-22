const express = require('express');
const router = express.Router();

const sql = require('../utils/sql');

router.get('/', (req, res) => { // req stands for request, you are making a request on the site; res stands for response, when the server finds your stuff, it responds ot you

    // should really get the user data here and then fetch it thru, but let's try this asynchronously
    console.log('at the main route');

    let query = "SELECT ID, avatar, Name, Logo, JobTitle FROM tbl_card"; // have data that lives in a database, now give it to me on a page by going to retreive the data!!!

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        // console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        res.render('home', { people: result });
    })
})

// this route is showing info to a specific person

// this resolves to localhost:3000/anything (whatever you put after the slash in the location bar) --> add /anything to the browser and you should see that in the terminal in vsc
router.get('/:id', (req, res) => {
    console.log('hit a dynamic route!');
    console.log(req.params.id);

    let query = `SELECT * FROM tbl_bio WHERE profID="${req.params.id}"`;

    sql.query(query, (err, result) => {
        if (err) { throw err; console.log(err); }

        console.log(result); // should see objects wrapped in an array

        // render the home view with dynamic data
        // res.render('home', { people: result });
    })
})

module.exports = router;