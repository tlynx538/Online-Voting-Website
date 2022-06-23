const db = require('../../knex/knex')
const homePage = (req,res) => {
    res.render('../views/admin/home');
}
const electionControl = async(req,res) => {
    // if start_time present then status false else true
    const result = await db('election_record').select('is_active');
    if(result[0].is_active)
        res.render('../views/admin/election/setup',{election_status: true});
    else 
        res.render('../views/admin/election/setup',{election_status: false});
}

const startElection = async(req,res) => {
    try 
    {
        // clear the voting_record and election_record table 
        const deleteAllRowsInVotingRecord = await db('voting_record').del(); 
        // insert new election record
        const result = await db('election_record').where('record_id','=',1).update({start_time: new Date(), is_active: true});
        console.log("election record updated");
        console.log(result);
        // update all voters eligible
        const result2 = await db('voter').where({allow_vote: false}).update({allow_vote: true});
        console.log("updated all voters to be eligible");
        console.log(result2);
        res.render('../views/admin/election/setup',{election_status: true});
    }
    catch(err)
    {
        res.send("An error has occurred"+'\n'+err);
        console.log(err);
    }
}

const endElection = async(req,res) => {
    try 
    {
        // add end time and update election record to stop
        const result = await db('election_record').where('record_id','=',1).update({end_time: new Date(), is_active: false});
        console.log("election record updated");
        console.log(result);
        const result2 = await db('voter').where({allow_vote: true}).update({allow_vote: false});
        console.log("updated all voters to be non eligible");
        console.log(result2);
        res.render('../views/admin/election/setup',{election_status: false});
    }
    catch(err)
    {
        res.send("An error has occurred"+'\n'+err);
        console.log(err);
    }
}

const electionResultView = async(req,res) => {
    // view result for one area_code
    const isElectionActive = await db('election_record').select('is_active');
    if(isElectionActive[0].is_active) {
        res.render('../views/admin/result',{results: 0})
    } 
    else 
    {
        const party_names_with_ids = await db('party').select('party_id','party_name').returning('*'); 
        const area_code_names = await db('area_codes').select('area_code_id','area_code_name').returning('*');
        const party_map = new Map();
        const area_code_name_map = new Map();
        party_names_with_ids.forEach(element => {
            party_map.set(element.party_id,element.party_name);
        });
        area_code_names.forEach(element => {
            area_code_name_map.set(element.area_code_id,element.area_code_name);
        })
        // group by party_id
        const result = await db('voting_record').join('candidate','voting_record.candidate_id','=','candidate.candidate_id').select('candidate.candidate_fname','candidate.candidate_lname','candidate.candidate_party_id','candidate.candidate_area_code_id').count('candidate.candidate_id').groupBy('candidate.candidate_id').returning('*');
        const final_array = [];
        result.forEach(element => {
            final_array.push(
                {
                    candidate_party_name: party_map.get(element.candidate_party_id),
                    candidate_fname: element.candidate_fname,
                    candidate_lname: element.candidate_lname,
                    candidate_vote_count: element.count,
                    candidate_area_code_name: area_code_name_map.get(element.candidate_area_code_id)
                });
        });
        final_array.sort(GetSortOrder('candidate_vote_count'));
        final_array.reverse();
        console.log(final_array);
        res.render('../views/admin/result',{results: final_array});
    }
}

const seed = async (req,res) => {
    try 
    {
        for(var i=1;i<10;i++)
        {
            area_code_name_var = String.fromCharCode(i+64) + String.fromCharCode(i+64) + i.toString() + i.toString(); //AA11 -> II99
            await db('area_codes').insert({ area_code_id: i, area_code_name: area_code_name_var});
            console.log("inserting " + i +' '+area_code_name_var);
        }

        res.send("Data has been seeded")

    }
    catch(err)
    {
        res.send("An error has occured:" + err);
    }
}
module.exports = {homePage,seed,electionControl,startElection,endElection,electionResultView};

function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
} 