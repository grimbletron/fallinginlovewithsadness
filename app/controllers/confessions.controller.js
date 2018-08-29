const Confession = require('../models/confession');

module.exports = {
  showConfessions: showConfessions,
  editConfessions: editConfessions,
  seedConfessions: seedConfessions,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit,
  deleteConfession: deleteConfession
}

/**
 * Show all confessions
 */
function showConfessions(req, res) {
  // get all confessions   
  Confession.find({}, (err, confessions) => {
    if (err) {
      res.status(404);
      res.send('Confessions not found!');
    }

    // return a view with data
    res.render('pages/confessions', { 
        confessions: confessions,
        success: req.flash('success')
     });
  });
}

/**
 * Show all confessions
 */
function editConfessions(req, res) {
  // get all confessions   
  Confession.find({}, (err, confessions) => {
    if (err) {
      res.status(404);
      res.send('Confessions not found!');
    }

    // return a view with data
    res.render('pages/editConfessions', { 
        layout: 'layout edit',
        confessions: confessions,
        success: req.flash('success')
     });
  });
}


/**
 * Seed the database
 */
function seedConfessions(req, res) {
  // create some confessions
  const confessions = [
    { confession: "I've got this feeling that I don't want to feel, a river of sadness running through me"},
    { confession: "I'm sad" },
    { confession: "I hate living at my house. My brother went away for 2 weeks and it was peaceful at my house and I felt happy but once he came back everyone stoped giving a shit about me and my brother even told me I should leave and not come back and I don’t know what to do anymore I feel like I don’t belong here and I just want to leave and never come back but I know i will never leave" },
    { confession: "I always wanted to know that I have some kind of mental illness because I couldn’t bear the thought that this was just me being a piece of garbage" },
    { confession: "As someone who is 22 and was in a similar spot about a year ago, the best advice I can offer is reach out. Tell your friends you feel like you may have a problem and you’re wanting advice and support. You may be surprised to learn that you have friends who feel the same way, just don’t have the courage to say something first." },
    { confession: "I don’t really know how I always get here. But I do. No warning, no signs, I just wake up and wish I hadn’t. I guess I’ve been trying to leave my happiness in others so that when I can’t feel it I can find it in them. But No one ever seems to be around when I just need one person. One person to listen to me, because I’m suffocating God I’m suffocating under my own smile and I ..I’m tired. "},
    { confession: "People around me have started noticing i’m depressed, do I care? Fuck no" },  
  ];

  // use the Confession model to insert/save
  Confession.remove({}, () => {
    for (confession of confessions) {
      var newConfession = new Confession(confession);
      newConfession.save();
    }
  });

  // seeded!
  res.send('Database seeded!');
}


/**
 * Process the creation form
 */
function processCreate(req, res) {
    //validate info
    req.checkBody('confession', 'confession is required').notEmpty();

    //if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if(errors){
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/');
    }


    // create a new confession
    const confession = new Confession({
    confession: req.body.confession
    });

    // save confession
    confession.save((err) => {
    if (err)
        throw err;
    // set a succesful flag message
    req.flash('success', 'Successfully created confession');

    // redirect to the newly created confession
    res.redirect(`/`);
    });
}

/**
 * show the edit form
 */
function showEdit(req, res) {
    Confession.findOne({ slug: req.params.slug }, (err, confession) => {
      res.render('pages/edit', {
        confession: confession,
        errors: req.flash('errors')
      });
    });
  }

/**
 * process the edit form 
 */
function processEdit(req, res){
    req.checkBody('confession', 'confession is required').notEmpty();

    //if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if(errors){
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/confessions/${req.params.slug}/edit`);
    }
    //finding a current confession
    Confession.findOne({ slug: req.params.slug }, (err, confession)=>{
        confession.name = req.body.name;
        confession.confession = req.body.confession;
        confession.save((err)=>{
            if (err)
                throw err;

        req.flash('success', 'successfully updated confession');
        res.redirect('/confessions');
        });
    });
}

/**
 * delete an confession
 */
function deleteConfession(req,res) {
    Confession.remove({ _id: req.params.id }, (err)=>{
        req.flash('success', 'Confession deleted');
        res.redirect('/edit');
    });
}