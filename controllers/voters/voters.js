const db = require('../../knex/knex');
const fs = require('fs');
const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const axios = require('axios');


const getSignUp = async(req,res) => {
    const area_details = await retrieveAllAreaCodes();
    res.render('../views/voters/sign_up',{area:area_details});
}

const postSignUp = async(req,res) => {
    try 
    {
        const results = await db('voter').insert({
            voter_fname: req.body.voter_fname,
            voter_lname: req.body.voter_lname,
            voter_username: req.body.user_name,
            voter_password: req.body.pass_word,
            voter_age: req.body.voter_age,
            voter_address: req.body.voter_address,
            voter_area_code_id: req.body.voter_area_code_id,
            voter_phone:  req.body.voter_phone,
            voter_sex: req.body.voter_sex,
            has_voted : false,
            allow_vote : false  
        }).returning("*");
        console.log(results);
        res.render('../views/index.pug',{message: "User Created Successfully"});
    }
    catch(err)
    {
        res.send("An error has occurred"+'\n'+err);
        console.log(err);
    }
}
const getImagesUpload = async(req,res) => {
    console.log(req.session.user);
    res.render('../views/voters/images_upload.pug');
}

const postImageUpload = async(req,res) => {
    var base64data = req.body["photo"].replace(/^data:image\/png;base64,/, "");
    var buffer = Buffer.from(base64data,'base64');
    const file_name = (generateString(7)+'.png').trim();
    console.log(file_name);
    fs.writeFileSync('face-recognition-microservice/unknown_faces/'+file_name, buffer);
    await axios.get(`http://127.0.0.1:8000/${file_name}/${req.session.user}`).then(function(response){
        if(response.data.results)
            res.send("x");
        else
            res.send("y");
    });
}

const getVotingPage = async(req,res) =>{
    console.log("reached here");
    res.render('../views/voters/voting_page',{area_code_name: voter.getAreaCodeDetails, candidate_details: voter.getCandidateDetails});
}

const getVote = async(req,res) => {
    // check if election is active 
    try 
    {
        const result = await db('election_record').select('is_active');
        const result3 = await db('voter').select('has_voted').where({voter_id: req.session.user});
        if(!result[0].is_active)
            res.render('../views/voters/error.pug',{message: "The election is inactive at the moment"});
        else 
        {
            if(result[0].is_active && !result3[0].has_voted)
            {
                // retrieve candidate id [v]
                console.log(req.params.candidate_id);
                console.log(req.session.user);
                // add vote to voting record [v]
                // needs try/catch
                const results = await db('voting_record').insert({
                    time_of_vote: new Date(),
                    voter_id : req.session.user,
                    candidate_id : req.params.candidate_id,
                    record_id : 1
                }).returning('*');
                // update has_voted in voter
                const result2 = await db('voter').where({voter_id: req.session.user}).update({has_voted: true});
                console.log(result2);
            }
            res.render('../views/voters/error.pug',{message: "You've already voted"});
        }
    }
    catch(err)
    {
        console.log(err);
        res.render('../views/voters/error.pug',{message: "Looks like you've already voted or you've not signed in"});
    }
}

const signIn = async(req,res) => {
    var flag = true;
    const userDetails = await retrieveVoterDetails();
    for(var element in userDetails)
    {
        if(userDetails[element].voter_username == req.body.voterUserName)
        {
            if(userDetails[element].voter_password == req.body.voterPassword)
            {
                console.log("inside the main condition");
                const candidateDetails = await retrieveAllCandidates(userDetails[element].voter_area_code_id);
                console.log(candidateDetails);
                req.session.user = userDetails[element].voter_id;
                area_code_local = await retrieveAreaCodebyId(userDetails[element].voter_area_code_id);

                // using setters to set the variables
                voter.candidateDetails = candidateDetails; 
                voter.areaCodeDetails = area_code_local;

                const result2 = await db('election_record').select('is_active');
                if(!result2[0].is_active)
                    res.render('../views/voters/error.pug',{message: "The election is inactive at the moment"});
                if(await hasVoted(req.session.user))
                {
                    flag = false;
                    res.render('../views/voters/error.pug',{message: "You've already voted"});
                }
                else 
                {
                    try 
                    {
                        flag = false;
                        res.redirect('/voters/upload/images');
                    }
                    catch(err)
                    {
                        console.log(err);
                        res.send("Some error detected");
                    }

                }
            }
        }
    }
    if(flag)
    {
        res.status(403).render('../views/index.pug',{errors: "Username or Password seems to be incorrect, please check once."});
    }
}

const logout = (req,res) => {
    req.session.destroy((err)=>{
        if(err)
        {
          console.log(err);
        }
        else 
        {           
          res.redirect('/');
        }
      });
}

module.exports = {getSignUp,signIn, postSignUp,getVote,logout, getImagesUpload,postImageUpload, getVotingPage};

const retrieveAreaCodebyId = async(area_code_id) => {
    const area_code = await db('area_codes').select('area_code_id','area_code_name').where('area_code_id',area_code_id);
    return area_code[0].area_code_name;
}
const retrieveAllAreaCodes = async() => {
    const area_code_details = await db('area_codes').select('area_code_id','area_code_name');
    return area_code_details;
}

const retrieveVoterDetails = async() => {
    const userDetails = await db('voter').select('voter_id','voter_username','voter_password','voter_fname','voter_lname','voter_area_code_id');
    return userDetails;
}

const retrieveAllCandidates = async(area_code_id) => {
    const candidates = await db('candidate').join('party','candidate.candidate_party_id','=','party.party_id').where('candidate_area_code_id',area_code_id).select('candidate.candidate_id','candidate.candidate_fname','candidate.candidate_lname','party.party_name').where('is_eligible',true);
    return candidates;
}

const voter = {
    candidateDetails : [],
    area_code_details : [],
    set changeCandidateDetails(newCandidateDetails){
        this.candidateDetails = newCandidateDetails;
    },
    set areaCodeDetails(newAreaCodeDetails){
        this.area_code_details = newAreaCodeDetails;
    },
    get getCandidateDetails(){
        return this.candidateDetails;
    },
    get getAreaCodeDetails(){
        return this.area_code_details;
    }
}

const hasVoted = async(voter_id) => {
    try 
    {
        const voting_details = await db('voter').select('voter_id','has_voted').where('voter_id',voter_id);
        if(voting_details[0].has_voted == false)
            return false; 
        else 
            return true;
    }
    catch(err)
    {
        console.log(err);
        res.send("An error has occured");
    }
}

function generateString(length) {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}