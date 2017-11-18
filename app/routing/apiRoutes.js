const friends = require('../data/friends.js');

module.exports = (app) => {
    app.get('/api/friends', (req, res) => {
        res.json(friends);
    })

    app.post('/api/friends', (req, res) => {

        let bFriend = {
            name : '',
            photo : '',
            scoreDif: Infinity
        };

        const userData = req.body;
        const userScores = userData.scores;

        let totalDif = 0;

        for (i = 0; i < friends.length; i++){
            totalDif = 0;
            let currentFriend = friends[i];
            console.log(currentFriend.name);

            for(j = 0; j < userScores.length; j++){
                totalDif += Math.abs(userScores[j] - currentFriend.scores[j]);
            }

            if(totalDif < bFriend.scoreDif){
                bFriend.name = currentFriend.name;
                bFriend.photo = currentFriend.photo;
                bFriend.scoreDif = totalDif;
            }
        }

        friends.push(userData);

        res.json(bFriend);
    })
}