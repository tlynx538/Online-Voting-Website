const signUp = (req,res) => {
    res.render('../views/voters/sign_up');
}
const vote = (req,res) => {
    res.render('../views/voters/voting_page');
}
module.exports = {signUp, vote};