const signUp = (req,res) => {
    res.render('../views/voters/sign_up');
}
const vote = (req,res) => {
    res.render('../views/voters/voting_page');
}
// const voted_already = (req,res) =>{
//     res.render('../views/voters/voted_already');
// }
module.exports = {signUp, vote};