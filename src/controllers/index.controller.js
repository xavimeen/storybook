const Story = require('../models/Story');

class IndexController {

    login = (req, res) => {
        res.render('login', {
            // Le especifico que el layout va a ser login y no main, que es por defecto
            layout: 'login'
        });
    }

    showDashboard = async (req, res) => {
        try {
            const stories = await Story.find({user: req.user.id}).lean();
            res.render('dashboard', {
                name: req.user.firstName,
                stories
            });
        } catch (error) {
            console.error(error);
            res.render('errors/500');
        };
    }

}

module.exports = new IndexController();