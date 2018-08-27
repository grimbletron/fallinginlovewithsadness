const Event = require('../models/event');

module.exports = {
  showEvents: showEvents,
  showSingle: showSingle,
  seedEvents: seedEvents,
  showCreate: showCreate,
  processCreate: processCreate,
  showEdit: showEdit,
  processEdit: processEdit,
  deleteEvent: deleteEvent
}

/**
 * Show all events
 */
function showEvents(req, res) {
  // get all events   
  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }

    // return a view with data
    res.render('pages/events', { 
        events: events,
        success: req.flash('success')
     });
  });
}

/**
 * Show a single event
 */
function showSingle(req, res) {
  // get a single event
  Event.findOne({ slug: req.params.slug }, (err, event) => {
    if (err) {
      res.status(404);
      res.send('Event not found!');
    }

    res.render('pages/single', { 
        event: event,
        success: req.flash('success') 
    });
  });
}

/**
 * Seed the database
 */
function seedEvents(req, res) {
  // create some events
  const events = [
    { name: 'Basketball', description: 'Throwing into a basket.' },
    { name: 'Swimming', description: 'Michael Phelps is the fast fish.' },
    { name: 'Weightlifting', description: 'Lifting heavy things up' },
    { name: 'Ping Pong', description: 'Super fast paddles' }
  ];

  // use the Event model to insert/save
  Event.remove({}, () => {
    for (event of events) {
      var newEvent = new Event(event);
      newEvent.save();
    }
  });

  // seeded!
  res.send('Database seeded!');
}

/**
 * Show the create form
 */
function showCreate(req, res) {
    res.render('pages/create', {
        errors: req.flash('errors')
    });
}

/**
 * Process the creation form
 */
function processCreate(req, res) {
    //validate info
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();

    //if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if(errors){
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect('/events/create');
    }


    // create a new event
    const event = new Event({
    name: req.body.name,
    description: req.body.description
    });

    // save event
    event.save((err) => {
    if (err)
        throw err;
    // set a succesful flag message
    req.flash('success', 'Successfully created event');

    // redirect to the newly created event
    res.redirect(`/events/${event.slug}`);
    });
}

/**
 * show the edit form
 */
function showEdit(req, res) {
    Event.findOne({ slug: req.params.slug }, (err, event) => {
      res.render('pages/edit', {
        event: event,
        errors: req.flash('errors')
      });
    });
  }

/**
 * process the edit form 
 */
function processEdit(req, res){
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('description', 'description is required').notEmpty();

    //if there are errors, redirect and save errors to flash
    const errors = req.validationErrors();
    if(errors){
        req.flash('errors', errors.map(err => err.msg));
        return res.redirect(`/events/${req.params.slug}/edit`);
    }
    //finding a current event
    Event.findOne({ slug: req.params.slug }, (err, event)=>{
        event.name = req.body.name;
        event.description = req.body.description;
        event.save((err)=>{
            if (err)
                throw err;

        req.flash('success', 'successfully updated event');
        res.redirect('/events');
        });
    });
}

/**
 * delete an event
 */
function deleteEvent(req,res) {
    Event.remove({ slug: req.params.slug }, (err)=>{
        req.flash('success', 'Event deleted');
        res.redirect('/events');
    });
}