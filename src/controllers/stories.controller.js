const Story = require('../models/Story');

class storiesController {

    showStoriesForm = (req, res) => {
        res.render('stories/add');
    }

    createStory = async (req, res) => {
        try {
            req.body.user = req.user.id;
            await Story.create(req.body);
            res.redirect('/dashboard');
        } catch (error) {
            console.error(error);
            res.render('errors/500');
        };
    }

    showPublicStories = async (req, res) => {
        try {
            const stories = await Story.find({status: 'public'})
                .populate('user')
                .sort({createdAt: 'desc'})
                .lean();
            res.render('stories/index', {
                stories
            });
        } catch (error) {
            console.error(error);
            res.render('errors/500');
        };
    }

    showSingleStory = async (req, res) => {
        try {
            let story = await Story.findById(req.params.id)
                .populate('user')
                .lean()
            if(!story) {
                return res.render('errors/404')
            }
    
            res.render('stories/show', {story});
        } catch (error) {
            console.error(error);
            res.render('errors/500');
        }
    }

    showEditForm = async (req, res) => {
        try {
            const story = await Story.findOne({
                _id: req.params.id
            }).lean();
        
            if(!story) {
                return res.render('errors/404');
            }
            if(story.user != req.user.id) {
                res.redirect('/stories');
            } else {
                res.render('stories/edit', {
                    story
                });
            }
        } catch (error) {
            console.error(error);
            return res.render('errors/500');
        }
    }

    updateStory = async (req, res) => {
        try {
            let story = await Story.findById(req.params.id).lean();
        
            if(!story) {
                return res.render('erros/404')
            }
            if(story.user != req.user.id){
                res.redirect('/stories');
            } else {
                story = await Story.findOneAndUpdate({_id: req.params.id}, req.body, {
                    new: true,
                    runValidators: true
                });
                res.redirect('/dashboard');
            }
        } catch (error) {
            console.error(error);
            return res.render('errors/500');
        }
    }

    deleteStory = async (req, res) => {
        try {
            let story = await Story.findById(req.params.id).lean();
    
            if(!story) {
                return res.render('erros/404')
            }
            if(story.user != req.user.id){
                res.redirect('/stories');
            } else {
                await Story.deleteOne({_id: req.params.id})
                res.redirect('/dashboard');
            }
        } catch (error) {
            console.error(error);
            return res.render('errors/500');
        }
    }

    showUserStories = async (req, res) => {
        try {
            const stories = await Story.find({
                user: req.params.userId,
                status: 'public'
            })
            .populate('user')
            .lean();
    
            if(!stories) {
                return res.render('erros/404')
            }
    
            res.render('stories/index', {stories});
        } catch (error) {
            console.error(error);
            return res.render('errors/500');
        }
    } 

}

module.exports = new storiesController();